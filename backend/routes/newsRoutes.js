const express = require('express');
const router = express.Router();
const { fetchAndClassifyNews, getAnalytics } = require('../controllers/newsController');


// GET /api/news
router.get('/', fetchAndClassifyNews);
router.get('/analytics', getAnalytics);

module.exports = router;
