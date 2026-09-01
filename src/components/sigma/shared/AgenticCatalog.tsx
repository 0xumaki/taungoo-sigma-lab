// LOOP-3-AGENTIC-SEO: AgenticCatalog — a server-rendered, visually-hidden
// (sr-only) catalog of every service, portfolio project, and research insight
// on the site. Rendered in the root layout so it appears on EVERY page (homepage
// + all 3 detail page types).
//
// WHY: the beta-mode Services section uses an AnimatePresence-collapsed two-
// level expansion — inner service rows only mount when the user clicks a domain
// square. This means the SSR HTML for the homepage contains only the 4 domain
// names + a 6-link footer shortcut, NOT the full 27-service catalog. AI agents
// + traditional SEO crawlers reading the raw HTML cannot discover services like
// "Smart Contract Dev" or "Money Market Development" — they only see what
// the user would see on first paint.
//
// This component fixes that gap WITHOUT changing the user-facing UX:
//   - Visually hidden (sr-only) — zero layout impact, zero visual change.
//   - Server-rendered — appears in the initial SSR HTML payload.
//   - Plain semantic HTML (<h2> + <ul>/<li> with <a> links) — parseable by
//     both Lighthouse SEO and AI agents doing semantic search.
//   - Lists ALL 27 services + 9 portfolio projects + 9 insights with their
//     canonical detail-page URLs + a one-line description for each.
//
// CONSTRAINTS honored:
//   - No new deps (uses existing data files).
//   - No behavior change (purely additive sr-only DOM).
//   - No data refactoring (Services component's AnimatePresence pattern stays
//     intact — this catalog is a SEPARATE SSR-only render).
//   - Per the LOOP-3 task brief item 9: "Optional: hidden div with site
//     description for AI scrapers (low priority)" — this is that, expanded
//     to a full catalog.

import { SERVICES } from "@/app/services/[slug]/services-data";
import { PROJECTS } from "@/app/portfolio/[slug]/projects-data";
import { INSIGHTS } from "@/app/insights/[slug]/insights-data";

const SITE_URL = "https://taungoo-sigma-lab.vercel.app";

export function AgenticCatalog() {
  return (
    <div
      // sr-only — visually hidden, available to screen readers + AI crawlers
      // + scrapers reading the raw HTML. NOT aria-hidden (we WANT this in the
      // a11y tree + scraper output).
      className="sr-only"
      data-section="agentic-catalog"
      data-agentic="true"
      aria-label="Site catalog — all services, projects, and research insights"
    >
      <h2>Taungoo Sigma Lab — Site Catalog</h2>
      <p>
        Taungoo Sigma Lab is a brutalist research lab at the intersection of AI,
        Web3, and community resilience. We ship 27 production-grade services
        across 4 domains (AI Systems, Design &amp; Content, Full-Stack Engineering,
        Web3 Infrastructure), 9 deployed case studies, and 9 peer-reviewed
        research insights. This catalog lists every item with its canonical
        detail-page URL for AI agents + traditional SEO crawlers.
      </p>

      <h3>Services ({SERVICES.length} total)</h3>
      <ul>
        {SERVICES.map((s) => (
          <li key={s.slug}>
            <a href={`${SITE_URL}/services/${s.slug}`}>
              {s.name}
            </a>
            {" — "}
            {s.tagline}. Provider: Taungoo Sigma Lab. Service type: {s.name}.
            Area served: Global.
          </li>
        ))}
      </ul>

      <h3>Portfolio Case Studies ({Object.keys(PROJECTS).length} total)</h3>
      <ul>
        {Object.entries(PROJECTS).map(([slug, p]) => (
          <li key={slug}>
            <a href={`${SITE_URL}/portfolio/${slug}`}>{p.name}</a>
            {" — "}
            {p.tagline}. Category: {p.category}. Tech stack: {p.tech.join(", ")}.
            Published: {p.created}.
          </li>
        ))}
      </ul>

      <h3>Research Insights ({Object.keys(INSIGHTS).length} total)</h3>
      <ul>
        {Object.entries(INSIGHTS).map(([slug, i]) => (
          <li key={slug}>
            <a href={`${SITE_URL}/insights/${slug}`}>{i.title}</a>
            {" — "}
            {i.abstract} Authors: {i.authors}. Published: {i.date}. Read time:{" "}
            {i.readTime}. Tag: {i.tag}.
          </li>
        ))}
      </ul>
    </div>
  );
}
