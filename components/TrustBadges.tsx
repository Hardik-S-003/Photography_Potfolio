"use client";

import React from "react";
import { publications } from "@/data/publicationsData";

export default function TrustBadges() {
  return (
    <section className="relative z-10 w-full bg-dark-900 border-y border-white/5 py-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center mb-6">
          <p className="font-mono text-[10px] uppercase tracking-ultra text-neutral-400">
            Featured In Publications & Editorial Commissions
          </p>
        </div>

        {/* Badges Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6 sm:gap-8 items-center justify-items-center opacity-75 hover:opacity-100 transition-opacity duration-300">
          {publications.map((pub) => (
            <div
              key={pub.id}
              className="group flex flex-col items-center justify-center p-3 rounded-lg hover:bg-white/[0.02] transition-colors w-full"
            >
              <span className="font-serif text-lg sm:text-xl tracking-wider text-neutral-300 group-hover:text-editorial-gold font-light transition-colors duration-300">
                {pub.name}
              </span>
              <span className="font-mono text-[9px] text-neutral-400 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:block text-center">
                {pub.description}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
