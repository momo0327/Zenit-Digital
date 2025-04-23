"use client";
import React, { useRef, memo } from "react";
import useFooterAnimations from "./useFooterAnimations";
import AnimatedTitle from "./AnimatedTitle";
import InfoSection from "./InfoSection";

/**
 * Footer component that contains the "Let's Make It Happen" section
 * and potentially footer content
 */
const Footer = memo(() => {
  // Create a ref for the section to be used with animations
  const sectionRef = useRef(null);

  // Initialize animations using the custom hook
  useFooterAnimations(sectionRef);

  return (
    <>
      {/* "Let's Make It Happen" Section */}
      <section
        ref={sectionRef}
        className="make-it-happen-section py-10 bg-custom-lightGreen"
        data-bg="white"
        data-text="black"
        data-button-bg="var(--custom-green)"
        data-button-text="var(--custom-lightGreen)"
        data-nav-text="var(--custom-green)"
      >
        <div className="flex flex-col justify-center items-center min-h-screen bg-custom-lightGreen py-20 relative mx-auto max-w-7xl rounded-sm">
          <p className="text-white mb-4">- Change starts here -</p>

          <AnimatedTitle firstLine="LET'S MAKE" secondLine="IT HAPPEN" />

          <button className="bg-custom-green hover:bg-zinc-600 text-white rounded-full px-7 py-5 text-lg transition-colors flex items-center">
            BOOK A CALL <span className="ml-1">↗</span>
          </button>

          <InfoSection />
        </div>
      </section>

      {/* Footer Section - Uncomment and implement when needed */}
      {/* <footer className="bg-white text-custom-green font-semibold py-16">
        <div className="container mx-auto px-6">
          ... footer content ...
        </div>
      </footer> */}
    </>
  );
});

Footer.displayName = "Footer";
export default Footer;