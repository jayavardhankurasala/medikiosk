import React, { useState } from 'react';
import { ShieldCheck, Check, ArrowRight } from 'lucide-react';
import { theme, styles } from '../../styles/theme';
import { useLanguage } from '../../context/LanguageContext';

export default function Screen8Consent({ onAgree, onReadFullConsent }) {
  const { t } = useLanguage();
  const [checked1, setChecked1] = useState(true);
  const [checked2, setChecked2] = useState(true);

  const canContinue = checked1 && checked2;

  return (
    <div style={styles.kioskCard}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div
          style={{
            width: '42px',
            height: '42px',
            borderRadius: '12px',
            backgroundColor: '#E8F7F5',
            color: theme.colors.primaryDark,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ShieldCheck size={26} />
        </div>
        <div>
          <h2 style={{ ...styles.title, fontSize: '1.5rem' }}>
            {t.headings.consent || 'Consent for Health Data Use'}
          </h2>
          <span style={{ fontSize: '0.85rem', color: theme.colors.primaryDark, fontWeight: '600' }}>
            {t.dpdpNotice || 'Digital Personal Data Protection (DPDP) Act 2023'}
          </span>
        </div>
      </div>

      <p
        style={{
          ...styles.subtitle,
          backgroundColor: '#F9FAFB',
          padding: '16px',
          borderRadius: theme.borderRadius.inputs,
          border: `1px solid ${theme.colors.border}`,
          lineHeight: 1.6,
        }}
      >
        {t.consentPara ||
          'I allow MediKiosk to collect, process and securely store my health information for pre-consultation and treatment purposes.'}
      </p>

      {/* Checkbox List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        <div
          onClick={() => setChecked1(!checked1)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            cursor: 'pointer',
            padding: '10px 4px',
          }}
        >
          <div
            style={{
              width: '26px',
              height: '26px',
              borderRadius: '8px',
              border: checked1 ? 'none' : `2px solid ${theme.colors.border}`,
              backgroundColor: checked1 ? theme.colors.primary : '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              transition: 'all 0.15s ease',
              flexShrink: 0,
            }}
          >
            {checked1 && <Check size={18} />}
          </div>
          <span style={{ fontSize: '1.02rem', fontWeight: '500', color: theme.colors.textPrimary }}>
            {t.consentCheck1 || 'I consent to sharing my clinical history with hospital healthcare providers.'}
          </span>
        </div>

        <div
          onClick={() => setChecked2(!checked2)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            cursor: 'pointer',
            padding: '10px 4px',
          }}
        >
          <div
            style={{
              width: '26px',
              height: '26px',
              borderRadius: '8px',
              border: checked2 ? 'none' : `2px solid ${theme.colors.border}`,
              backgroundColor: checked2 ? theme.colors.primary : '#FFFFFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              transition: 'all 0.15s ease',
              flexShrink: 0,
            }}
          >
            {checked2 && <Check size={18} />}
          </div>
          <span style={{ fontSize: '1.02rem', fontWeight: '500', color: theme.colors.textPrimary }}>
            {t.consentCheck2 || 'I consent to automated optical character recognition (OCR) on uploaded medical reports.'}
          </span>
        </div>
      </div>

      {/* Primary Action Button */}
      <button
        onClick={() => canContinue && onAgree()}
        disabled={!canContinue}
        style={{
          ...styles.primaryButton,
          opacity: canContinue ? 1 : 0.6,
          cursor: canContinue ? 'pointer' : 'not-allowed',
        }}
      >
        <span>{t.agreeAndContinue || 'I Agree & Continue'}</span>
        <ArrowRight size={22} />
      </button>

      {/* Read Full Consent Link */}
      <div style={{ textAlign: 'center' }}>
        <button
          onClick={onReadFullConsent}
          style={{
            background: 'none',
            border: 'none',
            color: theme.colors.primaryDark,
            fontSize: '0.92rem',
            fontWeight: '600',
            textDecoration: 'underline',
            cursor: 'pointer',
          }}
        >
          {t.readFullTerms || 'Read Full Privacy Policy'}
        </button>
      </div>
    </div>
  );
}
