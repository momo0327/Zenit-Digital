import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Service() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);

      const titleLetters = document.querySelectorAll(".services-title-letter");

      // IMPORTANT: Remove all GSAP setup for the section itself
      // This will now be handled by the parent container

      // Animate only the title letters
      if (titleLetters.length > 0) {
        gsap.set(titleLetters, { y: 160 });
        gsap.to(titleLetters, {
          y: 0,
          duration: 1,
          stagger: 0.04,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ".services-section",
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      }
    }
  }, []);

  return (
    <section
      className="services-section  pt-44 bg-white"
      id="services"
      data-bg="white"
      data-text="var(--custom-green)"
      data-button-bg="var(--custom-green)"
      data-button-text="var(--custom-lightGreen)"
      data-nav-text="var(--custom-lightGreen)"
    >
      <div className="flex w-full flex-col gap-y-space-lg md:gap-y-space-2xl mt-32 2xl:mt-80">
        {/* Title container with overflow hidden */}
        <div className="title-container pl-4 md:pl-8 lg:pl-8">
          <div className="overflow-hidden inline-block">
            <h1 className="section-heading col-span-6 max-w-[18ch] text-7xl lg:text-9xl md:text-9xl 2xl:text-[10rem] mt-44 2xl:mt-72 font-bold text-custom-green">
              {Array.from("SERVICES").map((letter, index) => (
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
              style={{ top: "calc(20vh + 0em)", marginBottom: "14em" }}
            >
              <div className="flex grid-cols-12 items-center gap-x-space-xs text-left md:grid md:gap-x-fluid">
                <span className="col-span-2 text-2xl hidden md:block lg:text-5xl md:text-5xl 2xl:text-8xl font-light text-gray-400 ml-10">
                  01
                </span>
                <div className="col-span-6 col-start-6 flex flex-col ">
                  <h3 className="py-8 text-3xl lg:text-5xl 2xl:text-8xl ml-5 lg:ml-0   md:text-6xl font-bold lg:font-medium  text-custom-green">
                    Web Development
                  </h3>
                  {/* Technology containers placed directly under the title */}
                </div>
              </div>
              <div className="grid-gap flex min-h-[30vh] flex-col pt-space-3xs md:grid md:min-h-[40vh] md:grid-cols-12">
                <div className="col-span-7 col-start-6 flex flex-col gap-y-space-sm pt-space-sm">
                  <p className="max-w-[40ch]  ml-5 text-sm lg:text-xl font-normal leading-relaxed text-custom-green animated-text">
                    We offer end-to-end web development services tailored to
                    your business needs. Our focus is on delivering
                    high-performance websites with clean, scalable code and a
                    custom look and feel.
                  </p>

                  <div className=" space-y-0  ml-5 text-sm">
                    <div className="border-t border-gray-800 py-4 lg:py-6">
                      <div className="flex items-center">
                        <span className="text-base text-custom-green font-normal pr-6">
                          01
                        </span>
                        <h4 className="text-lg lg:text-2xl font-normal text-custom-green">
                          NextJs
                        </h4>
                      </div>
                    </div>
                    <div className="border-t border-gray-800 py-4 lg:py-6">
                      <div className="flex items-center">
                        <span className="text-base text-custom-green font-normal pr-6">
                          02
                        </span>
                        <h4 className="text-lg lg:text-2xl font-normal text-custom-green">
                          CMS Integration
                        </h4>
                      </div>
                    </div>
                    <div className="border-t border-gray-800 py-4 lg:py-6">
                      <div className="flex items-center">
                        <span className="text-base text-custom-green font-normal pr-6">
                          03
                        </span>
                        <h4 className="text-lg lg:text-2xl font-normal text-custom-green">
                          UI/UX Design
                        </h4>
                      </div>
                    </div>
                    <div className="border-t border-gray-800 py-4 lg:py-6">
                      <div className="flex items-center">
                        <span className="text-base text-custom-green font-normal pr-6">
                          04
                        </span>
                        <h4 className="text-lg lg:text-2xl font-normal text-custom-green">
                          SEO
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="sticky top-0 border-t border-t-gray-800 bg-white"
              style={{ top: "calc(20vh + 5.75em)", marginBottom: "11em" }}
            >
              <div className="flex grid-cols-12 items-center justify-start gap-x-space-xs text-left md:grid md:gap-x-fluid">
                <span className="col-span-2 text-2xl hidden md:block lg:text-5xl md:text-5xl 2xl:text-8xl font-light text-gray-400 ml-10">
                  02
                </span>
                <div className="col-span-6 col-start-6 flex flex-col">
                  <h3 className="py-8 text-3xl lg:text-5xl 2xl:text-8xl ml-5 lg:ml-0 md:text-6xl font-bold lg:font-medium  text-custom-green">
                    Mobile App Development
                  </h3>
                  {/* Technology containers placed directly under the title */}
                </div>
              </div>
              <div className="grid-gap flex min-h-[30vh] flex-col pt-space-3xs md:grid md:min-h-[40vh] md:grid-cols-12">
                <div className="col-span-7 col-start-6 flex w-full flex-col gap-y-space-sm pt-space-sm">
                  <p className="max-w-[40ch]  ml-5 text-sm lg:text-xl font-normal leading-relaxed text-custom-green animated-text">
                    A powerful mobile app can transform how users experience
                    your brand—right in the palm of their hand. We craft sleek,
                    high-performing apps with custom code and intuitive design,
                    built to engage, retain, and scale with your vision.
                  </p>

                  <div className=" space-y-0  ml-5">
                    <div className="border-t border-gray-800 py-4 lg:py-6 ">
                      <div className="flex items-center ">
                        <span className="text-base text-custom-green font-normal pr-6 ">
                          01
                        </span>
                        <h4 className="text-lg lg:text-2xl font-normal text-custom-green">
                          React Native & Expo
                        </h4>
                      </div>
                    </div>
                    <div className="border-t border-gray-800 py-4 lg:py-6">
                      <div className="flex items-center">
                        <span className="text-base text-custom-green font-normal pr-6">
                          02
                        </span>
                        <h4 className="text-lg lg:text-2xl font-normal text-custom-green">
                          UI/UX Design
                        </h4>
                      </div>
                    </div>
                    <div className="border-t border-gray-800 py-4 lg:py-6">
                      <div className="flex items-center">
                        <span className="text-base text-custom-green font-normal pr-6">
                          03
                        </span>
                        <h4 className="text-lg lg:text-2xl font-normal text-custom-green">
                          IOS & Android
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="sticky top-0 border-t border-t-gray-800 bg-white"
              style={{ top: "calc(20vh + 11.5em)", marginBottom: "-2em" }}
            >
              <div className="flex grid-cols-12 items-center justify-start gap-x-space-xs text-left md:grid md:gap-x-fluid">
                <span className="col-span-2 text-2xl hidden md:block lg:text-5xl md:text-5xl 2xl:text-8xl font-light text-gray-400 ml-10">
                  03
                </span>
                <div className="col-span-6 col-start-6 flex flex-col">
                  <h3 className="py-8 text-3xl lg:text-5xl 2xl:text-8xl ml-5 lg:ml-0  md:text-6xl font-bold lg:font-medium text-custom-green">
                    Fullstack Development
                  </h3>
                </div>
              </div>
              <div className="grid-gap flex min-h-[30vh] flex-col pt-space-3xs md:grid md:min-h-[40vh] md:grid-cols-12">
                <div className="col-span-7 col-start-6 flex w-full flex-col gap-y-space-sm pt-space-sm">
                  <p className="max-w-[40ch] ml-5 text-sm lg:text-xl font-normal leading-relaxed text-custom-green animated-text">
                    From backend logic to front-end finesse, We build complete
                    digital solutions tailored to your unique challenges. Our
                    full-stack approach combines custom software development
                    with thoughtful design, ensuring seamless performance across
                    every layer of your product.
                  </p>

                  <div className=" space-y-0  ml-5">
                    <div className="border-t border-gray-800 py-4 lg:py-6">
                      <div className="flex items-center">
                        <span className="text-base text-custom-green font-normal pr-6">
                          01
                        </span>
                        <h4 className="text-lg lg:text-2xl font-normal text-custom-green">
                          NextJS
                        </h4>
                      </div>
                    </div>
                    <div className="border-t border-gray-800 py-4  lg:py-6">
                      <div className="flex items-center">
                        <span className="text-base text-custom-green font-normal pr-6">
                          02
                        </span>
                        <h4 className="text-lg lg:text-2xl font-normal text-custom-green">
                          Node.Js
                        </h4>
                      </div>
                    </div>
                    <div className="border-t border-gray-800 py-4  lg:py-6">
                      <div className="flex items-center">
                        <span className="text-base text-custom-green font-normal pr-6">
                          03
                        </span>
                        <h4 className="text-lg lg:text-2xl font-normal text-custom-green">
                          UI/UX Design
                        </h4>
                      </div>
                    </div>
                    <div className="border-t border-gray-800 py-4 lg:py-6">
                      <div className="flex items-center">
                        <span className="text-base text-custom-green font-normal pr-6">
                          03
                        </span>
                        <h4 className="text-lg lg:text-2xl font-normal text-custom-green">
                          Supabase
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
  );
}
