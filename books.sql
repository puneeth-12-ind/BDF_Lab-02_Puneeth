-- SQLite Database Schema and Seed Data for Lab 2: SQLite database and CRUD routes
-- Faculty: Sai Siva Teja | Course: Backend Development Fundamentals

DROP TABLE IF EXISTS book;

CREATE TABLE IF NOT EXISTS book (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    author TEXT NOT NULL,
    price INTEGER NOT NULL,
    pages INTEGER NOT NULL
);

-- Insert 10 initial rows
INSERT INTO book (id, title, author, price, pages) VALUES
(1, 'Clean Code', 'Robert C. Martin', 650, 464),
(2, 'The Pragmatic Programmer', 'Andrew Hunt', 720, 352),
(3, 'Introduction to Algorithms', 'Thomas H. Cormen', 1200, 1312),
(4, 'JavaScript: The Good Parts', 'Douglas Crockford', 450, 176),
(5, 'Design Patterns', 'Erich Gamma', 850, 395),
(6, 'You Don''t Know JS Yet', 'Kyle Simpson', 500, 142),
(7, 'Refactoring', 'Martin Fowler', 780, 448),
(8, 'Cracking the Coding Interview', 'Gayle Laakmann McDowell', 900, 687),
(9, 'Head First Design Patterns', 'Eric Freeman', 699, 694),
(10, 'Database System Concepts', 'Abraham Silberschatz', 1100, 1376);
