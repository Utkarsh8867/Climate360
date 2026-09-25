import React from 'react';
import { useState } from 'react';

function Header({ onNavigate, currentPage }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface-container-lowest/90 backdrop-blur-xl border-b border-outline-variant/30 shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="h-20 max-w-[1280px] mx-auto px-margin flex items-center justify-between gap-gutter">
        {/* Logo */}
        <div className="flex items-center gap-space-md">
          <button
            onClick={() => { onNavigate('landing'); setMenuOpen(false); }}
            className="flex items-center gap-space-sm focus:outline-none group"
          >
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-on-primary font-bold">
              C
            </div>
            <div className="flex flex-col">
              <span className="font-headline-sm text-headline-sm text-primary tracking-tight leading-none">Climate360</span>
              <span className="font-label-sm text-[10px] text-on-surface-variant tracking-normal leading-tight hidden sm:inline-block">Data to Action</span>
            </div>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 hover:bg-surface-container rounded-lg transition-colors"
        >
          <span className="material-symbols-outlined text-[24px]">
            {menuOpen ? 'close' : 'menu'}
          </span>
        </button>

        {/* Navigation */}
        <nav className={`hidden md:flex items-center gap-6`}>
          <button
            onClick={() => { onNavigate('landing'); setMenuOpen(false); }}
            className={`px-3.5 py-2 rounded-xl font-label-lg text-label-lg transition-colors ${
              currentPage === 'landing'
                ? 'text-primary font-bold bg-surface-container-low'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => { onNavigate('about'); setMenuOpen(false); }}
            className={`px-3.5 py-2 rounded-xl font-label-lg text-label-lg transition-colors ${
              currentPage === 'about'
                ? 'text-primary font-bold bg-surface-container-low'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
            }`}
          >
            About
          </button>
          <button
            onClick={() => {
              if (currentPage !== 'landing') onNavigate('landing');
              setTimeout(() => document.getElementById('risk-engines')?.scrollIntoView({ behavior: 'smooth' }), 100);
              setMenuOpen(false);
            }}
            className="px-3.5 py-2 rounded-xl font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
          >
            Intelligence
          </button>
          <button
            onClick={() => {
              if (currentPage !== 'landing') onNavigate('landing');
              setTimeout(() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' }), 100);
              setMenuOpen(false);
            }}
            className="px-3.5 py-2 rounded-xl font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
          >
            How It Works
          </button>
          <button
            onClick={() => { onNavigate('dashboard'); setMenuOpen(false); }}
            className={`px-3.5 py-2 rounded-xl font-label-lg text-label-lg transition-colors ${
              currentPage === 'dashboard'
                ? 'text-primary font-bold bg-surface-container-low'
                : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
            }`}
          >
            Dashboard
          </button>
        </nav>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="absolute top-20 left-0 right-0 bg-surface-container-lowest border-b border-outline-variant/30 md:hidden">
            <nav className="flex flex-col p-4 gap-2">
              <button
                onClick={() => { onNavigate('landing'); setMenuOpen(false); }}
                className={`px-3.5 py-2 rounded-xl font-label-lg text-label-lg transition-colors text-left ${
                  currentPage === 'landing'
                    ? 'text-primary font-bold bg-surface-container-low'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => { onNavigate('about'); setMenuOpen(false); }}
                className={`px-3.5 py-2 rounded-xl font-label-lg text-label-lg transition-colors text-left ${
                  currentPage === 'about'
                    ? 'text-primary font-bold bg-surface-container-low'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                }`}
              >
                About
              </button>
              <button
                onClick={() => {
                  if (currentPage !== 'landing') onNavigate('landing');
                  setTimeout(() => document.getElementById('risk-engines')?.scrollIntoView({ behavior: 'smooth' }), 100);
                  setMenuOpen(false);
                }}
                className="px-3.5 py-2 rounded-xl font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors text-left"
              >
                Intelligence
              </button>
              <button
                onClick={() => {
                  if (currentPage !== 'landing') onNavigate('landing');
                  setTimeout(() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' }), 100);
                  setMenuOpen(false);
                }}
                className="px-3.5 py-2 rounded-xl font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors text-left"
              >
                How It Works
              </button>
              <button
                onClick={() => { onNavigate('dashboard'); setMenuOpen(false); }}
                className={`px-3.5 py-2 rounded-xl font-label-lg text-label-lg transition-colors text-left ${
                  currentPage === 'dashboard'
                    ? 'text-primary font-bold bg-surface-container-low'
                    : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container'
                }`}
              >
                Dashboard
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
