"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  capabilityLines,
  estimate,
  formatINR,
  lineOf,
  lookup,
  PRICING_APPROVED,
} from "@/content/capabilities";
import { company } from "@/content/site";
import {
  DevicesIcon,
  MegaphoneIcon,
  ServerIcon,
  ChatIcon,
  AutomationIcon,
  PhoneWaveIcon,
  WhatsAppIcon,
  ArrowIcon,
} from "./Icons";

const lineIcons = {
  "web-mobile-development": DevicesIcon,
  "digital-marketing-seo": MegaphoneIcon,
  "enterprise-solutions": ServerIcon,
  "whatsapp-ai-agent": ChatIcon,
  "ai-business-automation": AutomationIcon,
  "voice-ai-receptionist": PhoneWaveIcon,
} as const;

/** Where focus should land after the render that removes a scope item. */
const SCOPE_HEADING = "\0heading";

/**
 * Interactive capability map, doubling as the quote estimator.
 *
 * The six service lines are the map; each one opens into the capabilities that
 * sit under it. Selecting capabilities builds a scope, and the panel on the
 * right turns that scope into an indicative range, an elapsed timeline, and a
 * WhatsApp message with the whole thing already written out — which is the
 * point. The visitor arrives in the client's inbox having already said what
 * they want, instead of "hi, need website, price?".
 *
 * Deliberately not a slider-and-total calculator: the ranges are wide and
 * labelled as ranges, because a firm that quotes a single exact number off a
 * web form is either guessing or padding.
 *
 * Three things about the interaction are load-bearing:
 *
 *  - **Lines open independently.** Scoping a website *and* a WhatsApp agent is
 *    the cross-sell this page exists to produce, so comparing two lines must
 *    not cost you the first one.
 *  - **The total is never off-screen.** The panel is sticky on desktop; below
 *    `lg` it sits after twenty-odd rows, so a summary bar carries the running
 *    number and the send button instead.
 *  - **`/pricing#<line-slug>` opens that line.** The "why choose us" chart on
 *    the landing page links straight to the line a testimonial came from.
 */
export function CapabilityMap() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [openLines, setOpenLines] = useState<Set<string>>(
    () => new Set([capabilityLines[0].slug]),
  );

  const asideRef = useRef<HTMLElement>(null);
  const scopeHeadingRef = useRef<HTMLParagraphElement>(null);
  const removeRefs = useRef(new Map<string, HTMLButtonElement>());
  const pendingFocus = useRef<string | null>(null);

  const result = useMemo(() => estimate(selected), [selected]);

  function toggle(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleLine(slug: string) {
    setOpenLines((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  }

  /* Deep link. `/pricing#whatsapp-ai-agent` opens that line and scrolls to it.
     The ids we render are prefixed (`line-…`, `caps-…`) so the browser's own
     hash scrolling finds nothing and does not fight this. */
  useEffect(() => {
    const slug = window.location.hash.slice(1);
    if (!slug || !capabilityLines.some((l) => l.slug === slug)) return;

    setOpenLines((prev) => new Set(prev).add(slug));

    const smooth = window.matchMedia(
      "(prefers-reduced-motion: no-preference)",
    ).matches;
    const frame = requestAnimationFrame(() => {
      document.getElementById(`line-${slug}`)?.scrollIntoView({
        block: "start",
        behavior: smooth ? "smooth" : "auto",
      });
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  /* Removing a scope item destroys the button that was focused. Without this
     the user is dropped on <body> and has to tab back through the whole page. */
  useEffect(() => {
    const target = pendingFocus.current;
    if (!target) return;
    pendingFocus.current = null;
    if (target === SCOPE_HEADING) scopeHeadingRef.current?.focus();
    else removeRefs.current.get(target)?.focus();
  });

  const selectedIds = useMemo(() => [...selected], [selected]);

  function removeFromScope(id: string, index: number) {
    pendingFocus.current =
      selectedIds[index + 1] ?? selectedIds[index - 1] ?? SCOPE_HEADING;
    toggle(id);
  }

  function clearScope() {
    pendingFocus.current = SCOPE_HEADING;
    setSelected(new Set());
  }

  const scopeText = useMemo(() => {
    if (selected.size === 0) return "";
    const grouped = new Map<string, string[]>();
    for (const id of selected) {
      const line = lineOf(id);
      const cap = lookup(id);
      if (!line || !cap) continue;
      const list = grouped.get(line.title) ?? [];
      list.push(cap.label);
      grouped.set(line.title, list);
    }
    const body = [...grouped]
      .map(([title, items]) => `${title}:\n` + items.map((i) => `  - ${i}`).join("\n"))
      .join("\n");

    const money =
      result.oneTime.to > 0
        ? `\nIndicative one-time: ${formatINR(result.oneTime.from)} - ${formatINR(result.oneTime.to)}`
        : "";
    const run =
      result.monthly.to > 0
        ? `\nIndicative monthly: ${formatINR(result.monthly.from)} - ${formatINR(result.monthly.to)}`
        : "";
    const time =
      result.weeks.to > 0
        ? `\nEstimated timeline: ${result.weeks.from}-${result.weeks.to} weeks`
        : "";

    /* While the rates are unapproved the figures still travel into WhatsApp,
       where they arrive stripped of every visual guard the page put around
       them. This line is what lets the office tell, months later, which
       enquiries quoted draft numbers — and it sits above the scope so it
       survives the preview truncation in a chat list. */
    const draft = PRICING_APPROVED
      ? ""
      : "[Draft pricing — figures below are indicative and not yet confirmed]\n\n";

    return `Hello Raghava Ram IT Solutions — I put this scope together on your website:\n\n${draft}${body}\n${money}${run}${time}\n\nCan we talk about it?`;
  }, [selected, result]);

  const waHref = useMemo(
    () => `${company.whatsappHref}?text=${encodeURIComponent(scopeText)}`,
    [scopeText],
  );

  /* The one figure the summary bar can fit. One-time wins when both exist —
     it is the number a visitor is deciding against. */
  const barFigure =
    result.oneTime.to > 0
      ? `${formatINR(result.oneTime.from)} – ${formatINR(result.oneTime.to)}`
      : result.monthly.to > 0
        ? `${formatINR(result.monthly.from)} – ${formatINR(result.monthly.to)} / mo`
        : "";

  /* Spoken form of the totals, so the status line announces the number that
     changed rather than re-reading the whole panel on every tick. */
  const spokenTotal = [
    result.oneTime.to > 0 &&
      `One-time ${formatINR(result.oneTime.from)} to ${formatINR(result.oneTime.to)}`,
    result.monthly.to > 0 &&
      `Ongoing ${formatINR(result.monthly.from)} to ${formatINR(result.monthly.to)} per month`,
    result.weeks.to > 0 && `${result.weeks.from} to ${result.weeks.to} weeks`,
  ]
    .filter(Boolean)
    .join(". ");

  return (
    <>
      {/* The draft-pricing guard, ahead of the first figure rather than in the
          panel footer.

          Its whole job is to stop an unapproved number reaching a customer, and
          in the footer it could not do that: at 375px the first ₹ figure sits
          around y=780 and the footer notice around y=2462, so a visitor could
          tick two boxes and send a scope having never scrolled past it. A
          notice that arrives after the decision is decoration. Copy is
          unchanged from where it used to live. */}
      {!PRICING_APPROVED && (
        <div
          role="note"
          className="mt-10 flex items-start gap-3 border-y border-ink/15 bg-paper-dp px-5 py-4 text-sm leading-relaxed text-ink sm:px-6"
        >
          <span aria-hidden className="mt-[0.55rem] h-[3px] w-4 shrink-0 bg-accent" />
          <span>
            <strong className="font-semibold">Pricing not yet confirmed.</strong>{" "}
            These figures are a working draft while we finalise our current
            rates.
          </span>
        </div>
      )}

      <div
        className={`grid gap-px bg-ink/15 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)] lg:items-start ${
          PRICING_APPROVED ? "mt-10" : "mt-px"
        }`}
      >
        {/* ---------------- the map ---------------- */}
        <div className="bg-paper">
          <ul>
            {capabilityLines.map((line, i) => {
              const Icon = lineIcons[line.slug as keyof typeof lineIcons];
              const isOpen = openLines.has(line.slug);
              const picked = line.capabilities.filter((c) =>
                selected.has(c.id),
              ).length;
              const isNew = line.status === "new";

              return (
                <li
                  key={line.slug}
                  id={`line-${line.slug}`}
                  className="scroll-mt-4 border-b border-ink/12 last:border-b-0"
                >
                  <h2>
                    <button
                      type="button"
                      onClick={() => toggleLine(line.slug)}
                      aria-expanded={isOpen}
                      aria-controls={`caps-${line.slug}`}
                      className="group flex w-full cursor-pointer items-start gap-4 px-5 py-5 text-left transition-colors duration-200 hover:bg-paper-dp sm:px-7"
                    >
                      <span className="num pt-1 text-sm text-accent">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <Icon
                        aria-hidden
                        className={`mt-0.5 h-5 w-5 shrink-0 ${isNew ? "text-hot" : "text-plate"}`}
                      />
                      <span className="min-w-0 flex-1">
                        <span className="display-sm flex flex-wrap items-center gap-x-3 gap-y-1 text-[1.2rem] text-ink">
                          {line.title}
                          {isNew && (
                            <span className="eyebrow bg-accent px-1.5 py-0.5 text-[0.5625rem] text-paper">
                              AI
                            </span>
                          )}
                        </span>
                        <span className="mt-1.5 block text-sm leading-relaxed text-slate">
                          {line.blurb}
                        </span>
                      </span>
                      <span className="flex shrink-0 items-center gap-3 pt-1">
                        {picked > 0 && (
                          <span className="num bg-plate px-2 py-0.5 text-xs text-paper">
                            {picked}
                          </span>
                        )}
                        <span
                          aria-hidden
                          className={`num text-lg leading-none text-ink/60 transition-transform duration-200 ${
                            isOpen ? "rotate-45" : ""
                          }`}
                        >
                          +
                        </span>
                      </span>
                    </button>
                  </h2>

                  {/* Stays mounted and collapses to 0fr, so `aria-controls`
                      always resolves and opening a line does not jump the page
                      by several hundred pixels. `inert` keeps the collapsed
                      rows out of the tab order and the a11y tree. */}
                  <div
                    id={`caps-${line.slug}`}
                    inert={!isOpen}
                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="min-h-0 overflow-hidden">
                      <ul className="grid gap-px bg-ink/12 sm:grid-cols-2">
                        {line.capabilities.map((c) => {
                          const on = selected.has(c.id);
                          return (
                            <li key={c.id} className="bg-paper">
                              <button
                                type="button"
                                onClick={() => toggle(c.id)}
                                aria-pressed={on}
                                className={`flex h-full w-full cursor-pointer flex-col items-start gap-2 px-5 py-4 text-left transition-colors duration-200 sm:px-6 ${
                                  on
                                    ? "bg-plate text-paper"
                                    : "text-ink hover:bg-paper-dp"
                                }`}
                              >
                                <span className="flex w-full items-start gap-3">
                                  <span
                                    aria-hidden
                                    className={`mt-[0.2rem] flex h-4 w-4 shrink-0 items-center justify-center border text-[0.6rem] leading-none ${
                                      on
                                        ? "border-accent-lt bg-accent-lt text-plate"
                                        : "border-ink/35"
                                    }`}
                                  >
                                    {on ? "✓" : ""}
                                  </span>
                                  <span className="flex-1 text-[0.9375rem] font-medium">
                                    {c.label}
                                  </span>
                                </span>
                                <span
                                  className={`pl-7 text-[0.8125rem] leading-relaxed ${
                                    on ? "text-paper/75" : "text-slate"
                                  }`}
                                >
                                  {c.note}
                                </span>
                                <span
                                  className={`num pl-7 text-xs ${
                                    on ? "text-accent-lt" : "text-accent"
                                  }`}
                                >
                                  {formatINR(c.from)} – {formatINR(c.to)}
                                  {c.billing === "monthly" ? " / month" : ""}
                                </span>
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        {/* ---------------- the estimate ---------------- */}
        <aside
          ref={asideRef}
          className="bright-surface scroll-mt-4 bg-ink text-paper lg:sticky lg:top-4"
        >
          <div className="border-b border-paper/15 px-6 py-5 sm:px-7">
            <span aria-hidden className="block h-[3px] w-8 bg-accent-lt" />
            <p className="eyebrow mt-3 text-paper/60">Your scope</p>
            <p
              ref={scopeHeadingRef}
              tabIndex={-1}
              role="status"
              className="mt-1.5 text-sm text-paper/80"
            >
              {result.count === 0
                ? "Pick what you need on the left."
                : `${result.count} ${result.count === 1 ? "item" : "items"} selected`}
              {spokenTotal && <span className="sr-only">. {spokenTotal}</span>}
            </p>
          </div>

          <div className="px-6 py-6 sm:px-7">
            {result.count === 0 ? (
              <p className="text-sm leading-relaxed text-paper/65">
                Nothing selected yet. Open a service line and tick what applies —
                the estimate, the timeline and a WhatsApp message with the whole
                scope written out will appear here.
              </p>
            ) : (
              <>
                <dl className="grid gap-6">
                  {result.oneTime.to > 0 && (
                    <div>
                      <dt className="eyebrow text-paper/60">One-time build</dt>
                      <dd className="num mt-2 text-[clamp(1.4rem,3.2vw,1.9rem)] leading-none text-paper">
                        {formatINR(result.oneTime.from)}
                        <span className="text-paper/60"> – </span>
                        {formatINR(result.oneTime.to)}
                      </dd>
                    </div>
                  )}
                  {result.monthly.to > 0 && (
                    <div>
                      <dt className="eyebrow text-paper/60">Ongoing</dt>
                      <dd className="num mt-2 text-[clamp(1.4rem,3.2vw,1.9rem)] leading-none text-paper">
                        {formatINR(result.monthly.from)}
                        <span className="text-paper/60"> – </span>
                        {formatINR(result.monthly.to)}
                        <span className="text-base text-paper/60"> / month</span>
                      </dd>
                    </div>
                  )}
                  {result.weeks.to > 0 && (
                    <div>
                      <dt className="eyebrow text-paper/60">Elapsed timeline</dt>
                      <dd className="num mt-2 text-lg text-paper">
                        {result.weeks.from}–{result.weeks.to} weeks
                        <span className="mt-1 block text-xs text-paper/60">
                          Assumes workstreams run in parallel, not end to end.
                        </span>
                      </dd>
                    </div>
                  )}
                </dl>

                <ul className="mt-7 space-y-px border-t border-paper/15 pt-5">
                  {selectedIds.map((id, index) => {
                    const c = lookup(id);
                    if (!c) return null;
                    return (
                      <li key={id}>
                        <button
                          type="button"
                          ref={(el) => {
                            if (el) removeRefs.current.set(id, el);
                            else removeRefs.current.delete(id);
                          }}
                          onClick={() => removeFromScope(id, index)}
                          aria-label={`Remove ${c.label} from the scope`}
                          className="group flex min-h-[44px] w-full cursor-pointer items-center gap-3 py-2 text-left transition-colors duration-200 hover:text-accent-lt"
                        >
                          <span
                            aria-hidden
                            className="h-px w-3 shrink-0 bg-accent-lt"
                          />
                          <span className="flex-1 text-sm text-paper/85 transition-colors duration-200 group-hover:text-paper">
                            {c.label}
                          </span>
                          <span
                            aria-hidden
                            className="num text-sm text-paper/60 group-hover:text-accent-lt"
                          >
                            ×
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>

                <div className="mt-7 flex flex-wrap gap-3">
                  <a
                    href={waHref}
                    className="inline-flex min-h-[48px] flex-1 cursor-pointer items-center justify-center gap-2.5 bg-accent-lt px-5 text-[0.9375rem] font-medium text-ink transition-colors duration-200 hover:bg-paper"
                  >
                    <WhatsAppIcon aria-hidden className="h-[18px] w-[18px]" />
                    Send this scope
                    <ArrowIcon aria-hidden className="h-4 w-4" />
                  </a>
                  <button
                    type="button"
                    onClick={clearScope}
                    className="inline-flex min-h-[48px] cursor-pointer items-center px-4 text-sm text-paper/65 transition-colors duration-200 hover:text-paper"
                  >
                    Clear
                  </button>
                </div>
              </>
            )}
          </div>

          <div className="border-t border-paper/15 px-6 py-5 text-xs leading-relaxed text-paper/60 sm:px-7">
            Indicative only. The real number depends on how much of your data and
            process already exists — which takes about fifteen minutes on a call
            to find out.
          </div>
        </aside>
      </div>

      {/* ---------------- the summary bar, below lg ----------------

          The estimate panel is sticky on desktop and simply cannot be on a
          phone: it sits after six service lines and up to twenty-six rows, so
          the whole selection task used to happen with the number off-screen.
          This carries the running figure and puts the send button one tap from
          wherever the visitor is in the list. */}
      {result.count > 0 && (
        <>
          {/* Clears the bar so it never covers the last capability row. Tracks
              the safe-area inset because the bar's own padding does. */}
          <div
            aria-hidden
            className="h-[calc(6.5rem+env(safe-area-inset-bottom))] lg:hidden"
          />
          <div className="dark-band fixed inset-x-0 bottom-0 z-[var(--z-sticky)] border-t border-paper/20 bg-ink lg:hidden">
            <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
              <button
                type="button"
                onClick={() =>
                  asideRef.current?.scrollIntoView({ block: "start" })
                }
                aria-label="See the full estimate"
                /* `min-w-0` so this can shrink below its content rather than
                   pushing Send off the bar. A flex child defaults to
                   min-width:auto, which is why adding anything to the label
                   row here is otherwise a layout risk at 375px. */
                className="min-h-[44px] min-w-0 flex-1 cursor-pointer text-left"
              >
                {/* Kept to one short line: at 375px anything longer wraps and
                    squeezes the figure, which is the only thing on this bar a
                    visitor is actually scanning for. */}
                <span className="eyebrow flex items-center gap-1.5 text-[0.5625rem] text-paper/65">
                  {result.count} selected
                  {/* This bar is the only thing on screen at the moment a
                      phone visitor presses Send, and it used to carry a
                      confident total with no qualifier at all. Set in the
                      attention colour rather than the muted one, because it
                      is competing with a figure four times its size. */}
                  {!PRICING_APPROVED && (
                    <span className="font-medium text-accent-lt">· Draft</span>
                  )}
                  {/* Points down: on mobile the estimate panel sits below the
                      map, so that is where this scrolls to. */}
                  <ArrowIcon
                    aria-hidden
                    className="h-3 w-3 rotate-90 text-accent-lt"
                  />
                </span>
                <span className="num mt-0.5 block text-sm text-paper">
                  {barFigure}
                  {result.oneTime.to > 0 && result.monthly.to > 0 && (
                    <span className="text-paper/60"> + monthly</span>
                  )}
                </span>
              </button>
              <a
                href={waHref}
                className="inline-flex min-h-[44px] shrink-0 cursor-pointer items-center gap-2 bg-accent-lt px-4 text-sm font-medium text-ink transition-colors duration-200 hover:bg-paper"
              >
                <WhatsAppIcon aria-hidden className="h-[18px] w-[18px]" />
                Send
              </a>
            </div>
          </div>
        </>
      )}
    </>
  );
}
