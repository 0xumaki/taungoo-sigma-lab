// LOOP-3-AGENTIC-SEO: dynamic sitemap generated from the canonical service,
// project, and insight datasets (single source of truth — same data the
// detail pages + JSON-LD blobs read from). Replaces the static
// public/sitemap.xml which only listed the 11 sigma-mode ?s=NN deep-links
// and was missing all 27 service + 9 portfolio + 9 insight detail routes.
//
// Next.js App Router auto-serves this at /sitemap.xml (200 OK with
// application/xml content-type). The static public/sitemap.xml file is
// now considered a fallback for crawlers that don't follow the
// Next-generated route — it has been kept on disk but the dynamic route
// takes precedence.
//
// Last-modified timestamps:
//   - Static routes: use the build's static "2025-01-01T00:00:00.000Z" anchor
//     (no real git-history plumbing on the server, so a stable past date
//     is fine — crawlers re-crawl based on changefreq, not lastmod alone).
//   - Service routes: same static anchor (no per-service date metadata).
//   - Portfolio + insights: use the dataset's `created` / `date` field —
//     these are real "date published" values from the data files.

import type { MetadataRoute } from "next";
import { SERVICES } from "./services/[slug]/services-data";
import { PROJECTS } from "./portfolio/[slug]/projects-data";
import { INSIGHTS } from "./insights/[slug]/insights-data";

const SITE_URL = "https://taungoo-sigma-lab.vercel.app";

// ISO 8601 timestamp for static-content routes with no per-route date.
const STATIC_LASTMOD = "2025-01-01T00:00:00.000Z";

// Convert "YYYY.MM.DD" (insights) → "YYYY-MM-DDTHH:mm:ss.sssZ" (ISO 8601).
function isoFromDotted(d: string): string {
  return d.replace(/\./g, "-") + "T00:00:00.000Z";
}

export default function sitemap(): MetadataRoute.Sitemap {
  // ─── STATIC ROUTES ──────────────────────────────────────────────────
  // Homepage + the 11 sigma-mode ?s=NN sector deep-links (kept from the
  // prior static sitemap for back-compat with any external links).
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: STATIC_LASTMOD,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    // The 11 sigma-mode sector deep-links (?s=01..?s=11). These resolve to
    // the homepage with the sigma store booting into the given sector.
    // Lower priority than the homepage — they are alternate views of the
    // same SPA, not separate pages.
    ...["01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11"].map(
      (n) => ({
        url: `${SITE_URL}/?s=${n}`,
        lastModified: STATIC_LASTMOD,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      })
    ),
  ];

  // ─── SERVICE DETAIL ROUTES (27) ────────────────────────────────────
  const serviceRoutes: MetadataRoute.Sitemap = SERVICES.map((s) => ({
    url: `${SITE_URL}/services/${s.slug}`,
    lastModified: STATIC_LASTMOD,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  // ─── PORTFOLIO DETAIL ROUTES (9) ───────────────────────────────────
  const portfolioRoutes: MetadataRoute.Sitemap = Object.keys(PROJECTS).map(
    (slug) => {
      const p = PROJECTS[slug];
      return {
        url: `${SITE_URL}/portfolio/${slug}`,
        lastModified: p.created ? `${p.created}T00:00:00.000Z` : STATIC_LASTMOD,
        changeFrequency: "monthly" as const,
        priority: 0.8,
      };
    }
  );

  // ─── INSIGHT DETAIL ROUTES (9) ─────────────────────────────────────
  const insightRoutes: MetadataRoute.Sitemap = Object.keys(INSIGHTS).map(
    (slug) => {
      const i = INSIGHTS[slug];
      return {
        url: `${SITE_URL}/insights/${slug}`,
        lastModified: i.date ? isoFromDotted(i.date) : STATIC_LASTMOD,
        changeFrequency: "monthly" as const,
        priority: 0.7,
      };
    }
  );

  return [...staticRoutes, ...serviceRoutes, ...portfolioRoutes, ...insightRoutes];
}
