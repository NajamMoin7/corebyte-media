/**
 * Cheap, server-side visit classification for the admin panel.
 *
 * This does NOT block anything — Vercel BotID guards the valuable endpoints
 * (/api/contact, /api/chat). This only flags noise so real humans stand out in
 * the panel. It runs on every /api/track call, so it must stay allocation-light
 * and make no network calls.
 *
 * It catches three things the floods showed:
 *   1. Self-identifying crawlers / tools / AI fetchers (by user-agent).
 *   2. Empty or junk user-agents.
 *   3. Referrer spam — hits arriving from unrelated gaming / proxy / localhost
 *      domains we never advertise on (the op.gg / roblox / 127.0.0.1 pattern).
 */

// Self-identifying automation in the UA string. Real browsers match none.
const UA_BOT =
  /bot|crawl|spider|slurp|headless|phantom|puppeteer|playwright|selenium|screenshot|dataprovider|preview|monitor|scan|fetch|python|curl|wget|axios|okhttp|java\/|go-http|node-fetch|libwww|httpclient|facebookexternalhit|externalhit|meta-externalagent|bytespider|gptbot|claudebot|ccbot|amazonbot|petalbot|dataforseo|ahrefs|semrush|mj12|dotbot|bingpreview|yandex|baidu|sogou|embedly|telegrambot|whatsapp|slackbot|discordbot|skypeuripreview|vkshare|redditbot|pinterest|applebot/i;

// Referrer hosts that are never a legitimate source for this brand-new agency
// site. Pure noise / proxy-spam signatures pulled from the live floods. Kept
// conservative: only hosts with no plausible organic path to us.
const REF_SPAM = [
  "op.gg",
  "roblox.com",
  "limbuscompany",
  "miraheze.org",
  "iter.org",
  "certipaq",
  "kuronekoyamato",
  "msn.com", // the MSN gaming-widget referrers, not a real channel for us
  "games.",
  "gaming.",
];

function refHost(ref: string): string {
  try {
    return new URL(ref).hostname.toLowerCase();
  } catch {
    return "";
  }
}

function isPrivateHost(host: string): boolean {
  return (
    host === "localhost" ||
    host === "127.0.0.1" ||
    host === "0.0.0.0" ||
    host.endsWith(".local") ||
    /^10\./.test(host) ||
    /^192\.168\./.test(host) ||
    /^172\.(1[6-9]|2\d|3[01])\./.test(host)
  );
}

export type VisitClass = { bot: boolean; reason: string };

export function classifyVisit({
  ua,
  ref,
}: {
  ua: string;
  ref: string;
}): VisitClass {
  const u = (ua ?? "").trim();

  if (!u) return { bot: true, reason: "empty-ua" };
  if (u.length < 10) return { bot: true, reason: "short-ua" };
  if (UA_BOT.test(u)) return { bot: true, reason: "ua-pattern" };

  const host = refHost(ref);
  if (host) {
    if (isPrivateHost(host)) return { bot: true, reason: "private-referrer" };
    if (REF_SPAM.some((h) => host.includes(h))) {
      return { bot: true, reason: "spam-referrer" };
    }
  }

  return { bot: false, reason: "" };
}
