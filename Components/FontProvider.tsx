"use client";

import { Inter, Fira_Code } from "next/font/google";
import { useEffect } from "react";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  preload: true,
});

const firaCode = Fira_Code({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  preload: true,
});

export function FontProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Apply font classes to document body
    document.body.className = `${inter.className} ${document.body.className}`;

    // Create CSS variables for the fonts
    document.documentElement.style.setProperty(
      "--font-inter",
      inter.style.fontFamily
    );
    document.documentElement.style.setProperty(
      "--font-fira-code",
      firaCode.style.fontFamily
    );
  }, []);

  return <>{children}</>;
}
