"use client";

import { lusitana } from "@/app/ui/fonts";
import { ReactNode } from "react";

type ScientificPanelProps = {
  children: ReactNode;
  accent?: "slate" | "emerald" | "purple";
};

export function ScientificPanel({ children, accent = "slate" }: ScientificPanelProps) {
  const accents: Record<NonNullable<ScientificPanelProps["accent"]>, string> = {
    slate: "border-slate-800/60 bg-slate-900/60",
    emerald: "border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 via-slate-900 to-slate-950",
    purple: "border-purple-500/20 bg-gradient-to-br from-purple-500/10 via-slate-900 to-slate-950",
  };

  return <section className={`rounded-2xl p-6 ${accents[accent]}`}>{children}</section>;
}

type ScientificPanelHeaderProps = {
  title: string;
  description?: string;
  action?: ReactNode;
};

export function ScientificPanelHeader({ title, description, action }: ScientificPanelHeaderProps) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <h2 className={`text-lg font-semibold text-slate-100 ${lusitana.className}`}>{title}</h2>
        {description ? <p className="text-xs text-slate-400">{description}</p> : null}
      </div>
      {action ? <div className="flex items-center gap-2 text-xs text-blue-200">{action}</div> : null}
    </div>
  );
}

type ScientificContentGridProps = {
  columns?: 1 | 2 | 3;
  children: ReactNode;
};

export function ScientificContentGrid({ columns = 1, children }: ScientificContentGridProps) {
  const columnClass =
    columns === 3
      ? "md:grid-cols-3"
      : columns === 2
      ? "md:grid-cols-2"
      : "md:grid-cols-1";

  return <div className={`grid gap-6 ${columnClass}`}>{children}</div>;
}

type ScientificPlaceholderProps = {
  lines?: number;
};

export function ScientificPlaceholder({ lines = 3 }: ScientificPlaceholderProps) {
  return (
    <div className="space-y-3">
      {Array.from({ length: lines }).map((_, index) => (
        <div key={index} className="h-3 rounded-full bg-slate-800/60" aria-hidden />
      ))}
    </div>
  );
}
