import React from 'react';
import { Activity, Eye, Volume2, ShieldCheck, HeartPulse, User } from 'lucide-react';
import { getKioskStyles } from '../styles/kioskStyles';

export default function Header({
  isHighContrast,
  setIsHighContrast,
  clinicalMode,
  setClinicalMode,
  currentStep,
  selectedLanguage,
  patient,
  onProfileClick,
}) {
  const styles = getKioskStyles(isHighContrast);

  return (
    <header style={styles.header}>
      {/* Brand & Badges */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {/* Top-Left Circular Profile Picture / User Icon */}
        <button
          onClick={onProfileClick}
          title="Patient Profile & Settings (Click to Edit Demographics / Retake Photo)"
          aria-label="Open Profile Settings"
          style={{
            width: '46px',
            height: '46px',
            borderRadius: '50%',
            padding: 0,
            border: `2.5px solid ${isHighContrast ? '#FFFF00' : '#0284c7'}`,
            backgroundColor: isHighContrast ? '#000000' : '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: onProfileClick ? 'pointer' : 'default',
            overflow: 'hidden',
            flexShrink: 0,
            outline: 'none',
          }}
        >
          {patient?.profilePhotoUrl ? (
            <img
              src={patient.profilePhotoUrl}
              alt={patient.name || 'Patient'}
              style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }}
            />
          ) : (
            <User size={22} color={isHighContrast ? '#FFFF00' : '#0284c7'} />
          )}
        </button>

        <div
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '12px',
            backgroundColor: isHighContrast ? '#FFFF00' : '#0284c7',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: isHighContrast ? '#000000' : '#FFFFFF',
          }}
        >
          <HeartPulse size={30} />
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h1 style={{ fontSize: '1.45rem', fontWeight: '800', letterSpacing: '-0.02em', margin: 0 }}>
              MediKiosk
            </h1>
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: '700',
                padding: '3px 8px',
                borderRadius: '6px',
                backgroundColor: isHighContrast ? '#FFFF00' : 'rgba(56, 189, 248, 0.2)',
                color: isHighContrast ? '#000' : '#38bdf8',
                border: isHighContrast ? 'none' : '1px solid rgba(56, 189, 248, 0.4)',
              }}
            >
              ABDM READY
            </span>
          </div>
          <p style={{ fontSize: '0.85rem', color: styles.colors.textSecondary, margin: 0 }}>
            AI Multimodal Clinical Intake Platform • MoA & Hospital OPD
          </p>
        </div>
      </div>

      {/* Controls & Accessibility */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        {/* Clinical Mode Toggle */}
        <div
          style={{
            display: 'flex',
            backgroundColor: isHighContrast ? '#111' : 'rgba(15, 23, 42, 0.6)',
            borderRadius: '12px',
            padding: '4px',
            border: `1px solid ${styles.colors.surfaceBorder}`,
          }}
        >
          <button
            onClick={() => setClinicalMode('ALLOPATHIC')}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '700',
              fontSize: '0.9rem',
              backgroundColor: clinicalMode === 'ALLOPATHIC' ? (isHighContrast ? '#FFFF00' : '#0284c7') : 'transparent',
              color: clinicalMode === 'ALLOPATHIC' ? (isHighContrast ? '#000' : '#fff') : styles.colors.textSecondary,
            }}
          >
            Allopathic (SOCRATES)
          </button>
          <button
            onClick={() => setClinicalMode('AYUSH')}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '700',
              fontSize: '0.9rem',
              backgroundColor: clinicalMode === 'AYUSH' ? (isHighContrast ? '#FFFF00' : '#10b981') : 'transparent',
              color: clinicalMode === 'AYUSH' ? (isHighContrast ? '#000' : '#fff') : styles.colors.textSecondary,
            }}
          >
            AYUSH (दशविध परीक्षा)
          </button>
        </div>

        {/* High Contrast Toggle */}
        <button
          onClick={() => setIsHighContrast(!isHighContrast)}
          title="Toggle High Contrast Mode (WCAG AAA)"
          style={{
            minHeight: '44px',
            padding: '8px 16px',
            borderRadius: '10px',
            backgroundColor: isHighContrast ? '#FFFF00' : 'rgba(255, 255, 255, 0.08)',
            color: isHighContrast ? '#000000' : '#ffffff',
            border: isHighContrast ? '2px solid #fff' : '1px solid rgba(255, 255, 255, 0.2)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            fontWeight: '700',
            cursor: 'pointer',
          }}
        >
          <Eye size={18} />
          <span>{isHighContrast ? 'Contrast: ON' : 'High Contrast'}</span>
        </button>
      </div>
    </header>
  );
}
