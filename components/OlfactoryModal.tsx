'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { X, Layers, Sparkles, MapPin, Check, ShoppingBag } from 'lucide-react';
import { useCart } from '@/lib/cart-context';

export default function OlfactoryModal() {
  const { activeModalPerfume, setActiveModalPerfume, addToCart } = useCart();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveModalPerfume(null);
    };
    if (activeModalPerfume) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [activeModalPerfume, setActiveModalPerfume]);

  if (!activeModalPerfume) return null;

  const handleAdd = () => {
    addToCart({
      id: `${activeModalPerfume.id}-100ml`,
      type: 'bottle',
      title: `${activeModalPerfume.seasonName} — Eau de Parfum`,
      seasonId: activeModalPerfume.id,
      size: '100ml',
      price: activeModalPerfume.price100ml,
      image: activeModalPerfume.image,
    });
    setActiveModalPerfume(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 animate-fade-in">
      {/* Dark backdrop with blur */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-md"
        onClick={() => setActiveModalPerfume(null)}
      />

      {/* Modal Dialog Box */}
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-sm bg-[#122219] border border-[#D4AF37]/45 shadow-[0_25px_70px_rgba(0,0,0,0.85)] z-10 text-[#F7F4EB] p-6 sm:p-8">
        {/* Close Button */}
        <button
          onClick={() => setActiveModalPerfume(null)}
          type="button"
          className="absolute top-4 right-4 p-2 rounded-full bg-[#182f22] hover:bg-[#20402e] border border-[#D4AF37]/30 text-[#B8C2B9] hover:text-[#F7F4EB] transition-colors"
          aria-label="Close olfactory modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Visual Column */}
          <div className="md:col-span-5 relative">
            <div className="relative aspect-[16/9] rounded-sm overflow-hidden border border-[#D4AF37]/30 shadow-xl bg-[#0c1611]">
              <Image
                src={activeModalPerfume.image}
                alt={activeModalPerfume.seasonName}
                fill
                className="object-contain w-full h-full"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-3 left-3 text-[10px] font-mono tracking-widest uppercase text-[#D4AF37]">
                {activeModalPerfume.seasonEn.toUpperCase()} ESSENCE
              </div>
            </div>

            <div className="mt-4 p-3 rounded-sm bg-[#0a1510] border border-[#D4AF37]/20 text-xs">
              <div className="text-[10px] uppercase tracking-wider text-[#D4AF37] mb-1 font-mono">
                Flacon Specs
              </div>
              <p className="text-[11px] text-[#B8C2B9] leading-relaxed">
                {activeModalPerfume.bottleDetails}
              </p>
            </div>
          </div>

          {/* Details Column */}
          <div className="md:col-span-7 flex flex-col justify-between">
            <div>
              <div className="text-xs uppercase tracking-[0.24em] text-[#D4AF37] font-medium mb-1">
                Quatréa Paris · Haute Parfumerie
              </div>
              <h3 className="font-editorial text-3xl sm:text-4xl text-[#F7F4EB] mb-2 font-normal">
                {activeModalPerfume.seasonName}
              </h3>
              <p className="font-editorial italic text-base text-[#E6C786] mb-4">
                “{activeModalPerfume.headline}”
              </p>
              <p className="text-xs sm:text-sm text-[#B8C2B9] leading-relaxed mb-6 font-light">
                {activeModalPerfume.description}
              </p>

              {/* Olfactory Pyramid Breakdown */}
              <div className="space-y-3 mb-6 bg-[#0a1510]/80 p-4 rounded-sm border border-[#D4AF37]/25">
                <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#D4AF37] font-mono">
                  <Layers className="w-3.5 h-3.5" />
                  <span>The Olfactory Pyramid</span>
                </div>

                <div className="space-y-2 text-xs pt-1">
                  <div className="flex items-start gap-2">
                    <span className="w-16 text-[10px] uppercase tracking-wider text-[#D4AF37]/75 font-mono shrink-0 pt-0.5">
                      Top
                    </span>
                    <span className="text-[#F7F4EB] font-medium">
                      {activeModalPerfume.pyramid.top.join(' · ')}
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-16 text-[10px] uppercase tracking-wider text-[#D4AF37]/75 font-mono shrink-0 pt-0.5">
                      Heart
                    </span>
                    <span className="text-[#F7F4EB] font-medium">
                      {activeModalPerfume.pyramid.heart.join(' · ')}
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-16 text-[10px] uppercase tracking-wider text-[#D4AF37]/75 font-mono shrink-0 pt-0.5">
                      Base
                    </span>
                    <span className="text-[#F7F4EB] font-medium">
                      {activeModalPerfume.pyramid.base.join(' · ')}
                    </span>
                  </div>
                </div>
              </div>

              {/* Provenance */}
              <div className="mb-6">
                <div className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-mono mb-2 flex items-center gap-1.5">
                  <MapPin className="w-3 h-3 text-[#D4AF37]" />
                  <span>Harvest & Provenance</span>
                </div>
                <ul className="text-xs text-[#B8C2B9] space-y-1 list-disc list-inside">
                  {activeModalPerfume.provenance.map((item, idx) => (
                    <li key={idx} className="leading-relaxed">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center justify-between gap-4 pt-4 border-t border-[#D4AF37]/20">
              <div>
                <div className="text-xl font-mono text-[#E6C786] font-semibold tabular-nums">
                  €{activeModalPerfume.price100ml}
                </div>
                <div className="text-[10px] text-[#B8C2B9] uppercase tracking-wider">
                  100ml Eau de Parfum
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleAdd}
                  type="button"
                  className="py-2.5 px-6 rounded-sm bg-[#1b3527] hover:bg-[#234533] border border-[#D4AF37] text-xs uppercase tracking-[0.18em] font-medium text-[#F7F4EB] hover:text-[#E6C786] transition-all flex items-center gap-2 shadow-md"
                >
                  <ShoppingBag className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span>Add to Bag</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
