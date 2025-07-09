const Expense = require('../models/Expense');

// 📌 Add New Expense (requires logged-in user)
exports.addExpense = async (req, res) => {
  try {
    const userId = req.user._id;

    const { title, amount, category, date, placedAt } = req.body;

    if (!title || !amount || !category || !date) {
      return res.status(400).json({ message: 'All required fields must be filled' });
    }

    const expense = new Expense({
      title,
      amount,
      category,
      date,
      placedAt,
      userId
    });

    const savedExpense = await expense.save();
    res.status(201).json(savedExpense);
  } catch (err) {
    console.error('Add Expense Error:', err.message);
    res.status(500).json({ message: 'Server error while adding expense' });
  }
};

// 📌 Get All Expenses for Logged-in User
exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user._id }).sort({ date: -1 });
    res.status(200).json(expenses);
  } catch (err) {
    console.error('Fetch Expenses Error:', err.message);
    res.status(500).json({ message: 'Server error while fetching expenses' });
  }
};

// 📌 Delete Expense by ID (owned by logged-in user)
exports.deleteExpense = async (req, res) => {
  const { id } = req.params;

  try {
    const expense = await Expense.findOne({ _id: id, userId: req.user._id });

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    await Expense.findByIdAndDelete(id);
    res.status(200).json({ message: 'Expense deleted successfully' });
  } catch (err) {
    console.error('Delete Expense Error:', err.message);
    res.status(500).json({ message: 'Server error while deleting expense' });
  }
};

// 📌 Update an Expense (optional)
exports.updateExpense = async (req, res) => {
  const { id } = req.params;

  try {
    const expense = await Expense.findOneAndUpdate(
      { _id: id, userId: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found or unauthorized' });
    }

    res.status(200).json(expense);
  } catch (err) {
    console.error('Update Expense Error:', err.message);
    res.status(500).json({ message: 'Server error while updating expense' });
  }
};
