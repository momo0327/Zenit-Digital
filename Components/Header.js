"use client";

import React, { useEffect, useState } from "react";

// Default theme configuration
const defaultTheme = {
  bg: "var(--color-blue)",
  text: "white",
  navText: "white",
};

const Header = () => {
  const [currentTheme, setCurrentTheme] = useState(defaultTheme);

  return (
    <header
      style={{
        backgroundColor: currentTheme.bg,
        color: currentTheme.text,
        transition: "background-color 0.3s ease, color 0.3s ease",
      }}
      className="fixed top-0 left-0 right-0 z-50 p-4 flex justify-between items-center"
    >
      <div className="logo">
        <a href="/" style={{ color: currentTheme.navText }}>
          ZENIT DIGITAL
        </a>
      </div>

      <nav>
        <ul className="flex space-x-6">
          {["Home", "About", "Work", "Contact"].map((item) => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase()}`}
                style={{ color: currentTheme.navText }}
                className="transition hover:opacity-80"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <button
        className="mobile-menu-button md:hidden"
        style={{ color: currentTheme.navText }}
      >
        <span className="sr-only">Menu</span>
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>
    </header>
  );
};

export default Header;
