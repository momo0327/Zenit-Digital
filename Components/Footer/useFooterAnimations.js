import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Custom hook that manages all GSAP animations for the footer section
 */
const useFooterAnimations = (sectionRef) => {
  // Create refs to store animation instances for better cleanup
  const animations = useRef({ triggers: [], tweens: [] });

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Create a GSAP context for better memory management and cleanup
    const ctx = gsap.context(() => {
      // Initialize title animation
      initTitleAnimation();
    }, sectionRef);

    // Cleanup function
    return () => {
      // Clean up all ScrollTrigger instances
      animations.current.triggers.forEach((trigger) => {
        if (trigger) trigger.kill();
      });

      // Clean up all tweens
      animations.current.tweens.forEach((tween) => {
        if (tween) tween.kill();
      });

      // Revert the GSAP context
      ctx.revert();
    };
  }, [sectionRef]);

  /**
   * Initialize animation for the title letters
   */
  const initTitleAnimation = () => {
    const footerTitleLetters = gsap.utils.toArray(".footer-title-letter");

    if (footerTitleLetters.length === 0) return;

    // Create a timeline for better animation orchestration
    const tl = gsap.timeline({
      paused: true,
      defaults: {
        ease: "power3.out",
      },
    });

    // Store the timeline for cleanup
    animations.current.tweens.push(tl);

    // Set initial state
    gsap.set(footerTitleLetters, { y: 160, opacity: 1 });

    // Add animations to the timeline
    tl.to(footerTitleLetters, {
      y: 0,
      duration: 1,
      stagger: 0.04, // Use GSAP's built-in stagger
    });

    // Create ScrollTrigger to control the timeline
    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top 80%",
      onEnter: () => tl.play(),
      once: true,
      id: "footer-title-animation",
    });

    // Store the trigger for cleanup
    animations.current.triggers.push(trigger);
  };

  return {
    animations: animations.current,
  };
};

export default useFooterAnimations;
