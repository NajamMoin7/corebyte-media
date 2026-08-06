import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

const stats = [
  { value: "120+", label: "Projects shipped" },
  { value: "8 yrs", label: "In the studio" },
  { value: "98", label: "Avg. Lighthouse score" },
  { value: "3", label: "Disciplines, one team" },
];

export function StatsBand() {
  return (
    <section className="border-y border-border bg-bg-elevated py-20 md:py-24">
      <Container>
        <div className="grid grid-cols-2 gap-y-12 md:grid-cols-4 md:gap-y-0">
          {stats.map((s, i) => (
            <Reveal
              key={s.label}
              delay={i * 0.06}
              className="md:border-l md:border-border md:px-8 md:first:border-l-0 md:first:pl-0"
            >
              <div className="font-display text-5xl font-semibold tracking-tight text-fg md:text-6xl">
                {s.value}
              </div>
              <div className="mt-3 font-mono text-xs uppercase tracking-wider text-fg-dim">
                {s.label}
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
