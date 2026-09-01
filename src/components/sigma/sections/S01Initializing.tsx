"use client";

import * as React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useSigmaStore } from "@/lib/sigma/store";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { SectionShell } from "../shared/SectionShell";
import { BrutalButton, Crosshair, Panel } from "../shared/components";
import { SigmaParticles } from "../shared/SigmaParticles";

gsap.registerPlugin(useGSAP);

const BOOT_LINES = [
  "[ 0.001 ] TAUNGOO SIGMA KERNEL v2.7.Σ …",
  "[ 0.003 ] CPU: 8 cores @ 3.2GHz … OK",
  "[ 0.007 ] memory: 64GB ECC DDR5 … OK",
  "[ 0.012 ] mounting /sigma/core … OK",
  "[ 0.018 ] mounting /sigma/neural … OK",
  "[ 0.024 ] mounting /sigma/web3 … OK",
  "[ 0.031 ] mounting /sigma/edge … OK",
  "[ 0.038 ] neural-forge: initializing GPU cluster …",
  "[ 0.045 ] neural-forge: 8× A100 80GB detected … OK",
  "[ 0.052 ] neural-forge: 5 pillars online … OK",
  "[ 0.061 ] edge-mesh: 240 nodes registered … OK",
  "[ 0.068 ] edge-mesh: LoRa+BLE radios nominal … OK",
  "[ 0.075 ] edge-mesh: 8.1M packets/day throughput … OK",
  "[ 0.082 ] storage: 1.2PB cold vault mounted … OK",
  "[ 0.089 ] storage: AES-256 encryption verified … OK",
  "[ 0.094 ] web-rail: 6 regions online … OK",
  "[ 0.098 ] web-rail: CDN edge cache primed … OK",
  "[ 0.103 ] calibrating sigma variable …",
  "[ 0.108 ] sigma = 0.8764 …",
  "[ 0.112 ] sigma = 0.9231 …",
  "[ 0.116 ] sigma = 0.9687 …",
  "[ 0.119 ] sigma = 0.9942 …",
  "[ 0.121 ] sigma = 1.0000 … HOLD NOMINAL",
  "[ 0.128 ] handshake: NEXUS MAP … OK",
  "[ 0.135 ] handshake: 11 sectors mapped … OK",
  "[ 0.142 ] access: PUBLIC READ granted … OK",
  "[ 0.148 ] access: WRITE = EARNED via sigma-review",
  "[ 0.155 ] encryption: AES-256 channel secure … OK",
  "[ 0.161 ] encryption: TLS 1.3 handshake … OK",
  "[ 0.167 ] loading agent-swarm registry …",
  "[ 0.172 ] agent-swarm: 8 operators loaded … OK",
  "[ 0.178 ] loading research logs …",
  "[ 0.183 ] research: 6 papers indexed … OK",
  "[ 0.189 ] loading project vault …",
  "[ 0.194 ] project-vault: 10 artifacts cataloged … OK",
  "[ 0.201 ] loading service registry …",
  "[ 0.206 ] services: 27 modules online … OK",
  "[ 0.213 ] loading add-on catalog …",
  "[ 0.218 ] add-ons: 189 modules indexed … OK",
  "[ 0.224 ] initializing sound engine …",
  "[ 0.229 ] sound: 8 channels ready … OK",
  "[ 0.235 ] initializing cursor reticle …",
  "[ 0.240 ] cursor: tracking enabled … OK",
  "[ 0.246 ] initializing HUD overlay …",
  "[ 0.251 ] HUD: all systems nominal … OK",
  "[ 0.257 ] kernel: boot sequence complete …",
  "[ 0.263 ] ████████████████████ 100%",
  "[ 0.268 ] WELCOME, OPERATOR. SIGMA LIVE.",
  "[ 0.271 ] THE SIGMA VARIABLE IS 1.0000.",
  "[ 0.274 ] ▮ STANDING BY FOR INPUT ▮",
];

export function S01Initializing() {
  const { navigate } = useSigmaStore();
  const root = React.useRef<HTMLDivElement>(null);
  const logRef = React.useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from("[data-hero-mark]", {
        opacity: 0,
        scale: 1.1,
        duration: 1.2,
        ease: "power2.out",
      })
        .from(
          "[data-hero-letter]",
          {
            opacity: 0,
            y: 60,
            duration: 0.7,
            stagger: 0.06,
          },
          "-=0.7"
        )
        .from(
          "[data-hero-panel]",
          { opacity: 0, x: (i) => (i % 2 ? 30 : -30), duration: 0.6, stagger: 0.1 },
          "-=0.5"
        )
        .from("[data-hero-cta]", { opacity: 0, y: 16, duration: 0.5 }, "-=0.3");
    },
    { scope: root }
  );

  // typewriter boot log — reveals line by line like a real boot sequence
  React.useEffect(() => {
    if (!logRef.current) return;
    const node = logRef.current;
    node.textContent = "";
    let lineIdx = 0;
    let charIdx = 0;

    const typeNext = () => {
      if (lineIdx >= BOOT_LINES.length) return;
      const currentLine = BOOT_LINES[lineIdx];
      if (charIdx < currentLine.length) {
        // Type 3 chars per tick for speed
        const chunk = currentLine.slice(0, charIdx + 3);
        const before = lineIdx > 0 ? BOOT_LINES.slice(0, lineIdx).join("\n") + "\n" : "";
        node.textContent = before + chunk;
        charIdx += 3;
        node.scrollTop = node.scrollHeight;
      } else {
        // Line complete — move to next line with a brief pause
        node.textContent = BOOT_LINES.slice(0, lineIdx + 1).join("\n");
        node.scrollTop = node.scrollHeight;
        lineIdx++;
        charIdx = 0;
        // Variable delay: "..." lines pause longer, "OK" lines are quick
        const isPause = currentLine.includes("…") && !currentLine.includes("OK");
        setTimeout(typeNext, isPause ? 120 : 40);
        return;
      }
      setTimeout(typeNext, 8);
    };
    typeNext();
    return () => {};
  }, []);

  // Rare RGB-split glitch on the TAUNGOO headline — fires every 8-12s,
  // 200ms duration. Reduced-motion safe: skipped entirely when
  // prefers-reduced-motion is active. Toggles .is-glitching on the
  // .sigma-hero-glitch wordmark container; CSS keyframes handle the
  // actual RGB-split text-shadow.
  React.useEffect(() => {
    if (reduced) return;
    const node = root.current;
    if (!node) return;
    const glitchEl = node.querySelector("[data-hero-wordmark]");
    if (!glitchEl) return;
    let timer: number;
    const fire = () => {
      glitchEl.classList.add("is-glitching");
      window.setTimeout(() => {
        glitchEl.classList.remove("is-glitching");
      }, 200);
      // Schedule next fire — 8-12s random interval
      const nextDelay = 8000 + Math.random() * 4000;
      timer = window.setTimeout(fire, nextDelay);
    };
    // Initial delay — start glitching 8s after mount (after entrance anims)
    timer = window.setTimeout(fire, 8000);
    return () => {
      clearTimeout(timer);
      glitchEl.classList.remove("is-glitching");
    };
  }, [reduced]);

  const letters = "TAUNGOO".split("");

  return (
    <SectionShell
      id="s01"
      title="INITIALIZING"
      tagline="Sector 01 is the boot kernel. Sigma goes live. The lab comes online. Sigma holds at 1.0000."
    >
      <div ref={root} className="relative grid h-full grid-cols-12 gap-3 overflow-y-auto overflow-x-hidden sigma-scroll-hidden">
        {/* Ambient boot particles */}
        <SigmaParticles count={16} color="#FFFFFF" />
        {/* LEFT VERTICAL PANEL */}
        <Panel
          data-hero-panel
          label="FIG.01 / EYE"
          id="RETICLE"
          className="col-span-12 md:col-span-2 flex flex-col"
        >
          <div className="flex flex-1 items-center justify-center p-3">
            {/* eye + reticle SVG */}
            <svg viewBox="0 0 200 200" className="sigma-spin-slow h-full max-h-[220px] w-full text-foreground">
              <circle cx="100" cy="100" r="92" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.4" />
              <circle cx="100" cy="100" r="70" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.6" />
              <circle cx="100" cy="100" r="40" fill="none" stroke="currentColor" strokeWidth="2" />
              <circle cx="100" cy="100" r="12" fill="currentColor" />
              <circle cx="100" cy="100" r="4" fill="#000" />
              {/* crosshair */}
              <line x1="100" y1="0" x2="100" y2="190" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
              <line x1="0" y1="100" x2="190" y2="100" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
              {/* ticks */}
              {Array.from({ length: 36 }).map((_, i) => {
                const a = (i / 36) * Math.PI * 2;
                const x1 = 100 + Math.cos(a) * 94;
                const y1 = 100 + Math.sin(a) * 94;
                const x2 = 100 + Math.cos(a) * (i % 3 === 0 ? 86 : 90);
                const y2 = 100 + Math.sin(a) * (i % 3 === 0 ? 86 : 90);
                return (
                  <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="1" opacity="0.7" />
                );
              })}
            </svg>
          </div>
          <div className="border-t border-border/70 p-2 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
            APERTURE · ƒ/2.4Σ · FOCUS LOCKED
          </div>
        </Panel>

        {/* CENTER HERO */}
        <div className="col-span-12 flex flex-col md:col-span-8">
          {/* top status bar */}
          <div className="flex items-center justify-between border-b border-border pb-2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            <span data-hero-panel>◄ INITIALIZING ►</span>
            <span data-hero-panel>SIGMA.24 / 0114071813</span>
          </div>

          {/* the wordmark */}
          <div className="relative flex flex-1 flex-col items-center justify-center">
            <div
              data-hero-mark
              className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.06]"
            >
              <span className="font-sans text-[42vh] font-black leading-none">Σ</span>
            </div>
            <h1
              className="sigma-hero-glitch relative text-center"
              data-hero-wordmark
            >
              <div className="flex justify-center">
                {letters.map((l, i) => (
                  <span
                    key={i}
                    data-hero-letter
                    className="font-sans text-[10vw] font-black leading-[0.85] tracking-tight"
                  >
                    {l}
                  </span>
                ))}
                <span
                  data-hero-letter
                  className="font-sans text-[10vw] font-black leading-[0.85] align-super text-[0.4em]"
                >
                  ™
                </span>
              </div>
              <div className="mt-1 flex items-center justify-center gap-3">
                <span className="h-px w-12 bg-foreground/40" />
                <span
                  data-hero-letter
                  className="font-mono text-base uppercase tracking-[0.4em] text-muted-foreground sm:text-xl"
                >
                  SIGMA LAB
                </span>
                <span className="h-px w-12 bg-foreground/40" />
              </div>
            </h1>

            {/* reticle overlay on the wordmark */}
            <Crosshair className="left-6 top-6 text-foreground/50" size={16} />
            <Crosshair className="right-6 top-6 text-foreground/50" size={16} />
            <Crosshair className="bottom-6 left-6 text-foreground/50" size={16} />
            <Crosshair className="bottom-6 right-6 text-foreground/50" size={16} />

            {/* sub header block */}
            <div
              data-hero-panel
              className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground"
            >
              <span>HUMAN</span>
              <span className="text-foreground">PROCESSING</span>
              <span className="h-3 w-px bg-foreground/30" />
              <span className="text-[#00FF94]">● INITIALIZED_</span>
            </div>
          </div>

          {/* CTA row */}
          <div data-hero-cta className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-3">
            <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">
              ◄ REMODEL · RETRAIN · RE-DEPLOY ►
            </div>
            <div className="flex flex-wrap gap-2">
              <BrutalButton variant="ghost" onClick={() => navigate("map")}>
                ENTER THE MAP
              </BrutalButton>
              <BrutalButton accent="#FF4500" onClick={() => navigate("s02")}>
                READ THE MANIFESTO
              </BrutalButton>
            </div>
          </div>
        </div>

        {/* RIGHT DATA PANELS */}
        <div className="col-span-12 flex flex-col gap-3 md:col-span-2">
          <Panel data-hero-panel label="SYS.01" id="T·S·G·M·A">
            <div className="grid grid-cols-2 gap-px bg-border/60">
              {["T", "S", "G", "M", "A", "L"].map((c, i) => (
                <div key={i} className="bg-card p-2 text-center font-mono text-xl font-bold">
                  {c}
                </div>
              ))}
            </div>
            <div className="p-2 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
              ID · 0114071813
            </div>
          </Panel>

          <Panel data-hero-panel label="BOOT LOG" id="TTY/0">
            <div
              ref={logRef}
              className="sigma-scroll-hidden h-40 overflow-y-auto whitespace-pre-wrap p-2 font-mono text-[10px] leading-relaxed text-[#00FF94]"
            >
              {BOOT_LINES.join("\n")}
            </div>
          </Panel>

          <Panel data-hero-panel label="SIGMA" id="1.0000">
            <div className="p-3">
              <div className="font-mono text-3xl font-black text-foreground">1.0000</div>
              <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
                VARIABLE HOLDING NOMINAL
              </div>
              <div className="mt-2 h-1 w-full bg-foreground/15">
                <div className="h-full bg-[#00FF94]" style={{ width: "100%" }} />
              </div>
            </div>
          </Panel>
        </div>
      </div>
    </SectionShell>
  );
}
