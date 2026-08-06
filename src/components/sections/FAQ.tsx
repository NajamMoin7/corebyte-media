import { Plus } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { JsonLd } from "@/components/seo/JsonLd";
import { faqs, faqSchema } from "@/lib/seo";

export function FAQ() {
  return (
    <section className="border-t border-border py-24 md:py-32">
      <JsonLd data={faqSchema()} />
      <Container>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
          <div className="md:col-span-4">
            <p className="eyebrow mb-5">FAQ</p>
            <h2 className="font-display text-4xl font-black tracking-tight text-balance sm:text-5xl">
              Questions, answered.
            </h2>
            <p className="mt-5 max-w-sm leading-relaxed text-fg-muted">
              The things people ask before they start. Still unsure? The agent
              or the form below has you covered.
            </p>
          </div>

          <div className="md:col-span-8">
            <div className="border-t border-border">
              {faqs.map((f) => (
                <details
                  key={f.q}
                  className="group border-b border-border py-5"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-display text-lg font-medium tracking-tight transition-colors group-open:text-accent [&::-webkit-details-marker]:hidden">
                    {f.q}
                    <Plus className="size-5 shrink-0 text-fg-dim transition-transform duration-300 group-open:rotate-45 group-open:text-accent" />
                  </summary>
                  <p className="mt-4 max-w-2xl leading-relaxed text-fg-muted">
                    {f.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
