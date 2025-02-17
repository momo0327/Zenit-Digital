'use client';
import React, { useEffect } from "react";
import { gsap } from "gsap";
import Image from "next/image";
import image from "../assets/image31.png";
import MainSection from './MainSection'
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
      <Image
        src={image}
        alt="Zenit Digital Background"
        className="absolute z-0 background-image"
        width={700}
        height={300}
        objectFit="contain"
      />
      <div className="text-center z-20">
        <MainSection/>
    </div>
    </section>
  );
};

export default HeaderLogo;
