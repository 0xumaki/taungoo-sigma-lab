"use client";

import * as React from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { PROJECTS, type Project } from "@/lib/sigma/projects";
import { useSigmaStore } from "@/lib/sigma/store";
import { SectionShell } from "../shared/SectionShell";
import { BrutalButton, Crosshair, Panel, Tag } from "../shared/components";
import { SigmaParticles } from "../shared/SigmaParticles";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Github, Star, GitFork, CircleDot } from "lucide-react";
import { useCardReveal } from "@/lib/sigma/use-card-reveal";

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

export function S04Projects() {
  const { navigate, activeProject, setActiveProject } = useSigmaStore();
  const cardsRef = useCardReveal<HTMLDivElement>({ stagger: true });
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
    { scope: cardsRef, dependencies: [filter] }
  );

  return (
    <SectionShell
      id="s04"
      title="PROJECT VAULT"
      tagline="Sector 04 is the portfolio — 11 live GitHub repos with real screenshots and commit history."
    >
      <div ref={cardsRef} className="relative flex h-full flex-col gap-3">
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
            <a
              href="https://github.com/0xumaki"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-foreground hover:text-[#C6FF00]"
            >
              <Github className="h-3.5 w-3.5" /> @0xumaki
            </a>
          </div>
        </div>

        {/* grid */}
        <div className="min-h-0 flex-1 overflow-y-auto sigma-scroll-hidden">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
            {filtered.map((p) => (
              <ProjectCard key={p.id} project={p} onOpen={() => setActiveProject(p.id)} />
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

function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  return (
    <button
      data-proj
      onClick={onOpen}
      className="sigma-card-reveal sigma-hover-card group relative block w-full overflow-hidden border border-border bg-card text-left transition-all duration-300 hover:-translate-y-1 hover:border-[#C6FF00]"
      style={{ aspectRatio: "4 / 3", "--sigma-hover-accent": "#C6FF00" } as React.CSSProperties}
    >
      <img
        src={project.image}
        alt={project.name}
        className="sigma-hover-img absolute inset-0 h-full w-full object-cover object-top opacity-95 transition-all duration-500 group-hover:scale-105 group-hover:opacity-100"
      />
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
          <span className="flex items-center gap-0.5">
            <Star className="h-2.5 w-2.5" /> {project.stars}
          </span>
          <span className="flex items-center gap-0.5">
            <GitFork className="h-2.5 w-2.5" /> {project.forks}
          </span>
          <span className="flex items-center gap-0.5">
            <CircleDot className="h-2.5 w-2.5" /> {project.openIssues}
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
    <div className="grid max-h-[70vh] grid-cols-1 gap-0 overflow-y-auto md:grid-cols-2 sigma-scroll-hidden">
      <div className="relative border-r border-border bg-black">
        <img
          src={project.image}
          alt={project.name}
          className="h-full max-h-[70vh] w-full object-cover object-top"
        />
        <div className="sigma-scanlines pointer-events-none absolute inset-0 opacity-40" />
      </div>
      <div className="flex flex-col gap-3 p-4">
        <div>
          <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            <span style={{ color: project.accent }}>{project.code}</span>
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
              <Tag key={t} accent={project.accent}>
                {t}
              </Tag>
            ))}
          </div>
        </div>

        <div className="mt-auto flex gap-2">
          <a
            href={project.htmlUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex flex-1 items-center justify-center gap-2 bg-foreground px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-background transition hover:bg-foreground/85"
          >
            <Github className="h-4 w-4" /> VIEW REPO ►
          </a>
        </div>
      </div>
    </div>
  );
}
