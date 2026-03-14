# 🎵 MoodTunes — Mood-Based Music Recommender

A full-stack React + Node.js + MySQL web app with 4 pages:
- **Home** — Landing page with mood overview
- **Discover** — Pick a mood, get song recommendations
- **Favourites** — Your saved songs (login required)
- **Login / Sign Up** — User authentication

---

## 📁 Project Structure

```
mood-music/
├── backend/
│   ├── server.js          ← Node.js + Express API
│   ├── database.sql       ← MySQL setup + seed data
│   └── package.json
└── frontend/
    ├── public/
    │   └── index.html
    ├── src/
    │   ├── App.js          ← Routes (4 pages)
    │   ├── App.css
    │   ├── index.js
    │   ├── context/
    │   │   └── AuthContext.js
    │   ├── components/
    │   │   ├── Navbar.js / Navbar.css
    │   │   └── SongCard.js / SongCard.css
    │   └── pages/
    │       ├── Home.js / Home.css
    │       ├── MoodPage.js / MoodPage.css
    │       ├── Favourites.js / Favourites.css
    │       └── Auth.js / Auth.css
    └── package.json
```

---

## ⚙️ Setup Instructions (VSCode)

### Step 1 — MySQL Setup

1. Open **MySQL Workbench** (or phpMyAdmin, or terminal)
2. Run the SQL file:
   ```
   mysql -u root -p < backend/database.sql
   ```
   Or paste the contents of `backend/database.sql` into MySQL Workbench and execute.

---

### Step 2 — Backend Setup

Open a **terminal in VSCode** (`Ctrl + `` ` ``):

```bash
cd backend
npm install
```

Then open `backend/server.js` and update your MySQL password (line 13):
```js
password: '',   // ← put your MySQL root password here
```

Start the backend:
```bash
npm run dev
```

You should see:
```
✅ MySQL connected
🎵 Server running on http://localhost:5000
```

---

### Step 3 — Frontend Setup

Open a **second terminal** in VSCode:

```bash
cd frontend
npm install
npm start
```

The app will open at **http://localhost:3000** 🎉

---

## 🌐 The 4 Pages

| Page | URL | Description |
|------|-----|-------------|
| Home | `/` | Landing page with mood cards |
| Discover | `/mood` | Select mood → get songs |
| Favourites | `/favourites` | Your saved songs |
| Login/Register | `/auth` | User accounts |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18, React Router v6 |
| Styling | CSS3 (custom, no UI library) |
| Backend | Node.js, Express |
| Auth | JWT + bcryptjs |
| Database | MySQL 8 |
| HTTP Client | Axios |

---

## ✅ Features

- [x] 4 separate pages with React Router navigation
- [x] Mood selection: Happy 😊, Sad 😢, Relaxed 😌, Energetic ⚡
- [x] Song recommendations from MySQL database (10 per mood)
- [x] User registration & login with JWT
- [x] Save / remove favourite songs
- [x] Favourites page with stats
- [x] Persistent login (localStorage)
- [x] Responsive design

---

## 🔌 API Endpoints

```
POST   /api/register          Register new user
POST   /api/login             Login, returns JWT
GET    /api/songs/:mood       Get songs by mood
GET    /api/favourites        Get user's favourites  [Auth]
POST   /api/favourites        Add a favourite        [Auth]
DELETE /api/favourites/:id    Remove a favourite     [Auth]
```
