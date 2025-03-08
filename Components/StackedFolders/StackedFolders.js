"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedTitle from "../../components/AnimatedTitle";
import { useHeaderStore } from "@/store/headerStore";

gsap.registerPlugin(ScrollTrigger);

const StackedFolders = () => {
  const servicesRef = useRef(null);
  const sectionsRef = useRef([]);
  const titleRef = useRef(null);
  const animationRef = useRef(null);
  const setHeaderTheme = useHeaderStore((state) => state.setTheme);

  // Service data with the content
  const serviceData = [
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
  ];

  useEffect(() => {
    if (typeof window === "undefined") return;

    const sections = sectionsRef.current;
    const container = servicesRef.current;

    if (!sections.length) return;

    // Create a new timeline for the animations
    const animation = gsap.timeline();
    animationRef.current = animation;

    // Get the height of the first card to use as reference
    const cardHeight = sections[0].offsetHeight;

    // Set up initial positions and animations for each card
    sections.forEach((section, index) => {
      if (index === 0) {
        // First card starts visible at position 0
        gsap.set(section, {
          y: 0,
          opacity: 1,
          zIndex: 10, // Fixed z-index for first card
        });

        // Add animation to move first card down when second card comes in
        animation.to(
          section,
          {
            y: 100, // Move down when scrolling
            opacity: 0.7,
            duration: 0.5,
            ease: "power1.out",
          },
          0.2
        );
      } else if (index === 1) {
        // Second card starts below and slightly visible
        gsap.set(section, {
          y: cardHeight * 0.5, // Start stacked below
          opacity: 0.5, // Second card slightly visible
          zIndex: 20, // Higher z-index than first card
        });

        // When scrolling, move second card up to cover the first card
        animation.to(
          section,
          {
            y: 200, // Move up to cover first card
            opacity: 1,
            duration: 0.5,
            ease: "power1.out",
          },
          0.2
        );
      } else if (index === 2) {
        // Third card starts further below and invisible
        gsap.set(section, {
          y: cardHeight * 0.5 * index,
          opacity: 0,
          zIndex: sections.length - index,
        });

        // When scrolling, third card moves up to stack under the second card
        animation.to(
          section,
          {
            y: 200, // Position below second card
            opacity: 1,
            duration: 0.5,
            ease: "power1.out",
          },
          index * 0.2
        );
      } else {
        // Fourth and subsequent cards (if any)
        gsap.set(section, {
          y: cardHeight * 0.5 * index,
          opacity: 0,
          zIndex: sections.length - index,
        });

        // When scrolling, move up to position under third card
        animation.to(
          section,
          {
            y: 60, // Position below third card
            opacity: 1,
            duration: 0.5,
            ease: "power1.out",
          },
          index * 0.2
        );

        // Move the previous card out when the next one comes in
        // But don't touch the first three cards
        if (index > 3) {
          animation.to(
            sections[index - 1],
            {
              y: -200, // Move out of view
              opacity: 0,
              duration: 0.4,
              ease: "power1.in",
            },
            index * 0.2 + 0.1
          );
        }
      }
    });

    // Set up the ScrollTrigger
    ScrollTrigger.create({
      trigger: container,
      start: "top top",
      end: `bottom+=${window.innerHeight * sections.length}`, // More explicit scroll distance
      pin: true,
      animation: animation,
      scrub: 1.5, // Smooth scrubbing effect - this value controls the animation speed
      pinSpacing: true,
      anticipatePin: 1,
      markers: true, // Enable markers temporarily to debug
      onEnter: () => setHeaderTheme("dark"),
      onLeaveBack: () => setHeaderTheme("light"),
    });

    // Title animation
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

    return () => {
      if (animationRef.current) {
        animationRef.current.kill();
      }
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [setHeaderTheme]);

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
              style={{
                position: "absolute", // Position absolutely for stacking
                top: 0,
                left: 0,
                right: 0,
                width: "100%",
              }}
            >
              <div
                className={`service-header flex justify-between items-center border-t py-6 ${
                  service.id === "01"
                    ? "bg-red-600 text-white border-red-700"
                    : service.id === "02"
                    ? "bg-blue-600 text-white border-blue-700"
                    : "border-gray-800"
                }`}
              >
                <span
                  className={`service-number text-4xl md:text-6xl font-light ${
                    service.id === "01"
                      ? "text-white"
                      : service.id === "02"
                      ? "text-white"
                      : "text-gray-600"
                  }`}
                >
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

              <div
                className={`section-content mt-10 mb-6 ${
                  service.id === "01"
                    ? "bg-red-600 text-white"
                    : service.id === "02"
                    ? "bg-blue-600 text-white"
                    : ""
                }`}
              >
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

              <div
                className={`subservices mb-16 ${
                  service.id === "01"
                    ? "bg-red-600 text-white"
                    : service.id === "02"
                    ? "bg-blue-600 text-white"
                    : ""
                }`}
              >
                <div className="grid grid-cols-12 gap-4">
                  <div className="col-span-12 md:col-span-7 md:col-start-6">
                    <div
                      className={`divide-y ${
                        service.id === "01"
                          ? "divide-red-700"
                          : service.id === "02"
                          ? "divide-blue-700"
                          : "divide-gray-800"
                      }`}
                    >
                      {service.subServices.map((subService) => (
                        <div
                          key={subService.id}
                          className="py-4 flex items-center"
                        >
                          <span
                            className={`mr-4 ${
                              service.id === "01"
                                ? "text-red-200"
                                : service.id === "02"
                                ? "text-blue-200"
                                : "text-gray-500"
                            }`}
                          >
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

export default StackedFolders;
