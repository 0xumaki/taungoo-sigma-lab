"use client";

import * as React from "react";
import { SECTIONS } from "@/lib/sigma/sections";
import { useSigmaStore } from "@/lib/sigma/store";

/**
 * SigmaProgress — a vertical sector progress indicator showing all 11 sectors
 * as ticks on the right edge, with the current sector highlighted.
 * Clicking a tick navigates to that sector.
 */
export function SigmaProgress() {
  const { view, navigate, phase } = useSigmaStore();
  if (view === "map") return null;

  return (
    <div className="fixed right-2 top-1/2 z-[78] hidden -translate-y-1/2 flex-col items-center gap-1.5 md:flex">
      {/* label */}
      <span className="mb-1 font-mono text-[8px] uppercase tracking-[0.3em] text-muted-foreground [writing-mode:vertical-rl]">
        SECTOR
      </span>
      {SECTIONS.map((s) => {
        const active = view === s.id;
        return (
          <button
            key={s.id}
            onClick={() => phase === "idle" && navigate(s.id)}
            className="group relative flex items-center justify-end gap-1.5"
            aria-label={`Sector ${s.shortCode}: ${s.name}`}
          >
            {/* tooltip on hover */}
            <span className="pointer-events-none absolute right-6 whitespace-nowrap border border-border bg-background/90 px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.18em] opacity-0 transition-opacity group-hover:opacity-100">
              {s.shortCode} · {s.name}
            </span>
            {/* tick */}
            <span
              className="block transition-all duration-300"
              style={{
                width: active ? 18 : 12,
                height: 2,
                background: active ? s.accent : "rgba(255,255,255,0.2)",
              }}
            />
          </button>
        );
      })}
      {/* end cap */}
      <span className="mt-1 font-mono text-[8px] uppercase tracking-[0.3em] text-muted-foreground [writing-mode:vertical-rl]">
        {view === "s11" ? "END" : "→"}
      </span>
    </div>
  );
}
