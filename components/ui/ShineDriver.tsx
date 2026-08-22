"use client";

import { useEffect } from "react";

/**
 * Drives the metallic frames from one place.
 *
 * A single passive scroll listener writes an angle onto the document element;
 * every `.metal-frame` reads it, so the highlight sweeps around the borders
 * while the page moves and holds still the moment it stops. One listener and
 * one style write per frame, no per-card work.
 */
export function ShineDriver() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const write = () => {
      frame = 0;
      document.documentElement.style.setProperty(
        "--shine",
        String(Math.round(window.scrollY * 0.28) % 360)
      );
    };
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(write);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
