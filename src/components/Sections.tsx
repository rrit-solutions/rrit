import Link from "next/link";
import { company, services } from "@/content/site";
import { byId } from "@/content/testimonials";
import { whyUsNodes, whyUsSourceCount } from "@/content/whyUs";
import { CapabilityMap } from "./CapabilityMap";
import { SpatialWhyUs } from "./SpatialWhyUs";
import {
  PhoneIcon,
  WhatsAppIcon,
  MailIcon,
  ArrowIcon,
} from "./Icons";

/** Section kicker + heading. One object, used identically on every band. */
function SectionHead({
  kicker,
  title,
  lede,
  tone = "light",
}: {
  kicker: string;
  title: string;
  lede?: string;
  tone?: "light" | "dark";
}) {
  const dark = tone === "dark";
  return (
    <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-6">
      <div className="max-w-2xl">
        <div
          className={`tick-rule ${dark ? "on-dark text-paper" : "text-ink"} w-full`}
        />
        <p className={`eyebrow mt-5 ${dark ? "text-accent-lt" : "text-accent"}`}>
          {kicker}
        </p>
        <h2
          className={`display mt-4 text-[clamp(1.9rem,4vw,2.85rem)] ${
            dark ? "text-paper" : "text-ink"
          }`}
        >
          {title}
        </h2>
      </div>
      {lede && (
        <p
          className={`prose-measure max-w-sm text-sm ${
            dark ? "text-paper/75" : "text-slate"
          }`}
        >
          {lede}
        </p>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */

/**
 * Services, as an interactive capability map that doubles as the quote
 * estimator. A visitor can see what each line actually contains, price a
 * scope, and arrive in the client's WhatsApp with the scope already written
 * out.
 *
 * Lives only on `/pricing` now. The heading is the route's own `<h1>`, so this
 * section carries no `SectionHead` — two "Build your scope" titles stacked on
 * one screen is what happens when a page section gets promoted to a page.
 */
export function ServicesSection() {
  return (
    <section
      id="services"
      className="scroll-mt-20 bg-paper px-4 py-16 sm:px-6 lg:py-20"
    >
      <div className="mx-auto max-w-7xl">
        <CapabilityMap />
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

/**
 * What the firm actually sells, on the landing page.
 *
 * The page used to go hero → five adjectives → three quotes → contact, and
 * never once named a deliverable. The six lines existed only behind a single
 * button at the bottom of the testimonials, and the six footer links that
 * should have reached them pointed at `#services`, an id that only resolves on
 * `/pricing`. A visitor searching for "hostel management software" could read
 * the whole page without learning that it is built here.
 *
 * Deliberately not the estimator. This band names and routes; `/pricing` is
 * where a visitor prices, and they arrive there having already chosen a line.
 * The index numerals are the same 01–06 the capability map uses, so the two
 * surfaces read as one document rather than two lists that happen to agree.
 *
 * No icons. Six cells of icon-over-heading-over-text is the card scaffold this
 * palette spent its whole design avoiding, and the ruled hairline grid — the
 * same one the quote row uses — already does the separating.
 */
export function ServiceLines() {
  return (
    <section
      id="services"
      className="scroll-mt-20 bg-paper px-4 py-16 sm:px-6 lg:py-20"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHead
          kicker="What we build"
          title="Six service lines"
          lede="Three carried over from the printed pamphlet, three added for 2026. Every line opens onto what it contains and what it costs."
        />

        <ul className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {services.map((s, i) => (
            <li key={s.slug} className="flex">
              <Link
                href={`/pricing#${s.slug}`}
                className="group relative flex w-full cursor-pointer flex-col overflow-hidden border border-ink/12 bg-white px-6 py-7 shadow-[0_10px_30px_-26px_rgba(7,26,47,.55)] transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-1 hover:border-accent/50 hover:shadow-[0_18px_35px_-24px_rgba(7,26,47,.45)] focus-visible:-translate-y-1 sm:px-7 sm:py-8"
              >
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-accent transition-transform duration-200 group-hover:scale-x-100 group-focus-visible:scale-x-100"
                />
                <div className="flex items-center justify-between gap-3">
                  <span className="eyebrow num rounded-sm bg-paper-dp px-2 py-1 text-slate">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {/* The three AI lines are the newest thing the firm sells and
                      the least expected from a regional IT company. Flagged
                      rather than buried in the summary text. */}
                  {s.status === "new" && (
                    <span className="eyebrow border border-accent/45 px-1.5 py-0.5 text-accent">
                      AI
                    </span>
                  )}
                </div>

                <span className="display-sm mt-6 block text-xl text-ink">
                  {s.title}
                </span>
                <span className="mt-3 text-sm leading-[1.6] text-slate">
                  {s.summary}
                </span>
                <span className="mt-6 border-t border-ink/10 pt-5">
                  <span className="eyebrow text-[0.5625rem] text-slate">
                    Includes
                  </span>
                  <span className="mt-3 grid gap-2">
                    {s.points.slice(0, 3).map((point) => (
                      <span key={point} className="flex items-start gap-2 text-[0.8125rem] leading-snug text-ink/80">
                        <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 bg-accent" />
                        {point}
                      </span>
                    ))}
                  </span>
                </span>
                <span className="eyebrow mt-7 inline-flex items-center gap-1.5 text-accent">
                  Explore pricing & scope
                  <ArrowIcon
                    aria-hidden
                    className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1"
                  />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

/**
 * The dark plate of the landing page: the five pamphlet reasons as the orbital
 * 3D chart.
 *
 * This is now the only "why choose us" treatment. The scattered-node
 * `TechnologyMap` variant it used to be compared against is gone — the client
 * chose this one, so keeping both would have been dead code pretending to be a
 * decision.
 */
export function SpatialWhyUsSection() {
  return (
    <section
      id="why"
      className="bright-surface scroll-mt-20 overflow-hidden bg-plate-dp px-4 py-16 sm:px-6 lg:py-20"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHead
          kicker="Why choose us"
          title="Five reasons clients stay"
          lede={`Every reason is on our printed brochure, and every one of them is wired to a client who said it back to us unprompted. Pick a node to read the evidence — ${whyUsNodes.length} claims, ${whyUsSourceCount} sources.`}
          tone="light"
        />
        <SpatialWhyUs />
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

/**
 * The three testimonials that carry the landing page, side by side.
 *
 * Suresh and Priya are dropped here — not deleted from `testimonials.json`, so
 * they are still available for a future testimonials page. Of the three that
 * remain, all three happen to carry a metric, which is what makes the numbers
 * band below them work as a summary rather than a partial one.
 */
const quoteOrder = ["lakshmi-narayana", "anitha-kumari", "ravi-teja"] as const;

const featured = quoteOrder.map((id) => byId[id]);
const metrics = featured.filter((t) => t.metric);

/**
 * Client results — three quotes in one row on desktop, equal weight.
 *
 * Equal weight is the point. Tile size used to encode editorial importance,
 * which meant quotes set at four different sizes and a reading order that ran
 * in an L. Three columns at one size can be read in any order.
 *
 * The navy sits on the numbers, not on a quote: they are the only quantified
 * claims in the section, so they are the only thing that earns the emphasis.
 *
 * The CTA leaves the page. The estimator is a route of its own now — a visitor
 * reading testimonials is not yet pricing a job, and putting a 6-line
 * interactive form under them interrupted the one thing this section does.
 */
export function Testimonials() {
  return (
    <section
      id="work"
      className="scroll-mt-20 bg-paper px-4 py-16 sm:px-6 lg:py-20"
    >
      <div className="mx-auto max-w-7xl">
        <SectionHead
          kicker="Client results"
          title="What our clients say"
          lede="Verbatim, supplied by the clients themselves."
        />

        <ul className="mt-10 grid gap-4 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {featured.map((t) => (
            <li key={t.id} className="flex">
              <figure className="flex h-full w-full flex-col border border-ink/12 bg-white px-6 py-7 shadow-[0_10px_30px_-26px_rgba(7,26,47,.45)] sm:px-7 sm:py-8">
                <div className="flex items-center gap-3">
                  <span aria-hidden className="block h-[3px] w-8 bg-accent" />
                  <span className="eyebrow text-[0.5625rem] text-slate">Client story</span>
                </div>
                <blockquote className="mt-6 flex-1 text-[0.9375rem] leading-[1.72] text-ink/90">
                  <span aria-hidden className="display mr-1 text-2xl leading-none text-accent">&ldquo;</span>
                  {t.quote}
                </blockquote>
                <figcaption className="mt-8 border-t border-ink/12 pt-5">
                  <span className="display-sm block text-base text-ink">
                    {t.name}
                  </span>
                  {/* No fallback line. Until the real roles arrive (see the
                      `_todo` in testimonials.json) every card rendered the same
                      literal "Client", and three identical placeholder
                      attributions under three different names read as invented
                      quotes — the opposite of what an attribution is for. The
                      name alone claims less and is believed more. */}
                  {t.role && t.company && (
                    <span className="eyebrow mt-1.5 block text-slate">
                      {`${t.role}, ${t.company}`}
                    </span>
                  )}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>

        {/* The numbers. This is the navy that used to sit on a quote tile. */}
        {metrics.length > 0 && (
          <div className="bright-surface mt-10 border-y border-ink/12 bg-paper-dp px-6 py-8 sm:mt-12 sm:px-10 lg:px-12 lg:py-9">
            <p className="eyebrow text-accent">Results, in their numbers</p>
            <dl className="mt-7 grid gap-x-8 gap-y-6 sm:grid-cols-3">
              {metrics.map((t) => (
                <div key={t.id} className="border-l-2 border-accent pl-4">
                  <dd className="display text-[clamp(2rem,3.2vw,2.75rem)] text-ink">
                    {t.metric!.value}
                  </dd>
                  <dt className="eyebrow mt-2 text-slate">
                    {t.metric!.label}
                  </dt>
                  <p className="mt-3 text-xs text-paper/60">— {t.name}</p>
                </div>
              ))}
            </dl>
          </div>
        )}

        <Link
          href="/pricing"
          className="group mt-8 inline-flex min-h-[48px] cursor-pointer items-center gap-2.5 bg-accent px-6 text-[0.9375rem] font-medium text-paper transition-colors duration-200 hover:bg-ink"
        >
          Price your own project
          <ArrowIcon
            aria-hidden
            className="h-[18px] w-[18px] transition-transform duration-200 group-hover:translate-x-1"
          />
        </Link>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------------------- */

/**
 * Persistent call/WhatsApp bar, below `lg`, on the landing page only.
 *
 * The masthead is `position: absolute` and nothing on this page is fixed, so
 * past the first screen a phone visitor had no phone number, no WhatsApp and
 * no navigation for the entire remaining scroll — on the one viewport where
 * tap-to-call is the conversion mechanic. Adding the service lines made that
 * stretch longer, not shorter.
 *
 * Structure is lifted from the estimator's summary bar rather than reinvented:
 * same z-token, same border, same `env(safe-area-inset-bottom)` handling, and
 * the same trick of an in-flow spacer so the bar never covers the last thing
 * on the page. The two bars are mutually exclusive by construction — this one
 * renders from `HomeBody`, which only exists on `/`, and the estimator's bar
 * only exists on `/pricing`.
 *
 * Filled button is `accent-lt` on ink, not `accent` — the footer's
 * `bg-accent hover:bg-ink` pattern makes a button disappear into its own
 * background on hover, which is the bug this deliberately does not copy.
 */
export function MobileActionBar() {
  return (
    <>
      {/* No spacer here — clearance lives on the footer's own bottom padding,
          so it works for the estimator's bar on /pricing too. */}
      <div className="dark-band fixed inset-x-0 bottom-0 z-[var(--z-sticky)] border-t border-paper/20 bg-ink lg:hidden">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:px-6">
          <a
            href={company.phoneHref}
            aria-label={`Call ${company.phone}`}
            className="inline-flex min-h-[44px] flex-1 cursor-pointer items-center justify-center gap-2 bg-accent-lt px-4 text-sm font-medium text-ink transition-colors duration-200 hover:bg-paper"
          >
            <PhoneIcon aria-hidden className="h-[18px] w-[18px]" />
            Call
          </a>
          <a
            href={company.whatsappHref}
            className="inline-flex min-h-[44px] flex-1 cursor-pointer items-center justify-center gap-2 border border-paper/35 px-4 text-sm text-paper transition-colors duration-200 hover:border-accent-lt hover:text-accent-lt"
          >
            <WhatsAppIcon aria-hidden className="h-[18px] w-[18px]" />
            WhatsApp
          </a>
        </div>
      </div>
    </>
  );
}

/* -------------------------------------------------------------------------- */

export function ContactBand() {
  return (
    <section
      id="contact"
      className="bright-surface scroll-mt-20 bg-ink px-4 py-16 sm:px-6 lg:py-20"
    >
      <div className="mx-auto max-w-7xl">
        <div className="tick-rule on-dark w-full text-paper" />
        <p className="eyebrow mt-5 text-accent-lt">Get in touch today</p>

        <div className="mt-5 grid gap-7 lg:grid-cols-[1.3fr_1fr] lg:items-end">
          {/* 5.5vw, not 8.5vw: the preferred size has to be read against this
              1.3fr column, not the viewport, or the number outgrows its own
              cell between 1024 and 1280 where the two-column grid first
              applies. `nowrap` is the guard that turns any future overflow
              into a visible layout break instead of a silently wrapped
              number. */}
          <a
            href={company.phoneHref}
            aria-label={`Call ${company.phone}`}
            className="num block cursor-pointer whitespace-nowrap text-[clamp(2rem,4.2vw,3.75rem)] leading-none tracking-tight text-paper transition-colors duration-200 hover:text-accent-lt"
          >
            <span aria-hidden className="mr-[0.18em] text-[0.42em] text-paper/75">
              {company.phoneCc}
            </span>
            <span aria-hidden>{company.phoneLocal}</span>
          </a>
          <p className="prose-measure text-sm text-paper/70 lg:pb-3">
            Call between 9am and 8pm, or send the brief on WhatsApp and we will
            come back with a scope and a price. No forms, no ticket queue.
          </p>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href={company.whatsappHref}
            className="inline-flex min-h-[48px] cursor-pointer items-center gap-2.5 bg-accent-lt px-6 text-[0.9375rem] font-medium text-ink transition-colors duration-200 hover:bg-paper"
          >
            <WhatsAppIcon aria-hidden className="h-[18px] w-[18px]" />
            <span>WhatsApp</span>
            <span className="num border-l border-ink/20 pl-2.5 text-[0.8125rem]">{company.phone}</span>
          </a>
          <a
            href={company.emailHref}
            className="inline-flex min-h-[48px] cursor-pointer items-center gap-2.5 border border-paper/35 px-6 text-[0.9375rem] text-paper transition-colors duration-200 hover:border-accent-lt hover:text-accent-lt"
          >
            <MailIcon aria-hidden className="h-[18px] w-[18px]" />
            <span className="break-all">{company.email}</span>
          </a>
          <a
            href={company.phoneHref}
            className="inline-flex min-h-[48px] cursor-pointer items-center gap-2.5 border border-paper/35 px-6 text-[0.9375rem] text-paper transition-colors duration-200 hover:border-accent-lt hover:text-accent-lt sm:hidden"
          >
            <PhoneIcon aria-hidden className="h-[18px] w-[18px]" />
            Call now
          </a>
        </div>
      </div>
    </section>
  );
}
