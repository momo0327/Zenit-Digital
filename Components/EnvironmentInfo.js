"use client";

import { useEffect } from "react";

export default function EnvironmentInfo() {
  useEffect(() => {
    // This helps debug environment differences
    console.log("Environment:", process.env.NODE_ENV);
    console.log("Window width:", window.innerWidth);
    console.log("Window height:", window.innerHeight);
    console.log("User Agent:", navigator.userAgent);
    
    // Check if GSAP and ScrollTrigger are properly initialized
    if (typeof window !== "undefined") {
      console.log("GSAP version:", window.gsap?.version || "Not loaded");
      console.log("ScrollTrigger:", window.ScrollTrigger ? "Loaded" : "Not loaded");
    }
  }, []);
  
  // Only show in development
  if (process.env.NODE_ENV !== "development") return null;
  
  return (
    <div style={{ 
      position: "fixed", 
      bottom: "10px", 
      right: "10px", 
      background: "rgba(0,0,0,0.7)",
      color: "white",
      padding: "5px 10px",
      borderRadius: "5px",
      fontSize: "12px",
      zIndex: 9999
    }}>
      {process.env.NODE_ENV} mode
    </div>
  );
}
