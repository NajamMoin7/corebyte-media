import { after } from "next/server";
import { checkBotId } from "botid/server";
import { company, services, serviceProcess, getPackages } from "@/lib/site";
import { getDb, dbEnabled } from "@/lib/db";
import { maybeCreateLead } from "@/lib/lead";

export const runtime = "nodejs";
export const maxDuration = 60;

// Groq (OpenAI-compatible). Override the model with CHAT_MODEL if desired.
const MODEL = process.env.CHAT_MODEL ?? "llama-3.3-70b-versatile";
const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";

// Persist a chat turn for the admin panel.
async function logChat(
  sessionId: string,
  role: "user" | "assistant",
  text: string,
) {
  if (!dbEnabled() || !sessionId || !text) return;
  try {
    const db = await getDb();
    if (!db) return;
    await db.collection("messages").insertOne({
      sessionId,
      role,
      text: text.slice(0, 6000),
      createdAt: new Date(),
    });
  } catch {
    // best-effort
  }
}

function buildSystemPrompt() {
  const serviceLines = services
    .map((s) => {
      const subs = s.subservices.map((ss) => ss.name).join(", ");
      const pkgs = getPackages(s.slug);
      const from = pkgs.length ? `, from ${pkgs[0].price}` : "";
      const tiers = pkgs
        .map((p) => `${p.name} ${p.price}${p.period ?? ""}`)
        .join(" / ");
      return `- ${s.title} (${s.short}${from}). Packages: ${tiers}. Specialisms: ${subs}`;
    })
    .join("\n");

  const processLines = services
    .map((s) => {
      const steps = (serviceProcess[s.slug] ?? [])
        .map((p, i) => `${i + 1}. ${p.title}`)
        .join(" → ");
      return `- ${s.title}: ${steps}`;
    })
    .join("\n");

  return `You are the sales agent for ${company.name}, a design, web, and applied-AI studio. You are chatting live with a potential client on the website. Your job: understand what they need, recommend the right service and starting price, and move them to start a project.

VOICE
- Talk like a sharp, warm human sales rep, not a brochure or an FAQ bot.
- SHORT. 1 to 3 sentences, under ~45 words. Never a wall of text, never 7-8 lines, never long bullet lists unless they explicitly ask for a full breakdown.
- One idea per reply. End most replies with a single nudge or question that moves things forward (what are you building, timeline, budget, "want me to set you up with the team?").
- Confident and specific. Recommend, don't just list. If they're vague, ask one sharp qualifying question.

WHAT WE DO (services, starting prices, packages)
${serviceLines}

HOW WE WORK (per service)
${processLines}

SELLING
- When asked price, give the starting price or the relevant package, then offer to scope it exactly on a quick call/enquiry. Example: "Logos start at $45, full systems $250. What's the brand?"
- Match the need to a service and name a concrete next step.
- Handle hesitation briefly: speed, one team for design+web+AI, real shipped work. Don't oversell or beg.
- Always be ready to hand off: Contact page (${company.ctaHref})${company.whatsapp ? `, WhatsApp ${company.whatsapp}` : ""}, or email ${company.email}.

CAPTURE (important)
- Once there's genuine interest (usually after 1-2 exchanges), casually ask for their email AND phone/WhatsApp so the team can follow up, in the same breath as a helpful line. Keep it light, not a form. Example: "I can have the team send you a quick plan. What's the best email and WhatsApp number to reach you?"
- Ask for both together, once. If they give only one, gently ask for the other next turn. Once you have both, confirm warmly and tell them the team will reach out shortly. Never pressure.

RULES
- Never invent prices, timelines, client names, or features we don't list. If unsure, say so and route to the team.
- Don't dump the whole service list unprompted. Lead with what fits them.
- Never use em-dashes. Use commas, periods, or parentheses.`;
}

type ChatMessage = { role: "user" | "assistant"; content: string };

export async function POST(req: Request) {
  // Block bots before spending an LLM call.
  const { isBot } = await checkBotId();
  if (isBot) {
    return new Response("Access denied.", { status: 403 });
  }

  let body: { messages?: ChatMessage[]; sessionId?: string };
  try {
    body = await req.json();
  } catch {
    return new Response("Invalid request.", { status: 400 });
  }

  const sessionId = (body.sessionId ?? "").slice(0, 100);

  const messages = (body.messages ?? [])
    .filter(
      (m) =>
        m &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.trim().length > 0,
    )
    .slice(-12)
    .map((m) => ({ role: m.role, content: m.content.slice(0, 4000) }));

  if (messages.length === 0 || messages[messages.length - 1].role !== "user") {
    return new Response("A user message is required.", { status: 422 });
  }

  const lastUser = messages[messages.length - 1].content;
  // accumulates the streamed reply so after() can persist it post-response
  const collected = { text: "" };

  // after() guarantees this runs after the response streams, which fire-and-
  // forget does not on serverless. Logs the turn and runs the lead agent.
  after(async () => {
    await logChat(sessionId, "user", lastUser);
    if (collected.text) await logChat(sessionId, "assistant", collected.text);
    await maybeCreateLead(sessionId, [
      ...messages,
      { role: "assistant" as const, content: collected.text },
    ]);
  });

  const encoder = new TextEncoder();

  // Graceful degradation when no key is configured.
  if (!process.env.GROQ_API_KEY) {
    const fallback =
      "The live agent needs an API key to run in this environment. Add GROQ_API_KEY to .env.local to switch it on. In the meantime, tell me what you're building and I'll point you to the right service, or reach the team at " +
      company.email +
      ".";
    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(encoder.encode(fallback));
        controller.close();
      },
    });
    return new Response(stream, {
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const upstream = await fetch(GROQ_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          },
          body: JSON.stringify({
            model: MODEL,
            max_tokens: 1024,
            temperature: 0.6,
            stream: true,
            messages: [
              { role: "system", content: buildSystemPrompt() },
              ...messages,
            ],
          }),
        });

        if (!upstream.ok || !upstream.body) {
          controller.enqueue(
            encoder.encode(
              "The agent hit an API error. Please try again, or email " +
                company.email +
                ".",
            ),
          );
          controller.close();
          return;
        }

        // parse OpenAI-style SSE: lines of `data: {json}` ending with [DONE]
        const reader = upstream.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });

          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed.startsWith("data:")) continue;
            const data = trimmed.slice(5).trim();
            if (data === "[DONE]") continue;
            try {
              const json = JSON.parse(data);
              const delta = json.choices?.[0]?.delta?.content;
              if (delta) {
                collected.text += delta;
                controller.enqueue(encoder.encode(delta));
              }
            } catch {
              // ignore keep-alive / partial lines
            }
          }
        }
        controller.close();
      } catch {
        controller.enqueue(
          encoder.encode("Something went wrong. Please try again."),
        );
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
}
