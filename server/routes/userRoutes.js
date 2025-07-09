// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Example: Get all users (only for development)
router.get('/', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

module.exports = router;
