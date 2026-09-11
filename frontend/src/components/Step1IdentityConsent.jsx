import React, { useState } from 'react';
import { Shield, Phone, Volume2, CheckCircle2, ArrowRight, KeyRound, Globe, User } from 'lucide-react';
import { getKioskStyles } from '../styles/kioskStyles';

const LANGUAGES = [
  { code: 'hi-IN', name: 'Hindi', script: 'हिन्दी' },
  { code: 'en-IN', name: 'English', script: 'English' },
  { code: 'te-IN', name: 'Telugu', script: 'తెలుగు' },
  { code: 'ta-IN', name: 'Tamil', script: 'தமிழ்' },
  { code: 'kn-IN', name: 'Kannada', script: 'ಕನ್ನಡ' },
  { code: 'ml-IN', name: 'Malayalam', script: 'മലയാളം' },
  { code: 'bn-IN', name: 'Bengali', script: 'বাংলা' },
];

export default function Step1IdentityConsent({
  isHighContrast,
  selectedLanguage,
  setSelectedLanguage,
  onVerified,
  speakText,
}) {
  const styles = getKioskStyles(isHighContrast);

  const [phone, setPhone] = useState('9876543210');
  const [abhaId, setAbhaId] = useState('');
  const [name, setName] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [mockOtpHint, setMockOtpHint] = useState('');
  const [consentAccepted, setConsentAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Audio guide for consent
  const handleListenConsent = () => {
    const consentNarration =
      selectedLanguage.startsWith('hi')
        ? 'डिजिटल व्यक्तिगत डेटा संरक्षण अधिनियम 2023 और आयुष्मान भारत डिजिटल मिशन के तहत, आपकी अनुमति से आपका स्वास्थ्य विवरण और पिछले पर्चे डॉक्टर के परामर्श के लिए सुरक्षित रूप से संकलित किए जा रहे हैं। परामर्श समाप्त होने पर यह अस्थायी सत्र समाप्त हो जाएगा।'
        : 'Under the Digital Personal Data Protection Act 2023 and ABDM guidelines, with your consent, your health complaints and documents are being securely processed to prepare your clinical summary. This temporary kiosk session will be safely cleared after consultation.';

    speakText(consentNarration, selectedLanguage);
  };

  // Send OTP
  const handleSendOtp = async () => {
    if (!phone || phone.length < 10) {
      setErrorMessage('Please enter a valid 10-digit mobile number');
      return;
    }
    setLoading(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, abhaId, name }),
      });
      const data = await res.json();
      if (data.success) {
        setOtpSent(true);
        if (data.mockOtp) {
          setMockOtpHint(data.mockOtp);
          setOtpCode(data.mockOtp); // Auto-fill in kiosk for instant testing
        }
      } else {
        setErrorMessage(data.message || 'Failed to send OTP');
      }
    } catch (err) {
      // Offline fallback
      setOtpSent(true);
      setMockOtpHint('123456');
      setOtpCode('123456');
    } finally {
      setLoading(false);
    }
  };

  // Verify OTP and proceed
  const handleVerifyOtp = async () => {
    if (!consentAccepted) {
      setErrorMessage('Please accept the DPDP data consent to proceed.');
      return;
    }
    setLoading(true);
    setErrorMessage('');

    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone,
          otpCode,
          name: name || 'Ramesh Kumar',
          abhaId: abhaId || '91-4567-8910-1112',
          age: 42,
          gender: 'Male',
        }),
      });
      const data = await res.json();
      if (data.success) {
        onVerified({
          token: data.token,
          patient: data.patient,
          language: selectedLanguage,
        });
      } else {
        setErrorMessage(data.message || 'Invalid OTP');
      }
    } catch (err) {
      // Fallback
      onVerified({
        token: 'dev-token',
        patient: { id: 'p-1', phone, name: name || 'Ramesh Kumar', age: 42, gender: 'Male' },
        language: selectedLanguage,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.card}>
      {/* 1. Language Selection */}
      <div>
        <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Globe size={22} color={styles.colors.accent} />
          अपनी भाषा चुनें / Select Your Language
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '10px' }}>
          {LANGUAGES.map((lang) => {
            const isSelected = selectedLanguage === lang.code;
            return (
              <button
                key={lang.code}
                onClick={() => setSelectedLanguage(lang.code)}
                style={{
                  ...styles.touchButton,
                  minHeight: '60px',
                  backgroundColor: isSelected ? (isHighContrast ? '#FFFF00' : '#0284c7') : styles.colors.surface,
                  color: isSelected ? (isHighContrast ? '#000000' : '#ffffff') : styles.colors.textPrimary,
                  border: isSelected ? (isHighContrast ? '3px solid #fff' : '2px solid #38bdf8') : styles.colors.buttonBorder,
                  flexDirection: 'column',
                  gap: '2px',
                  padding: '8px 12px',
                }}
              >
                <span style={{ fontSize: '1.15rem', fontWeight: '800' }}>{lang.script}</span>
                <span style={{ fontSize: '0.8rem', opacity: 0.85 }}>{lang.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      <hr style={{ borderColor: styles.colors.surfaceBorder, margin: '10px 0' }} />

      {/* 2. Patient Identity & Mobile */}
      <div>
        <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '14px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <User size={22} color={styles.colors.accent} />
          मरीज की पहचान / Patient Identification
        </h3>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '0.95rem', color: styles.colors.textSecondary }}>
              Mobile Number / मोबाइल नंबर *
            </label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="10-digit mobile"
                maxLength={10}
                style={styles.largeInput}
              />
              {!otpSent && (
                <button
                  onClick={handleSendOtp}
                  disabled={loading}
                  style={{
                    ...styles.primaryButton,
                    minHeight: '64px',
                    whiteSpace: 'nowrap',
                    padding: '0 24px',
                  }}
                >
                  <Phone size={20} /> Get OTP
                </button>
              )}
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '0.95rem', color: styles.colors.textSecondary }}>
              ABHA ID / आभा संख्या (Optional)
            </label>
            <input
              type="text"
              value={abhaId}
              onChange={(e) => setAbhaId(e.target.value)}
              placeholder="e.g. 91-1234-5678-9012"
              style={styles.largeInput}
            />
          </div>
        </div>

        {/* OTP Entry Box */}
        {otpSent && (
          <div
            style={{
              backgroundColor: isHighContrast ? '#111' : 'rgba(15, 23, 42, 0.6)',
              border: `2px dashed ${styles.colors.accent}`,
              borderRadius: '16px',
              padding: '20px',
              marginTop: '12px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: '700', fontSize: '1.1rem', color: styles.colors.accent }}>
                🔑 Enter 6-digit OTP sent to +91 {phone}
              </span>
              {mockOtpHint && (
                <span style={{ fontSize: '0.85rem', color: isHighContrast ? '#FFFF00' : '#34d399', fontWeight: '600' }}>
                  Demo Auto-fill OTP: <b>{mockOtpHint}</b>
                </span>
              )}
            </div>
            <input
              type="text"
              value={otpCode}
              onChange={(e) => setOtpCode(e.target.value)}
              placeholder="Enter 6-digit code"
              maxLength={6}
              style={{ ...styles.largeInput, letterSpacing: '0.25em', fontSize: '1.5rem', textAlign: 'center' }}
            />
          </div>
        )}
      </div>

      <hr style={{ borderColor: styles.colors.surfaceBorder, margin: '10px 0' }} />

      {/* 3. Consent & DPDP Act 2023 */}
      <div
        style={{
          backgroundColor: isHighContrast ? '#0a0a0a' : 'rgba(30, 41, 59, 0.7)',
          padding: '20px',
          borderRadius: '16px',
          border: `1px solid ${styles.colors.surfaceBorder}`,
          display: 'flex',
          flexDirection: 'column',
          gap: '14px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
          <span style={{ fontWeight: '800', fontSize: '1.05rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Shield size={20} color="#10b981" />
            DPDP Act 2023 & ABDM Consent / डेटा सुरक्षा व सहमति
          </span>

          <button
            onClick={handleListenConsent}
            style={{
              padding: '8px 16px',
              borderRadius: '10px',
              backgroundColor: isHighContrast ? '#FFFF00' : 'rgba(56, 189, 248, 0.2)',
              color: isHighContrast ? '#000' : '#38bdf8',
              border: isHighContrast ? 'none' : '1px solid rgba(56, 189, 248, 0.4)',
              cursor: 'pointer',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.9rem',
            }}
          >
            <Volume2 size={18} /> 🔊 Listen to Consent Terms
          </button>
        </div>

        <p style={{ fontSize: '0.95rem', lineHeight: 1.5, color: styles.colors.textSecondary, margin: 0 }}>
          I hereby authorize MediKiosk to capture my clinical symptoms and scan prior medical records using AI for the sole purpose of generating a pre-consultation summary for the attending physician. Temporary data is deleted upon session completion.
        </p>

        <label style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', fontSize: '1.1rem', fontWeight: '700' }}>
          <input
            type="checkbox"
            checked={consentAccepted}
            onChange={(e) => setConsentAccepted(e.target.checked)}
            style={{ width: '26px', height: '26px', accentColor: styles.colors.accent, cursor: 'pointer' }}
          />
          <span>हाँ, मुझे नियम व शर्तें स्वीकार हैं (I accept the clinical intake consent)</span>
        </label>
      </div>

      {errorMessage && (
        <div style={{ color: styles.colors.danger, fontWeight: '700', fontSize: '1.05rem', textAlign: 'center' }}>
          {errorMessage}
        </div>
      )}

      {/* Action Proceed */}
      <button
        onClick={otpSent ? handleVerifyOtp : handleSendOtp}
        disabled={loading}
        style={{
          ...styles.primaryButton,
          marginTop: '10px',
          width: '100%',
        }}
      >
        <span>{otpSent ? 'सत्यापित करें और बातचीत शुरू करें (Verify & Begin Intake)' : 'ओटीपी प्राप्त करें (Send OTP)'}</span>
        <ArrowRight size={24} />
      </button>
    </div>
  );
}
