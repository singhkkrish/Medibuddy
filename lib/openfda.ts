import type {
  DrugLabel,
  MedicineSummary,
  OpenFdaSearchResponse,
} from "@/types/medicine";

const BASE_URL = "https://api.fda.gov/drug/label.json";

export class OpenFdaError extends Error {
  status?: number;
  constructor(message: string, status?: number) {
    super(message);
    this.name = "OpenFdaError";
    this.status = status;
  }
}

/**
 * Turns "Advil Cold & Sinus" into "advil-cold-sinus" so it's safe to use
 * as a URL segment in /medicine/[name].
 */
export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function firstOrNull(arr?: string[]): string | null {
  return arr && arr.length > 0 ? arr[0] : null;
}

export function toSummary(label: DrugLabel): MedicineSummary {
  const brandName =
    firstOrNull(label.openfda?.brand_name) ??
    firstOrNull(label.openfda?.generic_name) ??
    "Unnamed medicine";

  return {
    slug: slugify(brandName),
    brandName,
    genericName: firstOrNull(label.openfda?.generic_name),
    manufacturer: firstOrNull(label.openfda?.manufacturer_name),
    route: firstOrNull(label.openfda?.route),
    raw: label,
  };
}


export async function searchMedicinesByName(
  term: string,
  limit = 10
): Promise<MedicineSummary[]> {
  const query = `openfda.brand_name:"${term}" OR openfda.generic_name:"${term}"`;
  const url = `${BASE_URL}?search=${encodeURIComponent(query)}&limit=${limit}`;

  let res: Response;
  const maxAttempts = 3;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    try {
      res = await fetch(url, { cache: "no-store", signal: controller.signal });
      clearTimeout(timeout);
      break;
    } catch (err) {
      clearTimeout(timeout);
      console.error(`API ERROR (attempt ${attempt}/${maxAttempts}):`, err);
      if (attempt === maxAttempts) {
        throw new OpenFdaError(
          "Could not reach the openFDA API after several attempts. Check your connection and try again."
        );
      }
      await new Promise((r) => setTimeout(r, 300 * attempt));
    }
  }

  if (res!.status === 404) {
    // openFDA returns a 404 (not a 200 with empty results) when nothing
    // matches the search — this is expected and is NOT an error state.
    return [];
  }

  if (!res!.ok) {
    throw new OpenFdaError(
      `openFDA request failed (${res!.status}). Please try again.`,
      res!.status
    );
  }

  let data: OpenFdaSearchResponse;
  try {
    data = await res!.json();
  } catch {
    throw new OpenFdaError("Received a malformed response from openFDA.");
  }

  if (!data.results || data.results.length === 0) {
    return [];
  }

  return data.results.map(toSummary);
}

/**
 * Fetches a single medicine by the slug used in /medicine/[name].
 * Since openFDA has no "get by slug" endpoint, we search by name and
 * match the slug client/server-side. Returns null (not an error) if
 * nothing matches — the caller renders a 404-style state for that.
 */
export async function getMedicineBySlug(
  slug: string
): Promise<MedicineSummary | null> {
  const group = await getMedicineGroupBySlug(slug);
  return group?.primary ?? null;
}

export interface MedicineGroup {
  // The formulation we're actually displaying on this page.
  primary: MedicineSummary;
  // Other formulations openFDA returned for the same brand name (e.g. a
  // tablet vs. a syrup vs. a different manufacturer's version) — shown as
  // "other formulations" links so the user can confirm they're on the
  // right one instead of silently guessing for them.
  alternates: MedicineSummary[];
}


export async function getMedicineGroupBySlug(
  slug: string
): Promise<MedicineGroup | null> {
  
  const guessTerm = slug.replace(/-/g, " ");
  const results = await searchMedicinesByName(guessTerm, 10);

  if (results.length === 0) return null;

  
  const primary = results.find((r) => r.slug === slug) ?? results[0];

 
  const seen = new Set([primary.raw.id ?? primary.raw.set_id ?? primary.slug]);
  const alternates = results.filter((r) => {
    const key = r.raw.id ?? r.raw.set_id ?? r.slug;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  return { primary, alternates };
}


