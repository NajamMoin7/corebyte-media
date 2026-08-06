import type { Metadata } from "next";
import { LegalLayout } from "@/components/legal/LegalLayout";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description: "The terms that govern use of the Core Byte Media website.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalLayout title="Terms & Conditions" updated="June 13, 2026">
      <p>
        These Terms govern your use of{" "}
        <a href="https://corebytemedia.vercel.app">corebytemedia.vercel.app</a> and any
        enquiry you make through it. By using the site you accept these Terms.
      </p>

      <h2>Use of the site</h2>
      <p>
        You may browse and contact us for legitimate business purposes. You agree
        not to misuse the site, attempt to disrupt it, or submit unlawful or
        harmful content through the form or chat.
      </p>

      <h2>Quotes and pricing</h2>
      <p>
        Prices shown are starting points for typical projects, not binding
        quotes. Every project is scoped individually and confirmed in writing
        before work begins.
      </p>

      <h2>Services and deliverables</h2>
      <p>
        Project scope, timelines, and ownership are agreed per engagement. Unless
        stated otherwise, you own the final delivered assets and code once the
        project is paid in full.
      </p>

      <h2>Intellectual property</h2>
      <p>
        The website&apos;s design, content, and branding are owned by Core Byte
        Media. Portfolio work shown remains the property of its respective
        owners and is displayed with permission.
      </p>

      <h2>The website assistant</h2>
      <p>
        Our AI assistant provides general information and may occasionally be
        inaccurate. Nothing it says is a binding offer. For anything definitive,
        confirm with us directly.
      </p>

      <h2>Liability</h2>
      <p>
        The site is provided &quot;as is&quot;. To the extent permitted by law,
        we are not liable for indirect or incidental damages arising from use of
        the site.
      </p>

      <h2>Contact</h2>
      <p>
        Questions? Email{" "}
        <a href="mailto:info@corebytemedia.com">info@corebytemedia.com</a>.
      </p>
    </LegalLayout>
  );
}
