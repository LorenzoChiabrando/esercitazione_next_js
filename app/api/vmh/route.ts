import { randomUUID } from 'crypto';

const VMH_API = 'https://www.vmh.life/_api/microbes/';
const AGORA_MAT_BASE =
    'https://www.vmh.life/files/reconstructions/AGORA2/version2.01/mat_files/individual_reconstructions/';
const AGORA_SBML_BASE =
    'https://www.vmh.life/files/reconstructions/AGORA2/version2.01/sbml_files_fixed/';

type VmMicrobe = {
    id?: number | string;
    reconstruction?: string;       // es: Escherichia_coli_str_K_12_substr_MG1655
    organism?: string;             // es: Escherichia coli
    strain?: string | null;
    family?: string | null;
    [k: string]: unknown;
};

type AgoraModel = {
    id: string;
    name: string;                  // reconstruction se disponibile, altrimenti organism
    downloadUrl: string | null;    // link .mat se ricavabile
    sbmlUrl?: string | null;       // opzionale: SBML “fixed”
    organism?: string | null;
    strain?: string | null;
    family?: string | null;
    sourceName?: string | null;    // non usato da VMH microbes, lasciato per compat
};

type AgoraQueryResult = {
    query: string;
    models: AgoraModel[];
    error?: string;
};

async function vmhList(params: Record<string, string>): Promise<VmMicrobe[]> {
    const u = new URL(VMH_API);
    Object.entries(params).forEach(([k, v]) => u.searchParams.set(k, v));
    // Revalidate ogni 30 minuti
    const res = await fetch(u.toString(), {
        headers: { Accept: 'application/json' },
        next: { revalidate: 1800 },
    });
    if (!res.ok) throw new Error(`VMH API error (${res.status})`);
    const json = await res.json();
    // L’API è paginata: { count, next, previous, results: [...] }
    const items = Array.isArray(json?.results) ? json.results : Array.isArray(json) ? json : [];
    return items as VmMicrobe[];
}

function toAgoraModels(items: VmMicrobe[]): AgoraModel[] {
    return items.map((m) => {
        const recon = (m.reconstruction as string | undefined) ?? null;
        const name = recon ?? (m.organism as string | undefined) ?? 'Unknown model';
        const matUrl = recon ? `${AGORA_MAT_BASE}${encodeURIComponent(recon)}.mat` : null;
        // SBML “fixed” ha la stessa convenzione di nome
        const sbmlUrl = recon ? `${AGORA_SBML_BASE}${encodeURIComponent(recon)}.xml` : null;
        return {
            id: (m.id?.toString() ?? randomUUID()),
            name,
            downloadUrl: matUrl,
            sbmlUrl,
            organism: (m.organism as string | undefined) ?? null,
            strain: (m.strain as string | undefined) ?? null,
            family: (m.family as string | undefined) ?? null,
            sourceName: null,
        };
    });
}

async function fetchModelsForName(name: string): Promise<AgoraModel[]> {
    // 1) tenta match esatto sulla ricostruzione (più preciso per costruire l’URL .mat)
    const exact = await vmhList({ reconstruction: name, page_size: '50' });
    if (exact.length) return toAgoraModels(exact);

    // 2) fallback: cerca per organism name (case-insensitive)
    const fuzzy = await vmhList({ organism__icontains: name, page_size: '50' });
    return toAgoraModels(fuzzy);
}

function normaliseNames(names: unknown): string[] {
    if (!Array.isArray(names)) return [];
    return names
        .map((x) => (typeof x === 'string' ? x.trim() : ''))
        .filter((v, i, a) => v.length > 0 && a.indexOf(v) === i);
}

export async function POST(request: Request) {
    try {
        const { names } = await request.json();
        const uniqueNames = normaliseNames(names);
        if (!uniqueNames.length) {
            return Response.json({ error: 'Missing bacteria names', results: [] }, { status: 400 });
        }

        const results: AgoraQueryResult[] = await Promise.all(
            uniqueNames.map(async (query) => {
                try {
                    const models = await fetchModelsForName(query);
                    return { query, models } satisfies AgoraQueryResult;
                } catch (e) {
                    console.error('VMH fetch error for %s', query, e);
                    return {
                        query,
                        models: [],
                        error:
                            'Impossibile recuperare i modelli dal database VMH. Verifica il nome (reconstruction o organism) o riprova più tardi.',
                    } satisfies AgoraQueryResult;
                }
            }),
        );

        return Response.json({ results }, { status: 200 });
    } catch (e) {
        console.error('VMH API route error', e);
        return Response.json({ error: 'Richiesta non valida', results: [] }, { status: 400 });
    }
}
