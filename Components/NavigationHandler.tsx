"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function NavigationHandler() {
  const pathname = usePathname();

  useEffect(() => {
    // Track navigation paths in sessionStorage
    const previousPath = sessionStorage.getItem("previousPath");
    const currentPath = pathname || "/";

    // Check if we're coming back from a specific path like booking
    if (
      previousPath &&
      previousPath.includes("/booking") &&
      currentPath === "/"
    ) {
      // If coming back from booking page to home, reload
      window.location.reload();
    }

    // Store current path for next navigation
    sessionStorage.setItem("previousPath", currentPath);
  }, [pathname]);

  return null;
}
