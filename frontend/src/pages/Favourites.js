import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import SongCard from '../components/SongCard';
import { useAuth } from '../context/AuthContext';
import './Favourites.css';

export default function Favourites() {
  const { user } = useAuth();
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favIds, setFavIds] = useState(new Set());

  useEffect(() => {
    if (!user) return;
    axios.get('http://localhost:5000/api/favourites', {
      headers: { Authorization: `Bearer ${user.token}` }
    }).then(r => {
      setSongs(r.data);
      setFavIds(new Set(r.data.map(s => s.id)));
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [user]);

  const handleFavToggle = (songId, nowFav) => {
    if (!nowFav) {
      setSongs(prev => prev.filter(s => s.id !== songId));
      setFavIds(prev => { const n = new Set(prev); n.delete(songId); return n; });
    }
  };

  if (!user) return (
    <div className="fav-page">
      <div className="fav-locked">
        <span>🔒</span>
        <h2>Login to see your favourites</h2>
        <Link to="/auth" className="fav-login-btn">Login / Sign Up</Link>
      </div>
    </div>
  );

  return (
    <div className="fav-page">
      <div className="fav-header">
        <h1>♥ My Favourites</h1>
        <p>Songs you've saved — your personal collection</p>
      </div>

      {loading ? (
        <div className="loading-state">
          <div className="spinner" />
          <p>Loading your favourites...</p>
        </div>
      ) : songs.length === 0 ? (
        <div className="fav-empty">
          <span>🎵</span>
          <h3>No favourites yet!</h3>
          <p>Go discover music and save songs you love.</p>
          <Link to="/mood" className="fav-login-btn">Discover Music →</Link>
        </div>
      ) : (
        <>
          <div className="fav-stats">
            <div className="stat-item">
              <span className="stat-num">{songs.length}</span>
              <span className="stat-label">Songs Saved</span>
            </div>
            <div className="stat-item">
              <span className="stat-num">
                {[...new Set(songs.map(s => s.mood))].length}
              </span>
              <span className="stat-label">Moods</span>
            </div>
            <div className="stat-item">
              <span className="stat-num">
                {[...new Set(songs.map(s => s.artist))].length}
              </span>
              <span className="stat-label">Artists</span>
            </div>
          </div>
          <div className="songs-list">
            {songs.map(song => (
              <SongCard
                key={song.id}
                song={song}
                isFav={favIds.has(song.id)}
                onFavToggle={handleFavToggle}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
