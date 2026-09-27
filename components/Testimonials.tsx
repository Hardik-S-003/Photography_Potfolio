"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { testimonials } from "@/data/testimonialData";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Gentle auto-rotation
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      handleNext();
    }, 6500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const current = testimonials[currentIndex];

  return (
    <section id="testimonials" className="relative z-10 w-full py-24 sm:py-32 bg-dark-950">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-6 h-[1px] bg-editorial-gold" />
            <span className="font-mono text-xs uppercase tracking-ultra text-editorial-gold">
              Words & Endorsements
            </span>
            <span className="w-6 h-[1px] bg-editorial-gold" />
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl font-light text-neutral-100 tracking-tight">
            Client Reflections
          </h2>
        </div>

        {/* Carousel Container */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative rounded-3xl bg-dark-900 border border-white/10 p-8 sm:p-14 lg:p-16 shadow-2xl glass-hud"
        >
          {/* Quote Mark Watermark */}
          <div className="absolute top-6 left-8 text-white/[0.04] pointer-events-none select-none">
            <Quote className="w-20 h-20" />
          </div>

          <div className="relative z-10 flex flex-col items-center text-center">
            {/* 5-Star Rating */}
            <div className="flex items-center gap-1 mb-8 text-editorial-gold">
              {[...Array(current.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>

            {/* Testimonial Quote */}
            <blockquote className="font-serif text-xl sm:text-2xl md:text-3xl text-neutral-100 font-light leading-relaxed mb-10 min-h-[120px] flex items-center justify-center">
              &ldquo;{current.quote}&rdquo;
            </blockquote>

            {/* Client Avatar and Identity */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-editorial-gold/40 shadow-md">
                <Image
                  src={current.avatarUrl}
                  alt={current.clientName}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="text-center sm:text-left">
                <h4 className="font-serif text-lg text-neutral-100 font-medium">
                  {current.clientName}
                </h4>
                <p className="font-mono text-xs text-editorial-champagne uppercase tracking-wider mt-0.5">
                  {current.clientRoleOrEvent}
                </p>
                <p className="text-[11px] text-neutral-400 font-mono mt-0.5">
                  {current.location}
                </p>
              </div>
            </div>

            {/* Carousel Navigation Buttons & Dots */}
            <div className="mt-12 flex items-center justify-between w-full max-w-xs mx-auto">
              <button
                type="button"
                onClick={handlePrev}
                className="p-3 rounded-full border border-white/10 hover:border-editorial-gold hover:text-editorial-gold text-neutral-300 transition-colors"
                aria-label="Previous Review"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Progress Dots */}
              <div className="flex items-center gap-2">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentIndex(idx)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      currentIndex === idx ? "w-8 bg-editorial-gold" : "w-2 bg-white/20 hover:bg-white/40"
                    }`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              <button
                type="button"
                onClick={handleNext}
                className="p-3 rounded-full border border-white/10 hover:border-editorial-gold hover:text-editorial-gold text-neutral-300 transition-colors"
                aria-label="Next Review"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
