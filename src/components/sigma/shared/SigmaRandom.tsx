"use client";

import * as React from "react";
import { SECTIONS } from "@/lib/sigma/sections";
import { useSigmaStore } from "@/lib/sigma/store";
import { sigmaSound } from "@/lib/sigma/sound";
import { Shuffle } from "lucide-react";
import { toast } from "sonner";

/**
 * SigmaRandom — a [R] key shortcut + button that navigates to a random sector.
 * Never navigates to the current sector. Shows a toast with the destination.
 */
export function SigmaRandom() {
  const { view, navigate, phase } = useSigmaStore();

  const goRandom = React.useCallback(() => {
    if (phase !== "idle") return;
    const candidates = SECTIONS.filter((s) => s.id !== view);
    const pick = candidates[Math.floor(Math.random() * candidates.length)];
    sigmaSound.play("transition");
    toast.success(`▮ RANDOM JACK-IN → SECTOR ${pick.shortCode}`, {
      description: `${pick.name} · ${pick.role}`,
    });
    navigate(pick.id);
  }, [view, navigate, phase]);

  // [R] keyboard shortcut
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "r" || e.key === "R") {
        const t = e.target as HTMLElement;
        if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
        e.preventDefault();
        goRandom();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goRandom]);

  return (
    <button
      onClick={goRandom}
      className="fixed bottom-9 left-9 z-[78] hidden items-center gap-1.5 border border-border bg-background/80 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground backdrop-blur-sm transition-colors hover:border-[#FF2D7E]/40 hover:text-foreground md:flex"
      data-cursor="hover"
      title="Random sector [R]"
    >
      <Shuffle className="h-3 w-3 text-[#FF2D7E]" />
      RANDOM
    </button>
  );
}
