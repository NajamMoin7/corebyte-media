import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowUpRight, Check, ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { SubServiceStack } from "@/components/sections/SubServiceStack";
import { PricingTiers } from "@/components/sections/PricingTiers";
import { BannerBg } from "@/components/ui/BannerBg";
import { services, serviceProcess, getPackages } from "@/lib/site";
import { JsonLd } from "@/components/seo/JsonLd";
import { serviceSchema, breadcrumbSchema } from "@/lib/seo";
import {
  portfolioCategories,
  categoryCover,
  categoryCount,
} from "@/lib/portfolio";

// which portfolio categories to surface under each service
const relatedFor: Record<string, string[]> = {
  "logo-design": ["logos", "branding"],
  "graphic-design": ["graphic-design", "social-media"],
  "web-development": ["web-design", "ui-ux"],
  "ai-agents": ["ui-ux", "web-design"],
};

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) return {};
  return {
    title: `${service.title} Services (USA)`,
    description: service.short,
    alternates: { canonical: `/services/${service.slug}` },
  };
}

export default async function ServiceDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const steps = serviceProcess[service.slug] ?? [];
  const packages = getPackages(service.slug);
  const related = (relatedFor[service.slug] ?? [])
    .map((s) => portfolioCategories.find((c) => c.slug === s))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  const schemas: object[] = [
    breadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Services", url: "/services" },
      { name: service.title, url: `/services/${service.slug}` },
    ]),
  ];
  const svc = serviceSchema(service.slug);
  if (svc) schemas.push(svc);

  return (
    <>
      <JsonLd data={schemas} />
      {/* hero */}
      <header className="relative overflow-hidden border-b border-border pt-32 pb-16 md:pt-40 md:pb-20">
        <BannerBg src={service.banner} intensity="bold" />
        <Container>
          <Link
            href="/services"
            className="group mb-8 inline-flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-fg"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
            All services
          </Link>
          <p className="eyebrow mb-5">Service {service.index}</p>
          <Reveal>
            <h1 className="max-w-3xl font-display text-5xl font-semibold leading-[0.98] tracking-tight text-balance sm:text-6xl md:text-7xl">
              {service.title}
            </h1>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-fg-muted">
              {service.blurb}
            </p>
          </Reveal>
          <div className="mt-9">
            <MagneticButton href="/contact">
              Start a project
              <ArrowUpRight className="size-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </MagneticButton>
          </div>
        </Container>
      </header>

      {/* capabilities + deliverables */}
      <section className="border-b border-border py-20 md:py-28">
        <Container>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-7">
              <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
                What we cover
              </h2>
              <ul className="mt-8 grid grid-cols-1 gap-x-8 gap-y-4 sm:grid-cols-2">
                {service.capabilities.map((c) => (
                  <li key={c} className="flex items-start gap-3 text-fg-muted">
                    <Check className="mt-0.5 size-4 shrink-0 text-accent" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:col-span-5 md:border-l md:border-border md:pl-16">
              <h3 className="eyebrow mb-6">You walk away with</h3>
              <ul className="space-y-4">
                {service.deliverables.map((d) => (
                  <li
                    key={d}
                    className="border-b border-border pb-4 font-display text-xl tracking-tight"
                  >
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* sub-services — scroll-unlock stack */}
      <SubServiceStack serviceSlug={service.slug} items={service.subservices} />

      {/* process */}
      <section className="border-b border-border py-20 md:py-28">
        <Container>
          <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
            How we work
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-[14px] border border-border bg-border sm:grid-cols-2">
            {steps.map((step, i) => (
              <Reveal
                key={step.title}
                delay={i * 0.05}
                className="bg-bg p-8 md:p-10"
              >
                <span className="font-mono text-sm text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-display text-2xl font-medium tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-3 leading-relaxed text-fg-muted">{step.body}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* pricing */}
      {packages.length > 0 && (
        <section className="border-b border-border py-20 md:py-28">
          <Container>
            <div className="mb-12 max-w-2xl">
              <p className="eyebrow mb-5">Pricing</p>
              <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
                Packages for {service.title.toLowerCase()}.
              </h2>
              <p className="mt-4 leading-relaxed text-fg-muted">
                Transparent starting points. Every project is scoped to fit, so
                reach out if you need something in between.
              </p>
            </div>
            <PricingTiers packages={packages} />
          </Container>
        </section>
      )}

      {/* related work */}
      {related.length > 0 && (
        <section className="py-20 md:py-28">
          <Container>
            <div className="mb-12 flex items-end justify-between">
              <h2 className="font-display text-3xl font-semibold tracking-tight md:text-4xl">
                Related work
              </h2>
              <Link
                href="/work"
                className="group inline-flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-fg"
              >
                All work
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              {related.map((c) => {
                const cover = categoryCover(c);
                return (
                  <Link
                    key={c.slug}
                    href={`/work/${c.slug}`}
                    className="group block"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden rounded-[14px] border border-border bg-surface">
                      {cover && (
                        <Image
                          src={cover}
                          alt={c.name}
                          fill
                          sizes="(max-width: 640px) 100vw, 50vw"
                          className={
                            c.layout === "logo"
                              ? "bg-white object-contain p-16"
                              : "object-cover transition-all duration-700 group-hover:scale-[1.03]"
                          }
                        />
                      )}
                    </div>
                    <h3 className="mt-4 font-display text-xl font-medium tracking-tight transition-colors group-hover:text-accent">
                      {c.name}
                    </h3>
                    <p className="mt-1 font-mono text-xs uppercase tracking-wider text-fg-dim">
                      {categoryCount(c)} pieces
                    </p>
                  </Link>
                );
              })}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
