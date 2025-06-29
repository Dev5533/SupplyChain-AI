#  SupplyChain AI

**SupplyChain AI** is a modern full-stack web application that leverages AI and real-time data to enhance decision-making across the supply chain ecosystem. It combines live news, intelligent summaries, user authentication, and email subscriptions into one centralized platform.

---

##  Project Objective

The goal of **SupplyChain AI** is to empower individuals and businesses in the supply chain domain by providing timely, AI-curated insights and analytics. This platform helps users:

- Stay updated with real-time supply chain news.
- Receive daily news digests via email.
- Visualize key data trends through an intuitive dashboard.
- Save, analyze, and manage news stories easily.

---

## Key Features

| Feature                          | Description                                                                 |
|----------------------------------|-----------------------------------------------------------------------------|
|  Live News Feed                | Displays real-time supply chain news from external APIs.                   |
|  Save Important News          | Users can save news articles for later reading.                            |
|  Analytics Visualization      | View graphical representations of news categories using charts.            |
|  Email Digest                 | Users can opt in to receive daily emails summarizing the top 5 news items. |
|  Email Subscription Toggle    | Easily manage whether the user receives emails from the dashboard.         |
|  Authentication (JWT)        | Secure login/register flow with JWT-protected routes.                      |

---

##  Tech Stack

- **Frontend**: React.js, Axios, Bootstrap, React Router, Recharts
- **Backend**: Node.js, Express.js, MongoDB, Mongoose
- **Authentication**: JSON Web Tokens (JWT)
- **Mailing**: Nodemailer with Gmail App Password
- **Automation**: node-cron for scheduled email jobs
- **Storage**: MongoDB Atlas or local MongoDB

---

##  Security Highlights

- Passwords securely hashed with `bcrypt`
- JWT used for secure and stateless authentication
- Email credentials managed using `.env` environment variables
- Protected routes with token validation middleware

---

##  Daily Email Digest Workflow

1. Users register and login securely.
2. On login, they can toggle the email subscription checkbox.
3. Cron job runs at 8 AM daily (or manually triggered for testing).
4. The latest 5 news articles are fetched and emailed to subscribed users.

---

##  Future Enhancements

- NLP-powered automatic summarization of news
- Push notifications for breaking supply chain news
- Admin dashboard with role-based access control
- Sentiment analysis on saved articles
- Multi-language support for international users

---

## 🚀 Deployment

- **Frontend**: [https://supply-chain-ai.vercel.app](https://supply-chain-ai.vercel.app)
  
---

##  Author

**Dev Patel**    
Email: [devp8756@gmail.com]

---
