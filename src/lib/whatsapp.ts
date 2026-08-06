// Sends a WhatsApp message to the owner's number via CallMeBot (free).
// Setup: WhatsApp the CallMeBot number to get an API key, then set
// WHATSAPP_NOTIFY_PHONE (e.g. +14704612213) and CALLMEBOT_APIKEY.
// No-op until both are configured.
const phone = process.env.WHATSAPP_NOTIFY_PHONE;
const apikey = process.env.CALLMEBOT_APIKEY;

export async function notifyOwnerWhatsApp(text: string): Promise<void> {
  if (!phone || !apikey) return;
  try {
    const url =
      `https://api.callmebot.com/whatsapp.php?phone=${encodeURIComponent(phone)}` +
      `&text=${encodeURIComponent(text)}&apikey=${encodeURIComponent(apikey)}`;
    await fetch(url);
  } catch {
    // best-effort
  }
}
