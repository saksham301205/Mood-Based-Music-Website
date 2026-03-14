const express = require('express');
const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = 'moodmusic_secret_key_2024';

// ─── MySQL Connection ───────────────────────────────────────────────────────
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root123',        // <-- change to your MySQL password
  database: 'moodmusic'
});

db.connect(err => {
  if (err) { console.error('DB connection failed:', err); return; }
  console.log('✅ MySQL connected');
});

// ─── Middleware: verify JWT ──────────────────────────────────────────────────
function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Invalid token' });
  }
}

// ─── Auth Routes ────────────────────────────────────────────────────────────
app.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body;
  const hash = await bcrypt.hash(password, 10);
  db.query('INSERT INTO users (username, email, password) VALUES (?,?,?)',
    [username, email, hash],
    (err) => {
      if (err) return res.status(400).json({ error: 'User already exists' });
      res.json({ message: 'Registered successfully' });
    });
});

app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  db.query('SELECT * FROM users WHERE email=?', [email], async (err, results) => {
    if (err || results.length === 0) return res.status(400).json({ error: 'Invalid credentials' });
    const user = results[0];
    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: 'Invalid credentials' });
    const token = jwt.sign({ id: user.id, username: user.username }, JWT_SECRET, { expiresIn: '7d' });
    res.json({ token, username: user.username });
  });
});

// ─── Songs Routes ────────────────────────────────────────────────────────────
app.get('/api/songs/:mood', (req, res) => {
  db.query('SELECT * FROM songs WHERE mood=? ORDER BY RAND() LIMIT 10',
    [req.params.mood],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    });
});

// ─── Favourites Routes ───────────────────────────────────────────────────────
app.post('/api/favourites', authMiddleware, (req, res) => {
  const { song_id } = req.body;
  db.query('INSERT IGNORE INTO favourites (user_id, song_id) VALUES (?,?)',
    [req.user.id, song_id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Added to favourites' });
    });
});

app.delete('/api/favourites/:song_id', authMiddleware, (req, res) => {
  db.query('DELETE FROM favourites WHERE user_id=? AND song_id=?',
    [req.user.id, req.params.song_id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Removed from favourites' });
    });
});

app.get('/api/favourites', authMiddleware, (req, res) => {
  db.query(
    `SELECT s.* FROM songs s 
     JOIN favourites f ON s.id = f.song_id 
     WHERE f.user_id = ?`,
    [req.user.id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json(results);
    });
});

app.listen(5000, () => console.log('🎵 Server running on http://localhost:5000'));
