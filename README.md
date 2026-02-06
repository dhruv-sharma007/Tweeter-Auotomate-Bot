# Twitter Bot with Node.js and Gemini AI

Generate and post tweets using Google's Gemini AI and the X (Twitter) API. The bot reads prompts from a text file, drafts a tweet, and publishes it automatically.

---

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [Usage](#usage)
- [How It Works](#how-it-works)
- [Commands](#commands)
- [Key Dependencies](#key-dependencies)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)

---

## Features

- **AI-powered drafts** with Google's Gemini AI.
- **X (Twitter) API v2 integration** for publishing tweets.
- **Environment-based configuration** via `.env`.
- **Simple file input** using `query.txt`.

---

## Prerequisites

- **Node.js**: 16+ recommended
- **X (Twitter) Developer Account**: API keys and tokens
- **Google Gemini API Key**
- **Git** (optional, for cloning)

---

## Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/twitter-bot.git
   cd twitter-bot
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env` file in the project root:

   ```bash
   TWITTER_API_KEY=your_twitter_api_key
   TWITTER_API_SECRET=your_twitter_api_secret
   TWITTER_ACCESS_TOKEN=your_twitter_access_token
   TWITTER_ACCESS_SECRET=your_twitter_access_secret
   GEMINI_API_KEY=your_gemini_api_key
   TELEGRAM_BOT_TOKEN=your_telegram_bot_token
   TELEGRAM_ADMIN_CHAT_ID=your_admin_chat_id
   ```

4. **Add a prompt**

   Create `query.txt` in the project root and add a prompt, for example:

   ```text
   Write a short, friendly tweet about learning Node.js.
   ```

---

## Usage

Start the bot:

```bash
npm run dev
```

---

## How It Works

1. Reads the prompt from `query.txt`.
2. Sends the prompt to Gemini AI to generate tweet content.
3. Publishes the tweet via the X API.

---

## Commands

| Command       | Description                     |
| ------------- | ------------------------------- |
| `npm run dev` | Run the bot in development mode |

---

## Key Dependencies

- **twitter-api-v2**: X (Twitter) API v2 client.
- **@google/generative-ai**: Gemini AI SDK.
- **dotenv**: Environment variable management.
- **node-cron**: Optional scheduling utilities.

---

## Troubleshooting

- Ensure your `.env` file is present and populated.
- Confirm that your X API keys and tokens have write permissions.
- Verify `query.txt` exists and contains a prompt.

---

## Contributing

1. Fork the repo and create a branch.
2. Make your changes and add tests if needed.
3. Open a pull request with a clear description.
