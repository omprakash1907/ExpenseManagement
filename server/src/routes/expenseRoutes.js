const express = require('express');
const multer = require('multer');
const {
  addExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
  bulkUploadCSV
} = require('../controllers/expenseController');
const { protect } = require('../middleware/authMiddleware');
const { bulkDeleteExpenses } = require('../controllers/expenseController');

const router = express.Router();
const upload = multer({ dest: 'uploads/' }); // Use multer to handle file uploads

// Add an expense
router.post('/', protect, addExpense);

// Get all expenses (with filtering and pagination)
router.get('/', protect, getExpenses);

// Update an expense
router.put('/:id', protect, updateExpense);

// Delete an expense
router.delete('/:id', protect, deleteExpense);

// Bulk upload expenses via CSV
router.post('/bulk-upload', protect, upload.single('file'), bulkUploadCSV);

// Bulk delete expenses
router.post('/bulk-delete', protect, bulkDeleteExpenses);

module.exports = router;
