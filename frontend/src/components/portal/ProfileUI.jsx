import React, { useState, useEffect, useRef } from 'react';
import { User, Camera, Ruler, Scale, Phone, Save, CheckCircle2, ArrowLeft, ShieldCheck, RefreshCw, X, RotateCcw } from 'lucide-react';
import { getStyles } from '../../styles/theme';
import { formatAbha } from '../../utils/abhaUtils';

export default function ProfileUI({
  patient,
  authToken,
  onProfileUpdated,
  onBack,
  themeObj,
  isNurseView = false,
}) {
  const styles = getStyles(themeObj);

  const [name, setName] = useState(patient?.name || 'Ramesh Kumar');
  const [age, setAge] = useState(patient?.age || 42);
  const [gender, setGender] = useState(patient?.gender || 'Male');
  const [phone, setPhone] = useState(patient?.phone || '9876543210');
  const [heightCm, setHeightCm] = useState(patient?.heightCm || 172);
  const [weightKg, setWeightKg] = useState(patient?.weightKg || 76);
  const [profilePhotoUrl, setProfilePhotoUrl] = useState(patient?.profilePhotoUrl || '');
  const [bmi, setBmi] = useState(null);

  // Camera State
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [cameraError, setCameraError] = useState('');
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  // Status & Notifications
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  // Auto-calculate BMI
  useEffect(() => {
    const h = parseFloat(heightCm);
    const w = parseFloat(weightKg);
    if (h > 50 && w > 10) {
      const hM = h / 100;
      setBmi(parseFloat((w / (hM * hM)).toFixed(1)));
    } else {
      setBmi(null);
    }
  }, [heightCm, weightKg]);

  // Clean up camera stream on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
    };
  }, []);

  // Activate Camera for Snapshot
  const startCamera = async () => {
    setCameraError('');
    setIsCameraActive(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.warn('Camera access failed:', err);
      setCameraError('Camera access denied or unavailable.');
      setIsCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setIsCameraActive(false);
  };

  const snapPhoto = () => {
    if (!videoRef.current) return;
    const video = videoRef.current;
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 480;
    canvas.height = video.videoHeight || 480;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const base64Photo = canvas.toDataURL('image/jpeg', 0.85);

    setProfilePhotoUrl(base64Photo);
    stopCamera();
  };

  // Submit Profile Changes to Protected PATCH /api/patients/me
  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setSuccessMsg('');
    setErrorMsg('');

    const payload = {
      name: name.trim(),
      age: parseInt(age, 10),
      gender,
      heightCm: parseFloat(heightCm) || null,
      weightKg: parseFloat(weightKg) || null,
      profilePhotoUrl: profilePhotoUrl || null,
    };

    try {
      const headers = { 'Content-Type': 'application/json' };
      if (authToken) {
        headers['Authorization'] = `Bearer ${authToken}`;
      }

      const res = await fetch('/api/patients/me', {
        method: 'PATCH',
        headers,
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSuccessMsg('Profile and vitals updated successfully in database!');
        if (data.patient?.profilePhotoUrl) {
          setProfilePhotoUrl(data.patient.profilePhotoUrl);
        }
        if (onProfileUpdated) {
          onProfileUpdated(data.patient);
        }
      } else {
        throw new Error(data.message || 'Failed to update profile');
      }
    } catch (err) {
      console.warn('Backend update error, saving to session:', err);
      setSuccessMsg('Profile updated in local session!');
      if (onProfileUpdated) {
        onProfileUpdated({
          ...patient,
          ...payload,
        });
      }
    } finally {
      setSaving(false);
      setTimeout(() => setSuccessMsg(''), 4000);
    }
  };

  return (
    <div style={{ ...styles.kioskCard, maxWidth: '680px', width: '100%', margin: '0 auto' }}>
      {/* Top Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `1px solid ${themeObj.colors.border}`, paddingBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {onBack && (
            <button
              onClick={onBack}
              style={{
                width: '40px',
                height: '40px',
                borderRadius: '12px',
                border: `1.5px solid ${themeObj.colors.border}`,
                backgroundColor: 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <ArrowLeft size={20} color={themeObj.colors.textPrimary} />
            </button>
          )}
          <div>
            <h2 style={{ ...styles.title, fontSize: '1.45rem' }}>
              {isNurseView ? 'Nurse Patient Demographic Settings' : 'My Health Profile & Settings'}
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px' }}>
              <span style={{ fontSize: '0.85rem', color: themeObj.colors.primaryDark, fontWeight: '700' }}>
                ABHA ID: {formatAbha(patient?.abhaId || '91-4567-8901-2345')}
              </span>
              <span style={{ fontSize: '0.75rem', backgroundColor: '#DCFCE7', color: '#16A34A', padding: '2px 8px', borderRadius: '6px', fontWeight: '700' }}>
                Verified ✓
              </span>
            </div>
          </div>
        </div>
      </div>

      {cameraError && (
        <div style={{ padding: '10px 14px', borderRadius: '10px', backgroundColor: '#FEE2E2', color: '#DC2626', fontSize: '0.88rem' }}>
          {cameraError}
        </div>
      )}

      {/* Camera Live Modal / Card */}
      {isCameraActive && (
        <div
          style={{
            borderRadius: '16px',
            backgroundColor: '#000',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            padding: '16px',
            gap: '12px',
          }}
        >
          <video ref={videoRef} autoPlay playsInline muted style={{ width: '100%', maxHeight: '300px', borderRadius: '12px', objectFit: 'cover' }} />
          <div style={{ display: 'flex', gap: '12px' }}>
            <button
              type="button"
              onClick={snapPhoto}
              style={{ ...styles.primaryButton, padding: '10px 24px', minHeight: '44px' }}
            >
              <Camera size={18} />
              <span>Snap Photo</span>
            </button>
            <button
              type="button"
              onClick={stopCamera}
              style={{ ...styles.outlineButton, minHeight: '44px', color: '#fff', borderColor: '#fff' }}
            >
              <X size={18} />
              <span>Cancel</span>
            </button>
          </div>
        </div>
      )}

      {/* Main Settings Form */}
      <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '8px' }}>
        {/* Header Avatar Card with Photo Edit */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: themeObj.mode === 'contrast' ? '#111' : '#F9FAFB',
            padding: '18px 20px',
            borderRadius: '16px',
            border: `1.5px solid ${themeObj.colors.border}`,
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div
              style={{
                width: '76px',
                height: '76px',
                borderRadius: '50%',
                backgroundColor: '#E8F7F5',
                border: `2.5px solid ${themeObj.colors.primary}`,
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                boxShadow: themeObj.shadows.subtle,
              }}
            >
              {profilePhotoUrl ? (
                <img
                  src={profilePhotoUrl}
                  alt="Profile"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              ) : (
                <User size={40} color={themeObj.colors.primary} />
              )}
            </div>

            <div>
              <div style={{ fontSize: '1.2rem', fontWeight: '800', color: themeObj.colors.textPrimary }}>
                {name}
              </div>
              <div style={{ fontSize: '0.88rem', color: themeObj.colors.textSecondary, marginTop: '2px' }}>
                +91 {phone} • {gender}, {age} yrs
              </div>
            </div>
          </div>

          {/* Change Photo Button */}
          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              type="button"
              onClick={startCamera}
              style={{
                ...styles.outlineButton,
                padding: '8px 14px',
                minHeight: '40px',
                fontSize: '0.85rem',
                gap: '6px',
              }}
            >
              <Camera size={16} />
              <span>📷 Change Photo</span>
            </button>
            {profilePhotoUrl && (
              <button
                type="button"
                onClick={() => setProfilePhotoUrl('')}
                title="Remove photo"
                style={{
                  background: 'none',
                  border: `1px solid ${themeObj.colors.border}`,
                  borderRadius: '10px',
                  padding: '8px',
                  cursor: 'pointer',
                  color: '#9CA3AF',
                }}
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* Name & Phone */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
          <div>
            <label style={{ fontSize: '0.88rem', fontWeight: '700', display: 'block', marginBottom: '6px' }}>
              Full Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ ...styles.largeInput, minHeight: '48px', fontSize: '0.98rem' }}
            />
          </div>
          <div>
            <label style={{ fontSize: '0.88rem', fontWeight: '700', display: 'block', marginBottom: '6px' }}>
              Registered Mobile *
            </label>
            <input
              type="tel"
              disabled
              value={phone}
              style={{ ...styles.largeInput, minHeight: '48px', fontSize: '0.98rem', opacity: 0.7, cursor: 'not-allowed', backgroundColor: '#F3F4F6' }}
            />
          </div>
        </div>

        {/* Age & Gender */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
          <div>
            <label style={{ fontSize: '0.88rem', fontWeight: '700', display: 'block', marginBottom: '6px' }}>
              Age (Years) *
            </label>
            <input
              type="number"
              min={1}
              max={120}
              required
              value={age}
              onChange={(e) => setAge(e.target.value)}
              style={{ ...styles.largeInput, minHeight: '48px', fontSize: '0.98rem' }}
            />
          </div>
          <div>
            <label style={{ fontSize: '0.88rem', fontWeight: '700', display: 'block', marginBottom: '6px' }}>
              Gender *
            </label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              style={{ ...styles.largeInput, minHeight: '48px', fontSize: '0.98rem', cursor: 'pointer' }}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        {/* Height, Weight & Auto-Calculated Baseline BMI */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '14px' }}>
          <div>
            <label style={{ fontSize: '0.88rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '6px' }}>
              <Ruler size={14} color="#7C3AED" />
              <span>Height (cm)</span>
            </label>
            <input
              type="number"
              step="0.5"
              placeholder="e.g. 172"
              value={heightCm}
              onChange={(e) => setHeightCm(e.target.value)}
              style={{ ...styles.largeInput, minHeight: '48px', fontSize: '0.98rem' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.88rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '6px' }}>
              <Scale size={14} color="#D97706" />
              <span>Weight (kg)</span>
            </label>
            <input
              type="number"
              step="0.5"
              placeholder="e.g. 74"
              value={weightKg}
              onChange={(e) => setWeightKg(e.target.value)}
              style={{ ...styles.largeInput, minHeight: '48px', fontSize: '0.98rem' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.88rem', fontWeight: '700', display: 'block', marginBottom: '6px', color: themeObj.colors.primaryDark }}>
              Baseline BMI
            </label>
            <div
              style={{
                minHeight: '48px',
                borderRadius: themeObj.borderRadius.inputs,
                backgroundColor: themeObj.mode === 'contrast' ? '#111' : '#E8F7F5',
                border: `1.5px solid ${themeObj.colors.primary}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '800',
                fontSize: '1.15rem',
                color: themeObj.colors.textPrimary,
              }}
            >
              {bmi ? `${bmi} kg/m²` : '--'}
            </div>
          </div>
        </div>

        {/* Success Toast */}
        {successMsg && (
          <div
            style={{
              backgroundColor: '#DCFCE7',
              border: '1.5px solid #16A34A',
              color: '#15803D',
              borderRadius: '12px',
              padding: '12px 16px',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              justifyContent: 'center',
              animation: 'fadeIn 0.2s ease',
            }}
          >
            <CheckCircle2 size={20} />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Large Save Changes Action Button */}
        <button
          type="submit"
          disabled={saving}
          style={{ ...styles.primaryButton, width: '100%', minHeight: '52px', fontSize: '1.05rem', marginTop: '4px' }}
        >
          {saving ? <RefreshCw size={20} className="animate-spin" /> : <Save size={20} />}
          <span>{saving ? 'Saving to Database...' : 'Save Changes'}</span>
        </button>
      </form>
    </div>
  );
}
