'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';
import DiscoverySetSection from '@/components/DiscoverySetSection';
import { PERFUMES } from '@/lib/perfumes';

export default function DiscoverySetPage() {
  return (
    <div className="relative w-full pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Top Breadcrumb */}
      <div className="flex items-center justify-between text-xs uppercase tracking-widest text-[#B8C2B9] mb-8 pb-4 border-b border-[#D4AF37]/20">
        <Link
          href="/"
          className="flex items-center gap-1.5 hover:text-[#E6C786] transition-colors"
        >
          <ChevronLeft className="w-3.5 h-3.5 text-[#D4AF37]" />
          <span>Return to La Maison</span>
        </Link>
        <span className="font-mono text-[#D4AF37]">4 × 5ML ATELIER COFFRET</span>
      </div>

      {/* Discovery Set Interactive Customizer */}
      <DiscoverySetSection />

      {/* Guide to Testing Scent at Home */}
      <div className="mt-16 p-8 sm:p-12 rounded-sm bg-[#0e1c14]/85 border border-[#D4AF37]/25 backdrop-blur-xl">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-mono">
            RITUEL D’ÉCHANTILLONNAGE
          </div>
          <h2 className="font-editorial text-3xl text-[#F7F4EB] font-normal">
            The Parisian Olfactory Tasting Ritual
          </h2>
          <p className="text-xs text-[#B8C2B9] mt-2 font-light">
            How to evaluate each seasonal vial to find your personal signature aroma.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-xs text-[#B8C2B9]">
          <div className="p-4 rounded-xs bg-[#122219] border border-[#D4AF37]/20 space-y-2">
            <span className="text-sm font-mono text-[#E6C786] font-semibold">01. Spray on Paper</span>
            <p className="leading-relaxed">
              Use the provided gold-embossed test cards first. Allow the alcohol carrier to evaporate
              for 30 seconds before smelling.
            </p>
          </div>

          <div className="p-4 rounded-xs bg-[#122219] border border-[#D4AF37]/20 space-y-2">
            <span className="text-sm font-mono text-[#E6C786] font-semibold">02. Apply to Pulse Points</span>
            <p className="leading-relaxed">
              Apply 2 spritzes onto clean, unmoisturized wrists or collarbones. Never rub your wrists
              together, which bruises the floral top notes.
            </p>
          </div>

          <div className="p-4 rounded-xs bg-[#122219] border border-[#D4AF37]/20 space-y-2">
            <span className="text-sm font-mono text-[#E6C786] font-semibold">03. Observe the Drydown</span>
            <p className="leading-relaxed">
              Smell again after 20 minutes, 2 hours, and 6 hours. Note how your skin chemistry evolves
              the woody and resinous base notes.
            </p>
          </div>

          <div className="p-4 rounded-xs bg-[#122219] border border-[#D4AF37]/20 space-y-2">
            <span className="text-sm font-mono text-[#E6C786] font-semibold">04. Redeem Your €45</span>
            <p className="leading-relaxed">
              Once you select your favorite season, use your enclosed €45 code towards a full 100ml
              crystal flacon.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
