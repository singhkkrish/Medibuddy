interface ErrorStateProps {
  status: "empty" | "error";
  term?: string;
  onRetry?: () => void;
}

/**
 * Renders the "not a blank page" states the assignment calls out
 * explicitly: zero results and API error/timeout. Loading now has its
 * own skeleton (see ResultsSkeleton) rather than living in this component.
 */
export default function ErrorState({ status, term, onRetry }: ErrorStateProps) {
  if (status === "empty") {
    return (
      <div
        role="status"
        className="animate-fade-up rounded-xl border border-line bg-white px-6 py-12 text-center"
      >
        <p className="text-base font-semibold text-ink">
          No medicines matched &ldquo;{term}&rdquo;.
        </p>
        <p className="mt-1.5 text-sm text-ink-faint">
          Try the exact brand name printed on the pack, e.g. &ldquo;Advil&rdquo; or
          &ldquo;Tylenol&rdquo;. This directory searches U.S. FDA labels, so
          India-only brand names may not be found.
        </p>
      </div>
    );
  }

  // status === "error"
  return (
    <div
      role="alert"
      className="animate-fade-up rounded-xl border border-caution-200 bg-caution-50 px-6 py-12 text-center"
    >
      <p className="text-base font-semibold text-caution-700">
        Something went wrong while contacting openFDA.
      </p>
      <p className="mt-1.5 text-sm text-caution-600">
        This is usually temporary — please try again.
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-4 rounded-lg bg-caution-600 px-4 py-2 text-sm font-medium text-paper
                     transition hover:bg-caution-700"
        >
          Retry search
        </button>
      )}
    </div>
  );
}
