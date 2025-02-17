'use client';
import React from "react";

const Footer = () => {
  return (
    <>
      {/* "Let's Talk" Section */}
      <section
        className="lets-talk-section flex justify-center items-center h-[calc(100vh-80px)]"
        id="lets-talk"
        data-bg="var(--background)" // Background color
        data-text="var(--custom-green)" // Text color
        data-button-bg="var(--custom-green)"
        data-button-text="var(--custom-lightGreen)"
>


    
  <div className="container mx-auto flex flex-col items-center justify-center bg-custom-green h-[70%] text-center">
    <h1 className="text-8xl md:text-9xl font-bold text-custom-lightGreen mb-8">Let's Talk</h1>
    <button
      className="px-8 py-4 bg-custom-lightGreen text-custom-green rounded-lg font-medium text-lg hover:bg-custom-green hover:text-custom-lightGreen transition-colors"
      onClick={() => console.log("Button Clicked!")}
    >
      Get In Touch
    </button>
  </div>
</section>


      {/* Footer Section */}
      <footer className="footer bg-white text-black">
        <div className="footer-content py-12 px-6">
          <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
            {/* Column 1: Brand/Description */}
            <div className="footer-brand">
              <h3 className="text-3xl font-bold mb-4">Zenit Digital Studios</h3>
              <p className="text-gray-700">
                Creating exceptional digital experiences that inspire and engage.
              </p>
            </div>

            {/* Column 2: Quick Links */}
            <div className="footer-links">
              <h4 className="text-xl font-bold mb-4">Explore</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#about" className="hover:text-gray-900 transition">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#work" className="hover:text-gray-900 transition">
                    Our Work
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-gray-900 transition">
                    Services
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-gray-900 transition">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Services */}
            <div className="footer-services">
              <h4 className="text-xl font-bold mb-4">Services</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#strategy" className="hover:text-gray-900 transition">
                    Strategy
                  </a>
                </li>
                <li>
                  <a href="#design" className="hover:text-gray-900 transition">
                    Design
                  </a>
                </li>
                <li>
                  <a href="#development" className="hover:text-gray-900 transition">
                    Development
                  </a>
                </li>
                <li>
                  <a href="#consulting" className="hover:text-gray-900 transition">
                    Consulting
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 4: Contact */}
            <div className="footer-contact">
              <h4 className="text-xl font-bold mb-4">Contact</h4>
              <ul className="space-y-2">
                <li>Email: hello@zenitdigital.com</li>
                <li>Phone: +1 234 567 890</li>
                <li>Address: New York, USA</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom py-6 border-t border-gray-300">
          <div className="container mx-auto px-6 text-center text-gray-700 text-sm">
            © {new Date().getFullYear()} Zenit Digital Studios. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
