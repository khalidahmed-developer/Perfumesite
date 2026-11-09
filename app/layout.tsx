import type { Metadata } from 'next';
import { Cormorant_Garamond, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/lib/cart-context';
import GlobalBackground from '@/components/GlobalBackground';
import Navbar from '@/components/Navbar';
import CustomCursor from '@/components/CustomCursor';
import CartDrawer from '@/components/CartDrawer';
import OlfactoryModal from '@/components/OlfactoryModal';
import Footer from '@/components/Footer';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Quatréa — La Maison des Saisons (Paris)',
  description:
    'Ultra-luxury Parisian haute-parfumerie house showcasing four signature Eau de Parfums capturing the sensory essence of the four seasons: Printemps, Été, Automne, and Hiver.',
  openGraph: {
    title: 'Quatréa — La Maison des Saisons (Paris)',
    description:
      'Ultra-luxury Parisian haute-parfumerie house showcasing four signature Eau de Parfums capturing the sensory essence of the four seasons: Printemps, Été, Automne, and Hiver.',
    type: 'website',
    locale: 'fr_FR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Quatréa — La Maison des Saisons (Paris)',
    description:
      'Ultra-luxury Parisian haute-parfumerie house showcasing four signature Eau de Parfums capturing the sensory essence of the four seasons: Printemps, Été, Automne, and Hiver.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${plusJakarta.variable}`}>
      <body className="text-[#F7F4EB] min-h-screen relative selection:bg-[#D4AF37]/30 selection:text-[#F7F4EB] antialiased">
        <CartProvider>
          {/* Custom Gold Cursor */}
          <CustomCursor />

          {/* Global Ambient Background Video */}
          <GlobalBackground />

          {/* Sticky Luxury Navbar */}
          <Navbar />

          {/* Main Page Content */}
          <main className="relative z-10">{children}</main>

          {/* Luxury Slide-over Cart Drawer */}
          <CartDrawer />

          {/* Quick-View Olfactory Pyramid Modal */}
          <OlfactoryModal />

          {/* Luxury Editorial Footer */}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
