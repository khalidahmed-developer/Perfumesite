import type { Metadata } from 'next';
import CatalogClient from '@/components/CatalogClient';

export const metadata: Metadata = {
  title: 'Catalogue des Parfums | Quatréa Paris',
  description:
    'Explore the Four Seasons Collection of haute parfumerie: Printemps, Été, Automne, and Hiver.',
};

export default function CatalogPage() {
  return <CatalogClient />;
}
