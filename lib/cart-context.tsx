'use client';

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { Perfume, PERFUMES } from './perfumes';

export interface CartItem {
  id: string; // unique item id (e.g., printemps-100ml-engraving)
  type: 'bottle' | 'discovery-set' | 'coffret';
  title: string;
  seasonId?: 'printemps' | 'ete' | 'automne' | 'hiver';
  size?: '50ml' | '100ml';
  price: number;
  quantity: number;
  image: string;
  engraving?: string;
  vials?: string[]; // for discovery set
}

interface CartContextType {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'> & { quantity?: number }) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, delta: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  activeModalPerfume: Perfume | null;
  setActiveModalPerfume: (perfume: Perfume | null) => void;
  isSoundActive: boolean;
  toggleSound: () => void;
  selectedSamples: string[];
  toggleSample: (sampleName: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([
    {
      id: 'printemps-100ml',
      type: 'bottle',
      title: 'Printemps — Eau de Parfum',
      seasonId: 'printemps',
      size: '100ml',
      price: 240,
      quantity: 1,
      image: '/assets/aistudio/Spring_Perfume_PrintTemps__e091740e.jpg',
    },
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [activeModalPerfume, setActiveModalPerfume] = useState<Perfume | null>(null);
  const [isSoundActive, setIsSoundActive] = useState(false);
  const [selectedSamples, setSelectedSamples] = useState<string[]>(['Été (2ml)', 'Hiver (2ml)']);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const oscNodesRef = useRef<OscillatorNode[]>([]);

  // Subtle luxury sound synthesis (Web Audio API)
  const toggleSound = () => {
    if (!isSoundActive) {
      try {
        const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioContextClass();
        audioCtxRef.current = ctx;

        const masterGain = ctx.createGain();
        masterGain.gain.setValueAtTime(0.0001, ctx.currentTime);
        masterGain.gain.exponentialRampToValueAtTime(0.04, ctx.currentTime + 2.5);
        masterGain.connect(ctx.destination);
        gainNodeRef.current = masterGain;

        // Warm ethereal harmonic cluster (tuned to D luxury chord: D, F#, A, E)
        const frequencies = [146.83, 220.0, 293.66, 440.0, 659.25];
        const oscs: OscillatorNode[] = [];

        frequencies.forEach((freq, idx) => {
          const osc = ctx.createOscillator();
          const filter = ctx.createBiquadFilter();
          const panner = ctx.createStereoPanner ? ctx.createStereoPanner() : null;

          osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
          osc.frequency.setValueAtTime(freq, ctx.currentTime);

          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(450 + idx * 80, ctx.currentTime);

          if (panner) {
            panner.pan.setValueAtTime((idx - 2) * 0.35, ctx.currentTime);
            osc.connect(filter);
            filter.connect(panner);
            panner.connect(masterGain);
          } else {
            osc.connect(filter);
            filter.connect(masterGain);
          }

          osc.start();
          oscs.push(osc);
        });

        oscNodesRef.current = oscs;
        setIsSoundActive(true);
      } catch (e) {
        console.warn('AudioContext not allowed or not supported yet', e);
      }
    } else {
      if (audioCtxRef.current && gainNodeRef.current) {
        gainNodeRef.current.gain.exponentialRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 1.2);
        setTimeout(() => {
          oscNodesRef.current.forEach((osc) => {
            try {
              osc.stop();
              osc.disconnect();
            } catch {
              // ignore
            }
          });
          oscNodesRef.current = [];
          if (audioCtxRef.current) {
            audioCtxRef.current.close().catch(() => {});
            audioCtxRef.current = null;
          }
        }, 1300);
      }
      setIsSoundActive(false);
    }
  };

  useEffect(() => {
    return () => {
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  const addToCart = (newItem: Omit<CartItem, 'quantity'> & { quantity?: number }) => {
    const qty = newItem.quantity || 1;
    setItems((prev) => {
      const existing = prev.find((i) => i.id === newItem.id);
      if (existing) {
        return prev.map((i) => (i.id === newItem.id ? { ...i, quantity: i.quantity + qty } : i));
      }
      return [...prev, { ...newItem, quantity: qty }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((i) => {
          if (i.id === id) {
            const nextQty = i.quantity + delta;
            return nextQty > 0 ? { ...i, quantity: nextQty } : null;
          }
          return i;
        })
        .filter((i): i is CartItem => i !== null)
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const totalItems = items.reduce((acc, curr) => acc + curr.quantity, 0);
  const subtotal = items.reduce((acc, curr) => acc + curr.price * curr.quantity, 0);

  const toggleSample = (sampleName: string) => {
    setSelectedSamples((prev) => {
      if (prev.includes(sampleName)) {
        return prev.filter((s) => s !== sampleName);
      }
      if (prev.length >= 2) {
        return [prev[1], sampleName];
      }
      return [...prev, sampleName];
    });
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
        isCartOpen,
        setIsCartOpen,
        activeModalPerfume,
        setActiveModalPerfume,
        isSoundActive,
        toggleSound,
        selectedSamples,
        toggleSample,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
