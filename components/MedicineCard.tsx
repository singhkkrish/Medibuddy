import Link from "next/link";
import type { MedicineSummary } from "@/types/medicine";

interface MedicineCardProps {
  medicine: MedicineSummary;
}

export default function MedicineCard({ medicine }: MedicineCardProps) {
  const { brandName, genericName, manufacturer, route, slug } = medicine;

  return (
    <Link
      href={`/medicine/${slug}`}
      className="group block rounded-xl border border-line bg-white p-4 shadow-card
                 transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-pop
                 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="truncate text-base font-semibold text-ink">{brandName}</h3>
          {genericName && (
            <p className="mt-0.5 truncate text-sm text-ink-faint">{genericName}</p>
          )}
        </div>
        <svg
          aria-hidden
          viewBox="0 0 20 20"
          className="mt-1 h-4 w-4 shrink-0 text-ink-faint transition group-hover:translate-x-0.5 group-hover:text-brand-600"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path d="M7 4l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {manufacturer && (
          <span className="rounded-full bg-navy-500/[0.07] px-2.5 py-1 font-label text-[11px] uppercase tracking-wide text-navy-600">
            {manufacturer}
          </span>
        )}
        {route && (
          <span className="rounded-full bg-brand-50 px-2.5 py-1 font-label text-[11px] uppercase tracking-wide text-brand-700">
            {route.toLowerCase()}
          </span>
        )}
        {!manufacturer && !route && (
          <span className="rounded-full bg-ink-faint/10 px-2.5 py-1 font-label text-[11px] uppercase tracking-wide text-ink-faint">
            Details not listed
          </span>
        )}
      </div>
    </Link>
  );
}
