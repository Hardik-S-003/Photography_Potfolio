"use client";

import React from "react";
import Image from "next/image";
import { Award, Compass, HeartHandshake, Sparkles } from "lucide-react";

export default function About() {
  return (
    <section id="about" className="relative z-10 w-full py-24 sm:py-32 bg-dark-900 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Fine-Art Portrait with Museum Matting */}
          <div className="lg:col-span-5 relative">
            <div className="relative p-4 sm:p-6 bg-dark-850 rounded-2xl border border-white/10 museum-frame">
              <div className="relative aspect-[3/4] w-full overflow-hidden rounded-xl">
                <Image
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85"
                  alt="Elena Vance, Fine Art & Editorial Photographer"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-center filter grayscale contrast-[1.15] brightness-90 hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 via-transparent to-transparent" />
              </div>

              {/* Floating Monograph Pill */}
              <div className="absolute -bottom-4 right-8 glass-hud px-4 py-2 rounded-full border border-white/15 flex items-center gap-2 shadow-2xl">
                <Sparkles className="w-3.5 h-3.5 text-editorial-gold" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-editorial-champagne">
                  12+ Years Documenting Globally
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Bio, Philosophy & Accolades */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-[1px] bg-editorial-gold" />
              <span className="font-mono text-xs uppercase tracking-ultra text-editorial-gold">
                The Artist & Storyteller
              </span>
            </div>

            <h2 className="font-serif text-3xl sm:text-5xl font-light text-neutral-100 tracking-tight mb-6">
              Elena Vance
            </h2>

            <p className="font-serif text-xl sm:text-2xl text-neutral-300 italic font-light leading-relaxed mb-6">
              &ldquo;I believe the most extraordinary moments don&apos;t announce themselves. They exist in the pauses between words, the glance before a vow, and the shadow that reveals form.&rdquo;
            </p>

            <div className="space-y-4 text-neutral-400 font-light text-sm sm:text-base leading-relaxed font-sans mb-10">
              <p>
                Trained in classical fine art printmaking in Florence and photojournalism in New York, Elena brings a disciplined architectural sensitivity to commercial assignments and a profound emotional intimacy to destination celebrations.
              </p>
              <p>
                Rejecting artificial trends and rigid poses, her methodology embraces natural ambient lighting, Leica rangefinder optics, and archival medium-format grain to create imagery that feels like an heirloom monograph rather than an ephemeral digital file.
              </p>
            </div>

            {/* Accolades & Accreditations Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t border-white/10">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-editorial-gold">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-serif text-base text-neutral-200">International Acclaim</h4>
                  <p className="font-mono text-[11px] text-neutral-400 mt-0.5">Named Top 30 Rising Masters by PDN</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-editorial-gold">
                  <Compass className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-serif text-base text-neutral-200">Global Coverage</h4>
                  <p className="font-mono text-[11px] text-neutral-400 mt-0.5">Documented across 28 countries</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-white/5 border border-white/10 text-editorial-gold">
                  <HeartHandshake className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-serif text-base text-neutral-200">Archival Care</h4>
                  <p className="font-mono text-[11px] text-neutral-400 mt-0.5">Printed on 100% Cotton Rag</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
