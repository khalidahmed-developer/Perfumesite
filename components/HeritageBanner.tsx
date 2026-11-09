'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function HeritageBanner() {
  return (
    <section className="relative w-full py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto my-12">
      <div className="relative rounded-sm overflow-hidden p-8 sm:p-14 bg-[#0e1b14]/90 border border-[#D4AF37]/30 shadow-2xl backdrop-blur-xl">
        {/* Delicate gold crest seal in corner */}
        <div className="absolute top-8 right-8 opacity-25 pointer-events-none w-24 h-24 hidden sm:block">
          <Image
            src="/assets/aistudio/LogoIcon_header.png"
            alt="Quatréa Royal Crest"
            width={96}
            height={96}
            className="w-24 h-24 object-contain filter drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="max-w-3xl space-y-6">
          <div className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-medium font-mono">
            LA PHILOSOPHIE DE LA MAISON
          </div>

          <blockquote className="font-editorial italic text-2xl sm:text-3xl md:text-4xl text-[#F7F4EB] font-light leading-snug">
            “Nature does not whisper its secrets to those who rush. The seasons are patient architects;
            our art is merely to preserve their fleeting breath in French crystal and gold.”
          </blockquote>

          <div className="text-xs text-[#B8C2B9] leading-relaxed max-w-xl font-light">
            Founded in 1892 along the historic ateliers of Place Vendôme, Quatréa maintains its own
            exclusive micro-harvest plots in Grasse, Provence, capturing the olfactory signature of
            each solstice and equinox.
          </div>

          <div className="pt-2 flex items-center gap-6">
            <div>
              <div className="font-serif text-sm text-[#E6C786] tracking-wider uppercase font-medium">
                Éléonore Vasseur
              </div>
              <div className="text-[10px] text-[#B8C2B9] font-mono tracking-widest uppercase">
                Master Perfumer · Quatréa Paris
              </div>
            </div>

            <span className="text-[#D4AF37]/40">·</span>

            <Link
              href="/maison"
              className="inline-flex items-center gap-1.5 text-xs uppercase tracking-[0.2em] text-[#E6C786] hover:text-[#F7F4EB] transition-colors"
            >
              <span>Explore The Craft</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#D4AF37]" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
