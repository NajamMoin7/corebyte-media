import type { MetadataRoute } from "next";
import { services, allSubServiceParams } from "@/lib/site";
import { portfolioCategories } from "@/lib/portfolio";
import { posts } from "@/lib/posts";

const base = "https://corebytemedia.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/services",
    "/work",
    "/about",
    "/contact",
    "/blog",
    "/privacy",
    "/terms",
    "/cookies",
  ].map(
    (path) => ({
      url: `${base}${path}`,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.8,
    }),
  );

  const serviceRoutes = services.map((s) => ({
    url: `${base}/services/${s.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const subServiceRoutes = allSubServiceParams().map(({ slug, sub }) => ({
    url: `${base}/services/${slug}/${sub}`,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  const workRoutes = portfolioCategories.map((c) => ({
    url: `${base}/work/${c.slug}`,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const blogRoutes = posts.map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(p.updated ?? p.date),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...subServiceRoutes,
    ...workRoutes,
    ...blogRoutes,
  ];
}
