"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Loader2, LogOut, RefreshCw, Lock } from "lucide-react";

type Visit = {
  sessionId: string;
  path: string;
  ref: string;
  ip: string;
  ua: string;
  city?: string;
  region?: string;
  country?: string;
  bot?: boolean;
  botReason?: string;
  createdAt: string;
};
type Message = {
  sessionId: string;
  role: "user" | "assistant";
  text: string;
  createdAt: string;
};
type Session = { sessionId: string; messages: Message[]; last: string };
type Lead = {
  sessionId: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  summary: string;
  createdAt: string;
};
type EmailLead = {
  identity: {
    company: string;
    email: string;
    phone: string;
    campaign: string;
    niche: string;
  };
  behavior: {
    paths: string[];
    firstSeen: string | null;
    lastSeen: string | null;
    visitCount: number;
  };
  hot: boolean;
  outreach: { sentAt: string | null; replied: boolean };
};
type Data = {
  dbConfigured: boolean;
  visits: Visit[];
  sessions: Session[];
  leads: Lead[];
  emailLeads?: EmailLead[];
  stats: {
    totalVisits?: number;
    uniqueVisitors?: number;
    chatSessions?: number;
    leads?: number;
  };
};

const fmt = (s: string) => {
  try {
    return new Date(s).toLocaleString();
  } catch {
    return s;
  }
};

// ISO-2 country code -> emoji flag (regional indicator letters)
const flag = (cc?: string) => {
  if (!cc || cc.length !== 2) return "";
  const A = 0x1f1e6;
  const up = cc.toUpperCase();
  return String.fromCodePoint(
    A + (up.charCodeAt(0) - 65),
    A + (up.charCodeAt(1) - 65),
  );
};

// Human-readable location from a visit's geo fields.
const place = (v: Visit) => {
  const parts = [v.city, v.region, v.country].filter(Boolean);
  return parts.length ? parts.join(", ") : "Unknown location";
};

const COUNTRY: Record<string, string> = {
  US: "United States",
  GB: "United Kingdom",
  CA: "Canada",
  AU: "Australia",
  IN: "India",
  PK: "Pakistan",
  DE: "Germany",
  FR: "France",
  NL: "Netherlands",
  AE: "UAE",
  SG: "Singapore",
};
const countryName = (cc?: string) =>
  cc ? (COUNTRY[cc.toUpperCase()] ?? cc.toUpperCase()) : "Unknown";

export function AdminApp() {
  const [status, setStatus] = useState<"loading" | "login" | "ready">("loading");
  const [data, setData] = useState<Data | null>(null);
  const [configured, setConfigured] = useState(true);
  const [pw, setPw] = useState("");
  const [err, setErr] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const load = useCallback(async () => {
    const res = await fetch("/api/admin/data", { cache: "no-store" });
    if (res.status === 401) {
      const j = await res.json().catch(() => ({}));
      setConfigured(j.configured !== false);
      setStatus("login");
      return false;
    }
    if (res.ok) {
      setData(await res.json());
      setStatus("ready");
      return true;
    }
    setStatus("login");
    return false;
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  // poll while authed
  useEffect(() => {
    if (status !== "ready") return;
    timer.current = setInterval(load, 8000);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [status, load]);

  async function login(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setErr(null);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: pw }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error ?? "Login failed.");
      }
      setPw("");
      await load();
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Login failed.");
    } finally {
      setBusy(false);
    }
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setData(null);
    setStatus("login");
  }

  if (status === "loading") {
    return (
      <main className="flex min-h-dvh items-center justify-center bg-bg text-fg">
        <Loader2 className="size-6 animate-spin text-accent" />
      </main>
    );
  }

  if (status === "login") {
    return (
      <main className="flex min-h-dvh items-center justify-center bg-bg px-5 text-fg">
        <form
          onSubmit={login}
          className="w-full max-w-sm rounded-[18px] border border-border bg-bg-elevated p-8"
        >
          <span className="flex size-11 items-center justify-center rounded-full bg-accent-solid text-bg">
            <Lock className="size-5 text-bg" />
          </span>
          <h1 className="mt-5 font-display text-2xl font-bold tracking-tight">
            Admin access
          </h1>
          <p className="mt-2 text-sm text-fg-muted">
            {configured
              ? "Enter the admin password to view visits and chats."
              : "Admin is not configured yet. Set ADMIN_PASSWORD in the environment."}
          </p>
          <input
            type="password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            placeholder="Password"
            autoFocus
            disabled={!configured}
            className="mt-6 w-full rounded-[12px] border border-border bg-surface px-4 py-3 text-fg outline-none focus:border-accent disabled:opacity-50"
          />
          {err && <p className="mt-3 text-sm text-accent">{err}</p>}
          <button
            type="submit"
            disabled={busy || !configured}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-accent-solid px-6 py-3 text-sm font-medium text-bg disabled:opacity-60"
          >
            {busy ? <Loader2 className="size-4 animate-spin" /> : "Enter"}
          </button>
        </form>
      </main>
    );
  }

  // ready
  const stats = data?.stats ?? {};

  // group real (non-bot) visits by city+country for an at-a-glance rollup
  const locAgg = new Map<string, { fl: string; label: string; count: number }>();
  for (const v of data?.visits ?? []) {
    if (v.bot) continue;
    const key = `${v.city ?? ""}|${v.country ?? ""}`;
    const label = v.city
      ? `${v.city}, ${countryName(v.country)}`
      : countryName(v.country);
    const entry = locAgg.get(key) ?? { fl: flag(v.country), label, count: 0 };
    entry.count += 1;
    locAgg.set(key, entry);
  }
  const topLocations = [...locAgg.entries()]
    .map(([key, val]) => ({ key, ...val }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);
  return (
    <main className="min-h-dvh bg-bg px-5 py-10 text-fg md:px-10">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="eyebrow mb-2">Admin</p>
            <h1 className="font-display text-3xl font-black tracking-tight">
              Visitor & chat monitor
            </h1>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={load}
              className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-fg-muted transition-colors hover:text-fg"
            >
              <RefreshCw className="size-4" />
              Refresh
            </button>
            <button
              onClick={logout}
              className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-fg-muted transition-colors hover:text-fg"
            >
              <LogOut className="size-4" />
              Log out
            </button>
          </div>
        </div>

        {data && !data.dbConfigured && (
          <div className="mb-8 rounded-[14px] border border-accent/40 bg-accent-solid/10 p-5 text-sm text-fg-muted">
            Database is not configured. Set <code>MONGODB_URI</code> to start
            recording visits and chats.
          </div>
        )}

        {/* stats */}
        <div className="mb-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          <Stat label="Leads" value={stats.leads ?? 0} highlight />
          <Stat label="Visits (30d)" value={stats.totalVisits ?? 0} />
          <Stat label="Unique visitors" value={stats.uniqueVisitors ?? 0} />
          <Stat label="Chat sessions" value={stats.chatSessions ?? 0} />
        </div>

        {/* leads */}
        <section className="mb-10">
          <h2 className="eyebrow mb-4">Leads (email + phone captured)</h2>
          {(data?.leads ?? []).length === 0 ? (
            <p className="text-sm text-fg-dim">No leads yet.</p>
          ) : (
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {(data?.leads ?? []).map((l, i) => (
                <div
                  key={i}
                  className="rounded-[14px] border border-accent/40 bg-accent-solid/[0.07] p-5"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-display text-lg font-bold tracking-tight">
                      {l.name || "Lead"}
                    </span>
                    <span className="font-mono text-[11px] text-fg-dim">
                      {fmt(l.createdAt)}
                    </span>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-sm">
                    <a href={`mailto:${l.email}`} className="text-accent hover:underline">
                      {l.email}
                    </a>
                    <a href={`tel:${l.phone}`} className="text-accent hover:underline">
                      {l.phone}
                    </a>
                  </div>
                  {l.service && (
                    <p className="mt-2 text-xs uppercase tracking-wider text-fg-dim">
                      {l.service}
                    </p>
                  )}
                  {l.summary && (
                    <p className="mt-1 text-sm text-fg-muted">{l.summary}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </section>

        {/* email-attributed leads (cold outreach) */}
        <section className="mb-10">
          <h2 className="eyebrow mb-4">Email Leads (cold outreach attribution)</h2>
          {(data?.emailLeads ?? []).length === 0 ? (
            <p className="text-sm text-fg-dim">
              No email-attributed visits yet. They appear once a recipient opens
              a tracked link (<code>?lt=</code>) from a send.
            </p>
          ) : (
            <div className="overflow-x-auto rounded-[14px] border border-border">
              <table className="w-full min-w-[820px] text-left text-sm">
                <thead className="border-b border-border bg-bg-elevated">
                  <tr className="font-mono text-[11px] uppercase tracking-wider text-fg-dim">
                    <th className="px-4 py-3 font-normal">Company / contact</th>
                    <th className="px-4 py-3 font-normal">Campaign</th>
                    <th className="px-4 py-3 font-normal">Pages visited</th>
                    <th className="px-4 py-3 font-normal">First / last seen</th>
                    <th className="px-4 py-3 text-center font-normal">Visits</th>
                    <th className="px-4 py-3 text-center font-normal">Replied</th>
                  </tr>
                </thead>
                <tbody>
                  {(data?.emailLeads ?? []).map((l, i) => (
                    <tr
                      key={i}
                      className={`border-b border-border/60 last:border-0 ${
                        l.hot ? "bg-accent-solid/[0.07]" : ""
                      }`}
                    >
                      <td className="px-4 py-3 align-top">
                        <div className="flex items-center gap-2">
                          <span className="font-display font-semibold tracking-tight text-fg">
                            {l.identity.company || l.identity.email || "Unknown"}
                          </span>
                          {l.hot && (
                            <span className="rounded-full bg-accent-solid px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-bg">
                              hot
                            </span>
                          )}
                        </div>
                        <div className="mt-1 flex flex-col gap-0.5 text-xs">
                          {l.identity.email && (
                            <a
                              href={`mailto:${l.identity.email}`}
                              className="text-accent hover:underline"
                            >
                              {l.identity.email}
                            </a>
                          )}
                          {l.identity.phone && (
                            <a
                              href={`tel:${l.identity.phone}`}
                              className="text-accent hover:underline"
                            >
                              {l.identity.phone}
                            </a>
                          )}
                          {l.identity.niche && (
                            <span className="text-fg-dim">{l.identity.niche}</span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3 align-top text-fg-muted">
                        {l.identity.campaign || "—"}
                      </td>
                      <td className="px-4 py-3 align-top">
                        <div className="flex flex-wrap gap-1">
                          {l.behavior.paths.map((p) => (
                            <span
                              key={p}
                              className="rounded-full border border-border bg-surface px-2 py-0.5 font-mono text-[11px] text-fg-muted"
                            >
                              {p}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-3 align-top text-xs text-fg-dim">
                        {l.behavior.firstSeen ? fmt(l.behavior.firstSeen) : "—"}
                        <br />
                        {l.behavior.lastSeen ? fmt(l.behavior.lastSeen) : "—"}
                      </td>
                      <td className="px-4 py-3 text-center align-top font-mono text-fg">
                        {l.behavior.visitCount}
                      </td>
                      <td className="px-4 py-3 text-center align-top">
                        {l.outreach.replied ? (
                          <span className="text-accent">Yes</span>
                        ) : (
                          <span className="text-fg-dim">No</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* visits */}
          <section>
            <h2 className="eyebrow mb-4">Recent visits</h2>

            {/* top locations rollup (human visits) */}
            {topLocations.length > 0 && (
              <div className="mb-4 rounded-[12px] border border-border bg-bg-elevated p-4">
                <p className="mb-3 font-mono text-[11px] uppercase tracking-wider text-fg-dim">
                  Top locations · real visitors
                </p>
                <div className="flex flex-wrap gap-2">
                  {topLocations.map((l) => (
                    <span
                      key={l.key}
                      className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 text-sm text-fg"
                    >
                      <span>{l.fl}</span>
                      {l.label}
                      <span className="font-mono text-xs text-fg-dim">{l.count}</span>
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="max-h-[70vh] space-y-2 overflow-y-auto pr-1">
              {(data?.visits ?? []).length === 0 && (
                <p className="text-sm text-fg-dim">No visits yet.</p>
              )}
              {(data?.visits ?? []).map((v, i) => (
                <div
                  key={i}
                  className="rounded-[12px] border border-border bg-bg-elevated p-4"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="flex items-center gap-2 truncate">
                      <span className="text-base">{flag(v.country)}</span>
                      <span className="truncate font-display text-base font-semibold tracking-tight text-fg">
                        {place(v)}
                      </span>
                      {v.bot && (
                        <span className="shrink-0 rounded-full border border-border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-fg-dim">
                          bot{v.botReason ? ` · ${v.botReason}` : ""}
                        </span>
                      )}
                    </span>
                    <span className="shrink-0 font-mono text-[11px] text-fg-dim">
                      {fmt(v.createdAt)}
                    </span>
                  </div>
                  <p className="mt-1.5 flex items-center gap-2 truncate text-xs">
                    <span className="font-mono text-accent">{v.path}</span>
                    <span className="text-fg-dim">· {v.ref || "direct"}</span>
                  </p>
                  <p className="mt-1 truncate text-[11px] text-fg-dim/70">
                    {v.ip || "ip n/a"} · {v.sessionId.slice(0, 8)} · {v.ua}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* chats */}
          <section>
            <h2 className="eyebrow mb-4">Chat conversations</h2>
            <div className="max-h-[70vh] space-y-4 overflow-y-auto pr-1">
              {(data?.sessions ?? []).length === 0 && (
                <p className="text-sm text-fg-dim">No chats yet.</p>
              )}
              {(data?.sessions ?? []).map((s) => (
                <div
                  key={s.sessionId}
                  className="rounded-[14px] border border-border bg-bg-elevated p-4"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <span className="font-mono text-xs text-fg-dim">
                      {s.sessionId.slice(0, 12)}
                    </span>
                    <span className="font-mono text-[11px] text-fg-dim">
                      {s.messages.length} msgs
                    </span>
                  </div>
                  <div className="space-y-2">
                    {s.messages.map((m, i) => (
                      <div
                        key={i}
                        className={
                          m.role === "user" ? "flex justify-end" : "flex justify-start"
                        }
                      >
                        <span
                          className={
                            m.role === "user"
                              ? "max-w-[85%] rounded-2xl rounded-br-sm bg-accent-solid px-3 py-2 text-sm text-bg"
                              : "max-w-[85%] rounded-2xl rounded-bl-sm bg-surface px-3 py-2 text-sm text-fg-muted"
                          }
                        >
                          {m.text}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

function Stat({
  label,
  value,
  highlight,
}: {
  label: string;
  value: number;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-[14px] border p-5 ${
        highlight
          ? "border-accent/50 bg-accent-solid/10"
          : "border-border bg-bg-elevated"
      }`}
    >
      <p className="font-mono text-xs uppercase tracking-wider text-fg-dim">
        {label}
      </p>
      <p
        className={`mt-2 font-display text-3xl font-black tracking-tight ${
          highlight ? "text-accent" : ""
        }`}
      >
        {value}
      </p>
    </div>
  );
}
