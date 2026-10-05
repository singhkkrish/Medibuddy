export default function Footer() {
  return (
    <footer className="mt-auto border-t border-line py-6">
      <div className="mx-auto flex max-w-3xl flex-col gap-1.5 px-4 text-xs text-ink-faint sm:px-6">
        <p>
          Data sourced from the{" "}
          <a
            href="https://open.fda.gov/apis/drug/label/"
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-line underline-offset-2 hover:text-brand-600"
          >
            openFDA Drug Label API
          </a>
          . This is U.S. FDA label data — it is not affiliated with, endorsed
          by, or guaranteed to match India&apos;s CDSCO-approved labelling.
        </p>
        <p>Built for reference only. Always check the printed pack insert.</p>
      </div>
    </footer>
  );
}
