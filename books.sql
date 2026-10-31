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
INSERT INTO book (title, author, price, pages) VALUES
('The Great Gatsby', 'F. Scott Fitzgerald', 499, 180),
('To Kill a Mockingbird', 'Harper Lee', 399, 281),
('1984', 'George Orwell', 299, 328),
('Pride and Prejudice', 'Jane Austen', 249, 279),
('The Catcher in the Rye', 'J.D. Salinger', 350, 214),
('The Hobbit', 'J.R.R. Tolkien', 599, 310),
('Crime and Punishment', 'Fyodor Dostoevsky', 450, 671),
('The Alchemist', 'Paulo Coelho', 320, 208),
('Brave New World', 'Aldous Huxley', 380, 268),
('War and Peace', 'Leo Tolstoy', 750, 1225);
