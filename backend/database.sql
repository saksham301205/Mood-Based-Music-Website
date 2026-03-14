-- Run this file in MySQL Workbench or phpMyAdmin or terminal:
-- mysql -u root -p < database.sql

CREATE DATABASE IF NOT EXISTS moodmusic;
USE moodmusic;

CREATE TABLE IF NOT EXISTS users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS songs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(200) NOT NULL,
  artist VARCHAR(150) NOT NULL,
  mood ENUM('happy','sad','relaxed','energetic') NOT NULL,
  genre VARCHAR(100),
  duration VARCHAR(10),
  cover_url VARCHAR(500) DEFAULT '',
  spotify_url VARCHAR(500) DEFAULT '#'
);

CREATE TABLE IF NOT EXISTS favourites (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  song_id INT NOT NULL,
  added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (song_id) REFERENCES songs(id) ON DELETE CASCADE,
  UNIQUE KEY unique_fav (user_id, song_id)
);

-- ─── Seed Songs ──────────────────────────────────────────────────────────────
INSERT INTO songs (title, artist, mood, genre, duration) VALUES
-- HAPPY
('Happy', 'Pharrell Williams', 'happy', 'Pop', '3:53'),
('Can''t Stop the Feeling', 'Justin Timberlake', 'happy', 'Pop', '3:56'),
('Uptown Funk', 'Mark Ronson ft. Bruno Mars', 'happy', 'Funk', '4:30'),
('Good as Hell', 'Lizzo', 'happy', 'Pop', '2:39'),
('Walking on Sunshine', 'Katrina & The Waves', 'happy', 'Pop Rock', '3:56'),
('I Gotta Feeling', 'The Black Eyed Peas', 'happy', 'Pop', '4:49'),
('Shake It Off', 'Taylor Swift', 'happy', 'Pop', '3:39'),
('Levitating', 'Dua Lipa', 'happy', 'Disco Pop', '3:23'),
('Blinding Lights', 'The Weeknd', 'happy', 'Synth-pop', '3:20'),
('Dynamite', 'BTS', 'happy', 'Pop', '3:19'),

-- SAD
('Someone Like You', 'Adele', 'sad', 'Soul', '4:45'),
('The Night We Met', 'Lord Huron', 'sad', 'Indie', '3:28'),
('Fix You', 'Coldplay', 'sad', 'Alternative', '4:55'),
('Let Her Go', 'Passenger', 'sad', 'Folk', '4:14'),
('Skinny Love', 'Bon Iver', 'sad', 'Indie Folk', '3:58'),
('All I Want', 'Kodaline', 'sad', 'Indie', '5:16'),
('Liability', 'Lorde', 'sad', 'Indie Pop', '3:32'),
('Hurt', 'Johnny Cash', 'sad', 'Country', '3:38'),
('The Scientist', 'Coldplay', 'sad', 'Alternative', '5:09'),
('Gravity', 'John Mayer', 'sad', 'Blues Rock', '4:05'),

-- RELAXED
('weightless', 'Marconi Union', 'relaxed', 'Ambient', '8:09'),
('Sunset Lover', 'Petit Biscuit', 'relaxed', 'Electronic', '3:38'),
('Breathe (2 AM)', 'Anna Nalick', 'relaxed', 'Pop', '4:05'),
('Electric Feel', 'MGMT', 'relaxed', 'Indie', '3:49'),
('Banana Pancakes', 'Jack Johnson', 'relaxed', 'Acoustic', '3:10'),
('Better Together', 'Jack Johnson', 'relaxed', 'Acoustic', '3:29'),
('Bloom', 'The Paper Kites', 'relaxed', 'Folk', '3:44'),
('soft place to land', 'Kathleen Edwards', 'relaxed', 'Folk', '4:17'),
('Holocene', 'Bon Iver', 'relaxed', 'Indie Folk', '5:37'),
('Dreams', 'Fleetwood Mac', 'relaxed', 'Rock', '4:14'),

-- ENERGETIC
('Eye of the Tiger', 'Survivor', 'energetic', 'Rock', '4:04'),
('Lose Yourself', 'Eminem', 'energetic', 'Hip Hop', '5:26'),
('Thunderstruck', 'AC/DC', 'energetic', 'Rock', '4:52'),
('Jump Around', 'House of Pain', 'energetic', 'Hip Hop', '3:39'),
('Don''t Stop Me Now', 'Queen', 'energetic', 'Rock', '3:29'),
('Harder Better Faster', 'Daft Punk', 'energetic', 'Electronic', '3:45'),
('Till I Collapse', 'Eminem', 'energetic', 'Hip Hop', '4:57'),
('Power', 'Kanye West', 'energetic', 'Hip Hop', '4:52'),
('Pump It', 'Black Eyed Peas', 'energetic', 'Pop', '3:32'),
('Run The World', 'Beyoncé', 'energetic', 'Pop', '3:57');
