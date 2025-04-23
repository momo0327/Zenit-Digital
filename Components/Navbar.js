"use client";
import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import logo from "../assets/logo.png";
import Link from "next/link";
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

  const updateNavStyles = (index, entering = true) => {
    // Get the current section or the previous one if leaving
    const sections = document.querySelectorAll("section");
    const currentSection = entering ? sections[index] : sections[index - 1];

    if (!currentSection) return;

    const bgColor = currentSection.getAttribute("data-bg") || "white";
    const textColor = currentSection.getAttribute("data-text") || "black";
    const buttonBgColor =
      currentSection.getAttribute("data-button-bg") || "var(--custom-blue)";
    const buttonTextColor =
      currentSection.getAttribute("data-button-text") || "white";
    const navText = currentSection.getAttribute("data-nav-text") || textColor;

    // Get menu colors based on section colors
    const { menuBgColor, menuTextColor } = getMenuColors(bgColor, textColor);

    // Update state with new styles
    setNavStyles({
      bgColor,
      textColor,
      buttonBgColor,
      buttonTextColor,
      menuBgColor,
      menuTextColor,
    });

    // Apply styles directly to elements
    const navbar = navbarRef.current;
    const menuButton = menuButtonRef.current;
    const desktopButton = document.querySelector(".desktop-button");

    if (navbar) {
      gsap.to(navbar, {
        backgroundColor: bgColor,
        color: navText,
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

    if (desktopButton && !desktopButton.classList.contains("keep-purple")) {
      gsap.to(desktopButton, {
        backgroundColor: entering ? buttonBgColor : buttonBgColor,
        color: entering ? buttonTextColor : buttonTextColor,
        duration: 0.3,
      });
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Create a proper GSAP context for better cleanup
      const ctx = gsap.context(() => {
        // Use matchMedia for responsive handling
        const mm = gsap.matchMedia();

        mm.add("(min-width: 0px)", () => {
          // Get references to DOM elements
          const navbar = navbarRef.current;
          const menuButton = menuButtonRef.current;
          const sections = document.querySelectorAll("section");

          // Initial animation for navbar
          const navTl = gsap.timeline();
          navTl.set(navbar, { y: -100, opacity: 0 }).to(navbar, {
            y: 0,
            opacity: 1,
            delay: 0.8,
            duration: 2,
            ease: "power4.out",
          });

          // Menu button animation
          if (menuButton) {
            navTl.set(menuButton, { scale: 0, opacity: 0 }, 0).to(
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

          // ScrollTrigger setup with consolidated approach
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
      }, navbarRef);

      // Clean return function
      return () => ctx.revert();
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

  useEffect(() => {
    // Find the "Let's Talk" button and ensure it keeps its purple styling
    const talkButton = document.querySelector(".desktop-button");

    if (talkButton) {
      // Add a specific class to target this button
      talkButton.classList.add("keep-purple");

      // Set initial purple color
      talkButton.style.backgroundColor = "rgb(168, 162, 246)";
      talkButton.style.color = "#ffffff";
    }

    // Scroll handling logic
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const header =
        document.querySelector("header") || document.querySelector("nav");

      if (header) {
        if (scrollPosition > 50) {
          header.classList.add("scrolled");
        } else {
          header.classList.remove("scrolled");
        }
      }

      // Always ensure the button stays purple regardless of scroll position
      const purpleButton = document.querySelector(".keep-purple");
      if (purpleButton) {
        purpleButton.style.backgroundColor = "rgb(168, 162, 246)";
        purpleButton.style.color = "#ffffff";
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Run once to set initial state
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
            <li>
              <Link
                href="/about"
                className="hover:text-custom-blue cursor-pointer"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/cases"
                className="hover:text-custom-blue cursor-pointer"
              >
                Cases
              </Link>
            </li>
            <li>
              <Link
                href="/services"
                className="hover:text-custom-blue cursor-pointer"
              >
                Services
              </Link>
            </li>
          </ul>
        </div>

        {/* Button - Right */}
        <Link
          href="/contact"
          className="hidden md:flex items-center ml-auto z-50"
        >
          <button className="desktop-button px-6 py-2 text-white rounded-2xl hover:bg-gray-800 transition-colors duration-500">
            Let&apos;s Talk
          </button>
        </Link>
      </nav>

      {/* Circular Menu Button - Visible only on small screens */}
      <button
        ref={menuButtonRef}
        onClick={toggleMenu}
        aria-expanded={isMenuOpen}
        aria-controls="mobile-menu"
        aria-label={
          isMenuOpen ? "Close navigation menu" : "Open navigation menu"
        }
        className="menu-button md:hidden fixed bottom-6 right-6 w-16 h-16 rounded-full flex items-center justify-center z-50 shadow-lg transition-all duration-300"
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
        id="mobile-menu"
        ref={menuOverlayRef}
        role="navigation"
        aria-hidden={!isMenuOpen}
        aria-label="Mobile navigation menu"
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
