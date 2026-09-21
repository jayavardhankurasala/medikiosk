import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Send, Volume2, ArrowRight, Sparkles, Check, X, Edit3, CheckCircle2, RefreshCw } from 'lucide-react';
import { getStyles } from '../../styles/theme';
import { useLanguage } from '../../context/LanguageContext';
import BotAvatar from '../common/BotAvatar';
import RedFlagAlertModal from '../RedFlagAlertModal';

export default function Screen9VoiceChat({
  visitId,
  authToken,
  selectedLanguage: propLanguage,
  clinicalMode = 'ALLOPATHIC',
  voice,
  onProceed,
  onUpdateComplaint,
  onSaveConversationTurn,
  themeObj,
}) {
  const { language, t } = useLanguage();
  const activeLanguage = propLanguage || language;
  const styles = getStyles(themeObj);
  const { isListening, transcript, setTranscript, startListening, stopListening, speakText, error: voiceError } = voice;

  const [aiQuestion, setAiQuestion] = useState('');
  const [options, setOptions] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEmergency, setIsEmergency] = useState(false);
  const [emergencyReason, setEmergencyReason] = useState('');
  const [turnCount, setTurnCount] = useState(0);

  // Auto-completion State
  const [isComplete, setIsComplete] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');

  // The Confirmation Loop State
  const [pendingText, setPendingText] = useState('');
  const [showConfirmLoop, setShowConfirmLoop] = useState(false);
  const hasInitializedRef = useRef(false);

  // Sync speech recognition transcript
  useEffect(() => {
    if (transcript && isListening) {
      setUserInput(transcript);
    }
  }, [transcript, isListening]);

  // When speech recognition stops, if transcript is non-empty, enter confirmation loop
  useEffect(() => {
    if (!isListening && transcript.trim() && !showConfirmLoop && !isComplete) {
      setPendingText(transcript.trim());
      setShowConfirmLoop(true);
    }
  }, [isListening, transcript, showConfirmLoop, isComplete]);

  // Initial welcome greeting setup and automatic TTS (guarded against re-triggering loops)
  useEffect(() => {
    if (isComplete || hasInitializedRef.current) return;
    hasInitializedRef.current = true;

    const greeting = t.initialGreeting || 'What health concern brings you here today?';
    const defaultOpts = t.defaultPills || ['Fever / Cough', 'Stomach Pain / Acidity', 'Chest Pain / Shortness of Breath', 'Joint Pain'];

    setAiQuestion(greeting);
    setOptions(defaultOpts);

    // Automatic TTS in chosen language
    speakText(greeting, activeLanguage);
  }, [activeLanguage, t, isComplete, speakText]);

  // Clean up listening on unmount
  useEffect(() => {
    return () => {
      stopListening();
    };
  }, [stopListening]);

  // Central message sender to Gemini / Clinical pathways backend
  const sendMessage = async (textToSend) => {
    const text = (textToSend || userInput || '').trim();
    if (!text || isSubmitting || loading) return;

    setIsSubmitting(true);
    setLoading(true);
    setShowConfirmLoop(false);
    setUserInput('');
    setPendingText('');
    setTranscript('');

    if (turnCount === 0 && onUpdateComplaint) {
      onUpdateComplaint(text);
    }

    if (onSaveConversationTurn) {
      onSaveConversationTurn({ role: 'user', content: text });
    }

    try {
      const headers = { 'Content-Type': 'application/json' };
      if (authToken) {
        headers['Authorization'] = `Bearer ${authToken}`;
      }

      const res = await fetch('/api/ai/chat', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          visitId,
          userMessage: text,
          language: activeLanguage,
          clinicalMode,
        }),
      });

      if (!res.ok) {
        throw new Error(`Server returned HTTP ${res.status}`);
      }

      const data = await res.json();
      if (data.success) {
        if (onSaveConversationTurn && data.nextQuestion) {
          onSaveConversationTurn({ role: 'assistant', content: data.nextQuestion });
        }

        if (data.isEmergency) {
          setIsEmergency(true);
          setEmergencyReason(data.nextQuestion);
        }

        // AUTO-FORWARD ON COMPLETION
        if (data.isComplete) {
          setIsComplete(true);
          stopListening();
          const transitionMsg = t.symptomAnalysisComplete || 'Symptom analysis complete. Proceeding to document upload...';
          setStatusMessage(transitionMsg);
          setAiQuestion(transitionMsg);
          setOptions([]);

          // Read transition message aloud before advancing
          speakText(transitionMsg, activeLanguage);

          // Auto-navigate after 2.5 seconds
          setTimeout(() => {
            if (onProceed) onProceed();
          }, 2500);
          return;
        }

        setAiQuestion(data.nextQuestion);
        setOptions(data.options || []);
        setTurnCount((c) => c + 1);

        // Automatic Multilingual TTS
        speakText(data.nextQuestion, activeLanguage);
      } else {
        throw new Error(data.message || 'Unable to update question');
      }
    } catch (err) {
      console.error('Chat error:', err);
      const fallbackQ = activeLanguage.startsWith('hi')
        ? 'यह तकलीफ कितने दिनों से है और क्या यह आराम करने से घटती है?'
        : activeLanguage.startsWith('te')
        ? 'ఈ సమస్య ఎన్ని రోజుల నుండి ఉంది, విశ్రాంతి తీసుకుంటే తగ్గుతుందా?'
        : 'How many days have you had this issue, and does anything relieve it?';
      setAiQuestion(fallbackQ);
      setOptions(['1-2 days', '3-5 days', 'More than a week']);
      setTurnCount((c) => c + 1);
      speakText(fallbackQ, activeLanguage);
    } finally {
      setLoading(false);
      setIsSubmitting(false);
    }
  };

  // Direct submit from typing
  const handleTypeSubmit = () => {
    if (isComplete || isSubmitting || loading) return;
    const text = userInput.trim();
    if (!text) return;
    sendMessage(text);
  };

  // Touch on quick option pills directly sends and updates questions immediately
  const handlePillClick = (optText) => {
    if (isComplete || isSubmitting || loading) return;
    sendMessage(optText);
  };

  // [YES] in Voice Confirmation Loop -> Send confirmed speech to Backend
  const handleConfirmYes = () => {
    sendMessage(pendingText);
  };

  // [NO] in Confirmation Loop -> Clear and cancel
  const handleConfirmNo = () => {
    if (isSubmitting || loading) return;
    setShowConfirmLoop(false);
    setPendingText('');
    setUserInput('');
    setTranscript('');
  };

  // [EDIT] in Confirmation Loop -> Keep in input field for manual revision
  const handleConfirmEdit = () => {
    if (isSubmitting || loading) return;
    setShowConfirmLoop(false);
    setUserInput(pendingText);
    setPendingText('');
  };

  return (
    <div
      style={{
        ...styles.kioskCard,
        maxWidth: '620px',
        alignItems: 'center',
        textAlign: 'center',
        padding: '28px 24px',
        position: 'relative',
      }}
    >
      {/* Red-Flag Emergency Alert Modal */}
      <RedFlagAlertModal
        isOpen={isEmergency}
        onClose={() => setIsEmergency(false)}
        isHighContrast={themeObj.mode === 'contrast'}
        emergencyReason={emergencyReason}
      />

      {/* Conversational Speech Bubble */}
      <div
        style={{
          width: '100%',
          backgroundColor: isComplete
            ? '#E8F7F5'
            : themeObj.mode === 'contrast'
            ? '#111111'
            : themeObj.colors.background,
          border: `2px solid ${themeObj.colors.primary}`,
          borderRadius: '20px',
          padding: '20px 24px',
          position: 'relative',
          marginBottom: '12px',
          boxShadow: themeObj.shadows.card,
          transition: 'all 0.3s ease',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '6px' }}>
          {isComplete ? (
            <CheckCircle2 size={18} color={themeObj.colors.primary} />
          ) : (
            <Sparkles size={16} color={themeObj.colors.primaryDark} />
          )}
          <span style={{ fontSize: '0.85rem', fontWeight: '700', color: themeObj.colors.primaryDark, textTransform: 'uppercase' }}>
            {isComplete ? 'Intake Complete' : 'MediKiosk AI Intake'}
          </span>
        </div>

        <div
          style={{
            fontSize: '1.35rem',
            fontWeight: '700',
            color: themeObj.colors.textPrimary,
            lineHeight: 1.4,
          }}
        >
          "{aiQuestion}"
        </div>

        {/* Replay speech button (hide when completed) */}
        {!isComplete && (
          <button
            onClick={() => speakText(aiQuestion, activeLanguage)}
            style={{
              background: 'none',
              border: 'none',
              color: themeObj.colors.primaryDark,
              fontSize: '0.85rem',
              fontWeight: '600',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer',
              marginTop: '8px',
            }}
          >
            <Volume2 size={16} /> <span>{t.listenAgain}</span>
          </button>
        )}

        {/* Arrow pointer */}
        <div
          style={{
            position: 'absolute',
            bottom: '-12px',
            left: '50%',
            transform: 'translateX(-50%)',
            width: 0,
            height: 0,
            borderLeft: '12px solid transparent',
            borderRight: '12px solid transparent',
            borderTop: `12px solid ${themeObj.colors.primary}`,
          }}
        />
      </div>

      {/* Central Bot Mascot */}
      <div style={{ margin: '6px 0 14px 0' }}>
        <BotAvatar size={135} isListening={isListening} isTalking={loading || isComplete} />
      </div>

      {/* --- STATE 1: COMPLETION AUTO-FORWARD SCREEN --- */}
      {isComplete ? (
        <div
          style={{
            width: '100%',
            backgroundColor: themeObj.colors.surface,
            border: `2px solid ${themeObj.colors.primary}`,
            borderRadius: '20px',
            padding: '24px 20px',
            boxShadow: themeObj.shadows.floating,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '14px',
            animation: 'fadeIn 0.3s ease-in-out',
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '50%',
              backgroundColor: '#DCFCE7',
              color: themeObj.colors.primary,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 14px rgba(0, 199, 166, 0.3)',
            }}
          >
            <CheckCircle2 size={38} />
          </div>

          <div
            style={{
              fontSize: '1.2rem',
              fontWeight: '700',
              color: themeObj.colors.primaryDark,
            }}
          >
            {statusMessage || t.symptomAnalysisComplete}
          </div>

          {/* 2.5s Visual Countdown Progress Bar */}
          <div
            style={{
              width: '100%',
              maxWidth: '340px',
              height: '8px',
              backgroundColor: '#E2E8F0',
              borderRadius: '4px',
              overflow: 'hidden',
              marginTop: '4px',
            }}
          >
            <div
              style={{
                height: '100%',
                backgroundColor: themeObj.colors.primary,
                borderRadius: '4px',
                animation: 'growWidth 2.5s linear forwards',
              }}
            />
          </div>
        </div>
      ) : showConfirmLoop ? (
        /* --- STATE 2: THE CONFIRMATION LOOP BUBBLE --- */
        <div
          style={{
            width: '100%',
            backgroundColor: themeObj.mode === 'contrast' ? '#000000' : '#FFFFFF',
            border: `2px solid ${themeObj.colors.primary}`,
            borderRadius: '20px',
            padding: '22px 20px',
            boxShadow: themeObj.shadows.floating,
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            animation: 'fadeIn 0.2s ease-in-out',
          }}
        >
          <div style={{ fontSize: '0.9rem', fontWeight: '700', color: themeObj.colors.textSecondary, textTransform: 'uppercase' }}>
            {t.confirmPrompt}
          </div>

          <div
            style={{
              fontSize: '1.25rem',
              fontWeight: '700',
              color: themeObj.colors.textPrimary,
              backgroundColor: themeObj.mode === 'contrast' ? '#111' : '#F9FAFB',
              padding: '14px 18px',
              borderRadius: '12px',
              border: `1px solid ${themeObj.colors.border}`,
            }}
          >
            "{pendingText}"
          </div>

          {/* 3 Confirmation Buttons: [Yes] [No] [Edit] */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
            <button
              onClick={handleConfirmYes}
              disabled={isSubmitting || loading}
              style={{
                minHeight: '52px',
                borderRadius: '12px',
                backgroundColor: themeObj.colors.primary,
                color: themeObj.mode === 'contrast' ? '#000' : '#FFF',
                fontWeight: '700',
                fontSize: '1rem',
                border: 'none',
                cursor: isSubmitting || loading ? 'default' : 'pointer',
                opacity: isSubmitting || loading ? 0.75 : 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
              }}
            >
              {isSubmitting || loading ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <RefreshCw size={18} className="animate-spin" />
                  <span>Sending...</span>
                </div>
              ) : (
                <>
                  <Check size={18} />
                  <span>{t.yes}</span>
                </>
              )}
            </button>

            <button
              onClick={handleConfirmNo}
              disabled={isSubmitting || loading}
              style={{
                minHeight: '52px',
                borderRadius: '12px',
                backgroundColor: '#FEE2E2',
                color: '#DC2626',
                fontWeight: '700',
                fontSize: '1rem',
                border: 'none',
                cursor: isSubmitting || loading ? 'default' : 'pointer',
                opacity: isSubmitting || loading ? 0.6 : 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
              }}
            >
              <X size={18} />
              <span>{t.no}</span>
            </button>

            <button
              onClick={handleConfirmEdit}
              disabled={isSubmitting || loading}
              style={{
                minHeight: '52px',
                borderRadius: '12px',
                backgroundColor: '#E8F7F5',
                color: themeObj.colors.primaryDark,
                fontWeight: '700',
                fontSize: '1rem',
                border: `1.5px solid ${themeObj.colors.primary}`,
                cursor: isSubmitting || loading ? 'default' : 'pointer',
                opacity: isSubmitting || loading ? 0.6 : 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
              }}
            >
              <Edit3 size={18} />
              <span>{t.edit}</span>
            </button>
          </div>
        </div>
      ) : (
        /* --- STATE 3: NORMAL INPUT CONTROLS: MIC + QUICK PILLS + TEXT --- */
        <>
          {/* Floating Mic Button with Pulse Ring */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={isListening ? stopListening : startListening}
              style={{
                width: '88px',
                height: '88px',
                borderRadius: '50%',
                backgroundColor: isListening ? '#EF4444' : themeObj.colors.primary,
                color: themeObj.mode === 'contrast' ? '#000' : '#FFFFFF',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: isListening
                  ? '0 0 0 12px rgba(239, 68, 68, 0.25)'
                  : '0 8px 26px rgba(0, 199, 166, 0.4)',
                transition: 'all 0.2s ease',
                animation: isListening ? 'pulseRing 1.5s infinite ease-in-out' : 'none',
              }}
            >
              {isListening ? <MicOff size={42} /> : <Mic size={42} />}
            </button>

            <span
              style={{
                fontSize: '1.05rem',
                fontWeight: '600',
                color: isListening ? '#EF4444' : themeObj.colors.primaryDark,
              }}
            >
              {isListening ? t.listeningNow : t.tapToSpeak}
            </span>

            {isListening && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', height: '26px' }}>
                <span style={{ width: '4px', height: '10px', backgroundColor: '#EF4444', borderRadius: '2px', animation: 'waveBar 0.8s infinite 0.1s' }} />
                <span style={{ width: '4px', height: '22px', backgroundColor: '#EF4444', borderRadius: '2px', animation: 'waveBar 0.8s infinite 0.2s' }} />
                <span style={{ width: '4px', height: '28px', backgroundColor: '#EF4444', borderRadius: '2px', animation: 'waveBar 0.8s infinite 0.3s' }} />
                <span style={{ width: '4px', height: '16px', backgroundColor: '#EF4444', borderRadius: '2px', animation: 'waveBar 0.8s infinite 0.4s' }} />
                <span style={{ width: '4px', height: '8px', backgroundColor: '#EF4444', borderRadius: '2px', animation: 'waveBar 0.8s infinite 0.2s' }} />
              </div>
            )}

            {voiceError && !isListening && (
              <div
                style={{
                  fontSize: '0.88rem',
                  fontWeight: '500',
                  color: '#DC2626',
                  backgroundColor: '#FEF2F2',
                  border: '1px solid #FCA5A5',
                  padding: '6px 14px',
                  borderRadius: '12px',
                  marginTop: '4px',
                  textAlign: 'center',
                  maxWidth: '460px',
                  lineHeight: '1.4',
                }}
              >
                ⚠️ {voiceError}
              </div>
            )}
          </div>

          {/* Quick-Reply Option Pills or Loading Spinner */}
          {loading ? (
            <div
              style={{
                width: '100%',
                marginTop: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '12px',
                color: themeObj.colors.primaryDark,
                fontWeight: '600',
                fontSize: '0.95rem',
              }}
            >
              <RefreshCw size={20} className="animate-spin" />
              <span>
                {activeLanguage.startsWith('te')
                  ? 'ప్రశ్నలు అప్‌డేట్ అవుతున్నాయి...'
                  : activeLanguage.startsWith('hi')
                  ? 'प्रश्न अपडेट हो रहे हैं...'
                  : 'Updating questions...'}
              </span>
            </div>
          ) : (
            options.length > 0 && (
              <div style={{ width: '100%', marginTop: '14px' }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px' }}>
                  {options.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handlePillClick(opt)}
                      disabled={isSubmitting || loading}
                      style={{
                        padding: '10px 16px',
                        borderRadius: themeObj.borderRadius.badge,
                        backgroundColor: themeObj.colors.surface,
                        border: `1.5px solid ${themeObj.colors.border}`,
                        color: themeObj.colors.textPrimary,
                        fontSize: '0.95rem',
                        fontWeight: '600',
                        cursor: isSubmitting || loading ? 'default' : 'pointer',
                        opacity: isSubmitting || loading ? 0.6 : 1,
                        boxShadow: themeObj.shadows.subtle,
                        transition: 'all 0.15s ease-in-out',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = themeObj.colors.primary;
                        e.currentTarget.style.backgroundColor = '#E8F7F5';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = themeObj.colors.border;
                        e.currentTarget.style.backgroundColor = themeObj.colors.surface;
                      }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )
          )}

          {/* Typing Input */}
          <div style={{ display: 'flex', gap: '8px', width: '100%', marginTop: '14px' }}>
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleTypeSubmit()}
              placeholder={t.typePlaceholder}
              style={{ ...styles.largeInput, minHeight: '52px', fontSize: '1rem' }}
            />
            <button
              onClick={handleTypeSubmit}
              disabled={!userInput.trim() || isSubmitting || loading}
              style={{
                ...styles.primaryButton,
                minHeight: '52px',
                padding: '0 20px',
                borderRadius: themeObj.borderRadius.inputs,
                opacity: !userInput.trim() || isSubmitting || loading ? 0.6 : 1,
              }}
            >
              <Send size={20} />
            </button>
          </div>
        </>
      )}

      {/* Manual Proceed to Document Upload Button */}
      <button
        onClick={onProceed}
        style={{
          ...styles.outlineButton,
          width: '100%',
          marginTop: '16px',
          borderColor: themeObj.colors.primary,
        }}
      >
        <span>
          {t.proceedToDocs} ({turnCount > 0 ? t.intakeRecorded : t.skip})
        </span>
        <ArrowRight size={20} />
      </button>

      {/* Keyframe animation for progress bar */}
      <style>{`
        @keyframes growWidth {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
}
