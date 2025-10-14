"use client";

import { ReactNode } from "react";

type ScientificDashboardLayoutProps = {
  sidebar: ReactNode;
  header: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
};

export function ScientificDashboardLayout({
  sidebar,
  header,
  children,
  footer,
}: ScientificDashboardLayoutProps) {
  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100">
      <aside className="hidden w-72 flex-col border-r border-slate-800 bg-slate-900/60 px-6 py-8 lg:flex">
        {sidebar}
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="border-b border-slate-800 bg-slate-900/80 px-6 py-4 backdrop-blur">{header}</header>

        <main className="flex-1 overflow-y-auto bg-slate-950/80 px-6 py-8">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">{children}</div>
        </main>

        {footer ? (
          <footer className="border-t border-slate-800 bg-slate-900/60 px-6 py-4 text-sm text-slate-500">
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              {footer}
            </div>
          </footer>
        ) : null}
      </div>
    </div>
  );
}
