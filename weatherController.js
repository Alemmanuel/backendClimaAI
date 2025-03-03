const axios = require('axios');
const { getWeatherInfo } = require('./aiController');
const config = require('./config');

const continentMap = {
  "AF": "Africa",
  "AN": "Antarctica",
  "AS": "Asia",
  "EU": "Europe",
  "NA": "North America",
  "OC": "Oceania",
  "SA": "South America"
};

const getContinent = (countryCode) => {
  // This is a simplified example. You might need a more comprehensive mapping.
  const continentCode = countryCode.slice(0, 2).toUpperCase();
  return continentMap[continentCode] || "Unknown";
};

const processWeatherData = async (req, res, next) => {
  try {
    const { city } = req.body;

    if (!city) {
      return res.status(400).json({
        success: false,
        message: "City is required",
      });
    }

    console.log(`Processing weather data for city: ${city}`);

    // Fetch weather data from Weather API
    const weatherResponse = await axios.get(`${config.weather.baseUrl}/current.json`, {
      params: {
        key: config.weather.apiKey,
        q: city,
      },
    });

    if (!weatherResponse.data) {
      throw new Error("Failed to fetch weather data from Weather API");
    }

    const temperature = weatherResponse.data.current.temp_c;
    const feelsLike = weatherResponse.data.current.feelslike_c;
    const country = weatherResponse.data.location.country;
    const countryCode = weatherResponse.data.location.country_code;
    const continent = getContinent(countryCode);

    console.log(`Received weather info: temp=${temperature}, feelsLike=${feelsLike}, country=${country}, continent=${continent}`);

    // Fetch recommendations from AI
    const { recommendation } = await getWeatherInfo(city);

    const emoji = getWeatherEmoji(temperature);

    res.status(200).json({
      success: true,
      data: {
        city,
        country,
        continent,
        temperature,
        feelsLike,
        emoji,
        recommendation,
      },
    });
  } catch (error) {
    console.error("Error in processWeatherData:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while processing the weather data",
      error: error.message,
      stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
    });
  }
};

const getWeatherEmoji = (temperature) => {
  if (temperature < 0) return "❄️"; // Very cold
  if (temperature < 10) return "🥶"; // Cold
  if (temperature < 15) return "😬"; // Quite cold
  if (temperature < 20) return "😐"; // Cool
  if (temperature < 25) return "😊"; // Pleasant
  if (temperature < 30) return "😅"; // Warm
  if (temperature < 35) return "🥵"; // Hot
  return "🔥"; // Very hot
};

module.exports = { processWeatherData };
