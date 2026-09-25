import React from 'react';
import './HowItWorks.css';
import { Download, CheckCircle, BarChart3, Zap, Target } from 'lucide-react';

function HowItWorks() {
  const steps = [
    {
      number: '1',
      title: 'Collect',
      icon: <Download size={32} />,
      description: 'Climate360 retrieves environmental observations from the JKUAT/JHUB Conduit@Empathy platform.',
      items: ['Temperature', 'Humidity', 'Rainfall', 'Wind', 'Solar Radiation', 'WBGT', 'Pressure']
    },
    {
      number: '2',
      title: 'Understand',
      icon: <CheckCircle size={32} />,
      description: 'The system cleans, validates and processes the incoming data.',
      flow: ['Raw Data', 'Validation', 'Processing', 'Feature Extraction']
    },
    {
      number: '3',
      title: 'Analyze',
      icon: <BarChart3 size={32} />,
      description: 'Our climate intelligence engines analyze different risks.',
      engines: [
        { emoji: '🔥', name: 'Heat Engine', result: 'Heat Stress Risk' },
        { emoji: '💧', name: 'Water Engine', result: 'Water Stress / Harvesting' },
        { emoji: '🌧️', name: 'Rain Engine', result: 'Extreme Rain / Flood Risk' }
      ]
    },
    {
      number: '4',
      title: 'Explain',
      icon: <Zap size={32} />,
      description: 'The system passes structured risk information to the Groq-powered AI assistant.',
      details: 'It converts technical results into simple explanations.'
    },
    {
      number: '5',
      title: 'Act',
      icon: <Target size={32} />,
      description: 'Climate360 provides practical recommendations.',
      actionFlow: ['Risk Detected', 'Who may be affected?', 'What does it mean?', 'What should they do?']
    }
  ];

  return (
    <section className="how-it-works">
      <div className="container">
        <div className="section-header">
          <h2>How Climate360 Works</h2>
        </div>

        <div className="steps-container">
          {steps.map((step, idx) => (
            <div key={idx} className="step-card">
              <div className="step-number">{step.number}</div>
              <div className="step-icon">{step.icon}</div>
              <h3>{step.title}</h3>
              <p className="step-description">{step.description}</p>

              {step.items && (
                <div className="step-items">
                  {step.items.map((item, i) => (
                    <span key={i} className="item-badge">{item}</span>
                  ))}
                </div>
              )}

              {step.flow && (
                <div className="step-flow">
                  {step.flow.map((item, i) => (
                    <React.Fragment key={i}>
                      <div className="flow-box">{item}</div>
                      {i < step.flow.length - 1 && <div className="flow-arrow">↓</div>}
                    </React.Fragment>
                  ))}
                </div>
              )}

              {step.engines && (
                <div className="engines-grid">
                  {step.engines.map((engine, i) => (
                    <div key={i} className="engine-item">
                      <div className="engine-emoji">{engine.emoji}</div>
                      <div className="engine-name">{engine.name}</div>
                      <div className="arrow-down">↓</div>
                      <div className="engine-result">{engine.result}</div>
                    </div>
                  ))}
                </div>
              )}

              {step.details && (
                <p className="step-details">{step.details}</p>
              )}

              {step.actionFlow && (
                <div className="action-flow">
                  {step.actionFlow.map((item, i) => (
                    <React.Fragment key={i}>
                      <div className="action-box">{item}</div>
                      {i < step.actionFlow.length - 1 && <div className="action-arrow">↓</div>}
                    </React.Fragment>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
