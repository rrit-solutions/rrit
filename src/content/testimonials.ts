import data from "./testimonials.json";

/**
 * Typed access to the client-supplied testimonials.
 *
 * The JSON is the source of truth and the quotes in it are verbatim — see the
 * `_note` at the top of the file. This module exists so that every surface
 * reads the same object: the landing page quote row, the numbers band, and the
 * "why choose us" chart all resolve through `byId` rather than re-typing a
 * quote into a component and keeping it honest with a comment.
 */
export type Testimonial = (typeof data.testimonials)[number];

export const testimonials = data.testimonials;

export const byId = Object.fromEntries(
  testimonials.map((t) => [t.id, t]),
) as Record<string, Testimonial>;

/**
 * The service slug a testimonial belongs to, mapped onto a capability line on
 * `/pricing`.
 *
 * `hostel-management` is a product, not a line — the Hostel Management System
 * sits under Enterprise Solutions (`src/content/site.ts`), so that is where a
 * visitor following Lakshmi Narayana's quote should land.
 */
const LINE_FOR_SERVICE: Record<string, string> = {
  "hostel-management": "enterprise-solutions",
};

export function pricingLineFor(t: Testimonial): string {
  return LINE_FOR_SERVICE[t.service] ?? t.service;
}
