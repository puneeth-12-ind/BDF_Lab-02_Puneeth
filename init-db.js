const path = require('path');
const { open } = require('sqlite');
const sqlite3 = require('sqlite3');

const dbPath = path.join(__dirname, 'books.db');

const initialBooks = [
  { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', price: 499, pages: 180 },
  { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', price: 399, pages: 281 },
  { id: 3, title: '1984', author: 'George Orwell', price: 299, pages: 328 },
  { id: 4, title: 'Pride and Prejudice', author: 'Jane Austen', price: 249, pages: 279 },
  { id: 5, title: 'The Catcher in the Rye', author: 'J.D. Salinger', price: 350, pages: 214 },
  { id: 6, title: 'The Hobbit', author: 'J.R.R. Tolkien', price: 599, pages: 310 },
  { id: 7, title: 'Crime and Punishment', author: 'Fyodor Dostoevsky', price: 450, pages: 671 },
  { id: 8, title: 'The Alchemist', author: 'Paulo Coelho', price: 320, pages: 208 },
  { id: 9, title: 'Brave New World', author: 'Aldous Huxley', price: 380, pages: 268 },
  { id: 10, title: 'War and Peace', author: 'Leo Tolstoy', price: 750, pages: 1225 }
];

async function setupDatabase() {
  const db = await open({
    filename: dbPath,
    driver: sqlite3.Database
  });

  console.log('Connected to SQLite database at:', dbPath);

  await db.exec(`
    DROP TABLE IF EXISTS book;
    CREATE TABLE book (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      author TEXT NOT NULL,
      price INTEGER NOT NULL,
      pages INTEGER NOT NULL
    );
  `);

  console.log('Created table "book".');

  for (const book of initialBooks) {
    await db.run(
      `INSERT INTO book (id, title, author, price, pages) VALUES (?, ?, ?, ?, ?);`,
      [book.id, book.title, book.author, book.price, book.pages]
    );
  }

  const rows = await db.all('SELECT * FROM book;');
  console.log(`Successfully seeded ${rows.length} books into the database:`);
  console.table(rows);

  await db.close();
  console.log('Database setup complete.');
}

setupDatabase().catch((err) => {
  console.error('Error setting up database:', err);
  process.exit(1);
});
