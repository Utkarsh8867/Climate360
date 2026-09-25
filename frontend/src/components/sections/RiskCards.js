import React from 'react';
import './RiskCards.css';
import { Thermometer, Droplets, Cloud } from 'lucide-react';

function RiskCards() {
  const risks = [
    {
      emoji: '🔥',
      title: 'Heat Intelligence',
      icon: <Thermometer size={32} />,
      description: 'Understand heat stress using temperature, humidity, wind, solar radiation and WBGT.',
      capabilities: [
        'Monitor heat conditions',
        'Calculate/assess heat risk',
        'Identify increasing heat stress',
        'Provide safety recommendations'
      ]
    },
    {
      emoji: '💧',
      title: 'Water Intelligence',
      icon: <Droplets size={32} />,
      description: 'Use rainfall and environmental conditions to understand water availability patterns and rainwater-harvesting potential.',
      capabilities: [
        'Analyze rainfall trends',
        'Identify potential water-stress conditions',
        'Estimate rainwater harvesting potential',
        'Support water-storage decisions'
      ]
    },
    {
      emoji: '🌧️',
      title: 'Extreme Rain Intelligence',
      icon: <Cloud size={32} />,
      description: 'Detect unusual rainfall conditions and provide early risk awareness.',
      capabilities: [
        'Monitor rainfall intensity',
        'Compare rainfall against historical patterns',
        'Identify unusual rainfall events',
        'Provide preparedness recommendations'
      ],
      note: 'For the MVP, this is risk assessment/early warning, rather than precise street-level flood prediction.'
    }
  ];

  return (
    <section className="risk-cards">
      <div className="container">
        <div className="section-header">
          <h2>Three Core Intelligence Engines</h2>
        </div>

        <div className="cards-grid">
          {risks.map((risk, idx) => (
            <div key={idx} className="risk-card">
              <div className="card-emoji">{risk.emoji}</div>
              <div className="card-icon">{risk.icon}</div>
              <h3>{risk.title}</h3>
              <p className="description">{risk.description}</p>
              
              <div className="capabilities">
                <p className="capabilities-title">Climate360 can:</p>
                <ul>
                  {risk.capabilities.map((cap, i) => (
                    <li key={i}>{cap}</li>
                  ))}
                </ul>
              </div>

              {risk.note && (
                <p className="note">{risk.note}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default RiskCards;
