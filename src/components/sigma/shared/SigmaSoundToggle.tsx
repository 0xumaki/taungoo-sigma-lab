"use client";

import * as React from "react";
import { useSigmaSound } from "@/lib/sigma/sound";
import { Volume2, VolumeX } from "lucide-react";

/**
 * SigmaSoundToggle — a fixed button (top-right of HUD) that toggles the UI sound system.
 * On first click, initializes the AudioContext (required by browser autoplay policies).
 */
export function SigmaSoundToggle() {
  const { enabled, toggle } = useSigmaSound();

  return (
    <button
      onClick={toggle}
      className="fixed right-9 top-9 z-[79] flex items-center gap-1.5 border border-border bg-background/80 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground backdrop-blur-sm transition-colors hover:border-foreground/40 hover:text-foreground"
      data-cursor="hover"
      aria-label={enabled ? "Mute UI sounds" : "Enable UI sounds"}
      title={enabled ? "SOUND ON — click to mute" : "SOUND OFF — click to enable"}
    >
      {enabled ? (
        <>
          <Volume2 className="h-3 w-3 text-[#00FF94]" />
          <span className="text-[#00FF94]">SFX</span>
        </>
      ) : (
        <>
          <VolumeX className="h-3 w-3" />
          <span>SFX</span>
        </>
      )}
    </button>
  );
}
