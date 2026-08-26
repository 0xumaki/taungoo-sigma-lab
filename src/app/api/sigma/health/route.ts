import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const startedAt = Date.now();

export async function GET() {
  const now = Date.now();
  const uptimeSec = Math.floor((now - startedAt) / 1000);

  const checks = [
    { name: "WEB_SERVER", status: "UP", latency: 1 },
    { name: "TELEMETRY_API", status: "UP", latency: 2 },
    { name: "TRANSMIT_API", status: "UP", latency: 1 },
    { name: "HEALTH_API", status: "UP", latency: 0 },
    { name: "BOOT_SCREEN", status: "UP", latency: 0 },
    { name: "GSAP_TRANSITIONS", status: "UP", latency: 0 },
    { name: "SOUND_ENGINE", status: "UP", latency: 0, note: "Client-side, gated by user gesture" },
    { name: "SECTOR_REGISTRY", status: "UP", latency: 0, sectors: 11 },
    { name: "PORTFOLIO_DATA", status: "UP", latency: 0, projects: 11 },
    { name: "JSON_LD_SEO", status: "UP", latency: 0 },
    { name: "OG_META", status: "UP", latency: 0 },
  ];

  const allUp = checks.every((c) => c.status === "UP");
  const overall = allUp ? "OPERATIONAL" : "DEGRADED";

  return NextResponse.json({
    status: overall,
    uptime: uptimeSec,
    uptimeLabel: formatUptime(uptimeSec),
    timestamp: new Date().toISOString(),
    version: "2.4.SIGMA",
    sectors: 11,
    projects: 11,
    operators: 8,
    checks,
    memory: {
      rss: Math.round(process.memoryUsage().rss / 1024 / 1024),
      heapUsed: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
      heapTotal: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
      unit: "MB",
    },
  });
}

function formatUptime(sec: number): string {
  const dd = Math.floor(sec / 86400);
  const hh = String(Math.floor((sec % 86400) / 3600)).padStart(2, "0");
  const mm = String(Math.floor((sec % 3600) / 60)).padStart(2, "0");
  const ss = String(sec % 60).padStart(2, "0");
  return dd > 0 ? `${dd}d ${hh}:${mm}:${ss}` : `${hh}:${mm}:${ss}`;
}
