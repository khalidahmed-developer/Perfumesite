import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-24 max-w-xl mx-auto">
      <div className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-mono mb-3">
        404 · PAGE INTROUVABLE
      </div>
      <h1 className="font-editorial text-4xl sm:text-5xl text-[#F7F4EB] mb-4">
        Sillage Évanoui
      </h1>
      <p className="text-xs sm:text-sm text-[#B8C2B9] max-w-md mx-auto mb-8 font-light leading-relaxed">
        The flacon or dossier you are looking for does not exist in our seasonal archives.
      </p>
      <Link
        href="/"
        className="px-6 py-3 rounded-sm bg-[#1b3527] hover:bg-[#234533] border border-[#D4AF37] text-xs uppercase tracking-[0.2em] text-[#F7F4EB] hover:text-[#E6C786] transition-all"
      >
        Return to La Maison
      </Link>
    </div>
  );
}
