"use client";

import { ReactLenis } from "lenis/react";
import { useReducedMotion } from "motion/react";

/**
 * App-wide smooth scroll via Lenis. Disabled entirely under
 * prefers-reduced-motion so the page falls back to native scroll.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduce = useReducedMotion();

  if (reduce) return <>{children}</>;

  return (
    <ReactLenis
      root
      options={{ lerp: 0.1, smoothWheel: true, wheelMultiplier: 1, touchMultiplier: 1.6 }}
    >
      {children}
    </ReactLenis>
  );
}
