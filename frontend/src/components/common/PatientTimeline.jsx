import React, { useState, useEffect } from 'react';
import { Clock, Calendar, Activity, Stethoscope, FileText, ArrowLeft, RefreshCw, AlertCircle, CheckCircle2, Pill } from 'lucide-react';
import { theme as defaultTheme, getStyles } from '../../styles/theme';

export default function PatientTimeline({
  patientId = 'p-001',
  patientName = 'Ramesh Kumar',
  authToken,
  onBack,
  themeObj,
}) {
  const currentTheme = themeObj || defaultTheme;
  const styles = getStyles(currentTheme);

  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTimeline = async () => {
    setLoading(true);
    setError(null);
    try {
      const headers = {};
      if (authToken) {
        headers['Authorization'] = `Bearer ${authToken}`;
      }
      const res = await fetch(`/api/patients/me/history?patientId=${patientId}`, { headers });
      const data = await res.json();
      if (data.success && Array.isArray(data.timeline)) {
        setRecords(data.timeline);
      } else {
        throw new Error(data.message || 'Failed to fetch timeline');
      }
    } catch (err) {
      console.warn('API timeline fetch fallback:', err);
      // Fallback past visits for demo/offline resilience
      setRecords([
        {
          id: 'v-past-1',
          createdAt: new Date(Date.now() - 86400000 * 14).toISOString(),
          status: 'COMPLETED',
          chiefComplaint: 'Continuous dry cough with low-grade fever for 4 days.',
          doctorDiagnosis: 'Acute Bronchitis & Pharyngitis',
          bloodPressure: '124/82',
          temperature: 99.4,
          spo2: 98,
          bmi: 24.2,
          prescribedTests: ['Chest X-Ray (PA View)', 'Complete Blood Count (CBC)'],
          prescribedMedications: [
            { name: 'Azithromycin', dosage: '500 mg', frequency: 'OD (Once daily) x 3 days' },
            { name: 'Paracetamol', dosage: '650 mg', frequency: 'TID SOS for fever' },
          ],
          documents: [
            { documentType: 'PRESCRIPTION', fileUrl: '/uploads/documents/prescription_sample.jpg' },
          ],
          messages: [{ role: 'user', content: 'Continuous dry cough with low-grade fever for 4 days.' }],
        },
        {
          id: 'v-past-2',
          createdAt: new Date(Date.now() - 86400000 * 60).toISOString(),
          status: 'COMPLETED',
          chiefComplaint: 'Occasional morning occipital headache and dizziness.',
          doctorDiagnosis: 'Essential Hypertension - Grade 1',
          bloodPressure: '138/88',
          temperature: 98.6,
          spo2: 99,
          bmi: 24.5,
          prescribedTests: ['Lipid Profile', 'Serum Creatinine', 'ECG (12-Lead)'],
          prescribedMedications: [
            { name: 'Telmisartan', dosage: '40 mg', frequency: 'OD (Morning post breakfast)' },
          ],
          documents: [
            { documentType: 'LAB_REPORT', fileUrl: '/uploads/documents/lab_sample.jpg' },
          ],
          messages: [{ role: 'user', content: 'Occasional morning occipital headache and dizziness.' }],
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTimeline();
  }, [patientId]);

  return (
    <div style={{ ...styles.kioskCard, maxWidth: '820px', width: '100%' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `1px solid ${currentTheme.colors.border}`, paddingBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {onBack && (
            <button
              onClick={onBack}
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                border: `1.5px solid ${currentTheme.colors.border}`,
                backgroundColor: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                boxShadow: currentTheme.shadows.subtle,
              }}
            >
              <ArrowLeft size={20} color={currentTheme.colors.textPrimary} />
            </button>
          )}
          <div>
            <h2 style={{ ...styles.title, fontSize: '1.4rem' }}>Past Medical Records & Timeline</h2>
            <p style={{ ...styles.subtitle, marginTop: '2px', fontSize: '0.88rem' }}>
              Chronological electronic health record for <b>{patientName}</b>
            </p>
          </div>
        </div>

        <button
          onClick={fetchTimeline}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 14px',
            borderRadius: '10px',
            backgroundColor: '#F3F4F6',
            border: `1px solid ${currentTheme.colors.border}`,
            fontSize: '0.84rem',
            fontWeight: '600',
            cursor: 'pointer',
            color: currentTheme.colors.textPrimary,
          }}
        >
          <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
          <span>Refresh</span>
        </button>
      </div>

      {/* Content */}
      <div style={{ marginTop: '20px', maxHeight: '550px', overflowY: 'auto', paddingRight: '6px' }}>
        {loading ? (
          <div style={{ padding: '40px', textAlign: 'center', color: currentTheme.colors.textSecondary }}>
            Loading medical history records...
          </div>
        ) : records.length === 0 ? (
          <div style={{ padding: '40px', textAlign: 'center', color: currentTheme.colors.textSecondary }}>
            <Calendar size={36} style={{ marginBottom: '10px', opacity: 0.5 }} />
            <p>No past medical records found for this patient.</p>
          </div>
        ) : (
          <div
            style={{
              position: 'relative',
              paddingLeft: '28px',
              borderLeft: `3px solid ${currentTheme.colors.primary}`,
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
              marginLeft: '12px',
            }}
          >
            {records.map((visit, index) => {
              const visitDate = new Date(visit.createdAt).toLocaleDateString('en-IN', {
                weekday: 'short',
                day: 'numeric',
                month: 'short',
                year: 'numeric',
              });

              return (
                <div
                  key={visit.id || index}
                  style={{
                    position: 'relative',
                    backgroundColor: '#FFFFFF',
                    border: `1.5px solid ${currentTheme.colors.border}`,
                    borderRadius: currentTheme.borderRadius.cards,
                    padding: '20px 22px',
                    boxShadow: currentTheme.shadows.card,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px',
                  }}
                >
                  {/* Timeline Bullet Dot */}
                  <div
                    style={{
                      position: 'absolute',
                      left: '-36px',
                      top: '22px',
                      width: '16px',
                      height: '16px',
                      borderRadius: '50%',
                      backgroundColor: currentTheme.colors.primary,
                      border: '3px solid #FFFFFF',
                      boxShadow: '0 0 0 3px rgba(0, 199, 166, 0.4)',
                    }}
                  />

                  {/* Visit Encounter Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span
                        style={{
                          fontSize: '0.88rem',
                          fontWeight: '700',
                          color: currentTheme.colors.primaryDark,
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                        }}
                      >
                        <Calendar size={16} /> {visitDate}
                      </span>
                      <span style={{ fontSize: '0.8rem', color: currentTheme.colors.textSecondary }}>
                        (Encounter #{visit.id ? visit.id.slice(-6) : index + 1})
                      </span>
                    </div>

                    <span
                      style={{
                        padding: '4px 10px',
                        borderRadius: currentTheme.borderRadius.badge,
                        fontSize: '0.78rem',
                        fontWeight: '700',
                        backgroundColor: visit.status === 'COMPLETED' ? '#DCFCE7' : '#EFF6FF',
                        color: visit.status === 'COMPLETED' ? '#16A34A' : '#2563EB',
                      }}
                    >
                      {visit.status || 'COMPLETED'}
                    </span>
                  </div>

                  {/* Diagnosis */}
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#7C3AED', fontWeight: '700', fontSize: '0.9rem' }}>
                      <Stethoscope size={16} /> Doctor's Diagnosis & Condition:
                    </div>
                    <div style={{ fontSize: '1.1rem', fontWeight: '800', color: currentTheme.colors.textPrimary, marginTop: '2px' }}>
                      {visit.doctorDiagnosis || 'General Clinical Consultation'}
                    </div>
                  </div>

                  {/* Vitals Ribbon */}
                  {(visit.bloodPressure || visit.temperature || visit.spo2 || visit.bmi) && (
                    <div
                      style={{
                        backgroundColor: '#F8FAFC',
                        borderRadius: '10px',
                        padding: '10px 14px',
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: '14px',
                        fontSize: '0.85rem',
                        border: `1px solid ${currentTheme.colors.border}`,
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '700', color: currentTheme.colors.textPrimary }}>
                        <Activity size={15} color="#EF4444" />
                        <span>Vitals Recorded:</span>
                      </div>
                      {visit.bloodPressure && <span><b>BP:</b> {visit.bloodPressure} mmHg</span>}
                      {visit.temperature && <span><b>Temp:</b> {visit.temperature}°F</span>}
                      {visit.spo2 && <span><b>SpO2:</b> {visit.spo2}%</span>}
                      {visit.bmi && <span><b>BMI:</b> {visit.bmi} kg/m²</span>}
                    </div>
                  )}

                  {/* Prescriptions */}
                  {visit.prescribedMedications && visit.prescribedMedications.length > 0 && (
                    <div style={{ borderTop: `1px dashed ${currentTheme.colors.border}`, paddingTop: '10px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', fontWeight: '700', color: currentTheme.colors.textPrimary, marginBottom: '6px' }}>
                        <Pill size={15} color="#059669" />
                        <span>Prescribed Medications (Rx):</span>
                      </div>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        {visit.prescribedMedications.map((med, mIdx) => (
                          <div
                            key={mIdx}
                            style={{
                              fontSize: '0.88rem',
                              color: currentTheme.colors.textPrimary,
                              display: 'flex',
                              gap: '8px',
                              padding: '4px 8px',
                              backgroundColor: '#ECFDF5',
                              borderRadius: '6px',
                            }}
                          >
                            <span style={{ fontWeight: '700' }}>• {med.name}</span>
                            <span style={{ color: currentTheme.colors.textSecondary }}>({med.dosage})</span>
                            <span style={{ color: '#059669', fontStyle: 'italic' }}>— {med.frequency}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Prescribed Tests */}
                  {visit.prescribedTests && visit.prescribedTests.length > 0 && (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', alignItems: 'center' }}>
                      <span style={{ fontSize: '0.82rem', fontWeight: '700', color: '#7C3AED' }}>Tests Ordered:</span>
                      {visit.prescribedTests.map((test, tIdx) => (
                        <span
                          key={tIdx}
                          style={{
                            padding: '3px 8px',
                            borderRadius: currentTheme.borderRadius.badge,
                            backgroundColor: '#F5F3FF',
                            color: '#7C3AED',
                            border: '1px solid #DDD6FE',
                            fontSize: '0.78rem',
                            fontWeight: '600',
                          }}
                        >
                          {test}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Chief Complaint / Symptoms */}
                  <div
                    style={{
                      backgroundColor: '#F9FAFB',
                      borderRadius: '8px',
                      padding: '10px 14px',
                      fontSize: '0.88rem',
                      color: currentTheme.colors.textPrimary,
                      borderLeft: `3.5px solid ${currentTheme.colors.primary}`,
                    }}
                  >
                    <b>Chief Complaint:</b> "{visit.chiefComplaint || visit.messages?.[0]?.content || 'Routine Consultation'}"
                  </div>

                  {/* Past Uploaded Documents Thumbnails */}
                  {visit.documents && visit.documents.length > 0 && (
                    <div style={{ borderTop: `1px solid ${currentTheme.colors.border}`, paddingTop: '10px' }}>
                      <div style={{ fontSize: '0.84rem', fontWeight: '700', color: currentTheme.colors.textSecondary, marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <FileText size={15} color={currentTheme.colors.primary} />
                        <span>Attached Medical Documents ({visit.documents.length}):</span>
                      </div>
                      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                        {visit.documents.map((doc, dIdx) => (
                          <a
                            key={dIdx}
                            href={doc.fileUrl || '#'}
                            target="_blank"
                            rel="noreferrer"
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                              padding: '6px 12px',
                              borderRadius: '8px',
                              backgroundColor: '#F3F4F6',
                              border: `1px solid ${currentTheme.colors.border}`,
                              textDecoration: 'none',
                              color: currentTheme.colors.textPrimary,
                              fontSize: '0.82rem',
                              cursor: doc.fileUrl ? 'pointer' : 'default',
                              boxShadow: currentTheme.shadows.subtle,
                            }}
                          >
                            {doc.fileUrl && !doc.fileUrl.endsWith('.pdf') ? (
                              <img src={doc.fileUrl} alt="Doc preview" style={{ width: '28px', height: '28px', objectFit: 'cover', borderRadius: '4px' }} />
                            ) : (
                              <FileText size={18} color={currentTheme.colors.primary} />
                            )}
                            <span style={{ fontWeight: '700' }}>{doc.documentType || 'Document'}</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Back button footer */}
      {onBack && (
        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'flex-end' }}>
          <button
            onClick={onBack}
            style={{ ...styles.outlineButton, minHeight: '48px', padding: '0 24px' }}
          >
            Back to Menu
          </button>
        </div>
      )}
    </div>
  );
}
