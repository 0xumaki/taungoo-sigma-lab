"use client";

import * as React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useSigmaStore } from "@/lib/sigma/store";
import { SectionShell } from "../shared/SectionShell";
import { Panel, Tag } from "../shared/components";
import { SigmaParticles } from "../shared/SigmaParticles";

gsap.registerPlugin(useGSAP);

const PILLARS = [
  {
    code: "SYS·01",
    name: "NEURAL FORGE",
    glyph: "◴",
    desc: "Multi-model AI synergy — LLM orchestration, voice agents, and self-learning CRM loops trained on real field data.",
    metrics: [
      ["MODELS", "7"],
      ["AGENTS", "12"],
      ["UPTIME", "99.2%"],
    ],
    load: 82,
  },
  {
    code: "SYS·02",
    name: "WEB3 RAIL",
    glyph: "⬡",
    desc: "DeFi navigators, RWA tokenization, DAO governance rails, and non-custodial wallets — shipped to mainnet.",
    metrics: [
      ["CHAINS", "6"],
      ["TVL", "$1.4M"],
      ["CONTRACTS", "38"],
    ],
    load: 64,
  },
  {
    code: "SYS·03",
    name: "EDGE / IOT",
    glyph: "⌖",
    desc: "Smart-systems mesh: agricultural sensors, microgrid controllers, and on-device inference at the Taungoo tech park.",
    metrics: [
      ["NODES", "240"],
      ["PACKETS/D", "8.1M"],
      ["LATENCY", "41ms"],
    ],
    load: 71,
  },
  {
    code: "SYS·04",
    name: "QUANTUM SIM",
    glyph: "⟁",
    desc: "Quantum-inspired optimization kernels for routing, scheduling, and combinatorial search on classical hardware.",
    metrics: [
      ["QUBITS", "32sim"],
      ["GATES", "1.2M"],
      ["FIDELITY", "0.984"],
    ],
    load: 48,
  },
  {
    code: "SYS·05",
    name: "COMMUNITY OS",
    glyph: "◍",
    desc: "Digital literacy programs, local-language NLP, and open datasets built with — not for — the Taungoo community.",
    metrics: [
      ["LEARNERS", "1.8k"],
      ["LANGS", "4"],
      ["OPEN DATA", "62"],
    ],
    load: 90,
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
      tagline="Five research pillars wired into one engine. Each ships to production."
    >
      <div ref={root} className="relative grid h-full grid-cols-12 grid-rows-6 gap-3">
        {/* Ambient system particles */}
        <SigmaParticles count={18} color="#00E5FF" />
        {/* featured pillar 1 — large */}
        <PillarCard pillar={PILLARS[0]} className="col-span-12 row-span-3 md:col-span-5" featured />
        {/* featured pillar 2 */}
        <PillarCard pillar={PILLARS[1]} className="col-span-12 row-span-3 md:col-span-4" featured />
        {/* load monitor */}
        <Panel label="LOAD MONITOR" id="LIVE" accent="#00E5FF" className="col-span-12 row-span-3 md:col-span-3">
          <div className="flex h-full flex-col justify-between p-3">
            <div className="space-y-2">
              {PILLARS.map((p) => (
                <div key={p.code}>
                  <div className="flex justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                    <span>{p.code}</span>
                    <span className="text-foreground">{p.load}%</span>
                  </div>
                  <div className="mt-1 h-1.5 w-full bg-foreground/10">
                    <div
                      className="h-full transition-all"
                      style={{ width: `${p.load}%`, background: "#00E5FF" }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <Tag accent="#00E5FF">ALL SYSTEMS NOMINAL</Tag>
          </div>
        </Panel>

        {/* pillar 3 */}
        <PillarCard pillar={PILLARS[2]} className="col-span-12 row-span-3 md:col-span-4" />
        {/* pillar 4 */}
        <PillarCard pillar={PILLARS[3]} className="col-span-12 row-span-3 md:col-span-4" />
        {/* pillar 5 + CTA */}
        <div className="col-span-12 row-span-3 md:col-span-4">
          <PillarCard pillar={PILLARS[4]} className="h-full" />
        </div>
      </div>
    </SectionShell>
  );
}

function PillarCard({
  pillar,
  className,
  featured,
}: {
  pillar: (typeof PILLARS)[number];
  className?: string;
  featured?: boolean;
}) {
  return (
    <Panel
      data-pillar
      label={pillar.code}
      id={pillar.name}
      accent="#00E5FF"
      scan
      className={`group relative overflow-hidden ${className ?? ""}`}
    >
      <div className="flex h-full flex-col p-4">
        {/* glyph + name */}
        <div className="flex items-start justify-between">
          <div
            className="sigma-spin-slow flex h-14 w-14 items-center justify-center border font-mono text-2xl"
            style={{ borderColor: "#00E5FF55", color: "#00E5FF" }}
          >
            {pillar.glyph}
          </div>
          {featured && <Tag accent="#00E5FF">FEATURED</Tag>}
        </div>
        <h3 className="mt-3 font-sans text-2xl font-black uppercase leading-none tracking-tight">
          {pillar.name}
        </h3>
        <p className="mt-2 font-serif text-sm italic text-muted-foreground">
          {pillar.desc}
        </p>

        {/* metrics */}
        <div className="mt-auto grid grid-cols-3 gap-2 pt-3">
          {pillar.metrics.map(([k, v]) => (
            <div key={k} className="border-l border-border/70 pl-2">
              <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">
                {k}
              </div>
              <div className="font-mono text-lg font-bold text-foreground">{v}</div>
            </div>
          ))}
        </div>

        {/* sweeping accent line on hover */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
          style={{ background: "#00E5FF" }}
        />
      </div>
    </Panel>
  );
}
