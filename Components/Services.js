'use client';
import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const sections = document.querySelectorAll(".service-section");

      sections.forEach((section, index) => {
        const isLastSection = index === sections.length - 1;

        ScrollTrigger.create({
          trigger: section,
          start: "top top",
          end: isLastSection ? "bottom top" : "bottom top",
          pin: !isLastSection,
          pinSpacing: false,
          scrub: true,
        });
      });
    }
  }, []);

  return (
    <section
      className="services-container"
      data-bg="var(--background)"
      data-text="var(--custom-green)"
      data-button-bg="var(--custom-green)"
      data-button-text="var(--custom-lightGreen)"
    >
      {/* Service 1 */}
      <div className="service-section h-screen flex items-center relative">
        <span className="text-9xl font-bold text-gray-300 absolute left-16">
          01
        </span>
        <div className="flex flex-col gap-4 ml-auto pr-16 text-right">
          <h2 className="service-heading text-7xl font-bold mb-4 t">
            Web Development
          </h2>
          <p className="text-lg max-w-lg text-gray-600">
            Crafting seamless, engaging websites to elevate your digital presence.
          </p>
        </div>
      </div>

      {/* Service 2 */}
      <div className="service-section h-screen flex items-center bg-white relative">
       
        <span className="text-9xl font-bold text-gray-300 absolute left-16">
          02
        </span>
        <div className="flex flex-col gap-4 ml-auto pr-16 text-right">
          <h2 className="service-heading text-7xl font-bold mb-4">
            App Development
          </h2>
          <p className="text-lg max-w-lg text-gray-600">
            Transforming ideas into innovative mobile solutions that connect and engage.
          </p>
        </div>
      </div>

      {/* Service 3 */}
      <div className="service-section h-screen flex items-center bg-white relative">
        <span className="text-9xl font-bold text-gray-300 absolute left-16">
          03
        </span>
        <div className="flex flex-col gap-4 ml-auto pr-16 text-right">
          <h2 className="service-heading text-7xl font-bold mb-4">
            UI/UX Design
          </h2>
          <p className="text-lg max-w-lg text-gray-600">
            Designing intuitive and elegant interfaces that elevate the user experience.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Services;
