import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-line bg-paper/95 backdrop-blur">
      <div className="mx-auto flex max-w-3xl items-center justify-between px-4 py-4 sm:px-6">
        <Link
          href="/"
          className="group flex items-center gap-2 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
        >
          <span
            aria-hidden
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500 text-paper shadow-card"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor">
              <path d="M10.5 3h3v7.5H21v3h-7.5V21h-3v-7.5H3v-3h7.5V3z" />
            </svg>
          </span>
          <span className="font-display text-[17px] font-bold tracking-tight text-ink">
            Medicine Directory
          </span>
        </Link>

        <span className="hidden font-label text-[11px] uppercase tracking-widest2 text-ink-faint sm:inline">
          openFDA label data
        </span>
      </div>
    </header>
  );
}
