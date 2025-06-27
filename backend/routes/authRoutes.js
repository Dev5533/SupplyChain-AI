const express = require('express');
const router = express.Router();
const { register, login, toggleSubscription, getMe } = require('../controllers/authController');
const authMiddleware = require('../utils/authMiddleware');
const User = require('../models/User');
const { getUserProfile } = require('../controllers/authController');


router.post('/register', register);
router.post('/login', login);
router.put('/toggle-subscription', authMiddleware, toggleSubscription);
router.get('/me', authMiddleware, getMe);
router.get('/user/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });

    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user', error: err.message });
  }
});


module.exports = router;
