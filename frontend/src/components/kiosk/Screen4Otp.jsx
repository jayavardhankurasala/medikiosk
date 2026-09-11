import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { theme, styles } from '../../styles/theme';
import { useLanguage } from '../../context/LanguageContext';

export default function Screen4Otp({
  phoneNumber = '98765 43210',
  onVerify,
  mockOtp = '123456',
}) {
  const { t } = useLanguage();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(28);
  const [error, setError] = useState('');
  const inputRefs = useRef([]);

  // Auto focus first box
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  // Timer countdown
  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => {
      setTimer((t) => t - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (index, value) => {
    // Handle paste of full OTP
    if (value.length > 1) {
      const digits = value.replace(/\D/g, '').slice(0, 6).split('');
      const newOtp = [...otp];
      digits.forEach((d, i) => {
        newOtp[i] = d;
      });
      setOtp(newOtp);
      const nextFocus = Math.min(digits.length, 5);
      inputRefs.current[nextFocus]?.focus();
      return;
    }

    const digit = value.slice(-1);
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);

    // Auto-advance
    if (digit && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const [loading, setLoading] = useState(false);

  const handleVerify = async () => {
    const entered = otp.join('');
    if (entered.length < 6) {
      setError(t.otpInvalidError || 'Please enter all 6 digits of the OTP.');
      return;
    }
    setError('');
    setLoading(true);

    const cleanPhone = (phoneNumber || '9876543210').replace(/\D/g, '');
    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          phone: cleanPhone.length === 10 ? cleanPhone : '9876543210',
          otpCode: entered,
        }),
      });
      const data = await res.json();
      if (data.success && data.token) {
        onVerify(entered, data.token, data.patient);
      } else {
        setError(data.message || 'Invalid or expired OTP code.');
      }
    } catch (err) {
      console.warn('Network error verifying OTP, using fallback token:', err);
      onVerify(entered, 'demo-jwt-token', null);
    } finally {
      setLoading(false);
    }
  };

  const formatTimer = () => {
    const sec = timer < 10 ? `0${timer}` : `${timer}`;
    return `00:${sec}`;
  };

  // Demo auto-fill helper
  const handleAutoFillDemo = () => {
    const digits = (mockOtp || '123456').split('');
    setOtp(digits);
    inputRefs.current[5]?.focus();
  };

  return (
    <div style={styles.kioskCard}>
      <div style={{ textAlign: 'center' }}>
        <h2 style={styles.title}>{t.enterOtp || t.headings.otp}</h2>
        <p style={{ ...styles.subtitle, marginTop: '6px' }}>
          {t.otpSentNotice || 'We have sent a 6-digit OTP to'} <b>+91 {phoneNumber}</b>
        </p>
      </div>

      {/* 6 Individual Square Input Boxes */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '12px',
          margin: '12px 0',
        }}
      >
        {otp.map((digit, index) => (
          <input
            key={index}
            ref={(el) => (inputRefs.current[index] = el)}
            type="text"
            inputMode="numeric"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(index, e.target.value)}
            onKeyDown={(e) => handleKeyDown(index, e)}
            style={{
              width: '56px',
              height: '64px',
              borderRadius: '14px',
              border: digit
                ? `2px solid ${theme.colors.primary}`
                : `2px solid ${theme.colors.border}`,
              backgroundColor: digit ? '#E8F7F5' : '#FFFFFF',
              textAlign: 'center',
              fontSize: '1.6rem',
              fontWeight: '700',
              color: theme.colors.textPrimary,
              outline: 'none',
              boxShadow: digit ? '0 2px 10px rgba(0, 199, 166, 0.2)' : 'none',
              fontFamily: theme.typography.fontFamily,
              transition: 'all 0.15s ease',
            }}
          />
        ))}
      </div>

      {/* Demo Code Auto-fill Hint */}
      <div
        style={{
          textAlign: 'center',
          fontSize: '0.85rem',
          color: theme.colors.textSecondary,
        }}
      >
        <span>Test Code: <b>{mockOtp}</b> </span>
        <button
          onClick={handleAutoFillDemo}
          style={{
            background: 'none',
            border: 'none',
            color: theme.colors.primaryDark,
            fontWeight: '600',
            textDecoration: 'underline',
            cursor: 'pointer',
            marginLeft: '6px',
          }}
        >
          {t.fillDemoOtp || 'Auto-fill'}
        </button>
      </div>

      {error && (
        <span style={{ color: '#DC2626', fontSize: '0.85rem', textAlign: 'center', fontWeight: '500' }}>
          {error}
        </span>
      )}

      {/* Resend Timer */}
      <div style={{ textAlign: 'center', fontSize: '0.95rem', color: theme.colors.textSecondary }}>
        {timer > 0 ? (
          <span>{t.resendOtpIn || 'Resend OTP in'} <b>{formatTimer()}</b></span>
        ) : (
          <button
            onClick={() => setTimer(30)}
            style={{
              background: 'none',
              border: 'none',
              color: theme.colors.primary,
              fontWeight: '700',
              cursor: 'pointer',
              fontSize: '0.95rem',
            }}
          >
            {t.resendOtp || 'Resend OTP Now'}
          </button>
        )}
      </div>

      {/* Primary Action Button */}
      <button
        onClick={handleVerify}
        disabled={loading}
        style={{
          ...styles.primaryButton,
          opacity: loading ? 0.7 : 1,
          cursor: loading ? 'not-allowed' : 'pointer',
        }}
      >
        <span>{loading ? 'Verifying OTP...' : (t.verifyAndContinue || t.verifyOtp)}</span>
        <ArrowRight size={22} />
      </button>
    </div>
  );
}
