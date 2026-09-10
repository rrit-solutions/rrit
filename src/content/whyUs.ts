import { whyUs } from "./site";
import { byId, pricingLineFor } from "./testimonials";

/**
 * The wiring behind the "why choose us" chart: a pamphlet reason, the client
 * whose testimonial corroborates it, and where that node floats above the web.
 *
 * This table is the whole content model for the section. The reason comes from
 * `whyUs` and the evidence from `testimonials.json` — neither string is retyped
 * here, so a quote cannot drift from its source or get trimmed on the way in,
 * which is what happened while the component carried its own copy.
 *
 * It lives in `content/` rather than beside the component for two reasons: the
 * component is a client component, and everything exported from one is a client
 * reference the server cannot read — and this is content, which is where the
 * rest of the content already is.
 *
 * `lineTitle` is the one literal, and it mirrors `capabilityLines` in
 * `./capabilities.ts`. It is duplicated on purpose: importing that module would
 * pull ~400 lines of estimator data into the landing page bundle to render one
 * link label. Line titles come off Pamphlet.png and do not move.
 */
const WIRING = [
  { reason: whyUs[0], testimonial: "ravi-teja", lineTitle: "WhatsApp AI Agent", z: "120px" },
  { reason: whyUs[1], testimonial: "lakshmi-narayana", lineTitle: "Enterprise Solutions", z: "45px" },
  { reason: whyUs[2], testimonial: "anitha-kumari", lineTitle: "Digital Marketing & SEO", z: "95px" },
  { reason: whyUs[3], testimonial: "suresh-reddy", lineTitle: "Enterprise Solutions", z: "30px" },
  { reason: whyUs[4], testimonial: "priya-sharma", lineTitle: "Web & Mobile Development", z: "75px" },
] as const;

export const whyUsNodes = WIRING.map((w) => {
  const t = byId[w.testimonial];
  return {
    reason: w.reason,
    z: w.z,
    lineTitle: w.lineTitle,
    /** Verbatim, straight off the JSON. Never trimmed here. */
    quote: t.quote,
    who: t.name,
    /** `role` and `company` are null until the client supplies them. */
    attribution: t.role && t.company ? `${t.role}, ${t.company}` : null,
    metric: t.metric,
    href: `/pricing#${pricingLineFor(t)}`,
  };
});

/** Distinct clients behind the five claims — for the section lede. */
export const whyUsSourceCount = new Set(WIRING.map((w) => w.testimonial)).size;
