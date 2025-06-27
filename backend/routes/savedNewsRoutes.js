const express = require('express');
const router = express.Router();
const News = require('../models/News');

router.get('/', async (req, res) => {
  try {
    const { tag } = req.query;

    let filter = {};
    if (tag && tag !== 'All') {
      filter.tag = tag;
    }

    const articles = await News.find(filter).sort({ publishedAt: -1 }).limit(50);
    res.status(200).json({ success: true, articles });
  } catch (error) {
    console.error("Error fetching saved news:", error.message);
    res.status(500).json({ success: false, error: "Server error" });
  }
});

module.exports = router;
