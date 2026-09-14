import Link from "next/link";
import { company } from "@/content/site";
import { PhoneIcon, WhatsAppIcon } from "./Icons";

/**
 * Landing-page anchors plus the one route that left the page. `/pricing` is a
 * real href rather than a hash because the estimator is no longer a section
 * of the home page — the hash links only resolve on `/`.
 */
const nav = [
  { href: "/#why", label: "Why us" },
  { href: "/#work", label: "Clients" },
  { href: "/pricing", label: "Pricing" },
  { href: "/#contact", label: "Contact" },
];

/**
 * Masthead, not a navbar.
 *
 * The floating rounded capsule with a gold pill CTA is the most recognisable
 * template shape on the web right now. This is a document header instead: it
 * sits flush at the top of the plate, is separated by a single hairline, and
 * every label is set in mono. The only filled element on the whole bar is the
 * phone number, because that is the one thing a visitor is here to do.
 *
 * The small-screen menu uses a native <details>/<summary> disclosure: no
 * client component, no hydration, keyboard and screen-reader behaviour for
 * free, and it still works if JS fails.
 *
 * The Stills/Video switch that used to sit here is gone: the looping video is
 * the hero now, not one of two options under review, so the masthead no longer
 * carries review scaffolding.
 */
/**
 * `current` is passed in rather than read from `usePathname`, which would make
 * the whole masthead a client component to decide one attribute. Only the real
 * routes can be current — the hash items are positions on a page, not pages,
 * so on `/` nothing is marked, which is the honest answer.
 */
export function SiteHeader({ current = "/" }: { current?: string }) {
  return (
    <header className="site-header fixed inset-x-0 top-0 z-20 border-b border-paper/15">
      <div className="mx-auto flex max-w-7xl items-stretch gap-4 px-4 sm:px-6">
        <Link
          href="/"
          className="group mr-auto flex shrink-0 cursor-pointer items-center gap-3 py-4"
        >
          <span className="site-logo-mark" aria-hidden>
            <span>R</span>
            <span>R</span>
          </span>
          <span className="site-wordmark hidden sm:block">
            <span className="site-wordmark__title">Raghava Ram</span>
            <span className="site-wordmark__tag">IT Solutions</span>
          </span>
          <span className="sr-only">Raghava Ram IT Solutions — home</span>
        </Link>

        {/* The gap to the right-hand cluster is held by `mr-auto` on the logo,
            not `ml-auto` here. Every element in this row is breakpoint-gated —
            this nav is `lg:block`, the phone CTA is `sm:inline-flex`, the menu
            is `lg:hidden` — so an auto margin on any one of them disappears at
            the widths where that element is `display:none`. Below 640px both
            candidates were hidden at once and the menu fell back to the left
            edge, taking its panel off-screen with it. The logo is the only
            child rendered at every width, so it is the only safe place to
            park the free space. */}
        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex h-full items-stretch">
            {nav.map((item) => (
              <li key={item.href} className="flex">
                <a
                  href={item.href}
                  aria-current={item.href === current ? "page" : undefined}
                  className={`eyebrow flex cursor-pointer items-center border-b-[3px] px-5 transition-colors duration-200 hover:border-accent-lt hover:text-paper ${
                    item.href === current
                      ? "border-accent-lt text-paper"
                      : "border-transparent text-paper/70"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <a
          href={company.phoneHref}
          className="num my-auto hidden min-h-[44px] shrink-0 cursor-pointer items-center gap-2 bg-accent px-5 text-[0.9375rem] font-medium text-paper transition-colors duration-200 hover:bg-ink lg:ml-6 sm:inline-flex"
        >
          <PhoneIcon className="h-4 w-4" />
          {company.phone}
        </a>

        {/* Small-screen menu */}
        <details className="group relative my-auto shrink-0 lg:hidden">
          <summary
            className="flex h-11 w-11 cursor-pointer list-none items-center justify-center border border-paper/25 text-paper transition-colors duration-200 hover:border-accent-lt [&::-webkit-details-marker]:hidden"
            aria-label="Open menu"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="square"
              aria-hidden
              className="h-5 w-5"
            >
              <path d="M4 7h16M4 12h16M4 17h16" className="group-open:hidden" />
              <path
                d="M6 6l12 12M18 6L6 18"
                className="hidden group-open:block"
              />
            </svg>
          </summary>

          {/* Dims the hero behind the open panel, which otherwise sits over a
              moving sky at whatever brightness the loop is passing through.
              Deliberately not a dismiss target: this disclosure is JS-free by
              design, and the summary already flips to an X to close. */}
          <div
            aria-hidden
            className="fixed inset-0 -z-10 hidden bg-ink/70 group-open:block"
          />

          <nav
            aria-label="Primary"
            className="absolute right-0 mt-3 w-60 max-w-[calc(100vw-2rem)] border border-paper/20 bg-ink p-2 shadow-2xl"
          >
            <ul>
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    aria-current={item.href === current ? "page" : undefined}
                    className={`flex min-h-[44px] cursor-pointer items-center border-l-[3px] px-3 text-sm transition-colors duration-200 hover:border-accent-lt hover:bg-paper/8 hover:text-paper ${
                      item.href === current
                        ? "border-accent-lt text-paper"
                        : "border-transparent text-paper/85"
                    }`}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-2 space-y-2 border-t border-paper/15 pt-2">
              <a
                href={company.phoneHref}
                className="num flex min-h-[44px] cursor-pointer items-center justify-center gap-2 bg-accent px-4 text-sm font-medium text-paper transition-colors duration-200 hover:bg-ink"
              >
                <PhoneIcon className="h-4 w-4" />
                {company.phone}
              </a>
              <a
                href={company.whatsappHref}
                className="flex min-h-[44px] cursor-pointer items-center justify-center gap-2 border border-paper/25 px-4 text-sm text-paper transition-colors duration-200 hover:border-accent-lt"
              >
                <WhatsAppIcon className="h-4 w-4" />
                WhatsApp
              </a>
            </div>
          </nav>
        </details>
      </div>
    </header>
  );
}
