"use client";

import * as React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { SECTIONS, MAP_META, getSection, type SectionMeta } from "@/lib/sigma/sections";
import { useSigmaStore } from "@/lib/sigma/store";
import { sigmaSound } from "@/lib/sigma/sound";
import { useTilt3D } from "@/hooks/use-tilt-3d";
import { cn } from "@/lib/utils";
import { BrutalButton, Crosshair, Panel, Tag } from "./shared/components";

gsap.registerPlugin(useGSAP);

/** A single level-select node on the Nexus Map. */
function MapNode({
  section,
  index,
  onEnter,
  onHover,
}: {
  section: SectionMeta;
  index: number;
  onEnter: () => void;
  onHover: (id: SectionMeta | null) => void;
}) {
  const ref = useTilt3D<HTMLButtonElement>(8);
  const { view } = useSigmaStore();
  const isActive = view === section.id;

  // the screenshot we will capture per-section lives at /sections/sXX.png
  const thumb = `/sections/${section.id}.png`;

  return (
    <button
      ref={ref}
      data-node
      onMouseEnter={() => { onHover(section); sigmaSound.play("hover"); }}
      onMouseLeave={() => onHover(null)}
      onClick={() => { onEnter(); sigmaSound.play("transition"); }}
      className={cn(
        "group relative block w-full overflow-hidden border border-border bg-card text-left transition-[border-color] duration-300 hover:border-foreground/60",
        isActive && "border-foreground"
      )}
      style={{ aspectRatio: "4 / 3", transformStyle: "preserve-3d" } as React.CSSProperties}
    >
      {/* accent top bar */}
      <div className="absolute inset-x-0 top-0 z-20 h-[3px]" style={{ background: section.accent }} />
      {/* screenshot thumbnail */}
      <img
        src={thumb}
        alt={`${section.name} preview`}
        className="absolute inset-0 h-full w-full object-cover object-top opacity-95 transition-all duration-500 group-hover:scale-105 group-hover:opacity-100"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).style.display = "none";
        }}
      />
      {/* accent wash */}
      <div
        className="absolute inset-0 opacity-30 mix-blend-color transition-opacity duration-500 group-hover:opacity-60"
        style={{ background: section.accent }}
      />
      {/* scanlines */}
      <div className="sigma-scanlines absolute inset-0 opacity-60" />
      {/* grid overlay */}
      <div className="sigma-grid-fine absolute inset-0 opacity-30" />

      {/* top row: index + status */}
      <div className="absolute inset-x-0 top-0 flex items-start justify-between p-2.5">
        <span className="font-mono text-3xl font-black leading-none text-foreground drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
          {section.shortCode}
        </span>
        <Tag accent={section.accent} className="bg-background/70 backdrop-blur-sm">
          {section.status}
        </Tag>
      </div>

      {/* bottom block */}
      <div className="absolute inset-x-0 bottom-0 p-2.5">
        <div className="flex items-end justify-between gap-2">
          <div>
            <div
              className="font-mono text-[10px] tracking-[0.24em]"
              style={{ color: section.accent }}
            >
              {section.code} · {section.role}
            </div>
            <div className="font-sans text-[15px] font-bold uppercase leading-tight tracking-tight text-foreground drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] sm:text-lg">
              {section.name}
            </div>
          </div>
          <span
            className="flex h-8 w-8 shrink-0 items-center justify-center border font-mono text-base"
            style={{ borderColor: `${section.accent}99`, color: section.accent }}
          >
            {section.glyph}
          </span>
        </div>
        {/* enter affordance */}
        <div className="mt-2 flex translate-y-1 items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.28em] text-foreground opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <span style={{ color: section.accent }}>◄</span> JACK IN → {section.name}
          <span className="ml-auto" style={{ color: section.accent }}>
            ►
          </span>
        </div>
      </div>

      {/* corner crosshairs */}
      <Crosshair className="left-1 top-1 text-foreground/70" size={10} />
      <Crosshair className="right-1 top-1 text-foreground/70" size={10} />
    </button>
  );
}

/** The Nexus Map — the video-game level-select hub. */
export function SigmaMap() {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const { navigate, hoverNode } = useSigmaStore();
  const [hovered, setHovered] = React.useState<SectionMeta | null>(null);

  useGSAP(
    () => {
      gsap.from("[data-node]", {
        opacity: 0,
        y: 28,
        scale: 0.94,
        duration: 0.6,
        ease: "power3.out",
        stagger: { each: 0.05, from: "random" },
        clearProps: "opacity,transform",
      });
      gsap.from("[data-map-title]", {
        opacity: 0,
        y: 20,
        duration: 0.7,
        ease: "power3.out",
        clearProps: "opacity,transform",
      });
    },
    { scope: rootRef }
  );

  const readout = hovered ?? MAP_META;

  // Cursor-following parallax for the background grid
  React.useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const mq = window.matchMedia("(pointer: fine)");
    if (!mq.matches) return;
    const rmq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (rmq.matches) return;

    let raf = 0;
    let tx = 0, ty = 0, cx = 0, cy = 0;
    const grid = root.querySelector(".sigma-grid");
    const onMove = (e: MouseEvent) => {
      const rect = root.getBoundingClientRect();
      tx = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
      ty = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
    };
    const loop = () => {
      cx += (tx - cx) * 0.05;
      cy += (ty - cy) * 0.05;
      if (grid) {
        (grid as HTMLElement).style.transform = `translate(${cx.toFixed(1)}px, ${cy.toFixed(1)}px)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    root.addEventListener("mousemove", onMove);
    return () => {
      cancelAnimationFrame(raf);
      root.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="sigma-scanlines relative flex h-full flex-col overflow-hidden"
    >
      {/* HEADER */}
      <header
        data-map-title
        className="flex flex-wrap items-end justify-between gap-4 border-b border-border pb-4"
      >
        <div>
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            <span className="sigma-pulse h-1.5 w-1.5 bg-[#00FF94]" />
            NEXUS MAP / SECTOR SELECT
          </div>
          <h1 className="mt-1 font-sans text-4xl font-black uppercase leading-[0.9] tracking-tight sm:text-6xl">
            CHOOSE YOUR{" "}
            <span
              className="sigma-glitch"
              data-text="SECTOR"
              style={{ color: "#FF4500" }}
            >
              SECTOR
            </span>
          </h1>
          <p className="mt-2 max-w-xl font-serif text-base italic text-muted-foreground">
            Eleven sectors cover the full stack — from boot sequence to live
            telemetry to the contact form. Each sector is a real page with real
            content. Pick one to jack in.
          </p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            BUILD 2.4.SIGMA · 11 SECTORS · 1 SIGMA
          </div>
          <div className="flex gap-1.5">
            <BrutalButton
              variant="outline"
              arrow={false}
              onClick={() => navigate("s01")}
              className="px-2.5 py-1.5 text-[10px]"
            >
              BOOT SECTOR 01
            </BrutalButton>
          </div>
        </div>
      </header>

      {/* MAIN: node grid + readout rail */}
      <div className="mt-4 grid min-h-0 flex-1 grid-cols-1 gap-3 lg:grid-cols-[1fr_240px]">
        {/* node constellation */}
        <div className="min-h-0 overflow-y-auto sigma-scroll-hidden">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
            {SECTIONS.map((s, i) => (
              <MapNode
                key={s.id}
                section={s}
                index={i}
                onEnter={() => navigate(s.id)}
                onHover={setHovered}
              />
            ))}
          </div>
        </div>

        {/* readout rail */}
        <aside className="hidden flex-col gap-3 lg:flex">
          <Panel label="TARGET READOUT" id={readout.shortCode} accent={readout.accent}>
            <div className="p-3">
              <div
                className="flex h-16 items-center justify-center border font-mono text-4xl"
                style={{ color: readout.accent, borderColor: `${readout.accent}55` }}
              >
                {readout.glyph}
              </div>
              <div className="mt-3">
                <div
                  className="font-mono text-[10px] tracking-[0.24em]"
                  style={{ color: readout.accent }}
                >
                  {readout.code}
                </div>
                <div className="font-sans text-xl font-bold uppercase tracking-tight">
                  {readout.name}
                </div>
                <div className="mt-1 font-serif text-sm italic text-muted-foreground">
                  {readout.tagline}
                </div>
              </div>
              <div className="mt-3 space-y-1.5 border-t border-border/70 pt-3 font-mono text-[10px] uppercase tracking-[0.2em]">
                <Row k="INDEX" v={readout.shortCode} />
                <Row k="ROLE" v={readout.role} />
                <Row k="STATUS" v={readout.status} c={readout.accent} />
              </div>
            </div>
          </Panel>

          <Panel label="CONTROLS" id="I/O">
            <div className="space-y-1.5 p-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              <div className="flex justify-between">
                <span>OPEN MAP</span>
                <span className="text-foreground">[ M ]</span>
              </div>
              <div className="flex justify-between">
                <span>NEXT SECTOR</span>
                <span className="text-foreground">[ → ]</span>
              </div>
              <div className="flex justify-between">
                <span>PREV SECTOR</span>
                <span className="text-foreground">[ ← ]</span>
              </div>
              <div className="flex justify-between">
                <span>JUMP</span>
                <span className="text-foreground">[ 0-9 ]</span>
              </div>
              <div className="flex justify-between">
                <span>BACK TO MAP</span>
                <span className="text-foreground">[ ESC ]</span>
              </div>
            </div>
          </Panel>

          <div className="sigma-hazard-orange h-2" />
          <div className="font-mono text-[9px] uppercase leading-relaxed tracking-[0.18em] text-muted-foreground">
            ▸ Hover a node to scan. Click to jack in. Each sector is an
            absolute environment — no scroll, no chrome, only signal.
          </div>
        </aside>
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
