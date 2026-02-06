import express from "express";
import cron from "node-cron";
import { assertRequiredConfig, envConfig } from "./config/env.js";
import { startTelegramBotListener } from "./integrations/telegramBot.js";
import { sendAdminLog } from "./integrations/telegramClient.js";
import { runTweetService } from "./services/tweetService.js";

const app = express();
const port = envConfig.port;
const chatId = envConfig.telegram.adminChatId;

// Validate required environment variables
assertRequiredConfig();

// Logging function for consistency
const logMessage = async (message) => {
  const timestamp = new Date().toLocaleString();
  const log = `[${timestamp}] ${message}`;
  console.log(log);

  try {
    await sendAdminLog(chatId, log);
  } catch (error) {
    console.error(`Failed to send log to admin: ${error.message}`);
  }
};

// Scheduling Tweet
cron.schedule("0 9,13,16,20,22 * * *", async () => {
  const startTime = new Date().toLocaleString();
  await logMessage(`Cron job started at: ${startTime}`);

  try {
    await runTweetService();
    const endTime = new Date().toLocaleString();
    await logMessage(`Cron job completed at: ${endTime}`);
  } catch (error) {
    await logMessage(`Cron job failed: ${error.message}`);
    console.error(error); // Log the full error for debugging
  }
});

// Start Telegram bot listener
try {
  startTelegramBotListener();
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
