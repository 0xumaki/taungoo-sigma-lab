"use client";

import * as React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  getSection,
  nextSection,
  prevSection,
  type SectionId,
} from "@/lib/sigma/sections";
import { useSigmaStore } from "@/lib/sigma/store";
import { cn } from "@/lib/utils";
import { Crosshair, Panel } from "./components";

gsap.registerPlugin(useGSAP);

/** Wrapper that gives every section its brutalist frame, nav, and intro animation. */
export function SectionShell({
  id,
  title,
  tagline,
  children,
  className,
  dense,
}: {
  id: SectionId;
  title: string;
  tagline: string;
  children: React.ReactNode;
  className?: string;
  dense?: boolean;
}) {
  const meta = getSection(id);
  const { navigate } = useSigmaStore();
  const rootRef = React.useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from("[data-shell-title]", { opacity: 0, y: 24, duration: 0.6, clearProps: "opacity,transform" })
        .from(
          "[data-shell-tag]",
          { opacity: 0, y: 12, duration: 0.5, stagger: 0.05, clearProps: "opacity,transform" },
          "-=0.4"
        )
        .from(
          "[data-shell-block]",
          { opacity: 0, y: 30, duration: 0.7, stagger: 0.08, clearProps: "opacity,transform" },
          "-=0.3"
        );
    },
    { scope: rootRef }
  );

  return (
    <div
      ref={rootRef}
      className={cn(
        "sigma-scanlines relative flex h-full w-full flex-col overflow-hidden",
        className
      )}
    >
      {/* accent ambient */}
      <div
        className="pointer-events-none absolute -left-1/4 -top-1/4 h-[120%] w-[60%] opacity-[0.07] blur-3xl"
        style={{ background: meta.accent }}
      />

      {/* HEADER ROW — extra right padding to avoid overlap with fixed HUD buttons */}
      <header className="relative z-10 flex flex-wrap items-end justify-between gap-3 border-b border-border pb-3 pr-20">
        <div className="min-w-0">
          <div
            className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground"
            data-shell-tag
          >
            <span
              className="sigma-pulse h-1.5 w-1.5"
              style={{ background: meta.accent }}
            />
            SECTOR {meta.shortCode} / {meta.code} · {meta.role}
          </div>
          <h2
            data-shell-title
            className="mt-1 font-sans text-3xl font-black uppercase leading-[0.9] tracking-tight sm:text-5xl"
          >
            {title}
          </h2>
          <p
            data-shell-tag
            className="mt-1 max-w-2xl font-serif text-sm italic text-muted-foreground"
          >
            {tagline}
          </p>
        </div>

        {/* nav cluster */}
        <div className="flex shrink-0 items-center gap-2">
          <NavBtn
            label="◂ PREV"
            onClick={() => navigate(prevSection(id))}
            accent={meta.accent}
          />
          <NavBtn
            label="MAP"
            onClick={() => navigate("map")}
            accent={meta.accent}
            primary
          />
          <NavBtn
            label="NEXT ▸"
            onClick={() => navigate(nextSection(id))}
            accent={meta.accent}
          />
        </div>
      </header>

      {/* CONTENT */}
      <div className="relative z-10 mt-3 min-h-0 flex-1 overflow-hidden">
        <div className={cn("h-full w-full", dense ? "" : "")}>{children}</div>
      </div>

      {/* FOOTER micro-bar */}
      <footer className="relative z-10 mt-2 flex items-center justify-between border-t border-border/70 pt-2 font-mono text-[9px] uppercase tracking-[0.24em] text-muted-foreground">
        <span>TAUNGOO SIGMA LAB / {meta.code}.{meta.shortCode}</span>
        <span style={{ color: meta.accent }}>{meta.status}</span>
        <span className="hidden sm:inline">SIG=1.00 · BUILD 2.4.SIGMA</span>
      </footer>

      {/* big corner index watermark with glitch */}
      <div className="pointer-events-none absolute -bottom-2 right-4 z-0 select-none font-sans text-[20vh] font-black leading-none">
        <span
          className="sigma-glitch text-foreground/[0.04]"
          data-text={meta.shortCode}
        >
          {meta.shortCode}
        </span>
      </div>
    </div>
  );
}

function NavBtn({
  label,
  onClick,
  accent,
  primary,
}: {
  label: string;
  onClick: () => void;
  accent: string;
  primary?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "whitespace-nowrap border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.18em] transition-all duration-200 hover:translate-x-[1px] active:translate-x-[2px]",
        primary
          ? "text-background"
          : "border-border text-foreground hover:bg-foreground/10"
      )}
      style={primary ? { background: accent, borderColor: accent } : undefined}
    >
      {label}
    </button>
  );
}

/** Re-export shared bits for section authors */
export { Crosshair, Panel };
