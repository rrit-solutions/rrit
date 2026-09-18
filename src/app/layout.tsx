import type { Metadata, Viewport } from "next";
import "./globals.css";

/**
 * Type is Neometric and nothing else, loaded by @font-face in globals.css from
 * /public/fonts/neometric. next/font is deliberately not used: it self-hosts
 * Google fonts or local files it can fingerprint, and Neometric is licensed —
 * see public/fonts/README.md.
 */

const SITE_URL = "https://rritsolutions.in";

const SITE_NAME = "Raghava Ram IT Solutions";

const SITE_TITLE = "Raghava Ram IT Solutions — We Build Digital Success";

/**
 * Under 160 characters so Google shows it whole, and it leads with what is
 * actually sold rather than with the company name — the name is already in the
 * title tag, repeating it here wastes the half of the snippet people read.
 */
const SITE_DESCRIPTION =
  "Web and mobile development, AI agents, automation, SEO and custom software for businesses in Hyderabad, Bangalore and Vijayawada. Built around real business outcomes.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: SITE_TITLE,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,

  /**
   * Without this every scraper that sees a relative og:image resolves it
   * against its own host and drops the card. One page, one canonical.
   */
  alternates: { canonical: "/" },

  keywords: [
    "IT solutions Hyderabad",
    "web development Hyderabad",
    "mobile app development",
    "AI chatbot development",
    "business automation",
    "custom software development",
    "SEO services",
    "ERP system",
    "hostel management software",
    "IT company Vijayawada",
    "IT company Bangalore",
  ],

  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,

  /**
   * These links travel by WhatsApp forward more than by search, and a forward
   * with no card is a grey rectangle with a domain on it — the only impression
   * most recipients ever get.
   */
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "en_IN",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} — web, mobile, AI and automation for Hyderabad, Bangalore and Vijayawada.`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/og.jpg"],
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/image.png",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  formatDetection: { telephone: true, address: true, email: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#061728",
};

/**
 * LocalBusiness is the schema that earns the knowledge panel and the map pack
 * for a services firm with named cities. Everything in it is a claim the page
 * itself already makes — no invented ratings, no invented review counts, both
 * of which are manual-action territory when they are not backed by real data.
 */
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfessionalService",
      "@id": `${SITE_URL}/#business`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/image.png`,
      image: `${SITE_URL}/og.jpg`,
      description: SITE_DESCRIPTION,
      telephone: "+91-85007-84889",
      slogan: "We build digital systems that work.",
      priceRange: "₹₹",
      areaServed: [
        { "@type": "City", name: "Hyderabad" },
        { "@type": "City", name: "Bangalore" },
        { "@type": "City", name: "Vijayawada" },
      ],
      address: {
        "@type": "PostalAddress",
        addressCountry: "IN",
        addressRegion: "Telangana",
        addressLocality: "Hyderabad",
      },
      knowsLanguage: ["en", "te", "hi"],
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Services",
        itemListElement: [
          ["Web & Mobile Development", "Fast, secure and scalable digital products."],
          ["Digital Marketing & SEO", "Get found. Get customers. Grow faster."],
          ["Enterprise Systems", "Systems built around real business needs."],
          ["AI Agents", "24/7 customer assistance in Telugu, Hindi and English."],
          ["Business Automation", "Reduce repetitive manual work."],
          ["Custom Software", "Solutions tailored to your workflow."],
        ].map(([name, description]) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name, description },
        })),
      },
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: SITE_NAME,
      description: SITE_DESCRIPTION,
      inLanguage: "en-IN",
      publisher: { "@id": `${SITE_URL}/#business` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN">
      <head>
        {/*
          The two cuts the page actually renders. Without preload the browser
          only discovers them after CSSOM is built, which is a visible reflow on
          a cold load and a CLS hit. The other cuts stay lazy.
        */}
        <link
          rel="preload"
          href="/fonts/neometric/Neometric-Regular.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/neometric/Neometric-Bold.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          // Serialised server-side from a literal we control — no user input
          // reaches this string.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
