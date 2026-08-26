"use client";

import * as React from "react";
import { SECTIONS } from "@/lib/sigma/sections";
import { useSigmaStore } from "@/lib/sigma/store";
import { toast } from "sonner";
import { SigmaCelebration } from "./SigmaCelebration";

/**
 * SigmaCompletion — tracks which sectors the user has visited.
 * Shows a completion progress ring in the HUD area.
 * When all 11 sectors are visited, triggers a full-screen celebration.
 */
export function SigmaCompletion() {
  const view = useSigmaStore((s) => s.view);
  const [visited, setVisited] = React.useState<Set<string>>(new Set());
  const [celebrating, setCelebrating] = React.useState(false);

  // load from localStorage
  React.useEffect(() => {
    try {
      const raw = localStorage.getItem("sigma_completion");
      if (raw) {
        const arr = JSON.parse(raw) as string[];
        setVisited(new Set(arr));
      }
    } catch {
      // ignore
    }
  }, []);

  // track current sector
  React.useEffect(() => {
    if (view === "map") return;
    setVisited((prev) => {
      if (prev.has(view)) return prev;
      const next = new Set(prev);
      next.add(view);
      try {
        localStorage.setItem("sigma_completion", JSON.stringify([...next]));
      } catch {
        // ignore
      }
      // celebrate when all 11 are visited
      if (next.size === 11) {
        setCelebrating(true);
      }
      return next;
    });
  }, [view]);

  const count = visited.size;
  const pct = Math.round((count / 11) * 100);
  const radius = 16;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (pct / 100) * circumference;

  return (
    <>
    <div className="fixed right-9 top-[140px] z-[78] hidden items-center gap-2 md:flex">
      <div className="relative h-10 w-10">
        <svg className="h-full w-full -rotate-90" viewBox="0 0 40 40">
          {/* background ring */}
          <circle
            cx="20"
            cy="20"
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="2"
          />
          {/* progress ring */}
          <circle
            cx="20"
            cy="20"
            r={radius}
            fill="none"
            stroke={count === 11 ? "#00FF94" : "#FFB300"}
            strokeWidth="2"
            strokeDasharray={circumference}
            strokeDashoffset={dashOffset}
            strokeLinecap="square"
            style={{ transition: "stroke-dashoffset 0.5s ease" }}
          />
        </svg>
        {/* center text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-mono text-[9px] font-bold tabular-nums" style={{ color: count === 11 ? "#00FF94" : "#FFB300" }}>
            {count}/11
          </span>
        </div>
      </div>
      <div className="flex flex-col">
        <span className="font-mono text-[8px] uppercase tracking-[0.2em] text-muted-foreground">
          MAPPED
        </span>
        <span className="font-mono text-[8px] uppercase tracking-[0.18em]" style={{ color: count === 11 ? "#00FF94" : "#FFB300" }}>
          {count === 11 ? "PERFECT" : `${pct}%`}
        </span>
      </div>
    </div>

    {/* Celebration overlay when all 11 visited */}
    {celebrating && (
      <SigmaCelebration onComplete={() => setCelebrating(false)} />
    )}
    </>
  );
}
