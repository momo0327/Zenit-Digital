"use client";
import React, { useEffect, useRef, useMemo } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const servicesRef = useRef(null);
  const sectionsRef = useRef([]);
  const titleRef = useRef(null);

  // Updated service data to match the images
  const serviceData = useMemo(
    () => [
      {
        id: "01",
        title: "Web Development",
        description:
          "A website developed to captivate and convert can elevate your brand to new heights.",
        content:
          "My custom-coded sites are meticulously crafted to reflect your unique identity, delivering seamless experiences with a focus on animation—keeping your audience engaged and returning.",
        subServices: [
          { id: "01", title: "CMS Integration" },
          { id: "02", title: "Motion & Animations" },
          { id: "03", title: "3D Development" },
        ],
      },
      {
        id: "02",
        title: "Web Design",
        description:
          "Amplify your online presence with a website that truly connects with your audience's feelings and desires.",
        content:
          "I design stunning, high-converting sites that align with your business goals, helping you stand out and scale effectively.",
        subServices: [
          { id: "01", title: "Responsive Design" },
          { id: "02", title: "Wireframing" },
          { id: "03", title: "UX Writing" },
        ],
      },
      {
        id: "03",
        title: "SEO",
        description: "Your website deserves to be seen.",
        content:
          "I optimize your online presence to elevate your visibility in search results, helping your business attract the right audience and stand out in the digital landscape.",
        subServices: [
          { id: "01", title: "Technical SEO" },
          { id: "02", title: "On-Page Optimization" },
          { id: "03", title: "SEO Audits & Analysis" },
        ],
      },
    ],
    []
  );

  useEffect(() => {
    if (typeof window === "undefined") return;

    const currentServicesRef = servicesRef.current;

    // Clear existing ScrollTriggers
    ScrollTrigger.getAll().forEach((trigger) => {
      if (trigger.vars.trigger === currentServicesRef) {
        trigger.kill();
      }
    });

    const ctx = gsap.context(() => {
      const sections = sectionsRef.current;
      const container = servicesRef.current;

      if (!sections.length) return;

      // Main pin effect with longer duration
      ScrollTrigger.create({
        trigger: container,
        start: "top 10%", // Adjusted for better entry point
        end: () => `+=${sections.length * 120}vh`, // Increased for smoother transitions
        pin: true,
        pinSpacing: true,
        scrub: 1,
        markers: false,
      });

      // Enhanced stacking effect for headers
      sections.forEach((section, i) => {
        gsap.set(section, {
          position: "relative",
          zIndex: sections.length - i,
        });

        const content = section.querySelector(".section-content");
        const subservices = section.querySelector(".subservices");
        const header = section.querySelector(".service-header");

        // Initial states
        if (i === 0) {
          gsap.set([content, subservices], { opacity: 1, display: "block" });
          gsap.set(header, { y: 0 });
        } else {
          gsap.set([content, subservices], { opacity: 0, display: "none" });
          gsap.set(header, { y: 50 });
        }

        // Create individual scroll triggers for each section
        if (i > 0) {
          ScrollTrigger.create({
            trigger: container,
            start: `top+=${i * 25}vh top`,
            end: `top+=${(i + 1) * 25}vh top`,
            scrub: 0.5,
            onEnter: () => {
              // Animate current section in
              gsap.to(header, { y: 0, duration: 0.5 });
              gsap.set([content, subservices], { display: "block" });
              gsap.to([content, subservices], { opacity: 1, duration: 0.5 });

              // Fade out previous section
              const prevContent =
                sections[i - 1].querySelector(".section-content");
              const prevSubservices =
                sections[i - 1].querySelector(".subservices");
              gsap.to([prevContent, prevSubservices], {
                opacity: 0,
                duration: 0.3,
                onComplete: () =>
                  gsap.set([prevContent, prevSubservices], { display: "none" }),
              });
            },
            onLeaveBack: () => {
              // Reverse animations when scrolling back up
              gsap.to(header, { y: 50, duration: 0.5 });
              gsap.to([content, subservices], {
                opacity: 0,
                duration: 0.3,
                onComplete: () =>
                  gsap.set([content, subservices], { display: "none" }),
              });

              // Show previous section
              const prevContent =
                sections[i - 1].querySelector(".section-content");
              const prevSubservices =
                sections[i - 1].querySelector(".subservices");
              gsap.set([prevContent, prevSubservices], { display: "block" });
              gsap.to([prevContent, prevSubservices], {
                opacity: 1,
                duration: 0.5,
              });
            },
          });
        }
      });

      // Enhanced title animation
      gsap.from(titleRef.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        scrollTrigger: {
          trigger: container,
          start: "top bottom",
          end: "top 60%",
          scrub: 0.5,
        },
      });
    }, servicesRef);

    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === currentServicesRef) {
          trigger.kill();
        }
      });
    };
  }, []);

  return (
    <section
      ref={servicesRef}
      className="services-container relative py-32 min-h-screen bg-black text-white"
    >
      <div className="container mx-auto px-4">
        <h1 ref={titleRef} className="mb-16 text-4xl">
          <AnimatedTitle title="SERVICES" />
        </h1>

        <div className="services-list relative">
          {serviceData.map((service, index) => (
            <div
              key={service.id}
              ref={(el) => (sectionsRef.current[index] = el)}
              className="service-section relative"
            >
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
                    <p className="text-base md:text-lg max-w-2xl">
                      {service.content}
                    </p>
                  </div>
                </div>
              </div>

              <div className="subservices mb-16">
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-12 md:col-span-7 md:col-start-6">
                    <div className="divide-y divide-gray-800">
                      {service.subServices.map((subService) => (
                        <div
                          key={subService.id}
                          className="py-4 flex items-center"
                        >
                          <span className="text-gray-500 mr-4">
                            {subService.id}
                          </span>
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
