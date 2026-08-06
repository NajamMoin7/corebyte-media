import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { BannerBg } from "@/components/ui/BannerBg";
import { PricingTiers } from "@/components/sections/PricingTiers";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo";
import { getSubContent } from "@/lib/subservice-content";
import {
  allSubServiceParams,
  getSubService,
  serviceProcess,
  getPackages,
} from "@/lib/site";

export function generateStaticParams() {
  return allSubServiceParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; sub: string }>;
}): Promise<Metadata> {
  const { slug, sub } = await params;
  const found = getSubService(slug, sub);
  if (!found) return {};
  return {
    title: `${found.sub.name} · ${found.service.title}`,
    description: found.sub.blurb,
    alternates: { canonical: `/services/${slug}/${sub}` },
  };
}

export default async function SubServicePage({
  params,
}: {
  params: Promise<{ slug: string; sub: string }>;
}) {
  const { slug, sub } = await params;
  const found = getSubService(slug, sub);
  if (!found) notFound();

  const { service, sub: subService } = found;
  const steps = serviceProcess[service.slug] ?? [];
  const packages = getPackages(service.slug);
  const content = getSubContent(subService.slug);
  const siblings = service.subservices.filter((x) => x.slug !== subService.slug);

  const faqLd = content
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
          {
            "@type": "Question",
            name: content.faq.q,
            acceptedAnswer: { "@type": "Answer", text: content.faq.a },
          },
        ],
      }
    : null;

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Services", url: "/services" },
            { name: service.title, url: `/services/${service.slug}` },
            {
              name: subService.name,
              url: `/services/${service.slug}/${subService.slug}`,
            },
          ]),
          ...(faqLd ? [faqLd] : []),
        ]}
      />
      {/* hero */}
      <header className="relative overflow-hidden border-b border-border pt-32 pb-16 md:pt-40 md:pb-20">
        <BannerBg src={service.banner} intensity="bold" />
        <Container>
          {/* breadcrumb */}
          <nav className="mb-8 flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-wider text-fg-dim">
            <Link href="/services" className="transition-colors hover:text-fg">
              Services
            </Link>
            <span>/</span>
            <Link
              href={`/services/${service.slug}`}
              className="transition-colors hover:text-fg"
            >
              {service.title}
            </Link>
            <span>/</span>
            <span className="text-accent">{subService.name}</span>
          </nav>

          <p className="eyebrow mb-5">{subService.group}</p>
          <Reveal>
            <h1 className="max-w-3xl font-display text-4xl font-black leading-[1.0] tracking-tight text-balance sm:text-6xl md:text-7xl">
              {subService.name}
            </h1>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-fg-muted md:text-xl">
              {subService.blurb}
            </p>
          </Reveal>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <MagneticButton href="/contact">
              Start a project
              <ArrowUpRight className="size-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </MagneticButton>
            <Link
              href={`/services/${service.slug}`}
              className="group inline-flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-fg"
            >
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
              Back to {service.title}
            </Link>
          </div>
        </Container>
      </header>

      {/* unique overview + what's included (per sub-service) */}
      {content && (
        <section className="border-b border-border py-20 md:py-28">
          <Container>
            <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
              <div className="md:col-span-7">
                <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
                  {subService.name} that works
                </h2>
                <p className="mt-5 max-w-xl text-lg leading-relaxed text-fg-muted">
                  {content.intro}
                </p>
              </div>
              <div className="md:col-span-5 md:border-l md:border-border md:pl-16">
                <h3 className="eyebrow mb-6">What&apos;s included</h3>
                <ul className="space-y-4">
                  {content.includes.map((it) => (
                    <li key={it} className="flex items-start gap-3 text-fg-muted">
                      <Check className="mt-0.5 size-4 shrink-0 text-accent" />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Container>
        </section>
      )}

      {/* what you get */}
      <section className="border-b border-border py-20 md:py-28">
        <Container>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-5">
              <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
                Part of our {service.title.toLowerCase()} practice
              </h2>
              <p className="mt-5 max-w-md leading-relaxed text-fg-muted">
                {service.blurb}
              </p>
            </div>
            <div className="md:col-span-7 md:border-l md:border-border md:pl-16">
              <h3 className="eyebrow mb-6">You walk away with</h3>
              <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {service.deliverables.map((d) => (
                  <li key={d} className="flex items-start gap-3 text-fg-muted">
                    <Check className="mt-0.5 size-4 shrink-0 text-accent" />
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* process */}
      <section className="border-b border-border py-20 md:py-28">
        <Container>
          <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
            How we work
          </h2>
          <div className="mt-12 grid grid-cols-1 gap-px overflow-hidden rounded-[14px] border border-border bg-border sm:grid-cols-2">
            {steps.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.05} className="bg-bg p-8 md:p-10">
                <span className="font-mono text-sm text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-display text-2xl font-bold tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-3 leading-relaxed text-fg-muted">{step.body}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* faq */}
      {content && (
        <section className="border-b border-border py-20 md:py-28">
          <Container>
            <div className="max-w-3xl">
              <p className="eyebrow mb-5">FAQ</p>
              <h2 className="font-display text-2xl font-bold tracking-tight md:text-3xl">
                {content.faq.q}
              </h2>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-fg-muted">
                {content.faq.a}
              </p>
            </div>
          </Container>
        </section>
      )}

      {/* packages */}
      {packages.length > 0 && (
        <section className="border-b border-border py-20 md:py-28">
          <Container>
            <div className="mb-12 max-w-2xl">
              <p className="eyebrow mb-5">Packages</p>
              <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
                {subService.name} packages.
              </h2>
              <p className="mt-4 leading-relaxed text-fg-muted">
                Pick a starting point for your {subService.name.toLowerCase()}{" "}
                project. Need something custom? We scope every brief to fit.
              </p>
            </div>
            <PricingTiers packages={packages} />
          </Container>
        </section>
      )}

      {/* siblings */}
      <section className="py-20 md:py-28">
        <Container>
          <div className="mb-10 flex items-end justify-between gap-4">
            <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
              More in {service.title}
            </h2>
            <Link
              href={`/services/${service.slug}`}
              className="group inline-flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-fg"
            >
              View all
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
          <ul className="flex flex-wrap gap-2.5">
            {siblings.map((sib) => (
              <li key={sib.slug}>
                <Link
                  href={`/services/${service.slug}/${sib.slug}`}
                  className="inline-block rounded-full border border-border bg-surface px-4 py-2 text-sm text-fg-muted transition-colors hover:border-accent hover:text-fg"
                >
                  {sib.name}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </>
  );
}
