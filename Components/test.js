import React from 'react';

function Test() {
  return (
    <section
      className="min-h-screen flex flex-col"
      data-bg="white"
      data-text="var(--custom-green)"
      data-button-bg="var(--custom-green)"
      data-button-text="var(--custom-lightGreen)"
      data-nav-text="var(--custom-lightGreen)"
    >
      {/* Main Content */}
      <div className="flex flex-col lg:flex-row flex-1 px-6 sm:px-10 lg:px-16 pt-8 lg:pt-12 gap-8 bg-white">
        {/* Left Section */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center">
          <h1 className="text-4xl lg:text-7xl font-medium mb-4 sm:mb-6 text-custom-green">
            Need to <span className="text-custom-lightGreen">Grow</span> your digital presence? We are here to help you!
          </h1>
          <p className="text-custom-green text-base sm:text-lg mt-2 sm:mt-4">
            Book a free 45 min consultation
          </p>
          <div className="mt-4 sm:mt-6">
            <button className="bg-custom-green text-custom-lightGreen px-6 sm:px-8 py-3 rounded-lg font-bold flex items-center">
              Let&apos;s Talk
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-1/2 relative flex items-center justify-center rounded-md bg-custom-green overflow-hidden mb-10">
          <video
            className="w-full h-auto max-w-full sm:max-w-md lg:max-w-lg"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="flower.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </section>
  );
}

export default Test;
