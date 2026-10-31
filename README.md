# Lab 2: SQLite database and CRUD routes

**K PUNEETH SAI · 252U1R1204 · CSE-2D, S19**  
**Backend Development Fundamentals · Year II Term II · Aurora Deemed To Be University · Faculty: Sai Siva Teja**  

- **GitHub Repository:** [https://github.com/puneeth-12-ind/BDF_Lab-02_Puneeth](https://github.com/puneeth-12-ind/BDF_Lab-02_Puneeth)
- **Live Link:** [https://backend-development-fundamentals-pu-phi.vercel.app](https://backend-development-fundamentals-pu-phi.vercel.app) *(Deployable on Vercel with built-in serverless fallback configuration and `vercel.json`)*

---

##  Table of Contents
1. [Objective](#objective)
2. [Project File Structure](#project-file-structure)
3. [Database Schema & Initial Seed](#database-schema--initial-seed)
4. [How to Run (Install, Environment Variables, Start Commands)](#how-to-run)
5. [Endpoints Table](#endpoints-table)
6. [Screenshots of Working Endpoints](#screenshots-of-working-endpoints)
7. [Viva Questions & Answers](#viva-questions--answers)
8. [Notes: Problems Faced and How They Were Solved](#notes-problems-faced-and-how-they-were-solved)

---

##  Objective
Connect an Express.js web server to a persistent SQLite relational database (`books.db`) using the modern asynchronous `sqlite` wrapper and `sqlite3` driver. Expose five RESTful CRUD (Create, Read, Update, Delete) endpoints over HTTP using parameterized queries (`?` placeholders) to prevent SQL injection vulnerabilities.

---

##  Project File Structure

```text
BDF_Lab-02_Puneeth/
├── .env.example                       # Sample environment configuration template
├── .gitignore                         # Excludes node_modules, .env, and logs
├── app.http                           # REST Client requests for in-editor testing in VS Code
├── books.db                           # Persistent SQLite database file
├── books.sql                          # Database schema DDL & 10 book INSERT statements
├── index.js                           # Express server with initializeDBAndServer() & CRUD routes
├── init-db.js                         # Database seed/reset utility with console.table view
├── package.json                       # Project dependencies (express, sqlite, sqlite3, nodemon)
├── package-lock.json
├── README.md                          # Comprehensive lab report and documentation
├── vercel.json                        # Vercel serverless routing configuration
└── screenshots/                       # Verified working output screenshots (laptop screen format)
    ├── 01_get_all_books.png
    ├── 02_get_single_book.png
    ├── 03_post_add_book.png
    ├── 04_put_update_book.png
    ├── 05_delete_book.png
    ├── 06_get_404_not_found.png
    └── 07_sqlite_cli_view.png
```

---

##  Database Schema & Initial Seed

### Database Table Definition
The database table `book` is created in SQLite with the following structure:

```sql
CREATE TABLE IF NOT EXISTS book (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    price INTEGER NOT NULL,
    pages INTEGER NOT NULL
);
```

### Initial Seed Data (10 Books)
The database is pre-populated with 10 classic literary records:

| id | title | author | price (₹) | pages |
|:---:|:---|:---|:---:|:---:|
| 1 | The Great Gatsby | F. Scott Fitzgerald | 499 | 180 |
| 2 | To Kill a Mockingbird | Harper Lee | 399 | 281 |
| 3 | 1984 | George Orwell | 299 | 328 |
| 4 | Pride and Prejudice | Jane Austen | 249 | 279 |
| 5 | The Catcher in the Rye | J.D. Salinger | 350 | 214 |
| 6 | The Hobbit | J.R.R. Tolkien | 599 | 310 |
| 7 | Crime and Punishment | Fyodor Dostoevsky | 450 | 671 |
| 8 | The Alchemist | Paulo Coelho | 320 | 208 |
| 9 | Brave New World | Aldous Huxley | 380 | 268 |
| 10 | War and Peace | Leo Tolstoy | 750 | 1225 |

---

##  How to Run

### 1. Prerequisites
- **Node.js** (v18.x or later installed)
- **npm** (v9.x or later installed)
- **SQLite3 CLI** (optional, for direct command-line database inspection)

### 2. Clone Repository & Install Dependencies
```bash
# Clone the repository
git clone https://github.com/puneeth-12-ind/BDF_Lab-02_Puneeth.git

# Navigate into the project folder
cd BDF_Lab-02_Puneeth

# Install express, sqlite, sqlite3, and nodemon
npm install
```

### 3. Environment Variables
Create an optional `.env` file in the root directory (refer to `.env.example`):
```env
PORT=3000
STUDENT_NAME=K PUNEETH SAI
STUDENT_REG_NO=252U1R1204
STUDENT_SECTION=CSE-2D, S19
```
*(Note: As per submission rules, sensitive credentials and `.env` files are never committed to version control).*

### 4. Database Initialization (Reset / Reseed)
To create or reset the `books.db` file with the initial 10 book records:
```bash
node init-db.js
```

### 5. Start the Server
- **Development Mode (with auto-restart via `nodemon` on file changes):**
  ```bash
  npm run dev
  # Server starts listening at http://localhost:3000/
  ```

- **Production Mode:**
  ```bash
  npm start
  ```

### 6. Testing Endpoints
- **Using VS Code REST Client:** Open `app.http` in VS Code and click **"Send Request"** above any route.
- **Using Postman / Browser / cURL:** Target `http://localhost:3000/books/`.

---

##  Endpoints Table

| HTTP Method | Route Path | Expected Status Code | Description | Request Body / Parameters |
|:---:|:---|:---:|:---|:---|
| `GET` | `/` | `200 OK` | API health check & overview index | None |
| `GET` | `/books/` | `200 OK` | Fetch all books sorted by ID ascending | None |
| `GET` | `/books/:bookId/` | `200 OK` / `404 Not Found` | Fetch single book details by ID | URL Param: `bookId` (e.g. `1`) |
| `POST` | `/books/` | `201 Created` / `400 Bad Request` | Insert a new book record into the database | JSON: `{"title": "Clean Code", "author": "Robert C. Martin", "price": 650, "pages": 464}` |
| `PUT` | `/books/:bookId/` | `200 OK` / `404 Not Found` | Update an existing book's details by ID | URL Param: `bookId` + JSON: `{"title": "The Great Gatsby (Collector's Edition)", "author": "F. Scott Fitzgerald", "price": 599, "pages": 195}` |
| `DELETE` | `/books/:bookId/` | `200 OK` / `404 Not Found` | Delete an existing book by ID from the database | URL Param: `bookId` (e.g. `11`) |

---

##  Screenshots of Working Endpoints

*All screenshots below were captured from the laptop environment, showing the active Windows desktop, taskbar, system tray, and response headers.*

### 1. GET `/books/` — Retrieve All Books
Retrieves all 10 initial books in JSON format with HTTP status `200 OK`.
![GET All Books](screenshots/01_get_all_books.png)

---

### 2. GET `/books/:bookId/` — Retrieve Single Book
Retrieves details for `bookId = 1` (*The Great Gatsby*) with HTTP status `200 OK`.
![GET Single Book](screenshots/02_get_single_book.png)

---

### 3. POST `/books/` — Add New Book
Inserts a new book into `books.db` using parameterized queries and returns HTTP status `201 Created` with the newly generated `bookId: 11`.
![POST Add Book](screenshots/03_post_add_book.png)

---

### 4. PUT `/books/:bookId/` — Update Book
Modifies book details for `bookId = 1` using parameterized queries and returns HTTP status `200 OK`.
![PUT Update Book](screenshots/04_put_update_book.png)

---

### 5. DELETE `/books/:bookId/` — Remove Book
Deletes the newly inserted `bookId = 11` from the database and returns HTTP status `200 OK`.
![DELETE Book](screenshots/05_delete_book.png)

---

### 6. GET `/books/999/` — 404 Not Found Handling
Demonstrates error handling when requesting a non-existent book ID, returning HTTP status `404 Not Found` with message `'Book Not Found'`.
![GET 404 Not Found](screenshots/06_get_404_not_found.png)

---

### 7. SQLite CLI & Database Verification
Windows Command Prompt view verifying `sqlite3 books.db`, checking `.tables`, inspecting `.schema book`, and running `SELECT * FROM book;` to confirm persistent storage.
![SQLite CLI Verification](screenshots/07_sqlite_cli_view.png)

---


## 📝 Notes: Problems Faced and How They Were Solved

1. **Serverless & Native C++ Driver Compatibility:**
   - *Problem:* Compiling and executing native C++ SQLite binaries (`sqlite3.node`) can face platform restrictions in pure serverless runtimes (such as Vercel).
   - *Solution:* Implemented dynamic `try/catch` loading for `sqlite` and `sqlite3` alongside an `inMemoryBooks` array fallback. This allows native disk SQLite operations locally while guaranteeing seamless execution on serverless platforms.

2. **Route Trailing Slash Flexibility:**
   - *Problem:* Discrepancies between requests with and without trailing slashes (e.g. `/books` vs `/books/`) can cause 404 errors or unnecessary 301 redirects.
   - *Solution:* Configured Express route path arrays (e.g. `['/books', '/books/']` and `['/books/:bookId', '/books/:bookId/']`) across all endpoints so that both URL variants are handled natively.

3. **Preventing SQL Injection with Parameterized Queries:**
   - *Problem:* Direct concatenation of route params or request bodies into SQL queries exposes the database to injection attacks.
   - *Solution:* Replaced all dynamic SQL string interpolations with `?` parameter markers and passed input values via parameter arrays to `db.get()` and `db.run()`.

4. **Synchronizing Postman Results with SQLite File on Disk:**
   - *Problem:* Verifying that HTTP operations (`POST`, `PUT`, `DELETE`) actually mutate the underlying `.db` file rather than just volatile memory.
   - *Solution:* Ran verification queries via the SQLite CLI (`sqlite3 books.db`) to cross-reference that table rows, assigned primary keys, and updated values persist directly to disk storage.
