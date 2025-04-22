"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import {
  create3DTransition,
  createDepthStagger,
} from "../utils/ScrollAnimations";
import "../styles/animations.css";

import Group5Image from "../assets/Group5.png";

gsap.registerPlugin(ScrollTrigger);

// Projects data moved outside component for better organization
const projects = [
  {
    id: 1,
    image: Group5Image,
    title: "Xtream E-sport Arena",
    description: "Gaming arena",
    links: ["Design", "Web Development"],
  },
  {
    id: 2,
    image:
      "https://cdn.sanity.io/images/u1e81n72/production/5addc75bef476305d7ee2f1c8238a15685203c28-1200x1600.jpg/Hololens.jpg?q=95&fit=clip&auto=format&w=1439",
    title: "Hololens Project",
    description: "Augmented Reality Experience",
    links: ["Design", "AR Development"],
  },
  {
    id: 3,
    image:
      "https://cdn.sanity.io/images/u1e81n72/production/5addc75bef476305d7ee2f1c8238a15685203c28-1200x1600.jpg/Hololens.jpg?q=95&fit=clip&auto=format&w=1439",
    title: "Future Tech Showcase",
    description: "Technology Expo",
    links: ["UI/UX", "Prototyping"],
  },
];

const SelectedWorks = () => {
  const [currentImage, setCurrentImage] = useState(1);

  // Reference to the header element
  const headerRef = useRef(null);

  // Refs instead of DOM queries
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const projectRefs = useRef([]);
  const scrollContainerRef = useRef(null);
  const textSectionRef = useRef(null);
  const imageSectionRef = useRef(null);

  // Add missing variables
  const cleanupFunctions = [];
  let styleInterval;
  let slowInterval;
  let handleScroll = () => {};
  let observer = new MutationObserver(() => {});
  const ctx = gsap.context(() => {});

  // Direct header styling function
  const applyHeaderStyle = () => {
    if (!headerRef.current) {
      headerRef.current = document.querySelector("header");
      if (!headerRef.current) return false;
    }

    // Apply purple theme to header directly
    headerRef.current.style.backgroundColor = "var(--custom-blue)";
    headerRef.current.style.color = "white";

    // Find and update nav links
    const navLinks = headerRef.current.querySelectorAll("a");
    navLinks.forEach((link) => {
      link.style.color = "white";
    });

    // Style any buttons in the header
    const headerButtons = headerRef.current.querySelectorAll("button");
    headerButtons.forEach((button) => {
      if (button.classList.contains("mobile-menu-button")) {
        // Style the hamburger menu differently if needed
        button.style.color = "white";
      }
    });

    console.log("Direct header styling successfully applied in SelectedWorks");
    return true;
  };

  // Apply header style immediately on mount and whenever section is in view
  useEffect(() => {
    if (typeof window !== "undefined") {
      const selectedWorksSection = document.querySelector(".selected-works-section");
      const servicesSection = document.querySelector(".services-section");
      const titleLetters = document.querySelectorAll(".title-letter");
      const lastProject = projectRefs.current[projectRefs.current.length - 1];
      
      if (!selectedWorksSection || !servicesSection) return;
      
      // IMPORTANT: Remove all GSAP setup for the section itself
      // This will now be handled by the parent container
      
      // Title animation only
      if (titleLetters.length > 0) {
        gsap.set(titleLetters, { y: 160 });

        const titleAnimation = gsap.to(titleLetters, {
          y: 0,
          duration: 1,
          stagger: 0.04,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".selected-works-section",
            start: "top 80%",
            toggleActions: "play none none none",
            onEnter: applyHeaderStyle, // Apply header style when animation triggers
          },
        });

        cleanupFunctions.push(() => {
          if (titleAnimation.scrollTrigger) {
            titleAnimation.scrollTrigger.kill();
          }
          titleAnimation.kill();
        });
      }
      
      // Update current image based on scroll position
      projectRefs.current.forEach((projectElement, index) => {
        if (projectElement) {
          const trigger = ScrollTrigger.create({
            trigger: projectElement,
            start: "top center",
            end: "bottom center",
            onEnter: () => {
              setCurrentImage(index + 1);
              applyHeaderStyle(); // Apply header style when switching projects
            },
            onEnterBack: () => {
              setCurrentImage(index + 1);
              applyHeaderStyle(); // Apply header style when switching projects
            },
          });

          cleanupFunctions.push(() => trigger.kill());
        }
      });

      // Enhanced fade-out animation when approaching Service section
      const fadeOutTrigger = ScrollTrigger.create({
        trigger: servicesSection,
        start: "top bottom-=10%", // Start a bit before the service section comes into view
        end: "top 60%", // End a bit earlier
        scrub: 0.5, // Faster, more responsive scrub
        invalidateOnRefresh: true, // Recalculate on window resize
        preventOverlaps: true, // Prevent conflicts with other animations
        onUpdate: (self) => {
          // Create a smooth fade-out effect without conflicting with other animations
          if (self.progress > 0) {
            gsap.to(selectedWorksSection, {
              opacity: Math.max(0.1, 1 - self.progress), // Never go completely invisible
              duration: 0.2, // Quicker updates
              ease: "power1.out", // Smoother easing
              overwrite: "auto", // Prevent animation conflicts
            });
          }
        },
      });

      cleanupFunctions.push(() => fadeOutTrigger.kill());

      // Apply depth effect to project cards
      if (projectRefs.current.length > 0) {
        const depthCleanup = createDepthStagger({
          elements: projectRefs.current.slice(0, -1), // All but the last project
          triggerElement: lastProject,
          containerElement: selectedWorksSection,
        });

        cleanupFunctions.push(depthCleanup);
      }

      // Apply 3D transition between work section and services section
      if (
        lastProject &&
        scrollContainerRef.current &&
        textSectionRef.current &&
        imageSectionRef.current
      ) {
        const transitionCleanup = create3DTransition({
          sourceSection: selectedWorksSection,
          targetSection: servicesSection,
          triggerElement: lastProject,
          contentElements: [
            {
              element: scrollContainerRef.current,
              transformProps: {
                rotateX: 25,
                scale: 0.8,
                y: -150,
                opacity: 0.7,
                boxShadow: "0 30px 50px rgba(0,0,0,0.4)",
              },
            },
            {
              element: textSectionRef.current,
              transformProps: {
                x: -200,
                rotateY: -15,
                opacity: 0,
              },
            },
            {
              element: imageSectionRef.current,
              transformProps: {
                x: 200,
                rotateY: 15,
                opacity: 0,
              },
            },
          ],
        });

        cleanupFunctions.push(transitionCleanup);
      }

      // Use matchMedia for responsive animations
      const mm = gsap.matchMedia();

      mm.add("(min-width: 768px)", () => {
        // Desktop-specific animations
        gsap.set(".text-section", { display: "flex" });
        return () => {
          // Cleanup for this media query
        };
      });

      mm.add("(max-width: 767px)", () => {
        // Mobile-specific animations
        gsap.set(".text-section", { display: "none" });
        return () => {
          // Cleanup for this media query
        };
      });

      cleanupFunctions.push(() => mm.revert());
    }

    // Return cleanup function
    return () => {
      // Execute all cleanup functions
      cleanupFunctions.forEach(
        (cleanup) => typeof cleanup === "function" && cleanup()
      );
      // Clear all intervals and listeners
      clearInterval(styleInterval);
      clearTimeout(slowInterval);
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
      // Revert GSAP context
      ctx.revert();
    };
  }, []);

  return (
    <section
      className="selected-works-section opacity-100 pt-40"
      data-bg="var(--custom-blue)"
      data-text="white"
      data-button-bg="white"
      data-button-text="var(--custom-blue)"
      data-nav-text="white"
      style={{
        zIndex: 30, // Higher z-index to ensure section stands out
        backgroundColor: "var(--custom-blue)", // Explicitly set background color
      }}
    >
      {/* Section overlay for enhanced transitions */}
      <div className="section-overlay" id="works-overlay"></div>

      {/* Title Section */}
      <div className="title-container relative left-4 md:left-8 lg:left-8 z-10">
        <div className="overflow-hidden inline-block" ref={titleRef}>
          <h1 className="text-7xl md:text-9xl lg:text-9xl xs:text-6xl font-bold text-custom-pink">
            {Array.from("SELECTED WORKS").map((letter, index) => (
              <span key={index} className="title-letter inline-block">
                {letter === " " ? "\u00A0" : letter}
              </span>
            ))}
          </h1>
        </div>
      </div>

      <div
        ref={scrollContainerRef}
        className="scroll-container flex flex-col md:flex-row mt-40 transform-gpu"
      >
        {/* Left Fixed Text - Hidden on mobile */}
        <div
          ref={textSectionRef}
          className="text-section w-full md:w-1/2 sticky top-0 h-screen hidden md:flex items-center transform-gpu"
        >
          <div className="text-content px-8">
            <div className="text-super-large font-medium text-custom-pink">
              {String(currentImage).padStart(2, "0")}
            </div>
          </div>
        </div>

        {/* Right Scrolling Images with Details - Full width on mobile */}
        <div
          ref={imageSectionRef}
          className="image-section w-full md:w-1/2 transform-gpu"
        >
          <div className="images space-y-20 px-8 md:px-6 lg:px-6 md:pr-16 pb-20">
            {projects.map((project, index) => (
              <div
                key={project.id}
                className="scroll-item space-y-6 border-custom-pink pb-8 transform-gpu"
                ref={(el) => (projectRefs.current[index] = el)}
              >
                {/* Image */}
                {typeof project.image === "string" ? (
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={1200}
                    height={800}
                    className="w-full h-auto rounded-md object-cover"
                    unoptimized={project.image.startsWith("https://")}
                  />
                ) : (
                  <Image
                    src={project.image}
                    alt={project.title}
                    className="w-full h-auto rounded-md"
                    priority
                  />
                )}

                {/* Title and Info */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mt-4 gap-4">
                  <div>
                    <h2 className="text-md md:text-xl lg:text-xl font-light text-custom-pink">
                      {project.description}
                    </h2>
                    <h3 className="text-2xl md:text-3xl font-bold text-custom-pink">
                      {project.title}
                    </h3>
                  </div>

                  {/* Links */}
                  <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
                    {project.links.map((link, index) => (
                      <button
                        key={index}
                        className="px-3 py-1 sm:px-4 sm:py-2 border-2 border-custom-pink text-custom-pink rounded-3xl bg-transparent hover:bg-custom-pink hover:text-custom-blue transition text-sm sm:text-base"
                      >
                        {link}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SelectedWorks;
