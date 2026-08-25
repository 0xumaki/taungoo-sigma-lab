"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "dark" | "light";

const THEME_KEY = "sigma-theme";

/**
 * SigmaThemeToggle — toggles between dark (default) and light themes.
 * Applies a `light` class to <html> which activates the light CSS variables.
 */
export function SigmaThemeToggle() {
  const [theme, setTheme] = React.useState<Theme>("dark");

  React.useEffect(() => {
    try {
      const saved = localStorage.getItem(THEME_KEY) as Theme | null;
      if (saved === "light") {
        setTheme("light");
        document.documentElement.classList.remove("dark");
        document.documentElement.classList.add("light");
      }
    } catch {
      // ignore
    }
  }, []);

  const toggle = React.useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === "dark" ? "light" : "dark";
      try {
        localStorage.setItem(THEME_KEY, next);
      } catch {
        // ignore
      }
      if (next === "light") {
        document.documentElement.classList.remove("dark");
        document.documentElement.classList.add("light");
      } else {
        document.documentElement.classList.remove("light");
        document.documentElement.classList.add("dark");
      }
      return next;
    });
  }, []);

  // [L] keyboard shortcut for theme toggle
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "l" || e.key === "L") {
        const t = e.target as HTMLElement;
        if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
        e.preventDefault();
        toggle();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [toggle]);

  return (
    <button
      onClick={toggle}
      className="fixed right-9 top-[58px] z-[79] flex items-center gap-1.5 border border-border bg-background/80 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.18em] text-muted-foreground backdrop-blur-sm transition-colors hover:border-foreground/40 hover:text-foreground"
      data-cursor="hover"
      aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      title={theme === "dark" ? "SIGMA DARK — click for light" : "SIGMA LIGHT — click for dark"}
    >
      {theme === "dark" ? (
        <>
          <Moon className="h-3 w-3 text-[#FFB300]" />
          <span className="text-[#FFB300]">DRK</span>
        </>
      ) : (
        <>
          <Sun className="h-3 w-3 text-[#FF4500]" />
          <span className="text-[#FF4500]">LGT</span>
        </>
      )}
    </button>
  );
}
