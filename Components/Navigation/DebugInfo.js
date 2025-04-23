"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

const DebugInfo = ({ isDev = true }) => {
  const [events, setEvents] = useState([]);
  const pathname = usePathname();
  const [sections, setSections] = useState([]);

  useEffect(() => {
    // Only run in development mode
    if (typeof window !== "undefined" && isDev) {
      // Get all section IDs
      const sectionElements = document.querySelectorAll("section[id]");
      setSections(Array.from(sectionElements).map((s) => s.id));

      // Set up scrollToSection event listener
      const handleScrollToSection = (event) => {
        const { target, offset } = event.detail;
        addEvent(
          `scrollToSection event triggered for: ${
            target.id || "unknown"
          }, offset: ${offset}`
        );
      };

      window.addEventListener("scrollToSection", handleScrollToSection);

      // Set up click event debugging
      const originalAddEventListener = EventTarget.prototype.addEventListener;
      EventTarget.prototype.addEventListener = function (
        type,
        listener,
        options
      ) {
        if (type === "click" && this.tagName === "A") {
          const originalListener = listener;
          const newListener = function () {
            addEvent(
              `Click on ${this.textContent || this.innerText || "unknown"} link`
            );
            return originalListener.apply(this, arguments);
          };

          return originalAddEventListener.call(
            this,
            type,
            newListener,
            options
          );
        }
        return originalAddEventListener.call(this, type, listener, options);
      };

      // Cleanup
      return () => {
        window.removeEventListener("scrollToSection", handleScrollToSection);
        EventTarget.prototype.addEventListener = originalAddEventListener;
      };
    }
  }, [isDev]);

  const addEvent = (message) => {
    setEvents((prev) => {
      const newEvents = [
        { time: new Date().toLocaleTimeString(), message },
        ...prev,
      ];
      return newEvents.slice(0, 10); // Only keep the last 10 events
    });
  };

  if (!isDev) return null;

  return (
    <div
      className="fixed bottom-0 left-0 w-full md:w-1/3 bg-black bg-opacity-80 text-white p-4 z-50 text-sm"
      style={{ maxHeight: "300px", overflowY: "auto" }}
    >
      <div className="flex justify-between mb-2">
        <h3 className="font-bold">Debug Info</h3>
        <button
          onClick={() => setEvents([])}
          className="px-2 py-1 bg-red-500 text-xs rounded"
        >
          Clear
        </button>
      </div>
      <p>
        Current path: <code>{pathname}</code>
      </p>
      <div className="mb-2">
        <p>Available sections:</p>
        <ul className="ml-4 list-disc">
          {sections.map((id) => (
            <li key={id}>
              <code>{id}</code>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <p>Event Log:</p>
        <ul className="ml-4 list-disc">
          {events.map((event, i) => (
            <li key={i} className="mb-1">
              <span className="text-gray-400">{event.time}:</span>{" "}
              {event.message}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DebugInfo;
