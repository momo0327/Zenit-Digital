"use client";
import React, { useRef, useState } from "react";
import { gsap } from "gsap";
import { useNavigation } from "./useNavigation";
import TextReveal from "../TextReveal";

const MobileNav = ({ navStyles }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showMenuContent, setShowMenuContent] = useState(false);
  const menuOverlayRef = useRef(null);
  const menuContentRef = useRef(null);
  const contactInfoRef = useRef(null);
  const menuButtonRef = useRef(null);

  const { navigateTo } = useNavigation();

  // Menu items with corresponding routes
  const menuItems = [
    { label: "Case", path: "/cases" },
    { label: "Tjänster", path: "/services" },
    { label: "Om oss", path: "/about" },
    { label: "Kontakt", path: "/booking" },
    { label: "Karriär", path: "/career" },
    { label: "Nyheter", path: "/news" },
  ];

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

  return (
    <>
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
                      onClick={() =>
                        navigateTo(item.path, isMenuOpen, toggleMenu)
                      }
                    >
                      <TextReveal
                        text={item.label}
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
                  <div className="text-lg mb-3">
                    <a
                      href="mailto:hello@zenitdigital.se"
                      className="hover:opacity-70"
                    >
                      hello@zenitdigital.se
                    </a>
                  </div>
                  <div className="text-lg mb-3">
                    <a href="tel:0831-7000" className="hover:opacity-70">
                      08-31 70 00
                    </a>
                  </div>
                  <div className="text-lg">
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:opacity-70"
                    >
                      LinkedIn
                    </a>
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default MobileNav;
