import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// In-memory telemetry state (resets per server restart; fine for a lab demo)
const startedAt = Date.now();
let tickCount = 0;

const SECTOR_CODES = ["INIT", "MAN", "SYS", "VLT", "COL", "LOG", "DAT", "CAP", "ALL", "ACS", "STS"];

export async function GET() {
  tickCount += 1;
  const uptimeMs = Date.now() - startedAt;
  const uptimeSec = Math.floor(uptimeMs / 1000);

  // derive a smooth-ish but lively signal from the tick counter
  const t = tickCount;
  const neural = 40 + Math.sin(t / 3) * 18 + Math.random() * 10;
  const infer = 30 + Math.cos(t / 4) * 14 + Math.random() * 8;

  // rolling 40-point stream
  const stream = Array.from({ length: 40 }, (_, i) => {
    const k = t - 39 + i;
    return {
      t: k,
      neural: Math.max(8, Math.min(98, 40 + Math.sin(k / 3) * 18 + Math.random() * 10)),
      infer: Math.max(5, Math.min(95, 30 + Math.cos(k / 4) * 14 + Math.random() * 8)),
    };
  });

  // per-sector throughput
  const sectors = SECTOR_CODES.map((code, i) => ({
    code,
    v: Math.max(10, Math.min(99, 30 + 35 + Math.sin((t + i) / 2) * 25 + Math.random() * 10)),
  }));

  // capability radar
  const radar = [
    { axis: "AI", v: 88 + Math.round(Math.sin(t / 5) * 6) },
    { axis: "WEB3", v: 76 + Math.round(Math.cos(t / 6) * 4) },
    { axis: "IOT", v: 71 + Math.round(Math.sin(t / 4) * 5) },
    { axis: "QUANTUM", v: 48 + Math.round(Math.cos(t / 7) * 6) },
    { axis: "COMM", v: 90 + Math.round(Math.sin(t / 3) * 3) },
    { axis: "SEC", v: 83 + Math.round(Math.cos(t / 5) * 4) },
  ];

  const counters = {
    ops: 184320 + tickCount * 87 + Math.floor(Math.random() * 120),
    packets: 8142233 + tickCount * 612 + Math.floor(Math.random() * 800),
    infer: 142 + Math.floor(tickCount / 3),
    uptimeSec,
    uptimeLabel: formatUptime(uptimeSec),
  };

  const systems = [
    { name: "NEURAL FORGE", status: "ONLINE", color: "#00FF94" },
    { name: "WEB3 RAIL", status: "ONLINE", color: "#00FF94" },
    { name: "EDGE MESH", status: "ONLINE", color: "#00FF94" },
    { name: "QUANTUM SIM", status: tickCount % 40 < 3 ? "CALIBRATING" : "ONLINE", color: "#00FF94" },
    { name: "COMMUNITY OS", status: "ONLINE", color: "#00FF94" },
  ];

  return NextResponse.json({
    ok: true,
    ts: new Date().toISOString(),
    tick: tickCount,
    stream,
    sectors,
    radar,
    counters,
    systems,
    neural: Math.round(neural),
    infer: Math.round(infer),
  });
}

function formatUptime(sec: number): string {
  const hh = String(Math.floor(sec / 3600)).padStart(2, "0");
  const mm = String(Math.floor((sec % 3600) / 60)).padStart(2, "0");
  const ss = String(sec % 60).padStart(2, "0");
  return `${hh}:${mm}:${ss}`;
}
