'use client';
import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SelectedWorks from "../components/SelectedWorks";
import Service from "../Components/StackedFolders/Service";

export default function StackedCardsContainer() {
  const containerRef = useRef(null);
  
  useEffect(() => {
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
      
      // Get our sections
      const container = containerRef.current;
      const selectedWorksSection = document.querySelector(".selected-works-section");
      const servicesSection = document.querySelector(".services-section");
      const navbar = document.querySelector(".navbar");
      
      if (!selectedWorksSection || !servicesSection) {
        console.error("Could not find sections");
        return;
      }
      
      console.log("Sections found", {selectedWorksSection, servicesSection});
      
      // Fix for horizontal scroll
      document.body.style.overflowX = "hidden";
      
      // Set up the stacking context
      gsap.set(container, {
        position: "relative",
        overflow: "visible"
      });
      
      // Remove any existing color change ScrollTriggers that might be conflicting
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.vars && trigger.vars.onUpdate && trigger.vars.onUpdate.toString().includes('backgroundColor')) {
          trigger.kill();
        }
      });

      // IMPORTANT: Override the background color management for all sections
      // We'll create a clean ScrollTrigger approach that doesn't interfere with other sections
      
      // First, disable the automatic color transitions from the parent page
      const disableParentColorTransitions = () => {
        // Find the parent's ScrollTrigger instances that change background color
        const parentTriggers = ScrollTrigger.getAll().filter(trigger => 
          trigger.vars.onEnter && (
            trigger.vars.onEnter.toString().includes('backgroundColor') || 
            trigger.vars.onEnter.toString().includes('style.color')
          )
        );
        
        // Disable them by replacing their callbacks with empty functions
        parentTriggers.forEach(trigger => {
          if (trigger.vars.onEnter) trigger.vars.onEnter = () => {};
          if (trigger.vars.onLeave) trigger.vars.onLeave = () => {};
          if (trigger.vars.onEnterBack) trigger.vars.onEnterBack = () => {};
          if (trigger.vars.onLeaveBack) trigger.vars.onLeaveBack = () => {};
        });
        
        console.log(`Disabled ${parentTriggers.length} parent color transitions`);
      };
      
      // Call this after a short delay to ensure it runs after parent page setup
      setTimeout(disableParentColorTransitions, 500);
      
      // Set up our sections exactly as they should be
      gsap.set(selectedWorksSection, { 
        position: "relative",
        zIndex: 2,
        backgroundColor: "var(--custom-blue)",
        width: "100%",
        margin: "0 auto"
      });
      
      gsap.set(servicesSection, {
        backgroundColor: "white",
        marginTop: "-100vh",
        position: "relative",
        zIndex: 1 
      });
      
      // Create a marker for transition
      const triggerMarker = document.createElement("div");
      triggerMarker.className = "section-transition-trigger";
      triggerMarker.style.height = "100vh";
      selectedWorksSection.appendChild(triggerMarker);
      
      // Create the slide-up and shrink animation without any color management
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerMarker,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
          markers: false
        }
      });
      
      tl.to(selectedWorksSection, {
        y: "-30vh",
        duration: 0.3,
        ease: "none"
      }, 0);
      
      tl.to(selectedWorksSection, {
        y: "-100vh",
        width: "80%",
        borderRadius: "40px",
        duration: 0.7,
        ease: "none",
        onUpdate: function() {
          selectedWorksSection.style.marginLeft = "auto";
          selectedWorksSection.style.marginRight = "auto";
        }
      }, 0.3);
      
      // Create a completely separate system for background color management
      const updateBodyColors = (section) => {
        if (section === "selected-works") {
          // When in Selected Works, use blue/pink
          document.body.style.backgroundColor = "var(--custom-blue)";
          document.body.style.color = "var(--custom-pink)";
        } 
        else if (section === "services" || section === "test") {
          // When in Services OR Test, use white/green
          document.body.style.backgroundColor = "white";
          document.body.style.color = "var(--custom-green)";
        }
      };
      
      // Set up triggers for color changes
      ScrollTrigger.create({
        trigger: selectedWorksSection,
        start: "top 80%",
        end: "bottom 30%",
        onEnter: () => updateBodyColors("selected-works"),
        onEnterBack: () => updateBodyColors("selected-works")
      });
      
      ScrollTrigger.create({
        trigger: servicesSection,
        start: "top 70%",
        end: "bottom 30%",
        onEnter: () => updateBodyColors("services"),
        onEnterBack: () => updateBodyColors("services")
      });
      
      // Find and set up color changes for the Test section
      const testSection = document.querySelector('section[data-bg="white"]');
      if (testSection) {
        ScrollTrigger.create({
          trigger: testSection,
          start: "top 70%", 
          end: "bottom 30%",
          onEnter: () => {
            console.log("Test section entered - setting WHITE");
            updateBodyColors("test");
          },
          onEnterBack: () => {
            console.log("Test section entered back - setting WHITE");
            updateBodyColors("test");
          }
        });
      }
      
      // Add navbar animation for medium and large screens
      if (window.innerWidth >= 768 && navbar) {
        const projects = document.querySelectorAll('.scroll-item');
        const lastProject = projects[projects.length - 1];
        
        if (lastProject) {
          setTimeout(() => {
            // Find the 01 service item
            const stickyItems = servicesSection.querySelectorAll('.sticky');
            let service01Item = stickyItems[0];
            
            // Find by text content if possible
            for(let i = 0; i < stickyItems.length; i++) {
              const textElement = stickyItems[i].querySelector('span.text-2xl, span.text-5xl, span.col-span-2');
              if (textElement && textElement.textContent.trim() === "01") {
                service01Item = stickyItems[i];
                break;
              }
            }
            
            if (service01Item) {
              // Create the navbar animation
              const updateNavbarState = (state) => {
                if (window.matchMedia("(min-width: 768px)").matches) {
                  gsap.to(navbar, {
                    y: state === "hidden" ? "-100%" : "0%",
                    duration: 0.5,
                    ease: state === "hidden" ? "power2.in" : "power2.out"
                  });
                }
              };
              
              ScrollTrigger.create({
                trigger: lastProject,
                endTrigger: service01Item,
                start: "top center",
                end: "top 20vh",
                onEnter: () => updateNavbarState("hidden"),
                onLeave: () => updateNavbarState("visible"),
                onEnterBack: () => updateNavbarState("hidden"),
                onLeaveBack: () => updateNavbarState("visible")
              });
            }
          }, 1000);
        }
      }
      
      // Resize handler
      const handleResize = () => {
        if (window.innerWidth < 768 && navbar) {
          gsap.to(navbar, { y: "0%", duration: 0.3 });
        }
        document.body.style.overflowX = "hidden";
      };
      
      window.addEventListener('resize', handleResize);
      
      // Clean up
      return () => {
        if (triggerMarker.parentNode) {
          triggerMarker.parentNode.removeChild(triggerMarker);
        }
        window.removeEventListener('resize', handleResize);
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      };
    }
  }, []);

  return (
    <div className="stacked-cards-container w-full overflow-x-hidden" ref={containerRef}>
      <SelectedWorks />
      <Service />
    </div>
  );
}