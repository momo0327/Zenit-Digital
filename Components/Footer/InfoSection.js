import React from "react";

/**
 * InfoSection component that contains the global information and contact details
 */
const InfoSection = () => {
  return (
    <>
      {/* Working Globally Section - with MP4 video replacing the globe emoji */}
      <div className="absolute bottom-8 left-8 flex justify-end items-center">
        <div className="w-12 h-12 border bg-custom-green border-custom-lightGreen rounded-full flex items-center justify-center mr-4 overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/globe.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div>
          <p className="text-sm text-custom-green">Working Globally</p>
          <p className="text-sm text-white">Available Apr &apos;25</p>
        </div>
      </div>

      {/* For Further Inquiries */}
      <div className="absolute bottom-8 right-8 text-right">
        <h4 className="text-sm mb-1">FOR FURTHER INQUIRIES</h4>
        <p className="text-sm flex items-center justify-end">
          <span className="mr-1">→</span> hello@zenitdigital.se
        </p>
      </div>
    </>
  );
};

export default InfoSection;
