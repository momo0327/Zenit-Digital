'use client';
import { useEffect } from 'react';

export default function Cookiebot() {
  useEffect(() => {
    // Create and append the Cookiebot script
    const script = document.createElement('script');
    script.id = 'Cookiebot';
    script.src = 'https://consent.cookiebot.com/uc.js';
    script.setAttribute('data-cbid', '74ed7c8b-7181-40f8-9019-c8770f9209f8');
    script.setAttribute('data-blockingmode', 'auto');
    script.async = true;
    
    document.head.appendChild(script);
    
    // Cleanup function to remove the script when component unmounts
    return () => {
      const existingScript = document.getElementById('Cookiebot');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);
  
  return null; // This component doesn't render anything
} 