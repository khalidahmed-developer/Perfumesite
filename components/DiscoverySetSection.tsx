'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Sparkles, ShoppingBag, Check, Gift } from 'lucide-react';
import { PERFUMES } from '@/lib/perfumes';
import { useCart } from '@/lib/cart-context';

export default function DiscoverySetSection() {
  const { addToCart } = useCart();
  const [selectedVials, setSelectedVials] = useState<string[]>([
    'Printemps',
    'Été',
    'Automne',
    'Hiver',
  ]);
  const [monogram, setMonogram] = useState('Q.P.');
  const [added, setAdded] = useState(false);

  const handleSelectVial = (index: number, seasonName: string) => {
    const updated = [...selectedVials];
    updated[index] = seasonName;
    setSelectedVials(updated);
  };

  const handleAddToCart = () => {
    addToCart({
      id: `discovery-coffret-${selectedVials.join('-')}-${monogram}`,
      type: 'discovery-set',
      title: `Discovery Coffret (4 x 5ml Seasonal Set)`,
      price: 45,
      image: '/assets/aistudio/Coffret_940e861e.jpg',
      vials: selectedVials,
      engraving: monogram,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  };

  return (
    <section className="relative w-full py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Outer Luxury Glass Container */}
      <div className="relative rounded-sm overflow-hidden p-6 sm:p-10 lg:p-12 bg-[#101e16]/85 backdrop-blur-xl border border-[#D4AF37]/35 shadow-2xl">
        {/* Glow backdrop accent */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-[#D4AF37]/20 pb-6 mb-8">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-medium font-mono mb-2">
              L’ATELIER D’ÉCHANTILLONNAGE
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-5xl text-[#F7F4EB] font-normal leading-tight">
              Create Your Discovery Coffret
            </h2>
          </div>
          <div className="text-left sm:text-right">
            <span className="font-mono text-2xl sm:text-3xl text-[#E6C786] font-semibold tabular-nums block">
              €45
            </span>
            <span className="text-[10px] text-[#D4AF37] tracking-widest uppercase font-mono">
              100% Redeemable Voucher
            </span>
          </div>
        </div>

        {/* Featured Showcase: 16:9 Coffret Image */}
        <div className="relative w-full aspect-[16/9] rounded-sm overflow-hidden border border-[#D4AF37]/35 shadow-2xl bg-[#0b1610] mb-10 group">
          <Image
            src="/assets/aistudio/Coffret_940e861e.jpg"
            alt="Quatréa Discovery Coffret Presentation Box"
            fill
            sizes="(max-width: 1280px) 100vw, 1200px"
            className="object-contain w-full h-full transition-transform duration-700 ease-out group-hover:scale-103"
            priority
            referrerPolicy="no-referrer"
          />
          {/* Subtle bottom vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

          <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 z-10 pointer-events-none">
            <span className="text-[10px] sm:text-xs font-mono uppercase tracking-[0.24em] text-[#D4AF37] block">
              QUATRÉA PARIS · EDITION DES SAISONS
            </span>
            <span className="font-editorial text-xl sm:text-2xl text-[#F7F4EB]">
              Le Coffret d’Initiation
            </span>
          </div>
        </div>

        {/* Interactive Customizer Module */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Vial Selection */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <h3 className="font-editorial text-2xl text-[#F7F4EB] mb-1">
                Customize Your 4-Vial Selection
              </h3>
              <p className="text-xs text-[#B8C2B9] leading-relaxed font-light">
                Receive four 5ml miniature crystal flacons nestled in imperial green velvet and
                embossed gold leaf. Choose the classic four-season progression or double your favorite
                seasons.
              </p>
            </div>

            {/* 4 Interactive Vial Slots */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[0, 1, 2, 3].map((slotIdx) => {
                const currentSeasonName = selectedVials[slotIdx] || 'Printemps';
                const perfumeData = PERFUMES.find((p) => p.seasonName === currentSeasonName);

                return (
                  <div
                    key={slotIdx}
                    className="p-3.5 rounded-sm bg-[#0c1611] border border-[#D4AF37]/30 text-center flex flex-col items-center justify-between min-h-[120px] transition-all hover:border-[#D4AF37]"
                  >
                    <div className="text-[10px] font-mono text-[#D4AF37]/80 tracking-wider">
                      Vial #{slotIdx + 1}
                    </div>

                    <div className="my-2">
                      <div className="w-5 h-12 mx-auto rounded-xs bg-gradient-to-t from-[#D4AF37]/50 via-[#E6C786]/25 to-white/40 border border-[#D4AF37]/40 shadow-inner relative">
                        <div className="absolute top-0 inset-x-0 h-2 bg-[#D4AF37]/80 rounded-t-xs" />
                      </div>
                    </div>

                    <select
                      value={currentSeasonName}
                      onChange={(e) => handleSelectVial(slotIdx, e.target.value)}
                      className="w-full text-[11px] font-medium text-center bg-[#13231a] border border-[#D4AF37]/35 rounded-xs text-[#E6C786] py-1 px-1 focus:outline-none"
                    >
                      {PERFUMES.map((p) => (
                        <option key={p.id} value={p.seasonName}>
                          {p.seasonName}
                        </option>
                      ))}
                    </select>
                  </div>
                );
              })}
            </div>

            {/* Custom Gold Monogram Input */}
            <div className="p-4 rounded-sm bg-[#0c1611] border border-[#D4AF37]/25 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#D4AF37] font-mono font-medium">
                  Gold Monogram Embossing (Up to 4 initials)
                </label>
                <p className="text-[11px] text-[#B8C2B9] font-light mt-0.5">
                  Hand-pressed in 24k gold leaf onto the satin interior lining of the box.
                </p>
              </div>

              <input
                type="text"
                maxLength={4}
                value={monogram}
                onChange={(e) => setMonogram(e.target.value.toUpperCase())}
                placeholder="Q.P."
                className="w-24 text-center font-mono tracking-widest text-base py-2 px-3 rounded-xs bg-[#14261d] border border-[#D4AF37]/50 text-[#E6C786] focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>

          {/* Right Column: Pricing & 100% Credit Voucher Guarantee */}
          <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-7 rounded-sm bg-[#0d1812] border border-[#D4AF37]/35 space-y-5">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#D4AF37] font-mono">
                <Gift className="w-4 h-4 text-[#D4AF37]" />
                <span>Le Coffret Découverte</span>
              </div>
              <div className="font-editorial text-2xl text-[#F7F4EB]">
                4 × 5ml Deluxe Atomizers
              </div>
              <p className="text-xs text-[#B8C2B9] leading-relaxed font-light">
                Includes approx. 180 fine sprays, gold-crested scent testing strips, and an embossed
                presentation card.
              </p>
            </div>

            {/* 100% Credit Guarantee */}
            <div className="p-4 rounded-sm bg-[#162a1f] border border-[#D4AF37]/40 flex items-start gap-3">
              <Sparkles className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
              <div className="text-xs text-[#F7F4EB] leading-relaxed">
                <strong className="text-[#E6C786] font-medium block mb-0.5">
                  100% Full Voucher Credit
                </strong>
                The full €45 purchase is automatically returned to you as an exclusive voucher
                redeemable against any 100ml flacon.
              </div>
            </div>

            <ul className="text-xs text-[#B8C2B9] space-y-2">
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Complimentary white-glove shipping from Paris</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Custom gold monogram included at no additional cost</span>
              </li>
            </ul>

            <button
              onClick={handleAddToCart}
              type="button"
              className="w-full py-3.5 px-6 rounded-sm bg-[#1b3527] hover:bg-[#234533] border border-[#D4AF37] text-xs uppercase tracking-[0.2em] font-medium text-[#F7F4EB] hover:text-[#E6C786] transition-all flex items-center justify-center gap-2 shadow-xl hover:shadow-[0_0_25px_rgba(212,175,55,0.3)]"
            >
              {added ? (
                <>
                  <Check className="w-4 h-4 text-[#D4AF37]" />
                  <span>Coffret Added to Bag</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
                  <span>Order Custom Coffret · €45</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
