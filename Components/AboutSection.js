"use client";
import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const AboutSection = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const aboutText = document.querySelector(".about-text");
      const section = document.querySelector(".about-section");
      const scrollIndicator = document.querySelector(".scroll-indicator");
      const circle = document.querySelector(
        ".scroll-indicator circle:nth-child(2)"
      );

      // Wrap each letter in a span
      const textContent = aboutText.textContent;
      aboutText.innerHTML = textContent
        .split("")
        .map((letter) => `<span class="letter">${letter}</span>`)
        .join("");

      const letters = document.querySelectorAll(".letter");
      const totalLetters = letters.length;

      const maxOffset = 220; // Full progress for indicator

      // **GSAP Animation**
      gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "bottom top",
          scrub: 1,
          pin: true,
          markers: false,
          onUpdate: (self) => {
            const progress = self.progress; // Scroll progress (0 - 1)

            // **Sync text highlighting with scroll**
            const highlightIndex = Math.floor(progress * totalLetters);

            letters.forEach((letter, index) => {
              letter.style.color =
                index <= highlightIndex ? "var(--custom-pink)" : "white";
            });

            // **Sync Circle Progress Exactly with Text**
            const syncedProgress = highlightIndex / totalLetters;
            circle.style.strokeDashoffset =
              maxOffset - syncedProgress * maxOffset;
          },
        },
      });

      // Show indicator only inside About Section
      ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "bottom top",
        onEnter: () => scrollIndicator.classList.add("opacity-100"),
        onLeave: () => scrollIndicator.classList.remove("opacity-100"),
        onEnterBack: () => scrollIndicator.classList.add("opacity-100"),
        onLeaveBack: () => scrollIndicator.classList.remove("opacity-100"),
      });
    }
  }, []);

  return (
    <>
      {/* Scroll Indicator */}
      <div className="scroll-indicator fixed bottom-5 right-5 w-16 h-16 flex justify-center items-center z-10 opacity-0 transition-opacity duration-300">
        <svg className="rotate-[-90deg]" width="64" height="64">
          <circle
            className="stroke-custom-blue"
            cx="32"
            cy="32"
            r="28"
            strokeWidth="4"
            fill="none"
          />
          <circle
            className="stroke-custom-pink"
            cx="32"
            cy="32"
            r="28"
            strokeWidth="4"
            fill="none"
            strokeDasharray="188"
            strokeDashoffset="188"
            style={{ transition: "stroke-dashoffset 0.1s ease-out" }}
          />
        </svg>
      </div>

      <section
        className="about-section h-screen flex items-center justify-center"
        data-bg="var(--custom-blue)"
        data-text="white"
        data-button-bg="var(--custom-pink)"
        data-button-text="var(--custom-blue)"
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="about-text text-5xl md:text-8xl lg:text-8xl font-normal text-left">
            We create elevating digital experiences that inspire and connect
            with people through development and design.
          </h2>
        </div>
      </section>
    </>
  );
};

export default AboutSection;
