'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <nav className="navbar slide-down">
      <div className="nav-container">
        <div className="nav-links nav-desktop">
          <Link href="/" className="nav-link">Home</Link>
          <Link href="/about" className="nav-link">About</Link>
          <Link href="/service" className="nav-link">Service</Link>
        </div>
        <div className="nav-logo">
          <div className="logo-circle bounce">S</div>
          <span className="nav-logo-text">Saandeep</span>
        </div>
        <div className="nav-links nav-desktop">
          <Link href="/resume" className="nav-link">Resume</Link>
          <Link href="/project" className="nav-link">Project</Link>
          <Link href="/contact" className="nav-link">Contact Us</Link>
          <button onClick={toggleDarkMode} className="theme-toggle">
            {isDarkMode ? '☀️' : '🌙'}
          </button>
        </div>
        
        <div className="nav-mobile">
          <button onClick={toggleDarkMode} className="theme-toggle">
            {isDarkMode ? '☀️' : '🌙'}
          </button>
          <button 
            className="mobile-menu-btn"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            ☰
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="mobile-menu">
            <Link href="/" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
            <Link href="/about" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>About</Link>
            <Link href="/service" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Service</Link>
            <Link href="/resume" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Resume</Link>
            <Link href="/project" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Project</Link>
            <Link href="/contact" className="nav-link" onClick={() => setIsMobileMenuOpen(false)}>Contact Us</Link>
          </div>
        )}
      </div>
    </nav>
  );
}