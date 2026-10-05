"use client";

export default function PrintButton() {
  return (
    <button
      type="button"
      onClick={() => window.print()}
      className="no-print inline-flex items-center gap-1.5 rounded-lg border border-line bg-white
                 px-3 py-1.5 text-xs font-medium text-ink-soft transition hover:border-brand-300 hover:text-brand-700"
    >
      <svg aria-hidden viewBox="0 0 20 20" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.75">
        <path d="M6 8V3h8v5M6 15h8v3H6v-3ZM4 8h12a2 2 0 0 1 2 2v4h-3M4 8a2 2 0 0 0-2 2v4h3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      Save / print
    </button>
  );
}
