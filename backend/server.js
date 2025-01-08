const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Initialize SQLite Database
const db = new sqlite3.Database('./database.sqlite', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to SQLite database.');
  }
});

// Create Users Table for authentication with email
db.run(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT UNIQUE,
    password TEXT
  )
`);

// API Endpoint for User Registration with email
app.post('/api/signup', (req, res) => {
  const { name, email, password } = req.body;

  const sql = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;
  db.run(sql, [name, email, password], function (err) {
    if (err) {
      console.error('Error registering user:', err.message);
      res.status(500).send({ error: 'Error registering user.' });
    } else {
      res.status(200).send({ message: 'User registered successfully!', id: this.lastID });
    }
  });
});

// API Endpoint for User Login with email
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  const sql = `SELECT * FROM users WHERE email = ?`;
  db.get(sql, [email], (err, row) => {
    if (err) {
      console.error('Error logging in:', err.message);
      res.status(500).send({ error: 'Error logging in.' });
    } else if (row && row.password === password) {
      res.status(200).send({ message: 'Login successful!', userId: row.id });
    } else {
      res.status(400).send({ error: 'Invalid email or password.' });
    }
  });
});

// API Endpoint to Get User Profile
app.get('/api/profile/:id', (req, res) => {
  const userId = req.params.id;
  const sql = `SELECT id, name, email FROM users WHERE id = ?`;

  db.get(sql, [userId], (err, row) => {
    if (err) {
      console.error('Error retrieving profile:', err.message);
      res.status(500).send({ error: 'Error retrieving profile.' });
    } else if (row) {
      res.status(200).send({ profile: row });
    } else {
      res.status(404).send({ error: 'User not found.' });
    }
  });
});

// API Endpoint to Update User Information (Name, Email, Password)
app.put('/api/update-profile/:id', (req, res) => {
  const userId = req.params.id;
  const { name, email, password } = req.body;

  const sql = `UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?`;
  db.run(sql, [name, email, password, userId], function (err) {
    if (err) {
      console.error('Error updating profile:', err.message);
      res.status(500).send({ error: 'Error updating profile.' });
    } else {
      res.status(200).send({ message: 'Profile updated successfully!' });
    }
  });
});

// API Endpoint for User Logout (Placeholder)
app.post('/api/logout', (req, res) => {
  // Since we're not using session tokens, this endpoint can just send a message for now.
  res.status(200).send({ message: 'User logged out.' });
});

// API Endpoint to Save Data
app.post('/api/save-measurements', (req, res) => {
  const { date, measurement, specialNotes } = req.body;
  const sql = `INSERT INTO measurements (date, measurement, specialNotes) VALUES (?, ?, ?)`;
  db.run(sql, [date, measurement, specialNotes], function (err) {
    if (err) {
      console.error('Error inserting data:', err.message);
      res.status(500).send({ error: err.message });
    } else {
      res.status(200).send({ message: 'Data saved successfully!', id: this.lastID });
    }
  });
});

// API Endpoint to Retrieve Data
app.get('/api/measurements', (req, res) => {
  const sql = `SELECT * FROM measurements`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      console.error('Error retrieving data:', err.message);
      res.status(500).send({ error: err.message });
    } else {
      res.status(200).send(rows);
    }
  });
});

app.listen(port, 'localhost', () => {
  console.log(`Server is running at http://localhost:${port}`);
});
