'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, Layers, Filter, Check, Sparkles, ArrowRight } from 'lucide-react';
import { PERFUMES, Perfume } from '@/lib/perfumes';
import { useCart } from '@/lib/cart-context';

export default function CatalogPage() {
  const { addToCart } = useCart();
  const [selectedSeason, setSelectedSeason] = useState<string>('all');
  const [selectedFamily, setSelectedFamily] = useState<string>('all');
  const [bottleSize, setBottleSize] = useState<'50ml' | '100ml'>('100ml');
  const [addedItem, setAddedItem] = useState<string | null>(null);

  // Filter logic
  const filteredPerfumes = PERFUMES.filter((perfume) => {
    if (selectedSeason !== 'all' && perfume.id !== selectedSeason) return false;
    if (selectedFamily !== 'all') {
      if (selectedFamily === 'floral' && !perfume.scentFamily.toLowerCase().includes('floral'))
        return false;
      if (selectedFamily === 'citrus' && !perfume.scentFamily.toLowerCase().includes('citrus'))
        return false;
      if (selectedFamily === 'amber' && !perfume.scentFamily.toLowerCase().includes('amber'))
        return false;
      if (selectedFamily === 'conifer' && !perfume.scentFamily.toLowerCase().includes('conifer'))
        return false;
    }
    return true;
  });

  const handleAddBottle = (perfume: Perfume) => {
    const price = bottleSize === '100ml' ? perfume.price100ml : perfume.price50ml;
    addToCart({
      id: `${perfume.id}-${bottleSize}`,
      type: 'bottle',
      title: `${perfume.seasonName} — Eau de Parfum`,
      seasonId: perfume.id,
      size: bottleSize,
      price,
      image: perfume.image,
    });
    setAddedItem(perfume.id);
    setTimeout(() => setAddedItem(null), 2500);
  };

  const handleAddCoffret = () => {
    addToCart({
      id: 'les-quatre-saisons-coffret',
      type: 'coffret',
      title: 'Les Quatre Saisons Coffret — Collector Vault (4 x 100ml)',
      price: 880,
      image: '/assets/aistudio/HeroSectionVideo_8a535c19.mp4', // or logo / video
      size: '100ml',
    });
    setAddedItem('coffret');
    setTimeout(() => setAddedItem(null), 2500);
  };

  return (
    <div className="relative w-full pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-14">
        <div className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-medium font-mono mb-2">
          LE GRAND CATALOGUE
        </div>
        <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-[#F7F4EB] font-normal tracking-[0.02em] mb-4">
          The Four Seasons Collection
        </h1>
        <p className="text-xs sm:text-sm text-[#B8C2B9] leading-relaxed font-light text-balance">
          Each seasonal flacon represents a singular moment in the calendar year. Explore our
          complete collection of haute-parfumerie creations, or acquire the complete collector’s vault.
        </p>
      </div>

      {/* Filter and Control Bar */}
      <div className="mb-12 p-4 sm:p-5 rounded-sm bg-[#0e1c14]/90 border border-[#D4AF37]/25 backdrop-blur-md flex flex-col lg:flex-row items-center justify-between gap-6">
        {/* Season Filters (Buttons) */}
        <div className="flex flex-wrap items-center gap-1.5 w-full lg:w-auto">
          <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-mono mr-2">
            Season:
          </span>
          {[
            { id: 'all', label: 'All Seasons' },
            { id: 'printemps', label: 'Printemps' },
            { id: 'ete', label: 'Été' },
            { id: 'automne', label: 'Automne' },
            { id: 'hiver', label: 'Hiver' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedSeason(tab.id)}
              className={`px-3 py-1.5 text-xs rounded-sm transition-colors whitespace-nowrap ${
                selectedSeason === tab.id
                  ? 'bg-[#1d3829] text-[#E6C786] border border-[#D4AF37]/50 font-medium'
                  : 'text-[#B8C2B9] hover:text-[#F7F4EB]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Scent Family Filters & Bottle Size Selector */}
        <div className="flex flex-wrap items-center justify-between lg:justify-end gap-4 w-full lg:w-auto">
          {/* Scent Family */}
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-mono mr-1">
              Family:
            </span>
            <select
              value={selectedFamily}
              onChange={(e) => setSelectedFamily(e.target.value)}
              className="text-xs bg-[#122419] border border-[#D4AF37]/30 text-[#F7F4EB] rounded-sm px-2.5 py-1.5 focus:outline-none"
            >
              <option value="all">All Olfactory Families</option>
              <option value="floral">Floral & Green Dew</option>
              <option value="citrus">Solar Citrus & Marine</option>
              <option value="amber">Woody & Spiced Amber</option>
              <option value="conifer">Frosted Conifer & Musk</option>
            </select>
          </div>

          {/* Size Switch */}
          <div className="flex items-center gap-1.5 p-0.5 rounded bg-[#0b1610] border border-[#D4AF37]/25 text-xs font-mono">
            <button
              onClick={() => setBottleSize('100ml')}
              className={`px-2.5 py-1 rounded-xs transition-colors ${
                bottleSize === '100ml'
                  ? 'bg-[#1b3425] text-[#E6C786] font-semibold border border-[#D4AF37]/30'
                  : 'text-[#B8C2B9]'
              }`}
            >
              100ml
            </button>
            <button
              onClick={() => setBottleSize('50ml')}
              className={`px-2.5 py-1 rounded-xs transition-colors ${
                bottleSize === '50ml'
                  ? 'bg-[#1b3425] text-[#E6C786] font-semibold border border-[#D4AF37]/30'
                  : 'text-[#B8C2B9]'
              }`}
            >
              50ml
            </button>
          </div>
        </div>
      </div>

      {/* Catalog Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
        {filteredPerfumes.map((perfume) => {
          const price = bottleSize === '100ml' ? perfume.price100ml : perfume.price50ml;

          return (
            <div
              key={perfume.id}
              className="group flex flex-col rounded-sm overflow-hidden bg-[#0e1c14]/80 backdrop-blur-xl border border-[#D4AF37]/30 hover:border-[#D4AF37]/80 transition-all duration-500 shadow-xl"
            >
              {/* Image - 16:9 full visibility */}
              <div className="relative w-full aspect-[16/9] bg-[#0c1611] overflow-hidden">
                <Image
                  src={perfume.image}
                  alt={perfume.seasonName}
                  fill
                  className="object-contain w-full h-full transition-transform duration-700 ease-out group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e1c14] via-transparent to-transparent pointer-events-none" />

                <div className="absolute bottom-2 left-3 text-[10px] font-mono tracking-widest uppercase text-[#D4AF37]">
                  {perfume.seasonEn.toUpperCase()}
                </div>
              </div>

              {/* Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-baseline justify-between mb-1">
                    <h2 className="font-editorial text-2xl text-[#F7F4EB] group-hover:text-[#E6C786] transition-colors">
                      {perfume.seasonName}
                    </h2>
                    <span className="font-mono text-base text-[#E6C786] font-semibold tabular-nums">
                      €{price}
                    </span>
                  </div>

                  <p className="text-[11px] text-[#B8C2B9] mb-3 line-clamp-2 leading-relaxed">
                    {perfume.tagline}
                  </p>

                  <div className="text-[10px] text-[#B8C2B9]/80 pb-3 border-b border-[#D4AF37]/15 mb-3 font-mono">
                    <span className="text-[#D4AF37]">Family:</span> {perfume.scentFamily}
                  </div>

                  <div className="space-y-1 text-[11px] text-[#B8C2B9] mb-4">
                    <div className="flex justify-between">
                      <span className="text-[#B8C2B9]/70">Longevity:</span>
                      <span className="text-[#F7F4EB] font-mono text-[10px]">{perfume.longevity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#B8C2B9]/70">Sillage:</span>
                      <span className="text-[#F7F4EB] font-mono text-[10px]">{perfume.sillage}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <button
                    onClick={() => handleAddBottle(perfume)}
                    type="button"
                    className="w-full py-2.5 px-4 rounded-sm bg-[#162d20] hover:bg-[#1e3c2b] border border-[#D4AF37] text-xs uppercase tracking-[0.16em] font-medium text-[#F7F4EB] hover:text-[#E6C786] transition-all flex items-center justify-center gap-2"
                  >
                    {addedItem === perfume.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>Added</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>Add {bottleSize} Flacon</span>
                      </>
                    )}
                  </button>

                  <Link
                    href={`/perfume/${perfume.id}`}
                    className="block text-center text-[10px] tracking-widest uppercase text-[#B8C2B9] hover:text-[#E6C786] py-1 transition-colors"
                  >
                    View In-Depth Dossier →
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Collector Vault: Les Quatre Saisons Coffret */}
      <div
        id="coffret"
        className="relative rounded-sm overflow-hidden p-8 sm:p-12 lg:p-14 bg-[#0d1812] border border-[#D4AF37]/40 shadow-2xl mb-24"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-mono font-medium">
              EDITION LIMITÉE PRESTIGE
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-[#F7F4EB] font-normal leading-tight">
              Les Quatre Saisons Coffret
            </h2>
            <p className="font-editorial italic text-lg text-[#E6C786] font-light">
              The Complete 4-Bottle Collector’s Vault
            </p>
            <p className="text-xs sm:text-sm text-[#B8C2B9] leading-relaxed font-light">
              All four 100ml signature Eau de Parfums (Printemps, Été, Automne, and Hiver) presented in
              a bespoke hand-lacquered black ebony chest lined with emerald velvet, featuring a
              solid brushed brass latch, numbered certificate of authenticity, and four refillable
              gold pocket atomizers.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs font-mono">
              <div className="p-2.5 rounded-xs bg-[#132219] border border-[#D4AF37]/20 text-center">
                <div className="text-[#D4AF37] font-semibold">Printemps</div>
                <div className="text-[10px] text-[#B8C2B9]">100ml</div>
              </div>
              <div className="p-2.5 rounded-xs bg-[#132219] border border-[#D4AF37]/20 text-center">
                <div className="text-[#D4AF37] font-semibold">Été</div>
                <div className="text-[10px] text-[#B8C2B9]">100ml</div>
              </div>
              <div className="p-2.5 rounded-xs bg-[#132219] border border-[#D4AF37]/20 text-center">
                <div className="text-[#D4AF37] font-semibold">Automne</div>
                <div className="text-[10px] text-[#B8C2B9]">100ml</div>
              </div>
              <div className="p-2.5 rounded-xs bg-[#132219] border border-[#D4AF37]/20 text-center">
                <div className="text-[#D4AF37] font-semibold">Hiver</div>
                <div className="text-[10px] text-[#B8C2B9]">100ml</div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col justify-between p-6 rounded-sm bg-[#122219] border border-[#D4AF37]/35 space-y-5">
            <div className="flex items-baseline justify-between border-b border-[#D4AF37]/20 pb-4">
              <div>
                <div className="font-serif text-lg text-[#F7F4EB]">Collector’s Vault</div>
                <div className="text-xs text-[#B8C2B9]">Limited to 500 numbered units</div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-mono text-[#E6C786] font-semibold tabular-nums">
                  €880
                </div>
                <div className="text-[10px] text-[#D4AF37] uppercase tracking-wider">
                  Saves €115 vs Individual
                </div>
              </div>
            </div>

            <ul className="text-xs text-[#B8C2B9] space-y-2">
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>4 x 100ml Full Size Flacons in numbered collection</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Hand-lacquered ebony box with personalized engraved brass plate</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Four travel atomizers in brushed champagne gold</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Private consultation invitation with Master Perfumer in Paris</span>
              </li>
            </ul>

            <button
              onClick={handleAddCoffret}
              type="button"
              className="w-full py-3.5 px-6 rounded-sm bg-[#1b3527] hover:bg-[#234533] border border-[#D4AF37] text-xs uppercase tracking-[0.2em] font-medium text-[#F7F4EB] hover:text-[#E6C786] transition-all flex items-center justify-center gap-2 shadow-xl"
            >
              {addedItem === 'coffret' ? (
                <>
                  <Check className="w-4 h-4 text-[#D4AF37]" />
                  <span>Vault Added to Bag</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
                  <span>Acquire Collector Vault · €880</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Detailed Side-by-Side Comparison Table */}
      <div className="mt-16 p-6 sm:p-10 rounded-sm bg-[#0e1c14]/85 border border-[#D4AF37]/25 backdrop-blur-md">
        <div className="mb-8">
          <div className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-mono">
            ANALYSE COMPARATIVE
          </div>
          <h2 className="font-editorial text-2xl sm:text-3xl text-[#F7F4EB] font-normal">
            Seasonal Olfactory Matrix
          </h2>
          <p className="text-xs text-[#B8C2B9] mt-1">
            Examine the structural differences in notes, intensity, sillage, and seasonality.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[#D4AF37]/30 text-[#D4AF37] font-mono text-[10px] uppercase tracking-wider">
                <th className="py-3 px-4">Fragrance</th>
                <th className="py-3 px-4">Season</th>
                <th className="py-3 px-4">Dominant Notes</th>
                <th className="py-3 px-4">Intensity</th>
                <th className="py-3 px-4">Longevity</th>
                <th className="py-3 px-4">Recommended Pairing</th>
                <th className="py-3 px-4 text-right">Price (100ml)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#D4AF37]/15 text-[#B8C2B9]">
              {PERFUMES.map((p) => (
                <tr key={p.id} className="hover:bg-[#14261d]/60 transition-colors">
                  <td className="py-4 px-4 font-serif text-sm text-[#F7F4EB] font-medium whitespace-nowrap">
                    <Link
                      href={`/perfume/${p.id}`}
                      className="hover:text-[#E6C786] transition-colors"
                    >
                      {p.seasonName}
                    </Link>
                  </td>
                  <td className="py-4 px-4 whitespace-nowrap font-mono text-[11px] text-[#D4AF37]">
                    {p.seasonEn}
                  </td>
                  <td className="py-4 px-4 max-w-xs">{p.dominantNotes.join(', ')}</td>
                  <td className="py-4 px-4 whitespace-nowrap">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((lvl) => (
                        <div
                          key={lvl}
                          className={`w-2 h-2 rounded-xs ${
                            lvl <= p.intensity ? 'bg-[#D4AF37]' : 'bg-[#D4AF37]/20'
                          }`}
                        />
                      ))}
                    </div>
                  </td>
                  <td className="py-4 px-4 font-mono text-[11px] whitespace-nowrap">{p.longevity}</td>
                  <td className="py-4 px-4 text-[11px] max-w-xs">{p.pairing}</td>
                  <td className="py-4 px-4 text-right font-mono text-sm text-[#E6C786] font-semibold tabular-nums whitespace-nowrap">
                    €{p.price100ml}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
