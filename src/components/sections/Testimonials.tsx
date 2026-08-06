import { ArrowUpRight, Quote, Star } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { socials } from "@/lib/site";

type Testimonial = {
  quote: string;
  name: string;
  title: string;
};

const testimonials: Testimonial[] = [
  {
    quote:
      "I am very pleased with the website created for me. The designer was professional, responsive, and attentive to my requests throughout the process. The final website reflects my vision as an author, minister, and publisher. Communication was excellent, revisions were handled promptly, and the overall quality exceeded my expectations. I highly recommend their services to anyone looking for a professional and attractive website.",
    name: "Latré Pleasure Lawson",
    title:
      "Author, USIDHR Certified Human Rights Consultant, Minister of MIJEC Ministries & Esmeranda House Publishers",
  },
];

export function Testimonials() {
  if (testimonials.length === 0) return null;

  return (
    <section className="border-t border-border py-24 md:py-32">
      <Container>
        <p className="eyebrow mb-5">Testimonials</p>
        <Reveal>
          <h2 className="max-w-2xl font-display text-4xl font-black tracking-tight text-balance sm:text-5xl">
            What clients say after we ship.
          </h2>
        </Reveal>

        <div
          className={`mt-16 grid grid-cols-1 gap-px overflow-hidden rounded-[16px] border border-border bg-border ${
            testimonials.length > 1 ? "md:grid-cols-2" : ""
          }`}
        >
          {testimonials.map((t, i) => (
            <Reveal
              key={t.name}
              delay={i * 0.06}
              className="flex flex-col gap-6 bg-bg p-8 md:p-10"
            >
              <Quote className="size-7 shrink-0 text-accent" />
              <blockquote className="text-lg leading-relaxed text-fg-muted">
                {t.quote}
              </blockquote>
              <div className="mt-auto border-t border-border pt-6">
                <div className="font-display text-lg font-semibold tracking-tight text-fg">
                  {t.name}
                </div>
                <div className="mt-1 text-sm leading-relaxed text-fg-dim">
                  {t.title}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {(trustpilot || clutch) && (
          <Reveal delay={0.1} className="mt-10 flex flex-wrap gap-3">
            {trustpilot && (
              <a
                href={trustpilot.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 rounded-full border border-border bg-surface px-5 py-3 text-sm text-fg-muted transition-colors hover:border-accent hover:text-fg"
              >
                <span className="flex items-center gap-0.5 text-accent">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-4 fill-current" />
                  ))}
                </span>
                Read our reviews on Trustpilot
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            )}
            {clutch && (
              <a
                href={clutch.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-3 rounded-full border border-border bg-surface px-5 py-3 text-sm text-fg-muted transition-colors hover:border-accent hover:text-fg"
              >
                <span className="flex items-center gap-0.5 text-accent">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-4 fill-current" />
                  ))}
                </span>
                See us on Clutch
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            )}
          </Reveal>
        )}
      </Container>
    </section>
  );
}

const trustpilot = socials.find((s) => s.icon === "trustpilot");
const clutch = socials.find((s) => s.icon === "clutch");
