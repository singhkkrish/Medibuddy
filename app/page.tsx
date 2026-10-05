"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import SearchBar from "@/components/SearchBar";
import MedicineCard from "@/components/MedicineCard";
import ErrorState from "@/components/ErrorState";
import ResultsSkeleton from "@/components/ResultsSkeleton";
import QuickSuggestions from "@/components/QuickSuggestions";
import { searchMedicinesByName } from "@/lib/openfda";
import { useDebouncedValue } from "@/lib/useDebouncedValue";

export default function HomePage() {
  const [input, setInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedInput = useDebouncedValue(input, 400);

  // Live search-as-you-type: once the user pauses for 400ms, the debounced
  // value becomes the active search term automatically.
  useEffect(() => {
    setSearchTerm(debouncedInput.trim());
  }, [debouncedInput]);

  // Submitting (Enter / the Search button) searches immediately, bypassing
  // the debounce wait — the input never feels laggy even mid-typing.
  function runSearchNow(term: string) {
    setInput(term);
    setSearchTerm(term.trim());
  }

  const {
    data: results,
    isLoading,
    isFetching,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["medicine-search", searchTerm],
    queryFn: () => searchMedicinesByName(searchTerm),
    enabled: searchTerm.length > 0,
  });

  const hasSearched = searchTerm.length > 0;
  const isEmpty = hasSearched && !isLoading && !isError && results?.length === 0;
  const isSuccess = hasSearched && !isLoading && !isError && (results?.length ?? 0) > 0;

  return (
    <main className="flex flex-1 flex-col gap-8">
      <section className="flex flex-col gap-3">
        <p className="font-label text-xs uppercase tracking-widest2 text-brand-600">
          Before you take the strip
        </p>
        <h1 className="font-display text-[28px] font-extrabold leading-tight tracking-tight text-ink sm:text-[34px]">
          Check the dosage, warnings & ingredients — in seconds.
        </h1>
        <p className="max-w-xl text-[15px] leading-relaxed text-ink-soft">
          Search a medicine by brand name to see its active ingredients,
          purpose, warnings, and dosage, sourced straight from the FDA drug
          label database.
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <SearchBar
          value={input}
          onChange={setInput}
          onSubmit={runSearchNow}
          isLoading={isFetching}
        />
        {!hasSearched && <QuickSuggestions onPick={runSearchNow} />}
      </section>

      {isSuccess && results && results.length > 1 && (
        <p className="-mt-4 text-sm text-ink-faint">
          Found {results.length} matching formulations for &ldquo;{searchTerm}
          &rdquo;. Pick the one that matches your pack.
        </p>
      )}

      {hasSearched && isLoading && <ResultsSkeleton />}

      {isEmpty && <ErrorState status="empty" term={searchTerm} />}

      {isError && <ErrorState status="error" onRetry={() => refetch()} />}

      {isSuccess && results && (
        <ul className="flex animate-fade-up flex-col gap-3" aria-label="Search results">
          {results.map((medicine) => (
            <li key={medicine.raw.id ?? medicine.slug}>
              <MedicineCard medicine={medicine} />
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
