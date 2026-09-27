"use client";

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustBadges from "@/components/TrustBadges";
import Gallery from "@/components/Gallery";
import Process from "@/components/Process";
import Pricing from "@/components/Pricing";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function Home() {
  const [selectedPackage, setSelectedPackage] = useState<string>("");

  const handleSelectPackage = (packageName: string) => {
    setSelectedPackage(packageName);
  };

  const handleInquireClick = () => {
    const contactSection = document.querySelector("#contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <main className="relative min-h-screen bg-dark-950 text-neutral-100 overflow-x-hidden selection:bg-editorial-gold selection:text-dark-950">
      {/* Sticky Glass Navigation HUD */}
      <Navbar onBookClick={handleInquireClick} />

      {/* 1. Hero Section */}
      <Hero onInquireClick={handleInquireClick} />

      {/* Trust Badges: Publications & Clients */}
      <TrustBadges />

      {/* 2. Featured Portfolio Gallery */}
      <Gallery />

      {/* 3. Client Experience & 3-Step Process */}
      <Process />

      {/* 4. Transparent Pricing & Investment Packages */}
      <Pricing onSelectPackage={handleSelectPackage} />

      {/* 5. About the Photographer */}
      <About />

      {/* 6. Social Proof & Testimonial Carousel */}
      <Testimonials />

      {/* 7. Contact & Booking Inquiry Form */}
      <ContactForm initialPackage={selectedPackage} />

      {/* Editorial Footer */}
      <Footer />
    </main>
  );
}
