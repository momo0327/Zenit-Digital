"use client";

import { useEffect } from "react";
import { motion } from "framer-motion"; // Import Framer Motion for animation
import zenitLogo from "./../assets/Frame.svg"; // Adjust the path if needed

export function Loading({ onLoaded }) {  // Change to named export
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onLoaded) onLoaded(); // Only call onLoaded if it exists
    }, 2000);

    return () => clearTimeout(timer);
  }, [onLoaded]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
      <motion.img
        src={zenitLogo.src}
        alt="Zenit Digital Logo"
        className="w-32 h-32"
        initial={{ opacity: 0.5, scale: 1 }}
        animate={{ opacity: 1, scale: 1.1 }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
    </div>
  );
}
