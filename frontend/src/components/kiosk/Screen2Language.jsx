import React from 'react';
import { Volume2, Check } from 'lucide-react';
import { theme, styles } from '../../styles/theme';
import { useLanguage, LANGUAGE_OPTIONS } from '../../context/LanguageContext';

export default function Screen2Language({
  selectedLanguage: propSelectedLanguage,
  onSelectLanguage,
  onNext,
  onPlayAudioPrompt,
}) {
  const { language, setLanguage, t } = useLanguage();
  const currentLang = propSelectedLanguage || language;

  const handleLanguageClick = (lang) => {
    setLanguage(lang.id);
    if (onSelectLanguage) {
      onSelectLanguage(lang.id, lang.name);
    }
    if (onPlayAudioPrompt) {
      onPlayAudioPrompt(lang.id);
    }
    // Advance to next screen
    setTimeout(() => {
      if (onNext) onNext();
    }, 250);
  };

  return (
    <div style={styles.kioskCard}>
      <div style={{ textAlign: 'center' }}>
        <h2 style={styles.title}>{t.headings.language}</h2>
        <p style={{ ...styles.subtitle, marginTop: '6px' }}>
          {t.subtitles.language}
        </p>
      </div>

      {/* Grid of exactly 3 Large Touch Cards: English, Hindi, Telugu */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px',
          margin: '12px 0',
        }}
      >
        {LANGUAGE_OPTIONS.map((lang) => {
          const isSelected = currentLang === lang.id;
          return (
            <button
              key={lang.id}
              onClick={() => handleLanguageClick(lang)}
              style={{
                minHeight: '84px',
                borderRadius: theme.borderRadius.cards,
                backgroundColor: isSelected ? '#E8F7F5' : '#FFFFFF',
                border: isSelected
                  ? `2.5px solid ${theme.colors.primary}`
                  : `1.5px solid ${theme.colors.border}`,
                padding: '18px 22px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                boxShadow: isSelected ? theme.shadows.card : theme.shadows.subtle,
                transition: 'all 0.16s ease-in-out',
                fontFamily: theme.typography.fontFamily,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px', textAlign: 'left' }}>
                <span style={{ fontSize: '2rem' }}>{lang.icon}</span>
                <div>
                  <div
                    style={{
                      fontSize: '1.3rem',
                      fontWeight: '700',
                      color: isSelected ? theme.colors.primaryDark : theme.colors.textPrimary,
                    }}
                  >
                    {lang.script}
                  </div>
                  <div style={{ fontSize: '0.9rem', color: theme.colors.textSecondary, marginTop: '2px' }}>
                    {lang.name}
                  </div>
                </div>
              </div>

              {isSelected && (
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: theme.colors.primary,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#FFFFFF',
                  }}
                >
                  <Check size={20} />
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Footer Audio Hint */}
      <div
        onClick={() => onPlayAudioPrompt && onPlayAudioPrompt(currentLang)}
        style={{
          padding: '14px 20px',
          borderRadius: theme.borderRadius.inputs,
          backgroundColor: '#E8F7F5',
          border: `1px dashed ${theme.colors.primary}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          color: theme.colors.primaryDark,
          fontWeight: '600',
          fontSize: '0.95rem',
          cursor: 'pointer',
          marginTop: '8px',
        }}
      >
        <Volume2 size={20} color={theme.colors.primary} />
        <span>{t.audioGuideHint}</span>
      </div>
    </div>
  );
}
