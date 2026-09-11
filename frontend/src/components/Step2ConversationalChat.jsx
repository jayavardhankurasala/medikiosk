import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Send, Volume2, ArrowRight, Activity, Bot, User, Sparkles } from 'lucide-react';
import { getKioskStyles } from '../styles/kioskStyles';
import RedFlagAlertModal from './RedFlagAlertModal';

export default function Step2ConversationalChat({
  isHighContrast,
  visitId,
  selectedLanguage,
  clinicalMode,
  voice,
  onProceedToDocuments,
}) {
  const styles = getKioskStyles(isHighContrast);
  const { isListening, transcript, setTranscript, startListening, stopListening, speakText } = voice;

  const [messages, setMessages] = useState([]);
  const [currentOptions, setCurrentOptions] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isEmergency, setIsEmergency] = useState(false);
  const [emergencyReason, setEmergencyReason] = useState('');
  const [loading, setLoading] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const messagesEndRef = useRef(null);

  // Scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  // Handle incoming STT transcript updates
  useEffect(() => {
    if (transcript) {
      setInputText(transcript);
    }
  }, [transcript]);

  // Initial welcome message setup
  useEffect(() => {
    const initialGreeting =
      clinicalMode === 'AYUSH'
        ? selectedLanguage.startsWith('hi')
          ? 'नमस्ते! मैं मेडीकियोस्क आयुष सहायक हूँ। आज आपको क्या शारीरिक कष्ट, पाचन या जीवनशैली संबंधी समस्या है?'
          : 'Welcome to AYUSH OPD Kiosk. What physical discomfort, digestive, or lifestyle issue brings you today?'
        : selectedLanguage.startsWith('hi')
        ? 'नमस्ते! मैं मेडीकियोस्क AI सहायक हूँ। आज आप अस्पताल में क्या तकलीफ लेकर आए हैं?'
        : 'Welcome to MediKiosk OPD. What symptom or medical concern brings you in today?';

    const defaultOpts =
      clinicalMode === 'AYUSH'
        ? ['पाचन / गैस / अम्लपित्त', 'जोड़ों का दर्द (वात)', 'त्वचा संबंधी समस्या', 'कमजोरी व अनिद्रा']
        : ['बुखार / सर्दी (Fever/Cold)', 'छाती / पेट में दर्द', 'कमजोरी / चक्कर आना', 'सांस लेने में तकलीफ'];

    setMessages([
      {
        id: 'msg-init',
        role: 'assistant',
        content: initialGreeting,
      },
    ]);
    setCurrentOptions(defaultOpts);

    // Speak initial question
    speakText(initialGreeting, selectedLanguage);
  }, [clinicalMode, selectedLanguage]);

  // Send turn to backend
  const handleSendMessage = async (textToSend) => {
    const content = (textToSend || inputText).trim();
    if (!content) return;

    if (isListening) {
      stopListening();
    }

    // Add user message to state
    const userMsg = {
      id: `usr-${Date.now()}`,
      role: 'user',
      content,
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setTranscript('');
    setLoading(true);

    try {
      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          visitId,
          userMessage: content,
          language: selectedLanguage,
          clinicalMode,
        }),
      });

      const data = await res.json();
      if (data.success) {
        const assistantMsg = {
          id: `ai-${Date.now()}`,
          role: 'assistant',
          content: data.nextQuestion,
        };
        setMessages((prev) => [...prev, assistantMsg]);
        setCurrentOptions(data.options || []);

        if (data.isEmergency) {
          setIsEmergency(true);
          setEmergencyReason(data.nextQuestion);
        }

        if (data.isComplete) {
          setIsComplete(true);
        }

        // Speak AI follow-up in the selected language
        speakText(data.nextQuestion, selectedLanguage);
      }
    } catch (err) {
      console.error('Chat error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Red-Flag Modal */}
      <RedFlagAlertModal
        isOpen={isEmergency}
        onClose={() => setIsEmergency(false)}
        isHighContrast={isHighContrast}
        emergencyReason={emergencyReason}
      />

      {/* Chat Stream Card */}
      <div
        style={{
          ...styles.card,
          minHeight: '460px',
          maxHeight: '520px',
          overflowY: 'auto',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          return (
            <div
              key={msg.id}
              style={{
                display: 'flex',
                justifyContent: isUser ? 'flex-end' : 'flex-start',
                alignItems: 'flex-start',
                gap: '12px',
              }}
            >
              {!isUser && (
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    backgroundColor: isHighContrast ? '#FFFF00' : '#0284c7',
                    color: isHighContrast ? '#000' : '#fff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <Bot size={26} />
                </div>
              )}

              <div
                style={{
                  maxWidth: '75%',
                  padding: '18px 22px',
                  borderRadius: isUser ? '20px 20px 4px 20px' : '20px 20px 20px 4px',
                  backgroundColor: isUser
                    ? isHighContrast
                      ? '#FFFFFF'
                      : '#0284c7'
                    : isHighContrast
                    ? '#111111'
                    : 'rgba(30, 41, 59, 0.95)',
                  color: isUser
                    ? isHighContrast
                      ? '#000000'
                      : '#FFFFFF'
                    : isHighContrast
                    ? '#FFFF00'
                    : '#f8fafc',
                  border: isHighContrast
                    ? isUser
                      ? '3px solid #FFF'
                      : '3px solid #FFFF00'
                    : `1px solid ${styles.colors.surfaceBorder}`,
                  fontSize: '1.25rem',
                  lineHeight: 1.5,
                  fontWeight: '600',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                }}
              >
                {msg.content}

                {!isUser && (
                  <button
                    onClick={() => speakText(msg.content, selectedLanguage)}
                    title="Listen again"
                    style={{
                      background: 'none',
                      border: 'none',
                      color: isHighContrast ? '#FFFF00' : '#38bdf8',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '0.85rem',
                      fontWeight: '700',
                      marginTop: '8px',
                    }}
                  >
                    <Volume2 size={16} /> 🔊 दोबारा सुनें (Replay)
                  </button>
                )}
              </div>

              {isUser && (
                <div
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '12px',
                    backgroundColor: isHighContrast ? '#FFFFFF' : '#38bdf8',
                    color: '#000000',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <User size={26} />
                </div>
              )}
            </div>
          );
        })}

        {loading && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px' }}>
            <Sparkles size={24} color={styles.colors.accent} className="animate-spin" />
            <span style={{ fontSize: '1.1rem', color: styles.colors.textSecondary, fontWeight: '700' }}>
              AI डॉक्टर सोच रहा है... (Analyzing response per {clinicalMode} criteria)
            </span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Touch Pills */}
      {currentOptions.length > 0 && !loading && (
        <div>
          <span style={{ fontSize: '0.95rem', fontWeight: '700', color: styles.colors.textSecondary, marginBottom: '8px', display: 'block' }}>
            त्वरित विकल्प / Tap to reply quickly:
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {currentOptions.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleSendMessage(opt)}
                style={styles.pillOption}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Dual Input Controls: Giant Mic + Text Box */}
      <div
        style={{
          ...styles.card,
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {/* Giant Mic Button */}
          <button
            onClick={isListening ? stopListening : startListening}
            title={isListening ? 'Stop listening' : 'Start speaking'}
            style={{
              ...styles.micButton,
              backgroundColor: isListening ? '#ef4444' : isHighContrast ? '#FFFF00' : '#0284c7',
              color: isListening ? '#ffffff' : isHighContrast ? '#000000' : '#ffffff',
              transform: isListening ? 'scale(1.08)' : 'scale(1)',
            }}
          >
            {isListening ? <MicOff size={42} /> : <Mic size={42} />}
          </button>

          {/* Text Input + Send */}
          <div style={{ flex: 1, display: 'flex', gap: '10px' }}>
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder={
                isListening
                  ? 'सुन रहा हूँ... बोलिए (Listening now...)'
                  : 'बोलकर या लिखकर बताएं (Speak or type your answer)...'
              }
              style={{
                ...styles.largeInput,
                border: isListening ? '3px solid #ef4444' : styles.largeInput.border,
              }}
            />
            <button
              onClick={() => handleSendMessage()}
              disabled={loading || !inputText.trim()}
              style={{
                ...styles.primaryButton,
                minHeight: '64px',
                padding: '0 28px',
              }}
            >
              <Send size={24} />
            </button>
          </div>
        </div>

        {isListening && (
          <div style={{ color: '#ef4444', fontWeight: '800', fontSize: '1.05rem', textAlign: 'center' }}>
            🔴 माइक्रोफ़ोन सक्रिय है... कृपया साफ आवाज़ में बोलें (Microphone Active)
          </div>
        )}
      </div>

      {/* Completion & Proceed Button */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '4px' }}>
        <button
          onClick={onProceedToDocuments}
          style={{
            ...styles.primaryButton,
            backgroundColor: isComplete ? '#10b981' : styles.colors.accent,
            color: isComplete ? '#ffffff' : styles.colors.accentText,
          }}
        >
          <span>
            {isComplete
              ? 'केस हिस्ट्री पूर्ण • अगले चरण पर जाएं (History Complete • Scan Records)'
              : 'पर्चे / रिपोर्ट स्कैन पर जाएं (Proceed to Document Scan)'}
          </span>
          <ArrowRight size={24} />
        </button>
      </div>
    </div>
  );
}
