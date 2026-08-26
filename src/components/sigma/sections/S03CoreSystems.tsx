"use client";

import * as React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useSigmaStore } from "@/lib/sigma/store";
import { SectionShell } from "../shared/SectionShell";
import { Panel, Tag } from "../shared/components";
import { SigmaParticles } from "../shared/SigmaParticles";

gsap.registerPlugin(useGSAP);

/**
 * S03 — MARKETS WE SERVICE
 * --------------------------------------------------------------
 * Six markets the lab ships to right now. Each card is a maximalist
 * sci-fi dossier: cut-corner clip-path, hazard stripes, scanlines,
 * data labels, big glyph + accent glow.
 */
interface Market {
  code: string;
  name: string;
  glyph: string;
  desc: string;
  services: number;
  target: string;
  accent: string;
  load: number;
  samples: string[];
}

const MARKETS: Market[] = [
  {
    code: "MKT·01",
    name: "AI / AUTOMATION",
    glyph: "◴",
    desc: "Chatbots, voice agents, and N8N workflow automations that swallow repetitive work for businesses — from SaaS support to enterprise CRM loops.",
    services: 14,
    target: "BUSINESSES · AGENCIES",
    accent: "#00E5FF",
    load: 82,
    samples: ["LLM Chatbots", "Voice Agents", "N8N Workflows", "CRM Loops"],
  },
  {
    code: "MKT·02",
    name: "WEB3 / DeFi",
    glyph: "⬡",
    desc: "Smart contracts, DEX aggregators, and non-custodial wallets shipped to mainnet for fintech — audited, gas-tuned, and ready for custody.",
    services: 11,
    target: "FINTECH · DAOs",
    accent: "#C6FF00",
    load: 64,
    samples: ["Smart Contracts", "DEX", "Wallets", "RWA Rails"],
  },
  {
    code: "MKT·03",
    name: "FULL-STACK",
    glyph: "◰",
    desc: "Web and mobile apps for startups & enterprise — Next.js, React Native, Prisma, edge runtimes. Production-grade, deployed, monitored.",
    services: 18,
    target: "STARTUPS · ENTERPRISE",
    accent: "#FF2D7E",
    load: 76,
    samples: ["Web Apps", "Mobile Apps", "APIs", "Admin Consoles"],
  },
  {
    code: "MKT·04",
    name: "DESIGN / CONTENT",
    glyph: "◍",
    desc: "UI/UX systems, brand identity, and content engines for marketing teams — design tokens, motion, copy, and asset pipelines that scale.",
    services: 9,
    target: "BRANDS · MARKETING",
    accent: "#B388FF",
    load: 58,
    samples: ["UI/UX", "Branding", "Copy", "Motion"],
  },
  {
    code: "MKT·05",
    name: "MULTIMEDIA",
    glyph: "▲",
    desc: "AI video generation, 3D scenes, and game prototypes — real-time WebGL, generative pipelines, and creative tooling for studios.",
    services: 7,
    target: "STUDIOS · CREATORS",
    accent: "#FFB300",
    load: 51,
    samples: ["Video Gen", "3D / R3F", "Game Dev", "Creative Tools"],
  },
  {
    code: "MKT·06",
    name: "INFRASTRUCTURE",
    glyph: "⌖",
    desc: "Cloud, IoT mesh, and edge compute for operations — sensor networks, microgrids, and on-device inference at the Yangon lab.",
    services: 12,
    target: "OPS · IOT ROLLOUTS",
    accent: "#00FF94",
    load: 71,
    samples: ["Cloud", "IoT Mesh", "Edge Compute", "Microgrids"],
  },
];

export function S03CoreSystems() {
  const { navigate } = useSigmaStore();
  const root = React.useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from("[data-pillar]", {
        opacity: 0,
        y: 40,
        duration: 0.6,
        ease: "power3.out",
        stagger: 0.1,
      });
    },
    { scope: root }
  );

  return (
    <SectionShell
      id="s03"
      title="CORE SYSTEMS"
      tagline="Sector 03 is the core systems map — six verticals we ship to right now, from AI automation to edge IoT for operations."
    >
      <div ref={root} className="relative grid h-full grid-cols-12 gap-3 overflow-y-auto sigma-scroll-hidden lg:grid-rows-[repeat(24,minmax(min-content,1fr))]">
        {/* Ambient system particles */}
        <SigmaParticles count={18} color="#00E5FF" />

        {/* featured market 1 — large (taller) */}
        <MarketCard market={MARKETS[0]} className="col-span-12 row-span-12 md:col-span-5" featured />
        {/* featured market 2 (taller) */}
        <MarketCard market={MARKETS[1]} className="col-span-12 row-span-12 md:col-span-4" featured />

        {/* market load monitor (taller) */}
        <Panel label="MARKET LOAD" id="LIVE" accent="#00E5FF" className="col-span-12 row-span-12 md:col-span-3">
          <div className="flex h-full flex-col justify-between p-3">
            <div className="space-y-2">
              {MARKETS.map((m) => (
                <div key={m.code}>
                  <div className="flex justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                    <span>{m.code}</span>
                    <span style={{ color: m.accent }}>{m.load}%</span>
                  </div>
                  <div className="mt-1 h-1.5 w-full bg-foreground/10">
                    <div
                      className="h-full transition-all"
                      style={{ width: `${m.load}%`, background: m.accent }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <Tag accent="#00E5FF">ALL MARKETS NOMINAL</Tag>
          </div>
        </Panel>

        {/* market 3 (taller) */}
        <MarketCard market={MARKETS[2]} className="col-span-12 row-span-12 md:col-span-3" />
        {/* market 4 (taller) */}
        <MarketCard market={MARKETS[3]} className="col-span-12 row-span-12 md:col-span-3" />
        {/* market 5 (taller) */}
        <MarketCard market={MARKETS[4]} className="col-span-12 row-span-12 md:col-span-3" />
        {/* market 6 (taller) */}
        <MarketCard market={MARKETS[5]} className="col-span-12 row-span-12 md:col-span-3" />
      </div>
    </SectionShell>
  );
}

function MarketCard({
  market,
  className,
  featured,
}: {
  market: Market;
  className?: string;
  featured?: boolean;
}) {
  const a = market.accent;
  return (
    <Panel
      data-pillar
      label={market.code}
      id={market.target}
      accent={a}
      scan
      className={`group relative ${className ?? ""}`}
    >
      <div className="flex flex-col p-4">
        {/* hazard stripe — top-left diagonal */}
        <div
          className="pointer-events-none absolute left-0 top-0 h-6 w-6 opacity-80"
          style={{
            background: `repeating-linear-gradient(45deg, ${a} 0, ${a} 2px, transparent 2px, transparent 4px)`,
          }}
          aria-hidden
        />
        {/* hazard stripe — bottom-right diagonal */}
        <div
          className="pointer-events-none absolute bottom-0 right-0 h-6 w-6 opacity-80"
          style={{
            background: `repeating-linear-gradient(45deg, ${a} 0, ${a} 2px, transparent 2px, transparent 4px)`,
          }}
          aria-hidden
        />

        {/* glyph + services count */}
        <div className="relative flex items-start justify-between">
          <div
            className="sigma-spin-slow relative flex h-14 w-14 items-center justify-center border font-mono text-2xl"
            style={{
              borderColor: `${a}55`,
              color: a,
              clipPath:
                "polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))",
            }}
          >
            {/* accent glow */}
            <span
              className="pointer-events-none absolute inset-0 opacity-30 blur-md"
              style={{ background: `radial-gradient(circle at center, ${a}, transparent 70%)` }}
              aria-hidden
            />
            <span className="relative">{market.glyph}</span>
          </div>

          {/* services readout */}
          <div className="flex flex-col items-end border-l border-border/70 pl-3">
            <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
              SERVICES
            </span>
            <span
              className="font-mono text-3xl font-black leading-none"
              style={{ color: a }}
            >
              {String(market.services).padStart(2, "0")}
            </span>
            <span className="font-mono text-[8px] uppercase tracking-[0.18em] text-muted-foreground">
              LIVE OFFERS
            </span>
          </div>
        </div>

        {featured && (
          <div className="mt-2">
            <Tag accent={a}>FEATURED MARKET</Tag>
          </div>
        )}

        {/* market name */}
        <h3 className="mt-3 font-sans text-2xl font-black uppercase leading-none tracking-tight">
          {market.name}
        </h3>

        {/* target data label */}
        <div
          className="mt-1.5 inline-flex w-fit items-center gap-1.5 border bg-background/60 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.22em]"
          style={{ borderColor: `${a}55`, color: a }}
        >
          <span className="h-1.5 w-1.5" style={{ background: a }} />
          ▸ TARGET · {market.target}
        </div>

        {/* description */}
        <p className="mt-2 font-serif text-sm italic text-muted-foreground">
          {market.desc}
        </p>

        {/* service samples */}
        <div className="mt-3 pt-2 border-t border-border/40">
          <div className="font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground">
            ▸ SAMPLES
          </div>
          <div className="mt-1.5 flex flex-nowrap gap-1 overflow-x-auto sigma-scroll-hidden">
            {market.samples.map((s) => (
              <span
                key={s}
                className="border px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.12em] text-foreground/80 whitespace-nowrap shrink-0"
                style={{ borderColor: `${a}33` }}
              >
                {s}
              </span>
            ))}
          </div>
        </div>

        {/* sweeping accent line on hover */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
          style={{ background: a }}
        />
      </div>
    </Panel>
  );
}
