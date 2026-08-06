import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import type { SubService } from "@/lib/site";

function cardBg(i: number) {
  // On-brand gold family, varied intensity + angle per card so the stack
  // reads as distinct layers without breaking the single-accent lock.
  // The trailing solid color keeps every card fully OPAQUE so stacked cards
  // never bleed the layer beneath through and blur the text.
  const a = 0.1 + (i % 5) * 0.035;
  const angle = 120 + (i % 4) * 25;
  return `linear-gradient(${angle}deg, rgba(232,194,106,${a.toFixed(3)}) 0%, #16130d 60%), #0a0908`;
}

/**
 * Vertical scroll-stack of sub-services. Each card sticks, the next scrolls up
 * and covers it, so every scroll "unlocks" the next specialism. Pure CSS
 * sticky positioning, so it degrades gracefully and needs no JS.
 */
export function SubServiceStack({
  serviceSlug,
  items,
}: {
  serviceSlug: string;
  items: SubService[];
}) {
  return (
    <section className="border-b border-border py-20 md:py-28">
      <Container>
        <div className="mb-12 max-w-2xl">
          <p className="eyebrow mb-5">Specialisms</p>
          <h2 className="font-display text-3xl font-black tracking-tight md:text-5xl">
            Scroll through everything we do.
          </h2>
          <p className="mt-4 leading-relaxed text-fg-muted">
            {items.length} specialisms under this service. Keep scrolling, each
            one stacks up as you go. Tap any to go deeper.
          </p>
        </div>

        <div className="relative">
          {items.map((sub, i) => (
            <div
              key={sub.slug}
              className="sticky"
              style={{ top: `${5 + i * 0.45}rem` }}
            >
              <Link
                href={`/services/${serviceSlug}/${sub.slug}`}
                className="group mb-5 flex min-h-[68vh] flex-col justify-between overflow-hidden rounded-[24px] border border-border-strong p-8 shadow-[0_-10px_40px_-20px_rgba(0,0,0,0.6)] md:p-14"
                style={{ background: cardBg(i) }}
              >
                <div className="flex items-center justify-between font-mono text-xs uppercase tracking-[0.2em] text-fg/60">
                  <span>
                    {String(i + 1).padStart(2, "0")} /{" "}
                    {String(items.length).padStart(2, "0")}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="size-1.5 rounded-full bg-accent" />
                    Specialism
                  </span>
                </div>

                <div>
                  <h3 className="max-w-3xl font-display text-4xl font-black leading-[0.95] tracking-tight text-fg sm:text-5xl md:text-7xl">
                    {sub.name}
                  </h3>
                  <p className="mt-5 max-w-xl text-lg leading-relaxed text-fg-muted md:text-xl">
                    {sub.blurb}
                  </p>
                  <span className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-accent">
                    Explore
                    <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
