import manifest from "./portfolio-manifest.json";

/**
 * Portfolio is organised as flat top-level categories (no sub-categories),
 * mirroring the client portfolio brief. `dir` is the image folder on disk,
 * `slug` is the route segment. `layout` picks the grid treatment:
 *   - "logo"  : logos centered on light tiles (so dark marks stay visible)
 *   - "image" : full-bleed image cards (websites, branding, posts)
 */
export type PortfolioLayout = "logo" | "image" | "scroll";

export type PortfolioCategory = {
  slug: string;
  dir: keyof typeof manifest;
  name: string;
  blurb: string;
  layout: PortfolioLayout;
};

export const portfolioCategories: PortfolioCategory[] = [
  {
    slug: "logos",
    dir: "logos",
    name: "Logos",
    blurb: "Marks built to scale, from sketch to a system that holds anywhere.",
    layout: "logo",
  },
  {
    slug: "web-design",
    dir: "web_design",
    name: "Web Design",
    blurb: "Landing pages and products engineered to load fast and convert.",
    layout: "scroll",
  },
  {
    slug: "branding",
    dir: "branding",
    name: "Branding",
    blurb: "Full identity systems, color, type, and the rules that bind them.",
    layout: "image",
  },
  {
    slug: "ui-ux",
    dir: "ui-ux",
    name: "UI/UX",
    blurb: "Interfaces designed around the task, not the decoration.",
    layout: "image",
  },
  {
    slug: "social-media",
    dir: "social-media",
    name: "Social Media",
    blurb: "Scroll-stopping creative tuned for the feed it lives in.",
    layout: "image",
  },
  {
    slug: "graphic-design",
    dir: "graphic-design",
    name: "Graphic Design",
    blurb: "Print and digital collateral that carries the brand across surfaces.",
    layout: "image",
  },
];

export function getCategory(slug: string): PortfolioCategory | undefined {
  return portfolioCategories.find((c) => c.slug === slug);
}

export function categoryImages(cat: PortfolioCategory): string[] {
  return manifest[cat.dir] ?? [];
}

export function categoryCount(cat: PortfolioCategory): number {
  return categoryImages(cat).length;
}

export function categoryCover(cat: PortfolioCategory): string | undefined {
  return categoryImages(cat)[0];
}
