'use client';
import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const navbar = document.querySelector(".navbar");
      const button = document.querySelector(".navbar button");  // Target the button
      const sections = document.querySelectorAll("section");

      // GSAP Animation for Navbar
      gsap.set(navbar, {
        y: -100,  // Initially position navbar above viewport
        opacity: 0,
      });

      gsap.to(navbar, {
        y: 0, // Animate navbar to original position
        opacity: 1, // Make navbar visible
        delay: 0.8, // Add delay to sync with other animations
        duration: 2,
        ease: "power4.out", // Smooth easing
      });

      // ScrollTrigger for Navbar and Button Color Change
      sections.forEach((section, index) => {
        const bgColor = section.getAttribute("data-bg") || "white";
        const textColor = section.getAttribute("data-text") || "black";
        const buttonBgColor = section.getAttribute("data-button-bg") || "var(--custom-blue)";
        const buttonTextColor = section.getAttribute("data-button-text") || "white";
        const navTextColor = section.getAttribute("data-nav-text") || "black";

        ScrollTrigger.create({
          trigger: section,
          start: "top center",
          end: "bottom center",
          onEnter: () => {
            // Change navbar color based on current section
            if (navbar) {
              navbar.style.backgroundColor = bgColor;
              navbar.style.color = textColor;
              navbar.querySelectorAll("li, .logo").forEach(el => {
                el.style.color = navTextColor;
              });
            }
        
            if (button) {
              button.style.backgroundColor = buttonBgColor;
              button.style.color = buttonTextColor;
            }
          },
          onLeaveBack: () => {
            // Restore previous section's colors instead of setting white
            const prevSection = sections[index - 1];
            if (prevSection) {
              const prevBgColor = prevSection.getAttribute("data-bg") || "white";
              const prevTextColor = prevSection.getAttribute("data-text") || "black";
              const prevButtonBgColor = prevSection.getAttribute("data-button-bg") || "var(--custom-blue)";
              const prevButtonTextColor = prevSection.getAttribute("data-button-text") || "white";
              const prevNavTextColor = prevSection.getAttribute("data-nav-text") || "white";
        
              if (navbar) {
                navbar.style.backgroundColor = prevBgColor;
                navbar.style.color = prevTextColor;
                navbar.querySelectorAll("li, .logo").forEach(el => {
                  el.style.color = prevNavTextColor;
                });
              }
        
              if (button) {
                button.style.backgroundColor = prevButtonBgColor;
                button.style.color = prevButtonTextColor;
              }
            }
          }
        });
      });
    }
  }, []);

  return (
    <nav className="navbar fixed top-0 left-0 w-full flex justify-between items-center px-6 py-4 z-50 transition-colors duration-500 bg-white">
      <div className="logo font-bold text-lg">ZENIT</div>
      <ul className="flex gap-6">
        <li className="hover:text-custom-blue cursor-pointer">About</li>
        <li className="hover:text-custom-blue cursor-pointer">Cases</li>
        <li className="hover:text-custom-blue cursor-pointer">Services</li>
      </ul>
      <button className="px-4 py-2 bg-custom-blue text-white rounded-lg hover:bg-gray-800">
        Let's Talk
      </button>
    </nav>
  );
};

export default Navbar;
