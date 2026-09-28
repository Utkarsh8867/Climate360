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

      <div className="risk-explanation space-y-4 text-left">
        {typeof explanation === 'object' && explanation !== null ? (
          <>
            <div className="explanation-section">
              <h4 className="font-bold text-sm text-primary uppercase tracking-wider mb-1 flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px]">help</span>
                Why is this risk?
              </h4>
              <p className="text-on-surface-variant text-sm">{explanation.why}</p>
            </div>
            
            <div className="explanation-section">
              <h4 className="font-bold text-sm text-error uppercase tracking-wider mb-1 flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px]">warning</span>
                What may happen?
              </h4>
              <p className="text-on-surface-variant text-sm">{explanation.what_may_happen}</p>
            </div>
            
            <div className="explanation-section">
              <h4 className="font-bold text-sm text-secondary uppercase tracking-wider mb-1 flex items-center gap-2">
                <span className="material-symbols-outlined text-[16px]">task_alt</span>
                What should I do?
              </h4>
              <p className="text-on-surface-variant text-sm font-medium">{explanation.what_should_i_do}</p>
            </div>
          </>
        ) : (
          <p>{explanation}</p>
        )}
      </div>

      <button
        className="expand-btn mt-4"
        onClick={() => setExpanded(!expanded)}
      >
        <span>Data & Evidence</span>
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
          
          <div className="mt-4 pt-3 border-t border-surface-container-high text-xs text-on-surface-variant flex items-center justify-between">
            <span className="flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px]">verified</span>
              Evidence Source:
            </span>
            <span className="font-mono font-bold">Conduit@Empathy</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default RiskCard;
