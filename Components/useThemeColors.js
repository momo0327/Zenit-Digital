import { useEffect } from "react";

// Define theme configurations
const themeConfigs = {
  default: {
    bg: "var(--color-blue)",
    text: "white",
    buttonBg: "white",
    buttonText: "var(--color-blue)",
    navText: "white",
  },
  selectedWorks: {
    bg: "var(--custom-blue)",
    text: "white",
    buttonBg: "white",
    buttonText: "var(--custom-blue)",
    navText: "white",
  },
};

/**
 * A hook for applying theme colors based on section visibility
 */
export const useThemeColors = () => {
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Get header element
    const header = document.querySelector("header");
    if (!header) return;

    // Apply initial theme
    applyTheme("selectedWorks", header);

    // Set up the intersection observer only once
    const observer = new IntersectionObserver(
      (entries) => {
        // Filter for visible entries above threshold
        const visibleEntries = entries.filter(
          (entry) => entry.isIntersecting && entry.intersectionRatio >= 0.5
        );

        if (visibleEntries.length > 0) {
          // Get the top-most visible section
          const mostVisibleEntry = visibleEntries.reduce((prev, current) =>
            prev.boundingClientRect.top < current.boundingClientRect.top
              ? prev
              : current
          );

          const theme = mostVisibleEntry.target.dataset.theme || "default";
          applyTheme(theme, header);
          console.log(`Theme changed to: ${theme}`);
        }
      },
      {
        root: null, // Use viewport
        rootMargin: "-10% 0px 0px 0px", // Focus on top of viewport
        threshold: [0.5, 0.75], // Trigger at 50% and 75% visibility
      }
    );

    // Observe all sections with data-theme attribute
    const themeSections = document.querySelectorAll("[data-theme]");
    themeSections.forEach((section) => {
      observer.observe(section);
    });

    // Helper function to apply a theme
    function applyTheme(themeName, headerElement) {
      const theme = themeConfigs[themeName] || themeConfigs.default;

      // Apply to header
      headerElement.style.backgroundColor = theme.bg;
      headerElement.style.color = theme.text;

      // Apply to nav links
      const navLinks = headerElement.querySelectorAll("a");
      navLinks.forEach((link) => {
        link.style.color = theme.navText;
      });
    }

    // Cleanup function
    return () => {
      themeSections.forEach((section) => {
        observer.unobserve(section);
      });
      observer.disconnect();
    };
  }, []);

  return null;
};

export default useThemeColors;
