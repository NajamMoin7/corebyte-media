import { cookies } from "next/headers";
import { ADMIN_COOKIE, checkPassword, expectedToken, adminConfigured } from "@/lib/admin";

export const runtime = "nodejs";

export async function POST(req: Request) {
  if (!adminConfigured()) {
    return Response.json(
      { error: "Admin is not configured. Set ADMIN_PASSWORD." },
      { status: 503 },
    );
  }

  let body: { password?: string };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }

  if (!checkPassword(body.password)) {
    return Response.json({ error: "Wrong password." }, { status: 401 });
  }

  const jar = await cookies();
  jar.set(ADMIN_COOKIE, expectedToken(), {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
  return Response.json({ ok: true });
}
