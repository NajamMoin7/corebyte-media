import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MessageSquare, Phone } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/sections/ContactForm";
import { company, services, socials } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Start a project with Core Byte Media. Tell us what you're building and we'll reply within two business days.",
};

export default function ContactPage() {
  return (
    <header className="relative overflow-hidden pt-36 pb-24 md:pt-44 md:pb-32">
      <div className="circuit-grid absolute inset-0 -z-10 opacity-40" />
      <Container>
        <div className="grid grid-cols-1 gap-16 md:grid-cols-12 md:gap-20">
          {/* left: pitch + details */}
          <div className="md:col-span-5">
            <p className="eyebrow mb-6">Contact</p>
            <Reveal>
              <h1 className="font-display text-5xl font-semibold leading-[0.98] tracking-tight text-balance sm:text-6xl">
                Tell us what you&apos;re building.
              </h1>
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-7 max-w-md text-lg leading-relaxed text-fg-muted">
                Brand, website, AI agent, or all three. Share the shape of it and
                we&apos;ll come back within two business days.
              </p>
            </Reveal>

            <div className="mt-10 space-y-4">
              <a
                href={`mailto:${company.email}`}
                className="flex items-center gap-3 text-fg-muted transition-colors hover:text-fg"
              >
                <Mail className="size-5 text-accent" />
                {company.email}
              </a>
              {company.phone && (
                <a
                  href={company.phoneHref}
                  className="flex items-center gap-3 text-fg-muted transition-colors hover:text-fg"
                >
                  <Phone className="size-5 text-accent" />
                  {company.phone}
                </a>
              )}
              <div className="flex items-center gap-3 text-fg-muted">
                <MessageSquare className="size-5 text-accent" />
                Or ask the agent in the corner, any time.
              </div>
            </div>

            <div className="mt-10 border-t border-border pt-8">
              <h2 className="eyebrow mb-4">What we do</h2>
              <ul className="flex flex-wrap gap-2">
                {services.map((s) => (
                  <li key={s.slug}>
                    <Link
                      href={`/services/${s.slug}`}
                      className="rounded-full border border-border bg-surface px-3.5 py-1.5 text-sm text-fg-muted transition-colors hover:text-fg"
                    >
                      {s.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 flex gap-4">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-xs uppercase tracking-wider text-fg-dim transition-colors hover:text-fg"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </div>

          {/* right: form */}
          <div className="md:col-span-7">
            <ContactForm />
          </div>
        </div>
      </Container>
    </header>
  );
}
