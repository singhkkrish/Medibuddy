"use client";

import Link from "next/link";

// Safety-net error boundary for this route. The page component already
// catches OpenFdaError internally and renders an inline ErrorState, so
// this only fires for genuinely unexpected exceptions (e.g. a render bug)
// — but per the assignment's "don't let anything crash to a blank page"
// requirement, that path needs a real UI too, not a stack trace.
export default function MedicineDetailsError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-3 py-16 text-center">
      <h1 className="font-display text-lg font-bold text-caution-700">
        Something went wrong loading this medicine.
      </h1>
      <p className="max-w-sm text-sm text-ink-faint">
        This is usually temporary. You can retry, or go back and search
        again.
      </p>
      <div className="mt-2 flex gap-3">
        <button
          onClick={reset}
          className="rounded-lg bg-caution-600 px-4 py-2 text-sm font-medium
                     text-paper transition hover:bg-caution-700"
        >
          Try again
        </button>
        <Link
          href="/"
          className="rounded-lg border border-line px-4 py-2 text-sm
                     font-medium text-ink-soft transition hover:bg-white"
        >
          Back to search
        </Link>
      </div>
    </main>
  );
}
