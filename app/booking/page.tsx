"use client";
import React, { useEffect, useState } from "react";
import Booking from "../../Components/Booking";

export default function BookingPage() {
  const [mounted, setMounted] = useState(false);

  // Add data attributes to parent sections to control navbar appearance
  useEffect(() => {
    // Set mounted to true after component mounts
    setMounted(true);

    // Add a data-attributes to the body element for navbar customization
    const parentSection = document.querySelector("main");
    if (parentSection) {
      parentSection.setAttribute("data-bg", "white");
      parentSection.setAttribute("data-text", "black");
      parentSection.setAttribute("data-button-bg", "var(--custom-blue)");
      parentSection.setAttribute("data-button-text", "var(--custom-pink)");
      parentSection.setAttribute("data-navbar-text", "black");
    }

    return () => {
      // Cleanup if needed
      if (parentSection) {
        parentSection.removeAttribute("data-bg");
        parentSection.removeAttribute("data-text");
        parentSection.removeAttribute("data-button-bg");
        parentSection.removeAttribute("data-button-text");
        parentSection.removeAttribute("data-navbar-text");
      }
    };
  }, []);

  // Don't render anything until mounted to prevent hydration issues
  if (!mounted) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-custom-blue mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </main>
    );
  }

  return (
    <main
      className="min-h-screen"
      data-bg="white"
      data-text="black"
      data-button-bg="var(--custom-blue)"
      data-button-text="var(--custom-pink)"
      data-navbar-text="var(--custom-blue)"
    >
      <Booking />
    </main>
  );
}
