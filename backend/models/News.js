const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
  title: String,
  summary: String,
  source: String,
  publishedAt: Date,
  tag: String,
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 60 * 60 * 24 * 7 // 7 days in seconds
  }
});

module.exports = mongoose.model('News', newsSchema);
