"use client";

import { lusitana } from "@/app/ui/fonts";
import Link from "next/link";
import { ElementType, ReactNode } from "react";

type ScientificSidebarHeaderProps = {
  icon: ElementType<{ className?: string }>;
  title: string;
  subtitle?: string;
};

export function ScientificSidebarHeader({
  icon: Icon,
  title,
  subtitle,
}: ScientificSidebarHeaderProps) {
  return (
    <div className="mb-10 flex items-center gap-3">
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/10 text-blue-400">
        <Icon className="h-6 w-6" />
      </span>
      <div>
        <p className={`text-sm uppercase tracking-widest text-slate-400 ${lusitana.className}`}>{title}</p>
        {subtitle ? <p className="text-lg font-semibold text-slate-50">{subtitle}</p> : null}
      </div>
    </div>
  );
}

type ScientificSidebarSectionProps = {
  title: string;
  children: ReactNode;
};

export function ScientificSidebarSection({ title, children }: ScientificSidebarSectionProps) {
  return (
    <section className="space-y-3">
      <p className={`text-xs uppercase tracking-[0.35em] text-slate-500 ${lusitana.className}`}>{title}</p>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

type ScientificSidebarNavProps = {
  children: ReactNode;
};

export function ScientificSidebarNav({ children }: ScientificSidebarNavProps) {
  return <nav className="space-y-3">{children}</nav>;
}

type ScientificSidebarNavItemProps = {
  label: string;
  description?: string;
  href?: string;
  icon?: ElementType<{ className?: string }>;
};

export function ScientificSidebarNavItem({
  label,
  description,
  href = "#",
  icon: Icon,
}: ScientificSidebarNavItemProps) {
  const content = (
    <div className="flex items-center gap-3">
      {Icon ? (
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900 text-blue-300 transition group-hover:bg-blue-500/10 group-hover:text-blue-400">
          <Icon className="h-5 w-5" />
        </span>
      ) : null}
      <div>
        <p className="text-sm font-semibold text-slate-100">{label}</p>
        {description ? <p className="text-xs text-slate-400">{description}</p> : null}
      </div>
    </div>
  );

  if (!href) {
    return (
      <div className="rounded-xl border border-slate-800/60 bg-slate-900/40 p-4">
        {content}
      </div>
    );
  }

  return (
    <Link
      href={href}
      className="group block rounded-xl border border-slate-800/60 bg-slate-900/40 p-4 transition hover:border-blue-500/60 hover:bg-slate-900/80"
    >
      {content}
    </Link>
  );
}
