"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function NavigationHandler() {
  const pathname = usePathname();

  useEffect(() => {
    // Track navigation paths in sessionStorage
    const previousPath = sessionStorage.getItem("previousPath");
    const currentPath = pathname || "/";

    // Only refresh when coming back from booking to home, not when going to booking
    if (
      previousPath &&
      previousPath.includes("/booking") &&
      currentPath === "/"
    ) {
      // If coming back from booking page to home, reload after a small delay
      // to ensure the navigation is complete
      setTimeout(() => {
        window.location.reload();
      }, 100);
    }

    // Store current path for next navigation
    sessionStorage.setItem("previousPath", currentPath);
  }, [pathname]);

  return null;
}
