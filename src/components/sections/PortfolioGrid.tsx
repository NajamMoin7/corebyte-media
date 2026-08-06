import Image from "next/image";
import type { PortfolioLayout } from "@/lib/portfolio";

/**
 * Faithful grid of portfolio work. Logos sit on light tiles so dark marks stay
 * visible; everything else renders as full-bleed image cards.
 */
export function PortfolioGrid({
  images,
  layout,
  name,
}: {
  images: string[];
  layout: PortfolioLayout;
  name: string;
}) {
  if (layout === "scroll") {
    // full-page website mockups: show the top, scroll the whole page on hover
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {images.map((src, i) => (
          <div
            key={src}
            className="group relative h-[22rem] overflow-hidden rounded-[16px] border border-border bg-white"
          >
            <Image
              src={src}
              alt={`${name} project ${i + 1} by Core Byte Media`}
              width={800}
              height={2400}
              className="absolute left-0 top-0 w-full transition-transform duration-[5000ms] ease-linear group-hover:translate-y-[calc(22rem_-_100%)]"
            />
            <span className="pointer-events-none absolute bottom-3 right-3 rounded-full border border-border-strong bg-bg/70 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-fg backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-0">
              Hover to scroll
            </span>
          </div>
        ))}
      </div>
    );
  }

  if (layout === "logo") {
    return (
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {images.map((src, i) => (
          <div
            key={src}
            className="group relative flex aspect-square items-center justify-center overflow-hidden rounded-[14px] border border-border bg-white p-7 transition-transform duration-300 hover:-translate-y-1"
          >
            <Image
              src={src}
              alt={`${name} project ${i + 1} by Core Byte Media`}
              width={320}
              height={320}
              className="max-h-full w-auto object-contain transition-transform duration-500 group-hover:scale-[1.06]"
            />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {images.map((src, i) => (
        <div
          key={src}
          className="group relative aspect-[4/3] overflow-hidden rounded-[16px] border border-border bg-surface"
        >
          <Image
            src={src}
            alt={`${name} project ${i + 1} by Core Byte Media`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <span className="absolute bottom-3 left-4 font-mono text-xs text-white/0 transition-colors duration-300 group-hover:text-white/90">
            {name} / {String(i + 1).padStart(2, "0")}
          </span>
        </div>
      ))}
    </div>
  );
}
