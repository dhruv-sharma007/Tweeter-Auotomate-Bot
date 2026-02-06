import { TwitterApi } from "twitter-api-v2";
import { envConfig } from "../config/env.js";

const twitterClient = new TwitterApi({
  appKey: envConfig.twitter.apiKey,
  appSecret: envConfig.twitter.apiSecret,
  accessToken: envConfig.twitter.accessToken,
  accessSecret: envConfig.twitter.accessSecret
});

const postTweet = async (tweetText) => {
  try {
    const response = await twitterClient.v2.tweet(tweetText);
    console.log("Tweet posted successfully:", response.data.text);
  } catch (error) {
    console.error("Error posting tweet:", error);
  }
};

export { postTweet };
