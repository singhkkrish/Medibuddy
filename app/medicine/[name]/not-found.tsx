import Link from "next/link";

// Rendered by Next's notFound() boundary when getMedicineGroupBySlug()
// resolves with no match — a real "medicine not found" page (with a
// 404 status), not a blank screen or a silently redirected homepage.
export default function MedicineNotFound() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-3 py-16 text-center">
      <span
        aria-hidden
        className="mb-1 flex h-12 w-12 items-center justify-center rounded-full bg-brand-50 text-brand-600"
      >
        <svg viewBox="0 0 20 20" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.75">
          <circle cx="9" cy="9" r="6" />
          <path d="m17 17-3.5-3.5" strokeLinecap="round" />
        </svg>
      </span>
      <h1 className="font-display text-xl font-bold text-ink">Medicine not found</h1>
      <p className="max-w-sm text-sm text-ink-faint">
        We couldn&apos;t find a medicine matching that name in the FDA drug
        label database. Try searching again with the exact brand name
        printed on the pack.
      </p>
      <Link
        href="/"
        className="mt-2 rounded-lg bg-brand-500 px-4 py-2 text-sm font-medium
                   text-paper transition hover:bg-brand-600"
      >
        Back to search
      </Link>
    </main>
  );
}
