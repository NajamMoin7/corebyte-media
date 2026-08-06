import { Container } from "@/components/ui/Container";

export function LegalLayout({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <article className="pt-36 pb-24 md:pt-44 md:pb-32">
      <Container>
        <p className="eyebrow mb-5">Legal</p>
        <h1 className="font-display text-4xl font-black tracking-tight text-balance sm:text-5xl md:text-6xl">
          {title}
        </h1>
        <p className="mt-4 font-mono text-xs uppercase tracking-wider text-fg-dim">
          Last updated {updated}
        </p>
        <div className="mt-12 max-w-2xl space-y-8 leading-relaxed text-fg-muted [&_a]:text-accent [&_a:hover]:underline [&_h2]:mt-10 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:tracking-tight [&_h2]:text-fg [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5">
          {children}
        </div>
      </Container>
    </article>
  );
}
