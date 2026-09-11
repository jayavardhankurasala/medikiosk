import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { theme, styles } from '../../styles/theme';
import { useLanguage } from '../../context/LanguageContext';
import BotAvatar from '../common/BotAvatar';

export default function Screen5Welcome({ onGetStarted, userName = 'Ramesh' }) {
  const { t } = useLanguage();

  return (
    <div style={{ ...styles.kioskCard, alignItems: 'center', textAlign: 'center' }}>
      {/* Bot Mascot */}
      <div style={{ margin: '10px 0' }}>
        <BotAvatar size={150} isTalking={true} />
      </div>

      <div>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            backgroundColor: '#DCFCE7',
            color: '#16A34A',
            padding: '4px 14px',
            borderRadius: theme.borderRadius.badge,
            fontSize: '0.85rem',
            fontWeight: '600',
            marginBottom: '10px',
          }}
        >
          <Sparkles size={14} />
          <span>{t.intakeReadyBadge || 'Patient Intake Ready'}</span>
        </div>

        <h2 style={{ ...styles.title, fontSize: '2.2rem' }}>
          {t.headings.welcome || 'Welcome!'}
        </h2>
        <p
          style={{
            ...styles.subtitle,
            fontSize: '1.1rem',
            marginTop: '8px',
            maxWidth: '380px',
          }}
        >
          {t.subtitles.welcome || "Let's take a few minutes to understand your health better."}
        </p>
      </div>

      {/* Primary Action Button */}
      <button
        onClick={onGetStarted}
        style={{
          ...styles.primaryButton,
          width: '100%',
          marginTop: '12px',
        }}
      >
        <span>{t.getStarted || 'Get Started'}</span>
        <ArrowRight size={22} />
      </button>
    </div>
  );
}
