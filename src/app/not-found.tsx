import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <section className="relative flex min-h-dvh items-center overflow-hidden">
      <div className="circuit-grid absolute inset-0 -z-10 opacity-60" />
      <div
        className="absolute left-1/2 top-1/2 -z-10 size-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]"
        style={{ background: "radial-gradient(circle, rgba(232,194,106,0.16), transparent 70%)" }}
      />
      <Container>
        <p className="font-mono text-sm uppercase tracking-[0.25em] text-accent">
          Error 404
        </p>
        <h1 className="mt-6 font-display text-6xl font-semibold leading-[0.95] tracking-tight sm:text-8xl">
          Signal lost.
        </h1>
        <p className="mt-6 max-w-md text-lg leading-relaxed text-fg-muted">
          This page is off the grid. The trace doesn&apos;t lead anywhere, but
          the rest of the studio is right here.
        </p>
        <Link
          href="/"
          className="group mt-9 inline-flex items-center gap-2 rounded-full bg-accent-solid px-7 py-4 text-base font-medium text-bg transition-transform active:scale-[0.98]"
        >
          <ArrowLeft className="size-5 transition-transform group-hover:-translate-x-0.5" />
          Back home
        </Link>
      </Container>
    </section>
  );
}
