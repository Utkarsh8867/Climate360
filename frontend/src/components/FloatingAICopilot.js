import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

function FloatingAICopilot({ dashboardData }) {
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  const [chatMessages, setChatMessages] = useState([
    {
      type: 'assistant',
      text: 'Ask anything about local weather hazards, harvesting windows, or school athletic safety in Juja.'
    }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const suggestedPrompts = [
    '🌾 Harvest safely today?',
    '🏃 Heat risk for sports?'
  ];

  const handleSuggestedPrompt = (prompt) => {
    setChatInput(prompt.split(' ').slice(1).join(' '));
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages, isOpen]);

  // Voice input function
  const startVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech Recognition not supported in this browser');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.start();
    setIsListening(true);

    recognition.onresult = (event) => {
      let transcript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      setChatInput(transcript);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };
  };

  // Voice output function
  const speakResponse = (text) => {
    const synth = window.speechSynthesis;
    if (!synth) {
      console.error('Text-to-speech not supported');
      return;
    }

    // Cancel any ongoing speech
    synth.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 1;
    utterance.pitch = 1;
    synth.speak(utterance);
  };

  const submitPrompt = async () => {
    if (!chatInput.trim() || isLoading) return;
    
    const userMessage = chatInput;
    setChatMessages(prev => [...prev, { type: 'user', text: userMessage }]);
    setChatInput('');
    setIsLoading(true);

    try {
      const response = await axios.post(`${API_BASE_URL}/climate/chat`, {
        message: userMessage,
        dashboard_data: dashboardData || null
      });

      const responseText = response.data.response;
      
      setChatMessages(prev => [...prev, {
        type: 'assistant',
        text: responseText
      }]);
      
      // Auto-play voice response
      speakResponse(responseText);
    } catch (error) {
      console.error('Chat error:', error);
      setChatMessages(prev => [...prev, {
        type: 'assistant',
        text: 'Sorry, I am having trouble connecting to the intelligence engine right now.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <aside
      aria-label="Climate360 AI Assistant Floating Widget"
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 pointer-events-auto"
    >
      {isOpen ? (
        <div className="w-80 sm:w-[360px] bg-surface-container-lowest/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-outline-variant/30 overflow-hidden transition-all duration-300">
          {/* Header */}
          <div className="px-4 py-3 bg-gradient-to-r from-primary to-primary-container text-on-primary flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-surface-container-lowest/20 backdrop-blur-md flex items-center justify-center">
                <span className="material-symbols-outlined text-[18px]">smart_toy</span>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-headline-sm text-sm font-bold leading-tight">Climate Copilot</span>
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-label-sm bg-tertiary-fixed text-on-tertiary-fixed font-bold leading-none">
                    Groq LPU™
                  </span>
                </div>
                <p className="font-body-sm text-[11px] text-on-primary/80 leading-none mt-0.5">
                  Conduit@Empathy Live Telemetry
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-surface-container-lowest/20 rounded-lg transition-colors"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          {/* Content */}
          <div className="p-3.5 space-y-2.5">
            {/* Info Box */}
            <div className="p-2.5 rounded-xl bg-surface-container-low text-xs font-body-sm text-on-surface-variant flex items-start gap-2">
              <span className="material-symbols-outlined text-primary text-[18px] shrink-0 mt-0.5">
                shield_with_heart
              </span>
              <span>
                Ask anything about local weather hazards, harvesting windows, or school athletic safety in Juja.
              </span>
            </div>

            {/* Suggested Prompts */}
            <div className="flex flex-wrap gap-1.5">
              {suggestedPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSuggestedPrompt(prompt)}
                  className="px-2.5 py-1 rounded-lg bg-surface-container hover:bg-surface-container-high text-[11px] font-label-md text-on-surface transition-colors text-left"
                >
                  {prompt}
                </button>
              ))}
            </div>

            {/* Chat Messages */}
            <div className="p-3 rounded-xl bg-surface-container max-h-48 overflow-y-auto space-y-2">
              {chatMessages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] px-3 py-2 rounded-lg text-[12px] font-body-sm leading-snug ${
                      msg.type === 'user'
                        ? 'bg-primary text-on-primary rounded-br-none'
                        : 'bg-surface-container-low text-on-surface rounded-bl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="relative flex items-center gap-2">
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    submitPrompt();
                  }
                }}
                placeholder="Ask Climate360 Copilot..."
                className="flex-1 pl-3 pr-10 py-2 rounded-xl bg-surface-container-low text-on-surface placeholder:text-on-surface-variant/60 font-body-sm text-xs focus:outline-none focus:ring-2 focus:ring-primary border border-outline-variant/20"
              />
              <button
                onClick={startVoiceInput}
                className={`p-1.5 rounded-lg transition-colors flex items-center justify-center ${
                  isListening
                    ? 'bg-error text-on-primary'
                    : 'bg-secondary text-on-secondary hover:bg-secondary-container'
                }`}
                title={isListening ? 'Listening...' : 'Start voice input'}
              >
                <span className="material-symbols-outlined text-[16px]">
                  {isListening ? 'mic' : 'mic_none'}
                </span>
              </button>
              <button
                onClick={submitPrompt}
                className="p-1.5 rounded-lg bg-primary text-on-primary hover:bg-primary-container transition-colors flex items-center justify-center"
                title="Send message"
              >
                <span className="material-symbols-outlined text-[16px]">arrow_upward</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-primary to-primary-container text-on-primary shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 flex items-center justify-center"
          title="Open Climate360 AI Copilot"
        >
          <span className="material-symbols-outlined text-[28px]">smart_toy</span>
        </button>
      )}
    </aside>
  );
}

export default FloatingAICopilot;
