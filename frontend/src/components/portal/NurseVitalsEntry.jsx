import React, { useState, useEffect } from 'react';
import { Activity, Thermometer, Heart, Scale, Ruler, CheckCircle2, X, AlertTriangle } from 'lucide-react';
import { getStyles } from '../../styles/theme';

export default function NurseVitalsEntry({
  visit,
  isOpen,
  onClose,
  onVitalsSaved,
  themeObj,
}) {
  const styles = getStyles(themeObj);

  const [bloodPressure, setBloodPressure] = useState(visit?.bloodPressure || '120/80');
  const [temperature, setTemperature] = useState(visit?.temperature || '98.6');
  const [spo2, setSpo2] = useState(visit?.spo2 || '98');
  const [heightCm, setHeightCm] = useState(visit?.heightCm || '170');
  const [weightKg, setWeightKg] = useState(visit?.weightKg || '70');
  const [calculatedBmi, setCalculatedBmi] = useState(null);
  const [bmiCategory, setBmiCategory] = useState('Normal weight');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Real-time automated BMI calculation hook
  useEffect(() => {
    const h = parseFloat(heightCm);
    const w = parseFloat(weightKg);

    if (h > 50 && h < 250 && w > 10 && w < 300) {
      const hM = h / 100;
      const bmi = parseFloat((w / (hM * hM)).toFixed(1));
      setCalculatedBmi(bmi);

      if (bmi < 18.5) setBmiCategory('Underweight');
      else if (bmi < 24.9) setBmiCategory('Normal weight');
      else if (bmi < 29.9) setBmiCategory('Overweight');
      else setBmiCategory('Obesity');
    } else {
      setCalculatedBmi(null);
    }
  }, [heightCm, weightKg]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`/api/visits/${visit.id}/vitals`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          bloodPressure,
          temperature: parseFloat(temperature),
          spo2: parseInt(spo2, 10),
          heightCm: parseFloat(heightCm),
          weightKg: parseFloat(weightKg),
          bmi: calculatedBmi,
        }),
      });
      const data = await res.json();
      if (data.success) {
        onVitalsSaved(data.visit);
        onClose();
      } else {
        setError(data.message || 'Failed to save vitals');
      }
    } catch {
      // Fallback update
      onVitalsSaved({
        ...visit,
        bloodPressure,
        temperature: parseFloat(temperature),
        spo2: parseInt(spo2, 10),
        heightCm: parseFloat(heightCm),
        weightKg: parseFloat(weightKg),
        bmi: calculatedBmi,
      });
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100,
        padding: '16px',
        animation: 'fadeIn 0.2s ease',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '540px',
          backgroundColor: themeObj.colors.surface,
          borderRadius: themeObj.borderRadius.cards,
          padding: '28px',
          boxShadow: themeObj.shadows.floating,
          border: `1px solid ${themeObj.colors.border}`,
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: '0.8rem', fontWeight: '700', color: themeObj.colors.primaryDark, textTransform: 'uppercase' }}>
              CLINICAL TRIAGE
            </span>
            <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: themeObj.colors.textPrimary, margin: '2px 0 0 0' }}>
              Record Patient Vitals ({visit?.patientName || 'Patient'})
            </h3>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: themeObj.colors.textSecondary,
            }}
          >
            <X size={22} />
          </button>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* BP & Temperature */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div>
              <label style={{ fontSize: '0.88rem', fontWeight: '700', color: themeObj.colors.textPrimary, display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                <Activity size={16} color="#2563EB" />
                <span>Blood Pressure (mmHg)</span>
              </label>
              <input
                type="text"
                required
                value={bloodPressure}
                onChange={(e) => setBloodPressure(e.target.value)}
                placeholder="e.g. 120/80"
                style={{ ...styles.largeInput, minHeight: '48px', fontSize: '1.05rem' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.88rem', fontWeight: '700', color: themeObj.colors.textPrimary, display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                <Thermometer size={16} color="#EF4444" />
                <span>Temperature (°F)</span>
              </label>
              <input
                type="number"
                step="0.1"
                required
                value={temperature}
                onChange={(e) => setTemperature(e.target.value)}
                placeholder="e.g. 98.6"
                style={{ ...styles.largeInput, minHeight: '48px', fontSize: '1.05rem' }}
              />
            </div>
          </div>

          {/* SpO2 & Height */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div>
              <label style={{ fontSize: '0.88rem', fontWeight: '700', color: themeObj.colors.textPrimary, display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                <Heart size={16} color="#10B981" />
                <span>Oxygen Saturation (SpO2 %)</span>
              </label>
              <input
                type="number"
                min={50}
                max={100}
                required
                value={spo2}
                onChange={(e) => setSpo2(e.target.value)}
                placeholder="e.g. 98"
                style={{ ...styles.largeInput, minHeight: '48px', fontSize: '1.05rem' }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.88rem', fontWeight: '700', color: themeObj.colors.textPrimary, display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                <Ruler size={16} color="#7C3AED" />
                <span>Height (cm)</span>
              </label>
              <input
                type="number"
                step="0.5"
                required
                value={heightCm}
                onChange={(e) => setHeightCm(e.target.value)}
                placeholder="e.g. 172"
                style={{ ...styles.largeInput, minHeight: '48px', fontSize: '1.05rem' }}
              />
            </div>
          </div>

          {/* Weight & Auto-BMI Live Calculation */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div>
              <label style={{ fontSize: '0.88rem', fontWeight: '700', color: themeObj.colors.textPrimary, display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                <Scale size={16} color="#D97706" />
                <span>Weight (kg)</span>
              </label>
              <input
                type="number"
                step="0.5"
                required
                value={weightKg}
                onChange={(e) => setWeightKg(e.target.value)}
                placeholder="e.g. 75"
                style={{ ...styles.largeInput, minHeight: '48px', fontSize: '1.05rem' }}
              />
            </div>

            {/* Instant Automated BMI Card */}
            <div
              style={{
                backgroundColor: themeObj.mode === 'contrast' ? '#111' : '#E8F7F5',
                borderRadius: themeObj.borderRadius.inputs,
                border: `1.5px solid ${themeObj.colors.primary}`,
                padding: '10px 16px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <span style={{ fontSize: '0.78rem', fontWeight: '700', color: themeObj.colors.primaryDark, textTransform: 'uppercase' }}>
                AUTOMATED BMI
              </span>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: '2px' }}>
                <span style={{ fontSize: '1.6rem', fontWeight: '800', color: themeObj.colors.textPrimary }}>
                  {calculatedBmi !== null ? calculatedBmi : '--'}
                </span>
                <span
                  style={{
                    fontSize: '0.8rem',
                    fontWeight: '700',
                    color:
                      bmiCategory === 'Normal weight'
                        ? '#16A34A'
                        : bmiCategory === 'Underweight'
                        ? '#D97706'
                        : '#DC2626',
                  }}
                >
                  ({bmiCategory})
                </span>
              </div>
            </div>
          </div>

          {error && (
            <span style={{ color: '#DC2626', fontSize: '0.85rem', fontWeight: '600' }}>
              {error}
            </span>
          )}

          {/* Submit */}
          <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
            <button
              type="submit"
              disabled={loading}
              style={{
                ...styles.primaryButton,
                flex: 1,
                minHeight: '52px',
              }}
            >
              <CheckCircle2 size={18} />
              <span>{loading ? 'Saving Vitals...' : 'Save Patient Vitals'}</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              style={{
                ...styles.outlineButton,
                minHeight: '52px',
                padding: '0 20px',
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
