"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { ArrowDown, Calendar, ChevronRight } from "lucide-react";
import gsap from "gsap";

interface HeroProps {
  onInquireClick?: () => void;
}

export default function Hero({ onInquireClick }: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        metaRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 1, delay: 0.2 }
      )
        .fromTo(
          headlineRef.current,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1.2 },
          "-=0.6"
        )
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 1 },
          "-=0.8"
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.9 },
          "-=0.6"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleScrollToGallery = (e: React.MouseEvent) => {
    e.preventDefault();
    const gallery = document.querySelector("#portfolio");
    if (gallery) {
      gallery.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-dark-950 pt-20 pb-16"
    >
      {/* Background Hero Image with Darkroom Vignette */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=2000&q=85"
          alt="Atmospheric fine art photography by Elena Vance"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center scale-105 filter brightness-[0.42] contrast-[1.08] transition-transform duration-1000 ease-out"
        />
        {/* Editorial Gradients & Noise-like Film Grain Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-950/80 via-transparent to-dark-950/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-dark-950/40 to-dark-950/90" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        {/* Curatorial Header Badge */}
        <div
          ref={metaRef}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-editorial-gold/30 bg-dark-900/60 backdrop-blur-md mb-8"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-editorial-gold animate-pulse" />
          <span className="font-mono text-[11px] uppercase tracking-widest text-editorial-champagne">
            International Fine Art & Commercial Commissions · 2025/2026
          </span>
        </div>

        {/* Prominent Editorial Tagline */}
        <h1
          ref={headlineRef}
          className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight text-neutral-100 leading-[1.08] mb-6 max-w-4xl"
        >
          Documenting the <span className="italic font-normal text-editorial-gold">quiet poetry</span> of light, stillness & emotion.
        </h1>

        {/* Narrative Subtitle */}
        <p
          ref={subtitleRef}
          className="text-base sm:text-lg md:text-xl font-light text-neutral-300 max-w-2xl mx-auto mb-10 leading-relaxed font-sans"
        >
          Editorial portraiture, luxury destination weddings, and intentional commercial imagery crafted with unhurried artistic vision.
        </p>

        {/* High-Converting CTA Buttons */}
        <div
          ref={ctaRef}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
        >
          <button
            type="button"
            onClick={onInquireClick}
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-editorial-gold text-dark-950 font-mono text-xs uppercase tracking-widest font-semibold hover:bg-white hover:text-dark-950 transition-all duration-300 shadow-float"
          >
            <Calendar className="w-4 h-4" />
            <span>Inquire Availability</span>
            <ChevronRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
          </button>

          <a
            href="#portfolio"
            onClick={handleScrollToGallery}
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full border border-white/20 text-neutral-200 font-mono text-xs uppercase tracking-widest hover:border-editorial-gold hover:text-editorial-gold hover:bg-white/5 transition-all duration-300"
          >
            <span>Explore Portfolio</span>
            <ArrowDown className="w-4 h-4 transition-transform duration-300 group-hover:translate-y-1" />
          </a>
        </div>

        {/* EXIF Framing Accent */}
        <div className="mt-14 hidden sm:flex items-center gap-4 font-mono text-[10px] uppercase tracking-wider text-neutral-400">
          <span>Leica M11</span>
          <span className="w-1 h-1 rounded-full bg-neutral-600" />
          <span>Summilux 35mm</span>
          <span className="w-1 h-1 rounded-full bg-neutral-600" />
          <span>Natural Light Only</span>
          <span className="w-1 h-1 rounded-full bg-neutral-600" />
          <span>Based in Milan & New York</span>
        </div>
      </div>

      {/* Down Scroll Cue */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-opacity">
        <span className="font-mono text-[9px] uppercase tracking-ultra text-neutral-400">Scroll</span>
        <div className="w-[1px] h-7 bg-gradient-to-b from-editorial-gold to-transparent animate-pulse" />
      </div>
    </section>
  );
}
