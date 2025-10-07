const express = require('express');
const router = express.Router();
const Budget = require('../models/Budget');
const { protect } = require('../middleware/authMiddleware');

// Get all budgets
router.get('/', protect, async (req, res) => {
  try {
    const budgets = await Budget.find({ userId: req.user._id });
    res.json(budgets);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create budget
router.post('/', protect, async (req, res) => {
  try {
    const budget = await Budget.create({
      ...req.body,
      userId: req.user._id
    });
    res.status(201).json(budget);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
