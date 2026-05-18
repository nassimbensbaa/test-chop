export default async function handler(req, res) {

  if (req.method !== "POST") {
    return res.status(405).json({
      ok: false
    });
  }

  try {

    const BOT_TOKEN = process.env.BOT_TOKEN;
    const CHAT_ID = process.env.CHAT_ID;

    const { message } = req.body;

    const telegram = await fetch(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: message
        })
      }
    );

    const data = await telegram.json();

    return res.status(200).json(data);

  } catch (err) {

    return res.status(500).json({
      ok: false,
      error: err.message
    });

  }

}
