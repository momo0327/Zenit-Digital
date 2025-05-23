"use client";

import { useEffect } from "react";

export default function GsapInitializer() {
  useEffect(() => {
    // Import and register GSAP plugins globally just once at the app level
    const registerGsapPlugins = async () => {
      if (typeof window !== "undefined") {
        try {
          // Ensure we're not loading GSAP multiple times
          if (window.gsap && window.ScrollTrigger) {
            console.log("GSAP already initialized");
            return;
          }

          const gsapModule = await import("gsap");
          const scrollTriggerModule = await import("gsap/ScrollTrigger");

          const { gsap } = gsapModule;
          const { ScrollTrigger } = scrollTriggerModule;

          // Register the plugins globally
          gsap.registerPlugin(ScrollTrigger);

          // Make them available globally (for debugging)
          window.gsap = gsap;
          window.ScrollTrigger = ScrollTrigger;

          // Set default configurations
          gsap.config({
            force3D: true,
            nullTargetWarn: false,
          });

          // Force a refresh of ScrollTrigger with a small delay
          setTimeout(() => {
            ScrollTrigger.refresh(true);
          }, 100);

          console.log("GSAP and ScrollTrigger initialized globally");

          // Dispatch a custom event to signal GSAP is ready
          window.dispatchEvent(new CustomEvent("gsapReady"));
        } catch (error) {
          console.error("Error loading GSAP:", error);
        }
      }
    };

    registerGsapPlugins();

    return () => {
      // Cleanup if needed
      if (typeof window !== "undefined" && window.ScrollTrigger) {
        window.ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      }
    };
  }, []);

  return null;
}
