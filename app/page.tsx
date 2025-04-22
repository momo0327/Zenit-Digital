'use client';
import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AboutSection from "../components/AboutSection";
import StackedCardsContainer from "../components/SectionsContainer";
import Test from "../components/test";
import Footer from "../components/Footer";
import TextScroll from "../components/TextScroll";
import Cookiebot from "../Components/Cookiebot";
import Testimonials from "../components/Testimonials";
import Page2 from "../components/Page2";  
import TestHeader from "../components/TestHeader";
import HeroSection from "../components/HeroSection";
// import Home from "../components/Home";
import Booking from "../Components/Booking";

export default function Page() {
  useEffect(() => {
    // Register GSAP plugins inside useEffect to ensure it only runs client-side
    gsap.registerPlugin(ScrollTrigger);

    const sections = document.querySelectorAll("section:not(.selected-works-section):not(.services-section)");
    const selectedWorksSection = document.querySelector(".selected-works-section");
    const servicesSection = document.querySelector(".services-section");
    const masterTimeline = gsap.timeline();

    sections.forEach((section, index) => {
      const bgColor = section.getAttribute("data-bg") || "white";
      const textColor = section.getAttribute("data-text") || "black";

      ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "bottom center",
        onEnter: () => {
          document.body.style.backgroundColor = bgColor;
          document.body.style.color = textColor;
        },
        onLeaveBack: () => {
          const prevSection = sections[index - 1];
          const prevBgColor = prevSection?.getAttribute("data-bg") || "white";
          const prevTextColor =
            prevSection?.getAttribute("data-text") || "black";

          document.body.style.backgroundColor = prevBgColor;
          document.body.style.color = prevTextColor;
        },
      });
    });

    // Handle overlay transitions between sections
    const workOverlay = document.getElementById("works-overlay");
    if (workOverlay) {
      ScrollTrigger.create({
        trigger: ".services-section",
        start: "top bottom",
        end: "top 50%",
        onEnter: () => workOverlay.classList.add("visible"),
        onLeaveBack: () => workOverlay.classList.remove("visible"),
      });
    }

    // Coordinate the SelectedWorks to Service transition if both sections exist
    if (selectedWorksSection && servicesSection) {
      // Clear any potentially conflicting animations
      ScrollTrigger.getAll().forEach((st) => {
        if (
          (st.vars.trigger === selectedWorksSection ||
            st.vars.trigger === servicesSection) &&
          st.vars.id === "section-transition"
        ) {
          st.kill();
        }
      });

      // Create a dedicated timeline for the transition
      const transitionTL = gsap.timeline({
        scrollTrigger: {
          id: "section-transition",
          trigger: selectedWorksSection,
          start: "bottom bottom-=15%",
          end: "bottom top+=15%",
          scrub: 0.8,
          invalidateOnRefresh: true,
          onEnter: () => {
            document.body.classList.add("transitioning-sections");
          },
          onLeaveBack: () => {
            document.body.classList.remove("transitioning-sections");
          },
        },
      });

      // Add the transitionTL to the master timeline
      masterTimeline.add(transitionTL);
    }

    // Fix for any ScrollTrigger race conditions
    setTimeout(() => {
      ScrollTrigger.refresh(true);
    }, 100);

    // Clean up all animations on unmount
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      if (masterTimeline) masterTimeline.kill();
    };
  }, []);

  return (
    <main>
      <Cookiebot />
      {/* <HeaderLogo /> */}
      <HeroSection />
      <AboutSection />
      
      {/* Replace individual sections with the stacked container */}
      <StackedCardsContainer />
      
      <TextScroll />
      {/* <Testimonials /> */}
      <Test />
      {/* <Page2/> */}
      <Footer />
    </main>
  );
}