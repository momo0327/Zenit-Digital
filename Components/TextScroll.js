'use client';

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TextScroll = () => {
  const sectionRef = useRef(null);
  const topTextRef = useRef(null);
  const bottomTextRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const topText = topTextRef.current;
    const bottomText = bottomTextRef.current;

    // Top text scrolls to the right
    gsap.to(topText, {
      x: window.innerWidth, // Move fully to the right
      ease: "none",
      scrollTrigger: {
        trigger: section, // Trigger animation when the section is in view
        start: "top center", // Animation starts when section enters the center of the viewport
        end: "bottom top", // Animation ends when the section leaves the viewport
        scrub: true,
      },
    });

    // Bottom text scrolls to the left
    gsap.to(bottomText, {
      x: -window.innerWidth, // Move fully to the left
      ease: "none",
      scrollTrigger: {
        trigger: section, // Trigger animation when the section is in view
        start: "top center",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  return (
    <div
    data-bg="var(--background)"
    data-text="var(--custom-green)"
    data-button-bg="var(--custom-green)"
    data-button-text="var(--custom-lightGreen)"
      ref={sectionRef}
      className="relative h-screen overflow-hidden flex flex-col justify-center items-center"
    >
      {/* Top Text */}
      <div
        ref={topTextRef}
        className="absolute top-[40%] left-0 w-full text-left pl-8 text-custom-green font-medium uppercase whitespace-nowrap text-[10vw] tracking-wide"
      >
        Nice things our clients have said
      </div>

      {/* Bottom Text */}
      <div
        ref={bottomTextRef}
        className="absolute top-[55%] left-0 w-full text-left pl-8 text-custom-lightGreen font-medium uppercase whitespace-nowrap text-[10vw] tracking-wide"
      >
        Nice things our clients have said
      </div>
    </div>
  );
};

export default TextScroll;
