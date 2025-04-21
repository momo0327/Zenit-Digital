"use client";

import { createContext, useContext, useState, useEffect } from "react";

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

// Create the context
const ThemeContext = createContext();

// Create a provider component
export function ThemeProvider({ children }) {
  const [currentTheme, setCurrentTheme] = useState("default");

  // Use effect for any initialization if needed
  useEffect(() => {
    // Setup code if necessary
    return () => {
      // Cleanup code if necessary
    };
  }, []);

  // Function to update the theme
  const setTheme = (themeName) => {
    if (themeConfigs[themeName]) {
      setCurrentTheme(themeName);
    } else {
      console.warn(`Theme "${themeName}" not found, using default`);
      setCurrentTheme("default");
    }
  };

  // Value object to be provided to consumers
  const value = {
    currentTheme,
    setTheme,
    themes: themeConfigs,
    currentThemeConfig: themeConfigs[currentTheme] || themeConfigs.default,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

// Custom hook to use the theme
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

// Export the theme configs as well for direct use
export { themeConfigs };
