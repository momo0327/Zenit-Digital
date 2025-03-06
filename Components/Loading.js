import { useEffect } from "react";
import { motion } from "framer-motion"; // Import Framer Motion for animation
import Image from "next/image";
import zenitLogo from "./../assets/Frame.svg"; // Ensure the path is correct

export function Loading({ onLoaded }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      console.log("Loading complete"); // Debugging
      onLoaded();
    }, 2000);

    return () => clearTimeout(timer); // Cleanup
  }, [onLoaded]);

  return (
<div className="fixed inset-0 flex items-center justify-center bg-black z-100 border-4 border-red-500">
<motion.div
        initial={{ opacity: 0.5, scale: 1 }}
        animate={{ opacity: 1, scale: 1.1 }}
        transition={{
          duration: 0.8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <Image src={zenitLogo} alt="Zenit Digital Logo" width={128} height={128} />
      </motion.div>
    </div>
  );
}
