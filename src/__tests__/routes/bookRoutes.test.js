const request = require('supertest');
const app = require('../../server');

describe('Book Routes', () => {
  describe('GET /api/books', () => {
    it('should return empty array when no books exist', async () => {
      const response = await request(app)
        .get('/api/books')
        .expect(200);

      expect(response.body).toHaveProperty('books');
      expect(response.body.books).toEqual([]);
    });

    it('should return all books', async () => {
      // Create a book first
      await request(app)
        .post('/api/books')
        .send({
          title: 'Test Book',
          author: 'Test Author',
          isbn: '1111111111111',
          publishedDate: '2024-01-01',
          pages: 300
        });

      const response = await request(app)
        .get('/api/books')
        .expect(200);

      expect(response.body.books).toHaveLength(1);
      expect(response.body.books[0].title).toBe('Test Book');
    });
  });

  describe('GET /api/books/:id', () => {
    it('should return book by id', async () => {
      const createResponse = await request(app)
        .post('/api/books')
        .send({
          title: 'Detail Book',
          author: 'Detail Author',
          isbn: '2222222222222',
          publishedDate: '2024-01-01',
          pages: 300
        });

      const bookId = createResponse.body.id;

      const response = await request(app)
        .get(`/api/books/${bookId}`)
        .expect(200);

      expect(response.body.id).toBe(bookId);
      expect(response.body.title).toBe('Detail Book');
    });

    it('should return 404 for non-existent book', async () => {
      const response = await request(app)
        .get('/api/books/999')
        .expect(404);

      expect(response.body).toHaveProperty('error');
      expect(response.body.error).toBe('Book not found');
    });
  });

  describe('POST /api/books', () => {
    it('should create a new book', async () => {
      const bookData = {
        title: 'New Book',
        author: 'New Author',
        isbn: '3333333333333',
        publishedDate: '2024-01-01',
        pages: 300
      };

      const response = await request(app)
        .post('/api/books')
        .send(bookData)
        .expect(201);

      expect(response.body).toHaveProperty('id');
      expect(response.body.title).toBe('New Book');
      expect(response.body.author).toBe('New Author');
      expect(response.body.isbn).toBe('3333333333333');
      expect(response.body.pages).toBe(300);
    });

    it('should return 400 for missing required fields', async () => {
      const invalidData = {
        title: 'Incomplete Book',
        author: 'Author'
      };

      const response = await request(app)
        .post('/api/books')
        .send(invalidData)
        .expect(400);

      expect(response.body).toHaveProperty('error');
    });

    it('should return 400 for duplicate ISBN', async () => {
      const bookData = {
        title: 'First Book',
        author: 'Author',
        isbn: '4444444444444',
        publishedDate: '2024-01-01',
        pages: 300
      };

      await request(app)
        .post('/api/books')
        .send(bookData)
        .expect(201);

      const response = await request(app)
        .post('/api/books')
        .send({
          ...bookData,
          title: 'Second Book'
        })
        .expect(400);

      expect(response.body.error).toContain('already exists');
    });

    it('should return 400 for invalid data', async () => {
      const invalidData = {
        title: 'Test Book',
        author: 'Author',
        isbn: '5555555555555',
        publishedDate: 'invalid-date',
        pages: 300
      };

      const response = await request(app)
        .post('/api/books')
        .send(invalidData)
        .expect(400);

      expect(response.body).toHaveProperty('error');
    });
  });

  describe('PUT /api/books/:id', () => {
    it('should update an existing book', async () => {
      const createResponse = await request(app)
        .post('/api/books')
        .send({
          title: 'Original Title',
          author: 'Original Author',
          isbn: '6666666666666',
          publishedDate: '2024-01-01',
          pages: 300
        });

      const bookId = createResponse.body.id;

      const updateResponse = await request(app)
        .put(`/api/books/${bookId}`)
        .send({
          title: 'Updated Title',
          pages: 350
        })
        .expect(200);

      expect(updateResponse.body.title).toBe('Updated Title');
      expect(updateResponse.body.pages).toBe(350);
      expect(updateResponse.body.author).toBe('Original Author');
    });

    it('should return 404 for non-existent book', async () => {
      const response = await request(app)
        .put('/api/books/999')
        .send({
          title: 'Updated Title'
        })
        .expect(404);

      expect(response.body.error).toBe('Book not found');
    });

    it('should return 400 for invalid data', async () => {
      const createResponse = await request(app)
        .post('/api/books')
        .send({
          title: 'Test Book',
          author: 'Author',
          isbn: '7777777777777',
          publishedDate: '2024-01-01',
          pages: 300
        });

      const bookId = createResponse.body.id;

      const response = await request(app)
        .put(`/api/books/${bookId}`)
        .send({
          pages: -1
        })
        .expect(400);

      expect(response.body).toHaveProperty('error');
    });
  });

  describe('DELETE /api/books/:id', () => {
    it('should delete an existing book', async () => {
      const createResponse = await request(app)
        .post('/api/books')
        .send({
          title: 'Delete Book',
          author: 'Author',
          isbn: '8888888888888',
          publishedDate: '2024-01-01',
          pages: 300
        });

      const bookId = createResponse.body.id;

      await request(app)
        .delete(`/api/books/${bookId}`)
        .expect(204);

      // Verify book is deleted
      await request(app)
        .get(`/api/books/${bookId}`)
        .expect(404);
    });

    it('should return 404 for non-existent book', async () => {
      const response = await request(app)
        .delete('/api/books/999')
        .expect(404);

      expect(response.body.error).toBe('Book not found');
    });
  });
});

