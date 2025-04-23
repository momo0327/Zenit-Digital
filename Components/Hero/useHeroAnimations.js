import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Custom hook that manages all GSAP animations for the hero section
 * This separates animation logic from component rendering
 */
const useHeroAnimations = (sectionRef) => {
  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Create a GSAP context for better memory management and cleanup
    const ctx = gsap.context(() => {
      // Initialize text animations
      initTextAnimations();

      // Initialize responsive video animations
      initVideoAnimations();
    }, sectionRef); // Scope the context to our section

    // Return cleanup function
    return () => {
      // This will clean up all animations created in the context
      ctx.revert();
    };
  }, [sectionRef]);

  /**
   * Initialize all text-related animations
   */
  const initTextAnimations = () => {
    // Create a timeline for better animation orchestration
    const tl = gsap.timeline({
      defaults: {
        ease: "power3.out",
      },
    });

    // Add animations to the timeline
    tl.from(".word", {
      opacity: 0,
      y: 50,
      stagger: 0.2,
      duration: 1,
    })
      .from(
        ".hero-paragraph",
        {
          opacity: 0,
          y: 30,
          duration: 0.8,
        },
        "-=0.5"
      ) // Start slightly before the previous animation finishes
      .from(
        ".hero-button",
        {
          opacity: 0,
          y: 20,
          duration: 0.8,
          ease: "back.out(1.7)",
        },
        "-=0.6"
      );
  };

  /**
   * Initialize all video-related animations with responsive handling
   */
  const initVideoAnimations = () => {
    // Create a matchMedia instance for responsive animations
    const mm = gsap.matchMedia();

    // Basic animations for all screen sizes
    mm.add("(min-width: 0px)", () => {
      // Video animation for mobile
      if (window.innerWidth < 768) {
        gsap.from(".mobile-video", {
          opacity: 0,
          y: 20,
          duration: 1,
          delay: 1.2,
        });
      }
    });

    // Additional animations for desktop screens
    mm.add("(min-width: 768px)", () => {
      // Calculate responsive scale based on window width
      const videoScale = window.innerWidth > 1440 ? 0.85 : 1; // Scale down slightly on very large screens

      // Desktop video animation with responsive scaling
      gsap.from(".desktop-video", {
        opacity: 0,
        x: 50,
        scale: videoScale * 0.9, // Start slightly smaller based on scale
        duration: 1.2,
        delay: 1,
      });

      // Set initial position and opacity
      gsap.set(".desktop-video", {
        opacity: 1,
        scale: 1,
        x: 0,
        y: 0,
      });

      // Add a subtle parallax effect on scroll with improved visibility control
      gsap.to(".desktop-video", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom", // Start animation when top of section hits bottom of viewport
          end: "bottom top", // End animation when bottom of section hits top of viewport
          scrub: 0.5, // Smooth scrolling effect
          toggleActions: "play none none reverse", // Play when entering, reverse when leaving
        },
        y: 40 * videoScale, // Reduced vertical movement
        x: -20 * videoScale, // Slight leftward movement
        scale: videoScale * 0.95, // Slight scale reduction
        opacity: 0.85, // Keep good opacity throughout
        ease: "power1.out", // Smoother easing
      });
    });
  };
};

export default useHeroAnimations;
