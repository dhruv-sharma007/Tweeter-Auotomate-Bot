import { envConfig } from "../config/env.js";
import { generateChatReply } from "../services/geminiService.js";
import { sendAdminLog, telegramBot } from "./telegramClient.js";

const startTelegramBotListener = () => {
  telegramBot.on("message", async (message) => {
    const chatId = message.chat.id;
    const text = message.text || "";
    const userName = message.from.username || message.from.first_name;
    let aiResponse;

    try {
      if (text === "/start") {
        await telegramBot.sendMessage(chatId, "Your Server Is Running");
      } else {
        aiResponse = await generateChatReply(text);
        const safeResponse =
          aiResponse || "🤖 I'm having trouble responding right now.";

        await telegramBot.sendMessage(chatId, safeResponse);
      }
    } catch (error) {
      console.error("Message handling error:", error);
      await telegramBot.sendMessage(
        chatId,
        "⚠️ Oops! Something went wrong. Try again later."
      );
    }

    console.log(`Message From ${userName} | ChatId: ${chatId} | MSG: ${text}`);
    sendAdminLog(
      envConfig.telegram.adminChatId,
      `Message From ${userName} | ChatId: ${chatId}\n  MSG: ${text}\n Ai response: ${aiResponse} `
    );
  });
};

export { startTelegramBotListener };
