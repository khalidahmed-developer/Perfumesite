'use client';

import React, { useRef, useState } from 'react';
import { Volume2, VolumeX, ArrowDown } from 'lucide-react';

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
      {/* Full Screen Cinematic Hero Video with Smooth Feathered Bottom */}
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
        style={{
          maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%)',
        }}
      >
        <source src="/assets/aistudio/HeroSectionVideo_8a535c19.mp4" type="video/mp4" />
        <source src="/assets/HeroSectionVideo.mp4" type="video/mp4" />
      </video>

      {/* Subtle Ambient Contrast Overlay */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/30 pointer-events-none"
      />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(16,28,21,0.5)_100%)] pointer-events-none"
        style={{
          maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 70%, rgba(0,0,0,0) 100%)',
        }}
      />

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

      {/* Discreet bottom scroll indicator (icon only, unobstructed visual) */}
      <button
        onClick={scrollToChapterOne}
        type="button"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 p-2.5 rounded-full bg-[#15261d]/60 hover:bg-[#1f3b2c] border border-[#D4AF37]/30 hover:border-[#D4AF37] text-[#D4AF37] hover:text-[#E6C786] backdrop-blur-sm transition-all shadow-lg group focus:outline-none focus-visible:ring-1 focus-visible:ring-[#D4AF37]"
        title="Scroll down to explore"
        aria-label="Scroll down to begin the journey"
      >
        <ArrowDown className="w-4 h-4 animate-bounce" />
      </button>
    </section>
  );
}
