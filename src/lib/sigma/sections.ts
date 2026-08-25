// Taungoo Sigma Lab — Section Registry
// 11 sections + the MAP hub. Each section is an absolute full-page view.

export type SectionId =
  | "map"
  | "s01"
  | "s02"
  | "s03"
  | "s04"
  | "s05"
  | "s06"
  | "s07"
  | "s08"
  | "s09"
  | "s10"
  | "s11";

export interface SectionMeta {
  id: SectionId;
  index: number; // 0 for map, 1-11 for sections
  code: string; // e.g. "INIT"
  shortCode: string; // e.g. "01"
  name: string; // e.g. "INITIALIZING"
  tagline: string;
  accent: string; // hex
  accentSoft: string; // hex with low alpha usage
  glyph: string; // single char/symbol for the node
  role: string;
  status: "ONLINE" | "STANDBY" | "ACTIVE" | "CALIBRATING" | "CLASSIFIED";
}

export const SECTIONS: SectionMeta[] = [
  {
    id: "s01",
    index: 1,
    code: "INIT",
    shortCode: "01",
    name: "INITIALIZING",
    tagline: "Boot sequence. Sigma variable online.",
    accent: "#FFFFFF",
    accentSoft: "rgba(255,255,255,0.12)",
    glyph: "Σ",
    role: "HERO / BOOT",
    status: "ONLINE",
  },
  {
    id: "s02",
    index: 2,
    code: "MAN",
    shortCode: "02",
    name: "MANIFESTO",
    tagline: "We are the sigma variable.",
    accent: "#FF4500",
    accentSoft: "rgba(255,69,0,0.14)",
    glyph: "M",
    role: "ABOUT THE LAB",
    status: "ACTIVE",
  },
  {
    id: "s03",
    index: 3,
    code: "SYS",
    shortCode: "03",
    name: "CORE SYSTEMS",
    tagline: "Five research pillars, one engine.",
    accent: "#00E5FF",
    accentSoft: "rgba(0,229,255,0.14)",
    glyph: "⊞",
    role: "RESEARCH PILLARS",
    status: "ONLINE",
  },
  {
    id: "s04",
    index: 4,
    code: "VLT",
    shortCode: "04",
    name: "PROJECT VAULT",
    tagline: "11 deployed artifacts from the field.",
    accent: "#C6FF00",
    accentSoft: "rgba(198,255,0,0.14)",
    glyph: "⌗",
    role: "PORTFOLIO",
    status: "ACTIVE",
  },
  {
    id: "s05",
    index: 5,
    code: "COL",
    shortCode: "05",
    name: "COLLECTIVE",
    tagline: "The operators behind the machine.",
    accent: "#FF2D7E",
    accentSoft: "rgba(255,45,126,0.14)",
    glyph: "◍",
    role: "TEAM",
    status: "ACTIVE",
  },
  {
    id: "s06",
    index: 6,
    code: "LOG",
    shortCode: "06",
    name: "RESEARCH LOGS",
    tagline: "Field notes, papers, blueprints.",
    accent: "#FFB300",
    accentSoft: "rgba(255,179,0,0.14)",
    glyph: "▤",
    role: "PUBLICATIONS",
    status: "ACTIVE",
  },
  {
    id: "s07",
    index: 7,
    code: "DAT",
    shortCode: "07",
    name: "DATA STREAMS",
    tagline: "Live telemetry from the lab floor.",
    accent: "#00FF94",
    accentSoft: "rgba(0,255,148,0.14)",
    glyph: "≋",
    role: "ANALYTICS",
    status: "CALIBRATING",
  },
  {
    id: "s08",
    index: 8,
    code: "CAP",
    shortCode: "08",
    name: "CAPABILITIES",
    tagline: "Hardware registry & spec sheets.",
    accent: "#FF3D3D",
    accentSoft: "rgba(255,61,61,0.14)",
    glyph: "⚙",
    role: "EQUIPMENT",
    status: "ONLINE",
  },
  {
    id: "s09",
    index: 9,
    code: "ALL",
    shortCode: "09",
    name: "ALLIANCES",
    tagline: "A mesh of trusted collaborators.",
    accent: "#B388FF",
    accentSoft: "rgba(179,136,255,0.14)",
    glyph: "⬡",
    role: "PARTNERS",
    status: "ACTIVE",
  },
  {
    id: "s10",
    index: 10,
    code: "ACS",
    shortCode: "10",
    name: "ACCESS PROTOCOL",
    tagline: "Request entry. Transmit credentials.",
    accent: "#FFEB3B",
    accentSoft: "rgba(255,235,59,0.14)",
    glyph: "✉",
    role: "CONTACT",
    status: "STANDBY",
  },
  {
    id: "s11",
    index: 11,
    code: "STS",
    shortCode: "11",
    name: "SYSTEM STATUS",
    tagline: "All systems nominal. End of line.",
    accent: "#2979FF",
    accentSoft: "rgba(41,121,255,0.14)",
    glyph: "☉",
    role: "FOOTER / STATUS",
    status: "ONLINE",
  },
];

export const MAP_META: SectionMeta = {
  id: "map",
  index: 0,
  code: "NEX",
  shortCode: "00",
  name: "NEXUS MAP",
  tagline: "Select a sector to jack in.",
  accent: "#FFFFFF",
  accentSoft: "rgba(255,255,255,0.10)",
  glyph: "✦",
  role: "NAVIGATION HUB",
  status: "ONLINE",
};

export function getSection(id: SectionId): SectionMeta {
  if (id === "map") return MAP_META;
  return SECTIONS.find((s) => s.id === id) ?? SECTIONS[0];
}

export function nextSection(id: SectionId): SectionId {
  if (id === "map") return "s01";
  const idx = SECTIONS.findIndex((s) => s.id === id);
  if (idx === -1) return "s01";
  if (idx === SECTIONS.length - 1) return "map";
  return SECTIONS[idx + 1].id;
}

export function prevSection(id: SectionId): SectionId {
  if (id === "map") return "s11";
  const idx = SECTIONS.findIndex((s) => s.id === id);
  if (idx === -1) return "s11";
  if (idx === 0) return "map";
  return SECTIONS[idx - 1].id;
}
