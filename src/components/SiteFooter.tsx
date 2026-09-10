import Link from "next/link";
import { company, branches, services } from "@/content/site";
import { PhoneIcon, MailIcon, WhatsAppIcon, landmarkIcons } from "./Icons";

/**
 * Colophon. Set as a document footer — mono column heads, hairline rules, no
 * pills. Continuous with the ink contact band above it, separated by a rule
 * rather than a colour change.
 */
export function SiteFooter() {
  return (
    /* Extra bottom padding below `lg` clears whichever fixed bar the route is
       showing — the call/WhatsApp bar on `/`, the estimator's summary bar on
       `/pricing`. Both are `lg:hidden`, so the padding lifts at the same
       breakpoint they do. Putting the clearance here rather than in either bar
       means neither has to know where it sits in the document. */
    <footer className="bright-surface border-t border-paper/15 bg-ink px-4 pt-10 pb-[calc(3.5rem+5rem+env(safe-area-inset-bottom))] sm:px-6 lg:pt-12 lg:pb-12">
      <div className="mx-auto grid max-w-7xl gap-px border border-ink/12 bg-ink/10 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="bg-paper p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <span
              aria-hidden
              className="display border-b-[3px] border-accent-lt pb-0.5 text-[1.6rem] leading-none text-paper"
            >
              RR
            </span>
            <span className="text-[0.9375rem] font-semibold tracking-tight text-paper">
              Raghava Ram
              <span className="eyebrow mt-1 block text-[0.5625rem] text-paper/60">
                IT Solutions
              </span>
            </span>
          </div>
          <p className="mt-6 max-w-xs text-[0.9375rem] leading-relaxed text-paper/70">
            Digital products, practical automation and dependable support for
            growing businesses.
          </p>
          <p className="eyebrow mt-5 text-accent-lt">{company.tagline}</p>
          <div className="mt-6 flex flex-wrap gap-3 border-t border-ink/10 pt-5">
            <a
              href={company.phoneHref}
              className="num inline-flex min-h-[44px] cursor-pointer items-center gap-2 px-4 text-sm font-medium text-paper transition-colors duration-200 hover:bg-ink"
            >
              <PhoneIcon aria-hidden className="h-4 w-4" />
              {company.phone}
            </a>
            <a
              href={company.whatsappHref}
              className="inline-flex min-h-[44px] cursor-pointer items-center gap-2 border border-ink/20 px-4 text-sm text-paper transition-colors duration-200 hover:border-accent-lt hover:text-accent-lt"
            >
              <WhatsAppIcon aria-hidden className="h-4 w-4" />
              WhatsApp <span className="num text-xs">{company.phone}</span>
            </a>
          </div>
        </div>

        <div className="bg-paper p-6 sm:p-8">
          <h3 className="eyebrow border-b border-ink/15 pb-3 text-slate">
            Services
          </h3>
          <ul className="mt-4">
            {services.map((s) => (
              <li key={s.slug}>
                {/* `#services` was a bare hash, so it only ever resolved on
                    /pricing — on the landing page all six of these did
                    nothing, silently. The capability line slugs are identical
                    to these service slugs, so this deep-links straight to the
                    right line and the estimator's own hash handler opens
                    it. */}
                <Link
                  href={`/pricing#${s.slug}`}
                  className="flex min-h-[40px] cursor-pointer items-center border-l-[3px] border-transparent pl-3 text-[0.9375rem] text-paper/70 transition-colors duration-200 hover:border-accent hover:bg-paper-dp hover:text-paper"
                >
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-paper p-6 sm:p-8">
          <h3 className="eyebrow border-b border-ink/15 pb-3 text-slate">
            Branches
          </h3>
          <ul className="mt-4 space-y-3">
            {branches.map((b) => {
              const Landmark = landmarkIcons[b.landmark];
              return (
                <li
                  key={b.city}
                  className="flex items-center gap-2.5 text-[0.9375rem] text-paper/70"
                >
                  <Landmark className="h-4 w-4 shrink-0 text-accent-lt" />
                  {b.city}
                </li>
              );
            })}
          </ul>

          <h3 className="eyebrow mt-8 border-b border-ink/15 pb-3 text-slate">
            Email
          </h3>
          <a
            href={company.emailHref}
            className="mt-4 inline-flex cursor-pointer items-start gap-2 py-1.5 text-[0.9375rem] break-all text-paper/70 transition-colors duration-200 hover:text-paper"
          >
            <MailIcon aria-hidden className="mt-0.5 h-4 w-4 shrink-0" />
            {company.email}
          </a>
        </div>
      </div>

      <div className="mx-auto mt-8 flex max-w-7xl flex-wrap items-center justify-between gap-4 border-t border-ink/12 pt-6">
        <p className="eyebrow text-paper/60">
          © {new Date().getFullYear()} {company.name}
        </p>
        <p className="eyebrow text-paper/60">
          Hyderabad · Bangalore · Vijayawada
        </p>
      </div>
    </footer>
  );
}
