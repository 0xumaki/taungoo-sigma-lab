"use client";

import * as React from "react";
import gsap from "gsap";
import dynamic from "next/dynamic";
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
import { SigmaHaggle } from "./shared/SigmaHaggle";
import { SigmaSoundToggle } from "./shared/SigmaSoundToggle";
import { SigmaHelp } from "./shared/SigmaHelp";
import { SigmaBreadcrumb } from "./shared/SigmaBreadcrumb";
import { SigmaThemeToggle } from "./shared/SigmaThemeToggle";
import { SigmaCompletion } from "./shared/SigmaCompletion";
import { SigmaMCController } from "./shared/SigmaMCController";
import { SigmaToolbar } from "./shared/SigmaToolbar";
import { SigmaModeSwitcher } from "./shared/SigmaModeSwitcher";
import { AlphaInterface } from "./alpha/AlphaInterface";
import { BetaInterface } from "./beta/BetaInterface";
import { sigmaSound, useSigmaSound } from "@/lib/sigma/sound";

// LAZY-LOAD the 11 heavy Sigma sections + SigmaMap.
// These are the memory-heavy components (recharts, GSAP contexts, particles).
// With dynamic imports, they only compile when Sigma mode is actually used.
// When in Alpha mode, NONE of these are compiled — saving ~70% memory.
const SigmaMap = dynamic(() => import("./SigmaMap").then(m => m.SigmaMap));
const S01Initializing = dynamic(() => import("./sections/S01Initializing").then(m => m.S01Initializing));
const S02Manifesto = dynamic(() => import("./sections/S02Manifesto").then(m => m.S02Manifesto));
const S03CoreSystems = dynamic(() => import("./sections/S03CoreSystems").then(m => m.S03CoreSystems));
const S04Projects = dynamic(() => import("./sections/S04Projects").then(m => m.S04Projects));
const S05Collective = dynamic(() => import("./sections/S05Collective").then(m => m.S05Collective));
const S06Research = dynamic(() => import("./sections/S06Research").then(m => m.S06Research));
const S07DataStreams = dynamic(() => import("./sections/S07DataStreams").then(m => m.S07DataStreams));
const S08Capabilities = dynamic(() => import("./sections/S08Capabilities").then(m => m.S08Capabilities));
const S09Alliances = dynamic(() => import("./sections/S09Alliances").then(m => m.S09Alliances));
const S10Access = dynamic(() => import("./sections/S10Access").then(m => m.S10Access));
const S11Status = dynamic(() => import("./sections/S11Status").then(m => m.S11Status));

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
  // Auto-enable SFX on first user interaction (both Sigma and Alpha modes)
  useSigmaSound();
  const [renderedView, setRenderedView] = React.useState<SectionId>(view);
  const flashAccentRef = React.useRef<string>("#FFFFFF");
  const [booting, setBooting] = React.useState(false);
  const [onboarding, setOnboarding] = React.useState(false);
  const [cmdOpen, setCmdOpen] = React.useState(false);
  const [mcActive, setMcActive] = React.useState(false);
  const [tourActive, setTourActive] = React.useState(false);
  const [tourPaused, setTourPaused] = React.useState(false);
  const [tourIndex, setTourIndex] = React.useState(0);
  const [mode, setMode] = React.useState<"sigma" | "alpha" | "beta">("beta");

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
    // Only show boot screen on the VERY FIRST visit to the site (ever).
    // NEVER on reload, back-navigation, or mode switches — boot repetition
    // between transitions was the user complaint.
    // Uses localStorage "sigma_ever_booted" as a per-browser guard.
    let alreadyBooted = false;
    try {
      alreadyBooted =
        sessionStorage.getItem("sigma_booted") === "1" ||
        localStorage.getItem("sigma_ever_booted") === "1";
    } catch { /* ignore */ }

    // "isReturning" = coming back from a detail page (scroll position saved)
    let isReturning = false;
    try {
      isReturning =
        sessionStorage.getItem("alpha_scroll_position") !== null ||
        sessionStorage.getItem("beta_scroll_position") !== null;
    } catch { /* ignore */ }

    // Determine the mode early — Beta mode is a clean enterprise mode that should
    // NEVER show the brutalist SigmaBoot screen. Only Sigma mode gets the boot screen.
    let savedMode: "sigma" | "alpha" | "beta" | null = null;
    try {
      const sm = localStorage.getItem("sigma-mode");
      if (sm === "sigma" || sm === "alpha" || sm === "beta") savedMode = sm;
    } catch { /* ignore */ }
    const effectiveMode = savedMode || "beta";

    if (effectiveMode === "beta") {
      setBooting(false);
    } else if (!alreadyBooted && !isReturning) {
      // Genuine first-ever visit → show boot screen ONE time, then never again
      setBooting(true);
      try { localStorage.setItem("sigma_ever_booted", "1"); } catch { /* ignore */ }
    } else {
      // Reload / back-nav / already-booted → skip boot
      setBooting(false);
    }

    try {
      // show onboarding only once per browser (localStorage).
      // Set the flag IMMEDIATELY so reloads / mid-tour navigation never re-trigger
      // the panel.
      const onboarded = localStorage.getItem("sigma_onboarded");
      if (!onboarded && !isReturning && effectiveMode !== "beta") {
        try { localStorage.setItem("sigma_onboarded", "1"); } catch { /* ignore */ }
        const ob = setTimeout(() => setOnboarding(true), 4000);
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

  // Keyboard navigation — DISABLED when typing in form inputs (S10 Access, S08 search, etc.)
  // ALSO DISABLED in Beta mode (user request: Alpha and Sigma key bindings should not work in Beta)
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // Skip ALL key bindings when in Beta mode
      if (mode === "beta") return;
      // CRITICAL: Skip when a dialog/modal/menu is open — prevents S06 crash
      // (ArrowRight/Escape/m while a Dialog is open desyncs the sigma store)
      if (document.querySelector('[role="dialog"], [data-state="open"].modal, [role="menu"], [data-radix-popper-content-wrapper]')) return;
      // Skip ALL key bindings when user is typing in an input/textarea/contenteditable
      const target = e.target as HTMLElement;
      if (target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable)) {
        return; // Let the user type without triggering navigation
      }
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
  }, [navigate, tourActive, mode]);

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
    }, 1000);
    return () => clearInterval(interval);
  }, [tourActive, tourPaused, phase, navigate]);

  // Run transition timeline on phase change — uses useEffect for reliability
  React.useEffect(() => {
    if (phase !== "covering") return;
    const dest = useSigmaStore.getState().view;
    const destMeta = getSection(dest);
    flashAccentRef.current = destMeta.accent;
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
    // Set flash bg via GSAP (not JSX) to avoid React re-render interference
    if (flash) {
      tl.set(flash, { backgroundColor: destMeta.accent });
    }
    // CRITICAL: set overlay background to accent color so the content swap
    // (setRenderedView → React reconciliation → 3-frame GSAP ticker pause)
    // doesn't show a black flash. The overlay bg covers the content even if
    // the panels briefly reset during React's reconciliation.
    tl.set(overlay, { pointerEvents: "auto", zIndex: 90, backgroundColor: destMeta.accent });
    tl.to(panels, {
      scaleY: 1,
      duration: 0.42,
      ease: "power3.in",
      stagger: { each: 0.04, from: "start" },
    });

    // Hold panels fully covering for 0.08s BEFORE swapping content.
    // This prevents the black screen flash that occurs when the old section
    // unmounts + new section mounts — without the hold, there's a frame
    // where neither is rendered → page background (black) shows through.
    tl.to({}, { duration: 0.08 });

    // 2. MIDPOINT — swap the rendered view + flash + label fly-through.
    // Fires AFTER panels are 100% covering (not at ">-0.05" which was 0.05s
    // before the cover ended → gap → black flash).
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
      ">"  // fire exactly when the hold ends (panels 100% covering)
    );

    // sector label flies through during slam cover transition.
    // Set the label TEXT dynamically so it shows the DESTINATION sector code
    // (including "00" for map — which wasn't showing before because the label
    // was bound to the rendered view's meta, not the destination's).
    if (label) {
      // Step 1: Set the text content to the destination sector code
      tl.call(() => {
        label.textContent = destMeta.shortCode;
      }, [], "<");
      // Step 2: Set visibility:visible + initial position (BEFORE animating opacity,
      // so the element is visible when opacity starts increasing)
      tl.set(label, { visibility: "visible", opacity: 0, x: -120 }, "<");
      // Step 3: Animate opacity 0→1 + x: -120→0 (fly in from left)
      tl.to(
        label,
        { opacity: 1, x: 0, duration: 0.28, ease: "power3.out" },
        "<"
      );
      // Step 4: Animate opacity 1→0 + x: 0→120 (fly out to right)
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
      // Only clear backgroundColor — NOT transform. The inline transform
      // (scaleY 0) stays, which overrides the CSS class default. If we clear
      // transform, the CSS class (.sigma-transition-panel { transform: scaleY(0) })
      // still applies, so panels stay hidden — but the inline removal causes
      // a brief reflow. Keeping the inline transform is cleaner.
      clearProps: "backgroundColor",
    });

    tl.set(overlay, { pointerEvents: "none", backgroundColor: "transparent" });
    // CRITICAL: explicitly set opacity to 0 AND visibility to hidden (do NOT use clearProps — clearProps
    // reverts to CSS default opacity:1, which makes the number persist on screen).
    // visibility:hidden is the FINAL safety net — even if opacity fails for any reason,
    // the element will still be completely invisible and non-interactive.
    // This was the root cause of the "center number keeps displaying" bug.
    if (label) {
      tl.set(label, { opacity: 0, x: 0, visibility: "hidden" });
    }

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
      className={`relative fixed inset-0 overflow-hidden bg-background ${mode === "beta" ? "" : "sigma-noise sigma-vignette"}`}
    >
      {/* Persistent layered background — HIDDEN in Beta mode (clean enterprise) */}
      {mode !== "beta" && <div className="sigma-grid pointer-events-none absolute inset-0 opacity-60" />}

      {/* Cursor spotlight (desktop only) — HIDDEN in Beta mode */}
      {mode !== "beta" && <SigmaSpotlight />}

      {/* Mode switcher (Σ / α / β) — floating, repositioned to top-right to avoid nav collision */}
      {mode === "beta" && (
        <div className="fixed right-4 top-20 z-[95]">
          <SigmaModeSwitcher mode={mode} onModeChange={setMode} floating />
        </div>
      )}
      {mode !== "beta" && <SigmaModeSwitcher mode={mode} onModeChange={setMode} />}

      {/* Rendered view — Sigma mode (map-based), Alpha mode (brutalist scroll), or Beta mode (enterprise) */}
      {mode === "sigma" ? (
        <div
          key={`${renderedView}-${visitToken}`}
          className="absolute inset-0"
          style={{ paddingTop: 32, paddingLeft: 32, paddingRight: 32, paddingBottom: 28 }}
        >
          <div className="relative h-full w-full">{renderView(renderedView)}</div>
        </div>
      ) : mode === "alpha" ? (
        <AlphaInterface />
      ) : (
        <BetaInterface />
      )}

      {/* Accent ambient glow keyed to the current sector — HIDDEN in Beta mode */}
      {mode !== "beta" && (
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-700"
          style={{
            background: `radial-gradient(60% 50% at 50% 50%, ${meta.accent}14, transparent 70%)`,
          }}
        />
      )}

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
              className={`flex-1 sigma-transition-panel${i < PANEL_COUNT - 1 ? " sigma-panel-border" : ""}`}
            />
          ))}
        </div>

        {/* glitch flash — background set by GSAP (tl.set), NOT JSX.
            This prevents setFlashAccent state update from triggering a
            React re-render that could interfere with GSAP panel transforms. */}
        <div
          ref={flashRef}
          className="absolute inset-0 mix-blend-screen"
          style={{ opacity: 0 }}
        />

        {/* sector label fly-through — shows "01"/"02" ONLY during slam cover transition.
            CRITICAL FIX:
            1. No mixBlendMode (was causing rendering at opacity 0)
            2. visibility:hidden by default (extra safety — even if opacity fails, element is invisible)
            3. z-index: 1 (behind content but above panels — so it shows during transition but not after)
            4. GSAP sets visibility:visible during animation, then back to hidden after
            After transition: opacity=0 + visibility=hidden = truly invisible (no persistence bug). */}
        <div className="absolute inset-0 flex items-center justify-center" style={{ zIndex: 1 }}>
          <div
            ref={labelRef}
            className="font-mono text-[11vw] font-black leading-none text-black/85"
            style={{ opacity: 0, visibility: "hidden", pointerEvents: "none" }}
          >
            {meta.shortCode}
          </div>
        </div>

        {/* hazard edge during transition */}
        <div className="sigma-hazard-orange absolute inset-x-0 top-0 h-2 opacity-0" />
      </div>

      {/* Persistent HUD — Sigma mode only */}
      {mode === "sigma" && <SigmaHud />}

      {/* Custom cursor reticle (desktop only, Sigma + Alpha modes only — Beta has its own BetaReticleCursor) */}
      {mode !== "beta" && <SigmaCursor />}

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

      {/* Secret haggle system (type H-A-G-G-L-E to activate) */}
      <SigmaHaggle />

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
