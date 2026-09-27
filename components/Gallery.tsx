"use client";

import React, { useState } from "react";
import Image from "next/image";
import { portfolioItems, PortfolioItem } from "@/data/portfolioData";
import LightboxModal from "./LightboxModal";
import { Eye, Camera, MapPin } from "lucide-react";

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const [selectedPhoto, setSelectedPhoto] = useState<PortfolioItem | null>(null);

  const categories = ["All", "Weddings", "Portraits", "Commercial"];

  const filteredItems =
    activeFilter === "All"
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === activeFilter);

  const handleOpenLightbox = (item: PortfolioItem) => {
    setSelectedPhoto(item);
    setLightboxOpen(true);
  };

  return (
    <section id="portfolio" className="relative z-10 w-full py-24 sm:py-32 bg-dark-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Curatorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-6 h-[1px] bg-editorial-gold" />
              <span className="font-mono text-xs uppercase tracking-ultra text-editorial-gold">
                Archive & Monograph
              </span>
            </div>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-light text-neutral-100 tracking-tight">
              Curated Highlights
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 border border-white/10 p-1.5 rounded-full bg-dark-900/60 backdrop-blur-md">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveFilter(cat)}
                className={`px-5 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-300 ${
                  activeFilter === cat
                    ? "bg-editorial-gold text-dark-950 font-semibold shadow-sm"
                    : "text-neutral-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* 12-Column Responsive Editorial Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 items-start">
          {filteredItems.map((photo) => (
            <div
              key={photo.id}
              onClick={() => handleOpenLightbox(photo)}
              className={`group relative cursor-pointer overflow-hidden rounded-xl bg-dark-900 border border-white/5 hover:border-editorial-gold/40 transition-all duration-500 shadow-card ${photo.colSpanDesktop}`}
            >
              {/* Aspect Ratio Box Wrapper */}
              <div
                className={`relative w-full overflow-hidden ${
                  photo.aspectRatio === "3/2"
                    ? "aspect-3-2"
                    : photo.aspectRatio === "4/5"
                    ? "aspect-4-5"
                    : photo.aspectRatio === "16/9"
                    ? "aspect-16-9"
                    : photo.aspectRatio === "1/1"
                    ? "aspect-1-1"
                    : "aspect-6-7"
                }`}
              >
                <Image
                  src={photo.imageUrl}
                  alt={photo.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover object-center filter brightness-[0.92] group-hover:scale-105 group-hover:brightness-100 transition-all duration-700 ease-out"
                />

                {/* Darkroom Curtain Gradient on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/20 to-transparent opacity-0 group-hover:opacity-90 transition-opacity duration-300" />

                {/* Hover Center Indicator Pill */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-95 group-hover:scale-100 pointer-events-none">
                  <div className="glass-hud px-4 py-2 rounded-full flex items-center gap-2 text-white font-mono text-[11px] uppercase tracking-widest shadow-2xl border border-white/20">
                    <Eye className="w-3.5 h-3.5 text-editorial-gold" />
                    <span>View Frame</span>
                  </div>
                </div>

                {/* Top Badge: Category */}
                <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest bg-dark-950/80 backdrop-blur-md text-editorial-champagne border border-white/10">
                    {photo.category}
                  </span>
                </div>
              </div>

              {/* Photo Information & Technical EXIF Binding */}
              <div className="p-5 flex flex-col gap-2.5 bg-dark-900/90">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif text-xl text-neutral-100 group-hover:text-editorial-gold transition-colors">
                    {photo.title}
                  </h3>
                  <span className="font-mono text-[11px] text-neutral-400">{photo.year}</span>
                </div>

                <p className="text-xs text-neutral-400 line-clamp-1 font-light font-sans">
                  {photo.description}
                </p>

                {/* Hairline Divider */}
                <div className="w-full h-[1px] bg-white/5 my-0.5" />

                {/* Technical Camera & Location Badges */}
                <div className="flex items-center justify-between text-[11px] text-neutral-400 font-mono tracking-wider">
                  <div className="flex items-center gap-1.5 truncate">
                    <Camera className="w-3.5 h-3.5 text-neutral-400 group-hover:text-editorial-gold transition-colors" />
                    <span className="truncate">{photo.camera}</span>
                  </div>
                  <div className="flex items-center gap-1 text-neutral-400">
                    <MapPin className="w-3 h-3 text-neutral-400" />
                    <span className="truncate">{photo.location.split(",")[0]}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal Component */}
      <LightboxModal
        isOpen={lightboxOpen}
        currentItem={selectedPhoto}
        items={filteredItems}
        onClose={() => setLightboxOpen(false)}
        onSelect={(item) => setSelectedPhoto(item)}
      />
    </section>
  );
}
