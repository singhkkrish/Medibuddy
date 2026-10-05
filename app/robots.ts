import type { MetadataRoute } from "next";

// A sitemap.ts is intentionally NOT included: this app has no backend and
// no fixed catalog of medicines (any of openFDA's ~100k+ labels can be
// reached by search), so a static sitemap would either be empty or wildly
// incomplete. robots.txt still tells crawlers /medicine/* is indexable —
// individual pages get discovered via internal links from search results
// and get their own per-page metadata from generateMetadata().
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: ["/", "/medicine/"],
    },
  };
}
