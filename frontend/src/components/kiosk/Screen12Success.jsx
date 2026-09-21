import React from 'react';
import { Check, Home, Clock, Printer, ArrowRight } from 'lucide-react';
import { theme, styles } from '../../styles/theme';
import { useLanguage } from '../../context/LanguageContext';

export default function Screen12Success({
  tokenNumber = 'TK-101',
  patientName = 'Ramesh K.',
  onBackToHome,
}) {
  const { t } = useLanguage();

  const formattedToken = String(tokenNumber).startsWith('TK-')
    ? tokenNumber
    : String(tokenNumber).startsWith('#')
    ? `TK-${String(tokenNumber).replace('#', '')}`
    : `TK-${tokenNumber}`;

  return (
    <div style={{ ...styles.kioskCard, alignItems: 'center', textAlign: 'center', padding: '40px 32px' }}>
      {/* Large Circular Green Checkmark Badge */}
      <div
        style={{
          width: '88px',
          height: '88px',
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
        <Check size={48} strokeWidth={3} />
      </div>

      <div>
        <h2 style={{ ...styles.title, fontSize: '1.85rem', marginBottom: '4px' }}>
          {t.headings?.success || 'Registration & Intake Complete!'}
        </h2>
        <p style={{ ...styles.subtitle, fontSize: '1.05rem', color: theme.colors.textSecondary }}>
          Patient: <strong style={{ color: theme.colors.textPrimary }}>{patientName}</strong>
        </p>
      </div>

      {/* OPD Token Box */}
      <div
        style={{
          backgroundColor: '#F0FDF4',
          border: `2px dashed #16A34A`,
          borderRadius: '16px',
          padding: '24px 32px',
          width: '100%',
          boxSizing: 'border-box',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          margin: '12px 0',
          boxShadow: '0 4px 12px rgba(22, 163, 74, 0.08)',
        }}
      >
        <span style={{ fontSize: '0.85rem', fontWeight: '800', color: '#166534', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
          {t.opdQueueToken || 'YOUR OPD QUEUE TOKEN'}
        </span>
        <span
          style={{
            fontSize: '3.6rem',
            fontWeight: '900',
            color: '#15803D',
            lineHeight: 1,
            letterSpacing: '0.05em',
            fontFamily: 'monospace',
          }}
        >
          {formattedToken}
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: theme.colors.textSecondary, fontSize: '0.9rem', marginTop: '4px' }}>
          <Clock size={16} />
          <span>{t.estimatedWaitTime || 'Estimated Wait Time'}: <strong>Approx 8-12 mins</strong></span>
        </div>
      </div>

      {/* Next Step Routing Info */}
      <div
        style={{
          width: '100%',
          padding: '14px 16px',
          backgroundColor: '#EFF6FF',
          border: '1px solid #BFDBFE',
          borderRadius: '10px',
          textAlign: 'left',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          marginBottom: '12px',
        }}
      >
        <div
          style={{
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: '#2563EB',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          <ArrowRight size={20} />
        </div>
        <div style={{ fontSize: '0.88rem', color: '#1E40AF' }}>
          <strong>Next Step:</strong> Please proceed directly to <strong>Nurse Triage Desk (Station 1)</strong>. Show your token <strong>{formattedToken}</strong> for vitals check (BP, SpO2, Temperature).
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ display: 'flex', gap: '12px', width: '100%' }}>
        <button
          onClick={() => window.print()}
          style={{
            ...styles.outlineButton,
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
          }}
        >
          <Printer size={18} />
          <span>Print Slip</span>
        </button>

        <button
          onClick={onBackToHome}
          style={{
            ...styles.primaryButton,
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
          }}
        >
          <Home size={18} />
          <span>{t.backToHome || 'Finish & Return'}</span>
        </button>
      </div>
    </div>
  );
}
