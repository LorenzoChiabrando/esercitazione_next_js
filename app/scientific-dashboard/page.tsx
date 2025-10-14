import { ScientificDashboardLayout } from "@/app/ui/layouts/scientific-dashboard-layout";
import { lusitana } from "@/app/ui/fonts";
import { ArrowUpRightIcon, ClockIcon, CpuChipIcon } from "@heroicons/react/24/outline";

const METRICS = [
  {
    label: "Simulazioni attive",
    value: "12",
    delta: "+3",
    tone: "text-emerald-400",
    description: "workflow in esecuzione sulle code GPU",
  },
  {
    label: "Tempo medio",
    value: "48 min",
    delta: "-8%",
    tone: "text-sky-400",
    description: "riduzione rispetto all'ultima settimana",
  },
  {
    label: "Efficienza cluster",
    value: "87%",
    delta: "+5%",
    tone: "text-amber-400",
    description: "utilizzo ottimale delle risorse computazionali",
  },
];

const RECENT_RUNS = [
  {
    id: "BS-2043",
    target: "Simulazione modello cellulare 3D",
    status: "In esecuzione",
    eta: "2h 14m",
  },
  {
    id: "BS-2042",
    target: "Ottimizzazione parametri enzimatici",
    status: "Completata",
    eta: "Conclusa 35m fa",
  },
  {
    id: "BS-2041",
    target: "Screening virtuale molecole",
    status: "In coda",
    eta: "Avvio previsto 10:45",
  },
];

export default function Page() {
  return (
    <ScientificDashboardLayout>
      <section id="overview" className="grid gap-6 md:grid-cols-3">
        {METRICS.map((metric) => (
          <div
            key={metric.label}
            className="rounded-2xl border border-slate-800/60 bg-slate-900/50 p-6 shadow-lg shadow-slate-950/40"
          >
            <p className={`text-xs uppercase tracking-wide text-slate-400 ${lusitana.className}`}>{metric.label}</p>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-semibold text-slate-50">{metric.value}</span>
              <span className={`text-xs font-medium ${metric.tone}`}>{metric.delta}</span>
            </div>
            <p className="mt-2 text-xs text-slate-400">{metric.description}</p>
          </div>
        ))}
      </section>

      <section
        id="simulations"
        className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]"
      >
        <div className="rounded-2xl border border-slate-800/60 bg-slate-900/60 p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className={`text-lg font-semibold text-slate-100 ${lusitana.className}`}>Esecuzioni recenti</h2>
              <p className="text-xs text-slate-400">
                Monitoraggio in tempo reale dell'andamento delle simulazioni attive e completate.
              </p>
            </div>
            <button className="inline-flex items-center gap-1 rounded-full border border-blue-500/40 bg-blue-500/10 px-4 py-2 text-xs font-medium text-blue-200 transition hover:border-blue-400 hover:bg-blue-500/20">
              Storico completo
              <ArrowUpRightIcon className="h-4 w-4" />
            </button>
          </div>
          <div className="mt-6 space-y-4">
            {RECENT_RUNS.map((run) => (
              <div
                key={run.id}
                className="flex flex-col gap-2 rounded-xl border border-slate-800/60 bg-slate-950/40 p-4 transition hover:border-blue-400/50 hover:bg-slate-900/70 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="text-sm font-medium text-slate-100">{run.target}</p>
                  <p className="text-xs text-slate-500">ID {run.id}</p>
                </div>
                <div className="flex flex-col gap-1 text-sm text-slate-300 sm:items-end">
                  <span className="font-semibold text-emerald-300">{run.status}</span>
                  <span className="flex items-center gap-1 text-xs text-slate-400">
                    <ClockIcon className="h-4 w-4" />
                    {run.eta}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="rounded-2xl border border-purple-500/20 bg-gradient-to-br from-purple-500/10 via-slate-900 to-slate-950 p-6">
            <p className={`text-sm font-semibold text-purple-200 ${lusitana.className}`}>Prossimo rilascio</p>
            <p className="mt-2 text-xs text-slate-300">
              Aggiornamento del kernel di simulazione molecolare con supporto alle GPU Hopper e modellazione proteica dinamica.
            </p>
            <p className="mt-4 text-xs text-slate-400">Disponibile dal 15 Novembre.</p>
          </div>
          <div className="rounded-2xl border border-slate-800/60 bg-slate-900/50 p-6">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
                <CpuChipIcon className="h-6 w-6" />
              </span>
              <div>
                <p className={`text-sm font-semibold text-slate-100 ${lusitana.className}`}>Disponibilità risorse</p>
                <p className="text-xs text-slate-400">Cluster HPC - coda GPU</p>
              </div>
            </div>
            <div className="mt-4 h-2 rounded-full bg-slate-800">
              <div className="h-full w-3/4 rounded-full bg-emerald-400"></div>
            </div>
            <p className="mt-2 text-xs text-slate-400">75% della capacità totale impegnata</p>
          </div>
        </div>
      </section>

      <section id="analysis" className="rounded-2xl border border-slate-800/60 bg-slate-900/60 p-6">
        <h2 className={`text-lg font-semibold text-slate-100 ${lusitana.className}`}>Analisi evidenziate</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {["Trascrittomica single-cell", "Dinamica molecolare", "Screening varianti"].map((analysis) => (
            <div
              key={analysis}
              className="rounded-xl border border-slate-800/60 bg-slate-950/40 p-4 text-sm text-slate-300 transition hover:border-blue-400/50 hover:bg-slate-900/70"
            >
              <p className="font-medium text-slate-100">{analysis}</p>
              <p className="mt-2 text-xs text-slate-400">
                Pipeline verificata con dataset benchmark, pronta per l'esecuzione massiva.
              </p>
            </div>
          ))}
        </div>
      </section>
    </ScientificDashboardLayout>
  );
}
