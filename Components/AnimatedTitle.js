'use client';
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AnimatedTitle = ({ title }) => {
  const titleRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const titleLetters = titleRef.current.querySelectorAll(".title-letter");

      if (titleLetters.length > 0) {
        // Set the initial position of letters below the viewport (y: 160)
        gsap.set(titleLetters, { y: 160 });

        // Trigger animation when the title scrolls into view
        gsap.to(titleLetters, {
          y: 0, // Move letters into view
          duration: 1,
          stagger: 0.04, // Apply stagger to the letters
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current, // The element to watch
            start: "top 80%", // Start when the top of the element is at 80% of the viewport
            toggleActions: "play none none none", // Only play the animation once
          },
        });
      }
    }
  }, []);

  return (
    <div ref={titleRef} className="animated-title-container overflow-hidden inline-block">
      <h1 className="text-9xl font-bold ">
        {Array.from(title).map((letter, index) => (
          <span key={index} className="title-letter inline-block">
            {letter === " " ? "\u00A0" : letter}
          </span>
        ))}
      </h1>
    </div>
  );
};

export default AnimatedTitle;
