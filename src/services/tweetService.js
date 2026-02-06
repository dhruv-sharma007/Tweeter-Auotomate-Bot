import fs from "fs/promises";
import { envConfig } from "../config/env.js";
import { generateTweetContent } from "./geminiService.js";
import { postTweet } from "../integrations/twitterClient.js";
import { sendAdminLog } from "../integrations/telegramClient.js";

const runTweetService = async () => {
  try {
    const prompt = await fs.readFile("./query.txt", { encoding: "utf-8" });
    console.log("QUERY:", prompt);

    const tweetText = await generateTweetContent(prompt);
    console.log("Generated tweet:", tweetText);

    try {
      const successLogMessage = `✅ Tweet posted successfully!\n\nTweet Content: ${tweetText}`;

      await postTweet(tweetText);
      sendAdminLog(envConfig.telegram.adminChatId, successLogMessage);
      console.log("✅ Tweet posted successfully!");
    } catch (error) {
      const failedLogMessage = `❌ Error posting tweet:\n${error}`;
      console.log("❌ Error posting tweet!");
      sendAdminLog(envConfig.telegram.adminChatId, failedLogMessage);
    }
  } catch (error) {
    console.error("Error in main function:", error);
  }
};

export { runTweetService };
