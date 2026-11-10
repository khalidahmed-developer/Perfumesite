'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ShoppingBag, Layers, Check } from 'lucide-react';
import { PERFUMES, Perfume } from '@/lib/perfumes';
import { useCart } from '@/lib/cart-context';
import SeasonalParticles from './SeasonalParticles';

export default function Scrollytelling() {
  const { addToCart } = useCart();
  const [selectedSizes, setSelectedSizes] = useState<Record<string, '50ml' | '100ml'>>({
    printemps: '100ml',
    ete: '100ml',
    automne: '100ml',
    hiver: '100ml',
  });
  const [addedNotice, setAddedNotice] = useState<string | null>(null);

  const handleSizeChange = (perfumeId: string, size: '50ml' | '100ml') => {
    setSelectedSizes((prev) => ({ ...prev, [perfumeId]: size }));
  };

  const handleAdd = (perfume: Perfume) => {
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
    setAddedNotice(perfume.id);
    setTimeout(() => setAddedNotice(null), 2500);
  };

  return (
    <div className="relative w-full">
      {/* Editorial Transition Bridge from Hero to Scrollytelling */}
      <div className="relative pt-12 pb-2 text-center max-w-xl mx-auto px-4">
        <div className="inline-flex items-center gap-3 text-[10px] sm:text-xs uppercase tracking-[0.32em] text-[#D4AF37] font-mono">
          <span className="w-8 sm:w-12 h-[1px] bg-gradient-to-r from-transparent to-[#D4AF37]/50" />
          <span>Le Cycle des Saisons</span>
          <span className="w-8 sm:w-12 h-[1px] bg-gradient-to-l from-transparent to-[#D4AF37]/50" />
        </div>
      </div>

      {/* Seasonal Sections */}
      <div className="space-y-28 sm:space-y-36 py-12 sm:py-16">
        {PERFUMES.map((perfume, index) => {
          const selectedSize = selectedSizes[perfume.id] || '100ml';
          const currentPrice = selectedSize === '100ml' ? perfume.price100ml : perfume.price50ml;
          const isReverse = index % 2 === 1;

          return (
            <section
              key={perfume.id}
              id={`chapter-${perfume.id}`}
              className="relative min-h-[85vh] flex items-center justify-center px-4 sm:px-6 lg:px-12 scroll-mt-24"
            >
              {/* Seasonal Particle Atmosphere */}
              <SeasonalParticles season={perfume.id} />

              {/* Glassmorphism Luxury Container */}
              <div
                className="relative w-full max-w-6xl mx-auto rounded-sm overflow-hidden p-6 sm:p-10 lg:p-12 transition-all duration-700"
                style={{
                  backgroundColor: 'rgba(15, 28, 21, 0.72)',
                  borderColor: perfume.accentBorder,
                  borderWidth: '1px',
                  borderStyle: 'solid',
                  backdropFilter: 'blur(14px)',
                  WebkitBackdropFilter: 'blur(14px)',
                  boxShadow: `0 25px 60px -15px rgba(0, 0, 0, 0.7), 0 0 45px -10px ${perfume.glowColor}`,
                }}
              >
                {/* Clean Season Header (Chapter 01,02,03,04 removed) */}
                <div className="flex items-center justify-between border-b border-[#D4AF37]/20 pb-4 mb-8 sm:mb-10 text-xs uppercase tracking-[0.24em] text-[#B8C2B9]">
                  <div className="flex items-center gap-2">
                    <span className="text-[#F7F4EB] font-serif text-sm tracking-[0.28em] font-medium">
                      {perfume.seasonName.toUpperCase()}
                    </span>
                    <span aria-hidden="true">·</span>
                    <span className="text-[#D4AF37] font-mono text-[11px]">
                      {perfume.seasonEn.toUpperCase()} COLLECTION
                    </span>
                  </div>
                  <div className="text-[11px] font-mono text-[#D4AF37] tracking-wider">
                    HAUTE PARFUMERIE · PARIS
                  </div>
                </div>

                <div
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
                    isReverse ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  {/* Column A: Artwork Showcase - Fixed 16:9 full visibility container */}
                  <div className={`lg:col-span-6 relative ${isReverse ? 'lg:order-2' : 'lg:order-1'}`}>
                    <div className="relative group overflow-hidden rounded-sm border border-[#D4AF37]/35 shadow-2xl bg-[#0c1611] w-full aspect-[16/9]">
                      <Image
                        src={perfume.image}
                        alt={`Quatréa ${perfume.seasonName} Eau de Parfum`}
                        fill
                        priority={index === 0}
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        className="object-contain w-full h-full transition-transform duration-700 ease-out group-hover:scale-105"
                        referrerPolicy="no-referrer"
                      />

                      {/* Subtle Vignette Scrim */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
                    </div>
                  </div>

                  {/* Column B: Editorial Poetry & Olfactory Specs */}
                  <div className={`lg:col-span-6 flex flex-col justify-center ${isReverse ? 'lg:order-1' : 'lg:order-2'}`}>
                    {/* Season Subtitle */}
                    <div className="mb-2">
                      <span className="text-xs uppercase tracking-[0.24em] text-[#D4AF37] font-medium font-mono">
                        {perfume.seasonEn} Symphony · {perfume.scentFamily}
                      </span>
                    </div>

                    <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-[#F7F4EB] font-normal leading-tight tracking-[0.02em] mb-3">
                      {perfume.seasonName}
                    </h2>

                    <p className="font-editorial italic text-lg sm:text-xl text-[#E6C786] font-light mb-4 text-balance">
                      “{perfume.headline}”
                    </p>

                    <p className="text-xs sm:text-sm text-[#B8C2B9] font-light leading-relaxed mb-6">
                      {perfume.description}
                    </p>

                    {/* Olfactory Pyramid Display Box */}
                    <div className="p-4 rounded-sm bg-[#0e1b14]/75 border border-[#D4AF37]/25 mb-6 space-y-2.5">
                      <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[#D4AF37]">
                        <Layers className="w-3 h-3 text-[#D4AF37]" />
                        <span>Olfactory Architecture</span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1 text-xs">
                        <div>
                          <div className="text-[10px] text-[#B8C2B9]/70 uppercase tracking-wider mb-0.5">
                            Top Notes
                          </div>
                          <div className="text-[#F7F4EB] font-medium leading-snug">
                            {perfume.pyramid.top.join(', ')}
                          </div>
                        </div>

                        <div>
                          <div className="text-[10px] text-[#B8C2B9]/70 uppercase tracking-wider mb-0.5">
                            Heart Notes
                          </div>
                          <div className="text-[#F7F4EB] font-medium leading-snug">
                            {perfume.pyramid.heart.join(', ')}
                          </div>
                        </div>

                        <div>
                          <div className="text-[10px] text-[#B8C2B9]/70 uppercase tracking-wider mb-0.5">
                            Base Notes
                          </div>
                          <div className="text-[#F7F4EB] font-medium leading-snug">
                            {perfume.pyramid.base.join(', ')}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Size Selector & Price */}
                    <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#D4AF37]/15 pt-5 mb-6">
                      <div className="flex items-center gap-3">
                        <span className="text-xs uppercase tracking-widest text-[#B8C2B9]">Size:</span>
                        <div className="inline-flex rounded-sm p-0.5 bg-[#0e1b14] border border-[#D4AF37]/25">
                          <button
                            onClick={() => handleSizeChange(perfume.id, '100ml')}
                            className={`px-3 py-1 text-xs font-mono transition-colors rounded-sm ${
                              selectedSize === '100ml'
                                ? 'bg-[#1e382a] text-[#E6C786] font-semibold border border-[#D4AF37]/40'
                                : 'text-[#B8C2B9] hover:text-[#F7F4EB]'
                            }`}
                          >
                            100ml Flacon
                          </button>
                          <button
                            onClick={() => handleSizeChange(perfume.id, '50ml')}
                            className={`px-3 py-1 text-xs font-mono transition-colors rounded-sm ${
                              selectedSize === '50ml'
                                ? 'bg-[#1e382a] text-[#E6C786] font-semibold border border-[#D4AF37]/40'
                                : 'text-[#B8C2B9] hover:text-[#F7F4EB]'
                            }`}
                          >
                            50ml Travel
                          </button>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-xl sm:text-2xl font-mono text-[#E6C786] font-semibold tabular-nums">
                          €{currentPrice}
                        </div>
                        <div className="text-[10px] text-[#B8C2B9] tracking-wider uppercase">
                          Complimentary Paris Delivery
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                      <button
                        onClick={() => handleAdd(perfume)}
                        type="button"
                        className="flex-1 py-3 px-6 rounded-sm bg-[#1a3325] hover:bg-[#224431] border border-[#D4AF37] text-xs uppercase tracking-[0.2em] font-medium text-[#F7F4EB] hover:text-[#E6C786] transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-[0_0_20px_rgba(212,175,55,0.3)]"
                      >
                        {addedNotice === perfume.id ? (
                          <>
                            <Check className="w-4 h-4 text-[#D4AF37]" />
                            <span>Added to Bag</span>
                          </>
                        ) : (
                          <>
                            <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
                            <span>Add to Bag — €{currentPrice}</span>
                          </>
                        )}
                      </button>

                      <Link
                        href={`/perfume/${perfume.id}`}
                        className="py-3 px-5 rounded-sm border border-[#D4AF37]/35 hover:border-[#D4AF37] bg-black/20 hover:bg-black/40 text-xs uppercase tracking-[0.16em] text-[#B8C2B9] hover:text-[#F7F4EB] transition-colors flex items-center justify-center gap-1.5 whitespace-nowrap"
                      >
                        <span>Full Dossier</span>
                        <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
