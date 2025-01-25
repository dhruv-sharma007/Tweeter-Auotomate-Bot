import { GoogleGenerativeAI } from "@google/generative-ai";
import getRandomTopic from "./RandomTopic.js";
import { sendLogToAdmin } from "./TgBot.js";
import fs from "fs/promises";

// Configuration
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 2 seconds

// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API);
const model = genAI.getGenerativeModel({ 
    model: process.env.GEMINI_MODEL || "gemini-1.5-flash"
});

// Common error handler
const handleAIError = (error, context = "") => {
    const errorMessage = `AI Error${context ? ` (${context})` : ""}: ${error.message}`;
    console.error(errorMessage);
    sendLogToAdmin(process.env.CHAT_ID, errorMessage);
    throw new Error(errorMessage);
};

// Core content generation logic
const generateContent = async (prompt, retries = MAX_RETRIES) => {
    try {
        if (!prompt || prompt.length < 10) {
            throw new Error("Prompt is too short or empty");
        }

        const result = await model.generateContent(prompt);
        return result.response.text();
    } catch (error) {
        if (retries > 0) {
            await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
            return generateContent(prompt, retries - 1);
        }
        handleAIError(error, `Prompt: ${prompt.substring(0, 50)}...`);
    }
};

// Main content generation function
const generateContentFromGemini = async (baseQuery) => {
    try {
        const randomTopic = getRandomTopic();
        const prompt = `${baseQuery}\n\n${randomTopic}`;
        return await generateContent(prompt);
    } catch (error) {
        handleAIError(error, "generateContentFromGemini");
    }
};

// Interactive conversation function
const TalkToAi = async (data) => {
  try {
    const filepath = "./query2.txt";
    const qu = await fs.readFile(filepath, { encoding: "utf-8" });
    const query = qu + data;

    // Validate input
    if (!query || query.trim().length < 3) {
      throw new Error("Query is too short or empty");
    }

    const result = await model.generateContent(query);
    const final = result.response.text();

    // Validate AI response
    if (!final || final.trim().length === 0) {
      throw new Error("Empty response from AI");
    }

    return final;

  } catch (error) {
    console.error("Error in TalkToAi:", error);
    return "🚫 Could not generate response. Please try again later.";
  }
};

export { 
  generateContentFromGemini, 
  TalkToAi 
};