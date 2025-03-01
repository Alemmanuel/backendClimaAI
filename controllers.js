const axios = require('axios');
const config = require('./config');

// Función para determinar el emoji según la temperatura
const getEmoji = (temp) => {
  if (temp < 10) return '❄️';         // Frío
  else if (temp > 30) return '🔥';     // Calor
  else return '🌤️';                   // Clima templado
};

// Controlador para obtener recomendaciones y emoji a partir de la temperatura
const getRecommendations = async (req, res) => {
  const { temperature } = req.query;

  if (!temperature) {
    return res.status(400).json({ error: 'Se requiere el parámetro "temperature".' });
  }

  const tempValue = parseFloat(temperature);
  if (isNaN(tempValue)) {
    return res.status(400).json({ error: 'El parámetro "temperature" debe ser un número.' });
  }

  try {
    console.log('Enviando solicitud a DeepSeek con temperatura:', tempValue);

    // Llamada a DeepSeek pasando la temperatura
    const prompt = `Given the temperature ${tempValue}, please provide:
1. A short weather recommendation and advice for what to wear or activities suitable for this weather.
Format the response as JSON with keys "recommendations".`;

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
        max_tokens: 200,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${config.deepSeek.apiKey}`,
        },
      }
    );

    console.log('Respuesta de DeepSeek:', response.data);

    if (!response.data || !response.data.choices || response.data.choices.length === 0) {
      throw new Error('Respuesta inválida de DeepSeek');
    }

    let content = response.data.choices[0].message.content.trim();
    console.log("Raw content from API:", content);

    // Limpiar delimitadores de código en formato Markdown
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

    if (!jsonResponse.recommendations) {
      throw new Error("Missing recommendations in API response");
    }

    const recommendations = jsonResponse.recommendations;
    const emoji = getEmoji(tempValue);

    return res.json({
      temperature: tempValue,
      recommendations,
      emoji
    });
  } catch (error) {
    console.error('Error al obtener recomendaciones:', error.message);
    if (error.response) {
      console.error("Error response data:", error.response.data);
      console.error("Error response status:", error.response.status);
      console.error("Error response headers:", error.response.headers);
    } else if (error.request) {
      console.error("No response received:", error.request);
    } else {
      console.error("Error setting up request:", error.message);
    }
    return res.status(500).json({ error: 'Error al obtener recomendaciones de DeepSeek.' });
  }
};

module.exports = { getRecommendations };
