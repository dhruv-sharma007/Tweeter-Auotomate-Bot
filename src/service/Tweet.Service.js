import { generateContentFromGemini } from "../controllers/Ai.js";
import { postTweet } from "../controllers/tweet.js";
import { sendLogToAdmin } from "../controllers/TgBot.js";
import fs from "fs/promises";

const chatId = process.env.CHATT_ID || 6494985368;

const TweetService = async () => {
	try {
		const filepath = "./query.txt";

		const query = await fs.readFile(filepath, { encoding: "utf-8" });
		console.log("QUERY:", query);

		const tweet = await generateContentFromGemini(query);
		console.log("Generated tweet:", tweet);

		try {
			const successLogMessage = `✅ Tweet posted successfully!\n\nTweet Content: ${tweet}`;

			await postTweet(tweet);
			sendLogToAdmin(chatId, successLogMessage);
			console.log(`✅ Tweet posted successfully!`);
		} catch (error) {
			const failedLogMessage = `❌ Error posting tweet:\n${error}`;
			console.log(`❌ Error posting tweet!`);
			sendLogToAdmin(chatId, failedLogMessage);
		}
	} catch (error) {
		console.error("Error in main function:", error);
	}
};

export { TweetService };
