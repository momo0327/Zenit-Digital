"use client";
import { useEffect, useRef } from "react";
import Lenis from "@studio-freight/lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export function SmoothScroll({ children }) {
  const lenisRef = useRef();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Exponential ease out
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
      smoothTouch: false,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Connect Lenis to ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Connect GSAP ticker to Lenis
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    // Remove lag smoothing to prevent conflicts
    gsap.ticker.lagSmoothing(0);

    // Handle direct hash navigation (for reliability)
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        setTimeout(() => {
          const element = document.querySelector(hash);
          if (element) {
            console.log(`Hash navigation: scrolling to ${hash}`);
            if (lenisRef.current) {
              lenisRef.current.scrollTo(element, {
                offset: -80,
                immediate: false,
                duration: 1.2,
              });
            } else {
              // Fallback
              element.scrollIntoView({ behavior: "smooth", block: "start" });
            }
          }
        }, 100);
      }
    };

    // Initial hash handling
    if (window.location.hash) {
      handleHashChange();
    }

    // Add listeners for hash changes
    window.addEventListener("hashchange", handleHashChange);

    // Listen for custom scrollToSection event
    const handleScrollToSection = (event) => {
      console.log("SmoothScroll: scrollToSection event received", event.detail);
      const { target, offset } = event.detail;

      if (lenisRef.current && target) {
        console.log("SmoothScroll: Scrolling to target using Lenis", {
          targetId: target.id,
          targetElement: target,
          offset,
        });

        try {
          // Use the Lenis instance to scroll to the target
          lenisRef.current.scrollTo(target, {
            offset: offset || 0,
            immediate: false,
            duration: 1.2,
          });
          console.log("SmoothScroll: scrollTo called successfully");
        } catch (error) {
          console.error("SmoothScroll: Error in scrollTo", error);

          // Fallback to native scroll
          const targetPosition =
            target.getBoundingClientRect().top +
            window.pageYOffset +
            (offset || 0);
          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });
          console.log("SmoothScroll: Used fallback native scrollTo");
        }
      } else {
        console.error(
          "SmoothScroll: Cannot scroll, Lenis or target not available",
          {
            lenisAvailable: !!lenisRef.current,
            targetAvailable: !!target,
            targetId: target?.id,
          }
        );
      }
    };

    // Add event listener for the custom event
    window.addEventListener("scrollToSection", handleScrollToSection);
    console.log("SmoothScroll: Event listener for scrollToSection added");

    // Cleanup
    return () => {
      gsap.ticker.remove((time) => {
        lenis.raf(time * 1000);
      });
      window.removeEventListener("scrollToSection", handleScrollToSection);
      window.removeEventListener("hashchange", handleHashChange);
      lenis.destroy();
      console.log("SmoothScroll: Cleanup completed, event listener removed");
    };
  }, []);

  return <>{children}</>;
}

export default SmoothScroll;
