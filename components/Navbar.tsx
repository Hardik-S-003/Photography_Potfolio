"use client";

import React, { useState, useEffect } from "react";
import { Camera, Menu, X, ArrowUpRight } from "lucide-react";

interface NavbarProps {
  onBookClick?: () => void;
}

export default function Navbar({ onBookClick }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Portfolio", href: "#portfolio" },
    { name: "Experience", href: "#experience" },
    { name: "Investment", href: "#investment" },
    { name: "About", href: "#about" },
    { name: "Acclaim", href: "#testimonials" },
    { name: "Contact", href: "#contact" },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Sticky Top Navigation */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled ? "py-3" : "py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav
            className={`flex items-center justify-between px-6 py-3 rounded-full transition-all duration-500 ${
              isScrolled
                ? "glass-hud shadow-2xl"
                : "bg-dark-900/40 backdrop-blur-sm border border-white/5"
            }`}
          >
            {/* Monogram Brand */}
            <a
              href="#hero"
              onClick={(e) => handleLinkClick(e, "#hero")}
              className="group flex items-center gap-3 text-neutral-100"
            >
              <div className="w-8 h-8 rounded-full border border-editorial-gold/40 flex items-center justify-center transition-transform duration-500 group-hover:rotate-45">
                <Camera className="w-4 h-4 text-editorial-gold" />
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-lg tracking-wider uppercase font-medium leading-none text-neutral-100 group-hover:text-editorial-gold transition-colors">
                  Elena Vance
                </span>
                <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-400 mt-1">
                  Atelier & Studio
                </span>
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="font-mono text-xs uppercase tracking-widest text-neutral-300 hover:text-editorial-gold transition-colors duration-200 relative py-1 group"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-editorial-gold transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </div>

            {/* CTA Book Session Button */}
            <div className="hidden sm:flex items-center gap-4">
              <a
                href="#contact"
                onClick={(e) => {
                  if (onBookClick) {
                    e.preventDefault();
                    onBookClick();
                  } else {
                    handleLinkClick(e, "#contact");
                  }
                }}
                className="group flex items-center gap-2 px-5 py-2 rounded-full border border-editorial-gold/50 text-editorial-champagne font-mono text-xs uppercase tracking-wider bg-editorial-gold/10 hover:bg-editorial-gold hover:text-dark-950 transition-all duration-300 shadow-sm"
              >
                <span>Book Session</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-neutral-300 hover:text-white hover:bg-white/5 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </nav>
        </div>

        {/* Mobile Slide-down Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden px-4 pt-3 pb-6">
            <div className="glass-hud rounded-2xl p-6 flex flex-col gap-4 shadow-2xl border border-white/10 animate-in fade-in slide-in-from-top-4 duration-300">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="font-serif text-lg tracking-wider text-neutral-200 hover:text-editorial-gold py-2 border-b border-white/5 transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#contact"
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  if (onBookClick) {
                    e.preventDefault();
                    onBookClick();
                  } else {
                    handleLinkClick(e, "#contact");
                  }
                }}
                className="mt-2 text-center py-3 rounded-xl bg-editorial-gold text-dark-950 font-mono text-xs uppercase tracking-widest font-semibold"
              >
                Inquire & Book Session
              </a>
            </div>
          </div>
        )}
      </header>

      {/* Mobile Ergonomic Bottom Floating Quick-Dock */}
      <aside aria-label="Mobile Navigation Dock" className="md:hidden fixed bottom-5 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-sm">
        <div className="glass-hud rounded-full py-2.5 px-4 flex items-center justify-between shadow-2xl border border-white/15">
          <a
            href="#portfolio"
            onClick={(e) => handleLinkClick(e, "#portfolio")}
            className="font-mono text-[11px] uppercase tracking-wider text-neutral-300 hover:text-editorial-gold px-2 py-1"
          >
            Gallery
          </a>
          <div className="w-1 h-1 rounded-full bg-white/20" />
          <a
            href="#investment"
            onClick={(e) => handleLinkClick(e, "#investment")}
            className="font-mono text-[11px] uppercase tracking-wider text-neutral-300 hover:text-editorial-gold px-2 py-1"
          >
            Pricing
          </a>
          <div className="w-1 h-1 rounded-full bg-white/20" />
          <a
            href="#contact"
            onClick={(e) => {
              if (onBookClick) {
                e.preventDefault();
                onBookClick();
              } else {
                handleLinkClick(e, "#contact");
              }
            }}
            className="font-mono text-[11px] uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-editorial-gold text-dark-950 font-medium"
          >
            Inquire
          </a>
        </div>
      </aside>
    </>
  );
}
