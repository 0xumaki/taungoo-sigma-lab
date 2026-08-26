import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CHANGELOG = [
  { version: "2.7.SIGMA", date: "2024.11.20", changes: ["Added health endpoint", "Added JSON-LD structured data", "Added S07 ambient particles", "Added robots.txt + sitemap.xml", "Added version endpoint"] },
  { version: "2.6.SIGMA", date: "2024.11.15", changes: ["Added cursor spotlight", "Added S08 equipment card flip", "Added OG meta tags"] },
  { version: "2.5.SIGMA", date: "2024.11.10", changes: ["Added help overlay [H]", "Added S06 paper detail modals", "Added visited sectors breadcrumb"] },
  { version: "2.4.SIGMA", date: "2024.11.05", changes: ["Added sound design system", "Added tour mode [T]", "Added operator profile modals", "Added command palette [Cmd+K]", "Added boot screen", "Added cursor reticle", "Added progress indicator", "Added share button", "Added Konami code easter egg"] },
  { version: "2.0.SIGMA", date: "2024.10.21", changes: ["Initial 11-sector release", "Nexus Map level-select navigation", "GSAP multi-panel transitions", "Real GitHub portfolio screenshots", "Telemetry + transmit APIs"] },
];

export async function GET() {
  return NextResponse.json({
    version: "2.7.SIGMA",
    codename: "TAUNGOO",
    buildDate: "2024.11.20",
    nextjs: "16.1.1",
    react: "19.0.0",
    gsap: "3.15.0",
    tailwind: "4.x",
    node: process.version,
    uptime: process.uptime(),
    sectors: 11,
    projects: 11,
    operators: 8,
    features: [
      "Nexus Map level-select navigation",
      "GSAP multi-panel full-page transitions",
      "11 absolute sectors (no scroll, no nav bar)",
      "Boot screen with progress animation",
      "Custom cursor reticle + spotlight",
      "Command palette (Cmd+K)",
      "Sound design (Web Audio API)",
      "Tour mode (auto-play)",
      "Operator profile modals",
      "Paper detail modals",
      "Equipment card flip (3D)",
      "Live telemetry API",
      "Contact transmit API",
      "Health monitoring API",
      "Konami code easter egg",
      "Visited sectors breadcrumb",
      "Help overlay [H]",
      "Ambient particles (S07)",
      "JSON-LD + OG meta tags",
      "robots.txt + sitemap.xml",
    ],
    changelog: CHANGELOG,
  });
}
