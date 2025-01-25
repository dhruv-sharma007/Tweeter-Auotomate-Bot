import cron from 'node-cron'
import dotenv from "dotenv";
dotenv.config(); 

import { TweetService } from "./service/Tweet.Service.js"
import { sendLogToAdmin, defaultBotListen } from './controllers/TgBot.js';

const chatId = process.env.CHATT_ID || 6494985368


//Sheduling Tweet

cron.schedule("0 9,13,16,20,22 * * *", async () => {

  const log =  `Cron job started at:, ${new Date().toLocaleString()}`
  const log2 = `Cron job completed at:, ${new Date().toLocaleString()}`

  console.log(log);
  sendLogToAdmin(chatId, log)
  
  try {
    await TweetService();
    console.log(log2);
    sendLogToAdmin(chatId, log2)
    
  } catch (error) {
    console.error("Cron job failed:", error);
    sendLogToAdmin(chatId, "Cron job failed:", error)
  }
});

defaultBotListen()