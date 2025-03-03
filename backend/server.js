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

    // Create `users` table
    db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        email TEXT UNIQUE,
        password TEXT
      )
    `);

    // Create `measurements` table with an additional 'type' column
    db.run(`
      CREATE TABLE IF NOT EXISTS measurements (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        date TEXT,
        measurement TEXT,
        specialNotes TEXT,
        type TEXT,  -- New column to store the type of measurement
        FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
      )
    `);
  }
});

// ==================== User Authentication ====================
// Signup
app.post('/api/signup', (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).send({ error: 'All fields are required.' });
  }

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

// Login
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  const sql = `SELECT id, password FROM users WHERE email = ?`;

  db.get(sql, [email], (err, row) => {
    if (err) {
      console.error('Error during login:', err.message);
      res.status(500).send({ error: 'Internal server error.' });
    } else if (row && row.password === password) {
      res.status(200).send({ message: 'Login successful!', id: row.id }); // Include user ID in response
    } else {
      res.status(400).send({ error: 'Invalid email or password.' });
    }
  });
});

// ==================== User Profile Management ====================
// Get User Profile
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

app.get('/api/users', (req, res) => {
  const sql = `SELECT id, name, email FROM users`;
  db.all(sql, [], (err, rows) => {
      if (err) {
          res.status(500).send({ error: 'Error retrieving users' });
      } else {
          res.status(200).json(rows);
      }
  });
});

// Delete User
app.delete('/api/delete-user/:id', (req, res) => {
  const userId = req.params.id;
  const sql = `DELETE FROM users WHERE id = ?`;

  db.run(sql, [userId], function (err) {
    if (err) {
      console.error('Error deleting user:', err.message);
      return res.status(500).send({ error: 'Failed to delete user.' });
    }

    if (this.changes === 0) {
      return res.status(404).send({ error: 'User not found.' });
    }

    res.status(200).send({ message: 'User deleted successfully.' });
  });
});



// Update User Profile
app.put('/api/update-profile/:id', (req, res) => {
  const userId = req.params.id;
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).send({ error: 'All fields are required.' });
  }

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

// ==================== Measurements Management ====================
// Save Measurement Data with 'type' field
app.post('/api/save-measurements', (req, res) => {
  const { user_id, date, measurement, specialNotes, type } = req.body;

  if (!user_id || !date || !measurement || !type) {
    return res.status(400).send({ error: 'Missing required fields.' });
  }

  const sql = `INSERT INTO measurements (user_id, date, measurement, specialNotes, type) VALUES (?, ?, ?, ?, ?)`;
  db.run(sql, [user_id, date, measurement, specialNotes, type], function (err) {
    if (err) {
      console.error('Error inserting data:', err.message);
      res.status(500).send({ error: 'Error saving data.' });
    } else {
      res.status(200).send({ message: 'Data saved successfully!', id: this.lastID });
    }
  });
});





// Retrieve Measurement Data for a Specific User
app.get('/api/measurements/:user_id', (req, res) => {
  const { user_id } = req.params;

  const sql = `SELECT * FROM measurements WHERE user_id = ?`;
  db.all(sql, [user_id], (err, rows) => {
    if (err) {
      console.error('Error retrieving data:', err.message);
      res.status(500).send({ error: 'Error retrieving data.' });
    } else {
      res.status(200).send(rows);
    }
  });
});

// ==================== Server Listener ====================
app.listen(port, 'localhost', () => {
  console.log(`Server is running at http://localhost:${port}`);
});
