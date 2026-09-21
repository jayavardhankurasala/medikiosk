import React, { useState, useEffect } from 'react';
import {
  Users,
  Activity,
  Printer,
  Plus,
  Trash2,
  CheckCircle2,
  Leaf,
  FileText,
  AlertTriangle,
  FileCheck,
  Search,
  ArrowLeft,
  Sparkles,
  ShieldCheck,
  Calendar,
  Clock,
  HeartPulse,
} from 'lucide-react';
import { theme } from '../../styles/theme';

export default function AyushDoctorSummary({
  patient: initialPatient,
  onBackToKiosk,
  onBackToQueue,
}) {
  const [queue, setQueue] = useState([]);
  const [queueLoading, setQueueLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activePatient, setActivePatient] = useState(null);

  // AYUSH Interactive Prescription Pad State
  const [ayurvedicDiagnosis, setAyurvedicDiagnosis] = useState('Amlapitta with Pitta-Vata Prakopa');
  const [panchakarmaAdvice, setPanchakarmaAdvice] = useState('Deepana-Pachana followed by Mridu Virechana');
  const [dietAdvice, setDietAdvice] = useState('Pathya: Avoid spicy, sour, deep-fried food. Take Takra with roasted jeera.');
  const [newFormulation, setNewFormulation] = useState({ name: '', dosage: '', anupana: '', frequency: '' });
  const [formulationsList, setFormulationsList] = useState([
    { name: 'Sutshekhar Ras (Gold)', dosage: '125 mg', anupana: 'With honey / lukewarm water', frequency: 'BD (Twice daily) after food' },
    { name: 'Avipattikar Churna', dosage: '3 grams', anupana: 'With warm water', frequency: 'Bedtime' },
    { name: 'Kamdudha Ras (Moti Yukta)', dosage: '250 mg', anupana: 'With milk', frequency: 'OD morning' },
  ]);
  const [doctorNotes, setDoctorNotes] = useState('Patient exhibits Pitta aggravation with Vishamagni. Advised 14-day cycle with lifestyle moderation.');
  const [finalizing, setFinalizing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [consultSuccessMsg, setConsultSuccessMsg] = useState('');

  // Fetch real-time queue
  const fetchQueue = async () => {
    setQueueLoading(true);
    try {
      const res = await fetch('/api/visits/queue');
      const data = await res.json();
      if (data.success && Array.isArray(data.queue) && data.queue.length > 0) {
        // Filter or prioritize AYUSH mode visits, but include all
        const mapped = data.queue.map((v, idx) => ({
          id: v.id || `v-${idx + 1}`,
          patientId: v.patientId || `p-${idx + 1}`,
          tokenNumber: v.tokenNumber || `TK-${101 + idx}`,
          name: v.patientName || 'OPD Patient',
          ageGender: `${v.patientAge || 35}${v.patientGender ? v.patientGender[0] : 'M'}`,
          phone: v.patientPhone || '9876543210',
          clinicalMode: v.clinicalMode || 'AYUSH',
          complaint: (v.messages && v.messages[0]?.content) || v.complaint || 'Digestive discomfort and joint stiffness',
          vitals: v.bloodPressure
            ? `BP: ${v.bloodPressure} | Temp: ${v.temperature || 98.6}°F | SpO2: ${v.spo2 || 98}% | BMI: ${v.bmi || 24.2}`
            : 'BP: 120/80 mmHg | Temp: 98.6°F | SpO2: 98% | BMI: 24.2',
          priority: v.priority || 'NORMAL',
          status: v.status || 'IN_PROGRESS',
          triageStatus: v.triageStatus || 'waiting_for_nurse',
          summary: v.summary,
          documents: v.documents || [],
          messages: v.messages || [],
        }));
        setQueue(mapped);

        if (!activePatient) {
          const ayushFirst = mapped.find((p) => p.clinicalMode === 'AYUSH') || mapped[0];
          setActivePatient(ayushFirst);
        }
      }
    } catch (err) {
      console.error('Queue fetch error:', err);
    } finally {
      setQueueLoading(false);
    }
  };

  useEffect(() => {
    fetchQueue();
    const interval = setInterval(fetchQueue, 6000);
    return () => clearInterval(interval);
  }, []);

  const handleAddFormulation = () => {
    if (!newFormulation.name.trim()) return;
    setFormulationsList((prev) => [
      ...prev,
      {
        name: newFormulation.name.trim(),
        dosage: newFormulation.dosage.trim() || '250 mg',
        anupana: newFormulation.anupana.trim() || 'With lukewarm water',
        frequency: newFormulation.frequency.trim() || 'Twice daily after meals',
      },
    ]);
    setNewFormulation({ name: '', dosage: '', anupana: '', frequency: '' });
  };

  const handleRemoveFormulation = (index) => {
    setFormulationsList((prev) => prev.filter((_, i) => i !== index));
  };

  const handleFinalizeConsultation = async () => {
    if (!activePatient) return;
    setFinalizing(true);
    try {
      const res = await fetch(`/api/visits/${activePatient.id}/consultation`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          doctorDiagnosis: `${ayurvedicDiagnosis} | Panchakarma: ${panchakarmaAdvice}`,
          prescribedTests: ['Liver Function Test (LFT)', 'Serum Uric Acid'],
          prescribedMedications: formulationsList,
          doctorNotes: `${doctorNotes} | Diet/Lifestyle: ${dietAdvice}`,
          verifiedDoctorName: 'Dr. Priya Sharma, BAMS, MD (Ayu)',
        }),
      });

      const data = await res.json();
      if (data.success) {
        setIsCompleted(true);
        setConsultSuccessMsg(`Prescription verified & signed for Token ${activePatient.tokenNumber}. Status: COMPLETED.`);
        // Also update triage status
        await fetch(`/api/visits/${activePatient.id}/triage-status`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: 'completed' }),
        });
        fetchQueue();
      }
    } catch (err) {
      console.error('Consultation finalization error:', err);
    } finally {
      setFinalizing(false);
    }
  };

  const currentAyush = activePatient?.summary?.ayushAssessment || {
    prakriti: 'Pitta-Vata Predominant',
    vikriti: 'Pitta Vriddhi with mild Agnimandya',
    sara: 'Madhyama Tvak & Rakta Sara',
    samhanana: 'Madhyama Samhanana (Moderate build)',
    pramana: 'Madhyama Pramana (Normal height/weight)',
    satmya: 'Mishra Satmya (Habitual mixed diet)',
    sattva: 'Madhyama Sattva (Moderate tolerance)',
    aharaShakti: 'Vishamagni (Irregular appetite & digestion)',
    vyayamaShakti: 'Madhyama Vyayama Shakti (Normal endurance)',
    vaya: 'Madhyama Vaya (Adult stage)',
    agni: 'Vishama Agni',
    koshtha: 'Madhyama Koshtha',
    aharaVihara: 'Spicy dietary preference, irregular meal timings',
  };

  const filteredQueue = queue.filter(
    (p) =>
      (p.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.tokenNumber || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.phone || '').includes(searchQuery)
  );

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '1280px',
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        boxShadow: theme.shadows.card,
        border: '1px solid #E2E8F0',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '740px',
        overflow: 'hidden',
        fontFamily: theme.typography.fontFamily,
      }}
    >
      {/* Top Banner Header */}
      <div
        style={{
          padding: '16px 24px',
          borderBottom: '1px solid #E2E8F0',
          backgroundColor: '#064E3B',
          color: '#FFFFFF',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div
            style={{
              width: '42px',
              height: '42px',
              borderRadius: '12px',
              backgroundColor: '#059669',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Leaf size={24} color="#FFFFFF" />
          </div>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: '800', margin: 0, letterSpacing: '-0.02em' }}>
              AYUSH & Ayurveda Clinical Consultation Portal
            </h2>
            <p style={{ fontSize: '0.85rem', color: '#A7F3D0', margin: 0 }}>
              Dashavidha Pariksha (दशविध परीक्षा) • Prakriti / Agni Analysis • Classical Formulations
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div
            style={{
              padding: '6px 14px',
              borderRadius: '20px',
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              fontSize: '0.85rem',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <ShieldCheck size={16} color="#34D399" />
            <span>Ayush Practitioner: Dr. Priya Sharma, BAMS, MD</span>
          </div>

          <button
            onClick={() => window.print()}
            style={{
              padding: '8px 14px',
              borderRadius: '8px',
              backgroundColor: '#059669',
              color: '#FFFFFF',
              border: 'none',
              fontSize: '0.85rem',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Printer size={16} />
            <span>Print Rx</span>
          </button>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', minHeight: '660px' }}>
        {/* Left Column: Live AYUSH OPD Queue */}
        <div style={{ borderRight: '1px solid #E2E8F0', backgroundColor: '#F8FAFC', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ position: 'relative' }}>
            <Search size={16} color="#94A3B8" style={{ position: 'absolute', left: '12px', top: '12px' }} />
            <input
              type="text"
              placeholder="Search token / name / phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '9px 12px 9px 36px',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                fontSize: '0.85rem',
                backgroundColor: '#FFFFFF',
                boxSizing: 'border-box',
              }}
            />
          </div>

          <div style={{ fontSize: '0.78rem', fontWeight: '700', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Live Queue ({filteredQueue.length} Patients)
          </div>

          <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '580px' }}>
            {filteredQueue.map((p) => {
              const isSelected = activePatient?.id === p.id;
              const isHigh = p.priority === 'HIGH_PRIORITY';
              return (
                <div
                  key={p.id}
                  onClick={() => {
                    setActivePatient(p);
                    setIsCompleted(false);
                    setConsultSuccessMsg('');
                  }}
                  style={{
                    padding: '12px',
                    borderRadius: '10px',
                    backgroundColor: isSelected ? '#ECFDF5' : '#FFFFFF',
                    border: `1.5px solid ${isSelected ? '#059669' : isHigh ? '#FCA5A5' : '#E2E8F0'}`,
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    boxShadow: isSelected ? '0 2px 8px rgba(5, 150, 105, 0.15)' : 'none',
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                    <span
                      style={{
                        padding: '2px 8px',
                        borderRadius: '6px',
                        fontSize: '0.75rem',
                        fontWeight: '800',
                        backgroundColor: '#064E3B',
                        color: '#FFFFFF',
                      }}
                    >
                      {p.tokenNumber}
                    </span>
                    <span
                      style={{
                        fontSize: '0.72rem',
                        fontWeight: '700',
                        padding: '2px 6px',
                        borderRadius: '4px',
                        backgroundColor:
                          p.triageStatus === 'completed'
                            ? '#DCFCE7'
                            : p.triageStatus === 'with_doctor'
                            ? '#FEF3C7'
                            : '#E0E7FF',
                        color:
                          p.triageStatus === 'completed'
                            ? '#166534'
                            : p.triageStatus === 'with_doctor'
                            ? '#92400E'
                            : '#3730A3',
                      }}
                    >
                      {p.triageStatus === 'waiting_for_nurse'
                        ? 'Waiting Triage'
                        : p.triageStatus === 'vitals_recorded'
                        ? 'Vitals Ready'
                        : p.triageStatus === 'with_doctor'
                        ? 'With Doctor'
                        : 'Completed'}
                    </span>
                  </div>

                  <div style={{ fontWeight: '700', fontSize: '0.92rem', color: '#1E293B' }}>{p.name}</div>
                  <div style={{ fontSize: '0.78rem', color: '#64748B' }}>
                    {p.ageGender} • {p.clinicalMode}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#059669', fontWeight: '500', marginTop: '3px' }}>
                    {p.complaint}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Dashavidha Pariksha + Interactive Prescription Pad */}
        <div style={{ padding: '24px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '20px', maxHeight: '740px' }}>
          {activePatient ? (
            <>
              {/* Patient Banner */}
              <div
                style={{
                  padding: '16px 20px',
                  borderRadius: '12px',
                  backgroundColor: '#F0FDF4',
                  border: '1px solid #BBF7D0',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '12px',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span
                      style={{
                        padding: '4px 10px',
                        borderRadius: '8px',
                        backgroundColor: '#064E3B',
                        color: '#FFFFFF',
                        fontWeight: '800',
                        fontSize: '0.95rem',
                      }}
                    >
                      {activePatient.tokenNumber}
                    </span>
                    <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: '800', color: '#064E3B' }}>
                      {activePatient.name} ({activePatient.ageGender})
                    </h3>
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#374151', marginTop: '4px' }}>
                    <b>Primary Complaint:</b> {activePatient.complaint}
                  </div>
                  <div style={{ fontSize: '0.82rem', color: '#059669', fontWeight: '600', marginTop: '2px' }}>
                    <b>Triage Vitals:</b> {activePatient.vitals}
                  </div>
                </div>

                {isCompleted && (
                  <div
                    style={{
                      padding: '8px 14px',
                      borderRadius: '8px',
                      backgroundColor: '#DCFCE7',
                      border: '1px solid #86EFAC',
                      color: '#166534',
                      fontWeight: '700',
                      fontSize: '0.85rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                    }}
                  >
                    <CheckCircle2 size={18} />
                    <span>Digitally Signed & Verified</span>
                  </div>
                )}
              </div>

              {consultSuccessMsg && (
                <div style={{ padding: '12px 16px', borderRadius: '8px', backgroundColor: '#ECFDF5', border: '1px solid #A7F3D0', color: '#065F46', fontSize: '0.9rem', fontWeight: '600' }}>
                  {consultSuccessMsg}
                </div>
              )}

              {/* 1. Complete Dashavidha Pariksha (दशविध परीक्षा) Card */}
              <div
                style={{
                  padding: '20px',
                  borderRadius: '14px',
                  backgroundColor: '#FFFFFF',
                  border: '1.5px solid #A7F3D0',
                  boxShadow: '0 2px 8px rgba(5, 150, 105, 0.08)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                  <Sparkles size={20} color="#059669" />
                  <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: '800', color: '#064E3B' }}>
                    Ayurvedic Rogi Pariksha: Dashavidha Pariksha (दशविध परीक्षा)
                  </h4>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '14px' }}>
                  <div style={{ padding: '10px 12px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#059669' }}>1. प्रकृति (Prakriti)</div>
                    <div style={{ fontSize: '0.9rem', fontWeight: '600', color: '#1E293B', marginTop: '2px' }}>{currentAyush.prakriti}</div>
                  </div>

                  <div style={{ padding: '10px 12px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#059669' }}>2. विकृति (Vikriti)</div>
                    <div style={{ fontSize: '0.9rem', fontWeight: '600', color: '#1E293B', marginTop: '2px' }}>{currentAyush.vikriti}</div>
                  </div>

                  <div style={{ padding: '10px 12px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#059669' }}>3. सार (Sara)</div>
                    <div style={{ fontSize: '0.9rem', fontWeight: '600', color: '#1E293B', marginTop: '2px' }}>{currentAyush.sara}</div>
                  </div>

                  <div style={{ padding: '10px 12px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#059669' }}>4. संहनन (Samhanana)</div>
                    <div style={{ fontSize: '0.9rem', fontWeight: '600', color: '#1E293B', marginTop: '2px' }}>{currentAyush.samhanana}</div>
                  </div>

                  <div style={{ padding: '10px 12px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#059669' }}>5. प्रमाण (Pramana)</div>
                    <div style={{ fontSize: '0.9rem', fontWeight: '600', color: '#1E293B', marginTop: '2px' }}>{currentAyush.pramana}</div>
                  </div>

                  <div style={{ padding: '10px 12px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#059669' }}>6. सात्म्य (Satmya)</div>
                    <div style={{ fontSize: '0.9rem', fontWeight: '600', color: '#1E293B', marginTop: '2px' }}>{currentAyush.satmya}</div>
                  </div>

                  <div style={{ padding: '10px 12px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#059669' }}>7. सत्त्व (Sattva)</div>
                    <div style={{ fontSize: '0.9rem', fontWeight: '600', color: '#1E293B', marginTop: '2px' }}>{currentAyush.sattva}</div>
                  </div>

                  <div style={{ padding: '10px 12px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#059669' }}>8. आहार शक्ति व अग्नि (Agni)</div>
                    <div style={{ fontSize: '0.9rem', fontWeight: '600', color: '#1E293B', marginTop: '2px' }}>{currentAyush.aharaShakti} ({currentAyush.agni})</div>
                  </div>

                  <div style={{ padding: '10px 12px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#059669' }}>9. व्यायाम शक्ति (Vyayama)</div>
                    <div style={{ fontSize: '0.9rem', fontWeight: '600', color: '#1E293B', marginTop: '2px' }}>{currentAyush.vyayamaShakti}</div>
                  </div>

                  <div style={{ padding: '10px 12px', backgroundColor: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                    <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#059669' }}>10. वय (Vaya) व कोष्ठ</div>
                    <div style={{ fontSize: '0.9rem', fontWeight: '600', color: '#1E293B', marginTop: '2px' }}>{currentAyush.vaya} • {currentAyush.koshtha}</div>
                  </div>
                </div>
              </div>

              {/* 2. Interactive Ayurvedic Prescription & Panchakarma Pad */}
              <div
                style={{
                  padding: '20px',
                  borderRadius: '14px',
                  backgroundColor: '#FFFFFF',
                  border: '1.5px solid #CBD5E1',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                }}
              >
                <div style={{ fontSize: '1.05rem', fontWeight: '800', color: '#1E293B' }}>
                  🌿 Ayurvedic Clinical Prescription & Formulations
                </div>

                {/* Ayurvedic Diagnosis Input */}
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '6px' }}>
                    Ayurvedic Nidana / Diagnosis:
                  </label>
                  <input
                    type="text"
                    value={ayurvedicDiagnosis}
                    onChange={(e) => setAyurvedicDiagnosis(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: '1px solid #CBD5E1',
                      fontSize: '0.9rem',
                      fontWeight: '600',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                {/* Formulations List */}
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '6px' }}>
                    Prescribed Classical Ayurvedic Formulations (औषध योग):
                  </label>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {formulationsList.map((f, idx) => (
                      <div
                        key={idx}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '10px 14px',
                          backgroundColor: '#F8FAFC',
                          borderRadius: '8px',
                          border: '1px solid #E2E8F0',
                        }}
                      >
                        <div>
                          <span style={{ fontWeight: '700', color: '#064E3B', fontSize: '0.92rem' }}>{f.name}</span>
                          <span style={{ fontSize: '0.82rem', color: '#64748B', marginLeft: '10px' }}>({f.dosage})</span>
                          <span style={{ fontSize: '0.82rem', color: '#D97706', marginLeft: '10px' }}>Anupana: {f.anupana}</span>
                          <span style={{ fontSize: '0.82rem', color: '#2563EB', marginLeft: '10px' }}>• {f.frequency}</span>
                        </div>
                        <button
                          onClick={() => handleRemoveFormulation(idx)}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#EF4444' }}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Add New Formulation Inputs */}
                  <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1.5fr 1.5fr auto', gap: '8px', marginTop: '10px' }}>
                    <input
                      type="text"
                      placeholder="Formulation name (e.g. Sutshekhar Ras)"
                      value={newFormulation.name}
                      onChange={(e) => setNewFormulation({ ...newFormulation, name: e.target.value })}
                      style={{ padding: '8px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.82rem' }}
                    />
                    <input
                      type="text"
                      placeholder="Dosage (250 mg)"
                      value={newFormulation.dosage}
                      onChange={(e) => setNewFormulation({ ...newFormulation, dosage: e.target.value })}
                      style={{ padding: '8px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.82rem' }}
                    />
                    <input
                      type="text"
                      placeholder="Anupana (e.g. Warm water)"
                      value={newFormulation.anupana}
                      onChange={(e) => setNewFormulation({ ...newFormulation, anupana: e.target.value })}
                      style={{ padding: '8px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.82rem' }}
                    />
                    <input
                      type="text"
                      placeholder="Frequency (e.g. BD after meals)"
                      value={newFormulation.frequency}
                      onChange={(e) => setNewFormulation({ ...newFormulation, frequency: e.target.value })}
                      style={{ padding: '8px 10px', borderRadius: '6px', border: '1px solid #CBD5E1', fontSize: '0.82rem' }}
                    />
                    <button
                      onClick={handleAddFormulation}
                      style={{
                        padding: '8px 14px',
                        backgroundColor: '#059669',
                        color: '#FFFFFF',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '0.82rem',
                        fontWeight: '700',
                      }}
                    >
                      <Plus size={16} /> Add
                    </button>
                  </div>
                </div>

                {/* Panchakarma & Upakarma Advice */}
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '6px' }}>
                    Panchakarma / Upakarma Advice:
                  </label>
                  <input
                    type="text"
                    value={panchakarmaAdvice}
                    onChange={(e) => setPanchakarmaAdvice(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: '1px solid #CBD5E1',
                      fontSize: '0.9rem',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                {/* Diet & Lifestyle (Pathya-Apathya) */}
                <div>
                  <label style={{ fontSize: '0.82rem', fontWeight: '700', color: '#475569', display: 'block', marginBottom: '6px' }}>
                    Pathya-Apathya (Dietary & Daily Routine Modification):
                  </label>
                  <input
                    type="text"
                    value={dietAdvice}
                    onChange={(e) => setDietAdvice(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: '1px solid #CBD5E1',
                      fontSize: '0.9rem',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                {/* Practitioner Verification Button */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '10px' }}>
                  <button
                    onClick={handleFinalizeConsultation}
                    disabled={finalizing}
                    style={{
                      padding: '12px 24px',
                      borderRadius: '8px',
                      backgroundColor: '#059669',
                      color: '#FFFFFF',
                      border: 'none',
                      fontSize: '0.95rem',
                      fontWeight: '700',
                      cursor: finalizing ? 'default' : 'pointer',
                      opacity: finalizing ? 0.7 : 1,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      boxShadow: '0 4px 14px rgba(5, 150, 105, 0.3)',
                    }}
                  >
                    <CheckCircle2 size={18} />
                    <span>{finalizing ? 'Saving...' : 'Sign & Digitally Verify AYUSH Consultation'}</span>
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: '#94A3B8' }}>
              <Users size={48} style={{ margin: '0 auto 12px auto', opacity: 0.6 }} />
              <h3>Select a patient from the left queue to begin consultation</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
