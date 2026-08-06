import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/LegalLayout";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: "How Core Byte Media uses cookies and local storage.",
  alternates: { canonical: "/cookies" },
};

export default function CookiePage() {
  return (
    <LegalLayout title="Cookie Policy" updated="June 13, 2026">
      <p>
        This Cookie Policy explains the small amounts of data{" "}
        <a href="https://corebytemedia.vercel.app">corebytemedia.vercel.app</a> stores in
        your browser.
      </p>

      <h2>What we store</h2>
      <ul>
        <li>
          <strong>Session identifier (local storage):</strong> a random id that
          lets us group your visits and chat in one thread. It contains no
          personal information.
        </li>
        <li>
          <strong>Admin session cookie:</strong> set only if you log into the
          private admin area. Not used for regular visitors.
        </li>
      </ul>

      <h2>What we do not use</h2>
      <p>
        We do not run third-party advertising or cross-site tracking cookies. We
        do not sell your data.
      </p>

      <h2>Managing cookies</h2>
      <p>
        You can clear local storage and cookies anytime through your browser
        settings. Clearing the session id simply starts a new anonymous session.
      </p>

      <h2>Contact</h2>
      <p>
        Questions? Email{" "}
        <a href="mailto:info@corebytemedia.com">info@corebytemedia.com</a>.
      </p>
    </LegalLayout>
  );
}
