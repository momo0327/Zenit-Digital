'use client';
import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedTitle from './AnimatedTitle'

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

    useEffect(() => {
      if (typeof window !== "undefined") {
        const section = document.querySelector(".selected-works-section");
        const titleLetters = document.querySelectorAll(".title-letter");
  
        if (titleLetters.length > 0) {
          // Set initial position below the viewport (y: 160)
          gsap.set(titleLetters, { y: 160 });
  
          // Animate the letters with stagger (no fade-in effect)
          gsap.to(titleLetters, {
            y: 0, // Move up into view
            duration: 1,
            stagger: 0.08,
            ease: "power4.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          });
        }
  
      }
    }, []);

  return (
    <section
      className="services-container"
      data-bg="var(--background)"
      data-text="var(--custom-green)"
      data-button-bg="var(--custom-green)"
      data-button-text="var(--custom-lightGreen)"
      data-nav-text="var(--custom-green)"
    >
          {/* <h1 className="overflow-hidden inline-block mt-28 ml-8  text-9xl font-bold ">
            {Array.from("SERVICES").map((letter, index) => (
              <span key={index} className="title-letter inline-block">
                {letter === " " ? "\u00A0" : letter}
              </span>
            ))}
          </h1> */}

          <h1 className="mt-28">
            <AnimatedTitle title='SERVICES'/>
          </h1>
          
          
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
