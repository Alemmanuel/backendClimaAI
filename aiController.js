const axios = require('axios');
const config = require('./config');

const getWeatherInfo = async (city) => {
  try {
    console.log(`Attempting to get weather info for city: ${city}`);

    if (!config.deepSeek.apiKey) {
      throw new Error("DeepSeek API key is not set");
    }

    console.log(`DeepSeek API URL: ${config.deepSeek.baseUrl}`);
    console.log(`DeepSeek API Key (first 5 chars): ${config.deepSeek.apiKey.substring(0, 5)}...`);

    const prompt = `Given the city ${city}, please provide:
1. A realistic current temperature in Celsius.
2. A realistic feels-like temperature in Celsius, considering factors like humidity, wind, or solar radiation.
3. A brief weather recommendation and advice for what to wear or activities suitable for this weather.
Format the response as JSON with keys "temperature", "feelsLike", and "recommendation".`;

    console.log("Sending request to DeepSeek API...");
    const response = await axios.post(
      `${config.deepSeek.baseUrl}/v1/chat/completions`,
      {
        model: config.deepSeek.model,
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        max_tokens: 100,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${config.deepSeek.apiKey}`,
        },
      }
    );

    console.log("Received response from DeepSeek API");
    console.log("Response data:", JSON.stringify(response.data, null, 2));

    if (!response.data || !response.data.choices || response.data.choices.length === 0) {
      throw new Error("Unexpected response format from DeepSeek API");
    }

    let content = response.data.choices[0].message.content.trim();
    console.log("Raw content from API:", content);

    // Clean code delimiters in Markdown format
    if (content.startsWith("```json")) {
      content = content.slice(7, -3).trim();
    }

    let jsonResponse;
    try {
      jsonResponse = JSON.parse(content);
    } catch (parseError) {
      console.error("Error parsing JSON response:", parseError);
      throw new Error("Unable to parse response from DeepSeek API");
    }

    console.log("Parsed JSON response:", jsonResponse);

    if (!jsonResponse.temperature || !jsonResponse.feelsLike || !jsonResponse.recommendation) {
      throw new Error("Missing temperature, feels-like, or recommendation in API response");
    }

    return {
      temperature: Number.parseFloat(jsonResponse.temperature),
      feelsLike: Number.parseFloat(jsonResponse.feelsLike),
      recommendation: jsonResponse.recommendation,
    };
  } catch (error) {
    console.error("Error getting AI weather info:", error);
    if (error.response) {
      console.error("Error response data:", error.response.data);
      console.error("Error response status:", error.response.status);
      console.error("Error response headers:", error.response.headers);
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error setting up request:", error.message);
    }
    throw new Error(`Unable to get weather information: ${error.message}`);
  }
};

module.exports = { getWeatherInfo };
