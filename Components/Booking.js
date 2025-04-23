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
          <h1 className="text-3xl md:text-5xl font-bold mb-1">
            Chat to a<br />
            payment <span className="italic">expert</span>
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
              <p className="text-base md:text-lg font-medium">
                Integrate Aria&apos;s B2B payments to fit your flow and use
                cases
              </p>
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
              <p className="text-base md:text-lg font-medium">
                Embed invoice financing and pay later with just one API
              </p>
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
              <p className="text-base md:text-lg font-medium">
                Increase your platform&apos;s revenue, GMV and ARR
              </p>
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
            <div className="bg-white p-6 md:p-8 w-full max-w-md rounded-lg shadow-lg">
              {submitSuccess ? (
                <div className="text-center py-8">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16 mx-auto text-green-500 mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
                  <p className="text-gray-600">
                    Your booking request has been sent successfully. We&apos;ll
                    contact you shortly.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-4 md:space-y-6"
                >
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium mb-1"
                    >
                      First Name<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium mb-1"
                    >
                      Last Name<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium mb-1"
                    >
                      Email<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="mobile"
                      className="block text-sm font-medium mb-1"
                    >
                      Mobile<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="company"
                      className="block text-sm font-medium mb-1"
                    >
                      Company<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="company"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="jobTitle"
                      className="block text-sm font-medium mb-1"
                    >
                      Job Title<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="jobTitle"
                      value={formData.jobTitle}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded"
                      required
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="comments"
                      className="block text-sm font-medium mb-1"
                    >
                      Comments
                    </label>
                    <textarea
                      id="comments"
                      value={formData.comments}
                      onChange={handleChange}
                      rows="3"
                      className="w-full p-2 border border-gray-300 rounded"
                    ></textarea>
                  </div>

                  {submitError && (
                    <div className="text-red-500 text-sm py-2">
                      {submitError}
                    </div>
                  )}

                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full bg-custom-blue text-custom-pink py-2 px-4 rounded hover:bg-gray-800 transition ${
                        isSubmitting ? "opacity-70 cursor-not-allowed" : ""
                      }`}
                    >
                      {isSubmitting ? "Submitting..." : "Submit"}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
