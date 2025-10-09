'use client';

import { FormEvent, useMemo, useState } from 'react';

interface AgoraModel {
  id: string;
  name: string;
  downloadUrl: string | null;
  organism?: string | null;
  strain?: string | null;
  family?: string | null;
  sourceName?: string | null;
}

interface AgoraQueryResult {
  query: string;
  models: AgoraModel[];
  error?: string;
}

interface ApiResponse {
  results: AgoraQueryResult[];
}

const PLACEHOLDER_TEXT =
  'Contenuto in arrivo: qui potrai visualizzare una descrizione dettagliata del modello, una volta disponibile.';

function normaliseInput(raw: string): string[] {
  return raw
    .split(/\r?\n|,|;|\t/) // support various separators
    .map((name) => name.trim())
    .filter((name, index, all) => name.length > 0 && all.indexOf(name) === index);
}

export default function ModelExplorer() {
  const [inputValue, setInputValue] = useState('Bacteroides vulgatus\nFaecalibacterium prausnitzii');
  const [results, setResults] = useState<AgoraQueryResult[]>([]);
  const [activeModelId, setActiveModelId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const hasResults = results.some((group) => group.models.length > 0);

  const parsedNames = useMemo(() => normaliseInput(inputValue), [inputValue]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setActiveModelId(null);
    setError(null);

    const names = parsedNames;

    if (!names.length) {
      setResults([]);
      setError('Inserisci almeno un nome valido di batterio.');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/vmh', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ names }),
      });

      if (!response.ok) {
        throw new Error('Impossibile contattare il database VMH.');
      }

      const payload: ApiResponse = await response.json();
      setResults(payload.results ?? []);
    } catch (err) {
      console.error(err);
      setError('Si è verificato un errore durante il recupero dei modelli. Riprova più tardi.');
      setResults([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="space-y-8">
      <form
        onSubmit={handleSubmit}
        className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm md:grid-cols-[1.5fr_1fr]"
      >
        <label className="flex flex-col space-y-2">
          <span className="text-sm font-medium text-gray-700">Lista di batteri</span>
          <textarea
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            rows={6}
            className="min-h-[160px] w-full resize-y rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring focus:ring-blue-200"
            placeholder="Inserisci un nome di batterio per riga (es. Bacteroides vulgatus)"
          />
          <span className="text-xs text-gray-500">
            Suggerimento: puoi incollare nomi separati da virgola o andare a capo per ogni nuovo organismo.
          </span>
        </label>
        <div className="flex flex-col justify-between space-y-4">
          <div className="rounded-xl bg-blue-50 p-4 text-sm text-blue-900">
            <h2 className="mb-2 text-base font-semibold">Come funziona</h2>
            <ol className="list-decimal space-y-1 pl-4">
              <li>Inserisci i nomi scientifici dei batteri.</li>
              <li>Invia la richiesta per interrogare l&apos;API VMH.</li>
              <li>Consulta i modelli disponibili e avvia il download dal link dedicato.</li>
            </ol>
          </div>
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-200 disabled:cursor-not-allowed disabled:bg-blue-300"
            disabled={loading}
          >
            {loading
              ? 'Ricerca in corso…'
              : parsedNames.length > 0
              ? `Cerca ${parsedNames.length} batteri`
              : 'Cerca batteri'}
          </button>
        </div>
      </form>

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div>
      )}

      <div className="space-y-6">
        {results.map((group) => (
          <div key={group.query} className="space-y-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">{group.query}</h2>
              <p className="text-sm text-gray-500">
                {group.error
                  ? group.error
                  : group.models.length
                  ? `${group.models.length} modelli trovati`
                  : 'Nessun modello disponibile per questo batterio.'}
              </p>
            </div>
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {group.models.map((model) => {
                const isActive = activeModelId === model.id;
                return (
                  <button
                    key={model.id}
                    type="button"
                    onClick={() => setActiveModelId(isActive ? null : model.id)}
                    className="group flex h-full flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                  >
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-xs uppercase tracking-wide text-blue-500">Modello AGORA2</p>
                          <h3 className="mt-1 text-lg font-semibold text-gray-900">{model.name}</h3>
                        </div>
                        {model.downloadUrl && (
                          <a
                            href={model.downloadUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700 transition group-hover:bg-blue-600 group-hover:text-white"
                            onClick={(event) => event.stopPropagation()}
                          >
                            Download
                          </a>
                        )}
                      </div>
                      <dl className="grid gap-2 text-sm text-gray-600">
                        {model.organism && (
                          <div>
                            <dt className="font-medium text-gray-700">Organismo</dt>
                            <dd>{model.organism}</dd>
                          </div>
                        )}
                        {model.strain && (
                          <div>
                            <dt className="font-medium text-gray-700">Ceppo</dt>
                            <dd>{model.strain}</dd>
                          </div>
                        )}
                        {model.family && (
                          <div>
                            <dt className="font-medium text-gray-700">Famiglia</dt>
                            <dd>{model.family}</dd>
                          </div>
                        )}
                        {model.sourceName && (
                          <div>
                            <dt className="font-medium text-gray-700">Fonte</dt>
                            <dd>{model.sourceName}</dd>
                          </div>
                        )}
                      </dl>
                    </div>
                    {isActive && (
                      <div className="mt-4 rounded-xl border border-dashed border-blue-300 bg-blue-50 p-4 text-sm text-blue-900">
                        {PLACEHOLDER_TEXT}
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {!loading && results.length > 0 && !hasResults && !error && (
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
            Nessun modello è stato trovato per i batteri inseriti. Prova con nomi differenti o verifica l&apos;ortografia.
          </div>
        )}
      </div>
    </section>
  );
}
