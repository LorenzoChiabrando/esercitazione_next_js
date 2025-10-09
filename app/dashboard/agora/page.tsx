import { Metadata } from 'next';
import { lusitana } from '@/app/ui/fonts';
import ModelExplorer from '@/app/ui/vmh/model-explorer';

export const metadata: Metadata = {
  title: 'AGORA2 Models Explorer',
  description:
    'Interfaccia per ricercare modelli metabolici AGORA2 dal database VMH e scaricare i risultati.',
};

export default function AgoraDashboardPage() {
  return (
    <main className="space-y-8">
      <header className="space-y-2">
        <p className={`${lusitana.className} text-xs uppercase tracking-wide text-blue-600`}>VMH Tools</p>
        <h1 className={`${lusitana.className} text-2xl font-semibold text-gray-900`}>AGORA2 model explorer</h1>
        <p className="max-w-3xl text-sm text-gray-600">
          Inserisci una lista di nomi di batteri per interrogare il database dei modelli AGORA2 di VMH. Lo strumento
          recupera i modelli disponibili, mostra le principali informazioni e permette di accedere rapidamente al file
          di download del modello.
        </p>
      </header>
      <ModelExplorer />
    </main>
  );
}
