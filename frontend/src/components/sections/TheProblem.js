import React from 'react';
import './TheProblem.css';
import { AlertCircle, TrendingUp, Droplets, Wind } from 'lucide-react';

function TheProblem() {
  const problems = [
    { icon: <AlertCircle size={24} />, text: 'Is the current heat dangerous?' },
    { icon: <TrendingUp size={24} />, text: 'Should outdoor activities be changed?' },
    { icon: <Wind size={24} />, text: 'Is rainfall becoming unusually intense?' },
    { icon: <Droplets size={24} />, text: 'Could water availability become a concern?' },
  ];

  return (
    <section className="the-problem">
      <div className="container">
        <div className="section-header">
          <h2>The Problem</h2>
          <p className="tagline">Climate Data Exists. Actionable Information Doesn't.</p>
        </div>

        <p className="intro-text">
          People can access temperature, rainfall, humidity and forecasts, but raw numbers don't answer the questions that matter:
        </p>

        <div className="problems-grid">
          {problems.map((problem, idx) => (
            <div key={idx} className="problem-item">
              <div className="problem-icon">{problem.icon}</div>
              <p>{problem.text}</p>
            </div>
          ))}
        </div>

        <div className="problem-callout">
          <p>
            <strong>What should a farmer, school, or community do next?</strong>
          </p>
        </div>

        <div className="our-approach">
          <h3>Our Approach</h3>
          <p className="approach-text">
            Instead of simply displaying weather data, Climate360 converts it into:
          </p>
          <div className="approach-flow">
            <div className="step">Data</div>
            <div className="arrow">→</div>
            <div className="step">Insight</div>
            <div className="arrow">→</div>
            <div className="step">Risk</div>
            <div className="arrow">→</div>
            <div className="step">Action</div>
            <div className="arrow">→</div>
            <div className="step highlight">Impact</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TheProblem;
