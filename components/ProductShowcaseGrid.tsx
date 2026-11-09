'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, Check } from 'lucide-react';
import { PERFUMES, Perfume } from '@/lib/perfumes';
import { useCart } from '@/lib/cart-context';

export default function ProductShowcaseGrid() {
  const { addToCart } = useCart();
  const [selectedSizes, setSelectedSizes] = useState<Record<string, '50ml' | '100ml'>>({
    printemps: '100ml',
    ete: '100ml',
    automne: '100ml',
    hiver: '100ml',
  });
  const [addedItem, setAddedItem] = useState<string | null>(null);

  const handleSizeToggle = (id: string, size: '50ml' | '100ml') => {
    setSelectedSizes((prev) => ({ ...prev, [id]: size }));
  };

  const handleAddToCart = (perfume: Perfume) => {
    const size = selectedSizes[perfume.id] || '100ml';
    const price = size === '100ml' ? perfume.price100ml : perfume.price50ml;

    addToCart({
      id: `${perfume.id}-${size}`,
      type: 'bottle',
      title: `${perfume.seasonName} — Eau de Parfum`,
      seasonId: perfume.id,
      size,
      price,
      image: perfume.image,
    });

    setAddedItem(perfume.id);
    setTimeout(() => setAddedItem(null), 2500);
  };

  return (
    <section className="relative w-full py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="text-xs uppercase tracking-[0.28em] text-[#D4AF37] font-medium mb-3">
          LES QUATRE CRÉATIONS
        </div>
        <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl text-[#F7F4EB] font-normal tracking-[0.02em] mb-4">
          The Seasonal Flacon Collection
        </h2>
        <p className="text-xs sm:text-sm text-[#B8C2B9] leading-relaxed font-light text-balance">
          Compare the four distinct olfactory movements side by side. Each bottle is hand-poured in
          numbered batches using rare botanical extracts harvested at their seasonal peak.
        </p>
      </div>

      {/* 4-Column Luxury Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-6">
        {PERFUMES.map((perfume) => {
          const currentSize = selectedSizes[perfume.id] || '100ml';
          const price = currentSize === '100ml' ? perfume.price100ml : perfume.price50ml;

          return (
            <div
              key={perfume.id}
              className="group relative flex flex-col rounded-sm overflow-hidden bg-[#0f1c15]/80 backdrop-blur-xl border border-[#D4AF37]/25 hover:border-[#D4AF37]/70 transition-all duration-500 shadow-xl hover:shadow-[0_15px_35px_rgba(0,0,0,0.6)]"
            >
              {/* Product Card Image Container - 16:9 full visibility */}
              <div className="relative w-full aspect-[16/9] bg-[#0c1611] overflow-hidden">
                <Image
                  src={perfume.image}
                  alt={`Quatréa ${perfume.seasonName}`}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-contain w-full h-full transition-transform duration-700 ease-out group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />

                {/* Ambient Scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0f1c15] via-transparent to-black/20 pointer-events-none" />

                {/* Season Label Banner */}
                <div className="absolute bottom-2 left-3 text-[10px] uppercase tracking-[0.2em] font-mono text-[#D4AF37]">
                  {perfume.seasonEn.toUpperCase()} COLLECTION
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-baseline justify-between mb-1">
                    <h3 className="font-editorial text-2xl text-[#F7F4EB] group-hover:text-[#E6C786] transition-colors">
                      {perfume.seasonName}
                    </h3>
                    <span className="font-mono text-base text-[#E6C786] font-semibold tabular-nums">
                      €{price}
                    </span>
                  </div>

                  <p className="text-[11px] text-[#B8C2B9] mb-4 line-clamp-2 leading-relaxed">
                    {perfume.tagline}
                  </p>

                  {/* Scent Intensity Meter */}
                  <div className="flex items-center justify-between text-[11px] text-[#B8C2B9] pb-3 border-b border-[#D4AF37]/15 mb-3">
                    <span className="text-[10px] uppercase tracking-wider text-[#B8C2B9]/70">
                      Scent Intensity:
                    </span>
                    <div className="flex items-center gap-1" title={`${perfume.intensity} of 5`}>
                      {[1, 2, 3, 4, 5].map((level) => (
                        <div
                          key={level}
                          className={`w-2.5 h-1.5 rounded-xs transition-colors ${
                            level <= perfume.intensity
                              ? 'bg-[#D4AF37]'
                              : 'bg-[#D4AF37]/20'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Clean unboxed dominant notes */}
                  <div className="text-[10px] text-[#B8C2B9]/80 leading-normal mb-4">
                    <span className="text-[#D4AF37] font-medium">Notes: </span>
                    {perfume.dominantNotes.slice(0, 3).join(' · ')}
                  </div>
                </div>

                {/* Controls & CTA */}
                <div className="space-y-3 pt-2">
                  {/* Size Toggle Buttons */}
                  <div className="grid grid-cols-2 gap-1.5 p-0.5 rounded bg-[#0b1510] border border-[#D4AF37]/20 text-[10px] font-mono">
                    <button
                      onClick={() => handleSizeToggle(perfume.id, '100ml')}
                      type="button"
                      className={`py-1 rounded-xs transition-all ${
                        currentSize === '100ml'
                          ? 'bg-[#183022] text-[#E6C786] font-semibold border border-[#D4AF37]/30 shadow-xs'
                          : 'text-[#B8C2B9] hover:text-[#F7F4EB]'
                      }`}
                    >
                      100ml (€{perfume.price100ml})
                    </button>
                    <button
                      onClick={() => handleSizeToggle(perfume.id, '50ml')}
                      type="button"
                      className={`py-1 rounded-xs transition-all ${
                        currentSize === '50ml'
                          ? 'bg-[#183022] text-[#E6C786] font-semibold border border-[#D4AF37]/30 shadow-xs'
                          : 'text-[#B8C2B9] hover:text-[#F7F4EB]'
                      }`}
                    >
                      50ml (€{perfume.price50ml})
                    </button>
                  </div>

                  {/* Add to Bag Button */}
                  <button
                    onClick={() => handleAddToCart(perfume)}
                    type="button"
                    className="w-full py-2.5 px-4 rounded-sm bg-[#162d20] hover:bg-[#1d3b2a] border border-[#D4AF37]/45 hover:border-[#D4AF37] text-xs uppercase tracking-[0.16em] font-medium text-[#F7F4EB] hover:text-[#E6C786] transition-all flex items-center justify-center gap-2 shadow-sm"
                  >
                    {addedItem === perfume.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>Added</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>Add to Bag</span>
                      </>
                    )}
                  </button>

                  <Link
                    href={`/perfume/${perfume.id}`}
                    className="block text-center text-[10px] tracking-[0.18em] uppercase text-[#B8C2B9] hover:text-[#E6C786] py-1 transition-colors"
                  >
                    View Botanical Profile →
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
