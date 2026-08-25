"use client";

import * as React from "react";
import gsap from "gsap";
import { SECTIONS } from "@/lib/sigma/sections";
import { useSigmaStore } from "@/lib/sigma/store";
import { sigmaSound } from "@/lib/sigma/sound";

const SHORTCUTS = [
  { key: "M", desc: "Return to Nexus Map" },
  { key: "ESC", desc: "Back to Map (from any sector)" },
  { key: "← →", desc: "Previous / Next sector" },
  { key: "0-9", desc: "Jump to sector (0=Map, 1-11=sectors)" },
  { key: "⌘K", desc: "Open Command Palette" },
  { key: "/", desc: "Quick-open Command Palette" },
  { key: "T", desc: "Toggle Tour Mode" },
  { key: "H", desc: "Toggle this Help overlay" },
  { key: "↑↑↓↓←→←→BA", desc: "Konami code (secret)" },
];

/**
 * SigmaHelp — a [H] key overlay showing all keyboard shortcuts.
 * Fades in with a GSAP animation. Click outside or press H/ESC to close.
 */
export function SigmaHelp() {
  const { view } = useSigmaStore();
  const [open, setOpen] = React.useState(false);
  const rootRef = React.useRef<HTMLDivElement>(null);

  // keyboard shortcut
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "h" || e.key === "H") {
        // don't trigger when typing in an input
        const t = e.target as HTMLElement;
        if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
        e.preventDefault();
        setOpen((o) => {
          sigmaSound.play(!o ? "open" : "close");
          return !o;
        });
      } else if (e.key === "Escape" && open) {
        setOpen(false);
        sigmaSound.play("close");
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // GSAP intro
  React.useEffect(() => {
    if (!open) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-help-backdrop]",
        { opacity: 0 },
        { opacity: 1, duration: 0.2, ease: "power2.out" }
      );
      gsap.fromTo(
        "[data-help-panel]",
        { opacity: 0, scale: 0.94, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.35, ease: "power3.out" }
      );
      gsap.from("[data-help-row]", {
        opacity: 0,
        x: -16,
        duration: 0.25,
        ease: "power2.out",
        stagger: 0.03,
      });
      gsap.from("[data-help-sector]", {
        opacity: 0,
        y: 8,
        duration: 0.2,
        ease: "power2.out",
        stagger: 0.02,
      });
    }, rootRef);
    return () => ctx.revert();
  }, [open]);

  if (!open) return null;

  return (
    <div ref={rootRef} className="fixed inset-0 z-[115] flex items-center justify-center">
      <div
        data-help-backdrop
        className="absolute inset-0 bg-background/85 backdrop-blur-sm"
        onClick={() => { setOpen(false); sigmaSound.play("close"); }}
      />
      <div
        data-help-panel
        className="sigma-scanlines relative w-full max-w-2xl border border-border bg-card shadow-[0_24px_80px_-12px_rgba(0,0,0,0.9)]"
      >
        {/* header */}
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <div className="flex items-center gap-2">
            <span className="sigma-pulse h-1.5 w-1.5 bg-[#00FF94]" />
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-foreground">
              KEYBOARD REFERENCE
            </span>
          </div>
          <button
            onClick={() => { setOpen(false); sigmaSound.play("close"); }}
            className="border border-border px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:bg-foreground/10"
            data-cursor="hover"
          >
            [ESC] CLOSE
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 p-5 md:grid-cols-2">
          {/* shortcuts list */}
          <div>
            <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              ▸ SHORTCUTS
            </div>
            <div className="space-y-1">
              {SHORTCUTS.map((s) => (
                <div
                  key={s.key}
                  data-help-row
                  className="flex items-center justify-between gap-3 border-b border-border/40 py-1.5"
                >
                  <kbd className="border border-border bg-background px-2 py-0.5 font-mono text-[10px] tracking-[0.1em] text-foreground">
                    {s.key}
                  </kbd>
                  <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-muted-foreground">
                    {s.desc}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* sectors list */}
          <div>
            <div className="mb-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              ▸ 11 SECTORS
            </div>
            <div className="grid grid-cols-2 gap-1">
              {SECTIONS.map((s) => (
                <div
                  key={s.id}
                  data-help-sector
                  className="flex items-center gap-1.5 border border-border/40 p-1"
                >
                  <span
                    className="font-mono text-xs font-bold"
                    style={{ color: s.accent }}
                  >
                    {s.shortCode}
                  </span>
                  <span className="truncate font-mono text-[9px] uppercase tracking-[0.12em] text-muted-foreground">
                    {s.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* footer */}
        <div className="flex items-center justify-between border-t border-border px-4 py-2 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
          <span>TAUNGOO SIGMA LAB · BUILD 2.4.SIGMA</span>
          <span>当前 SECTOR: <span style={{ color: view === "map" ? "#FFFFFF" : undefined }}>{view === "map" ? "NEXUS" : view.toUpperCase()}</span></span>
        </div>
      </div>
    </div>
  );
}
