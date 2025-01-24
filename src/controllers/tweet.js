import { TwitterApi } from "twitter-api-v2";



const client = new TwitterApi({
  appKey: process.env.API_KEY,
  appSecret: process.env.API_SECRET_KEY,
  accessToken: process.env.ACCESS_TOKEN,
  accessSecret: process.env.ACCESS_TOKEN_SECRET,
});

// Function to post a tweet
export async function postTweet(tweetText) {
  try {
    // Send the tweet
    const response = await client.v2.tweet(tweetText);
    console.log("Tweet posted successfully:", response.data.text);
  } catch (error) {
    console.error("Error posting tweet:", error);
  }
}


