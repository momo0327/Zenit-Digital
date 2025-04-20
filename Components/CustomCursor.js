"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useCursor } from "../utils/CursorContext";

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const followerRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const { cursorType } = useCursor();

  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;

    if (!cursor || !follower) return;

    // Initial position off screen
    gsap.set(cursor, { xPercent: -50, yPercent: -50 });
    gsap.set(follower, { xPercent: -50, yPercent: -50 });

    // Variables for mouse position
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let followerX = 0;
    let followerY = 0;

    // Speed factor for cursor following (lower = smoother)
    const cursorSpeed = 0.2;
    const followerSpeed = 0.1;

    // Animation loop
    const animate = () => {
      // Calculate new positions with easing
      cursorX += (mouseX - cursorX) * cursorSpeed;
      cursorY += (mouseY - cursorY) * cursorSpeed;
      followerX += (mouseX - followerX) * followerSpeed;
      followerY += (mouseY - followerY) * followerSpeed;

      // Apply new positions
      gsap.set(cursor, { x: cursorX, y: cursorY });
      gsap.set(follower, { x: followerX, y: followerY });

      // Continue animation loop
      requestAnimationFrame(animate);
    };

    // Start animation
    animate();

    // Track mouse position
    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    // Handle mouse click
    const onMouseDown = () => {
      setIsClicked(true);
      gsap.to(cursor, {
        scale: 0.8,
        duration: 0.2,
        backgroundColor: "#0FB190",
      });
      gsap.to(follower, {
        scale: 0.8,
        duration: 0.2,
        borderColor: "#0FB190",
        borderWidth: 2,
      });
    };

    const onMouseUp = () => {
      setIsClicked(false);
      gsap.to(cursor, {
        scale: 1,
        duration: 0.2,
        backgroundColor: isHovering
          ? "rgba(164, 148, 243, 0.8)"
          : "rgba(164, 148, 243, 1)",
      });
      gsap.to(follower, {
        scale: 1,
        duration: 0.2,
        borderColor: "rgba(164, 148, 243, 1)",
        borderWidth: 1,
      });
    };

    // Apply magnetic effect on interactive elements
    const setupMagneticElements = () => {
      const magneticElements = document.querySelectorAll(
        "button, a, input[type='button'], input[type='submit'], .magnetic"
      );

      magneticElements.forEach((element) => {
        element.addEventListener("mouseenter", () => {
          setIsHovering(true);
          gsap.to(cursor, {
            width: 12,
            height: 12,
            backgroundColor: "rgba(164, 148, 243, 0.8)",
            duration: 0.3,
          });
          gsap.to(follower, {
            width: 40,
            height: 40,
            borderColor: "rgba(164, 148, 243, 0.5)",
            duration: 0.3,
          });
        });

        element.addEventListener("mouseleave", () => {
          setIsHovering(false);
          gsap.to(cursor, {
            width: 8,
            height: 8,
            backgroundColor: "rgba(164, 148, 243, 1)",
            duration: 0.3,
          });
          gsap.to(follower, {
            width: 32,
            height: 32,
            borderColor: "rgba(164, 148, 243, 1)",
            duration: 0.3,
          });
        });

        element.addEventListener("mousemove", () => {
          if (!isHovering) return;

          const rect = element.getBoundingClientRect();
          const elementX = rect.left + rect.width / 2;
          const elementY = rect.top + rect.height / 2;

          // Calculate distance between cursor and element center
          const distX = mouseX - elementX;
          const distY = mouseY - elementY;

          // Apply magnetic effect by slightly pulling cursor toward element
          gsap.to(cursor, {
            x: mouseX - distX * 0.2,
            y: mouseY - distY * 0.2,
            duration: 0.3,
            overwrite: true,
          });

          gsap.to(follower, {
            x: mouseX - distX * 0.3,
            y: mouseY - distY * 0.3,
            duration: 0.5,
            overwrite: true,
          });
        });
      });
    };

    // Setup event listeners
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);
    setupMagneticElements();

    // Make cursor visible when mouse enters window
    const showCursor = () => {
      gsap.to([cursor, follower], { opacity: 1, duration: 0.3 });
    };

    // Hide cursor when mouse leaves window
    const hideCursor = () => {
      gsap.to([cursor, follower], { opacity: 0, duration: 0.3 });
    };

    document.addEventListener("mouseenter", showCursor);
    document.addEventListener("mouseleave", hideCursor);

    // Cleanup function
    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", onMouseUp);
      document.removeEventListener("mouseenter", showCursor);
      document.removeEventListener("mouseleave", hideCursor);
    };
  }, [isHovering, isClicked]);

  // Apply different cursor styles based on cursorType
  useEffect(() => {
    const cursor = cursorRef.current;
    const follower = followerRef.current;

    if (!cursor || !follower) return;

    switch (cursorType) {
      case "button":
        gsap.to(cursor, {
          width: 12,
          height: 12,
          backgroundColor: "#0FB190",
          duration: 0.3,
        });
        gsap.to(follower, {
          width: 40,
          height: 40,
          borderColor: "#0FB190",
          duration: 0.3,
        });
        break;

      case "text":
        gsap.to(cursor, {
          width: 4,
          height: 20,
          borderRadius: "2px",
          backgroundColor: "#A494F3",
          duration: 0.3,
        });
        gsap.to(follower, {
          opacity: 0.5,
          duration: 0.3,
        });
        break;

      case "link":
        gsap.to(cursor, {
          width: 10,
          height: 10,
          backgroundColor: "#A494F3",
          duration: 0.3,
        });
        gsap.to(follower, {
          width: 36,
          height: 36,
          opacity: 0.7,
          borderColor: "#A494F3",
          duration: 0.3,
        });
        break;

      default:
        // Default cursor style when not hovering
        if (!isHovering) {
          gsap.to(cursor, {
            width: 8,
            height: 8,
            borderRadius: "50%",
            backgroundColor: "rgba(164, 148, 243, 1)",
            duration: 0.3,
          });
          gsap.to(follower, {
            width: 32,
            height: 32,
            opacity: 1,
            borderColor: "rgba(164, 148, 243, 1)",
            duration: 0.3,
          });
        }
    }
  }, [cursorType, isHovering]);

  return (
    <>
      {/* Small inner cursor */}
      <div
        ref={cursorRef}
        className="fixed w-2 h-2 bg-custom-pink rounded-full pointer-events-none z-50 mix-blend-difference opacity-0"
        style={{ top: 0, left: 0 }}
      ></div>

      {/* Larger outer cursor */}
      <div
        ref={followerRef}
        className="fixed w-8 h-8 border border-custom-pink rounded-full pointer-events-none z-50 opacity-0"
        style={{ top: 0, left: 0 }}
      ></div>
    </>
  );
};

export default CustomCursor;
