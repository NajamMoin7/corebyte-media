import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import {
  portfolioCategories,
  categoryCount,
  categoryCover,
} from "@/lib/portfolio";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Portfolio across logos, web design, branding, UI/UX, social media, and graphic design from Core Byte Media.",
};

export default function WorkPage() {
  return (
    <>
      <PageHeader
        eyebrow="Work"
        title="The work, by category."
        intro="Browse the portfolio across six practices. Every piece shipped for a real client."
      />

      <section className="pb-24 md:pb-32">
        <Container>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {portfolioCategories.map((cat, i) => {
              const cover = categoryCover(cat);
              return (
                <Reveal key={cat.slug} delay={i * 0.05}>
                  <Link
                    href={`/work/${cat.slug}`}
                    className="group relative flex aspect-[4/5] flex-col justify-end overflow-hidden rounded-[18px] border border-border bg-bg-elevated p-6"
                  >
                    {cover && (
                      <Image
                        src={cover}
                        alt={`${cat.name} portfolio by Core Byte Media`}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className={`absolute inset-0 transition-transform duration-700 group-hover:scale-[1.05] ${
                          cat.layout === "logo"
                            ? "bg-white object-contain p-12"
                            : "object-cover opacity-70 group-hover:opacity-90"
                        }`}
                      />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent" />
                    <div className="relative">
                      <span className="font-mono text-xs uppercase tracking-wider text-fg-dim">
                        {categoryCount(cat)} pieces
                      </span>
                      <h2 className="mt-2 flex items-center gap-2 font-display text-2xl font-bold tracking-tight transition-colors group-hover:text-accent md:text-3xl">
                        {cat.name}
                        <ArrowUpRight className="size-5 text-fg-dim transition-all group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </h2>
                      <p className="mt-2 max-w-xs text-sm leading-relaxed text-fg-muted">
                        {cat.blurb}
                      </p>
                    </div>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>
    </>
  );
}
