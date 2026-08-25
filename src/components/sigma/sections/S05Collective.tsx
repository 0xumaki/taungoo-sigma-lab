"use client";

import * as React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useSigmaStore } from "@/lib/sigma/store";
import { SectionShell } from "../shared/SectionShell";
import { Panel, Tag } from "../shared/components";

gsap.registerPlugin(useGSAP);

const MEMBERS = [
  { code: "OP·01", name: "THE ARCHITECT", role: "Lab Director", focus: "Strategy · Sigma Variable", sig: 0.99, glyph: "Σ", accent: "#FF2D7E" },
  { code: "OP·02", name: "NEURAL HAND", role: "AI Lead", focus: "Multi-model orchestration", sig: 0.94, glyph: "◴", accent: "#00E5FF" },
  { code: "OP·03", name: "CHAIN WEAVER", role: "Web3 Lead", focus: "DeFi · RWA · DAO", sig: 0.91, glyph: "⬡", accent: "#C6FF00" },
  { code: "OP·04", name: "EDGE RUNNER", role: "IoT Engineer", focus: "Sensors · Microgrids", sig: 0.88, glyph: "⌖", accent: "#FFB300" },
  { code: "OP·05", name: "QUANTUM SEER", role: "Research Scientist", focus: "Quantum-inspired optimization", sig: 0.86, glyph: "⟁", accent: "#B388FF" },
  { code: "OP·06", name: "SIGNAL TENDER", role: "Community Lead", focus: "Literacy · Local NLP", sig: 0.93, glyph: "◍", accent: "#00FF94" },
  { code: "OP·07", name: "NULL CIPHER", role: "Security", focus: "Threat modeling · Audits", sig: 0.97, glyph: "⚿", accent: "#FF3D3D" },
  { code: "OP·08", name: "GHOST PRINTER", role: "Hardware", focus: "Lab equipment · PCB", sig: 0.82, glyph: "⚙", accent: "#FFEB3B" },
];

export function S05Collective() {
  const { navigate } = useSigmaStore();
  const root = React.useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from("[data-op]", {
        opacity: 0,
        y: 30,
        duration: 0.55,
        ease: "power3.out",
        stagger: { each: 0.06, from: "start" },
      });
    },
    { scope: root }
  );

  return (
    <SectionShell
      id="s05"
      title="COLLECTIVE"
      tagline="Eight operators behind the sigma variable. No egos, only handles."
    >
      <div ref={root} className="grid h-full grid-cols-12 gap-3">
        {/* intro panel */}
        <Panel
          label="THE SIGMA COLLECTIVE"
          id="08 OPS"
          accent="#FF2D7E"
          className="col-span-12 md:col-span-4 md:row-span-2"
          scan
        >
          <div className="flex h-full flex-col p-4">
            <div className="sigma-spin-slow mx-auto mb-3 flex h-24 w-24 items-center justify-center border font-mono text-5xl"
              style={{ borderColor: "#FF2D7E55", color: "#FF2D7E" }}>
              Σ
            </div>
            <p className="font-serif text-sm italic text-foreground/80">
              We operate under handles, not egos. Each operator is a node in the
              sigma mesh — measured by signal, not seniority.
            </p>
            <div className="mt-auto grid grid-cols-2 gap-2 pt-4">
              {[
                ["OPERATORS", "8"],
                ["ACTIVE NODES", "8/8"],
                ["MEAN SIG", "0.91"],
                ["TIME-ZONES", "3"],
              ].map(([k, v]) => (
                <div key={k} className="border-l border-border/70 pl-2">
                  <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">
                    {k}
                  </div>
                  <div className="font-mono text-lg font-bold text-foreground">{v}</div>
                </div>
              ))}
            </div>
          </div>
        </Panel>

        {/* members grid */}
        {MEMBERS.map((m) => (
          <Panel
            data-op
            key={m.code}
            className="group relative col-span-6 overflow-hidden md:col-span-4 lg:col-span-2"
          >
            <div className="flex flex-col p-3">
              {/* geometric avatar */}
              <div className="relative aspect-square overflow-hidden border border-border/70">
                <div
                  className="absolute inset-0 opacity-20"
                  style={{ background: m.accent }}
                />
                <div className="sigma-grid-fine absolute inset-0 opacity-30" />
                <div className="sigma-scanlines absolute inset-0 opacity-50" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span
                    className="sigma-spin-slow font-sans text-6xl font-black"
                    style={{ color: m.accent }}
                  >
                    {m.glyph}
                  </span>
                </div>
                <span className="absolute left-1.5 top-1.5 font-mono text-[9px] tracking-[0.18em] text-foreground/70">
                  {m.code}
                </span>
                <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 sigma-pulse" style={{ background: m.accent }} />
              </div>
              <div className="mt-2">
                <div className="font-sans text-sm font-bold uppercase leading-tight tracking-tight">
                  {m.name}
                </div>
                <div className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">
                  {m.role}
                </div>
              </div>
              <div className="mt-1 font-serif text-[11px] italic text-muted-foreground/80">
                {m.focus}
              </div>
              {/* sigma bar */}
              <div className="mt-2">
                <div className="flex justify-between font-mono text-[8px] uppercase tracking-[0.18em] text-muted-foreground">
                  <span>SIG</span>
                  <span style={{ color: m.accent }}>{m.sig.toFixed(2)}</span>
                </div>
                <div className="mt-0.5 h-1 w-full bg-foreground/10">
                  <div className="h-full" style={{ width: `${m.sig * 100}%`, background: m.accent }} />
                </div>
              </div>
            </div>
          </Panel>
        ))}
      </div>
    </SectionShell>
  );
}
