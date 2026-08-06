"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Non-critical UI: chat, click effect, WhatsApp button, visit tracking.
// Loaded client-side and mounted only after the browser is idle so they stay
// out of the initial JS / main-thread work that drives LCP and TBT.
const ChatWidget = dynamic(
  () => import("@/components/chat/ChatWidget").then((m) => m.ChatWidget),
  { ssr: false },
);
const WhatsAppButton = dynamic(
  () => import("@/components/site/WhatsAppButton").then((m) => m.WhatsAppButton),
  { ssr: false },
);
const ClickBurst = dynamic(
  () => import("@/components/providers/ClickBurst").then((m) => m.ClickBurst),
  { ssr: false },
);
const VisitTracker = dynamic(
  () => import("@/components/providers/VisitTracker").then((m) => m.VisitTracker),
  { ssr: false },
);
const ContactPopup = dynamic(
  () => import("@/components/sections/ContactPopup").then((m) => m.ContactPopup),
  { ssr: false },
);

export function DeferredWidgets() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void) => number;
    };
    if (w.requestIdleCallback) {
      const id = w.requestIdleCallback(() => setReady(true));
      return () => (window as unknown as { cancelIdleCallback?: (n: number) => void }).cancelIdleCallback?.(id);
    }
    const t = setTimeout(() => setReady(true), 1200);
    return () => clearTimeout(t);
  }, []);

  if (!ready) return null;
  return (
    <>
      <ChatWidget />
      <WhatsAppButton />
      <ClickBurst />
      <VisitTracker />
      <ContactPopup />
    </>
  );
}
