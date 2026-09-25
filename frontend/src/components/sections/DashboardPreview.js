import React from 'react';
import './DashboardPreview.css';
import { Thermometer, Droplets, Wind, Cloud } from 'lucide-react';

function DashboardPreview() {
  return (
    <section className="dashboard-preview">
      <div className="container">
        <div className="section-header">
          <h2>Live Dashboard</h2>
          <p className="tagline">See Climate360 in Action</p>
        </div>

        <div className="preview-box">
          <div className="preview-header">
            <h3>CLIMATE360</h3>
          </div>

          <div className="preview-content">
            <div className="current-section">
              <h4>Current Conditions</h4>
              <div className="conditions-row">
                <div className="condition">
                  <Thermometer size={24} />
                  <span>38°C</span>
                </div>
                <div className="condition">
                  <Droplets size={24} />
                  <span>72%</span>
                </div>
                <div className="condition">
                  <Cloud size={24} />
                  <span>12mm</span>
                </div>
                <div className="condition">
                  <Wind size={24} />
                  <span>8km/h</span>
                </div>
              </div>
            </div>

            <div className="risks-section">
              <h4>Climate Risks</h4>
              <div className="risks-list">
                <div className="risk-item risk-high">
                  <span className="emoji">🔥</span>
                  <div className="risk-info">
                    <span className="risk-name">Heat</span>
                    <span className="risk-level">HIGH</span>
                  </div>
                </div>
                <div className="risk-item risk-moderate">
                  <span className="emoji">💧</span>
                  <div className="risk-info">
                    <span className="risk-name">Water</span>
                    <span className="risk-level">MODERATE</span>
                  </div>
                </div>
                <div className="risk-item risk-low">
                  <span className="emoji">🌧️</span>
                  <div className="risk-info">
                    <span className="risk-name">Rain</span>
                    <span className="risk-level">LOW</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="insight-section">
              <h4>🤖 AI Insight</h4>
              <p>
                High heat stress detected. High temperature and humidity are increasing heat stress. 
                Outdoor workers should reduce prolonged exposure, stay hydrated, and take breaks in shaded areas.
              </p>
            </div>
          </div>
        </div>

        <p className="preview-note">
          This is a sample preview. <strong>Enter real weather data on the dashboard</strong> to see live risk assessments powered by Groq AI.
        </p>
      </div>
    </section>
  );
}

export default DashboardPreview;
