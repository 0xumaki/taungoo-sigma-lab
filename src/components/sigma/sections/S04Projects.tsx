"use client";

import * as React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { PROJECTS, type Project } from "@/lib/sigma/projects";
import { useSigmaStore } from "@/lib/sigma/store";
import { SectionShell } from "../shared/SectionShell";
import { BrutalButton, Tag } from "../shared/components";
import { SigmaParticles } from "../shared/SigmaParticles";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Star, GitFork, CircleDot, Lock } from "lucide-react";

gsap.registerPlugin(useGSAP);

const CATEGORIES = [
  "ALL",
  "AI Systems",
  "Generative",
  "DeFi",
  "Web3",
  "Research",
  "Governance",
  "Brand",
];

const langColor: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Python: "#3572A5",
  Markdown: "#083fa1",
};

// First N projects are rendered as larger "featured" cards on >=md layouts
const FEATURED_COUNT = 2;

export function S04Projects() {
  const { navigate, activeProject, setActiveProject } = useSigmaStore();
  const root = React.useRef<HTMLDivElement>(null);
  const [filter, setFilter] = React.useState("ALL");

  const filtered = React.useMemo(
    () =>
      filter === "ALL"
        ? PROJECTS
        : PROJECTS.filter(
            (p) => p.category === filter || p.topics.includes(filter)
          ),
    [filter]
  );

  const selected = PROJECTS.find((p) => p.id === activeProject) ?? null;

  useGSAP(
    () => {
      gsap.from("[data-proj]", {
        opacity: 0,
        y: 30,
        scale: 0.96,
        duration: 0.5,
        ease: "power3.out",
        stagger: { each: 0.04, from: "start" },
      });
    },
    { scope: root, dependencies: [filter] }
  );

  return (
    <SectionShell
      id="s04"
      title="PROJECT VAULT"
      tagline="Sector 04 is the portfolio — 11 live GitHub artifacts with real screenshots and commit history."
    >
      <div ref={root} className="relative flex h-full flex-col gap-3">
        {/* Ambient particles */}
        <SigmaParticles count={11} color="#C6FF00" />

        {/* toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-1.5">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setFilter(c)}
                className={`border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.2em] transition-all ${
                  filter === c
                    ? "border-[#C6FF00] bg-[#C6FF00] text-black"
                    : "border-border text-muted-foreground hover:border-foreground/40 hover:text-foreground"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            <span>
              <span className="text-[#C6FF00]">{filtered.length}</span> / {PROJECTS.length} ARTIFACTS
            </span>
            {/* GitHub link — stylized as one-line "classified" cover (repo not published) */}
            <span
              className="inline-flex items-center gap-1.5 whitespace-nowrap border border-dashed border-[#FF3D3D]/55 bg-[#FF3D3D]/5 px-2 py-0.5 text-[#FF3D3D] [text-shadow:0_0_8px_rgba(255,61,61,0.35)]"
              title="Repository access restricted — contact us to request access"
            >
              <Lock className="h-3 w-3" />
              ▸ [ REPO ACCESS: RESTRICTED ] ◄
            </span>
          </div>
        </div>

        {/* === ASYMMETRIC PROJECT GRID (matches Alpha portfolio) === */}
        <div className="min-h-0 flex-1 overflow-y-auto sigma-scroll-hidden">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-3 md:grid-cols-4 lg:grid-cols-8 lg:gap-3 xl:grid-cols-12">
            {filtered.map((p, i) => (
              <ProjectCard
                key={p.id}
                project={p}
                featured={i < FEATURED_COUNT}
                index={i + 1}
                total={filtered.length}
                onOpen={() => setActiveProject(p.id)}
              />
            ))}
          </div>
        </div>

        {/* footer CTA */}
        <div className="flex items-center justify-between border-t border-border pt-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            ▸ Screenshots captured live via agent-browser · synced {new Date().toISOString().slice(0, 10)}
          </span>
          <BrutalButton accent="#C6FF00" onClick={() => navigate("s05")}>
            MEET THE COLLECTIVE
          </BrutalButton>
        </div>
      </div>

      {/* DETAIL DIALOG */}
      <Dialog open={!!selected} onOpenChange={(o) => !o && setActiveProject(null)}>
        <DialogContent className="max-w-4xl gap-0 overflow-hidden border-foreground/30 bg-card p-0">
          <DialogHeader className="border-b border-border px-4 py-2">
            <DialogTitle className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em]">
              <span className="text-[#C6FF00]">{selected?.code}</span>
              <span className="text-muted-foreground">/ ARTIFACT DETAIL</span>
            </DialogTitle>
          </DialogHeader>
          {selected && <ProjectDetail project={selected} />}
        </DialogContent>
      </Dialog>
    </SectionShell>
  );
}

function ProjectCard({
  project,
  featured,
  index,
  total,
  onOpen,
}: {
  project: Project;
  featured: boolean;
  index: number;
  total: number;
  onOpen: () => void;
}) {
  const a = project.accent;
  const span = featured
    ? "col-span-1 sm:col-span-2 md:col-span-2 lg:col-span-4 xl:col-span-6"
    : "col-span-1 sm:col-span-1 md:col-span-1 lg:col-span-2 xl:col-span-3";
  const idx = String(index).padStart(2, "0");
  const totalStr = String(total).padStart(2, "0");

  const cardStyle = {
    "--card-accent": a,
    clipPath:
      "polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))",
  } as React.CSSProperties;

  return (
    <button
      data-proj
      onClick={onOpen}
      className={`group sigma-card relative flex ${span} text-left`}
      style={cardStyle}
    >
      {/* accent glow (outside clip) */}
      <div
        className="sigma-card-glow pointer-events-none absolute -inset-2 -z-10 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `radial-gradient(circle at center, ${a}40, transparent 70%)` }}
        aria-hidden
      />

      {/* card frame */}
      <article className="sigma-card-frame relative flex w-full flex-col overflow-hidden border border-border/60 bg-card/40 transition-colors duration-300 group-hover:border-[var(--card-accent)]/60">
        {/* top accent stripe */}
        <div
          className="sigma-card-strip absolute left-0 top-0 z-20 h-[3px] w-full opacity-70 transition-opacity group-hover:opacity-100"
          style={{ background: `linear-gradient(90deg, ${a} 0%, ${a} 40%, transparent 100%)` }}
          aria-hidden
        />

        {/* top status bar */}
        <div className="relative flex items-center justify-between border-b border-border/40 px-3 py-2">
          <div className="flex items-center gap-1.5">
            <span className="sigma-pulse h-1.5 w-1.5" style={{ background: a }} aria-hidden />
            <span className="font-mono text-[9px] uppercase tracking-[0.22em]" style={{ color: a }}>
              {project.code}
            </span>
          </div>
          <div className="flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">
            <span>
              {idx}
              <span className="opacity-40">/{totalStr}</span>
            </span>
            <span className="opacity-40">·</span>
            <span style={{ color: a }}>●LIVE</span>
          </div>
        </div>

        {/* hero image zone */}
        <div className="relative aspect-[16/10] overflow-hidden bg-card">
          <img
            src={project.image}
            alt={`${project.name} — screenshot`}
            loading="lazy"
            decoding="async"
            className="sigma-card-img h-full w-full object-cover object-top opacity-95 transition-all duration-500 group-hover:scale-105 group-hover:opacity-100"
          />

          {/* accent color wash */}
          <div
            className="pointer-events-none absolute inset-0 opacity-20 mix-blend-color transition-opacity group-hover:opacity-40"
            style={{ background: a }}
            aria-hidden
          />

          {/* bottom gradient for legibility */}
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: "linear-gradient(180deg, transparent 35%, rgba(0,0,0,0.6) 100%)" }}
            aria-hidden
          />

          {/* scanlines */}
          <div
            className="pointer-events-none absolute inset-0 opacity-30"
            style={{
              background:
                "repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(0,0,0,0.35) 3px, rgba(0,0,0,0.35) 4px)",
            }}
            aria-hidden
          />

          {/* fine grid overlay */}
          <div className="sigma-grid-fine pointer-events-none absolute inset-0 opacity-20" aria-hidden />

          {/* hazard corner top-right */}
          <div
            className="absolute right-0 top-0 h-5 w-5"
            style={{
              background: `repeating-linear-gradient(45deg, ${a} 0, ${a} 2px, transparent 2px, transparent 4px)`,
            }}
            aria-hidden
          />

          {/* crosshair mark top-left */}
          <span
            className="absolute left-2 top-2 h-2.5 w-2.5 border-l border-t"
            style={{ borderColor: `${a}cc` }}
            aria-hidden
          />

          {/* language badge bottom-left */}
          <span
            className="absolute bottom-2 left-2 flex items-center gap-1 border bg-background/80 px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-[0.18em] backdrop-blur-sm"
            style={{ borderColor: `${a}55`, color: a }}
          >
            <span className="h-2 w-2" style={{ background: langColor[project.language] ?? "#888" }} />
            {project.language}
          </span>

          {/* category badge bottom-right */}
          <span className="absolute bottom-2 right-2 hidden bg-background/80 px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-[0.18em] text-foreground/75 backdrop-blur-sm sm:block">
            {project.category}
          </span>

          {/* === CINEMATIC HOVER OVERLAY === */}
          <div
            className="sigma-card-overlay pointer-events-none absolute inset-0 flex flex-col items-center justify-center bg-background/85 backdrop-blur-[2px]"
            aria-hidden
          >
            {/* corner brackets */}
            <span className="sigma-card-corner absolute left-3 top-3 border-l-2 border-t-2" style={{ borderColor: a }} />
            <span className="sigma-card-corner absolute right-3 top-3 border-r-2 border-t-2" style={{ borderColor: a }} />
            <span className="sigma-card-corner absolute bottom-3 left-3 border-l-2 border-b-2" style={{ borderColor: a }} />
            <span className="sigma-card-corner absolute bottom-3 right-3 border-r-2 border-b-2" style={{ borderColor: a }} />

            {/* center text stack */}
            <div className="relative z-10 flex flex-col items-center gap-1 px-4 text-center">
              <span className="font-mono text-[8px] uppercase tracking-[0.32em] text-muted-foreground sm:text-[9px]">
                ▸ ACCESS CASE FILE
              </span>
              <span
                className="font-sans text-base font-black uppercase leading-none tracking-tight sm:text-lg lg:text-xl"
                style={{ color: a }}
              >
                View Case Study
              </span>
              <span className="font-mono text-[8px] uppercase tracking-[0.32em] text-muted-foreground sm:text-[9px]">
                ▸ ENTER DEBRIEF ▸
              </span>
            </div>

            {/* horizontal accent scan-line */}
            <div
              className="sigma-card-scanline absolute left-1/2 top-1/2 h-px -translate-x-1/2 -translate-y-1/2"
              style={{ background: `linear-gradient(90deg, transparent 0%, ${a} 50%, transparent 100%)` }}
            />
          </div>
        </div>

        {/* content */}
        <div className="flex flex-1 flex-col gap-2 p-3">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-sans text-base font-black uppercase leading-[0.95] tracking-tight sm:text-lg xl:text-xl">
              {project.name}
            </h3>
            <span className="sigma-card-arrow mt-1 inline-block" style={{ color: a }} aria-hidden>
              →
            </span>
          </div>
          <p className="line-clamp-2 font-serif text-xs italic leading-snug text-muted-foreground sm:text-sm">
            {project.description}
          </p>

          {/* footer stats */}
          <div className="mt-auto flex items-center gap-3 pt-2 font-mono text-[9px] text-foreground/80">
            <span className="flex items-center gap-0.5">
              <Star className="h-2.5 w-2.5" /> {project.stars}
            </span>
            <span className="flex items-center gap-0.5">
              <GitFork className="h-2.5 w-2.5" /> {project.forks}
            </span>
            <span className="flex items-center gap-0.5">
              <CircleDot className="h-2.5 w-2.5" /> {project.openIssues}
            </span>
            <span className="ml-auto hidden font-mono text-[8px] uppercase tracking-[0.18em] text-muted-foreground sm:block">
              /{project.id}
            </span>
          </div>
        </div>

        {/* bottom accent stripe */}
        <div
          className="sigma-card-strip h-[2px] w-full opacity-30 transition-opacity group-hover:opacity-90"
          style={{ background: `linear-gradient(90deg, transparent 0%, ${a} 50%, transparent 100%)` }}
          aria-hidden
        />
      </article>
    </button>
  );
}

function ProjectDetail({ project }: { project: Project }) {
  const a = project.accent;
  return (
    <div className="grid max-h-[70vh] grid-cols-1 gap-0 overflow-y-auto md:grid-cols-2 sigma-scroll-hidden">
      <div className="relative border-r border-border bg-black">
        <img
          src={project.image}
          alt={project.name}
          className="h-full max-h-[70vh] w-full object-cover object-top"
        />
        <div className="sigma-scanlines pointer-events-none absolute inset-0 opacity-40" />
        {/* hazard corner */}
        <div
          className="absolute right-0 top-0 h-6 w-6"
          style={{
            background: `repeating-linear-gradient(45deg, ${a} 0, ${a} 2px, transparent 2px, transparent 4px)`,
          }}
          aria-hidden
        />
      </div>
      <div className="flex flex-col gap-3 p-4">
        <div>
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            <span style={{ color: a }}>{project.code}</span>
            <span>·</span>
            <span>{project.category}</span>
          </div>
          <h3 className="mt-1 font-sans text-2xl font-black uppercase tracking-tight">
            {project.name}
          </h3>
          <p className="mt-2 font-serif text-sm italic text-foreground/80">
            {project.description}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {[
            ["LANGUAGE", project.language],
            ["STARS", String(project.stars)],
            ["FORKS", String(project.forks)],
            ["ISSUES", String(project.openIssues)],
            ["SIZE", `${project.size}KB`],
            ["UPDATED", project.updated],
          ].map(([k, v]) => (
            <div key={k} className="border border-border p-2">
              <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">
                {k}
              </div>
              <div className="font-mono text-sm font-bold text-foreground">{v}</div>
            </div>
          ))}
        </div>

        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            ▸ TOPICS
          </div>
          <div className="mt-1.5 flex flex-wrap gap-1">
            {project.topics.map((t) => (
              <Tag key={t} accent={a}>
                {t}
              </Tag>
            ))}
          </div>
        </div>

        {/* ONE-LINE repo-restricted cover — sci-fi classified aesthetic */}
        <div className="mt-auto flex gap-2">
          <span
            className="inline-flex w-full items-center justify-center gap-2 whitespace-nowrap border border-dashed border-[#FF3D3D]/55 bg-[#FF3D3D]/5 px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.22em] text-[#FF3D3D] [text-shadow:0_0_10px_rgba(255,61,61,0.35)]"
            title="Repository access restricted — contact us to request access"
          >
            <Lock className="h-3.5 w-3.5 shrink-0" />
            ▸ [ REPO ACCESS: RESTRICTED ] ◄
          </span>
        </div>
      </div>
    </div>
  );
}
