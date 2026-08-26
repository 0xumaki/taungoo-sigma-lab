"use client";

import * as React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useSigmaStore } from "@/lib/sigma/store";
import { SectionShell } from "../shared/SectionShell";
import { BrutalButton, Panel, Tag } from "../shared/components";
import { SigmaParticles } from "../shared/SigmaParticles";

gsap.registerPlugin(useGSAP);

const PARTNERS = [
  { name: "HELSINKI TRUST", type: "TRUST ANCHOR", model: "Partnership", since: "2024.01", strength: 98, accent: "#B388FF" },
  { name: "TAUNGOO TECH PARK", type: "FACILITY", model: "Host", since: "2024.01", strength: 96, accent: "#B388FF" },
  { name: "BAGO REGIONAL GOV", type: "PUBLIC", model: "MoU", since: "2024.03", strength: 82, accent: "#B388FF" },
  { name: "OPEN SOURCE COMMUNITY", type: "MESH", model: "Reciprocal", since: "2024.02", strength: 94, accent: "#B388FF" },
  { name: "MM LEGAL COLLECTIVE", type: "LEGAL", model: "Advisory", since: "2024.04", strength: 76, accent: "#B388FF" },
  { name: "ASEAN SWAP NET", type: "ECONOMIC", model: "Research", since: "2024.05", strength: 71, accent: "#B388FF" },
  { name: "ROYAL DAO", type: "GOVERNANCE", model: "Pilot", since: "2024.06", strength: 68, accent: "#B388FF" },
  { name: "YUME DIGITAL", type: "BRAND", model: "Exchange", since: "2024.07", strength: 64, accent: "#B388FF" },
];

export function S09Alliances() {
  const { navigate } = useSigmaStore();
  const root = React.useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from("[data-partner]", {
        opacity: 0,
        scale: 0.9,
        duration: 0.5,
        ease: "power3.out",
        stagger: { each: 0.06, from: "center" },
      });
    },
    { scope: root }
  );

  return (
    <SectionShell
      id="s09"
      title="ALLIANCES"
      tagline="Sector 09 is the partner network — universities, companies, and communities we build with."
    >
      <div ref={root} className="relative grid h-full grid-cols-12 gap-3">
        {/* Ambient alliance particles */}
        <SigmaParticles count={14} color="#B388FF" />
        {/* relationship diagram */}
        <Panel label="RELATIONSHIP MESH" id="8 NODES" accent="#B388FF" className="col-span-12 lg:col-span-5" scan>
          <div className="relative h-full min-h-[280px] p-3">
            <svg viewBox="0 0 400 320" className="h-full w-full">
              {/* connections */}
              {PARTNERS.map((p, i) => {
                const a = (i / PARTNERS.length) * Math.PI * 2 - Math.PI / 2;
                const x = 200 + Math.cos(a) * 120;
                const y = 160 + Math.sin(a) * 110;
                return (
                  <line
                    data-conn
                    key={p.name}
                    x1="200"
                    y1="160"
                    x2={x}
                    y2={y}
                    stroke={p.accent}
                    strokeWidth={p.strength > 80 ? 1.6 : 0.8}
                    opacity={p.strength / 120}
                    strokeDasharray="4 4"
                  >
                    <animate
                      attributeName="stroke-dashoffset"
                      from="0"
                      to="-16"
                      dur="1.2s"
                      repeatCount="indefinite"
                    />
                  </line>
                );
              })}
              {/* center node */}
              <circle cx="200" cy="160" r="34" fill="#0a0a0a" stroke="#B388FF" strokeWidth="2" />
              <text x="200" y="167" textAnchor="middle" fill="#B388FF" fontSize="22" fontFamily="monospace" fontWeight="bold">Σ</text>
              <text x="200" y="200" textAnchor="middle" fill="#888" fontSize="9" fontFamily="monospace" letterSpacing="2">TAUNGOO SIGMA</text>
              {/* partner nodes */}
              {PARTNERS.map((p, i) => {
                const a = (i / PARTNERS.length) * Math.PI * 2 - Math.PI / 2;
                const x = 200 + Math.cos(a) * 120;
                const y = 160 + Math.sin(a) * 110;
                return (
                  <g key={p.name} data-partner>
                    <circle cx={x} cy={y} r={10 + (p.strength - 60) / 6} fill="#0a0a0a" stroke={p.accent} strokeWidth="1.5" />
                    <circle cx={x} cy={y} r="3" fill={p.accent} />
                    <text x={x} y={y - 16} textAnchor="middle" fill="#c9d1d9" fontSize="8" fontFamily="monospace" letterSpacing="1">
                      {p.name.slice(0, 16)}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </Panel>

        {/* partner list */}
        <div className="col-span-12 grid grid-cols-1 gap-2 lg:col-span-7 sm:grid-cols-2">
          {PARTNERS.map((p, i) => (
            <Panel
              data-partner
              key={p.name}
              label={p.type}
              id={p.since}
              accent={p.accent}
              className="group"
            >
              <div className="p-3">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-sans text-sm font-bold uppercase leading-tight tracking-tight">
                    {p.name}
                  </h3>
                  <Tag accent={p.accent}>{p.model}</Tag>
                </div>
                <div className="mt-2">
                  <div className="flex justify-between font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">
                    <span>BOND STRENGTH</span>
                    <span style={{ color: p.accent }}>{p.strength}%</span>
                  </div>
                  <div className="mt-1 h-1 w-full bg-foreground/10">
                    <div
                      className="h-full transition-all duration-700"
                      style={{ width: `${p.strength}%`, background: p.accent }}
                    />
                  </div>
                </div>
              </div>
            </Panel>
          ))}
        </div>

        <div className="col-span-12 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            ▸ Partnership model: Helsinki Trust · open to new alliances
          </span>
          <BrutalButton accent="#B388FF" onClick={() => navigate("s10")}>
            REQUEST ACCESS
          </BrutalButton>
        </div>
      </div>
    </SectionShell>
  );
}
