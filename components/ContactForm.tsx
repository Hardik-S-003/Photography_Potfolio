"use client";

import React, { useState, useEffect } from "react";
import { Mail, Phone, MapPin, Instagram, Globe, CheckCircle2, Send, Clock, ArrowRight } from "lucide-react";

interface ContactFormProps {
  initialPackage?: string;
}

export default function ContactForm({ initialPackage = "" }: ContactFormProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    package: initialPackage,
    targetDate: "",
    location: "",
    referral: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (initialPackage) {
      setFormData((prev) => ({ ...prev, package: initialPackage }));
    }
  }, [initialPackage]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1200);
  };

  return (
    <section id="contact" className="relative z-10 w-full py-24 sm:py-32 bg-dark-900 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left Column: Direct Contact Details & Availability */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="w-6 h-[1px] bg-editorial-gold" />
                <span className="font-mono text-xs uppercase tracking-ultra text-editorial-gold">
                  Inquiries & Bookings
                </span>
              </div>
              <h2 className="font-serif text-3xl sm:text-5xl font-light text-neutral-100 tracking-tight mb-6">
                Begin the Conversation
              </h2>
              <p className="text-neutral-400 font-light text-base leading-relaxed font-sans mb-10">
                Whether commissioning an editorial portrait, private destination celebration, or high-fashion brand campaign, we would love to hear your vision.
              </p>

              {/* Booking Availability Notice */}
              <div className="p-5 rounded-2xl bg-dark-850 border border-white/10 mb-10">
                <div className="flex items-center gap-2 text-editorial-gold font-mono text-xs uppercase tracking-wider mb-2">
                  <Clock className="w-4 h-4" />
                  <span>Calendar Availability</span>
                </div>
                <p className="text-xs text-neutral-300 font-light">
                  Accepting limited commissions for late 2025 and 2026. Destination dates booked on a first-confirmed basis.
                </p>
              </div>

              {/* Direct Channels */}
              <div className="space-y-6">
                <a
                  href="mailto:atelier@elenavance.com"
                  className="group flex items-center gap-4 text-neutral-300 hover:text-editorial-gold transition-colors"
                >
                  <div className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center group-hover:border-editorial-gold/40">
                    <Mail className="w-4 h-4 text-editorial-gold" />
                  </div>
                  <div>
                    <span className="block font-mono text-[10px] uppercase tracking-widest text-neutral-400">
                      Direct Studio Email
                    </span>
                    <span className="font-sans text-sm font-medium">atelier@elenavance.com</span>
                  </div>
                </a>

                <a
                  href="tel:+12125550198"
                  className="group flex items-center gap-4 text-neutral-300 hover:text-editorial-gold transition-colors"
                >
                  <div className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center group-hover:border-editorial-gold/40">
                    <Phone className="w-4 h-4 text-editorial-gold" />
                  </div>
                  <div>
                    <span className="block font-mono text-[10px] uppercase tracking-widest text-neutral-400">
                      Studio Telephone
                    </span>
                    <span className="font-sans text-sm font-medium">+1 (212) 555-0198</span>
                  </div>
                </a>

                <div className="flex items-center gap-4 text-neutral-300">
                  <div className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-editorial-gold" />
                  </div>
                  <div>
                    <span className="block font-mono text-[10px] uppercase tracking-widest text-neutral-400">
                      Studio Locations
                    </span>
                    <span className="font-sans text-sm font-medium">
                      Via Tortona 28, Milan · SoHo, New York
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media Links */}
            <div className="mt-12 pt-8 border-t border-white/10">
              <span className="block font-mono text-[10px] uppercase tracking-widest text-neutral-400 mb-4">
                Follow & Archive
              </span>
              <div className="flex items-center gap-4">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-editorial-gold transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                  <span>@elenavancephoto</span>
                </a>
                <span className="w-1 h-1 rounded-full bg-neutral-700" />
                <a
                  href="https://behance.net"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-editorial-gold transition-colors"
                >
                  <Globe className="w-4 h-4" />
                  <span>Behance Monograph</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Inquiry & Booking Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-dark-950 border border-white/10 p-8 sm:p-12 shadow-2xl relative overflow-hidden">
              {isSubmitted ? (
                <div className="py-16 text-center flex flex-col items-center justify-center animate-in fade-in duration-500">
                  <div className="w-16 h-16 rounded-full bg-editorial-gold/10 border border-editorial-gold/40 flex items-center justify-center text-editorial-gold mb-6">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-serif text-3xl text-neutral-100 mb-3">
                    Inquiry Received with Appreciation
                  </h3>
                  <p className="text-sm font-light text-neutral-300 max-w-md mx-auto mb-8 font-sans leading-relaxed">
                    Thank you, {formData.fullName || "valued client"}. Elena or the studio director will review your project details and reach out within 24–48 business hours with our bespoke investment guide.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setIsSubmitted(false);
                      setFormData({
                        fullName: "",
                        email: "",
                        package: "",
                        targetDate: "",
                        location: "",
                        referral: "",
                        message: "",
                      });
                    }}
                    className="px-6 py-3 rounded-full border border-white/20 font-mono text-xs uppercase tracking-wider text-neutral-300 hover:text-editorial-gold hover:border-editorial-gold transition-colors"
                  >
                    Send Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name and Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="fullName"
                        className="block font-mono text-[11px] uppercase tracking-wider text-neutral-400 mb-2"
                      >
                        Your Full Name *
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        required
                        value={formData.fullName}
                        onChange={handleChange}
                        placeholder="e.g. Eleanor Vance"
                        className="w-full px-4 py-3.5 rounded-xl bg-dark-900 border border-white/10 text-neutral-100 placeholder:text-neutral-400 text-sm focus:outline-none focus:border-editorial-gold transition-colors"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block font-mono text-[11px] uppercase tracking-wider text-neutral-400 mb-2"
                      >
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="e.g. eleanor@studio.com"
                        className="w-full px-4 py-3.5 rounded-xl bg-dark-900 border border-white/10 text-neutral-100 placeholder:text-neutral-400 text-sm focus:outline-none focus:border-editorial-gold transition-colors"
                      />
                    </div>
                  </div>

                  {/* Package and Target Date */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="package"
                        className="block font-mono text-[11px] uppercase tracking-wider text-neutral-400 mb-2"
                      >
                        Selected Package / Scope
                      </label>
                      <select
                        id="package"
                        name="package"
                        value={formData.package}
                        onChange={handleChange}
                        className="w-full px-4 py-3.5 rounded-xl bg-dark-900 border border-white/10 text-neutral-100 text-sm focus:outline-none focus:border-editorial-gold transition-colors"
                      >
                        <option value="">Select an investment tier...</option>
                        <option value="Editorial Portrait">Editorial Portrait (From $950)</option>
                        <option value="Commercial & Brand">Commercial & Brand (From $2,800)</option>
                        <option value="Destination Story">Destination Story (From $4,600)</option>
                        <option value="Custom Bespoke Scope">Custom Bespoke Production</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="targetDate"
                        className="block font-mono text-[11px] uppercase tracking-wider text-neutral-400 mb-2"
                      >
                        Target Date / Season
                      </label>
                      <input
                        type="text"
                        id="targetDate"
                        name="targetDate"
                        value={formData.targetDate}
                        onChange={handleChange}
                        placeholder="e.g. October 2025 / Spring 2026"
                        className="w-full px-4 py-3.5 rounded-xl bg-dark-900 border border-white/10 text-neutral-100 placeholder:text-neutral-400 text-sm focus:outline-none focus:border-editorial-gold transition-colors"
                      />
                    </div>
                  </div>

                  {/* Location and Referral Source */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="location"
                        className="block font-mono text-[11px] uppercase tracking-wider text-neutral-400 mb-2"
                      >
                        Event Location / Destination Venue
                      </label>
                      <input
                        type="text"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="e.g. Lake Como, Italy / Manhattan Studio"
                        className="w-full px-4 py-3.5 rounded-xl bg-dark-900 border border-white/10 text-neutral-100 placeholder:text-neutral-400 text-sm focus:outline-none focus:border-editorial-gold transition-colors"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="referral"
                        className="block font-mono text-[11px] uppercase tracking-wider text-neutral-400 mb-2"
                      >
                        How Did You Hear of Elena?
                      </label>
                      <select
                        id="referral"
                        name="referral"
                        value={formData.referral}
                        onChange={handleChange}
                        className="w-full px-4 py-3.5 rounded-xl bg-dark-900 border border-white/10 text-neutral-100 text-sm focus:outline-none focus:border-editorial-gold transition-colors"
                      >
                        <option value="">Select a source...</option>
                        <option value="Vogue / Editorial Press">Vogue / Editorial Press</option>
                        <option value="Instagram / Social">Instagram / Social</option>
                        <option value="Planner / Venue Referral">Planner or Venue Referral</option>
                        <option value="Client Recommendation">Past Client Recommendation</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  {/* Project Vision / Message */}
                  <div>
                    <label
                      htmlFor="message"
                      className="block font-mono text-[11px] uppercase tracking-wider text-neutral-400 mb-2"
                    >
                      Your Vision, Mood & Questions
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us about the narrative, aesthetic references, or specific moments you wish to capture..."
                      className="w-full px-4 py-3.5 rounded-xl bg-dark-900 border border-white/10 text-neutral-100 placeholder:text-neutral-400 text-sm focus:outline-none focus:border-editorial-gold transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl bg-editorial-gold text-dark-950 font-mono text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 hover:bg-white hover:text-dark-950 transition-all duration-300 disabled:opacity-50 shadow-md"
                  >
                    {isSubmitting ? (
                      <span>Submitting Inquiry...</span>
                    ) : (
                      <>
                        <span>Submit Booking Inquiry</span>
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </button>

                  <p className="text-center text-[11px] text-neutral-400 font-mono">
                    All communications remain strictly confidential under studio privacy standards.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
