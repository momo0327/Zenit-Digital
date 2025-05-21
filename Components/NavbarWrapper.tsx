"use client";

import { usePathname } from "next/navigation";
import Navbar from "../components/Navbar";

export default function NavbarWrapper() {
  const pathname = usePathname();

  // Don't render navbar on the booking page
  if (pathname === "/booking") {
    return null;
  }

  return <Navbar />;
}
