import { getDb, dbEnabled } from "@/lib/db";
import { sendAlert } from "@/lib/email";
import { notifyOwnerWhatsApp } from "@/lib/whatsapp";

type Turn = { role: "user" | "assistant"; content: string };

const EMAIL_RE = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i;
// a phone-ish run: optional +, then 9+ digits allowing spaces/()-.
const PHONE_RE = /\+?\d[\d\s().-]{8,}\d/;

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function digits(s: string) {
  return s.replace(/\D/g, "");
}

/**
 * Lead-extraction agent. After a chat turn it scans what the VISITOR typed for
 * an email and a phone number. If both are present and this session isn't yet
 * a lead, it asks the model to structure the lead, stores it, emails the team,
 * and pings the owner on WhatsApp. Runs at most once per session.
 */
export async function maybeCreateLead(sessionId: string, turns: Turn[]) {
  if (!dbEnabled() || !sessionId) return;

  const userText = turns
    .filter((t) => t.role === "user")
    .map((t) => t.content)
    .join("\n");

  const emailMatch = userText.match(EMAIL_RE)?.[0];
  const phoneMatch = userText.match(PHONE_RE)?.[0];
  if (!emailMatch || !phoneMatch || digits(phoneMatch).length < 9) return;

  try {
    const db = await getDb();
    if (!db) return;

    const exists = await db
      .collection("leads")
      .countDocuments({ sessionId }, { limit: 1 });
    if (exists) return;

    const transcript = turns
      .map((t) => `${t.role === "user" ? "Visitor" : "Agent"}: ${t.content}`)
      .join("\n");

    const extracted = await extractLead(transcript);

    const lead = {
      sessionId,
      name: extracted.name || "",
      email: extracted.email || emailMatch,
      phone: extracted.phone || phoneMatch.trim(),
      service: extracted.service || "",
      summary: extracted.summary || "",
      createdAt: new Date(),
    };

    await db.collection("leads").insertOne(lead);

    const html = `<h2>New lead from the website chat</h2>
      <p><strong>Name:</strong> ${esc(lead.name || "n/a")}</p>
      <p><strong>Email:</strong> ${esc(lead.email)}</p>
      <p><strong>Phone:</strong> ${esc(lead.phone)}</p>
      <p><strong>Interested in:</strong> ${esc(lead.service || "n/a")}</p>
      <p><strong>Summary:</strong> ${esc(lead.summary || "n/a")}</p>`;
    // awaited (not void): inside after(), the function is torn down once this
    // resolves, so fire-and-forget would cut off the external calls mid-flight
    await Promise.allSettled([
      sendAlert(`New lead: ${lead.name || lead.email}`, html),
      notifyOwnerWhatsApp(
        `New lead on corebytemedia.vercel.app. ${lead.name || ""} | ${lead.email} | ${lead.phone} | ${lead.service || ""} - ${lead.summary || ""}`.trim(),
      ),
    ]);
  } catch {
    // best-effort
  }
}

type Extracted = {
  name?: string;
  email?: string;
  phone?: string;
  service?: string;
  summary?: string;
};

// Use a fast Groq model to pull structured lead fields from the transcript.
async function extractLead(transcript: string): Promise<Extracted> {
  const key = process.env.GROQ_API_KEY;
  if (!key) return {};
  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model: process.env.LEAD_MODEL ?? "llama-3.1-8b-instant",
        temperature: 0,
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content:
              "Extract the visitor's contact details from this website chat. Return ONLY JSON with keys: name, email, phone, service (which service they want: logo, graphic design, web, AI agents, or empty), summary (one short sentence on what they need). Use empty strings for anything not stated. Do not invent.",
          },
          { role: "user", content: transcript.slice(0, 6000) },
        ],
      }),
    });
    if (!res.ok) return {};
    const json = await res.json();
    const content = json.choices?.[0]?.message?.content ?? "{}";
    return JSON.parse(content) as Extracted;
  } catch {
    return {};
  }
}
