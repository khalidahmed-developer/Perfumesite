'use client';

import React, { useEffect, useState, useRef } from 'react';

export default function GlobalBackground() {
  const [activeSeasonGlow, setActiveSeasonGlow] = useState<'printemps' | 'ete' | 'automne' | 'hiver'>('printemps');
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.defaultMuted = true;

    const playVideo = () => {
      video.play().catch(() => {
        // Autoplay may wait for user interaction
      });
    };

    playVideo();

    // In case browser autoplay policy requires user interaction, start on first scroll or touch or click
    const handleFirstInteraction = () => {
      if (video.paused) {
        video.play().catch(() => {});
      }
    };

    window.addEventListener('scroll', handleFirstInteraction, { once: true, passive: true });
    window.addEventListener('click', handleFirstInteraction, { once: true });
    window.addEventListener('touchstart', handleFirstInteraction, { once: true, passive: true });

    const handleScroll = () => {
      const scrollPos = window.scrollY;
      const windowH = window.innerHeight;

      if (scrollPos < windowH * 0.9) {
        setActiveSeasonGlow('printemps');
      } else if (scrollPos < windowH * 1.9) {
        setActiveSeasonGlow('printemps');
      } else if (scrollPos < windowH * 2.9) {
        setActiveSeasonGlow('ete');
      } else if (scrollPos < windowH * 3.9) {
        setActiveSeasonGlow('automne');
      } else {
        setActiveSeasonGlow('hiver');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', handleFirstInteraction);
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, []);

  const seasonalTints = {
    printemps: 'from-[#f3c6cf]/15 via-[#2d4f3e]/20 to-[#101c15]/60',
    ete: 'from-[#e6a145]/15 via-[#2b4c59]/20 to-[#101c15]/60',
    automne: 'from-[#8c4a27]/20 via-[#2a1b12]/25 to-[#101c15]/60',
    hiver: 'from-[#d0e1e8]/15 via-[#1e353b]/25 to-[#101c15]/60',
  };

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden w-screen h-screen">
      {/* 1. Global Background Ambient Video - Full viewport, High Visibility Opacity */}
      <video
        ref={videoRef}
        src="/assets/aistudio/BackgroundAnimation_ac6ca2dc.webm"
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        onCanPlay={() => {
          setVideoLoaded(true);
          videoRef.current?.play().catch(() => {});
        }}
        onLoadedData={() => {
          videoRef.current?.play().catch(() => {});
        }}
        className="absolute inset-0 w-full h-full object-cover object-center pointer-events-none opacity-85"
      >
        <source src="/assets/aistudio/BackgroundAnimation_ac6ca2dc.webm" type="video/webm" />
        <source src="/assets/Backgroundanimation.webm" type="video/webm" />
      </video>

      {/* 2. Theme Overlay: Deep Imperial Green (#15261D) Translucent Tint */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundColor: 'rgba(21, 38, 29, 0.42)',
        }}
      />

      {/* 3. Dynamic Seasonal Ambient Glow Overlay */}
      <div
        className={`absolute inset-0 pointer-events-none bg-gradient-to-b ${seasonalTints[activeSeasonGlow]} opacity-70 transition-all duration-1000 ease-in-out`}
      />

      {/* 4. Luxury Radial Vignette Overlay to maintain contrast around borders */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(8,16,12,0.7)_100%)]" />
    </div>
  );
}
