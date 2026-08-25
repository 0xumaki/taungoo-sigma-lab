"use client";

import * as React from "react";
import { useSigmaStore } from "@/lib/sigma/store";
import { getSection } from "@/lib/sigma/sections";
import { Marquee } from "./components";

/** Persistent HUD that lives above every view: top status rail, bottom ticker, side coordinates. */
export function SigmaHud() {
  const { view, phase } = useSigmaStore();
  const meta = getSection(view);
  const [clock, setClock] = React.useState("");
  const [coords, setCoords] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    const tick = () => {
      const d = new Date();
      const pad = (n: number) => String(n).padStart(2, "0");
      setClock(
        `${pad(d.getUTCHours())}:${pad(d.getUTCMinutes())}:${pad(
          d.getUTCSeconds()
        )} UTC`
      );
    };
    tick();
    const i = setInterval(tick, 1000);
    return () => clearInterval(i);
  }, []);

  React.useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setCoords({
        x: Math.round((e.clientX / window.innerWidth) * 1000),
        y: Math.round((e.clientY / window.innerHeight) * 1000),
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const phaseLabel =
    phase === "covering"
      ? "TRANSITIONING"
      : phase === "revealing"
      ? "REVEALING"
      : "NOMINAL";

  return (
    <>
      {/* TOP STATUS RAIL */}
      <header className="pointer-events-none fixed inset-x-0 top-0 z-[70] flex h-8 items-stretch border-b border-border/80 bg-background/80 font-mono text-[10px] uppercase tracking-[0.2em] backdrop-blur-sm">
        <div className="flex items-center gap-2 border-r border-border/80 px-3">
          <span className="sigma-pulse h-1.5 w-1.5 bg-[#00FF94]" />
          <span className="text-foreground">TAUNGOO</span>
          <span className="text-muted-foreground">SIGMA LAB</span>
        </div>
        <div className="hidden items-center gap-2 border-r border-border/80 px-3 sm:flex">
          <span className="text-muted-foreground">SYS</span>
          <span style={{ color: meta.accent }} className="font-medium">
            {meta.shortCode}.{meta.code}
          </span>
        </div>
        <div className="hidden flex-1 items-center px-3 md:flex">
          <Marquee duration={40} className="text-muted-foreground">
            <span className="mr-8">◂ SECTOR {meta.shortCode} ONLINE</span>
            <span className="mr-8">▸ 11 SECTORS MAPPED</span>
            <span className="mr-8">▸ NEURAL FORGE ACTIVE</span>
            <span className="mr-8">▸ ACCESS: PUBLIC READ</span>
            <span className="mr-8">▸ CORE TEMP 41°C</span>
            <span className="mr-8">◂ DO NOT EXCEED RATED SIGMA</span>
          </Marquee>
        </div>
        <div className="ml-auto flex items-center">
          <span className="hidden border-l border-border/80 px-3 text-muted-foreground sm:block">
            {phaseLabel}
          </span>
          <span className="border-l border-border/80 px-3 text-muted-foreground tabular-nums">
            {clock}
          </span>
        </div>
      </header>

      {/* LEFT VERTICAL RAIL */}
      <aside className="pointer-events-none fixed left-0 top-8 bottom-8 z-[70] hidden w-8 overflow-hidden border-r border-border/60 bg-background/60 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground lg:flex">
        <div
          className="flex flex-1 items-center justify-center overflow-hidden"
          style={{ writingMode: "vertical-rl" }}
        >
          Σ / {meta.code}
        </div>
      </aside>

      {/* RIGHT VERTICAL RAIL */}
      <aside className="pointer-events-none fixed right-0 top-8 bottom-8 z-[70] hidden w-8 overflow-hidden border-l border-border/60 bg-background/60 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground lg:flex">
        <div
          className="flex flex-1 items-center justify-center overflow-hidden"
          style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
        >
          {String(coords.x).padStart(4, "0")} · {String(coords.y).padStart(4, "0")}
        </div>
      </aside>

      {/* BOTTOM STATUS BAR */}
      <footer className="pointer-events-none fixed inset-x-0 bottom-0 z-[70] flex h-7 items-stretch border-t border-border/80 bg-background/80 font-mono text-[10px] uppercase tracking-[0.2em] backdrop-blur-sm">
        <div className="flex items-center border-r border-border/80 px-3">
          <span className="text-muted-foreground">VIEW</span>
          <span className="ml-2 text-foreground">
            {view === "map" ? "NEXUS" : `SECTOR ${meta.shortCode}`}
          </span>
        </div>
        <div className="hidden items-center border-r border-border/80 px-3 sm:flex">
          <span className="text-muted-foreground">ROLE</span>
          <span className="ml-2 text-foreground">{meta.role}</span>
        </div>
        <div className="hidden items-center border-r border-border/80 px-3 md:flex">
          <span className="text-muted-foreground">STATUS</span>
          <span className="ml-2" style={{ color: meta.accent }}>
            {meta.status}
          </span>
        </div>
        <div className="ml-auto flex items-center">
          <span className="border-l border-border/80 px-3 text-muted-foreground">
            <span className="sigma-blink">▮</span> [M] MAP · [←/→] NAV · [⌘K] JUMP · [T] TOUR · [R] RAND · [C] MC · [H] HELP · [L] THEME
          </span>
        </div>
      </footer>
    </>
  );
}
