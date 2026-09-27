"use client";

import React from "react";
import { processSteps } from "@/data/processData";
import { Check, Sparkles } from "lucide-react";

export default function Process() {
  return (
    <section id="experience" className="relative z-10 w-full py-24 sm:py-32 bg-dark-900 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-20">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-6 h-[1px] bg-editorial-gold" />
            <span className="font-mono text-xs uppercase tracking-ultra text-editorial-gold">
              The Client Journey
            </span>
          </div>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-neutral-100 tracking-tight mb-6">
            An Unhurried, Artful Experience
          </h2>
          <p className="text-neutral-400 font-light text-base sm:text-lg leading-relaxed font-sans">
            From our initial concept discussions to the archival reveal, every stage is orchestrated with care, clarity, and creative intimacy.
          </p>
        </div>

        {/* Three-Step Workflow Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {processSteps.map((step) => (
            <div
              key={step.stepNumber}
              className="group relative p-8 sm:p-10 rounded-2xl bg-dark-950/70 border border-white/5 hover:border-editorial-gold/40 transition-all duration-500 shadow-card flex flex-col justify-between"
            >
              {/* Subtle Step Number Watermark */}
              <div className="absolute top-6 right-8 font-serif text-6xl sm:text-7xl font-light text-white/[0.04] group-hover:text-editorial-gold/10 transition-colors pointer-events-none select-none">
                {step.stepNumber}
              </div>

              <div>
                {/* Step Pill */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-editorial-champagne font-mono text-[11px] uppercase tracking-wider mb-6">
                  <Sparkles className="w-3 h-3 text-editorial-gold" />
                  <span>Chapter {step.stepNumber}</span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl text-neutral-100 group-hover:text-editorial-gold transition-colors mb-2">
                  {step.title}
                </h3>

                <p className="font-mono text-xs uppercase tracking-wider text-neutral-400 mb-6">
                  {step.subtitle}
                </p>

                <p className="text-sm font-light text-neutral-300 leading-relaxed font-sans mb-8">
                  {step.description}
                </p>
              </div>

              {/* Highlights Checklist */}
              <div className="pt-6 border-t border-white/5 flex flex-col gap-3">
                {step.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-center gap-3 text-xs text-neutral-400 font-sans">
                    <div className="w-4 h-4 rounded-full bg-editorial-gold/10 border border-editorial-gold/30 flex items-center justify-center shrink-0">
                      <Check className="w-2.5 h-2.5 text-editorial-gold" />
                    </div>
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
