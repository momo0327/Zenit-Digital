"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const HeroSection = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const paragraphRef = useRef(null);
  const buttonRef = useRef(null);
  const videoRef = useRef(null);

  useEffect(() => {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Create a GSAP context for better memory management and cleanup
    const ctx = gsap.context(() => {
      // Create a timeline for better animation orchestration
      const tl = gsap.timeline({
        defaults: {
          ease: "power3.out",
        },
      });

      // Add animations to the timeline
      tl.from(".word", {
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 1,
      })
        .from(
          paragraphRef.current,
          {
            opacity: 0,
            y: 30,
            duration: 0.8,
          },
          "-=0.5"
        ) // Start slightly before the previous animation finishes
        .from(
          buttonRef.current,
          {
            opacity: 0,
            y: 20,
            duration: 0.8,
            ease: "back.out(1.7)",
          },
          "-=0.6"
        );

      // Create a matchMedia instance for responsive animations
      const mm = gsap.matchMedia();

      // Basic animations for all screen sizes
      mm.add("(min-width: 0px)", () => {
        // Video animation for mobile
        if (window.innerWidth < 768) {
          gsap.from(".mobile-video", {
            opacity: 0,
            y: 20,
            duration: 1,
            delay: 1.2,
          });
        }
      });

      // Additional animations for desktop screens
      mm.add("(min-width: 768px)", () => {
        // Calculate responsive scale based on window width
        const videoScale = window.innerWidth > 1440 ? 0.85 : 1; // Scale down slightly on very large screens

        // Desktop video animation with responsive scaling
        gsap.from(".desktop-video", {
          opacity: 0,
          x: 50,
          scale: videoScale * 0.9, // Start slightly smaller based on scale
          duration: 1.2,
          delay: 1,
        });

        // Set initial position and opacity
        gsap.set(".desktop-video", {
          opacity: 1,
          scale: 1,
          x: 0,
          y: 0,
        });

        // Add a subtle parallax effect on scroll with improved visibility control
        gsap.to(".desktop-video", {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom", // Start animation when top of section hits bottom of viewport
            end: "bottom top", // End animation when bottom of section hits top of viewport
            scrub: 0.5, // Smooth scrolling effect
            toggleActions: "play none none reverse", // Play when entering, reverse when leaving
          },
          y: 40 * videoScale, // Reduced vertical movement
          x: -20 * videoScale, // Slight leftward movement
          scale: videoScale * 0.95, // Slight scale reduction
          opacity: 0.85, // Keep good opacity throughout
          ease: "power1.out", // Smoother easing
        });
      });
    }, sectionRef); // Scope the context to our section

    // Return cleanup function
    return () => {
      // This will clean up all animations created in the context
      ctx.revert();
    };
  }, []);

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
            <div className="w-full lg:w-3/4 z-10">
              <h1
                ref={headingRef}
                className="text-6xl lg:text-9xl md:text-6xl font-medium lg:font-medium leading-none mb-6"
              >
                <span className="word">We</span>{" "}
                <span className="word">turn</span>{" "}
                <span className="word">dreams</span>{" "}
                <span className="word">into</span>
                <br />
                <span className="word">Digital</span>{" "}
                <span className="word">Reality</span>
              </h1>

              <p
                ref={paragraphRef}
                className="hero-paragraph text-md mb-8 text-custom-blue max-w-xl mx-auto"
              >
                Looking to build payments into your software? Aria fixes that.
                Pick the payment features you need for happy users and booming
                revenue.
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

            {/* Video for small screens (below md breakpoint) */}
            <div className="w-full block md:hidden">
              <video
                ref={videoRef}
                className="mobile-video w-full h-auto object-contain"
                style={{
                  filter:
                    "brightness(0) saturate(100%) invert(50%) sepia(40%) saturate(900%) hue-rotate(200deg) brightness(80%) contrast(100%)",
                  opacity: 1,
                }}
                autoPlay
                muted
                loop
                playsInline
                src="/airplane.mp4"
              >
                Your browser does not support the video tag.
              </video>
            </div>

            {/* Video for medium and large screens */}
            <div className="absolute right-0 mt-36 top-24 w-2/5 h-full hidden md:block overflow-hidden">
              {/* Apply clip-path and mask for hard containment */}
              <div
                className="relative w-full h-full flex items-center justify-end overflow-hidden"
                style={{
                  clipPath: "inset(0 0 0 10%)", // Hard clipping from the left side
                  maskImage:
                    "linear-gradient(to right, black 5%, black 65%, transparent 100%)",
                  WebkitMaskImage:
                    "linear-gradient(to right, black 5%, black 65%, transparent 100%)",
                }}
              >
                <video
                  className="desktop-video h-auto object-contain"
                  style={{
                    filter:
                      "brightness(0) saturate(100%) invert(50%) sepia(40%) saturate(900%) hue-rotate(200deg) brightness(80%) contrast(100%)",
                    opacity: 1,
                    width: "85%",
                    marginRight: "15%",
                    maxHeight: "80%",
                  }}
                  autoPlay
                  muted
                  loop
                  playsInline
                  src="/airplane.mp4"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
