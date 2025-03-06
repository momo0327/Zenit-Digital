'use client';
import React from "react";

const test = () => {
  return (
    <section className="flex items-center justify-between h-screen px-16 "
    data-bg="black" // Background color
    data-text="var(--custom-lightGreen)" // Text color
    data-button-bg="var(--custom-lightGreen)" 
    data-button-text="var(--custom-green)"
    data-nav-text="var(--custom-lightGreen)"
    >
      {/* Left Text Section */}
      <div className="w-3/4">
        <h1 className="text-8xl text-white font-bold leading-tight">
          Need to <span className="text-custom-lightGreen">Grow</span> your digital
          presence? <br /> We are here to help you!
        </h1>
      </div>
      
      {/* Right Video Section */}
      <div className="w-1/4 flex justify-end">
        <video autoPlay loop muted className="w-full max-w-xl">
          <source src="/flower.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </section>
  );
};

export default test;
