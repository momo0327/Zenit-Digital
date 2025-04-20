"use client";

import dynamic from "next/dynamic";

// Dynamically import the CustomCursor component with no SSR
// This is necessary because it uses browser APIs that aren't available during server-side rendering
const CustomCursor = dynamic(() => import("./CustomCursor"), {
  ssr: false,
});

export default function ClientCursorWrapper() {
  return <CustomCursor />;
}
