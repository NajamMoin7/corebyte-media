"use client";

import { useState } from "react";
import { ArrowUpRight, Check, ChevronDown, Loader2 } from "lucide-react";
import { services } from "@/lib/site";

type Status = "idle" | "submitting" | "success" | "error";

const budgets = ["< $5k", "$5k - $15k", "$15k - $50k", "$50k+", "Not sure yet"];

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setError(null);
    const form = e.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());

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
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-start gap-5 rounded-[16px] border border-border bg-surface/50 p-10">
        <span className="flex size-12 items-center justify-center rounded-full bg-accent-solid text-bg">
          <Check className="size-6 text-bg" />
        </span>
        <h3 className="font-display text-3xl font-semibold tracking-tight">
          Message received.
        </h3>
        <p className="max-w-sm text-fg-muted">
          Thanks for reaching out. We read every enquiry and reply within two
          business days. In the meantime, the agent in the corner can answer
          quick questions.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="text-sm text-accent transition-opacity hover:opacity-80"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field label="Name" name="name" required>
          <input
            id="name"
            name="name"
            required
            autoComplete="name"
            className={inputCls}
            placeholder="Jordan Reyes"
          />
        </Field>
        <Field label="Email" name="email" required>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={inputCls}
            placeholder="you@company.com"
          />
        </Field>
      </div>

      <Field label="Company" name="company" hint="Optional">
        <input
          id="company"
          name="company"
          autoComplete="organization"
          className={inputCls}
          placeholder="Company or project name"
        />
      </Field>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <Field label="What do you need?" name="service">
          <div className="relative">
            <select id="service" name="service" className={selectCls} defaultValue="">
              <option value="" disabled>
                Pick a service
              </option>
              {services.map((s) => (
                <option key={s.slug} value={s.title}>
                  {s.title}
                </option>
              ))}
              <option value="Not sure">Not sure yet</option>
            </select>
            <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-fg-dim" />
          </div>
        </Field>
        <Field label="Budget" name="budget">
          <div className="relative">
            <select id="budget" name="budget" className={selectCls} defaultValue="">
              <option value="" disabled>
                Rough range
              </option>
              {budgets.map((b) => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-fg-dim" />
          </div>
        </Field>
      </div>

      <Field label="Project details" name="message" required>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          className={`${inputCls} resize-none`}
          placeholder="Tell us what you're building, your timeline, and what success looks like."
        />
      </Field>

      {status === "error" && error && (
        <p role="alert" className="text-sm text-accent">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="group inline-flex items-center gap-2 rounded-full bg-accent-solid px-7 py-4 text-base font-medium text-bg transition-transform active:scale-[0.98] disabled:opacity-70"
      >
        {status === "submitting" ? (
          <>
            Sending
            <Loader2 className="size-5 animate-spin" />
          </>
        ) : (
          <>
            Send enquiry
            <ArrowUpRight className="size-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </>
        )}
      </button>
    </form>
  );
}

const inputCls =
  "w-full rounded-[12px] border border-border bg-surface/60 px-4 py-3 text-fg placeholder:text-fg-dim outline-none transition-colors focus:border-accent";

// Selects: dark color-scheme + styled options + custom chevron so the native
// dropdown matches the theme instead of the grey OS default.
const selectCls =
  inputCls +
  " w-full cursor-pointer appearance-none pr-10 [color-scheme:dark] [&>option]:bg-bg-elevated [&>option]:text-fg";

function Field({
  label,
  name,
  hint,
  required,
  children,
}: {
  label: string;
  name: string;
  hint?: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="flex items-center gap-2 text-sm text-fg">
        {label}
        {required && <span className="text-accent">*</span>}
        {hint && <span className="text-fg-dim">· {hint}</span>}
      </label>
      {children}
    </div>
  );
}
