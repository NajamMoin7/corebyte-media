import type { NextConfig } from "next";
import { withBotId } from "botid/next/config";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "picsum.photos" },
      { protocol: "https", hostname: "fastly.picsum.photos" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "cdn.simpleicons.org" },
    ],
  },
};

// withBotId injects the proxy rewrites BotID needs so ad-blockers and third-
// party scripts can't weaken the invisible challenge.
export default withBotId(nextConfig);
