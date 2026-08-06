import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

/**
 * Consistent header for inner pages. Clears the fixed nav and sets the page
 * title + intro. Eyebrow is optional and rationed by the caller.
 */
export function PageHeader({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  intro?: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="relative overflow-hidden border-b border-border pt-36 pb-16 md:pt-44 md:pb-24">
      <div className="circuit-grid absolute inset-0 -z-10 opacity-60" />
      <Container>
        {eyebrow && <p className="eyebrow mb-6">{eyebrow}</p>}
        <Reveal>
          <h1 className="max-w-5xl font-display text-5xl font-semibold leading-[0.98] tracking-tight text-balance sm:text-6xl md:text-7xl">
            {title}
          </h1>
        </Reveal>
        {intro && (
          <Reveal delay={0.08}>
            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-fg-muted">
              {intro}
            </p>
          </Reveal>
        )}
        {children}
      </Container>
    </header>
  );
}
