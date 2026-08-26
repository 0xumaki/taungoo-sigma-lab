"use client";

import * as React from "react";
import { useSigmaStore } from "@/lib/sigma/store";
import { getSection } from "@/lib/sigma/sections";
import { toast } from "sonner";
import { Share2, Link2 } from "lucide-react";

/**
 * SigmaShare — a share button that copies the current sector's deep-link URL
 * to the clipboard. Shows a toast on success.
 */
export function SigmaShare() {
  const { view } = useSigmaStore();
  const [copied, setCopied] = React.useState(false);

  const share = async () => {
    const meta = getSection(view);
    const url =
      view === "map"
        ? window.location.origin
        : `${window.location.origin}/?s=${meta.shortCode}`;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      toast.success(`▮ DEEP-LINK COPIED: ${meta.shortCode}`, {
        description: url,
      });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
      const ta = document.createElement("textarea");
      ta.value = url;
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand("copy");
        toast.success(`▮ DEEP-LINK COPIED: ${meta.shortCode}`);
      } catch {
        toast.error("COPY FAILED — manual copy required");
      }
      document.body.removeChild(ta);
    }
  };

  return (
    <button
      onClick={share}
      className="fixed left-9 bottom-9 z-[78] hidden items-center gap-1.5 border border-border bg-background/80 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground backdrop-blur-sm transition-colors hover:border-foreground/40 hover:text-foreground md:flex"
      data-cursor="hover"
    >
      {copied ? (
        <>
          <Link2 className="h-3 w-3 text-[#00FF94]" />
          <span className="text-[#00FF94]">COPIED</span>
        </>
      ) : (
        <>
          <Share2 className="h-3 w-3" />
          SHARE
        </>
      )}
    </button>
  );
}
