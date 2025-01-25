import express from "express";
import cron from 'node-cron';
import dotenv from "dotenv";
import { TweetService } from "./service/Tweet.Service.js";
import { sendLogToAdmin, defaultBotListen } from './controllers/TgBot.js';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 8927;
const chatId = process.env.CHAT_ID || 6494985368;

// Validate required environment variables

if (!process.env.CHAT_ID) {
  console.error("CHATT_ID environment variable is missing.");
  process.exit(1);
}

// Logging function for consistency
const logMessage = async (message) => {
  const timestamp = new Date().toLocaleString();
  const log = `[${timestamp}] ${message}`;
  console.log(log);

  try {
    await sendLogToAdmin(chatId, log);
  } catch (error) {
    console.error(`Failed to send log to admin: ${error.message}`);
  }
};

// Scheduling Tweet
cron.schedule("0 9,13,16,20,22 * * *", async () => {
  const startTime = new Date().toLocaleString();
  await logMessage(`Cron job started at: ${startTime}`);

  try {
    await TweetService();
    const endTime = new Date().toLocaleString();
    await logMessage(`Cron job completed at: ${endTime}`);
  } catch (error) {
    await logMessage(`Cron job failed: ${error.message}`);
    console.error(error); // Log the full error for debugging
  }
});

// Start Telegram bot listener
try {
  defaultBotListen();
  await logMessage("Telegram bot listener started successfully.");
} catch (error) {
  await logMessage(`Failed to start Telegram bot listener: ${error.message}`);
  console.error(error); // Log the full error for debugging
}

// Start the server
const server = app.listen(port, async () => {
  await logMessage(`Server is running on port ${port}`);
});

app.get('/',(req, res)=>{
  res.status(200).send("Ok")
})

// Graceful shutdown
process.on('SIGTERM', async () => {
  await logMessage('SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    logMessage('Server closed.');

    process.exit(0);
  });
});

process.on('SIGINT', async () => {
  await logMessage('SIGINT received. Shutting down gracefully...');
  server.close(() => {
    logMessage('Server closed.');
    process.exit(0);
  });
});

// Error handling for uncaught exceptions
process.on('uncaughtException', async (error) => {
  await logMessage(`Uncaught Exception: ${error.message}`);
  console.error(error); // Log the full error for debugging
  process.exit(1); // Exit with failure
});

// Error handling for unhandled promise rejections
process.on('unhandledRejection', async (reason, promise) => {
  await logMessage(`Unhandled Rejection at: ${promise}, reason: ${reason}`);
  console.error(reason); // Log the full reason for debugging
  process.exit(1); // Exit with failure
});

