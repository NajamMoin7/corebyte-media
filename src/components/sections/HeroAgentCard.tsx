"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

// Scripted demo loop of the kind of agent we build. Not wired to the API,
// it just performs a short conversation, then resets and runs again.
type Line = { role: "agent" | "user"; text: string };

const script: Line[] = [
  { role: "agent", text: "Hey. What are you building?" },
  { role: "user", text: "An online store for my brand." },
  { role: "agent", text: "Nice. We design the brand, build the site, and add an agent to run support." },
  { role: "user", text: "How fast can you ship?" },
  { role: "agent", text: "A landing page in days, a full store in a few weeks. Want a quote?" },
];

const ease = [0.16, 1, 0.3, 1] as const;

export function HeroAgentCard() {
  const reduce = useReducedMotion();
  const [count, setCount] = useState(reduce ? script.length : 0);
  const [typing, setTyping] = useState(false);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    if (reduce) return;
    const ts = timers.current;

    function schedule(i: number) {
      if (i >= script.length) {
        // hold the finished thread, then reset and replay
        ts.push(
          setTimeout(() => {
            setCount(0);
            setTyping(false);
            schedule(0);
          }, 3200),
        );
        return;
      }
      const line = script[i];
      const think = line.role === "agent" ? 900 : 600;
      if (line.role === "agent") {
        ts.push(
          setTimeout(() => {
            setTyping(true);
            ts.push(
              setTimeout(() => {
                setTyping(false);
                setCount(i + 1);
                schedule(i + 1);
              }, 800),
            );
          }, think),
        );
      } else {
        ts.push(
          setTimeout(() => {
            setCount(i + 1);
            schedule(i + 1);
          }, think),
        );
      }
    }

    schedule(0);
    return () => {
      ts.forEach(clearTimeout);
      timers.current = [];
    };
  }, [reduce]);

  const visible = script.slice(0, count);

  return (
    <div className="relative w-full max-w-md">
      {/* glow */}
      <div
        className="absolute -inset-6 -z-10 rounded-[32px] blur-3xl"
        style={{ background: "radial-gradient(circle at 70% 20%, rgba(232,194,106,0.25), transparent 70%)" }}
      />
      <div className="overflow-hidden rounded-[20px] border border-border-strong bg-bg-elevated/90 shadow-2xl backdrop-blur">
        {/* header */}
        <div className="flex items-center gap-3 border-b border-border px-5 py-4">
          <span className="relative flex size-2.5">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
            <span className="relative inline-flex size-2.5 rounded-full bg-accent" />
          </span>
          <span className="font-display text-sm font-bold tracking-tight">
            Core Byte Agent
          </span>
          <span className="ml-auto font-mono text-[10px] uppercase tracking-wider text-fg-dim">
            Online
          </span>
        </div>

        {/* thread */}
        <div className="flex min-h-[19rem] flex-col gap-3 p-5">
          <AnimatePresence mode="popLayout">
            {visible.map((line, i) => (
              <motion.div
                key={`${count}-${i}`}
                layout
                initial={{ opacity: 0, y: 12, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.4, ease }}
                className={
                  line.role === "user" ? "flex justify-end" : "flex justify-start"
                }
              >
                <span
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    line.role === "user"
                      ? "rounded-br-md bg-accent-solid text-bg"
                      : "rounded-bl-md border border-border bg-surface text-fg"
                  }`}
                >
                  {line.text}
                </span>
              </motion.div>
            ))}
          </AnimatePresence>

          {typing && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <span className="flex items-center gap-1 rounded-2xl rounded-bl-md border border-border bg-surface px-4 py-3">
                {[0, 1, 2].map((d) => (
                  <motion.span
                    key={d}
                    className="size-1.5 rounded-full bg-fg-dim"
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1, repeat: Infinity, delay: d * 0.2 }}
                  />
                ))}
              </span>
            </motion.div>
          )}
        </div>

        {/* faux input */}
        <div className="flex items-center gap-2 border-t border-border px-4 py-3">
          <span className="flex-1 truncate rounded-full border border-border bg-surface/60 px-4 py-2 text-xs text-fg-dim">
            Ask about a project...
          </span>
          <span className="flex size-8 items-center justify-center rounded-full bg-accent-solid text-bg">
            <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}
