'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ShoppingBag,
  Sparkles,
  MapPin,
  Clock,
  Wind,
  Check,
  ChevronLeft,
  ArrowRight,
} from 'lucide-react';
import { PERFUMES, NOTE_PROFILES } from '@/lib/perfumes';
import { useCart } from '@/lib/cart-context';
import SeasonalParticles from '@/components/SeasonalParticles';

interface PerfumeDetailClientProps {
  initialSeason: string;
}

export default function PerfumeDetailClient({ initialSeason }: PerfumeDetailClientProps) {
  const perfume =
    PERFUMES.find((p) => p.id.toLowerCase() === initialSeason.toLowerCase()) || PERFUMES[2]; // defaults to Automne

  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState<'50ml' | '100ml'>('100ml');
  const [engravingText, setEngravingText] = useState('');
  const [isEngravingOpen, setIsEngravingOpen] = useState(false);
  const [added, setAdded] = useState(false);
  const [activeNote, setActiveNote] = useState<string>(perfume.pyramid.top[0]);

  const price = selectedSize === '100ml' ? perfume.price100ml : perfume.price50ml;

  // Other seasons for cross-seasonal discovery
  const otherSeasons = PERFUMES.filter((p) => p.id !== perfume.id);

  const handleAddToCart = () => {
    addToCart({
      id: `${perfume.id}-${selectedSize}${engravingText ? `-${engravingText}` : ''}`,
      type: 'bottle',
      title: `${perfume.seasonName} — Eau de Parfum`,
      seasonId: perfume.id,
      size: selectedSize,
      price,
      image: perfume.image,
      engraving: engravingText || undefined,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  const currentNoteInfo = NOTE_PROFILES[activeNote] || {
    profile: 'Botanical extract macerated slowly to preserve natural olfactory luminescence.',
    origin: 'Artisanal terroir harvest, Grasse & French sanctuaries',
    facet: 'Pure · Harmonious · Natural',
  };

  return (
    <div className="relative w-full pt-24 pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* 1. Top Luxury Header & Navigation Bar */}
      <div className="flex items-center justify-between text-xs uppercase tracking-[0.24em] text-[#B8C2B9] mb-8 pb-4 border-b border-[#D4AF37]/20">
        <Link
          href="/catalog"
          className="flex items-center gap-1.5 hover:text-[#E6C786] transition-colors group"
        >
          <ChevronLeft className="w-3.5 h-3.5 text-[#D4AF37] group-hover:-translate-x-0.5 transition-transform" />
          <span>La Collection des Saisons</span>
        </Link>

        {/* Brand Lockup in Header */}
        <div className="hidden sm:flex items-center gap-2 text-[11px] font-mono text-[#D4AF37]">
          <Image
            src="/assets/aistudio/LogoIcon_header.png"
            alt="Quatréa Crest"
            width={18}
            height={18}
            className="w-4 h-4 object-contain inline-block"
            referrerPolicy="no-referrer"
          />
          <span className="tracking-[0.28em] font-medium text-[#F7F4EB]">QUATRÉA PARIS</span>
          <span className="text-[#D4AF37]/50">·</span>
          <span>FLACON DE GRASSE</span>
        </div>

        <div className="text-[11px] font-mono text-[#D4AF37]">
          BATCH № {perfume.id.toUpperCase()}-2026
        </div>
      </div>

      {/* 2. Main Contiguous Purchase Module Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start mb-24">
        {/* Left Column: Full-Bleed 16:9 Artwork with Ambient Glow */}
        <div className="lg:col-span-7 sticky top-24">
          <div
            className="relative w-full aspect-[16/9] rounded-sm overflow-hidden border border-[#D4AF37]/40 shadow-2xl bg-[#0c1611]"
            style={{
              boxShadow: `0 30px 70px -15px rgba(0,0,0,0.85), 0 0 50px -10px ${perfume.glowColor}`,
            }}
          >
            <SeasonalParticles season={perfume.id} />
            <Image
              src={perfume.image}
              alt={`Quatréa ${perfume.seasonName} Flacon`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 58vw"
              className="object-contain w-full h-full"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

            {/* Corner Badge */}
            <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-10 pointer-events-none">
              <span className="text-[10px] uppercase tracking-[0.28em] font-mono text-[#D4AF37] block">
                CRYSTAL FLACON № 0{PERFUMES.findIndex((p) => p.id === perfume.id) + 1}
              </span>
              <span className="font-editorial text-2xl sm:text-3xl text-[#F7F4EB]">
                {perfume.seasonName}
              </span>
            </div>
          </div>

          {/* Botanical Provenance & Flacon Craftsmanship strip */}
          <div className="mt-6 p-5 rounded-sm bg-[#0e1b14]/85 border border-[#D4AF37]/25 backdrop-blur-md space-y-3">
            <div className="flex items-center justify-between text-xs font-mono border-b border-[#D4AF37]/15 pb-2">
              <span className="uppercase tracking-widest text-[#D4AF37] flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                <span>Terroir & Provenance</span>
              </span>
              <span className="text-[#B8C2B9] text-[10px]">Cold-Macerated 6 Months</span>
            </div>
            <ul className="text-xs text-[#B8C2B9] space-y-1.5 list-disc list-inside font-light">
              {perfume.provenance.map((prov, i) => (
                <li key={i} className="leading-relaxed">
                  {prov}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: Contiguous Purchase Module */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
          <div className="p-6 sm:p-8 rounded-sm bg-[#111f17]/90 border border-[#D4AF37]/35 backdrop-blur-xl shadow-2xl space-y-6">
            {/* Brand Header Anchoring */}
            <div className="border-b border-[#D4AF37]/20 pb-5">
              <div className="flex items-center gap-2.5 mb-2">
                <Image
                  src="/assets/aistudio/LogoIcon_header.png"
                  alt="Quatréa Crest"
                  width={24}
                  height={24}
                  className="w-6 h-6 object-contain"
                  referrerPolicy="no-referrer"
                />
                <span className="text-xs uppercase tracking-[0.28em] text-[#D4AF37] font-semibold font-mono">
                  QUATRÉA · LA MAISON DES SAISONS
                </span>
              </div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-[#B8C2B9] font-mono mb-2">
                Haute Parfumerie · 28 Place Vendôme, Paris
              </div>

              <h1 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-[#F7F4EB] font-normal leading-tight mb-2">
                {perfume.seasonName}
              </h1>
              <p className="font-editorial italic text-lg text-[#E6C786] font-light mb-3">
                “{perfume.headline}”
              </p>
              <p className="text-xs sm:text-sm text-[#B8C2B9] leading-relaxed font-light">
                {perfume.description}
              </p>
            </div>

            {/* Dynamic Variant Selector & Pricing Area */}
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs">
                <span className="uppercase tracking-widest text-[#B8C2B9] font-mono text-[11px]">
                  Select Format:
                </span>
                <span className="text-xs font-mono text-[#D4AF37]">
                  Active: <strong className="text-[#E6C786] font-semibold">{selectedSize} Flacon</strong>
                </span>
              </div>

              {/* Size Buttons */}
              <div className="grid grid-cols-2 gap-3 font-mono">
                <button
                  type="button"
                  onClick={() => setSelectedSize('100ml')}
                  className={`p-3.5 rounded-sm border text-left transition-all ${
                    selectedSize === '100ml'
                      ? 'border-[#D4AF37] bg-[#1a3325] text-[#E6C786] shadow-[0_0_15px_rgba(212,175,55,0.2)]'
                      : 'border-[#D4AF37]/25 bg-[#0e1b14] text-[#B8C2B9] hover:text-[#F7F4EB] hover:border-[#D4AF37]/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm">100ml Flacon</span>
                    <span className="text-xs text-[#E6C786] tabular-nums font-semibold">
                      €{perfume.price100ml}
                    </span>
                  </div>
                  <div className="text-[10px] text-[#B8C2B9] mt-0.5">Grand Format Signature</div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedSize('50ml')}
                  className={`p-3.5 rounded-sm border text-left transition-all ${
                    selectedSize === '50ml'
                      ? 'border-[#D4AF37] bg-[#1a3325] text-[#E6C786] shadow-[0_0_15px_rgba(212,175,55,0.2)]'
                      : 'border-[#D4AF37]/25 bg-[#0e1b14] text-[#B8C2B9] hover:text-[#F7F4EB] hover:border-[#D4AF37]/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sm">50ml Travel</span>
                    <span className="text-xs text-[#E6C786] tabular-nums font-semibold">
                      €{perfume.price50ml}
                    </span>
                  </div>
                  <div className="text-[10px] text-[#B8C2B9] mt-0.5">Voyage Crystal Flacon</div>
                </button>
              </div>

              {/* Complimentary Custom Brass Cap Monogram */}
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => setIsEngravingOpen(!isEngravingOpen)}
                  className="text-xs text-[#E6C786] hover:text-[#F7F4EB] flex items-center gap-1.5 transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span className="underline underline-offset-4 font-mono text-[11px]">
                    {isEngravingOpen ? 'Hide Custom Monogram' : '+ Complimentary Brass Cap Engraving'}
                  </span>
                </button>

                {isEngravingOpen && (
                  <div className="mt-3 p-3.5 rounded-xs bg-[#0c1611] border border-[#D4AF37]/35 space-y-2">
                    <label className="block text-[11px] text-[#B8C2B9] font-mono">
                      Initials (up to 3 characters hand-chiseled on brass cap):
                    </label>
                    <input
                      type="text"
                      maxLength={3}
                      placeholder="e.g. A.V."
                      value={engravingText}
                      onChange={(e) => setEngravingText(e.target.value.toUpperCase())}
                      className="w-full text-xs font-mono tracking-widest px-3 py-2 rounded-xs bg-[#132219] border border-[#D4AF37]/40 text-[#E6C786] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                )}
              </div>

              {/* Dynamic Primary CTA Button: Price bound inside */}
              <div className="pt-2">
                <button
                  onClick={handleAddToCart}
                  type="button"
                  className="w-full py-4 px-6 rounded-sm bg-[#1b3527] hover:bg-[#234533] border border-[#D4AF37] text-xs sm:text-sm uppercase tracking-[0.22em] font-medium text-[#F7F4EB] hover:text-[#E6C786] transition-all flex items-center justify-center gap-3 shadow-xl hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] group"
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4 text-[#D4AF37]" />
                      <span>Added to Bag</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4 text-[#D4AF37] group-hover:scale-110 transition-transform" />
                      <span>ADD TO BAG — €{price}</span>
                    </>
                  )}
                </button>
              </div>

              {/* Trust Badges */}
              <div className="flex items-center justify-between text-[10px] text-[#B8C2B9] font-mono pt-1">
                <span>Free Paris White-Glove Courier</span>
                <span>·</span>
                <span>2 Free 2ml Discovery Samples</span>
                <span>·</span>
                <span>Gift Boxed</span>
              </div>
            </div>

            {/* Performance Radar: Longevity & Sillage */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-[#D4AF37]/20 text-xs text-[#B8C2B9]">
              <div className="flex items-center gap-2.5 p-2.5 rounded-xs bg-[#0c1611]/80 border border-[#D4AF37]/20">
                <Clock className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <div>
                  <div className="text-[10px] uppercase text-[#D4AF37]/80 font-mono">Longevity</div>
                  <div className="text-[#F7F4EB] font-medium font-mono text-xs">{perfume.longevity}</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-2.5 rounded-xs bg-[#0c1611]/80 border border-[#D4AF37]/20">
                <Wind className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <div>
                  <div className="text-[10px] uppercase text-[#D4AF37]/80 font-mono">Sillage Aura</div>
                  <div className="text-[#F7F4EB] font-medium font-mono text-xs">{perfume.sillage}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Interactive Olfactory Architecture (Top, Heart, Base with Clickable Micro-Stories) */}
      <div className="p-8 sm:p-12 rounded-sm bg-[#0e1c14]/90 border border-[#D4AF37]/35 backdrop-blur-xl mb-20 shadow-2xl">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-mono mb-2">
            ARCHITECTURE SENSORIELLE
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl text-[#F7F4EB] font-normal">
            The Interactive Olfactory Pyramid
          </h2>
          <p className="text-xs text-[#B8C2B9] mt-2 font-light">
            Select any raw botanical note below to reveal its terroir, extraction method, and sensory
            facets.
          </p>
        </div>

        {/* 3 Tiers separated by delicate gold divider lines */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Top Tier */}
          <div className="p-6 rounded-sm bg-[#122219] border border-[#D4AF37]/25 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between border-b border-[#D4AF37]/20 pb-3 mb-3">
                <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-mono font-semibold">
                  01. Top Notes
                </span>
                <span className="text-[10px] text-[#B8C2B9] font-mono">0 — 45 Mins</span>
              </div>
              <p className="text-xs text-[#B8C2B9] leading-relaxed font-light mb-4">
                The immediate sparkling invocation; volatile botanical molecules awakened on the skin.
              </p>

              {/* Clickable Note Pills */}
              <div className="space-y-2">
                {perfume.pyramid.top.map((note) => {
                  const isSelected = activeNote === note;
                  return (
                    <button
                      key={note}
                      type="button"
                      onClick={() => setActiveNote(note)}
                      className={`w-full text-left px-3.5 py-2.5 rounded-xs border text-xs transition-all flex items-center justify-between ${
                        isSelected
                          ? 'border-[#D4AF37] bg-[#1a3325] text-[#E6C786] shadow-sm'
                          : 'border-[#D4AF37]/20 bg-[#0d1812] text-[#F7F4EB] hover:border-[#D4AF37]/60'
                      }`}
                    >
                      <span className="font-serif">{note}</span>
                      {isSelected ? (
                        <span className="text-[10px] text-[#E6C786] font-mono tracking-wider font-semibold">
                          ● ACTIVE
                        </span>
                      ) : (
                        <span className="text-[10px] text-[#D4AF37]/40 font-mono tracking-wider">
                          REVEAL
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Heart Tier */}
          <div className="p-6 rounded-sm bg-[#122219] border border-[#D4AF37]/25 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between border-b border-[#D4AF37]/20 pb-3 mb-3">
                <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-mono font-semibold">
                  02. Heart Notes
                </span>
                <span className="text-[10px] text-[#B8C2B9] font-mono">Hours 1 — 6</span>
              </div>
              <p className="text-xs text-[#B8C2B9] leading-relaxed font-light mb-4">
                The harmonic body; blooming flora, aged spices, and complex forest accords.
              </p>

              {/* Clickable Note Pills */}
              <div className="space-y-2">
                {perfume.pyramid.heart.map((note) => {
                  const isSelected = activeNote === note;
                  return (
                    <button
                      key={note}
                      type="button"
                      onClick={() => setActiveNote(note)}
                      className={`w-full text-left px-3.5 py-2.5 rounded-xs border text-xs transition-all flex items-center justify-between ${
                        isSelected
                          ? 'border-[#D4AF37] bg-[#1a3325] text-[#E6C786] shadow-sm'
                          : 'border-[#D4AF37]/20 bg-[#0d1812] text-[#F7F4EB] hover:border-[#D4AF37]/60'
                      }`}
                    >
                      <span className="font-serif">{note}</span>
                      {isSelected ? (
                        <span className="text-[10px] text-[#E6C786] font-mono tracking-wider font-semibold">
                          ● ACTIVE
                        </span>
                      ) : (
                        <span className="text-[10px] text-[#D4AF37]/40 font-mono tracking-wider">
                          REVEAL
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Base Tier */}
          <div className="p-6 rounded-sm bg-[#122219] border border-[#D4AF37]/25 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between border-b border-[#D4AF37]/20 pb-3 mb-3">
                <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-mono font-semibold">
                  03. Base Notes
                </span>
                <span className="text-[10px] text-[#B8C2B9] font-mono">Hours 6 — 16+</span>
              </div>
              <p className="text-xs text-[#B8C2B9] leading-relaxed font-light mb-4">
                The lasting sillage; heavy resins, aged oak heartwood, and comforting animalic amber.
              </p>

              {/* Clickable Note Pills */}
              <div className="space-y-2">
                {perfume.pyramid.base.map((note) => {
                  const isSelected = activeNote === note;
                  return (
                    <button
                      key={note}
                      type="button"
                      onClick={() => setActiveNote(note)}
                      className={`w-full text-left px-3.5 py-2.5 rounded-xs border text-xs transition-all flex items-center justify-between ${
                        isSelected
                          ? 'border-[#D4AF37] bg-[#1a3325] text-[#E6C786] shadow-sm'
                          : 'border-[#D4AF37]/20 bg-[#0d1812] text-[#F7F4EB] hover:border-[#D4AF37]/60'
                      }`}
                    >
                      <span className="font-serif">{note}</span>
                      {isSelected ? (
                        <span className="text-[10px] text-[#E6C786] font-mono tracking-wider font-semibold">
                          ● ACTIVE
                        </span>
                      ) : (
                        <span className="text-[10px] text-[#D4AF37]/40 font-mono tracking-wider">
                          REVEAL
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Ingredient Storyteller Card */}
        <div className="mt-8 p-6 rounded-sm bg-[#0c1611] border border-[#D4AF37]/35 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 animate-fade-in">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-widest text-[#D4AF37]">
                Active Botanical Note:
              </span>
              <strong className="font-editorial text-lg text-[#F7F4EB] font-normal">
                {activeNote}
              </strong>
            </div>
            <p className="text-xs sm:text-sm text-[#B8C2B9] leading-relaxed font-light">
              {currentNoteInfo.profile}
            </p>
            <div className="text-[11px] text-[#E6C786] font-mono pt-1">
              <span>Provenance: {currentNoteInfo.origin}</span>
            </div>
          </div>

          <div className="px-4 py-2.5 rounded-xs bg-[#14261d] border border-[#D4AF37]/25 shrink-0 text-center">
            <span className="text-[10px] font-mono uppercase tracking-wider text-[#D4AF37] block mb-0.5">
              Sensory Facet
            </span>
            <span className="text-xs font-serif text-[#F7F4EB]">{currentNoteInfo.facet}</span>
          </div>
        </div>
      </div>

      {/* 4. Perfumer’s Journal & Ritual Recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
        <div className="p-8 rounded-sm bg-[#0e1b14]/85 border border-[#D4AF37]/30 space-y-4">
          <div className="text-xs uppercase tracking-widest text-[#D4AF37] font-mono">
            CARNET DU NEZ
          </div>
          <h3 className="font-editorial text-2xl text-[#F7F4EB]">
            Master Perfumer’s Journal
          </h3>
          <p className="text-xs sm:text-sm text-[#B8C2B9] leading-relaxed font-light italic">
            {perfume.perfumerNotes}
          </p>
          <div className="pt-2 text-xs text-[#E6C786] font-serif">
            — Éléonore Vasseur, Grasse Atelier, 28 Place Vendôme
          </div>
        </div>

        <div className="p-8 rounded-sm bg-[#0e1b14]/85 border border-[#D4AF37]/30 space-y-4">
          <div className="text-xs uppercase tracking-widest text-[#D4AF37] font-mono">
            LE RITUEL DES SAISONS
          </div>
          <h3 className="font-editorial text-2xl text-[#F7F4EB]">
            Pairing & Ritual Recommendations
          </h3>
          <p className="text-xs sm:text-sm text-[#B8C2B9] leading-relaxed font-light">
            {perfume.pairing}
          </p>
          <div className="p-3.5 rounded-xs bg-[#132219] border border-[#D4AF37]/20 text-xs text-[#F7F4EB]">
            <strong className="text-[#D4AF37] font-medium block mb-1">
              Seasonal Atmospheric Bloom:
            </strong>
            Apply to collarbones and inner wrists. As the alcohol evaporates, the heart notes fuse
            harmoniously with natural skin warmth over 14 hours.
          </div>
        </div>
      </div>

      {/* 5. Cross-Seasonal Discovery Carousel ("La Collection des Saisons") */}
      <div className="border-t border-[#D4AF37]/25 pt-16">
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 mb-10">
          <div>
            <div className="text-xs uppercase tracking-[0.28em] text-[#D4AF37] font-mono font-medium mb-1">
              LA COLLECTION DES SAISONS
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#F7F4EB]">
              Explore the Cardinal Cycle
            </h2>
          </div>
          <Link
            href="/catalog"
            className="text-xs font-mono uppercase tracking-widest text-[#E6C786] hover:text-[#F7F4EB] flex items-center gap-1.5 transition-colors"
          >
            <span>View All Four Flacons</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Other 3 Seasons */}
          {otherSeasons.map((p) => (
            <Link
              key={p.id}
              href={`/perfume/${p.id}`}
              className="group flex flex-col rounded-sm overflow-hidden bg-[#0c1611]/85 border border-[#D4AF37]/25 hover:border-[#D4AF37] transition-all p-4 shadow-lg hover:shadow-[0_15px_30px_rgba(0,0,0,0.6)]"
            >
              <div className="relative aspect-[16/9] w-full rounded-xs overflow-hidden mb-3 bg-[#08100b]">
                <Image
                  src={p.image}
                  alt={p.seasonName}
                  fill
                  className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="flex items-baseline justify-between mb-1">
                <span className="font-editorial text-xl text-[#F7F4EB] group-hover:text-[#E6C786] transition-colors">
                  {p.seasonName}
                </span>
                <span className="font-mono text-xs text-[#E6C786] tabular-nums">
                  €{p.price100ml}
                </span>
              </div>
              <p className="text-[11px] text-[#B8C2B9] line-clamp-1 mb-2 font-light">
                {p.tagline}
              </p>
              <span className="text-[10px] uppercase font-mono tracking-widest text-[#D4AF37] mt-auto">
                Discover Flacon →
              </span>
            </Link>
          ))}

          {/* 4th Card: Create Your Discovery Coffret (€45) cross-sell */}
          <Link
            href="/discovery-set"
            className="group flex flex-col rounded-sm overflow-hidden bg-[#122219]/90 border border-[#D4AF37]/45 hover:border-[#D4AF37] transition-all p-4 shadow-xl hover:shadow-[0_15px_30px_rgba(212,175,55,0.25)]"
          >
            <div className="relative aspect-[16/9] w-full rounded-xs overflow-hidden mb-3 bg-[#08100b]">
              <Image
                src="/assets/aistudio/Coffret_940e861e.jpg"
                alt="Discovery Coffret"
                fill
                className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex items-baseline justify-between mb-1">
              <span className="font-editorial text-xl text-[#F7F4EB] group-hover:text-[#E6C786] transition-colors">
                Le Coffret Découverte
              </span>
              <span className="font-mono text-xs text-[#E6C786] tabular-nums font-semibold">
                €45
              </span>
            </div>
            <p className="text-[11px] text-[#B8C2B9] line-clamp-2 mb-2 font-light">
              Four 5ml vials with gold monogram. 100% credited toward your 100ml flacon.
            </p>
            <span className="text-[10px] uppercase font-mono tracking-widest text-[#D4AF37] mt-auto font-medium">
              Assemble 4 Vials →
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
