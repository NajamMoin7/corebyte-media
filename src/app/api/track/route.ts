import { getDb, dbEnabled } from "@/lib/db";
import { classifyVisit } from "@/lib/bots";

export const runtime = "nodejs";

export async function POST(req: Request) {
  if (!dbEnabled()) return new Response(null, { status: 204 });

  let body: { sessionId?: string; path?: string; ref?: string; lt?: string };
  try {
    body = await req.json();
  } catch {
    return new Response(null, { status: 204 });
  }

  const sessionId = (body.sessionId ?? "").slice(0, 100);
  const path = (body.path ?? "/").slice(0, 300);
  const ref = (body.ref ?? "").slice(0, 300);
  // cold-email attribution token; allow only token-safe chars
  const lt = (body.lt ?? "").replace(/[^A-Za-z0-9._-]/g, "").slice(0, 400);
  if (!sessionId) return new Response(null, { status: 204 });

  const ua = req.headers.get("user-agent")?.slice(0, 400) ?? "";
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    req.headers.get("x-real-ip") ??
    "";

  // Vercel injects free geo headers on every request at the edge — no API call.
  const h = (k: string) => {
    const v = req.headers.get(k);
    if (!v) return "";
    try {
      return decodeURIComponent(v).slice(0, 80);
    } catch {
      return v.slice(0, 80);
    }
  };
  const city = h("x-vercel-ip-city");
  const region = h("x-vercel-ip-country-region");
  const country = h("x-vercel-ip-country"); // ISO-2, e.g. "US"

  // classify so humans stand out in the panel (does not block — BotID does that)
  const { bot, reason: botReason } = classifyVisit({ ua, ref });

  try {
    const db = await getDb();
    if (!db) return new Response(null, { status: 204 });

    // visits are logged for the admin panel only, no email (leads notify instead)
    await db.collection("visits").insertOne({
      sessionId,
      path,
      ref,
      ip,
      ua,
      city,
      region,
      country,
      bot,
      ...(botReason ? { botReason } : {}),
      ...(lt ? { lt } : {}),
      createdAt: new Date(),
    });
  } catch {
    // best-effort
  }

  return new Response(null, { status: 204 });
}
