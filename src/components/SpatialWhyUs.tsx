"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { branches } from "@/content/site";
import { whyUsNodes as nodes } from "@/content/whyUs";
import { ArrowIcon, landmarkIcons } from "./Icons";

/**
 * "Why choose us", drawn as a 3D technology chart.
 *
 * Structure is lifted from the `Spatial / 3D Technology Universe` study in the
 * template artifact — one core with everything orbiting it, on a starfield,
 * wired to the centre — but three things are deliberately different:
 *
 *  - The orbit carries the five reasons off the printed pamphlet, not a list of
 *    services. The pamphlet is the source; nothing here is invented.
 *  - Each node is a real control, not a decorative label. Selecting one writes
 *    the reason into the core along with the client testimonial that
 *    corroborates it — the whole quote, and the number in it where the client
 *    gave one — so the claim and its evidence are never more than one object
 *    apart. The core then offers the one route out of the section: price a
 *    project on the line that testimonial came from.
 *  - Colour is the site's own Ink & Vermilion — warm near-black plate,
 *    vermilion hairlines. The study's cyan/blue belongs to the study.
 *
 * Depth is real CSS 3D: every node floats at its own translateZ above the wire
 * web and the whole plane tilts toward the pointer. The orbit is drawn as an
 * SVG ellipse in a non-uniform viewBox rather than a `border-radius: 50%` box,
 * so the ring passes exactly through the nodes at any aspect ratio.
 *
 * Below `lg`, under prefers-reduced-motion, or on a coarse pointer, no
 * transform is ever applied: the tablist reflows to a wrapped chip row with the
 * panel beneath it. Same five reasons, same reading order, same controls.
 */

/** Orbit radius, as a percentage of the stage. Nodes and ring share it. */
const R = 38;

/** Node i on the orbit, first one due north. */
function orbit(i: number) {
  const a = ((-90 + (360 / nodes.length) * i) * Math.PI) / 180;
  return { x: 50 + R * Math.cos(a), y: 50 + R * Math.sin(a) };
}

const points = nodes.map((_, i) => orbit(i));

export function SpatialWhyUs() {
  const [active, setActive] = useState(0);
  const stageRef = useRef<HTMLDivElement>(null);
  const planeRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const stage = stageRef.current;
    const plane = planeRef.current;
    if (!stage || !plane) return;

    // Only tilt where it is wanted and usable: a fine pointer, motion allowed,
    // and a viewport wide enough that the nodes are actually laid out in 3D.
    const motionOk = window.matchMedia("(prefers-reduced-motion: no-preference)");
    const finePointer = window.matchMedia("(pointer: fine)");
    const wide = window.matchMedia("(min-width: 1024px)");

    let frame = 0;
    let px = 0;
    let py = 0;

    const apply = () => {
      frame = 0;
      plane.style.setProperty("--px", String(px));
      plane.style.setProperty("--py", String(py));
    };

    // The stage is the plane's box and nothing else — the branches strip is a
    // sibling of it, not a child. It used to be inside, which normalised `py`
    // against a box taller than the plane (so the neutral, untilted line sat
    // below the plane's centre and the chart was tipped forward at rest) and
    // let a pointer over the city list steer the chart.
    //
    // The rect is read off the stage rather than the plane on purpose: the
    // plane is the element being rotated, so its bounding box changes as it
    // tilts and measuring it would feed the transform back into its own input.
    const onMove = (e: PointerEvent) => {
      const r = stage.getBoundingClientRect();
      px = Math.max(-1, Math.min(1, ((e.clientX - r.left) / r.width) * 2 - 1));
      py = Math.max(-1, Math.min(1, ((e.clientY - r.top) / r.height) * 2 - 1));
      if (!frame) frame = requestAnimationFrame(apply);
    };

    const onLeave = () => {
      px = 0;
      py = 0;
      if (!frame) frame = requestAnimationFrame(apply);
    };

    const sync = () => {
      const on = motionOk.matches && finePointer.matches && wide.matches;
      stage.removeEventListener("pointermove", onMove);
      stage.removeEventListener("pointerleave", onLeave);
      if (on) {
        stage.addEventListener("pointermove", onMove, { passive: true });
        stage.addEventListener("pointerleave", onLeave);
      } else {
        onLeave();
      }
    };

    sync();
    motionOk.addEventListener("change", sync);
    finePointer.addEventListener("change", sync);
    wide.addEventListener("change", sync);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      stage.removeEventListener("pointermove", onMove);
      stage.removeEventListener("pointerleave", onLeave);
      motionOk.removeEventListener("change", sync);
      finePointer.removeEventListener("change", sync);
      wide.removeEventListener("change", sync);
    };
  }, []);

  /** Roving tabindex — arrow keys walk the orbit, Home/End jump to its ends. */
  function onKeyDown(e: React.KeyboardEvent) {
    const last = nodes.length - 1;
    let next: number | null = null;
    if (e.key === "ArrowRight" || e.key === "ArrowDown")
      next = active === last ? 0 : active + 1;
    else if (e.key === "ArrowLeft" || e.key === "ArrowUp")
      next = active === 0 ? last : active - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    if (next === null) return;
    e.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  }

  const current = nodes[active];

  return (
    <div className="mt-10 lg:mt-12">
      <div
        ref={stageRef}
        className="lg:[perspective:1500px] lg:[perspective-origin:50%_45%]"
      >
        <div
          ref={planeRef}
          className="lg:relative lg:h-[42rem] lg:transition-transform lg:duration-300 lg:ease-out lg:[transform-style:preserve-3d] lg:[transform:rotateX(calc(var(--py,0)*-8deg))_rotateY(calc(var(--px,0)*10deg))]"
        >
          {/* Starfield. Faded out toward the edges so it reads as depth rather
              than as a texture laid over the whole plate. */}
          <div
            aria-hidden
            className="starfield hidden text-accent-lt/25 lg:absolute lg:inset-0 lg:block"
          />

          {/* The wiring. Flat on the plane; every node floats above it. The
              non-uniform viewBox means the ellipse tracks the node ring exactly
              however wide the section gets. */}
          <svg
            aria-hidden
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            className="hidden lg:absolute lg:inset-0 lg:block lg:h-full lg:w-full"
          >
            <ellipse
              cx="50"
              cy="50"
              rx={R}
              ry={R}
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              strokeDasharray="4 7"
              vectorEffect="non-scaling-stroke"
              className="animate-orbit-drift text-accent-lt/40"
            />
            <ellipse
              cx="50"
              cy="50"
              rx={R * 0.52}
              ry={R * 0.52}
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
              className="text-paper/12"
            />
            {points.map((p, i) => (
              <line
                key={nodes[i].reason}
                x1="50"
                y1="50"
                x2={p.x}
                y2={p.y}
                stroke="currentColor"
                strokeWidth="1"
                vectorEffect="non-scaling-stroke"
                className={i === active ? "text-accent-lt/80" : "text-paper/15"}
              />
            ))}
          </svg>

          {/* The orbit. Positioned nodes above lg, a wrapped chip row below it.
              The wrapper stretches over the whole plane so the nodes position
              against it, carries preserve-3d so their translateZ stays in the
              plane's 3D space, and is click-through so it does not sit on top
              of the core in the middle. `display: contents` would have been the
              tidier way to do that and is not used on purpose — it still drops
              the tablist role in enough browsers to matter. */}
          <div
            role="tablist"
            aria-label="Why choose us — five reasons from the pamphlet"
            onKeyDown={onKeyDown}
            className="flex flex-wrap gap-2 lg:pointer-events-none lg:absolute lg:inset-0 lg:block lg:[transform-style:preserve-3d]"
          >
            {nodes.map((n, i) => {
              const p = points[i];
              const on = i === active;
              return (
                <button
                  key={n.reason}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`why-spatial-tab-${i}`}
                  aria-selected={on}
                  aria-controls="why-spatial-panel"
                  tabIndex={on ? 0 : -1}
                  onClick={() => setActive(i)}
                  style={
                    {
                      ["--x" as string]: `${p.x}%`,
                      ["--y" as string]: `${p.y}%`,
                      ["--z" as string]: n.z,
                    } as React.CSSProperties
                  }
                  className={`min-h-[44px] cursor-pointer border px-4 py-2.5 text-left text-[0.8125rem] transition-colors duration-200 lg:pointer-events-auto lg:absolute lg:top-[var(--y)] lg:left-[var(--x)] lg:w-[15rem] lg:px-5 lg:py-4 lg:text-[0.9375rem] lg:[transform:translate(-50%,-50%)_translateZ(var(--z))] ${
                    on
                      ? "border-accent bg-accent text-paper"
                      : "border-paper/25 bg-plate-dp/85 text-paper hover:border-accent-lt hover:text-accent-lt lg:backdrop-blur-[2px]"
                  }`}
                >
                  <span
                    aria-hidden
                    className={`hidden lg:mb-2.5 lg:block lg:h-[3px] lg:w-7 ${
                      on ? "bg-paper" : "bg-accent-lt"
                    }`}
                  />
                  <span className="display-sm block lg:text-[1.0625rem]">
                    {n.reason}
                  </span>
                </button>
              );
            })}
          </div>

          {/* The core. Absolutely centred on the plane above lg; an ordinary
              block under the chip row below it.

              Reading order is claim → number → the sentence the number came
              out of → where to act on it. The number is the client's own, not
              ours, which is why it sits inside the evidence and not up in the
              section heading. */}
          <div
            role="tabpanel"
            id="why-spatial-panel"
            aria-labelledby={`why-spatial-tab-${active}`}
            tabIndex={0}
            className="mt-px border border-paper/20 bg-plate-dp p-7 lg:absolute lg:top-1/2 lg:left-1/2 lg:mt-0 lg:w-[23rem] lg:-translate-x-1/2 lg:-translate-y-1/2 lg:bg-plate-dp/92 lg:p-8 lg:shadow-[0_30px_70px_-30px_rgba(0,0,0,0.95)] lg:backdrop-blur-[3px]"
          >
            <div className="flex items-center gap-3">
              <span className="num text-sm text-accent-lt">
                {String(active + 1).padStart(2, "0")}
                <span className="text-paper/60">
                  {" "}
                  / {String(nodes.length).padStart(2, "0")}
                </span>
              </span>
              <span aria-hidden className="h-px flex-1 bg-paper/20" />
              <span className="eyebrow text-[0.5625rem] text-paper/60">
                Pamphlet
              </span>
            </div>

            <p className="display-sm mt-4 text-[clamp(1.25rem,2.2vw,1.6rem)] text-paper">
              {current.reason}
            </p>

            {current.metric && (
              <p className="mt-4 flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                <span className="display text-[clamp(1.6rem,2.8vw,2.1rem)] leading-none text-accent-lt">
                  {current.metric.value}
                </span>
                <span className="eyebrow text-paper/70">
                  {current.metric.label}
                </span>
              </p>
            )}

            <blockquote className="mt-5 border-l border-accent-lt/60 pl-4 text-[0.8125rem] leading-relaxed text-paper/80">
              &ldquo;{current.quote}&rdquo;
              <cite className="eyebrow mt-2.5 block text-[0.5625rem] text-paper/60 not-italic">
                {current.who}
                {current.attribution ? `, ${current.attribution}` : ""}
              </cite>
            </blockquote>

            {/* The one way out of this section. It fires where the visitor has
                just read the proof, and lands on the capability line that
                testimonial actually came from. */}
            <Link
              href={current.href}
              className="group mt-6 inline-flex min-h-[44px] cursor-pointer items-center gap-2 text-[0.8125rem] font-medium text-accent-lt transition-colors duration-200 hover:text-paper"
            >
              Price a {current.lineTitle} project
              <ArrowIcon
                aria-hidden
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </div>
      </div>

      {/* Branches, on the ground. A sibling of the stage, not a child of it —
          the cities stay flat and readable however the chart is turned, and
          the pointer over them no longer steers it. */}
      <div className="mt-px flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-paper/15 bg-plate-dp px-6 py-5 lg:mt-6 lg:px-0">
        <p className="eyebrow text-paper/60">Delivered from</p>
        <ul className="flex flex-wrap items-center gap-x-8 gap-y-3">
          {/* The landmark, not a generic bullet. These three marks were
              redrawn from the printed pamphlet so the site and the collateral
              share a visual language, and until now nothing imported them —
              the most place-specific asset on the site was dead code. */}
          {branches.map((b) => {
            const Landmark = landmarkIcons[b.landmark];
            return (
              <li key={b.city} className="flex items-center gap-2.5">
                <Landmark className="h-[18px] w-[18px] shrink-0 text-accent-lt" />
                <span className="text-sm text-paper">{b.city}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
