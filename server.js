const sqlite3 = require('sqlite3').verbose();
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const db = new sqlite3.Database(':memory:');

app.use(express.json());

// Create the table
db.serialize(() => {
    db.run('CREATE TABLE users (userName TEXT PRIMARY KEY, value TEXT)');
});

// POST request to add a new entry
app.post('/users', (req, res) => {
    const { userName, value } = req.body;
    db.run('INSERT INTO users (userName, value) VALUES (?, ?)', [userName, value], (err) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.status(201).send(`User ${userName} added successfully`);
        }
    });
});

// POST request to edit an entry
app.post('/users/:userName', (req, res) => {
    const userName = req.params.userName;
    const { value } = req.body;
    db.run('UPDATE users SET value = ? WHERE userName = ?', [value, userName], (err) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.status(200).send(`User ${userName} updated successfully`);
        }
    });
});

// GET request to retrieve a specific user
app.get('/users/:userName', (req, res) => {
    const userName = req.params.userName;
    db.get('SELECT * FROM users WHERE userName = ?', [userName], (err, row) => {
        if (err) {
            res.status(500).send(err.message);
        } else if (!row) {
            res.status(404).send(`User ${userName} not found`);
        } else {
            res.status(200).json(row);
        }
    });
});

// GET request to retrieve the entire table
app.get('/users', (req, res) => {
    db.all('SELECT * FROM users', [], (err, rows) => {
        if (err) {
            res.status(500).send(err.message);
        } else {
            res.status(200).json(rows);
        }
    });
});

app.listen(port, () => console.log(`Server running on port ${port}`));