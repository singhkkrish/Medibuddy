# Medicine Directory

A medicine search and reference app built on the public [openFDA Drug Label API](https://open.fda.gov/apis/drug/label/) — search a medicine by brand name, then view its active ingredients, purpose, warnings, and dosage on a dedicated, SEO-friendly page.

Built for the Software Engineering Intern (Web Platform) take-home assignment.

**🔗 Live demo: [medicine-directory.onrender.com](https://medicine-directory.onrender.com)**

> Note: hosted on Render's free tier, so the app may take ~30–50 seconds to wake up on the first request after a period of inactivity.

---

## Live features

- **Homepage search** — live, debounced search-as-you-type (auto-searches after a short pause, or instantly on Enter/Search).
- **Medicine details page** (`/medicine/[name]`) — active ingredients, purpose, dosage & administration, warnings, and an expandable "more safety information" section (do-not-use, stop-use, ask-a-doctor, pregnancy/breastfeeding), when the label includes them.
- **Multiple formulations** of the same brand name (different route, strength, or manufacturer) are grouped and cross-linked instead of silently picking one.
- **Health disclaimer** shown on every details page — this is FDA (U.S.) label data, not a substitute for the Indian pack insert or medical advice.
- **Visible edge-case handling** — no results, API error/timeout (with retry), and missing fields all render an explicit UI state instead of a blank page, a crash, or a stray `undefined`.
- **SEO** — per-medicine `<title>`/meta description, canonical URL, Open Graph tags, and JSON-LD structured data (`schema.org/Drug`).

---

## Design system: "pharmacy counter"

Rather than a generic SaaS palette, the visual design is grounded in the actual subject:

- **Palette** — a deep chemist-shop green, echoing the green-cross signage on Indian medical stores, paired with a trust navy for metadata and an amber reserved strictly for warnings (never decorative).
- **Type** — a monospace "label" face for field eyebrows (ACTIVE INGREDIENTS, DOSAGE), styled after the batch-code printing on a foil medicine strip, against a plain, highly legible body face for the actual content.
- **No webfont requests** — system fonts only. The realistic reader here is on a phone, often on mobile data, arriving from a search for a dosage question — first paint speed mattered more than a custom display face.
- **Signature element** — a perforated "tear-strip" rule separating ingredient/purpose/dosage/warning sections, plus a small blister-pocket dot beside each field label.

---

## Product & SEO decisions (India-specific)

- **Mobile-first, lightweight layout.** Single column, no heavy hero imagery, minimal JS beyond what's needed for search — built assuming variable network conditions.
- **openFDA is U.S. label data.** Indian OTC brand names (Crocin, Dolo 650, etc.) generally won't resolve, since this dataset only covers U.S.-labelled products. The homepage's quick-suggestion chips use verified openFDA-searchable names (Advil, Tylenol, Benadryl, Aspirin, Claritin) so a first-time user isn't guessing, and the empty-result state explains this limitation rather than just saying "no results."
- **Multiple formulations are surfaced, not hidden.** A search for one brand can return several distinct labels (different strength, route, or manufacturer). Rather than picking one arbitrarily, the details page shows the closest match and links to the others — so nobody reads dosage info for the wrong formulation.
- **Trust-first content order.** Ingredients → purpose → dosage → warnings, disclaimer placed prominently rather than buried at the page bottom.
- **Print/save support.** Someone checking a dosage before taking a pill may want a physical copy — a print button and a print stylesheet (hides nav/header/footer) are included.

---

## Tech stack

- **Next.js** (App Router) + **TypeScript**
- **Tailwind CSS**
- **TanStack Query** — used for the homepage search (caching, retry, built-in loading/error state)
- **openFDA Drug Label API** — no backend, no API key required

---

## Project structure

```
medicine-directory/
├── app/
│   ├── page.tsx                 # Homepage — search UI
│   ├── layout.tsx               # Root layout, global metadata, fonts
│   ├── providers.tsx            # TanStack Query provider
│   ├── globals.css
│   ├── icon.svg
│   ├── robots.ts
│   └── medicine/[name]/
│       ├── page.tsx             # Medicine details page (SEO route)
│       ├── loading.tsx          # Route-level loading skeleton
│       ├── not-found.tsx        # 404 state for unmatched medicines
│       └── error.tsx            # Error boundary safety net
├── components/
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── SearchBar.tsx
│   ├── QuickSuggestions.tsx
│   ├── MedicineCard.tsx
│   ├── ResultsSkeleton.tsx
│   ├── ErrorState.tsx
│   ├── Disclaimer.tsx
│   └── PrintButton.tsx
├── lib/
│   ├── openfda.ts               # API client + typed helpers
│   └── useDebouncedValue.ts     # Debounce hook for live search
├── types/
│   └── medicine.ts              # TypeScript interfaces for API data
└── README.md
```

---

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). No environment variables or API keys are required.

**Production build:**

```bash
npm run build
npm run start
```

---

