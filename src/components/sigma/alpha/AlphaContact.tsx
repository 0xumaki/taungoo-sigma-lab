"use client";

import * as React from "react";
import { toast } from "sonner";

const CHANNELS = ["RESEARCH", "PARTNERSHIP", "CAREER", "PRESS", "OTHER"];
const SERVICES = ["AI Chatbot", "Voice AI", "Agent Swarm", "AI Automation", "Web3 Wallets", "Smart Contract", "Web/WebApp", "Mobile App", "Other"];
const BUDGETS = ["< 3M MMK", "3M - 10M MMK", "10M - 30M MMK", "30M+ MMK", "CUSTOM"];

export function AlphaContact() {
  const [channel, setChannel] = React.useState("RESEARCH");
  const [service, setService] = React.useState("AI Chatbot");
  const [budget, setBudget] = React.useState("3M - 10M MMK");
  const [identity, setIdentity] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [transmitting, setTransmitting] = React.useState(false);
  const [logLines, setLogLines] = React.useState<string[]>([]);

  const transmit = async () => {
    if (!identity.trim() || !message.trim()) {
      toast.error("IDENTITY + MESSAGE REQUIRED");
      return;
    }
    setTransmitting(true);
    setLogLines([]);
    const steps = [
      "> establish secure channel...",
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
        body: JSON.stringify({ identity, channel, service, budget, message }),
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
      setTransmitting(false);
    }
  };

  return (
    <section id="contact" className="relative border-t border-border px-3 py-20">
      <div className="sigma-grid pointer-events-none absolute inset-0 opacity-10" />
      <div className="sigma-scanlines pointer-events-none absolute inset-0 opacity-15" />

      <div className="relative z-10 mx-auto w-full max-w-[1600px]">
        {/* Header */}
        <div className="flex items-end justify-between gap-4 border-b border-border pb-4">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#FF4500]">▸ 10 / CONTACT</div>
            <h2 className="mt-2 font-sans text-4xl font-black uppercase tracking-tight sm:text-6xl">
              LET'S BUILD <span style={{ color: "#FF4500" }}>SOMETHING.</span>
            </h2>
          </div>
          <div className="hidden shrink-0 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground sm:block">
            RESPONSE: 72H<br />ENCRYPTION: AES-256
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 items-stretch gap-6 lg:grid-cols-2">
          {/* Left: Contact form — sci-fi terminal style */}
          <div className="alpha-card-hover flex flex-col border border-border bg-card/40" style={{ "--sigma-hover-accent": "#FF4500" } as React.CSSProperties}>
            {/* Terminal header */}
            <div className="flex items-center justify-between border-b border-border/60 px-4 py-2">
              <div className="flex items-center gap-2">
                <span className="sigma-pulse h-1.5 w-1.5 bg-[#00FF94]" />
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">SECURE TERMINAL</span>
              </div>
              <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-[#00FF94]">ONLINE</span>
            </div>

            {/* Form body — flex-1 so the form stretches to match the right column height */}
            <div className="flex flex-1 flex-col p-4 gap-4">
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

              {/* Channel selector */}
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

              {/* Service selector */}
              <div>
                <label className="mb-1 block font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground">
                  ▸ SERVICE INTEREST
                </label>
                <div className="flex flex-wrap gap-1">
                  {SERVICES.map((s) => (
                    <button
                      key={s}
                      onClick={() => setService(s)}
                      className={`border px-2 py-0.5 font-mono text-[8px] uppercase tracking-[0.14em] transition ${
                        service === s
                          ? "border-[#00FF94] bg-[#00FF94] text-black"
                          : "border-border text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Budget range selector */}
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

              {/* Message — flex-1 so textarea grows to fill remaining space */}
              <div className="flex flex-1 flex-col">
                <label className="mb-1 block font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground">
                  ▸ ENCRYPTED MESSAGE
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="> describe your project, timeline, and budget..."
                  className="min-h-[120px] w-full flex-1 resize-none border border-border bg-background px-3 py-2.5 font-mono text-sm leading-relaxed text-foreground outline-none transition focus:border-[#FF4500] focus:bg-[#FF45000a]"
                />
              </div>

              {/* Transmit log */}
              <div className="border border-border/60 bg-black p-2 font-mono text-[10px] leading-relaxed text-[#00FF94] h-20 overflow-y-auto sigma-scroll-hidden">
                {logLines.length === 0 ? (
                  <span className="text-muted-foreground">▮ standing by. compose + transmit to open channel.</span>
                ) : (
                  logLines.map((l, i) => <div key={i}>{l}</div>)
                )}
                {transmitting && <span className="sigma-blink">▮</span>}
              </div>

              {/* Transmit button */}
              <button
                onClick={transmit}
                disabled={transmitting}
                className="w-full border border-[#FF4500] bg-[#FF4500] py-3 font-mono text-[11px] uppercase tracking-[0.2em] text-black transition-opacity hover:opacity-80 disabled:opacity-50"
              >
                {transmitting ? "▮ TRANSMITTING..." : "◂ TRANSMIT MESSAGE ▸"}
              </button>
            </div>
          </div>

          {/* Right: Contact info panels — flex column that stretches to match left column height */}
          <div className="flex h-full flex-col gap-3">
            {/* Direct channels — flex-1 so it grows */}
            <div className="alpha-card-hover flex flex-1 flex-col border border-border bg-card/40 p-4" style={{ "--sigma-hover-accent": "#FF4500" } as React.CSSProperties}>
              <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#FF4500]">▸ DIRECT CHANNELS</div>
              <div className="mt-3 flex-1 divide-y divide-border/40">
                {[
                  ["EMAIL", "contact@taungoosigma.lab", "#00FF94"],
                  ["PHONE", "+95 · on request", "#00E5FF"],
                  ["GITHUB", "[ ACCESS RESTRICTED ]", "#C6FF00"],
                  ["LOCATION", "Taungoo, Bago Region, MM", "#FF2D7E"],
                ].map(([k, v, c]) => (
                  <div key={k} className="flex items-center gap-3 py-2.5">
                    <span className="h-2 w-2" style={{ background: c }} />
                    <span className="w-20 font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">{k}</span>
                    <span className="flex-1 font-mono text-sm text-foreground">{v}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Response time panel */}
            <div className="alpha-card-hover border border-border bg-card/40 p-4" style={{ "--sigma-hover-accent": "#00E5FF" } as React.CSSProperties}>
              <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#00E5FF]">▸ RESPONSE PROTOCOL</div>
              <div className="mt-3 grid grid-cols-3 gap-2">
                {[
                  ["72H", "RESPONSE TIME", "#FF4500"],
                  ["24/7", "SUPPORT", "#00FF94"],
                  ["AES-256", "ENCRYPTION", "#00E5FF"],
                ].map(([v, k, c]) => (
                  <div key={k} className="border border-border/40 p-2 text-center">
                    <div className="font-sans text-xl font-black" style={{ color: c }}>{v}</div>
                    <div className="font-mono text-[8px] uppercase tracking-[0.14em] text-muted-foreground">{k}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Access tier — flex-1 so it grows */}
            <div className="alpha-card-hover flex flex-1 flex-col border border-border bg-card/40 p-4" style={{ "--sigma-hover-accent": "#00FF94" } as React.CSSProperties}>
              <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#00FF94]">▸ ACCESS TIER</div>
              <p className="mt-2 flex-1 font-serif text-sm italic text-muted-foreground">
                Lab access is tiered. Public-read is open to all. Write access is earned through the sigma-review process — submit a credible signal and the collective will respond. All channels are monitored. We do not sell, share, or train on your signal.
              </p>
              <div className="mt-3 flex gap-2">
                <span className="border border-[#00FF94]/40 px-2 py-0.5 font-mono text-[8px] uppercase tracking-[0.14em] text-[#00FF94]">PUBLIC READ</span>
                <span className="border border-border px-2 py-0.5 font-mono text-[8px] uppercase tracking-[0.14em] text-muted-foreground">WRITE: EARNED</span>
              </div>
            </div>

            {/* Sigma stamp */}
            <div className="alpha-card-hover flex items-center justify-center border border-border/40 p-4" style={{ "--sigma-hover-accent": "#FF4500" } as React.CSSProperties}>
              <span className="sigma-spin-slow mr-3 font-sans text-4xl font-black text-[#FF4500]">Σ</span>
              <div className="text-center">
                <div className="font-sans text-lg font-black uppercase">TAUNGOO SIGMA LAB</div>
                <div className="font-mono text-[8px] uppercase tracking-[0.2em] text-muted-foreground">© MMXXIV · ALL SYSTEMS NOMINAL</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
