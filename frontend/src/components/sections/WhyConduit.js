import React from 'react';
import './WhyConduit.css';
import { Database, CheckCircle2 } from 'lucide-react';

function WhyConduit() {
  return (
    <section className="why-conduit">
      <div className="container">
        <div className="section-header">
          <h2>Why We Use Conduit@Empathy</h2>
        </div>

        <div className="conduit-content">
          <p className="intro">
            Climate360 is built around <strong>real environmental observations</strong> provided through the 
            <strong> JKUAT/JHUB Conduit@Empathy platform</strong>.
          </p>

          <p className="key-point">
            Rather than using Conduit data only for visualization, Climate360 uses the observations as inputs to its 
            <strong> climate-risk analysis and decision-support features</strong>.
          </p>

          <div className="comparison">
            <div className="approach wrong">
              <div className="approach-icon">
                <Database size={32} />
              </div>
              <h4>Traditional Approach</h4>
              <p>Conduit Data → Visualization ❌</p>
              <span className="label">Just showing numbers</span>
            </div>

            <div className="arrow-between">→</div>

            <div className="approach right">
              <div className="approach-icon">
                <CheckCircle2 size={32} />
              </div>
              <h4>Climate360 Approach</h4>
              <div className="flow-steps">
                <div className="flow-step">Conduit Data</div>
                <div className="flow-arrow">↓</div>
                <div className="flow-step">Analysis</div>
                <div className="flow-arrow">↓</div>
                <div className="flow-step">Risk Detection</div>
                <div className="flow-arrow">↓</div>
                <div className="flow-step">AI Interpretation</div>
                <div className="flow-arrow">↓</div>
                <div className="flow-step highlight">Actionable Recommendations ✅</div>
              </div>
            </div>
          </div>

          <p className="conclusion">
            This makes it very obvious that we're <strong>meaningfully using the required platform</strong> — 
            turning environmental observations into actionable climate intelligence.
          </p>
        </div>
      </div>
    </section>
  );
}

export default WhyConduit;
