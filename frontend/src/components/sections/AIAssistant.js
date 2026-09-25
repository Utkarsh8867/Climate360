import React from 'react';
import './AIAssistant.css';
import { MessageCircle, Mic, Volume2 } from 'lucide-react';

function AIAssistant() {
  const questions = [
    'Is it safe to work outside today?',
    'Why is the heat risk high?',
    'Should I be concerned about today\'s rainfall?',
    'How much rainwater could I collect?'
  ];

  return (
    <section className="ai-assistant">
      <div className="container">
        <div className="section-header">
          <h2>🤖 Ask Climate360</h2>
          <p className="tagline">Get Intelligent Climate Answers</p>
        </div>

        <div className="ai-content">
          <p className="intro-text">
            Instead of searching through charts, users can simply ask:
          </p>

          <div className="questions-list">
            {questions.map((q, idx) => (
              <div key={idx} className="question-item">
                <MessageCircle size={20} />
                <span>"{q}"</span>
              </div>
            ))}
          </div>

          <p className="explanation">
            The assistant uses the <strong>current analyzed climate conditions</strong> to provide contextual answers.
          </p>

          <div className="voice-section">
            <h3>Voice Interaction</h3>
            <div className="voice-flow">
              <div className="voice-step">
                <Mic size={32} />
                <span>🎤 Speak</span>
              </div>
              <div className="flow-line">→</div>
              <div className="voice-step">
                <span>Speech-to-Text</span>
              </div>
              <div className="flow-line">→</div>
              <div className="voice-step">
                <span>Climate360 AI</span>
              </div>
              <div className="flow-line">→</div>
              <div className="voice-step">
                <span>Groq</span>
              </div>
              <div className="flow-line">→</div>
              <div className="voice-step">
                <span>Answer</span>
              </div>
              <div className="flow-line">→</div>
              <div className="voice-step">
                <Volume2 size={32} />
                <span>🔊 Listen</span>
              </div>
            </div>
            <p className="voice-note">
              <em>Coming in Phase 2</em> — For MVP, focus is on text-based AI assistant. Voice features will be added as a differentiator.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AIAssistant;
