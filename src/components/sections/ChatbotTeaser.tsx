import Link from "next/link";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function ChatbotTeaser() {
  return (
    <section className="py-24 md:py-32">
      <Container>
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 md:gap-20">
          <Reveal>
            <h2 className="font-display text-4xl font-semibold tracking-tight text-balance sm:text-5xl md:text-6xl">
              The kind of agent we&apos;d build you is already here.
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-fg-muted">
              The assistant in the corner of this site is a working agentic
              chatbot. Ask it about our services, process, or work, and see the
              experience we ship to clients.
            </p>
            <div className="mt-9">
              <MagneticButton href="/contact">
                Talk to the agent
                <ArrowUpRight className="size-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </MagneticButton>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="rounded-[18px] border border-border bg-surface/60 p-5 backdrop-blur-sm">
              <div className="flex items-center gap-2 border-b border-border pb-4">
                <span className="flex size-7 items-center justify-center rounded-full bg-accent-solid text-bg">
                  <Sparkles className="size-4 text-bg" />
                </span>
                <span className="text-sm font-medium">Core Byte Agent</span>
                <span className="ml-auto flex items-center gap-1.5 font-mono text-xs text-fg-dim">
                  <span className="size-1.5 rounded-full bg-emerald-400" />
                  online
                </span>
              </div>

              <div className="space-y-3 py-5">
                <Bubble who="user">What do you actually do?</Bubble>
                <Bubble who="agent">
                  Three things, deeply: brand design, web engineering, and
                  agentic AI. Want an example of each, or are you scoping a
                  specific project?
                </Bubble>
              </div>

              <Link
                href="/contact"
                className="flex items-center justify-between rounded-full border border-border-strong px-5 py-3 text-sm text-fg-dim transition-colors hover:text-fg"
              >
                Ask about our work…
                <ArrowUpRight className="size-4" />
              </Link>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function Bubble({
  who,
  children,
}: {
  who: "user" | "agent";
  children: React.ReactNode;
}) {
  if (who === "user") {
    return (
      <div className="flex justify-end">
        <p className="max-w-[80%] rounded-2xl rounded-br-sm bg-accent-solid px-4 py-2.5 text-sm text-bg">
          {children}
        </p>
      </div>
    );
  }
  return (
    <div className="flex justify-start">
      <p className="max-w-[85%] rounded-2xl rounded-bl-sm bg-bg px-4 py-2.5 text-sm text-fg-muted">
        {children}
      </p>
    </div>
  );
}
