const User = require('../models/User');
const News = require('../models/News');
const sendDigestEmail = require('../utils/mailer');

exports.sendDigestNow = async (req, res) => {
  try {
    const users = await User.find({ isSubscribed: true });
    const recentNews = await News.find().sort({ publishedAt: -1 }).limit(5);

    if (recentNews.length === 0) {
      return res.status(404).json({ message: "No recent news to send." });
    }

    const htmlContent = `
      <h2>🗞️ Daily Supply Chain Digest</h2>
      <ul>
        ${recentNews.map((article) => `
          <li>
            <strong>${article.title}</strong><br/>
            <em>${article.tag}</em><br/>
            <small>${article.source} - ${new Date(article.publishedAt).toLocaleString()}</small>
            <p>${article.summary}</p>
          </li>
        `).join('')}
      </ul>
    `;

    for (const user of users) {
      await sendDigestEmail(user.email, '📬 Your Daily Supply Chain News Digest', htmlContent);
    }

    res.status(200).json({ message: `Digest sent to ${users.length} users.` });
  } catch (err) {
    res.status(500).json({ message: 'Failed to send digest', error: err.message });
  }
};
