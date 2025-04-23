'use client';
import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeaderLogo from "../components/HeaderLogo";
import AboutSection from "../components/AboutSection";
import StackedCardsContainer from "../components/SectionsContainer";
import Test from "../components/test";
import Footer from "../Components/Footer/Footer";
import TextScroll from "../components/TextScroll";
import Cookiebot from "../Components/Cookiebot";
import Testimonials from "../components/Testimonials";
import Page2 from "../components/Page2";  
import TestHeader from "../components/TestHeader";
// import Home from "../components/Home";
import Booking from "../Components/Booking";

export default function Page() {
  useEffect(() => {
    // Register GSAP plugins inside useEffect to ensure it only runs client-side
    gsap.registerPlugin(ScrollTrigger);

    const sections = document.querySelectorAll("section:not(.selected-works-section):not(.services-section)");

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
  }, []);

  return (
    <main>
      <Cookiebot />
      {/* <HeaderLogo /> */}
      <TestHeader />  
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