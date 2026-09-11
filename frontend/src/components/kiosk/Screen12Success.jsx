import React from 'react';
import { Check, Home, Clock } from 'lucide-react';
import { theme, styles } from '../../styles/theme';
import { useLanguage } from '../../context/LanguageContext';

export default function Screen12Success({
  tokenNumber = '001',
  patientName = 'Ramesh K.',
  onBackToHome,
}) {
  const { t } = useLanguage();

  return (
    <div style={{ ...styles.kioskCard, alignItems: 'center', textAlign: 'center', padding: '44px 32px' }}>
      {/* Large Circular Green Checkmark Badge */}
      <div
        style={{
          width: '96px',
          height: '96px',
          borderRadius: '50%',
          backgroundColor: '#DCFCE7',
          color: theme.colors.primary,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 24px rgba(0, 199, 166, 0.25)',
          marginBottom: '8px',
        }}
      >
        <Check size={52} strokeWidth={3} />
      </div>

      <div>
        <h2 style={{ ...styles.title, fontSize: '1.9rem' }}>
          {t.headings.success || 'Your information has been submitted!'}
        </h2>
        <p style={{ ...styles.subtitle, fontSize: '1.1rem', marginTop: '8px' }}>
          {t.subtitles.success || 'You will be called shortly. Thank you!'}
        </p>
      </div>

      {/* OPD Token Box */}
      <div
        style={{
          backgroundColor: '#E8F7F5',
          border: `2px dashed ${theme.colors.primary}`,
          borderRadius: '16px',
          padding: '20px 32px',
          width: '100%',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '6px',
          margin: '10px 0',
        }}
      >
        <span style={{ fontSize: '0.85rem', fontWeight: '700', color: theme.colors.primaryDark, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          {t.opdQueueToken || 'OPD QUEUE TOKEN'}
        </span>
        <span
          style={{
            fontSize: '3.2rem',
            fontWeight: '800',
            color: theme.colors.primaryDark,
            lineHeight: 1,
            letterSpacing: '0.04em',
          }}
        >
          #{tokenNumber}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: theme.colors.textSecondary, fontSize: '0.9rem', marginTop: '4px' }}>
          <Clock size={16} />
          <span>{t.estimatedWaitTime || 'Estimated Wait Time'}: {t.approxWaitMins || 'Approx 10-15 mins'}</span>
        </div>
      </div>

      {/* Back to Home Button */}
      <button
        onClick={onBackToHome}
        style={{ ...styles.outlineButton, width: '100%', marginTop: '6px' }}
      >
        <Home size={20} />
        <span>{t.backToHome || 'Back to Start'}</span>
      </button>
    </div>
  );
}
