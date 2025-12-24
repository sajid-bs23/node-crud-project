# Node.js CRUD Project

A simple RESTful CRUD (Create, Read, Update, Delete) application built with Node.js and Express. This project provides a complete Book management API with comprehensive test coverage.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Running Tests](#running-tests)
- [Code Coverage](#code-coverage)
- [Build and Run](#build-and-run)
- [Configuration](#configuration)
- [Technologies Used](#technologies-used)
- [Example API Usage](#example-api-usage)
- [Validation Rules](#validation-rules)
- [Error Handling](#error-handling)
- [License](#license)
- [Contributing](#contributing)
- [Support](#support)

## Features

- ✅ Full CRUD operations for Book management
- ✅ RESTful API with JSON responses
- ✅ Input validation and error handling
- ✅ Comprehensive unit and integration tests
- ✅ Code coverage reporting (SonarQube compatible)
- ✅ In-memory data storage (easily configurable for databases)
- ✅ Express.js web framework

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js 18+** or higher
- **npm 9+** or higher (comes with Node.js)
- **Make** (optional, for using Makefile commands)

Verify your installation:

```bash
node --version
npm --version
```

## Project Structure

```
node-crud-project/
├── src/
│   ├── server.js              # Express server setup
│   ├── models/
│   │   └── Book.js            # Book model with validation
│   ├── services/
│   │   └── bookService.js     # Business logic layer
│   ├── routes/
│   │   └── bookRoutes.js      # REST API endpoints
│   └── __tests__/
│       ├── models/
│       │   └── Book.test.js
│       ├── services/
│       │   └── bookService.test.js
│       └── routes/
│           └── bookRoutes.test.js
├── package.json               # Node.js dependencies
├── Makefile                   # Build automation
├── sonar-project.properties  # SonarQube configuration
└── README.md                  # This file
```

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd node-crud-project
```

### 2. Build the Project

Using Makefile:
```bash
make build
```

Or using npm directly:
```bash
npm install
```

### 3. Run the Application

Using Makefile:
```bash
make run
```

Or using npm directly:
```bash
npm start
```

The application will start on `http://localhost:3000`

## API Endpoints

All endpoints are prefixed with `/api/books`

### List All Books

**GET** `/api/books`

**Response:**
```json
{
  "books": [
    {
      "id": 1,
      "title": "The Great Gatsby",
      "author": "F. Scott Fitzgerald",
      "isbn": "9780743273565",
      "publishedDate": "1925-04-10",
      "pages": 180,
      "createdAt": "2024-01-01T10:00:00.000Z",
      "updatedAt": "2024-01-01T10:00:00.000Z"
    }
  ]
}
```

### Get Book by ID

**GET** `/api/books/{id}`

**Response (200 OK):**
```json
{
  "id": 1,
  "title": "The Great Gatsby",
  "author": "F. Scott Fitzgerald",
  "isbn": "9780743273565",
  "publishedDate": "1925-04-10",
  "pages": 180,
  "createdAt": "2024-01-01T10:00:00.000Z",
  "updatedAt": "2024-01-01T10:00:00.000Z"
}
```

**Response (404 Not Found):**
```json
{
  "error": "Book not found"
}
```

### Create a Book

**POST** `/api/books`

**Request Body:**
```json
{
  "title": "1984",
  "author": "George Orwell",
  "isbn": "9780451524935",
  "publishedDate": "1949-06-08",
  "pages": 328
}
```

**Response (201 Created):**
```json
{
  "id": 2,
  "title": "1984",
  "author": "George Orwell",
  "isbn": "9780451524935",
  "publishedDate": "1949-06-08",
  "pages": 328,
  "createdAt": "2024-01-01T10:05:00.000Z",
  "updatedAt": "2024-01-01T10:05:00.000Z"
}
```

**Response (400 Bad Request):**
```json
{
  "error": "Book with ISBN 9780451524935 already exists"
}
```

### Update a Book

**PUT** `/api/books/{id}`

**Request Body:**
```json
{
  "title": "1984 (Updated)",
  "author": "George Orwell",
  "isbn": "9780451524935",
  "publishedDate": "1949-06-08",
  "pages": 350
}
```

**Response (200 OK):**
```json
{
  "id": 2,
  "title": "1984 (Updated)",
  "author": "George Orwell",
  "isbn": "9780451524935",
  "publishedDate": "1949-06-08",
  "pages": 350,
  "createdAt": "2024-01-01T10:05:00.000Z",
  "updatedAt": "2024-01-01T10:10:00.000Z"
}
```

**Response (404 Not Found):**
```json
{
  "error": "Book not found"
}
```

### Delete a Book

**DELETE** `/api/books/{id}`

**Response (204 No Content):**
```json
{
  "message": "Book deleted successfully"
}
```

## Running Tests

### Run All Tests

Using Makefile:
```bash
make test
```

Or using npm directly:
```bash
npm test
```

### Run Tests in Watch Mode

```bash
npm run test:watch
```

### Run Specific Test File

```bash
npm test -- Book.test.js
```

## Code Coverage

### Generate Coverage Report

Using Makefile:
```bash
make coverage
```

Or using npm directly:
```bash
npm run coverage
```

This will generate:
- **LCOV Report** (SonarQube format): `coverage/lcov.info`
- **JSON Summary**: `coverage/coverage-summary.json`
- **HTML Report**: `coverage/index.html`

### View Coverage Report

Open the HTML report in your browser:
```bash
# On Linux/Mac
open coverage/index.html

# On Windows
start coverage/index.html

# Or navigate to the file manually
```

The coverage report includes:
- Line coverage
- Branch coverage
- Function coverage
- Statement coverage

## Build and Run

### Available Makefile Commands

```bash
make help      # Show all available commands
make build      # Install dependencies
make test       # Run test suite
make coverage   # Generate coverage reports (LCOV + HTML)
make run        # Run the application
make clean      # Clean build artifacts
```

### npm Scripts

```bash
# Install dependencies
npm install

# Run tests
npm test

# Run tests with coverage
npm run coverage

# Run application
npm start

# Run tests in watch mode
npm run test:watch
```

## Configuration

### Server Configuration

The server configuration is in `src/server.js`:
- **Port**: Defaults to `3000`, can be set via `PORT` environment variable
- **Host**: Listens on all interfaces (`0.0.0.0`)

### Environment Variables

```bash
PORT=3000  # Server port (default: 3000)
```

### Adding Database Support

Currently, the project uses in-memory storage. To add database support:

1. Install a database driver (e.g., `pg` for PostgreSQL, `mysql2` for MySQL, `mongodb` for MongoDB)
2. Update `bookService.js` to use database operations instead of in-memory array
3. Add database connection configuration

Example with PostgreSQL:
```javascript
const { Pool } = require('pg');
const pool = new Pool({
  host: 'localhost',
  database: 'books_db',
  user: 'user',
  password: 'password'
});
```

## Technologies Used

- **Node.js 18+** - JavaScript runtime
- **Express 4.18.2** - Web framework
- **Jest 29.7.0** - Testing framework
- **Supertest 6.3.3** - HTTP assertion library
- **body-parser 1.20.2** - Request body parsing middleware

## Example API Usage

### Using cURL

```bash
# Create a book
curl -X POST http://localhost:3000/api/books \
  -H "Content-Type: application/json" \
  -d '{
    "title": "The Catcher in the Rye",
    "author": "J.D. Salinger",
    "isbn": "9780316769488",
    "publishedDate": "1951-07-16",
    "pages": 234
  }'

# Get all books
curl http://localhost:3000/api/books

# Get book by ID
curl http://localhost:3000/api/books/1

# Update a book
curl -X PUT http://localhost:3000/api/books/1 \
  -H "Content-Type: application/json" \
  -d '{
    "title": "The Catcher in the Rye (Updated)",
    "author": "J.D. Salinger",
    "isbn": "9780316769488",
    "publishedDate": "1951-07-16",
    "pages": 250
  }'

# Delete a book
curl -X DELETE http://localhost:3000/api/books/1
```

### Using JavaScript/Node.js

```javascript
const axios = require('axios');

const BASE_URL = 'http://localhost:3000/api/books';

// Create a book
async function createBook() {
  const response = await axios.post(BASE_URL, {
    title: 'The Catcher in the Rye',
    author: 'J.D. Salinger',
    isbn: '9780316769488',
    publishedDate: '1951-07-16',
    pages: 234
  });
  console.log(response.data);
}

// Get all books
async function getAllBooks() {
  const response = await axios.get(BASE_URL);
  console.log(response.data);
}

// Get book by ID
async function getBookById(id) {
  const response = await axios.get(`${BASE_URL}/${id}`);
  console.log(response.data);
}

// Update a book
async function updateBook(id) {
  const response = await axios.put(`${BASE_URL}/${id}`, {
    title: 'The Catcher in the Rye (Updated)',
    author: 'J.D. Salinger',
    isbn: '9780316769488',
    publishedDate: '1951-07-16',
    pages: 250
  });
  console.log(response.data);
}

// Delete a book
async function deleteBook(id) {
  const response = await axios.delete(`${BASE_URL}/${id}`);
  console.log(response.status);
}
```

## Validation Rules

The Book model enforces the following validation rules:

- **title**: Required, max 200 characters
- **author**: Required, max 100 characters
- **isbn**: Required, max 13 characters, must be unique
- **publishedDate**: Required, valid date format (YYYY-MM-DD)
- **pages**: Required, must be a positive integer (minimum 1)

## Error Handling

The API returns appropriate HTTP status codes:

- `200 OK` - Successful GET/PUT request
- `201 Created` - Successful POST request
- `204 No Content` - Successful DELETE request
- `400 Bad Request` - Validation error, missing fields, or invalid JSON
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

### Error Response Format

```json
{
  "error": "Error message description"
}
```

## License

This project is part of the BrainStation23 QMS project.

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass and coverage is maintained
6. Commit your changes (`git commit -m 'Add some amazing feature'`)
7. Push to the branch (`git push origin feature/amazing-feature`)
8. Open a Pull Request

### Development Guidelines

- Follow JavaScript/Node.js best practices
- Write tests for all new features
- Maintain test coverage above 80%
- Update documentation as needed
- Use meaningful commit messages

## Support

For issues and questions, please contact the development team.

## Additional Resources

- [Node.js Documentation](https://nodejs.org/docs/)
- [Express.js Documentation](https://expressjs.com/)
- [Jest Documentation](https://jestjs.io/)
- [Supertest Documentation](https://github.com/visionmedia/supertest)
