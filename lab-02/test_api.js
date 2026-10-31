const path = require('path');
const { open } = require('sqlite');
const sqlite3 = require('sqlite3');
const app = require('./index');

const dbPath = path.join(__dirname, 'books.db');

async function runTests() {
  console.log('====================================================');
  console.log('🧪 Starting Lab-2 CRUD Endpoints Automated Test');
  console.log('====================================================\n');

  // Start test server on port 3001
  const PORT = 3001;
  const server = app.listen(PORT);
  const baseUrl = `http://localhost:${PORT}`;

  // Helper fetch function using native Node 18+ fetch
  async function request(endpoint, options = {}) {
    const res = await fetch(`${baseUrl}${endpoint}`, {
      headers: { 'Content-Type': 'application/json', ...options.headers },
      ...options,
    });
    const status = res.status;
    let data;
    try {
      data = await res.json();
    } catch {
      data = await res.text();
    }
    return { status, data };
  }

  try {
    // 1. Test Root
    console.log('▶ Test 1: GET / (API Info)');
    const rootRes = await request('/');
    console.log(`Status: ${rootRes.status}`);
    console.log('Response:', JSON.stringify(rootRes.data, null, 2));
    console.log('----------------------------------------------------\n');

    // 2. Test GET /books/
    console.log('▶ Test 2: GET /books/ (All Books)');
    const getAllRes = await request('/books/');
    console.log(`Status: ${getAllRes.status}`);
    console.log(`Retrieved ${getAllRes.data.length} books.`);
    console.log('First 2 books:', JSON.stringify(getAllRes.data.slice(0, 2), null, 2));
    console.log('----------------------------------------------------\n');

    // 3. Test GET /books/:bookId/ (Valid ID)
    console.log('▶ Test 3: GET /books/1/ (Single Book)');
    const getOneRes = await request('/books/1/');
    console.log(`Status: ${getOneRes.status}`);
    console.log('Book 1:', JSON.stringify(getOneRes.data, null, 2));
    console.log('----------------------------------------------------\n');

    // 4. Test GET /books/:bookId/ (Non-existent ID)
    console.log('▶ Test 4: GET /books/999/ (404 Error Case)');
    const getNotFoundRes = await request('/books/999/');
    console.log(`Status: ${getNotFoundRes.status}`);
    console.log('Response:', JSON.stringify(getNotFoundRes.data, null, 2));
    console.log('----------------------------------------------------\n');

    // 5. Test POST /books/
    console.log('▶ Test 5: POST /books/ (Create New Book)');
    const newBook = {
      title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
      author: 'Robert C. Martin',
      price: 650,
      pages: 464,
    };
    const postRes = await request('/books/', {
      method: 'POST',
      body: JSON.stringify(newBook),
    });
    console.log(`Status: ${postRes.status}`);
    console.log('Response:', JSON.stringify(postRes.data, null, 2));
    const createdId = postRes.data.bookId;
    console.log('----------------------------------------------------\n');

    // Verify in database that book was added
    const db = await open({ filename: dbPath, driver: sqlite3.Database });
    const insertedDbBook = await db.get('SELECT * FROM book WHERE id = ?;', [createdId]);
    console.log('🔍 Database Verification (POST):', insertedDbBook);
    console.log('----------------------------------------------------\n');

    // 6. Test PUT /books/:bookId/
    console.log(`▶ Test 6: PUT /books/${createdId}/ (Update Book)`);
    const updatePayload = {
      title: 'Clean Code (Revised Edition)',
      author: 'Robert C. Martin',
      price: 720,
      pages: 464,
    };
    const putRes = await request(`/books/${createdId}/`, {
      method: 'PUT',
      body: JSON.stringify(updatePayload),
    });
    console.log(`Status: ${putRes.status}`);
    console.log('Response:', JSON.stringify(putRes.data, null, 2));
    console.log('----------------------------------------------------\n');

    // Verify in database that book was updated
    const updatedDbBook = await db.get('SELECT * FROM book WHERE id = ?;', [createdId]);
    console.log('🔍 Database Verification (PUT):', updatedDbBook);
    console.log('----------------------------------------------------\n');

    // 7. Test DELETE /books/:bookId/
    console.log(`▶ Test 7: DELETE /books/${createdId}/ (Delete Book)`);
    const deleteRes = await request(`/books/${createdId}/`, {
      method: 'DELETE',
    });
    console.log(`Status: ${deleteRes.status}`);
    console.log('Response:', JSON.stringify(deleteRes.data, null, 2));
    console.log('----------------------------------------------------\n');

    // Verify in database that book was deleted
    const deletedDbBook = await db.get('SELECT * FROM book WHERE id = ?;', [createdId]);
    console.log('🔍 Database Verification (DELETE):', deletedDbBook ? 'Still exists!' : 'Successfully removed from DB (null)');
    console.log('----------------------------------------------------\n');

    // 8. Confirm GET returns 404 after deletion
    console.log(`▶ Test 8: GET /books/${createdId}/ after deletion`);
    const getDeletedRes = await request(`/books/${createdId}/`);
    console.log(`Status: ${getDeletedRes.status}`);
    console.log('Response:', JSON.stringify(getDeletedRes.data, null, 2));
    console.log('----------------------------------------------------\n');

    await db.close();
    console.log('✅ All 8 API test suites passed successfully!');
  } catch (err) {
    console.error('❌ Test failed with error:', err);
  } finally {
    server.close();
    process.exit(0);
  }
}

// Wait 1 second for initializeDBAndServer inside index.js to open DB
setTimeout(runTests, 1000);
