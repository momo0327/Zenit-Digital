'use client';
// components/ServicesGSAP.js
import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ServicesGSAP = () => {
  useEffect(() => {
    let ctx = gsap.context(() => {
      // Check for reduced motion preference
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

      if (prefersReducedMotion) return;

      // Mobile detection
      const isMobile = window.innerWidth < 768;
      
      // Configure ScrollTrigger
      ScrollTrigger.config({
        autoRefreshEvents: "visibilitychange,DOMContentLoaded,load",
        ignoreMobileResize: true
      });

      if (!isMobile) {
        const sections = gsap.utils.toArray(".service-section");
        
        sections.forEach((section, index) => {
          const content = section.querySelector(".service-content");
          
          // Set initial states
          gsap.set(content, { autoAlpha: 0, y: 50 });
          
          // Content animation
          gsap.to(content, {
            autoAlpha: 1,
            y: 0,
            duration: 1,
            scrollTrigger: {
              trigger: section,
              start: "top center",
              end: "bottom center",
              scrub: 0.5
            }
          });

          // Section pinning
          ScrollTrigger.create({
            trigger: section,
            start: "top top",
            end: index === sections.length - 1 ? "bottom top" : "+=200%",
            pin: true,
            pinSpacing: false,
            scrub: 1,
            markers: false // Set to true for debugging
          });
        });

        // Smooth scroll configuration
        ScrollTrigger.normalizeScroll(true);
        ScrollTrigger.defaults({
          toggleActions: "play none none reverse"
        });
      }
    });

    return () => {
      ctx.revert();
      ScrollTrigger.clearMatchMedia();
    };
  }, []);

  return (
    <section 
      className="services-container relative overflow-hidden"
      data-theme="custom"
      style={{
        '--background': '#ffffff',
        '--custom-green': '#2ecc71',
        '--custom-lightGreen': '#d1f5e0'
      }}
    >
      {/* Service 1 */}
      <div className="service-section h-screen w-full flex items-center relative bg-white">
        <span className="text-6xl md:text-9xl font-bold text-gray-100 absolute left-4 md:left-16 z-0">
          01
        </span>
        <div className="service-content container mx-auto px-4 md:px-8 relative z-10">
          <div className="flex flex-col gap-4 ml-auto max-w-2xl text-right">
            <h2 className="text-4xl md:text-7xl font-bold mb-4 transform transition-all duration-500">
              Web Development
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-lg ml-auto">
              Crafting seamless, engaging websites to elevate your digital presence.
            </p>
          </div>
        </div>
      </div>

      {/* Service 2 */}
      <div className="service-section h-screen w-full flex items-center bg-gray-50 relative">
        <span className="text-6xl md:text-9xl font-bold text-gray-100 absolute left-4 md:left-16 z-0">
          02
        </span>
        <div className="service-content container mx-auto px-4 md:px-8 relative z-10">
          <div className="flex flex-col gap-4 ml-auto max-w-2xl text-right">
            <h2 className="text-4xl md:text-7xl font-bold mb-4 transform transition-all duration-500">
              App Development
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-lg ml-auto">
              Transforming ideas into innovative mobile solutions that connect and engage.
            </p>
          </div>
        </div>
      </div>

      {/* Service 3 */}
      <div className="service-section h-screen w-full flex items-center bg-white relative">
        <span className="text-6xl md:text-9xl font-bold text-gray-100 absolute left-4 md:left-16 z-0">
          03
        </span>
        <div className="service-content container mx-auto px-4 md:px-8 relative z-10">
          <div className="flex flex-col gap-4 ml-auto max-w-2xl text-right">
            <h2 className="text-4xl md:text-7xl font-bold mb-4 transform transition-all duration-500">
              UI/UX Design
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-lg ml-auto">
              Designing intuitive and elegant interfaces that elevate the user experience.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesGSAP;