import TelegramBot from "node-telegram-bot-api";
import { envConfig } from "../config/env.js";

const telegramBot = new TelegramBot(envConfig.telegram.botToken, {
  polling: true
});

const sendAdminLog = (chatId, logMessage) => {
  try {
    telegramBot.sendMessage(chatId, logMessage);
  } catch (error) {
    console.log(
      `error in sending message Function: sendAdminLog \n Error: ${error}`
    );
  }
};

export { telegramBot, sendAdminLog };
