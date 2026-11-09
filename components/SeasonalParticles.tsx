'use client';

import React from 'react';

interface SeasonalParticlesProps {
  season: 'printemps' | 'ete' | 'automne' | 'hiver';
}

export default function SeasonalParticles({ season }: SeasonalParticlesProps) {
  if (season === 'printemps') {
    // Sakura petals drifting
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-0">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute opacity-65 animate-float"
            style={{
              top: `${(i * 19) % 95}%`,
              left: `${(i * 23) % 90}%`,
              animationDelay: `${i * 0.7}s`,
              animationDuration: `${5 + (i % 4)}s`,
              transform: `scale(${0.7 + (i % 3) * 0.3}) rotate(${i * 25}deg)`,
            }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2C8 6 3 12 7 17C10 20 15 19 18 15C21 11 16 6 12 2Z"
                fill="#F3C6CF"
                fillOpacity="0.45"
              />
              <path
                d="M12 2C10 6 6 11 9 15C12 18 16 17 18 15C16 11 14 7 12 2Z"
                fill="#FFF0F3"
                fillOpacity="0.3"
              />
            </svg>
          </div>
        ))}
      </div>
    );
  }

  if (season === 'ete') {
    // Warm golden-hour sun bokeh and light sparks
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-0">
        {[...Array(14)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-pulse-subtle"
            style={{
              top: `${(i * 21) % 92}%`,
              left: `${(i * 17) % 94}%`,
              width: `${6 + (i % 5) * 8}px`,
              height: `${6 + (i % 5) * 8}px`,
              background:
                i % 2 === 0
                  ? 'radial-gradient(circle, rgba(230,161,69,0.5) 0%, rgba(212,175,55,0) 70%)'
                  : 'radial-gradient(circle, rgba(255,230,160,0.45) 0%, rgba(230,161,69,0) 70%)',
              animationDelay: `${i * 0.4}s`,
              animationDuration: `${4 + (i % 3)}s`,
            }}
          />
        ))}
      </div>
    );
  }

  if (season === 'automne') {
    // Warm amber dust particles & golden leaves
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden -z-0">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              top: `${(i * 23) % 90}%`,
              left: `${(i * 19) % 92}%`,
              animationDelay: `${i * 0.6}s`,
              animationDuration: `${6 + (i % 3)}s`,
              transform: `scale(${0.65 + (i % 3) * 0.25}) rotate(${i * 45}deg)`,
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2C6 8 4 14 8 18C12 22 18 20 20 14C22 8 16 4 12 2Z"
                fill="#D48B47"
                fillOpacity="0.4"
              />
              <path d="M12 2V22" stroke="#AA8239" strokeWidth="1" strokeOpacity="0.4" />
            </svg>
          </div>
        ))}
      </div>
    );
  }

  // Hiver (Winter): Crystalline frost shimmer and soft snow particles
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden -z-0">
      {[...Array(16)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-float"
          style={{
            top: `${(i * 17) % 94}%`,
            left: `${(i * 21) % 95}%`,
            animationDelay: `${i * 0.5}s`,
            animationDuration: `${7 + (i % 4)}s`,
          }}
        >
          {i % 2 === 0 ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 2V22M2 12H22M5 5L19 19M19 5L5 19"
                stroke="#D0E1E8"
                strokeWidth="1.2"
                strokeOpacity="0.5"
              />
            </svg>
          ) : (
            <div
              className="w-2 h-2 rounded-full bg-[#EAF2F6]/60 blur-[0.5px]"
              style={{ transform: `scale(${0.8 + (i % 3) * 0.4})` }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
