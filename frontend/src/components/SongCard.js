import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './SongCard.css';

const MOOD_COLORS = {
  happy: '#f59e0b',
  sad: '#60a5fa',
  relaxed: '#34d399',
  energetic: '#f87171',
};

// Cache so we don't re-fetch same songs
const artCache = {};

export default function SongCard({ song, isFav, onFavToggle }) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [imgUrl, setImgUrl] = useState(null);
  const [imgError, setImgError] = useState(false);
  const color = MOOD_COLORS[song.mood] || '#a78bfa';

  useEffect(() => {
    const key = `${song.title}__${song.artist}`;
    if (artCache[key]) {
      setImgUrl(artCache[key]);
      return;
    }
    // Use iTunes Search API (no key needed, free, works in browser)
    const query = encodeURIComponent(`${song.title} ${song.artist}`);
    fetch(`https://itunes.apple.com/search?term=${query}&limit=1&entity=song`)
      .then(r => r.json())
      .then(data => {
        if (data.results && data.results.length > 0) {
          // Get high res version (replace 100x100 with 300x300)
          const url = data.results[0].artworkUrl100.replace('100x100', '300x300');
          artCache[key] = url;
          setImgUrl(url);
        }
      })
      .catch(() => setImgError(true));
  }, [song.title, song.artist]);

  const toggleFav = async () => {
    if (!user) { navigate('/auth'); return; }
    setLoading(true);
    try {
      if (isFav) {
        await axios.delete(`http://localhost:5000/api/favourites/${song.id}`, {
          headers: { Authorization: `Bearer ${user.token}` }
        });
      } else {
        await axios.post('http://localhost:5000/api/favourites', { song_id: song.id }, {
          headers: { Authorization: `Bearer ${user.token}` }
        });
      }
      onFavToggle && onFavToggle(song.id, !isFav);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="song-card" style={{ '--mood-color': color }}>
      <div className="song-cover">
        {imgUrl && !imgError ? (
          <img
            src={imgUrl}
            alt={song.title}
            className="cover-img"
            onError={() => setImgError(true)}
          />
        ) : (
          <div className="cover-art" style={{ background: `linear-gradient(135deg, ${color}33, ${color}11)` }}>
            <span className="music-icon">🎵</span>
          </div>
        )}
        <span className="song-duration">{song.duration}</span>
      </div>
      <div className="song-info">
        <h3 className="song-title">{song.title}</h3>
        <p className="song-artist">{song.artist}</p>
        <div className="song-meta">
          <span className="song-genre">{song.genre}</span>
          <span className="mood-badge" style={{ background: `${color}22`, color }}>
            {song.mood}
          </span>
        </div>
      </div>
      <button
        className={`fav-btn ${isFav ? 'fav-active' : ''}`}
        onClick={toggleFav}
        disabled={loading}
        title={isFav ? 'Remove from favourites' : 'Add to favourites'}
      >
        {isFav ? '♥' : '♡'}
      </button>
    </div>
  );
}