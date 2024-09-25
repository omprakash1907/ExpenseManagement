const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  publicationDate: {
    type: Date,
    required: true,
  },
  availableCopies: { // Change from isAvailable to availableCopies
    type: Number,
    required: true,
    default: 1, // Set default to 1 copy
  },
  borrowedBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Track who created the book
    required: true,
  },
  imageUrl: {
    type: String, // Path to the uploaded image
    required: false,
  },
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
