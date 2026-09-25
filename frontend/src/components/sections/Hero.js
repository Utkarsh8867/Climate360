import React from 'react';
import './Hero.css';
import { ArrowRight, Cloud } from 'lucide-react';

function Hero({ onNavigate }) {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">Climate360</h1>
        <p className="hero-subtitle">From Climate Data to Climate Action</p>
        
        <p className="hero-description">
          Climate360 transforms real-time environmental data into understandable climate risks, predictions, and actionable recommendations for communities, farmers, schools, and local decision-makers.
        </p>

        <div className="hero-buttons">
          <button className="btn btn-primary" onClick={() => onNavigate('dashboard')}>
            <span>Explore Climate Intelligence</span>
            <ArrowRight size={20} />
          </button>
          <button className="btn btn-secondary">
            View Live Climate Data
          </button>
        </div>

        <div className="hero-flow">
          <div className="flow-item">
            <span className="emoji">🌡️</span>
            <span className="label">Heat Risk</span>
          </div>
          <div className="flow-arrow">↓</div>
          <div className="flow-item">
            <span className="emoji">💧</span>
            <span className="label">Water Risk</span>
          </div>
          <div className="flow-arrow">↓</div>
          <div className="flow-item">
            <span className="emoji">🌧️</span>
            <span className="label">Extreme Rain</span>
          </div>
          <div className="flow-arrow">↓</div>
          <div className="flow-item highlight">
            <span className="emoji">🤖</span>
            <span className="label">AI Assistant</span>
          </div>
        </div>

        <p className="hero-attribution">
          <strong>Powered by real environmental observations from JKUAT's Conduit@Empathy platform.</strong>
        </p>
      </div>

      <div className="hero-background">
        <Cloud size={300} opacity={0.1} />
      </div>
    </section>
  );
}

export default Hero;
