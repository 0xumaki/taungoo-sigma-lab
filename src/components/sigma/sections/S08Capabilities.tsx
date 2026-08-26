"use client";

import * as React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useSigmaStore } from "@/lib/sigma/store";
import { SectionShell } from "../shared/SectionShell";
import { BrutalButton, Panel, Tag } from "../shared/components";
import { SigmaParticles } from "../shared/SigmaParticles";
import { sigmaSound } from "@/lib/sigma/sound";
import { Cpu, HardDrive, Radio, Server, Zap, Microscope, RotateCw, MapPin, Thermometer, Wrench } from "lucide-react";
import { useCardReveal } from "@/lib/sigma/use-card-reveal";

gsap.registerPlugin(useGSAP);

interface Gear {
  code: string;
  icon: typeof Cpu;
  name: string;
  specs: [string, string][];
  serial: string;
  status: "ONLINE" | "CALIBRATING" | "STANDBY";
  accent: string;
  // back-face details
  power: string;
  temp: string;
  location: string;
  lastMaintenance: string;
  uptimeDays: number;
  notes: string;
}

const GEAR: Gear[] = [
  { code: "GPU·CLUSTER·A", icon: Cpu, name: "Neural Forge Compute", specs: [["NODES", "4"], ["GPU", "8× A100 80GB"], ["TFLOPS", "624"], ["NET", "400GbE"]], serial: "TSL-NF-A-011407", status: "ONLINE", accent: "#FF3D3D", power: "3.2kW", temp: "61°C", location: "Rack A-01 · Lab Complex", lastMaintenance: "2024.10.15", uptimeDays: 42, notes: "Running Vortex autonomous sales inference. GPU mem at 78%." },
  { code: "EDGE·MESH·B", icon: Radio, name: "IoT Sensor Mesh", specs: [["NODES", "240"], ["RADIOS", "LoRa+BLE"], ["PACKETS/D", "8.1M"], ["BATT", "AA · 2yr"]], serial: "TSL-EM-B-021008", status: "ONLINE", accent: "#FF3D3D", power: "0.4kW", temp: "Ambient", location: "12 fields · Bago Region", lastMaintenance: "2024.09.30", uptimeDays: 88, notes: "3 nodes replaced last cycle. All channels nominal." },
  { code: "STORAGE·C", icon: HardDrive, name: "Cold Storage Vault", specs: [["RAW", "1.2 PB"], ["REPLICAS", "3"], ["LATENCY", "4ms"], ["ENC", "AES-256"]], serial: "TSL-ST-C-030911", status: "ONLINE", accent: "#FF3D3D", power: "0.8kW", temp: "18°C", location: "Vault · Climate Controlled", lastMaintenance: "2024.08.12", uptimeDays: 120, notes: "37% capacity used. Scrub cycle every 14d." },
  { code: "QUANT·SIM·D", icon: Zap, name: "Quantum-Inspired Solver", specs: [["QUBITS", "32 sim"], ["GATES", "1.2M/s"], ["FIDEL", "0.984"], ["COOL", "N/A · classi"]], serial: "TSL-QS-D-040714", status: "CALIBRATING", accent: "#FFB300", power: "1.1kW", temp: "44°C", location: "Rack D-03 · Lab Complex", lastMaintenance: "2024.11.01", uptimeDays: 5, notes: "Recalibrating fidelity gate. ETA 2h." },
  { code: "LAB·BENCH·E", icon: Microscope, name: "Hardware Bench", specs: [["OSCILLO", "4ch 2GHz"], ["REWORK", "Hot-air"], ["PCB", "6-layer"], ["VAC", "ESD-safe"]], serial: "TSL-LB-E-051813", status: "ONLINE", accent: "#FF3D3D", power: "0.6kW", temp: "Ambient", location: "Bench E · Lab Complex", lastMaintenance: "2024.07.22", uptimeDays: 180, notes: "Oscilloscope calibrated. Hot-air station serviced." },
  { code: "WEB·RAIL·F", icon: Server, name: "Deployment Rail", specs: [["REGIONS", "6"], ["REPLICA", "auto"], ["CDN", "edge"], ["UP", "99.9%"]], serial: "TSL-WR-F-060321", status: "ONLINE", accent: "#FF3D3D", power: "Cloud", temp: "N/A", location: "6 regions · Global Edge", lastMaintenance: "2024.10.28", uptimeDays: 95, notes: "Auto-scaling active. Last deploy: 2h ago." },
];

export function S08Capabilities() {
  const { navigate } = useSigmaStore();
  const cardsRef = useCardReveal<HTMLDivElement>({ stagger: true });
  const [flipped, setFlipped] = React.useState<string | null>(null);

  useGSAP(
    () => {
      gsap.from("[data-gear]", {
        opacity: 0,
        y: 30,
        duration: 0.55,
        ease: "power3.out",
        stagger: { each: 0.07, from: "start" },
        clearProps: "opacity,transform",
      });
    },
    { scope: cardsRef }
  );

  return (
    <SectionShell
      id="s08"
      title="CAPABILITIES"
      tagline="Sector 08 is the hardware lab — compute, sensors, and infrastructure. Click any unit to flip and see maintenance logs."
    >
      <div ref={cardsRef} className="relative grid h-full grid-cols-12 gap-3 overflow-y-auto sigma-scroll-hidden">
        {/* Ambient particles */}
        <SigmaParticles count={14} color="#FF3D3D" />
        {GEAR.map((g, i) => {
          const Icon = g.icon;
          const isFlipped = flipped === g.code;
          return (
            <div
              data-gear
              key={g.code}
              className="sigma-card-reveal sigma-hover-card col-span-12 sm:col-span-6 lg:col-span-4"
              style={{ perspective: "1000px", "--sigma-hover-accent": g.accent, transitionDelay: `${i * 0.08}s` } as React.CSSProperties}
            >
              <div
                className="relative h-full transition-transform duration-500"
                style={{
                  transformStyle: "preserve-3d",
                  transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
                }}
              >
                {/* FRONT FACE */}
                <Panel
                  label={g.code}
                  id={g.serial}
                  accent={g.accent}
                  scan
                  className={isFlipped ? "hidden" : "block h-full"}
                >
                  <div className="flex h-full flex-col p-3">
                    <div className="flex items-start justify-between">
                      <div
                        className="flex h-12 w-12 items-center justify-center border"
                        style={{ borderColor: `${g.accent}55`, color: g.accent }}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                      <Tag accent={g.accent}>{g.status}</Tag>
                    </div>
                    <h3 className="mt-2 font-sans text-lg font-bold uppercase leading-tight tracking-tight">
                      {g.name}
                    </h3>
                    <div className="mt-2 grid grid-cols-2 gap-px border border-border/70 bg-border/40">
                      {g.specs.map(([k, v]) => (
                        <div key={k} className="bg-card p-2">
                          <div className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">
                            {k}
                          </div>
                          <div className="font-mono text-sm font-bold text-foreground">{v}</div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-2 flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">
                      <span>S/N {g.serial}</span>
                      <span style={{ color: g.accent }}>▮ BARCODE OK</span>
                    </div>
                    {/* fake barcode */}
                    <div className="mt-1.5 flex h-6 gap-px">
                      {Array.from({ length: 48 }).map((_, i) => (
                        <span
                          key={i}
                          className="bg-foreground"
                          style={{ width: i % 3 === 0 ? 3 : 1, opacity: (i * 7) % 10 < 6 ? 0.9 : 0.3 }}
                        />
                      ))}
                    </div>
                    {/* flip hint */}
                    <button
                      onClick={() => { setFlipped(g.code); sigmaSound.play("open"); }}
                      className="mt-auto flex items-center justify-center gap-1.5 border border-border py-1.5 font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:bg-foreground/10 hover:text-foreground"
                      data-cursor="hover"
                    >
                      <RotateCw className="h-3 w-3" /> FLIP FOR DETAILS
                    </button>
                  </div>
                </Panel>

                {/* BACK FACE */}
                <Panel
                  label={`${g.code} · DETAIL`}
                  id={g.serial}
                  accent={g.accent}
                  scan
                  className={isFlipped ? "block h-full" : "hidden"}
                >
                  <div
                    className="flex h-full flex-col p-3"
                    style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}
                  >
                    <div className="flex items-start justify-between">
                      <span className="font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: g.accent }}>
                        {g.code}
                      </span>
                      <button
                        onClick={() => { setFlipped(null); sigmaSound.play("close"); }}
                        className="border border-border px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:bg-foreground/10"
                        data-cursor="hover"
                      >
                        ◂ BACK
                      </button>
                    </div>
                    <h3 className="mt-2 font-sans text-lg font-bold uppercase leading-tight tracking-tight">
                      {g.name}
                    </h3>

                    {/* detail rows */}
                    <div className="mt-2 space-y-1.5">
                      <DetailRow icon={Zap} label="POWER DRAW" value={g.power} accent={g.accent} />
                      <DetailRow icon={Thermometer} label="TEMP" value={g.temp} accent={g.accent} />
                      <DetailRow icon={MapPin} label="LOCATION" value={g.location} accent={g.accent} />
                      <DetailRow icon={Wrench} label="LAST MAINT" value={g.lastMaintenance} accent={g.accent} />
                    </div>

                    {/* uptime */}
                    <div className="mt-3">
                      <div className="flex justify-between font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">
                        <span>UPTIME</span>
                        <span style={{ color: g.accent }}>{g.uptimeDays} days</span>
                      </div>
                      <div className="mt-1 h-1.5 w-full bg-foreground/10">
                        <div
                          className="h-full"
                          style={{ width: `${Math.min(100, (g.uptimeDays / 180) * 100)}%`, background: g.accent }}
                        />
                      </div>
                    </div>

                    {/* notes */}
                    <div className="mt-3 border-l-2 pl-2" style={{ borderColor: g.accent }}>
                      <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">
                        ▸ FIELD NOTES
                      </div>
                      <p className="mt-0.5 font-serif text-[11px] italic leading-relaxed text-foreground/80">
                        {g.notes}
                      </p>
                    </div>

                    {/* barcode */}
                    <div className="mt-auto flex h-6 gap-px">
                      {Array.from({ length: 48 }).map((_, i) => (
                        <span
                          key={i}
                          className="bg-foreground"
                          style={{ width: i % 3 === 0 ? 3 : 1, opacity: (i * 11) % 10 < 6 ? 0.9 : 0.3 }}
                        />
                      ))}
                    </div>
                  </div>
                </Panel>
              </div>
            </div>
          );
        })}

        {/* CTA strip */}
        <div className="col-span-12 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            ▸ {GEAR.length} units cataloged · 5/6 online · 1 calibrating · CLICK TO FLIP
          </span>
          <BrutalButton accent="#FF3D3D" onClick={() => navigate("s09")}>
            VIEW ALLIANCES
          </BrutalButton>
        </div>
      </div>
    </SectionShell>
  );
}

function DetailRow({
  icon: Icon,
  label,
  value,
  accent,
}: {
  icon: typeof Zap;
  label: string;
  value: string;
  accent: string;
}) {
  return (
    <div className="flex items-center gap-2 border-b border-border/40 pb-1">
      <Icon className="h-3 w-3 shrink-0" style={{ color: accent }} />
      <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">
        {label}
      </span>
      <span className="ml-auto font-mono text-[10px] font-bold text-foreground">{value}</span>
    </div>
  );
}
