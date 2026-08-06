"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from "motion/react";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { company, services } from "@/lib/site";
import { cn } from "@/lib/utils";

const mainLinks = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServices, setMobileServices] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  return (
    <>
      <header
        onMouseLeave={() => setServicesOpen(false)}
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
          scrolled || servicesOpen
            ? "border-b border-border bg-bg/80 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <nav className="mx-auto flex h-16 max-w-[1400px] items-center justify-between px-5 sm:px-8">
          <Link
            href="/"
            aria-label="Core Byte Media, home"
            className="flex shrink-0 items-center gap-2.5"
          >
            <Image
              src="/logo-white.png"
              alt=""
              width={48}
              height={48}
              priority
              className="h-12 w-12 object-contain"
            />
            <span className="font-display text-lg font-black leading-none tracking-tight text-fg">
              Core Byte<span className="text-fg-dim"> Media</span>
            </span>
          </Link>

          {/* desktop nav */}
          <div className="hidden items-center gap-1 lg:flex">
            <NavLink href="/" active={pathname === "/"}>
              Home
            </NavLink>

            <div
              onMouseEnter={() => setServicesOpen(true)}
              className="relative"
            >
              <Link
                href="/services"
                className={cn(
                  "flex items-center gap-1 rounded-full px-4 py-2 text-sm transition-colors",
                  pathname.startsWith("/services")
                    ? "text-fg"
                    : "text-fg-muted hover:text-fg",
                )}
              >
                Services
                <ChevronDown
                  className={cn(
                    "size-3.5 transition-transform",
                    servicesOpen && "rotate-180",
                  )}
                />
              </Link>
            </div>

            {mainLinks.slice(1).map((l) => (
              <NavLink
                key={l.href}
                href={l.href}
                active={pathname === l.href || pathname.startsWith(l.href + "/")}
              >
                {l.label}
              </NavLink>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link
              href={company.ctaHref}
              className="group hidden items-center gap-1.5 rounded-full bg-accent-solid px-5 py-2 text-sm font-medium text-bg transition-transform active:scale-[0.98] lg:inline-flex"
            >
              {company.ctaLabel}
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>

            <button
              type="button"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
              className="inline-flex size-10 items-center justify-center rounded-full border border-border text-fg lg:hidden"
            >
              {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </nav>

        {/* desktop mega-menu */}
        <AnimatePresence>
          {servicesOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-x-0 top-full hidden border-b border-border bg-bg/95 backdrop-blur-2xl lg:block"
            >
              <div className="mx-auto grid max-w-[1400px] grid-cols-4 gap-8 px-8 py-10">
                {services.map((svc) => (
                  <div key={svc.slug}>
                    <Link
                      href={`/services/${svc.slug}`}
                      onClick={() => setServicesOpen(false)}
                      className="group flex items-center gap-2"
                    >
                      <span className="font-mono text-xs text-fg-dim">
                        {svc.index}
                      </span>
                      <span className="font-display text-base font-bold tracking-tight text-fg transition-colors group-hover:text-accent">
                        {svc.title}
                      </span>
                      {svc.hot && (
                        <span className="rounded-full bg-accent-solid px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-bg">
                          Hot
                        </span>
                      )}
                    </Link>
                    <ul className="mt-4 space-y-2">
                      {svc.subservices.slice(0, 6).map((sub) => (
                        <li key={sub.slug}>
                          <Link
                            href={`/services/${svc.slug}/${sub.slug}`}
                            onClick={() => setServicesOpen(false)}
                            className="text-sm text-fg-muted transition-colors hover:text-fg"
                          >
                            {sub.name}
                          </Link>
                        </li>
                      ))}
                      <li>
                        <Link
                          href={`/services/${svc.slug}`}
                          onClick={() => setServicesOpen(false)}
                          className="inline-flex items-center gap-1 text-sm font-medium text-accent"
                        >
                          All {svc.subservices.length}
                          <ArrowUpRight className="size-3.5" />
                        </Link>
                      </li>
                    </ul>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 overflow-y-auto bg-bg/97 backdrop-blur-2xl lg:hidden"
          >
            <div className="flex min-h-full flex-col px-6 pb-10 pt-24">
              <ul className="flex flex-col gap-1">
                <MobileLink href="/" onClick={() => setMobileOpen(false)}>
                  Home
                </MobileLink>

                <li className="border-b border-border py-4">
                  <button
                    type="button"
                    onClick={() => setMobileServices((v) => !v)}
                    className="flex w-full items-center justify-between font-display text-3xl font-bold tracking-tight"
                  >
                    Services
                    <ChevronDown
                      className={cn(
                        "size-6 transition-transform",
                        mobileServices && "rotate-180",
                      )}
                    />
                  </button>
                  <AnimatePresence>
                    {mobileServices && (
                      <motion.ul
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        {services.map((svc) => (
                          <li key={svc.slug}>
                            <Link
                              href={`/services/${svc.slug}`}
                              onClick={() => setMobileOpen(false)}
                              className="flex items-center gap-2 py-3 pl-1 text-lg text-fg-muted"
                            >
                              {svc.title}
                              {svc.hot && (
                                <span className="rounded-full bg-accent-solid px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-bg">
                                  Hot
                                </span>
                              )}
                            </Link>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </li>

                {mainLinks.slice(1).map((l) => (
                  <MobileLink
                    key={l.href}
                    href={l.href}
                    onClick={() => setMobileOpen(false)}
                  >
                    {l.label}
                  </MobileLink>
                ))}
              </ul>

              <Link
                href={company.ctaHref}
                onClick={() => setMobileOpen(false)}
                className="mt-8 inline-flex items-center justify-center gap-2 rounded-full bg-accent-solid px-6 py-4 text-base font-medium text-bg"
              >
                {company.ctaLabel}
                <ArrowUpRight className="size-5" />
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function NavLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "rounded-full px-4 py-2 text-sm transition-colors",
        active ? "text-fg" : "text-fg-muted hover:text-fg",
      )}
    >
      {children}
    </Link>
  );
}

function MobileLink({
  href,
  onClick,
  children,
}: {
  href: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <li>
      <Link
        href={href}
        onClick={onClick}
        className="block border-b border-border py-4 font-display text-3xl font-bold tracking-tight"
      >
        {children}
      </Link>
    </li>
  );
}
