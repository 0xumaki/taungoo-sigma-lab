"use client";

import * as React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useSigmaStore } from "@/lib/sigma/store";
import { SectionShell } from "../shared/SectionShell";
import { BrutalButton, Panel, Tag } from "../shared/components";
import { SigmaParticles } from "../shared/SigmaParticles";
import { toast } from "sonner";
import { Mail, MapPin, Phone, Github, Send } from "lucide-react";

gsap.registerPlugin(useGSAP);

const CHANNELS = ["RESEARCH", "PARTNERSHIP", "CAREER", "PRESS", "OTHER"];
const TRANSMIT_LOG = [
  "> establish secure channel...",
  "> handshake: OK",
  "> awaiting credentials...",
];

export function S10Access() {
  const { navigate } = useSigmaStore();
  const root = React.useRef<HTMLDivElement>(null);
  const [identity, setIdentity] = React.useState("");
  const [channel, setChannel] = React.useState("RESEARCH");
  const [message, setMessage] = React.useState("");
  const [transmitting, setTransmitting] = React.useState(false);
  const [logLines, setLogLines] = React.useState<string[]>([]);

  useGSAP(
    () => {
      gsap.from("[data-ap]", {
        opacity: 0,
        y: 24,
        duration: 0.55,
        ease: "power3.out",
        stagger: 0.08,
      });
    },
    { scope: root }
  );

  const transmit = async () => {
    if (!identity.trim() || !message.trim()) {
      toast.error("IDENTITY + MESSAGE REQUIRED");
      return;
    }
    setTransmitting(true);
    setLogLines([]);
    for (let i = 0; i < TRANSMIT_LOG.length; i++) {
      await new Promise((r) => setTimeout(r, 350));
      setLogLines((l) => [...l, TRANSMIT_LOG[i]]);
    }
    try {
      const res = await fetch("/api/sigma/transmit?XTransformPort=3000", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identity, channel, message }),
      });
      const data = await res.json();
      if (data.ok) {
        setLogLines((l) => [...l, "> packet transmitted. sigma acknowledged.", `> ref: ${data.ref}`]);
        toast.success("TRANSMITTED · SIGMA ACK");
        setMessage("");
      } else {
        throw new Error(data.error || "transmit failed");
      }
    } catch (e) {
      setLogLines((l) => [...l, "> ERROR: channel refused"]);
      toast.error("TRANSMIT FAILED");
    } finally {
      setTransmitting(false);
    }
  };

  return (
    <SectionShell
      id="s10"
      title="ACCESS PROTOCOL"
      tagline="Request entry. Transmit credentials. The sigma will acknowledge."
    >
      <div ref={root} className="relative grid h-full grid-cols-12 gap-3">
        {/* Ambient particles */}
        <SigmaParticles count={10} color="#FFEB3B" />
        {/* terminal form */}
        <Panel data-ap label="SECURE TERMINAL" id="TTY/ACCESS" accent="#FFEB3B" className="col-span-12 lg:col-span-8" scan>
          <div className="flex h-full flex-col p-4">
            {/* field: identity */}
            <label className="mb-2 block">
              <span className="mb-1 block font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                ▸ IDENTITY HANDLE / HASH
              </span>
              <input
                value={identity}
                onChange={(e) => setIdentity(e.target.value)}
                placeholder="e.g. @your-handle or 0xABCD…"
                className="w-full border border-border bg-background px-3 py-2.5 font-mono text-sm text-foreground outline-none transition focus:border-[#FFEB3B] focus:bg-[#FFEB3B0a]"
              />
            </label>

            {/* field: channel */}
            <div className="mb-2">
              <span className="mb-1 block font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                ▸ CHANNEL
              </span>
              <div className="flex flex-wrap gap-1.5">
                {CHANNELS.map((c) => (
                  <button
                    key={c}
                    onClick={() => setChannel(c)}
                    className={`border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] transition ${
                      channel === c
                        ? "border-[#FFEB3B] bg-[#FFEB3B] text-black"
                        : "border-border text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            {/* field: message */}
            <label className="mb-2 block flex-1">
              <span className="mb-1 block font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
                ▸ ENCRYPTED MESSAGE
              </span>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="> transmit your signal here…"
                rows={5}
                className="h-full min-h-[120px] w-full resize-none border border-border bg-background px-3 py-2.5 font-mono text-sm leading-relaxed text-foreground outline-none transition focus:border-[#FFEB3B] focus:bg-[#FFEB3B0a]"
              />
            </label>

            {/* transmit log */}
            <div className="mb-3 border border-border/70 bg-black p-2 font-mono text-[11px] leading-relaxed text-[#00FF94]">
              {logLines.length === 0 ? (
                <span className="text-muted-foreground">
                  ▮ standing by. compose + transmit to open channel.
                </span>
              ) : (
                logLines.map((l, i) => (
                  <div key={i}>{l}</div>
                ))
              )}
              {transmitting && <span className="sigma-blink">▮</span>}
            </div>

            <div className="flex items-center justify-between">
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
                ENCRYPTION: AES-256 · CHANNEL: SECURE
              </span>
              <BrutalButton
                accent="#FFEB3B"
                onClick={transmit}
                arrow={false}
                className="disabled:opacity-50"
                disabled={transmitting}
              >
                <Send className="mr-1.5 h-3.5 w-3.5" />
                {transmitting ? "TRANSMITTING…" : "TRANSMIT ►"}
              </BrutalButton>
            </div>
          </div>
        </Panel>

        {/* contact info */}
        <div className="col-span-12 flex flex-col gap-3 lg:col-span-4">
          <Panel data-ap label="DIRECT CHANNELS" id="OPEN" accent="#FFEB3B">
            <div className="divide-y divide-border/70">
              {[
                { icon: MapPin, k: "LOCATION", v: "Taungoo, Bago Region, MM" },
                { icon: Mail, k: "EMAIL", v: "contact@taungoosigma.lab" },
                { icon: Phone, k: "PHONE", v: "+95 · on request" },
                { icon: Github, k: "GITHUB", v: "github.com/0xumaki" },
              ].map((row) => {
                const Icon = row.icon;
                return (
                  <div key={row.k} className="flex items-center gap-3 p-3">
                    <Icon className="h-4 w-4 text-[#FFEB3B]" />
                    <div>
                      <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
                        {row.k}
                      </div>
                      <div className="font-mono text-sm text-foreground">{row.v}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </Panel>

          <Panel data-ap label="ACCESS TIER" id="PUBLIC" accent="#FFEB3B">
            <div className="p-3">
              <Tag accent="#00FF94">PUBLIC READ</Tag>
              <p className="mt-2 font-serif text-sm italic text-foreground/80">
                Lab access is tiered. Public-read is open to all. Write access is
                earned through the sigma-review process — submit a credible signal
                and the collective will respond.
              </p>
            </div>
          </Panel>

          <div className="sigma-hazard-orange h-2" />
          <div className="font-mono text-[9px] uppercase leading-relaxed tracking-[0.18em] text-muted-foreground">
            ▸ Response window: 72h on channels RESEARCH + PARTNERSHIP.
            <br />▸ All transmissions are encrypted in transit.
            <br />▸ We do not sell, share, or train on your signal.
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
