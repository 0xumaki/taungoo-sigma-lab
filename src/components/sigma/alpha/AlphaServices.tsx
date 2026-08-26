"use client";

import * as React from "react";
import { PageTransitionLink } from "@/components/sigma/PageTransitionLink";

const SERVICES = [
  { name: "AI Chatbot", icon: "◐", desc: "Custom AI chatbots with multi-model orchestration", price: "from 3,020,000 MMK", cat: "AI", slug: "ai-chatbot" },
  { name: "Voice AI", icon: "♫", desc: "Voice agents for sales, support, and automation", price: "from 6,040,000 MMK", cat: "AI", slug: "voice-ai" },
  { name: "Agent Swarm", icon: "⬡", desc: "Multi-agent systems for complex workflows", price: "from 9,660,000 MMK", cat: "AI", slug: "agent-swarm" },
  { name: "AI Automation", icon: "⚙", desc: "N8N workflows, process automation, CRM loops", price: "from 3,620,000 MMK", cat: "AI", slug: "ai-automation" },
  { name: "API & MCP", icon: "⌗", desc: "Custom APIs, MCP servers, and integration services", price: "from 4,830,000 MMK", cat: "AI", slug: "api-mcp" },
  { name: "HERMES / Openclaw / GrokBot", icon: "⚡", desc: "Specialized AI agent platforms and integrations", price: "custom", cat: "AI", slug: "hermes-openclaw-grokbot" },
  { name: "AI Video Generation", icon: "▶", desc: "Commercial and MV video generation pipelines", price: "from 2,415,000 MMK", cat: "DESIGN", slug: "ai-video-generation" },
  { name: "3D Modeling", icon: "◈", desc: "Product visualization, architectural, and game assets", price: "from 1,810,000 MMK", cat: "DESIGN", slug: "3d-modeling" },
  { name: "Graphic Design", icon: "◆", desc: "Brand identity, marketing collateral, and UI kits", price: "from 1,210,000 MMK", cat: "DESIGN", slug: "graphic-design" },
  { name: "Content & Copywriting", icon: "✎", desc: "Technical writing, marketing copy, and documentation", price: "from 966,000 MMK", cat: "DESIGN", slug: "content-copywriting" },
  { name: "Online Media Buying", icon: "▲", desc: "Ad campaigns, media strategy, and performance marketing", price: "from 1,810,000 MMK", cat: "DESIGN", slug: "online-media-buying" },
  { name: "UI/UX Design", icon: "◡", desc: "Product design, design systems, and prototyping", price: "from 2,415,000 MMK", cat: "DESIGN", slug: "ui-ux-design" },
  { name: "Android & iOS App", icon: "▣", desc: "Native and cross-platform mobile applications", price: "from 12,080,000 MMK", cat: "FULL-STACK", slug: "android-ios-app" },
  { name: "Web / WebApp", icon: "▣", desc: "Full-stack web applications with modern frameworks", price: "from 6,040,000 MMK", cat: "FULL-STACK", slug: "web-webapp" },
  { name: "Chrome Extensions", icon: "⬚", desc: "Browser automation and productivity extensions", price: "from 2,415,000 MMK", cat: "FULL-STACK", slug: "chrome-extensions" },
  { name: "Desktop / MacBook Apps", icon: "◱", desc: "Cross-platform desktop applications (Electron/Tauri)", price: "from 9,660,000 MMK", cat: "FULL-STACK", slug: "desktop-macbook-apps" },
  { name: "ASO", icon: "⊙", desc: "App Store Optimization for mobile and web stores", price: "from 1,210,000 MMK", cat: "FULL-STACK", slug: "aso" },
  { name: "Web3 Wallets", icon: "⬡", desc: "Non-custodial wallet development and integration", price: "from 18,110,000 MMK", cat: "WEB3", slug: "web3-wallets" },
  { name: "AMM / DEX", icon: "⇄", desc: "Automated market maker and DEX protocol development", price: "from 24,150,000 MMK", cat: "WEB3", slug: "amm-dex" },
  { name: "DAO Governance", icon: "◍", desc: "DAO frameworks, voting, and treasury management", price: "from 18,110,000 MMK", cat: "WEB3", slug: "dao-governance" },
  { name: "NFT Systems", icon: "✦", desc: "NFT minting, marketplace, and royalty infrastructure", price: "from 12,080,000 MMK", cat: "WEB3", slug: "nft-systems" },
  { name: "Security Audit", icon: "⚿", desc: "Smart contract and protocol security audits", price: "from 6,040,000 MMK", cat: "WEB3", slug: "security-audit" },
  { name: "Smart Contract Dev", icon: "∎", desc: "Solidity/Rust contract development and deployment", price: "from 9,660,000 MMK", cat: "WEB3", slug: "smart-contract-development" },
  { name: "Bug Bounty", icon: "▣", desc: "Security testing and vulnerability assessment programs", price: "from 3,620,000 MMK", cat: "WEB3", slug: "bug-bounty" },
  { name: "Money Market Development", icon: "$", desc: "DeFi lending, borrowing, and yield protocols", price: "from 30,190,000 MMK", cat: "WEB3", slug: "money-market-development" },
  { name: "CBDC Development", icon: "₵", desc: "Central bank digital currency infrastructure", price: "custom", cat: "WEB3", slug: "cbdc-development" },
  { name: "Mobile/Web Game Dev", icon: "◆", desc: "Mobile and web-based game development with Unity, Phaser, and WebGL", price: "from 7,240,000 MMK", cat: "FULL-STACK", slug: "mobile-web-game-development" },
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
  "smart-contract-development", "bug-bounty", "money-market-development", "cbdc-development",
  "mobile-web-game-development",
]);

export function AlphaServices() {
  const [activeCat, setActiveCat] = React.useState("ALL");

  const filtered = React.useMemo(() => {
    if (activeCat === "ALL") return SERVICES;
    return SERVICES.filter((s) => s.cat === activeCat);
  }, [activeCat]);

  return (
    <section id="services" className="relative border-t border-border px-3 py-20">
      <div className="sigma-grid pointer-events-none absolute inset-0 opacity-10" />
      <div className="sigma-scanlines pointer-events-none absolute inset-0 opacity-15" />

      <div className="relative z-10 mx-auto w-full max-w-[1600px]">
        {/* Header */}
        <div className="flex items-end justify-between gap-4 border-b border-border pb-4">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#FF4500]">▸ 03 / SERVICES</div>
            <h2 className="mt-2 font-sans text-4xl font-black uppercase tracking-tight sm:text-6xl">
              WHAT WE <span style={{ color: "#FF4500" }}>BUILD.</span>
            </h2>
            <p className="mt-2 font-serif text-base italic text-muted-foreground">
              27 services across AI, Web3, and full-stack development. Each with detail pages, pricing packages, and comparison tables.
            </p>
          </div>
          <div className="hidden shrink-0 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground sm:block">
            <span className="text-[#FF4500]">27</span> SERVICES · <span className="text-[#00FF94]">{filtered.length}</span> SHOWN
          </div>
        </div>

        {/* Working category filters */}
        <div className="mt-6 flex flex-wrap gap-1">
          {CATEGORIES.map((cat) => {
            const isActive = activeCat === cat.id;
            const count = cat.id === "ALL" ? SERVICES.length : SERVICES.filter((s) => s.cat === cat.id).length;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCat(cat.id)}
                className={`flex items-center gap-1.5 border px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.18em] transition-all ${
                  isActive ? "text-black" : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground"
                }`}
                style={isActive ? { background: cat.color, borderColor: cat.color } : undefined}
              >
                {cat.label}
                <span className={`flex h-4 min-w-4 items-center justify-center px-1 text-[8px] ${isActive ? "bg-black/20" : "bg-foreground/10"}`}>{count}</span>
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
                className="group relative flex flex-col overflow-hidden border border-border bg-card/30 transition-all hover:border-foreground/40"
                style={{ clipPath: "polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))" }}
              >
                {/* === HEADER BAR === */}
                <div className="flex items-center justify-between border-b border-border/40 px-2 py-1">
                  {/* Left hazard dot + cat label */}
                  <div className="flex items-center gap-1">
                    <span className="h-1.5 w-1.5" style={{ background: catColor }} />
                    <span className="font-mono text-[6px] uppercase tracking-[0.16em]" style={{ color: catColor }}>{s.cat}</span>
                  </div>
                  {/* Right index */}
                  <span className="font-mono text-[6px] uppercase tracking-[0.12em] text-muted-foreground">{String(i + 1).padStart(2, "0")}/{String(filtered.length).padStart(2, "0")}</span>
                </div>

                {/* === ICON ZONE === */}
                <div className="relative flex items-center justify-center py-4" style={{ background: `linear-gradient(180deg, ${catColor}0a, transparent)` }}>
                  {/* Hazard stripe top-left corner */}
                  <div className="absolute left-0 top-0 h-4 w-4" style={{ background: `repeating-linear-gradient(45deg, ${catColor} 0, ${catColor} 2px, transparent 2px, transparent 4px)` }} />
                  {/* Crosshair marks */}
                  <span className="absolute right-1 top-1 h-1.5 w-1.5 border-r border-t" style={{ borderColor: `${catColor}44` }} />
                  {/* Large icon */}
                  <span className="font-sans text-3xl font-black transition-transform group-hover:scale-110" style={{ color: catColor }}>{s.icon}</span>
                  {/* Scanlines on icon area */}
                  <div className="pointer-events-none absolute inset-0 opacity-15" style={{ background: "repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(0,0,0,0.15) 3px, rgba(0,0,0,0.15) 4px)" }} />
                </div>

                {/* === CONTENT === */}
                <div className="flex flex-1 flex-col p-2">
                  <h3 className="font-sans text-xs font-bold uppercase leading-tight tracking-tight transition-colors group-hover:text-[#FF4500]">{s.name}</h3>
                  <p className="mt-0.5 font-serif text-[10px] italic text-muted-foreground line-clamp-2">{s.desc}</p>
                </div>

                {/* === FOOTER BAR === */}
                <div className="flex items-center justify-between border-t border-border/40 px-2 py-1.5">
                  <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-[#00FF94]">{s.price}</span>
                  <span className="font-mono text-[7px] uppercase tracking-[0.12em] text-muted-foreground transition-colors group-hover:text-foreground">
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
        <div className="mt-6 flex items-center justify-between border border-border/60 bg-card/30 p-4">
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">▸ NOT SURE WHICH SERVICE YOU NEED?</div>
          <a href="#contact" className="border border-foreground bg-foreground px-4 py-2 font-mono text-[10px] uppercase tracking-[0.2em] text-background transition-opacity hover:opacity-80">CONTACT OUR TEAM →</a>
        </div>
      </div>
    </section>
  );
}
