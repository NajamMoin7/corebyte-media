import { NextResponse } from "next/server";
import { checkBotId } from "botid/server";
import { sendAlert } from "@/lib/email";

export const runtime = "nodejs";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

/**
 * Contact form endpoint. Validates input and emails the enquiry via Resend.
 * Falls back to accepting + logging if no email key is configured.
 */
export async function POST(req: Request) {
  // Drop bot submissions before any email/processing.
  const { isBot } = await checkBotId();
  if (isBot) {
    return NextResponse.json({ error: "Access denied." }, { status: 403 });
  }

  let data: Record<string, unknown>;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = String(data.name ?? "").trim();
  const email = String(data.email ?? "").trim();
  const company = String(data.company ?? "").trim();
  const service = String(data.service ?? "").trim();
  const budget = String(data.budget ?? "").trim();
  const message = String(data.message ?? "").trim();

  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  if (name.length < 2 || !emailOk || message.length < 10) {
    return NextResponse.json(
      { error: "Please add your name, a valid email, and a short message." },
      { status: 422 },
    );
  }

  await sendAlert(
    `New enquiry from ${name}`,
    `<h2>New project enquiry</h2>
     <p><strong>Name:</strong> ${esc(name)}</p>
     <p><strong>Email:</strong> ${esc(email)}</p>
     ${company ? `<p><strong>Company:</strong> ${esc(company)}</p>` : ""}
     ${service ? `<p><strong>Service:</strong> ${esc(service)}</p>` : ""}
     ${budget ? `<p><strong>Budget:</strong> ${esc(budget)}</p>` : ""}
     <p><strong>Message:</strong></p>
     <p>${esc(message).replace(/\n/g, "<br>")}</p>`,
  );

  return NextResponse.json({ ok: true });
}
