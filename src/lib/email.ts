import { Resend } from "resend";

// Email alerts via Resend. No-op when RESEND_API_KEY is missing.
const key = process.env.RESEND_API_KEY;
const TO = process.env.ALERT_EMAIL ?? "info@corebytemedia.com";
// Until the domain is verified in Resend, the shared sender works to your own
// account email. Set ALERT_FROM to a verified address later.
const FROM = process.env.ALERT_FROM ?? "Core Byte Alerts <onboarding@resend.dev>";

export async function sendAlert(subject: string, html: string): Promise<void> {
  if (!key) return;
  try {
    const resend = new Resend(key);
    await resend.emails.send({ from: FROM, to: TO, subject, html });
  } catch {
    // alerts are best-effort, never block the request
  }
}
