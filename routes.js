const express = require('express');
const path = require('path');
const router = express.Router();
const { getRecommendations } = require('./controllers');
const { processWeatherData } = require('./weatherController');

router.use(express.json());

router.get('/recommendations', getRecommendations);

router.post('/weather', processWeatherData);

router.use(express.static(path.join(__dirname, '../frontend')));

module.exports = router;
