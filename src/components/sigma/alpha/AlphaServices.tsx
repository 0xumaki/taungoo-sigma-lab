"use client";

import * as React from "react";
import { PageTransitionLink } from "@/components/sigma/PageTransitionLink";

const SERVICES = [
  { name: "AI Chatbot", icon: "◐", desc: "AI chatbots that handle real workloads — sales, support, onboarding.", price: "from 25,200,000 MMK", cat: "AI", slug: "ai-chatbot" },
  { name: "Voice AI", icon: "♫", desc: "Voice agents that close sales and resolve support tickets.", price: "from 37,800,000 MMK", cat: "AI", slug: "voice-ai" },
  { name: "Agent Swarm", icon: "⬡", desc: "Multi-agent swarms for complex, real-world workflows.", price: "from 75,600,000 MMK", cat: "AI", slug: "agent-swarm" },
  { name: "AI Automation", icon: "⚙", desc: "N8N workflows + CRM loops that run themselves.", price: "from 12,600,000 MMK", cat: "AI", slug: "ai-automation" },
  { name: "API & MCP", icon: "⌗", desc: "Custom APIs and MCP servers that integrate with anything.", price: "from 63,000,000 MMK", cat: "AI", slug: "api-mcp" },
  { name: "HERMES / Openclaw / GrokBot", icon: "⚡", desc: "Specialized AI agent platforms built for specific workflows.", price: "from 252,000,000 MMK", cat: "AI", slug: "hermes-openclaw-grokbot" },
  { name: "AI Video Generation", icon: "▶", desc: "Commercial-grade video pipelines. MVs, ads, brand content.", price: "from 12,600,000 MMK", cat: "DESIGN", slug: "ai-video-generation" },
  { name: "3D Modeling", icon: "◈", desc: "Product viz, architectural, and game-ready 3D assets.", price: "from 2,500,000 MMK", cat: "DESIGN", slug: "3d-modeling" },
  { name: "Graphic Design", icon: "◆", desc: "Brand identity, collateral, and UI kits that get remembered.", price: "from 5,000,000 MMK", cat: "DESIGN", slug: "graphic-design" },
  { name: "Content & Copywriting", icon: "✎", desc: "Technical writing, marketing copy, docs that convert.", price: "from 3,700,000 MMK", cat: "DESIGN", slug: "content-copywriting" },
  { name: "Online Media Buying", icon: "▲", desc: "Ad campaigns + media strategy with measurable ROI.", price: "from 7,600,000 MMK", cat: "DESIGN", slug: "online-media-buying" },
  { name: "UI/UX Design", icon: "◡", desc: "Product design + design systems that scale with users.", price: "from 37,800,000 MMK", cat: "DESIGN", slug: "ui-ux-design" },
  { name: "Android & iOS App", icon: "▣", desc: "Native + cross-platform apps. App Store-ready releases.", price: "from 75,600,000 MMK", cat: "FULL-STACK", slug: "android-ios-app" },
  { name: "Web / WebApp", icon: "▣", desc: "Full-stack web apps on Next.js 16 + React 19.", price: "from 37,800,000 MMK", cat: "FULL-STACK", slug: "web-webapp" },
  { name: "Chrome Extensions", icon: "⬚", desc: "Browser automation + productivity extensions. Ship in days.", price: "from 12,600,000 MMK", cat: "FULL-STACK", slug: "chrome-extensions" },
  { name: "Desktop / MacBook Apps", icon: "◱", desc: "Cross-platform desktop apps on Electron + Tauri.", price: "from 75,600,000 MMK", cat: "FULL-STACK", slug: "desktop-macbook-apps" },
  { name: "ASO", icon: "⊙", desc: "App Store Optimization that ranks. From keyword to install.", price: "from 6,400,000 MMK", cat: "FULL-STACK", slug: "aso" },
  { name: "Web3 Wallets", icon: "⬡", desc: "Non-custodial wallets with hardware-grade security.", price: "from 50,400,000 MMK", cat: "WEB3", slug: "web3-wallets" },
  { name: "AMM / DEX", icon: "⇄", desc: "AMM + DEX protocols that settle on mainnet. Audited.", price: "from 100,800,000 MMK", cat: "WEB3", slug: "amm-dex" },
  { name: "DAO Governance", icon: "◍", desc: "DAO frameworks with on-chain voting + treasury control.", price: "from 37,800,000 MMK", cat: "WEB3", slug: "dao-governance" },
  { name: "NFT Systems", icon: "✦", desc: "NFT minting + marketplace + royalty infrastructure.", price: "from 63,000,000 MMK", cat: "WEB3", slug: "nft-systems" },
  { name: "Security Audit", icon: "⚿", desc: "Smart contract audits. Catch exploits before mainnet.", price: "from 25,200,000 MMK", cat: "WEB3", slug: "security-audit" },
  { name: "Smart Contract Dev", icon: "∎", desc: "Solidity/Rust contracts shipped to mainnet. Gas-optimized.", price: "from 20,200,000 MMK", cat: "WEB3", slug: "smart-contract-development" },
  { name: "RWA Development", icon: "▣", desc: "Real-world asset tokenization + white-label RWA platform licensing", price: "from 126,000,000 MMK", cat: "WEB3", slug: "rwa-development" },
  { name: "Money Market Development", icon: "$", desc: "DeFi lending, borrowing, and yield protocols.", price: "from 100,800,000 MMK", cat: "WEB3", slug: "money-market-development" },
  { name: "Stablecoin Development", icon: "₵", desc: "Banking-grade stablecoin infrastructure at institutional scale.", price: "from 75,600,000 MMK", cat: "WEB3", slug: "stablecoin-development" },
  { name: "Mobile/Web Game Dev", icon: "◆", desc: "Mobile + web games on Unity, Phaser, and WebGL.", price: "from 37,800,000 MMK", cat: "FULL-STACK", slug: "mobile-web-game-development" },
];

const CATEGORIES = [
  { id: "ALL", label: "ALL", color: "#FF4500" },
  { id: "AI", label: "AI / AUTOMATION", color: "#00FF94" },
  { id: "WEB3", label: "WEB3 / BLOCKCHAIN", color: "#C6FF00" },
  { id: "FULL-STACK", label: "FULL-STACK", color: "#00E5FF" },
  { id: "DESIGN", label: "DESIGN / CONTENT", color: "#FF2D7E" },
];

const CAT_COLORS: Record<string, string> = {
  "AI": "#00FF94",
  "WEB3": "#C6FF00",
  "FULL-STACK": "#00E5FF",
  "DESIGN": "#FF2D7E",
};

// Slugs that have full detail pages
const DETAIL_SLUGS = new Set([
  "ai-chatbot", "voice-ai", "agent-swarm", "ai-automation", "api-mcp",
  "hermes-openclaw-grokbot", "ai-video-generation", "3d-modeling", "graphic-design",
  "content-copywriting", "online-media-buying", "ui-ux-design",
  "android-ios-app", "web-webapp", "chrome-extensions", "desktop-macbook-apps", "aso",
  "web3-wallets", "amm-dex", "dao-governance", "nft-systems", "security-audit",
  "smart-contract-development", "rwa-development", "money-market-development", "stablecoin-development",
  "mobile-web-game-development",
]);

export function AlphaServices() {
  const [activeCat, setActiveCat] = React.useState("ALL");

  const filtered = React.useMemo(() => {
    if (activeCat === "ALL") return SERVICES;
    return SERVICES.filter((s) => s.cat === activeCat);
  }, [activeCat]);

  return (
    <section id="services" className="relative border-t border-border px-3 py-12 sm:px-6 sm:py-20">
      <div className="sigma-grid pointer-events-none absolute inset-0 opacity-10" />
      <div className="sigma-scanlines pointer-events-none absolute inset-0 opacity-15" />

      <div className="relative z-10 mx-auto w-full max-w-[1600px]">
        {/* Header */}
        <div className="flex flex-col gap-3 border-b border-border pb-4 sm:flex-row sm:items-end sm:justify-between sm:gap-4">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#FF4500]">▸ 03 / SERVICES</div>
            <h2 className="mt-2 font-sans text-3xl font-black uppercase leading-tight tracking-tight sm:text-5xl md:text-6xl">
              WHAT WE <span style={{ color: "#FF4500" }}>SHIP.</span>
            </h2>
            <p className="mt-2 font-serif text-sm italic text-muted-foreground sm:text-base">
              27 services across AI, Web3, and full-stack. Each ships with detail pages, pricing packages, and comparison tables.
            </p>
          </div>
          <div className="hidden shrink-0 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground sm:block sm:text-[9px]">
            <span className="text-[#FF4500]">27</span> SERVICES · <span className="text-[#00FF94]">{filtered.length}</span> SHOWN
          </div>
        </div>

        {/* Working category filters */}
        <div className="mt-6 flex flex-wrap gap-1 sm:mt-6">
          {CATEGORIES.map((cat) => {
            const isActive = activeCat === cat.id;
            const count = cat.id === "ALL" ? SERVICES.length : SERVICES.filter((s) => s.cat === cat.id).length;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCat(cat.id)}
                className={`flex min-h-[36px] items-center gap-1.5 border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] transition-all sm:text-[9px] ${
                  isActive ? "text-black" : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground"
                }`}
                style={isActive ? { background: cat.color, borderColor: cat.color } : undefined}
              >
                {cat.label}
                <span className={`flex h-4 min-w-4 items-center justify-center px-1 text-[10px] sm:text-[8px] ${isActive ? "bg-black/20" : "bg-foreground/10"}`}>{count}</span>
              </button>
            );
          })}
        </div>

        {/* Maximalist sci-fi service cards */}
        <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {filtered.map((s, i) => {
            const catColor = CAT_COLORS[s.cat] || "#FF4500";
            const hasDetail = DETAIL_SLUGS.has(s.slug);
            // Use PageTransitionLink when navigating to a detail page; otherwise plain <a> for hash links
            const LinkComp = hasDetail ? PageTransitionLink : "a" as const;
            const linkProps = hasDetail
              ? {
                  href: `/services/${s.slug}`,
                  label: s.name,
                  kind: "service" as const,
                  accent: catColor,
                }
              : { href: "#contact" };
            return (
              <LinkComp
                key={s.name}
                {...(linkProps as any)}
                className="alpha-card-hover group relative flex flex-col overflow-hidden border border-border bg-card/30 transition-all hover:border-foreground/40"
                style={{ "--sigma-hover-accent": catColor, clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))" } as React.CSSProperties}
              >
                {/* === HEADER BAR === */}
                <div className="flex items-center justify-between border-b border-border/40 px-2 py-1">
                  {/* Left hazard dot + cat label */}
                  <div className="flex items-center gap-1">
                    <span className="h-1.5 w-1.5" style={{ background: catColor }} />
                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] sm:text-[6px]" style={{ color: catColor }}>{s.cat}</span>
                  </div>
                  {/* Right index */}
                  <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground sm:text-[6px]">{String(i + 1).padStart(2, "0")}/{String(filtered.length).padStart(2, "0")}</span>
                </div>

                {/* === ICON ZONE === */}
                <div className="relative flex items-center justify-center py-4" style={{ background: `linear-gradient(180deg, ${catColor}0a, transparent)` }}>
                  {/* Hazard stripe top-left corner */}
                  <div className="absolute left-0 top-0 h-4 w-4" style={{ background: `repeating-linear-gradient(45deg, ${catColor} 0, ${catColor} 2px, transparent 2px, transparent 4px)` }} />
                  {/* Crosshair marks */}
                  <span className="absolute right-1 top-1 h-1.5 w-1.5 border-r border-t" style={{ borderColor: `${catColor}44` }} />
                  {/* Large icon */}
                  <span className="font-sans text-2xl font-black transition-transform group-hover:scale-110 sm:text-3xl" style={{ color: catColor }}>{s.icon}</span>
                  {/* Scanlines on icon area */}
                  <div className="pointer-events-none absolute inset-0 opacity-15" style={{ background: "repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(0,0,0,0.15) 3px, rgba(0,0,0,0.15) 4px)" }} />
                </div>

                {/* === CONTENT === */}
                <div className="flex flex-1 flex-col p-2">
                  <h3 className="font-sans text-[11px] font-bold uppercase leading-tight tracking-tight transition-colors group-hover:text-[#FF4500] sm:text-xs">{s.name}</h3>
                  <p className="mt-0.5 font-serif text-[10px] italic text-muted-foreground line-clamp-2 sm:text-[10px]">{s.desc}</p>
                </div>

                {/* === FOOTER BAR === */}
                <div className="flex items-center justify-between gap-1 border-t border-border/40 px-2 py-1.5">
                  <span className="min-w-0 flex-1 truncate font-mono text-[10px] uppercase tracking-[0.12em] text-[#00FF94] sm:text-[8px]" title={s.price}>{s.price}</span>
                  <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground transition-colors group-hover:text-foreground sm:text-[7px]">
                    {hasDetail ? "▸ DETAILS" : "▸ INQUIRE"}
                  </span>
                </div>

                {/* Side accent strip — left */}
                <div className="absolute left-0 top-0 h-full w-0.5 opacity-30 transition-opacity group-hover:opacity-100" style={{ background: catColor }} />
                {/* Hover glow */}
                <div className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{ background: `radial-gradient(60% 50% at 50% 50%, ${catColor}08, transparent 70%)` }} />
              </LinkComp>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-6 flex flex-col items-stretch gap-3 border border-border/60 bg-card/30 p-4 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground sm:text-[10px]">▸ NOT SURE WHERE TO START?</div>
          <a href="#contact" className="shrink-0 border border-foreground bg-foreground px-4 py-2 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-background transition-opacity hover:opacity-80 sm:text-[10px]">START YOUR PROJECT →</a>
        </div>
      </div>
    </section>
  );
}
