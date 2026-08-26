"use client";

import * as React from "react";
import gsap from "gsap";
import { useSigmaStore } from "@/lib/sigma/store";
import { sigmaSound } from "@/lib/sigma/sound";
import { toast } from "sonner";
import { ArrowRight, X, MousePointer, Keyboard, Map as MapIcon } from "lucide-react";

const STEPS = [
  {
    icon: MapIcon,
    title: "WELCOME TO THE NEXUS",
    body: "This is the Nexus Map — 11 sectors of the Taungoo Sigma Lab. There is no nav bar, no scroll. You navigate only through this map, like choosing a level in a video game.",
    accent: "#FFFFFF",
  },
  {
    icon: MousePointer,
    title: "CLICK TO JACK IN",
    body: "Click any sector card to enter it. Each card shows a real screenshot of the sector. Hover to scan. Click to transition with a full-page panel animation.",
    accent: "#FF4500",
  },
  {
    icon: Keyboard,
    title: "KEYBOARD SHORTCUTS",
    body: "Use [←] [→] to move between sectors, [0-9] to jump, [M] or [ESC] to return to the map. Press [⌘K] for the command palette, [T] for tour mode, [H] for help.",
    accent: "#00E5FF",
  },
  {
    icon: ArrowRight,
    title: "EXPLORE FREELY",
    body: "Each sector is an absolute environment — no scroll, no chrome, only signal. The portfolio (Sector 04) has real screenshots from GitHub. Sector 07 has live data streams. Press [H] anytime for the full reference.",
    accent: "#C6FF00",
  },
];

/**
 * SigmaOnboarding — a first-visit guided tour overlay.
 * Shows 4 steps explaining the navigation system.
 * Only appears once per browser (gated by localStorage).
 */
export function SigmaOnboarding({ onDone }: { onDone: () => void }) {
  const { navigate } = useSigmaStore();
  const [step, setStep] = React.useState(0);
  const rootRef = React.useRef<HTMLDivElement>(null);

  const next = React.useCallback(() => {
    sigmaSound.play("click");
    if (step < STEPS.length - 1) {
      setStep((s) => s + 1);
    } else {
      try {
        localStorage.setItem("sigma_onboarded", "1");
      } catch {
        // ignore
      }
      onDone();
    }
  }, [step, onDone]);

  const skip = React.useCallback(() => {
    sigmaSound.play("close");
    try {
      localStorage.setItem("sigma_onboarded", "1");
    } catch {
      // ignore
    }
    onDone();
  }, [onDone]);

  // GSAP intro
  React.useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-onboard-backdrop]",
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: "power2.out" }
      );
      gsap.fromTo(
        "[data-onboard-panel]",
        { opacity: 0, scale: 0.94, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: "power3.out" }
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  // animate step changes
  React.useEffect(() => {
    gsap.fromTo(
      "[data-onboard-step]",
      { opacity: 0, x: 30 },
      { opacity: 1, x: 0, duration: 0.3, ease: "power3.out" }
    );
  }, [step]);

  const current = STEPS[step];

  return (
    <div ref={rootRef} className="fixed inset-0 z-[125] flex items-center justify-center">
      <div
        data-onboard-backdrop
        className="absolute inset-0 bg-background/90 backdrop-blur-md"
        onClick={skip}
      />
      <div
        data-onboard-panel
        className="sigma-scanlines relative w-full max-w-lg border border-border bg-card shadow-[0_24px_80px_-12px_rgba(0,0,0,0.95)]"
      >
        {/* header */}
        <div className="flex items-center justify-between border-b border-border px-4 py-2.5">
          <div className="flex items-center gap-2">
            <span className="sigma-pulse h-1.5 w-1.5" style={{ background: current.accent }} />
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              ONBOARDING · STEP {step + 1} / {STEPS.length}
            </span>
          </div>
          <button
            onClick={skip}
            className="border border-border px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:bg-foreground/10"
            data-cursor="hover"
          >
            <X className="h-3 w-3" /> SKIP
          </button>
        </div>

        {/* step content */}
        <div data-onboard-step className="flex flex-col items-center p-8 text-center">
          <div
            className="sigma-spin-slow mb-4 flex h-16 w-16 items-center justify-center border font-mono text-2xl"
            style={{ borderColor: `${current.accent}55`, color: current.accent }}
          >
            <current.icon className="h-7 w-7" />
          </div>
          <h2 className="font-sans text-2xl font-black uppercase tracking-tight" style={{ color: current.accent }}>
            {current.title}
          </h2>
          <p className="mt-3 max-w-sm font-serif text-sm italic leading-relaxed text-foreground/80">
            {current.body}
          </p>
        </div>

        {/* progress dots */}
        <div className="flex items-center justify-center gap-1.5 pb-4">
          {STEPS.map((s, i) => (
            <span
              key={i}
              className="h-1.5 transition-all"
              style={{
                width: i === step ? 24 : 6,
                background: i === step ? s.accent : i < step ? `${s.accent}66` : "rgba(255,255,255,0.15)",
              }}
            />
          ))}
        </div>

        {/* footer */}
        <div className="flex items-center justify-between border-t border-border px-4 py-2.5">
          <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
            ▮ TAUNGOO SIGMA LAB
          </span>
          <button
            onClick={next}
            className="flex items-center gap-2 border px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] transition-colors"
            style={{
              borderColor: current.accent,
              background: current.accent,
              color: "#000",
            }}
            data-cursor="hover"
          >
            {step < STEPS.length - 1 ? "NEXT" : "ENTER THE MAP"}
            <ArrowRight className="h-3 w-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
