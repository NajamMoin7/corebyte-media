/* Scrolling ticker of what we offer. One marquee per page. */

const offerings = [
  "Logo Design",
  "Brand Identity",
  "Graphic Design",
  "Web Development",
  "Next.js Websites",
  "Landing Pages",
  "Shopify & E-commerce",
  "UI / UX Design",
  "AI Chatbots",
  "WhatsApp Chatbots",
  "Custom AI Agents",
  "RAG Assistants",
  "Workflow Automation",
  "Social Media Design",
  "Pitch & Sales Decks",
  "Packaging Design",
];

export function ToolsMarquee() {
  const row = [...offerings, ...offerings];
  return (
    <section className="border-y border-border bg-bg-elevated py-10">
      <div className="marquee-pause relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">
        <div className="animate-marquee flex w-max items-center gap-10 pr-10">
          {row.map((name, i) => (
            <div
              key={`${name}-${i}`}
              className="flex shrink-0 items-center gap-10 text-fg-muted"
            >
              <span className="size-1.5 shrink-0 rounded-full bg-accent" />
              <span className="font-mono text-sm uppercase tracking-wider">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
