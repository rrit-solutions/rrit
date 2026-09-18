"use client";

import { useEffect } from "react";

/**
 * The three inline <script> blocks from the standalone page, unchanged in
 * behaviour — scroll reveals, the hovered service card, the gold cursor glow,
 * the staggered transition delays, and the services slider arrows.
 *
 * They read and mutate the DOM, so they run in an effect after mount rather
 * than during render, and every listener/observer is torn down on unmount so
 * client navigation does not stack duplicates.
 */
export function SiteScripts() {
  useEffect(() => {
    // --- reveal on scroll -------------------------------------------------
    const io = new IntersectionObserver(
      (es) =>
        es.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("show");
        }),
      { threshold: 0.12 },
    );
    document.querySelectorAll(".reveal").forEach((e) => io.observe(e));

    // --- hovered service card becomes the active one ----------------------
    const cards = Array.from(document.querySelectorAll(".card"));
    const onCardEnter = (c: Element) => () => {
      cards.forEach((x) => x.classList.remove("active"));
      c.classList.add("active");
    };
    const cardHandlers = cards.map((c) => {
      const handler = onCardEnter(c);
      c.addEventListener("mouseenter", handler);
      return { c, handler };
    });

    // --- cursor glow ------------------------------------------------------
    let raf = 0,
      x = -300,
      y = -300;
    const onPointerMove = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!raf)
        raf = requestAnimationFrame(() => {
          document.documentElement.style.setProperty("--mx", x + "px");
          document.documentElement.style.setProperty("--my", y + "px");
          raf = 0;
        });
    };
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    // --- staggered reveal delays -----------------------------------------
    document
      .querySelectorAll<HTMLElement>(
        ".project-card, .solution, .metric, .reason, .quote, .step",
      )
      .forEach((el, i) => {
        el.style.transitionDelay = (i % 6) * 45 + "ms";
      });

    // --- services slider --------------------------------------------------
    const slider = document.getElementById("servicesSlider");
    const prev = document.querySelector(".service-prev");
    const next = document.querySelector(".service-next");
    const move = (dir: number) => {
      if (!slider) return;
      const card = slider.querySelector(".card");
      const gap = parseFloat(getComputedStyle(slider).gap) || 15;
      const step = (card ? card.getBoundingClientRect().width : 250) + gap;
      slider.scrollBy({ left: dir * step, behavior: "smooth" });
    };
    const onPrev = () => move(-1);
    const onNext = () => move(1);
    if (slider && prev && next) {
      prev.addEventListener("click", onPrev);
      next.addEventListener("click", onNext);
    }

    return () => {
      io.disconnect();
      cardHandlers.forEach(({ c, handler }) =>
        c.removeEventListener("mouseenter", handler),
      );
      window.removeEventListener("pointermove", onPointerMove);
      if (raf) cancelAnimationFrame(raf);
      prev?.removeEventListener("click", onPrev);
      next?.removeEventListener("click", onNext);
    };
  }, []);

  return null;
}
