"use client";

import * as React from "react";

/**
 * BetaReticleCursor — sci-fi red dot scope cursor.
 *
 * Design:
 * - Red center dot (4px, instant follow, no lag)
 * - Outer scope ring (24px, red, thin border)
 * - 4 crosshair tick marks (top/right/bottom/left of ring, short red lines)
 * - On hover over interactive elements:
 *   - Ring expands to 40px
 *   - Crosshair ticks extend slightly
 *   - Red glow intensifies
 * - On mousedown: ring contracts to 16px (scope "focus" effect)
 *
 * STABLE — zero React state updates during mousemove:
 * - Position via direct style.left/style.top
 * - Size changes via CSS body classes (cursor-hovering, cursor-pressed)
 * - No RAF loop, no setState in event handlers
 */
export function BetaReticleCursor() {
  const dotRef = React.useRef<HTMLDivElement>(null);
  const ringRef = React.useRef<HTMLDivElement>(null);
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    const wideEnough = window.innerWidth >= 768;
    if (!finePointer || !wideEnough) return;
    setIsMounted(true);

    // Instant position update — no state, no RAF, no lag
    const onMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.left = `${x}px`;
        dotRef.current.style.top = `${y}px`;
        // Ensure visibility on mousemove — mousemove proves the window is active
        // + focused. This fixes the "invisible cursor" bug where the cursor
        // stayed at opacity:0 because the window 'focus' event never fired
        // (window was already focused when the component mounted).
        if (dotRef.current.style.opacity !== "1") dotRef.current.style.opacity = "1";
      }
      if (ringRef.current) {
        ringRef.current.style.left = `${x}px`;
        ringRef.current.style.top = `${y}px`;
        if (ringRef.current.style.opacity !== "1") ringRef.current.style.opacity = "1";
      }
    };

    // Hover detection — toggle body class (CSS handles size change)
    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = !!target.closest('a, button, input, textarea, select, [data-cursor="hover"], [role="button"]');
      document.body.classList.toggle("cursor-hovering", isInteractive);
    };

    const onDown = () => document.body.classList.add("cursor-pressed");
    const onUp = () => document.body.classList.remove("cursor-pressed");

    // Only hide the cursor when the WINDOW loses focus (blur) — NOT on document
    // mouseleave/mouseenter which fires spuriously when moving over fixed overlays
    // (toasts, modals, mode-switcher panels) and makes the cursor "disappear"
    // (user-reported bug).
    const onBlur = () => {
      if (dotRef.current) dotRef.current.style.opacity = "0";
      if (ringRef.current) ringRef.current.style.opacity = "0";
    };
    const onFocus = () => {
      if (dotRef.current) dotRef.current.style.opacity = "1";
      if (ringRef.current) ringRef.current.style.opacity = "1";
    };

    // Set initial center position + visibility.
    // Use document.hasFocus() for the initial opacity — if the window is already
    // focused (common case), the cursor should be visible immediately. The
    // window 'focus' event won't fire again if the window is already focused.
    const hasFocus = typeof document !== "undefined" && document.hasFocus();
    const initialOpacity = hasFocus ? "1" : "0";
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    if (dotRef.current) { dotRef.current.style.left = `${cx}px`; dotRef.current.style.top = `${cy}px`; dotRef.current.style.opacity = initialOpacity; }
    if (ringRef.current) { ringRef.current.style.left = `${cx}px`; ringRef.current.style.top = `${cy}px`; ringRef.current.style.opacity = initialOpacity; }

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseover", onOver, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    window.addEventListener("blur", onBlur);
    window.addEventListener("focus", onFocus);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.removeEventListener("blur", onBlur);
      window.removeEventListener("focus", onFocus);
      document.body.classList.remove("cursor-hovering", "cursor-pressed");
    };
  }, []);

  if (!isMounted) return null;

  return (
    <>
      {/* Red center dot — 4px, instant follow */}
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed beta-scope-dot"
        style={{
          left: "-2px",
          top: "-2px",
          zIndex: 99999,
          opacity: 0,
          transition: `opacity var(--dur-fast) var(--ease-out-expo)`,
          willChange: "left, top",
        }}
      />
      {/* Outer scope ring + crosshair ticks — 24px, instant follow */}
      <div
        ref={ringRef}
        aria-hidden="true"
        className="pointer-events-none fixed beta-scope-ring"
        style={{
          left: "-12px",
          top: "-12px",
          zIndex: 99998,
          opacity: 0,
          transition: `opacity var(--dur-fast) var(--ease-out-expo), width var(--dur-fast) var(--ease-out-expo), height var(--dur-fast) var(--ease-out-expo), margin var(--dur-fast) var(--ease-out-expo)`,
          willChange: "left, top, width, height",
        }}
      />
    </>
  );
}
