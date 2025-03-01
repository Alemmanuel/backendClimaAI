const { getWeatherInfo } = require('./aiController');

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

    const { temperature, feelsLike, recommendation } = await getWeatherInfo(city);

    console.log(`Received weather info: temp=${temperature}, feelsLike=${feelsLike}, recommendation=${recommendation}`);

    const emoji = getWeatherEmoji(temperature);

    res.status(200).json({
      success: true,
      data: {
        city,
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
