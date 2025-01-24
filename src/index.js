import dotenv from "dotenv";
import { generateContentFromGemini } from "./controllers/Ai.js";
import { postTweet } from "./controllers/tweet.js";
import fs from "fs/promises"; 


dotenv.config(
  { path: "./.env" }
); 

async function main() {
  try {

    const filepath = "./src/query.txt"; 

    const query = await fs.readFile(filepath, { encoding: "utf-8" });
    console.log("QUERY:", query);

    const tweet = await generateContentFromGemini(query); 
    console.log("Generated tweet:", tweet);

      await postTweet(tweet);
  } catch (error) {
    console.error("Error in main function:", error);
  }
}


main();