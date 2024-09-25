const Expense = require("../models/Expense");
const csv = require("csv-parser");
const mongoose = require("mongoose");
const fs = require("fs");

// Add a single expense
exports.addExpense = async (req, res) => {
  try {
    const { amount, description, category, paymentMethod, date } = req.body;
    const expense = new Expense({
      amount,
      description,
      category,
      paymentMethod,
      date,
      user: req.user._id, // Attach the authenticated user's ID
    });
    await expense.save();
    res.status(201).json(expense);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// Get all expenses with filtering and pagination
exports.getExpenses = async (req, res) => {
  const {
    category,
    paymentMethod,
    startDate,
    endDate,
    page = 1,
    limit = 5,
  } = req.query;

  const filter = { user: req.user._id }; // Only get expenses for the logged-in user

  if (category) filter.category = category;
  if (paymentMethod) filter.paymentMethod = paymentMethod;
  if (startDate || endDate) {
    filter.date = {};
    if (startDate) filter.date.$gte = new Date(startDate);
    if (endDate) filter.date.$lte = new Date(endDate);
  }

  try {
    const expenses = await Expense.find(filter)
      .skip((page - 1) * limit)
      .limit(parseInt(limit))
      .sort({ date: -1 });

    const total = await Expense.countDocuments(filter);

    res.status(200).json({
      total,
      page: parseInt(page),
      limit: parseInt(limit),
      expenses,
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// Update an expense
exports.updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await Expense.findOneAndUpdate(
      { _id: id, user: req.user._id }, // Ensure only the owner can update
      req.body,
      { new: true }
    );
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.status(200).json(expense);
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// Delete an expense
exports.deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await Expense.findOneAndDelete({
      _id: id,
      user: req.user._id,
    });
    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: "Server Error", error: err.message });
  }
};

// Bulk upload expenses via CSV
exports.bulkUploadCSV = async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No CSV file provided" });
  }

  const expenses = [];
  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on("data", (row) => {
      expenses.push({
        amount: row.amount,
        description: row.description,
        category: row.category,
        paymentMethod: row.paymentMethod,
        date: row.date,
        user: req.user._id,
      });
    })
    .on("end", async () => {
      try {
        await Expense.insertMany(expenses);
        res.status(201).json({ message: "Expenses uploaded successfully" });
      } catch (err) {
        res
          .status(500)
          .json({ message: "Error inserting expenses", error: err.message });
      } finally {
        fs.unlinkSync(req.file.path); // Clean up the uploaded file
      }
    });
};

exports.bulkDeleteExpenses = async (req, res) => {
  let { ids } = req.body;

  // If ids is not an array, convert it to an array to handle single deletion
  if (!Array.isArray(ids)) {
    ids = [ids];
  }

  // Check if ids is provided and contains valid MongoDB ObjectIds
  if (
    ids.length === 0 ||
    !ids.every((id) => mongoose.Types.ObjectId.isValid(id))
  ) {
    return res
      .status(400)
      .json({ message: "Please provide valid expense IDs" });
  }

  try {
    // Delete expenses where _id is in the provided ids and the user matches
    const result = await Expense.deleteMany({
      _id: { $in: ids },
      user: req.user._id, // Ensure that the user is deleting their own expenses
    });

    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({ message: "No expenses found with the provided IDs" });
    }

    res.status(200).json({ message: "Expenses deleted successfully" });
  } catch (error) {
    console.error("Error deleting expenses:", error);
    res.status(500).json({ message: "Failed to delete expenses", error });
  }
};
