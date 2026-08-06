/**
 * Single source of truth for site-wide content: company facts, navigation,
 * services, sub-services, and contact.
 */

// Placeholder contact details. `phone`, `whatsapp`, and `address` are
// intentionally empty: every render site guards on them, so the phone row,
// the WhatsApp buttons, and the address block simply do not render until real
// values are filled in here. Never ship a fake tel:/wa.me number.
export const company = {
  name: "Core Byte Media",
  shortName: "Core Byte",
  tagline: "Logo design, web development, and AI chatbots under one roof. US-based.",
  email: "info@corebytemedia.com",
  address: [] as string[],
  phone: "",
  phoneHref: "",
  whatsapp: "",
  whatsappHref: "",
  ctaLabel: "Start a project",
  ctaHref: "/contact",
} as const;

export type NavLink = { label: string; href: string };

// Top-level nav (footer + mobile). The desktop navbar adds the Services mega-menu.
export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/work" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export type SubService = { slug: string; name: string; blurb: string; group: string };

export type Service = {
  slug: string;
  index: string;
  title: string;
  short: string;
  blurb: string;
  hot?: boolean;
  banner: string;
  capabilities: string[];
  deliverables: string[];
  subservices: SubService[];
};

const s = (slug: string, name: string, blurb: string, group: string): SubService => ({
  slug,
  name,
  blurb,
  group,
});

export const services: Service[] = [
  {
    slug: "logo-design",
    index: "01",
    title: "Logo Design",
    short: "Affordable, custom logo design and brand marks built to scale anywhere.",
    blurb:
      "We do custom logo design as systems, not single icons. A mark with a clear idea behind it, drawn to work at every size and in every context, with the rules to keep it consistent. Affordable logo design that scales from favicon to billboard.",
    banner: "/images/banners/logo-design-v2.jpg",
    capabilities: [
      "Concept & strategy",
      "Custom mark design",
      "Type & lettering",
      "Responsive logo families",
      "Usage rules & files",
      "Redesign & refresh",
    ],
    deliverables: [
      "Primary & secondary marks",
      "Full file package (SVG, PNG, PDF)",
      "Clear-space & usage rules",
      "Color & mono variants",
    ],
    subservices: [
      s("abstract-logos", "Abstract logos", "Symbolic marks that capture an idea in pure form, not a literal picture.", "Marks"),
      s("minimal-logos", "Minimal logos", "Stripped-back marks built to stay legible and scale everywhere.", "Marks"),
      s("wordmark-lettermark", "Wordmark & lettermark", "Type-led logos where the name itself becomes the mark.", "Marks"),
      s("monogram-logos", "Monogram logos", "Initials locked into a single, memorable symbol.", "Marks"),
      s("mascot-logos", "Mascot & character logos", "Characters that give a brand personality and warmth.", "Marks"),
      s("emblem-badge-logos", "Emblem & badge logos", "Contained, crest-style marks with a heritage feel.", "Marks"),
      s("logo-redesign", "Logo redesign & refresh", "Modernize an existing mark without losing its hard-won equity.", "Systems"),
      s("responsive-logo-systems", "Responsive logo systems", "A family of marks that adapts from favicon to billboard.", "Systems"),
    ],
  },
  {
    slug: "graphic-design",
    index: "02",
    title: "Graphic Design",
    short: "Graphic design services: brand identity, social, print, and decks that hold up everywhere.",
    blurb:
      "Beyond the logo, the full visual language. Our graphic design services cover brand identity, type, color, layout, and the templates that let your team stay on brand from a business card to a billboard.",
    banner: "/images/banners/graphic-design-v2.jpg",
    capabilities: [
      "Brand identity & guidelines",
      "Marketing & campaign design",
      "Print & packaging",
      "Pitch decks & data viz",
      "Social & ad creative",
      "Template systems",
    ],
    deliverables: [
      "Brand guidelines document",
      "Color & type tokens",
      "Template & asset library",
      "Print-ready files",
    ],
    subservices: [
      s("brand-identity-systems", "Brand identity systems", "Type, color, grid, and rules that keep a brand coherent everywhere.", "Identity"),
      s("brand-guidelines", "Brand guideline books", "The single source of truth that keeps every team on brand.", "Identity"),
      s("stationery-design", "Stationery design", "The everyday brand touchpoints, designed as a set.", "Collateral"),
      s("business-cards", "Business cards", "A small surface that still sets the tone for the brand.", "Collateral"),
      s("letterheads-invoices", "Letterheads & invoices", "On-brand documents for the unglamorous but important moments.", "Collateral"),
      s("email-signatures", "Email signatures", "A consistent sign-off across the whole company.", "Collateral"),
      s("menu-card-design", "Menu card design", "Menus that read clearly and look the part.", "Marketing & print"),
      s("flyers-brochures", "Flyers & brochures", "Print pieces that carry the message and the brand.", "Marketing & print"),
      s("posters-banners", "Posters & banners", "Large-format design built to be seen from across the room.", "Marketing & print"),
      s("packaging-labels", "Packaging & labels", "Design that sells on the shelf and survives the supply chain.", "Marketing & print"),
      s("signage-environmental", "Signage & environmental", "Wayfinding and space graphics that extend the brand into the world.", "Marketing & print"),
      s("social-media-kits", "Social media kits", "Templates that keep your feed consistent and fast to produce.", "Digital & social"),
      s("ad-creatives", "Ad creatives", "Performance-minded creative built to test and scale.", "Digital & social"),
      s("pitch-sales-decks", "Pitch & sales decks", "Decks that make the argument and look expensive doing it.", "Digital & social"),
      s("infographics-data-viz", "Infographics & data viz", "Complex information made clear and on-brand.", "Digital & social"),
      s("merch-apparel-graphics", "Merch & apparel graphics", "Brand graphics built for fabric and the real world.", "Digital & social"),
    ],
  },
  {
    slug: "web-development",
    index: "03",
    title: "Web Development",
    short: "Small-business websites and web apps built in Next.js to load fast and convert.",
    blurb:
      "Next.js and React web development for small businesses and startups. Websites and web apps that load fast, score green on Core Web Vitals, and still feel alive with motion and 3D where it earns its place.",
    banner: "/images/banners/web-development-v2.jpg",
    capabilities: [
      "Marketing & landing sites",
      "Web apps & dashboards",
      "Headless CMS & e-commerce",
      "3D / WebGL experiences",
      "Performance & accessibility",
      "Animation & interaction",
    ],
    deliverables: [
      "Production Next.js codebase",
      "CMS & content model",
      "Analytics & SEO setup",
      "CI/CD & handover docs",
    ],
    subservices: [
      s("landing-pages", "Landing pages", "Single-purpose pages built to convert, fast.", "Sites & marketing"),
      s("marketing-websites", "Marketing websites", "Multi-page sites that tell the story and rank well.", "Sites & marketing"),
      s("portfolio-agency-sites", "Portfolio & agency sites", "Showcase sites where the craft is the pitch.", "Sites & marketing"),
      s("webgl-3d-experiences", "WebGL / 3D experiences", "Real-time 3D and scroll-driven moments that feel premium.", "Sites & marketing"),
      s("animation-interaction", "Animation & interaction", "Motion that communicates, not motion for show.", "Sites & marketing"),
      s("wordpress-development", "WordPress development", "Custom themes and a CMS your team can actually run.", "Platforms & CMS"),
      s("webflow-nocode", "Webflow & no-code", "Fast, editable sites without a heavy build.", "Platforms & CMS"),
      s("headless-cms", "Headless CMS", "Sanity, Contentful, and friends wired to a modern front end.", "Platforms & CMS"),
      s("blog-content-platforms", "Blog & content platforms", "Publishing setups built for SEO and scale.", "Platforms & CMS"),
      s("multilingual-sites", "Multi-language sites", "Localized experiences that respect every market.", "Platforms & CMS"),
      s("shopify-stores", "Shopify stores", "Custom storefronts that sell and stay maintainable.", "Commerce"),
      s("headless-ecommerce", "Headless e-commerce", "Commerce backends behind a fast custom front end.", "Commerce"),
      s("b2b-wholesale-ordering", "Wholesale & B2B ordering", "Bulk pricing, net terms, and ordering tools that fit how you sell.", "Commerce"),
      s("subscriptions-memberships", "Subscriptions & memberships", "Recurring revenue flows built right.", "Commerce"),
      s("payment-integrations", "Payment integrations", "Stripe and friends, wired in cleanly and securely.", "Commerce"),
      s("web-apps-dashboards", "Web apps & dashboards", "Data-dense product UI that stays fast and usable.", "Apps & engineering"),
      s("saas-frontends", "SaaS product front ends", "The interface layer for your product, built to scale.", "Apps & engineering"),
      s("api-backend-integration", "API & backend integration", "Connecting your front end to the systems that run the business.", "Apps & engineering"),
      s("auth-user-systems", "Auth & user systems", "Sign-in, roles, and accounts done securely.", "Apps & engineering"),
      s("performance-seo", "Performance & SEO", "Core Web Vitals, structured data, and the technical wins.", "Apps & engineering"),
      s("maintenance-support", "Maintenance & support", "Ongoing care so the site keeps earning its keep.", "Apps & engineering"),
    ],
  },
  {
    slug: "ai-agents",
    index: "04",
    title: "Agentic AI",
    short: "AI chatbots and custom agents for small business: web, WhatsApp, and automation.",
    hot: true,
    blurb:
      "We design, build, and deploy AI chatbots and custom agents for small business: lead-qualifying website chatbots, WhatsApp chatbots, RAG knowledge assistants, and workflow automation wired into your real tools and data.",
    banner: "/images/banners/ai-agents-v2.jpg",
    capabilities: [
      "Agentic chatbots & copilots",
      "RAG & knowledge assistants",
      "Workflow & tool-using agents",
      "Voice & multimodal interfaces",
      "Model routing & evaluation",
      "Deployment & observability",
    ],
    deliverables: [
      "Deployed agent & API",
      "Knowledge base & retrieval",
      "Guardrails & evals",
      "Dashboard & monitoring",
    ],
    subservices: [
      s("website-chatbots", "Website chatbots", "On-site assistants that answer, qualify, and route.", "Chatbots"),
      s("whatsapp-chatbots", "WhatsApp chatbots", "Automated conversations where your customers already are.", "Chatbots"),
      s("instagram-messenger-bots", "Instagram & Messenger bots", "Social DMs handled automatically, on brand.", "Chatbots"),
      s("slack-discord-bots", "Slack & Discord bots", "Internal and community bots that get real work done.", "Chatbots"),
      s("telegram-bots", "Telegram bots", "Fast, scriptable bots for support and automation.", "Chatbots"),
      s("leadgen-booking-bots", "Lead-gen & booking bots", "Capture, qualify, and book, without a human in the loop.", "Chatbots"),
      s("customer-support-agents", "Customer support agents", "Agents that resolve tickets end-to-end and escalate with context.", "Agents"),
      s("sales-outreach-agents", "Sales & outreach agents", "Agents that research, personalize, and follow up.", "Agents"),
      s("research-analyst-agents", "Research & analyst agents", "Agents that gather, synthesize, and report.", "Agents"),
      s("voice-agents", "Voice agents", "Natural voice interfaces for support and intake.", "Agents"),
      s("multi-agent-systems", "Multi-agent systems", "Coordinated agents that divide and conquer complex work.", "Agents"),
      s("n8n-automation-agents", "n8n automation agents", "Tool-using agents orchestrated through n8n workflows.", "Automation"),
      s("make-zapier-workflows", "Make & Zapier workflows", "Connecting your stack with smart, automated flows.", "Automation"),
      s("document-email-automation", "Document & email automation", "Drafting, parsing, and routing handled by agents.", "Automation"),
      s("crm-tool-integrations", "CRM & tool integrations", "Agents wired into the systems your business runs on.", "Automation"),
      s("scheduled-event-agents", "Scheduled & event agents", "Agents that fire on a cron or a trigger and act autonomously.", "Automation"),
      s("rag-knowledge-assistants", "RAG knowledge assistants", "Assistants grounded in your docs and data.", "Foundations"),
      s("custom-llm-integrations", "Custom LLM integrations", "The right model, wired into your product cleanly.", "Foundations"),
      s("ai-content-pipelines", "AI content pipelines", "Automated content generation with a human in control.", "Foundations"),
      s("ai-image-media-pipelines", "AI image & media pipelines", "Generated visuals and media at scale, on brand.", "Foundations"),
      s("evals-guardrails-monitoring", "Evals, guardrails & monitoring", "The safety and quality layer that makes agents trustworthy.", "Foundations"),
    ],
  },
];

export function getService(slug: string) {
  return services.find((x) => x.slug === slug);
}

export function getSubService(serviceSlug: string, subSlug: string) {
  const svc = getService(serviceSlug);
  const sub = svc?.subservices.find((x) => x.slug === subSlug);
  return svc && sub ? { service: svc, sub } : null;
}

export function allSubServiceParams() {
  return services.flatMap((svc) =>
    svc.subservices.map((sub) => ({ slug: svc.slug, sub: sub.slug })),
  );
}

export type ProcessStep = { title: string; body: string };

export const serviceProcess: Record<string, ProcessStep[]> = {
  "logo-design": [
    { title: "Discovery", body: "We learn the brand, the audience, and what the mark has to carry before sketching anything." },
    { title: "Concepts", body: "Two or three distinct directions, each with a rationale. You pick one; we don't design by committee." },
    { title: "Refinement", body: "We sharpen the chosen mark across sizes, colors, and contexts until it holds up everywhere." },
    { title: "Delivery", body: "Every file format, clear-space rules, and variants, packaged for your team." },
  ],
  "graphic-design": [
    { title: "Audit & strategy", body: "We map your market, audience, and current assets, then decide what the brand needs to say." },
    { title: "Concept directions", body: "Two or three distinct visual territories, each with a rationale." },
    { title: "System design", body: "Type, color, grid, and the rules that hold them together across every surface." },
    { title: "Rollout & guidelines", body: "Tokens, templates, and a living guideline so your team stays on brand." },
  ],
  "web-development": [
    { title: "Scope & architecture", body: "We define the content model, routes, and rendering strategy before a line of UI." },
    { title: "Design in code", body: "Components built straight in the stack, reviewed live, no lossy handoff." },
    { title: "Build & integrate", body: "Next.js, your CMS, your data, your auth. Fast and accessible by default." },
    { title: "Ship & hand over", body: "CI/CD, analytics, SEO, and docs. A codebase your team can own." },
  ],
  "ai-agents": [
    { title: "Use-case & data", body: "We find the workflow worth automating and the data the agent needs to do it." },
    { title: "Agent design", body: "Tools, retrieval, memory, and guardrails. What the agent can do and where it must defer." },
    { title: "Build & evaluate", body: "We wire it into your systems and measure it with real evals before anyone trusts it." },
    { title: "Deploy & observe", body: "Shipped behind monitoring and dashboards, with a feedback loop so it improves." },
  ],
};

// Social profiles. `icon` maps to a lucide icon key handled in the footer.
// Empty until Core Byte Media's own profiles exist: the footer, contact page,
// and the Trustpilot/Clutch review strip all guard on this list, so an empty
// array renders nothing rather than a dead link.
export const socials: {
  label: string;
  href: string;
  icon: "facebook" | "instagram" | "threads" | "whatsapp" | "trustpilot" | "clutch";
}[] = [];

// Public profile URLs that prove the brand's identity to search/AI engines.
// Feeds schema.org `sameAs`. WhatsApp is a contact link, not a profile, so it
// is excluded.
export const profileLinks: string[] = socials
  .filter((s) => s.icon !== "whatsapp")
  .map((s) => s.href);

export type Package = {
  name: string;
  price: string;
  period?: string;
  blurb: string;
  features: string[];
  popular?: boolean;
};

// Three packages per service. Shown on each service page and, framed for the
// specific specialism, on every sub-service page.
export const servicePackages: Record<string, Package[]> = {
  "logo-design": [
    {
      name: "Essentials",
      price: "$45",
      blurb: "A clean, single mark for new ventures that need to launch.",
      features: [
        "2 logo concepts",
        "2 revision rounds",
        "Final PNG, SVG, PDF",
        "Light & dark versions",
      ],
    },
    {
      name: "Signature",
      price: "$120",
      blurb: "A complete logo system with the variants real brands need.",
      features: [
        "4 logo concepts",
        "Unlimited revisions",
        "Full file set + source",
        "Icon, wordmark, lockups",
        "Mini usage sheet",
      ],
      popular: true,
    },
    {
      name: "Brand Mark",
      price: "$250",
      blurb: "The mark plus the rules and assets to roll it out everywhere.",
      features: [
        "Everything in Signature",
        "Color & type direction",
        "Social avatar kit",
        "Full logo guidelines",
        "Favicon & app icon",
      ],
    },
  ],
  "graphic-design": [
    {
      name: "Single Asset",
      price: "$45",
      blurb: "One polished, on-brand piece of collateral, fast.",
      features: [
        "1 design asset",
        "2 revision rounds",
        "Print & digital export",
        "Source file included",
      ],
    },
    {
      name: "Collateral Pack",
      price: "$250",
      blurb: "A coordinated set of branded collateral across surfaces.",
      features: [
        "Up to 6 assets",
        "Unlimited revisions",
        "Print-ready + web files",
        "Editable templates",
        "Brand-consistent system",
      ],
      popular: true,
    },
    {
      name: "Design Retainer",
      price: "$600",
      period: "/mo",
      blurb: "An on-call design team for whatever the month needs.",
      features: [
        "Rolling design queue",
        "Priority turnaround",
        "Dedicated designer",
        "Monthly strategy call",
        "Source files always",
      ],
    },
  ],
  "web-development": [
    {
      name: "Landing Page",
      price: "$200",
      blurb: "One fast, animated page engineered to convert.",
      features: [
        "Single page, responsive",
        "Custom design in code",
        "Basic SEO + analytics",
        "Contact form",
        "Deployed live",
      ],
    },
    {
      name: "Business Site",
      price: "$550",
      blurb: "A multi-page site with a CMS your team can run.",
      features: [
        "Up to 6 pages",
        "Headless CMS",
        "Motion & interactions",
        "SEO + performance pass",
        "Training & handover",
      ],
      popular: true,
    },
    {
      name: "Custom Build",
      price: "$1,000",
      blurb: "Apps, commerce, and integrations built to last.",
      features: [
        "App or e-commerce",
        "Auth & integrations",
        "Custom data model",
        "CI/CD pipeline",
        "Ongoing support option",
      ],
    },
  ],
  "ai-agents": [
    {
      name: "Starter Bot",
      price: "$300",
      blurb: "A single-channel assistant that handles the FAQs.",
      features: [
        "1 channel (web or chat)",
        "Knowledge-base answers",
        "Human handoff",
        "Basic analytics",
        "Hosted & monitored",
      ],
    },
    {
      name: "Pro Agent",
      price: "$750",
      blurb: "A multi-channel agent that takes real actions.",
      features: [
        "Multi-channel deploy",
        "Tools & actions",
        "Retrieval + memory",
        "Guardrails & evals",
        "Dashboard & logging",
      ],
      popular: true,
    },
    {
      name: "Autonomous Workflow",
      price: "$1,500+",
      blurb: "Custom agents wired into your stack and automations.",
      features: [
        "Bespoke agent design",
        "System integrations",
        "n8n / workflow automation",
        "Continuous evaluation",
        "SLA & observability",
      ],
    },
  ],
};

export function getPackages(serviceSlug: string): Package[] {
  return servicePackages[serviceSlug] ?? [];
}
