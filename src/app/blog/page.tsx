import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { Reveal } from "@/components/ui/Reveal";
import { allPostsByDate } from "@/lib/posts";

export const metadata: Metadata = {
  title: "Blog & Resources · Design, Web & AI",
  description:
    "Guides on logo and website pricing, branding, and AI chatbots from Core Byte Media, a US design and AI studio.",
  alternates: { canonical: "/blog" },
};

const fmt = (d: string) =>
  new Date(d).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

export default function BlogPage() {
  const posts = allPostsByDate();
  return (
    <>
      <PageHeader
        eyebrow="Blog & Resources"
        title="Straight answers on design, web, and AI."
        intro="No fluff. Real pricing, honest advice, and what we have learned shipping brands, sites, and agents."
      />

      <section className="pb-24 md:pb-32">
        <Container>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {posts.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.05}>
                <Link
                  href={`/blog/${p.slug}`}
                  className="group flex h-full flex-col rounded-[18px] border border-border bg-bg-elevated p-7 transition-colors hover:border-border-strong md:p-8"
                >
                  <div className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-wider text-fg-dim">
                    <span className="text-accent">{p.category}</span>
                    <span>·</span>
                    <span>{p.readMins} min read</span>
                  </div>
                  <h2 className="font-display text-2xl font-bold tracking-tight transition-colors group-hover:text-accent md:text-3xl">
                    {p.title}
                  </h2>
                  <p className="mt-3 flex-1 leading-relaxed text-fg-muted">
                    {p.excerpt}
                  </p>
                  <div className="mt-6 flex items-center justify-between">
                    <span className="font-mono text-xs text-fg-dim">
                      {fmt(p.date)}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                      Read
                      <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
