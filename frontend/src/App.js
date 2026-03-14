import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import MoodPage from './pages/MoodPage';
import Favourites from './pages/Favourites';
import Auth from './pages/Auth';
import './App.css';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="app">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/"           element={<Home />} />
              <Route path="/mood"       element={<MoodPage />} />
              <Route path="/favourites" element={<Favourites />} />
              <Route path="/auth"       element={<Auth />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
