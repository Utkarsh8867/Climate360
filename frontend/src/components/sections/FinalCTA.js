import React from 'react';
import './FinalCTA.css';
import { ArrowRight } from 'lucide-react';

function FinalCTA({ onNavigate }) {
  return (
    <section className="final-cta">
      <div className="cta-content">
        <h2>Turn Climate Data Into Climate Action</h2>
        <p className="cta-tagline">
          Don't just know the weather. <strong>Understand the risk. Know what to do.</strong>
        </p>
        <button className="cta-button" onClick={() => onNavigate('dashboard')}>
          <span>Explore Climate360</span>
          <ArrowRight size={20} />
        </button>
      </div>
    </section>
  );
}

export default FinalCTA;
