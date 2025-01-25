import TelegramBot from "node-telegram-bot-api";
import { TalkToAi } from "./Ai.js";

// Replace with your bot token from BotFather
const token = process.env.TELEGRAM_TOKEN;

// Create a new bot instance
const bot = new TelegramBot(token, { polling: true });
let aiResponse;
const defaultBotListen = () => {
	bot.on("message", async (msg) => {
		const chatId = msg.chat.id;
		const text = msg.text || "";
		const user = msg.from.username || msg.from.first_name;

		try {
			if (text === "/start") {
				await bot.sendMessage(chatId, "Your Server Is Running");
			} else {
				// Get AI response with fallback
				aiResponse = await TalkToAi(text);
				const safeResponse =
					aiResponse || "🤖 I'm having trouble responding right now.";

				await bot.sendMessage(chatId, safeResponse);
			}
		} catch (error) {
			console.error("Message handling error:", error);
			await bot.sendMessage(
				chatId,
				"⚠️ Oops! Something went wrong. Try again later."
			);
		}

		console.log(`Message From ${user} | ChatId: ${chatId} | MSG: ${text}`);
        sendLogToAdmin(7139225627, `Message From ${user} | ChatId: ${chatId}\n  MSG: ${text}\n Ai response: ${aiResponse} `)
	});
};

const sendLogToAdmin = (chatId, logMessage) => {
	try {
		bot.sendMessage(chatId, logMessage);
	} catch (error) {
		console.log(
			`error in sending message Function: sendLogToAdmin \n Error: ${error}`
		);
	}
};

export { sendLogToAdmin, defaultBotListen, bot };
