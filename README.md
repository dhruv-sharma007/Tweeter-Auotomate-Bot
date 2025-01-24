# Twitter Bot with Node.js and Gemini AI

A Twitter bot that generates and posts tweets using Google's Gemini AI and the X (Twitter) API. Reads input from a text file and posts processed content automatically.

---


## Introduction

This bot automates the process of generating and posting tweets, combining Google's Gemini AI capabilities with the X (Twitter) API. It reads prompts from a text file, generates tweet content, and posts it seamlessly.

---

## Features

- **AI-Powered Tweets**: Uses Google's Gemini AI to generate engaging tweets.
- **X (Twitter) Integration**: Posts tweets via the X API v2.
- **Secure Configuration**: Stores sensitive credentials in a `.env` file.
- **File Input**: Reads prompts from a customizable `query.txt`.

---

## Prerequisites

Ensure the following are installed or available before proceeding:

- **Node.js**: Version 16 or later
- **X (Twitter) Developer Account**: For API access
- **Google Gemini API Key**: To use Gemini's AI capabilities
- **Git**: For repository management

---

## Setup

### 1. Clone Repository

```bash
git clone https://github.com/your-username/twitter-bot.git
cd twitter-bot
```

### 2. Install Dependencies
```bash
npm install
```
### 3. Configure Environment
- Create a `.env` file in the project’s root directory and add the following:

```bash
API_KEY=your_twitter_api_key
API_SECRET_KEY=your_twitter_api_secret
ACCESS_TOKEN=your_twitter_access_token
ACCESS_TOKEN_SECRET=your_twitter_access_secret
GEMINI_API=your_gemini_api_key
```
### 4. Add Query File
- Create a src/query.txt file with your desired prompt:


## Start the bot by running:

```bash
npm run dev
```

# Process
- Reads input from query.txt.
- Generates tweet content using Gemini AI.
- Posts the tweet to X (Twitter).
## Commands
### Command	Description
- npm run dev Runs the bot in development mode


# Key Dependencies
This project uses the following key libraries:

- twitter-api-v2: Client for X (Twitter) API v2
- @google/generative-ai: Integration with - Google's Gemini AI
- dotenv: To manage environment variables securely
---
## Troubleshooting

Contribution
We welcome contributions! Follow these steps:


