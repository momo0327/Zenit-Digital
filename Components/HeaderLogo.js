"use client";
import React, { useEffect } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import image from "../assets/image31.png";
import MainSection from "./MainSection";

const HeaderLogo = () => {
  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.fromTo(
        ".background-image",
        { scale: 2 },
        {
          scale: 1,
          duration: 2.5,
          ease: "power4.out",
        }
      );

      // Fade-in effect for both text & line
      gsap.fromTo(
        ".scroll-container",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1.5, delay: 1.2, ease: "power4.out" }
      );

      // GSAP timeline for growing & shrinking effect
      const tl = gsap.timeline({ repeat: -1 });

      tl.fromTo(
        ".scroll-line",
        { scaleY: 0, transformOrigin: "top" }, // Starts invisible at the top
        { scaleY: 1, delay:0.4, duration: 0.5, ease: "power2.out" } // Grows from top to bottom
      )
        .to(".scroll-line", {
          transformOrigin: "bottom", // Fix bottom
          scaleY: 0, // Shrinks from top down
          duration: 0.5,
          ease: "power1.in",
        });
    }
  }, []);

  return (
    <section
      className="relative h-screen w-full flex items-center justify-center"
      data-bg="white"
      data-text="var(--custom-blue)"
      data-button-bg="var(--custom-blue)"
      data-button-text="white"
    >
      {/* Background Image */}
      <Image
        src={image}
        alt="Zenit Digital Background"
        className="absolute z-0 background-image"
        width={700}
        height={300}
        objectFit="contain"
      />

      {/* Main Content */}
      <div className="text-center z-20">
        <MainSection />
      </div>

      {/* SCROLL TEXT & LINE - Bottom Right, Vertically Aligned */}
      <div className="scroll-container absolute bottom-10 right-6 flex flex-col items-center opacity-0">
        {/* Scroll Text */}
        <span className="text-md font-medium text-custom-blue rotate-90">
          Scroll
        </span>

        {/* Animated Line (Growing & Shrinking Effect) */}
        <div className="scroll-line w-[2px] h-6 bg-custom-blue mt-4"></div>
      </div>
    </section>
  );
};

export default HeaderLogo;
