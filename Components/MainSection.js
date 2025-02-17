"use client";
import React, { useEffect } from "react";
import { gsap } from "gsap";

const MainSection = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Select all the h1 elements with the class "main-heading"
      const headings = document.querySelectorAll(".main-heading");

      // Initially set the elements to be invisible and positioned lower
      gsap.set(headings, {
        opacity: 0,  // Start invisible
        y: 100,      // Move downwards by 100px
      });

      // Animate each heading separately with a stagger effect
      gsap.to(headings, {
        opacity: 1,   // Fade in
        y: 0,         // Move to original position
        duration: 1.5, // Animation duration
        ease: "power4.out",
        delay:1.1,
        stagger: 0.3, // Delay between animations for each heading
      });
    }
  }, []);

  return (
    <div>
      {/* Header Section */}
      <div className="text-center py-10">
        <h1 className="main-heading text-9xl font-extrabold text-custom-blue leading-normal">
          ZENIT DIGITAL
        </h1>

        {/* Text with outline effect */}
        <div
          className="main-heading text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-routline-none"
          style={{
            WebkitTextStroke: "4px black", // Text stroke effect for Webkit browsers
            textStroke: "4px black", // Standard text stroke
          }}
        >
          ZENIT DIGITAL
        </div>

        <h1 className="main-heading text-9xl font-extrabold text-custom-blue leading-normal">
          ZENIT DIGITAL
        </h1>
      </div>
    </div>
  );
};

export default MainSection;
