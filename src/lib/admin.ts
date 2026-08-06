import { createHash } from "crypto";

// Single-password admin gate. The session cookie holds a hash derived from the
// password, so nothing secret is stored client-side and there's no DB session.
export const ADMIN_COOKIE = "lt_admin";

export function adminConfigured(): boolean {
  return Boolean(process.env.ADMIN_PASSWORD);
}

export function expectedToken(): string {
  return createHash("sha256")
    .update("lt-admin::" + (process.env.ADMIN_PASSWORD ?? ""))
    .digest("hex");
}

export function checkPassword(pw: unknown): boolean {
  return (
    adminConfigured() &&
    typeof pw === "string" &&
    pw === process.env.ADMIN_PASSWORD
  );
}

export function isAuthed(cookieValue: string | undefined): boolean {
  return adminConfigured() && cookieValue === expectedToken();
}
