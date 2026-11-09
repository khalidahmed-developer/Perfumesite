'use client';

import React, { useEffect, useState } from 'react';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [trailingPos, setTrailingPos] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch] = useState(() => {
    if (typeof window === 'undefined') return false;
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  });

  useEffect(() => {
    if (typeof window === 'undefined' || isTouch) return;

    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      const target = e.target as HTMLElement | null;
      if (
        target?.closest('button') ||
        target?.closest('a') ||
        target?.closest('input') ||
        target?.closest('[data-cursor="hover"]') ||
        target?.tagName === 'BUTTON' ||
        target?.tagName === 'A'
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const onMouseLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [isVisible, isTouch]);

  // Smooth trail animation
  useEffect(() => {
    if (isTouch) return;
    let animId: number;
    const animateTrail = () => {
      setTrailingPos((prev) => ({
        x: prev.x + (position.x - prev.x) * 0.22,
        y: prev.y + (position.y - prev.y) * 0.22,
      }));
      animId = requestAnimationFrame(animateTrail);
    };
    animId = requestAnimationFrame(animateTrail);
    return () => cancelAnimationFrame(animId);
  }, [position, isTouch]);

  if (isTouch || !isVisible) return null;

  return (
    <>
      {/* Center pinpoint */}
      <div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-[#E6C786] rounded-full pointer-events-none z-[9999] transform -translate-x-1/2 -translate-y-1/2 transition-opacity duration-300"
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
          opacity: isHovered ? 0 : 0.85,
        }}
      />
      {/* Outer champagne gold ring */}
      <div
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-[9999] transform -translate-x-1/2 -translate-y-1/2 transition-all duration-150 ease-out border ${
          isHovered
            ? 'w-12 h-12 border-[#D4AF37] bg-[rgba(212,175,55,0.12)] scale-110 shadow-[0_0_15px_rgba(212,175,55,0.3)]'
            : 'w-7 h-7 border-[#D4AF37]/50 bg-transparent scale-100'
        }`}
        style={{
          transform: `translate3d(${trailingPos.x - (isHovered ? 24 : 14)}px, ${
            trailingPos.y - (isHovered ? 24 : 14)
          }px, 0)`,
        }}
      />
    </>
  );
}
