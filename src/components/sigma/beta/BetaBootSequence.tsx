"use client";

import * as React from "react";
import { motion, AnimatePresence } from "motion/react";

/**
 * BetaBootSequence — cinematic sci-fi boot sequence.
 *
 * Multi-phase boot:
 * Phase 1 (0-1.2s): Black screen → gold scanline sweeps down → TAUNGOO Σ logo appears
 * Phase 2 (1.2-3s): Boot log lines type in (terminal style) with progress bar
 * Phase 3 (3-3.5s): "SYSTEMS NOMINAL" flashes → gold flash
 * Phase 4 (3.5-4s): Overlay splits into panels and slides apart (reveal animation)
 *
 * Only shows once per session (sessionStorage).
 */
const BOOT_LINES = [
  { text: "sigma.core v2.7.Σ", status: "BOOT", delay: 1200 },
  { text: "loading 27 services", status: "OK", delay: 1380 },
  { text: "loading 9 deployments", status: "OK", delay: 1560 },
  { text: "mounting HUD layers", status: "OK", delay: 1740 },
  { text: "calibrating reticle scope", status: "OK", delay: 1920 },
  { text: "establishing uplink", status: "LOCKED", delay: 2100 },
  { text: "TAU-Σ-0027 online", status: "READY", delay: 2400 },
];

export function BetaBootSequence() {
  const [phase, setPhase] = React.useState<0 | 1 | 2 | 3 | 4>(1);
  const [visibleLines, setVisibleLines] = React.useState(0);
  const [progress, setProgress] = React.useState(0);
  const [active, setActive] = React.useState(true);

  React.useEffect(() => {
    if (typeof window === "undefined") return;
    const seen = sessionStorage.getItem("beta-boot-seen");
    if (seen) {
      setActive(false);
      return;
    }
    sessionStorage.setItem("beta-boot-seen", "1");

    const timers: ReturnType<typeof setTimeout>[] = [];

    // Phase 1: Scanline sweep + logo (0 → 1.2s)
    timers.push(setTimeout(() => setPhase(1), 100));
    timers.push(setTimeout(() => setPhase(2), 1200)); // Start boot log

    // Phase 2: Boot log lines + progress bar (1.2s → 3s)
    BOOT_LINES.forEach((line, i) => {
      timers.push(setTimeout(() => setVisibleLines(i + 1), line.delay));
    });
    // Animate progress bar
    const progressInterval = setInterval(() => {
      setProgress((p) => Math.min(100, p + 3));
    }, 50);
    timers.push(setTimeout(() => clearInterval(progressInterval), 2500) as unknown as ReturnType<typeof setTimeout>);

    // Phase 3: SYSTEMS NOMINAL flash (3s → 3.5s)
    timers.push(setTimeout(() => {
      setPhase(3);
      clearInterval(progressInterval);
      setProgress(100);
    }, 3000));

    // Phase 4: Split reveal (3.5s → 4s)
    timers.push(setTimeout(() => setPhase(4), 3500));

    // Complete (4.2s)
    timers.push(setTimeout(() => setPhase(0), 4200));

    return () => {
      timers.forEach(clearTimeout);
      clearInterval(progressInterval);
    };
  }, []);

  if (!active || phase === 0) return null;

  return (
    <AnimatePresence>
      {phase > 0 && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[300] overflow-hidden"
          style={{ background: "var(--beta-bg)" }}
          aria-hidden="true"
        >
          {/* PHASE 4: Split panels reveal — 4 panels slide apart */}
          {phase === 4 && (
            <div className="absolute inset-0 flex">
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  initial={{ y: 0 }}
                  animate={{ y: i % 2 === 0 ? "-100%" : "100%" }}
                  transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1], delay: i * 0.04 }}
                  className="flex-1"
                  style={{
                    background: "var(--beta-bg)",
                    borderRight: i < 3 ? "1px solid rgba(212,175,55,0.1)" : "none",
                  }}
                />
              ))}
            </div>
          )}

          {/* Phase 1: Scanline sweep — gold line sweeps top to bottom */}
          {phase === 1 && (
            <>
              <motion.div
                initial={{ top: "-10%" }}
                animate={{ top: "110%" }}
                transition={{ duration: 1.0, ease: "easeInOut" }}
                className="absolute inset-x-0 h-[30%]"
                style={{
                  background: "linear-gradient(to bottom, transparent, rgba(212,175,55,0.06), transparent)",
                }}
              />
              {/* Center logo reveal */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="absolute inset-0 flex flex-col items-center justify-center"
              >
                <motion.span
                  initial={{ letterSpacing: "0.5em", opacity: 0 }}
                  animate={{ letterSpacing: "0.15em", opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="font-bold uppercase"
                  style={{
                    fontSize: "clamp(2rem, 8vw, 5rem)",
                    color: "var(--beta-fg-strong)",
                    fontFamily: "var(--font-tactical), var(--font-sans), sans-serif",
                    fontWeight: 200,
                    textShadow: "0 0 40px rgba(212,175,55,0.2)",
                  }}
                >
                  TAUNGOO
                </motion.span>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: "120px" }}
                  transition={{ delay: 0.8, duration: 0.4 }}
                  className="mt-3 h-px"
                  style={{ background: "var(--beta-accent)" }}
                />
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.0, duration: 0.3 }}
                  className="mt-2 font-mono text-[10px] uppercase tracking-[0.4em]"
                  style={{ color: "var(--beta-accent)" }}
                >
                  Σ LAB
                </motion.span>
              </motion.div>
            </>
          )}

          {/* Phase 2 + 3: Boot log terminal */}
          {(phase === 2 || phase === 3) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 flex flex-col items-center justify-center px-[6%]"
            >
              {/* Corner brackets */}
              <span className="absolute left-6 top-6 h-5 w-5 border-l border-t" style={{ borderColor: "rgba(212, 175, 55, 0.5)" }} />
              <span className="absolute right-6 top-6 h-5 w-5 border-r border-t" style={{ borderColor: "rgba(212, 175, 55, 0.5)" }} />
              <span className="absolute bottom-6 left-6 h-5 w-5 border-b border-l" style={{ borderColor: "rgba(212, 175, 55, 0.5)" }} />
              <span className="absolute bottom-6 right-6 h-5 w-5 border-b border-r" style={{ borderColor: "rgba(212, 175, 55, 0.5)" }} />

              {/* Top status bar */}
              <div className="mb-6 flex w-full max-w-xl items-center gap-3">
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  className="inline-block text-[14px]"
                  style={{ color: "var(--beta-accent)" }}
                >
                  ◴
                </motion.span>
                <span className="font-mono text-[11px] uppercase tracking-[0.3em]" style={{ color: "var(--beta-accent)" }}>
                  {phase === 3 ? "SYSTEMS NOMINAL" : "BOOTING"}
                </span>
                <span className="h-px flex-1" style={{ background: "rgba(212, 175, 55, 0.15)" }} />
                <span className="font-mono text-[10px] tabular-nums" style={{ color: "var(--beta-fg-subtle)" }}>
                  {Math.round(progress)}%
                </span>
              </div>

              {/* Boot log lines */}
              <div className="w-full max-w-xl space-y-1.5">
                {BOOT_LINES.slice(0, visibleLines).map((line, i) => {
                  const isLast = i === visibleLines - 1 && phase !== 3;
                  const isReady = line.status === "READY";
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.15 }}
                      className="flex items-center gap-3 font-mono text-[11px] sm:text-[13px]"
                    >
                      <span style={{ color: "var(--beta-fg-subtle)" }}>▸</span>
                      <span
                        className="flex-1"
                        style={{
                          color: isReady ? "var(--beta-accent)" : "var(--beta-fg-muted)",
                          fontWeight: isReady ? 600 : 400,
                        }}
                      >
                        {line.text}
                      </span>
                      <span
                        className="text-[10px] uppercase tracking-[0.1em] px-1.5 py-0.5"
                        style={{
                          color: line.status === "READY" ? "var(--beta-accent)" : line.status === "OK" ? "var(--beta-accent-3)" : line.status === "LOCKED" ? "var(--beta-accent-2)" : "var(--beta-fg-subtle)",
                        }}
                      >
                        {line.status}
                      </span>
                      {isLast && <span className="bs-blink" />}
                    </motion.div>
                  );
                })}
              </div>

              {/* Progress bar */}
              <div className="mt-5 w-full max-w-xl">
                <div className="h-[2px] w-full overflow-hidden" style={{ background: "rgba(212,175,55,0.08)" }}>
                  <motion.div
                    className="h-full"
                    style={{
                      width: `${progress}%`,
                      background: "linear-gradient(to right, rgba(212,175,55,0.4), var(--beta-accent))",
                      boxShadow: "0 0 8px rgba(212,175,55,0.6)",
                    }}
                  />
                </div>
                <div className="mt-1 flex justify-between">
                  <span className="font-mono text-[8px] uppercase tracking-[0.2em]" style={{ color: "var(--beta-fg-subtle)" }}>
                    SIGMA CORE · INITIALIZING
                  </span>
                  <span className="font-mono text-[8px] tabular-nums" style={{ color: "var(--beta-fg-subtle)" }}>
                    {progress < 100 ? "LOADING…" : "COMPLETE"}
                  </span>
                </div>
              </div>

              {/* Phase 3: Gold flash */}
              {phase === 3 && (
                <motion.div
                  initial={{ opacity: 0.6 }}
                  animate={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                  style={{ background: "radial-gradient(ellipse at center, rgba(212,175,55,0.15), transparent 60%)" }}
                />
              )}

              {/* Hexagon decoration — rotating */}
              <motion.svg
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                className="absolute opacity-[0.04]"
                width="400"
                height="400"
                viewBox="0 0 100 100"
                aria-hidden="true"
              >
                <polygon points="50,5 90,27 90,73 50,95 10,73 10,27" fill="none" stroke="var(--beta-accent)" strokeWidth="0.5" />
                <polygon points="50,15 82,32 82,68 50,85 18,68 18,32" fill="none" stroke="var(--beta-accent)" strokeWidth="0.3" />
              </motion.svg>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
