import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { JsonLd } from "@/components/seo/JsonLd";
import { blogPostingSchema, breadcrumbSchema } from "@/lib/seo";
import { posts, getPost, allPostsByDate } from "@/lib/posts";

export function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.keywords,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
    },
  };
}

const fmt = (d: string) =>
  new Date(d).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const more = allPostsByDate()
    .filter((p) => p.slug !== post.slug)
    .slice(0, 2);

  return (
    <article className="pt-32 pb-24 md:pt-40 md:pb-32">
      <JsonLd
        data={[
          blogPostingSchema(post),
          breadcrumbSchema([
            { name: "Home", url: "/" },
            { name: "Blog", url: "/blog" },
            { name: post.title, url: `/blog/${post.slug}` },
          ]),
        ]}
      />
      <Container>
        <Link
          href="/blog"
          className="group mb-8 inline-flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-fg"
        >
          <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-0.5" />
          All posts
        </Link>

        <div className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-wider text-fg-dim">
          <span className="text-accent">{post.category}</span>
          <span>·</span>
          <span>{fmt(post.date)}</span>
          <span>·</span>
          <span>{post.readMins} min read</span>
        </div>

        <Reveal>
          <h1 className="max-w-3xl font-display text-4xl font-black leading-[1.02] tracking-tight text-balance sm:text-5xl md:text-6xl">
            {post.title}
          </h1>
        </Reveal>

        <div className="mt-12 max-w-2xl space-y-6">
          {post.body.map((b, i) => {
            if (b.type === "h2") {
              return (
                <h2
                  key={i}
                  className="pt-4 font-display text-2xl font-bold tracking-tight md:text-3xl"
                >
                  {b.text}
                </h2>
              );
            }
            if (b.type === "ul") {
              return (
                <ul key={i} className="space-y-2.5 pl-5">
                  {b.items.map((it) => (
                    <li
                      key={it}
                      className="list-disc leading-relaxed text-fg-muted marker:text-accent"
                    >
                      {it}
                    </li>
                  ))}
                </ul>
              );
            }
            return (
              <p key={i} className="text-lg leading-relaxed text-fg-muted">
                {b.text}
              </p>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-14 max-w-2xl rounded-[18px] border border-border bg-bg-elevated p-8">
          <h2 className="font-display text-2xl font-bold tracking-tight">
            Ready to start?
          </h2>
          <p className="mt-3 text-fg-muted">
            Tell us what you are building. We reply within two business days.
          </p>
          <div className="mt-6">
            <MagneticButton href="/contact">
              Start a project
              <ArrowUpRight className="size-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </MagneticButton>
          </div>
        </div>

        {/* more posts */}
        {more.length > 0 && (
          <div className="mt-16 border-t border-border pt-10">
            <h2 className="eyebrow mb-6">More reading</h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {more.map((p) => (
                <Link
                  key={p.slug}
                  href={`/blog/${p.slug}`}
                  className="group rounded-[14px] border border-border p-6 transition-colors hover:border-border-strong"
                >
                  <span className="font-mono text-xs uppercase tracking-wider text-accent">
                    {p.category}
                  </span>
                  <h3 className="mt-2 font-display text-xl font-medium tracking-tight transition-colors group-hover:text-accent">
                    {p.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        )}
      </Container>
    </article>
  );
}
