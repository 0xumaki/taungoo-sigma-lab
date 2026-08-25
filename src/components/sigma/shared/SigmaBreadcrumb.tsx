"use client";

import * as React from "react";
import { SECTIONS, getSection, type SectionId } from "@/lib/sigma/sections";
import { useSigmaStore } from "@/lib/sigma/store";
import { sigmaSound } from "@/lib/sigma/sound";

/**
 * SigmaBreadcrumb — a top-center breadcrumb showing all visited sectors
 * as a trail of dots. The current sector is highlighted.
 * Persists visited sectors in sessionStorage.
 */
export function SigmaBreadcrumb() {
  const view = useSigmaStore((s) => s.view);
  const navigate = useSigmaStore((s) => s.navigate);
  const phase = useSigmaStore((s) => s.phase);
  const [visited, setVisited] = React.useState<SectionId[]>([]);

  // update visited when view changes
  React.useEffect(() => {
    if (view === "map") return;
    setVisited((prev) => {
      if (prev.includes(view)) return prev;
      const next = [...prev, view];
      try {
        sessionStorage.setItem("sigma_visited", JSON.stringify(next));
      } catch {
        // ignore
      }
      return next;
    });
  }, [view]);

  if (view === "map") return null;

  const visitedSectors = visited
    .map((id) => SECTIONS.find((s) => s.id === id))
    .filter(Boolean) as typeof SECTIONS;

  if (visitedSectors.length < 2) return null;

  return (
    <div className="fixed left-1/2 top-9 z-[79] hidden -translate-x-1/2 items-center gap-1 border border-border bg-background/80 px-2 py-1 backdrop-blur-sm md:flex">
      <span className="mr-1 font-mono text-[8px] uppercase tracking-[0.2em] text-muted-foreground">
        TRAIL
      </span>
      {visitedSectors.map((s, i) => {
        const isCurrent = s.id === view;
        const meta = getSection(s.id);
        return (
          <React.Fragment key={s.id}>
            {i > 0 && (
              <span className="font-mono text-[8px] text-muted-foreground/40">›</span>
            )}
            <button
              onClick={() => {
                if (phase === "idle" && !isCurrent) {
                  navigate(s.id);
                  sigmaSound.play("click");
                }
              }}
              className="group flex items-center gap-1 px-1 py-0.5 transition-colors hover:bg-foreground/10"
              data-cursor="hover"
              title={`${s.shortCode} · ${s.name}`}
            >
              <span
                className="h-1.5 w-1.5 transition-all"
                style={{
                  background: isCurrent ? meta.accent : `${meta.accent}66`,
                  width: isCurrent ? 8 : 6,
                  height: isCurrent ? 8 : 6,
                }}
              />
              <span
                className="font-mono text-[8px] uppercase tracking-[0.14em] transition-colors"
                style={{ color: isCurrent ? meta.accent : "rgba(255,255,255,0.4)" }}
              >
                {s.shortCode}
              </span>
            </button>
          </React.Fragment>
        );
      })}
      <span className="ml-1 font-mono text-[8px] uppercase tracking-[0.2em] text-muted-foreground">
        {visitedSectors.length}/11
      </span>
    </div>
  );
}
