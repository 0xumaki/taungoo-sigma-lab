"use client";

import * as React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useSigmaStore } from "@/lib/sigma/store";
import { getSection, nextSection, prevSection, type SectionId } from "@/lib/sigma/sections";
import { SigmaHud } from "./shared/SigmaHud";
import { SigmaCursor } from "./shared/SigmaCursor";
import { SigmaBoot } from "./shared/SigmaBoot";
import { SigmaCommand } from "./shared/SigmaCommand";
import { SigmaMap } from "./SigmaMap";
import { S01Initializing } from "./sections/S01Initializing";
import { S02Manifesto } from "./sections/S02Manifesto";
import { S03CoreSystems } from "./sections/S03CoreSystems";
import { S04Projects } from "./sections/S04Projects";
import { S05Collective } from "./sections/S05Collective";
import { S06Research } from "./sections/S06Research";
import { S07DataStreams } from "./sections/S07DataStreams";
import { S08Capabilities } from "./sections/S08Capabilities";
import { S09Alliances } from "./sections/S09Alliances";
import { S10Access } from "./sections/S10Access";
import { S11Status } from "./sections/S11Status";

gsap.registerPlugin(useGSAP);

const PANEL_COUNT = 8;

function renderView(view: SectionId) {
  switch (view) {
    case "map":
      return <SigmaMap />;
    case "s01":
      return <S01Initializing />;
    case "s02":
      return <S02Manifesto />;
    case "s03":
      return <S03CoreSystems />;
    case "s04":
      return <S04Projects />;
    case "s05":
      return <S05Collective />;
    case "s06":
      return <S06Research />;
    case "s07":
      return <S07DataStreams />;
    case "s08":
      return <S08Capabilities />;
    case "s09":
      return <S09Alliances />;
    case "s10":
      return <S10Access />;
    case "s11":
      return <S11Status />;
    default:
      return <SigmaMap />;
  }
}

export function ExperienceShell() {
  const { view, phase, navigate, setPhase, visitToken } = useSigmaStore();
  const [renderedView, setRenderedView] = React.useState<SectionId>(view);
  const [flashAccent, setFlashAccent] = React.useState<string>("#FFFFFF");
  const [booting, setBooting] = React.useState(false);
  const [cmdOpen, setCmdOpen] = React.useState(false);

  // Deep-link support: ?s=01..11 boots directly to a sector (used for screenshots + sharing)
  // Also: skip boot screen if a deep-link is present, or if already booted this session
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const s = params.get("s");
    if (s) {
      const id = `s${s.padStart(2, "0")}` as SectionId;
      useSigmaStore.getState().boot(id);
      setRenderedView(id);
      return; // deep-links skip the boot screen
    }
    // show boot screen only once per session
    const seen = sessionStorage.getItem("sigma_booted");
    if (!seen) {
      setBooting(true);
    }
  }, []);

  const handleBootDone = React.useCallback(() => {
    sessionStorage.setItem("sigma_booted", "1");
    setBooting(false);
  }, []);

  // Command palette: Cmd/Ctrl+K to open, also '/' as a secondary trigger
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCmdOpen((o) => !o);
      } else if (e.key === "/" && !cmdOpen) {
        // only trigger '/' when not already typing in an input
        const t = e.target as HTMLElement;
        if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
        e.preventDefault();
        setCmdOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [cmdOpen]);

  const panelsRef = React.useRef<(HTMLDivElement | null)[]>([]);
  const overlayRef = React.useRef<HTMLDivElement>(null);
  const flashRef = React.useRef<HTMLDivElement>(null);
  const labelRef = React.useRef<HTMLDivElement>(null);
  const rootRef = React.useRef<HTMLDivElement>(null);

  // Keyboard navigation
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (useSigmaStore.getState().phase !== "idle") return;
      const cur = useSigmaStore.getState().view;
      if (e.key === "Escape") {
        if (cur !== "map") navigate("map");
      } else if (e.key === "m" || e.key === "M") {
        if (cur !== "map") navigate("map");
      } else if (e.key === "ArrowRight") {
        navigate(nextSection(cur));
      } else if (e.key === "ArrowLeft") {
        navigate(prevSection(cur));
      } else if (e.key >= "0" && e.key <= "9") {
        const n = parseInt(e.key, 10);
        const target =
          n === 0 ? "map" : (`s${String(n).padStart(2, "0")}` as SectionId);
        if (target !== cur) navigate(target);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate]);

  // Safety: if phase stays "covering" for >4s (e.g. GSAP interrupted), force-reset to idle
  React.useEffect(() => {
    if (phase !== "covering") return;
    const t = setTimeout(() => {
      if (useSigmaStore.getState().phase === "covering") {
        setPhase("idle");
      }
    }, 4000);
    return () => clearTimeout(t);
  }, [phase, setPhase]);

  // Run transition timeline on phase change
  useGSAP(
    () => {
      if (phase !== "covering") return;
      const dest = useSigmaStore.getState().view;
      const destMeta = getSection(dest);
      setFlashAccent(destMeta.accent);

      const tl = gsap.timeline({
        onComplete: () => setPhase("idle"),
        onReverseComplete: () => setPhase("idle"),
      });

      // 1. COVER — panels slam down, staggered from top
      tl.set(panelsRef.current, {
        scaleY: 0,
        transformOrigin: "top",
        backgroundColor: destMeta.accent,
      });
      tl.set(overlayRef.current, { pointerEvents: "auto", zIndex: 90 });
      tl.to(panelsRef.current, {
        scaleY: 1,
        duration: 0.42,
        ease: "power3.in",
        stagger: { each: 0.04, from: "start" },
      });

      // 2. MIDPOINT — swap the rendered view + flash + label fly-through
      tl.call(
        () => {
          setRenderedView(dest);
          // flash
          gsap.fromTo(
            flashRef.current,
            { opacity: 1 },
            { opacity: 0, duration: 0.5, ease: "power2.out" }
          );
        },
        [],
        ">-0.05"
      );

      // sector label flies through
      tl.set(
        labelRef.current,
        { opacity: 0, x: -120 },
        "<"
      );
      tl.to(
        labelRef.current,
        {
          opacity: 1,
          x: 0,
          duration: 0.28,
          ease: "power3.out",
        },
        "<"
      );
      tl.to(
        labelRef.current,
        {
          opacity: 0,
          x: 120,
          duration: 0.28,
          ease: "power3.in",
        },
        ">+0.04"
      );

      // 3. REVEAL — panels retract from bottom, staggered
      tl.set(panelsRef.current, {
        transformOrigin: "bottom",
      });
      tl.to(panelsRef.current, {
        scaleY: 0,
        duration: 0.46,
        ease: "power3.out",
        stagger: { each: 0.035, from: "start" },
        clearProps: "transform,backgroundColor",
      });

      tl.set(overlayRef.current, { pointerEvents: "none" });
      tl.set(labelRef.current, { clearProps: "opacity,transform" });
    },
    { dependencies: [phase], scope: rootRef }
  );

  const meta = getSection(renderedView);

  return (
    <div
      ref={rootRef}
      className="sigma-noise sigma-vignette relative fixed inset-0 overflow-hidden bg-background"
    >
      {/* Persistent layered background */}
      <div className="sigma-grid pointer-events-none absolute inset-0 opacity-60" />

      {/* Rendered view (keyed so it remounts + re-runs its intro animation each visit) */}
      <div
        key={`${renderedView}-${visitToken}`}
        className="absolute inset-0"
        style={{ paddingTop: 32, paddingLeft: 32, paddingRight: 32, paddingBottom: 28 }}
      >
        <div className="relative h-full w-full">{renderView(renderedView)}</div>
      </div>

      {/* Accent ambient glow keyed to the current sector */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-700"
        style={{
          background: `radial-gradient(60% 50% at 50% 50%, ${meta.accent}14, transparent 70%)`,
        }}
      />

      {/* TRANSITION OVERLAY */}
      <div
        ref={overlayRef}
        className="pointer-events-none absolute inset-0 z-[90]"
      >
        {/* horizontal slam panels */}
        <div className="absolute inset-0 flex flex-col">
          {Array.from({ length: PANEL_COUNT }).map((_, i) => (
            <div
              key={i}
              ref={(el) => {
                panelsRef.current[i] = el;
              }}
              className="flex-1"
              style={{
                transform: "scaleY(0)",
                backgroundColor: flashAccent,
                borderBottom: i < PANEL_COUNT - 1 ? "1px solid rgba(0,0,0,0.25)" : "none",
              }}
            />
          ))}
        </div>

        {/* glitch flash */}
        <div
          ref={flashRef}
          className="absolute inset-0 mix-blend-screen"
          style={{ background: flashAccent, opacity: 0 }}
        />

        {/* sector label fly-through */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            ref={labelRef}
            className="font-mono text-[11vw] font-black leading-none text-black/85"
            style={{ opacity: 0, mixBlendMode: "overlay" }}
          >
            {meta.shortCode}
          </div>
        </div>

        {/* hazard edge during transition */}
        <div className="sigma-hazard-orange absolute inset-x-0 top-0 h-2 opacity-0" />
      </div>

      {/* Persistent HUD */}
      <SigmaHud />

      {/* Custom cursor reticle (desktop only) */}
      <SigmaCursor />

      {/* Command palette (Cmd/Ctrl+K or /) */}
      <SigmaCommand open={cmdOpen} onClose={() => setCmdOpen(false)} />

      {/* Boot screen (first visit only) */}
      {booting && <SigmaBoot onDone={handleBootDone} />}

      {/* Cmd+K hint badge (bottom-right, above HUD) */}
      {!cmdOpen && !booting && (
        <button
          onClick={() => setCmdOpen(true)}
          className="fixed bottom-9 right-9 z-[80] hidden items-center gap-1.5 border border-border bg-background/80 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground backdrop-blur-sm transition-colors hover:border-foreground/40 hover:text-foreground md:flex"
          data-cursor="hover"
        >
          <kbd className="text-foreground">⌘K</kbd>
          JUMP TO SECTOR
        </button>
      )}
    </div>
  );
}
