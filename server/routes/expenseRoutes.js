const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');
const protect = require('../middleware/protect');

// 📌 GET all expenses for logged-in user
router.get('/', protect, async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user._id }).sort({ date: -1 });
    res.status(200).json(expenses);
  } catch (err) {
    res.status(500).json({ message: 'Server error while fetching expenses' });
  }
});

// 📌 POST a new expense
router.post('/', protect, async (req, res) => {
  const { title, amount, category, date, placedAt } = req.body;

  if (!title || !amount || !category || !date) {
    return res.status(400).json({ message: 'All required fields must be filled' });
  }

  try {
    const newExpense = new Expense({
      title,
      amount,
      category,
      date,
      placedAt,
      userId: req.user._id
    });

    const savedExpense = await newExpense.save();
    res.status(201).json(savedExpense);
  } catch (err) {
    res.status(500).json({ message: 'Server error while adding expense' });
  }
});

// 📌 DELETE an expense by ID
router.delete('/:id', protect, async (req, res) => {
  try {
    const expense = await Expense.findOne({ _id: req.params.id, userId: req.user._id });

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found or unauthorized' });
    }

    await expense.deleteOne();
    res.status(200).json({ message: 'Expense deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error while deleting expense' });
  }
});

// 📌 PUT (update) an expense by ID
router.put('/:id', protect, async (req, res) => {
  try {
    const updated = await Expense.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: 'Expense not found or unauthorized' });
    }

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Server error while updating expense' });
  }
});

module.exports = router;
