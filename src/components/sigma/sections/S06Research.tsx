"use client";

import * as React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useSigmaStore } from "@/lib/sigma/store";
import { SectionShell } from "../shared/SectionShell";
import { BrutalButton, Panel, Tag } from "../shared/components";
import { FileText, FlaskConical, Database, PenTool, Download, ArrowUpRight } from "lucide-react";

gsap.registerPlugin(useGSAP);

type LogKind = "PAPER" | "PATENT" | "DATASET" | "BLUEPRINT";
const KIND_META: Record<LogKind, { icon: typeof FileText; color: string }> = {
  PAPER: { icon: FileText, color: "#FFB300" },
  PATENT: { icon: FlaskConical, color: "#FF2D7E" },
  DATASET: { icon: Database, color: "#00E5FF" },
  BLUEPRINT: { icon: PenTool, color: "#C6FF00" },
};

const LOGS: { kind: LogKind; title: string; id: string; date: string; authors: string; abstract: string; size: string }[] = [
  { kind: "PAPER", title: "Sigma-Variable Orchestration of Multi-Model Agent Loops", id: "TSL-2024-007", date: "2024.11.04", authors: "NEURAL HAND, THE ARCHITECT", abstract: "We model a research lab as a sigma variable — the unmeasured deviation — and show it stabilizes multi-model agent loops under field drift.", size: "12pp" },
  { kind: "BLUEPRINT", title: "Nexus Map: 11-Sector Navigation Topology", id: "TSL-BP-014", date: "2024.10.21", authors: "THE ARCHITECT", abstract: "Full topology of the level-select navigation, transition states, and the GSAP panel-reveal kernel.", size: "4pp" },
  { kind: "DATASET", title: "Taungoo Community Voice Corpus (v2)", id: "TSL-DS-003", date: "2024.09.18", authors: "SIGNAL TENDER", abstract: "4-language voice corpus recorded with the Taungoo community under Helsinki-Trust partnership model.", size: "1.4GB" },
  { kind: "PATENT", title: "Quantum-Inspired Routing Kernel on Classical Hardware", id: "TSL-PT-001", date: "2024.08.30", authors: "QUANTUM SEER", abstract: "A combinatorial routing kernel that exploits quantum-inspired annealing on commodity CPUs.", size: "App." },
  { kind: "PAPER", title: "RWA Tokenization for Agricultural Microgrids", id: "TSL-2024-006", date: "2024.07.15", authors: "CHAIN WEAVER, EDGE RUNNER", abstract: "Tokenizing microgrid capacity as on-chain RWA, settling against physical IoT telemetry.", size: "9pp" },
  { kind: "DATASET", title: "Edge-IoT Telemetry Stream (30d window)", id: "TSL-DS-002", date: "2024.06.29", authors: "EDGE RUNNER", abstract: "240-node agricultural sensor mesh, 8.1M packets/day, anonymized.", size: "320MB" },
  { kind: "BLUEPRINT", title: "Brutalist Scanline Design System v2.4", id: "TSL-BP-011", date: "2024.06.02", authors: "THE ARCHITECT", abstract: "Tokens, panels, crosshairs, hazard stripes, and the glitch-type treatment used across the lab.", size: "6pp" },
  { kind: "PATENT", title: "Self-Learning CRM Loop with Prime Agent RLM", id: "TSL-PT-002", date: "2024.05.11", authors: "NEURAL HAND", abstract: "Reinforcement-loop manager that self-tunes a voice sales agent against field conversions.", size: "App." },
  { kind: "PAPER", title: "Local-Language NLP for Low-Resource Myanmar Dialects", id: "TSL-2024-005", date: "2024.04.22", authors: "SIGNAL TENDER", abstract: "A tokenizer and adapter stack for Bago-region dialects, evaluated on community-authored eval sets.", size: "11pp" },
];

const TABS: LogKind[] = ["PAPER", "PATENT", "DATASET", "BLUEPRINT"];

export function S06Research() {
  const { navigate } = useSigmaStore();
  const root = React.useRef<HTMLDivElement>(null);
  const [tab, setTab] = React.useState<LogKind | "ALL">("ALL");

  const filtered = tab === "ALL" ? LOGS : LOGS.filter((l) => l.kind === tab);

  useGSAP(
    () => {
      gsap.from("[data-log]", {
        opacity: 0,
        x: -24,
        duration: 0.5,
        ease: "power3.out",
        stagger: 0.06,
      });
    },
    { scope: root, dependencies: [tab] }
  );

  return (
    <SectionShell
      id="s06"
      title="RESEARCH LOGS"
      tagline="Field notes, papers, datasets, and blueprints — the written sigma."
    >
      <div ref={root} className="flex h-full flex-col gap-3">
        {/* tabs */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => setTab("ALL")}
            className={`border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] ${
              tab === "ALL" ? "border-[#FFB300] bg-[#FFB300] text-black" : "border-border text-muted-foreground hover:text-foreground"
            }`}
          >
            ALL · {LOGS.length}
          </button>
          {TABS.map((t) => {
            const count = LOGS.filter((l) => l.kind === t).length;
            const Icon = KIND_META[t].icon;
            return (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`inline-flex items-center gap-1.5 border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] transition ${
                  tab === t ? "text-black" : "border-border text-muted-foreground hover:text-foreground"
                }`}
                style={tab === t ? { background: KIND_META[t].color, borderColor: KIND_META[t].color } : undefined}
              >
                <Icon className="h-3 w-3" /> {t} · {count}
              </button>
            );
          })}
          <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            ARXIV-LIKE · OPEN ACCESS
          </span>
        </div>

        {/* list */}
        <div className="min-h-0 flex-1 overflow-y-auto sigma-scroll-hidden">
          <div className="divide-y divide-border/70 border border-border">
            {filtered.map((log, i) => {
              const Icon = KIND_META[log.kind].icon;
              return (
                <div
                  data-log
                  key={log.id}
                  className="group grid grid-cols-12 items-center gap-3 p-3 transition-colors hover:bg-foreground/[0.03]"
                >
                  <div className="col-span-1 font-mono text-3xl font-black text-foreground/15">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div
                    className="col-span-1 flex h-9 w-9 items-center justify-center border"
                    style={{ borderColor: `${KIND_META[log.kind].color}55`, color: KIND_META[log.kind].color }}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="col-span-12 md:col-span-6">
                    <div className="flex items-center gap-2">
                      <Tag accent={KIND_META[log.kind].color}>{log.kind}</Tag>
                      <span className="font-mono text-[9px] tracking-[0.2em] text-muted-foreground">{log.id}</span>
                    </div>
                    <div className="mt-1 font-sans text-base font-bold uppercase leading-tight tracking-tight">
                      {log.title}
                    </div>
                    <div className="mt-0.5 font-serif text-[12px] italic text-muted-foreground">
                      {log.abstract}
                    </div>
                    <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">
                      {log.authors} · {log.date}
                    </div>
                  </div>
                  <div className="col-span-6 hidden md:col-span-2 md:block">
                    <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">SIZE</div>
                    <div className="font-mono text-sm font-bold text-foreground">{log.size}</div>
                  </div>
                  <div className="col-span-6 flex items-center justify-end gap-2 md:col-span-2">
                    <button className="inline-flex items-center gap-1 border border-border px-2 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-foreground transition hover:bg-foreground hover:text-background">
                      <Download className="h-3 w-3" /> PDF
                    </button>
                    <button className="inline-flex items-center gap-1 border border-border px-2 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-foreground transition hover:bg-foreground hover:text-background">
                      <ArrowUpRight className="h-3 w-3" /> DOI
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-border pt-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            ▸ {filtered.length} entries · curated, peer-reviewed by the collective
          </span>
          <BrutalButton accent="#FFB300" onClick={() => navigate("s07")}>
            READ THE DATA STREAMS
          </BrutalButton>
        </div>
      </div>
    </SectionShell>
  );
}
