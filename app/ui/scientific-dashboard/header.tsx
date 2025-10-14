"use client";

import { lusitana } from "@/app/ui/fonts";
import { ReactNode } from "react";

type ScientificHeaderTitleProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function ScientificHeaderTitle({ eyebrow, title, description }: ScientificHeaderTitleProps) {
  return (
    <div className="flex-1">
      {eyebrow ? (
        <p className={`text-sm uppercase tracking-[0.35em] text-blue-400/80 ${lusitana.className}`}>{eyebrow}</p>
      ) : null}
      <h1 className="text-2xl font-semibold text-slate-50 lg:text-3xl">{title}</h1>
      {description ? <p className="mt-1 text-sm text-slate-400">{description}</p> : null}
    </div>
  );
}

type ScientificHeaderToolbarProps = {
  children: ReactNode;
};

export function ScientificHeaderToolbar({ children }: ScientificHeaderToolbarProps) {
  return <div className="flex flex-col gap-2 sm:flex-row">{children}</div>;
}

type ScientificToolbarActionProps = {
  children: ReactNode;
};

export function ScientificToolbarAction({ children }: ScientificToolbarActionProps) {
  return (
    <button className="rounded-full border border-blue-500/40 bg-blue-500/10 px-4 py-2 text-center text-xs font-medium text-blue-200 transition hover:border-blue-400 hover:bg-blue-500/20">
      {children}
    </button>
  );
}
