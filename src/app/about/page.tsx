import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { BannerBg } from "@/components/ui/BannerBg";

export const metadata: Metadata = {
  title: "About",
  description:
    "Core Byte Media is a US design, web development, and AI studio. Meet the team behind our logo design, websites, and AI agents, and how we work.",
};

const values = [
  {
    title: "Range over silos",
    body: "Design, code, and AI are one craft to us. The person who draws the brand can reason about how the agent should behave.",
  },
  {
    title: "Craft is the argument",
    body: "We don't pitch with adjectives. The work, the motion, and the details make the case before we say a word.",
  },
  {
    title: "Ship, then prove it",
    body: "We measure what we make: Lighthouse, conversion, resolution rate. Taste plus evidence, never one without the other.",
  },
  {
    title: "Plain over clever",
    body: "Clear copy, honest interfaces, code your team can read. Cleverness that needs explaining isn't clever.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* hero */}
      <header className="relative overflow-hidden border-b border-border pt-36 pb-20 md:pt-44 md:pb-28">
        <BannerBg src="/images/banners/about.jpg" />
        <Container>
          <p className="eyebrow mb-6">About</p>
          <Reveal>
            <h1 className="max-w-4xl font-display text-5xl font-semibold leading-[0.98] tracking-tight text-balance sm:text-6xl md:text-7xl">
              A studio built where design, code, and AI meet.
            </h1>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-fg-muted">
              Core Byte Media started with a simple frustration: great ideas
              kept dying in the handoffs between designers, developers, and the
              new wave of AI. So we built one US team that does logo and brand
              design, web development, and AI agents under one roof.
            </p>
          </Reveal>
        </Container>
      </header>

      {/* story */}
      <section className="py-24 md:py-32">
        <Container>
          <div className="md:pl-[16vw]">
            <Reveal>
              <p className="max-w-3xl font-display text-3xl font-medium leading-[1.18] tracking-tight text-balance sm:text-4xl">
                We&apos;ve shipped brands, products, and agents for founders and
                teams across logistics, health, commerce, and software. The
                throughline is never the medium. It&apos;s{" "}
                <em className="not-italic text-accent">making one clear idea</em>{" "}
                travel from a sketch to something people use every day.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* values */}
      <section className="border-y border-border py-24 md:py-32">
        <Container>
          <h2 className="mb-14 font-display text-4xl font-semibold tracking-tight sm:text-5xl">
            What we believe.
          </h2>
          <div className="grid grid-cols-1 gap-px overflow-hidden rounded-[14px] border border-border bg-border md:grid-cols-2">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.05} className="bg-bg p-8 md:p-12">
                <span className="font-mono text-sm text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-4 font-display text-2xl font-medium tracking-tight md:text-3xl">
                  {v.title}
                </h3>
                <p className="mt-4 max-w-md leading-relaxed text-fg-muted">
                  {v.body}
                </p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
