const SUGGESTIONS = ["Advil", "Tylenol", "Benadryl", "Aspirin", "Claritin"];

export default function QuickSuggestions({
  onPick,
}: {
  onPick: (term: string) => void;
}) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="font-label text-[11px] uppercase tracking-widest2 text-ink-faint">
        Try
      </span>
      {SUGGESTIONS.map((name) => (
        <button
          key={name}
          type="button"
          onClick={() => onPick(name)}
          className="rounded-full border border-line bg-white px-3 py-1.5 text-sm text-ink-soft
                     transition hover:border-brand-300 hover:bg-brand-50 hover:text-brand-700"
        >
          {name}
        </button>
      ))}
    </div>
  );
}
