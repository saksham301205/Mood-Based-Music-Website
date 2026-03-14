import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import SongCard from '../components/SongCard';
import './MoodPage.css';

const MOODS = [
  {
    id: 'happy', emoji: '😊', label: 'Happy', color: '#f59e0b',
    tagline: 'Spread the joy and smile!',
    bg: 'https://images.unsplash.com/photo-1531747118685-ca8fa6e08806?w=1400&q=80',
    overlay: 'rgba(180,100,0,0.45)',
  },
  {
    id: 'sad', emoji: '😢', label: 'Sad', color: '#60a5fa',
    tagline: 'Let it all out...',
    bg: 'https://images.unsplash.com/photo-1501999635878-71cb5379c2d8?w=1400&q=80',
    overlay: 'rgba(15,30,100,0.6)',
  },
  {
    id: 'relaxed', emoji: '😌', label: 'Relaxed', color: '#34d399',
    tagline: 'Breathe, unwind and find peace',
    bg: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1400&q=80',
    overlay: 'rgba(4,60,40,0.5)',
  },
  {
    id: 'energetic', emoji: '⚡', label: 'Energetic', color: '#f87171',
    tagline: "Pump it up, let's go!",
    bg: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=1400&q=80',
    overlay: 'rgba(120,15,15,0.55)',
  },
];

export default function MoodPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialMood = searchParams.get('m') || '';
  const [selected, setSelected] = useState(initialMood);
  const [songs, setSongs] = useState([]);
  const [favIds, setFavIds] = useState(new Set());
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.get('http://localhost:5000/api/favourites', {
        headers: { Authorization: `Bearer ${token}` }
      }).then(r => setFavIds(new Set(r.data.map(s => s.id)))).catch(() => {});
    }
  }, []);

  useEffect(() => {
    if (!selected) return;
    setLoading(true);
    axios.get(`http://localhost:5000/api/songs/${selected}`)
      .then(r => { setSongs(r.data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [selected]);

  const chooseMood = (id) => {
    setSelected(id);
    setSearchParams({ m: id });
  };

  const handleFavToggle = (songId, nowFav) => {
    setFavIds(prev => {
      const next = new Set(prev);
      nowFav ? next.add(songId) : next.delete(songId);
      return next;
    });
  };

  const currentMood = MOODS.find(m => m.id === selected);

  return (
    <div className="mood-page">
      <div
        className="mood-banner"
        style={currentMood ? { backgroundImage: `url(${currentMood.bg})` } : {}}
      >
        <div
          className="mood-banner-overlay"
          style={{ background: currentMood ? currentMood.overlay : 'rgba(7,7,15,0.8)' }}
        />
        <div className="mood-banner-content">
          <span className="banner-emoji">{currentMood ? currentMood.emoji : '🎵'}</span>
          <h1 className="banner-title">
            {currentMood ? currentMood.label + ' Vibes' : 'Discover Music'}
          </h1>
          <p className="banner-tagline">
            {currentMood ? currentMood.tagline : 'Select a mood below to get started'}
          </p>
        </div>
      </div>

      <div className="mood-body">
        <div className="mood-selector">
          {MOODS.map(m => (
            <button
              key={m.id}
              className={'mood-pill' + (selected === m.id ? ' active' : '')}
              style={{ '--mc': m.color }}
              onClick={() => chooseMood(m.id)}
            >
              <span>{m.emoji}</span>
              <span>{m.label}</span>
            </button>
          ))}
        </div>

        {selected && (
          <div className="results-section">
            <div className="results-header">
              <h2 style={{ color: currentMood ? currentMood.color : '#fff' }}>
                {currentMood ? currentMood.emoji + ' ' + currentMood.label + ' Playlist' : ''}
              </h2>
              <span className="count-badge">{songs.length} songs</span>
            </div>
            {loading ? (
              <div className="loading-state">
                <div className="spinner" />
                <p>Finding your songs...</p>
              </div>
            ) : (
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
            )}
          </div>
        )}

        {!selected && (
          <div className="empty-state">
            <span>🎵</span>
            <p>Choose a mood above to start discovering music!</p>
          </div>
        )}
      </div>
    </div>
  );
}