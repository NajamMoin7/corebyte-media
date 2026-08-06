"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { HeroAgentCard } from "@/components/sections/HeroAgentCard";
import { company } from "@/lib/site";

const ease = [0.16, 1, 0.3, 1] as const;

// Words that swap in the headline accent slot. AI agents leads (hot service).
const rotating = ["AI agents", "brands", "websites"];

export function HomeHero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative flex min-h-dvh items-center overflow-hidden">
      {/* video bg behind text (circuit traces) — poster image is also the
          reduced-motion / no-JS fallback so a still always shows */}
      {reduce ? (
        <Image
          src="/images/hero/hero-poster.jpg"
          alt=""
          fill
          priority
          className="-z-30 object-cover opacity-[0.22]"
        />
      ) : (
        <video
          className="absolute inset-0 -z-30 h-full w-full object-cover opacity-[0.28]"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/images/hero/hero-poster.jpg"
        >
          <source src="/video/hero.mp4" type="video/mp4" />
        </video>
      )}
      {/* darken + gold tint so the green traces sit under the brand accent */}
      <div className="absolute inset-0 -z-20 bg-bg/55" />
      <div
        className="absolute inset-0 -z-20"
        style={{ background: "radial-gradient(120% 90% at 20% 30%, rgba(232,194,106,0.18), transparent 60%)" }}
      />
      <div className="circuit-grid absolute inset-0 -z-20 opacity-30" />
      <div
        className="absolute left-1/4 top-1/3 -z-20 size-[46rem] -translate-x-1/2 rounded-full blur-[150px]"
        style={{ background: "radial-gradient(circle, rgba(232,194,106,0.20), transparent 68%)" }}
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-48 bg-gradient-to-t from-bg to-transparent" />

      <div className="mx-auto grid w-full max-w-[1400px] grid-cols-1 items-center gap-14 px-5 pt-28 sm:px-8 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-7">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="eyebrow mb-7"
        >
          Design / Engineering / Applied AI
        </motion.p>

        <h1 className="max-w-2xl font-display text-5xl font-black leading-[0.92] tracking-tight text-balance sm:text-6xl md:text-7xl">
          {/* "core" is the brand's own wordplay, the way "logic" was before it */}
          {["We build the", "core behind great"].map((line, i) => (
            <span key={line} className="block overflow-hidden">
              <motion.span
                className="block"
                initial={{ y: "110%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.9, delay: 0.1 + i * 0.1, ease }}
              >
                {line}
              </motion.span>
            </span>
          ))}
          <span className="block overflow-hidden">
            <motion.span
              className="block text-accent"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.9, delay: 0.3, ease }}
            >
              <RotatingWord />
            </motion.span>
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55, ease }}
          className="mt-8 max-w-xl text-lg leading-relaxed text-fg-muted"
        >
          One US team for logo and brand design, fast websites, and AI chatbots.
          From first sketch to a shipped, living system.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.68, ease }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          <MagneticButton href={company.ctaHref}>
            {company.ctaLabel}
            <ArrowUpRight className="size-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </MagneticButton>
          <MagneticButton href="/work" variant="outline">
            See our work
          </MagneticButton>
        </motion.div>
        </div>

        {/* live agent chat card */}
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5, ease }}
          className="flex justify-center md:col-span-5 md:justify-end"
        >
          <HeroAgentCard />
        </motion.div>
      </div>
    </section>
  );
}

function RotatingWord() {
  const reduce = useReducedMotion();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % rotating.length),
      2600,
    );
    return () => clearInterval(id);
  }, [reduce]);

  const word = rotating[index];

  if (reduce) {
    return (
      <span className="whitespace-nowrap">
        {word}
        <span className="text-fg">.</span>
      </span>
    );
  }

  return (
    <span className="relative inline-flex h-[1.05em] items-baseline align-bottom">
      <AnimatePresence mode="wait">
        <motion.span key={word} className="inline-flex whitespace-nowrap">
          {word.split("").map((ch, i) => (
            <motion.span
              key={`${word}-${i}`}
              className="inline-block"
              initial={{ y: "55%", opacity: 0, filter: "blur(8px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              exit={{ y: "-45%", opacity: 0, filter: "blur(8px)" }}
              transition={{
                duration: 0.5,
                delay: i * 0.035,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {ch === " " ? " " : ch}
            </motion.span>
          ))}
          <span className="text-fg">.</span>
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
