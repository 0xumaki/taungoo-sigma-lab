"use client";

import * as React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SECTIONS } from "@/lib/sigma/sections";
import { useSigmaStore } from "@/lib/sigma/store";
import { SectionShell } from "../shared/SectionShell";
import { BrutalButton, Panel } from "../shared/components";
import { SigmaParticles } from "../shared/SigmaParticles";

gsap.registerPlugin(useGSAP);

const HAZARD_STRIPE =
  "repeating-linear-gradient(-45deg, #2979FF 0, #2979FF 5px, transparent 5px, transparent 10px)";

/* Brand footer readouts — dense data block under the wordmark */
const BRAND_READOUTS: [string, string][] = [
  ["BUILD", "2.4.SIGMA"],
  ["SIGMA VAR", "1.0000 HOLD"],
  ["SECTORS", "11/11 MAPPED"],
  ["OPERATORS", "8/8 ACTIVE"],
  ["ARTIFACTS", "11 LIVE"],
  ["MARKETS", "6 SERVICED"],
  ["KERNEL", "v2.4.Σ"],
  ["LICENSE", "HELSINKI-TRUST"],
];

export function S11Status() {
  const { navigate } = useSigmaStore();
  const root = React.useRef<HTMLDivElement>(null);
  const [uptime, setUptime] = React.useState(0);

  React.useEffect(() => {
    const start = Date.now();
    const i = setInterval(() => {
      // Skip uptime churn when the tab is hidden — uptime math (Date.now() - start)
      // is correct on resume, so the displayed value snaps to current.
      if (document.hidden) return;
      setUptime(Date.now() - start);
    }, 1000);
    return () => clearInterval(i);
  }, []);

  useGSAP(
    () => {
      gsap.from("[data-st]", {
        opacity: 0,
        y: 20,
        duration: 0.5,
        ease: "power3.out",
        stagger: 0.05,
      });
    },
    { scope: root }
  );

  const fmt = (ms: number) => {
    const s = Math.floor(ms / 1000);
    const hh = String(Math.floor(s / 3600)).padStart(2, "0");
    const mm = String(Math.floor((s % 3600) / 60)).padStart(2, "0");
    const ss = String(s % 60).padStart(2, "0");
    return `${hh}:${mm}:${ss}`;
  };

  return (
    <SectionShell
      id="s11"
      title="SYSTEM STATUS"
      tagline="Sector 11 is the ops dashboard — uptime, build info, and the full sector map. All systems nominal."
    >
      <div ref={root} className="relative grid h-full grid-cols-12 gap-3 overflow-y-auto sigma-scroll-hidden">
        {/* Ambient particles */}
        <SigmaParticles count={12} color="#2979FF" />

        {/* status grid + brand footer — all 11 sectors */}
        <Panel
          data-st
          label="SECTOR STATUS GRID"
          id="11/11"
          accent="#2979FF"
          className="col-span-12 flex flex-col lg:col-span-8"
        >
          <div className="grid grid-cols-2 gap-px border-b border-border/70 bg-border/40 sm:grid-cols-3 lg:grid-cols-4">
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                onClick={() => navigate(s.id)}
                className="group flex flex-col gap-0.5 bg-card px-3 py-2.5 text-left transition hover:bg-foreground/[0.05]"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-2xl font-black" style={{ color: s.accent }}>
                    {s.shortCode}
                  </span>
                  <span className="sigma-pulse h-1.5 w-1.5" style={{ background: s.accent }} />
                </div>
                <div className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">
                  {s.code}
                </div>
                <div className="font-sans text-xs font-bold uppercase leading-tight tracking-tight text-foreground">
                  {s.name}
                </div>
                <div className="mt-1 flex items-center justify-between gap-1 font-mono text-[8px] uppercase tracking-[0.14em]">
                  <span className="truncate" style={{ color: s.accent }}>{s.status}</span>
                  <span className="whitespace-nowrap text-muted-foreground group-hover:text-foreground">
                    JACK IN ►
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* ================================================================
              MAXIMALIST BRAND PANEL — fills the negative space below the
              11 sector cards. A "footer within the section": wordmark,
              manifesto, sigma emblem, data readouts, sector strip.
              ================================================================ */}
          <div data-st className="relative flex min-h-[240px] flex-1 flex-col overflow-hidden bg-card/30">
            {/* atmosphere layers */}
            <div className="sigma-scanlines pointer-events-none absolute inset-0 z-0" />
            <div className="sigma-grid-fine pointer-events-none absolute inset-0 z-0 opacity-25" />
            <div
              className="pointer-events-none absolute -left-24 top-0 h-full w-1/2 rounded-full opacity-[0.07] blur-3xl"
              style={{ background: "#2979FF" }}
            />
            {/* giant Σ watermark — bleeding off the right edge */}
            <div
              className="pointer-events-none absolute inset-0 z-0 flex select-none items-center justify-end overflow-hidden pr-1"
              aria-hidden
            >
              <span
                className="sigma-glitch font-sans text-[22vh] font-black leading-none text-foreground/[0.05]"
                data-text="Σ"
              >
                Σ
              </span>
            </div>
            {/* left vertical hazard rail */}
            <div
              className="pointer-events-none absolute inset-y-0 left-0 z-0 w-1.5"
              style={{ background: HAZARD_STRIPE }}
            />

            {/* top hazard rail */}
            <div className="relative z-10 h-1.5" style={{ background: HAZARD_STRIPE }} />

            {/* micro header row */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-x-4 gap-y-1 border-b border-border/70 px-4 py-1 font-mono text-[9px] uppercase tracking-[0.24em] text-muted-foreground">
              <span className="flex items-center gap-2">
                <span className="sigma-pulse h-1.5 w-1.5 bg-[#2979FF]" />
                Brand manifest / Σ-000
              </span>
              <span className="hidden text-[#2979FF] sm:inline">Classification: public read</span>
              <span className="hidden md:inline">Doc rev 2.4 · checksum OK</span>
            </div>

            {/* main brand row */}
            <div className="relative z-10 grid flex-1 grid-cols-1 items-center gap-4 p-4 md:grid-cols-[1.15fr_auto_0.9fr]">
              {/* wordmark + manifesto */}
              <div className="min-w-0">
                <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted-foreground">
                  Est. MMXVI · Yangon, MM · 16.87°N 96.19°E
                </div>
                <h3 className="mt-1.5 font-sans text-4xl font-black uppercase leading-[0.85] tracking-tight">
                  Taungoo
                  <br />
                  <span className="text-[#2979FF]">Sigma</span> Lab
                </h3>
                <p className="mt-2 max-w-md font-serif text-sm italic leading-snug text-foreground/75">
                  We are the sigma variable — the unmeasured deviation that bends
                  the curve. Eleven sectors, zero wasted motion.
                </p>
                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[9px] uppercase tracking-[0.24em] text-muted-foreground">
                  <span>
                    <span className="text-foreground">01</span> REMODEL
                  </span>
                  <span className="h-3 w-px bg-foreground/20" />
                  <span>
                    <span className="text-foreground">02</span> RETRAIN
                  </span>
                  <span className="h-3 w-px bg-foreground/20" />
                  <span>
                    <span className="text-foreground">03</span> RE-DEPLOY
                  </span>
                </div>
              </div>

              {/* sigma emblem centerpiece — cut-corner plate in rotating ring */}
              <div className="relative hidden h-32 w-32 shrink-0 items-center justify-center md:flex" aria-hidden>
                {/* rotating dashed ring */}
                <div
                  className="sigma-spin-slow absolute inset-0 rounded-full border border-dashed"
                  style={{ borderColor: "#2979FF66" }}
                />
                {/* static inner ring */}
                <div
                  className="absolute inset-3 rounded-full border"
                  style={{ borderColor: "#2979FF33" }}
                />
                {/* cut-corner plate */}
                <div
                  className="absolute inset-6 flex items-center justify-center bg-background/70"
                  style={{
                    clipPath:
                      "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))",
                  }}
                >
                  <span className="font-sans text-5xl font-black leading-none text-[#2979FF]">Σ</span>
                </div>
                {/* corner brackets */}
                <span className="absolute left-0 top-0 h-4 w-4 border-l-2 border-t-2 border-[#2979FF]" />
                <span className="absolute right-0 top-0 h-4 w-4 border-r-2 border-t-2 border-[#2979FF]" />
                <span className="absolute bottom-0 left-0 h-4 w-4 border-b-2 border-l-2 border-[#2979FF]" />
                <span className="absolute bottom-0 right-0 h-4 w-4 border-b-2 border-r-2 border-[#2979FF]" />
                {/* tick marks */}
                <span className="absolute -top-1 left-1/2 h-2 w-px -translate-x-1/2 bg-[#2979FF]" />
                <span className="absolute -bottom-1 left-1/2 h-2 w-px -translate-x-1/2 bg-[#2979FF]" />
              </div>

              {/* data readouts */}
              <div className="grid grid-cols-2 gap-px border border-border/70 bg-border/40">
                {BRAND_READOUTS.map(([k, v]) => (
                  <div key={k} className="bg-card/80 px-3 py-1.5">
                    <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">
                      {k}
                    </div>
                    <div className="mt-0.5 truncate font-mono text-[13px] font-black tabular-nums text-foreground">
                      {v}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* sector strip — all 11 codes, the mapped system */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-x-4 gap-y-1.5 border-t border-border/70 px-4 py-1.5">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">
                <span className="text-foreground/60">MAP:</span>
                {SECTIONS.map((s) => (
                  <span key={s.id} className="whitespace-nowrap">
                    <span style={{ color: s.accent }}>{s.shortCode}</span> {s.code}
                  </span>
                ))}
              </div>
              <span className="whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.24em] text-[#2979FF]">
                ▮ END OF LINE
              </span>
            </div>

            {/* bottom hazard rail */}
            <div className="relative z-10 h-1.5" style={{ background: HAZARD_STRIPE }} />

            {/* panel corner brackets */}
            <span className="pointer-events-none absolute left-1.5 top-1.5 z-20 h-3 w-3 border-l-2 border-t-2 border-[#2979FF]/70" />
            <span className="pointer-events-none absolute right-1.5 top-1.5 z-20 h-3 w-3 border-r-2 border-t-2 border-[#2979FF]/70" />
            <span className="pointer-events-none absolute bottom-1.5 left-1.5 z-20 h-3 w-3 border-b-2 border-l-2 border-[#2979FF]/70" />
            <span className="pointer-events-none absolute bottom-1.5 right-1.5 z-20 h-3 w-3 border-b-2 border-r-2 border-[#2979FF]/70" />
          </div>
        </Panel>

        {/* uptime + signature */}
        <div className="col-span-12 flex flex-col gap-3 lg:col-span-4">
          <Panel data-st label="SESSION UPTIME" id="LIVE" accent="#2979FF" scan>
            <div className="p-4 text-center">
              <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                ▸ NOMINAL FOR
              </div>
              <div className="mt-1 font-mono text-5xl font-black tabular-nums text-foreground">
                {fmt(uptime)}
              </div>
              <div className="mt-2 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
                SINCE BOOT · NO FAULTS
              </div>
            </div>
          </Panel>

          <Panel data-st label="BUILD MANIFEST" id="2.4.SIGMA" accent="#2979FF">
            <div className="space-y-1.5 p-3 font-mono text-[10px] uppercase tracking-[0.18em]">
              {[
                ["BUILD", "2.4.SIGMA"],
                ["SECTORS", "11 / 11 ONLINE"],
                ["ARTIFACTS", "11 LIVE"],
                ["OPERATORS", "8 / 8 ACTIVE"],
                ["SIGMA", "1.0000 HOLDING"],
                ["LICENSE", "OPEN · HELSINKI-TRUST"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between gap-2">
                  <span className="text-muted-foreground">{k}</span>
                  <span className="whitespace-nowrap text-foreground">{v}</span>
                </div>
              ))}
            </div>
          </Panel>

          <Panel
            data-st
            label="SIGNATURE"
            id="0114071813"
            accent="#2979FF"
            className="flex flex-1 flex-col"
          >
            <div className="flex flex-1 flex-col items-center justify-center p-3">
              <div className="sigma-spin-slow mx-auto mb-2 flex h-16 w-16 items-center justify-center border border-[#2979FF]/40 text-4xl text-[#2979FF]">
                Σ
              </div>
              <div className="text-center font-mono text-[9px] uppercase leading-relaxed tracking-[0.22em] text-muted-foreground">
                TAUNGOO Σ Lab
                <br />
                © MMXVI · ALL SYSTEMS NOMINAL
                <br />
                <span className="text-[#2979FF]">▮ END OF LINE</span>
              </div>
            </div>
          </Panel>
        </div>

        {/* footer band */}
        <div data-st className="col-span-12 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-3">
          <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            ▸ You have reached the end. There is no scroll — only the map.
          </div>
          <div className="flex gap-2">
            <BrutalButton variant="ghost" onClick={() => navigate("s01")}>
              REPLAY FROM SECTOR 01
            </BrutalButton>
            <BrutalButton accent="#2979FF" onClick={() => navigate("map")}>
              RETURN TO NEXUS MAP
            </BrutalButton>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
