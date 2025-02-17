"use client";
import React, { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image"; // Using Next.js Image component

import Group5Image from "../assets/Group5.png"; // Importing the local image

gsap.registerPlugin(ScrollTrigger);

const SelectedWorks = () => {
  const [currentImage, setCurrentImage] = useState(1);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const section = document.querySelector(".selected-works-section");

      gsap.set(section, {
        opacity: 0,
        y: 100, // Initially moved down
      });

      gsap.to(section, {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power4.out",
        scrollTrigger: {
          trigger: section,
          start: "top 80%", // Animation starts when 80% of section is in view
          toggleActions: "play none none none",
        },
      });

      const images = document.querySelectorAll(".scroll-item");

      images.forEach((item, index) => {
        ScrollTrigger.create({
          trigger: item,
          start: "top center",
          end: "bottom center",
          onEnter: () => setCurrentImage(index + 1),
          onEnterBack: () => setCurrentImage(index + 1),
        });
      });
    }
  }, []);

  const projects = [
    {
      id: 1,
      image: Group5Image,
      title: "Xtream E-sport Arena",
      description: "Gaming arena",
      links: ["Design", "Web Development"],
    },
    {
      id: 2,
      image: "https://cdn.sanity.io/images/u1e81n72/production/5addc75bef476305d7ee2f1c8238a15685203c28-1200x1600.jpg/Hololens.jpg?q=95&fit=clip&auto=format&w=1439",
      title: "Hololens Project",
      description: "Augmented Reality Experience",
      links: ["Design", "AR Development"],
    },
    {
      id: 3,
      image: "https://cdn.sanity.io/images/u1e81n72/production/5addc75bef476305d7ee2f1c8238a15685203c28-1200x1600.jpg/Hololens.jpg?q=95&fit=clip&auto=format&w=1439",
      title: "Future Tech Showcase",
      description: "Technology Expo",
      links: ["UI/UX", "Prototyping"],
    },
  ];

  return (
    <section
      className="selected-works-section opacity-0"
      data-bg="var(--custom-blue)"
      data-text="var(--custom-pink)"
      data-button-bg="var(--custom-pink)"
      data-button-text="var(--custom-blue)"
    >
      <div className="scroll-container flex">
        {/* Left Fixed Text */}
        <div className="text-section w-1/2 sticky top-0 h-screen flex items-center">
          <div className="text-content px-8">
            <div className="text-super-large font-medium text-custom-pink">
              {String(currentImage).padStart(2, "0")}
            </div>
          </div>
        </div>

        {/* Right Scrolling Images with Details */}
        <div className="image-section w-1/2">
          <div className="images space-y-20 pr-16">
            {projects.map((project) => (
              <div
                key={project.id}
                className="scroll-item space-y-6 border-b border-custom-pink pb-8"
              >
                {/* Image */}
                {typeof project.image === "string" ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-auto rounded-md"
                  />
                ) : (
                  <Image
                    src={project.image}
                    alt={project.title}
                    className="w-full h-auto rounded-md"
                    priority
                  />
                )}

                {/* Title and Info */}
                <div className="flex items-center justify-between mt-4">
                  <div>
                    <h2 className="text-xl font-light text-custom-pink">
                      {project.description}
                    </h2>
                    <h3 className="text-3xl font-bold text-custom-pink">
                      {project.title}
                    </h3>
                  </div>

                  {/* Links aligned to the right */}
                  <div className="flex space-x-4">
                    {project.links.map((link, index) => (
                      <button
                        key={index}
                        className="px-4 py-2 border-2 border-custom-pink text-custom-pink rounded-3xl bg-transparent hover:bg-custom-pink hover:text-custom-blue transition"
                      >
                        {link}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SelectedWorks;
