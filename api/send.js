export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      ok: false,
      message: "Only POST allowed"
    });
  }

  try {
    const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;
    const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    const { message } = req.body;

    const text = `
📩 رسالة جديدة من الموقع
━━━━━━━━━━━━━━
${message}
━━━━━━━━━━━━━━
`;

    const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;

    const telegramRes = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: text
      })
    });

    const data = await telegramRes.json();

    return res.status(200).json(data);

  } catch (error) {
    return res.status(500).json({
      ok: false,
      error: error.message
    });
  }
}
