import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Providers from "./providers";

// Deliberately system-font only (no next/font/google, no webfont request
// at all) — for the realistic audience here (someone on a phone, on a
// mobile data connection, landing from a Google search for a dosage
// question) shaving every non-essential network request off first paint
// matters more than a custom display face. Distinctiveness instead comes
// from weight/tracking/scale (see tailwind.config.ts) and the monospace
// "label" face used for field eyebrows, styled after the batch-code
// printing on a medicine strip.
export const metadata: Metadata = {
  metadataBase: new URL("https://example.com"),
  title: {
    default: "Medicine Directory — Search medicines & read dosage info",
    template: "%s | Medicine Directory",
  },
  description:
    "Search common medicines and view active ingredients, purpose, warnings, and dosage information sourced from the openFDA drug label database.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-paper font-sans text-ink antialiased">
        <Providers>
          <Header />
          <div className="mx-auto flex w-full max-w-3xl flex-1 flex-col px-4 py-8 sm:px-6">
            {children}
          </div>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
