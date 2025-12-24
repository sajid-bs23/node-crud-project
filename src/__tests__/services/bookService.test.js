const BookService = require('../../services/bookService');

describe('BookService', () => {
  let bookService;

  beforeEach(() => {
    bookService = new BookService();
  });

  describe('getAllBooks', () => {
    it('should return empty array when no books exist', () => {
      const books = bookService.getAllBooks();
      expect(books).toEqual([]);
    });

    it('should return all books', () => {
      bookService.createBook({
        title: 'Book 1',
        author: 'Author 1',
        isbn: '1111111111111',
        publishedDate: '2024-01-01',
        pages: 200
      });

      bookService.createBook({
        title: 'Book 2',
        author: 'Author 2',
        isbn: '2222222222222',
        publishedDate: '2024-02-01',
        pages: 300
      });

      const books = bookService.getAllBooks();
      expect(books).toHaveLength(2);
      expect(books[0].title).toBe('Book 1');
      expect(books[1].title).toBe('Book 2');
    });
  });

  describe('getBookById', () => {
    it('should return null for non-existent book', () => {
      const book = bookService.getBookById(999);
      expect(book).toBeNull();
    });

    it('should return book by id', () => {
      const created = bookService.createBook({
        title: 'Test Book',
        author: 'Test Author',
        isbn: '1234567890123',
        publishedDate: '2024-01-01',
        pages: 300
      });

      const book = bookService.getBookById(created.id);
      expect(book).toBeDefined();
      expect(book.id).toBe(created.id);
      expect(book.title).toBe('Test Book');
    });
  });

  describe('createBook', () => {
    it('should create a book with valid data', () => {
      const bookData = {
        title: 'New Book',
        author: 'New Author',
        isbn: '1234567890123',
        publishedDate: '2024-01-01',
        pages: 300
      };

      const book = bookService.createBook(bookData);
      expect(book).toBeDefined();
      expect(book.id).toBe(1);
      expect(book.title).toBe('New Book');
      expect(book.author).toBe('New Author');
      expect(book.isbn).toBe('1234567890123');
      expect(book.pages).toBe(300);
    });

    it('should throw error for invalid data', () => {
      const invalidData = {
        title: '',
        author: 'Author',
        isbn: '1234567890123',
        publishedDate: '2024-01-01',
        pages: 300
      };

      expect(() => {
        bookService.createBook(invalidData);
      }).toThrow();
    });

    it('should throw error for duplicate ISBN', () => {
      bookService.createBook({
        title: 'First Book',
        author: 'Author',
        isbn: '1234567890123',
        publishedDate: '2024-01-01',
        pages: 300
      });

      expect(() => {
        bookService.createBook({
          title: 'Second Book',
          author: 'Author',
          isbn: '1234567890123',
          publishedDate: '2024-01-01',
          pages: 300
        });
      }).toThrow('Book with ISBN 1234567890123 already exists');
    });

    it('should trim whitespace from title and author', () => {
      const book = bookService.createBook({
        title: '  Trimmed Title  ',
        author: '  Trimmed Author  ',
        isbn: '1234567890123',
        publishedDate: '2024-01-01',
        pages: 300
      });

      expect(book.title).toBe('Trimmed Title');
      expect(book.author).toBe('Trimmed Author');
    });
  });

  describe('updateBook', () => {
    it('should update book with valid data', () => {
      const created = bookService.createBook({
        title: 'Original Title',
        author: 'Original Author',
        isbn: '1234567890123',
        publishedDate: '2024-01-01',
        pages: 300
      });

      const updated = bookService.updateBook(created.id, {
        title: 'Updated Title',
        pages: 350
      });

      expect(updated.title).toBe('Updated Title');
      expect(updated.author).toBe('Original Author');
      expect(updated.pages).toBe(350);
    });

    it('should return null for non-existent book', () => {
      const result = bookService.updateBook(999, {
        title: 'Updated Title'
      });

      expect(result).toBeNull();
    });

    it('should throw error for invalid data', () => {
      const created = bookService.createBook({
        title: 'Original Title',
        author: 'Original Author',
        isbn: '1234567890123',
        publishedDate: '2024-01-01',
        pages: 300
      });

      expect(() => {
        bookService.updateBook(created.id, {
          pages: -1
        });
      }).toThrow();
    });

    it('should throw error for duplicate ISBN', () => {
      const book1 = bookService.createBook({
        title: 'Book 1',
        author: 'Author',
        isbn: '1111111111111',
        publishedDate: '2024-01-01',
        pages: 300
      });

      bookService.createBook({
        title: 'Book 2',
        author: 'Author',
        isbn: '2222222222222',
        publishedDate: '2024-01-01',
        pages: 300
      });

      expect(() => {
        bookService.updateBook(book1.id, {
          isbn: '2222222222222'
        });
      }).toThrow('Book with ISBN 2222222222222 already exists');
    });
  });

  describe('deleteBook', () => {
    it('should delete book by id', () => {
      const created = bookService.createBook({
        title: 'To Delete',
        author: 'Author',
        isbn: '1234567890123',
        publishedDate: '2024-01-01',
        pages: 300
      });

      const deleted = bookService.deleteBook(created.id);
      expect(deleted).toBe(true);

      const book = bookService.getBookById(created.id);
      expect(book).toBeNull();
    });

    it('should return false for non-existent book', () => {
      const deleted = bookService.deleteBook(999);
      expect(deleted).toBe(false);
    });
  });
});

