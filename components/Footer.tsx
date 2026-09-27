"use client";

import React from "react";
import { ArrowUp, Camera } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative z-10 w-full bg-dark-950 border-t border-white/5 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-12 border-b border-white/5">
          {/* Brand Signature */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full border border-editorial-gold/40 flex items-center justify-center">
              <Camera className="w-4 h-4 text-editorial-gold" />
            </div>
            <div>
              <span className="font-serif text-xl tracking-wider text-neutral-100 uppercase block font-medium">
                Elena Vance
              </span>
              <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-400">
                Atelier of Fine Art & Editorial Photography
              </span>
            </div>
          </div>

          {/* Directory Links */}
          <div className="flex flex-wrap gap-6 text-xs font-mono uppercase tracking-widest text-neutral-400">
            <a href="#portfolio" className="hover:text-editorial-gold transition-colors">
              Portfolio
            </a>
            <a href="#experience" className="hover:text-editorial-gold transition-colors">
              Process
            </a>
            <a href="#investment" className="hover:text-editorial-gold transition-colors">
              Pricing
            </a>
            <a href="#about" className="hover:text-editorial-gold transition-colors">
              About
            </a>
            <a href="#testimonials" className="hover:text-editorial-gold transition-colors">
              Acclaim
            </a>
            <a href="#contact" className="hover:text-editorial-gold transition-colors">
              Inquire
            </a>
          </div>

          {/* Back to top trigger */}
          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 hover:border-editorial-gold text-neutral-400 hover:text-editorial-gold font-mono text-xs uppercase tracking-wider transition-colors"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Legal & Credits Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-neutral-400 font-mono text-[11px]">
          <p>© {new Date().getFullYear()} Elena Vance Studio. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-neutral-400 cursor-pointer transition-colors">Privacy Policy</span>
            <span className="w-1 h-1 rounded-full bg-neutral-800" />
            <span className="hover:text-neutral-400 cursor-pointer transition-colors">Terms of Commission</span>
            <span className="w-1 h-1 rounded-full bg-neutral-800" />
            <span className="text-neutral-400">Archival Edition 2.5</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
