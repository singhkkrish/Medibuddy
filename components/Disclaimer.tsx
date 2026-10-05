/**
 * Health-information disclaimer. Shown on every medicine details page.
 *
 * Why here and not just in a footer: this app surfaces dosage and warning
 * text pulled from FDA labels, which in the Indian market is very likely
 * to be read as "should I take this" guidance rather than reference data.
 * The disclaimer sits directly under the page heading — above the fold,
 * before any dosage/warning content — rather than buried at the bottom,
 * so it's read before the medical content, not after.
 */
export default function Disclaimer() {
  return (
    <div
      role="note"
      aria-label="Health information disclaimer"
      className="flex gap-3 rounded-lg border border-caution-200 bg-caution-50 px-4 py-3 text-sm text-caution-700"
    >
      <svg
        aria-hidden
        viewBox="0 0 20 20"
        className="mt-0.5 h-4 w-4 shrink-0"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M8.257 3.099c.765-1.36 2.72-1.36 3.486 0l6.28 11.2c.75 1.335-.213 2.987-1.743 2.987H3.72c-1.53 0-2.493-1.652-1.743-2.987l6.28-11.2ZM10 7a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 10 7Zm0 7.25a.9.9 0 1 0 0-1.8.9.9 0 0 0 0 1.8Z"
          clipRule="evenodd"
        />
      </svg>
      <p>
        <span className="font-semibold">Not medical advice.</span> This
        information is sourced from FDA drug labels and may not match the
        version of this medicine sold in India. Always check the package
        insert and consult a doctor or pharmacist before taking any
        medicine.
      </p>
    </div>
  );
}
