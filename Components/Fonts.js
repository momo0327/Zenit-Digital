"use client";

import { useEffect } from "react";

export function Fonts() {
  useEffect(() => {
    // This will create a <style> tag in the document <head> with the font definitions
    const style = document.createElement('style');
    style.textContent = `
      @font-face {
        font-family: 'GeistVF';
        src: url('/fonts/GeistVF.woff') format('woff');
        font-weight: 100 900;
        font-style: normal;
        font-display: swap;
      }
      
      @font-face {
        font-family: 'GeistMonoVF';
        src: url('/fonts/GeistMonoVF.woff') format('woff');
        font-weight: 100 900;
        font-style: normal;
        font-display: swap;
      }

      @import url("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Fira+Code:wght@400;500;600&display=swap");
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  
  return null;
}
