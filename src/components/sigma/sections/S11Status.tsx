"use client";

import * as React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SECTIONS, MAP_META } from "@/lib/sigma/sections";
import { useSigmaStore } from "@/lib/sigma/store";
import { SectionShell } from "../shared/SectionShell";
import { BrutalButton, Panel, Tag } from "../shared/components";
import { SigmaParticles } from "../shared/SigmaParticles";
import { useCardReveal } from "@/lib/sigma/use-card-reveal";

gsap.registerPlugin(useGSAP);

export function S11Status() {
  const { navigate } = useSigmaStore();
  const cardsRef = useCardReveal<HTMLDivElement>({ stagger: true });
  const [uptime, setUptime] = React.useState(0);

  React.useEffect(() => {
    const start = Date.now();
    const i = setInterval(() => setUptime(Date.now() - start), 1000);
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
    { scope: cardsRef }
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
      <div ref={cardsRef} className="relative grid h-full grid-cols-12 gap-3">
        {/* Ambient particles */}
        <SigmaParticles count={12} color="#2979FF" />
        {/* status grid — all 11 sectors */}
        <Panel data-st label="SECTOR STATUS GRID" id="11/11" accent="#2979FF" className="sigma-card-reveal sigma-hover-card col-span-12 lg:col-span-8" style={{ "--sigma-hover-accent": "#2979FF" } as React.CSSProperties}>
          <div className="grid grid-cols-2 gap-px border border-border/70 bg-border/40 sm:grid-cols-3 lg:grid-cols-4">
            {SECTIONS.map((s, i) => (
              <button
                key={s.id}
                onClick={() => navigate(s.id)}
                className="sigma-card-reveal sigma-hover-card group flex flex-col gap-1 bg-card p-3 text-left transition hover:bg-foreground/[0.05]"
                style={{ "--sigma-hover-accent": s.accent, transitionDelay: `${i * 0.08}s` } as React.CSSProperties}
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
                <div className="mt-1 flex items-center justify-between font-mono text-[8px] uppercase tracking-[0.16em]">
                  <span style={{ color: s.accent }}>{s.status}</span>
                  <span className="text-muted-foreground group-hover:text-foreground">JACK IN ►</span>
                </div>
              </button>
            ))}
          </div>
        </Panel>

        {/* uptime + signature */}
        <div className="col-span-12 flex flex-col gap-3 lg:col-span-4">
          <Panel data-st label="SESSION UPTIME" id="LIVE" accent="#2979FF" className="sigma-card-reveal sigma-hover-card" style={{ "--sigma-hover-accent": "#2979FF", transitionDelay: "0.08s" } as React.CSSProperties} scan>
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

          <Panel data-st label="BUILD MANIFEST" id="2.4.SIGMA" accent="#2979FF" className="sigma-card-reveal sigma-hover-card" style={{ "--sigma-hover-accent": "#2979FF", transitionDelay: "0.16s" } as React.CSSProperties}>
            <div className="space-y-1.5 p-3 font-mono text-[10px] uppercase tracking-[0.18em]">
              {[
                ["BUILD", "2.4.SIGMA"],
                ["SECTORS", "11 / 11 ONLINE"],
                ["ARTIFACTS", "11 LIVE"],
                ["OPERATORS", "8 / 8 ACTIVE"],
                ["SIGMA", "1.0000 HOLDING"],
                ["LICENSE", "OPEN · HELSINKI-TRUST"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between">
                  <span className="text-muted-foreground">{k}</span>
                  <span className="text-foreground">{v}</span>
                </div>
              ))}
            </div>
          </Panel>

          <Panel data-st label="SIGNATURE" id="0114071813" accent="#2979FF" className="sigma-card-reveal sigma-hover-card" style={{ "--sigma-hover-accent": "#2979FF", transitionDelay: "0.24s" } as React.CSSProperties}>
            <div className="p-3">
              <div className="sigma-spin-slow mx-auto mb-2 flex h-16 w-16 items-center justify-center border border-[#2979FF]/40 text-4xl text-[#2979FF]">
                Σ
              </div>
              <div className="text-center font-mono text-[9px] uppercase leading-relaxed tracking-[0.22em] text-muted-foreground">
                TAUNGOO SIGMA LAB
                <br />
                © MMXXIV · ALL SYSTEMS NOMINAL
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
