import React from 'react';
import './Technology.css';
import { Database, Code, Brain, Smartphone } from 'lucide-react';

function Technology() {
  const techs = [
    {
      icon: <Database size={32} />,
      title: 'Data',
      items: [
        'JKUAT/JHUB Conduit@Empathy',
        'Weather forecast APIs',
        'Historical climate data',
        'Geospatial/satellite data'
      ]
    },
    {
      icon: <Code size={32} />,
      title: 'Backend',
      items: [
        'Python',
        'FastAPI',
        'Pandas / NumPy',
        'PostgreSQL'
      ]
    },
    {
      icon: <Brain size={32} />,
      title: 'Intelligence',
      items: [
        'Climate risk models',
        'Statistical analysis',
        'Machine Learning',
        'Groq AI'
      ]
    },
    {
      icon: <Smartphone size={32} />,
      title: 'Frontend',
      items: [
        'React.js',
        'Interactive charts',
        'Maps/GIS',
        'Responsive design'
      ]
    }
  ];

  return (
    <section className="technology">
      <div className="container">
        <div className="section-header">
          <h2>Technology Stack</h2>
          <p className="tagline">Built with modern, scalable tools</p>
        </div>

        <div className="tech-grid">
          {techs.map((tech, idx) => (
            <div key={idx} className="tech-card">
              <div className="tech-icon">{tech.icon}</div>
              <h3>{tech.title}</h3>
              <ul>
                {tech.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="ai-interaction">
          <h3>AI Interaction</h3>
          <div className="ai-items">
            <span className="ai-item">Text assistant</span>
            <span className="ai-item">Speech-to-text</span>
            <span className="ai-item">Text-to-speech</span>
            <span className="ai-item">Multilingual responses</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Technology;
