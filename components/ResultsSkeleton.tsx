export default function ResultsSkeleton() {
  return (
    <ul className="flex flex-col gap-3" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <li
          key={i}
          className="animate-pulse rounded-xl border border-line bg-white p-4 shadow-card"
        >
          <div className="h-4 w-1/3 rounded bg-line" />
          <div className="mt-2 h-3 w-1/2 rounded bg-line/70" />
          <div className="mt-3 flex gap-1.5">
            <div className="h-5 w-16 rounded-full bg-line/70" />
            <div className="h-5 w-14 rounded-full bg-line/70" />
          </div>
        </li>
      ))}
    </ul>
  );
}
