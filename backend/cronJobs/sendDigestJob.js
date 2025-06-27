const cron = require('node-cron');
const User = require('../models/User');
const News = require('../models/News');
const sendDigest = require('../utils/mailer');

const runDailyDigest = async () => {
  try {
    const users = await User.find({ isSubscribed: true });

    const recentNews = await News.find()
      .sort({ publishedAt: -1 })
      .limit(5);

    if (recentNews.length === 0) return;

    const htmlContent = `
      <h2>🗞️ Daily Supply Chain Digest</h2>
      <ul>
        ${recentNews
          .map(
            (article) => `
            <li>
              <strong>${article.title}</strong><br/>
              <em>${article.tag}</em><br/>
              <small>${article.source} - ${new Date(article.publishedAt).toLocaleString()}</small>
              <p>${article.summary}</p>
            </li>`
          )
          .join('')}
      </ul>
    `;

    for (const user of users) {
      await sendDigest(user.email, '📬 Your Daily Supply Chain News Digest', htmlContent);
    }

    console.log(`Digest sent to ${users.length} subscribers.`);
  } catch (err) {
    console.error('Failed to send digest:', err.message);
  }
};

// Schedule to run every day at 8 AM
cron.schedule('0 8 * * *', runDailyDigest); // 8:00 AM server time
