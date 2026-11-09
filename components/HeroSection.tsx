'use client';

import React, { useRef, useState } from 'react';
import Link from 'next/link';
import { Volume2, VolumeX, ArrowDown, Sparkles } from 'lucide-react';

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoMuted, setIsVideoMuted] = useState(true);

  const toggleVideoAudio = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsVideoMuted(videoRef.current.muted);
    }
  };

  const scrollToChapterOne = () => {
    const el = document.getElementById('chapter-printemps');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative w-full min-h-screen h-screen flex items-center justify-center overflow-hidden">
      {/* Full Screen Cinematic Hero Video */}
      <video
        ref={videoRef}
        src="/assets/aistudio/HeroSectionVideo_8a535c19.mp4"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        onLoadedMetadata={(e) => {
          e.currentTarget.muted = true;
          e.currentTarget.play().catch(() => {});
        }}
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none"
      >
        <source src="/assets/aistudio/HeroSectionVideo_8a535c19.mp4" type="video/mp4" />
        <source src="/assets/HeroSectionVideo.mp4" type="video/mp4" />
      </video>

      {/* Cinematic Contrast Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#101c15] via-[#101c15]/35 to-black/40 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(16,28,21,0.75)_100%)] pointer-events-none" />

      {/* Hero Video Audio Toggle Button */}
      <button
        onClick={toggleVideoAudio}
        type="button"
        className="absolute bottom-8 right-6 sm:right-10 z-20 p-3 rounded-full bg-[#15261d]/85 hover:bg-[#1f3b2c] border border-[#D4AF37]/50 text-[#F7F4EB] hover:text-[#E6C786] backdrop-blur-md transition-all shadow-xl group"
        title={isVideoMuted ? 'Unmute showcase video' : 'Mute showcase video'}
        aria-label="Toggle showcase video audio"
      >
        {isVideoMuted ? (
          <VolumeX className="w-4 h-4 text-[#B8C2B9] group-hover:text-[#F7F4EB]" />
        ) : (
          <Volume2 className="w-4 h-4 text-[#D4AF37] animate-pulse" />
        )}
      </button>

      {/* Centered Luxury Editorial Hero Content */}
      <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8 pt-16">
        {/* Pre-title in spaced gold caps */}
        <div className="text-[11px] sm:text-xs tracking-[0.34em] uppercase text-[#D4AF37] font-medium mb-4">
          LA MAISON DES SAISONS — PARIS
        </div>

        {/* Main Headline */}
        <h1 className="font-editorial text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-normal text-[#F7F4EB] tracking-[0.03em] max-w-4xl text-balance leading-[1.05] mb-5 sm:mb-6">
          Four Seasons. <br className="hidden sm:inline" />
          <span className="italic font-light text-[#E6C786]">Four Eternal Essences.</span>
        </h1>

        {/* Subheadline */}
        <p className="text-xs sm:text-sm md:text-base lg:text-lg text-[#B8C2B9] max-w-2xl font-light tracking-wide leading-relaxed mb-8 sm:mb-10 text-balance">
          An olfactory journey through nature’s most fleeting masterpieces, bottled in crystal and
          gold in the historic heart of Paris.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          {/* Primary CTA */}
          <Link
            href="/catalog"
            className="w-full sm:w-auto px-8 py-3.5 rounded-sm bg-[#15261d]/90 hover:bg-[#1c3829] border border-[#D4AF37] text-xs sm:text-sm uppercase tracking-[0.2em] font-medium text-[#F7F4EB] hover:text-[#E6C786] backdrop-blur-md transition-all duration-300 shadow-[0_0_25px_rgba(212,175,55,0.25)] hover:shadow-[0_0_35px_rgba(212,175,55,0.5)] whitespace-nowrap"
          >
            Explore Perfume Catalog
          </Link>

          {/* Secondary CTA: Begin Journey */}
          <button
            onClick={scrollToChapterOne}
            type="button"
            className="w-full sm:w-auto px-7 py-3.5 rounded-sm border border-[#D4AF37]/40 hover:border-[#D4AF37] bg-black/30 hover:bg-black/50 text-xs sm:text-sm uppercase tracking-[0.18em] text-[#B8C2B9] hover:text-[#F7F4EB] backdrop-blur-sm transition-all duration-300 flex items-center justify-center gap-2 whitespace-nowrap"
          >
            <span>Begin the Journey</span>
            <ArrowDown className="w-3.5 h-3.5 text-[#D4AF37] animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
}
