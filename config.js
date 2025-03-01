const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const config = {
  deepSeek: {
    apiKey: process.env.DEEPSEEK_API_KEY || 'sk-5dff92c381d8431bba1416eedc151283', // DeepSeek API key
    baseUrl: "https://api.deepseek.com",
    model: "deepseek-chat", // Model you want to use
  },
};

if (!config.deepSeek.apiKey) {
  console.error("DEEPSEEK_API_KEY is not set in the environment variables");
} else {
  console.log(`DEEPSEEK_API_KEY is set: ${config.deepSeek.apiKey.substring(0, 5)}...`);
}

module.exports = config;
