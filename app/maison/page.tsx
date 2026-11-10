import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { ArrowRight, Sparkles, MapPin, Feather } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Héritage & Savoir-Faire | Quatréa Paris',
  description:
    'Since 1892, our Parisian atelier captures the cyclical poetry of nature from 28 Place Vendôme to our Grasse sanctuaries.',
};

export default function MaisonPage() {
  return (
    <div className="relative w-full pt-28 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Editorial Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-medium font-mono mb-2">
          HÉRITAGE & SAVOIR-FAIRE
        </div>
        <h1 className="font-editorial text-4xl sm:text-5xl lg:text-6xl text-[#F7F4EB] font-normal tracking-[0.02em] mb-4">
          La Maison Quatréa
        </h1>
        <p className="text-xs sm:text-sm text-[#B8C2B9] leading-relaxed font-light text-balance">
          Since 1892, our Parisian atelier has rejected the fleeting ephemera of mass fragrances in
          favor of nature’s eternal cyclical rhythm: the four seasons.
        </p>
      </div>

      {/* Hero Visual: Brand Logo Showcase & Botanical Crest */}
      <div className="relative rounded-sm overflow-hidden p-8 sm:p-14 bg-[#112017]/90 border border-[#D4AF37]/35 shadow-2xl backdrop-blur-xl mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Logo Frame */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-72 sm:w-80 aspect-square rounded-sm overflow-hidden border border-[#D4AF37]/50 shadow-2xl bg-[#15261D] p-2">
              <Image
                src="/assets/aistudio/Logo_c398749a.jpg"
                alt="Quatréa Gold Royal Botanical Crest"
                fill
                className="object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 border border-[#D4AF37]/30 pointer-events-none m-2" />
            </div>
          </div>

          {/* Heritage Story */}
          <div className="lg:col-span-7 space-y-5">
            <div className="text-xs uppercase tracking-[0.24em] text-[#D4AF37] font-mono">
              28 PLACE VENDÔME · PARIS
            </div>
            <h2 className="font-editorial text-3xl sm:text-4xl text-[#F7F4EB] font-normal leading-tight">
              An Architectural Crest Born from Nature’s Crown
            </h2>
            <p className="text-xs sm:text-sm text-[#B8C2B9] leading-relaxed font-light">
              The Quatréa royal crest encapsulates the cardinal harmony of the four seasons: four
              entwined botanical laurels representing Spring cherry blossoms, Summer neroli, Autumn oak
              foliage, and Winter fir needles, crowned by the French royal coronet of artisanal mastery.
            </p>
            <p className="text-xs sm:text-sm text-[#B8C2B9] leading-relaxed font-light">
              Crafted in deep imperial forest green (#15261D) and gold leaf, the crest has adorned every
              flacon dispatched from our salons since the Belle Époque.
            </p>

            <div className="pt-2 flex items-center gap-4 text-xs font-mono text-[#D4AF37]">
              <span>Grasse Botanical Terroir</span>
              <span>·</span>
              <span>French Lead-Free Crystal</span>
              <span>·</span>
              <span>Numbered Batches</span>
            </div>
          </div>
        </div>
      </div>

      {/* Pillars of Savoir-Faire */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
        {/* Pillar 1 */}
        <div className="p-8 rounded-sm bg-[#0e1b14]/85 border border-[#D4AF37]/25 space-y-4">
          <div className="w-10 h-10 rounded-full bg-[#162c20] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
            <MapPin className="w-4 h-4" />
          </div>
          <h3 className="font-editorial text-2xl text-[#F7F4EB]">
            Sanctuaries in Grasse
          </h3>
          <p className="text-xs text-[#B8C2B9] leading-relaxed font-light">
            Our private botanical estates in the hills of Grasse benefit from microclimatic sun and
            maritime winds. We harvest each flower exclusively by hand at first light, when the
            essential oil concentration reaches its absolute zenith.
          </p>
        </div>

        {/* Pillar 2 */}
        <div className="p-8 rounded-sm bg-[#0e1b14]/85 border border-[#D4AF37]/25 space-y-4">
          <div className="w-10 h-10 rounded-full bg-[#162c20] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
            <Sparkles className="w-4 h-4" />
          </div>
          <h3 className="font-editorial text-2xl text-[#F7F4EB]">
            Embossed Crystal Flacons
          </h3>
          <p className="text-xs text-[#B8C2B9] leading-relaxed font-light">
            Each flacon is cast from heavy-gauge, optical-clarity lead-free French crystal. The
            intricate botanical relief is hand-chiseled by master glassblowers in the Bresle Valley,
            finished with a solid brushed champagne brass collar.
          </p>
        </div>

        {/* Pillar 3 */}
        <div className="p-8 rounded-sm bg-[#0e1b14]/85 border border-[#D4AF37]/25 space-y-4">
          <div className="w-10 h-10 rounded-full bg-[#162c20] border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37]">
            <Feather className="w-4 h-4" />
          </div>
          <h3 className="font-editorial text-2xl text-[#F7F4EB]">
            Slow Maceration
          </h3>
          <p className="text-xs text-[#B8C2B9] leading-relaxed font-light">
            While commercial perfumery rushes maturation, Quatréa cold-macerates its extracts for six
            months in dark subterranean cellars in Paris. This patient aging allows base resins and
            volatile florals to fuse into a seamless sensory silk.
          </p>
        </div>
      </div>

      {/* Historical Chronology */}
      <div className="p-8 sm:p-12 rounded-sm bg-[#0e1b14]/90 border border-[#D4AF37]/30 mb-20">
        <div className="text-center max-w-xl mx-auto mb-10">
          <div className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-mono">
            CHRONOLOGIE
          </div>
          <h2 className="font-editorial text-3xl text-[#F7F4EB]">
            Milestones of La Maison
          </h2>
        </div>

        <div className="space-y-6 max-w-3xl mx-auto text-xs text-[#B8C2B9]">
          <div className="flex items-start gap-4 pb-4 border-b border-[#D4AF37]/15">
            <span className="font-mono text-sm text-[#E6C786] font-semibold w-16 shrink-0">1892</span>
            <div>
              <strong className="text-[#F7F4EB] block mb-0.5">Foundation at 28 Place Vendôme</strong>
              Master Alchemist Henri Vasseur opens his first private boutique, formulating tailored
              scents for French nobility.
            </div>
          </div>

          <div className="flex items-start gap-4 pb-4 border-b border-[#D4AF37]/15">
            <span className="font-mono text-sm text-[#E6C786] font-semibold w-16 shrink-0">1924</span>
            <div>
              <strong className="text-[#F7F4EB] block mb-0.5">The Four Seasons Concept Is Born</strong>
              Henri inaugurates the principle that a person does not have one perfume, but four: one
              harmonized with each solstice and equinox.
            </div>
          </div>

          <div className="flex items-start gap-4 pb-4 border-b border-[#D4AF37]/15">
            <span className="font-mono text-sm text-[#E6C786] font-semibold w-16 shrink-0">1968</span>
            <div>
              <strong className="text-[#F7F4EB] block mb-0.5">The Grasse Botanical Sanctuary</strong>
              The house purchases the historic Domaine de la Palmeraie in Grasse, guaranteeing permanent
              terroir protection for rare jasmine and neroli cultivars.
            </div>
          </div>

          <div className="flex items-start gap-4">
            <span className="font-mono text-sm text-[#E6C786] font-semibold w-16 shrink-0">Today</span>
            <div>
              <strong className="text-[#F7F4EB] block mb-0.5">The Contemporary Renaissance</strong>
              Under Master Perfumer Éléonore Vasseur, the four signature formulations are elevated
              with sustainable eco-extraction while preserving traditional French artisanal craftsmanship.
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA to Explore */}
      <div className="text-center space-y-4">
        <h3 className="font-editorial text-3xl text-[#F7F4EB]">
          Experience the Seasonal Collection
        </h3>
        <p className="text-xs text-[#B8C2B9] max-w-md mx-auto">
          Begin your journey through the four olfactory chapters or explore our bespoke sample atelier.
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-2">
          <Link
            href="/catalog"
            className="px-6 py-3 rounded-sm bg-[#1b3527] hover:bg-[#234533] border border-[#D4AF37] text-xs uppercase tracking-widest text-[#F7F4EB] hover:text-[#E6C786] transition-all"
          >
            Explore Perfume Catalog
          </Link>
          <Link
            href="/discovery-set"
            className="px-6 py-3 rounded-sm border border-[#D4AF37]/40 hover:border-[#D4AF37] text-xs uppercase tracking-widest text-[#B8C2B9] hover:text-[#F7F4EB] transition-colors"
          >
            Build Discovery Box (€45)
          </Link>
        </div>
      </div>
    </div>
  );
}
