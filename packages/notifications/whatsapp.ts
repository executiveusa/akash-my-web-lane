import "server-only";

const PHONE_ID = process.env.WHATSAPP_PHONE_NUMBER_ID ?? "";
const TOKEN = process.env.WHATSAPP_ACCESS_TOKEN ?? "";

export async function sendWhatsApp(to: string, text: string): Promise<boolean> {
  if (!PHONE_ID || !TOKEN) return false;
  const res = await fetch(
    `https://graph.facebook.com/v18.0/${PHONE_ID}/messages`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messaging_product: "whatsapp",
        to: to.replace(/\D/g, ""),
        type: "text",
        text: { body: text },
      }),
    }
  );
  return res.ok;
}

export async function notifyClientSiteLive({
  phone,
  clientName,
  siteUrl,
  adminUrl,
  language = "en",
}: {
  phone: string;
  clientName: string;
  siteUrl: string;
  adminUrl: string;
  language?: string;
}) {
  const msgs: Record<string, string> = {
    en: `Hi ${clientName}! 🎉\n\nYour new site is live!\n\n🌐 ${siteUrl}\n⚙️ Admin: ${adminUrl}\n\nExport your data anytime from the admin panel. Any questions? Just reply here! ✅`,
    hi: `Namaste ${clientName} ji! 🎉\n\nAapki nayi website live ho gayi hai!\n\n🌐 ${siteUrl}\n⚙️ Admin: ${adminUrl}\n\nApna data export karne ke liye admin panel mein jaayein. 🙏`,
    es: `¡Hola ${clientName}! 🎉\n\n¡Tu nuevo sitio está en vivo!\n\n🌐 ${siteUrl}\n⚙️ Admin: ${adminUrl}\n\n¡Cualquier pregunta, responde aquí! 🌅`,
  };
  return sendWhatsApp(phone, msgs[language] ?? msgs.en);
}

export async function notifyOwnerDailySummary({
  phone,
  migrationsCompleted,
  avgUdec,
  avgLighthouse,
  revenueInr,
  failures,
  leadsInPipeline,
}: {
  phone: string;
  migrationsCompleted: number;
  avgUdec: number;
  avgLighthouse: number;
  revenueInr: number;
  failures: number;
  leadsInPipeline: number;
}) {
  const msg =
    `📊 Akash Engine — Daily Summary\n\n` +
    `✅ Migrations: ${migrationsCompleted}\n` +
    `🎯 Avg UDEC: ${avgUdec.toFixed(1)}/10\n` +
    `⚡ Avg Lighthouse: ${avgLighthouse.toFixed(0)}/100\n` +
    `💰 Revenue: ₹${revenueInr.toLocaleString("en-IN")}\n` +
    `❌ Failures: ${failures}\n` +
    `🔍 Leads in pipeline: ${leadsInPipeline}\n\n` +
    (failures > 0
      ? "🚨 Check dashboard — failures need review!"
      : "💚 All systems nominal!");
  return sendWhatsApp(phone, msg);
}
