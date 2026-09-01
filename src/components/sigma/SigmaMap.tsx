"use client";

import * as React from "react";
import Image from "next/image";
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
        "group sigma-map-node-ring relative block w-full overflow-hidden border border-border bg-card text-left transition-[border-color] duration-300 hover:border-foreground/60",
        isActive && "sigma-map-node-active border-foreground"
      )}
      style={{ aspectRatio: "4 / 3", transformStyle: "preserve-3d", "--sigma-node-accent": section.accent } as React.CSSProperties}
    >
      {/* accent top bar */}
      <div className="absolute inset-x-0 top-0 z-20 h-[3px]" style={{ background: section.accent }} />
      {/* screenshot thumbnail */}
      <Image
        src={thumb}
        alt={`${section.name} preview`}
        // PERF (LOOP-1-LH): next/image — 11 section thumbnails (~20KB each raw
        // PNG) → ~3-5KB AVIF/WebP variants at the rendered ~120x90px size.
        // sizes: 2 cols mobile, 3 cols tablet, 4 cols desktop (max ~25vw).
        fill
        sizes="(max-width: 639px) 50vw, (max-width: 1023px) 33vw, 25vw"
        className="sigma-map-node-thumb object-cover object-top opacity-95"
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
      <div className="absolute inset-x-0 top-0 flex items-start justify-between p-2 sm:p-2.5">
        <span className="font-mono text-xl font-black leading-none text-foreground drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)] sm:text-2xl lg:text-3xl">
          {section.shortCode}
        </span>
        <Tag accent={section.accent} className="bg-background/70 backdrop-blur-sm text-[8px] sm:text-[9px]">
          {section.status}
        </Tag>
      </div>

      {/* bottom block */}
      <div className="absolute inset-x-0 bottom-0 p-2 sm:p-2.5">
        <div className="flex items-end justify-between gap-1.5 sm:gap-2">
          <div className="min-w-0 flex-1">
            <div
              className="sigma-map-node-role font-mono text-[8px] tracking-[0.12em] truncate sm:text-[10px] sm:tracking-[0.16em]"
              style={{ color: section.accent }}
            >
              {section.code} · {section.role}
            </div>
            <div className="font-sans text-[13px] font-bold uppercase leading-tight tracking-tight text-foreground drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] sm:text-[15px] sm:leading-tight lg:text-lg">
              {section.name}
            </div>
          </div>
          <span
            className="flex h-6 w-6 shrink-0 items-center justify-center border font-mono text-xs sm:h-8 sm:w-8 sm:text-base"
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

  // Cursor-following parallax for the background grid.
  // Subtle (max 8px), transform-based, lerp'd for smoothness.
  // Disabled for touch devices and reduced-motion users.
  React.useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const mq = window.matchMedia("(pointer: fine)");
    if (!mq.matches) return;
    const rmq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (rmq.matches) return;

    let raf = 0;
    let tx = 0, ty = 0, cx = 0, cy = 0;
    const bg = root.querySelector("[data-map-parallax]");
    // PERF (LOOP-1-LH): cache root's bounding rect on mouseenter (the user
    // crosses into the map area before drifting), invalidate on scroll/resize.
    // Previously, mousemove forced a getBoundingClientRect() layout reflow on
    // every event — the map covers a large area and the listener fires often.
    let rect: DOMRect | null = null;
    const refreshRect = () => { rect = root.getBoundingClientRect(); };
    const invalidateRect = () => { rect = null; };
    const onMove = (e: MouseEvent) => {
      // Lazy refresh if cache was invalidated.
      if (!rect) refreshRect();
      const r = rect as DOMRect;
      // max ±8px drift — subtle, doesn't distract from the cards
      tx = ((e.clientX - r.left) / r.width - 0.5) * 16;
      ty = ((e.clientY - r.top) / r.height - 0.5) * 16;
    };
    const loop = () => {
      // Lerp factor 0.08 = smooth follow with slight lag
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      if (bg) {
        (bg as HTMLElement).style.transform = `translate3d(${cx.toFixed(2)}px, ${cy.toFixed(2)}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    root.addEventListener("mouseenter", refreshRect);
    root.addEventListener("mousemove", onMove);
    window.addEventListener("scroll", invalidateRect, { capture: true, passive: true });
    window.addEventListener("resize", invalidateRect, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      root.removeEventListener("mouseenter", refreshRect);
      root.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", invalidateRect, { capture: true });
      window.removeEventListener("resize", invalidateRect);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      data-section="map"
      className="sigma-scanlines relative flex h-full flex-col overflow-hidden"
    >
      {/* Parallax background layer — drifts max ±8px on mouse move (lerp'd,
          reduced-motion safe — see useEffect above). Sits behind everything
          else at z-0. Two layers: a fine grid + soft accent vignette. */}
      <div
        data-map-parallax
        aria-hidden
        className="pointer-events-none absolute inset-0 z-0 will-change-transform"
        style={{ transform: "translate3d(0,0,0)" }}
      >
        <div className="sigma-grid-fine absolute inset-0 opacity-[0.18]" />
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background:
              "radial-gradient(60% 50% at 50% 50%, rgba(255,69,0,0.06), transparent 70%)",
          }}
        />
      </div>

      {/* HEADER */}
      <header
        data-map-title
        className="relative z-10 flex flex-wrap items-end justify-between gap-4 border-b border-border pb-4"
      >
        <div>
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            <span className="sigma-pulse h-1.5 w-1.5 bg-[#00FF94]" />
            NEXUS MAP / SECTOR SELECT
          </div>
          <h1 id="map-title" className="mt-1 font-sans text-4xl font-black uppercase leading-[0.9] tracking-tight sm:text-6xl">
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

      {/* MAIN: node grid (as <nav> — sector selection IS site navigation) +
          readout rail (<aside>). LOOP-3-AGENTIC-SEO: the node grid is wrapped
          in <nav aria-label="Sectors"> so AI crawlers + screen readers
          recognize it as the primary site-navigation landmark. */}
      <main className="relative z-10 mt-4 grid min-h-0 flex-1 grid-cols-1 gap-3 lg:grid-cols-[1fr_240px]">
        {/* node constellation — wrapped in <nav> because each MapNode is a
            button that navigates to a different sector (i.e. site section). */}
        <nav aria-label="Sectors" className="min-h-0 overflow-y-auto sigma-scroll-hidden">
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
        </nav>

        {/* readout rail */}
        <aside aria-label="Target readout" className="hidden flex-col gap-3 lg:flex">
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
      </main>
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
