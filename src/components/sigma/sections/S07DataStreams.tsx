"use client";

import * as React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Line,
  LineChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useSigmaStore } from "@/lib/sigma/store";
import { SectionShell } from "../shared/SectionShell";
import { Panel, StatReadout, Tag } from "../shared/components";

gsap.registerPlugin(useGSAP);

function useTicker(fn: () => void, ms: number) {
  React.useEffect(() => {
    const i = setInterval(fn, ms);
    return () => clearInterval(i);
  }, [fn, ms]);
}

export function S07DataStreams() {
  const { navigate } = useSigmaStore();
  const root = React.useRef<HTMLDivElement>(null);

  const [stream, setStream] = React.useState(
    Array.from({ length: 40 }, (_, i) => ({
      t: i,
      neural: 40 + Math.sin(i / 3) * 18 + Math.random() * 10,
      infer: 30 + Math.cos(i / 4) * 14 + Math.random() * 8,
    }))
  );
  const [bars, setBars] = React.useState(
    SECTORS.map((s, i) => ({
      sector: s.code,
      v: 30 + Math.random() * 60,
    }))
  );
  const [radar] = React.useState([
    { axis: "AI", v: 92 },
    { axis: "WEB3", v: 78 },
    { axis: "IOT", v: 71 },
    { axis: "QUANTUM", v: 48 },
    { axis: "COMM", v: 90 },
    { axis: "SEC", v: 83 },
  ]);
  const [counters, setCounters] = React.useState({ ops: 184320, pkts: 8142233, infer: 142 });

  const tick = React.useCallback(() => {
    setStream((prev) => {
      const next = [...prev.slice(1)];
      const last = prev[prev.length - 1];
      next.push({
        t: last.t + 1,
        neural: Math.max(8, Math.min(98, last.neural + (Math.random() - 0.5) * 22)),
        infer: Math.max(5, Math.min(95, last.infer + (Math.random() - 0.5) * 18)),
      });
      return next;
    });
    setBars((prev) => prev.map((b) => ({ ...b, v: Math.max(10, Math.min(99, b.v + (Math.random() - 0.5) * 20)) })));
    setCounters((c) => ({
      ops: c.ops + Math.floor(Math.random() * 120),
      pkts: c.pkts + Math.floor(Math.random() * 800),
      infer: c.infer + (Math.random() > 0.5 ? 1 : 0),
    }));
  }, []);
  useTicker(tick, 900);

  useGSAP(
    () => {
      gsap.from("[data-ds]", {
        opacity: 0,
        y: 24,
        duration: 0.55,
        ease: "power3.out",
        stagger: 0.08,
      });
    },
    { scope: root }
  );

  return (
    <SectionShell
      id="s07"
      title="DATA STREAMS"
      tagline="Live telemetry from the lab floor. These numbers are moving right now."
    >
      <div ref={root} className="grid h-full grid-cols-12 grid-rows-6 gap-3">
        {/* big counter row */}
        <Panel data-ds label="LIVE METRICS" id="RT" accent="#00FF94" className="col-span-12 md:col-span-8">
          <div className="grid grid-cols-2 divide-x divide-border/70 sm:grid-cols-4">
            {[
              ["OPS/SEC", counters.ops.toLocaleString(), "+120", "#00FF94"],
              ["PACKETS", counters.pkts.toLocaleString(), "+800", "#00E5FF"],
              ["INFER", `${counters.infer}k`, "+1", "#C6FF00"],
              ["UPTIME", "99.2%", "30d", "#FFB300"],
            ].map(([k, v, d, c]) => (
              <div key={k} className="p-3">
                <StatReadout label={k} value={v} accent={c} />
                <div className="mt-1 font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">
                  Δ {d}/s
                </div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel data-ds label="STATUS" id="NOMINAL" accent="#00FF94" className="col-span-12 md:col-span-4">
          <div className="flex h-full flex-col justify-between p-3">
            <div className="space-y-1.5">
              {[
                ["NEURAL FORGE", "ONLINE", "#00FF94"],
                ["WEB3 RAIL", "ONLINE", "#00FF94"],
                ["EDGE MESH", "ONLINE", "#00FF94"],
                ["QUANTUM SIM", "CALIBRATING", "#FFB300"],
                ["COMMUNITY OS", "ONLINE", "#00FF94"],
              ].map(([k, v, c]) => (
                <div key={k} className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em]">
                  <span className="text-muted-foreground">{k}</span>
                  <span className="flex items-center gap-1.5">
                    <span className="sigma-pulse h-1.5 w-1.5" style={{ background: c as string }} />
                    <span style={{ color: c as string }}>{v}</span>
                  </span>
                </div>
              ))}
            </div>
            <Tag accent="#00FF94">ALL SYSTEMS NOMINAL</Tag>
          </div>
        </Panel>

        {/* neural stream */}
        <Panel data-ds label="NEURAL ACTIVITY" id="LIVE" accent="#00FF94" className="col-span-12 row-span-3 md:col-span-8">
          <div className="h-full p-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={stream} margin={{ top: 8, right: 8, bottom: 0, left: -20 }}>
                <defs>
                  <linearGradient id="gn" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00FF94" stopOpacity={0.5} />
                    <stop offset="100%" stopColor="#00FF94" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="gi" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00E5FF" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#00E5FF" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="t" tick={{ fill: "#888", fontSize: 9, fontFamily: "monospace" }} stroke="#333" />
                <YAxis tick={{ fill: "#888", fontSize: 9, fontFamily: "monospace" }} stroke="#333" />
                <Tooltip
                  contentStyle={{
                    background: "#0a0a0a",
                    border: "1px solid #00FF9455",
                    fontFamily: "monospace",
                    fontSize: 11,
                  }}
                />
                <Area type="monotone" dataKey="neural" stroke="#00FF94" strokeWidth={1.5} fill="url(#gn)" />
                <Area type="monotone" dataKey="infer" stroke="#00E5FF" strokeWidth={1.5} fill="url(#gi)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        {/* radar */}
        <Panel data-ds label="CAPABILITY MATRIX" id="6-AXIS" accent="#00FF94" className="col-span-12 row-span-3 md:col-span-4">
          <div className="h-full p-2">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radar}>
                <PolarGrid stroke="#333" />
                <PolarAngleAxis dataKey="axis" tick={{ fill: "#888", fontSize: 9, fontFamily: "monospace" }} />
                <Radar dataKey="v" stroke="#00FF94" strokeWidth={1.5} fill="#00FF94" fillOpacity={0.25} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        {/* sector throughput bars */}
        <Panel data-ds label="SECTOR THROUGHPUT" id="11-CH" accent="#00FF94" className="col-span-12 row-span-2 md:col-span-7">
          <div className="h-full p-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={bars} margin={{ top: 4, right: 8, bottom: 0, left: -24 }}>
                <XAxis dataKey="sector" tick={{ fill: "#888", fontSize: 9, fontFamily: "monospace" }} stroke="#333" />
                <YAxis tick={{ fill: "#888", fontSize: 9, fontFamily: "monospace" }} stroke="#333" />
                <Tooltip
                  cursor={{ fill: "#ffffff10" }}
                  contentStyle={{ background: "#0a0a0a", border: "1px solid #00FF9455", fontFamily: "monospace", fontSize: 11 }}
                />
                <Bar dataKey="v" fill="#00FF94" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        {/* sparkline + cta */}
        <Panel data-ds label="PACKET RATE" id="SPARK" accent="#00FF94" className="col-span-12 row-span-2 md:col-span-5">
          <div className="flex h-full flex-col p-3">
            <StatReadout label="LIVE PACKET RATE" value={(counters.pkts % 100000) / 1000} unit="k/s" accent="#00FF94" />
            <div className="mt-2 h-10 flex-1">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={stream}>
                  <Line type="monotone" dataKey="infer" stroke="#00E5FF" strokeWidth={1.5} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </Panel>
      </div>
    </SectionShell>
  );
}

const SECTORS = [
  { code: "INIT" },
  { code: "MAN" },
  { code: "SYS" },
  { code: "VLT" },
  { code: "COL" },
  { code: "LOG" },
  { code: "DAT" },
  { code: "CAP" },
  { code: "ALL" },
  { code: "ACS" },
  { code: "STS" },
];
