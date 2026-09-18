import type { MetadataRoute } from "next";

const SITE_URL = "https://raghavaramitsolutions.com";

/**
 * Served at /robots.txt. Next generates it at build time.
 *
 * Nothing here is private, so everything is crawlable; the one thing worth
 * blocking is /_next/static, which wastes crawl budget on hashed build
 * artefacts that can never rank. The sitemap line is what actually gets a new
 * domain discovered quickly.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/_next/static/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
