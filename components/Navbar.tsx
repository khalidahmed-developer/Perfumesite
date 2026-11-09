'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Volume2, VolumeX, ShoppingBag, Menu, X, ChevronDown, Sparkles } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { PERFUMES } from '@/lib/perfumes';

export default function Navbar() {
  const pathname = usePathname();
  const { totalItems, setIsCartOpen, isSoundActive, toggleSound } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCatalogMenuOpen, setIsCatalogMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 h-16 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#15261d]/85 backdrop-blur-md border-b border-[#D4AF37]/20 shadow-lg'
            : 'bg-[#15261d]/60 backdrop-blur-sm border-b border-[#D4AF37]/10'
        }`}
      >
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Identity */}
          <Link
            href="/"
            className="flex items-center gap-2.5 shrink-0 group focus:outline-none focus-visible:ring-1 focus-visible:ring-[#D4AF37]"
          >
            <div className="relative w-8 h-8 flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/assets/aistudio/LogoIcon_header.png"
                alt="Quatréa Paris Royal Botanical Crest"
                width={32}
                height={32}
                className="w-8 h-8 object-contain drop-shadow-[0_2px_10px_rgba(212,175,55,0.4)]"
                priority
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="font-editorial text-xl sm:text-2xl tracking-[0.18em] uppercase text-[#F7F4EB] font-normal group-hover:text-[#E6C786] transition-colors whitespace-nowrap">
              Quatréa <span className="text-[11px] font-mono tracking-[0.24em] text-[#D4AF37] font-light ml-1 opacity-90">PARIS</span>
            </span>
          </Link>

          {/* Zone 2: Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-[0.18em] font-medium text-[#B8C2B9]">
            <Link
              href="/"
              className={`hover:text-[#F7F4EB] transition-colors relative py-1 whitespace-nowrap ${
                pathname === '/' ? 'text-[#E6C786] font-semibold' : ''
              }`}
            >
              La Maison
              {pathname === '/' && (
                <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#D4AF37]" />
              )}
            </Link>

            {/* Catalog with Dropdown */}
            <div
              className="relative py-1"
              onMouseEnter={() => setIsCatalogMenuOpen(true)}
              onMouseLeave={() => setIsCatalogMenuOpen(false)}
            >
              <Link
                href="/catalog"
                className={`flex items-center gap-1 hover:text-[#F7F4EB] transition-colors whitespace-nowrap ${
                  pathname.startsWith('/catalog') || pathname.startsWith('/perfume')
                    ? 'text-[#E6C786] font-semibold'
                    : ''
                }`}
              >
                Perfume Catalog
                <ChevronDown className="w-3 h-3 text-[#D4AF37] opacity-75" />
              </Link>

              {/* Dropdown Menu */}
              {isCatalogMenuOpen && (
                <div className="absolute top-full left-0 mt-2 w-72 p-3 bg-[#13221a]/95 backdrop-blur-xl border border-[#D4AF37]/30 shadow-2xl rounded-sm">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-[#D4AF37]/80 mb-2 px-2 pb-1 border-b border-[#D4AF37]/15">
                    Les 4 Saisons Eau de Parfum
                  </div>
                  <div className="space-y-1">
                    {PERFUMES.map((perfume) => (
                      <Link
                        key={perfume.id}
                        href={`/perfume/${perfume.id}`}
                        onClick={() => setIsCatalogMenuOpen(false)}
                        className="flex items-center justify-between p-2 rounded hover:bg-[#1a3325] transition-colors group"
                      >
                        <div>
                          <div className="text-xs text-[#F7F4EB] font-serif group-hover:text-[#E6C786]">
                            {perfume.seasonName}
                          </div>
                          <div className="text-[10px] text-[#B8C2B9] truncate max-w-[170px]">
                            {perfume.tagline}
                          </div>
                        </div>
                        <span className="text-[11px] text-[#D4AF37] font-mono tabular-nums">
                          €{perfume.price100ml}
                        </span>
                      </Link>
                    ))}
                  </div>

                  <div className="mt-2 pt-2 border-t border-[#D4AF37]/15">
                    <Link
                      href="/catalog"
                      onClick={() => setIsCatalogMenuOpen(false)}
                      className="block text-center py-1.5 text-[10px] tracking-[0.16em] uppercase text-[#E6C786] hover:text-[#F7F4EB] transition-colors"
                    >
                      View All Fragrances & Coffrets →
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/maison"
              className={`hover:text-[#F7F4EB] transition-colors relative py-1 whitespace-nowrap ${
                pathname === '/maison' ? 'text-[#E6C786] font-semibold' : ''
              }`}
            >
              L’Art des Saisons
              {pathname === '/maison' && (
                <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#D4AF37]" />
              )}
            </Link>

            <Link
              href="/discovery-set"
              className={`hover:text-[#F7F4EB] transition-colors relative py-1 whitespace-nowrap ${
                pathname === '/discovery-set' ? 'text-[#E6C786] font-semibold' : ''
              }`}
            >
              Discovery Set
              {pathname === '/discovery-set' && (
                <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#D4AF37]" />
              )}
            </Link>
          </nav>

          {/* Zone 3: Utility Actions */}
          <div className="flex items-center gap-4 shrink-0">
            {/* Ambient Soundscape Toggle */}
            <button
              onClick={toggleSound}
              type="button"
              className="group flex items-center gap-2 px-2.5 py-1.5 rounded border border-[#D4AF37]/25 hover:border-[#D4AF37] bg-[#101c15]/50 transition-colors text-xs text-[#B8C2B9] hover:text-[#F7F4EB]"
              title={isSoundActive ? 'Mute ambient soundscape' : 'Play ambient luxury soundscape'}
              aria-label="Toggle ambient luxury sound"
            >
              {isSoundActive ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-[#E6C786] animate-pulse" />
                  <span className="hidden lg:inline text-[10px] tracking-wider uppercase text-[#E6C786]">
                    Sound On
                  </span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-[#B8C2B9] group-hover:text-[#F7F4EB]" />
                  <span className="hidden lg:inline text-[10px] tracking-wider uppercase">
                    Ambient
                  </span>
                </>
              )}
            </button>

            {/* Shopping Bag Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              type="button"
              className="flex items-center gap-2 px-3 py-1.5 rounded bg-[#182e22] hover:bg-[#1f3b2c] border border-[#D4AF37]/35 hover:border-[#D4AF37] transition-all text-xs tracking-wider uppercase text-[#F7F4EB] shadow-sm"
              aria-label="View shopping bag"
            >
              <ShoppingBag className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="font-medium">Bag</span>
              <span className="text-[#D4AF37] font-mono tabular-nums">({totalItems})</span>
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              type="button"
              className="md:hidden p-1.5 text-[#F7F4EB] hover:text-[#D4AF37] transition-colors"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-30 pt-16 bg-[#101c15]/95 backdrop-blur-2xl md:hidden flex flex-col p-6 animate-fade-in">
          <nav className="flex flex-col space-y-5 text-sm uppercase tracking-[0.2em] font-medium text-[#B8C2B9] mt-6">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-2 border-b border-[#D4AF37]/15 text-[#F7F4EB] hover:text-[#E6C786]"
            >
              La Maison (Home)
            </Link>
            <Link
              href="/catalog"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-2 border-b border-[#D4AF37]/15 text-[#F7F4EB] hover:text-[#E6C786]"
            >
              Perfume Catalog (All 4 Seasons)
            </Link>
            <Link
              href="/maison"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-2 border-b border-[#D4AF37]/15 text-[#F7F4EB] hover:text-[#E6C786]"
            >
              L’Art des Saisons (Heritage & Grasse)
            </Link>
            <Link
              href="/discovery-set"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-2 border-b border-[#D4AF37]/15 text-[#F7F4EB] hover:text-[#E6C786]"
            >
              Discovery Set Builder
            </Link>
          </nav>

          <div className="mt-auto pb-8 pt-4 border-t border-[#D4AF37]/20 flex flex-col gap-4 text-xs text-[#B8C2B9]">
            <div className="flex items-center justify-between">
              <span>Haute Parfumerie Paris</span>
              <span className="text-[#D4AF37]">Place Vendôme</span>
            </div>
            <button
              onClick={() => {
                toggleSound();
                setIsMobileMenuOpen(false);
              }}
              className="w-full py-2.5 px-4 rounded border border-[#D4AF37]/30 text-center text-[#E6C786] text-xs uppercase tracking-widest"
            >
              {isSoundActive ? 'Mute Ambient Audio' : 'Enable Ambient Sound'}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
