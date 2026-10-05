// Route-level loading UI for the details page. Next renders this
// automatically while the async server component above is fetching from
// openFDA, so a slow request shows a real skeleton instead of a blank
// tab or an unresponsive click.
export default function MedicineDetailsLoading() {
  return (
    <main className="flex flex-1 flex-col gap-6 pb-12" aria-busy="true">
      <div className="h-4 w-24 animate-pulse rounded bg-line" />
      <div className="flex flex-col gap-2">
        <div className="h-8 w-2/3 animate-pulse rounded bg-line" />
        <div className="h-4 w-1/3 animate-pulse rounded bg-line/70" />
      </div>
      <div className="h-14 animate-pulse rounded-lg bg-line/70" />
      <div className="flex flex-col gap-5 rounded-xl border border-line bg-white p-5 shadow-card">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="flex flex-col gap-2">
            <div className="h-3 w-32 animate-pulse rounded bg-line/70" />
            <div className="h-4 w-full animate-pulse rounded bg-line/50" />
            <div className="h-4 w-5/6 animate-pulse rounded bg-line/50" />
          </div>
        ))}
      </div>
    </main>
  );
}
