import React, { useState } from 'react';
import { MessageSquare, FileText, ArrowLeft, Send, CheckCircle, Bot, User, ShieldCheck } from 'lucide-react';
import { getStyles } from '../../styles/theme';
import { useLanguage } from '../../context/LanguageContext';

export default function Screen11Review({
  conversationTurns = [],
  uploadedDocuments = [],
  onSubmitToDoctor,
  onGoBack,
  languageCode: propLanguageCode,
  themeObj,
}) {
  const { language, t } = useLanguage();
  const styles = getStyles(themeObj);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = () => {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      onSubmitToDoctor();
    }, 600);
  };

  // Fallback demo transcript if user quickly navigated
  const displayTurns =
    conversationTurns.length > 0
      ? conversationTurns
      : [
          { role: 'assistant', content: 'What health concern brings you here today?' },
          { role: 'user', content: 'Severe fever, dry cough, and headache for 3 days.' },
          { role: 'assistant', content: 'On a scale of 1 to 10, how severe is your discomfort right now?' },
          { role: 'user', content: 'Moderate discomfort, around 6 out of 10.' },
        ];

  return (
    <div style={{ ...styles.kioskCard, maxWidth: '640px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center' }}>
        <h2 style={styles.title}>{t.headings.review}</h2>
        <p style={{ ...styles.subtitle, marginTop: '6px' }}>
          {t.reviewSubtitle}
        </p>
      </div>

      {/* 1. Transcript of Conversation (Patient View - No AI Clinical Diagnosis) */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <MessageSquare size={18} color={themeObj.colors.primary} />
          <span style={{ fontSize: '0.95rem', fontWeight: '700', color: themeObj.colors.textPrimary }}>
            {t.transcriptTitle}
          </span>
        </div>

        <div
          style={{
            maxHeight: '260px',
            overflowY: 'auto',
            borderRadius: themeObj.borderRadius.inputs,
            backgroundColor: themeObj.mode === 'contrast' ? '#111111' : '#F9FAFB',
            border: `1.5px solid ${themeObj.colors.border}`,
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
          }}
        >
          {displayTurns.map((turn, i) => {
            const isUser = turn.role === 'user';
            return (
              <div
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px',
                  justifyContent: isUser ? 'flex-end' : 'flex-start',
                }}
              >
                {!isUser && (
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      backgroundColor: themeObj.colors.primary,
                      color: themeObj.mode === 'contrast' ? '#000' : '#FFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <Bot size={16} />
                  </div>
                )}

                <div
                  style={{
                    maxWidth: '80%',
                    padding: '10px 14px',
                    borderRadius: '14px',
                    fontSize: '0.95rem',
                    fontWeight: '500',
                    backgroundColor: isUser
                      ? themeObj.colors.primary
                      : themeObj.mode === 'contrast'
                      ? '#222'
                      : '#FFFFFF',
                    color: isUser
                      ? themeObj.mode === 'contrast'
                        ? '#000'
                        : '#FFFFFF'
                      : themeObj.colors.textPrimary,
                    boxShadow: themeObj.shadows.subtle,
                    lineHeight: 1.4,
                  }}
                >
                  <span style={{ fontSize: '0.75rem', display: 'block', fontWeight: '700', marginBottom: '2px', opacity: 0.85 }}>
                    {isUser ? t.patientRole : t.aiRole}
                  </span>
                  {turn.content}
                </div>

                {isUser && (
                  <div
                    style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      backgroundColor: themeObj.mode === 'contrast' ? '#FFF' : '#38BDF8',
                      color: '#000',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <User size={16} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Uploaded Documents List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <FileText size={18} color={themeObj.colors.primary} />
          <span style={{ fontSize: '0.95rem', fontWeight: '700', color: themeObj.colors.textPrimary }}>
            {t.attachedFiles} ({uploadedDocuments.length})
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {uploadedDocuments.map((doc, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 14px',
                borderRadius: '12px',
                backgroundColor: themeObj.mode === 'contrast' ? '#111' : '#FFFFFF',
                border: `1px solid ${themeObj.colors.border}`,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FileText size={18} color={themeObj.colors.primary} />
                <span style={{ fontSize: '0.92rem', fontWeight: '600', color: themeObj.colors.textPrimary }}>
                  {doc.name}
                </span>
              </div>
              <span
                style={{
                  fontSize: '0.8rem',
                  fontWeight: '700',
                  color: '#16A34A',
                  backgroundColor: '#DCFCE7',
                  padding: '2px 8px',
                  borderRadius: '6px',
                }}
              >
                {t.digitizedBadge}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Privacy Notice */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          color: themeObj.colors.textSecondary,
          fontSize: '0.82rem',
          backgroundColor: themeObj.mode === 'contrast' ? '#111' : '#F9FAFB',
          padding: '10px 14px',
          borderRadius: '10px',
        }}
      >
        <ShieldCheck size={16} color={themeObj.colors.primary} />
        <span>Clinical assessment & triage notes are routed directly to the treating physician.</span>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <button
          onClick={handleSubmit}
          disabled={submitting}
          style={styles.primaryButton}
        >
          <Send size={20} />
          <span>{submitting ? 'Submitting to Doctor...' : t.submitToDoctor}</span>
        </button>

        <button
          onClick={onGoBack}
          style={styles.outlineButton}
        >
          <ArrowLeft size={18} />
          <span>{t.goBack}</span>
        </button>
      </div>
    </div>
  );
}
