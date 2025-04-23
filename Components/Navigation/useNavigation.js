"use client";
import { useRouter, usePathname } from "next/navigation";

/**
 * Custom hook for handling navigation and scroll functionality
 */
export function useNavigation() {
  const router = useRouter();
  const pathname = usePathname();

  // Function to scroll to a section using Lenis smooth scrolling
  const scrollToSection = (
    sectionId,
    isMenuOpen = false,
    toggleMenu = () => {}
  ) => {
    console.log(
      `scrollToSection called with id: ${sectionId}, path: ${pathname}`
    );

    // Close menu if it's open
    if (isMenuOpen) {
      toggleMenu();
    }

    // Check if we're on the homepage
    if (pathname !== "/") {
      console.log(`Not on homepage, navigating to / first`);
      // Navigate to homepage and then scroll after navigation completes
      router.push("/");

      // Use setTimeout to wait for the navigation to complete
      setTimeout(() => {
        scrollToElement(sectionId);
      }, 500);
    } else {
      console.log(`Already on homepage, scrolling directly`);
      // We're already on the homepage, so just scroll
      scrollToElement(sectionId);
    }
  };

  // Helper function to scroll to an element
  const scrollToElement = (sectionId) => {
    console.log(`scrollToElement looking for section with id: ${sectionId}`);
    const section = document.getElementById(sectionId);

    if (section) {
      console.log(`Section found, dispatching scrollToSection event to Lenis`);

      // Force a small scroll to initialize Lenis if needed
      window.scrollBy(0, 1);

      try {
        // Use custom event to communicate with Lenis instance in SmoothScroll
        window.dispatchEvent(
          new CustomEvent("scrollToSection", {
            detail: {
              target: section,
              offset: -80, // Offset for navbar
            },
          })
        );
        console.log("scrollToSection event dispatched successfully");
      } catch (error) {
        console.error("Error dispatching scrollToSection event:", error);
      }

      // Fallback direct scroll if the event doesn't work
      setTimeout(() => {
        console.log("Fallback: Using scrollIntoView");
        section.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } else {
      console.error(`Section not found: ${sectionId}`);
      // List all section IDs in the document for debugging
      const allSections = document.querySelectorAll("section[id]");
      console.log(
        "Available sections:",
        Array.from(allSections).map((s) => s.id)
      );
    }
  };

  // Function to navigate to a specific route
  const navigateTo = (route, isMenuOpen = false, toggleMenu = () => {}) => {
    console.log(`navigateTo called with route: ${route}`);

    if (isMenuOpen) {
      toggleMenu();
      setTimeout(() => {
        router.push(route);
      }, 300);
    } else {
      router.push(route);
    }
  };

  return {
    scrollToSection,
    navigateTo,
    pathname,
  };
}
