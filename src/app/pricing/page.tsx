import type { Metadata } from "next";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ServicesSection, ContactBand } from "@/components/Sections";

export const metadata: Metadata = {
  title: "Build your scope — indicative pricing",
  description:
    "Tick the capabilities you need and the estimate, the timeline and a ready-to-send WhatsApp message assemble themselves.",
};

/**
 * The quote estimator, on a route of its own.
 *
 * It used to sit on the landing page, where it was the single largest object
 * on the page and interrupted the sequence before a visitor had any reason to
 * care what things cost. Anyone who reaches this route arrived by pressing
 * "Price your own project", so they are here on purpose.
 *
 * The masthead is dark-on-transparent and expects a dark plate behind it, so
 * the page opens with an ink header band rather than dropping the nav onto
 * paper where it would be invisible.
 */
export default function Pricing() {
  return (
    <>
      <SiteHeader current="/pricing" />
      <main id="main">
        <div className="bright-surface bg-ink px-4 pt-24 pb-12 sm:px-6 lg:pt-28 lg:pb-16">
          <div className="mx-auto max-w-7xl">
            <div className="tick-rule on-dark w-full text-paper" />
            <p className="eyebrow mt-5 text-accent-lt">Indicative pricing</p>
            <h1 className="display mt-4 max-w-3xl text-[clamp(2.1rem,4.5vw,3.35rem)] text-paper">
              Build your scope
            </h1>
            <p className="prose-measure mt-6 text-base text-paper/75">
              Six service lines, opened up. Tick what you need and the estimate,
              the timeline and a ready-to-send WhatsApp message assemble
              themselves — so the first message we get from you already says
              what you want.
            </p>
          </div>
        </div>
        <ServicesSection />
        <ContactBand />
      </main>
      <SiteFooter />
    </>
  );
}
