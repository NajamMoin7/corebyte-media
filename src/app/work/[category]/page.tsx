import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { BannerBg } from "@/components/ui/BannerBg";
import { PortfolioGrid } from "@/components/sections/PortfolioGrid";
import {
  portfolioCategories,
  getCategory,
  categoryImages,
} from "@/lib/portfolio";

// banner art per category, reusing the vetted service banners
const bannerFor: Record<string, string> = {
  logos: "/images/banners/logo-design-v2.jpg",
  "web-design": "/images/banners/web-development-v2.jpg",
  branding: "/images/banners/graphic-design-v2.jpg",
  "ui-ux": "/images/banners/web-development-v2.jpg",
  "social-media": "/images/banners/graphic-design-v2.jpg",
  "graphic-design": "/images/banners/graphic-design-v2.jpg",
};

export function generateStaticParams() {
  return portfolioCategories.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) return {};
  return { title: `${cat.name} · Work`, description: cat.blurb };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) notFound();

  const images = categoryImages(cat);

  return (
    <>
      {/* banner */}
      <header className="relative overflow-hidden border-b border-border pt-32 pb-14 md:pt-40 md:pb-16">
        <BannerBg src={bannerFor[cat.slug] ?? "/images/banners/services.jpg"} />
        <Container>
          <nav className="mb-7 flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-wider text-fg-dim">
            <Link href="/work" className="transition-colors hover:text-fg">
              Work
            </Link>
            <span>/</span>
            <span className="text-accent">{cat.name}</span>
          </nav>
          <Reveal>
            <h1 className="font-display text-5xl font-black leading-[0.98] tracking-tight sm:text-6xl md:text-7xl">
              {cat.name}
            </h1>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-fg-muted">
              {cat.blurb}
            </p>
          </Reveal>
        </Container>
      </header>

      {/* category tabs (main categories only) */}
      <div className="sticky top-0 z-30 border-b border-border bg-bg/85 backdrop-blur">
        <Container>
          <div className="flex gap-1.5 overflow-x-auto py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {portfolioCategories.map((c) => (
              <Link
                key={c.slug}
                href={`/work/${c.slug}`}
                className={`shrink-0 rounded-full border px-4 py-1.5 text-sm transition-colors ${
                  c.slug === cat.slug
                    ? "border-accent bg-accent-solid text-bg"
                    : "border-border text-fg-muted hover:border-accent hover:text-fg"
                }`}
              >
                {c.name}
              </Link>
            ))}
          </div>
        </Container>
      </div>

      {/* grid */}
      <section className="py-16 md:py-24">
        <Container>
          {images.length > 0 ? (
            <PortfolioGrid images={images} layout={cat.layout} name={cat.name} />
          ) : (
            <p className="text-fg-muted">Work in this category is coming soon.</p>
          )}
        </Container>
      </section>
    </>
  );
}
