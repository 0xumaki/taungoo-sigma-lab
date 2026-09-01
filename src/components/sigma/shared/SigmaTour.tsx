"use client";

import * as React from "react";
import { SECTIONS, type SectionId } from "@/lib/sigma/sections";
import { useSigmaStore } from "@/lib/sigma/store";
import { sigmaSound } from "@/lib/sigma/sound";
import { Play, Pause, Square } from "lucide-react";
import { toast } from "sonner";

/**
 * SigmaTour — auto-play tour mode that cycles through all 11 sectors.
 * Each sector displays for 6 seconds before advancing. Pause/resume/stop controls.
 * Shows a progress bar + current sector indicator at the bottom of the screen.
 */
export function SigmaTour() {
  const { view, phase, navigate } = useSigmaStore();
  const [touring, setTouring] = React.useState(false);
  const [paused, setPaused] = React.useState(false);
  const [tourIndex, setTourIndex] = React.useState(0);
  const [elapsed, setElapsed] = React.useState(0);

  const SECTOR_DURATION = 6000; // 6s per sector

  // tour loop
  React.useEffect(() => {
    if (!touring || paused) return;
    if (phase !== "idle") return;

    const startTs = Date.now();
    const interval = setInterval(() => {
      const e = Date.now() - startTs;
      setElapsed(e);
      if (e >= SECTOR_DURATION) {
        clearInterval(interval);
        // advance to next sector
        setTourIndex((idx) => {
          const next = (idx + 1) % SECTIONS.length;
          const target = SECTIONS[next].id;
          navigate(target);
          sigmaSound.play("transition");
          if (next === 0) {
            // completed a full cycle
            toast.success("▮ TOUR COMPLETE — cycling back to sector 01");
          }
          return next;
        });
      }
    }, 100);

    return () => clearInterval(interval);
  }, [touring, paused, phase, navigate]);

  // start tour from current sector
  const startTour = () => {
    const curIdx = SECTIONS.findIndex((s) => s.id === view);
    const startIdx = curIdx >= 0 ? curIdx : 0;
    setTourIndex(startIdx);
    setElapsed(0);
    setPaused(false);
    setTouring(true);
    sigmaSound.play("open");
    toast.success("▮ TOUR MODE ENGAGED", {
      description: "Auto-cycling through 11 sectors. Press [T] to pause.",
    });
  };

  const stopTour = () => {
    setTouring(false);
    setPaused(false);
    setElapsed(0);
    sigmaSound.play("close");
    toast("▮ TOUR STOPPED");
  };

  const togglePause = () => {
    setPaused((p) => {
      sigmaSound.play(p ? "open" : "close");
      return !p;
    });
  };

  // keyboard shortcut: [T] to toggle tour
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "t" || e.key === "T") {
        e.preventDefault();
        if (touring) {
          togglePause();
        } else {
          startTour();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [touring]);

  if (!touring) {
    return (
      <button
        onClick={startTour}
        className="fixed bottom-9 right-32 z-[78] hidden items-center gap-1.5 border border-border bg-background/80 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground backdrop-blur-sm transition-colors hover:border-[#00FF94]/40 hover:text-foreground md:flex"
        data-cursor="hover"
        title="Start auto-tour [T]"
      >
        <Play className="h-3 w-3 text-[#00FF94]" />
        TOUR
      </button>
    );
  }

  const currentSector = SECTIONS[tourIndex];
  const progress = Math.min(100, (elapsed / SECTOR_DURATION) * 100);

  return (
    <div className="fixed bottom-9 right-32 z-[85] flex items-center gap-2 border border-border bg-background/95 px-3 py-2 backdrop-blur-sm">
      {/* current sector */}
      <div className="flex items-center gap-2">
        <span
          className="font-mono text-sm font-black"
          style={{ color: currentSector.accent }}
        >
          {currentSector.shortCode}
        </span>
        <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-foreground">
          {currentSector.name}
        </span>
      </div>

      {/* progress bar */}
      <div className="h-1 w-24 bg-foreground/15">
        <div
          className="h-full transition-all duration-100"
          style={{ width: `${progress}%`, background: currentSector.accent }}
        />
      </div>

      {/* sector dots */}
      <div className="hidden items-center gap-0.5 lg:flex">
        {SECTIONS.map((s, i) => (
          <span
            key={s.id}
            className="h-1 w-1 transition-all"
            style={{
              background: i === tourIndex ? s.accent : i < tourIndex ? s.accent + "66" : "rgba(255,255,255,0.15)",
              width: i === tourIndex ? 8 : 4,
            }}
          />
        ))}
      </div>

      {/* controls */}
      <button
        onClick={togglePause}
        className="border border-border p-1 transition-colors hover:bg-foreground/10"
        data-cursor="hover"
        title={paused ? "Resume [T]" : "Pause [T]"}
      >
        {paused ? <Play className="h-3 w-3 text-[#00FF94]" /> : <Pause className="h-3 w-3 text-[#FFB300]" />}
      </button>
      <button
        onClick={stopTour}
        className="border border-border p-1 transition-colors hover:bg-[#B85C2E]/20"
        data-cursor="hover"
        title="Stop tour"
      >
        <Square className="h-3 w-3 text-[#B85C2E]" />
      </button>
    </div>
  );
}
