"use client";

import * as React from "react";
import { X, Send, Mail, MapPin, Phone, Github } from "lucide-react";
import { toast } from "sonner";

const CHANNELS = ["RESEARCH", "PARTNERSHIP", "CAREER", "PRESS", "OTHER"];
const BUDGETS = ["< 3M MMK", "3M - 10M MMK", "10M - 30M MMK", "30M+ MMK", "CUSTOM"];

/**
 * ContactFormModal — a branded popup contact form for detail pages.
 * Triggered by "CONTACT OUR TEAM →" buttons on service/portfolio detail pages.
 * Features a sci-fi brutalist design with cut-corner clip-path, scanlines,
 * and the same aesthetic as the Alpha mode Section 10 contact form.
 */
export function ContactFormModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [channel, setChannel] = React.useState("RESEARCH");
  const [budget, setBudget] = React.useState("3M - 10M MMK");
  const [identity, setIdentity] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);
  const [logLines, setLogLines] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (!open) {
      // Reset form when closed
      setIdentity("");
      setMessage("");
      setLogLines([]);
      setSubmitting(false);
    }
  }, [open]);

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  const submit = async () => {
    if (!identity.trim() || !message.trim()) {
      toast.error("IDENTITY + MESSAGE REQUIRED");
      return;
    }
    setSubmitting(true);
    setLogLines([]);
    const steps = [
      "> establishing secure channel...",
      "> handshake: OK",
      "> encrypting payload...",
      "> transmitting...",
      "> sigma acknowledged.",
    ];
    for (let i = 0; i < steps.length; i++) {
      await new Promise((r) => setTimeout(r, 300));
      setLogLines((l) => [...l, steps[i]]);
    }
    try {
      const res = await fetch("/api/sigma/transmit?XTransformPort=3000", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identity, channel, budget, message }),
      });
      const data = await res.json();
      if (data.ok) {
        setLogLines((l) => [...l, `> ref: ${data.ref}`, "> transmission complete."]);
        toast.success("▮ TRANSMITTED · SIGMA ACK");
        setMessage("");
      }
    } catch {
      setLogLines((l) => [...l, "> ERROR: channel refused"]);
    } finally {
      setSubmitting(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 sm:p-8" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-background/90 backdrop-blur-md" />

      {/* Modal */}
      <div
        className="relative z-10 max-h-[85vh] w-full max-w-2xl overflow-y-auto border-2 border-[#FF4500]/40 bg-card shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)]"
        style={{ clipPath: "polygon(16px 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%, 0 16px)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top accent bar */}
        <div className="h-1 w-full bg-[#FF4500]" />

        {/* Header */}
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-border bg-card/95 px-6 py-3 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <span className="sigma-pulse h-1.5 w-1.5 bg-[#00FF94]" />
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">SECURE TERMINAL</span>
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[#00FF94]">ONLINE</span>
          </div>
          <button onClick={onClose} className="border border-border px-2 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:bg-foreground/10 hover:text-foreground">
            <X className="h-3 w-3" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#FF4500]">▸ OPEN CHANNEL</div>
          <h2 className="mt-2 font-sans text-3xl font-black uppercase tracking-tight">
            LET'S BUILD <span style={{ color: "#FF4500" }}>SOMETHING.</span>
          </h2>
          <p className="mt-2 font-serif text-sm italic text-muted-foreground">
            Transmit your signal. We respond within 72 hours on all channels.
          </p>

          {/* Form */}
          <div className="mt-6 space-y-4">
            {/* Identity */}
            <div>
              <label className="mb-1 block font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground">
                ▸ IDENTITY HANDLE / EMAIL
              </label>
              <input
                value={identity}
                onChange={(e) => setIdentity(e.target.value)}
                placeholder="e.g. @your-handle or you@company.com"
                className="w-full border border-border bg-background px-3 py-2.5 font-mono text-sm text-foreground outline-none transition focus:border-[#FF4500] focus:bg-[#FF45000a]"
              />
            </div>

            {/* Channel */}
            <div>
              <label className="mb-1 block font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground">
                ▸ CHANNEL
              </label>
              <div className="flex flex-wrap gap-1">
                {CHANNELS.map((c) => (
                  <button
                    key={c}
                    onClick={() => setChannel(c)}
                    className={`border px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.18em] transition ${
                      channel === c
                        ? "border-[#FF4500] bg-[#FF4500] text-black"
                        : "border-border text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* Budget */}
            <div>
              <label className="mb-1 block font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground">
                ▸ BUDGET RANGE
              </label>
              <div className="flex flex-wrap gap-1">
                {BUDGETS.map((b) => (
                  <button
                    key={b}
                    onClick={() => setBudget(b)}
                    className={`border px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.18em] transition ${
                      budget === b
                        ? "border-[#FFB300] bg-[#FFB300] text-black"
                        : "border-border text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="mb-1 block font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground">
                ▸ ENCRYPTED MESSAGE
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="> describe your project, timeline, and budget..."
                rows={4}
                className="w-full resize-none border border-border bg-background px-3 py-2.5 font-mono text-sm leading-relaxed text-foreground outline-none transition focus:border-[#FF4500] focus:bg-[#FF45000a]"
              />
            </div>

            {/* Transmit log */}
            {logLines.length > 0 && (
              <div className="border border-border/60 bg-black p-2 font-mono text-[10px] leading-relaxed text-[#00FF94] h-20 overflow-y-auto">
                {logLines.map((l, i) => <div key={i}>{l}</div>)}
                {submitting && <span className="sigma-blink">▮</span>}
              </div>
            )}

            {/* Submit */}
            <button
              onClick={submit}
              disabled={submitting}
              className="w-full border border-[#FF4500] bg-[#FF4500] py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-black transition-opacity hover:opacity-80 disabled:opacity-50"
            >
              <Send className="mr-2 inline h-3.5 w-3.5" />
              {submitting ? "▮ TRANSMITTING..." : "◂ TRANSMIT MESSAGE ▸"}
            </button>
          </div>

          {/* Footer info */}
          <div className="mt-4 flex flex-wrap items-center gap-4 border-t border-border/40 pt-3 font-mono text-[8px] uppercase tracking-[0.14em] text-muted-foreground">
            <span className="flex items-center gap-1"><Mail className="h-3 w-3" /> contact@taungoosigma.lab</span>
            <span className="flex items-center gap-1"><Phone className="h-3 w-3" /> +95 · on request</span>
            <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> Yangon, MM</span>
            <span className="text-[#00FF94]">▮ RESPONSE: 72H</span>
          </div>
        </div>

        {/* Bottom accent */}
        <div className="h-1 w-full bg-[#FF4500]" />

        {/* Corner brackets */}
        <span className="pointer-events-none absolute left-0 top-0 h-5 w-5 border-l-2 border-t-2 border-[#FF4500]/60" />
        <span className="pointer-events-none absolute right-0 bottom-0 h-5 w-5 border-b-2 border-r-2 border-[#FF4500]/60" />
      </div>
    </div>
  );
}
