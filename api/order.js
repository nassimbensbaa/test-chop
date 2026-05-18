export default async function handler(req, res) {
  const token = process.env.TELEGRAM_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  const body = req.body;

  const message = `🌟 طلب جديد
👤 ${body.firstName} ${body.lastName}
📞 ${body.phone}
📍 ${body.state}
🚚 ${body.deliveryType}
💰 ${body.total} دج`;

  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: chatId,
      text: message
    })
  });

  res.status(200).json({ ok: true });
}
