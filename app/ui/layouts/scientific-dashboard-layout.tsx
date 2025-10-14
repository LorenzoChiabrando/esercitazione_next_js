"use client";

import { lusitana } from "@/app/ui/fonts";
import Link from "next/link";
import { ElementType, ReactNode } from "react";

type LayoutProps = {
  sidebar: ReactNode;
  header: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
};

export function ScientificDashboardLayout({ sidebar, header, children, footer }: LayoutProps) {
  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100">
      <aside className="hidden w-72 flex-col border-r border-slate-800 bg-slate-900/60 px-6 py-8 lg:flex">{sidebar}</aside>

      <div className="flex flex-1 flex-col">
        <header className="border-b border-slate-800 bg-slate-900/80 px-6 py-4 backdrop-blur">{header}</header>

        <main className="flex-1 overflow-y-auto bg-slate-950/80 px-6 py-8">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">{children}</div>
        </main>

        {footer ? (
          <footer className="border-t border-slate-800 bg-slate-900/60 px-6 py-4 text-sm text-slate-500">
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">{footer}</div>
          </footer>
        ) : null}
      </div>
    </div>
  );
}

type SidebarHeaderProps = {
  icon: ElementType<{ className?: string }>;
  title: string;
  subtitle?: string;
};

export function ScientificSidebarHeader({ icon: Icon, title, subtitle }: SidebarHeaderProps) {
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

type SidebarSectionProps = {
  title: string;
  children: ReactNode;
};

export function ScientificSidebarSection({ title, children }: SidebarSectionProps) {
  return (
    <section className="space-y-3">
      <p className={`text-xs uppercase tracking-[0.35em] text-slate-500 ${lusitana.className}`}>{title}</p>
      <div className="space-y-3">{children}</div>
    </section>
  );
}

type SidebarNavProps = {
  children: ReactNode;
};

export function ScientificSidebarNav({ children }: SidebarNavProps) {
  return <nav className="space-y-3">{children}</nav>;
}

type SidebarNavItemProps = {
  label: string;
  description?: string;
  href?: string;
  icon?: ElementType<{ className?: string }>;
};

export function ScientificSidebarNavItem({ label, description, href = "#", icon: Icon }: SidebarNavItemProps) {
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

type HeaderTitleProps = {
  eyebrow?: string;
  title: string;
  description?: string;
};

export function ScientificHeaderTitle({ eyebrow, title, description }: HeaderTitleProps) {
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

type HeaderToolbarProps = {
  children: ReactNode;
};

export function ScientificHeaderToolbar({ children }: HeaderToolbarProps) {
  return <div className="flex flex-col gap-2 sm:flex-row">{children}</div>;
}

type MobileNavProps = {
  children: ReactNode;
};

export function ScientificMobileNav({ children }: MobileNavProps) {
  return <div className="mt-4 flex gap-3 overflow-x-auto pb-1 text-sm text-slate-300 lg:hidden">{children}</div>;
}

type MobileNavItemProps = {
  icon?: ElementType<{ className?: string }>;
  label: string;
  href?: string;
};

export function ScientificMobileNavItem({ icon: Icon, label, href = "#" }: MobileNavItemProps) {
  const content = (
    <span className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/60 px-4 py-2 transition hover:border-blue-500/50 hover:text-blue-200">
      {Icon ? <Icon className="h-4 w-4" /> : null}
      {label}
    </span>
  );

  if (!href) {
    return <div>{content}</div>;
  }

  return (
    <Link href={href} className="inline-flex">
      {content}
    </Link>
  );
}

type ToolbarActionProps = {
  children: ReactNode;
};

export function ScientificToolbarAction({ children }: ToolbarActionProps) {
  return (
    <button className="rounded-full border border-blue-500/40 bg-blue-500/10 px-4 py-2 text-center text-xs font-medium text-blue-200 transition hover:border-blue-400 hover:bg-blue-500/20">
      {children}
    </button>
  );
}

type PanelProps = {
  children: ReactNode;
  accent?: "slate" | "emerald" | "purple";
};

export function ScientificPanel({ children, accent = "slate" }: PanelProps) {
  const accents: Record<PanelProps["accent"], string> = {
    slate: "border-slate-800/60 bg-slate-900/60",
    emerald: "border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 via-slate-900 to-slate-950",
    purple: "border-purple-500/20 bg-gradient-to-br from-purple-500/10 via-slate-900 to-slate-950",
  };

  return <section className={`rounded-2xl p-6 ${accents[accent]}`}>{children}</section>;
}

type PanelHeaderProps = {
  title: string;
  description?: string;
  action?: ReactNode;
};

export function ScientificPanelHeader({ title, description, action }: PanelHeaderProps) {
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

type ContentGridProps = {
  columns?: 1 | 2 | 3;
  children: ReactNode;
};

export function ScientificContentGrid({ columns = 1, children }: ContentGridProps) {
  const columnClass =
    columns === 3
      ? "md:grid-cols-3"
      : columns === 2
      ? "md:grid-cols-2"
      : "md:grid-cols-1";

  return <div className={`grid gap-6 ${columnClass}`}>{children}</div>;
}

type PlaceholderProps = {
  lines?: number;
};

export function ScientificPlaceholder({ lines = 3 }: PlaceholderProps) {
  return (
    <div className="space-y-3">
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className="h-3 rounded-full bg-slate-800/60"
          aria-hidden
        />
      ))}
    </div>
  );
}

