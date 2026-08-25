import { NextResponse } from "next/server";

export const runtime = "nodejs";

const CHANGELOG = [
  {
    version: "2.7.SIGMA",
    date: "2024.11.20",
    codename: "TAUNGOO",
    type: "minor",
    additions: [
      "Health monitoring endpoint (/api/sigma/health)",
      "Version endpoint (/api/sigma/version)",
      "Prometheus metrics endpoint (/api/sigma/metrics)",
      "SVG status badge endpoint (/api/sigma/badge)",
      "JSON-LD structured data for SEO",
      "robots.txt + sitemap.xml",
      "Ambient particles for S01, S03, S07, S09",
      "First-visit onboarding tour (4 steps)",
      "Theme toggle [L] (dark/light)",
      "[R] random sector shortcut",
    ],
    fixes: [
      "Boot screen safety timeout (6s force-clear)",
      "Hydration race condition on deep-links",
      "S07 telemetry counters field mapping",
    ],
  },
  {
    version: "2.6.SIGMA",
    date: "2024.11.15",
    codename: "RETICLE",
    type: "minor",
    additions: [
      "Cursor spotlight (radial gradient following cursor)",
      "S08 equipment card flip (3D rotateY)",
      "Open Graph meta tags (2 images, Twitter card)",
    ],
  },
  {
    version: "2.5.SIGMA",
    date: "2024.11.10",
    codename: "DOSSIER",
    type: "minor",
    additions: [
      "Help overlay [H] showing all shortcuts + 11 sectors",
      "S06 research logs paper detail modals (DOI, citations, abstracts)",
      "Visited sectors breadcrumb (top-center trail)",
    ],
  },
  {
    version: "2.4.SIGMA",
    date: "2024.11.05",
    codename: "AWAKEN",
    type: "major",
    additions: [
      "Sound design system (Web Audio API, 8 sound types)",
      "Tour mode [T] (auto-play through 11 sectors)",
      "S05 operator profile modals (8 operators with dossiers)",
      "Command palette [⌘K] (fuzzy filter sector jump)",
      "Boot screen (rAF progress, 9 boot steps)",
      "Custom cursor reticle (inertial targeting ring)",
      "Sector progress indicator (right edge)",
      "Share button (deep-link to clipboard)",
      "Konami code easter egg (Matrix rain)",
      "SigmaMap navigation hub (11 nodes with screenshots)",
      "GSAP multi-panel full-page transitions",
    ],
  },
  {
    version: "2.0.SIGMA",
    date: "2024.10.21",
    codename: "GENESIS",
    type: "major",
    additions: [
      "Initial 11-sector release",
      "Nexus Map level-select navigation",
      "11 absolute sectors (no scroll, no nav bar)",
      "GSAP multi-panel transitions (8-panel slam-cover)",
      "Real GitHub portfolio screenshots (11 repos from 0xumaki)",
      "Live telemetry API (/api/sigma/telemetry)",
      "Contact transmit API (/api/sigma/transmit)",
      "Brutalist design system (scanlines, noise, crosshairs, hazard stripes)",
      "Deep-link routing (?s=01 through ?s=11)",
      "Keyboard navigation (ESC, M, arrows, 0-9)",
    ],
  },
];

export async function GET(req: Request) {
  const url = new URL(req.url);
  const format = url.searchParams.get("format") || "json";

  if (format === "markdown") {
    const md = CHANGELOG.map((c) => {
      const lines = [`## [${c.version}] — ${c.date}`, `**Codename:** ${c.codename}`, `**Type:** ${c.type}`, ""];
      if (c.additions?.length) {
        lines.push("### Added");
        c.additions.forEach((a) => lines.push(`- ${a}`));
        lines.push("");
      }
      if (c.fixes?.length) {
        lines.push("### Fixed");
        c.fixes.forEach((f) => lines.push(`- ${f}`));
        lines.push("");
      }
      return lines.join("\n");
    }).join("\n---\n\n");

    return new Response(`# Taungoo Sigma Lab — Changelog\n\n${md}`, {
      headers: { "Content-Type": "text/markdown; charset=utf-8" },
    });
  }

  return NextResponse.json({
    count: CHANGELOG.length,
    latest: CHANGELOG[0],
    changelog: CHANGELOG,
  });
}
