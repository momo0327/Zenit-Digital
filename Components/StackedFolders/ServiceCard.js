"use client";
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

const ServiceCard = ({
  service,
  index,
  sectionsLength,
  registerSectionRef,
}) => {
  const sectionRef = useRef(null);

  useEffect(() => {
    if (sectionRef.current) {
      registerSectionRef(index, sectionRef.current);
    }
  }, [index, registerSectionRef]);

  useEffect(() => {
    if (!sectionRef.current) return;

    // Set initial positioning and z-index
    gsap.set(sectionRef.current, {
      position: "relative",
      zIndex: sectionsLength - index,
    });

    const content = sectionRef.current.querySelector(".section-content");
    const subservices = sectionRef.current.querySelector(".subservices");
    const header = sectionRef.current.querySelector(".service-header");

    // Handle initial states based on whether this is the first card
    if (index === 0) {
      gsap.set([content, subservices], {
        opacity: 1,
        display: "block",
        y: 0,
      });
      gsap.set(header, { y: 0, opacity: 1 });
    } else {
      gsap.set([content, subservices], {
        opacity: 0,
        display: "none",
        y: 30,
      });
      gsap.set(header, { y: 30, opacity: 0 });
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
    <div ref={sectionRef} className="service-section relative">
      <div className="service-header flex justify-between items-center border-t border-gray-800 py-6">
        <span className="service-number text-4xl md:text-6xl text-gray-600 font-light">
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
            <div className="divide-y divide-gray-800">
              {service.subServices.map((subService) => (
                <div key={subService.id} className="py-4 flex items-center">
                  <span className="text-gray-500 mr-4">{subService.id}</span>
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
