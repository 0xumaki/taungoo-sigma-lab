"use client";

import * as React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  RadialBar,
  RadialBarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useSigmaStore } from "@/lib/sigma/store";
import { SectionShell } from "../shared/SectionShell";
import { Panel, StatReadout, Tag } from "../shared/components";
import { SigmaParticles } from "../shared/SigmaParticles";

gsap.registerPlugin(useGSAP);

function useTicker(fn: () => void, ms: number) {
  React.useEffect(() => {
    const i = setInterval(fn, ms);
    return () => clearInterval(i);
  }, [fn, ms]);
}

const SECTORS = [
  { code: "INIT" }, { code: "MAN" }, { code: "SYS" }, { code: "VLT" },
  { code: "COL" }, { code: "LOG" }, { code: "DAT" }, { code: "CAP" },
  { code: "ALL" }, { code: "ACS" }, { code: "STS" },
];

const PIE_COLORS = ["#00FF94", "#00E5FF", "#C6FF00", "#FFB300", "#FF2D7E", "#B388FF"];

export function S07DataStreams() {
  const { navigate } = useSigmaStore();
  const root = React.useRef<HTMLDivElement>(null);

  const [stream, setStream] = React.useState(
    Array.from({ length: 40 }, (_, i) => ({
      t: i,
      neural: 40 + Math.sin(i / 3) * 18 + Math.random() * 10,
      infer: 30 + Math.cos(i / 4) * 14 + Math.random() * 8,
      web3: 20 + Math.sin(i / 5) * 10 + Math.random() * 6,
    }))
  );
  const [bars, setBars] = React.useState(
    SECTORS.map((s) => ({ sector: s.code, v: 30 + Math.random() * 60 }))
  );
  const [radar, setRadar] = React.useState([
    { axis: "AI", v: 92 },
    { axis: "WEB3", v: 78 },
    { axis: "IOT", v: 71 },
    { axis: "QUANTUM", v: 48 },
    { axis: "COMM", v: 90 },
    { axis: "SEC", v: 83 },
  ]);
  const [pie, setPie] = React.useState([
    { name: "AI/ML", v: 35, color: "#00FF94" },
    { name: "Web3", v: 22, color: "#C6FF00" },
    { name: "Full-Stack", v: 18, color: "#00E5FF" },
    { name: "Design", v: 12, color: "#FF2D7E" },
    { name: "Infra", v: 8, color: "#FFB300" },
    { name: "Other", v: 5, color: "#B388FF" },
  ]);
  const [radial, setRadial] = React.useState([
    { name: "CPU", v: 67, fill: "#00FF94" },
    { name: "MEM", v: 82, fill: "#00E5FF" },
    { name: "NET", v: 45, fill: "#C6FF00" },
    { name: "GPU", v: 91, fill: "#FFB300" },
  ]);
  const [counters, setCounters] = React.useState({
    ops: 184320,
    pkts: 8142233,
    infer: 142,
    uptimeLabel: "00:00:00",
  });
  const [systems, setSystems] = React.useState([
    { name: "NEURAL FORGE", status: "ONLINE", color: "#00FF94" },
    { name: "WEB3 RAIL", status: "ONLINE", color: "#00FF94" },
    { name: "EDGE MESH", status: "ONLINE", color: "#00FF94" },
    { name: "QUANTUM SIM", status: "CALIBRATING", color: "#FFB300" },
    { name: "COMMUNITY OS", status: "ONLINE", color: "#00FF94" },
  ]);
  const [source, setSource] = React.useState<"LIVE API" | "LOCAL SIM">("LOCAL SIM");

  const tick = React.useCallback(async () => {
    try {
      const res = await fetch("/api/sigma/telemetry?XTransformPort=3000", { cache: "no-store" });
      if (!res.ok) throw new Error("bad status");
      const d = await res.json();
      if (d.stream) setStream(d.stream);
      if (d.sectors) setBars(d.sectors.map((s: { code: string; v: number }) => ({ sector: s.code, v: s.v })));
      if (d.radar) setRadar(d.radar);
      if (d.counters) {
        setCounters({
          ops: d.counters.ops ?? 0,
          pkts: d.counters.packets ?? d.counters.pkts ?? 0,
          infer: d.counters.infer ?? 0,
          uptimeLabel: d.counters.uptimeLabel ?? "—",
        });
      }
      if (d.systems) setSystems(d.systems);
      setSource("LIVE API");
    } catch {
      setStream((prev) => {
        const next = [...prev.slice(1)];
        const last = prev[prev.length - 1];
        next.push({
          t: last.t + 1,
          neural: Math.max(8, Math.min(98, last.neural + (Math.random() - 0.5) * 22)),
          infer: Math.max(5, Math.min(95, last.infer + (Math.random() - 0.5) * 18)),
          web3: Math.max(5, Math.min(90, (last.web3 || 20) + (Math.random() - 0.5) * 14)),
        });
        return next;
      });
      setBars((prev) => prev.map((b) => ({ ...b, v: Math.max(10, Math.min(99, b.v + (Math.random() - 0.5) * 20)) })));
      setRadial((prev) => prev.map((r) => ({ ...r, v: Math.max(10, Math.min(99, r.v + (Math.random() - 0.5) * 15)) })));
      setCounters((c) => ({
        ...c,
        ops: c.ops + Math.floor(Math.random() * 120),
        pkts: c.pkts + Math.floor(Math.random() * 800),
        infer: c.infer + (Math.random() > 0.5 ? 1 : 0),
      }));
      setSource("LOCAL SIM");
    }
  }, []);
  useTicker(tick, 1200);

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
      tagline="Sector 07 is the live dashboard — real-time metrics from running systems. These numbers are moving right now."
    >
      <div ref={root} className="relative grid h-full grid-cols-12 gap-3 overflow-y-auto sigma-scroll-hidden">
        {/* Ambient floating data motes */}
        <SigmaParticles count={24} color="#00FF94" />

        {/* big counter row */}
        <Panel data-ds label="LIVE METRICS" id={source} accent="#00FF94" className="col-span-12 md:col-span-8">
          <div className="grid grid-cols-2 divide-x divide-border/70 sm:grid-cols-4">
            {[
              ["OPS/SEC", counters.ops.toLocaleString(), "+120", "#00FF94"],
              ["PACKETS", counters.pkts.toLocaleString(), "+800", "#00E5FF"],
              ["INFER", `${counters.infer}k`, "+1", "#C6FF00"],
              ["UPTIME", counters.uptimeLabel ?? "—", "LIVE", "#FFB300"],
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
              {systems.map((s) => (
                <div key={s.name} className="flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em]">
                  <span className="text-muted-foreground">{s.name}</span>
                  <span className="flex items-center gap-1.5">
                    <span className="sigma-pulse h-1.5 w-1.5" style={{ background: s.color }} />
                    <span style={{ color: s.color }}>{s.status}</span>
                  </span>
                </div>
              ))}
            </div>
            <Tag accent={source === "LIVE API" ? "#00FF94" : "#FFB300"}>
              SRC: {source}
            </Tag>
          </div>
        </Panel>

        {/* neural stream — main chart */}
        <Panel data-ds label="NEURAL ACTIVITY" id="LIVE" accent="#00FF94" className="col-span-12 row-span-3 md:col-span-8">
          <div className="h-[220px] p-2 md:h-full">
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
                  <linearGradient id="gw" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#C6FF00" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#C6FF00" stopOpacity={0} />
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
                <Area type="monotone" dataKey="web3" stroke="#C6FF00" strokeWidth={1.5} fill="url(#gw)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        {/* radar */}
        <Panel data-ds label="CAPABILITY MATRIX" id="6-AXIS" accent="#00FF94" className="col-span-12 row-span-3 md:col-span-4">
          <div className="h-[220px] p-2 md:h-full">
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
          <div className="h-[180px] p-2 md:h-full">
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

        {/* NEW: Service Distribution Pie Chart */}
        <Panel data-ds label="SERVICE DISTRIBUTION" id="6-SECTORS" accent="#C6FF00" className="col-span-12 row-span-2 md:col-span-4">
          <div className="h-[180px] p-2 md:h-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pie}
                  dataKey="v"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={70}
                  innerRadius={30}
                  paddingAngle={2}
                >
                  {pie.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{ background: "#0a0a0a", border: "1px solid #C6FF0055", fontFamily: "monospace", fontSize: 11 }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        {/* NEW: Resource Usage Radial Bars */}
        <Panel data-ds label="RESOURCE USAGE" id="4-CORE" accent="#FFB300" className="col-span-12 row-span-2 md:col-span-4">
          <div className="h-[180px] p-2 md:h-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart
                cx="50%"
                cy="50%"
                innerRadius="20%"
                outerRadius="90%"
                barSize={8}
                data={radial}
                startAngle={90}
                endAngle={-270}
              >
                <RadialBar background dataKey="v" cornerRadius={4} />
                <Tooltip
                  contentStyle={{ background: "#0a0a0a", border: "1px solid #FFB30055", fontFamily: "monospace", fontSize: 11 }}
                />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
        </Panel>

        {/* NEW: System Load Monitor */}
        <Panel data-ds label="SYSTEM LOAD" id="MONITOR" accent="#FF2D7E" className="col-span-12 row-span-2 md:col-span-4">
          <div className="flex h-full flex-col justify-between p-3">
            <div className="space-y-2">
              {radial.map((r) => (
                <div key={r.name}>
                  <div className="flex justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                    <span>{r.name}</span>
                    <span style={{ color: r.fill }}>{Math.round(r.v)}%</span>
                  </div>
                  <div className="mt-1 h-1.5 w-full bg-foreground/10">
                    <div
                      className="h-full transition-all duration-300"
                      style={{ width: `${r.v}%`, background: r.fill, boxShadow: `0 0 6px ${r.fill}` }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-2 grid grid-cols-2 gap-1 border-t border-border/40 pt-2 font-mono text-[8px] uppercase tracking-[0.14em] text-muted-foreground">
              <span>▸ 4 CORES</span>
              <span className="text-right" style={{ color: "#FF2D7E" }}>▮ NOMINAL</span>
            </div>
          </div>
        </Panel>
      </div>
    </SectionShell>
  );
}
