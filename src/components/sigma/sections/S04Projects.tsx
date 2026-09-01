"use client";

import * as React from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { PROJECTS, type Project } from "@/lib/sigma/projects";
import { useSigmaStore } from "@/lib/sigma/store";
import { SectionShell } from "../shared/SectionShell";
import { BrutalButton, Crosshair, Panel, Tag } from "../shared/components";
import { SigmaParticles } from "../shared/SigmaParticles";
import { ClassifiedCover } from "../shared/ClassifiedCover";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Github, Star, GitFork, CircleDot } from "lucide-react";

gsap.registerPlugin(useGSAP);

const CATEGORIES = [
  "ALL",
  "Web3",
  "Full-Stack",
  "AI Systems",
  "Design",
];

const langColor: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Python: "#3572A5",
  Markdown: "#083fa1",
};

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
      tagline="Sector 04 is the project vault — 9 shipped systems with real screenshots. Contact us for repo access."
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
          <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            <span>
              <span className="text-[#C6FF00]">{filtered.length}</span> / {PROJECTS.length} ARTIFACTS
            </span>
            {/* GitHub link — stylized as "[REDACTED]" cover (repo not published) */}
            <span
              className="inline-flex items-center gap-1.5 border border-dashed border-[#B85C2E]/50 bg-[#B85C2E]/5 px-2 py-0.5 text-[#B85C2E] line-through decoration-[#B85C2E]/60"
              title="Repository access restricted — contact us to request access"
            >
              <Github className="h-3.5 w-3.5" /> [REDACTED]
            </span>
          </div>
        </div>

        {/* grid — curated spacing, not claustrophobic. 2 cols mobile, 3 cols tablet, 3 cols desktop (wider cards). */}
        <div className="min-h-0 flex-1 overflow-y-auto sigma-scroll-hidden">
          <div className="grid grid-cols-1 gap-4 p-1 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i + 1} onOpen={() => setActiveProject(p.id)} />
            ))}
          </div>
        </div>

        {/* footer CTA — matches Alpha portfolio: CONTACT US button */}
        <div className="flex items-center justify-between border-t border-border pt-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            ▸ Screenshots captured live · synced {new Date().toISOString().slice(0, 10)}
          </span>
          <BrutalButton accent="#C6FF00" onClick={() => navigate("s10")}>
            CONTACT US ▸
          </BrutalButton>
        </div>
      </div>

      {/* DETAIL DIALOG — BIG (sm:max-w-6xl beats the default sm:max-w-lg; maxHeight 90vh) to prevent overflow */}
      <Dialog open={!!selected} onOpenChange={(o) => !o && setActiveProject(null)}>
        <DialogContent className="max-w-[calc(100%-2rem)] sm:max-w-6xl gap-0 overflow-hidden border-foreground/30 bg-card p-0" style={{ maxHeight: '90vh' }}>
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

function ProjectCard({ project, index, onOpen }: { project: Project; index: number; onOpen: () => void }) {
  return (
    <button
      data-proj
      onClick={onOpen}
      className="group sigma-card-hover relative block w-full overflow-hidden border border-border bg-card text-left"
      style={{
        aspectRatio: "16 / 10",
        "--sigma-hover-accent": project.accent,
      } as React.CSSProperties}
    >
      {/* Accent underline draw — fires on .sigma-card-hover:hover (L→R, 0.5s) */}
      <span className="sigma-underline-draw" aria-hidden />
      {/* Ghost index numeral — oversized 6% → 14% opacity on hover (project accent) */}
      <span className="sigma-ghost-numeral" aria-hidden>
        {String(index).padStart(2, "0")}
      </span>

      {project.image ? (
        <Image
          src={project.image}
          alt={project.name}
          // PERF (LOOP-1-LH): next/image auto-serves AVIF/WebP at the right
          // intrinsic size — replaces the 5.2MB royaldao.png + 1.7MB dukon-pro.png
          // on the wire with ~50-120KB variants. Grid is 1/2/3 cols.
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover object-top opacity-95 transition-all duration-500 group-hover:scale-105 group-hover:opacity-100"
        />
      ) : (
        /* Retro brutalist glitching green PC screen — replaces the old
           "[ SCREENSHOT CLASSIFIED ]" cover. */
        <ClassifiedCover variant="card" className="absolute inset-0" />
      )}
      <div
        className="absolute inset-0 opacity-20 mix-blend-color transition-opacity group-hover:opacity-40"
        style={{ background: project.accent }}
      />
      <div className="sigma-scanlines absolute inset-0 opacity-40" />
      <div className="sigma-grid-fine absolute inset-0 opacity-20" />

      <div className="absolute inset-x-0 top-0 flex items-start justify-between p-2">
        <span className="bg-background/70 px-1.5 py-0.5 font-mono text-[9px] tracking-[0.18em] text-[#C6FF00] backdrop-blur-sm">
          {project.code}
        </span>
        <span className="flex items-center gap-1 bg-background/70 px-1.5 py-0.5 font-mono text-[9px] backdrop-blur-sm">
          <span
            className="h-2 w-2"
            style={{ background: langColor[project.language] ?? "#888" }}
          />
          {project.language}
        </span>
      </div>

      <div className="absolute inset-x-0 bottom-0 p-2">
        <div className="font-sans text-sm font-bold uppercase leading-tight tracking-tight text-foreground drop-shadow-[0_2px_6px_rgba(0,0,0,0.95)]">
          {project.name}
        </div>
        <div className="mt-0.5 line-clamp-1 font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
          {project.category}
        </div>
        <div className="mt-1.5 flex items-center gap-2 font-mono text-[9px] text-foreground/80">
          <span className="flex items-center gap-0.5 whitespace-nowrap">
            <Star className="h-2.5 w-2.5 shrink-0" /> {project.loc}
          </span>
          <span className="flex items-center gap-0.5 whitespace-nowrap">
            <GitFork className="h-2.5 w-2.5 shrink-0" /> {project.category}
          </span>
          <span className="flex items-center gap-0.5 whitespace-nowrap">
            <CircleDot className="h-2.5 w-2.5 shrink-0" /> {project.budget}
          </span>
        </div>
      </div>

      <Crosshair className="left-1 top-1 text-foreground/40" size={8} />
      <div className="absolute right-1 top-1 font-mono text-[8px] text-foreground/40">+</div>
    </button>
  );
}

function ProjectDetail({ project }: { project: Project }) {
  return (
    <div className="grid max-h-[calc(90vh-3rem)] grid-cols-1 gap-0 overflow-y-auto md:grid-cols-2 sigma-scroll-hidden">
      <div className="relative border-r border-border bg-black">
        {project.image ? (
          <Image
            src={project.image}
            alt={project.name}
            // PERF (LOOP-1-LH): next/image — large detail panel image.
            // Detail dialog is full-bleed on the left half (≈50vw on desktop).
            fill
            sizes="(max-width: 767px) 100vw, 50vw"
            className="object-cover object-top"
            // The container has max-h-[calc(90vh-3rem)]; the rendered Image
            // inherits that cap from its parent (position:relative + height
            // set by the grid + overflow-y-auto).
          />
        ) : (
          /* No image — fill the entire left panel with the ClassifiedCover
             so there's no negative space. The cover stretches to match
             the height of the right-side content panel. */
          <div className="absolute inset-0">
            <ClassifiedCover variant="detail" className="h-full w-full" />
          </div>
        )}
        <div className="sigma-scanlines pointer-events-none absolute inset-0 opacity-40" />
      </div>
      <div className="flex flex-col gap-4 p-6">
        <div>
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            <span style={{ color: project.accent }}>{project.code}</span>
            <span>·</span>
            <span>{project.category}</span>
          </div>
          <h3 className="mt-1 font-sans text-3xl font-black uppercase tracking-tight">
            {project.name}
          </h3>
          <p className="mt-2 font-serif text-base italic text-foreground/80">
            {project.description}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {([
            ["LOC", project.loc],
            ["CATEGORY", project.category],
            ["BUDGET (LOCAL)", project.budget],
            ["BUDGET (INTL)", project.intlBudget],
            ["SIZE", `${project.size}KB`],
            ["UPDATED", project.updated],
          ] as const).map(([k, v]) => (
            <div
              key={k}
              className={`border p-2 ${
                k === "BUDGET (LOCAL)"
                  ? "border-[#00FF94]/40"
                  : k === "BUDGET (INTL)"
                    ? "border-[#FF4500]/40"
                    : "border-border"
              }`}
            >
              <div
                className={`font-mono text-[9px] uppercase tracking-[0.18em] ${
                  k === "BUDGET (LOCAL)"
                    ? "text-[#00FF94]"
                    : k === "BUDGET (INTL)"
                      ? "text-[#FF4500]"
                      : "text-muted-foreground"
                }`}
              >
                {k}
              </div>
              <div
                className={`font-mono text-sm font-bold ${
                  k === "BUDGET (LOCAL)"
                    ? "text-[#00FF94]"
                    : k === "BUDGET (INTL)"
                      ? "text-[#FF4500]"
                      : "text-foreground"
                }`}
              >
                {v}
              </div>
            </div>
          ))}
          {/* Full-width LANGUAGES row — replaces the old single LANGUAGE cell.
              Shows the project's top 3–5 languages as styled accent tags. */}
          <div className="col-span-3 border border-border p-2">
            <div className="font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground">
              LANGUAGES
            </div>
            <div className="mt-1.5 flex flex-wrap gap-1">
              {(project.languages?.length ? project.languages : [project.language]).map((lang) => (
                <span
                  key={lang}
                  className="border px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.12em]"
                  style={{
                    borderColor: `${project.accent}44`,
                    color: project.accent,
                  }}
                >
                  {lang}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            ▸ TOPICS
          </div>
          <div className="mt-1.5 flex flex-wrap gap-1">
            {project.topics.map((t) => (
              <Tag key={t} accent={project.accent}>
                {t}
              </Tag>
            ))}
          </div>
        </div>

        <div className="mt-auto flex gap-2">
          {/* One-line repo-restricted cover — designed to fit in one line, no wrapping */}
          <span
            className="inline-flex w-full items-center justify-center gap-2 whitespace-nowrap border border-dashed border-[#B85C2E]/50 bg-[#B85C2E]/5 px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-[#B85C2E] [text-shadow:0_0_8px_rgba(184,92,46,0.35)]"
            title="Repository access restricted — contact us to request access"
          >
            <Github className="h-4 w-4 shrink-0" /> ▸ [ REPO ACCESS: RESTRICTED ] ◄
          </span>
        </div>
      </div>
    </div>
  );
}
