"use client";

import { usePathname } from "next/navigation";
import Navbar from "../components/Navbar";
import Link from "next/link";

export default function NavbarWrapper() {
  const pathname = usePathname();

  // Show back button only on booking page instead of full navbar
  if (pathname === "/booking") {
    return (
      <div className="fixed top-6 left-6 z-50">
        <Link href="/">
          <button className="flex items-center justify-center bg-white/80 backdrop-blur-sm hover:bg-white text-custom-blue rounded-full p-2 transition-colors duration-200 shadow-md">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M19 12H5" />
              <path d="M12 19l-7-7 7-7" />
            </svg>
          </button>
        </Link>
      </div>
    );
  }

  return <Navbar />;
}
