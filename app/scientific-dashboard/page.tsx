import {
  ScientificContentGrid,
  ScientificDashboardLayout,
  ScientificHeaderTitle,
  ScientificHeaderToolbar,
  ScientificMobileNav,
  ScientificMobileNavItem,
  ScientificPanel,
  ScientificPanelHeader,
  ScientificPlaceholder,
  ScientificSidebarHeader,
  ScientificSidebarNav,
  ScientificSidebarNavItem,
  ScientificSidebarSection,
  ScientificToolbarAction,
} from "@/app/ui/layouts/scientific-dashboard-layout";
import {
  ArrowDownTrayIcon,
  BoltIcon,
  ChartBarIcon,
  ClipboardDocumentListIcon,
  Cog6ToothIcon,
  Squares2X2Icon,
} from "@heroicons/react/24/outline";
import Link from "next/link";

export default function Page() {
  return (
    <ScientificDashboardLayout
      sidebar={
        <>
          <ScientificSidebarHeader icon={BoltIcon} title="BioSim Lab" subtitle="Control Center" />
          <ScientificSidebarSection title="Navigazione principale">
            <ScientificSidebarNav>
              <ScientificSidebarNavItem
                icon={Squares2X2Icon}
                label="Panoramica"
                description="Visione generale dei progetti e delle pipeline"
              />
              <ScientificSidebarNavItem
                icon={ChartBarIcon}
                label="Analisi"
                description="Workspace per risultati numerici e grafici"
              />
              <ScientificSidebarNavItem
                icon={ClipboardDocumentListIcon}
                label="Runbook"
                description="Procedure operative e checklist"
              />
            </ScientificSidebarNav>
          </ScientificSidebarSection>
          <ScientificSidebarSection title="Strumenti rapidi">
            <ScientificSidebarNav>
              <ScientificSidebarNavItem
                icon={Cog6ToothIcon}
                label="Configurazioni"
                description="Settaggi dei cluster e dei template di simulazione"
              />
              <ScientificSidebarNavItem
                icon={ArrowDownTrayIcon}
                label="Repository dati"
                description="Gestione input sperimentali e dataset di riferimento"
              />
            </ScientificSidebarNav>
          </ScientificSidebarSection>
        </>
      }
      header={
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <ScientificHeaderTitle
            eyebrow="Scientific Suite"
            title="Centro di controllo sperimentazioni"
            description="Layout base per orchestrare simulazioni e analisi bioinformatiche"
          />
          <ScientificHeaderToolbar>
            <ScientificToolbarAction>Nuova simulazione</ScientificToolbarAction>
            <ScientificToolbarAction>Importa configurazione</ScientificToolbarAction>
          </ScientificHeaderToolbar>
          <ScientificMobileNav>
            <ScientificMobileNavItem icon={Squares2X2Icon} label="Panoramica" />
            <ScientificMobileNavItem icon={ChartBarIcon} label="Analisi" />
            <ScientificMobileNavItem icon={ClipboardDocumentListIcon} label="Runbook" />
            <ScientificMobileNavItem icon={Cog6ToothIcon} label="Configurazioni" />
            <ScientificMobileNavItem icon={ArrowDownTrayIcon} label="Repository dati" />
          </ScientificMobileNav>
        </div>
      }
      footer={
        <>
          <p>© {new Date().getFullYear()} BioSim Lab</p>
          <div className="flex gap-4">
            <Link href="#privacy" className="transition hover:text-slate-200">
              Privacy
            </Link>
            <Link href="#terms" className="transition hover:text-slate-200">
              Termini
            </Link>
            <Link href="#support" className="transition hover:text-slate-200">
              Supporto
            </Link>
          </div>
        </>
      }
    >
      <ScientificContentGrid columns={3}>
        <ScientificPanel>
          <ScientificPanelHeader
            title="Metriche principali"
            description="Sezione dedicata a KPI di efficienza e throughput"
          />
          <div className="mt-6 space-y-4">
            <ScientificPlaceholder lines={4} />
          </div>
        </ScientificPanel>
        <ScientificPanel>
          <ScientificPanelHeader
            title="Code di simulazione"
            description="Monitoraggio delle esecuzioni distribuite"
          />
          <div className="mt-6 space-y-4">
            <ScientificPlaceholder lines={5} />
          </div>
        </ScientificPanel>
        <ScientificPanel accent="emerald">
          <ScientificPanelHeader
            title="Stato risorse"
            description="Disponibilità di GPU, CPU e storage condiviso"
          />
          <div className="mt-6 space-y-4">
            <ScientificPlaceholder lines={3} />
          </div>
        </ScientificPanel>
      </ScientificContentGrid>

      <ScientificContentGrid columns={2}>
        <ScientificPanel accent="purple">
          <ScientificPanelHeader
            title="Workflow di analisi"
            description="Spazio per timeline e dipendenze tra pipeline"
          />
          <div className="mt-6 space-y-4">
            <ScientificPlaceholder lines={6} />
          </div>
        </ScientificPanel>
        <ScientificPanel>
          <ScientificPanelHeader
            title="Documentazione di supporto"
            description="Collegamenti a protocolli e guide operative"
          />
          <div className="mt-6 space-y-4">
            <ScientificPlaceholder lines={6} />
          </div>
        </ScientificPanel>
      </ScientificContentGrid>
    </ScientificDashboardLayout>
  );
}
