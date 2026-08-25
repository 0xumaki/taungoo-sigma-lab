"use client";

import * as React from "react";
import { useSigmaStore } from "@/lib/sigma/store";
import { sigmaSound } from "@/lib/sigma/sound";
import { toast } from "sonner";
import { Share2, Link2, Shuffle, Zap, Play, Pause, Square, Search } from "lucide-react";

/**
 * SigmaToolbar — a unified bottom-right toolbar holding all action buttons
 * in a single non-overlapping row: SHARE, RANDOM, MC MODE, TOUR, ⌘K.
 * Replaces the individual fixed-position buttons that were overlapping.
 */
export function SigmaToolbar({
  onCmdOpen,
  mcActive,
  onMCToggle,
  tourActive,
  tourPaused,
  onTourStart,
  onTourPause,
  onTourStop,
}: {
  onCmdOpen: () => void;
  mcActive: boolean;
  onMCToggle: () => void;
  tourActive: boolean;
  tourPaused: boolean;
  onTourStart: () => void;
  onTourPause: () => void;
  onTourStop: () => void;
}) {
  const { view } = useSigmaStore();
  const [copied, setCopied] = React.useState(false);

  const share = async () => {
    const url = view === "map"
      ? window.location.origin
      : `${window.location.origin}/?s=${view.slice(1)}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      sigmaSound.play("click");
      toast.success("▮ DEEP-LINK COPIED", { description: url });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("COPY FAILED");
    }
  };

  const random = () => {
    sigmaSound.play("transition");
    toast.success("▮ RANDOM JACK-IN");
    // delegate to keyboard event
    window.dispatchEvent(new KeyboardEvent("keydown", { key: "r" }));
  };

  return (
    <div className="fixed bottom-9 right-9 z-[80] hidden items-center gap-1 md:flex">
      {/* SHARE */}
      <button
        onClick={share}
        className="flex items-center gap-1.5 border border-border bg-background/80 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground backdrop-blur-sm transition-colors hover:border-foreground/40 hover:text-foreground"
        data-cursor="hover"
        title="Share deep-link"
      >
        {copied ? <Link2 className="h-3 w-3 text-[#00FF94]" /> : <Share2 className="h-3 w-3" />}
        <span className={copied ? "text-[#00FF94]" : ""}>{copied ? "COPIED" : "SHARE"}</span>
      </button>

      {/* RANDOM */}
      <button
        onClick={random}
        className="flex items-center gap-1.5 border border-border bg-background/80 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground backdrop-blur-sm transition-colors hover:border-[#FF2D7E]/40 hover:text-foreground"
        data-cursor="hover"
        title="Random sector [R]"
      >
        <Shuffle className="h-3 w-3 text-[#FF2D7E]" />
        <span>RAND</span>
      </button>

      {/* MC MODE */}
      <button
        onClick={onMCToggle}
        className="flex items-center gap-1.5 border px-2 py-1 font-mono text-[9px] uppercase tracking-[0.18em] backdrop-blur-sm transition-all"
        data-cursor="hover"
        title="MC MODE [C] — Matrix + Glitch + Music"
        style={mcActive
          ? { borderColor: "#FF2D7E", background: "#FF2D7E", color: "#000" }
          : { borderColor: "var(--border)", background: "rgba(0,0,0,0.8)", color: "#FF2D7E" }
        }
      >
        <Zap className="h-3 w-3" style={{ color: mcActive ? "#000" : "#FF2D7E" }} />
        {mcActive ? "MC ON" : "MC"}
      </button>

      {/* TOUR */}
      {tourActive ? (
        <>
          <button
            onClick={onTourPause}
            className="flex items-center gap-1.5 border border-border bg-background/80 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.18em] backdrop-blur-sm transition-colors hover:bg-foreground/10"
            data-cursor="hover"
            title={tourPaused ? "Resume [T]" : "Pause [T]"}
          >
            {tourPaused ? <Play className="h-3 w-3 text-[#00FF94]" /> : <Pause className="h-3 w-3 text-[#FFB300]" />}
            <span>{tourPaused ? "PLAY" : "PAUSE"}</span>
          </button>
          <button
            onClick={onTourStop}
            className="flex items-center gap-1.5 border border-border bg-background/80 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.18em] backdrop-blur-sm transition-colors hover:bg-[#FF3D3D]/20"
            data-cursor="hover"
            title="Stop tour"
          >
            <Square className="h-3 w-3 text-[#FF3D3D]" />
          </button>
        </>
      ) : (
        <button
          onClick={onTourStart}
          className="flex items-center gap-1.5 border border-border bg-background/80 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground backdrop-blur-sm transition-colors hover:border-[#00FF94]/40 hover:text-foreground"
          data-cursor="hover"
          title="Start tour [T]"
        >
          <Play className="h-3 w-3 text-[#00FF94]" />
          <span>TOUR</span>
        </button>
      )}

      {/* ⌘K */}
      <button
        onClick={onCmdOpen}
        className="flex items-center gap-1.5 border border-border bg-background/80 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground backdrop-blur-sm transition-colors hover:border-foreground/40 hover:text-foreground"
        data-cursor="hover"
        title="Command palette [⌘K]"
      >
        <Search className="h-3 w-3" />
        <kbd className="text-foreground">⌘K</kbd>
      </button>
    </div>
  );
}
