const express = require('express');
const router = express.Router();
const { sendDigestNow } = require('../controllers/emailController');
const authMiddleware = require('../utils/authMiddleware');

router.post('/send-digest', authMiddleware, sendDigestNow);

module.exports = router;
