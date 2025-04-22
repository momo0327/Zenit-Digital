// testHeader.js
import React from 'react';
import { useEffect } from 'react';
import { gsap } from "gsap";
import { useRouter } from 'next/navigation'; // Note: from 'next/navigation', not 'next/router'
import Link from 'next/link';

 const TestHeader = () => {
    const router = useRouter();

    useEffect(() => {
      gsap.from('.word', {
        opacity: 0,
        y: 50,
        stagger: 0.2,
        duration: 1,
        ease: 'power3.out',
      });
    }, []);    
  return (
    <section
      className="relative h-screen w-full flex items-center justify-center"
      data-bg="white"
      data-text="var(--custom-blue)"
      data-button-bg="var(--custom-blue)"
      data-button-text="white"
    >
      <div className="w-full overflow-hidden mt-28">
        <div className="container mx-auto px-4 py-16 md:py-24 relative">
          <div className="flex flex-col items-center text-center">
            <div className=" w-full lg:w-3/4 z-10">
            <h1 className="text-6xl lg:text-9xl md:text-6xl font-medium lg:font-medium leading-none mb-6">
  <span className="word">We</span> <span className="word">turn</span> <span className="word">dreams</span> <span className="word">into</span><br />
  <span className="word">Digital</span> <span className="word">Reality</span>
</h1>

              <p className="text-md mb-8 text-custom-blue max-w-xl mx-auto">
                Looking to build payments into your software? Aria fixes that. Pick the
                payment features you need for happy users and booming revenue.
              </p>
              <Link href="/booking">
                <button 
                  className="bg-custom-blue text-custom-pink hover:bg-teal-400 font-medium py-3 px-6 rounded-full inline-flex items-center"
                >
                  Speak to sales
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                  </svg>
                </button>
              </Link>
            </div>
            
            {/* Video for small screens (below md breakpoint) */}
            <div className="w-full  block md:hidden">
              <video
                className="w-full h-auto object-contain"
                style={{
                  filter: "brightness(0) saturate(100%) invert(50%) sepia(40%) saturate(900%) hue-rotate(200deg) brightness(80%) contrast(100%)",
                  opacity: 1
                }}
                autoPlay
                muted
                loop
                playsInline
                src="/airplane.mp4"
              >
                Your browser does not support the video tag.
              </video>
            </div>
            
            {/* Video for medium and large screens */}
            <div className="absolute right-0 mt-36 top-24 w-1/2 h-full hidden md:block">
              <div className="relative w-full h-full flex items-center justify-end">
                <video
                  className="w-full h-auto object-contain"
                  style={{
                    filter: "brightness(0) saturate(100%) invert(50%) sepia(40%) saturate(900%) hue-rotate(200deg) brightness(80%) contrast(100%)",
                    opacity: 1
                  }}
                  autoPlay
                  muted
                  loop
                  playsInline
                  src="/airplane.mp4"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TestHeader;