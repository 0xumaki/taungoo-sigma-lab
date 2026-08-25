"use client";

import * as React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useSigmaStore } from "@/lib/sigma/store";
import { SectionShell } from "../shared/SectionShell";
import { BrutalButton, Panel, Tag } from "../shared/components";
import { Cpu, HardDrive, Radio, Server, Zap, Microscope } from "lucide-react";

gsap.registerPlugin(useGSAP);

const GEAR = [
  { code: "GPU·CLUSTER·A", icon: Cpu, name: "Neural Forge Compute", specs: [["NODES", "4"], ["GPU", "8× A100 80GB"], ["TFLOPS", "624"], ["NET", "400GbE"]], serial: "TSL-NF-A-011407", status: "ONLINE", accent: "#FF3D3D" },
  { code: "EDGE·MESH·B", icon: Radio, name: "IoT Sensor Mesh", specs: [["NODES", "240"], ["RADIOS", "LoRa+BLE"], ["PACKETS/D", "8.1M"], ["BATT", "AA · 2yr"]], serial: "TSL-EM-B-021008", status: "ONLINE", accent: "#FF3D3D" },
  { code: "STORAGE·C", icon: HardDrive, name: "Cold Storage Vault", specs: [["RAW", "1.2 PB"], ["REPlicas", "3"], ["LATENCY", "4ms"], ["ENC", "AES-256"]], serial: "TSL-ST-C-030911", status: "ONLINE", accent: "#FF3D3D" },
  { code: "QUANT·SIM·D", icon: Zap, name: "Quantum-Inspired Solver", specs: [["QUBITS", "32 sim"], ["GATES", "1.2M/s"], ["FIDEL", "0.984"], ["COOL", "N/A · classi"]], serial: "TSL-QS-D-040714", status: "CALIBRATING", accent: "#FFB300" },
  { code: "LAB·BENCH·E", icon: Microscope, name: "Hardware Bench", specs: [["OSCILLO", "4ch 2GHz"], ["REWORK", "Hot-air"], ["PCB", "6-layer"], ["VAC", "ESD-safe"]], serial: "TSL-LB-E-051813", status: "ONLINE", accent: "#FF3D3D" },
  { code: "WEB·RAIL·F", icon: Server, name: "Deployment Rail", specs: [["REGIONS", "6"], ["REPLICA", "auto"], ["CDN", "edge"], ["UP", "99.9%"]], serial: "TSL-WR-F-060321", status: "ONLINE", accent: "#FF3D3D" },
];

export function S08Capabilities() {
  const { navigate } = useSigmaStore();
  const root = React.useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      gsap.from("[data-gear]", {
        opacity: 0,
        y: 30,
        duration: 0.55,
        ease: "power3.out",
        stagger: { each: 0.07, from: "start" },
      });
    },
    { scope: root }
  );

  return (
    <SectionShell
      id="s08"
      title="CAPABILITIES"
      tagline="Hardware registry & spec sheets. Every unit cataloged, serial-stamped."
    >
      <div ref={root} className="grid h-full grid-cols-12 gap-3 overflow-y-auto sigma-scroll-hidden">
        {GEAR.map((g) => {
          const Icon = g.icon;
          return (
            <Panel
              data-gear
              key={g.code}
              label={g.code}
              id={g.serial}
              accent={g.accent}
              scan
              className="col-span-12 sm:col-span-6 lg:col-span-4"
            >
              <div className="p-3">
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
              </div>
            </Panel>
          );
        })}

        {/* CTA strip */}
        <div className="col-span-12 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-3">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            ▸ {GEAR.length} units cataloged · 5/6 online · 1 calibrating
          </span>
          <BrutalButton accent="#FF3D3D" onClick={() => navigate("s09")}>
            VIEW ALLIANCES
          </BrutalButton>
        </div>
      </div>
    </SectionShell>
  );
}
