import React from "react";
import Image from "next/image";
import background from "../assets/background.png";
import astronaut from "../assets/astronaut.png";

function TestMain() {
  return (
    <section
    className="relative h-screen w-full flex items-center justify-center"
    data-bg="var(--custom-pink)"
    data-text="var(--custom-blue)"
    data-button-bg="var(--custom-blue)"
    data-button-text="white"
    data-nav-text="var(--custom-blue)"
    >
    <div
      className="h-screen w-full bg-cover bg-center relative flex items-center"
      style={{ backgroundImage: `url(${background.src})` }}
    >
      {/* Left Side Content */}
      <div className="max-w ml-16 text-custom-blue">
        {/* Big Bold Title */}
        <h1 className="text-9xl font-extrabold leading-none">
          We turn dreams into <br/> digital reality
        </h1>

        {/* Small Light Text */}
        <p className="text-lg max-w-xl text-custom-blue mt-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse varius enim in eros elementum tristique.
        </p>

        {/* Buttons */}
        <div className="mt-6 flex space-x-4">
          <button className="px-6 py-3 text-lg font-semibold text-custom-pink bg-custom-blue rounded-lg hover:bg-blue-700 transition">
            Get Started
          </button>
          <button className="px-6 py-3 text-lg font-semibold text-custom-blue border border-custom-blue rounded-lg hover:bg-blue-600 hover:text-white transition">
            Learn More
          </button>
        </div>
      </div>

      {/* Astronaut Image on the Right */}
      <div className="absolute right-0 top-0 h-full flex items-center">
        <Image 
          src={astronaut} 
          alt="Astronaut" 
          className="h-full w-auto object-contain" 
        />
      </div>
    </div>
    </section>
  );
}

export default TestMain;
