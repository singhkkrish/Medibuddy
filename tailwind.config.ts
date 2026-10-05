import type { Config } from "tailwindcss";

// Design system: "pharmacy counter" — grounded in the vernacular of the
// Indian chemist shop (the near-universal green cross signage) and the
// printed medicine strip (foil blister packs, batch-code typography),
// rather than a generic SaaS palette. See README → Design system.
const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Clinical, slightly warm off-white — not clinical-cold pure white.
        paper: "#F6F7F2",
        // Deep chemist-shop green: the brand/primary color.
        brand: {
          50: "#EAF4EE",
          100: "#CFE7D9",
          200: "#9FCFB4",
          300: "#67B189",
          400: "#358F65",
          500: "#146B45",
          600: "#0F5638",
          700: "#0B412A",
          800: "#082E1E",
          900: "#051D13",
        },
        // Trust navy — used for links/manufacturer meta, echoes the
        // ink used on printed prescription slips.
        ink: {
          DEFAULT: "#151A17",
          soft: "#454E48",
          faint: "#748078",
        },
        navy: {
          500: "#28425F",
          600: "#1E3348",
        },
        // Warning/caution amber — reserved strictly for safety content.
        caution: {
          50: "#FDF3E3",
          200: "#F1D399",
          600: "#9A5B0A",
          700: "#7A480A",
        },
        line: "#E2E6DC",
      },
      fontFamily: {
        display: ["var(--font-display)", "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ["var(--font-body)", "ui-sans-serif", "system-ui", "-apple-system", "sans-serif"],
        label: ["var(--font-label)", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      letterSpacing: {
        widest2: "0.2em",
      },
      boxShadow: {
        card: "0 1px 2px rgba(21, 26, 23, 0.04), 0 1px 8px rgba(21, 26, 23, 0.04)",
        pop: "0 8px 24px rgba(15, 86, 56, 0.12)",
      },
      backgroundImage: {
        perforate:
          "repeating-linear-gradient(to right, #C9D1C1 0, #C9D1C1 6px, transparent 6px, transparent 14px)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(4px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.25s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
