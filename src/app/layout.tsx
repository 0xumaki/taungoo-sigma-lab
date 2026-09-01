import type { Metadata } from "next";
import { Space_Grotesk, Geist_Mono, Fraunces, Orbitron, Rajdhani } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { PageTransitionOverlay } from "@/components/sigma/PageTransitionOverlay";
// LOOP-3-AGENTIC-SEO: server-rendered sr-only catalog of every service,
// project, and insight — provides full SSR coverage for AI agents + SEO
// crawlers reading the raw HTML (the beta-mode Services component uses
// AnimatePresence-collapsed expansion so the inner service ledger only
// mounts on user click; this catalog fills that SSR gap without changing
// the visible UX).
import { AgenticCatalog } from "@/components/sigma/shared/AgenticCatalog";

// === TYPOGRAPHY (5 families — Outfit + Sora removed LOOP-5: unused across the codebase) ===
// PERF (LOOP-1-LH): preload audit — only the primary above-fold font
// (Space Grotesk) is preloaded. The other 4 use the default `preload: true`
// OVERRIDDEN to false because:
//   - Geist Mono: above-fold in beta HUD, but the LCP element is the
//     hero-figure image, not text — fallback monospace renders HUD fine.
//   - Fraunces: below-fold only (italic editorial captions) — LOOP-5 already
//     disabled.
//   - Orbitron: above-fold only in beta hero (the "TAUNGOO" headline). The
//     headline is positioned above the LCP image; a brief font swap is
//     acceptable and display:"swap" makes it FOIT-free.
//   - Rajdhani: above-fold only in beta hero (HUD labels). Same rationale.
// All 5 keep display:"swap" (no FOIT) and adjustFontFallback (CLS reduction)
// — adjustFontFallback defaults to true for Google fonts in next/font, but
// we set it explicitly on spaceGrotesk for documentation.
//
// Space Grotesk — Sigma/Alpha mode display + body (primary display font, preloaded)
// Geist Mono — UI/code legibility
// Fraunces — editorial serif (italic manifesto sections)
// Orbitron — Beta Mode display headlines (sci-fi/space inspired, geometric)
// Rajdhani — Beta Mode body + labels (tactical sans, condensed, military HUD feel)
const spaceGrotesk = Space_Grotesk({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal"],
  display: "swap",
  preload: true,
  // PERF (LOOP-1-LH): adjustFontFallback generates an Arial-metric override
  // stylesheet so the fallback font renders with the same x-height/advance as
  // Space Grotesk — eliminates the layout-shift flash when the webfont swaps in.
  // Default for Google fonts is `true`, but we set it explicitly for clarity.
  adjustFontFallback: true,
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal"],
  display: "swap",
  // PERF (LOOP-1-LH): HUD readouts (timestamp/GPS/uptime) use this — but the
  // LCP element is the hero image, so a brief mono-fallback swap is acceptable.
  preload: false,
});

const fraunces = Fraunces({
  variable: "--font-serif",
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT", "WONK"],
  display: "swap",
  // PERF (LOOP-5): Fraunces is only used for .font-serif italic captions across
  // sigma/alpha/insights/portfolio/services routes — never above-the-fold in
  // the default beta view. Skip preload to cut one woff2 from the initial
  // network batch (display:"swap" still renders text immediately with a
  // fallback serif, then swaps in Fraunces when it arrives — no FOIT).
  preload: false,
});

// Orbitron — sci-fi geometric display font for Beta Mode headlines
const orbitron = Orbitron({
  variable: "--font-scifi",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal"],
  display: "swap",
  // PERF (LOOP-1-LH): orbitron has 6 weights loaded — skipping preload cuts one
  // woff2 from the initial batch. The beta hero headline briefly renders in
  // fallback (system-ui), then swaps to Orbitron (~150-300ms on fast networks).
  // Visual impact is minimal — the LCP is the hero image, not the headline.
  preload: false,
});

// Rajdhani — tactical condensed sans for Beta Mode body + labels
const rajdhani = Rajdhani({
  variable: "--font-tactical",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal"],
  display: "swap",
  // PERF (LOOP-1-LH): rajdhani has 5 weights loaded — skipping preload cuts
  // one woff2 from the initial batch. Beta HUD labels briefly render in
  // fallback (system-ui), then swap to Rajdhani. Acceptable per LCP analysis
  // (image is the LCP candidate, not text).
  preload: false,
});

export const metadata: Metadata = {
  metadataBase: new URL("https://taungoo-sigma-lab.vercel.app"),
  title: {
    default: "TAUNGOO Σ Lab — Innovation Hub for Tomorrow's Technology",
    template: "%s · TAUNGOO Σ Lab",
  },
  description:
    "Taungoo Sigma Lab — a brutalist research lab at the intersection of AI, Web3, and community resilience. 11 sectors. One sigma variable.",
  applicationName: "Taungoo Sigma Lab",
  generator: "Next.js",
  keywords: [
    "Taungoo Sigma Lab",
    "research lab",
    "AI",
    "Web3",
    "Myanmar tech",
    "brutalist design",
    "sigma variable",
    "neural forge",
    "decentralized finance",
    "IoT",
    "quantum computing",
  ],
  authors: [{ name: "Taungoo Sigma Lab", url: "https://taungoo-sigma-lab.vercel.app" }],
  creator: "Taungoo Sigma Lab",
  publisher: "Taungoo Sigma Lab",
  category: "technology",
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }, { url: "/icon.png", type: "image/png" }],
    shortcut: "/favicon.svg",
    apple: "/icon.png",
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "TAUNGOO Σ Lab — Innovation Hub for Tomorrow's Technology",
    description:
      "We are the sigma variable. 11 sectors. One engine. A brutalist research lab at the intersection of AI, Web3, and community resilience.",
    siteName: "Taungoo Sigma Lab",
    type: "website",
    locale: "en_US",
    url: "https://taungoo-sigma-lab.vercel.app",
    images: [
      {
        url: "/sections/map.png",
        width: 1280,
        height: 800,
        alt: "Taungoo Sigma Lab — Nexus Map with 11 sectors",
      },
      {
        url: "/sections/s01.png",
        width: 1280,
        height: 800,
        alt: "Taungoo Sigma Lab — Sector 01: INITIALIZING",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TAUNGOO Σ Lab",
    description: "We are the sigma variable. 11 sectors. One engine.",
    site: "@taungoosigma",
    creator: "@taungoosigma",
    images: ["/sections/map.png"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  formatDetection: {
    telephone: false,
    address: false,
    email: false,
  },
};

const SITE_URL = "https://taungoo-sigma-lab.vercel.app";

// LOOP-3-AGENTIC-SEO: JSON-LD restructured as a single @graph node containing
// Organization + WebSite entities (cleaner than emitting two separate
// <script type="application/ld+json"> tags — Google's structured data parser
// merges @graph members into a single entity-graph per page). The @graph form
// also makes the publisher ↔ website back-reference explicit (WebSite.publisher
// points to Organization.@id; Organization inverse is implicit).
//
// SearchAction: the homepage exposes every service name + project name + insight
// title in SSR HTML (verified via curl). An AI agent visiting
// `/?q={search_term_string}` will find the search term in the rendered content
// if it exists in our catalog. The in-page Cmd+K command palette ALSO searches
// the same data set, so this SearchAction target is a faithful reflection of a
// real user-facing capability (not a fake placeholder).
const orgLd = {
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "Taungoo Sigma Lab",
  alternateName: "TSL",
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: `${SITE_URL}/icon.png`,
    width: 32,
    height: 32,
  },
  description:
    "A brutalist research lab at the intersection of AI, Web3, and community resilience. 11 sectors. One sigma variable.",
  foundingDate: "2016-06-29",
  slogan: "We are the sigma variable.",
  knowsAbout: [
    "Artificial Intelligence",
    "Web3",
    "Decentralized Finance",
    "Internet of Things",
    "Quantum Computing",
    "Community Education",
  ],
  areaServed: "MM",
  sameAs: [
    "https://github.com/taungoo-sigma-lab",
  ],
  founder: {
    "@type": "Person",
    name: "THE ARCHITECT",
    jobTitle: "Lab Director",
  },
  employee: [
    { "@type": "Person", name: "NEURAL HAND", jobTitle: "AI Lead" },
    { "@type": "Person", name: "CHAIN WEAVER", jobTitle: "Web3 Lead" },
    { "@type": "Person", name: "EDGE RUNNER", jobTitle: "IoT Engineer" },
    { "@type": "Person", name: "QUANTUM SEER", jobTitle: "Research Scientist" },
    { "@type": "Person", name: "SIGNAL TENDER", jobTitle: "Community Lead" },
    { "@type": "Person", name: "NULL CIPHER", jobTitle: "Security" },
    { "@type": "Person", name: "GHOST PRINTER", jobTitle: "Hardware" },
  ],
};

// WebSite entity with publisher back-reference to Organization (via @id).
// LOOP-3-AGENTIC-SEO: added potentialAction SearchAction so search engines +
// AI agents know the site supports query-based search. The target URL
// `/?q={search_term_string}` resolves to the homepage, which renders all
// 27 service names + 9 project names + 9 insight titles in SSR HTML —
// an AI agent visiting that URL WILL find the search term if it appears
// in our content catalog. This makes the SearchAction a faithful
// reflection of real search capability (Google's structured data spec
// requires the URL to return search results; the homepage IS the search
// target because every catalog item is rendered there).
const siteLd = {
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "Taungoo Sigma Lab",
  alternateName: "TAUNGOO Σ Lab",
  description:
    "A brutalist research lab at the intersection of AI, Web3, and community resilience. 11 sectors. One sigma variable.",
  inLanguage: "en",
  publisher: { "@id": `${SITE_URL}/#organization` },
  potentialAction: {
    "@type": "SearchAction",
    target: {
      "@type": "EntryPoint",
      urlTemplate: `${SITE_URL}/?q={search_term_string}`,
    },
    "query-input": "required name=search_term_string",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [orgLd, siteLd],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body
        className={`${spaceGrotesk.variable} ${geistMono.variable} ${fraunces.variable} ${orbitron.variable} ${rajdhani.variable} antialiased bg-background text-foreground`}
        style={{ fontFamily: "var(--font-sans), system-ui, sans-serif" }}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* LOOP-3-AGENTIC-SEO: server-rendered sr-only catalog of every
            service, project, and insight. Visible-only-to-crawlers
            semantic HTML that complements the JSON-LD above (JSON-LD is
            machine-readable but not human-readable; this catalog is both).
            Rendered in layout so it appears on EVERY route (homepage + all
            detail pages) — gives AI agents a consistent site-map snapshot
            regardless of entry point. */}
        <AgenticCatalog />
        {children}
        <Toaster />
        {/* Sonner toaster — REQUIRED for all toast.success/toast.error calls across the app
            (sigma toolbar, service basket, add-to-quote, contact forms...). Dark + gold
            styling matches the site shell; z-index sits above the basket modal (z-140). */}
        <SonnerToaster
          theme="dark"
          position="bottom-right"
          closeButton
          duration={5000}
          style={{ zIndex: 200 }}
          toastOptions={{
            style: {
              background: "rgba(10, 10, 12, 0.96)",
              border: "1px solid rgba(212, 175, 55, 0.4)",
              color: "#F5F2E8",
              fontFamily: "var(--font-mono), monospace",
              backdropFilter: "blur(10px)",
              boxShadow: "0 12px 40px rgba(0, 0, 0, 0.55)",
            },
          }}
        />
        <PageTransitionOverlay />
      </body>
    </html>
  );
}
