const Book = require('../models/Book');

class BookService {
  constructor() {
    this.books = [];
    this.nextId = 1;
  }

  getAllBooks() {
    return this.books.map(book => book.toJSON());
  }

  getBookById(id) {
    const book = this.books.find(b => b.id === parseInt(id));
    return book ? book.toJSON() : null;
  }

  createBook(bookData) {
    const validationErrors = Book.validate(bookData);
    if (validationErrors.length > 0) {
      throw new Error(validationErrors.join(', '));
    }

    // Check for duplicate ISBN
    const existingBook = this.books.find(b => b.isbn === bookData.isbn);
    if (existingBook) {
      throw new Error(`Book with ISBN ${bookData.isbn} already exists`);
    }

    const book = new Book(
      this.nextId++,
      bookData.title.trim(),
      bookData.author.trim(),
      bookData.isbn.trim(),
      bookData.publishedDate,
      bookData.pages
    );

    this.books.push(book);
    return book.toJSON();
  }

  updateBook(id, bookData) {
    const book = this.books.find(b => b.id === parseInt(id));
    if (!book) {
      return null;
    }

    // Validate updated data
    const updatedData = {
      ...book.toJSON(),
      ...bookData
    };
    const validationErrors = Book.validate(updatedData);
    if (validationErrors.length > 0) {
      throw new Error(validationErrors.join(', '));
    }

    // Check for duplicate ISBN (excluding current book)
    if (bookData.isbn) {
      const existingBook = this.books.find(
        b => b.isbn === bookData.isbn && b.id !== parseInt(id)
      );
      if (existingBook) {
        throw new Error(`Book with ISBN ${bookData.isbn} already exists`);
      }
    }

    book.update(bookData);
    return book.toJSON();
  }

  deleteBook(id) {
    const index = this.books.findIndex(b => b.id === parseInt(id));
    if (index === -1) {
      return false;
    }
    this.books.splice(index, 1);
    return true;
  }
}

module.exports = BookService;

