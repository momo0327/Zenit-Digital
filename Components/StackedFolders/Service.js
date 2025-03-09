// pages/services.js
import { useEffect } from "react";
import { gsap } from "gsap";

export default function Service() {
  useEffect(() => {
    gsap.from(".animated-text", {
      y: "100%",
      opacity: 0,
      duration: 1,
    });
  }, []);

  return (
    <div className="relative z-20 min-h-screen w-full overflow-x-clip">
      <section
        id="services"
        className="section-padding rounded-t-3xl bg-secondary-400"
      >
        <div className="flex w-full flex-col gap-y-space-lg md:gap-y-space-2xl">
          <h2 className="section-heading col-span-6 max-w-[18ch] text-accent-400">
            <span aria-hidden="true" className="animated-text">
              How I can help you /
            </span>
          </h2>
          <div className="flex grid-cols-12 gap-x-fluid md:grid">
            <div className="col-span-7 flex flex-col gap-x-space-xl gap-y-space-2xs sm:flex-row md:col-start-6">
              <span className="flex h-fit overflow-clip font-mono tracking-mono">
                <span className="flex h-full font-medium uppercase text-nowrap text-secondary-75 animated-text">
                  (Services)
                </span>
              </span>
              <p className="w-full max-w-[35ch] text-balance text-base-large font-medium leading-base text-secondary-50 animated-text">
                Frustrated with websites that don&apos;t reflect your brand or drive
                growth? I craft premium web experiences that captivate and help
                you focus on growing your business.
              </p>
            </div>
          </div>

          <div className="w-full pt-space-lg">
            <div className="mt-12 flex flex-col gap-y-16">
              <div
                className="sticky top-0 border-t border-t-secondary-300 bg-secondary-400"
                style={{ top: "calc(20vh + 0em)", marginBottom: "17.25em" }}
              >
                <div className="flex grid-cols-12 items-center gap-x-space-xs text-left text-heading-2 font-semibold text-accent-400 md:grid md:gap-x-fluid">
                  <span className="col-span-2">(01)</span>
                  <h3 className="col-span-6 col-start-6 py-space-md 2xl:py-space-sm">
                    Web Development
                  </h3>
                </div>
                <div className="grid-gap flex min-h-[30vh] flex-col pt-space-3xs md:grid md:min-h-[40vh] md:grid-cols-12">
                  <div className="col-span-7 col-start-6 flex flex-col gap-y-space-sm pt-space-sm text-heading-4">
                    <p className="max-w-[40ch] text-base font-medium text-secondary-50 animated-text">
                      A website developed to captivate and convert can elevate
                      your brand to new heights. My custom-coded sites are
                      meticulously crafted to reflect your unique identity,
                      delivering seamless experiences with a focus on
                      animation—keeping your audience engaged and returning.
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="sticky top-0 border-t border-t-secondary-300 bg-secondary-400"
                style={{ top: "calc(20vh + 5.75em)", marginBottom: "11.5em" }}
              >
                <div className="flex grid-cols-12 items-center justify-start gap-x-space-xs text-left text-heading-2 font-semibold text-accent-400 md:grid md:gap-x-fluid">
                  <span className="col-span-2">(02)</span>
                  <h3 className="col-span-6 col-start-6 py-space-md 2xl:py-space-sm">
                    Web Design
                  </h3>
                </div>
                <div className="grid-gap flex min-h-[30vh] flex-col pt-space-3xs md:grid md:min-h-[40vh] md:grid-cols-12">
                  <div className="col-span-7 col-start-6 flex w-full flex-col gap-y-space-sm pt-space-sm text-heading-4">
                    <p className="max-w-[40ch] text-base font-medium text-secondary-50 animated-text">
                      Amplify your online presence with a website that truly
                      connects with your audience&apos;s feelings and desires. I
                      design stunning, high-converting sites that align with
                      your business goals, helping you stand out and scale
                      effectively.
                    </p>
                  </div>
                </div>
              </div>

              <div
                className="sticky top-0 border-t border-t-secondary-300 bg-secondary-400"
                style={{ top: "calc(20vh + 11.5em)", marginBottom: "5.75em" }}
              >
                <div className="flex grid-cols-12 items-center justify-start gap-x-space-xs text-left text-heading-2 font-semibold text-accent-400 md:grid md:gap-x-fluid">
                  <span className="col-span-2">(03)</span>
                  <h3 className="col-span-6 col-start-6 py-space-md 2xl:py-space-sm">
                    SEO
                  </h3>
                </div>
                <div className="grid-gap flex min-h-[30vh] flex-col pt-space-3xs md:grid md:min-h-[40vh] md:grid-cols-12">
                  <div className="col-span-7 col-start-6 flex w-full flex-col gap-y-space-sm pt-space-sm text-heading-4">
                    <p className="max-w-[40ch] text-base font-medium text-secondary-50 animated-text">
                      Your website deserves to be seen. I optimize your online
                      presence to elevate your visibility in search results,
                      helping your business attract the right audience and stand
                      out in the digital landscape.
                    </p>
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
