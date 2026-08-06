import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { company, navLinks, services, socials } from "@/lib/site";

export function Footer() {
  return (
    <footer className="relative border-t border-border bg-bg-elevated">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-8">
        {/* CTA band */}
        <div className="flex flex-col gap-8 border-b border-border py-16 md:flex-row md:items-end md:justify-between md:py-24">
          <div className="max-w-2xl">
            <p className="eyebrow mb-5">Let&apos;s build</p>
            <h2 className="font-display text-4xl font-semibold tracking-tight text-balance sm:text-5xl md:text-6xl">
              Have something in mind? Let&apos;s make it real.
            </h2>
          </div>
          <Link
            href={company.ctaHref}
            className="group inline-flex w-fit items-center gap-2 rounded-full bg-accent-solid px-7 py-4 text-base font-medium text-bg transition-transform active:scale-[0.98]"
          >
            {company.ctaLabel}
            <ArrowUpRight className="size-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* link columns */}
        <div className="grid grid-cols-2 gap-10 py-16 md:grid-cols-4">
          <div className="col-span-2 md:col-span-1">
            <Image
              src="/logo-white.png"
              alt="Core Byte Media"
              width={120}
              height={120}
              className="h-20 w-auto opacity-90"
            />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-fg-muted">
              {company.tagline}
            </p>
          </div>

          <FooterCol title="Navigate">
            {navLinks.map((l) => (
              <FooterLink key={l.href} href={l.href}>
                {l.label}
              </FooterLink>
            ))}
          </FooterCol>

          <FooterCol title="Services">
            {services.map((s) => (
              <FooterLink key={s.slug} href={`/services/${s.slug}`}>
                {s.title}
              </FooterLink>
            ))}
          </FooterCol>

          <FooterCol title="Connect">
            {company.phone && (
              <FooterLink href={company.phoneHref}>{company.phone}</FooterLink>
            )}
            <FooterLink href={`mailto:${company.email}`}>{company.email}</FooterLink>
            {company.address.length > 0 && (
              <li className="text-sm not-italic leading-relaxed text-fg-muted">
                {company.address.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </li>
            )}
            {socials.length > 0 && (
              <li className="mt-2 flex items-center gap-3">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="flex size-10 items-center justify-center rounded-full border border-border text-fg-muted transition-colors hover:border-accent hover:text-fg"
                  >
                    {s.icon === "facebook" && <FacebookIcon className="size-4" />}
                    {s.icon === "instagram" && <InstagramIcon className="size-4" />}
                    {s.icon === "threads" && <ThreadsIcon className="size-4" />}
                    {s.icon === "whatsapp" && <WhatsAppIcon className="size-4" />}
                    {s.icon === "trustpilot" && <TrustpilotIcon className="size-4" />}
                    {s.icon === "clutch" && <ClutchIcon className="size-4" />}
                  </a>
                ))}
              </li>
            )}
          </FooterCol>
        </div>

        {/* baseline */}
        <div className="flex flex-col gap-4 border-t border-border py-8 text-sm text-fg-dim md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {company.name}. All rights reserved.
          </p>
          <nav className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link href="/privacy" className="transition-colors hover:text-fg">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-fg">
              Terms &amp; Conditions
            </Link>
            <Link href="/cookies" className="transition-colors hover:text-fg">
              Cookie Policy
            </Link>
          </nav>
          <p className="font-mono text-xs uppercase tracking-[0.2em]">
            Design / Engineering / AI
          </p>
        </div>
      </div>
    </footer>
  );
}

// lucide dropped brand glyphs; small inline Facebook mark instead.
function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H7v3h3v6h3v-6h3l.6-3H13v-2c0-.6.4-1 1-1z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M12 2c2.7 0 3 0 4.1.1 1 0 1.7.2 2.3.4.6.3 1.1.6 1.6 1.1s.8 1 1.1 1.6c.2.6.4 1.3.4 2.3.1 1.1.1 1.4.1 4.1s0 3-.1 4.1c0 1-.2 1.7-.4 2.3-.3.6-.6 1.1-1.1 1.6s-1 .8-1.6 1.1c-.6.2-1.3.4-2.3.4-1.1.1-1.4.1-4.1.1s-3 0-4.1-.1c-1 0-1.7-.2-2.3-.4-.6-.3-1.1-.6-1.6-1.1s-.8-1-1.1-1.6c-.2-.6-.4-1.3-.4-2.3C2 15 2 14.7 2 12s0-3 .1-4.1c0-1 .2-1.7.4-2.3.3-.6.6-1.1 1.1-1.6S4.6 3.2 5.2 3c.6-.2 1.3-.4 2.3-.4C8.6 2 9 2 12 2zm0 1.8c-2.7 0-3 0-4 .1-.8 0-1.2.2-1.5.3-.4.1-.6.3-.9.6s-.4.5-.6.9c-.1.3-.3.7-.3 1.5-.1 1-.1 1.3-.1 4s0 3 .1 4c0 .8.2 1.2.3 1.5.1.4.3.6.6.9s.5.4.9.6c.3.1.7.3 1.5.3 1 .1 1.3.1 4 .1s3 0 4-.1c.8 0 1.2-.2 1.5-.3.4-.1.6-.3.9-.6s.4-.5.6-.9c.1-.3.3-.7.3-1.5.1-1 .1-1.3.1-4s0-3-.1-4c0-.8-.2-1.2-.3-1.5-.1-.4-.3-.6-.6-.9s-.5-.4-.9-.6c-.3-.1-.7-.3-1.5-.3-1-.1-1.3-.1-4-.1zm0 3.1a5.1 5.1 0 1 1 0 10.2 5.1 5.1 0 0 1 0-10.2zm0 1.8a3.3 3.3 0 1 0 0 6.6 3.3 3.3 0 0 0 0-6.6zm5.3-3.2a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4z" />
    </svg>
  );
}

// Official Threads glyph.
function ThreadsIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291a13.853 13.853 0 0 1 3.02.142c-.126-.742-.375-1.332-.75-1.757-.513-.586-1.308-.883-2.359-.89h-.029c-.844 0-1.992.232-2.721 1.32L7.734 7.847c.98-1.454 2.568-2.256 4.478-2.256h.044c3.194.02 5.097 1.975 5.287 5.388.108.046.216.094.321.142 1.49.7 2.58 1.761 3.154 3.07.797 1.82.871 4.79-1.548 7.158-1.85 1.81-4.094 2.628-7.277 2.65Z" />
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M17.5 14.4c-.3-.2-1.7-.8-1.9-.9-.3-.1-.4-.1-.6.1-.2.3-.7.9-.8 1-.2.2-.3.2-.6.1-1.5-.8-2.5-1.4-3.5-3.1-.3-.5.3-.4.8-1.4.1-.2 0-.4 0-.5 0-.1-.6-1.5-.8-2-.2-.5-.4-.5-.6-.5h-.5c-.2 0-.5.1-.7.4-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3 1.8.8 2.5.8 3.4.7.5-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3zM12 2a10 10 0 0 0-8.6 15l-1.3 4.7 4.8-1.3A10 10 0 1 0 12 2zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-2.9.8.8-2.8-.2-.3A8.2 8.2 0 1 1 12 20.2z" />
    </svg>
  );
}

// Trustpilot mark = its signature star.
function TrustpilotIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="m12 2 2.9 6.6 7.1.6-5.4 4.7 1.6 7L12 17.7 5.8 21l1.6-7L2 9.2l7.1-.6L12 2z" />
    </svg>
  );
}

// Clutch mark = its open "C" arc.
function ClutchIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.6}
      strokeLinecap="round"
      aria-hidden
      className={className}
    >
      <path d="M19 7.5a8 8 0 1 0 0 9" />
      <circle cx="12" cy="12" r="2.4" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FooterCol({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <h3 className="eyebrow mb-4">{title}</h3>
      <ul className="flex flex-col gap-3">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  children,
  external,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  return (
    <li>
      <Link
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="text-sm text-fg-muted transition-colors hover:text-fg"
      >
        {children}
      </Link>
    </li>
  );
}
