//test fil 



'use client';
import React from "react";

const test = () => {
  return (
    <section
    data-bg="var(--custom-green)" // Background color
    data-text="var(--custom-lightGreen)" // Text color
    data-button-bg="var(--custom-lightGreen)" 
    data-button-text="var(--custom-green)"
  >
    <div className="scroll-container flex">
      {/* Left Fixed Text */}
      <div className="text-section w-1/2 sticky top-0 h-screen flex items-center">
        <div className="text-content px-8">
          <h1 className="text-9xl font-bold mb-4">Our Selected Works</h1>
     
        </div>
      </div>

      {/* Right Scrolling Images */}
      <div className="image-section w-1/2 ">
        <div className="images space-y-12">
          <img
            src="https://cdn.sanity.io/images/u1e81n72/production/c1107f72536e7bbce9dc86527ff0057edd8f787c-1074x816.jpg/astellas_6-r8y4l6-1920x0.jpeg?q=95&fit=clip&auto=format&w=1439"
            alt="Work 1"
            className="scroll-image w-full h-auto"
          />
          <img
            src="https://cdn.sanity.io/images/u1e81n72/production/5addc75bef476305d7ee2f1c8238a15685203c28-1200x1600.jpg/Hololens.jpg?q=95&fit=clip&auto=format&w=1439"
            alt="Work 2"
            className="scroll-image w-full h-auto"
          />
          <img
            src="https://cdn.sanity.io/images/u1e81n72/production/5addc75bef476305d7ee2f1c8238a15685203c28-1200x1600.jpg/Hololens.jpg?q=95&fit=clip&auto=format&w=1439"
            alt="Work 2"
            className="scroll-image w-full h-auto"
          />
        </div>
      </div>
    </div>
    </section>
  );
};

export default test;
