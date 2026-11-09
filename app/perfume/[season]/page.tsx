import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { PERFUMES } from '@/lib/perfumes';
import PerfumeDetailClient from '@/components/PerfumeDetailClient';

interface PageProps {
  params: Promise<{ season: string }>;
}

export function generateStaticParams() {
  return [
    { season: 'printemps' },
    { season: 'ete' },
    { season: 'automne' },
    { season: 'hiver' },
  ];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { season } = await params;
  const perfume = PERFUMES.find((p) => p.id.toLowerCase() === season.toLowerCase());

  if (!perfume) {
    return {
      title: 'Parfum Non Trouvé | Quatréa Paris',
    };
  }

  return {
    title: `${perfume.seasonName} — Eau de Parfum | Quatréa Paris`,
    description: `${perfume.headline}. ${perfume.description}`,
    openGraph: {
      title: `${perfume.seasonName} — Eau de Parfum | Quatréa Paris`,
      description: perfume.description,
      images: [perfume.image],
    },
  };
}

export default async function PerfumeDetailPage({ params }: PageProps) {
  const { season } = await params;
  const perfume = PERFUMES.find((p) => p.id.toLowerCase() === season.toLowerCase());

  if (!perfume) {
    notFound();
  }

  return <PerfumeDetailClient initialSeason={season} />;
}
