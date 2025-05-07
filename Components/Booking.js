"use client";
import React, { useState } from "react";
// Removing unused Image import

const BookingForm = () => {
  // Form state
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    company: "",
    jobTitle: "",
    comments: "",
  });

  // Loading and success states
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch("/api/send-booking-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitSuccess(true);
        setFormData({
          firstName: "",
          lastName: "",
          email: "",
          mobile: "",
          company: "",
          jobTitle: "",
          comments: "",
        });
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Something went wrong");
      }
    } catch (error) {
      setSubmitError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen">
      {/* Left content area */}
      <div className="w-full md:w-1/2 p-6 md:p-16 flex flex-col justify-center bg-white text-black">
        <div className="mb-8 md:mb-14">
          <h1 className="text-3xl md:text-5xl 2xl:text-8xl font-bold mb-1">
            Chat to a<br />payment <span className="italic">expert</span>
          </h1>
        </div>

        <div className="space-y-4 md:space-y-6 mb-8 md:mb-0">
          <div className="flex items-start">
            <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-black flex items-center justify-center text-white mr-3 md:mr-4 mt-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 md:h-5 md:w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6l-7 10h14l-7-10z"
                />
              </svg>
            </div>
            <div>
              <p className="text-base md:text-lg 2xl:text-2xl font-medium">Integrate Aria's B2B payments to fit your flow and use cases</p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-black flex items-center justify-center text-white mr-3 md:mr-4 mt-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 md:h-5 md:w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <div>
              <p className="text-base md:text-lg 2xl:text-2xl  font-medium">Embed invoice financing and pay later with just one API</p>
            </div>
          </div>

          <div className="flex items-start">
            <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-black flex items-center justify-center text-white mr-3 md:mr-4 mt-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 md:h-5 md:w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M8 14s1.5 2 4 2 4-2 4-2" />
                <line x1="9" y1="9" x2="9.01" y2="9" />
                <line x1="15" y1="9" x2="15.01" y2="9" />
              </svg>
            </div>
            <div>
              <p className="text-base md:text-lg 2xl:text-2xl  font-medium">Increase your platform's revenue, GMV and ARR</p>
            </div>
          </div>
        </div>
      </div>
      {/* Right form area with purple background */}
      <div className="w-full md:w-1/2">
        <div className="w-full h-full bg-[#A494F3] relative overflow-hidden">
          {/* Abstract geometric shapes */}
          <div className="absolute w-48 md:w-64 h-48 md:h-64 bg-purple-300 rotate-45 -top-20 -right-20 opacity-50"></div>
          <div className="absolute w-48 md:w-64 h-48 md:h-64 bg-purple-300 -rotate-12 bottom-40 -left-20 opacity-50"></div>
          <div className="absolute w-80 md:w-96 h-80 md:h-96 bg-purple-300 rotate-12 -bottom-40 -right-20 opacity-50"></div>

          {/* Form container */}
          <div className="relative py-8 md:h-full flex items-center justify-center p-4 md:p-10">
  <div className="bg-white p-6 md:p-8 2xl:p-12 w-full max-w-md 2xl:max-w-2xl rounded-lg shadow-lg">
    <form className="space-y-4 md:space-y-6 2xl:space-y-8">
      <div>
        <label htmlFor="firstName" className="block text-sm 2xl:text-base font-medium mb-1 2xl:mb-2">
          First Name<span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="firstName"
          className="w-full p-2 2xl:p-3 2xl:text-lg border border-gray-300 rounded"
          required
        />
      </div>
      
      <div>
        <label htmlFor="lastName" className="block text-sm 2xl:text-base font-medium mb-1 2xl:mb-2">
          Last Name<span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="lastName"
          className="w-full p-2 2xl:p-3 2xl:text-lg border border-gray-300 rounded"
          required
        />
      </div>
      
      <div>
        <label htmlFor="email" className="block text-sm 2xl:text-base font-medium mb-1 2xl:mb-2">
          Email<span className="text-red-500">*</span>
        </label>
        <input
          type="email"
          id="email"
          className="w-full p-2 2xl:p-3 2xl:text-lg border border-gray-300 rounded"
          required
        />
      </div>
      
      <div>
        <label htmlFor="mobile" className="block text-sm 2xl:text-base font-medium mb-1 2xl:mb-2">
          Mobile<span className="text-red-500">*</span>
        </label>
        <input
          type="tel"
          id="mobile"
          className="w-full p-2 2xl:p-3 2xl:text-lg border border-gray-300 rounded"
          required
        />
      </div>
      
      <div>
        <label htmlFor="company" className="block text-sm 2xl:text-base font-medium mb-1 2xl:mb-2">
          Company<span className="text-red-500">*</span>
        </label>
        <input
          type="text" 
          id="company"
          className="w-full p-2 2xl:p-3 2xl:text-lg border border-gray-300 rounded"
          required
        />
      </div>
      
      <div>
        <label htmlFor="jobTitle" className="block text-sm 2xl:text-base font-medium mb-1 2xl:mb-2">
          Job Title<span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="jobTitle"
          className="w-full p-2 2xl:p-3 2xl:text-lg border border-gray-300 rounded"
          required
        />
      </div>
      
      <div>
        <label htmlFor="comments" className="block text-sm 2xl:text-base font-medium mb-1 2xl:mb-2">
          Comments
        </label>
        <textarea
          id="comments"
          rows="3"
          className="w-full p-2 2xl:p-3 2xl:text-lg border border-gray-300 rounded"
        ></textarea>
      </div>
      
      <div>
        <button
          type="submit"
          className="w-full bg-custom-blue text-custom-pink py-2 px-4 2xl:py-3 2xl:px-6 2xl:text-lg rounded hover:bg-gray-800 transition"
        >
          Submit
        </button>
      </div>
    </form>
  </div>
</div>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
