"use client";
import React from "react";
import { useNavigation } from "./useNavigation";

const DesktopNav = ({ className = "" }) => {
  const { scrollToSection } = useNavigation();

  return (
    <div
      className={`hidden md:block absolute left-1/2 transform -translate-x-1/2 ${className}`}
    >
      <ul className="flex gap-10">
        <li>
          <a
            href="#about-section"
            onClick={(e) => {
              e.preventDefault();
              console.log("About clicked");
              scrollToSection("about-section");
            }}
            className="hover:text-custom-blue cursor-pointer transition-colors duration-300"
          >
            About
          </a>
        </li>
        <li>
          <a
            href="#cases-section"
            onClick={(e) => {
              e.preventDefault();
              console.log("Cases clicked");
              scrollToSection("cases-section");
            }}
            className="hover:text-custom-blue cursor-pointer transition-colors duration-300"
          >
            Cases
          </a>
        </li>
        <li>
          <a
            href="#services-section"
            onClick={(e) => {
              e.preventDefault();
              console.log("Services clicked");
              scrollToSection("services-section");
            }}
            className="hover:text-custom-blue cursor-pointer transition-colors duration-300"
          >
            Services
          </a>
        </li>
      </ul>
    </div>
  );
};

export default DesktopNav;
