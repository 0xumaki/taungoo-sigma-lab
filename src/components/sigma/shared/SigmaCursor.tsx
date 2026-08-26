"use client";

import * as React from "react";

/**
 * SigmaCursor — a cursor-following targeting reticle (awwwards-style).
 * Renders a fixed crosshair + coordinate readout that lags slightly behind
 * the cursor for an inertial, "tracked target" feel. Hidden on touch devices.
 */
export function SigmaCursor() {
  const dotRef = React.useRef<HTMLDivElement>(null);
  const ringRef = React.useRef<HTMLDivElement>(null);
  const xLineRef = React.useRef<HTMLDivElement>(null);
  const yLineRef = React.useRef<HTMLDivElement>(null);
  const readoutRef = React.useRef<HTMLSpanElement>(null);
  const [enabled, setEnabled] = React.useState(false);
  const [hovering, setHovering] = React.useState(false);

  React.useEffect(() => {
    // Only enable on devices with a fine pointer (mouse)
    const mq = window.matchMedia("(pointer: fine)");
    if (!mq.matches) return;
    setEnabled(true);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      // dot follows instantly
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
      // crosshair lines
      if (xLineRef.current) {
        xLineRef.current.style.top = `${mouseY}px`;
      }
      if (yLineRef.current) {
        yLineRef.current.style.left = `${mouseX}px`;
      }
      // readout
      if (readoutRef.current) {
        const nx = Math.round((mouseX / window.innerWidth) * 1000);
        const ny = Math.round((mouseY / window.innerHeight) * 1000);
        readoutRef.current.textContent = `X${String(nx).padStart(4, "0")} Y${String(ny).padStart(4, "0")}`;
      }
      // detect hover over interactive elements
      const target = e.target as HTMLElement;
      const interactive = target.closest(
        "a, button, [role=button], [data-node], [data-proj], input, textarea, select, [data-cursor=hover]"
      );
      setHovering(!!interactive);
    };

    const loop = () => {
      // ring lags behind for inertial feel
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[95]" aria-hidden>
      {/* full-width crosshair lines */}
      <div
        ref={xLineRef}
        className="absolute inset-x-0 h-px bg-foreground/15"
        style={{ top: "50%" }}
      />
      <div
        ref={yLineRef}
        className="absolute inset-y-0 w-px bg-foreground/15"
        style={{ left: "50%" }}
      />

      {/* center dot (instant) */}
      <div
        ref={dotRef}
        className="absolute left-0 top-0 -ml-[3px] -mt-[3px]"
      >
        <div className="h-1.5 w-1.5 bg-[#FF4500]" />
      </div>

      {/* targeting ring (inertial) */}
      <div
        ref={ringRef}
        className="absolute left-0 top-0 -ml-[16px] -mt-[16px] transition-[width,height,margin] duration-200"
        style={{
          width: hovering ? 56 : 32,
          height: hovering ? 56 : 32,
          marginLeft: hovering ? -28 : -16,
          marginTop: hovering ? -28 : -16,
        }}
      >
        <div className="relative h-full w-full">
          {/* corner brackets */}
          <span className="absolute left-0 top-0 h-2 w-2 border-l border-t border-foreground" />
          <span className="absolute right-0 top-0 h-2 w-2 border-r border-t border-foreground" />
          <span className="absolute bottom-0 left-0 h-2 w-2 border-b border-l border-foreground" />
          <span className="absolute bottom-0 right-0 h-2 w-2 border-b border-r border-foreground" />
          {/* center tick */}
          <span className="absolute left-1/2 top-1/2 h-3 w-px -translate-x-1/2 -translate-y-1/2 bg-foreground/40" />
          <span className="absolute left-1/2 top-1/2 h-px w-3 -translate-x-1/2 -translate-y-1/2 bg-foreground/40" />
        </div>
      </div>

      {/* coordinate readout */}
      <span
        ref={readoutRef}
        className="absolute left-0 top-0 ml-4 mt-4 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground"
      >
        X0000 Y0000
      </span>
    </div>
  );
}
