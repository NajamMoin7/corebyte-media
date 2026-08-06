import Link from "next/link";
import { ArrowUpRight, Check } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import type { Package } from "@/lib/site";

/**
 * Three-tier pricing grid. The middle (popular) tier is lifted with the accent.
 */
export function PricingTiers({ packages }: { packages: Package[] }) {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
      {packages.map((p, i) => (
        <Reveal key={p.name} delay={i * 0.05}>
          <div
            className={`relative flex h-full flex-col rounded-[18px] border p-7 md:p-8 ${
              p.popular
                ? "border-accent bg-accent-solid/[0.06]"
                : "border-border bg-surface/40"
            }`}
          >
            {p.popular && (
              <span className="absolute -top-3 left-7 rounded-full bg-accent-solid px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-bg">
                Most popular
              </span>
            )}
            <h3 className="font-display text-xl font-bold tracking-tight">
              {p.name}
            </h3>
            <div className="mt-3 flex items-baseline gap-1">
              <span className="font-display text-4xl font-black tracking-tight">
                {p.price}
              </span>
              {p.period && (
                <span className="font-mono text-sm text-fg-dim">{p.period}</span>
              )}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-fg-muted">
              {p.blurb}
            </p>
            <ul className="mt-6 space-y-3 border-t border-border pt-6">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm text-fg-muted">
                  <Check className="mt-0.5 size-4 shrink-0 text-accent" />
                  {f}
                </li>
              ))}
            </ul>
            <Link
              href="/contact"
              className={`group mt-7 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-transform active:scale-[0.98] ${
                p.popular
                  ? "bg-accent-solid text-bg"
                  : "border border-border-strong text-fg hover:border-accent"
              }`}
            >
              Get started
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
