"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

// Create the context
const CursorContext = createContext({
  cursorType: "default",
  setCursorType: () => {},
});

/**
 * Provider component that wraps your app and makes cursor state available to any
 * child component that calls the useCursor hook.
 */
export const CursorProvider = ({ children }) => {
  const [cursorType, setCursorType] = useState("default");

  // Memoize setCursorType to prevent unnecessary rerenders
  const memoizedSetCursorType = useCallback((type) => {
    setCursorType(type);
  }, []);

  return (
    <CursorContext.Provider
      value={{ cursorType, setCursorType: memoizedSetCursorType }}
    >
      {children}
    </CursorContext.Provider>
  );
};

/**
 * Hook that lets any component easily use and update cursor state
 *
 * @returns {Object} The cursor context containing cursorType and setCursorType
 */
export const useCursor = () => {
  const context = useContext(CursorContext);

  if (context === undefined) {
    throw new Error("useCursor must be used within a CursorProvider");
  }

  return context;
};

/**
 * Usage example:
 *
 * function MyButton() {
 *   const { setCursorType } = useCursor();
 *
 *   return (
 *     <button
 *       onMouseEnter={() => setCursorType('button')}
 *       onMouseLeave={() => setCursorType('default')}
 *     >
 *       Hover me
 *     </button>
 *   );
 * }
 */
