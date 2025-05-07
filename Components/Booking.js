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
  const [formErrors, setFormErrors] = useState({});

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));

    // Clear error for this field when user types
    if (formErrors[id]) {
      setFormErrors((prev) => ({
        ...prev,
        [id]: "",
      }));
    }
  };

  // Validate form
  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;

    if (!formData.firstName.trim()) errors.firstName = "First name is required";
    if (!formData.lastName.trim()) errors.lastName = "Last name is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!emailRegex.test(formData.email)) {
      errors.email = "Please enter a valid email";
    }
    if (!formData.mobile.trim()) {
      errors.mobile = "Mobile number is required";
    } else if (!phoneRegex.test(formData.mobile)) {
      errors.mobile = "Please enter a valid mobile number";
    }
    if (!formData.company.trim()) errors.company = "Company is required";
    if (!formData.jobTitle.trim()) errors.jobTitle = "Job title is required";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form before submission
    if (!validateForm()) return;

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
        setFormErrors({});
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

  // Reset form after successful submission
  const handleReset = () => {
    setSubmitSuccess(false);
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      mobile: "",
      company: "",
      jobTitle: "",
      comments: "",
    });
  };

  return (
    <div className="flex flex-col md:flex-row w-full min-h-screen">
      {/* Left content area */}
      <div className="w-full md:w-1/2 p-6 md:p-16 flex flex-col justify-center bg-white text-black">
        <div className="mb-8 md:mb-14">
          <h1 className="text-3xl md:text-5xl 2xl:text-8xl font-bold mb-1">
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
              <p className="text-base md:text-lg 2xl:text-2xl font-medium">
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
              <p className="text-base md:text-lg 2xl:text-2xl font-medium">
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
              <p className="text-base md:text-lg 2xl:text-2xl font-medium">
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
            <div className="bg-white p-6 md:p-8 2xl:p-12 w-full max-w-md 2xl:max-w-2xl rounded-lg shadow-lg">
              {submitSuccess ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-green-500"
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
                  </div>
                  <h2 className="text-2xl font-bold mb-3">Thank You!</h2>
                  <p className="text-gray-600 mb-6">
                    Your booking request has been submitted successfully.
                    We&apos;ll get back to you shortly.
                  </p>
                  <button
                    onClick={handleReset}
                    className="bg-custom-blue text-custom-pink py-2 px-6 rounded hover:bg-gray-800 transition"
                  >
                    Book Another Call
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-4 md:space-y-6 2xl:space-y-8"
                >
                  {submitError && (
                    <div
                      className="p-3 bg-red-100 text-red-700 rounded mb-4"
                      role="alert"
                    >
                      <p>{submitError}</p>
                    </div>
                  )}

                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm 2xl:text-base font-medium mb-1 2xl:mb-2 text-black"
                    >
                      First Name<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`w-full p-2 2xl:p-3 2xl:text-lg border rounded text-black ${
                        formErrors.firstName
                          ? "border-red-500"
                          : "border-gray-400"
                      } bg-white focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent`}
                      required
                      aria-invalid={!!formErrors.firstName}
                      aria-describedby={
                        formErrors.firstName ? "firstName-error" : undefined
                      }
                    />
                    {formErrors.firstName && (
                      <p
                        id="firstName-error"
                        className="mt-1 text-red-500 text-sm"
                      >
                        {formErrors.firstName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm 2xl:text-base font-medium mb-1 2xl:mb-2 text-black"
                    >
                      Last Name<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`w-full p-2 2xl:p-3 2xl:text-lg border rounded text-black ${
                        formErrors.lastName
                          ? "border-red-500"
                          : "border-gray-400"
                      } bg-white focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent`}
                      required
                      aria-invalid={!!formErrors.lastName}
                      aria-describedby={
                        formErrors.lastName ? "lastName-error" : undefined
                      }
                    />
                    {formErrors.lastName && (
                      <p
                        id="lastName-error"
                        className="mt-1 text-red-500 text-sm"
                      >
                        {formErrors.lastName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm 2xl:text-base font-medium mb-1 2xl:mb-2 text-black"
                    >
                      Email<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full p-2 2xl:p-3 2xl:text-lg border rounded text-black ${
                        formErrors.email ? "border-red-500" : "border-gray-400"
                      } bg-white focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent`}
                      required
                      aria-invalid={!!formErrors.email}
                      aria-describedby={
                        formErrors.email ? "email-error" : undefined
                      }
                    />
                    {formErrors.email && (
                      <p id="email-error" className="mt-1 text-red-500 text-sm">
                        {formErrors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="mobile"
                      className="block text-sm 2xl:text-base font-medium mb-1 2xl:mb-2 text-black"
                    >
                      Mobile<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      className={`w-full p-2 2xl:p-3 2xl:text-lg border rounded text-black ${
                        formErrors.mobile ? "border-red-500" : "border-gray-400"
                      } bg-white focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent`}
                      required
                      aria-invalid={!!formErrors.mobile}
                      aria-describedby={
                        formErrors.mobile ? "mobile-error" : undefined
                      }
                    />
                    {formErrors.mobile && (
                      <p
                        id="mobile-error"
                        className="mt-1 text-red-500 text-sm"
                      >
                        {formErrors.mobile}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="company"
                      className="block text-sm 2xl:text-base font-medium mb-1 2xl:mb-2 text-black"
                    >
                      Company<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="company"
                      value={formData.company}
                      onChange={handleChange}
                      className={`w-full p-2 2xl:p-3 2xl:text-lg border rounded text-black ${
                        formErrors.company
                          ? "border-red-500"
                          : "border-gray-400"
                      } bg-white focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent`}
                      required
                      aria-invalid={!!formErrors.company}
                      aria-describedby={
                        formErrors.company ? "company-error" : undefined
                      }
                    />
                    {formErrors.company && (
                      <p
                        id="company-error"
                        className="mt-1 text-red-500 text-sm"
                      >
                        {formErrors.company}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="jobTitle"
                      className="block text-sm 2xl:text-base font-medium mb-1 2xl:mb-2 text-black"
                    >
                      Job Title<span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="jobTitle"
                      value={formData.jobTitle}
                      onChange={handleChange}
                      className={`w-full p-2 2xl:p-3 2xl:text-lg border rounded text-black ${
                        formErrors.jobTitle
                          ? "border-red-500"
                          : "border-gray-400"
                      } bg-white focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent`}
                      required
                      aria-invalid={!!formErrors.jobTitle}
                      aria-describedby={
                        formErrors.jobTitle ? "jobTitle-error" : undefined
                      }
                    />
                    {formErrors.jobTitle && (
                      <p
                        id="jobTitle-error"
                        className="mt-1 text-red-500 text-sm"
                      >
                        {formErrors.jobTitle}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="comments"
                      className="block text-sm 2xl:text-base font-medium mb-1 2xl:mb-2 text-black"
                    >
                      Comments
                    </label>
                    <textarea
                      id="comments"
                      value={formData.comments}
                      onChange={handleChange}
                      rows="3"
                      className="w-full p-2 2xl:p-3 2xl:text-lg border border-gray-400 rounded text-black bg-white focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                    ></textarea>
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-custom-blue text-custom-pink py-2 px-4 2xl:py-3 2xl:px-6 2xl:text-lg rounded hover:bg-gray-800 transition flex justify-center items-center"
                    >
                      {isSubmitting ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Processing...
                        </>
                      ) : (
                        "Submit"
                      )}
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
