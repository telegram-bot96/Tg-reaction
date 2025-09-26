import express from "express";
import TelegramBot from "node-telegram-bot-api";

const app = express();
app.use(express.json());

// Replace with your bot token
const TOKEN = process.env.BOT_TOKEN;
const bot = new TelegramBot(TOKEN, { polling: false });

// Clean reaction list (without 🤡🤬💩🖕)
const REACTIONS = [
  "⭐️","❤️","👋","😘","👏","🤔","🤯","🥴","😭","😱","👍","👎",
  "🍌","🍓","🥂","🫶","🙏","🔥","🎉","🤣","😎","👀","😐","😢",
  "🥳","😏","😇","👻","🎃","🎄","☃️","🗿","😬","🐳","👌","💀",
  "🙃","😶‍🌫️","🤨","🤫","🫡","😏","🙄","🤝","😈","💯","⚡",
  "😴","😋"
];

// Webhook endpoint
app.post(`/webhook/${TOKEN}`, async (req, res) => {
  const update = req.body;

  if (update.message) {
    const chatId = update.message.chat.id;
    const messageId = update.message.message_id;

    // Pick 1–3 random reactions
    const count = Math.floor(Math.random() * 3) + 1;
    const shuffled = [...REACTIONS].sort(() => 0.5 - Math.random());
    const chosen = shuffled.slice(0, count);

    for (let emoji of chosen) {
      await bot.setMessageReaction(chatId, messageId, { emoji });
    }
  }

  res.sendStatus(200);
});

// Default route
app.get("/", (req, res) => {
  res.send("Telegram Reaction Bot is running ✅");
});

// Start server (for Vercel, ignore port)
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
