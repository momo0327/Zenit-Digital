'use client';
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AnimatedTitle from './AnimatedTitle';

gsap.registerPlugin(ScrollTrigger);

const Services = () => {
  const servicesRef = useRef(null);
  const sectionsRef = useRef([]);
  
  // Updated service data to match the images
  const serviceData = [
    {
      id: '01',
      title: 'Web Development',
      description: 'A website developed to captivate and convert can elevate your brand to new heights.',
      content: 'My custom-coded sites are meticulously crafted to reflect your unique identity, delivering seamless experiences with a focus on animation—keeping your audience engaged and returning.',
      subServices: [
        { id: '01', title: 'CMS Integration' },
        { id: '02', title: 'Motion & Animations' },
        { id: '03', title: '3D Development' }
      ]
    },
    {
      id: '02',
      title: 'Web Design',
      description: 'Amplify your online presence with a website that truly connects with your audience\'s feelings and desires.',
      content: 'I design stunning, high-converting sites that align with your business goals, helping you stand out and scale effectively.',
      subServices: [
        { id: '01', title: 'Responsive Design' },
        { id: '02', title: 'Wireframing' },
        { id: '03', title: 'UX Writing' }
      ]
    },
    {
      id: '03',
      title: 'SEO',
      description: 'Your website deserves to be seen.',
      content: 'I optimize your online presence to elevate your visibility in search results, helping your business attract the right audience and stand out in the digital landscape.',
      subServices: [
        { id: '01', title: 'Technical SEO' },
        { id: '02', title: 'On-Page Optimization' },
        { id: '03', title: 'SEO Audits & Analysis' }
      ]
    }
  ];

  useEffect(() => {
    if (typeof window === "undefined") return;
    
    const ctx = gsap.context(() => {
      const sections = sectionsRef.current;
      const servicesContainer = servicesRef.current;
      
      // Create a timeline for pinning the entire section
      const mainTl = gsap.timeline({
        scrollTrigger: {
          trigger: servicesContainer,
          start: "top top",
          end: "bottom bottom",
          pin: true,
          pinSpacing: true,
          scrub: 1,
          markers: false
        }
      });
      
      // Initialize section states
      sections.forEach((section, index) => {
        const sectionContent = section.querySelector('.section-content');
        const sectionSubservices = section.querySelector('.subservices');
        
        // Show first section fully, hide others
        if (index === 0) {
          gsap.set(section, { opacity: 1 });
          gsap.set(sectionContent, { opacity: 1, height: 'auto' });
          gsap.set(sectionSubservices, { opacity: 1, height: 'auto' });
        } else {
          gsap.set(section, { opacity: 0, y: 100 });
          gsap.set(sectionContent, { opacity: 0, height: 0 });
          gsap.set(sectionSubservices, { opacity: 0, height: 0 });
        }
      });
      
      // For each section (except the last one)
      sections.forEach((section, index) => {
        if (index < sections.length - 1) {
          const nextSection = sections[index + 1];
          const sectionHeader = section.querySelector('.service-header');
          const sectionContent = section.querySelector('.section-content');
          const sectionSubservices = section.querySelector('.subservices');
          
          // Create a timeline for each section transition
          const sectionTl = gsap.timeline();
          
          // First animate in the next section
          sectionTl.to(nextSection, {
            opacity: 1,
            y: 0,
            duration: 0.3
          }, 0);
          
          // Collapse current section's content and subservices
          sectionTl.to([sectionContent, sectionSubservices], {
            opacity: 0,
            height: 0,
            duration: 0.3
          }, 0);
          
          // Move current section header to stacked position
          sectionTl.to(sectionHeader, {
            y: -60 * index,
            duration: 0.3,
            paddingTop: 0,
            paddingBottom: 0
          }, 0.15);
          
          // Reveal next section's content
          sectionTl.to(nextSection.querySelector('.section-content'), {
            opacity: 1,
            height: 'auto',
            duration: 0.3
          }, 0.3);
          
          // Reveal next section's subservices
          sectionTl.to(nextSection.querySelector('.subservices'), {
            opacity: 1,
            height: 'auto',
            duration: 0.3
          }, 0.4);
          
          // Add this timeline to the main timeline
          mainTl.add(sectionTl, index);
        }
      });
      
    }, servicesRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={servicesRef}
      className="services-container relative py-32 min-h-screen bg-black text-white"
    >
      <div className="container mx-auto px-4">
        <h1 className="mb-24 text-4xl">
          <AnimatedTitle title='SERVICES' />
        </h1>
        
        <div className="services-list space-y-12">
          {serviceData.map((service, index) => (
            <div
              key={service.id}
              ref={el => sectionsRef.current[index] = el}
              className="service-section pt-6"
            >
              <div className="service-header flex justify-between items-center cursor-pointer">
                <span className="service-number text-4xl md:text-7xl text-gray-600 font-light">
                  ({service.id})
                </span>
                <h2 className="service-title text-3xl md:text-5xl font-bold">
                  {service.title}
                </h2>
                <div className="service-icon">
                  {service.id === '01' && <span className="text-2xl">★</span>}
                  {service.id === '02' && <span className="text-2xl">⬢</span>}
                  {service.id === '03' && <span className="text-2xl">⬟</span>}
                </div>
              </div>
              
              <div className="section-content mt-6 overflow-hidden">
                <p className="text-lg md:text-xl max-w-2xl ml-auto">
                  {service.description}
                </p>
                
                <p className="text-base md:text-lg max-w-2xl ml-auto mt-4">
                  {service.content}
                </p>
              </div>
              
              <div className="subservices mt-8 overflow-hidden">
                <ul className="space-y-4 max-w-2xl ml-auto">
                  {service.subServices.map((subService) => (
                    <li key={subService.id} className="border-t border-gray-700 pt-4">
                      <div className="flex items-center">
                        <span className="text-gray-500 mr-4">{subService.id}</span>
                        <span className="text-xl md:text-2xl">{subService.title}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;