import dotenv from "dotenv";

dotenv.config();

const DEFAULT_PORT = 8927;
const DEFAULT_ADMIN_CHAT_ID = 6494985368;

const getEnvValue = (primaryKey, fallbackKeys = []) => {
  if (process.env[primaryKey]) {
    return process.env[primaryKey];
  }

  for (const fallbackKey of fallbackKeys) {
    if (process.env[fallbackKey]) {
      return process.env[fallbackKey];
    }
  }

  return undefined;
};

const parseOptionalNumber = (value, fallback) => {
  if (value === undefined || value === null || value === "") {
    return fallback;
  }

  const parsed = Number(value);
  return Number.isNaN(parsed) ? fallback : parsed;
};

const envConfig = {
  port: parseOptionalNumber(process.env.PORT, DEFAULT_PORT),
  telegram: {
    botToken: getEnvValue("TELEGRAM_BOT_TOKEN", ["TELEGRAM_TOKEN"]),
    adminChatId: parseOptionalNumber(
      getEnvValue("TELEGRAM_ADMIN_CHAT_ID", ["CHAT_ID", "CHATT_ID"]),
      DEFAULT_ADMIN_CHAT_ID
    )
  },
  gemini: {
    apiKey: getEnvValue("GEMINI_API_KEY", ["GEMINI_API"]),
    model: process.env.GEMINI_MODEL || "gemini-1.5-flash"
  },
  twitter: {
    apiKey: getEnvValue("TWITTER_API_KEY", ["API_KEY"]),
    apiSecret: getEnvValue("TWITTER_API_SECRET", ["API_SECRET_KEY"]),
    accessToken: getEnvValue("TWITTER_ACCESS_TOKEN", ["ACCESS_TOKEN"]),
    accessSecret: getEnvValue("TWITTER_ACCESS_SECRET", ["ACCESS_TOKEN_SECRET"])
  }
};

const assertRequiredConfig = () => {
  const hasAdminChatEnv =
    process.env.TELEGRAM_ADMIN_CHAT_ID ||
    process.env.CHAT_ID ||
    process.env.CHATT_ID;

  if (!hasAdminChatEnv) {
    console.error("TELEGRAM_ADMIN_CHAT_ID environment variable is missing.");
    process.exit(1);
  }
};

export { envConfig, assertRequiredConfig };
