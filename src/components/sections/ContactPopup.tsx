"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Check, Loader2, X } from "lucide-react";
import { company } from "@/lib/site";

type Status = "idle" | "submitting" | "success" | "error";

const SEEN_KEY = "ltd_contact_popup_seen";
const DELAY_MS = 15000; // show after 15s if no exit-intent first

function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M17.5 14.4c-.3-.2-1.7-.8-1.9-.9-.3-.1-.4-.1-.6.1-.2.3-.7.9-.8 1-.2.2-.3.2-.6.1-1.5-.8-2.5-1.4-3.5-3.1-.3-.5.3-.4.8-1.4.1-.2 0-.4 0-.5 0-.1-.6-1.5-.8-2-.2-.5-.4-.5-.6-.5h-.5c-.2 0-.5.1-.7.4-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2 3.1 4.9 4.3 1.8.8 2.5.8 3.4.7.5-.1 1.7-.7 1.9-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3zM12 2a10 10 0 0 0-8.6 15l-1.3 4.7 4.8-1.3A10 10 0 1 0 12 2zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-2.9.8.8-2.8-.2-.3A8.2 8.2 0 1 1 12 20.2z" />
    </svg>
  );
}

export function ContactPopup() {
  const reduce = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem(SEEN_KEY)) return;

    let done = false;
    const fire = () => {
      if (done) return;
      done = true;
      setOpen(true);
      cleanup();
    };

    const timer = setTimeout(fire, DELAY_MS);
    // exit-intent: pointer leaves toward the top (closing tab / address bar)
    const onLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) fire();
    };
    document.addEventListener("mouseout", onLeave);

    function cleanup() {
      clearTimeout(timer);
      document.removeEventListener("mouseout", onLeave);
    }
    return cleanup;
  }, []);

  function dismiss() {
    setOpen(false);
    try {
      localStorage.setItem(SEEN_KEY, "1");
    } catch {
      // ignore
    }
  }

  // close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && dismiss();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);
    const form = e.currentTarget;
    const payload = {
      ...Object.fromEntries(new FormData(form).entries()),
      service: "Homepage popup",
    };
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error ?? "Something went wrong. Please try again.");
      }
      setStatus("success");
      try {
        localStorage.setItem(SEEN_KEY, "1");
      } catch {
        // ignore
      }
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center p-5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {/* backdrop */}
          <button
            type="button"
            aria-label="Close"
            onClick={dismiss}
            className="absolute inset-0 bg-bg/80 backdrop-blur-sm"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Start a project"
            className="relative w-full max-w-md overflow-hidden rounded-[18px] border border-border bg-bg-elevated p-7 shadow-2xl"
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 16, scale: 0.98 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          >
            <button
              type="button"
              onClick={dismiss}
              aria-label="Close"
              className="absolute right-4 top-4 flex size-8 items-center justify-center rounded-full border border-border text-fg-muted transition-colors hover:text-fg"
            >
              <X className="size-4" />
            </button>

            {status === "success" ? (
              <div className="flex flex-col items-start gap-4 py-2">
                <span className="flex size-11 items-center justify-center rounded-full bg-accent-solid text-bg">
                  <Check className="size-5 text-bg" />
                </span>
                <h2 className="font-display text-2xl font-bold tracking-tight">
                  Got it. We&apos;ll be in touch.
                </h2>
                <p className="text-sm leading-relaxed text-fg-muted">
                  Thanks for reaching out. We reply within two business days.
                  {company.whatsappHref
                    ? " For anything urgent, message us on WhatsApp."
                    : ""}
                </p>
                {company.whatsappHref && (
                  <a
                    href={company.whatsappHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-medium text-white transition-transform active:scale-[0.98]"
                  >
                    <WhatsAppGlyph className="size-4" />
                    Chat on WhatsApp
                  </a>
                )}
              </div>
            ) : (
              <>
                <p className="eyebrow mb-3">Let&apos;s talk</p>
                <h2 className="font-display text-2xl font-bold tracking-tight">
                  Have a project in mind?
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                  Logos, websites, and AI agents under one roof. Tell us what you
                  need, or message us directly.
                </p>

                <form onSubmit={onSubmit} className="mt-5 space-y-3">
                  <input
                    name="name"
                    required
                    autoComplete="name"
                    placeholder="Your name"
                    className={inputCls}
                  />
                  <input
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="you@company.com"
                    className={inputCls}
                  />
                  <textarea
                    name="message"
                    required
                    rows={3}
                    placeholder="What are you building?"
                    className={`${inputCls} resize-none`}
                  />

                  {status === "error" && error && (
                    <p role="alert" className="text-sm text-accent">
                      {error}
                    </p>
                  )}

                  <div className="flex flex-col gap-2.5 pt-1 sm:flex-row">
                    <button
                      type="submit"
                      disabled={status === "submitting"}
                      className="group inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-accent-solid px-5 py-3 text-sm font-medium text-bg transition-transform active:scale-[0.98] disabled:opacity-70"
                    >
                      {status === "submitting" ? (
                        <>
                          Sending
                          <Loader2 className="size-4 animate-spin" />
                        </>
                      ) : (
                        <>
                          Send enquiry
                          <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </>
                      )}
                    </button>
                    {company.whatsappHref && (
                      <a
                        href={company.whatsappHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-medium text-white transition-transform active:scale-[0.98]"
                      >
                        <WhatsAppGlyph className="size-4" />
                        WhatsApp
                      </a>
                    )}
                  </div>
                </form>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

const inputCls =
  "w-full rounded-[12px] border border-border bg-surface/60 px-4 py-3 text-sm text-fg placeholder:text-fg-dim outline-none transition-colors focus:border-accent";
