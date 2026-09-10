# Client review

```bash
npm --prefix rrit run dev
```

## ⚠️ Blocker before this goes live

**Every rupee figure in `src/content/capabilities.ts` is a placeholder.** None of
it came from Raghava Ram. It is set at plausible Indian SMB software rates so the
quote estimator could be built and demonstrated end to end.

While `PRICING_APPROVED` is `false`, the estimator shows a visible red
"Draft pricing" notice, so a half-finished version cannot quietly reach a
customer. Sit with the client, replace every `from` / `to` / `weeks`, then flip
the flag.

Everything else in that file — line names, capability names, what each one does —
is derived from `Pamphlet.png` and `src/content/site.ts`.

## Visual direction

"Field Manual" — an engineering document rather than a dark-mode template.

Three things drove the rewrite, all of them structural rather than chromatic:

- **Darkness had become the default.** Five dark sections, one light. Now the
  page is warm paper with three deliberate dark plates: the hero, the spatial
  map, and the contact band.
- **Gold was the primary fill** — pills, buttons, headline type. It is now
  hairlines, numerals and one button per screen, darkened to `#7C5F24` so it is
  legible as text on paper.
- **Rounded cards with faint borders on every surface.** Corner radius is 0
  throughout; surfaces separate with 1px rules.

### Palette — Navy & Vermilion

The accent is Ink & Vermilion's `#E34234` from the template studies artifact.
The dark end is **not** that study's near-black: it is a navy sampled out of the
hero video with `ffmpeg`, so the page and the skyline behind it are the same
colour story.

| sampled from the plate    |                       |
| ------------------------- | --------------------- |
| night sky                 | `#000616`             |
| night lake                | `#000f24`             |
| mid-transition sky / lake | `#212530` / `#1d2135` |

`ink #071a2f` is the lake at full night, opened up just enough to stay a colour
rather than a black. `plate-dp #0e2740` and `plate #17395c` step up from it.

The paper was a warm cream while the dark end was brown. Against navy it is
cooled to a blue-cast off-white (`#f4f6fa` / `#e6eaf2`) — there is no warm
colour left on the page. Reverting to cream is a two-line change and every
contrast below still passes either way.

The token _names_ went with it. `forest` and `brass` were colour names, and
leaving them holding a charcoal and a vermilion would have made the stylesheet
lie about itself, so they were renamed to roles:

| was         | now         | value                                           |
| ----------- | ----------- | ----------------------------------------------- |
| `forest-dp` | `plate-dp`  | `#0e2740` — the why/spatial plate               |
| `forest`    | `plate`     | `#17395c` — feature tile, dark buttons          |
| `brass`     | `accent`    | `#c0321f` — vermilion on paper, 5.2:1           |
| `brass-lt`  | `accent-lt` | `#f07a66` — vermilion on the navy plates, 5.6:1 |
| `clay`      | `hot`       | `#e34234` — the study's accent exactly          |
| `moss`      | —           | dropped, had no usages                          |

The accent is split in two because one vermilion cannot be text-legible on both
the paper and the navy plates. `hot` is the artifact's `#E34234` untouched, but
at 3.8:1 on paper it is a fill and graphic colour only — never small text. The
filled CTAs use `accent` with paper type so they read as vermilion rather than
salmon, and still clear AA.

Type: Bricolage Grotesque at `wdth 90` for display, Instrument Sans for body,
IBM Plex Mono for every label, count and phone number.

## The three interactive sections

**Interactive capability map / quote estimator** (`CapabilityMap.tsx`) — replaces
the six-card services grid. Six service lines open into their capabilities;
ticking them builds a scope, and the panel turns it into an indicative one-time
range, a monthly range, an elapsed timeline, and a WhatsApp deep link with the
whole scope already written out. The visitor lands in the client's inbox having
said what they want, rather than "hi, need website, price?".

Ranges are wide and labelled as ranges on purpose: a firm that quotes one exact
number off a web form is guessing or padding.

**Spatial map** (`TechnologyMap.tsx`, on `/`) — the five pamphlet reasons laid
out in CSS 3D, each floating at its own `translateZ` above a web of connector
lines, the plane tilting toward the pointer. Each reason carries a verbatim
fragment of a real testimonial that corroborates it, so the claim and its
evidence are the same object. Below `lg`, under `prefers-reduced-motion`, or on
a coarse pointer, the transform never applies and the nodes stack as a ruled
list — same text, same reading order.

**3D technology chart** (`SpatialWhyUs.tsx`, on `/preview`) — the same five
pamphlet reasons in the orbital form taken from the artifact's _Spatial / 3D
Technology Universe_ study: one core, everything orbiting it on a starfield,
every node wired back to the centre.

Three things differ from the study. The orbit carries the pamphlet's reasons
rather than a service list. Each node is a real control, not a decorative
label — it is a `tablist`, so selecting a node writes its reason and its
corroborating quote into the core, and arrow keys walk the orbit. And the ring
is an SVG ellipse in a non-uniform `viewBox` rather than a `border-radius: 50%`
box, so it passes exactly through the nodes at any aspect ratio.

Depth is real: at rest the nodes measure 245–261 px against a 240 px box,
because each one is scaled by its own `translateZ` against the 1500 px
perspective. Below `lg` the tablist reflows to a wrapped chip row with the panel
beneath it and no transform is applied at all.

**Client results** (`Sections.tsx`) — no longer a bento. Tile size was encoding
editorial weight, which in practice meant five quotes set at four different
sizes across a 4×4 grid with the reading order running in an L: good to look
at, genuinely hard to read.

It is now a document. One quote per row on a ruled grid, all at the same size,
attributions in their own right-hand column so the names can be skimmed without
reading the quotes.

Two changes to what carries the navy:

- It was the top-left testimonial, which made the loudest object in the section
  one client's quote, for no better reason than that it was the longest. The
  numbers carry it now — they are the only quantified claims here.
- The numbers and the fifth testimonial swapped places. The numbers used to sit
  top-right, interrupting the quotes before any had been read; they now close
  the section as a summary band. Anitha's quote takes the slot they vacated,
  second in the list.

The band is data-driven — every testimonial carrying a `metric` appears, which
is four of the five, so adding a number to `testimonials.json` adds a tile.

## Routes

| Route      | Body                                                                            |
| ---------- | ------------------------------------------------------------------------------- |
| `/`        | Services → Hostel spotlight → Why us (`TechnologyMap`) → Testimonials → Contact |
| `/preview` | Skyline → Testimonials → Why us (`SpatialWhyUs`) → Estimator → Contact          |

`/preview` is the composition that was asked for, in that order. Both routes
share the same looping video hero.

The **Stills / Video** switch, the `/alt` route and `StillsHero.tsx` are
deleted. The video is the hero, not one of two options under review.

## The hero video

A single `<video autoplay muted loop playsinline>`, `object-fit: cover`,
absolutely filling the hero section. It is rendered **on the server** with both
`<source>` children already in the markup, so the element exists before
hydration, without JS, and under `prefers-reduced-motion`. There is no
still-image crossfade and no CSS animation of stills anywhere — the only image
involved is the video's own `poster` first-paint frame.

Two behaviours sit on top, neither of which can replace the video: offscreen →
paused (battery), and reduced-motion → paused on its first frame, element and
cover fit intact.

Source is `clean_skyline_source/skyline_clean_loop.mp4` — dusk → night → dusk,
seamless — cropped 1904×1040 → 1904×930 (top-anchored; the `Grok` watermark sat
in the bottom 110 px) and re-encoded.

Two things were wrong with it. The second one was the real complaint.

**Frame rate.** The source renders the transition in 56 frames at 10 fps, which
steps visibly. Resampled to 24 fps with `minterpolate=mi_mode=blend` — blend
rather than motion-compensated, because this is a global lighting change, so
blending adjacent frames smooths it with no risk of warping the skyline
geometry. A mid-transition frame was pulled and checked for ghosting.

**Pacing.** Measured per frame, the source sky runs

```
frame  0   #636163   dusk
frame 24   #000617   full night
frame 48   #636163   dusk again
```

— a complete day/night cycle every **5.6 seconds**. At that speed it does not
read as an animation at all, it reads as strobing between two stills, and no
amount of frame interpolation fixes that. Slowed 4× with `setpts=4*PTS` to
21.6 s so the light falls at an ambient pace.

|              | original | now     |
| ------------ | -------- | ------- |
| cycle length | 5.6 s    | 21.6 s  |
| frame rate   | 10 fps   | 24 fps  |
| desktop webm | 1218 KB  | 2618 KB |
| desktop mp4  | 2466 KB  | 5624 KB |
| mobile webm  | 204 KB   | 573 KB  |

The payload is a deliberate call — quality over weight, chosen explicitly. One
figure to keep an eye on: the **5.6 MB mp4**. webm covers Chrome, Firefox, Edge
and Safari 16+, so the mp4 only reaches older iOS — but it reaches them at
5.6 MB. Raising its CRF is a one-line change if that ever matters.

Filenames did not change and browsers cache video hard, so a **hard reload** is
needed to see a re-encode.

## Verified

- Production build clean from a cold `.next`, `tsc --noEmit` clean, both routes
  prerendered static
- `/preview` section order is hero → `work` → `why` → `services` → `contact`
- Estimator end to end: 2 items → ₹1,05,000–₹2,95,000, 10–12 weeks, and the
  WhatsApp deep link carries the whole scope; draft-pricing notice shows
- Spatial chart: click and `ArrowRight`/`Home` all move selection, focus and the
  roving `tabindex` together; the panel and the highlighted spoke follow
- Pointer tilt engages on `pointermove` and returns to rest on `pointerleave`
- Spatial chart degrades at 375: `transform: none`, `position: static`, SVG and
  starfield `display: none`, every tab 44 px tall
- Hero serves `loop-1904.webm` at desktop widths and `loop-960.webm` at 375,
  and reports `duration 21.625` — i.e. the slowed cut, not a cached old one
- Client results: quote order is Lakshmi → **Anitha** → Ravi → Suresh → Priya;
  the navy `#17395c` is on the numbers band and the first quote has no
  background; four metric tiles render; no bento grid left in the DOM
- Hero `<video>` is present in the raw server HTML with both sources, and has
  `autoplay muted loop playsinline` + `object-fit: cover`; it measures exactly
  the section box on both axes. Zero `dusk-`/`night-` references in the HTML
- Navy sampled from the video frames, not picked by eye; every palette role
  recomputed for contrast after the swap
- No horizontal overflow at 375 / 1400 / 1440
- No stale `forest`/`brass`/`clay`/`moss` class names left in the rendered DOM
- Contrast computed for every palette role — table at the top of `globals.css`

## Not verified

- **Video playback motion.** The preview pane reports `document.hidden === true`
  and the browser will not run playback in it, so the 24 fps re-encode was
  checked frame-by-frame with `ffmpeg` rather than watched. Worth 10 seconds in
  a real browser.
- **`prefers-reduced-motion` at runtime.** Implemented in the hero, in both
  spatial components and in `globals.css`, but the preview browser cannot
  emulate the media query.
- **Full-page screenshots.** The pane's compositor returns stale or partial
  frames on scrolled content; sections were captured in isolation instead.

## Known issues

- `eslint` is broken by the Next 15 → 16 upgrade (eslintrc compat shim vs the
  flat config `eslint-config-next@16` ships). `tsc --noEmit` is clean and the
  build passes. Worth fixing before this becomes a real codebase.
- ~~`public/skyline` holds every variant.~~ Pruned. With `StillsHero` gone the
  `dusk-*` / `night-*` stills and the `oneway-*` cuts were all unreferenced;
  `public/skyline` and `web_assets/skyline` now hold only the five files the
  site actually requests — `loop-{960,1904}.{webm,mp4}` and `poster.jpg` —
  9.9 MB → 5.4 MB each. Verified afterwards: cold build clean, and a page load
  requests exactly `poster.jpg` and `loop-1904.webm`, no 404s.

  Everything removed is regenerable from `clean_skyline_source/`, which is
  untouched: the stills from `skyline_dusk.jpg` / `skyline_night.jpg`, the
  `oneway-*` cuts from `skyline_clean_animation.mp4`.

## Still to come

- Service detail pages, About, Contact, Telugu locale — planned, none built.
- Hostel Management System screenshots (reserved plate is in place).
- Testimonial roles/companies — see `_todo` in `src/content/testimonials.json`.
- Confirm the 180+, 60% and "3 months" figures are accurate and quotable.
