import React, { useState, useRef, useEffect } from 'react';
import './AIAssistantChat.css';
import { Brain, X, Send, Minimize2, Maximize2, RotateCcw } from 'lucide-react';

function AIAssistantChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'assistant',
      text: 'Hello! 🧠 I\'m your Climate360 AI Assistant. Ask me anything about climate risks, weather conditions, or how to prepare for extreme weather!'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Sample questions for quick suggestions
  const suggestedQuestions = [
    'Is it safe to work outside?',
    'What should I do about water shortage?',
    'Explain the rain risk',
    'How to collect rainwater?'
  ];

  // Auto-scroll to latest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle message submission
  const handleSendMessage = async (userMessage) => {
    if (!userMessage.trim()) return;

    // Add user message
    const userMsg = {
      id: messages.length + 1,
      type: 'user',
      text: userMessage
    };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        {
          text: '🌡️ Based on current conditions, outdoor activities should be manageable with proper hydration and sun protection. Remember to take regular breaks in shaded areas.',
          topics: ['heat', 'outdoor']
        },
        {
          text: '💧 Water shortage is a concern. I recommend implementing water conservation measures immediately. Consider rainwater harvesting if rainfall is expected.',
          topics: ['water', 'conservation']
        },
        {
          text: '🌧️ The rain risk is currently HIGH. There\'s potential for heavy rainfall. Prepare drainage systems and avoid low-lying areas. Stay updated on weather warnings.',
          topics: ['rain', 'preparedness']
        },
        {
          text: '💧 Excellent question! Rainwater harvesting involves collecting rainfall from your roof or catchment area. With proper guttering and storage, you can collect approximately 1,000 liters per 1mm of rain on a 100m² roof.',
          topics: ['harvesting', 'water']
        },
        {
          text: '✅ Here are my recommendations: 1) Stay hydrated throughout the day, 2) Wear light-colored, loose clothing, 3) Take breaks in cooler areas, 4) Apply sunscreen regularly, 5) Monitor your energy levels.',
          topics: ['recommendations', 'safety']
        }
      ];

      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      const assistantMsg = {
        id: messages.length + 2,
        type: 'assistant',
        text: randomResponse.text
      };
      setMessages(prev => [...prev, assistantMsg]);
      setLoading(false);
    }, 800);
  };

  // Handle suggested question click
  const handleSuggestedQuestion = (question) => {
    handleSendMessage(question);
  };

  // Clear chat
  const handleClearChat = () => {
    setMessages([
      {
        id: 1,
        type: 'assistant',
        text: 'Hello! 🧠 I\'m your Climate360 AI Assistant. Ask me anything about climate risks, weather conditions, or how to prepare for extreme weather!'
      }
    ]);
  };

  if (!isOpen) {
    return (
      <button
        className="ai-chat-toggle"
        onClick={() => setIsOpen(true)}
        title="Open AI Assistant"
        aria-label="Open AI Assistant"
      >
        <Brain size={24} />
      </button>
    );
  }

  return (
    <div className={`ai-chat-container ${isMinimized ? 'minimized' : ''}`}>
      {/* Header */}
      <div className="ai-chat-header">
        <div className="ai-chat-title">
          <Brain size={20} />
          <span>Climate360 AI</span>
        </div>
        <div className="ai-chat-controls">
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="ai-chat-btn"
            title={isMinimized ? 'Expand' : 'Minimize'}
            aria-label={isMinimized ? 'Expand chat' : 'Minimize chat'}
          >
            {isMinimized ? <Maximize2 size={18} /> : <Minimize2 size={18} />}
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="ai-chat-btn"
            title="Close"
            aria-label="Close chat"
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Messages Area */}
      {!isMinimized && (
        <>
          <div className="ai-chat-messages">
            {messages.map(msg => (
              <div key={msg.id} className={`ai-message ${msg.type}`}>
                <div className="ai-message-content">
                  {msg.type === 'assistant' && <span className="ai-avatar">🧠</span>}
                  <div className="ai-message-text">{msg.text}</div>
                </div>
              </div>
            ))}
            
            {loading && (
              <div className="ai-message assistant">
                <div className="ai-message-content">
                  <span className="ai-avatar">🧠</span>
                  <div className="ai-message-typing">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Questions */}
          {messages.length === 1 && (
            <div className="ai-suggestions">
              <p className="ai-suggestions-label">Quick questions:</p>
              <div className="ai-suggestions-grid">
                {suggestedQuestions.map((question, idx) => (
                  <button
                    key={idx}
                    className="ai-suggestion-btn"
                    onClick={() => handleSuggestedQuestion(question)}
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="ai-chat-input-area">
            <div className="ai-chat-input-wrapper">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyPress={e => e.key === 'Enter' && handleSendMessage(input)}
                placeholder="Ask me anything..."
                className="ai-chat-input"
                disabled={loading}
              />
              <button
                onClick={() => handleSendMessage(input)}
                className="ai-send-btn"
                disabled={loading || !input.trim()}
                title="Send message"
                aria-label="Send message"
              >
                <Send size={18} />
              </button>
            </div>
            
            {messages.length > 1 && (
              <button
                onClick={handleClearChat}
                className="ai-clear-btn"
                title="Clear chat"
                aria-label="Clear chat history"
              >
                <RotateCcw size={14} />
                <span>Clear</span>
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default AIAssistantChat;
