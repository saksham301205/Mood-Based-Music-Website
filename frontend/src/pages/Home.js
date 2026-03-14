import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Home.css';

const MOODS = [
  { id: 'happy', emoji: '😊', label: 'Happy', desc: 'Upbeat & joyful vibes', color: '#f59e0b' },
  { id: 'sad', emoji: '😢', label: 'Sad', desc: 'Emotional & reflective', color: '#60a5fa' },
  { id: 'relaxed', emoji: '😌', label: 'Relaxed', desc: 'Calm & peaceful tones', color: '#34d399' },
  { id: 'energetic', emoji: '⚡', label: 'Energetic', desc: 'High energy & pumped', color: '#f87171' },
];

export default function Home() {
  const { user } = useAuth();

  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">🎵 Music for every emotion</div>
          <h1 className="hero-title">
            How are you <br />
            <span className="gradient-text">feeling today?</span>
          </h1>
          <p className="hero-sub">
            Tell us your mood and we'll craft the perfect playlist for this moment.
          </p>
          <div className="hero-actions">
            <Link to="/mood" className="cta-btn primary">Discover Music →</Link>
            {!user && (
              <Link to="/auth" className="cta-btn secondary">Create Account</Link>
            )}
          </div>
        </div>
        <div className="hero-visual">
          <div className="vinyl-disc">
            <div className="vinyl-inner">🎵</div>
          </div>
          <div className="floating-note n1">♩</div>
          <div className="floating-note n2">♪</div>
          <div className="floating-note n3">♫</div>
        </div>
      </section>

      <section className="mood-preview">
        <h2 className="section-title">Pick your mood</h2>
        <div className="mood-grid">
          {MOODS.map(m => (
            <Link to={`/mood?m=${m.id}`} key={m.id} className="mood-card" style={{ '--mc': m.color }}>
              <span className="mood-emoji">{m.emoji}</span>
              <h3>{m.label}</h3>
              <p>{m.desc}</p>
              <div className="mood-glow" />
            </Link>
          ))}
        </div>
      </section>

      <section className="features">
        <div className="feature-card">
          <span className="feat-icon">🎯</span>
          <h3>Mood Matching</h3>
          <p>AI-curated songs that match exactly how you feel right now.</p>
        </div>
        <div className="feature-card">
          <span className="feat-icon">♥</span>
          <h3>Save Favourites</h3>
          <p>Build your personal library of songs you love.</p>
        </div>
        <div className="feature-card">
          <span className="feat-icon">🔒</span>
          <h3>Your Account</h3>
          <p>Sign up to save preferences and access across devices.</p>
        </div>
      </section>
    </div>
  );
}
