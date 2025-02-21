"use client";
import React, { useEffect } from "react";
import { gsap } from "gsap";

const MainSection = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const headings = document.querySelectorAll(".text-wrapper .main-heading");

      gsap.set(headings, { 
        y: 160, // Start hidden below
      });

      gsap.to(headings, {
        y: 0, // Move up into view
        duration: 2.4,
        ease: "power4.inOut",
        delay: 0.0015,
      });
    }
  }, []);

  return (
    <div className="text-center py-10">
      {/* Wrapper with overflow hidden to act as the mask */}
      <div className="text-wrapper overflow-hidden inline-block">
        <h1 className="main-heading text-9xl font-extrabold text-custom-blue leading-normal">
          ZENIT DIGITAL
        </h1>
      </div>

      <div className="text-wrapper overflow-hidden inline-block">
        <div
          className="main-heading text-9xl font-extrabold text-transparent bg-clip-text"
          style={{
            WebkitTextStroke: "4px black",
            textStroke: "4px black",
          }}
        >
          ZENIT DIGITAL
        </div>
      </div>

      <div className="text-wrapper overflow-hidden inline-block">
        <h1 className="main-heading text-9xl font-extrabold text-custom-blue leading-normal">
          ZENIT DIGITAL
        </h1>
      </div>
    </div>
  );
};

export default MainSection;
