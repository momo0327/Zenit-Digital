"use client";
import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import logo from "../assets/logo.png";
import Link from "next/link";
import { useRouter } from "next/navigation";
import DesktopNav from "./Navigation/DesktopNav";
import MobileNav from "./Navigation/MobileNav";

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  console.log("Navbar component initialized");
  const router = useRouter();
  const navbarRef = useRef(null);

  const [navStyles, setNavStyles] = useState({
    bgColor: "white",
    textColor: "black",
    buttonBgColor: "var(--custom-blue)",
    buttonTextColor: "white",
    menuBgColor: "var(--custom-pink)",
    menuTextColor: "var(--custom-blue)",
  });

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
    const menuButton = document.querySelector(".menu-button");
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
    console.log("Navbar useEffect for ScrollTrigger setup");
    if (typeof window !== "undefined") {
      // Create a proper GSAP context for better cleanup
      const ctx = gsap.context(() => {
        // Use matchMedia for responsive handling
        const mm = gsap.matchMedia();

        mm.add("(min-width: 0px)", () => {
          // Get references to DOM elements
          const navbar = navbarRef.current;
          const menuButton = document.querySelector(".menu-button");
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

  useEffect(() => {
    console.log("Navbar useEffect for button styling");
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
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer">
              <Image src={logo} alt="Zenit Logo" width={20} height={20} />
              <span className="font-bold text-md">ZENIT</span>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <DesktopNav />

        {/* Button - Right */}
        <div className="hidden md:flex items-center ml-auto z-50">
          <button
            onClick={() => router.push("/booking")}
            className="desktop-button px-6 py-2 text-white rounded-2xl hover:bg-gray-800 transition-colors duration-500"
          >
            Let&apos;s Talk
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <MobileNav navStyles={navStyles} />
    </>
  );
};

export default Navbar;
