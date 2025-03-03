const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const config = {
  deepSeek: {
    apiKey: process.env.DEEPSEEK_API_KEY || 'sk-5dff92c381d8431bba1416eedc151283',
    baseUrl: "https://api.deepseek.com",
    model: "deepseek-chat", // Model you want to use
  },
  weather: {
    apiKey: process.env.WEATHER_API_KEY || 'c0a5190ab4714aa992c125521250303',
    baseUrl: "http://api.weatherapi.com/v1", // Corregir la URL base
  },
};

if (!config.deepSeek.apiKey) {
  console.error("DEEPSEEK_API_KEY is not set in the environment variables");
} else {
  console.log(`DEEPSEEK_API_KEY is set: ${config.deepSeek.apiKey.substring(0, 5)}...`);
}

if (!config.weather.apiKey) {
  console.error("WEATHER_API_KEY is not set in the environment variables");
} else {
  console.log(`WEATHER_API_KEY is set: ${config.weather.apiKey.substring(0, 5)}...`);
}

module.exports = config;
