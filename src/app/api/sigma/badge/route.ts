import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const startedAt = Date.now();

export async function GET(req: Request) {
  const url = new URL(req.url);
  const style = url.searchParams.get("style") || "flat"; // flat | brutal
  const label = url.searchParams.get("label") || "TAUNGOO SIGMA";
  const value = url.searchParams.get("value") || "OPERATIONAL";

  const uptimeSec = Math.floor((Date.now() - startedAt) / 1000);
  const uptimeLabel = formatUptime(uptimeSec);

  const labelColor = "#0a0a0a";
  const valueColor = "#00FF94";
  const borderColor = "#FFFFFF";

  let svg: string;

  if (style === "brutal") {
    // Brutalist style: sharp corners, hazard border, monospace
    svg = `<svg xmlns="http://www.w3.org/2000/svg" width="280" height="32" viewBox="0 0 280 32">
  <rect x="0" y="0" width="280" height="32" fill="${labelColor}" stroke="${borderColor}" stroke-width="1"/>
  <rect x="0" y="0" width="100" height="32" fill="${borderColor}"/>
  <rect x="0" y="0" width="280" height="2" fill="${valueColor}"/>
  <rect x="0" y="30" width="280" height="2" fill="${valueColor}"/>
  <text x="50" y="21" font-family="monospace" font-size="10" font-weight="bold" fill="${labelColor}" text-anchor="middle" letter-spacing="1">${label}</text>
  <text x="190" y="21" font-family="monospace" font-size="10" font-weight="bold" fill="${valueColor}" text-anchor="middle" letter-spacing="1">${value} · ${uptimeLabel}</text>
  <rect x="0" y="0" width="4" height="32" fill="${valueColor}"/>
  <rect x="276" y="0" width="4" height="32" fill="${valueColor}"/>
</svg>`;
  } else {
    // Flat style: clean, like shields.io
    svg = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="20" viewBox="0 0 200 20">
  <linearGradient id="g" x2="0" y2="100%">
    <stop offset="0" stop-color="#bbb"/>
    <stop offset="1" stop-color="#999"/>
  </linearGradient>
  <clipPath id="c">
    <rect width="200" height="20" rx="3"/>
  </clipPath>
  <g clip-path="url(#c)">
    <rect width="90" height="20" fill="#555"/>
    <rect x="90" width="110" height="20" fill="${valueColor}"/>
    <rect width="200" height="20" fill="url(#g)" opacity="0.05"/>
  </g>
  <text x="45" y="14" font-family="monospace" font-size="10" fill="#fff" text-anchor="middle" letter-spacing="0.5">${label}</text>
  <text x="145" y="14" font-family="monospace" font-size="10" fill="#000" text-anchor="middle" font-weight="bold">${value}</text>
</svg>`;
  }

  return new NextResponse(svg, {
    headers: {
      "Content-Type": "image/svg+xml",
      "Cache-Control": "no-cache, no-store, must-revalidate",
    },
  });
}

function formatUptime(sec: number): string {
  const hh = String(Math.floor(sec / 3600)).padStart(2, "0");
  const mm = String(Math.floor((sec % 3600) / 60)).padStart(2, "0");
  const ss = String(sec % 60).padStart(2, "0");
  return `${hh}:${mm}:${ss}`;
}
