"use client";

import { lusitana } from "@/app/ui/fonts";
import { BeakerIcon, BoltIcon, ChartBarIcon, CpuChipIcon, Squares2X2Icon } from "@heroicons/react/24/outline";
import { ReactNode } from "react";
import Link from "next/link";

const NAVIGATION_ITEMS = [
  {
    name: "Panoramica",
    description: "Stato dei progetti e metriche principali",
    href: "#overview",
    icon: Squares2X2Icon,
  },
  {
    name: "Simulazioni",
    description: "Cronologia delle esecuzioni e pianificazione",
    href: "#simulations",
    icon: BeakerIcon,
  },
  {
    name: "Analisi",
    description: "Dashboard dedicate alle analisi post-processing",
    href: "#analysis",
    icon: ChartBarIcon,
  },
  {
    name: "Pipeline",
    description: "Gestione dei workflow computazionali",
    href: "#pipelines",
    icon: CpuChipIcon,
  },
];

const QUICK_ACTIONS = [
  { label: "Nuova simulazione", href: "#new" },
  { label: "Importa dati", href: "#import" },
  { label: "Report giornaliero", href: "#report" },
];

export function ScientificDashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100">
      <aside className="hidden w-72 flex-col border-r border-slate-800 bg-slate-900/60 px-6 py-8 lg:flex">
        <div className="mb-10 flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/10 text-blue-400">
            <BoltIcon className="h-6 w-6" />
          </span>
          <div>
            <p className={`text-sm uppercase tracking-widest text-slate-400 ${lusitana.className}`}>BioSim Lab</p>
            <p className="text-lg font-semibold text-slate-50">Control Center</p>
          </div>
        </div>
        <nav className="flex-1 space-y-6">
          {NAVIGATION_ITEMS.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="group block rounded-xl border border-slate-800/60 bg-slate-900/40 p-4 transition hover:border-blue-500/60 hover:bg-slate-900/80"
            >
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900 text-blue-300 transition group-hover:bg-blue-500/10 group-hover:text-blue-400">
                  <item.icon className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-semibold text-slate-100">{item.name}</p>
                  <p className="text-xs text-slate-400">{item.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </nav>
        <div className="mt-8 rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 via-slate-900 to-slate-950 p-5">
          <p className="text-sm font-semibold text-emerald-300">Pipeline attive</p>
          <p className="mt-2 text-xs text-slate-300">
            Monitora in tempo reale le risorse HPC e ricevi alert proattivi in caso di anomalie dei job.
          </p>
        </div>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="border-b border-slate-800 bg-slate-900/80 px-6 py-4 backdrop-blur">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className={`text-sm uppercase tracking-[0.35em] text-blue-400/80 ${lusitana.className}`}>Scientific Suite</p>
              <h1 className="text-2xl font-semibold text-slate-50 lg:text-3xl">Centro di controllo sperimentazioni</h1>
              <p className="mt-1 text-sm text-slate-400">
                Configura, avvia e supervisiona le simulazioni computazionali bioinformatiche da un'unica interfaccia.
              </p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              {QUICK_ACTIONS.map((action) => (
                <Link
                  key={action.label}
                  href={action.href}
                  className="rounded-full border border-blue-500/40 bg-blue-500/10 px-4 py-2 text-center text-xs font-medium text-blue-200 transition hover:border-blue-400 hover:bg-blue-500/20"
                >
                  {action.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="mt-4 flex gap-3 overflow-x-auto pb-1 text-sm text-slate-300 lg:hidden">
            {NAVIGATION_ITEMS.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/60 px-4 py-2 transition hover:border-blue-500/50 hover:text-blue-200"
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            ))}
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-slate-950/80 px-6 py-8">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">{children}</div>
        </main>

        <footer className="border-t border-slate-800 bg-slate-900/60 px-6 py-4 text-sm text-slate-500">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} BioSim Lab. Tutti i diritti riservati.</p>
            <div className="flex gap-4">
              <Link href="#privacy" className="transition hover:text-slate-200">
                Privacy
              </Link>
              <Link href="#terms" className="transition hover:text-slate-200">
                Termini
              </Link>
              <Link href="#contact" className="transition hover:text-slate-200">
                Supporto tecnico
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
