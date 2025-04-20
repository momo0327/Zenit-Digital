"use client";
import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import logo from "../assets/logo.png";
gsap.registerPlugin(ScrollTrigger);

// TextReveal Component for animated text
const TextReveal = ({
  text,
  className = "",
  textClassName = "",
  tag = "div",
  splitLines = false,
  staggerDelay = 0.04,
  duration = 1,
  onComplete = () => {},
}) => {
  const containerRef = useRef(null);
  const TextTag = tag;

  // Split text into lines if requested
  const lines = splitLines
    ? text.split(" ").reduce((acc, word) => {
        if (acc.length === 0) return [word];
        const lastLine = acc[acc.length - 1].split(" ");
        if (lastLine.length > 3) {
          return [...acc, word];
        } else {
          acc[acc.length - 1] += " " + word;
          return acc;
        }
      }, [])
    : [text];

  useEffect(() => {
    // Get all letter elements
    const container = containerRef.current;
    if (!container) return;

    const letters = container.querySelectorAll(".reveal-letter");

    // Using a timeline for the animation
    const tl = gsap.timeline({
      onComplete: onComplete,
    });

    // Initial setup - hide letters below their position
    tl.set(letters, { y: 60, opacity: 0 }).to(letters, {
      y: 0,
      opacity: 1,
      duration: duration,
      stagger: staggerDelay,
      ease: "power3.out",
    });

    return () => {
      // Clean up the timeline
      tl.kill();
    };
  }, [text, duration, staggerDelay, onComplete]);

  return (
    <div ref={containerRef} className={className}>
      <TextTag className={textClassName}>
        {lines.map((line, lineIndex) => (
          <div key={`line-${lineIndex}`} className="overflow-hidden">
            {Array.from(line).map((letter, letterIndex) => (
              <span
                key={`letter-${lineIndex}-${letterIndex}`}
                className="reveal-letter inline-block"
              >
                {letter === " " ? "\u00A0" : letter}
              </span>
            ))}
          </div>
        ))}
      </TextTag>
    </div>
  );
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showMenuContent, setShowMenuContent] = useState(false);
  const menuOverlayRef = useRef(null);
  const menuContentRef = useRef(null);
  const contactInfoRef = useRef(null);
  const navbarRef = useRef(null);
  const menuButtonRef = useRef(null);

  const [navStyles, setNavStyles] = useState({
    bgColor: "white",
    textColor: "black",
    buttonBgColor: "var(--custom-blue)",
    buttonTextColor: "white",
    menuBgColor: "var(--custom-pink)",
    menuTextColor: "var(--custom-blue)",
  });

  const toggleMenu = () => {
    if (!isMenuOpen) {
      // Open the menu with animation using a timeline
      setIsMenuOpen(true);

      // Get button position for animation origin
      const menuButton = menuButtonRef.current;
      const buttonRect = menuButton.getBoundingClientRect();
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      // Create a timeline for menu reveal
      const tl = gsap.timeline({
        onComplete: () => setShowMenuContent(true),
      });

      // Add animations to the timeline
      tl.set(menuOverlayRef.current, {
        clipPath: `circle(0px at ${buttonRect.left + buttonRect.width / 2}px ${
          buttonRect.top + buttonRect.height / 2
        }px)`,
        opacity: 1,
      }).to(menuOverlayRef.current, {
        clipPath: `circle(${Math.sqrt(
          windowWidth * windowWidth + windowHeight * windowHeight
        )}px at ${buttonRect.left + buttonRect.width / 2}px ${
          buttonRect.top + buttonRect.height / 2
        }px)`,
        duration: 0.8,
        ease: "power3.out",
      });
    } else {
      // Hide text first
      setShowMenuContent(false);

      // After a small delay, animate the circle closed with a timeline
      setTimeout(() => {
        const menuButton = menuButtonRef.current;
        const buttonRect = menuButton.getBoundingClientRect();

        // Create a timeline for menu close
        const tl = gsap.timeline({
          onComplete: () => setIsMenuOpen(false),
        });

        // Add close animation to the timeline
        tl.to(menuOverlayRef.current, {
          clipPath: `circle(0px at ${
            buttonRect.left + buttonRect.width / 2
          }px ${buttonRect.top + buttonRect.height / 2}px)`,
          duration: 0.6,
          ease: "power3.in",
        });
      }, 300);
    }
  };

  // Helper function to determine menu colors based on navbar colors
  const getMenuColors = (bgColor, textColor) => {
    // For blue/pink combination
    if (
      bgColor.includes("custom-blue") ||
      textColor.includes("custom-blue") ||
      bgColor.includes("custom-pink") ||
      textColor.includes("custom-pink")
    ) {
      return {
        menuBgColor: "var(--custom-pink)",
        menuTextColor: "var(--custom-blue)",
      };
    }
    // For green/light-green combination
    else if (
      bgColor.includes("custom-green") ||
      textColor.includes("custom-green") ||
      bgColor.includes("light-green") ||
      textColor.includes("light-green")
    ) {
      return {
        menuBgColor: "var(--custom-lightGreen)",
        menuTextColor: "var(--custom-green)",
      };
    }
    // Default fallback
    return {
      menuBgColor: textColor,
      menuTextColor: bgColor,
    };
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Create a gsap context to manage animations and cleanup
      const ctx = gsap.context(() => {
        // Use matchMedia to handle responsive behavior
        const mm = gsap.matchMedia();

        // Get references to DOM elements
        const navbar = navbarRef.current;
        const menuButton = menuButtonRef.current;
        const desktopButton = document.querySelector(".desktop-button");
        const sections = document.querySelectorAll("section");

        // Initial animation for all screen sizes
        mm.add("(min-width: 0px)", () => {
          // GSAP Animation for Navbar using a timeline
          const navTl = gsap.timeline();
          navTl
            .set(navbar, {
              y: -100,
              opacity: 0,
            })
            .to(navbar, {
              y: 0,
              opacity: 1,
              delay: 0.8,
              duration: 2,
              ease: "power4.out",
            });

          if (menuButton) {
            // GSAP Animation for Menu Button using the same timeline
            navTl
              .set(
                menuButton,
                {
                  scale: 0,
                  opacity: 0,
                },
                0
              )
              .to(
                menuButton,
                {
                  scale: 1,
                  opacity: 1,
                  delay: 1.2,
                  duration: 1.5,
                  ease: "elastic.out(1, 0.3)",
                },
                0
              );
          }

          // Consolidate section ScrollTriggers by grouping them
          // Define the update function that will be used for all sections
          const updateNavStyles = (index, entering = true) => {
            // Get the current section or the previous one if leaving
            const currentSection = entering
              ? sections[index]
              : sections[index - 1];
            if (!currentSection) return;

            const bgColor = currentSection.getAttribute("data-bg") || "white";
            const textColor =
              currentSection.getAttribute("data-text") || "black";
            const buttonBgColor =
              currentSection.getAttribute("data-button-bg") ||
              "var(--custom-blue)";
            const buttonTextColor =
              currentSection.getAttribute("data-button-text") || "white";

            const { menuBgColor, menuTextColor } = getMenuColors(
              bgColor,
              textColor
            );

            setNavStyles({
              bgColor,
              textColor,
              buttonBgColor,
              buttonTextColor,
              menuBgColor,
              menuTextColor,
            });

            if (navbar) {
              gsap.to(navbar, {
                backgroundColor: bgColor,
                color: textColor,
                duration: 0.3,
              });
            }

            if (menuButton) {
              gsap.to(menuButton, {
                backgroundColor: entering ? buttonBgColor : buttonBgColor,
                color: entering ? buttonTextColor : buttonTextColor,
                duration: 0.3,
              });
            }

            if (desktopButton) {
              gsap.to(desktopButton, {
                backgroundColor: entering ? buttonBgColor : buttonBgColor,
                color: entering ? buttonTextColor : buttonTextColor,
                duration: 0.3,
              });
            }
          };

          // Create consolidated ScrollTrigger for color changes
          // Instead of creating one ScrollTrigger per section
          Array.from(sections).forEach((section, index) => {
            ScrollTrigger.create({
              trigger: section,
              start: "top center",
              end: "bottom center",
              onEnter: () => updateNavStyles(index, true),
              onLeaveBack: () => updateNavStyles(index, false),
            });
          });
        });

        // Return the cleanup function
        return () => {
          // Clean up all ScrollTriggers and animations
          mm.revert();
          ctx.revert(); // This will clean up all GSAP animations created in this context
        };
      });
    }
  }, []);

  // Animation timing for contact info
  const handleMenuItemsComplete = () => {
    // Animate contact info after menu items animation completes using a timeline
    const tl = gsap.timeline();
    tl.fromTo(
      contactInfoRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
    );
  };

  const menuItems = [
    "Case",
    "Tjänster",
    "Om oss",
    "Kontakt",
    "Karriär",
    "Nyheter",
  ];

  return (
    <>
      {/* Desktop Navbar */}
      <nav
        ref={navbarRef}
        className="navbar w-full flex items-center px-6 py-4 z-40 transition-colors duration-500 bg-white md:fixed md:top-0 md:left-0"
      >
        {/* Logo - Mobile center, desktop left */}
        <div className="flex flex-1 justify-center md:justify-start items-center gap-2 z-50">
          <Image src={logo} alt="Zenit Logo" width={20} height={20} />
          <span className="font-bold text-md">ZENIT</span>
        </div>

        {/* Centered Nav Links - Desktop Only */}
        <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
          <ul className="flex gap-10">
            <li className="hover:text-custom-blue cursor-pointer">About</li>
            <li className="hover:text-custom-blue cursor-pointer">Cases</li>
            <li className="hover:text-custom-blue cursor-pointer">Services</li>
          </ul>
        </div>

        {/* Button - Right */}
        <div className="hidden md:flex items-center ml-auto z-50">
          <button className="desktop-button px-6 py-2 bg-custom-blue text-white rounded-2xl hover:bg-gray-800 transition-colors duration-500">
            Let&apos;s Talk
          </button>
        </div>
      </nav>

      {/* Circular Menu Button - Visible only on small screens */}
      <button
        ref={menuButtonRef}
        onClick={toggleMenu}
        className="menu-button md:hidden fixed bottom-6 right-6 w-16 h-16 bg-custom-blue text-white rounded-full flex items-center justify-center z-50 shadow-lg transition-all duration-300"
        style={{
          backgroundColor: isMenuOpen
            ? navStyles.menuTextColor
            : navStyles.buttonBgColor,
          color: isMenuOpen ? navStyles.menuBgColor : navStyles.buttonTextColor,
        }}
      >
        {isMenuOpen ? (
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 8h16M4 16h16"
            />
          </svg>
        )}
      </button>

      {/* Mobile Menu Overlay with Animation */}
      <div
        ref={menuOverlayRef}
        className="fixed inset-0 md:hidden pointer-events-none"
        style={{
          backgroundColor: navStyles.menuBgColor,
          color: navStyles.menuTextColor,
          zIndex: 45,
          opacity: 0,
        }}
      >
        {/* Menu Content - Only render when needed */}
        {isMenuOpen && (
          <div
            ref={menuContentRef}
            className="pl-12 pr-6 pt-32 flex-grow flex flex-col h-full pointer-events-auto"
          >
            {showMenuContent && (
              <>
                {/* Menu Items with TextReveal Effect */}
                <ul className="text-5xl font-medium flex flex-col gap-6">
                  {menuItems.map((item, index) => (
                    <li
                      key={index}
                      className="cursor-pointer transition-colors duration-300 hover:opacity-70"
                    >
                      <TextReveal
                        text={item}
                        staggerDelay={0.03}
                        duration={0.8}
                        onComplete={
                          index === menuItems.length - 1
                            ? handleMenuItemsComplete
                            : undefined
                        }
                      />
                    </li>
                  ))}
                </ul>

                {/* Contact Info - Will be animated after menu items */}
                <div ref={contactInfoRef} className="mt-auto mb-12 opacity-0">
                  <div className="text-lg mb-3">hello@zenitdigital.se</div>
                  <div className="text-lg mb-3">08-31 70 00</div>
                  <div className="text-lg">LinkedIn</div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Navbar;
