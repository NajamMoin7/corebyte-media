import { cookies } from "next/headers";
import { ADMIN_COOKIE, isAuthed, adminConfigured } from "@/lib/admin";
import { getDb, getEmailDb, dbEnabled } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Decode the recipient email from a token offline (no secret, no network):
// the first dot-segment is base64url(email).
function decodeEmailFromToken(token: string): string {
  try {
    const seg = token.split(".")[0] ?? "";
    const email = Buffer.from(seg, "base64url").toString("utf8");
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : "";
  } catch {
    return "";
  }
}

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

// Build the email-attribution leads. Always best-effort: if the outreach DB is
// unset/unreachable we still return leads with offline-decoded emails.
async function buildEmailLeads(
  db: NonNullable<Awaited<ReturnType<typeof getDb>>>,
): Promise<EmailLead[]> {
  // every visit carrying a cold-email token (not TTL-limited beyond the 30d purge)
  const ltVisits = (await db
    .collection("visits")
    .find(
      { lt: { $exists: true, $ne: "" } },
      { projection: { _id: 0, lt: 1, path: 1, createdAt: 1 } },
    )
    .sort({ createdAt: 1 })
    .limit(5000)
    .toArray()) as unknown as {
    lt: string;
    path: string;
    createdAt: string | Date;
  }[];

  if (ltVisits.length === 0) return [];

  // aggregate behaviour per token
  const byToken = new Map<
    string,
    {
      paths: Set<string>;
      first: Date;
      last: Date;
      count: number;
      hot: boolean;
    }
  >();
  for (const v of ltVisits) {
    const ts = new Date(v.createdAt);
    const e = byToken.get(v.lt) ?? {
      paths: new Set<string>(),
      first: ts,
      last: ts,
      count: 0,
      hot: false,
    };
    e.paths.add(v.path);
    e.count += 1;
    if (ts < e.first) e.first = ts;
    if (ts > e.last) e.last = ts;
    if (v.path.includes("/contact") || v.path.includes("/pricing")) e.hot = true;
    byToken.set(v.lt, e);
  }

  const tokens = [...byToken.keys()];

  // cross-cluster enrichment (best-effort, read-only)
  const recipByToken = new Map<
    string,
    { email?: string; company?: string; phone?: string; campaignId?: unknown; niche?: string; _id?: unknown }
  >();
  const campaignName = new Map<string, string>();
  const sentByRecipient = new Map<string, { ts: string | null }>();
  const repliedRecipients = new Set<string>();

  try {
    const edb = await getEmailDb();
    if (edb) {
      const recipients = (await edb
        .collection("recipients")
        .find({ unsubToken: { $in: tokens } })
        .toArray()) as unknown as {
        _id: unknown;
        unsubToken: string;
        email?: string;
        company?: string;
        phone?: string;
        campaignId?: unknown;
        niche?: string;
      }[];

      const recipientIds: unknown[] = [];
      const campaignIds: unknown[] = [];
      for (const r of recipients) {
        recipByToken.set(r.unsubToken, r);
        recipientIds.push(r._id);
        if (r.campaignId != null) campaignIds.push(r.campaignId);
      }

      if (campaignIds.length) {
        const campaigns = (await edb
          .collection("campaigns")
          .find({ id: { $in: campaignIds } })
          .toArray()) as unknown as { id: unknown; name?: string }[];
        for (const c of campaigns) {
          campaignName.set(String(c.id), c.name ?? "");
        }
      }

      if (recipientIds.length) {
        const sends = (await edb
          .collection("send_log")
          .find({ recipientId: { $in: recipientIds } })
          .toArray()) as unknown as {
          recipientId: unknown;
          status?: string;
          ts?: string | Date;
        }[];
        for (const s of sends) {
          const key = String(s.recipientId);
          const ts = s.ts ? new Date(s.ts).toISOString() : null;
          const prev = sentByRecipient.get(key);
          // keep the most recent send timestamp
          if (!prev || (ts && (!prev.ts || ts > prev.ts))) {
            sentByRecipient.set(key, { ts });
          }
        }

        const replies = (await edb
          .collection("replies")
          .find({ recipientId: { $in: recipientIds } })
          .toArray()) as unknown as { recipientId: unknown }[];
        for (const r of replies) repliedRecipients.add(String(r.recipientId));
      }
    }
  } catch {
    // outreach DB unreachable — fall through to offline-decoded emails only
  }

  const leads: EmailLead[] = tokens.map((token) => {
    const b = byToken.get(token)!;
    const r = recipByToken.get(token);
    const recipKey = r?._id != null ? String(r._id) : "";
    const sent = recipKey ? sentByRecipient.get(recipKey) : undefined;

    return {
      identity: {
        company: r?.company ?? "",
        email: r?.email || decodeEmailFromToken(token),
        phone: r?.phone ?? "",
        campaign:
          r?.campaignId != null
            ? (campaignName.get(String(r.campaignId)) ?? "")
            : "",
        niche: r?.niche ?? "",
      },
      behavior: {
        paths: [...b.paths],
        firstSeen: b.first.toISOString(),
        lastSeen: b.last.toISOString(),
        visitCount: b.count,
      },
      hot: b.hot,
      outreach: {
        sentAt: sent?.ts ?? null,
        replied: recipKey ? repliedRecipients.has(recipKey) : false,
      },
    };
  });

  // hot first, then most recently active
  leads.sort((a, b) => {
    if (a.hot !== b.hot) return a.hot ? -1 : 1;
    return (b.behavior.lastSeen ?? "").localeCompare(a.behavior.lastSeen ?? "");
  });

  return leads;
}

export async function GET() {
  const jar = await cookies();
  if (!isAuthed(jar.get(ADMIN_COOKIE)?.value)) {
    return Response.json(
      { error: "unauthorized", configured: adminConfigured() },
      { status: 401 },
    );
  }

  if (!dbEnabled()) {
    return Response.json({ dbConfigured: false, visits: [], sessions: [], stats: {} });
  }

  const db = await getDb();
  if (!db) {
    return Response.json({ dbConfigured: false, visits: [], sessions: [], stats: {} });
  }

  const since = new Date(Date.now() - 1000 * 60 * 60 * 24 * 30);

  const [visits, messages, leads, uniqueVisitors] = await Promise.all([
    db
      .collection("visits")
      .find({}, { projection: { _id: 0 } })
      .sort({ createdAt: -1 })
      .limit(200)
      .toArray(),
    db
      .collection("messages")
      .find({}, { projection: { _id: 0 } })
      .sort({ createdAt: -1 })
      .limit(600)
      .toArray(),
    db
      .collection("leads")
      .find({}, { projection: { _id: 0 } })
      .sort({ createdAt: -1 })
      .limit(100)
      .toArray(),
    db.collection("visits").distinct("sessionId"),
  ]);

  // group chat messages into sessions (newest activity first)
  const bySession = new Map<string, { sessionId: string; messages: typeof messages; last: Date }>();
  for (const m of messages) {
    const sid = (m as unknown as { sessionId?: string }).sessionId ?? "unknown";
    const entry = bySession.get(sid) ?? { sessionId: sid, messages: [], last: new Date(0) };
    entry.messages.push(m);
    const ts = new Date((m as unknown as { createdAt: string }).createdAt);
    if (ts > entry.last) entry.last = ts;
    bySession.set(sid, entry);
  }
  const sessions = [...bySession.values()]
    .map((s) => ({
      ...s,
      messages: s.messages.sort(
        (a, b) =>
          new Date((a as unknown as { createdAt: string }).createdAt).getTime() -
          new Date((b as unknown as { createdAt: string }).createdAt).getTime(),
      ),
    }))
    .sort((a, b) => b.last.getTime() - a.last.getTime())
    .slice(0, 80);

  const stats = {
    totalVisits: await db.collection("visits").countDocuments({ createdAt: { $gte: since } }),
    uniqueVisitors: uniqueVisitors.length,
    chatSessions: bySession.size,
    leads: leads.length,
  };

  const emailLeads = await buildEmailLeads(db);

  return Response.json({
    dbConfigured: true,
    visits,
    sessions,
    leads,
    emailLeads,
    stats,
  });
}
