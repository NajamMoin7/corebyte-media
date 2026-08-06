import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import {
  portfolioCategories,
  categoryCover,
  categoryCount,
} from "@/lib/portfolio";

export function WorkTeaser() {
  // feature the two richest categories
  const featured = ["logos", "web-design"]
    .map((s) => portfolioCategories.find((c) => c.slug === s))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  return (
    <section className="py-24 md:py-32">
      <Container>
        <div className="mb-14 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow mb-5">Selected work</p>
            <h2 className="font-display text-4xl font-semibold tracking-tight text-balance sm:text-5xl md:text-6xl">
              Proof, not promises.
            </h2>
          </div>
          <Link
            href="/work"
            className="group inline-flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-fg"
          >
            View all work
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-12">
          <div className="md:col-span-7">
            <FeatureCard
              cat={featured[0]}
              override="/images/work/logos-feature.png"
              priority
            />
          </div>
          <div className="md:col-span-5 md:pt-24">
            <FeatureCard
              cat={featured[1]}
              override="/images/work/web-feature.png"
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

function FeatureCard({
  cat,
  override,
  priority,
}: {
  cat: (typeof portfolioCategories)[number];
  override?: string;
  priority?: boolean;
}) {
  const cover = override ?? categoryCover(cat);
  const isImage = Boolean(override) || cat.layout !== "logo";
  return (
    <Reveal>
      <Link href={`/work/${cat.slug}`} className="group block">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[14px] border border-border bg-surface">
          {cover && (
            <Image
              src={cover}
              alt={cat.name}
              fill
              sizes="(max-width: 768px) 100vw, 60vw"
              priority={priority}
              className={
                isImage
                  ? "object-cover transition-all duration-700 group-hover:scale-[1.03]"
                  : "bg-white object-contain p-16"
              }
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-bg/60 via-transparent to-transparent" />
          <span className="absolute left-4 top-4 rounded-full border border-border-strong bg-bg/60 px-3 py-1 font-mono text-xs uppercase tracking-wider text-fg backdrop-blur-sm">
            {categoryCount(cat)} pieces
          </span>
        </div>
        <div className="mt-5 flex items-start justify-between gap-4">
          <div>
            <p className="font-mono text-xs uppercase tracking-wider text-fg-dim">
              Portfolio
            </p>
            <h3 className="mt-2 font-display text-2xl font-medium tracking-tight transition-colors group-hover:text-accent md:text-3xl">
              {cat.name}
            </h3>
          </div>
          <ArrowUpRight className="mt-1 size-6 shrink-0 text-fg-dim transition-all group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </Link>
    </Reveal>
  );
}
