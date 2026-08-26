"use client";

import { create } from "zustand";
import type { SectionId } from "./sections";

interface SigmaState {
  view: SectionId;
  prevView: SectionId;
  phase: "idle" | "covering" | "revealing";
  /** accent color driving the active transition / HUD */
  accent: string;
  /** a monotonically increasing tick used to retrigger section mount animations */
  visitToken: number;
  /** keyboard help overlay */
  helpOpen: boolean;
  /** gallery / detail overlay for portfolio */
  activeProject: string | null;
  /** which map node is hovered (for HUD readout) */
  hoverNode: SectionId | null;

  navigate: (to: SectionId) => void;
  boot: (to: SectionId) => void; // direct set, no transition (for deep-links/screenshots)
  setPhase: (p: SigmaState["phase"]) => void;
  setHoverNode: (id: SectionId | null) => void;
  setActiveProject: (id: string | null) => void;
  toggleHelp: () => void;
  setHelp: (v: boolean) => void;
}

export const useSigmaStore = create<SigmaState>((set, get) => ({
  view: "map",
  prevView: "map",
  phase: "idle",
  accent: "#FFFFFF",
  visitToken: 0,
  helpOpen: false,
  activeProject: null,
  hoverNode: null,

  navigate: (to) => {
    const { view, phase } = get();
    if (view === to) return;
    if (phase !== "idle") return; // ignore mid-transition
    set({
      view: to,
      prevView: view,
      phase: "covering",
      hoverNode: null,
    });
  },
  boot: (to) => {
    const { view } = get();
    set({
      view: to,
      prevView: view,
      phase: "idle",
      visitToken: get().visitToken + 1,
      hoverNode: null,
      activeProject: null,
    });
  },
  setPhase: (phase) => set({ phase }),
  setHoverNode: (id) => set({ hoverNode: id }),
  setActiveProject: (id) => set({ activeProject: id }),
  toggleHelp: () => set((s) => ({ helpOpen: !s.helpOpen })),
  setHelp: (v) => set({ helpOpen: v }),
}));
