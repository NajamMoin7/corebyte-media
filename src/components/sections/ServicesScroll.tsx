import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { services } from "@/lib/site";

// dedicated art per service (portrait)
const serviceImage: Record<string, string> = {
  "logo-design": "/images/services/logo-design.jpg",
  "graphic-design": "/images/services/graphic-design.jpg",
  "web-development": "/images/services/web-development.jpg",
  "ai-agents": "/images/services/ai-agents.jpg",
};

/**
 * Four services as alternating editorial rows: the card sits left, then right,
 * then left again, with the copy on the opposite side. Cards keep one size.
 */
export function ServicesScroll() {
  return (
    <section className="border-t border-border py-24 md:py-32">
      <Container>
        <div className="mb-16 flex flex-col gap-4 md:flex-row md:items-end md:justify-between md:mb-24">
          <div>
            <p className="eyebrow mb-5">What we do</p>
            <h2 className="font-display text-4xl font-black tracking-tight text-balance sm:text-5xl md:text-6xl">
              Four practices, one team.
            </h2>
          </div>
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-fg"
          >
            All services
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <div className="flex flex-col gap-20 md:gap-28">
          {services.map((svc, i) => {
            const flip = i % 2 === 1; // odd rows put the card on the right
            return (
              <div
                key={svc.slug}
                className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-16"
              >
                {/* card */}
                <Reveal className={flip ? "md:order-2" : "md:order-1"}>
                  <Link
                    href={`/services/${svc.slug}`}
                    className={`group relative block aspect-[4/5] w-full max-w-md overflow-hidden rounded-[20px] border border-border-strong ${
                      flip ? "md:ml-auto" : "md:mr-auto"
                    }`}
                  >
                    <Image
                      src={serviceImage[svc.slug] ?? svc.banner}
                      alt={svc.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 40vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-bg/70 via-transparent to-bg/20" />
                    <div className="absolute inset-x-0 top-0 flex items-center justify-between p-5">
                      <span className="font-mono text-sm text-fg/80">
                        {svc.index}
                      </span>
                      {svc.hot && (
                        <span className="rounded-full bg-accent-solid px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-bg">
                          Hot
                        </span>
                      )}
                    </div>
                  </Link>
                </Reveal>

                {/* copy */}
                <div className={flip ? "md:order-1" : "md:order-2"}>
                  <Reveal>
                    <span className="font-mono text-sm text-fg-dim">
                      {svc.index} / 04
                    </span>
                    <h3 className="mt-4 font-display text-4xl font-black tracking-tight md:text-5xl">
                      {svc.title}
                    </h3>
                    <p className="mt-5 max-w-md text-lg leading-relaxed text-fg-muted">
                      {svc.short}
                    </p>
                    <div className="mt-7 flex items-center gap-6">
                      <Link
                        href={`/services/${svc.slug}`}
                        className="group inline-flex items-center gap-2 rounded-full bg-accent-solid px-6 py-3 text-sm font-medium text-bg transition-transform active:scale-[0.98]"
                      >
                        Explore
                        <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </Link>
                      <span className="font-mono text-xs uppercase tracking-wider text-fg-dim">
                        {svc.subservices.length} specialisms
                      </span>
                    </div>
                  </Reveal>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
