import { GoogleGenerativeAI } from "@google/generative-ai";
import getRandomTopic from "./RandomTopic.js";



// Initialize Google Generative AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// Function to generate content from a file path
const generateContentFromGemini = async (query) => {
  try {
    // Read the file content
    

    // Combine the file content with a random topic
    const prompt = query + getRandomTopic();

    // Generate content using the model
    const result = await model.generateContent(prompt);
    const final = result.response.text();

    return final;
  } catch (err) {
    console.error("Error in Ai.js:", err);
    throw err; // Re-throw the error for better debugging
  }
};

export { generateContentFromGemini };