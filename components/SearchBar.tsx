"use client";

import { FormEvent } from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (term: string) => void;
  isLoading?: boolean;
}

/**
 * Controlled search input. Typing live-searches (debounced by the caller);
 * Enter/submit forces an immediate search of whatever's currently typed,
 * so the input never feels laggy even before the debounce fires.
 */
export default function SearchBar({ value, onChange, onSubmit, isLoading }: SearchBarProps) {
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmed = value.trim();
    if (trimmed.length === 0) return;
    onSubmit(trimmed);
  }

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      aria-label="Search medicines"
      className="flex w-full gap-2"
    >
      <label htmlFor="medicine-search" className="sr-only">
        Search for a medicine by brand name
      </label>
      <div className="relative flex-1">
        <svg
          aria-hidden
          viewBox="0 0 20 20"
          className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="9" cy="9" r="6" />
          <path d="m17 17-3.5-3.5" strokeLinecap="round" />
        </svg>
        <input
          id="medicine-search"
          type="text"
          inputMode="search"
          autoComplete="off"
          placeholder="Search a medicine, e.g. Advil"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-xl border border-line bg-white py-3.5 pl-10 pr-4
                     text-[15px] text-ink shadow-card outline-none transition
                     placeholder:text-ink-faint focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
        />
      </div>
      <button
        type="submit"
        disabled={value.trim().length === 0}
        className="shrink-0 rounded-xl bg-brand-500 px-5 py-3.5 text-sm font-semibold text-paper
                   shadow-card transition hover:bg-brand-600 disabled:cursor-not-allowed
                   disabled:bg-ink-faint/40 disabled:text-ink-faint"
      >
        {isLoading ? "Searching…" : "Search"}
      </button>
    </form>
  );
}
