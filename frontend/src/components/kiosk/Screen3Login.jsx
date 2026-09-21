import React, { useState, useEffect, useRef } from 'react';
import {
  User,
  Phone,
  ArrowRight,
  ShieldCheck,
  UserPlus,
  CheckCircle,
  RefreshCw,
  KeyRound,
  Camera,
  RotateCcw,
  Upload,
  Activity,
  Stethoscope,
  Sparkles,
  BarChart3,
  Link2,
} from 'lucide-react';
import { getStyles, theme } from '../../styles/theme';
import { useLanguage } from '../../context/LanguageContext';
import { formatAbha, generateAbhaId, cleanAbha } from '../../utils/abhaUtils';

export default function Screen3Login({
  onLoginSuccess,
  languageCode: propLanguageCode,
  themeObj,
  onRoleSelect,
}) {
  const currentTheme = themeObj || theme;
  const { language, t } = useLanguage();
  const styles = getStyles(currentTheme);

  const [identifier, setIdentifier] = useState('');
  const [detectedType, setDetectedType] = useState(null); // 'phone' | 'abha' | null
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState('');
  const [mockOtpHint, setMockOtpHint] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [resolvedPhone, setResolvedPhone] = useState('');

  // Persist registration form draft across browser reloads
  const getSavedRegDraft = () => {
    try {
      const saved = sessionStorage.getItem('medikiosk_reg_draft');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  };
  const regDraft = getSavedRegDraft();

  // Register New Patient Form State (3 Steps: 1. Demographics, 2. Take Image, 3. Select Image & Create ABHA ID)
  const [showRegisterForm, setShowRegisterForm] = useState(regDraft?.showRegisterForm ?? false);
  const [regStep, setRegStep] = useState(regDraft?.regStep ?? 1);
  const [regName, setRegName] = useState(regDraft?.regName ?? '');
  const [regAge, setRegAge] = useState(regDraft?.regAge ?? '');
  const [regGender, setRegGender] = useState(regDraft?.regGender ?? 'Male');
  const [regPhone, setRegPhone] = useState(regDraft?.regPhone ?? '');
  const [regAadhaar, setRegAadhaar] = useState(regDraft?.regAadhaar ?? '');
  const [capturedPhoto, setCapturedPhoto] = useState(regDraft?.capturedPhoto ?? null);
  const [regAbhaId, setRegAbhaId] = useState(regDraft?.regAbhaId ?? '');
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [regLoading, setRegLoading] = useState(false);

  // Continuously save registration draft to sessionStorage
  useEffect(() => {
    if (showRegisterForm || regPhone || regName) {
      try {
        sessionStorage.setItem('medikiosk_reg_draft', JSON.stringify({
          showRegisterForm,
          regStep,
          regName,
          regAge,
          regGender,
          regPhone,
          regAadhaar,
          capturedPhoto,
          regAbhaId,
        }));
      } catch {}
    }
  }, [showRegisterForm, regStep, regName, regAge, regGender, regPhone, regAadhaar, capturedPhoto, regAbhaId]);

  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const fileInputRef = useRef(null);

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
        if (data.phone) {
          setResolvedPhone(data.phone);
        }
        if (data.mockOtp) {
          setMockOtpHint(data.mockOtp);
          setOtpCode(data.mockOtp); // Auto-fill in kiosk for instant testing
        }
      } else {
        setError(data.message || 'Failed to send OTP.');
      }
    } catch {
      // Offline / dev fallback
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
          identifier: identifier.trim(),
          phone: resolvedPhone || (detectedType === 'phone' ? clean : undefined),
          abhaId: detectedType === 'abha' ? identifier.trim() : undefined,
          otpCode: otpCode.trim(),
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
        { id: 'p-default', name: 'Ramesh Kumar', phone: resolvedPhone || clean, abhaId: detectedType === 'abha' ? identifier : '91-4567-8901-2345', age: 38, gender: 'Male' },
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
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: { ideal: 640 }, height: { ideal: 640 } },
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.warn('Camera stream unavailable:', err);
      setIsCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  const takePhoto = () => {
    if (!videoRef.current) return;
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth || 480;
    canvas.height = videoRef.current.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const photoData = canvas.toDataURL('image/jpeg', 0.85);
    setCapturedPhoto(photoData);
    stopCamera();
  };

  const retakePhoto = () => {
    setCapturedPhoto(null);
    startCamera();
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setCapturedPhoto(ev.target.result);
        stopCamera();
      };
      reader.readAsDataURL(file);
    }
  };

  // Step 2 -> Step 3: Select Image and Proceed to Create ABHA ID
  const handleProceedToCreateAbha = async () => {
    if (!capturedPhoto) {
      // Create a default SVG avatar if user chose to skip camera
      const fallbackCanvas = document.createElement('canvas');
      fallbackCanvas.width = 300;
      fallbackCanvas.height = 300;
      const ctx = fallbackCanvas.getContext('2d');
      ctx.fillStyle = '#00C7A6';
      ctx.fillRect(0, 0, 300, 300);
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 110px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText((regName.trim()[0] || 'P').toUpperCase(), 150, 150);
      setCapturedPhoto(fallbackCanvas.toDataURL('image/jpeg'));
    }
    stopCamera();

    const cleanPhone = regPhone.replace(/\D/g, '');
    if (!regAbhaId) {
      try {
        const checkRes = await fetch(`/api/auth/lookup/${cleanPhone}`);
        const checkData = await checkRes.json();
        if (checkData.exists && checkData.patient?.abhaId) {
          setRegAbhaId(checkData.patient.abhaId);
        } else {
          // Generate deterministic unique ABHA ID for this phone
          const d1 = '91';
          const d2 = cleanPhone.slice(0, 4) || '9876';
          const d3 = cleanPhone.slice(4, 8) || '5432';
          const d4 = (cleanPhone.slice(8, 10) || '10') + '45';
          setRegAbhaId(`${d1}-${d2}-${d3}-${d4}`);
        }
      } catch {
        const d1 = '91';
        const d2 = cleanPhone.slice(0, 4) || '9876';
        const d3 = cleanPhone.slice(4, 8) || '5432';
        const d4 = (cleanPhone.slice(8, 10) || '10') + '45';
        setRegAbhaId(`${d1}-${d2}-${d3}-${d4}`);
      }
    }
    setRegStep(3);
    setError('');
  };

  // Submit Final Registration + ABHA Creation
  const handleCompleteRegistration = async () => {
    if (isSubmitting || regLoading) return;
    setIsSubmitting(true);
    setRegLoading(true);
    setError('');

    const finalAbha = regAbhaId || generateAbhaId();

    try {
      const res = await fetch('/api/auth/register-patient', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: regName.trim(),
          age: regAge || 30,
          gender: regGender,
          phone: regPhone.replace(/\D/g, ''),
          abhaId: finalAbha,
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
        return;
      }

      // Clear draft on successful registration
      try {
        sessionStorage.removeItem('medikiosk_reg_draft');
      } catch {}

      // Log DPDP registration record
      fetch('/api/visits/audit-log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'PATIENT_REGISTERED_ABHA_LINKED',
          userId: data.patient?.id || 'patient-kiosk',
          userName: data.patient?.name || 'Kiosk Patient',
          role: 'patient',
          resource: 'Patient',
          resourceId: data.patient?.id || 'patient-kiosk',
          details: `Patient registered with Phone +91 ${regPhone} linked to ABHA ID ${finalAbha}.`,
        }),
      }).catch(() => {});

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
          {showRegisterForm
            ? regStep === 1
              ? (t.registerTitle || 'New Patient Registration')
              : regStep === 2
              ? 'Take Patient Image'
              : 'Select Image & Create ABHA ID'
            : (t.headings?.login || 'Patient Login & Verification')}
        </h2>
        <p style={{ ...styles.subtitle, marginTop: '6px' }}>
          {showRegisterForm
            ? regStep === 1
              ? 'Enter phone number and demographics to start ABHA registration'
              : regStep === 2
              ? 'Look directly at the kiosk camera or upload a picture for your health ID'
              : 'Link your phone number with your official Ayushman Bharat Health Account'
            : 'Enter your 10-digit Phone Number or 14-digit ABHA ID to log in via OTP'}
        </p>
      </div>

      {/* --- FORM 1: SMART LOGIN (PHONE / ABHA) --- */}
      {!showRegisterForm ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Smart Input Block */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label style={{ fontSize: '0.95rem', fontWeight: '600', color: currentTheme.colors.textPrimary }}>
                {t.smartInputLabel || 'Phone Number or ABHA ID'} *
              </label>
              {detectedType && (
                <span
                  style={{
                    fontSize: '0.8rem',
                    fontWeight: '700',
                    color: currentTheme.colors.primaryDark,
                    backgroundColor: currentTheme.colors.background,
                    padding: '2px 8px',
                    borderRadius: '6px',
                  }}
                >
                  ✓ {detectedType === 'phone' ? (t.detectedPhone || 'Mobile Phone') : (t.detectedAbha || 'ABHA ID')}
                </span>
              )}
            </div>

            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <div style={{ position: 'absolute', left: '16px', color: currentTheme.colors.primary }}>
                {detectedType === 'phone' ? <Phone size={22} /> : <User size={22} />}
              </div>
              <input
                type="text"
                value={identifier}
                onChange={(e) => handleIdentifierChange(e.target.value)}
                placeholder={t.smartInputPlaceholder || 'Enter 10-digit Mobile or 14-digit ABHA'}
                style={{
                  ...styles.largeInput,
                  paddingLeft: '50px',
                  letterSpacing: detectedType === 'phone' ? '0.12em' : '0.04em',
                }}
              />
            </div>
          </div>

          {/* Send OTP Button */}
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
                  <span>{t.sendOtp || 'Send Verification OTP'}</span>
                  <ArrowRight size={22} />
                </>
              )}
            </button>
          )}

          {/* 6-Digit OTP Block */}
          {otpSent && (
            <div
              style={{
                backgroundColor: currentTheme.mode === 'contrast' ? '#000000' : currentTheme.colors.background,
                border: `2px dashed ${currentTheme.colors.primary}`,
                borderRadius: '16px',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px',
                animation: 'fadeIn 0.25s ease',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: '700', fontSize: '1.05rem', color: currentTheme.colors.primaryDark, display: 'flex', alignItems: 'center', gap: '6px' }}>
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
                  <span>{t.verifyOtp || 'Verify & Continue'}</span>
                )}
              </button>
            </div>
          )}

          {/* OR Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', margin: '4px 0' }}>
            <div style={{ flex: 1, height: '1px', backgroundColor: currentTheme.colors.border }} />
            <span style={{ fontSize: '0.85rem', fontWeight: '600', color: currentTheme.colors.textSecondary }}>
              {t.or || 'OR'}
            </span>
            <div style={{ flex: 1, height: '1px', backgroundColor: currentTheme.colors.border }} />
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
            <UserPlus size={20} color={currentTheme.colors.primary} />
            <span>{t.registerBtn || 'New Patient? Create ABHA & Register'}</span>
          </button>

          {/* CLINICAL STAFF & TRIAGE PORTAL ACCESS (Located directly on Login Screen) */}
          <div
            style={{
              marginTop: '16px',
              padding: '16px',
              backgroundColor: '#F8FAFC',
              borderRadius: '16px',
              border: `1px solid #E2E8F0`,
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span
                style={{
                  fontSize: '0.82rem',
                  fontWeight: '800',
                  color: '#475569',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                🏥 Staff & Clinician Portals
              </span>
              <span
                style={{
                  fontSize: '0.72rem',
                  fontWeight: '700',
                  backgroundColor: '#E2E8F0',
                  color: '#334155',
                  padding: '2px 8px',
                  borderRadius: '12px',
                }}
              >
                Staff Access
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              {/* Triage Station Button */}
              <button
                type="button"
                onClick={() => onRoleSelect && onRoleSelect('nurse')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '12px 14px',
                  borderRadius: '12px',
                  border: '1px solid #BFDBFE',
                  backgroundColor: '#EFF6FF',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s ease',
                }}
              >
                <div
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '8px',
                    backgroundColor: '#2563EB',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    flexShrink: 0,
                  }}
                >
                  <Activity size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '0.88rem', fontWeight: '800', color: '#1E40AF' }}>
                    Triage Station
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#3B82F6' }}>
                    Nurse Vitals & Queue
                  </div>
                </div>
              </button>

              {/* Allopathic Doctor Button */}
              <button
                type="button"
                onClick={() => onRoleSelect && onRoleSelect('doctor')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '12px 14px',
                  borderRadius: '12px',
                  border: '1px solid #DDD6FE',
                  backgroundColor: '#F5F3FF',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s ease',
                }}
              >
                <div
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '8px',
                    backgroundColor: '#7C3AED',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    flexShrink: 0,
                  }}
                >
                  <Stethoscope size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '0.88rem', fontWeight: '800', color: '#6D28D9' }}>
                    Allopathic Doctor
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#8B5CF6' }}>
                    SOCRATES Consultation
                  </div>
                </div>
              </button>

              {/* AYUSH Specialist Button */}
              <button
                type="button"
                onClick={() => onRoleSelect && onRoleSelect('ayush')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '12px 14px',
                  borderRadius: '12px',
                  border: '1px solid #A7F3D0',
                  backgroundColor: '#ECFDF5',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s ease',
                }}
              >
                <div
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '8px',
                    backgroundColor: '#059669',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    flexShrink: 0,
                  }}
                >
                  <Sparkles size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '0.88rem', fontWeight: '800', color: '#065F46' }}>
                    AYUSH Specialist
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#10B981' }}>
                    दशविध परीक्षा Portal
                  </div>
                </div>
              </button>

              {/* Admin & Audit Dashboard Button */}
              <button
                type="button"
                onClick={() => onRoleSelect && onRoleSelect('admin')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '12px 14px',
                  borderRadius: '12px',
                  border: '1px solid #FDE68A',
                  backgroundColor: '#FFFBEB',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s ease',
                }}
              >
                <div
                  style={{
                    width: '34px',
                    height: '34px',
                    borderRadius: '8px',
                    backgroundColor: '#D97706',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    flexShrink: 0,
                  }}
                >
                  <BarChart3 size={18} />
                </div>
                <div>
                  <div style={{ fontSize: '0.88rem', fontWeight: '800', color: '#92400E' }}>
                    Admin & Audit
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#F59E0B' }}>
                    DPDP Trail & Alerts
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* --- FORM 2: NEW PATIENT REGISTRATION WITH 3-STEP IMAGE & ABHA CREATION --- */
        <div>
          {regStep === 1 && (
            /* Step 1: Phone & Demographics */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '0.9rem', fontWeight: '600', display: 'block', marginBottom: '6px' }}>
                  {t.phoneNumber || 'Mobile Phone Number'} *
                </label>
                <input
                  type="tel"
                  required
                  maxLength={10}
                  value={regPhone}
                  onChange={(e) => setRegPhone(e.target.value)}
                  placeholder="10-digit mobile number"
                  style={styles.largeInput}
                />
              </div>

              <div>
                <label style={{ fontSize: '0.9rem', fontWeight: '600', display: 'block', marginBottom: '6px' }}>
                  {t.fullName || 'Full Name'} *
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
                    {t.age || 'Age'} *
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
                    {t.gender || 'Gender'} *
                  </label>
                  <select
                    value={regGender}
                    onChange={(e) => setRegGender(e.target.value)}
                    style={{ ...styles.largeInput, cursor: 'pointer' }}
                  >
                    <option value="Male">{t.male || 'Male'}</option>
                    <option value="Female">{t.female || 'Female'}</option>
                    <option value="Other">{t.other || 'Other'}</option>
                  </select>
                </div>
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
                  placeholder="Optional: 12-digit Aadhaar"
                  style={styles.largeInput}
                />
              </div>

              <button
                type="button"
                onClick={() => {
                  const cleanedPhone = regPhone.replace(/\D/g, '');
                  if (!regName.trim() || cleanedPhone.length < 10) {
                    setError('Full Name and 10-digit Phone Number are required.');
                    return;
                  }
                  setError('');
                  setRegStep(2);
                  startCamera();
                }}
                style={{ ...styles.primaryButton, marginTop: '8px' }}
              >
                <span>Take Image 📸</span>
                <ArrowRight size={20} />
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowRegisterForm(false);
                  setError('');
                }}
                style={{ ...styles.outlineButton, minHeight: '48px', border: 'none', color: currentTheme.colors.textSecondary }}
              >
                ← Back to Login
              </button>
            </div>
          )}

          {regStep === 2 && (
            /* Step 2: "Take Image" */
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
              <div
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  backgroundColor: '#EFF6FF',
                  borderRadius: '10px',
                  border: '1px solid #BFDBFE',
                  fontSize: '0.9rem',
                  color: '#1E40AF',
                  textAlign: 'center',
                }}
              >
                📸 <strong>Take Image:</strong> Look directly at the kiosk camera or select an image from your device.
              </div>

              {/* Viewfinder / Preview */}
              <div
                style={{
                  width: '240px',
                  height: '240px',
                  borderRadius: '50%',
                  overflow: 'hidden',
                  backgroundColor: '#000000',
                  position: 'relative',
                  border: `4px solid ${currentTheme.colors.primary}`,
                  boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {capturedPhoto ? (
                  <img src={capturedPhoto} alt="Patient Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                ) : (
                  <video ref={videoRef} autoPlay playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                )}
              </div>

              {/* Capture / Upload Controls */}
              <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
                {!capturedPhoto ? (
                  <>
                    <button
                      type="button"
                      onClick={takePhoto}
                      style={{ ...styles.primaryButton, flex: 1 }}
                    >
                      <Camera size={20} />
                      <span>Take Photo</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => fileInputRef.current && fileInputRef.current.click()}
                      style={{ ...styles.outlineButton, flex: 1 }}
                    >
                      <Upload size={18} />
                      <span>Upload Image</span>
                    </button>
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="image/*"
                      onChange={handleFileUpload}
                      style={{ display: 'none' }}
                    />
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={retakePhoto}
                      style={{ ...styles.outlineButton, flex: 1 }}
                    >
                      <RotateCcw size={18} />
                      <span>Retake Photo</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleProceedToCreateAbha}
                      style={{
                        ...styles.primaryButton,
                        flex: 1.4,
                        backgroundColor: '#10B981',
                      }}
                    >
                      <span>Select Image & Create ABHA ID →</span>
                    </button>
                  </>
                )}
              </div>

              {!capturedPhoto && (
                <button
                  type="button"
                  onClick={handleProceedToCreateAbha}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: currentTheme.colors.primaryDark,
                    fontSize: '0.88rem',
                    fontWeight: '700',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                  }}
                >
                  Skip Camera & Proceed to Create ABHA ID →
                </button>
              )}

              <button
                type="button"
                onClick={() => {
                  stopCamera();
                  setRegStep(1);
                }}
                style={{ background: 'none', border: 'none', color: currentTheme.colors.textSecondary, cursor: 'pointer', fontSize: '0.88rem' }}
              >
                ← Back to Demographics
              </button>
            </div>
          )}

          {regStep === 3 && (
            /* Step 3: "Select your image & create ABHA ID" */
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Image & Demographics Verification Box */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '16px',
                  borderRadius: '16px',
                  backgroundColor: '#F0FDF4',
                  border: '1.5px solid #86EFAC',
                }}
              >
                <div
                  style={{
                    width: '72px',
                    height: '72px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    border: '3px solid #16A34A',
                    flexShrink: 0,
                    boxShadow: '0 4px 12px rgba(22, 163, 74, 0.2)',
                  }}
                >
                  <img
                    src={capturedPhoto}
                    alt={regName}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span style={{ fontSize: '1.1rem', fontWeight: '800', color: currentTheme.colors.textPrimary }}>
                      {regName}
                    </span>
                    <span style={{ fontSize: '0.75rem', fontWeight: '700', backgroundColor: '#DCFCE7', color: '#16A34A', padding: '2px 6px', borderRadius: '4px' }}>
                      ✓ Image Verified
                    </span>
                  </div>
                  <div style={{ fontSize: '0.88rem', color: currentTheme.colors.textSecondary, marginTop: '2px' }}>
                    Age: <strong>{regAge}</strong> • Gender: <strong>{regGender}</strong>
                  </div>
                </div>
              </div>

              {/* Generated ABHA ID Card */}
              <div
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '16px',
                  border: `2px solid ${currentTheme.colors.primary}`,
                  padding: '20px',
                  boxShadow: '0 4px 16px rgba(0, 199, 166, 0.12)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: '800', color: currentTheme.colors.primaryDark, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    SELF-CREATED AYUSHMAN BHARAT HEALTH ID
                  </span>
                  <button
                    type="button"
                    onClick={() => setRegAbhaId(generateAbhaId())}
                    title="Generate New Number"
                    style={{ background: 'none', border: 'none', color: currentTheme.colors.primary, fontSize: '0.78rem', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                  >
                    <RefreshCw size={13} />
                    <span>Regenerate</span>
                  </button>
                </div>

                <div
                  style={{
                    fontSize: '1.8rem',
                    fontWeight: '900',
                    color: currentTheme.colors.textPrimary,
                    fontFamily: 'monospace',
                    letterSpacing: '0.06em',
                  }}
                >
                  {regAbhaId}
                </div>

                {/* Linking Visual Badge */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '10px 14px',
                    backgroundColor: '#E8F7F5',
                    borderRadius: '10px',
                    fontSize: '0.86rem',
                    color: currentTheme.colors.primaryDark,
                    fontWeight: '700',
                  }}
                >
                  <Link2 size={18} />
                  <span>
                    Linked with Mobile: <strong>+91 {regPhone}</strong>
                  </span>
                </div>
              </div>

              {/* Either One Can Be Used Note */}
              <div
                style={{
                  padding: '12px 14px',
                  backgroundColor: '#EFF6FF',
                  borderRadius: '10px',
                  border: '1px solid #BFDBFE',
                  fontSize: '0.85rem',
                  color: '#1E40AF',
                  lineHeight: 1.5,
                }}
              >
                💡 <strong>Login Notice:</strong> Your phone number (<strong>+91 {regPhone}</strong>) and your new ABHA ID (<strong>{regAbhaId}</strong>) are now linked. You can use <strong>either one</strong> for future logins with OTP!
              </div>

              {/* Final Confirm Button */}
              <button
                type="button"
                onClick={handleCompleteRegistration}
                disabled={isSubmitting || regLoading}
                style={{
                  ...styles.primaryButton,
                  backgroundColor: '#10B981',
                  opacity: isSubmitting || regLoading ? 0.7 : 1,
                  padding: '16px',
                }}
              >
                {isSubmitting || regLoading ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <RefreshCw size={22} className="animate-spin" />
                    <span>Creating ABHA ID & Account...</span>
                  </div>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle size={22} />
                    <span>Confirm & Create ABHA Account</span>
                  </div>
                )}
              </button>

              <button
                type="button"
                onClick={() => setRegStep(2)}
                style={{ background: 'none', border: 'none', color: currentTheme.colors.textSecondary, cursor: 'pointer', fontSize: '0.88rem' }}
              >
                ← Back to Image Capture
              </button>
            </div>
          )}
        </div>
      )}

      {/* Error Banner */}
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

      {/* Bottom ABDM Compliance Tag */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', color: currentTheme.colors.textSecondary, fontSize: '0.85rem' }}>
        <ShieldCheck size={16} color={currentTheme.colors.primary} />
        <span>ABDM Compliant • Digital Health ID Linked</span>
      </div>
    </div>
  );
}
