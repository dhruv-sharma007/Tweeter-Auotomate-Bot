import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs/promises";
import { envConfig } from "../config/env.js";
import { sendAdminLog } from "../integrations/telegramClient.js";
import { getRandomTechTopic } from "../utils/techTopics.js";

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 1000;

const geminiClient = new GoogleGenerativeAI(envConfig.gemini.apiKey);
const geminiModel = geminiClient.getGenerativeModel({
  model: envConfig.gemini.model
});

const logAiError = (error, context = "") => {
  const errorMessage = `AI Error${context ? ` (${context})` : ""}: ${
    error.message
  }`;
  console.error(errorMessage);
  sendAdminLog(envConfig.telegram.adminChatId, errorMessage);
  throw new Error(errorMessage);
};

const generateGeminiContent = async (prompt, retries = MAX_RETRIES) => {
  try {
    if (!prompt || prompt.length < 10) {
      throw new Error("Prompt is too short or empty");
    }

    const result = await geminiModel.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    if (retries > 0) {
      await new Promise((resolve) => setTimeout(resolve, RETRY_DELAY_MS));
      return generateGeminiContent(prompt, retries - 1);
    }

    logAiError(error, `Prompt: ${prompt.substring(0, 50)}...`);
    return undefined;
  }
};

const generateTweetContent = async (basePrompt) => {
  try {
    const randomTopic = getRandomTechTopic();
    const prompt = `${basePrompt}\n\n${randomTopic}`;
    return await generateGeminiContent(prompt);
  } catch (error) {
    logAiError(error, "generateTweetContent");
    return undefined;
  }
};

const generateChatReply = async (messageText) => {
  try {
    const promptPrefix = await fs.readFile("./query2.txt", {
      encoding: "utf-8"
    });
    const combinedPrompt = `${promptPrefix}${messageText}`;

    if (!combinedPrompt || combinedPrompt.trim().length < 3) {
      throw new Error("Query is too short or empty");
    }

    const result = await geminiModel.generateContent(combinedPrompt);
    const responseText = result.response.text();

    if (!responseText || responseText.trim().length === 0) {
      throw new Error("Empty response from AI");
    }

    return responseText;
  } catch (error) {
    console.error("Error generating chat reply:", error);
    return "🚫 Could not generate response. Please try again later.";
  }
};

export { generateTweetContent, generateChatReply };
