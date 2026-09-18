import type { MetadataRoute } from "next";

const SITE_URL = "https://raghavaramitsolutions.com";

/**
 * Served at /sitemap.xml.
 *
 * One page, so one entry. The in-page anchors (#services, #projects, …) are
 * deliberately not listed: fragments are not separate URLs, and submitting them
 * gets the sitemap flagged rather than crawled. When real routes get added —
 * a services detail page, case studies — they belong here.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
