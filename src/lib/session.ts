// Cold-email attribution token (?lt=). Captured on first load from the URL,
// then persisted so later pageviews in the same browser (including returns via
// Google/direct) stay tagged to the original email recipient.
export function captureLtToken(): string {
  if (typeof window === "undefined") return "";
  try {
    const param = new URL(window.location.href).searchParams.get("lt");
    if (param) {
      const token = param.slice(0, 400);
      localStorage.setItem("lt_token", token);
      return token;
    }
    return localStorage.getItem("lt_token") ?? "";
  } catch {
    return "";
  }
}

// Stable per-visitor id kept in localStorage; used to group visits and chats.
export function getSessionId(): string {
  if (typeof window === "undefined") return "";
  try {
    let id = localStorage.getItem("lt_sid");
    if (!id) {
      id =
        (crypto?.randomUUID?.() as string) ||
        `s_${Date.now()}_${Math.floor(Math.random() * 1e9)}`;
      localStorage.setItem("lt_sid", id);
    }
    return id;
  } catch {
    return "";
  }
}
