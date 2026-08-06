"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

type Burst = { id: number; x: number; y: number };

const NODES = 7;

/**
 * Site-wide click signature: a gold ring + radiating circuit nodes fire from
 * the click point. Fixed, pointer-events-none overlay so it never blocks UI.
 * Disabled under reduced motion.
 */
export function ClickBurst() {
  const [bursts, setBursts] = useState<Burst[]>([]);
  const counter = useRef(0);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    function onClick(e: MouseEvent) {
      // ignore clicks on form fields so typing/selecting stays clean
      const t = e.target as HTMLElement;
      if (t.closest("input, textarea, select")) return;
      const id = counter.current++;
      setBursts((b) => [...b, { id, x: e.clientX, y: e.clientY }]);
      window.setTimeout(() => {
        setBursts((b) => b.filter((x) => x.id !== id));
      }, 900);
    }
    window.addEventListener("click", onClick);
    return () => window.removeEventListener("click", onClick);
  }, [reduce]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[70]">
      <AnimatePresence>
        {bursts.map((burst) => (
          <div
            key={burst.id}
            className="absolute"
            style={{ left: burst.x, top: burst.y }}
          >
            {/* expanding ring */}
            <motion.span
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent"
              initial={{ width: 0, height: 0, opacity: 0.8 }}
              animate={{ width: 220, height: 220, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            />
            {/* core flash */}
            <motion.span
              className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent"
              initial={{ width: 14, height: 14, opacity: 0.9 }}
              animate={{ width: 0, height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
            {/* radiating nodes */}
            {Array.from({ length: NODES }).map((_, i) => {
              const angle = (i / NODES) * Math.PI * 2;
              const dist = 60 + (i % 3) * 22;
              return (
                <motion.span
                  key={i}
                  className="absolute size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent"
                  initial={{ x: 0, y: 0, opacity: 1 }}
                  animate={{
                    x: Math.cos(angle) * dist,
                    y: Math.sin(angle) * dist,
                    opacity: 0,
                  }}
                  transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                />
              );
            })}
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
}
