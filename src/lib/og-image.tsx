import { ImageResponse } from "next/og";
import { join } from "node:path";
import { readFile } from "node:fs/promises";

// Shared renderer for the site-wide Open Graph / Twitter share image.
// Brand: black base (#0a0908) + gold accent (#e8c26a), gold logo lockup.
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function renderOgImage() {
  // Full lockup (mark + wordmark) rather than the bare mark: a share card is
  // the one place the brand name has to read on its own.
  const logo = await readFile(
    join(process.cwd(), "public", "logo-full.png"),
    "base64"
  );
  const logoSrc = `data:image/png;base64,${logo}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#0a0908",
          backgroundImage:
            "radial-gradient(110% 90% at 18% 22%, rgba(232,194,106,0.30), transparent 60%), radial-gradient(90% 80% at 85% 92%, rgba(201,162,39,0.24), transparent 65%)",
        }}
      >
        {/* logo-full.png is 949x738; keep that ratio so the lockup isn't squashed */}
        <img src={logoSrc} width={520} height={404} />
        <div
          style={{
            display: "flex",
            marginTop: 16,
            fontSize: 32,
            color: "#a8a294",
            letterSpacing: 2,
          }}
        >
          Logos · Web Development · AI Agents
        </div>
      </div>
    ),
    { ...size }
  );
}
