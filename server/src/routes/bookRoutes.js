const express = require('express');
const {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
  borrowBook,
  returnBook,
  getBooksByCreator,
  getBooksByBorrower,
} = require('../controllers/bookController');
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../middleware/upload'); // Multer middleware for handling image upload

const router = express.Router();

// Book CRUD routes
router.post('/', authMiddleware, upload.single('image'), createBook); // Create book with image upload
router.get('/', getBooks); // Get all books
router.get('/:id', getBookById); // Get book by ID
router.put('/:id', authMiddleware, upload.single('image'), updateBook); // Update book with image upload
router.delete('/:id', authMiddleware, deleteBook); // Delete book

// Borrow/Return routes
router.post('/:id/borrow', authMiddleware, borrowBook); // Borrow book
router.post('/:id/return', authMiddleware, returnBook); // Return book

// Get books by creator and borrower
router.get('/user/created', authMiddleware, getBooksByCreator); // Books created by user
router.get('/user/borrowed', authMiddleware, getBooksByBorrower); // Books borrowed by user

module.exports = router;
