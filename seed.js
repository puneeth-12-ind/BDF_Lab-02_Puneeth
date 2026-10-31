const path = require('path');
const { open } = require('sqlite');
const sqlite3 = require('sqlite3');

const dbPath = path.join(__dirname, 'books.db');

const seedDatabase = async () => {
  try {
    const db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    console.log('Connected to database at:', dbPath);

    // Create table
    await db.exec(`
      DROP TABLE IF EXISTS book;
      CREATE TABLE IF NOT EXISTS book (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        author TEXT NOT NULL,
        price INTEGER NOT NULL,
        pages INTEGER NOT NULL
      );
    `);
    console.log('Created "book" table.');

    // Seed 10 rows
    const books = [
      { title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', price: 499, pages: 180 },
      { title: 'To Kill a Mockingbird', author: 'Harper Lee', price: 399, pages: 281 },
      { title: '1984', author: 'George Orwell', price: 299, pages: 328 },
      { title: 'Pride and Prejudice', author: 'Jane Austen', price: 249, pages: 279 },
      { title: 'The Catcher in the Rye', author: 'J.D. Salinger', price: 350, pages: 214 },
      { title: 'The Hobbit', author: 'J.R.R. Tolkien', price: 599, pages: 310 },
      { title: 'Crime and Punishment', author: 'Fyodor Dostoevsky', price: 450, pages: 671 },
      { title: 'The Alchemist', author: 'Paulo Coelho', price: 320, pages: 208 },
      { title: 'Brave New World', author: 'Aldous Huxley', price: 380, pages: 268 },
      { title: 'War and Peace', author: 'Leo Tolstoy', price: 750, pages: 1225 },
    ];

    for (const b of books) {
      await db.run(
        `INSERT INTO book (title, author, price, pages) VALUES (?, ?, ?, ?);`,
        [b.title, b.author, b.price, b.pages]
      );
    }

    console.log(`Successfully seeded ${books.length} books into the database.`);

    const count = await db.get(`SELECT COUNT(*) as count FROM book;`);
    console.log(`Current book count in database: ${count.count}`);

    await db.close();
  } catch (err) {
    console.error('Error seeding database:', err.message);
  }
};

seedDatabase();
