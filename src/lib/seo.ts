import { company, services, getPackages, profileLinks } from "@/lib/site";

export const SITE_URL = "https://corebytemedia.vercel.app";

// Shared FAQ content (rendered on the page AND emitted as FAQPage schema).
export const faqs = [
  {
    q: "How much does a project cost?",
    a: "It depends on scope, but we publish honest starting points on every service page. Logos start at $45, sites at $200, and AI agents at $300. Tell us the brief and we will scope an exact number.",
  },
  {
    q: "How long does a project take?",
    a: "A landing page can ship in days. A full brand or multi-page site is usually a few weeks. AI agents depend on the integrations involved. We give you a timeline before we start, not after.",
  },
  {
    q: "Do you work with existing brands?",
    a: "Yes. We extend and refine identities as often as we build them from scratch. If you already have brand assets, we treat them as the starting point, not a constraint to ignore.",
  },
  {
    q: "Can you build and run an AI chatbot for us?",
    a: "Yes. The agent in the corner of this site is the kind of thing we build, grounded in your content, wired to real actions, and deployed with monitoring so it keeps improving.",
  },
  {
    q: "Do you offer ongoing support?",
    a: "We do. Most clients move to a monthly retainer for design, web, or agent upkeep after launch. You own the code and assets either way.",
  },
  {
    q: "How do we get started?",
    a: "Send us the brief through the form below or email info@corebytemedia.com. We read every enquiry and reply within two business days.",
  },
];

// Organization / ProfessionalService — the core entity for search + AI engines.
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#organization`,
    name: company.name,
    alternateName: company.shortName,
    url: SITE_URL,
    logo: `${SITE_URL}/icon.png`,
    image: `${SITE_URL}/opengraph-image`,
    description:
      "Core Byte Media is a US-based design, web development, and applied-AI studio. We build logos and brand systems, fast animated websites, and agentic AI chatbots.",
    email: company.email,
    ...(company.phone ? { telephone: company.phone } : {}),
    priceRange: "$$",
    areaServed: { "@type": "Country", name: "United States" },
    address: { "@type": "PostalAddress", addressCountry: "US" },
    contactPoint: {
      "@type": "ContactPoint",
      ...(company.phone ? { telephone: company.phone } : {}),
      email: company.email,
      contactType: "sales",
      areaServed: "US",
      availableLanguage: "English",
    },
    knowsAbout: [
      "Logo design",
      "Brand identity",
      "Graphic design",
      "Web development",
      "Next.js development",
      "AI agents",
      "AI chatbots",
      "WhatsApp chatbots",
      "Workflow automation",
    ],
    sameAs: profileLinks,
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: company.name,
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en-US",
  };
}

export function faqSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function serviceSchema(slug: string) {
  const s = services.find((x) => x.slug === slug);
  if (!s) return null;
  const pkgs = getPackages(slug);
  const prices = pkgs.map((p) => Number(p.price.replace(/[^0-9.]/g, ""))).filter(Boolean);
  const low = prices.length ? Math.min(...prices) : undefined;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: s.title,
    serviceType: s.title,
    description: s.short,
    url: `${SITE_URL}/services/${s.slug}`,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: { "@type": "Country", name: "United States" },
    ...(low
      ? {
          offers: {
            "@type": "AggregateOffer",
            priceCurrency: "USD",
            lowPrice: low,
            offerCount: pkgs.length,
          },
        }
      : {}),
  };
}

export function blogPostingSchema(post: {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  updated?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    url: `${SITE_URL}/blog/${post.slug}`,
    mainEntityOfPage: `${SITE_URL}/blog/${post.slug}`,
    image: `${SITE_URL}/opengraph-image`,
    author: { "@id": `${SITE_URL}/#organization` },
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: `${SITE_URL}${it.url}`,
    })),
  };
}
