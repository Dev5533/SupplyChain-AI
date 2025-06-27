require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const savedNewsRoutes = require('./routes/savedNewsRoutes');
const authRoutes = require('./routes/authRoutes');
const emailRoutes = require('./routes/emailRoutes');



const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("MongoDB connected"))
.catch((err) => console.error("MongoDB connection error:", err));

// Routes
const newsRoutes = require('./routes/newsRoutes');
app.use('/api/news', newsRoutes);
app.use('/api/news/saved', savedNewsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/email', emailRoutes);
require('./cronJobs/sendDigestJob'); // Start daily email scheduler

// Server Start
const PORT = 8080;
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
