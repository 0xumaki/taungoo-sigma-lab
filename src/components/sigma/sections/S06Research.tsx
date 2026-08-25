"use client";

import * as React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useSigmaStore } from "@/lib/sigma/store";
import { SectionShell } from "../shared/SectionShell";
import { BrutalButton, Panel, Tag } from "../shared/components";
import { sigmaSound } from "@/lib/sigma/sound";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FileText, FlaskConical, Database, PenTool, Download, ArrowUpRight, BookOpen } from "lucide-react";

gsap.registerPlugin(useGSAP);

type LogKind = "PAPER" | "PATENT" | "DATASET" | "BLUEPRINT";
const KIND_META: Record<LogKind, { icon: typeof FileText; color: string }> = {
  PAPER: { icon: FileText, color: "#FFB300" },
  PATENT: { icon: FlaskConical, color: "#FF2D7E" },
  DATASET: { icon: Database, color: "#00E5FF" },
  BLUEPRINT: { icon: PenTool, color: "#C6FF00" },
};

interface LogEntry {
  kind: LogKind;
  title: string;
  id: string;
  date: string;
  authors: string;
  abstract: string;
  size: string;
  doi: string;
  citations: number;
  downloads: number;
  keywords: string[];
  fullAbstract: string;
  references: number;
  status: "PUBLISHED" | "PREPRINT" | "PATENTED" | "OPEN";
}

const LOGS: LogEntry[] = [
  { kind: "PAPER", title: "Sigma-Variable Orchestration of Multi-Model Agent Loops", id: "TSL-2024-007", date: "2024.11.04", authors: "NEURAL HAND, THE ARCHITECT", abstract: "We model a research lab as a sigma variable — the unmeasured deviation — and show it stabilizes multi-model agent loops under field drift.", size: "12pp", doi: "10.48550/TSL.2024.007", citations: 4, downloads: 312, keywords: ["multi-model", "agent loops", "sigma variable", "orchestration"], fullAbstract: "We introduce the concept of a 'sigma variable' — the unmeasured deviation in a multi-model AI orchestration loop — and demonstrate that explicitly modeling this variable stabilizes agent behavior under distributional drift. We present results from a 90-day deployment of the Vortex autonomous sales system, showing a 34% reduction in hallucination rates and a 22% improvement in task completion fidelity when the sigma variable is tracked and compensated. The framework generalizes to any multi-model pipeline where model outputs are composed sequentially.", references: 47, status: "PUBLISHED" },
  { kind: "BLUEPRINT", title: "Nexus Map: 11-Sector Navigation Topology", id: "TSL-BP-014", date: "2024.10.21", authors: "THE ARCHITECT", abstract: "Full topology of the level-select navigation, transition states, and the GSAP panel-reveal kernel.", size: "4pp", doi: "10.48550/TSL.BP.014", citations: 0, downloads: 184, keywords: ["navigation", "GSAP", "transitions", "topology"], fullAbstract: "A complete blueprint of the Taungoo Sigma Lab's navigation system: the 11-sector Nexus Map, the multi-panel GSAP transition kernel (8-panel slam-cover + accent flash + sector-number fly-through + reveal), keyboard navigation layer (ESC/M/arrows/0-9/Cmd+K), and the deep-link routing protocol (?s=XX). Includes state machine diagrams and the zustand store contract.", references: 3, status: "OPEN" },
  { kind: "DATASET", title: "Taungoo Community Voice Corpus (v2)", id: "TSL-DS-003", date: "2024.09.18", authors: "SIGNAL TENDER", abstract: "4-language voice corpus recorded with the Taungoo community under Helsinki-Trust partnership model.", size: "1.4GB", doi: "10.48550/TSL.DS.003", citations: 2, downloads: 89, keywords: ["voice corpus", "myanmar", "NLP", "community"], fullAbstract: "A 4-language (Burmese, Karen, Bago dialect, English) voice corpus containing 18,400 annotated utterances recorded with the Taungoo community under the Helsinki-Trust partnership model. All speakers consented under a community-benefit agreement. The corpus includes phoneme-level alignments, speaker demographics (anonymized), and environmental metadata. Released under CC-BY-SA-NC with a community-royalty clause.", references: 12, status: "OPEN" },
  { kind: "PATENT", title: "Quantum-Inspired Routing Kernel on Classical Hardware", id: "TSL-PT-001", date: "2024.08.30", authors: "QUANTUM SEER", abstract: "A combinatorial routing kernel that exploits quantum-inspired annealing on commodity CPUs.", size: "App.", doi: "PATENT-MM-2024-001", citations: 0, downloads: 0, keywords: ["quantum", "annealing", "routing", "optimization"], fullAbstract: "A combinatorial routing kernel that exploits quantum-inspired simulated annealing on commodity CPUs. The kernel models 32 simulated qubits with 1.2M gate operations per second and achieves 0.984 fidelity on benchmark routing problems. The approach requires no quantum hardware and runs on a standard 8-core CPU. Patent filed in Myanmar (PATENT-MM-2024-001) and pending under PCT.", references: 28, status: "PATENTED" },
  { kind: "PAPER", title: "RWA Tokenization for Agricultural Microgrids", id: "TSL-2024-006", date: "2024.07.15", authors: "CHAIN WEAVER, EDGE RUNNER", abstract: "Tokenizing microgrid capacity as on-chain RWA, settling against physical IoT telemetry.", size: "9pp", doi: "10.48550/TSL.2024.006", citations: 7, downloads: 245, keywords: ["RWA", "tokenization", "microgrid", "DeFi"], fullAbstract: "We present a framework for tokenizing agricultural microgrid capacity as real-world assets (RWA) on-chain, with settlement backed by physical IoT telemetry from the 240-node Taungoo sensor mesh. The system uses a non-custodial escrow pattern with on-chain proof-of-generation attestations. We demonstrate the first tokenized microgrid in the Bago region, settling 4.2MWh of surplus capacity across 38 households over 60 days.", references: 31, status: "PUBLISHED" },
  { kind: "DATASET", title: "Edge-IoT Telemetry Stream (30d window)", id: "TSL-DS-002", date: "2024.06.29", authors: "EDGE RUNNER", abstract: "240-node agricultural sensor mesh, 8.1M packets/day, anonymized.", size: "320MB", doi: "10.48550/TSL.DS.002", citations: 1, downloads: 156, keywords: ["IoT", "sensors", "agriculture", "telemetry"], fullAbstract: "A 30-day window of telemetry from the Taungoo agricultural sensor mesh: 240 nodes across 12 fields, 8.1M packets/day, 14 sensor channels (soil moisture, temperature, humidity, pH, NPK, light, wind, CO2, leaf wetness, rainfall, battery, signal). All location data anonymized to field-level granularity. Includes a data quality score per packet.", references: 5, status: "OPEN" },
  { kind: "BLUEPRINT", title: "Brutalist Scanline Design System v2.4", id: "TSL-BP-011", date: "2024.06.02", authors: "THE ARCHITECT", abstract: "Tokens, panels, crosshairs, hazard stripes, and the glitch-type treatment used across the lab.", size: "6pp", doi: "10.48550/TSL.BP.011", citations: 0, downloads: 421, keywords: ["design system", "brutalism", "CSS", "tokens"], fullAbstract: "The complete design system for Taungoo Sigma Lab: color tokens (oklch-based), typography (Space Grotesk + JetBrains Mono + Instrument Serif), the 11-sector accent palette, scanline/noise/hazard/crosshair/glitch CSS utilities, the Panel/Button/Tag component API, and the GSAP intro animation pattern. Released as open-source under MIT.", references: 2, status: "OPEN" },
  { kind: "PATENT", title: "Self-Learning CRM Loop with Prime Agent RLM", id: "TSL-PT-002", date: "2024.05.11", authors: "NEURAL HAND", abstract: "Reinforcement-loop manager that self-tunes a voice sales agent against field conversions.", size: "App.", doi: "PATENT-MM-2024-002", citations: 0, downloads: 0, keywords: ["CRM", "reinforcement learning", "voice AI", "sales"], fullAbstract: "A reinforcement-loop manager (RLM) that self-tunes a voice sales agent against real field conversions. The Prime Agent RLM uses a multi-model ensemble (7 models) with a sigma-variable compensator to stabilize the learning loop. Deployed in the Vortex autonomous sales OS with a 22% improvement in conversion rate over the baseline. Patent filed in Myanmar.", references: 19, status: "PATENTED" },
  { kind: "PAPER", title: "Local-Language NLP for Low-Resource Myanmar Dialects", id: "TSL-2024-005", date: "2024.04.22", authors: "SIGNAL TENDER", abstract: "A tokenizer and adapter stack for Bago-region dialects, evaluated on community-authored eval sets.", size: "11pp", doi: "10.48550/TSL.2024.005", citations: 11, downloads: 389, keywords: ["NLP", "myanmar", "low-resource", "tokenizer"], fullAbstract: "We present a tokenizer and adapter stack for Bago-region Myanmar dialects, addressing the low-resource NLP gap. Our approach combines a phoneme-aware subword tokenizer with a dialect-adapter fine-tuning protocol. We release the first community-authored eval set for Bago dialects (2,400 sentences) and show 18% F1 improvement over the baseline mBERT model. All data and models are released under CC-BY-SA.", references: 38, status: "PUBLISHED" },
];

const TABS: LogKind[] = ["PAPER", "PATENT", "DATASET", "BLUEPRINT"];

export function S06Research() {
  const { navigate } = useSigmaStore();
  const root = React.useRef<HTMLDivElement>(null);
  const [tab, setTab] = React.useState<LogKind | "ALL">("ALL");
  const [selected, setSelected] = React.useState<LogEntry | null>(null);

  const filtered = tab === "ALL" ? LOGS : LOGS.filter((l) => l.kind === tab);

  useGSAP(
    () => {
      gsap.from("[data-log]", {
        opacity: 0,
        x: -24,
        duration: 0.5,
        ease: "power3.out",
        stagger: 0.06,
        clearProps: "opacity,transform",
      });
    },
    { scope: root, dependencies: [tab] }
  );

  return (
    <SectionShell
      id="s06"
      title="RESEARCH LOGS"
      tagline="Field notes, papers, datasets, and blueprints. Click any entry for the full dossier."
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
            ARXIV-LIKE · OPEN ACCESS · CLICK TO READ
          </span>
        </div>

        {/* list */}
        <div className="min-h-0 flex-1 overflow-y-auto sigma-scroll-hidden">
          <div className="divide-y divide-border/70 border border-border">
            {filtered.map((log, i) => {
              const Icon = KIND_META[log.kind].icon;
              const color = KIND_META[log.kind].color;
              return (
                <button
                  data-log
                  key={log.id}
                  onClick={() => { setSelected(log); sigmaSound.play("open"); }}
                  className="group grid w-full grid-cols-12 items-center gap-3 p-3 text-left transition-colors hover:bg-foreground/[0.04]"
                  data-cursor="hover"
                >
                  <div className="col-span-1 font-mono text-3xl font-black text-foreground/15 transition-colors group-hover:text-foreground/30">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div
                    className="col-span-1 flex h-9 w-9 items-center justify-center border"
                    style={{ borderColor: `${color}55`, color }}
                  >
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="col-span-12 md:col-span-6">
                    <div className="flex items-center gap-2">
                      <Tag accent={color}>{log.kind}</Tag>
                      <span className="font-mono text-[9px] tracking-[0.2em] text-muted-foreground">{log.id}</span>
                      <span className="font-mono text-[9px] tracking-[0.16em]" style={{ color }}>{log.status}</span>
                    </div>
                    <div className="mt-1 font-sans text-base font-bold uppercase leading-tight tracking-tight group-hover:text-foreground">
                      {log.title}
                    </div>
                    <div className="mt-0.5 line-clamp-1 font-serif text-[12px] italic text-muted-foreground">
                      {log.abstract}
                    </div>
                    <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">
                      {log.authors} · {log.date} · {log.citations} cites · {log.downloads} dl
                    </div>
                  </div>
                  <div className="col-span-6 hidden md:col-span-2 md:block">
                    <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">SIZE</div>
                    <div className="font-mono text-sm font-bold text-foreground">{log.size}</div>
                  </div>
                  <div className="col-span-6 flex items-center justify-end gap-2 md:col-span-2">
                    <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground transition-colors group-hover:text-foreground">
                      <BookOpen className="mr-1 inline h-3 w-3" />
                      READ
                    </span>
                  </div>
                </button>
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

      {/* PAPER DETAIL MODAL */}
      <Dialog open={!!selected} onOpenChange={(o) => { if (!o) { setSelected(null); sigmaSound.play("close"); } }}>
        <DialogContent className="max-w-3xl gap-0 overflow-hidden border-foreground/30 bg-card p-0">
          <DialogHeader className="border-b border-border px-4 py-2">
            <DialogTitle className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em]">
              {selected && (
                <>
                  <span style={{ color: KIND_META[selected.kind].color }}>{selected.id}</span>
                  <span className="text-muted-foreground">/ RESEARCH DOSSIER</span>
                  <span className="ml-auto" style={{ color: KIND_META[selected.kind].color }}>
                    {selected.status}
                  </span>
                </>
              )}
            </DialogTitle>
          </DialogHeader>
          {selected && <PaperDossier entry={selected} />}
        </DialogContent>
      </Dialog>
    </SectionShell>
  );
}

function PaperDossier({ entry: e }: { entry: LogEntry }) {
  const color = KIND_META[e.kind].color;
  const Icon = KIND_META[e.kind].icon;
  return (
    <div className="grid max-h-[72vh] grid-cols-1 overflow-y-auto md:grid-cols-[180px_1fr] sigma-scroll-hidden">
      {/* left: identity */}
      <div className="relative border-r border-border bg-black p-4">
        <div
          className="sigma-spin-slow mx-auto mb-3 flex h-20 w-20 items-center justify-center border"
          style={{ borderColor: `${color}55`, color }}
        >
          <Icon className="h-8 w-8" />
        </div>
        <div className="text-center">
          <div className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">{e.kind}</div>
          <div className="font-sans text-sm font-bold uppercase tracking-tight">{e.id}</div>
        </div>
        <div className="mt-3 space-y-1 border-t border-border/70 pt-3 font-mono text-[10px] uppercase tracking-[0.16em]">
          <Row k="DATE" v={e.date} />
          <Row k="SIZE" v={e.size} />
          <Row k="CITES" v={String(e.citations)} />
          <Row k="DOWNLOADS" v={String(e.downloads)} />
          <Row k="REFS" v={String(e.references)} />
          <Row k="STATUS" v={e.status} c={color} />
        </div>
      </div>

      {/* right: content */}
      <div className="flex flex-col gap-3 p-4">
        <div>
          <h3 className="font-sans text-xl font-bold uppercase leading-tight tracking-tight">
            {e.title}
          </h3>
          <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            {e.authors}
          </div>
        </div>

        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            ▸ ABSTRACT
          </div>
          <p className="mt-1 font-serif text-sm italic leading-relaxed text-foreground/85">
            {e.fullAbstract}
          </p>
        </div>

        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            ▸ KEYWORDS
          </div>
          <div className="mt-1.5 flex flex-wrap gap-1">
            {e.keywords.map((k) => (
              <Tag key={k} accent={color}>{k}</Tag>
            ))}
          </div>
        </div>

        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            ▸ DOI
          </div>
          <div className="mt-1 font-mono text-sm text-foreground">{e.doi}</div>
        </div>

        {/* actions */}
        <div className="mt-auto flex gap-2 border-t border-border/70 pt-3">
          <a
            href="#"
            onClick={(e2) => e2.preventDefault()}
            className="inline-flex flex-1 items-center justify-center gap-2 border border-border px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] transition hover:bg-foreground/10"
          >
            <Download className="h-4 w-4" /> PDF · {e.size}
          </a>
          <a
            href="#"
            onClick={(e2) => e2.preventDefault()}
            className="inline-flex flex-1 items-center justify-center gap-2 bg-foreground px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-background transition hover:bg-foreground/85"
          >
            <ArrowUpRight className="h-4 w-4" /> DOI LINK
          </a>
        </div>
      </div>
    </div>
  );
}

function Row({ k, v, c }: { k: string; v: string; c?: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-muted-foreground">{k}</span>
      <span style={{ color: c ?? "var(--foreground)" }}>{v}</span>
    </div>
  );
}
