const Book = require('../models/bookModel');
const User = require('../models/userModel');

// Create a new book with image upload
const createBook = async (req, res) => {
    const { title, author, genre, publicationDate, availableCopies } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
  
    try {
      const book = await Book.create({
        title,
        author,
        genre,
        publicationDate,
        availableCopies: availableCopies || 1, // Default to 1 copy if not specified
        imageUrl,
        creator: req.user._id, // Add creator from logged-in user
      });
  
      res.status(201).json(book);
    } catch (error) {
      res.status(500).json({ message: 'Error creating book' });
    }
};

// Get all books
const getBooks = async (req, res) => {
  try {
    const books = await Book.find().populate('borrowedBy', 'username email');
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching books' });
  }
};

// Get a single book by ID
const getBookById = async (req, res) => {
  const { id } = req.params;

  try {
    const book = await Book.findById(id).populate('borrowedBy', 'username email');
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching book' });
  }
};

// Update book details with image upload
const updateBook = async (req, res) => {
  const { title, author, genre, publicationDate, availableCopies } = req.body;
  const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

  try {
      const book = await Book.findById(req.params.id);

      if (!book) {
          return res.status(404).json({ message: 'Book not found' });
      }

      // Ensure the logged-in user is the creator of the book
      if (book.creator.toString() !== req.user._id.toString()) {
          return res.status(403).json({ message: 'You do not have permission to edit this book' });
      }

      // Update fields
      book.title = title || book.title;
      book.author = author || book.author;
      book.genre = genre || book.genre;
      book.publicationDate = publicationDate || book.publicationDate;
      book.availableCopies = availableCopies !== undefined ? availableCopies : book.availableCopies;
      book.imageUrl = imageUrl || book.imageUrl;

      await book.save();

      res.status(200).json(book);
  } catch (error) {
      res.status(500).json({ message: 'Error updating book' });
  }
};
  
// Delete a book
const deleteBook = async (req, res) => {
  const { id } = req.params;

  try {
    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    // Ensure the logged-in user is the creator of the book
    if (book.creator.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You do not have permission to delete this book' });
    }

    await book.deleteOne();
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting book' });
  }
};

// Borrow a book
const borrowBook = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  try {
    const book = await Book.findById(id);

    if (!book || book.availableCopies <= 0) {
      return res.status(404).json({ message: 'No copies available for borrowing' });
    }

    // Check if the user has already borrowed this book
    if (book.borrowedBy.includes(userId)) {
      return res.status(400).json({ message: 'You have already borrowed this book' });
    }

    // Mark the book as borrowed
    book.availableCopies -= 1;
    book.borrowedBy.push(userId);
    await book.save();

    res.json({ message: `Book borrowed successfully by ${req.user.username}` });
  } catch (error) {
    res.status(500).json({ message: 'Error borrowing book' });
  }
};

// Return a book
const returnBook = async (req, res) => {
  const { id } = req.params;
  const userId = req.user._id;

  try {
    const book = await Book.findById(id);

    if (!book || !book.borrowedBy.includes(userId)) {
      return res.status(404).json({ message: 'You have not borrowed this book' });
    }

    // Mark the book as returned
    book.availableCopies += 1;
    book.borrowedBy = book.borrowedBy.filter(borrower => borrower.toString() !== userId.toString());
    await book.save();

    res.json({ message: 'Book returned successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error returning book' });
  }
};

// Get books created by the current user (creator)
const getBooksByCreator = async (req, res) => {
  const userId = req.user._id;

  try {
    const books = await Book.find({ creator: userId }).populate('creator', 'email'); 

    if (!books || books.length === 0) {
      return res.status(404).json({ message: 'No books found created by this user' });
    }

    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching books by creator' });
  }
};

// Get books borrowed by the current user (borrower)
const getBooksByBorrower = async (req, res) => {
  const userId = req.user._id;

  try {
    const books = await Book.find({ borrowedBy: userId });

    if (!books || books.length === 0) {
      return res.status(404).json({ message: 'No books found borrowed by this user' });
    }

    res.json(books);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching books borrowed by user' });
  }
};

module.exports = {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
  borrowBook,
  returnBook,
  getBooksByCreator,
  getBooksByBorrower,
};
