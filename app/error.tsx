'use client';

import React from 'react';
import Link from 'next/link';

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-24 max-w-xl mx-auto">
      <div className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-mono mb-3">
        COMPOSITION INTERROMPUE
      </div>
      <h1 className="font-editorial text-4xl sm:text-5xl text-[#F7F4EB] mb-4">
        Atelier Disturbance
      </h1>
      <p className="text-xs sm:text-sm text-[#B8C2B9] max-w-md mx-auto mb-8 font-light leading-relaxed">
        An unexpected interruption occurred during sensory processing.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <button
          onClick={() => reset()}
          type="button"
          className="px-6 py-3 rounded-sm bg-[#1b3527] hover:bg-[#234533] border border-[#D4AF37] text-xs uppercase tracking-[0.2em] text-[#F7F4EB] hover:text-[#E6C786] transition-all"
        >
          Reset Session
        </button>
        <Link
          href="/"
          className="px-6 py-3 rounded-sm border border-[#D4AF37]/40 text-xs uppercase tracking-[0.2em] text-[#B8C2B9] hover:text-[#F7F4EB] transition-colors"
        >
          Return to La Maison
        </Link>
      </div>
    </div>
  );
}
