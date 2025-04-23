"use client";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Configures a 3D perspective transition between two sections
 *
 * @param {Object} options Configuration options
 * @param {HTMLElement} options.sourceSection The section to transition from
 * @param {HTMLElement} options.targetSection The section to transition to
 * @param {HTMLElement} options.triggerElement The element that triggers the transition
 * @param {Array} options.contentElements Elements to animate within the source section
 * @param {Function} options.onStart Callback when animation starts
 * @param {Function} options.onComplete Callback when animation completes
 * @returns {Function} Cleanup function to kill all animations
 */
export function create3DTransition({
  sourceSection,
  targetSection,
  triggerElement,
  contentElements = [],
  onStart = () => {},
  onComplete = () => {},
}) {
  if (!sourceSection || !targetSection || !triggerElement) {
    console.warn("Missing required elements for 3D transition");
    return () => {};
  }

  // Store all ScrollTrigger instances for cleanup
  const triggers = [];

  // Configure perspective on the source section
  gsap.set(sourceSection, {
    perspective: 1200,
    transformStyle: "preserve-3d",
    transformOrigin: "center bottom",
    willChange: "transform, opacity",
  });

  // Initial state for the target section
  gsap.set(targetSection, {
    opacity: 0,
    y: 80,
    scale: 0.97,
    filter: "blur(10px)",
  });

  // Create main timeline for the transition
  const transitionTimeline = gsap.timeline({
    paused: false,
    onStart,
    onComplete,
  });

  // Add transition animations to the timeline (source section elements transform and fade out)
  if (contentElements.length > 0) {
    contentElements.forEach(({ element, transformProps }) => {
      if (element) {
        transitionTimeline.to(
          element,
          {
            ...transformProps,
            duration: 1,
            ease: "power3.inOut",
            filter: "blur(4px)",
          },
          0
        );
      }
    });
  } else {
    // Default animation if no specific content elements are provided
    transitionTimeline.to(
      sourceSection,
      {
        rotateX: 10,
        scale: 0.9,
        y: -120,
        opacity: 0.4,
        duration: 1,
        ease: "power3.inOut",
        filter: "blur(4px)",
      },
      0
    );
  }

  // Add target section reveal to the timeline
  transitionTimeline.to(
    targetSection,
    {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      duration: 1,
      ease: "power3.out",
    },
    0.3
  );

  // Create ScrollTrigger to control the timeline
  const mainTrigger = ScrollTrigger.create({
    trigger: triggerElement,
    start: "bottom bottom-=10%",
    end: "bottom top+=10%",
    animation: transitionTimeline,
    scrub: 0.8,
    anticipatePin: 1,
    preventOverlaps: true,
    fastScrollEnd: true,
    invalidateOnRefresh: true,
    onEnter: () => {
      // When entering the trigger zone
      if (sourceSection.classList) {
        sourceSection.classList.add("transitioning");
      }
    },
    onLeaveBack: () => {
      // When scrolling back up and leaving the trigger zone
      if (sourceSection.classList) {
        sourceSection.classList.remove("transitioning");
      }
    },
  });

  triggers.push(mainTrigger);

  // Return cleanup function
  return () => {
    transitionTimeline.kill();
    triggers.forEach((trigger) => trigger.kill());
  };
}

/**
 * Creates a staggered depth effect for multiple elements
 *
 * @param {Object} options Configuration options
 * @param {Array} options.elements Array of DOM elements to apply the effect to
 * @param {HTMLElement} options.triggerElement Element that triggers the animation
 * @param {HTMLElement} options.containerElement The container with perspective
 * @returns {Function} Cleanup function
 */
export function createDepthStagger({
  elements = [],
  triggerElement,
  containerElement,
}) {
  if (!elements.length || !triggerElement) {
    console.warn("Missing required elements for depth stagger effect");
    return () => {};
  }

  // Set perspective on container if provided
  if (containerElement) {
    gsap.set(containerElement, {
      perspective: 1000,
      transformStyle: "preserve-3d",
      willChange: "transform",
    });
  }

  // Apply staggered animations to elements
  const animations = elements
    .map((element, index) => {
      if (!element) return null;

      const tween = gsap.to(element, {
        z: -80 * (index + 1),
        rotateX: 2 * (index + 1),
        opacity: gsap.utils.wrap([1, 0.9, 0.8, 0.7], index),
        scale: gsap.utils.wrap([1, 0.98, 0.96, 0.94], index),
        scrollTrigger: {
          trigger: triggerElement,
          start: "top bottom",
          end: "bottom center",
          scrub: 0.6,
          preventOverlaps: true,
          invalidateOnRefresh: true,
        },
      });

      return tween;
    })
    .filter(Boolean);

  // Return cleanup function
  return () => {
    animations.forEach((tween) => {
      if (tween.scrollTrigger) {
        tween.scrollTrigger.kill();
      }
      tween.kill();
    });
  };
}