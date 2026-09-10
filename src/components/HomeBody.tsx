import {
  ServiceLines,
  SpatialWhyUsSection,
  Testimonials,
  ContactBand,
  MobileActionBar,
} from "./Sections";

/**
 * Everything below the hero on the landing page.
 *
 * Order is deliberate and matches how a stranger actually decides: see the work
 * (the skyline plate above this), hear why to trust us, hear it confirmed by
 * people who paid, then get a way to act. Claim, then evidence, then contact.
 *
 * Band rhythm alternates so no two plates of the same weight touch: dark hero,
 * dark why-us, paper testimonials, ink contact.
 *
 * Two things deliberately absent:
 *  - the Hostel Management spotlight, which put one product in front of the
 *    reasons anyone should hire the firm at all
 *  - the quote estimator, which now lives at /pricing. A visitor reading
 *    testimonials is not yet pricing a job.
 */
export function HomeBody() {
  return (
    <>
      {/* What we sell, before why to trust us. "On-time delivery" means
          nothing to a stranger who does not yet know what is being
          delivered. */}
      <ServiceLines />
      <SpatialWhyUsSection />
      <Testimonials />
      <ContactBand />
    </>
  );
}
