"use client";
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const MainSection = () => {
  const textRef1 = useRef(null);
  const textRef2 = useRef(null);
  const textRef3 = useRef(null);
  const animationIntervalRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Initial animation for all headings
      const headings = document.querySelectorAll(".text-wrapper .main-heading");
      gsap.set(headings, {
        y: 160, // Start hidden below
      });
      gsap.to(headings, {
        y: 0, // Move up into view
        duration: 2.4,
        ease: "power4.inOut",
        delay: 0.0015,
        onComplete: () => {
          // Start the loop after initial animation completes
          // Initial delay of 5 seconds
          setTimeout(() => {
            animateMiddleText();
            // Set up the interval for repeating every 5 seconds
            animationIntervalRef.current = setInterval(() => {
              animateMiddleText();
            }, 5000);
          }, 5000);
        }
      });
    }

    // Cleanup function to clear interval when component unmounts
    return () => {
      if (animationIntervalRef.current) {
        clearInterval(animationIntervalRef.current);
      }
    };
  }, []);

  const animateMiddleText = () => {
    if (!textRef2.current) return;
    
    // Store the original HTML content
    const originalHTML = textRef2.current.innerHTML;
    const originalText = textRef2.current.textContent.trim();
    
    // Clear the current content
    textRef2.current.innerHTML = '';
    
    // Add each character in a span
    originalText.split('').forEach((char) => {
      const charWrapper = document.createElement('span');
      charWrapper.style.display = 'inline-block';
      charWrapper.style.overflow = 'hidden';
      charWrapper.style.verticalAlign = 'top';
      
      const charSpan = document.createElement('span');
      charSpan.textContent = char === ' ' ? '\u00A0' : char; // Use non-breaking space for spaces
      charSpan.style.display = 'inline-block';
      charSpan.className = 'letter';
      
      charWrapper.appendChild(charSpan);
      textRef2.current.appendChild(charWrapper);
    });

    const letters = textRef2.current.querySelectorAll('.letter');
    
    // Create a timeline for the animation
    const timeline = gsap.timeline({
      onComplete: () => {
        // Restore original HTML when animation completes
        textRef2.current.innerHTML = originalHTML;
      }
    });
    
    // Animate each letter with a stagger
    timeline.to(letters, {
      y: 160, // Move each letter down (out of view)
      duration: 0.4,
      stagger: 0.03,
      ease: "power2.in",
    });
    
    timeline.set(letters, {
      y: -160, // Reset position to above (out of view)
    });
    
    timeline.to(letters, {
      y: 0, // Move back to original position
      duration: 0.4,
      stagger: 0.03,
      ease: "power2.out",
    });
  };

  return (
    <div className="text-center py-10">
      {/* Wrapper with overflow hidden to act as the mask */}
      <div className="text-wrapper overflow-hidden inline-block">
        <h1 
          ref={textRef1}
          className="main-heading text-5xl lg:text-9xl font-extrabold text-custom-blue lg:leading-normal" 
        >
          ZENIT DIGITAL
        </h1>
      </div>
      <div className="text-wrapper overflow-hidden inline-block">
        <div
          ref={textRef2}
          className="main-heading text-5xl lg:text-9xl  font-extrabold text-transparent bg-clip-text"
          style={{
            WebkitTextStroke: "4px black",
            textStroke: "4px black",
          }}
        >
          ZENIT DIGITAL
        </div>
      </div>
      <div className="text-wrapper overflow-hidden inline-block">
        <h1 
          ref={textRef3}
          className="main-heading text-5xl lg:text-9xl  font-extrabold text-custom-blue lg:leading-normal"
        >
          ZENIT DIGITAL
        </h1>
      </div>
    </div>
  );
};

export default MainSection;