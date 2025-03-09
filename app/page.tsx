"use client";
import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import HeaderLogo from "../components/HeaderLogo";
import AboutSection from "../components/AboutSection";
import SelectedWorks from "../components/SelectedWorks";
import Services from "../components/Services";
import Service from "../Components/StackedFolders/Service";
import Test from "../components/test";
import Footer from "../components/Footer";
import TextScroll from "../components/TextScroll";
import Cookiebot from "../Components/Cookiebot";

export default function Page() {
  useEffect(() => {
    // Register GSAP plugins inside useEffect to ensure it only runs client-side
    gsap.registerPlugin(ScrollTrigger);

    const sections = document.querySelectorAll("section");

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
      <HeaderLogo />
      <AboutSection />
      <SelectedWorks />
      {/* <Services /> */}
      <Service /> {/* Inserted new Service component */}
      <TextScroll />
      <Test />
      <Footer />
    </main>
  );
}
