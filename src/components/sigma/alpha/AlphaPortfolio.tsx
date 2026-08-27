"use client";

import * as React from "react";
import { PageTransitionLink } from "@/components/sigma/PageTransitionLink";
import { ClassifiedCover } from "@/components/sigma/shared/ClassifiedCover";

type Project = {
  name: string;
  desc: string;
  tech: string[];
  solution: string;
  image: string;
  accent: string;
  slug: string;
  cat: string;
};

const PROJECTS: Project[] = [
  { name: "Omnibridge", desc: "Cross-chain bridge protocol with MCP & A2A server", tech: ["Solidity", "TypeScript", "Express", "GraphQL"], solution: "Multi-chain interoperability", image: "/portfolio/ominibridge.png", accent: "#00FF94", slug: "omnibridge", cat: "WEB3" },
  { name: "Dukon Pro", desc: "Private capital real estate investment platform", tech: ["Next.js", "TypeScript", "Prisma", "NextAuth"], solution: "Real estate tokenization", image: "/portfolio/dukon-pro.png", accent: "#FF4500", slug: "dukon-pro", cat: "FULL-STACK" },
  { name: "Royal DAO", desc: "Decentralized autonomous organization governance", tech: ["Next.js", "Framer Motion", "Tabler Icons"], solution: "On-chain governance", image: "/portfolio/royaldao.png", accent: "#C6FF00", slug: "royaldao", cat: "WEB3" },
  { name: "Vortex Sales OS", desc: "Autonomous AI sales operating system with voice agents", tech: ["Next.js", "Socket.io", "Prisma", "Recharts"], solution: "AI-driven sales automation", image: "/portfolio/vortex-sales-os.png", accent: "#00E5FF", slug: "vortex-sales-os", cat: "AI" },
  { name: "GymMaster", desc: "Gym management software with QR code integration", tech: ["Next.js", "Prisma", "QRCode React", "Recharts"], solution: "Facility management", image: "/portfolio/gymmaster.png", accent: "#FF2D7E", slug: "gymmaster", cat: "FULL-STACK" },
  { name: "Lumina Tarot", desc: "Mystical daily companion with sound frequencies", tech: ["Tone.js", "Socket.io", "Framer Motion", "Next.js"], solution: "Lifestyle app", image: "/portfolio/lumina-tarot.png", accent: "#FFB300", slug: "lumina-tarot", cat: "DESIGN" },
  { name: "Sai Pay", desc: "Digital wallet and payment application", tech: ["Next.js", "Recharts", "Radix UI", "Zod"], solution: "Fintech wallet", image: "/portfolio/sai-pay.png", accent: "#B388FF", slug: "sai-pay", cat: "FULL-STACK" },
  { name: "Brorus", desc: "DeFi protocol with smart contracts and Web3", tech: ["Solidity", "Hardhat", "Ethers.js", "Vite"], solution: "DeFi infrastructure", image: "/portfolio/brorus.png", accent: "#FF3D3D", slug: "brorus", cat: "WEB3" },
  { name: "Asean Swap", desc: "Multi-chain token swap exchange", tech: ["React", "Vite", "TanStack Query", "Recharts"], solution: "DEX trading", image: "", accent: "#FFEB3B", slug: "asean-swap", cat: "WEB3" },
  { name: "ManyMarket", desc: "3D globe marketplace with Three.js", tech: ["Three.js", "R3F", "tsParticles", "Next.js"], solution: "Marketplace aggregation", image: "", accent: "#2979FF", slug: "manymarket", cat: "FULL-STACK" },
];

// First N projects are rendered as larger "featured" cards on >=md layouts
const FEATURED_COUNT = 2;

export function AlphaPortfolio() {
  return (
    <section id="portfolio" className="relative border-t border-border px-4 py-20 sm:px-6 lg:px-8">
      <div className="sigma-grid pointer-events-none absolute inset-0 opacity-10" />
      <div className="sigma-scanlines pointer-events-none absolute inset-0 opacity-15" />

      <div className="relative z-10 mx-auto w-full max-w-[1600px]">
        {/* === HEADER === */}
        <header>
          {/* Top telemetry strip */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 border-b border-border/50 pb-3 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground sm:text-[9px]">
            <span className="text-[#FF4500]">▸ 04 / PORTFOLIO</span>
            <span className="opacity-40">·</span>
            <span>SECTOR VLT</span>
            <span className="opacity-40">·</span>
            <span className="hidden sm:inline">VAULT ACCESS: PUBLIC</span>
            <span className="ml-auto hidden items-center gap-1.5 sm:flex">
              <span className="sigma-pulse h-1.5 w-1.5 bg-[#00FF94]" />
              <span className="text-[#00FF94]">LIVE FEED</span>
            </span>
          </div>

          {/* Heading + stats */}
          <div className="flex flex-col gap-6 py-6 md:flex-row md:items-end md:justify-between md:gap-8 lg:py-8">
            <div>
              <h2 className="font-sans text-4xl font-black uppercase leading-[0.88] tracking-tight sm:text-6xl xl:text-7xl">
                SELECTED <span style={{ color: "#FF4500" }}>WORK.</span>
              </h2>
              <p className="mt-3 max-w-xl font-serif text-base italic text-muted-foreground sm:text-lg">
                10 production projects shipped — real repos, real deployments, real users.
              </p>
            </div>
            <div className="flex shrink-0 items-end gap-5 sm:gap-7">
              <div className="flex flex-col items-start">
                <span className="font-mono text-2xl font-black leading-none sm:text-3xl md:text-4xl" style={{ color: "#FF4500" }}>10</span>
                <span className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground sm:text-[8px]">PROJECTS</span>
              </div>
              <div className="flex flex-col items-start">
                <span className="font-mono text-2xl font-black leading-none sm:text-3xl md:text-4xl" style={{ color: "#00FF94" }}>100<span className="text-base sm:text-lg md:text-xl">%</span></span>
                <span className="mt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground sm:text-[8px]">DEPLOYED</span>
              </div>
              <div className="hidden flex-col items-start sm:flex">
                <span className="font-mono text-3xl font-black leading-none sm:text-4xl" style={{ color: "#00E5FF" }}>42</span>
                <span className="mt-1 font-mono text-[8px] uppercase tracking-[0.22em] text-muted-foreground">STACKS</span>
              </div>
            </div>
          </div>
        </header>

        {/* === ASYMMETRIC PROJECT GRID ===
            Featured (first 2) span 2 cells; regular (next 8) span 1.
            Breakpoints designed so the layout lands cleanly with no empty slots:
            xl (12 cols): row1 = featured×2 (6+6), row2-3 = regular×4 (3×4 each)
            lg (8 cols):  row1 = featured×2 (4+4), row2-3 = regular×4 (2×4 each)
            md (4 cols):  row1 = featured + 2 regulars, row2 = featured + 2 regulars, row3 = 4 regulars
            sm (2 cols):  featured spans full row, regulars split 2-up
            mobile:       1 col */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-3 md:grid-cols-4 lg:grid-cols-8 lg:gap-4 xl:grid-cols-12">
          {PROJECTS.map((p, i) => {
            const featured = i < FEATURED_COUNT;
            const span = featured
              ? "col-span-1 sm:col-span-2 md:col-span-2 lg:col-span-4 xl:col-span-6"
              : "col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-2 xl:col-span-3";
            const idx = String(i + 1).padStart(2, "0");
            const cardStyle = {
              "--card-accent": p.accent,
              clipPath:
                "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))",
            } as React.CSSProperties;

            return (
              <PageTransitionLink
                key={p.slug}
                href={`/portfolio/${p.slug}`}
                label={p.name}
                kind="project"
                accent={p.accent}
                className={`group sigma-card relative flex ${span}`}
              >
                {/* === ACCENT GLOW (sibling, NOT inside clip-path) === */}
                <div
                  className="sigma-card-glow pointer-events-none absolute -inset-2 -z-10 blur-2xl"
                  style={{
                    background: `radial-gradient(circle at center, ${p.accent}40, transparent 70%)`,
                  }}
                  aria-hidden
                />

                {/* === CARD FRAME === */}
                <article
                  className="sigma-card-frame relative flex w-full flex-col overflow-hidden border border-border/60 bg-card/40"
                  style={cardStyle}
                >
                  {/* === TOP ACCENT STRIPE === */}
                  <div
                    className="sigma-card-strip absolute left-0 top-0 z-20 h-[3px] w-full opacity-70 group-hover:opacity-100"
                    style={{
                      background: `linear-gradient(90deg, ${p.accent} 0%, ${p.accent} 40%, transparent 100%)`,
                    }}
                    aria-hidden
                  />

                  {/* === TOP STATUS BAR === */}
                  <div className="relative flex items-center justify-between border-b border-border/40 px-3 py-2">
                    <div className="flex items-center gap-1.5">
                      <span className="sigma-pulse h-1.5 w-1.5" style={{ background: p.accent }} aria-hidden />
                      <span
                        className="font-mono text-[9px] uppercase tracking-[0.22em]"
                        style={{ color: p.accent }}
                      >
                        {p.cat}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">
                      <span>
                        {idx}
                        <span className="opacity-40">/10</span>
                      </span>
                      <span className="opacity-40">·</span>
                      <span style={{ color: p.accent }}>●LIVE</span>
                    </div>
                  </div>

                  {/* === HERO IMAGE ZONE === */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-card">
                    {p.image ? (
                      <img
                        src={p.image}
                        alt={`${p.name} — ${p.solution} screenshot`}
                        loading="lazy"
                        decoding="async"
                        className="sigma-card-img h-full w-full object-cover object-top"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).style.opacity = "0.25";
                        }}
                      />
                    ) : (
                      /* Retro brutalist glitching green PC screen — replaces the
                         old "[ SCREENSHOT CLASSIFIED ]" cover. */
                      <ClassifiedCover variant="card" />
                    )}

                    {/* Bottom gradient for legibility */}
                    <div
                      className="pointer-events-none absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(180deg, transparent 35%, rgba(0,0,0,0.55) 100%)",
                      }}
                      aria-hidden
                    />

                    {/* Scanlines */}
                    <div
                      className="pointer-events-none absolute inset-0 opacity-30"
                      style={{
                        background:
                          "repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(0,0,0,0.35) 3px, rgba(0,0,0,0.35) 4px)",
                      }}
                      aria-hidden
                    />

                    {/* Hazard corner top-right */}
                    <div
                      className="absolute right-0 top-0 h-5 w-5"
                      style={{
                        background: `repeating-linear-gradient(45deg, ${p.accent} 0, ${p.accent} 2px, transparent 2px, transparent 4px)`,
                      }}
                      aria-hidden
                    />

                    {/* Crosshair mark top-left */}
                    <span
                      className="absolute left-2 top-2 h-2.5 w-2.5 border-l border-t"
                      style={{ borderColor: `${p.accent}cc` }}
                      aria-hidden
                    />

                    {/* Solution badge bottom-left */}
                    <span
                      className="absolute bottom-2 left-2 border bg-background/80 px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-[0.18em] backdrop-blur-sm"
                      style={{ borderColor: `${p.accent}55`, color: p.accent }}
                    >
                      ▸ {p.solution}
                    </span>

                    {/* Slug label bottom-right */}
                    <span className="absolute bottom-2 right-2 hidden font-mono text-[8px] uppercase tracking-[0.18em] text-foreground/70 sm:block">
                      /{p.slug}
                    </span>

                    {/* === CINEMATIC HOVER OVERLAY === */}
                    <div
                      className="sigma-card-overlay pointer-events-none absolute inset-0 flex flex-col items-center justify-center bg-background/85 backdrop-blur-[2px]"
                      aria-hidden
                    >
                      {/* Animated corner brackets */}
                      <span
                        className="sigma-card-corner absolute left-3 top-3 border-l-2 border-t-2"
                        style={{ borderColor: p.accent }}
                      />
                      <span
                        className="sigma-card-corner absolute right-3 top-3 border-r-2 border-t-2"
                        style={{ borderColor: p.accent }}
                      />
                      <span
                        className="sigma-card-corner absolute bottom-3 left-3 border-l-2 border-b-2"
                        style={{ borderColor: p.accent }}
                      />
                      <span
                        className="sigma-card-corner absolute bottom-3 right-3 border-r-2 border-b-2"
                        style={{ borderColor: p.accent }}
                      />

                      {/* Center text stack */}
                      <div className="relative z-10 flex flex-col items-center gap-1 px-4 text-center">
                        <span className="font-mono text-[8px] uppercase tracking-[0.32em] text-muted-foreground sm:text-[9px]">
                          ▸ ACCESS CASE FILE
                        </span>
                        <span
                          className="font-sans text-base font-black uppercase leading-none tracking-tight sm:text-lg lg:text-xl"
                          style={{ color: p.accent }}
                        >
                          View Case Study
                        </span>
                        <span className="font-mono text-[8px] uppercase tracking-[0.32em] text-muted-foreground sm:text-[9px]">
                          ▸ ENTER DEBRIEF ▸
                        </span>
                      </div>

                      {/* Horizontal accent scan-line */}
                      <div
                        className="sigma-card-scanline absolute left-1/2 top-1/2 h-px -translate-x-1/2 -translate-y-1/2"
                        style={{
                          background: `linear-gradient(90deg, transparent 0%, ${p.accent} 50%, transparent 100%)`,
                        }}
                      />
                    </div>
                  </div>

                  {/* === CONTENT === */}
                  <div className="flex flex-1 flex-col gap-2 p-3">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-sans text-base font-black uppercase leading-[0.95] tracking-tight sm:text-lg xl:text-xl">
                        {p.name}
                      </h3>
                      <span
                        className="sigma-card-arrow mt-1 inline-block"
                        style={{ color: p.accent }}
                        aria-hidden
                      >
                        →
                      </span>
                    </div>
                    <p className="font-serif text-xs italic leading-snug text-muted-foreground sm:text-sm">
                      {p.desc}
                    </p>

                    {/* Tech tags */}
                    <div className="mt-auto flex flex-wrap gap-1 pt-2">
                      {p.tech.map((t) => (
                        <span
                          key={t}
                          className="border bg-background/40 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] text-foreground/75 sm:text-[9px]"
                          style={{ borderColor: `${p.accent}33` }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* === BOTTOM ACCENT STRIPE === */}
                  <div
                    className="sigma-card-strip h-[2px] w-full opacity-30 group-hover:opacity-90"
                    style={{
                      background: `linear-gradient(90deg, transparent 0%, ${p.accent} 50%, transparent 100%)`,
                    }}
                    aria-hidden
                  />
                </article>
              </PageTransitionLink>
            );
          })}
        </div>

        {/* === BOTTOM CTA === */}
        <div className="mt-8 overflow-hidden border border-border/60 bg-card/30">
          <div className="flex flex-col items-stretch gap-4 p-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:p-5 md:p-6">
            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#FF4500] sm:text-[9px]">▸ ARCHIVE</div>
              <div className="mt-1 font-sans text-lg font-black uppercase tracking-tight sm:text-xl md:text-2xl">
                WANT TO SEE <span style={{ color: "#FF4500" }}>MORE?</span>
              </div>
              <p className="mt-1 font-serif text-sm italic text-muted-foreground">
                Our project vault contains 50+ shipped systems. Contact us to request a private viewing of the full archive.
              </p>
            </div>
            <a
              href="#contact"
              className="sigma-magnetic group relative flex shrink-0 items-center justify-center gap-3 border border-foreground bg-foreground px-5 py-3 font-mono text-[10px] uppercase tracking-[0.25em] text-background transition-all hover:shadow-[5px_5px_0_0_#FF4500] sm:text-[10px]"
            >
              <span className="sigma-pulse h-1.5 w-1.5 bg-[#FF4500]" aria-hidden />
              CONTACT US
              <span className="sigma-card-arrow transition-transform group-hover:translate-x-1" aria-hidden>→</span>
            </a>
          </div>
          {/* Bottom hazard strip */}
          <div
            className="h-1.5 w-full"
            style={{
              background:
                "repeating-linear-gradient(45deg, #FF4500 0, #FF4500 8px, #0a0a0a 8px, #0a0a0a 16px)",
            }}
            aria-hidden
          />
        </div>
      </div>
    </section>
  );
}
