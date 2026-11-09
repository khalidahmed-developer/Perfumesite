import React from 'react';
import HeroSection from '@/components/HeroSection';
import Scrollytelling from '@/components/Scrollytelling';
import ProductShowcaseGrid from '@/components/ProductShowcaseGrid';
import DiscoverySetSection from '@/components/DiscoverySetSection';
import HeritageBanner from '@/components/HeritageBanner';

export default function HomePage() {
  return (
    <div className="relative w-full">
      {/* 1. Hero Section Showcase */}
      <HeroSection />

      {/* 2. The 4-Chapter Seasonal Scrollytelling Sequence */}
      <Scrollytelling />

      {/* 3. Interactive Product Showcase Grid */}
      <ProductShowcaseGrid />

      {/* 4. Discovery Set Interactive Sampler Box */}
      <DiscoverySetSection />

      {/* 5. Master Perfumer Philosophy & Brand Heritage Banner */}
      <HeritageBanner />
    </div>
  );
}
