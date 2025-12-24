class Book {
  constructor(id, title, author, isbn, publishedDate, pages) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.isbn = isbn;
    this.publishedDate = publishedDate;
    this.pages = pages;
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  static validate(bookData) {
    const errors = [];

    if (!bookData.title || bookData.title.trim().length === 0) {
      errors.push('Title is required');
    } else if (bookData.title.length > 200) {
      errors.push('Title must be 200 characters or less');
    }

    if (!bookData.author || bookData.author.trim().length === 0) {
      errors.push('Author is required');
    } else if (bookData.author.length > 100) {
      errors.push('Author must be 100 characters or less');
    }

    if (!bookData.isbn || bookData.isbn.trim().length === 0) {
      errors.push('ISBN is required');
    } else if (bookData.isbn.length > 13) {
      errors.push('ISBN must be 13 characters or less');
    }

    if (!bookData.publishedDate) {
      errors.push('Published date is required');
    } else {
      const date = new Date(bookData.publishedDate);
      if (isNaN(date.getTime())) {
        errors.push('Published date must be a valid date');
      }
    }

    if (bookData.pages === undefined || bookData.pages === null) {
      errors.push('Pages is required');
    } else if (!Number.isInteger(bookData.pages) || bookData.pages < 1) {
      errors.push('Pages must be a positive integer');
    }

    return errors;
  }

  update(data) {
    if (data.title !== undefined) this.title = data.title;
    if (data.author !== undefined) this.author = data.author;
    if (data.isbn !== undefined) this.isbn = data.isbn;
    if (data.publishedDate !== undefined) this.publishedDate = data.publishedDate;
    if (data.pages !== undefined) this.pages = data.pages;
    this.updatedAt = new Date().toISOString();
  }

  toJSON() {
    return {
      id: this.id,
      title: this.title,
      author: this.author,
      isbn: this.isbn,
      publishedDate: this.publishedDate,
      pages: this.pages,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}

module.exports = Book;

