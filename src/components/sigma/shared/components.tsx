"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

/* ---------------------------------------------------------------
   Crosshair — corner registration marks for panels
---------------------------------------------------------------- */
export function Crosshair({
  className,
  size = 12,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <span
      className={cn("pointer-events-none absolute", className)}
      style={{ width: size, height: size }}
      aria-hidden
    >
      <span className="absolute left-0 top-0 h-[1px] w-full bg-current opacity-60" />
      <span className="absolute left-0 top-0 h-full w-[1px] bg-current opacity-60" />
      <span className="absolute left-1/2 top-1/2 h-[3px] w-[3px] -translate-x-1/2 -translate-y-1/2 bg-current" />
    </span>
  );
}

/* ---------------------------------------------------------------
   CrosshairFrame — 4 corner registration marks wrapping children
---------------------------------------------------------------- */
export function CrosshairFrame({
  children,
  className,
  label,
}: {
  children: React.ReactNode;
  className?: string;
  label?: string;
}) {
  return (
    <div className={cn("sigma-crosshair relative", className)}>
      <Crosshair className="left-1 top-1" />
      <Crosshair className="right-1 top-1" />
      <Crosshair className="bottom-1 left-1" />
      <Crosshair className="bottom-1 right-1" />
      {label && (
        <span className="absolute -top-[1px] left-3 -translate-y-1/2 bg-background px-1.5 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
          {label}
        </span>
      )}
      {children}
    </div>
  );
}

/* ---------------------------------------------------------------
   Panel — brutalist bordered container
---------------------------------------------------------------- */
export function Panel({
  children,
  className,
  label,
  id,
  accent,
  scan,
}: {
  children?: React.ReactNode;
  className?: string;
  label?: string;
  id?: string;
  accent?: string;
  scan?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative border border-border bg-card/40 backdrop-blur-[1px]",
        scan && "sigma-scanlines",
        className
      )}
    >
      {(label || id) && (
        <div className="flex items-center justify-between border-b border-border/70 px-3 py-1.5">
          {label && (
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
              {label}
            </span>
          )}
          {id && (
            <span
              className="font-mono text-[10px] tracking-[0.18em]"
              style={{ color: accent ?? "var(--muted-foreground)" }}
            >
              {id}
            </span>
          )}
        </div>
      )}
      {children}
    </div>
  );
}

/* ---------------------------------------------------------------
   BrutalButton — sharp, monospace, arrow-bracketed
---------------------------------------------------------------- */
export function BrutalButton({
  children,
  onClick,
  className,
  variant = "solid",
  accent,
  arrow = true,
  ...props
}: {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "solid" | "ghost" | "outline";
  accent?: string;
  arrow?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const styles: Record<string, string> = {
    solid: "bg-foreground text-background hover:bg-foreground/85",
    ghost: "bg-transparent text-foreground hover:bg-foreground/10",
    outline:
      "bg-transparent text-foreground border border-foreground hover:bg-foreground hover:text-background",
  };
  return (
    <button
      onClick={onClick}
      className={cn(
        "group inline-flex items-center gap-2 px-4 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] transition-all duration-200 active:translate-x-[2px] active:translate-y-[2px]",
        styles[variant],
        className
      )}
      style={accent && variant === "solid" ? { background: accent, color: "#000" } : undefined}
      {...props}
    >
      {arrow && <span className="opacity-70">◄</span>}
      {children}
      {arrow && <span className="opacity-70">►</span>}
    </button>
  );
}

/* ---------------------------------------------------------------
   StatReadout — labelled metric
---------------------------------------------------------------- */
export function StatReadout({
  label,
  value,
  unit,
  accent,
  className,
}: {
  label: string;
  value: React.ReactNode;
  unit?: string;
  accent?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-1", className)}>
      <span className="font-mono text-[9px] uppercase tracking-[0.24em] text-muted-foreground">
        {label}
      </span>
      <span
        className="font-mono text-2xl font-medium leading-none tabular-nums"
        style={{ color: accent ?? "var(--foreground)" }}
      >
        {value}
        {unit && (
          <span className="ml-1 text-xs text-muted-foreground">{unit}</span>
        )}
      </span>
    </div>
  );
}

/* ---------------------------------------------------------------
   Tag — small status pill (sharp)
---------------------------------------------------------------- */
export function Tag({
  children,
  accent,
  className,
}: {
  children: React.ReactNode;
  accent?: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 border px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.2em]",
        className
      )}
      style={{
        borderColor: accent ? `${accent}66` : "var(--border)",
        color: accent ?? "var(--muted-foreground)",
      }}
    >
      <span
        className="h-1.5 w-1.5"
        style={{ background: accent ?? "var(--muted-foreground)" }}
      />
      {children}
    </span>
  );
}

/* ---------------------------------------------------------------
   Marquee — horizontal scrolling ticker
---------------------------------------------------------------- */
export function Marquee({
  children,
  className,
  duration = 28,
}: {
  children: React.ReactNode;
  className?: string;
  duration?: number;
}) {
  return (
    <div className={cn("overflow-hidden whitespace-nowrap", className)}>
      <div
        className="inline-block"
        style={{
          animation: `sigma-ticker ${duration}s linear infinite`,
        }}
      >
        <span className="inline-block">{children}</span>
        <span className="inline-block" aria-hidden>
          {children}
        </span>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------
   FieldLabel — monospace field label with leading marker
---------------------------------------------------------------- */
export function FieldLabel({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground",
        className
      )}
    >
      <span className="mr-1.5 text-foreground/50">▸</span>
      {children}
    </span>
  );
}

/* ---------------------------------------------------------------
   SectionCorner — big index number watermark
---------------------------------------------------------------- */
export function SectionCorner({
  code,
  index,
  accent,
}: {
  code: string;
  index: string;
  accent: string;
}) {
  return (
    <div className="pointer-events-none absolute right-4 top-4 z-20 flex flex-col items-end gap-0.5">
      <span
        className="font-mono text-[10px] tracking-[0.3em] text-muted-foreground"
      >
        SECTOR / {code}
      </span>
      <span
        className="font-mono text-5xl font-black leading-none"
        style={{ color: accent }}
      >
        {index}
      </span>
    </div>
  );
}
