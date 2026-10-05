import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getMedicineGroupBySlug,
  OpenFdaError,
  type MedicineGroup,
} from "@/lib/openfda";
import Disclaimer from "@/components/Disclaimer";
import ErrorState from "@/components/ErrorState";
import PrintButton from "@/components/PrintButton";
import type { DrugLabel } from "@/types/medicine";

interface PageProps {
  params: { name: string };
}

// --- SEO metadata -----------------------------------------------------
// This is the part of "SEO-friendly" that lives outside the visible page:
// a distinct <title>/<meta description> per medicine so each formulation
// is indexable and distinguishable in search results, instead of every
// /medicine/[name] page sharing the homepage's generic metadata.
export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  let group: MedicineGroup | null = null;
  try {
    group = await getMedicineGroupBySlug(params.name);
  } catch {
    // Metadata generation must never throw — fall through to a generic
    // title and let the page body render the real error state.
  }

  if (!group) {
    return { title: "Medicine not found" };
  }

  const { primary } = group;
  const purpose = firstSentence(primary.raw.purpose);
  const description = purpose
    ? `${primary.brandName}: ${purpose} Active ingredients, warnings, and dosage information.`
    : `${primary.brandName} — active ingredients, purpose, warnings, and dosage information from the FDA drug label database.`;

  return {
    title: `${primary.brandName} — Ingredients, Dosage & Warnings`,
    description: description.slice(0, 160),
    alternates: {
      canonical: `/medicine/${primary.slug}`,
    },
    openGraph: {
      title: `${primary.brandName} — Ingredients, Dosage & Warnings`,
      description: description.slice(0, 160),
      type: "article",
    },
  };
}

function firstSentence(arr?: string[]): string | null {
  if (!arr || arr.length === 0) return null;
  const text = arr[0].trim();
  const match = text.match(/^[^.]*\./);
  return (match ? match[0] : text).slice(0, 200);
}

// --- Field rendering ----------------------------------------------------
// openFDA text fields are string[] where every entry is already a full
// paragraph (not a list of short items), and any field can be entirely
// absent. This renders each present paragraph and shows an explicit
// fallback line instead of skipping the section or printing "undefined".
function FieldBlock({
  label,
  values,
  fallback,
}: {
  label: string;
  values?: string[];
  fallback: string;
}) {
  const hasContent = values && values.length > 0 && values[0].trim().length > 0;
  return (
    <div>
      <dt className="pill-dot font-label text-[11px] uppercase tracking-widest2 text-brand-700">
        {label}
      </dt>
      <dd className="mt-1.5 text-[15px] leading-relaxed text-ink">
        {hasContent ? (
          values!.map((paragraph, i) => (
            <p key={i} className={i > 0 ? "mt-2" : undefined}>
              {paragraph}
            </p>
          ))
        ) : (
          <p className="italic text-ink-faint">{fallback}</p>
        )}
      </dd>
    </div>
  );
}

function jsonLd(label: DrugLabel, brandName: string, slug: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Drug",
    name: brandName,
    nonProprietaryName: label.openfda?.generic_name?.[0] ?? undefined,
    manufacturer: label.openfda?.manufacturer_name?.[0]
      ? { "@type": "Organization", name: label.openfda.manufacturer_name[0] }
      : undefined,
    administrationRoute: label.openfda?.route?.[0] ?? undefined,
    activeIngredient: label.active_ingredient?.[0] ?? undefined,
    description: label.purpose?.[0] ?? undefined,
    url: `/medicine/${slug}`,
  };
}

export default async function MedicineDetailsPage({ params }: PageProps) {
  let group: MedicineGroup | null;

  try {
    group = await getMedicineGroupBySlug(params.name);
  } catch (err) {
    // API error/timeout on this route must be a visible state, not a
    // crashed page — same principle the homepage applies to search.
    const message =
      err instanceof OpenFdaError
        ? err.message
        : "Something went wrong while contacting openFDA.";
    return (
      <main className="flex flex-1 flex-col gap-6">
        <Link href="/" className="text-sm font-medium text-brand-700 hover:underline">
          &larr; Back to search
        </Link>
        <ErrorState status="error" />
        <p className="sr-only">{message}</p>
      </main>
    );
  }

  if (!group) {
    // Genuine "no such medicine" — Next's not-found boundary
    // (app/medicine/[name]/not-found.tsx) renders a dedicated 404 state.
    notFound();
  }

  const { primary, alternates } = group;
  const { raw, brandName, genericName, manufacturer, route } = primary;

  return (
    <main className="flex flex-1 flex-col gap-6 pb-12">
      <div className="flex items-center justify-between">
        <Link href="/" className="text-sm font-medium text-brand-700 hover:underline">
          &larr; Back to search
        </Link>
        <PrintButton />
      </div>

      {/* JSON-LD structured data: gives search engines a machine-readable
          summary of the medicine without duplicating visible content. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd(raw, brandName, primary.slug)),
        }}
      />

      <article className="flex flex-col gap-6">
        <header className="flex flex-col gap-2">
          <h1 className="font-display text-2xl font-extrabold tracking-tight text-ink sm:text-3xl">
            {brandName}
          </h1>
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-ink-faint">
            {genericName && <span>Generic name: {genericName}</span>}
            {genericName && (manufacturer || route) && <span aria-hidden>·</span>}
            {manufacturer && <span>{manufacturer}</span>}
            {manufacturer && route && <span aria-hidden>·</span>}
            {route && <span className="capitalize">{route.toLowerCase()}</span>}
          </div>
        </header>

        <Disclaimer />

        {alternates.length > 0 && (
          <section
            aria-label="Other formulations"
            className="rounded-lg border border-line bg-white p-4"
          >
            <h2 className="text-sm font-semibold text-ink">
              {alternates.length === 1
                ? "There's 1 other formulation of this medicine"
                : `There are ${alternates.length} other formulations of this medicine`}
            </h2>
            <p className="mt-1 text-xs text-ink-faint">
              Same brand name, different form or manufacturer — check yours
              matches what&apos;s on your pack.
            </p>
            <ul className="mt-3 flex flex-col gap-2">
              {alternates.map((alt) => (
                <li key={alt.raw.id ?? alt.slug}>
                  <Link
                    href={`/medicine/${alt.slug}`}
                    className="flex flex-wrap items-center gap-2 rounded-md border
                               border-line px-3 py-2 text-sm text-ink-soft
                               transition hover:border-brand-300 hover:bg-brand-50"
                  >
                    <span className="font-medium text-ink">{alt.brandName}</span>
                    {alt.route && (
                      <span className="text-xs capitalize text-ink-faint">
                        {alt.route.toLowerCase()}
                      </span>
                    )}
                    {alt.manufacturer && (
                      <span className="text-xs text-ink-faint">
                        {alt.manufacturer}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        )}

        <dl className="flex flex-col gap-5 rounded-xl border border-line bg-white p-5 shadow-card [&>div:not(:last-child)]:pb-5 [&>div:not(:last-child)]:border-b-0">
          <FieldBlock
            label="Active ingredients"
            values={raw.active_ingredient}
            fallback="Active ingredients not listed for this record."
          />
          <div className="perforated" aria-hidden />
          <FieldBlock
            label="Purpose"
            values={raw.purpose ?? raw.indications_and_usage}
            fallback="Purpose not listed for this record."
          />
          <div className="perforated" aria-hidden />
          <FieldBlock
            label="Dosage & administration"
            values={raw.dosage_and_administration}
            fallback="Dosage not listed — check the printed pack insert."
          />
          <div className="perforated" aria-hidden />
          <FieldBlock
            label="Warnings"
            values={raw.warnings ?? raw.warnings_and_cautions}
            fallback="No warnings listed for this record."
          />
        </dl>

        {(raw.do_not_use || raw.stop_use || raw.ask_doctor || raw.pregnancy_or_breast_feeding) && (
          <details className="group rounded-xl border border-line bg-white p-5 shadow-card">
            <summary className="flex cursor-pointer list-none items-center justify-between text-sm font-semibold text-ink">
              More safety information
              <svg
                aria-hidden
                viewBox="0 0 20 20"
                className="h-4 w-4 text-ink-faint transition group-open:rotate-180"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="m5 7.5 5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </summary>
            <dl className="mt-4 flex flex-col gap-5">
              <FieldBlock
                label="Do not use if"
                values={raw.do_not_use}
                fallback="Not listed for this record."
              />
              <FieldBlock
                label="Stop use and ask a doctor if"
                values={raw.stop_use}
                fallback="Not listed for this record."
              />
              <FieldBlock
                label="Ask a doctor before use if"
                values={raw.ask_doctor}
                fallback="Not listed for this record."
              />
              <FieldBlock
                label="Pregnancy or breastfeeding"
                values={raw.pregnancy_or_breast_feeding}
                fallback="Not listed for this record."
              />
            </dl>
          </details>
        )}
      </article>
    </main>
  );
}
