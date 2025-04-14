// 'use client';
// import React, { useEffect } from "react";
// import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";
// import SelectedWorks from './../Components/SelectedWorks'
// import Service from './StackedFolders/Service'

// export default function ServicesAndWorks() {
//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       gsap.registerPlugin(ScrollTrigger);
//     }
//   }, []);

//   return (
//     <div className="sections-container relative w-full">
//       {/* You can comment out the SelectedWorks component when needed */}
//       <SelectedWorks />
//       <Service />
//     </div>
//   );
// }