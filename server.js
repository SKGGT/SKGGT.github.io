const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const serveStatic = require('serve-static');
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const hostname = '127.0.0.1';

const db = new sqlite3.Database(':memory:');

db.serialize(() => {
    db.run('CREATE TABLE users (userName TEXT, "values" TEXT)');

    const insertQuery = db.prepare('INSERT INTO users VALUES (?, ?)');
    insertQuery.run('user1', '1,2,3,4,5');
    insertQuery.run('user2', '6,7,8,9,10');
    insertQuery.finalize();
});

app.use(express.static(path.join(__dirname, 'public')));

app.get('*.js', (req, res, next) => {
    res.set('Content-Type', 'application/javascript');
    next();
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/users', (req, res) => {
  db.all('SELECT * FROM users', (err, rows) => {
    if (err) {
      res.status(500).send('Error fetching users');
    } else {
      res.json(rows);
    }
  });
});

app.listen(port, hostname, () => {
  console.log(`Server running on http://localhost:${port}`);
});