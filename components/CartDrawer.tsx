'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, Trash2, Plus, Minus, ShoppingBag, Gift, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { PERFUMES } from '@/lib/perfumes';

export default function CartDrawer() {
  const {
    items,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    subtotal,
    isCartOpen,
    setIsCartOpen,
    selectedSamples,
    toggleSample,
  } = useCart();

  const [isGiftWrap, setIsGiftWrap] = useState(true);
  const [giftNote, setGiftNote] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCartOpen) setIsCartOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCartOpen, setIsCartOpen]);

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCheckingOut(true);
    setTimeout(() => {
      const orderNum = `QT-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderConfirmed(orderNum);
      setIsCheckingOut(false);
      clearCart();
    }, 1800);
  };

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fade-in">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Slide-over panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
        <div className="w-screen max-w-md bg-[#111e17] border-l border-[#D4AF37]/30 shadow-2xl flex flex-col text-[#F7F4EB]">
          {/* Header */}
          <div className="p-6 border-b border-[#D4AF37]/20 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
              <h2 className="font-editorial text-2xl tracking-wide uppercase text-[#F7F4EB]">
                Your Maison Bag
              </h2>
              <span className="text-xs text-[#D4AF37] font-mono tabular-nums">({totalItems})</span>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-full hover:bg-[#1a3024] text-[#B8C2B9] hover:text-[#F7F4EB] transition-colors"
              aria-label="Close bag drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {orderConfirmed ? (
              <div className="py-12 text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-[#D4AF37] mx-auto animate-bounce" />
                <h3 className="font-editorial text-2xl text-[#F7F4EB]">
                  Merci Beaucoup
                </h3>
                <p className="text-xs text-[#B8C2B9] leading-relaxed max-w-xs mx-auto">
                  Your luxury order <span className="font-mono text-[#E6C786]">{orderConfirmed}</span> has
                  been prepared at 28 Place Vendôme, Paris. A tracking dispatch notice has been dispatched.
                </p>
                <button
                  onClick={() => {
                    setOrderConfirmed(null);
                    setIsCartOpen(false);
                  }}
                  className="mt-4 px-6 py-2.5 rounded-sm bg-[#1b3527] border border-[#D4AF37] text-xs uppercase tracking-widest text-[#F7F4EB] hover:text-[#E6C786]"
                >
                  Return to Maison
                </button>
              </div>
            ) : items.length === 0 ? (
              <div className="py-20 text-center space-y-3">
                <ShoppingBag className="w-10 h-10 text-[#D4AF37]/40 mx-auto" />
                <div className="font-editorial text-xl text-[#F7F4EB]">Your Bag is Empty</div>
                <p className="text-xs text-[#B8C2B9] max-w-xs mx-auto">
                  Explore our four signature seasonal essences and discover your personal signature scent.
                </p>
              </div>
            ) : (
              <>
                {/* Item List */}
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-4 p-3 rounded-sm bg-[#0c1611]/80 border border-[#D4AF37]/20"
                    >
                      <div className="relative w-16 h-20 rounded-xs overflow-hidden shrink-0 border border-[#D4AF37]/20 bg-[#070e0a]">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      <div className="flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="font-serif text-sm text-[#F7F4EB] font-medium leading-tight">
                              {item.title}
                            </h4>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-[#B8C2B9] hover:text-rose-400 p-0.5 transition-colors"
                              title="Remove item"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                          {item.size && (
                            <div className="text-[11px] text-[#D4AF37] font-mono mt-0.5">
                              {item.size} Flacon
                            </div>
                          )}
                          {item.engraving && (
                            <div className="text-[10px] text-[#B8C2B9] italic">
                              Initials: “{item.engraving}”
                            </div>
                          )}
                        </div>

                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#D4AF37]/10">
                          {/* Stepper */}
                          <div className="flex items-center rounded bg-[#15281e] border border-[#D4AF37]/25 text-xs">
                            <button
                              onClick={() => updateQuantity(item.id, -1)}
                              className="px-2 py-0.5 hover:text-[#D4AF37]"
                              aria-label="Decrease quantity"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="px-2 font-mono tabular-nums text-xs">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, 1)}
                              className="px-2 py-0.5 hover:text-[#D4AF37]"
                              aria-label="Increase quantity"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>

                          <div className="font-mono text-sm text-[#E6C786] tabular-nums font-semibold">
                            €{item.price * item.quantity}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Complimentary Samples Selection (2 max) */}
                <div className="p-4 rounded-sm bg-[#0c1611]/80 border border-[#D4AF37]/20 space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="uppercase tracking-widest text-[#D4AF37] font-mono text-[10px]">
                      Complimentary Samples
                    </span>
                    <span className="text-[10px] text-[#B8C2B9]">
                      Choose 2 vials ({selectedSamples.length}/2 selected)
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs pt-1">
                    {PERFUMES.map((perfume) => {
                      const sampleLabel = `${perfume.seasonName} (2ml)`;
                      const isSelected = selectedSamples.includes(sampleLabel);
                      return (
                        <button
                          key={perfume.id}
                          type="button"
                          onClick={() => toggleSample(sampleLabel)}
                          className={`p-2 rounded-xs border text-left transition-colors flex items-center justify-between ${
                            isSelected
                              ? 'border-[#D4AF37] bg-[#1a3325] text-[#E6C786]'
                              : 'border-[#D4AF37]/20 bg-[#0e1b14] text-[#B8C2B9] hover:text-[#F7F4EB]'
                          }`}
                        >
                          <span className="truncate text-[11px]">{sampleLabel}</span>
                          {isSelected && <span className="text-[#D4AF37] text-xs">✓</span>}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Complimentary Parisian Gift Wrapping */}
                <div className="p-4 rounded-sm bg-[#0c1611]/80 border border-[#D4AF37]/20 space-y-3">
                  <label className="flex items-center gap-2 cursor-pointer text-xs">
                    <input
                      type="checkbox"
                      checked={isGiftWrap}
                      onChange={(e) => setIsGiftWrap(e.target.checked)}
                      className="accent-[#D4AF37] rounded"
                    />
                    <div className="flex items-center gap-1.5 text-[#F7F4EB]">
                      <Gift className="w-3.5 h-3.5 text-[#D4AF37]" />
                      <span>Complimentary Forest Green & Gold Silk Gift Wrap</span>
                    </div>
                  </label>

                  {isGiftWrap && (
                    <input
                      type="text"
                      placeholder="Optional handwritten note on embossed card..."
                      value={giftNote}
                      onChange={(e) => setGiftNote(e.target.value)}
                      maxLength={120}
                      className="w-full text-xs px-3 py-2 rounded-xs bg-[#132219] border border-[#D4AF37]/30 text-[#F7F4EB] placeholder-[#B8C2B9]/50 focus:outline-none focus:border-[#D4AF37]"
                    />
                  )}
                </div>
              </>
            )}
          </div>

          {/* Footer & Checkout */}
          {!orderConfirmed && items.length > 0 && (
            <div className="p-6 border-t border-[#D4AF37]/20 bg-[#0d1712] space-y-4">
              <div className="space-y-1.5 text-xs text-[#B8C2B9]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono text-[#F7F4EB] tabular-nums">€{subtotal}</span>
                </div>
                <div className="flex justify-between">
                  <span>Paris White-Glove Shipping</span>
                  <span className="text-[#D4AF37] uppercase tracking-wider font-mono text-[10px]">
                    Complimentary
                  </span>
                </div>
                <div className="flex justify-between text-sm text-[#F7F4EB] font-semibold pt-2 border-t border-[#D4AF37]/15">
                  <span className="font-serif">Total (VAT incl.)</span>
                  <span className="font-mono text-base text-[#E6C786] tabular-nums">€{subtotal}</span>
                </div>
              </div>

              <form onSubmit={handleCheckoutSubmit}>
                <button
                  type="submit"
                  disabled={isCheckingOut}
                  className="w-full py-3 px-6 rounded-sm bg-[#1b3527] hover:bg-[#234533] border border-[#D4AF37] text-xs uppercase tracking-[0.2em] font-medium text-[#F7F4EB] hover:text-[#E6C786] transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] disabled:opacity-50"
                >
                  {isCheckingOut ? (
                    <span className="animate-pulse">Securing Place Vendôme Order...</span>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
                      <span>Proceed to Parisian Checkout · €{subtotal}</span>
                    </>
                  )}
                </button>
              </form>

              <div className="text-[10px] text-center text-[#B8C2B9]/70 tracking-wider uppercase font-mono">
                Secure Encrypted Checkout · 30-Day Maison Return Guarantee
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
