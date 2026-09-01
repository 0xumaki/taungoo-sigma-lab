"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";

type Theme = "dark" | "light";

const THEME_KEY = "sigma-theme";

/**
 * SigmaThemeToggle — toggles between dark (default) and light themes.
 * Applies a `sigma-light` class to <html> which activates light CSS variables.
 * IMPORTANT: This ONLY affects Sigma mode. The class is `sigma-light` (not `light`)
 * to prevent any bleed into Alpha or Beta modes.
 * When switching to Alpha/Beta, the class is removed and re-applied on return.
 */
export function SigmaThemeToggle() {
  const [theme, setTheme] = React.useState<Theme>("dark");

  React.useEffect(() => {
    try {
      const saved = localStorage.getItem(THEME_KEY) as Theme | null;
      if (saved === "light") {
        setTheme("light");
        document.documentElement.classList.remove("dark");
        document.documentElement.classList.add("sigma-light");
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
        document.documentElement.classList.add("sigma-light");
      } else {
        document.documentElement.classList.remove("sigma-light");
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

/**
 * Ensures sigma-light class is removed when leaving Sigma mode
 * and re-applied when returning (if it was previously enabled).
 * Call this from the mode switcher.
 */
export function syncSigmaTheme(currentMode: string) {
  const isLight = document.documentElement.classList.contains("sigma-light");
  if (currentMode !== "sigma" && isLight) {
    // Leaving sigma — remove light class to prevent bleed
    document.documentElement.classList.remove("sigma-light");
    document.documentElement.dataset.savedTheme = "light";
  } else if (currentMode === "sigma" && document.documentElement.dataset.savedTheme === "light") {
    // Returning to sigma — restore light class
    document.documentElement.classList.add("sigma-light");
    delete document.documentElement.dataset.savedTheme;
  }
}
