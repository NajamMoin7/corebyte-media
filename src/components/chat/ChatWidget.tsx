"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUp, MessageSquare, Sparkles, X } from "lucide-react";
import { getSessionId } from "@/lib/session";

type Msg = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = [
  "What do you actually do?",
  "Can you build a WhatsApp chatbot?",
  "I need a brand and a website.",
];

const GREETING: Msg = {
  role: "assistant",
  content:
    "Hey, I'm the Core Byte agent. Ask about our services, process, or work, or tell me what you're building.",
};

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([GREETING]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const reduce = useReducedMotion();
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages, open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  async function send(text: string) {
    const content = text.trim();
    if (!content || busy) return;

    const next = [...messages, { role: "user" as const, content }];
    setMessages([...next, { role: "assistant", content: "" }]);
    setInput("");
    setBusy(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next, sessionId: getSessionId() }),
      });
      if (!res.body) throw new Error("no stream");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages((m) => {
          const copy = [...m];
          copy[copy.length - 1] = { role: "assistant", content: acc };
          return copy;
        });
      }
    } catch {
      setMessages((m) => {
        const copy = [...m];
        copy[copy.length - 1] = {
          role: "assistant",
          content: "Connection dropped. Please try again.",
        };
        return copy;
      });
    } finally {
      setBusy(false);
      inputRef.current?.focus();
    }
  }

  return (
    <>
      {/* launcher */}
      <motion.button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close chat" : "Chat with the Core Byte agent"}
        initial={reduce ? false : { scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.6, type: "spring", stiffness: 320, damping: 22 }}
        className="fixed bottom-5 right-5 z-50 flex size-14 items-center justify-center rounded-full bg-accent-solid text-bg shadow-[0_10px_40px_-8px_rgba(232,194,106,0.6)] md:bottom-7 md:right-7"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={open ? "x" : "chat"}
            initial={{ rotate: -45, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 45, opacity: 0 }}
            transition={{ duration: 0.15 }}
          >
            {open ? (
              <X className="size-6" />
            ) : (
              <MessageSquare className="size-6" />
            )}
          </motion.span>
        </AnimatePresence>
      </motion.button>

      {/* panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 right-5 z-50 flex h-[min(32rem,70vh)] w-[min(24rem,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-[20px] border border-border bg-bg-elevated/95 backdrop-blur-2xl md:bottom-28 md:right-7"
          >
            <header className="flex items-center gap-2.5 border-b border-border px-5 py-4">
              <span className="flex size-8 items-center justify-center rounded-full bg-accent-solid text-bg">
                <Sparkles className="size-4 text-bg" />
              </span>
              <div>
                <p className="text-sm font-medium leading-none">Core Byte Agent</p>
                <span className="mt-1 flex items-center gap-1.5 font-mono text-[11px] text-fg-dim">
                  <span className="size-1.5 rounded-full bg-emerald-400" />
                  online
                </span>
              </div>
            </header>

            <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-5 py-5">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={m.role === "user" ? "flex justify-end" : "flex justify-start"}
                >
                  <p
                    className={
                      m.role === "user"
                        ? "max-w-[82%] rounded-2xl rounded-br-sm bg-accent-solid px-3.5 py-2.5 text-sm text-bg"
                        : "max-w-[88%] rounded-2xl rounded-bl-sm bg-surface px-3.5 py-2.5 text-sm leading-relaxed text-fg-muted"
                    }
                  >
                    {m.content || (
                      <span className="inline-flex gap-1">
                        <Dot /> <Dot d={0.15} /> <Dot d={0.3} />
                      </span>
                    )}
                  </p>
                </div>
              ))}

              {messages.length === 1 && (
                <div className="flex flex-wrap gap-2 pt-1">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => send(s)}
                      className="rounded-full border border-border px-3 py-1.5 text-xs text-fg-muted transition-colors hover:border-border-strong hover:text-fg"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2 border-t border-border p-3"
            >
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about our work…"
                className="flex-1 rounded-full bg-surface px-4 py-2.5 text-sm text-fg outline-none placeholder:text-fg-dim focus:ring-1 focus:ring-accent"
              />
              <button
                type="submit"
                disabled={busy || !input.trim()}
                aria-label="Send"
                className="flex size-9 shrink-0 items-center justify-center rounded-full bg-accent-solid text-bg transition-opacity disabled:opacity-40"
              >
                <ArrowUp className="size-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Dot({ d = 0 }: { d?: number }) {
  return (
    <motion.span
      className="inline-block size-1.5 rounded-full bg-fg-dim"
      animate={{ opacity: [0.3, 1, 0.3] }}
      transition={{ duration: 1, repeat: Infinity, delay: d }}
    />
  );
}
