import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ANIME } from "@/lib/mock-data";
import { formatRating } from "@/lib/utils";

export const metadata: Metadata = { title: "Anime" };

export default function AnimePage() {
  return (
    <div className="mx-auto max-w-[1400px] px-4 pb-16 pt-8 sm:px-8">
      <h1 className="mb-6 text-2xl font-semibold text-white">Anime</h1>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
        {ANIME.map((m) => (
          <Link key={m.id} href={`/tv/${m.id}`}>
            <div className="relative aspect-[2/3] overflow-hidden rounded-lg border border-line bg-surface transition-transform hover:scale-[1.03]">
              <Image src={m.posterPath} alt={m.title} fill sizes="200px" className="object-cover" />
            </div>
            <p className="mt-2 line-clamp-1 text-sm text-white">{m.title}</p>
            <p className="text-xs text-muted">
              {m.releaseYear} · ★ {formatRating(m.rating)}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
