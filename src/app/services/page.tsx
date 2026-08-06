import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { BannerBg } from "@/components/ui/BannerBg";
import { services } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Logo design, graphic design, web development, and AI chatbots, delivered by one US team. Transparent pricing from $45.",
};

const serviceImage: Record<string, string> = {
  "logo-design": "/images/services/logo-design.jpg",
  "graphic-design": "/images/services/graphic-design.jpg",
  "web-development": "/images/services/web-development.jpg",
  "ai-agents": "/images/services/ai-agents.jpg",
};

export default function ServicesPage() {
  return (
    <>
      {/* hero */}
      <header className="relative overflow-hidden border-b border-border pt-36 pb-20 md:pt-44 md:pb-28">
        <BannerBg src="/images/banners/services.jpg" />
        <Container>
          <p className="eyebrow mb-6">Services</p>
          <Reveal>
            <h1 className="max-w-4xl font-display text-5xl font-black leading-[0.98] tracking-tight text-balance sm:text-6xl md:text-7xl">
              Strategy, craft, and systems that ship.
            </h1>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-7 max-w-xl text-lg leading-relaxed text-fg-muted">
              Logo design, graphic design, web development, and AI agents,
              delivered by one US team so your brand, product, and AI speak the
              same language. Pick one or hand us the whole thing.
            </p>
          </Reveal>

          {/* quick jump chips */}
          <Reveal delay={0.14}>
            <div className="mt-9 flex flex-wrap gap-2.5">
              {services.map((s) => (
                <a
                  key={s.slug}
                  href={`#${s.slug}`}
                  className="group inline-flex items-center gap-2 rounded-full border border-border bg-surface/50 px-4 py-2 text-sm text-fg-muted transition-colors hover:border-accent hover:text-fg"
                >
                  <span className="font-mono text-xs text-accent">{s.index}</span>
                  {s.title}
                  {s.hot && (
                    <span className="rounded-full bg-accent-solid px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-bg">
                      Hot
                    </span>
                  )}
                </a>
              ))}
            </div>
          </Reveal>
        </Container>
      </header>

      {/* immersive alternating service blocks */}
      <div>
        {services.map((s, i) => {
          const flip = i % 2 === 1;
          return (
            <section
              key={s.slug}
              id={s.slug}
              className="relative overflow-hidden border-b border-border py-24 md:py-32"
            >
              {/* section glow */}
              <div
                className={`pointer-events-none absolute top-1/4 -z-0 size-[34rem] rounded-full blur-[140px] ${
                  flip ? "right-0" : "left-0"
                }`}
                style={{
                  background:
                    "radial-gradient(circle, rgba(232,194,106,0.16), transparent 70%)",
                }}
              />
              <Container>
                <div className="relative grid grid-cols-1 items-center gap-12 md:grid-cols-12 md:gap-16">
                  {/* visual */}
                  <div className={`md:col-span-5 ${flip ? "md:order-2" : "md:order-1"}`}>
                    <Reveal>
                      <Link
                        href={`/services/${s.slug}`}
                        className="group relative block aspect-[4/5] overflow-hidden rounded-[22px] border border-border-strong"
                      >
                        <Image
                          src={serviceImage[s.slug] ?? s.banner}
                          alt={s.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 40vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-bg/70 via-transparent to-bg/10" />
                        <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5">
                          <span className="font-mono text-sm text-fg/80">
                            {s.index} / 04
                          </span>
                          {s.hot && (
                            <span className="rounded-full bg-accent-solid px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-bg">
                              Hot
                            </span>
                          )}
                        </div>
                        <span className="absolute bottom-5 left-5 inline-flex items-center gap-2 rounded-full border border-border-strong bg-bg/60 px-4 py-2 text-sm text-fg backdrop-blur-sm">
                          Explore
                          <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </span>
                      </Link>
                    </Reveal>
                  </div>

                  {/* content */}
                  <div className={`md:col-span-7 ${flip ? "md:order-1" : "md:order-2"}`}>
                    {/* giant index watermark */}
                    <span className="block font-display text-7xl font-black leading-none text-fg/[0.06] md:text-8xl">
                      {s.index}
                    </span>
                    <Reveal>
                      <h2 className="-mt-6 font-display text-4xl font-black tracking-tight sm:text-5xl md:text-6xl">
                        {s.title}
                      </h2>
                    </Reveal>
                    <p className="mt-5 max-w-xl text-lg leading-relaxed text-fg-muted">
                      {s.blurb}
                    </p>

                    <h3 className="eyebrow mb-4 mt-9">Capabilities</h3>
                    <ul className="grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2">
                      {s.capabilities.map((c) => (
                        <li
                          key={c}
                          className="flex items-start gap-3 text-fg-muted"
                        >
                          <Check className="mt-0.5 size-4 shrink-0 text-accent" />
                          {c}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-9 flex items-center gap-6">
                      <Link
                        href={`/services/${s.slug}`}
                        className="group inline-flex items-center gap-2 rounded-full bg-accent-solid px-6 py-3 text-sm font-medium text-bg transition-transform active:scale-[0.98]"
                      >
                        Explore {s.title}
                        <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </Link>
                      <span className="font-mono text-xs uppercase tracking-wider text-fg-dim">
                        {s.subservices.length} specialisms
                      </span>
                    </div>
                  </div>
                </div>
              </Container>
            </section>
          );
        })}
      </div>
    </>
  );
}
