import React from 'react';
import { AlertTriangle, BellRing, PhoneCall, ShieldAlert, X } from 'lucide-react';
import { getKioskStyles } from '../styles/kioskStyles';

export default function RedFlagAlertModal({
  isOpen,
  onClose,
  isHighContrast,
  emergencyReason = 'Critical symptoms detected (Acute chest distress / Neurological deficit)',
}) {
  if (!isOpen) return null;

  const styles = getKioskStyles(isHighContrast);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.85)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
        padding: '20px',
        animation: 'fadeIn 0.2s ease',
      }}
    >
      <div
        style={{
          maxWidth: '680px',
          width: '100%',
          backgroundColor: isHighContrast ? '#000000' : '#450a0a',
          border: `4px solid ${isHighContrast ? '#FF0000' : '#ef4444'}`,
          borderRadius: '24px',
          padding: '36px 32px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          boxShadow: '0 0 60px rgba(239, 68, 68, 0.7)',
          gap: '20px',
        }}
      >
        {/* Pulsing Emergency Icon */}
        <div
          style={{
            width: '90px',
            height: '90px',
            borderRadius: '50%',
            backgroundColor: '#ef4444',
            color: '#FFFFFF',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            animation: 'pulse 1.2s infinite',
          }}
        >
          <ShieldAlert size={56} />
        </div>

        <div>
          <span
            style={{
              fontSize: '1rem',
              fontWeight: '800',
              padding: '6px 16px',
              borderRadius: '30px',
              backgroundColor: '#fee2e2',
              color: '#991b1b',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}
          >
            🚨 TRIAGE PRIORITY 1 • RED FLAG ALERT
          </span>
          <h2
            style={{
              fontSize: '2rem',
              fontWeight: '900',
              color: isHighContrast ? '#FF0000' : '#fecaca',
              marginTop: '14px',
              lineHeight: 1.2,
            }}
          >
            आपातकालीन सूचना / EMERGENCY NOTICE
          </h2>
        </div>

        <p
          style={{
            fontSize: '1.25rem',
            lineHeight: 1.5,
            color: isHighContrast ? '#FFFFFF' : '#fca5a5',
            fontWeight: '600',
            maxWidth: '560px',
          }}
        >
          {emergencyReason}
        </p>

        <div
          style={{
            backgroundColor: isHighContrast ? '#111' : 'rgba(0, 0, 0, 0.4)',
            border: `2px dashed ${isHighContrast ? '#FFFF00' : '#f87171'}`,
            borderRadius: '16px',
            padding: '18px 24px',
            width: '100%',
            textAlign: 'left',
          }}
        >
          <h4 style={{ color: '#fff', fontSize: '1.1rem', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <BellRing size={20} color="#f87171" /> Immediate Instructions:
          </h4>
          <ul style={{ color: isHighContrast ? '#FFFF00' : '#fed7aa', paddingLeft: '24px', fontSize: '1.05rem', lineHeight: 1.6 }}>
            <li><b>Do NOT wait in the regular OPD queue.</b></li>
            <li>Proceed straight to the <b>Casualty / Emergency Room (ER)</b> at Counter 1.</li>
            <li>Kiosk has dispatched an automated alert to the Nursing Triage Station.</li>
          </ul>
        </div>

        <div style={{ display: 'flex', gap: '16px', width: '100%', marginTop: '8px' }}>
          <button
            onClick={onClose}
            style={{
              ...styles.touchButton,
              flex: 1,
              backgroundColor: '#ef4444',
              color: '#ffffff',
              border: 'none',
              fontSize: '1.2rem',
              fontWeight: '800',
            }}
          >
            <PhoneCall size={24} /> Staff Alerted • Proceed to ER
          </button>
        </div>
      </div>
    </div>
  );
}
