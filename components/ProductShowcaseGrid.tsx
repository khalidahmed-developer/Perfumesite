'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ShoppingBag, Check, Sparkles, Gift, Crown, ArrowRight, ShieldCheck } from 'lucide-react';
import { PERFUMES, Perfume } from '@/lib/perfumes';
import { useCart } from '@/lib/cart-context';

export default function ProductShowcaseGrid() {
  const { addToCart } = useCart();
  const [activeTab, setActiveTab] = useState<'offers' | 'individual'>('offers');

  // Single Flacon Offer State
  const [singleSeasonId, setSingleSeasonId] = useState<'printemps' | 'ete' | 'automne' | 'hiver'>('automne');
  const [singleSize, setSingleSize] = useState<'50ml' | '100ml'>('100ml');

  // Duo Offer State (Choose 2 seasons)
  const [duoSeason1, setDuoSeason1] = useState<'printemps' | 'ete' | 'automne' | 'hiver'>('automne');
  const [duoSeason2, setDuoSeason2] = useState<'printemps' | 'ete' | 'automne' | 'hiver'>('printemps');

  // Individual bottles state (for the 4-column cards)
  const [selectedSizes, setSelectedSizes] = useState<Record<string, '50ml' | '100ml'>>({
    printemps: '100ml',
    ete: '100ml',
    automne: '100ml',
    hiver: '100ml',
  });

  // Added notification tracker
  const [addedOffer, setAddedOffer] = useState<string | null>(null);

  const triggerAddedFeedback = (offerKey: string) => {
    setAddedOffer(offerKey);
    setTimeout(() => setAddedOffer(null), 2500);
  };

  const handleSizeToggle = (id: string, size: '50ml' | '100ml') => {
    setSelectedSizes((prev) => ({ ...prev, [id]: size }));
  };

  // Add individual perfume from 4-card grid
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

    triggerAddedFeedback(perfume.id);
  };

  // Add Offer 1: Single Flacon
  const handleAddSingleOffer = () => {
    const perfume = PERFUMES.find((p) => p.id === singleSeasonId) || PERFUMES[2];
    const price = singleSize === '100ml' ? perfume.price100ml : perfume.price50ml;

    addToCart({
      id: `${perfume.id}-${singleSize}`,
      type: 'bottle',
      title: `${perfume.seasonName} — Eau de Parfum (${singleSize})`,
      seasonId: perfume.id,
      size: singleSize,
      price,
      image: perfume.image,
    });

    triggerAddedFeedback('tier-1');
  };

  // Add Offer 2: Seasonal Duo
  const handleAddDuoOffer = () => {
    const p1 = PERFUMES.find((p) => p.id === duoSeason1) || PERFUMES[2];
    const p2 = PERFUMES.find((p) => p.id === duoSeason2) || PERFUMES[0];

    addToCart({
      id: `duo-${duoSeason1}-${duoSeason2}`,
      type: 'coffret',
      title: `Le Duo Harmonieux: ${p1.seasonName} + ${p2.seasonName} (Save 15%)`,
      price: 415,
      image: p1.image,
    });

    triggerAddedFeedback('tier-2');
  };

  // Add Offer 3: Complete Quadriptych
  const handleAddQuadOffer = () => {
    addToCart({
      id: 'grand-coffret-4-saisons',
      type: 'coffret',
      title: 'Grand Coffret des 4 Saisons — Complete Quadriptych (Save 25%)',
      price: 745,
      image: '/assets/aistudio/Coffret_940e861e.jpg',
    });

    triggerAddedFeedback('tier-3');
  };

  const selectedSinglePerfume = PERFUMES.find((p) => p.id === singleSeasonId) || PERFUMES[2];
  const selectedDuoP1 = PERFUMES.find((p) => p.id === duoSeason1) || PERFUMES[2];
  const selectedDuoP2 = PERFUMES.find((p) => p.id === duoSeason2) || PERFUMES[0];

  return (
    <section className="relative w-full py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#15281e] border border-[#D4AF37]/35 text-[10px] uppercase tracking-[0.28em] text-[#D4AF37] font-mono mb-4">
          <Sparkles className="w-3 h-3 text-[#E6C786]" />
          <span>OFFRES EXCLUSIVES DE LA MAISON · MULTIPLE OFFERS</span>
        </div>
        <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl text-[#F7F4EB] font-normal tracking-[0.02em] mb-4">
          The Seasonal Flacon Collection
        </h2>
        <p className="text-xs sm:text-sm text-[#B8C2B9] leading-relaxed font-light text-balance">
          Indulge in our curated multi-bottle offers with preferred maison savings and complimentary
          presentation coffrets, or acquire individual numbered flacons hand-poured in Paris.
        </p>

        {/* View Mode Toggle: Multi-Offers vs Individual Cards */}
        <div className="inline-flex items-center p-1 rounded-sm bg-[#0d1812] border border-[#D4AF37]/30 mt-8 shadow-lg">
          <button
            onClick={() => setActiveTab('offers')}
            type="button"
            className={`px-4 sm:px-6 py-2 rounded-xs text-xs uppercase tracking-[0.18em] font-medium transition-all flex items-center gap-2 ${
              activeTab === 'offers'
                ? 'bg-[#183123] text-[#E6C786] border border-[#D4AF37]/50 shadow-md'
                : 'text-[#B8C2B9] hover:text-[#F7F4EB]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Tiered Multi-Bottle Offers</span>
            <span className="hidden sm:inline text-[10px] px-1.5 py-0.5 rounded bg-[#D4AF37]/20 text-[#E6C786] font-mono">
              Save up to 25%
            </span>
          </button>
          <button
            onClick={() => setActiveTab('individual')}
            type="button"
            className={`px-4 sm:px-6 py-2 rounded-xs text-xs uppercase tracking-[0.18em] font-medium transition-all ${
              activeTab === 'individual'
                ? 'bg-[#183123] text-[#E6C786] border border-[#D4AF37]/50 shadow-md'
                : 'text-[#B8C2B9] hover:text-[#F7F4EB]'
            }`}
          >
            <span>Compare 4 Individual Flacons</span>
          </button>
        </div>
      </div>

      {/* VIEW 1: TIERED MULTI-OFFER SHOWCASE */}
      {activeTab === 'offers' && (
        <div className="space-y-16 animate-fade-in">
          {/* 3 Luxury Tier Offer Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {/* TIER 1: 1 FLACON (SOLITAIRE) */}
            <div className="relative flex flex-col rounded-sm overflow-hidden bg-[#0f1c15]/85 backdrop-blur-xl border border-[#D4AF37]/25 hover:border-[#D4AF37]/60 transition-all duration-300 p-6 sm:p-8 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] uppercase tracking-[0.24em] font-mono text-[#B8C2B9] font-medium">
                  Tier 01 · L’Unité
                </span>
                <span className="text-[10px] px-2.5 py-1 rounded-full bg-[#15261d] border border-[#D4AF37]/25 text-[#B8C2B9] uppercase tracking-widest font-mono">
                  Standard
                </span>
              </div>

              <h3 className="font-editorial text-2xl sm:text-3xl text-[#F7F4EB] mb-1">
                1 × Signature Flacon
              </h3>
              <p className="text-xs text-[#B8C2B9] font-light leading-relaxed mb-6">
                A single hand-poured seasonal masterpiece bottled in weighted glass with magnetic gold cap.
              </p>

              {/* Product Visual Container */}
              <div className="relative w-full aspect-[16/10] rounded-sm overflow-hidden bg-[#0c1611] border border-[#D4AF37]/15 mb-6">
                <Image
                  src={selectedSinglePerfume.image}
                  alt={selectedSinglePerfume.seasonName}
                  fill
                  className="object-contain p-2"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute bottom-2 left-3 text-[10px] uppercase font-mono tracking-widest text-[#D4AF37] bg-black/60 px-2 py-0.5 rounded">
                  {selectedSinglePerfume.seasonName}
                </div>
              </div>

              {/* Interactive Season Picker */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-[#D4AF37] font-mono mb-2">
                    Choose Fragrance:
                  </label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {PERFUMES.map((perfume) => (
                      <button
                        key={perfume.id}
                        type="button"
                        onClick={() => setSingleSeasonId(perfume.id)}
                        className={`p-2 rounded-xs border text-left transition-all ${
                          singleSeasonId === perfume.id
                            ? 'bg-[#183123] border-[#D4AF37] text-[#E6C786] shadow-sm'
                            : 'bg-[#0d1712] border-[#D4AF37]/20 text-[#B8C2B9] hover:border-[#D4AF37]/50'
                        }`}
                      >
                        <div className="font-serif font-medium">{perfume.seasonName}</div>
                        <div className="text-[10px] opacity-75 font-mono">€{perfume.price100ml}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size Selector */}
                <div className="flex items-center justify-between p-2 rounded bg-[#0b1510] border border-[#D4AF37]/20 text-xs font-mono">
                  <span className="text-[10px] uppercase tracking-wider text-[#B8C2B9]">Volume:</span>
                  <div className="flex gap-1.5">
                    <button
                      type="button"
                      onClick={() => setSingleSize('100ml')}
                      className={`px-3 py-1 rounded-xs transition-colors ${
                        singleSize === '100ml'
                          ? 'bg-[#183123] text-[#E6C786] border border-[#D4AF37]/40 font-semibold'
                          : 'text-[#B8C2B9] hover:text-[#F7F4EB]'
                      }`}
                    >
                      100ml
                    </button>
                    <button
                      type="button"
                      onClick={() => setSingleSize('50ml')}
                      className={`px-3 py-1 rounded-xs transition-colors ${
                        singleSize === '50ml'
                          ? 'bg-[#183123] text-[#E6C786] border border-[#D4AF37]/40 font-semibold'
                          : 'text-[#B8C2B9] hover:text-[#F7F4EB]'
                      }`}
                    >
                      50ml
                    </button>
                  </div>
                </div>
              </div>

              {/* Value & Perks */}
              <div className="space-y-2 border-t border-[#D4AF37]/15 pt-4 mb-6 text-xs text-[#B8C2B9] font-light">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                  <span>1× Numbered Master Bottle ({singleSize})</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                  <span>2 Complimentary 2ml Discovery Vials</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                  <span>Signature Emerald Gift Box with Wax Seal</span>
                </div>
              </div>

              {/* Price & Action */}
              <div className="mt-auto pt-4 border-t border-[#D4AF37]/20">
                <div className="flex items-baseline justify-between mb-4">
                  <span className="text-xs text-[#B8C2B9] font-mono uppercase tracking-wider">
                    Offer Price
                  </span>
                  <span className="font-mono text-2xl text-[#E6C786] font-semibold">
                    €{singleSize === '100ml' ? selectedSinglePerfume.price100ml : selectedSinglePerfume.price50ml}
                  </span>
                </div>

                <button
                  onClick={handleAddSingleOffer}
                  type="button"
                  className="w-full py-3.5 px-4 rounded-sm bg-[#162d20] hover:bg-[#1d3b2a] border border-[#D4AF37]/50 hover:border-[#D4AF37] text-xs uppercase tracking-[0.18em] font-medium text-[#F7F4EB] hover:text-[#E6C786] transition-all flex items-center justify-center gap-2 shadow-md"
                >
                  {addedOffer === 'tier-1' ? (
                    <>
                      <Check className="w-4 h-4 text-[#D4AF37]" />
                      <span>Added to Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
                      <span>Add Single Flacon</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* TIER 2: 2 FLACONS (SEASONAL DUO) - MOST POPULAR */}
            <div className="relative flex flex-col rounded-sm overflow-hidden bg-[#11231a] backdrop-blur-2xl border-2 border-[#D4AF37] p-6 sm:p-8 shadow-[0_0_35px_rgba(212,175,55,0.22)] transform lg:-translate-y-3">
              {/* Highlight Ribbon */}
              <div className="absolute top-0 right-0 left-0 bg-gradient-to-r from-[#D4AF37] via-[#F2D794] to-[#D4AF37] py-1 text-center text-[#111e17] text-[10px] font-mono tracking-[0.22em] font-bold uppercase shadow-sm">
                ★ MOST POPULAR · SAVE 15% · DUO HARMONIEUX
              </div>

              <div className="flex items-center justify-between mb-4 mt-3">
                <span className="text-[10px] uppercase tracking-[0.24em] font-mono text-[#D4AF37] font-semibold">
                  Tier 02 · Le Duo
                </span>
                <span className="text-[10px] px-2.5 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/60 text-[#E6C786] uppercase tracking-widest font-mono font-medium">
                  Save €80
                </span>
              </div>

              <h3 className="font-editorial text-2xl sm:text-3xl text-[#F7F4EB] mb-1">
                2 × Seasonal Flacons
              </h3>
              <p className="text-xs text-[#B8C2B9] font-light leading-relaxed mb-6">
                Pair two contrasting solstices or harmonies. Includes our complimentary gold travel atomizer.
              </p>

              {/* Dual Visual Container */}
              <div className="relative w-full aspect-[16/10] rounded-sm overflow-hidden bg-[#0c1611] border border-[#D4AF37]/30 mb-6 grid grid-cols-2 gap-1 p-1">
                <div className="relative w-full h-full">
                  <Image
                    src={selectedDuoP1.image}
                    alt={selectedDuoP1.seasonName}
                    fill
                    className="object-contain p-1"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-1.5 left-2 text-[9px] uppercase font-mono tracking-wider text-[#D4AF37] bg-black/70 px-1.5 py-0.5 rounded">
                    1: {selectedDuoP1.seasonName}
                  </div>
                </div>
                <div className="relative w-full h-full">
                  <Image
                    src={selectedDuoP2.image}
                    alt={selectedDuoP2.seasonName}
                    fill
                    className="object-contain p-1"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-1.5 left-2 text-[9px] uppercase font-mono tracking-wider text-[#D4AF37] bg-black/70 px-1.5 py-0.5 rounded">
                    2: {selectedDuoP2.seasonName}
                  </div>
                </div>
              </div>

              {/* Interactive Pair Pickers */}
              <div className="space-y-3 mb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.16em] text-[#D4AF37] font-mono mb-1.5">
                      First Flacon (100ml):
                    </label>
                    <select
                      value={duoSeason1}
                      onChange={(e) => setDuoSeason1(e.target.value as any)}
                      className="w-full p-2.5 rounded-sm bg-[#0a150f] border border-[#D4AF37]/35 text-[#F7F4EB] text-xs font-serif focus:outline-none focus:border-[#D4AF37]"
                    >
                      {PERFUMES.map((p) => (
                        <option key={p.id} value={p.id} className="bg-[#111e17] text-[#F7F4EB]">
                          {p.seasonName} (100ml)
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-[0.16em] text-[#D4AF37] font-mono mb-1.5">
                      Second Flacon (100ml):
                    </label>
                    <select
                      value={duoSeason2}
                      onChange={(e) => setDuoSeason2(e.target.value as any)}
                      className="w-full p-2.5 rounded-sm bg-[#0a150f] border border-[#D4AF37]/35 text-[#F7F4EB] text-xs font-serif focus:outline-none focus:border-[#D4AF37]"
                    >
                      {PERFUMES.map((p) => (
                        <option key={p.id} value={p.id} className="bg-[#111e17] text-[#F7F4EB]">
                          {p.seasonName} (100ml)
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Value & Perks */}
              <div className="space-y-2 border-t border-[#D4AF37]/20 pt-4 mb-6 text-xs text-[#B8C2B9] font-light">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#E6C786] shrink-0" />
                  <span className="font-medium text-[#F7F4EB]">2× Full 100ml Flacons of Your Choice</span>
                </div>
                <div className="flex items-center gap-2 text-[#E6C786]">
                  <Gift className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                  <span className="font-medium">FREE Bespoke Gold Travel Atomizer (€45 Value)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#E6C786] shrink-0" />
                  <span>4 Complimentary 2ml Discovery Vials</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#E6C786] shrink-0" />
                  <span>Handcrafted Dual Presentation Box</span>
                </div>
              </div>

              {/* Price & Action */}
              <div className="mt-auto pt-4 border-t border-[#D4AF37]/30">
                <div className="flex items-baseline justify-between mb-4">
                  <div>
                    <span className="text-[11px] text-[#B8C2B9] line-through font-mono mr-2">
                      €495
                    </span>
                    <span className="text-xs text-[#E6C786] font-mono uppercase tracking-wider font-semibold">
                      Duo Offer
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-3xl text-[#E6C786] font-bold">
                      €415
                    </span>
                    <div className="text-[10px] text-emerald-400 font-mono">
                      Save €80 (16% off)
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleAddDuoOffer}
                  type="button"
                  className="w-full py-4 px-4 rounded-sm bg-gradient-to-r from-[#183a27] via-[#214f34] to-[#183a27] hover:from-[#214f34] hover:to-[#2b6543] border border-[#D4AF37] text-xs uppercase tracking-[0.2em] font-semibold text-[#F7F4EB] hover:text-[#E6C786] transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.35)]"
                >
                  {addedOffer === 'tier-2' ? (
                    <>
                      <Check className="w-4 h-4 text-[#D4AF37]" />
                      <span>Duo Added to Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
                      <span>Claim Duo Offer (Save €80)</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* TIER 3: 4 FLACONS (GRAND QUADRIPTYCH) - BEST VALUE */}
            <div className="relative flex flex-col rounded-sm overflow-hidden bg-[#0f1c15]/85 backdrop-blur-xl border border-[#D4AF37]/35 hover:border-[#D4AF37]/80 transition-all duration-300 p-6 sm:p-8 shadow-xl">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] uppercase tracking-[0.24em] font-mono text-[#D4AF37] font-semibold">
                  Tier 03 · L’Intégrale
                </span>
                <span className="text-[10px] px-2.5 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/60 text-[#E6C786] uppercase tracking-widest font-mono font-medium">
                  Save €250
                </span>
              </div>

              <h3 className="font-editorial text-2xl sm:text-3xl text-[#F7F4EB] mb-1">
                4 × Grand Quadriptych
              </h3>
              <p className="text-xs text-[#B8C2B9] font-light leading-relaxed mb-6">
                The definitive collection: all 4 seasons in a hand-lacquered numbered wooden presentation vault.
              </p>

              {/* Coffret Image Visual */}
              <div className="relative w-full aspect-[16/10] rounded-sm overflow-hidden bg-[#0c1611] border border-[#D4AF37]/25 mb-6">
                <Image
                  src="/assets/aistudio/Coffret_940e861e.jpg"
                  alt="Quatréa Paris Grand Coffret des 4 Saisons"
                  fill
                  className="object-contain p-2"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-2 right-2 text-[10px] px-2 py-0.5 rounded bg-black/80 border border-[#D4AF37]/40 text-[#E6C786] font-mono">
                  All 4 Seasons (100ml)
                </div>
              </div>

              {/* Seasons Included List */}
              <div className="p-3 rounded bg-[#0b1510] border border-[#D4AF37]/20 mb-6">
                <div className="text-[10px] uppercase tracking-[0.2em] text-[#D4AF37] font-mono mb-2">
                  Complete Seasonal Cycle:
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-[#F7F4EB]">
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                    <span>Printemps (100ml)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                    <span>Été (100ml)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                    <span>Automne (100ml)</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]" />
                    <span>Hiver (100ml)</span>
                  </div>
                </div>
              </div>

              {/* Value & Perks */}
              <div className="space-y-2 border-t border-[#D4AF37]/15 pt-4 mb-6 text-xs text-[#B8C2B9] font-light">
                <div className="flex items-center gap-2">
                  <Crown className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                  <span className="text-[#F7F4EB] font-medium">Hand-Lacquered Wooden Presentation Vault</span>
                </div>
                <div className="flex items-center gap-2 text-[#E6C786]">
                  <Gift className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                  <span>Includes Complete Discovery Sampler Box (€65 Value)</span>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                  <span>Numbered Certificate of Authenticity</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                  <span>White Glove Express Courier Delivery</span>
                </div>
              </div>

              {/* Price & Action */}
              <div className="mt-auto pt-4 border-t border-[#D4AF37]/20">
                <div className="flex items-baseline justify-between mb-4">
                  <div>
                    <span className="text-[11px] text-[#B8C2B9] line-through font-mono mr-2">
                      €995
                    </span>
                    <span className="text-xs text-[#E6C786] font-mono uppercase tracking-wider font-semibold">
                      Grand Offer
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-3xl text-[#E6C786] font-bold">
                      €745
                    </span>
                    <div className="text-[10px] text-emerald-400 font-mono">
                      Save €250 (25% off)
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleAddQuadOffer}
                  type="button"
                  className="w-full py-3.5 px-4 rounded-sm bg-[#1a3826] hover:bg-[#224b33] border border-[#D4AF37] text-xs uppercase tracking-[0.18em] font-medium text-[#F7F4EB] hover:text-[#E6C786] transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-[0_0_25px_rgba(212,175,55,0.3)]"
                >
                  {addedOffer === 'tier-3' ? (
                    <>
                      <Check className="w-4 h-4 text-[#D4AF37]" />
                      <span>Vault Added to Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
                      <span>Claim Vault (Save €250)</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Quick Peek: Explore Individual Flacon Profiles */}
          <div className="pt-8 border-t border-[#D4AF37]/15 text-center">
            <button
              onClick={() => setActiveTab('individual')}
              type="button"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-[#D4AF37] hover:text-[#E6C786] transition-colors py-2 px-4 rounded border border-[#D4AF37]/30 hover:border-[#D4AF37]"
            >
              <span>Prefer Individual Bottles? Explore All 4 Seasonal Profiles</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* VIEW 2: 4-COLUMN INDIVIDUAL FLACONS COMPARISON */}
      {activeTab === 'individual' && (
        <div className="space-y-8 animate-fade-in">
          <div className="flex items-center justify-between pb-4 border-b border-[#D4AF37]/15">
            <span className="text-xs uppercase tracking-widest text-[#B8C2B9] font-mono">
              Individual Seasonal Flacons (100ml / 50ml)
            </span>
            <button
              onClick={() => setActiveTab('offers')}
              type="button"
              className="text-xs text-[#E6C786] hover:text-[#F7F4EB] tracking-wider uppercase underline underline-offset-4 font-mono"
            >
              ← Back to Multi-Bottle Offers (Save up to 25%)
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-6">
            {PERFUMES.map((perfume) => {
              const currentSize = selectedSizes[perfume.id] || '100ml';
              const price = currentSize === '100ml' ? perfume.price100ml : perfume.price50ml;

              return (
                <div
                  key={perfume.id}
                  className="group relative flex flex-col rounded-sm overflow-hidden bg-[#0f1c15]/80 backdrop-blur-xl border border-[#D4AF37]/25 hover:border-[#D4AF37]/70 transition-all duration-500 shadow-xl hover:shadow-[0_15px_35px_rgba(0,0,0,0.6)]"
                >
                  {/* Product Card Image Container */}
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

                      {/* Notes Preview */}
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
                        {addedOffer === perfume.id ? (
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
        </div>
      )}
    </section>
  );
}
