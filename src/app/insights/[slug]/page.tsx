// LOOP-3-AGENTIC-SEO: server component that wraps the client InsightDetailView
// and exports `generateMetadata` so each /insights/[slug] route gets unique
// title + description + OG/Twitter overrides + a per-route Article JSON-LD
// blob (headline, datePublished, author, keywords from the tag). The actual
// page rendering (sticky header, sections, CTA) lives in ./view.tsx as a
// "use client" component — it uses useParams + useState, none of which run
// server-side.

import type { Metadata } from "next";
import { INSIGHTS, type InsightDetail } from "./insights-data";
import { InsightDetailView } from "./view";

const SITE_URL = "https://taungoo-sigma-lab.vercel.app";

type Params = Promise<{ slug: string }>;

// LOOP-3-AGENTIC-SEO: datePublished expects ISO 8601 (YYYY-MM-DD). The data
// stores dates as "YYYY.MM.DD" (dot-separated) — convert to dashes here.
function isoDate(d: string): string {
  return d.replace(/\./g, "-");
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const insight = INSIGHTS[slug];
  if (!insight) {
    return {
      title: "Insight Not Found",
      description: "The requested research insight does not exist.",
      robots: { index: false, follow: false },
    };
  }
  const description = insight.abstract;
  return {
    title: insight.title,
    description,
    alternates: { canonical: `/insights/${slug}` },
    openGraph: {
      title: `${insight.title} — Taungoo Sigma Lab`,
      description,
      type: "article",
      url: `${SITE_URL}/insights/${slug}`,
      siteName: "Taungoo Sigma Lab",
      publishedTime: isoDate(insight.date),
      authors: insight.authors.split(",").map((a) => a.trim()),
      tags: [insight.tag],
    },
    twitter: {
      card: "summary_large_image",
      title: `${insight.title} — Taungoo Sigma Lab`,
      description,
    },
    keywords: [insight.tag, "research", "Taungoo Sigma Lab"],
  };
}

function buildArticleJsonLd(slug: string, insight: InsightDetail) {
  // Split "NEURAL HAND, THE ARCHITECT" into [{ @type: Person, name: ... }, ...]
  const authors = insight.authors
    .split(",")
    .map((a) => a.trim())
    .filter(Boolean)
    .map((name) => ({
      "@type": "Person",
      name,
    }));
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${SITE_URL}/insights/${slug}#article`,
    headline: insight.title,
    alternativeHeadline: insight.tag,
    description: insight.abstract,
    url: `${SITE_URL}/insights/${slug}`,
    datePublished: isoDate(insight.date),
    dateModified: isoDate(insight.date),
    inLanguage: "en",
    articleSection: insight.tag,
    keywords: [insight.tag, "research", "Taungoo Sigma Lab"],
    wordCount: insight.sections.reduce((n, s) => n + s.body.split(/\s+/).length, 0),
    author: authors,
    publisher: { "@id": `${SITE_URL}/#organization` },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/insights/${slug}`,
    },
    isPartOf: { "@id": `${SITE_URL}/#website` },
  };
}

export default async function InsightDetailRoute({ params }: { params: Params }) {
  const { slug } = await params;
  const insight = INSIGHTS[slug];
  return (
    <>
      {insight && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(buildArticleJsonLd(slug, insight)) }}
        />
      )}
      <InsightDetailView />
    </>
  );
}
