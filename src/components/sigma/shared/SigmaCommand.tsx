"use client";

import * as React from "react";
import gsap from "gsap";
import { SECTIONS } from "@/lib/sigma/sections";
import { useSigmaStore } from "@/lib/sigma/store";
import { cn } from "@/lib/utils";
import { Search, CornerDownLeft, ArrowUp, ArrowDown } from "lucide-react";

/**
 * SigmaCommand — a Cmd/Ctrl+K command palette for quick sector jumping.
 * Fuzzy-filters the 11 sectors + map. Enter to navigate, Esc to close,
 * arrow keys to move selection.
 */
export function SigmaCommand({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { navigate, phase } = useSigmaStore();
  const rootRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [query, setQuery] = React.useState("");
  const [active, setActive] = React.useState(0);

  const results = React.useMemo(() => {
    const q = query.trim().toLowerCase();
    const all = [
      {
        id: "map" as const,
        shortCode: "00",
        code: "NEX",
        name: "NEXUS MAP",
        role: "Navigation Hub",
        accent: "#FFFFFF",
        glyph: "✦",
      },
      ...SECTIONS,
    ];
    if (!q) return all;
    // substring match across code/name/role/shortCode (case-insensitive)
    return all.filter((s) => {
      const hay = `${s.shortCode} ${s.code} ${s.name} ${s.role}`.toLowerCase();
      return hay.includes(q);
    });
  }, [query]);

  React.useEffect(() => {
    if (open) {
      setQuery("");
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setActive((a) => Math.min(results.length - 1, a + 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActive((a) => Math.max(0, a - 1));
      } else if (e.key === "Enter") {
        e.preventDefault();
        const sel = results[active];
        if (sel && phase === "idle") {
          navigate(sel.id as "map" | "s01");
          onClose();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, results, active, navigate, onClose, phase]);

  React.useEffect(() => {
    if (!open) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-cmd-backdrop]",
        { opacity: 0 },
        { opacity: 1, duration: 0.2, ease: "power2.out" }
      );
      gsap.fromTo(
        "[data-cmd-panel]",
        { opacity: 0, y: -20, scale: 0.96 },
        { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: "power3.out" }
      );
      gsap.from("[data-cmd-row]", {
        opacity: 0,
        x: -10,
        duration: 0.25,
        ease: "power2.out",
        stagger: 0.03,
      });
    }, rootRef);
    return () => ctx.revert();
  }, [open]);

  if (!open) return null;

  return (
    <div ref={rootRef} className="fixed inset-0 z-[110] flex items-start justify-center pt-[15vh]">
      <div
        data-cmd-backdrop
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        data-cmd-panel
        className="sigma-scanlines relative w-full max-w-xl border border-border bg-card shadow-[0_24px_80px_-12px_rgba(0,0,0,0.9)]"
      >
        {/* header / input */}
        <div className="flex items-center gap-3 border-b border-border px-4 py-3">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            placeholder="Jump to sector… (e.g. 04, vault, team)"
            className="flex-1 bg-transparent font-mono text-sm text-foreground outline-none placeholder:text-muted-foreground/60"
          />
          <kbd className="border border-border px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.15em] text-muted-foreground">
            ESC
          </kbd>
        </div>

        {/* results */}
        <div className="sigma-scroll-hidden max-h-[50vh] overflow-y-auto py-1">
          {results.length === 0 && (
            <div className="px-4 py-6 text-center font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
              ▮ no sectors match
            </div>
          )}
          {results.map((s, i) => (
            <button
              key={s.id}
              data-cmd-row
              onMouseEnter={() => setActive(i)}
              onClick={() => {
                if (phase === "idle") {
                  navigate(s.id as "map" | "s01");
                  onClose();
                }
              }}
              className={cn(
                "flex w-full items-center gap-3 px-4 py-2.5 text-left transition-colors",
                i === active ? "bg-foreground/10" : "hover:bg-foreground/[0.04]"
              )}
            >
              <span
                className="flex h-8 w-8 shrink-0 items-center justify-center border font-mono text-sm font-bold"
                style={{ borderColor: `${s.accent}66`, color: s.accent }}
              >
                {s.shortCode}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-sans text-sm font-bold uppercase tracking-tight">
                    {s.name}
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">
                    {s.code}
                  </span>
                </div>
                <div className="truncate font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                  {s.role}
                </div>
              </div>
              {i === active && (
                <CornerDownLeft className="h-3.5 w-3.5 text-foreground" />
              )}
            </button>
          ))}
        </div>

        {/* footer */}
        <div className="flex items-center justify-between border-t border-border px-4 py-2 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <ArrowUp className="h-3 w-3" />
            <ArrowDown className="h-3 w-3" /> navigate
          </span>
          <span className="flex items-center gap-1.5">
            <CornerDownLeft className="h-3 w-3" /> jack in
          </span>
          <span>{results.length} sectors</span>
        </div>
      </div>
    </div>
  );
}
