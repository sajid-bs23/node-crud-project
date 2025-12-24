const express = require('express');
const router = express.Router();
const BookService = require('../services/bookService');

// Create a single instance of BookService
const bookService = new BookService();

// GET /api/books - Get all books
router.get('/', (req, res) => {
  try {
    const books = bookService.getAllBooks();
    res.status(200).json({ books });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET /api/books/:id - Get book by ID
router.get('/:id', (req, res) => {
  try {
    const book = bookService.getBookById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /api/books - Create a new book
router.post('/', (req, res) => {
  try {
    const book = bookService.createBook(req.body);
    res.status(201).json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// PUT /api/books/:id - Update a book
router.put('/:id', (req, res) => {
  try {
    const book = bookService.updateBook(req.params.id, req.body);
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.status(200).json(book);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE /api/books/:id - Delete a book
router.delete('/:id', (req, res) => {
  try {
    const deleted = bookService.deleteBook(req.params.id);
    if (!deleted) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.status(204).json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

