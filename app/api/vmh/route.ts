import { randomUUID } from 'crypto';

const VMH_BASE_URL = 'https://www.vmh.life/_api/models/agora2';

type VmResponse = {
  id?: string;
  vmh_id?: string;
  name?: string;
  organism_name?: string;
  organism?: string;
  strain?: string;
  strain_name?: string;
  family?: string;
  download_url?: string;
  url?: string;
  file?: string;
  source_name?: string;
  [key: string]: unknown;
};

type AgoraModel = {
  id: string;
  name: string;
  downloadUrl: string | null;
  organism?: string | null;
  strain?: string | null;
  family?: string | null;
  sourceName?: string | null;
};

type AgoraQueryResult = {
  query: string;
  models: AgoraModel[];
  error?: string;
};

async function fetchModelsForName(name: string): Promise<AgoraModel[]> {
  const params = new URLSearchParams({ name });
  const response = await fetch(`${VMH_BASE_URL}?${params.toString()}`, {
    headers: {
      Accept: 'application/json',
    },
    // Revalidate every 30 minutes to avoid overloading the upstream API.
    next: { revalidate: 1800 },
  });

  if (!response.ok) {
    throw new Error(`VMH API error (${response.status})`);
  }

  const payload = await response.json();
  const entries: VmResponse[] = Array.isArray(payload?.items)
    ? (payload.items as VmResponse[])
    : Array.isArray(payload?.results)
    ? (payload.results as VmResponse[])
    : Array.isArray(payload)
    ? (payload as VmResponse[])
    : [];

  return entries.map((entry, index) => ({
    id: (entry.id as string) ?? (entry.vmh_id as string) ?? randomUUID(),
    name:
      (entry.name as string) ??
      (entry.organism_name as string) ??
      (entry.organism as string) ??
      `${name} #${index + 1}`,
    downloadUrl:
      (entry.download_url as string | undefined) ??
      (entry.url as string | undefined) ??
      (entry.file as string | undefined) ??
      null,
    organism: (entry.organism as string | undefined) ?? (entry.organism_name as string | undefined) ?? null,
    strain: (entry.strain as string | undefined) ?? (entry.strain_name as string | undefined) ?? null,
    family: (entry.family as string | undefined) ?? null,
    sourceName: (entry.source_name as string | undefined) ?? null,
  }));
}

function normaliseNames(names: unknown): string[] {
  if (!Array.isArray(names)) {
    return [];
  }

  return names
    .map((item) => (typeof item === 'string' ? item.trim() : ''))
    .filter((value, index, array) => value.length > 0 && array.indexOf(value) === index);
}

export async function POST(request: Request) {
  try {
    const { names } = await request.json();
    const uniqueNames = normaliseNames(names);

    if (!uniqueNames.length) {
      return Response.json(
        { error: 'Missing bacteria names', results: [] },
        {
          status: 400,
        },
      );
    }

    const results: AgoraQueryResult[] = await Promise.all(
      uniqueNames.map(async (name) => {
        try {
          const models = await fetchModelsForName(name);
          return {
            query: name,
            models,
          } satisfies AgoraQueryResult;
        } catch (error) {
          console.error('VMH fetch error for %s', name, error);
          return {
            query: name,
            models: [],
            error: 'Impossibile recuperare i modelli dal database VMH.',
          } satisfies AgoraQueryResult;
        }
      }),
    );

    return Response.json({ results }, { status: 200 });
  } catch (error) {
    console.error('VMH API route error', error);
    return Response.json(
      { error: 'Richiesta non valida', results: [] },
      {
        status: 400,
      },
    );
  }
}
