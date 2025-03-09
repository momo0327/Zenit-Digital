"use client";
import React, { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedTitle from "../../components/AnimatedTitle";
import { useHeaderStore } from "@/store/headerStore";
import ServiceCard from "./ServiceCard";

gsap.registerPlugin(ScrollTrigger);

const StackedFolders = () => {
  const servicesRef = useRef(null);
  const servicesListRef = useRef(null);
  const titleRef = useRef(null);
  const sectionsRef = useRef([]);
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
      bgColor: "bg-red-500", // Background color for first card
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
      bgColor: "bg-red-500", // Background color for second card
    },
    // {
    //   id: "03",
    //   title: "SEO",
    //   description: "Your website deserves to be seen.",
    //   content:
    //     "I optimize your online presence to elevate your visibility in search results, helping your business attract the right audience and stand out in the digital landscape.",
    //   subServices: [
    //     { id: "01", title: "Technical SEO" },
    //     { id: "02", title: "On-Page Optimization" },
    //     { id: "03", title: "SEO Audits & Analysis" },
    //   ],
    //   bgColor: "bg-red-500", // Background color for third card
    // },
  ];

  // Function to register section refs from ServiceCard component
  const registerSectionRef = (index, element) => {
    sectionsRef.current[index] = element;
  };

  useEffect(() => {
    if (typeof window === "undefined") return;
    
    const sections = sectionsRef.current;
    const container = servicesRef.current;
    const servicesList = servicesListRef.current;
    
    if (!sections.length || !servicesList) return;
    
    // Create a new timeline for the animations
    const animation = gsap.timeline();
    animationRef.current = animation;
    
    // Reversed array to make sure cards with higher indices animate first
    // This is crucial for the stacking effect with z-index
    const reversedSections = [...sections].reverse();
    
    // Animate from bottom to top (from highest index to lowest)
    reversedSections.forEach((section, i) => {
      const index = sections.length - 1 - i; // Convert back to original index
      
      if (index === 0) {
        // First card stays in place
        return;
      }
      
      // For cards 2 and beyond
      // Find the header height of the previous card
      const prevCardHeader = sections[index-1].querySelector(".service-header");
      const headerHeight = prevCardHeader ? prevCardHeader.offsetHeight : 0;
      const headerMargin = 10; // Add a small margin between headers
      
      // Position card right below previous card's header
      animation.to(
        section,
        {
          y: `${headerHeight + headerMargin}px`,
          duration: 0.8,
          ease: "power2.out",
        },
        index * 0.3
      );
      
      // For third card and beyond, animate content appearance
      if (index > 1) {
        const content = section.querySelector(".section-content");
        const subservices = section.querySelector(".subservices");
        const header = section.querySelector(".service-header");
        
        animation.to(
          [content, subservices],
          {
            y: 0,
            opacity: 1,
            display: "block",
            duration: 0.5,
            ease: "power1.out",
          },
          index * 0.3 + 0.2
        );
        
        animation.to(
          header,
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            ease: "power1.out",
          },
          index * 0.3 + 0.1
        );
      }
    });
    
    // Set up the ScrollTrigger
    ScrollTrigger.create({
      trigger: servicesList,
      start: "top-=80 top",
      end: `bottom+=${window.innerHeight * sections.length}`,
      pin: true,
      animation: animation,
      scrub: 1.5,
      pinSpacing: true,
      anticipatePin: 1,
      markers: true,
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
        <div 
          ref={servicesListRef} 
          className="services-list relative"
          style={{ height: "80vh" }} // Give the container a fixed height
        >
          {serviceData.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              sectionsLength={serviceData.length}
              registerSectionRef={registerSectionRef}
              bgColor={service.bgColor}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StackedFolders;