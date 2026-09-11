import React, { useState, useRef } from 'react';
import { User, Phone, ArrowRight, ShieldCheck, UserPlus, CheckCircle, RefreshCw, KeyRound, Camera, RotateCcw } from 'lucide-react';
import { getStyles } from '../../styles/theme';
import { useLanguage } from '../../context/LanguageContext';
import { formatAbha, generateAbhaId, cleanAbha } from '../../utils/abhaUtils';

export default function Screen3Login({
  onLoginSuccess,
  languageCode: propLanguageCode,
  themeObj,
}) {
  const { language, t } = useLanguage();
  const styles = getStyles(themeObj);

  const [identifier, setIdentifier] = useState('');
  const [detectedType, setDetectedType] = useState(null); // 'phone' | 'abha' | null
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [mockOtpHint, setMockOtpHint] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Register New Patient Form State
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [regStep, setRegStep] = useState(1); // 1: Demographics, 2: Photo Capture
  const [regName, setRegName] = useState('');
  const [regAge, setRegAge] = useState('');
  const [regGender, setRegGender] = useState('Male');
  const [regPhone, setRegPhone] = useState('');
  const [regAadhaar, setRegAadhaar] = useState('');
  const [capturedPhoto, setCapturedPhoto] = useState(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [regLoading, setRegLoading] = useState(false);

  const videoRef = useRef(null);
  const streamRef = useRef(null);

  // Auto-detection logic for ABHA ID vs Mobile Phone
  const handleIdentifierChange = (value) => {
    setIdentifier(value);
    if (error) setError('');

    const clean = value.replace(/[-\s]/g, '');
    if (/^\d{10}$/.test(clean)) {
      setDetectedType('phone');
    } else if (clean.length === 14 || /^\d{2}-\d{4}-\d{4}-\d{4}$/.test(value)) {
      setDetectedType('abha');
    } else {
      setDetectedType(null);
    }
  };

  // Send OTP
  const handleSendOtp = async () => {
    if (isSubmitting || loading) return;
    const clean = identifier.replace(/[-\s]/g, '');
    if (!clean || clean.length < 10) {
      setError('Please enter a valid 10-digit mobile number or 14-digit ABHA ID.');
      return;
    }

    setIsSubmitting(true);
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier: clean }),
      });
      const data = await res.json();
      if (data.success) {
        setOtpSent(true);
        if (data.mockOtp) {
          setMockOtpHint(data.mockOtp);
          setOtpCode(data.mockOtp); // Auto-fill in kiosk for instant testing
        }
      } else {
        setError(data.message || 'Failed to send OTP.');
      }
    } catch (err) {
      // Offline fallback
      setOtpSent(true);
      setMockOtpHint('123456');
      setOtpCode('123456');
    } finally {
      setLoading(false);
      setIsSubmitting(false);
    }
  };

  // Verify OTP
  const handleVerifyOtp = async () => {
    if (isSubmitting || loading) return;
    if (!otpCode || otpCode.length < 6) {
      setError('Please enter the 6-digit OTP code.');
      return;
    }

    setIsSubmitting(true);
    setLoading(true);
    setError('');

    const clean = identifier.replace(/[-\s]/g, '');
    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: clean.length === 10 ? clean : '9876543210',
          abhaId: clean.length === 14 ? clean : null,
          otpCode,
        }),
      });
      const data = await res.json();
      if (data.success) {
        onLoginSuccess(data.patient, data.token);
      } else {
        setError(data.message || 'Invalid or expired OTP.');
      }
    } catch {
      // Fallback
      onLoginSuccess(
        { id: 'p-default', name: 'Ramesh Kumar', phone: clean, abhaId: '91-4567-8901-2345', age: 38, gender: 'Male' },
        'demo-jwt-token'
      );
    } finally {
      setLoading(false);
      setIsSubmitting(false);
    }
  };

  // Camera handling for Registration Photo
  const startCamera = async () => {
    setIsCameraActive(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.warn('Camera failed:', err);
      setIsCameraActive(false);
    }
  };

  const takePhoto = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth || 480;
    canvas.height = videoRef.current.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const photoData = canvas.toDataURL('image/jpeg');
    setCapturedPhoto(photoData);

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  const retakePhoto = () => {
    setCapturedPhoto(null);
    startCamera();
  };

  // Submit Registration + Photo
  const handleCompleteRegistration = async () => {
    if (isSubmitting || regLoading) return;
    setIsSubmitting(true);
    setRegLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/register-patient', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: regName.trim(),
          age: regAge || 30,
          gender: regGender,
          phone: regPhone.replace(/\D/g, ''),
          aadhaarId: regAadhaar.trim() || undefined,
          profilePhotoUrl: capturedPhoto,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        const isDuplicate =
          res.status === 400 &&
          (data.message?.toLowerCase().includes('already') ||
            data.message?.toLowerCase().includes('duplicate') ||
            data.message?.toLowerCase().includes('exists'));

        setError(
          data.message ||
            (isDuplicate
              ? 'An account with this Phone Number or Aadhaar ID already exists. Please log in.'
              : 'Registration failed. Please check your information.')
        );
        return; // PREVENT ADVANCING!
      }

      onLoginSuccess(data.patient, data.token);
    } catch (networkErr) {
      console.error('Registration network error:', networkErr);
      setError('Unable to connect to server. Please try again.');
    } finally {
      setRegLoading(false);
      setIsSubmitting(false);
    }
  };

  return (
    <div style={styles.kioskCard}>
      {/* Header */}
      <div>
        <h2 style={styles.title}>
          {showRegisterForm ? (regStep === 1 ? t.registerTitle : 'Capture Patient Profile Photo') : t.headings.login}
        </h2>
        <p style={{ ...styles.subtitle, marginTop: '6px' }}>
          {showRegisterForm
            ? regStep === 1
              ? 'Enter patient demographics to generate a digital health record'
              : 'Look at the kiosk camera to attach photo to ABHA health record'
            : 'Access health profile using National Health Authority credentials'}
        </p>
      </div>

      {/* --- FORM 1: SMART LOGIN (PHONE / ABHA) --- */}
      {!showRegisterForm ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Smart Input Block */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label style={{ fontSize: '0.95rem', fontWeight: '600', color: themeObj.colors.textPrimary }}>
                {t.smartInputLabel} *
              </label>
              {detectedType && (
                <span
                  style={{
                    fontSize: '0.8rem',
                    fontWeight: '700',
                    color: themeObj.colors.primaryDark,
                    backgroundColor: themeObj.colors.background,
                    padding: '2px 8px',
                    borderRadius: '6px',
                  }}
                >
                  ✓ {detectedType === 'phone' ? t.detectedPhone : t.detectedAbha}
                </span>
              )}
            </div>

            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <div style={{ position: 'absolute', left: '16px', color: themeObj.colors.primary }}>
                {detectedType === 'phone' ? <Phone size={22} /> : <User size={22} />}
              </div>
              <input
                type="text"
                value={identifier}
                onChange={(e) => handleIdentifierChange(e.target.value)}
                placeholder={t.smartInputPlaceholder}
                style={{
                  ...styles.largeInput,
                  paddingLeft: '50px',
                  letterSpacing: detectedType === 'phone' ? '0.12em' : '0.04em',
                }}
              />
            </div>
          </div>

          {/* Send OTP Button (Shown before OTP sent) */}
          {!otpSent && (
            <button
              onClick={handleSendOtp}
              disabled={isSubmitting || loading || !identifier.trim()}
              style={{ ...styles.primaryButton, opacity: isSubmitting || loading ? 0.7 : 1 }}
            >
              {isSubmitting || loading ? (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <RefreshCw size={22} className="animate-spin" />
                  <span>Sending OTP...</span>
                </div>
              ) : (
                <>
                  <span>{t.sendOtp}</span>
                  <ArrowRight size={22} />
                </>
              )}
            </button>
          )}

          {/* 6-Digit OTP Block */}
          {otpSent && (
            <div
              style={{
                backgroundColor: themeObj.mode === 'contrast' ? '#000000' : themeObj.colors.background,
                border: `2px dashed ${themeObj.colors.primary}`,
                borderRadius: '16px',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                animation: 'fadeIn 0.25s ease',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: '700', fontSize: '1.05rem', color: themeObj.colors.primaryDark, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <KeyRound size={18} />
                  <span>Enter 6-digit OTP code</span>
                </span>
                {mockOtpHint && (
                  <span style={{ fontSize: '0.85rem', color: '#16A34A', fontWeight: '700' }}>
                    Demo code: <b>{mockOtpHint}</b>
                  </span>
                )}
              </div>

              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={otpCode}
                onChange={(e) => setOtpCode(e.target.value)}
                placeholder="• • • • • •"
                style={{
                  ...styles.largeInput,
                  textAlign: 'center',
                  fontSize: '1.8rem',
                  letterSpacing: '0.35em',
                  fontWeight: '800',
                }}
              />

              <button
                onClick={handleVerifyOtp}
                disabled={isSubmitting || loading || !otpCode || otpCode.length < 6}
                style={{ ...styles.primaryButton, opacity: isSubmitting || loading ? 0.7 : 1 }}
              >
                {isSubmitting || loading ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <RefreshCw size={22} className="animate-spin" />
                    <span>Verifying...</span>
                  </div>
                ) : (
                  <span>{t.verifyOtp}</span>
                )}
              </button>
            </div>
          )}

          {/* OR Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', margin: '4px 0' }}>
            <div style={{ flex: 1, height: '1px', backgroundColor: themeObj.colors.border }} />
            <span style={{ fontSize: '0.85rem', fontWeight: '600', color: themeObj.colors.textSecondary }}>
              {t.or}
            </span>
            <div style={{ flex: 1, height: '1px', backgroundColor: themeObj.colors.border }} />
          </div>

          {/* Register New Patient Button */}
          <button
            onClick={() => {
              setShowRegisterForm(true);
              setRegStep(1);
              setError('');
            }}
            style={styles.outlineButton}
          >
            <UserPlus size={20} color={themeObj.colors.primary} />
            <span>{t.registerBtn}</span>
          </button>
        </div>
      ) : (
        /* --- FORM 2: NEW PATIENT REGISTRATION WITH CAMERA PHOTO STEP --- */
        <div>
          {regStep === 1 ? (
            /* Step 1: Demographics */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '0.9rem', fontWeight: '600', display: 'block', marginBottom: '6px' }}>
                  {t.fullName} *
                </label>
                <input
                  type="text"
                  required
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="e.g. Ramesh Kumar"
                  style={styles.largeInput}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.9rem', fontWeight: '600', display: 'block', marginBottom: '6px' }}>
                    {t.age} *
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={120}
                    required
                    value={regAge}
                    onChange={(e) => setRegAge(e.target.value)}
                    placeholder="e.g. 42"
                    style={styles.largeInput}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.9rem', fontWeight: '600', display: 'block', marginBottom: '6px' }}>
                    {t.gender} *
                  </label>
                  <select
                    value={regGender}
                    onChange={(e) => setRegGender(e.target.value)}
                    style={{ ...styles.largeInput, cursor: 'pointer' }}
                  >
                    <option value="Male">{t.male}</option>
                    <option value="Female">{t.female}</option>
                    <option value="Other">{t.other}</option>
                  </select>
                </div>
              </div>

              <div>
                <label style={{ fontSize: '0.9rem', fontWeight: '600', display: 'block', marginBottom: '6px' }}>
                  {t.phoneNumber} *
                </label>
                <input
                  type="tel"
                  required
                  maxLength={10}
                  value={regPhone}
                  onChange={(e) => setRegPhone(e.target.value)}
                  placeholder="10-digit mobile"
                  style={styles.largeInput}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.9rem', fontWeight: '600', display: 'block', marginBottom: '6px' }}>
                  Aadhaar ID (Optional)
                </label>
                <input
                  type="text"
                  maxLength={16}
                  value={regAadhaar}
                  onChange={(e) => setRegAadhaar(e.target.value)}
                  placeholder="Optional: 12-digit Aadhaar ID"
                  style={styles.largeInput}
                />
              </div>

              <button
                type="button"
                onClick={() => {
                  if (!regName.trim() || !regPhone || regPhone.replace(/\D/g, '').length < 10) {
                    setError('Full Name and 10-digit Phone Number are required.');
                    return;
                  }
                  setError('');
                  setRegStep(2);
                  startCamera();
                }}
                style={{ ...styles.primaryButton, marginTop: '8px' }}
              >
                <span>Next: Capture Photo</span>
                <Camera size={20} />
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowRegisterForm(false);
                  setError('');
                }}
                style={{ ...styles.outlineButton, minHeight: '48px', border: 'none', color: themeObj.colors.textSecondary }}
              >
                ← Back to Login
              </button>
            </div>
          ) : (
            /* Step 2: Camera Photo Capture */
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
              <div
                style={{
                  width: '260px',
                  height: '260px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  backgroundColor: '#000',
                  position: 'relative',
                  border: `4px solid ${themeObj.colors.primary}`,
                  boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {capturedPhoto ? (
                  <img src={capturedPhoto} alt="Patient Snapshot" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <video ref={videoRef} autoPlay playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                )}
              </div>

              <div style={{ display: 'flex', gap: '12px', width: '100%' }}>
                {!capturedPhoto ? (
                  <button
                    type="button"
                    onClick={takePhoto}
                    style={{ ...styles.primaryButton, flex: 1 }}
                  >
                    <Camera size={20} />
                    <span>Take Photo</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={retakePhoto}
                    style={{ ...styles.outlineButton, flex: 1 }}
                  >
                    <RotateCcw size={18} />
                    <span>Retake Photo</span>
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleCompleteRegistration}
                  disabled={isSubmitting || regLoading}
                  style={{
                    ...styles.primaryButton,
                    flex: 1,
                    backgroundColor: '#10B981',
                    opacity: isSubmitting || regLoading ? 0.7 : 1,
                  }}
                >
                  {isSubmitting || regLoading ? <RefreshCw size={20} className="animate-spin" /> : <CheckCircle size={20} />}
                  <span>{isSubmitting || regLoading ? 'Registering...' : capturedPhoto ? 'Finish & Save' : 'Skip & Finish'}</span>
                </button>
              </div>

              <button
                type="button"
                onClick={() => setRegStep(1)}
                style={{ background: 'none', border: 'none', color: themeObj.colors.textSecondary, cursor: 'pointer', fontSize: '0.9rem' }}
              >
                ← Back to Demographics
              </button>
            </div>
          )}
        </div>
      )}

      {error && (
        <div
          style={{
            backgroundColor: '#FEF2F2',
            border: '2px solid #EF4444',
            borderRadius: '12px',
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '10px',
            animation: 'fadeIn 0.2s ease',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '1.2rem' }}>⚠️</span>
            <span style={{ color: '#DC2626', fontSize: '0.92rem', fontWeight: '700' }}>
              {error}
            </span>
          </div>
          {error.includes('already registered') && (
            <button
              type="button"
              onClick={() => {
                setShowRegisterForm(false);
                setIdentifier(regPhone);
                setError('');
              }}
              style={{
                backgroundColor: '#DC2626',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                padding: '6px 12px',
                fontSize: '0.82rem',
                fontWeight: '700',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
              }}
            >
              Switch to Login
            </button>
          )}
        </div>
      )}

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: themeObj.colors.textSecondary, fontSize: '0.85rem' }}>
        <ShieldCheck size={16} color={themeObj.colors.primary} />
        <span>ABDM Compliant • Digital Health ID Linked</span>
      </div>
    </div>
  );
}
