"use client";
import dynamic from "next/dynamic";

const TextGenerateEffect = dynamic(() => import("aceternity-ui").then((mod) => mod.TextGenerateEffect), {
  ssr: false, // Ensure it runs only on the client
});

export default function AboutSection() {
  return (
    <section className="h-screen flex items-center justify-center">
      <TextGenerateEffect
        className="text-8xl font-medium text-left text-custom-pink"
        words="We create elevating digital experiences that inspire and connect with people through development and design."
      />
    </section>
  );
}
