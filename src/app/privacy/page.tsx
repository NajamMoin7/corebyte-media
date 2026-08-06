import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/LegalLayout";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How Core Byte Media collects, uses, and protects your information.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalLayout title="Privacy Policy" updated="June 13, 2026">
      <p>
        This Privacy Policy explains how Core Byte Media (&quot;we&quot;,
        &quot;us&quot;) collects, uses, and protects information when you use{" "}
        <a href="https://corebytemedia.vercel.app">corebytemedia.vercel.app</a>. By using
        the site you agree to this policy.
      </p>

      <h2>Information we collect</h2>
      <ul>
        <li>
          <strong>Contact details you give us:</strong> name, email, phone or
          WhatsApp number, company, and project details you submit through our
          contact form or share in the website chat.
        </li>
        <li>
          <strong>Chat content:</strong> messages you exchange with our website
          assistant, so we can follow up and improve the service.
        </li>
        <li>
          <strong>Usage data:</strong> pages visited, referrer, approximate IP,
          browser and device type, collected to understand site traffic.
        </li>
      </ul>

      <h2>How we use it</h2>
      <ul>
        <li>To respond to enquiries and provide quotes and services.</li>
        <li>To follow up on leads you have asked us to contact you about.</li>
        <li>To operate, secure, and improve the website.</li>
      </ul>

      <h2>Retention</h2>
      <p>
        Visit logs, chat messages, and lead records are automatically deleted
        after 30 days. Project enquiries you email us are kept as long as needed
        to work together.
      </p>

      <h2>Service providers</h2>
      <p>
        We use trusted third parties to run the site: Vercel (hosting), MongoDB
        Atlas (data storage), Groq (AI responses), Resend (email), and CallMeBot
        (internal WhatsApp notifications). They process data only to provide
        these services.
      </p>

      <h2>Your choices</h2>
      <p>
        You can request access to or deletion of your information at any time by
        emailing <a href="mailto:info@corebytemedia.com">info@corebytemedia.com</a>.
        You can also avoid sharing personal details by not submitting the form or
        chat.
      </p>

      <h2>Contact</h2>
      <p>
        Questions about this policy? Email{" "}
        <a href="mailto:info@corebytemedia.com">info@corebytemedia.com</a>{" "}
        or call +1 (470) 461-2213.
      </p>
    </LegalLayout>
  );
}
