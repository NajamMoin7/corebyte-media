"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { getSessionId, captureLtToken } from "@/lib/session";

/**
 * Records a visit on first load and on every route change. Dedupes per path
 * within a page session so a re-render doesn't double-count.
 */
export function VisitTracker() {
  const pathname = usePathname();
  const seen = useRef<Set<string>>(new Set());

  useEffect(() => {
    if (pathname.startsWith("/admin")) return;
    if (seen.current.has(pathname)) return;
    seen.current.add(pathname);

    const sessionId = getSessionId();
    if (!sessionId) return;

    fetch("/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sessionId,
        path: pathname,
        ref: document.referrer || "",
        lt: captureLtToken(),
      }),
      keepalive: true,
    }).catch(() => {});
  }, [pathname]);

  return null;
}
