import React, { useEffect } from 'react';
import { HeartPulse, Sparkles, ArrowRight } from 'lucide-react';
import { theme } from '../../styles/theme';
import { useLanguage } from '../../context/LanguageContext';

export default function Screen1Splash({ onNext }) {
  const { t } = useLanguage();

  // Optional auto-advance after 4.5 seconds if untouched
  useEffect(() => {
    const timer = setTimeout(() => {
      onNext();
    }, 4500);
    return () => clearTimeout(timer);
  }, [onNext]);

  return (
    <div
      onClick={onNext}
      style={{
        width: '100%',
        maxWidth: '520px',
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        textAlign: 'center',
        cursor: 'pointer',
        padding: '30px 20px',
        boxSizing: 'border-box',
      }}
    >
      <div />

      {/* Center Brand Identity */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
        {/* Emblem with Pulse Ring */}
        <div
          style={{
            width: '120px',
            height: '120px',
            borderRadius: '32px',
            backgroundColor: theme.colors.primary,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            boxShadow: '0 16px 36px rgba(0, 199, 166, 0.4)',
            animation: 'pulseRing 2.4s infinite ease-in-out',
          }}
        >
          <HeartPulse size={64} />
        </div>

        <div>
          <h1
            style={{
              fontSize: '2.8rem',
              fontWeight: '700',
              color: theme.colors.textPrimary,
              margin: '0 0 8px 0',
              letterSpacing: '-0.03em',
            }}
          >
            {t.headings.splash || 'MediKiosk'}
          </h1>
          <p
            style={{
              fontSize: '1.25rem',
              color: theme.colors.textSecondary,
              fontWeight: '400',
              margin: 0,
            }}
          >
            {t.brandSubtitle || 'Your Health Story, Simplified'}
          </p>
        </div>

        {/* AI Badge */}
        <div
          style={{
            padding: '8px 20px',
            borderRadius: theme.borderRadius.badge,
            backgroundColor: '#DCFCE7',
            color: theme.colors.primaryDark,
            fontSize: '0.95rem',
            fontWeight: '600',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: theme.shadows.subtle,
          }}
        >
          <Sparkles size={16} color={theme.colors.primary} />
          <span>{t.splashBadge || 'AI-Powered Pre-Consultation Kiosk'}</span>
        </div>

        {/* Tap to Begin Touch Prompt */}
        <div
          style={{
            marginTop: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: theme.colors.primaryDark,
            fontWeight: '600',
            fontSize: '1.1rem',
          }}
        >
          <span>{t.splashTap || 'Tap anywhere to start'}</span>
          <ArrowRight size={20} />
        </div>
      </div>

      {/* Bottom Pill Banner */}
      <div
        style={{
          padding: '12px 28px',
          borderRadius: theme.borderRadius.badge,
          backgroundColor: '#FFFFFF',
          border: `1px solid ${theme.colors.border}`,
          color: theme.colors.textSecondary,
          fontSize: '0.95rem',
          fontWeight: '500',
          boxShadow: theme.shadows.subtle,
          letterSpacing: '0.02em',
        }}
      >
        {t.splashFooter || 'Accessible • Inclusive • Smarter Care'}
      </div>
    </div>
  );
}
