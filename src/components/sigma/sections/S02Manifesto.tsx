"use client";

import * as React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useSigmaStore } from "@/lib/sigma/store";
import { SectionShell } from "../shared/SectionShell";
import { BrutalButton, Panel, StatReadout, Tag } from "../shared/components";
import { SigmaParticles } from "../shared/SigmaParticles";

gsap.registerPlugin(useGSAP);

const PILLARS = [
  "RE-MODEL how a lab in Taungoo can ship software the world uses.",
  "RE-TRAIN a generation of operators on real, deployed systems.",
  "RE-DEPLOY capital, code, and community as one sigma variable.",
];

const STATS = [
  { label: "FOUNDED", value: "2024", unit: "MMXXIV" },
  { label: "SECTORS MAPPED", value: "11", unit: "ACTIVE" },
  { label: "ARTIFACTS SHIPPED", value: "11", unit: "LIVE" },
  { label: "SIGMA VARIABLE", value: "1.00", unit: "HOLD" },
];

export function S02Manifesto() {
  const { navigate } = useSigmaStore();
  const root = React.useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from("[data-circle]", { scale: 0, duration: 1.1, ease: "power2.out" }, 0)
        .from("[data-m-line]", { opacity: 0, y: 30, duration: 0.6, stagger: 0.08 }, 0.2)
        .from("[data-m-stat]", { opacity: 0, y: 20, duration: 0.5, stagger: 0.06 }, 0.5)
        .from("[data-m-panel]", { opacity: 0, x: 40, duration: 0.6, stagger: 0.1 }, 0.4);
    },
    { scope: root }
  );

  return (
    <SectionShell
      id="s02"
      title="MANIFESTO"
      tagline="Sector 02 is the mission statement — we build AI, Web3, and community tech that ships to production."
    >
      <div ref={root} className="relative grid h-full grid-cols-12 gap-3">
        {/* Ambient particles */}
        <SigmaParticles count={12} color="#FF4500" />
        {/* THE GIANT ORANGE CIRCLE */}
        <div className="pointer-events-none absolute inset-0 z-0 flex items-center">
          <div
            data-circle
            className="relative aspect-square h-[115%] -translate-x-[18%] rounded-full"
            style={{ background: "#FF4500" }}
          >
            {/* human silhouette at base */}
            <svg
              viewBox="0 0 200 200"
              className="absolute bottom-6 left-1/2 h-28 w-28 -translate-x-1/2 text-black"
            >
              <circle cx="100" cy="60" r="26" fill="currentColor" />
              <path
                d="M 60 170 Q 100 90 140 170 Z"
                fill="currentColor"
              />
            </svg>
            {/* rotating sigma glyph — RESTORED (user never asked to remove it) */}
            <div className="sigma-spin-slow absolute inset-0 flex items-center justify-center">
              <span className="font-sans text-[40vh] font-black text-black/15">Σ</span>
            </div>
          </div>
        </div>

        {/* LEFT — headline */}
        <div className="relative z-10 col-span-12 flex flex-col justify-center md:col-span-7">
          <Tag accent="#FF4500" className="mb-3 w-fit">
            MANIFESTO / 2024
          </Tag>
          <h2 className="font-sans text-5xl font-black uppercase leading-[0.88] tracking-tight sm:text-7xl">
            <span data-m-line className="block">WE ARE</span>
            <span data-m-line className="block text-[#FF4500]">
              THE SIGMA
            </span>
            <span data-m-line className="block">
              VARIABLE.
            </span>
          </h2>
          <p data-m-line className="mt-5 max-w-md font-serif text-lg italic text-foreground/80">
            A research lab in Taungoo building at the intersection of AI, Web3,
            and community resilience. We treat the lab itself as a sigma — the
            unmeasured deviation that bends the curve.
          </p>

          <div className="mt-6 space-y-3">
            {PILLARS.map((p, i) => (
              <div
                data-m-panel
                key={i}
                className="flex items-start gap-3 border-l-2 border-[#FF4500] pl-3"
              >
                <span className="font-mono text-xs text-[#FF4500]">
                  0{i + 1}
                </span>
                <span className="font-sans text-sm text-foreground/90">{p}</span>
              </div>
            ))}
          </div>

          <div data-m-panel className="mt-6">
            <BrutalButton accent="#FF4500" onClick={() => navigate("s03")}>
              ENTER CORE SYSTEMS
            </BrutalButton>
          </div>
        </div>

        {/* RIGHT — stats + date badge */}
        <div className="relative z-10 col-span-12 flex flex-col gap-3 md:col-span-5 md:items-end">
          <div
            data-circle
            className="flex flex-col items-end border border-foreground/30 bg-background/70 p-3 backdrop-blur-sm"
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              FOUNDED
            </span>
            <div className="flex items-baseline gap-1">
              <span className="font-sans text-6xl font-black leading-none text-[#FF4500]">29</span>
              <span className="font-sans text-2xl font-bold text-foreground">.06.</span>
              <span className="font-sans text-2xl font-bold text-foreground">24</span>
            </div>
          </div>

          <div className="grid w-full max-w-xs grid-cols-2 gap-2">
            {STATS.map((s, i) => (
              <Panel
                key={s.label}
                data-m-stat
                className="bg-background/70 backdrop-blur-sm"
              >
                <div className="p-3">
                  <StatReadout
                    label={s.label}
                    value={s.value}
                    unit={s.unit}
                    accent={i % 2 === 0 ? "#FF4500" : undefined}
                  />
                </div>
              </Panel>
            ))}
          </div>

          <Panel data-m-panel className="max-w-xs bg-background/70 backdrop-blur-sm">
            <div className="p-3 font-mono text-[10px] uppercase leading-relaxed tracking-[0.2em] text-muted-foreground">
              ▸ Located in <span className="text-foreground">Taungoo, Bago Region</span>
              <br />▸ Operating across <span className="text-foreground">11 sectors</span>
              <br />▸ Partnership model:{" "}
              <span className="text-[#FF4500]">Helsinki Trust</span>
            </div>
          </Panel>
        </div>
      </div>
    </SectionShell>
  );
}
