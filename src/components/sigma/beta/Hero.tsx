"use client";

import * as React from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring, useReducedMotion } from "motion/react";

/**
 * Hero — Cinematic void with the Armored General figure + WIDE TAUNGOO headline.
 * HUD panels are background-less floating text — anchored by gradient lines.
 * Live-data hooks: timestamp ticks every 1s, GPS coordinates jitter every 3s,
 * uptime/load counters count-up on mount.
 */

function useLiveTimestamp() {
  const [ts, setTs] = React.useState("T+04:17:22");
  React.useEffect(() => {
    let sec = 4 * 3600 + 17 * 60 + 22;
    const id = setInterval(() => {
      sec += 1;
      const h = String(Math.floor(sec / 3600)).padStart(2, "0");
      const m = String(Math.floor((sec % 3600) / 60)).padStart(2, "0");
      const s = String(sec % 60).padStart(2, "0");
      setTs(`T+${h}:${m}:${s}`);
    }, 1000);
    return () => clearInterval(id);
  }, []);
  return ts;
}

function useGpsJitter() {
  const [gps, setGps] = React.useState("16.840°N 96.170°E");
  React.useEffect(() => {
    const id = setInterval(() => {
      // Skip GPS jitter when the tab is hidden — saves a setState every 3s
      // while backgrounded. Jitter is decorative; no precision is lost.
      if (document.hidden) return;
      const lat = 16.840 + (Math.random() - 0.5) * 0.008;
      const lon = 96.170 + (Math.random() - 0.5) * 0.008;
      setGps(`${lat.toFixed(3)}°N ${lon.toFixed(3)}°E`);
    }, 3000);
    return () => clearInterval(id);
  }, []);
  return gps;
}

function useCountUp(target: number, duration = 1500, delay = 0) {
  const [val, setVal] = React.useState(0);
  React.useEffect(() => {
    let raf: number;
    const start = performance.now() + delay;
    const tick = (now: number) => {
      if (now < start) { raf = requestAnimationFrame(tick); return; }
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(target * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, delay]);
  return val;
}

/**
 * useTextScramble — cyberpunk decoder effect.
 * Returns a string that starts as random chars and resolves to the target.
 */
const SCRAMBLE_CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZΣ0123456789";
function randomScramble(len: number) {
  let s = "";
  for (let i = 0; i < len; i++) s += SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
  return s;
}
function useTextScramble(target: string, duration = 1200, delay = 0) {
  // Initialize with the TARGET string (deterministic) so SSR output matches the
  // first client render — the scramble then starts inside useEffect (client-only),
  // which fires immediately after hydration. Fixes the hydration mismatch warning.
  const [text, setText] = React.useState(() => target);
  React.useEffect(() => {
    let raf: number;
    const start = performance.now() + delay;
    const tick = (now: number) => {
      if (now < start) {
        // Update scramble rapidly while waiting for delay to pass
        setText(randomScramble(target.length));
        raf = requestAnimationFrame(tick);
        return;
      }
      const t = Math.min(1, (now - start) / duration);
      // Number of chars resolved = ceil(t * length)
      const resolved = Math.ceil(t * target.length);
      let result = "";
      for (let i = 0; i < target.length; i++) {
        if (i < resolved || target[i] === " ") result += target[i];
        else result += SCRAMBLE_CHARS[Math.floor(Math.random() * SCRAMBLE_CHARS.length)];
      }
      setText(result);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, delay]);
  return text;
}

/**
 * Hero — Cinematic void with the Armored General figure + WIDE TAUNGOO headline.
 *
 * Design:
 * - The user-provided transparent Armored General image as the centerpiece
 * - "TAUNGOO" headline spread EXTREMELY WIDE — 65% of screen width
 * - Thin/light font weight (200), Rajdhani
 * - Void black (#0a0a0a) background
 * - HUD panels (left/right), corner brackets, crosshairs
 * - Figure sits BEHIND the text (z-index layering)
 */

/**
 * useMouseParallax — returns spring-smoothed x/y motion values (in px) for a
 * subtle parallax effect based on mouse position relative to viewport center.
 * strength: how many px to move at max (e.g. 20 = ±20px)
 */
function useMouseParallax(strength = 20) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 80, damping: 20, restDelta: 0.1 });
  const sy = useSpring(y, { stiffness: 80, damping: 20, restDelta: 0.1 });
  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (!finePointer) return;
    // Respect prefers-reduced-motion: skip mouse parallax entirely.
    // (Hero already disables scroll parallax via useReducedMotion in render.)
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;
    const onMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      // Normalize to [-1, 1]
      const nx = (e.clientX - cx) / cx;
      const ny = (e.clientY - cy) / cy;
      x.set(nx * strength);
      y.set(ny * strength);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [strength, x, y]);
  return { x: sx, y: sy };
}

/**
 * useMagnetic — returns a callback ref that attaches a magnetic-cursor effect.
 * Apply to a button/anchor for subtle cursor attraction (max `strength` px pull).
 * Respects prefers-reduced-motion (skips entirely) + touch devices (pointer: coarse).
 * Uses a callback ref pattern so it works for both always-mounted elements AND
 * conditionally-rendered ones (e.g., a multi-step form's submit button that only
 * appears on the last step). Exported so other beta components (Contact submit)
 * can reuse the same px-based magnetic feel as the Hero CTA.
 */
export function useMagnetic<T extends HTMLElement = HTMLAnchorElement>(strength = 6) {
  const [el, setEl] = React.useState<T | null>(null);
  const ref = React.useCallback((node: T | null) => setEl(node), []);
  React.useEffect(() => {
    if (!el) return;
    if (typeof window === "undefined") return;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (!finePointer) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;
    // PERF (LOOP-1-LH): cache the button's bounding rect on mouseenter (when
    // the cursor first enters the magnetic field), invalidate on scroll/resize.
    // Previously, every window mousemove forced a getBoundingClientRect() layout
    // reflow — and this is a WINDOW-level listener (fires for every mouse move
    // anywhere on the page, not just over the button). That's the worst-case
    // layout-thrash pattern: 60+ forced layouts/sec while the cursor is anywhere.
    let r: DOMRect | null = null;
    const refreshRect = () => { r = el.getBoundingClientRect(); };
    const invalidateRect = () => { r = null; };
    const onMove = (e: MouseEvent) => {
      // Lazy refresh if cache was invalidated.
      if (!r) refreshRect();
      const rect = r as DOMRect;
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width;
      const dy = (e.clientY - cy) / rect.height;
      // Only attract when cursor is within 1.5x button size
      if (Math.abs(dx) < 1.5 && Math.abs(dy) < 1.5) {
        el.style.transform = `translate(${dx * strength}px, ${dy * strength}px)`;
      } else {
        el.style.transform = "translate(0, 0)";
      }
    };
    const onLeave = () => { el.style.transform = "translate(0, 0)"; };
    el.addEventListener("mouseenter", refreshRect);
    window.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    window.addEventListener("scroll", invalidateRect, { capture: true, passive: true });
    window.addEventListener("resize", invalidateRect, { passive: true });
    return () => {
      el.removeEventListener("mouseenter", refreshRect);
      window.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("scroll", invalidateRect, { capture: true });
      window.removeEventListener("resize", invalidateRect);
      el.style.transform = "";
    };
  }, [el, strength]);
  return ref;
}

/**
 * useTypingText — types out text char-by-char, then blinks cursor.
 * Loops after a pause.
 */
function useTypingText(text: string, speed = 50, startDelay = 0, pauseAfter = 2500) {
  const [output, setOutput] = React.useState("");
  const [done, setDone] = React.useState(false);
  React.useEffect(() => {
    let i = 0;
    let timer: ReturnType<typeof setTimeout>;
    let pauseTimer: ReturnType<typeof setTimeout>;
    const startTimer = setTimeout(function type() {
      if (i <= text.length) {
        setOutput(text.slice(0, i));
        setDone(i === text.length);
        i++;
        timer = setTimeout(type, speed);
      } else {
        // Pause then restart
        pauseTimer = setTimeout(() => {
          i = 0;
          setOutput("");
          setDone(false);
          timer = setTimeout(type, speed);
        }, pauseAfter);
      }
    }, startDelay);
    return () => {
      clearTimeout(startTimer);
      clearTimeout(timer);
      clearTimeout(pauseTimer);
    };
  }, [text, speed, startDelay, pauseAfter]);
  return { output, done };
}

/**
 * useLiveBars — returns an array of heights (0-100) that update on an interval.
 * Used for the throughput monitor visualization.
 *
 * HYDRATION SAFETY: the initial state is deterministic (all bars at 50) so the
 * SSR HTML matches the first client render. The randomization only starts inside
 * useEffect (client-only) — same pattern as useTextScramble + useCountUp above.
 * Without this guard, Math.random() in the useState initializer would produce
 * different bar values on server vs client → hydration mismatch warning.
 */
function useLiveBars(count = 12, intervalMs = 1200) {
  const [bars, setBars] = React.useState<number[]>(() =>
    Array.from({ length: count }, () => 50)
  );
  React.useEffect(() => {
    // First tick: seed real random values (client-only).
    setBars(Array.from({ length: count }, () => 20 + Math.random() * 70));
    const id = setInterval(() => {
      // Skip oscilloscope churn when the tab is hidden — bars are decorative.
      if (document.hidden) return;
      setBars((prev) => {
        // Shift left, push new value at end (oscilloscope-style)
        const next = [...prev.slice(1), 20 + Math.random() * 75];
        return next;
      });
    }, intervalMs);
    return () => clearInterval(id);
  }, [count, intervalMs]);
  return bars;
}

export function Hero() {
  const ts = useLiveTimestamp();
  const gps = useGpsJitter();
  const uptime = useCountUp(99.97, 1800, 600);
  const load = useCountUp(81, 1800, 900);
  // Scroll parallax for the figure (y only — opacity handled by entrance animation)
  const sectionRef = React.useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  // Scroll parallax: figure drifts down 0→80px and fades 1→0.3 as hero scrolls out
  const figureScrollY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const figureScrollOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.3]);
  // Mouse parallax — figure moves slowest, HUDs move opposite direction
  const figureParallax = useMouseParallax(12);  // figure: subtle, depth feel
  const hudParallax = useMouseParallax(22);     // HUDs: more pronounced, foreground
  const ctaRef = useMagnetic(6);                 // CTA: subtle magnetic pull (max 6px)
  // Respect prefers-reduced-motion: kill scroll parallax if user prefers reduced motion
  const reducedMotion = useReducedMotion();
  const tickerKeywords = ["AI", "WEB3", "FULL-STACK", "MULTIMEDIA"];
  // Live data viz — typing terminal + throughput bars
  const throughputBars = useLiveBars(16, 900);
  // TAUNGOO letters each get their own scramble (staggered, longer for cinematic feel)
  const t = useTextScramble("T", 800, 500);
  const a = useTextScramble("A", 800, 620);
  const u = useTextScramble("U", 800, 740);
  const n = useTextScramble("N", 800, 860);
  const g = useTextScramble("G", 800, 980);
  const o1 = useTextScramble("O", 800, 1100);
  const o2 = useTextScramble("O", 800, 1220);
  const taungooLetters = [t, a, u, n, g, o1, o2];
  return (
    <section
      ref={sectionRef}
      id="top"
      aria-labelledby="top-title"
      data-section="hero"
      className="relative flex items-center justify-center overflow-hidden"
      style={{ background: "var(--beta-bg)", height: "105vh" }}
    >
      {/* SEO h1 — visually hidden (sr-only). The visible "TAUNGOO" wordmark is
          rendered as motion.span letters below for the cinematic letter-by-letter
          scramble; this h1 gives the page a proper heading root for search
          engines + screen readers without altering the visible layout.
          Alpha + Sigma modes have their own visible h1s (AlphaHero + SigmaMap).
          LOOP-3-AGENTIC-SEO: id="top-title" + section aria-labelledby for landmark
          discovery by AI crawlers (Lighthouse SEO + Agentic Browsing). */}
      <h1 id="top-title" className="sr-only">
        TAUNGOO Sigma Lab — Innovation Hub for AI, Web3, and Full-Stack Platforms
      </h1>
      {/* Immersive lighting — multi-layer gradient glow behind figure.
          RESTORED per user: "beta hero's 3 gold radial gradients are needed."
          These are hero-local ambient glows (not the full-screen overlay). */}
      <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 70% at 50% 45%, rgba(212, 175, 55, 0.06), transparent 60%)" }} />
      <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse 40% 50% at 30% 60%, rgba(212, 175, 55, 0.04), transparent 50%)" }} />
      <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse 40% 50% at 70% 60%, rgba(212, 175, 55, 0.04), transparent 50%)" }} />

      {/* Center-stage depth vignette — darkens armor behind center text for readability */}
      <div className="pointer-events-none absolute inset-0 z-[2]" style={{ background: "radial-gradient(ellipse 50% 60% at 50% 50%, rgba(5, 5, 8, 0.65), transparent 70%)" }} />

      {/* Vignette */}
      <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse 85% 85% at 50% 50%, transparent 20%, var(--beta-bg) 100%)" }} />

      {/* Noise grain */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")" }} />

      {/* Armored General figure — fills hero, chest-level on desktop, full on mobile.
          Outer wrapper handles scroll parallax (translateY 0→80px + opacity 1→0.3).
          Inner motion.div handles entrance animation (opacity 0→0.55, scale 1.05→1)
          + mouse parallax (x only). They compose cleanly since transform/opacity
          on parent and child are independent. */}
      <motion.div
        style={reducedMotion ? undefined : { y: figureScrollY, opacity: figureScrollOpacity }}
        className="pointer-events-none absolute inset-0"
      >
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 0.35, scale: 1 }}
          transition={{ delay: 0.3, duration: 1.5 }}
          style={{ x: figureParallax.x }}
          className="absolute inset-0 flex items-center justify-center"
        >
          {/* PERF (LOOP-1-LH): pre-encoded the 1.3MB hero-figure.png source to a
              179KB hero-figure.webp (q=85 color / q=100 alpha for transparency
              fidelity). Using a raw <img> (not next/image) here per the task
              spec — the complex filter (brightness + drop-shadow gold glow) +
              objectPosition "center 20%" are preserved via the `style` prop,
              and explicit width/height + fetchPriority="high" gives the
              browser everything it needs to prioritize the LCP fetch without
              the /_next/image redirect overhead. The original .png stays on
              disk as a fallback for browsers without WebP support (none of
              the majors, but defensive). */}
          <img
            src="/hero-figure.webp"
            alt=""
            width={1008}
            height={1068}
            // `fill`-equivalent positioning: parent is `absolute inset-0 flex
            // items-center justify-center`, so we stretch to its bounds.
            decoding="async"
            // fetchPriority is the React 19+ DOM attribute (camelCase).
            // It compiles to fetchpriority="high" on the rendered img tag.
            fetchPriority="high"
            className="absolute inset-0 h-full w-full"
            style={{
              objectFit: "cover",
              objectPosition: "center 20%",
              // Subtle illumination — figure visible but not prominent
              filter: "brightness(0.82) drop-shadow(0 0 40px rgba(212, 175, 55, 0.15))",
            }}
          />
        </motion.div>
      </motion.div>

      {/* Corner brackets */}
      <span className="absolute left-6 top-6 h-4 w-4 border-l border-t" style={{ borderColor: "rgba(212, 175, 55, 0.4)" }} />
      <span className="absolute right-6 top-6 h-4 w-4 border-r border-t" style={{ borderColor: "rgba(212, 175, 55, 0.4)" }} />
      <span className="absolute bottom-6 left-6 h-4 w-4 border-b border-l" style={{ borderColor: "rgba(212, 175, 55, 0.4)" }} />
      <span className="absolute bottom-6 right-6 h-4 w-4 border-b border-r" style={{ borderColor: "rgba(212, 175, 55, 0.4)" }} />

      {/* LEFT HUD — floating text only, no card background (mouse parallax wrapper) */}
      <motion.div
        style={{ x: hudParallax.x, y: hudParallax.y }}
        className="absolute left-[5%] lg:left-[88px] top-1/2 hidden -translate-y-1/2 w-[200px] lg:block"
      >
      <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6, duration: 0.6 }}>
        {/* Top divider line — minimal */}
        <div className="h-px w-full mb-3" style={{ background: "linear-gradient(to right, transparent, rgba(212, 175, 55, 0.4), transparent)" }} />

        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <span className="font-mono text-[9px] tracking-[0.2em]" style={{ color: "var(--beta-accent)" }}>SYS.ID</span>
          <span className="font-mono text-[9px] tracking-[0.2em] tabular-nums" style={{ color: "var(--beta-fg-subtle)" }}>{ts}</span>
        </div>

        {/* Identity readout */}
        <div className="bs-flicker mb-3">
          <div className="font-mono text-[13px] font-semibold tracking-[0.08em]" style={{ color: "var(--beta-fg-strong)" }}>
            TAU-Σ-0027<span className="bs-blink" />
          </div>
          <div className="font-mono text-[9px] tracking-[0.15em] mt-0.5" style={{ color: "var(--beta-fg-muted)" }}>CLEARANCE · ALPHA</div>
        </div>

        {/* Divider */}
        <div className="h-px w-full mb-3" style={{ background: "rgba(212, 175, 55, 0.15)" }} />

        {/* Uptime + sparkline */}
        <div className="flex items-end justify-between mb-3">
          <div>
            <div className="font-mono text-[9px] tracking-[0.2em]" style={{ color: "var(--beta-fg-subtle)" }}>UPTIME</div>
            <div className="font-mono text-[14px] font-semibold tabular-nums" style={{ color: "var(--beta-accent)" }}>{uptime.toFixed(2)}%</div>
          </div>
          <svg viewBox="0 0 60 24" width="56" height="22" aria-hidden="true">
            <polyline className="bs-sparkline-path" points="0,18 8,14 14,16 22,8 28,12 36,4 42,10 50,6 60,8" />
          </svg>
        </div>

        {/* Bottom: signal + coords */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="bs-pulse-dot inline-block h-1.5 w-1.5 rounded-full" style={{ background: "var(--beta-accent)" }} />
            <span className="font-mono text-[9px] tracking-[0.15em]" style={{ color: "var(--beta-accent)" }}>LOCK</span>
          </div>
          <span className="font-mono text-[9px] tracking-[0.1em] tabular-nums" style={{ color: "var(--beta-fg-subtle)" }}>{gps}</span>
        </div>

        {/* Bottom divider */}
        <div className="h-px w-full mt-3" style={{ background: "linear-gradient(to right, transparent, rgba(212, 175, 55, 0.4), transparent)" }} />

        {/* Side label */}
        <div className="mt-3 flex items-center gap-2 px-1">
          <div className="h-px w-6" style={{ background: "rgba(212, 175, 55, 0.4)" }} />
          <span className="font-mono text-[9px] tracking-[0.2em]" style={{ color: "var(--beta-fg-subtle)" }}>NODE 01</span>
          <div className="h-px flex-1" style={{ background: "rgba(212, 175, 55, 0.15)" }} />
        </div>
      </motion.div>
      </motion.div>

      {/* RIGHT HUD — floating text only, no card background (mouse parallax wrapper) */}
      <motion.div
        style={{ x: hudParallax.x, y: hudParallax.y }}
        className="absolute right-[5%] lg:right-[3%] top-1/2 hidden -translate-y-1/2 w-[200px] lg:block"
      >
      <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.6, duration: 0.6 }}>
        {/* Top divider line */}
        <div className="h-px w-full mb-3" style={{ background: "linear-gradient(to right, transparent, rgba(212, 175, 55, 0.4), transparent)" }} />

        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <span className="font-mono text-[9px] tracking-[0.2em]" style={{ color: "var(--beta-fg-subtle)" }}>BUILD</span>
          <span className="font-mono text-[9px] tracking-[0.2em]" style={{ color: "var(--beta-accent)" }}>V.2.7.Σ</span>
        </div>

        {/* Circular progress + load */}
        <div className="flex items-center gap-3 mb-3">
          <svg viewBox="0 0 40 40" width="40" height="40" aria-hidden="true" style={{ transform: "rotate(-90deg)" }}>
            <circle cx="20" cy="20" r="18" fill="none" stroke="var(--beta-border)" strokeWidth="2" />
            <circle
              className="bs-ring-progress"
              cx="20" cy="20" r="18"
              fill="none"
              stroke="var(--beta-accent)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="113"
              style={{ filter: "drop-shadow(0 0 4px rgba(212, 175, 55, 0.6))" }}
            />
          </svg>
          <div>
            <div className="font-mono text-[9px] tracking-[0.2em]" style={{ color: "var(--beta-fg-subtle)" }}>LOAD</div>
            <div className="font-mono text-[15px] font-semibold tabular-nums" style={{ color: "var(--beta-fg-strong)" }}>{Math.round(load)}<span className="text-[10px] ml-0.5" style={{ color: "var(--beta-fg-muted)" }}>%</span></div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px w-full mb-3" style={{ background: "rgba(212, 175, 55, 0.15)" }} />

        {/* Stats */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div>
            <div className="font-mono text-[9px] tracking-[0.2em]" style={{ color: "var(--beta-fg-subtle)" }}>DEPLOY</div>
            <div className="font-mono text-[14px] font-semibold" style={{ color: "var(--beta-fg-strong)" }}>09</div>
          </div>
          <div>
            <div className="font-mono text-[9px] tracking-[0.2em]" style={{ color: "var(--beta-fg-subtle)" }}>SVC</div>
            <div className="font-mono text-[14px] font-semibold" style={{ color: "var(--beta-accent)" }}>27</div>
          </div>
        </div>

        {/* Audio bars */}
        <div className="flex items-end gap-[2px] h-4 justify-end">
          {[3, 5, 4, 7, 4, 6, 3, 5, 4].map((h, i) => (
            <div key={i} className="w-[2px]" style={{ height: `${h * 2}px`, background: "rgba(212, 175, 55, 0.5)", animation: `bs-sparkline-shift ${1.4 + (i % 3) * 0.3}s ease-in-out infinite` }} />
          ))}
        </div>

        {/* Bottom divider */}
        <div className="h-px w-full mt-3" style={{ background: "linear-gradient(to right, transparent, rgba(212, 175, 55, 0.4), transparent)" }} />

        {/* Side label */}
        <div className="mt-3 flex items-center gap-2 px-1">
          <div className="h-px flex-1" style={{ background: "rgba(212, 175, 55, 0.15)" }} />
          <span className="font-mono text-[9px] tracking-[0.2em]" style={{ color: "var(--beta-fg-subtle)" }}>SYS.MON</span>
          <div className="h-px w-6" style={{ background: "rgba(212, 175, 55, 0.4)" }} />
        </div>
      </motion.div>
      </motion.div>

      {/* CENTER CONTENT */}
      <div className="relative z-10 flex w-full flex-col items-center px-[6%] sm:px-[2%]">
        {/* Minimal animated visualization above TAUNGOO — single line on mobile */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-6 flex items-center justify-center gap-1.5 sm:gap-2 whitespace-nowrap"
        >
          {/* Animated signal dots — 3 dots on mobile, 5 on desktop */}
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
              className="hidden sm:block h-1 w-1 rounded-full"
              style={{ background: "var(--beta-accent)" }}
            />
          ))}
          {/* Thin animated line */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 30 }}
            transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
            className="h-px sm:!w-[60px]"
            style={{ background: "linear-gradient(to right, var(--beta-accent), transparent)" }}
          />
          {/* Status text */}
          <span className="font-mono text-[7px] sm:text-[8px] uppercase tracking-[0.2em] sm:tracking-[0.3em]" style={{ color: "var(--beta-fg-subtle)" }}>
            SIGMA · CORE
          </span>
          {/* Thin animated line — right side */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 30 }}
            transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
            className="h-px sm:!w-[60px]"
            style={{ background: "linear-gradient(to left, var(--beta-accent), transparent)" }}
          />
          {/* Mirror dots */}
          {[2, 1, 0].map((i) => (
            <motion.span
              key={`r-${i}`}
              animate={{ opacity: [0.2, 1, 0.2], scale: [1, 1.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
              className="hidden sm:block h-1 w-1 rounded-full"
              style={{ background: "var(--beta-accent)" }}
            />
          ))}
        </motion.div>

        {/* TAUNGOO — with mechanical letter animation + breathing gold glow + corner brackets */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 1.0 }}
          className="relative text-center"
          style={{ width: "92%", maxWidth: "92vw", margin: "0 auto" }}
        >
          {/* Corner brackets */}
          <span className="absolute -left-1 -top-1 sm:-left-2 sm:-top-2 h-2 w-2 sm:h-3 sm:w-3" style={{ borderLeft: "1px solid rgba(212,175,55,0.5)", borderTop: "1px solid rgba(212,175,55,0.5)" }} />
          <span className="absolute -right-1 -top-1 sm:-right-2 sm:-top-2 h-2 w-2 sm:h-3 sm:w-3" style={{ borderRight: "1px solid rgba(212,175,55,0.5)", borderTop: "1px solid rgba(212,175,55,0.5)" }} />
          <span className="absolute -left-1 -bottom-1 sm:-left-2 sm:-bottom-2 h-2 w-2 sm:h-3 sm:w-3" style={{ borderLeft: "1px solid rgba(212,175,55,0.5)", borderBottom: "1px solid rgba(212,175,55,0.5)" }} />
          <span className="absolute -right-1 -bottom-1 sm:-right-2 sm:-bottom-2 h-2 w-2 sm:h-3 sm:w-3" style={{ borderRight: "1px solid rgba(212,175,55,0.5)", borderBottom: "1px solid rgba(212,175,55,0.5)" }} />

          <div className="flex justify-between items-center lg:px-12" style={{ width: "100%" }}>
            {taungooLetters.map((letter, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
                animate={{
                  opacity: 1,
                  y: 0,
                  filter: "blur(0px)",
                  // Mechanical animation: subtle translateY + slight skew + glow on a slow loop.
                  // Disabled entirely when prefers-reduced-motion is on (entrance still runs).
                  ...(reducedMotion ? {} : {
                    textShadow: [
                      "0 0 30px rgba(212, 175, 55, 0.15)",
                      "0 0 60px rgba(212, 175, 55, 0.35)",
                      "0 0 30px rgba(212, 175, 55, 0.15)",
                    ],
                    y: [0, -1, 0, 1, 0],
                    skewY: [0, -0.3, 0, 0.3, 0],
                  }),
                }}
                transition={{
                  delay: 0.3 + i * 0.08,
                  duration: 0.5,
                  textShadow: { delay: 1.5 + i * 0.08, duration: 4, repeat: Infinity, ease: "easeInOut" },
                  y: { delay: 2 + i * 0.3, duration: 6, repeat: Infinity, ease: "easeInOut" },
                  skewY: { delay: 2 + i * 0.3, duration: 6, repeat: Infinity, ease: "easeInOut" },
                }}
                className="font-light uppercase tabular-nums"
                style={{
                  fontSize: "clamp(2.25rem, 9vw, 7rem)",
                  color: "var(--beta-fg-strong)",
                  fontFamily: "var(--font-tactical), var(--font-sans), sans-serif",
                  fontWeight: 200,
                  display: "inline-block",
                }}
              >
                {letter}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Σ LAB — placed BELOW TAUNGOO with side rules */}
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} className="mt-4 flex items-center justify-center gap-3">
          <span className="h-px w-8 sm:w-16" style={{ background: "rgba(212, 175, 55, 0.4)" }} />
          <span className="font-mono uppercase" style={{ color: "var(--beta-accent)", fontSize: "clamp(0.6rem, 1vw, 0.75rem)", letterSpacing: "0.4em", fontWeight: 600 }}>Σ LAB</span>
          <span className="h-px w-8 sm:w-16" style={{ background: "rgba(212, 175, 55, 0.4)" }} />
        </motion.div>

        {/* Tagline */}
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0 }} className="mt-6 sm:mt-8 max-w-xl text-center font-mono text-[13px] sm:text-sm leading-relaxed" style={{ color: "var(--beta-fg)", letterSpacing: "0.05em", fontWeight: 500 }}>
          We build AI systems, Web3 protocols, and full-stack platforms.
        </motion.p>

        {/* CTA — ghost-style with fill animation + magnetic attraction */}
        <motion.a
          ref={ctaRef}
          href="#services"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          whileTap={{ scale: 0.96 }}
          className="bs-cta-ghost bs-magnetic mt-8 sm:mt-10 inline-flex items-center gap-2 px-7 py-3 font-mono text-[11px] font-medium uppercase tracking-[0.2em] relative overflow-hidden"
          style={{
            color: "var(--beta-accent)",
            borderRadius: "1px",
            border: "1px solid var(--beta-accent)",
            background: "transparent",
          }}
        >
          <span className="relative z-10 flex items-center gap-2">
            Explore Services <span aria-hidden="true">→</span>
          </span>
        </motion.a>
      </div>

      {/* BOOT LOG + SCI-FI DATA VIZ — bottom-left (desktop only) */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.6 }}
        className="hidden lg:flex absolute bottom-16 left-[88px] flex-col gap-2 pointer-events-none max-w-[320px]"
      >
        {/* Sci-fi spectrum analyzer — sharp rectangular bars, no rounding */}
        <div className="relative">
          {/* Label row */}
          <div className="flex items-center justify-between mb-1">
            <span className="font-mono text-[9px] uppercase tracking-[0.2em]" style={{ color: "var(--beta-fg-subtle)" }}>SIGNAL · THROUGHPUT</span>
            <span className="font-mono text-[10px] tabular-nums" style={{ color: "var(--beta-accent)" }}>
              {(throughputBars[throughputBars.length - 1] * 12.7).toFixed(0)}/s
            </span>
          </div>
          {/* Spectrum bars — sharp edges, no border-radius, serious look */}
          <div className="bs-spectrum-bar flex items-end gap-[1px] h-10 relative" style={{ background: "rgba(212,175,55,0.03)", padding: "2px" }}>
            {/* Grid lines for sci-fi feel */}
            <div className="absolute inset-0 pointer-events-none" style={{
              backgroundImage: "repeating-linear-gradient(to right, transparent 0, transparent 19px, rgba(212,175,55,0.08) 19px, rgba(212,175,55,0.08) 20px)",
            }} />
            {throughputBars.map((h, i) => (
              <div
                key={i}
                className="bs-spectrum-bar flex-1 min-w-[2px] relative"
                style={{
                  height: `${h}%`,
                  background: i === throughputBars.length - 1
                    ? "var(--beta-accent)"
                    : `rgba(212, 175, 55, ${0.2 + (i / throughputBars.length) * 0.6})`,
                  boxShadow: i === throughputBars.length - 1 ? "0 0 6px rgba(212, 175, 55, 0.6)" : "none",
                  transition: `height var(--dur-slow) var(--ease-out-expo)`,
                }}
              >
                {/* Peak marker on latest bar */}
                {i === throughputBars.length - 1 && (
                  <div className="absolute -top-1 left-0 right-0 h-[2px]" style={{ background: "var(--beta-accent)", boxShadow: "0 0 4px var(--beta-accent)" }} />
                )}
              </div>
            ))}
          </div>
          {/* Frequency labels */}
          <div className="flex justify-between mt-0.5">
            <span className="font-mono text-[7px] tabular-nums" style={{ color: "var(--beta-fg-subtle)" }}>0Hz</span>
            <span className="font-mono text-[7px] tabular-nums" style={{ color: "var(--beta-fg-subtle)" }}>250Hz</span>
            <span className="font-mono text-[7px] tabular-nums" style={{ color: "var(--beta-fg-subtle)" }}>500Hz</span>
            <span className="font-mono text-[7px] tabular-nums" style={{ color: "var(--beta-fg-subtle)" }}>1kHz</span>
          </div>
        </div>

        {/* SVG waveform graph — sci-fi ECG-style line, full length always visible */}
        <div className="mt-1">
          <div className="flex items-center justify-between mb-1">
            <span className="font-mono text-[9px] uppercase tracking-[0.2em]" style={{ color: "var(--beta-fg-subtle)" }}>SYS · PULSE</span>
            <span className="font-mono text-[9px] tabular-nums" style={{ color: "var(--beta-accent)" }}>72 BPM</span>
          </div>
          <svg viewBox="0 0 280 40" width="100%" height="32" aria-hidden="true" className="overflow-visible">
            {/* Grid */}
            <line x1="0" y1="20" x2="280" y2="20" stroke="rgba(212,175,55,0.08)" strokeWidth="1" />
            <line x1="0" y1="10" x2="280" y2="10" stroke="rgba(212,175,55,0.04)" strokeWidth="1" strokeDasharray="2 4" />
            <line x1="0" y1="30" x2="280" y2="30" stroke="rgba(212,175,55,0.04)" strokeWidth="1" strokeDasharray="2 4" />
            {/* ECG-style waveform — static path, always full length */}
            <polyline
              points="0,20 20,20 25,20 28,18 30,22 33,20 50,20 55,20 58,10 60,30 63,20 80,20 100,20 105,20 108,18 110,22 113,20 130,20 135,20 138,8 140,32 143,20 160,20 180,20 185,20 188,18 190,22 193,20 210,20 215,20 218,10 220,30 223,20 240,20 260,20 265,20 268,18 270,22 273,20 280,20"
              fill="none"
              stroke="var(--beta-accent)"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ filter: "drop-shadow(0 0 3px rgba(212,175,55,0.6))" }}
            />
          </svg>
        </div>

        {/* Boot log — full text always visible, no typing animation, no expansion */}
        <div className="mt-1 font-mono text-[10px] leading-relaxed" style={{ color: "var(--beta-fg-muted)" }}>
          <span style={{ color: "var(--beta-accent)" }}>&gt; sigma.core boot — 27 services online · 9 deployments live · MMXVI</span>
        </div>
      </motion.div>

      {/* RADAR SWEEP — bottom-right mini radar (desktop only) */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.0, duration: 0.6 }}
        className="hidden lg:block absolute bottom-16 right-[3%] pointer-events-none"
      >
        <svg viewBox="0 0 80 80" width="72" height="72" aria-hidden="true">
          {/* Concentric circles */}
          <circle cx="40" cy="40" r="36" fill="none" stroke="rgba(212, 175, 55, 0.15)" strokeWidth="1" />
          <circle cx="40" cy="40" r="24" fill="none" stroke="rgba(212, 175, 55, 0.15)" strokeWidth="1" />
          <circle cx="40" cy="40" r="12" fill="none" stroke="rgba(212, 175, 55, 0.15)" strokeWidth="1" />
          {/* Crosshairs */}
          <line x1="4" y1="40" x2="76" y2="40" stroke="rgba(212, 175, 55, 0.1)" strokeWidth="1" />
          <line x1="40" y1="4" x2="40" y2="76" stroke="rgba(212, 175, 55, 0.1)" strokeWidth="1" />
          {/* Radar sweep — rotating conic gradient via SVG */}
          <defs>
            <linearGradient id="radar-sweep" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(212, 175, 55, 0)" />
              <stop offset="100%" stopColor="rgba(212, 175, 55, 0.6)" />
            </linearGradient>
          </defs>
          <g style={{ transformOrigin: "40px 40px", animation: "bs-radar-rotate 4s linear infinite" }}>
            <path d="M 40 40 L 76 40 A 36 36 0 0 0 56 8 Z" fill="url(#radar-sweep)" opacity="0.7" />
          </g>
          {/* Contact dots */}
          <circle cx="52" cy="28" r="1.5" fill="var(--beta-accent)" />
          <circle cx="32" cy="48" r="1.5" fill="var(--beta-accent)" opacity="0.7" />
          <circle cx="56" cy="56" r="1.5" fill="var(--beta-accent)" opacity="0.5" />
          {/* Center dot */}
          <circle cx="40" cy="40" r="2" fill="var(--beta-accent)" />
        </svg>
        <div className="mt-2 flex items-center justify-between">
          <span className="font-mono text-[9px] uppercase tracking-[0.2em]" style={{ color: "var(--beta-fg-subtle)" }}>SCAN</span>
          <span className="font-mono text-[9px] tabular-nums" style={{ color: "var(--beta-accent)" }}>3 CONTACTS</span>
        </div>
      </motion.div>

      {/* Animated pulse line from bottom-left corner */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.6 }}
        className="hidden sm:block absolute bottom-0 left-0 pointer-events-none"
        style={{ width: "40%", height: "1px" }}
      >
        <motion.div
          animate={{ scaleX: [0, 1, 1, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="h-full origin-left"
          style={{ background: "linear-gradient(to right, var(--beta-accent), transparent)" }}
        />
        {/* Pulse dot at the start */}
        <motion.span
          animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.5, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-0 top-1/2 -translate-y-1/2 h-1.5 w-1.5 rounded-full"
          style={{ background: "var(--beta-accent)", boxShadow: "0 0 8px var(--beta-accent)" }}
        />
      </motion.div>

      {/* Scroll indicator — lifted above the ticker band */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="absolute bottom-12 left-1/2 -translate-x-1/2 z-[3]">
        <div className="flex flex-col items-center gap-1">
          <span className="font-mono text-[8px] uppercase tracking-[0.3em]" style={{ color: "var(--beta-fg-subtle)" }}>SCROLL</span>
          <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="h-6 w-px" style={{ background: "rgba(212, 175, 55, 0.3)" }} />
        </div>
      </motion.div>

      {/* Bottom ticker — thin gold band of keywords (CSS marquee, 30s loop, pause on hover).
          Sits at the very bottom of the hero, fade-masked at edges so it doesn't collide
          with the corner brackets or other HUD elements. Pointer-events enabled so the
          hover pause works; reduced-motion users get a static strip. */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.4, duration: 0.8 }}
        className="absolute bottom-0 left-0 right-0 z-[2] pointer-events-none"
        style={{
          height: "26px",
          background: "linear-gradient(to top, var(--beta-bg) 55%, rgba(5,5,8,0.3) 85%, transparent)",
          borderTop: "1px solid rgba(212, 175, 55, 0.10)",
        }}
        aria-hidden="true"
      >
        <div className="beta-ticker h-full">
          <div className="beta-ticker-track h-full">
            {[...tickerKeywords, ...tickerKeywords, ...tickerKeywords, ...tickerKeywords, ...tickerKeywords, ...tickerKeywords, ...tickerKeywords, ...tickerKeywords].map((kw, i) => (
              <React.Fragment key={i}>
                <span className="font-mono text-[10px] uppercase tracking-[0.35em]" style={{ color: "var(--beta-accent)", opacity: 0.85 }}>{kw}</span>
                <span className="font-mono text-[10px]" style={{ color: "var(--beta-fg-subtle)", opacity: 0.4 }}>·</span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
