const axios = require('axios');
const News = require('../models/News');

// Hugging Face classifier with descriptive labels
const classifyWithHuggingFace = async (text) => {
  try {
    const response = await axios.post(
      'https://api-inference.huggingface.co/models/facebook/bart-large-mnli',
      {
        inputs: text,
        parameters: {
          candidate_labels: [
            "Cybersecurity incident affecting supply chains",
            "Natural disaster disrupting transportation or goods",
            "Product or material shortage causing supply chain delays",
            "Delays in shipment or logistics",
            "Increase in product prices affecting supply chain"
          ],
          hypothesis_template: "This article is about {}."
        }
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`
        }
      }
    );

    return response.data.labels[0];
  } catch (error) {
    console.error("Classification failed:", error.message);
    return "General";
  }
};

// Fetch news, classify, save to DB
const fetchAndClassifyNews = async (req, res) => {
  try {
    const response = await axios.get('https://newsapi.org/v2/everything', {
      params: {
        q: "supply chain",
        language: "en",
        sortBy: "publishedAt",
        pageSize: 10,
        apiKey: process.env.NEWS_API_KEY
      }
    });

    const articles = await Promise.all(
      response.data.articles.map(async (article) => {
        const combinedText = `${article.title} ${article.description || ''}`;
        const tag = await classifyWithHuggingFace(combinedText);

        const simplifiedArticle = {
          title: article.title,
          summary: article.description,
          source: article.source.name,
          publishedAt: article.publishedAt,
          tag
        };

        // Only save if not already in DB and not "General"
        const exists = await News.findOne({
          title: simplifiedArticle.title,
          publishedAt: simplifiedArticle.publishedAt
        });

        if (!exists && tag !== "General") {
          await News.create(simplifiedArticle);
        }

        return simplifiedArticle;
      })
    );

    res.status(200).json({ success: true, articles });
  } catch (error) {
    console.error("Error fetching news:", error.message);
    res.status(500).json({ success: false, error: "Failed to fetch news" });
  }
};

const getAnalytics = async (req, res) => {
  try {
    const tagCounts = await News.aggregate([
      { $group: { _id: "$tag", count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    const total = tagCounts.reduce((sum, item) => sum + item.count, 0);

    const latestPerTag = await News.aggregate([
      {
        $sort: { publishedAt: -1 }
      },
      {
        $group: {
          _id: "$tag",
          latest: { $first: "$title" },
          source: { $first: "$source" },
          publishedAt: { $first: "$publishedAt" }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      totalArticles: total,
      tagCounts,
      latestPerTag
    });
  } catch (error) {
    console.error("Analytics error:", error.message);
    res.status(500).json({ success: false, error: "Failed to get analytics" });
  }
};


module.exports = {
  fetchAndClassifyNews,
  getAnalytics
};

