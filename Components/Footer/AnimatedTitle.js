import React from "react";

/**
 * AnimatedTitle component that displays text with animated letters
 * Each letter is given a class for GSAP to animate
 */
const AnimatedTitle = ({ firstLine, secondLine }) => {
  return (
    <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-12 text-center text-custom-green leading-tight">
      <div className="overflow-hidden">
        {Array.from(firstLine).map((letter, index) => (
          <span
            key={`first-${index}`}
            className="footer-title-letter inline-block"
          >
            {letter === " " ? "\u00A0" : letter}
          </span>
        ))}
      </div>
      <div className="overflow-hidden">
        {Array.from(secondLine).map((letter, index) => (
          <span
            key={`second-${index}`}
            className="footer-title-letter inline-block"
          >
            {letter === " " ? "\u00A0" : letter}
          </span>
        ))}
      </div>
    </h1>
  );
};

export default AnimatedTitle;
