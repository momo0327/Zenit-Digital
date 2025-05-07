"use client";
import React from "react";
import Booking from "../../Components/Booking";
import Navbar from "../../components/Navbar";

export default function BookingPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Booking />
    </main>
  );
}
