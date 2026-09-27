"use client";

import React, { useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Maximize2, Minimize2, MapPin, Camera } from "lucide-react";
import { PortfolioItem } from "@/data/portfolioData";

interface LightboxModalProps {
  isOpen: boolean;
  currentItem: PortfolioItem | null;
  items: PortfolioItem[];
  onClose: () => void;
  onSelect: (item: PortfolioItem) => void;
}

export default function LightboxModal({
  isOpen,
  currentItem,
  items,
  onClose,
  onSelect,
}: LightboxModalProps) {
  const [isZoomed, setIsZoomed] = React.useState(false);

  const currentIndex = items.findIndex((i) => i.id === currentItem?.id);

  const handleNext = useCallback(() => {
    if (currentIndex < items.length - 1) {
      onSelect(items[currentIndex + 1]);
    } else {
      onSelect(items[0]);
    }
  }, [currentIndex, items, onSelect]);

  const handlePrev = useCallback(() => {
    if (currentIndex > 0) {
      onSelect(items[currentIndex - 1]);
    } else {
      onSelect(items[items.length - 1]);
    }
  }, [currentIndex, items, onSelect]);

  useEffect(() => {
    if (!isOpen) {
      setIsZoomed(false);
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
    };

    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, handleNext, handlePrev, onClose]);

  if (!isOpen || !currentItem) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Image Lightbox Modal"
      className="fixed inset-0 z-50 flex flex-col justify-between bg-dark-950/95 backdrop-blur-2xl animate-in fade-in duration-300 select-none"
    >
      {/* Lightbox Top Control HUD */}
      <header className="relative z-10 flex items-center justify-between px-6 py-4 border-b border-white/10">
        <div className="flex items-center gap-4">
          <span className="font-mono text-xs uppercase tracking-widest text-editorial-gold font-medium">
            {String(currentIndex + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
          </span>
          <div className="h-3 w-[1px] bg-white/20" />
          <h2 className="font-serif text-lg text-neutral-200 tracking-wide font-normal">
            {currentItem.title}
          </h2>
          <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider bg-white/5 text-neutral-400 border border-white/10">
            {currentItem.category}
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setIsZoomed(!isZoomed)}
            className="p-2 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
            title={isZoomed ? "Reset Zoom" : "Inspect Zoom"}
            aria-label={isZoomed ? "Reset Zoom" : "Inspect Zoom"}
          >
            {isZoomed ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="p-2 rounded-full text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
            title="Close Lightbox (Esc)"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Main Imagery Canvas */}
      <div className="relative flex-1 flex items-center justify-center p-4 sm:p-8 overflow-hidden">
        {/* Navigation Arrow Left */}
        <button
          type="button"
          onClick={handlePrev}
          className="absolute left-4 z-20 p-3 rounded-full glass-hud text-neutral-300 hover:text-editorial-gold hover:scale-110 transition-all shadow-float"
          aria-label="Previous photograph"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Navigation Arrow Right */}
        <button
          type="button"
          onClick={handleNext}
          className="absolute right-4 z-20 p-3 rounded-full glass-hud text-neutral-300 hover:text-editorial-gold hover:scale-110 transition-all shadow-float"
          aria-label="Next photograph"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Framing Container */}
        <div
          onClick={() => setIsZoomed(!isZoomed)}
          className={`relative max-w-6xl max-h-[78vh] w-full h-full flex items-center justify-center cursor-pointer transition-transform duration-500 ${
            isZoomed ? "scale-110" : "scale-100"
          }`}
        >
          <div className="relative w-full h-full max-h-[75vh] flex items-center justify-center">
            <Image
              src={currentItem.imageUrl}
              alt={currentItem.title}
              fill
              priority
              sizes="90vw"
              className="object-contain filter drop-shadow-2xl transition-all duration-300"
            />
          </div>
        </div>
      </div>

      {/* Lightbox Bottom Metadata Drawer */}
      <footer className="relative z-10 glass-hud px-6 py-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-4 text-neutral-400">
          <div className="flex items-center gap-1.5 text-neutral-300">
            <MapPin className="w-3.5 h-3.5 text-editorial-gold" />
            <span className="font-sans text-xs">{currentItem.location}</span>
          </div>
          <span className="w-1 h-1 rounded-full bg-neutral-600" />
          <span className="font-mono text-[11px] text-neutral-400">{currentItem.year}</span>
        </div>

        <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] text-neutral-400 tracking-wider">
          <div className="flex items-center gap-1.5">
            <Camera className="w-3.5 h-3.5 text-editorial-gold" />
            <span>{currentItem.camera}</span>
          </div>
          <span className="w-1 h-1 rounded-full bg-neutral-600" />
          <span>{currentItem.lens}</span>
          <span className="w-1 h-1 rounded-full bg-neutral-600" />
          <span className="text-neutral-400">{currentItem.settings}</span>
        </div>
      </footer>
    </div>
  );
}
