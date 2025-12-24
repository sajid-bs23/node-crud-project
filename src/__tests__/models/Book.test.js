const Book = require('../../models/Book');

describe('Book Model', () => {
  describe('Constructor', () => {
    it('should create a book with all properties', () => {
      const book = new Book(
        1,
        'Test Book',
        'Test Author',
        '1234567890123',
        '2024-01-01',
        300
      );

      expect(book.id).toBe(1);
      expect(book.title).toBe('Test Book');
      expect(book.author).toBe('Test Author');
      expect(book.isbn).toBe('1234567890123');
      expect(book.publishedDate).toBe('2024-01-01');
      expect(book.pages).toBe(300);
      expect(book.createdAt).toBeDefined();
      expect(book.updatedAt).toBeDefined();
    });
  });

  describe('validate', () => {
    it('should return no errors for valid book data', () => {
      const validData = {
        title: 'Valid Book',
        author: 'Valid Author',
        isbn: '1234567890123',
        publishedDate: '2024-01-01',
        pages: 300
      };

      const errors = Book.validate(validData);
      expect(errors).toHaveLength(0);
    });

    it('should return error if title is missing', () => {
      const invalidData = {
        author: 'Author',
        isbn: '1234567890123',
        publishedDate: '2024-01-01',
        pages: 300
      };

      const errors = Book.validate(invalidData);
      expect(errors).toContain('Title is required');
    });

    it('should return error if title exceeds 200 characters', () => {
      const invalidData = {
        title: 'a'.repeat(201),
        author: 'Author',
        isbn: '1234567890123',
        publishedDate: '2024-01-01',
        pages: 300
      };

      const errors = Book.validate(invalidData);
      expect(errors).toContain('Title must be 200 characters or less');
    });

    it('should return error if author is missing', () => {
      const invalidData = {
        title: 'Title',
        isbn: '1234567890123',
        publishedDate: '2024-01-01',
        pages: 300
      };

      const errors = Book.validate(invalidData);
      expect(errors).toContain('Author is required');
    });

    it('should return error if author exceeds 100 characters', () => {
      const invalidData = {
        title: 'Title',
        author: 'a'.repeat(101),
        isbn: '1234567890123',
        publishedDate: '2024-01-01',
        pages: 300
      };

      const errors = Book.validate(invalidData);
      expect(errors).toContain('Author must be 100 characters or less');
    });

    it('should return error if ISBN is missing', () => {
      const invalidData = {
        title: 'Title',
        author: 'Author',
        publishedDate: '2024-01-01',
        pages: 300
      };

      const errors = Book.validate(invalidData);
      expect(errors).toContain('ISBN is required');
    });

    it('should return error if ISBN exceeds 13 characters', () => {
      const invalidData = {
        title: 'Title',
        author: 'Author',
        isbn: '12345678901234',
        publishedDate: '2024-01-01',
        pages: 300
      };

      const errors = Book.validate(invalidData);
      expect(errors).toContain('ISBN must be 13 characters or less');
    });

    it('should return error if publishedDate is missing', () => {
      const invalidData = {
        title: 'Title',
        author: 'Author',
        isbn: '1234567890123',
        pages: 300
      };

      const errors = Book.validate(invalidData);
      expect(errors).toContain('Published date is required');
    });

    it('should return error if publishedDate is invalid', () => {
      const invalidData = {
        title: 'Title',
        author: 'Author',
        isbn: '1234567890123',
        publishedDate: 'invalid-date',
        pages: 300
      };

      const errors = Book.validate(invalidData);
      expect(errors).toContain('Published date must be a valid date');
    });

    it('should return error if pages is missing', () => {
      const invalidData = {
        title: 'Title',
        author: 'Author',
        isbn: '1234567890123',
        publishedDate: '2024-01-01'
      };

      const errors = Book.validate(invalidData);
      expect(errors).toContain('Pages is required');
    });

    it('should return error if pages is not a positive integer', () => {
      const invalidData = {
        title: 'Title',
        author: 'Author',
        isbn: '1234567890123',
        publishedDate: '2024-01-01',
        pages: -1
      };

      const errors = Book.validate(invalidData);
      expect(errors).toContain('Pages must be a positive integer');
    });
  });

  describe('update', () => {
    it('should update book properties', () => {
      const book = new Book(
        1,
        'Original Title',
        'Original Author',
        '1234567890123',
        '2024-01-01',
        300
      );

      const originalUpdatedAt = book.updatedAt;
      
      // Add a small delay to ensure timestamp difference
      const beforeUpdate = Date.now();
      book.update({
        title: 'Updated Title',
        pages: 350
      });
      const afterUpdate = Date.now();

      expect(book.title).toBe('Updated Title');
      expect(book.author).toBe('Original Author');
      expect(book.pages).toBe(350);
      
      // Verify updatedAt is a valid ISO string and different from original
      expect(book.updatedAt).toBeDefined();
      expect(new Date(book.updatedAt).getTime()).toBeGreaterThanOrEqual(beforeUpdate);
      expect(new Date(book.updatedAt).getTime()).toBeLessThanOrEqual(afterUpdate);
    });
  });

  describe('toJSON', () => {
    it('should return book as JSON object', () => {
      const book = new Book(
        1,
        'Test Book',
        'Test Author',
        '1234567890123',
        '2024-01-01',
        300
      );

      const json = book.toJSON();

      expect(json).toEqual({
        id: 1,
        title: 'Test Book',
        author: 'Test Author',
        isbn: '1234567890123',
        publishedDate: '2024-01-01',
        pages: 300,
        createdAt: expect.any(String),
        updatedAt: expect.any(String)
      });
    });
  });
});

