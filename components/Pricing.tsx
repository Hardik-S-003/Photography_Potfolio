"use client";

import React from "react";
import { pricingPackages, PricingPackage } from "@/data/pricingData";
import { Check, ArrowRight, Star } from "lucide-react";

interface PricingProps {
  onSelectPackage: (packageName: string) => void;
}

export default function Pricing({ onSelectPackage }: PricingProps) {
  const handleSelect = (pkg: PricingPackage) => {
    onSelectPackage(pkg.name);
    const contactSection = document.querySelector("#contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="investment" className="relative z-10 w-full py-24 sm:py-32 bg-dark-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-6 h-[1px] bg-editorial-gold" />
            <span className="font-mono text-xs uppercase tracking-ultra text-editorial-gold">
              Investment & Commissions
            </span>
            <span className="w-6 h-[1px] bg-editorial-gold" />
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-neutral-100 tracking-tight mb-6">
            Transparent Pricing
          </h2>
          <p className="text-neutral-400 font-light text-base sm:text-lg leading-relaxed font-sans">
            Commissions are limited annually to preserve individualized creative dedication. Custom production scopes available upon inquiry.
          </p>
        </div>

        {/* 3 Distinct Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          {pricingPackages.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative rounded-2xl flex flex-col justify-between p-8 sm:p-10 transition-all duration-500 ${
                pkg.recommended
                  ? "bg-dark-900 border-2 border-editorial-gold/60 shadow-glow lg:-translate-y-4"
                  : "bg-dark-900/60 border border-white/5 hover:border-white/20 shadow-card"
              }`}
            >
              {/* Highlight Ribbon */}
              {pkg.recommended && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-editorial-gold text-dark-950 font-mono text-[10px] uppercase tracking-widest font-bold flex items-center gap-1.5 shadow-md">
                  <Star className="w-3 h-3 fill-current" />
                  <span>Most Commissioned</span>
                </div>
              )}

              <div>
                {/* Header */}
                <div className="mb-6">
                  <h3 className="font-serif text-2xl sm:text-3xl text-neutral-100 mb-2">
                    {pkg.name}
                  </h3>
                  <p className="text-xs text-neutral-400 font-light leading-relaxed">
                    {pkg.tagline}
                  </p>
                </div>

                {/* Price Display */}
                <div className="pb-6 mb-8 border-b border-white/10">
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono text-xs uppercase text-neutral-400">Starting at</span>
                    <span className="font-serif text-4xl sm:text-5xl font-normal text-editorial-gold">
                      {pkg.startingPrice}
                    </span>
                  </div>
                  <div className="mt-3 flex flex-col gap-1 text-[11px] font-mono text-neutral-400 tracking-wider">
                    <span>{pkg.duration}</span>
                    <span className="text-neutral-400 font-sans">{pkg.deliverables}</span>
                  </div>
                </div>

                {/* Checklist */}
                <div className="space-y-4 mb-10">
                  <p className="font-mono text-[11px] uppercase tracking-widest text-neutral-400">
                    Package Inclusions
                  </p>
                  {pkg.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-neutral-300 font-light">
                      <div className="w-4 h-4 rounded-full bg-editorial-gold/10 border border-editorial-gold/30 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-2.5 h-2.5 text-editorial-gold" />
                      </div>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Direct Package Selection Button */}
              <button
                type="button"
                onClick={() => handleSelect(pkg)}
                className={`group w-full py-4 rounded-xl font-mono text-xs uppercase tracking-widest font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${
                  pkg.recommended
                    ? "bg-editorial-gold text-dark-950 hover:bg-white hover:text-dark-950 shadow-md"
                    : "border border-editorial-gold/40 text-editorial-champagne hover:bg-editorial-gold hover:text-dark-950"
                }`}
              >
                <span>Select {pkg.name}</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
