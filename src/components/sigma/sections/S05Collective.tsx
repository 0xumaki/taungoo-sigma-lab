"use client";

import * as React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useSigmaStore } from "@/lib/sigma/store";
import { SectionShell } from "../shared/SectionShell";
import { Panel, Tag } from "../shared/components";
import { SigmaParticles } from "../shared/SigmaParticles";
import { sigmaSound } from "@/lib/sigma/sound";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

gsap.registerPlugin(useGSAP);

interface Member {
  code: string;
  name: string;
  realName: string;
  role: string;
  focus: string;
  sig: number;
  glyph: string;
  accent: string;
  clearance: string;
  joined: string;
  location: string;
  specialties: string[];
  projects: number;
  bio: string;
  signature: string;
}

const MEMBERS: Member[] = [
  { code: "OP·01", name: "THE ARCHITECT", realName: "Aung Min", role: "Lab Director", focus: "Strategy · Sigma Variable", sig: 0.99, glyph: "Σ", accent: "#FF2D7E", clearance: "OMEGA", joined: "2016.01", location: "Yangon, MM", specialties: ["Strategy", "Architecture", "Sigma Theory", "Partnerships"], projects: 11, bio: "Founded the lab on the principle that a research institution should be measured as a sigma — the unknown deviation that bends the curve. Holds the sigma variable at 1.0000.", signature: "We are the sigma variable." },
  { code: "OP·02", name: "NEURAL HAND", realName: "Su Mon", role: "AI Lead", focus: "Multi-model orchestration", sig: 0.94, glyph: "◴", accent: "#00E5FF", clearance: "ALPHA", joined: "2016.02", location: "Remote", specialties: ["LLM Orchestration", "Voice AI", "RLM", "Agent Loops"], projects: 4, bio: "Architect of the multi-model synergy stack. Trains self-learning CRM loops against real field conversions. Prime Agent RLM patent holder.", signature: "The loop learns. The hand guides." },
  { code: "OP·03", name: "CHAIN WEAVER", realName: "Thet Aung", role: "Web3 Lead", focus: "DeFi · RWA · DAO", sig: 0.91, glyph: "⬡", accent: "#C6FF00", clearance: "ALPHA", joined: "2016.03", location: "Yangon, MM", specialties: ["DeFi", "RWA Tokenization", "DAO Governance", "Solidity"], projects: 5, bio: "Ships DeFi navigators, RWA tokenization rails, and non-custodial wallets to mainnet. Tokenized the first agricultural microgrid in the Yangon region.", signature: "On-chain or it didn't happen." },
  { code: "OP·04", name: "EDGE RUNNER", realName: "Kyaw Zin", role: "IoT Engineer", focus: "Sensors · Microgrids", sig: 0.88, glyph: "⌖", accent: "#FFB300", clearance: "BETA", joined: "2016.04", location: "Yangon, MM", specialties: ["LoRa Mesh", "Microgrids", "Edge Inference", "PCB Design"], projects: 3, bio: "Runs the 240-node agricultural sensor mesh at the Yangon tech park. 8.1M packets/day, 41ms median latency, 2-year battery life on AA cells.", signature: "The edge is where the signal lives." },
  { code: "OP·05", name: "QUANTUM SEER", realName: "Nan Khin", role: "Research Scientist", focus: "Quantum-inspired optimization", sig: 0.86, glyph: "⟁", accent: "#B388FF", clearance: "BETA", joined: "2024.05", location: "Remote", specialties: ["Quantum Annealing", "Combinatorics", "Routing", "Simulation"], projects: 2, bio: "Builds quantum-inspired optimization kernels that run on classical hardware. 32 simulated qubits, 1.2M gates/s, 0.984 fidelity.", signature: "The future is superposed." },
  { code: "OP·06", name: "SIGNAL TENDER", realName: "Hsu Hsu", role: "Community Lead", focus: "Literacy · Local NLP", sig: 0.93, glyph: "◍", accent: "#00FF94", clearance: "ALPHA", joined: "2016.06", location: "Yangon, MM", specialties: ["Local NLP", "Digital Literacy", "Open Data", "Community"], projects: 3, bio: "Built the 4-language voice corpus with the local Myanmar community under the Helsinki-Trust partnership model. 1.8k learners and counting.", signature: "Built with, not for." },
  { code: "OP·07", name: "NULL CIPHER", realName: "Lin Htet", role: "Security", focus: "Threat modeling · Audits", sig: 0.97, glyph: "⚿", accent: "#FF3D3D", clearance: "OMEGA", joined: "2024.07", location: "Classified", specialties: ["Threat Modeling", "Smart Contract Audit", "Pen Test", "Crypto"], projects: 6, bio: "Threat-models every deployment before it touches mainnet. Zero exploits shipped to production. Holds the keys to the cold storage vault.", signature: "Trust no input. Verify every byte." },
  { code: "OP·08", name: "GHOST PRINTER", realName: "Zaw Ye", role: "Hardware", focus: "Lab equipment · PCB", sig: 0.82, glyph: "⚙", accent: "#FFEB3B", clearance: "BETA", joined: "2016.08", location: "Yangon, MM", specialties: ["PCB Design", "Oscilloscope", "Rework", "ESD Safety"], projects: 2, bio: "Runs the hardware bench: 4-channel 2GHz oscilloscope, hot-air rework, 6-layer PCB. ESD-safe vacuum. The lab's ghost in the machine.", signature: "Print. Test. Repeat." },
];

export function S05Collective() {
  const { navigate } = useSigmaStore();
  const root = React.useRef<HTMLDivElement>(null);
  const [selected, setSelected] = React.useState<Member | null>(null);

  useGSAP(
    () => {
      gsap.from("[data-op]", {
        opacity: 0,
        y: 30,
        duration: 0.55,
        ease: "power3.out",
        stagger: { each: 0.06, from: "start" },
        clearProps: "opacity,transform",
      });
    },
    { scope: root }
  );

  return (
    <SectionShell
      id="s05"
      title="COLLECTIVE"
      tagline="Sector 05 is the engineering team — 8 operators with handles, not egos. Click any for their dossier."
    >
      <div ref={root} className="relative grid h-full grid-cols-12 gap-3 overflow-y-auto sigma-scroll-hidden">
        {/* Ambient particles */}
        <SigmaParticles count={12} color="#FF2D7E" />
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
              sigma mesh — measured by signal, not seniority. Tap any operator
              to open their full dossier.
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
        {MEMBERS.map((m, i) => (
          <Panel
            data-op
            key={m.code}
            className="group relative col-span-6 min-h-[250px] cursor-pointer overflow-hidden sm:min-h-[280px] md:col-span-4 lg:col-span-2"
          >
            <button
              onClick={() => { setSelected(m); sigmaSound.play("open"); }}
              className="flex w-full flex-col p-3 text-left"
              data-cursor="hover"
            >
              {/* geometric avatar */}
              <div className="relative h-[130px] overflow-hidden border border-border/70 transition-all group-hover:border-foreground/40 sm:h-[160px] md:aspect-square md:h-auto">
                <div
                  className="absolute inset-0 opacity-20 transition-opacity group-hover:opacity-40"
                  style={{ background: m.accent }}
                />
                <div className="sigma-grid-fine absolute inset-0 opacity-30" />
                <div className="sigma-scanlines absolute inset-0 opacity-50" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span
                    className="sigma-spin-slow font-sans text-6xl font-black transition-transform group-hover:scale-110"
                    style={{ color: m.accent }}
                  >
                    {m.glyph}
                  </span>
                </div>
                <span className="absolute left-1.5 top-1.5 font-mono text-[9px] tracking-[0.18em] text-foreground/70">
                  {m.code}
                </span>
                <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 sigma-pulse" style={{ background: m.accent }} />
                {/* hover overlay */}
                <div className="absolute inset-0 flex items-end justify-center bg-black/60 p-2 opacity-0 transition-opacity group-hover:opacity-100">
                  <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-foreground">
                    ▸ OPEN DOSSIER
                  </span>
                </div>
              </div>
              <div className="mt-2">
                <div className="font-sans text-sm font-bold uppercase leading-tight tracking-tight">
                  {m.name}
                </div>
                {/* Real identity — smaller subtitle flanked by accent rules */}
                <div className="mt-0.5 flex items-center gap-1.5" style={{ color: m.accent }}>
                  <span className="h-px w-2" style={{ background: m.accent, opacity: 0.5 }} />
                  <span className="font-serif text-[11px] italic leading-none tracking-wide" style={{ color: m.accent }}>
                    {m.realName}
                  </span>
                  <span className="h-px flex-1" style={{ background: m.accent, opacity: 0.5 }} />
                </div>
                <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">
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
            </button>
          </Panel>
        ))}
      </div>

      {/* OPERATOR DOSSIER MODAL */}
      <Dialog open={!!selected} onOpenChange={(o) => { if (!o) { setSelected(null); sigmaSound.play("close"); } }}>
        <DialogContent className="max-w-2xl gap-0 overflow-hidden border-foreground/30 bg-card p-0">
          <DialogHeader className="border-b border-border px-4 py-2">
            <DialogTitle className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em]">
              <span style={{ color: selected?.accent }}>{selected?.code}</span>
              <span className="text-muted-foreground">/ OPERATOR DOSSIER</span>
              <span className="ml-auto" style={{ color: selected?.accent }}>
                CLR: {selected?.clearance}
              </span>
            </DialogTitle>
          </DialogHeader>
          {selected && <OperatorDossier member={selected} />}
        </DialogContent>
      </Dialog>
    </SectionShell>
  );
}

function OperatorDossier({ member: m }: { member: Member }) {
  return (
    <div className="grid max-h-[70vh] grid-cols-1 overflow-y-auto md:grid-cols-[200px_1fr] sigma-scroll-hidden">
      {/* left: avatar + identity */}
      <div className="relative border-r border-border bg-black p-4">
        <div
          className="sigma-spin-slow mx-auto mb-3 flex h-28 w-28 items-center justify-center border font-mono text-5xl font-black"
          style={{ borderColor: `${m.accent}55`, color: m.accent }}
        >
          {m.glyph}
        </div>
        <div className="text-center">
          <div className="font-sans text-lg font-bold uppercase tracking-tight">{m.name}</div>
          {/* Real identity — italic serif subtitle between accent rules */}
          <div className="mt-1 flex items-center justify-center gap-2">
            <span className="h-px w-4" style={{ background: m.accent, opacity: 0.6 }} />
            <span className="font-serif text-xs italic tracking-wide" style={{ color: m.accent }}>
              {m.realName}
            </span>
            <span className="h-px w-4" style={{ background: m.accent, opacity: 0.6 }} />
          </div>
          <div className="mt-1 font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: m.accent }}>
            {m.role}
          </div>
        </div>
        <div className="mt-3 space-y-1 border-t border-border/70 pt-3 font-mono text-[10px] uppercase tracking-[0.16em]">
          <Row k="CODE" v={m.code} />
          <Row k="REAL NAME" v={m.realName} c={m.accent} />
          <Row k="JOINED" v={m.joined} />
          <Row k="LOCATION" v={m.location} />
          <Row k="PROJECTS" v={String(m.projects)} />
          <Row k="CLEARANCE" v={m.clearance} c={m.accent} />
        </div>
      </div>

      {/* right: bio + specialties + signature */}
      <div className="flex flex-col gap-3 p-4">
        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            ▸ FOCUS
          </div>
          <div className="font-serif text-base italic text-foreground">{m.focus}</div>
        </div>

        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            ▸ BIO
          </div>
          <p className="mt-1 font-serif text-sm italic leading-relaxed text-foreground/85">
            {m.bio}
          </p>
        </div>

        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            ▸ SPECIALTIES
          </div>
          <div className="mt-1.5 flex flex-wrap gap-1">
            {m.specialties.map((s) => (
              <Tag key={s} accent={m.accent}>{s}</Tag>
            ))}
          </div>
        </div>

        {/* sigma meter */}
        <div>
          <div className="flex justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            <span>SIGMA VARIABLE</span>
            <span style={{ color: m.accent }}>{m.sig.toFixed(2)}</span>
          </div>
          <div className="mt-1 h-2 w-full bg-foreground/10">
            <div className="h-full" style={{ width: `${m.sig * 100}%`, background: m.accent }} />
          </div>
        </div>

        {/* signature */}
        <div className="mt-auto border-t border-border/70 pt-3">
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            ▸ SIGNATURE
          </div>
          <div className="font-serif text-lg italic" style={{ color: m.accent }}>
            "{m.signature}"
          </div>
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
