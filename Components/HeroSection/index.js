"use client";
import React, { useRef, memo } from "react";
import HeroText from "./HeroText";
import HeroVideo from "./HeroVideo";
import useHeroAnimations from "./useHeroAnimations";

const HeroSection = memo(() => {
  const sectionRef = useRef(null);

  // All animation logic moved to custom hook
  useHeroAnimations(sectionRef);

  return (
    <section
      ref={sectionRef}
      className="hero-section relative h-screen w-full flex items-center justify-center"
      data-bg="white"
      data-text="var(--custom-blue)"
      data-button-bg="var(--custom-blue)"
      data-button-text="white"
    >
      <div className="w-full overflow-hidden mt-28">
        <div className="container mx-auto px-4 py-16 md:py-24 relative">
          <div className="flex flex-col items-center text-center">
            <HeroText />
            <HeroVideo />
          </div>
        </div>
      </div>
    </section>
  );
});

HeroSection.displayName = "HeroSection";
export default HeroSection;
