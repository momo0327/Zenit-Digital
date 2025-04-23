"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";

/**
 * React hook to create a magnetic effect on any element
 *
 * @param {number} strength - The magnetic pull strength (0.1 to 1, default 0.3)
 * @param {number} distance - How far from the element center the effect starts (default: 1 means element radius)
 * @param {number} ease - Animation ease factor (0.1 to 0.5, default 0.2)
 * @returns {Object} The ref to attach to your element
 */
export const useMagneticEffect = (strength = 0.3, distance = 1, ease = 0.2) => {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Make sure the element has position relative or absolute
    if (window.getComputedStyle(element).position === "static") {
      element.style.position = "relative";
    }

    let bounds;
    let centerX;
    let centerY;
    let x = 0;
    let y = 0;

    // Add class for styling from CSS if needed
    element.classList.add("magnetic");

    const calculateBounds = () => {
      bounds = element.getBoundingClientRect();
      centerX = bounds.width / 2;
      centerY = bounds.height / 2;
    };

    const magneticEffect = (e) => {
      const { clientX, clientY } = e;

      // Get element dimensions and center
      calculateBounds();

      // Calculate mouse distance from element center
      const distanceX = clientX - (bounds.left + centerX);
      const distanceY = clientY - (bounds.top + centerY);

      // Calculate the distance as a percentage of element size
      const distancePercentX = distanceX / centerX;
      const distancePercentY = distanceY / centerY;

      // Apply magnetic pull effect
      x = distancePercentX * strength * centerX;
      y = distancePercentY * strength * centerY;

      // Animate the movement
      gsap.to(element, {
        x,
        y,
        duration: ease,
        ease: "power2.out",
      });
    };

    const resetElement = () => {
      // Return to original position
      gsap.to(element, {
        x: 0,
        y: 0,
        duration: ease * 2,
        ease: "elastic.out(1, 0.3)",
      });
    };

    // Initialize calculations
    calculateBounds();

    // Event listeners
    element.addEventListener("mousemove", magneticEffect);
    element.addEventListener("mouseleave", resetElement);
    window.addEventListener("resize", calculateBounds);

    // Cleanup
    return () => {
      element.removeEventListener("mousemove", magneticEffect);
      element.removeEventListener("mouseleave", resetElement);
      window.removeEventListener("resize", calculateBounds);
    };
  }, [strength, distance, ease]);

  return elementRef;
};

/**
 * Usage example:
 *
 * function MyComponent() {
 *   const buttonRef = useMagneticEffect(0.5);
 *
 *   return (
 *     <button ref={buttonRef} className="my-button">
 *       Hover me
 *     </button>
 *   );
 * }
 */