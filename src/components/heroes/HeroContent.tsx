import { company, branches } from "@/content/site";
import { PhoneIcon, WhatsAppIcon } from "../Icons";

/**
 * Shared hero foreground. Identical across both variants so the client is
 * comparing the backdrop treatment and nothing else.
 *
 * Two changes from the previous pass, both aimed at the "looks generated"
 * problem:
 *
 *  - The buttons are square and only one is filled. A pair of full-round
 *    gold capsules floating over a city photo is the single most common
 *    AI-landing-page shape there is.
 *  - The hero ends in a *spec rail* rather than fading into the next section.
 *    Four monospace cells — where they are, how many service lines, what is
 *    running in production, how to reach them — pinned to the bottom edge on
 *    a hairline. It is the device the rest of the page repeats, and it puts
 *    verifiable facts in the first screen instead of adjectives.
 */

const rail = [
  { label: "Branches", value: branches.map((b) => b.city).join(" · ") },
  { label: "Service lines", value: "Six — three of them AI" },
  { label: "In production", value: "180+ students managed daily" },
];

export function HeroContent() {
  return (
    <div className="relative z-10 flex min-h-[42rem] flex-col justify-end lg:min-h-[46rem]">
      <div className="mx-auto w-full max-w-7xl px-4 pt-28 pb-12 sm:px-6 sm:pb-14">
        <div className="max-w-3xl border border-white/70 bg-paper/84 p-6 shadow-[0_20px_50px_-28px_rgba(7,26,47,.4)] backdrop-blur-sm sm:p-9">
          <div className="tick-rule w-full max-w-md text-ink" />
          <p className="eyebrow mt-5 text-accent">{company.tagline}</p>

          <h1 className="display mt-6 text-[clamp(2.75rem,7.5vw,5.5rem)] text-ink">
            We build digital success that{" "}
            <em className="text-accent not-italic">drives real results</em>
          </h1>

          <p className="prose-measure mt-6 text-base text-slate sm:text-lg">
            Web and mobile development, digital marketing, enterprise systems and
            AI automation — delivered on time and priced for businesses that
            actually have to watch the budget.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href={company.phoneHref}
              className="num inline-flex min-h-[48px] cursor-pointer items-center gap-2.5 bg-accent px-6 text-[0.9375rem] font-medium text-paper transition-colors duration-200 hover:bg-ink"
            >
              <PhoneIcon className="h-[18px] w-[18px]" />
              Call {company.phone}
            </a>
            <a
              href={company.whatsappHref}
              className="inline-flex min-h-[48px] cursor-pointer items-center gap-2.5 border border-ink/25 px-6 text-[0.9375rem] font-medium text-ink transition-colors duration-200 hover:border-accent hover:text-accent"
            >
              <WhatsAppIcon className="h-[18px] w-[18px]" />
              Message on WhatsApp
            </a>
          </div>
        </div>
      </div>

      {/* Spec rail — the recurring device. Four facts, each under its own
          accent tick, on a hairline at the bottom edge of the plate. */}
      <div className="border-t border-ink/10 bg-paper/90 backdrop-blur-sm">
        <dl className="mx-auto grid max-w-7xl gap-x-8 gap-y-4 px-4 py-5 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
          {rail.map((cell) => (
            <div key={cell.label}>
              <span aria-hidden className="block h-[3px] w-8 bg-accent" />
              <dt className="eyebrow mt-3 text-slate">{cell.label}</dt>
              <dd className="mt-1.5 text-sm text-ink">{cell.value}</dd>
            </div>
          ))}
          <div>
            <span aria-hidden className="block h-[3px] w-8 bg-accent" />
            <dt className="eyebrow mt-3 text-slate">Direct line</dt>
            <dd className="mt-1.5">
              <a
                href={company.phoneHref}
                /* -my-1.5/py-1.5 lifts the hit area to 31px — a bare 19px
                   text link fails WCAG 2.5.8's 24px minimum. */
                className="num -my-1.5 inline-block cursor-pointer py-1.5 text-sm text-ink underline decoration-accent decoration-2 underline-offset-4 transition-colors duration-200 hover:text-accent"
              >
                {company.phone}
              </a>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}

/**
 * Gradient scrim. Weighted to the top and bottom edges — the masthead and the
 * spec rail both sit on photography and need a floor under them, while the
 * middle of the plate stays open so the skyline is still visible as a picture
 * rather than a texture.
 */
export function HeroScrim() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 z-[5]"
      style={{
        /* rgb(7,26,47) is `--color-ink`. These stops were rgba(16,26,24) — the
           green-black of the abandoned brown palette — which laid a faintly
           warm veil over a navy video and disagreed with the ink band
           immediately below the hero. Stop positions and alphas unchanged. */
        background:
          "linear-gradient(180deg, rgba(212,231,248,.56) 0%, rgba(174,207,235,.16) 45%, rgba(225,240,252,.58) 100%)",
      }}
    />
  );
}
