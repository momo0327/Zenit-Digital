"use client";
import React, { useRef, memo } from "react";

const HeroText = memo(() => {
  const headingRef = useRef(null);
  const paragraphRef = useRef(null);
  const buttonRef = useRef(null);

  return (
    <div className="w-full lg:w-3/4 z-10">
      <h1
        ref={headingRef}
        className="text-6xl lg:text-9xl md:text-6xl font-medium lg:font-medium leading-none mb-6"
      >
        <span className="word">We</span> <span className="word">turn</span>{" "}
        <span className="word">dreams</span> <span className="word">into</span>
        <br />
        <span className="word">Digital</span>{" "}
        <span className="word">Reality</span>
      </h1>

      <p
        ref={paragraphRef}
        className="hero-paragraph text-md mb-8 text-custom-blue max-w-xl mx-auto"
      >
        Looking to build payments into your software? Aria fixes that. Pick the
        payment features you need for happy users and booming revenue.
      </p>

      <button
        ref={buttonRef}
        className="hero-button bg-custom-blue text-custom-pink hover:bg-teal-400 font-medium py-3 px-6 rounded-full inline-flex items-center"
      >
        Speak to sales
        <svg
          className="w-4 h-4 ml-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5l7 7-7 7"
          ></path>
        </svg>
      </button>
    </div>
  );
});

HeroText.displayName = "HeroText";
export default HeroText;
