"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Text Animation Component
const TextAnimation = ({ text, onProgress }) => {
  const textRef = useRef(null);
  const lettersRef = useRef([]);
  const words = text.split(" ");
  const flatLetters = [];

  // Pre-process words and spaces for better handling
  const wordsWithSpaces = [];
  words.forEach((word, i) => {
    wordsWithSpaces.push(word);
    if (i < words.length - 1) wordsWithSpaces.push(" ");
  });

  useEffect(() => {
    // Initialize refs array
    lettersRef.current = lettersRef.current.slice(0, flatLetters.length);

    // Return a function that can be called by the parent to update letter colors
    onProgress((progress) => {
      const highlightIndex = Math.floor(progress * flatLetters.length);

      lettersRef.current.forEach((letter, index) => {
        if (letter) {
          letter.style.color =
            index <= highlightIndex ? "var(--custom-pink)" : "white";
        }
      });

      return highlightIndex / flatLetters.length; // Return normalized progress
    });
  }, [flatLetters.length, onProgress]);

  return (
    <h2
      ref={textRef}
      className="about-text text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-normal text-center md:text-left leading-tight md:leading-tight tracking-normal"
    >
      {wordsWithSpaces.map((item, wordIndex) => {
        // For spaces, return a single space span
        if (item === " ") {
          const index = flatLetters.length;
          flatLetters.push(" ");
          return (
            <span
              key={`space-${wordIndex}`}
              ref={(el) => (lettersRef.current[index] = el)}
              className="whitespace-pre inline-block transition-colors duration-200"
              style={{ width: "0.3em" }}
            >
              {"\u00A0"}
            </span>
          );
        }

        // For words, map each letter
        return (
          <span
            key={`word-${wordIndex}`}
            className="inline-block whitespace-nowrap mr-[0.02em]"
          >
            {item.split("").map((letter, letterIndex) => {
              const index = flatLetters.length;
              flatLetters.push(letter);
              return (
                <span
                  key={`${wordIndex}-${letterIndex}`}
                  ref={(el) => (lettersRef.current[index] = el)}
                  className="letter inline-block transition-colors duration-200"
                  style={{
                    marginRight: "0.005em",
                    letterSpacing: "-0.01em",
                    lineHeight: "1.2",
                  }}
                >
                  {letter}
                </span>
              );
            })}
          </span>
        );
      })}
    </h2>
  );
};

// Scroll Progress Indicator Component
const ScrollProgress = ({ onUpdate }) => {
  const indicatorRef = useRef(null);
  const circleRef = useRef(null);

  useEffect(() => {
    // Share refs with parent
    onUpdate({
      indicator: indicatorRef.current,
      circle: circleRef.current,
    });
  }, [onUpdate]);

  return (
    <div
      ref={indicatorRef}
      className="scroll-indicator fixed bottom-5 right-5 w-16 h-16 flex justify-center items-center z-10 opacity-0 transition-opacity duration-300"
    >
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
          ref={circleRef}
          className="stroke-custom-pink"
          cx="32"
          cy="32"
          r="28"
          strokeWidth="4"
          fill="none"
          strokeDasharray="188"
          strokeDashoffset="188"
        />
      </svg>
    </div>
  );
};

// Main About Section Component
const AboutSection = () => {
  const sectionRef = useRef(null);
  const updateProgressRef = useRef(null);
  const progressElementsRef = useRef({
    indicator: null,
    circle: null,
  });

  // Text content
  const aboutText =
    "We create elevating digital experiences that inspire and connect with people through development and design.";

  useEffect(() => {
    // Register GSAP ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Create GSAP context
    const ctx = gsap.context(() => {
      const maxOffset = 188; // Circle circumference for full progress

      // Create main timeline with ScrollTrigger
      gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
          pin: true,
          onUpdate: (self) => {
            if (updateProgressRef.current) {
              // Update text highlighting
              const normalizedProgress = updateProgressRef.current(
                self.progress
              );

              // Update circle progress
              if (progressElementsRef.current.circle) {
                gsap.to(progressElementsRef.current.circle, {
                  strokeDashoffset: maxOffset - normalizedProgress * maxOffset,
                  duration: 0.1,
                  ease: "none",
                  overwrite: true,
                });
              }
            }
          },
        },
      });

      // Create separate ScrollTrigger for indicator visibility
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top center",
        end: "bottom top",
        onEnter: () => {
          if (progressElementsRef.current.indicator) {
            gsap.to(progressElementsRef.current.indicator, {
              opacity: 1,
              duration: 0.3,
              ease: "power1.out",
            });
          }
        },
        onLeave: () => {
          if (progressElementsRef.current.indicator) {
            gsap.to(progressElementsRef.current.indicator, {
              opacity: 0,
              duration: 0.3,
              ease: "power1.in",
            });
          }
        },
        onEnterBack: () => {
          if (progressElementsRef.current.indicator) {
            gsap.to(progressElementsRef.current.indicator, {
              opacity: 1,
              duration: 0.3,
              ease: "power1.out",
            });
          }
        },
        onLeaveBack: () => {
          if (progressElementsRef.current.indicator) {
            gsap.to(progressElementsRef.current.indicator, {
              opacity: 0,
              duration: 0.3,
              ease: "power1.in",
            });
          }
        },
      });
    }, sectionRef); // Scope context to section

    // Cleanup function
    return () => {
      ctx.revert(); // This will clean up all GSAP animations
    };
  }, []);

  // Callback function to update text highlighting
  const handleTextProgress = (updateFn) => {
    updateProgressRef.current = updateFn;
  };

  // Callback function to store progress indicator references
  const handleProgressElements = (elements) => {
    progressElementsRef.current = elements;
  };

  return (
    <>
      {/* Scroll Progress Indicator */}
      <ScrollProgress onUpdate={handleProgressElements} />

      {/* Main Section */}
      <section
        ref={sectionRef}
        className="about-section min-h-screen h-screen flex items-center justify-center px-4 sm:px-6 md:px-8"
        data-bg="var(--custom-blue)"
        data-text="white"
        data-button-bg="var(--custom-pink)"
        data-button-text="var(--custom-blue)"
      >
        <div className="container mx-auto px-4 max-w-7xl">
          <TextAnimation text={aboutText} onProgress={handleTextProgress} />
        </div>
      </section>
    </>
  );
};

export default AboutSection;
