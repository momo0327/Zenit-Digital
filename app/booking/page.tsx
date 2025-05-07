"use client";
import React, { useEffect } from "react";
import Booking from "../../Components/Booking";

export default function BookingPage() {
  // Add data attributes to parent sections to control navbar appearance
  useEffect(() => {
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

  return (
    <main
      className="min-h-screen"
      data-bg="white"
      data-text="black"
      data-button-bg="var(--custom-blue)"
      data-button-text="var(--custom-pink)"
      data-navbar-text="black"
    >
      <Booking />
    </main>
  );
}
