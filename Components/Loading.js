"use client";

import { useEffect, memo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import zenitLogo from "./../assets/Frame.svg";

export const Loading = memo(({ onLoaded }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onLoaded) onLoaded();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onLoaded]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black z-50">
      <div className="relative w-32 h-32">
        <motion.div
          className="w-full h-full"
          initial={{ opacity: 0.5, scale: 1 }}
          animate={{ opacity: 1, scale: 1.1 }}
          transition={{
            duration: 0.8,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        >
          <Image
            src={zenitLogo}
            alt="Zenit Digital Logo"
            priority
            fill
            sizes="(max-width: 768px) 100vw, 128px"
            className="object-contain"
          />
        </motion.div>
      </div>
    </div>
  );
});

Loading.displayName = "Loading";
