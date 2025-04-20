import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Service() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);

      const section = document.querySelector("#services");
      const titleLetters = document.querySelectorAll(".services-title-letter");
      const serviceCards = document.querySelectorAll(
        "#services > div > div > div"
      );

      if (section && titleLetters.length > 0) {
        // Initially set the services section with lower opacity but keep it in document flow
        gsap.set(section, {
          opacity: 0,
          position: "relative",
          zIndex: 10,
          y: 40,
          scale: 0.98,
        });

        // Set initial position for the letters
        gsap.set(titleLetters, { y: 160 });

        // Animate the letters when the section comes into view
        gsap.to(titleLetters, {
          y: 0,
          duration: 1.2,
          stagger: 0.05,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });

        // Fade in the services section with improved animation
        gsap.to(section, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "top 40%",
            scrub: 0.3,
            preventOverlaps: true,
            fastScrollEnd: true,
            invalidateOnRefresh: true,
          },
        });

        // Add staggered entrance for service cards if they exist
        if (serviceCards.length > 0) {
          gsap.set(serviceCards, {
            opacity: 0,
            y: 50,
          });

          gsap.to(serviceCards, {
            opacity: 1,
            y: 0,
            duration: 1,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 60%",
              toggleActions: "play none none none",
            },
          });
        }
      }
    }
  }, []);

  return (
    <div className="relative w-full overflow-x-clip">
      <section
        id="services"
        className="services-section pt-44 bg-white min-h-screen opacity-0"
        data-bg="white"
        data-text="var(--custom-green)"
        data-button-bg="var(--custom-green)"
        data-button-text="var(--custom-lightGreen)"
        data-nav-text="var(--custom-lightGreen)"
      >
        <div className="flex w-full flex-col gap-y-space-lg md:gap-y-space-2xl">
          {/* Title container with overflow hidden */}
          <div className="title-container">
            <div className="overflow-hidden inline-block">
              <h1 className="section-heading col-span-6 max-w-[18ch] text-7xl lg:text-9xl md:text-9xl font-bold text-custom-green">
                {Array.from("SERVICES ").map((letter, index) => (
                  <span
                    key={index}
                    className="services-title-letter inline-block"
                  >
                    {letter === " " ? "\u00A0" : letter}
                  </span>
                ))}
              </h1>
            </div>
          </div>

          <div className="w-full pt-space-lg">
            <div className="mt-12 flex flex-col">
              {/* Web Development Card */}
              <div
                className="sticky top-0 border-t border-t-gray-800"
                style={{ top: "calc(20vh + 0em)", marginBottom: "17.25em" }}
              >
                <div className="flex grid-cols-12 items-center gap-x-space-xs text-left md:grid md:gap-x-fluid">
                  <span className="col-span-2 text-2xl lg:text-5xl md:text-5xl font-light text-gray-400 ml-10">
                    01
                  </span>
                  <div className="col-span-6 col-start-6 flex flex-col">
                    <h3 className="py-8 text-4xl lg:text-5xl md:text-6xl font-medium text-custom-green">
                      Web Development
                    </h3>
                    {/* Technology containers placed directly under the title */}
                    <div className="flex gap-2 mb-2">
                      <div className="bg-custom-green text-white px-6 py-3 rounded-full">
                        React Native
                      </div>
                      <div className="bg-custom-green text-white px-6 py-3 rounded-full">
                        Expo
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid-gap flex min-h-[30vh] flex-col pt-space-3xs md:grid md:min-h-[40vh] md:grid-cols-12">
                  <div className="col-span-7 col-start-6 flex flex-col gap-y-space-sm pt-space-sm">
                    <p className="max-w-[40ch]  ml-5 text-2sm lg:text-xl font-normal leading-relaxed text-custom-green animated-text">
                      A website developed to captivate and convert can elevate
                      your brand to new heights. My custom-coded sites are
                      meticulously crafted to reflect your unique identity,
                      delivering seamless experiences with a focus on animation
                      —keeping your audience engaged and returning.
                    </p>

                    <div className=" space-y-0  ml-5">
                      <div className="border-t border-gray-800 py-6">
                        <div className="flex items-center">
                          <span className="text-base text-custom-green font-normal pr-6">
                            01
                          </span>
                          <h4 className="text-2xl font-normal text-custom-green">
                            CMS Integration
                          </h4>
                        </div>
                      </div>
                      <div className="border-t border-gray-800 py-6">
                        <div className="flex items-center">
                          <span className="text-base text-custom-green font-normal pr-6">
                            02
                          </span>
                          <h4 className="text-2xl font-normal text-custom-green">
                            Motion & Animations
                          </h4>
                        </div>
                      </div>
                      <div className="border-t border-gray-800 py-6">
                        <div className="flex items-center">
                          <span className="text-base text-custom-green font-normal pr-6">
                            03
                          </span>
                          <h4 className="text-2xl font-normal text-custom-green">
                            3D Development
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="sticky top-0 border-t border-t-gray-800 bg-white"
                style={{ top: "calc(20vh + 5.75em)", marginBottom: "11.5em" }}
              >
                <div className="flex grid-cols-12 items-center justify-start gap-x-space-xs text-left md:grid md:gap-x-fluid">
                  <span className="col-span-2 text-2xl lg:text-5xl md:text-5xl font-light text-gray-400 ml-10">
                    02
                  </span>
                  <div className="col-span-6 col-start-6 flex flex-col">
                    <h3 className="py-8 text-4xl lg:text-5xl md:text-6xl font-medium text-custom-green">
                      Mobile App Development
                    </h3>
                    {/* Technology containers placed directly under the title */}
                    <div className="flex gap-2 mb-2">
                      <div className="bg-custom-green text-white px-6 py-3 rounded-full">
                        React Native
                      </div>
                      <div className="bg-custom-green text-white px-6 py-3 rounded-full">
                        Expo
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid-gap flex min-h-[30vh] flex-col pt-space-3xs md:grid md:min-h-[40vh] md:grid-cols-12">
                  <div className="col-span-7 col-start-6 flex w-full flex-col gap-y-space-sm pt-space-sm">
                    <p className="max-w-[40ch]  ml-5 text-2sm lg:text-xl font-normal leading-relaxed text-custom-green animated-text">
                      Amplify your online presence with a website that truly
                      connects with your audience&apos;s feelings and desires. I
                      design stunning, high-converting sites that align with
                      your business goals, helping you stand out and scale
                      effectively.
                    </p>

                    <div className=" space-y-0  ml-5">
                      <div className="border-t border-gray-800 py-6 ">
                        <div className="flex items-center ">
                          <span className="text-base text-custom-green font-normal pr-6 ">
                            01
                          </span>
                          <h4 className="text-2xl font-normal text-custom-green">
                            UI/UX Design
                          </h4>
                        </div>
                      </div>
                      <div className="border-t border-gray-800 py-6">
                        <div className="flex items-center">
                          <span className="text-base text-custom-green font-normal pr-6">
                            02
                          </span>
                          <h4 className="text-2xl font-normal text-custom-green">
                            Responsive Design
                          </h4>
                        </div>
                      </div>
                      <div className="border-t border-gray-800 py-6">
                        <div className="flex items-center">
                          <span className="text-base text-custom-green font-normal pr-6">
                            03
                          </span>
                          <h4 className="text-2xl font-normal text-custom-green">
                            Branding Integration
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className="sticky top-0 border-t border-t-gray-800 bg-white"
                style={{ top: "calc(20vh + 11.5em)", marginBottom: "5.75em" }}
              >
                <div className="flex grid-cols-12 items-center justify-start gap-x-space-xs text-left md:grid md:gap-x-fluid">
                  <span className="col-span-2 text-2xl lg:text-5xl md:text-5xl font-light text-gray-400 ml-10">
                    03
                  </span>
                  <div className="col-span-6 col-start-6 flex flex-col">
                    <h3 className="py-8 text-4xl lg:text-5xl md:text-6xl font-medium text-custom-green">
                      Fullstack Development
                    </h3>
                    {/* Technology containers placed directly under the title */}
                    <div className="flex gap-2 mb-2">
                      <div className="bg-custom-green text-white px-6 py-3 rounded-full">
                        React Native
                      </div>
                      <div className="bg-custom-green text-white px-6 py-3 rounded-full">
                        Expo
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid-gap flex min-h-[30vh] flex-col pt-space-3xs md:grid md:min-h-[40vh] md:grid-cols-12">
                  <div className="col-span-7 col-start-6 flex w-full flex-col gap-y-space-sm pt-space-sm">
                    <p className="max-w-[40ch] ml-5 text-2sm lg:text-xl font-normal leading-relaxed text-custom-green animated-text">
                      Your website deserves to be seen. I optimize your online
                      presence to elevate your visibility in search results,
                      helping your business attract the right audience and stand
                      out in the digital landscape.
                    </p>

                    <div className=" space-y-0  ml-5">
                      <div className="border-t border-gray-800 py-6">
                        <div className="flex items-center">
                          <span className="text-base text-custom-green font-normal pr-6">
                            01
                          </span>
                          <h4 className="text-2xl font-normal text-custom-green">
                            Keyword Strategy
                          </h4>
                        </div>
                      </div>
                      <div className="border-t border-gray-800 py-6">
                        <div className="flex items-center">
                          <span className="text-base text-custom-green font-normal pr-6">
                            02
                          </span>
                          <h4 className="text-2xl font-normal text-custom-green">
                            Technical SEO
                          </h4>
                        </div>
                      </div>
                      <div className="border-t border-gray-800 py-6">
                        <div className="flex items-center">
                          <span className="text-base text-custom-green font-normal pr-6">
                            03
                          </span>
                          <h4 className="text-2xl font-normal text-custom-green">
                            Local SEO
                          </h4>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
