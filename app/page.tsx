'use client';
import React, { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import HeaderLogo from "../components/HeaderLogo";
import AboutSection from "../components/AboutSection";
import SelectedWorks from "../components/SelectedWorks";
import Services from "../components/Services";
import Test from "../components/test";
import Footer from "../components/Footer";
import TextScroll from "../components/TextScroll";
import TestMain from '../Components/TestMain'

gsap.registerPlugin(ScrollTrigger);

export default function Page() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      const sections = document.querySelectorAll("section");

      sections.forEach((section, index) => {
        const bgColor = section.getAttribute("data-bg") || "white";
        const textColor = section.getAttribute("data-text") || "black";

        ScrollTrigger.create({
          trigger: section,
          start: "top center", // Trigger when the top of the section hits the middle of the viewport
          end: "bottom center", // Revert just before leaving the section
          onEnter: () => {
            document.body.style.backgroundColor = bgColor;
            document.body.style.color = textColor;
          },
          onLeaveBack: () => {
            const prevSection = sections[index - 1];
            const prevBgColor = prevSection?.getAttribute("data-bg") || "white";
            const prevTextColor = prevSection?.getAttribute("data-text") || "black";

            document.body.style.backgroundColor = prevBgColor;
            document.body.style.color = prevTextColor;
          },
        });
      });
    }
  }, []);

  return (
    <main >
      <HeaderLogo />
      <AboutSection />
      <SelectedWorks/>
      <Services/>
      <TextScroll/>
      <Test/>
      <Footer/>
     
    </main>
  );
}
