"use client";
import React, { useRef, memo } from "react";

const HeroVideo = memo(() => {
  const videoRef = useRef(null);

  // Common video styling
  const videoFilter =
    "brightness(0) saturate(100%) invert(50%) sepia(40%) saturate(900%) hue-rotate(200deg) brightness(80%) contrast(100%)";

  return (
    <>
      {/* Video for small screens (below md breakpoint) */}
      <div className="w-full block md:hidden">
        <video
          ref={videoRef}
          className="mobile-video w-full h-auto object-contain"
          style={{
            filter: videoFilter,
            opacity: 1,
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
      <div className="absolute right-0 mt-36 top-24 w-2/5 h-full hidden md:block overflow-hidden">
        {/* Apply clip-path and mask for hard containment */}
        <div
          className="relative w-full h-full flex items-center justify-end overflow-hidden"
          style={{
            clipPath: "inset(0 0 0 10%)", // Hard clipping from the left side
            maskImage:
              "linear-gradient(to right, black 5%, black 65%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, black 5%, black 65%, transparent 100%)",
          }}
        >
          <video
            className="desktop-video h-auto object-contain"
            style={{
              filter: videoFilter,
              opacity: 1,
              width: "85%",
              marginRight: "15%",
              maxHeight: "80%",
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
    </>
  );
});

HeroVideo.displayName = "HeroVideo";
export default HeroVideo;
