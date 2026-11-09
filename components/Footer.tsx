'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail, Check, ArrowRight, ShieldCheck } from 'lucide-react';
import { PERFUMES } from '@/lib/perfumes';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
    }, 3000);
  };

  return (
    <footer className="relative w-full bg-[#0a140f] border-t border-[#D4AF37]/25 text-[#F7F4EB] pt-16 pb-12 px-4 sm:px-6 lg:px-8 mt-24">
      <div className="max-w-7xl mx-auto">
        {/* Top Tier: Brand Seal & Newsletter */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-14 border-b border-[#D4AF37]/15">
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 flex items-center justify-center">
                <Image
                  src="/assets/aistudio/LogoIcon_header.png"
                  alt="Quatréa Paris"
                  width={40}
                  height={40}
                  className="w-10 h-10 object-contain drop-shadow-[0_2px_10px_rgba(212,175,55,0.4)]"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <span className="font-editorial text-2xl tracking-[0.16em] uppercase text-[#F7F4EB] block leading-none">
                  Quatréa
                </span>
                <span className="text-[10px] tracking-[0.24em] uppercase text-[#D4AF37] block mt-1">
                  La Maison des Saisons · Paris 1892
                </span>
              </div>
            </div>

            <p className="text-xs text-[#B8C2B9] leading-relaxed max-w-sm font-light">
              Crafting haute parfumerie through the cyclical poetry of nature. Four eternal essences
              bottled in hand-embossed French crystal flacons.
            </p>

            <div className="text-xs text-[#B8C2B9] space-y-1 font-mono pt-2">
              <div className="text-[#E6C786]">Boutique & Salons Privés:</div>
              <div>28 Place Vendôme, 75001 Paris, France</div>
              <div>+33 1 42 68 89 00 · concierge@quatrea-parfums.fr</div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-3 grid grid-cols-2 gap-6 text-xs uppercase tracking-[0.16em]">
            <div className="space-y-3">
              <div className="text-[11px] font-mono text-[#D4AF37]">Les Parfums</div>
              <ul className="space-y-2 text-[#B8C2B9]">
                {PERFUMES.map((perfume) => (
                  <li key={perfume.id}>
                    <Link
                      href={`/perfume/${perfume.id}`}
                      className="hover:text-[#E6C786] transition-colors"
                    >
                      {perfume.seasonName}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3">
              <div className="text-[11px] font-mono text-[#D4AF37]">Maison</div>
              <ul className="space-y-2 text-[#B8C2B9]">
                <li>
                  <Link href="/catalog" className="hover:text-[#E6C786] transition-colors">
                    Catalog
                  </Link>
                </li>
                <li>
                  <Link href="/maison" className="hover:text-[#E6C786] transition-colors">
                    Heritage
                  </Link>
                </li>
                <li>
                  <Link href="/discovery-set" className="hover:text-[#E6C786] transition-colors">
                    Discovery Set
                  </Link>
                </li>
                <li>
                  <Link href="/catalog#coffret" className="hover:text-[#E6C786] transition-colors">
                    Collector Vault
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Inscription to Gazette */}
          <div className="lg:col-span-4 space-y-3">
            <div className="text-[11px] font-mono uppercase tracking-[0.2em] text-[#D4AF37]">
              La Gazette des Saisons
            </div>
            <p className="text-xs text-[#B8C2B9] leading-relaxed font-light">
              Receive confidential invitations to harvest solstices, master perfumer reserves, and
              private Place Vendôme olfactory salons.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  required
                  className="w-full text-xs px-3.5 py-2.5 rounded-l-sm bg-[#111e17] border border-[#D4AF37]/35 text-[#F7F4EB] placeholder-[#B8C2B9]/50 focus:outline-none focus:border-[#D4AF37]"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-r-sm bg-[#1a3325] hover:bg-[#224431] border-y border-r border-[#D4AF37] text-xs uppercase tracking-widest text-[#E6C786] hover:text-[#F7F4EB] transition-colors flex items-center justify-center shrink-0"
                >
                  {subscribed ? <Check className="w-4 h-4 text-[#D4AF37]" /> : <ArrowRight className="w-4 h-4" />}
                </button>
              </div>
              {subscribed && (
                <div className="text-[11px] text-[#E6C786] italic">
                  Merci. You have been registered to our private seasonal registry.
                </div>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Tier */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#B8C2B9]/70 font-mono">
          <div>
            © {new Date().getFullYear()} Quatréa Haute Parfumerie Paris. Tous droits réservés.
          </div>
          <div className="flex items-center gap-6 text-[11px]">
            <span>Place Vendôme · Paris</span>
            <span>·</span>
            <span>Grasse Botanical Sanctuaries</span>
            <span>·</span>
            <span>Cruelty-Free & Natural Terroir</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
