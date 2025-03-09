"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

const ServiceCard = ({
  service,
  index,
  sectionsLength,
  registerSectionRef,
  bgColor = "bg-red-500",
}) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (sectionRef.current) {
      registerSectionRef(index, sectionRef.current);
    }
  }, [index, registerSectionRef]);

  useEffect(() => {
    if (!sectionRef.current) return;

    // The key fix: reverse the order for z-index completely
    // Lower index numbers should have LOWER z-index values
    gsap.set(sectionRef.current, {
      position: "absolute", // All cards absolute for proper stacking
      top: 0,
      left: 0,
      width: "100%",
      zIndex: index, // Lower index = lower z-index, so higher indexed cards will appear ON TOP
    });

    // For the first card, we want it fully visible at the start
    if (index === 0) {
      gsap.set(sectionRef.current, {
        y: 0 // Position at the top
      });
      
      const content = sectionRef.current.querySelector(".section-content");
      const subservices = sectionRef.current.querySelector(".subservices");
      const header = sectionRef.current.querySelector(".service-header");
      
      gsap.set([content, subservices], {
        opacity: 1,
        display: "block",
        y: 0,
      });
      gsap.set(header, { y: 0, opacity: 1 });
    } else {
      // All other cards start below the viewport
      gsap.set(sectionRef.current, { 
        y: '100%', // Start positioned below
      });
      
      const content = sectionRef.current.querySelector(".section-content");
      const subservices = sectionRef.current.querySelector(".subservices");
      const header = sectionRef.current.querySelector(".service-header");
      
      if (index === 1) {
        // Second card - header visible initially
        gsap.set(header, { y: 0, opacity: 1 });
        gsap.set([content, subservices], {
          opacity: 1,
          display: "block",
          y: 0,
        });
      } else {
        // Third+ cards - invisible for now
        gsap.set([content, subservices], {
          opacity: 0,
          display: "none",
          y: 30,
        });
        gsap.set(header, { y: 30, opacity: 0 });
      }
    }

    // Add hover animations for interactive elements
    const interactiveElements =
      sectionRef.current.querySelectorAll(".subservices > div");
    interactiveElements.forEach((element) => {
      element.addEventListener("mouseenter", () => {
        gsap.to(element, {
          scale: 1.02,
          duration: 0.3,
          ease: "power2.out",
        });
      });
      element.addEventListener("mouseleave", () => {
        gsap.to(element, {
          scale: 1,
          duration: 0.3,
          ease: "power2.in",
        });
      });
    });

    // Cleanup hover events
    return () => {
      interactiveElements.forEach((element) => {
        element.removeEventListener("mouseenter", () => {});
        element.removeEventListener("mouseleave", () => {});
      });
    };
  }, [index, sectionsLength]);

  return (
    <div 
      ref={sectionRef} 
      className={`service-section w-full ${bgColor} text-white`}
      style={{ 
        position: "absolute", 
        top: 0, 
        left: 0, 
        width: "100%", 
        zIndex: index // Ensure this is directly set in the style for more specificity
      }}
    >
      <div className="service-header flex justify-between items-center border-t border-gray-800 py-6">
        <span className="service-number text-4xl md:text-6xl text-gray-300 font-light">
          ({service.id})
        </span>
        <h2 className="service-title text-3xl md:text-5xl font-bold">
          {service.title}
        </h2>
        <div className="service-icon">
          {service.id === "01" && <span className="text-2xl">★</span>}
          {service.id === "02" && <span className="text-2xl">⬢</span>}
          {service.id === "03" && <span className="text-2xl">⬟</span>}
        </div>
      </div>
      <div className="section-content mt-10 mb-6">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-7 md:col-start-6">
            <p className="text-lg md:text-xl max-w-2xl mb-4">
              {service.description}
            </p>
            <p className="text-base md:text-lg max-w-2xl">{service.content}</p>
          </div>
        </div>
      </div>
      <div className="subservices mb-16">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-7 md:col-start-6">
            <div className="divide-y divide-gray-700">
              {service.subServices.map((subService) => (
                <div key={subService.id} className="py-4 flex items-center">
                  <span className="text-gray-300 mr-4">{subService.id}</span>
                  <span className="text-xl md:text-2xl font-medium">
                    {subService.title}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;