"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "motion/react";
import { cn } from "@/lib/utils";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "outline";
  className?: string;
};

/**
 * Button that pulls toward the cursor. Motion values only — never useState —
 * so it stays smooth and never re-renders the tree. Static under reduced motion.
 */
export function MagneticButton({
  href,
  children,
  variant = "solid",
  className,
}: Props) {
  const ref = useRef<HTMLAnchorElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  function onMove(e: React.MouseEvent<HTMLAnchorElement>) {
    if (reduce || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const mx = e.clientX - (r.left + r.width / 2);
    const my = e.clientY - (r.top + r.height / 2);
    x.set(mx * 0.35);
    y.set(my * 0.35);
  }
  function onLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div style={{ x: sx, y: sy }} className="inline-block">
      <Link
        ref={ref}
        href={href}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className={cn(
          "group inline-flex items-center gap-2 rounded-full px-7 py-4 text-base font-medium transition-colors active:scale-[0.98]",
          variant === "solid"
            ? "bg-accent-solid text-bg hover:bg-accent"
            : "border border-border-strong text-fg hover:bg-surface",
          className,
        )}
      >
        {children}
      </Link>
    </motion.div>
  );
}
