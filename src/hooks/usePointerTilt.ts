import { useEffect, useRef } from "react";

/**
 * Writes pointer position to CSS variables on the element so layers inside it
 * can tilt and parallax in 3D. It does nothing for touch-only devices or when
 * the person prefers reduced motion.
 *
 *   --rx / --ry : tilt in degrees
 *   --px / --py : pointer offset from the centre, -0.5 to 0.5
 */
export function usePointerTilt<T extends HTMLElement>(maxDeg = 5) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const hover = window.matchMedia("(hover: hover)");
    if (reduce.matches || !hover.matches) return;

    let frame = 0;

    const apply = (px: number, py: number) => {
      el.style.setProperty("--px", px.toFixed(3));
      el.style.setProperty("--py", py.toFixed(3));
      el.style.setProperty("--ry", `${(px * maxDeg * 2).toFixed(2)}deg`);
      el.style.setProperty("--rx", `${(-py * maxDeg * 2).toFixed(2)}deg`);
    };

    const onMove = (event: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => apply(px, py));
    };

    const onLeave = () => {
      cancelAnimationFrame(frame);
      apply(0, 0);
    };

    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, [maxDeg]);

  return ref;
}
