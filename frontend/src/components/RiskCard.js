import React, { useState } from 'react';
import './RiskCard.css';
import { ChevronDown } from 'lucide-react';

function RiskCard({ title, emoji, riskLevel, explanation, details, isWater }) {
  const [expanded, setExpanded] = useState(false);

  const getRiskColor = (level) => {
    switch (level) {
      case 'LOW':
        return 'low';
      case 'MODERATE':
        return 'moderate';
      case 'HIGH':
        return 'high';
      case 'EXTREME':
      case 'CRITICAL':
        return 'extreme';
      default:
        return 'low';
    }
  };

  const getRiskIcon = (color) => {
    switch (color) {
      case 'low':
        return '✓';
      case 'moderate':
        return '⚠';
      case 'high':
        return '🚨';
      case 'extreme':
        return '⛔';
      default:
        return '•';
    }
  };

  return (
    <div className={`risk-card risk-${getRiskColor(riskLevel)}`}>
      <div className="risk-header">
        <div className="risk-title">
          <span className="emoji">{emoji}</span>
          <h3>{title}</h3>
        </div>
        <div className="risk-badge">
          <span className="risk-icon">{getRiskIcon(getRiskColor(riskLevel))}</span>
          <span>{riskLevel}</span>
        </div>
      </div>

      <div className="risk-explanation">
        <p>{explanation}</p>
      </div>

      <button
        className="expand-btn"
        onClick={() => setExpanded(!expanded)}
      >
        <span>Details</span>
        <ChevronDown size={18} className={expanded ? 'rotated' : ''} />
      </button>

      {expanded && (
        <div className="risk-details">
          <div className="details-grid">
            {isWater && details.harvesting_potential !== undefined && (
              <div className="detail-item">
                <label>Rainwater Harvesting Potential</label>
                <value>{details.harvesting_potential.toLocaleString()} L</value>
              </div>
            )}
            
            {Object.entries(details).map(([key, value]) => {
              // Skip internal fields
              if (['risk_score', 'risk_factors', 'anomaly_factor', 'harvesting_potential'].includes(key)) {
                return null;
              }

              // Format key for display
              const label = key
                .split('_')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');

              // Format value
              let displayValue = value;
              if (typeof value === 'number') {
                displayValue = value.toLocaleString(undefined, {
                  minimumFractionDigits: 1,
                  maximumFractionDigits: 2
                });
              }

              return (
                <div key={key} className="detail-item">
                  <label>{label}</label>
                  <value>{displayValue}</value>
                </div>
              );
            })}
          </div>

          {details.risk_factors && details.risk_factors.length > 0 && (
            <div className="risk-factors">
              <h4>Contributing Factors:</h4>
              <ul>
                {details.risk_factors.map((factor, idx) => (
                  <li key={idx}>{factor}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default RiskCard;
