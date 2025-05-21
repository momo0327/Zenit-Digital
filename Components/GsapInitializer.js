"use client";

import { useEffect } from "react";

export default function GsapInitializer() {
  useEffect(() => {
    // Import and register GSAP plugins globally just once at the app level
    const registerGsapPlugins = async () => {
      if (typeof window !== "undefined") {
        const gsapModule = await import("gsap");
        const scrollTriggerModule = await import("gsap/ScrollTrigger");
        
        const { gsap } = gsapModule;
        const { ScrollTrigger } = scrollTriggerModule;
        
        // Register the plugins globally
        gsap.registerPlugin(ScrollTrigger);
        
        // Make them available globally (for debugging)
        window.gsap = gsap;
        window.ScrollTrigger = ScrollTrigger;
        
        // Force a refresh of ScrollTrigger 
        ScrollTrigger.refresh(true);
        
        console.log("GSAP and ScrollTrigger initialized globally");
      }
    };
    
    registerGsapPlugins();
    
    return () => {
      // Cleanup if needed
      if (typeof window !== "undefined" && window.ScrollTrigger) {
        window.ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      }
    };
  }, []);
  
  return null;
}
