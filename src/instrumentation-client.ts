import { initBotId } from "botid/client/core";

// Vercel BotID: invisible challenge mounted on the client. Only the high-value,
// low-volume POST endpoints are protected so real users never see friction and
// Deep Analysis billing stays tied to the lead form + the LLM-backed chat.
// High-volume visit logging (/api/track) is intentionally NOT protected here —
// it is classified with a cheap server-side heuristic instead (see lib/bots).
initBotId({
  protect: [
    { path: "/api/contact", method: "POST" },
    { path: "/api/chat", method: "POST" },
  ],
});
