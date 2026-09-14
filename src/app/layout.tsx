import type { Metadata, Viewport } from "next";
import {
  Bricolage_Grotesque,
  Instrument_Sans,
  IBM_Plex_Mono,
  Noto_Serif_Telugu,
  Noto_Sans_Telugu,
} from "next/font/google";
import "./globals.css";

// Display. Bricolage Grotesque carries a width axis, which is the whole point:
// headlines run narrowed (wdth 90) for newspaper density. Deliberately not a
// high-contrast fashion serif — that pairing (serif headline + gold + city
// photo) is exactly what made the last pass read as stock.
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  axes: ["wdth", "opsz"],
  display: "swap",
});

// Body. Contemporary grotesque with a slightly narrow default — sits under
// Bricolage without competing, and is not Inter.
const instrument = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

// Every label, count, and phone number on the site. The engineering register.
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

// Telugu coverage — Bricolage and Instrument Sans have none.
const notoSerifTe = Noto_Serif_Telugu({
  subsets: ["telugu"],
  variable: "--font-noto-serif-te",
  display: "swap",
});

const notoSansTe = Noto_Sans_Telugu({
  subsets: ["telugu"],
  variable: "--font-noto-sans-te",
  display: "swap",
});

const SITE_DESCRIPTION =
  "Web and mobile development, digital marketing and SEO, enterprise systems, and AI automation for businesses in Hyderabad, Bangalore and Vijayawada.";

export const metadata: Metadata = {
  title: {
    default: "Raghava Ram IT Solutions — We Build Digital Success",
    template: "%s · Raghava Ram IT Solutions",
  },
  description: SITE_DESCRIPTION,

  /**
   * The link preview is the advertisement.
   *
   * This firm's links travel by WhatsApp forward far more than by search, and
   * a forwarded link with no card is a grey rectangle with a domain on it —
   * the one impression most recipients will ever see. `openGraph` covers
   * WhatsApp, Facebook and LinkedIn; `twitter` gets the large card instead of
   * the default thumbnail.
   *
   * `metadataBase` has to be set or Next emits the image as a relative URL,
   * which every scraper resolves against its own host and drops.
   */
  metadataBase: new URL("https://raghavaramitsolutions.com"),
  openGraph: {
    type: "website",
    siteName: "Raghava Ram IT Solutions",
    locale: "en_IN",
    title: "Raghava Ram IT Solutions — We Build Digital Success",
    description: SITE_DESCRIPTION,
    images: [
      {
        url: "/skyline/og.jpg",
        width: 1200,
        height: 630,
        alt: "Raghava Ram IT Solutions — web, mobile and AI systems for Hyderabad, Bangalore and Vijayawada.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Raghava Ram IT Solutions — We Build Digital Success",
    description: SITE_DESCRIPTION,
    images: ["/skyline/og.jpg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Match the updated black base used across the site theme.
  themeColor: "#111111",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  // Font variables go on <html>, not <body>: Tailwind's `@theme` emits
  // --font-display/--font-body onto :root, and a var() is substituted using the
  // custom properties present on the element where it is *declared*. Scoped to
  // <body> the next/font vars are invisible to :root and the whole chain
  // silently falls back to the system stack.
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${instrument.variable} ${plexMono.variable} ${notoSerifTe.variable} ${notoSansTe.variable}`}
    >
      <body className="antialiased">
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        {children}
      </body>
    </html>
  );
}
