"use client";

import * as React from "react";
import gsap from "gsap";
import { useSigmaStore } from "@/lib/sigma/store";
import { getSection, nextSection, prevSection, SECTIONS, type SectionId } from "@/lib/sigma/sections";
import { SigmaHud } from "./shared/SigmaHud";
import { SigmaCursor } from "./shared/SigmaCursor";
import { SigmaSpotlight } from "./shared/SigmaSpotlight";
import { SigmaOnboarding } from "./shared/SigmaOnboarding";
import { SigmaBoot } from "./shared/SigmaBoot";
import { SigmaCommand } from "./shared/SigmaCommand";
import { SigmaProgress } from "./shared/SigmaProgress";
import { SigmaKonami } from "./shared/SigmaKonami";
import { SigmaSoundToggle } from "./shared/SigmaSoundToggle";
import { SigmaHelp } from "./shared/SigmaHelp";
import { SigmaBreadcrumb } from "./shared/SigmaBreadcrumb";
import { SigmaThemeToggle } from "./shared/SigmaThemeToggle";
import { SigmaCompletion } from "./shared/SigmaCompletion";
import { SigmaMCController } from "./shared/SigmaMCController";
import { SigmaToolbar } from "./shared/SigmaToolbar";
import { SigmaModeSwitcher } from "./shared/SigmaModeSwitcher";
import { AlphaInterface } from "./alpha/AlphaInterface";
import { sigmaSound } from "@/lib/sigma/sound";
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
  const [onboarding, setOnboarding] = React.useState(false);
  const [cmdOpen, setCmdOpen] = React.useState(false);
  const [mcActive, setMcActive] = React.useState(false);
  const [tourActive, setTourActive] = React.useState(false);
  const [tourPaused, setTourPaused] = React.useState(false);
  const [tourIndex, setTourIndex] = React.useState(0);
  const [mode, setMode] = React.useState<"sigma" | "alpha">("sigma");

  // Deep-link + boot screen + onboarding logic — single effect, runs once after mount
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const s = params.get("s");
    if (s) {
      const id = `s${s.padStart(2, "0")}` as SectionId;
      // Defer to next tick to avoid hydration race condition
      const t = setTimeout(() => {
        useSigmaStore.getState().boot(id);
        setRenderedView(id);
      }, 0);
      return () => clearTimeout(t); // deep-links skip the boot screen + onboarding
    }
    // show boot screen only once per session
    try {
      const seen = sessionStorage.getItem("sigma_booted");
      if (!seen) {
        setBooting(true);
      }
      // show onboarding only once per browser (localStorage)
      const onboarded = localStorage.getItem("sigma_onboarded");
      if (!onboarded) {
        // delay onboarding until after boot screen
        const ob = setTimeout(() => setOnboarding(true), seen ? 500 : 4000);
        return () => clearTimeout(ob);
      }
    } catch {
      // sessionStorage/localStorage may be unavailable (private mode) — skip
    }
  }, []);

  const handleBootDone = React.useCallback(() => {
    try {
      sessionStorage.setItem("sigma_booted", "1");
    } catch {
      // ignore
    }
    setBooting(false);
  }, []);

  // Safety: if boot screen stays for >6s, force-clear it (prevents stuck blank page)
  React.useEffect(() => {
    if (!booting) return;
    const t = setTimeout(() => {
      setBooting(false);
      try {
        sessionStorage.setItem("sigma_booted", "1");
      } catch {
        // ignore
      }
    }, 6000);
    return () => clearTimeout(t);
  }, [booting]);

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
        if (cur !== "map") { navigate("map"); sigmaSound.play("close"); }
      } else if (e.key === "m" || e.key === "M") {
        if (cur !== "map") { navigate("map"); sigmaSound.play("close"); }
      } else if (e.key === "ArrowRight") {
        navigate(nextSection(cur)); sigmaSound.play("click");
      } else if (e.key === "ArrowLeft") {
        navigate(prevSection(cur)); sigmaSound.play("click");
      } else if (e.key >= "0" && e.key <= "9") {
        const n = parseInt(e.key, 10);
        const target =
          n === 0 ? "map" : (`s${String(n).padStart(2, "0")}` as SectionId);
        if (target !== cur) { navigate(target); sigmaSound.play("click"); }
      } else if (e.key === "-" || e.key === "_") {
        // s10 (the "-" key is next to 0 on the keyboard)
        if (cur !== "s10") { navigate("s10"); sigmaSound.play("click"); }
      } else if (e.key === "=" || e.key === "+") {
        // s11 (the "=" key is next to "-" on the keyboard)
        if (cur !== "s11") { navigate("s11"); sigmaSound.play("click"); }
      } else if (e.key === "c" || e.key === "C") {
        // MC mode toggle
        const t = e.target as HTMLElement;
        if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
        e.preventDefault();
        setMcActive((a) => !a);
      } else if (e.key === "t" || e.key === "T") {
        // Tour toggle
        const t = e.target as HTMLElement;
        if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
        e.preventDefault();
        if (tourActive) {
          setTourPaused((p) => !p);
        } else {
          // start tour from current sector
          const curIdx = SECTIONS.findIndex((s) => s.id === cur);
          setTourIndex(curIdx >= 0 ? curIdx : 0);
          setTourActive(true);
          setTourPaused(false);
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate, tourActive]);

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

  // Tour mode: auto-advance through sectors every 6s
  React.useEffect(() => {
    if (!tourActive || tourPaused) return;
    if (phase !== "idle") return;
    const SECTOR_DURATION = 6000;
    const startTs = Date.now();
    const interval = setInterval(() => {
      if (Date.now() - startTs >= SECTOR_DURATION) {
        setTourIndex((idx) => {
          const next = (idx + 1) % SECTIONS.length;
          navigate(SECTIONS[next].id);
          sigmaSound.play("transition");
          return next;
        });
      }
    }, 500);
    return () => clearInterval(interval);
  }, [tourActive, tourPaused, phase, navigate]);

  // Run transition timeline on phase change — uses useEffect for reliability
  React.useEffect(() => {
    if (phase !== "covering") return;
    const dest = useSigmaStore.getState().view;
    const destMeta = getSection(dest);
    setFlashAccent(destMeta.accent);
    sigmaSound.play("transition");
    // play ambient tone tuned to the destination sector's accent color
    if (dest !== "map") {
      sigmaSound.playAmbient(destMeta.accent);
    }

    // Check for reduced motion preference — if active, skip the animation and just swap
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setRenderedView(dest);
      setPhase("idle");
      return;
    }

    const panels = panelsRef.current.filter(Boolean) as HTMLDivElement[];
    const overlay = overlayRef.current;
    const flash = flashRef.current;
    const label = labelRef.current;

    if (panels.length === 0 || !overlay) {
      // no panels yet — just swap immediately
      setRenderedView(dest);
      setPhase("idle");
      return;
    }

    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      setPhase("idle");
    };

    const tl = gsap.timeline({
      onComplete: finish,
      onReverseComplete: finish,
    });

    // 1. COVER — panels slam down, staggered from top
    tl.set(panels, {
      scaleY: 0,
      transformOrigin: "top",
      backgroundColor: destMeta.accent,
    });
    tl.set(overlay, { pointerEvents: "auto", zIndex: 90 });
    tl.to(panels, {
      scaleY: 1,
      duration: 0.42,
      ease: "power3.in",
      stagger: { each: 0.04, from: "start" },
    });

    // 2. MIDPOINT — swap the rendered view + flash + label fly-through
    tl.call(
      () => {
        setRenderedView(dest);
        if (flash) {
          gsap.fromTo(
            flash,
            { opacity: 1 },
            { opacity: 0, duration: 0.5, ease: "power2.out" }
          );
        }
      },
      [],
      ">-0.05"
    );

    // sector label flies through during slam cover transition (01, 02, etc.)
    if (label) {
      tl.set(label, { opacity: 0, x: -120 }, "<");
      tl.to(
        label,
        { opacity: 1, x: 0, duration: 0.28, ease: "power3.out" },
        "<"
      );
      tl.to(
        label,
        { opacity: 0, x: 120, duration: 0.28, ease: "power3.in" },
        ">+0.04"
      );
    }

    // 3. REVEAL — panels retract from bottom, staggered
    tl.set(panels, { transformOrigin: "bottom" });
    tl.to(panels, {
      scaleY: 0,
      duration: 0.46,
      ease: "power3.out",
      stagger: { each: 0.035, from: "start" },
      clearProps: "transform,backgroundColor",
    });

    tl.set(overlay, { pointerEvents: "none" });
    if (label) tl.set(label, { clearProps: "opacity,transform" });

    // Safety: if timeline doesn't complete in 3s, force-finish
    const safety = setTimeout(() => {
      if (!done) {
        tl.kill();
        setRenderedView(dest);
        finish();
      }
    }, 3000);

    return () => {
      clearTimeout(safety);
    };
  }, [phase, setPhase]);

  const meta = getSection(renderedView);

  return (
    <div
      ref={rootRef}
      suppressHydrationWarning
      className="sigma-noise sigma-vignette relative fixed inset-0 overflow-hidden bg-background"
    >
      {/* Persistent layered background */}
      <div className="sigma-grid pointer-events-none absolute inset-0 opacity-60" />

      {/* Cursor spotlight (desktop only) */}
      <SigmaSpotlight />

      {/* Mode switcher (Σ / Α) */}
      <SigmaModeSwitcher mode={mode} onModeChange={setMode} />

      {/* Rendered view — Sigma mode (map-based) or Alpha mode (scrolling) */}
      {mode === "sigma" ? (
        <div
          key={`${renderedView}-${visitToken}`}
          className="absolute inset-0"
          style={{ paddingTop: 32, paddingLeft: 32, paddingRight: 32, paddingBottom: 28 }}
        >
          <div className="relative h-full w-full">{renderView(renderedView)}</div>
        </div>
      ) : (
        <AlphaInterface />
      )}

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

        {/* sector label fly-through — RESTORED per user request.
            Shows "01"/"02" etc. during the slam cover transition (NOT on the cards themselves). */}
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

      {/* Persistent HUD — Sigma mode only */}
      {mode === "sigma" && <SigmaHud />}

      {/* Custom cursor reticle (desktop only, both modes — X/Y readout attaches to ring to avoid nav clash) */}
      <SigmaCursor />

      {/* Sector progress indicator (right edge, Sigma mode only) */}
      {mode === "sigma" && <SigmaProgress />}

      {/* Sound toggle (top-right, Sigma mode only) */}
      {mode === "sigma" && <SigmaSoundToggle />}

      {/* Theme toggle (below sound toggle, Sigma mode only) */}
      {mode === "sigma" && <SigmaThemeToggle />}

      {/* Sector completion tracker (Sigma mode only) */}
      {mode === "sigma" && <SigmaCompletion />}

      {/* MC mode controller (matrix + glitch + music, both modes) */}
      <SigmaMCController active={mcActive} onToggle={() => setMcActive((a) => !a)} />

      {/* Unified bottom-right toolbar (Sigma mode only) */}
      {mode === "sigma" && !booting && (
        <SigmaToolbar
          onCmdOpen={() => setCmdOpen(true)}
          mcActive={mcActive}
          onMCToggle={() => setMcActive((a) => !a)}
          tourActive={tourActive}
          tourPaused={tourPaused}
          onTourStart={() => {
            const curIdx = SECTIONS.findIndex((s) => s.id === view);
            setTourIndex(curIdx >= 0 ? curIdx : 0);
            setTourActive(true);
            setTourPaused(false);
          }}
          onTourPause={() => setTourPaused((p) => !p)}
          onTourStop={() => { setTourActive(false); setTourPaused(false); }}
        />
      )}

      {/* Visited sectors breadcrumb (top-center, Sigma mode only) */}
      {mode === "sigma" && <SigmaBreadcrumb />}

      {/* Help overlay ([H] key, both modes) */}
      <SigmaHelp />

      {/* Konami code easter egg (both modes) */}
      <SigmaKonami />

      {/* Command palette (Cmd/Ctrl+K or /, both modes) */}
      <SigmaCommand open={cmdOpen} onClose={() => setCmdOpen(false)} />

      {/* Boot screen (first visit only) */}
      {booting && <SigmaBoot onDone={handleBootDone} />}

      {/* Onboarding overlay (first visit only, after boot) */}
      {onboarding && !booting && (
        <SigmaOnboarding onDone={() => setOnboarding(false)} />
      )}
    </div>
  );
}
