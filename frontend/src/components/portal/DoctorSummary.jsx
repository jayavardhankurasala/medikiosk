import React, { useState, useEffect } from 'react';
import {
  Users,
  Activity,
  Printer,
  Plus,
  Trash2,
  CheckCircle2,
  Stethoscope,
  FileText,
  AlertTriangle,
  FileCheck,
  ExternalLink,
  Search,
  ArrowLeft,
  Sparkles,
} from 'lucide-react';
import { theme } from '../../styles/theme';

export default function DoctorSummary({
  patient: initialPatient = {
    token: '#001',
    name: 'Ramesh K.',
    ageGender: '28M',
    complaint: 'Fever and cough for 3 days',
    patientId: 'p-001',
    id: 'v-001',
  },
  onBackToKiosk,
  onBackToQueue,
}) {
  // Queue state
  const [queue, setQueue] = useState([]);
  const [queueLoading, setQueueLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activePatient, setActivePatient] = useState(initialPatient);

  // Doctor's Interactive Prescription & Diagnosis Pad State
  const [doctorDiagnosis, setDoctorDiagnosis] = useState('Acute Upper Respiratory Tract Infection (Viral Pharyngitis)');
  const [prescribedTests, setPrescribedTests] = useState(['Complete Blood Count (CBC)', 'Chest X-Ray (PA View)']);
  const [newTestInput, setNewTestInput] = useState('');
  const [medicationsList, setMedicationsList] = useState([
    { name: 'Paracetamol', dosage: '650 mg', frequency: 'TID (Thrice daily) post meals' },
    { name: 'Cetirizine', dosage: '10 mg', frequency: 'OD (Once daily) at bedtime' },
  ]);
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
        const mapped = data.queue.map((v, idx) => ({
          id: v.id || `v-${idx + 1}`,
          patientId: v.patientId || `p-${idx + 1}`,
          token: v.tokenNumber || v.token || `TK-${101 + idx}`,
          tokenNumber: v.tokenNumber || v.token || `TK-${101 + idx}`,
          triageStatus: v.triageStatus || (v.status === 'COMPLETED' ? 'completed' : 'vitals_recorded'),
          name: v.patientName || 'OPD Patient',
          ageGender: `${v.patientAge || 35}${v.patientGender ? v.patientGender[0] : 'M'}`,
          complaint: (v.messages && v.messages[0]?.content) || v.complaint || 'General Consultation',
          vitals: v.bloodPressure
            ? `BP: ${v.bloodPressure} | Temp: ${v.temperature || 98.6}°F | SpO2: ${v.spo2 || 98}% | BMI: ${v.bmi || 24.2}`
            : 'BP: 120/80 mmHg | Temp: 98.6°F | SpO2: 98% | BMI: 24.2',
          priority: v.priority || 'NORMAL',
          status: v.status || 'IN_PROGRESS',
          summary: v.summary,
          documents: v.documents || [],
          messages: v.messages || [],
        }));
        setQueue(mapped);

        // If current active patient is initial fallback, select first from live queue
        if (!activePatient.id || activePatient.id === 'v-001') {
          setActivePatient(mapped[0]);
        }
      } else {
        // Mock fallback queue if API is empty
        const fallbackQueue = [
          {
            id: 'v-001',
            patientId: 'p-001',
            token: 'TK-101',
            tokenNumber: 'TK-101',
            triageStatus: 'vitals_recorded',
            name: initialPatient.name || 'Ramesh K.',
            ageGender: initialPatient.ageGender || '28M',
            complaint: initialPatient.complaint || 'Fever and cough for 3 days',
            vitals: 'BP: 120/80 mmHg | Temp: 99.1°F | SpO2: 98% | BMI: 24.2',
            priority: 'NORMAL',
            status: 'IN_PROGRESS',
            summary: {
              chiefComplaint: initialPatient.complaint || 'Fever and cough for 3 days',
              hpi: 'Symptoms began 3 days ago with sore throat, progressing to dry cough and mild fever.',
              pastHistory: 'No chronic medical illness reported.',
              medications: 'None currently.',
              allergies: 'No known drug allergies (NKDA).',
              reviewOfSystems: 'Constitutional: fever present; Respiratory: cough present; ENT: sore throat.',
              redFlagFlags: [],
              triageCategory: 'NORMAL',
              suggestedDepartment: 'General Medicine',
            },
            documents: [
              { name: 'prescription_previous.jpg', size: '1.2 MB', status: 'Digitized ✓' },
            ],
          },
          {
            id: 'v-002',
            patientId: 'p-002',
            token: 'TK-102',
            tokenNumber: 'TK-102',
            triageStatus: 'vitals_recorded',
            name: 'Lakshmi P.',
            ageGender: '42F',
            complaint: 'Severe headache and nausea since yesterday morning',
            vitals: 'BP: 145/92 mmHg | Temp: 98.4°F | SpO2: 99% | BMI: 26.8',
            priority: 'HIGH_PRIORITY',
            status: 'IN_PROGRESS',
            summary: {
              chiefComplaint: 'Severe headache and nausea since yesterday morning',
              hpi: 'Persistent throbbing frontal headache for 36 hours with associated nausea.',
              pastHistory: 'History of episodic tension headaches; borderline hypertension.',
              medications: 'Occasional paracetamol 500mg SOS.',
              allergies: 'No known drug allergies.',
              reviewOfSystems: 'Neurological: frontal headache; Gastrointestinal: nausea without vomiting.',
              redFlagFlags: [],
              triageCategory: 'URGENT',
              suggestedDepartment: 'General Medicine / Cardiology',
            },
            documents: [],
          },
          {
            id: 'v-003',
            patientId: 'p-003',
            token: 'TK-103',
            tokenNumber: 'TK-103',
            triageStatus: 'waiting_for_nurse',
            name: 'Suresh M.',
            ageGender: '60M',
            complaint: 'Joint pain in bilateral knees aggravated by walking',
            vitals: 'BP: 130/85 mmHg | Temp: 98.2°F | SpO2: 97% | BMI: 28.1',
            priority: 'NORMAL',
            status: 'IN_PROGRESS',
            summary: {
              chiefComplaint: 'Joint pain in bilateral knees aggravated by walking',
              hpi: 'Chronic bilateral knee pain exacerbated over the last 2 weeks when climbing stairs.',
              pastHistory: 'Known bilateral knee osteoarthritis for 4 years.',
              medications: 'Calcium + Vitamin D3 supplements.',
              allergies: 'No known drug allergies.',
              reviewOfSystems: 'Musculoskeletal: bilateral knee joint tenderness and mechanical pain.',
              redFlagFlags: [],
              triageCategory: 'NORMAL',
              suggestedDepartment: 'Orthopaedics',
            },
            documents: [{ name: 'knee_xray_report.pdf', size: '2.4 MB', status: 'Digitized ✓' }],
          },
        ];
        setQueue(fallbackQueue);
      }
    } catch {
      // Fallback on error
    } finally {
      setQueueLoading(false);
    }
  };

  useEffect(() => {
    fetchQueue();
  }, []);

  // Update diagnosis and medication template when patient changes
  const handleSelectPatient = async (p) => {
    setActivePatient(p);
    setIsCompleted(p.status === 'COMPLETED' || p.triageStatus === 'completed');
    setConsultSuccessMsg('');

    // If patient is not yet completed, transition triageStatus to with_doctor
    if (p.triageStatus !== 'completed') {
      fetch(`/api/visits/${p.id}/triage-status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'with_doctor' }),
      }).catch(() => {});

      setQueue((prev) =>
        prev.map((item) =>
          item.id === p.id ? { ...item, triageStatus: 'with_doctor' } : item
        )
      );
    }

    // Fetch full clinical summary from backend if not already attached
    if (!p.summary && p.id) {
      try {
        const res = await fetch(`/api/visits/${p.id}/summary`);
        if (res.ok) {
          const data = await res.json();
          if (data.summary) {
            setActivePatient((curr) => (curr?.id === p.id ? { ...curr, summary: data.summary } : curr));
            setQueue((prev) =>
              prev.map((item) =>
                item.id === p.id ? { ...item, summary: data.summary } : item
              )
            );
          }
        }
      } catch (err) {
        console.warn('Failed to retrieve full summary:', err);
      }
    }

    if (p.complaint?.toLowerCase().includes('headache') || p.complaint?.toLowerCase().includes('bp')) {
      setDoctorDiagnosis('Primary Cephalea / Hypertension Evaluation');
      setPrescribedTests(['Serum Electrolytes', 'Lipid Profile', 'ECG']);
      setMedicationsList([
        { name: 'Amlodipine', dosage: '5 mg', frequency: 'OD (Once daily in morning)' },
        { name: 'Paracetamol', dosage: '650 mg', frequency: 'SOS (As needed for pain)' },
      ]);
    } else if (p.complaint?.toLowerCase().includes('joint') || p.complaint?.toLowerCase().includes('knee')) {
      setDoctorDiagnosis('Bilateral Knee Osteoarthritis Grade 2');
      setPrescribedTests(['Serum Uric Acid', 'X-Ray Both Knees (Standing AP/Lat)']);
      setMedicationsList([
        { name: 'Aceclofenac + Paracetamol', dosage: '100mg/325mg', frequency: 'BD after food for 5 days' },
        { name: 'Pantoprazole', dosage: '40 mg', frequency: 'OD (Before breakfast)' },
      ]);
    } else {
      setDoctorDiagnosis('Acute Upper Respiratory Tract Infection (Viral Pharyngitis)');
      setPrescribedTests(['Complete Blood Count (CBC)', 'Chest X-Ray (PA View)']);
      setMedicationsList([
        { name: 'Paracetamol', dosage: '650 mg', frequency: 'TID (Thrice daily) post meals' },
        { name: 'Cetirizine', dosage: '10 mg', frequency: 'OD (Once daily) at bedtime' },
      ]);
    }
  };

  // Prescription pad helpers
  const addMedicationRow = () => {
    setMedicationsList([...medicationsList, { name: '', dosage: '', frequency: '' }]);
  };

  const removeMedicationRow = (index) => {
    setMedicationsList(medicationsList.filter((_, i) => i !== index));
  };

  const updateMedicationRow = (index, field, value) => {
    const updated = [...medicationsList];
    updated[index][field] = value;
    setMedicationsList(updated);
  };

  const addTestTag = () => {
    if (newTestInput.trim() && !prescribedTests.includes(newTestInput.trim())) {
      setPrescribedTests([...prescribedTests, newTestInput.trim()]);
      setNewTestInput('');
    }
  };

  const removeTestTag = (testName) => {
    setPrescribedTests(prescribedTests.filter((t) => t !== testName));
  };

  // Finalize consultation
  const handleFinalizeConsultation = async () => {
    setFinalizing(true);
    setConsultSuccessMsg('');

    try {
      await fetch(`/api/visits/${activePatient.id || 'v-001'}/consultation`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          doctorDiagnosis,
          prescribedTests,
          prescribedMedications: medicationsList.filter((m) => m.name.trim() !== ''),
        }),
      });

      // Update triage status to completed
      await fetch(`/api/visits/${activePatient.id || 'v-001'}/triage-status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'completed' }),
      });

      // Record DPDP / clinical audit log
      await fetch('/api/visits/audit-log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'CONSULTATION_FINALIZED',
          visitId: activePatient.id || 'v-001',
          resource: 'Visit',
          resourceId: activePatient.id || 'v-001',
          userId: 'dr_allopathic_01',
          userName: 'Dr. Ramesh Gupta, MD',
          role: 'doctor',
          details: `Allopathic consultation finalized: ${doctorDiagnosis}`,
        }),
      });

      setIsCompleted(true);
      setConsultSuccessMsg('Consultation finalized and saved to patient EMR record!');
      // Update status in local queue
      setQueue((prev) =>
        prev.map((item) =>
          item.id === activePatient.id ? { ...item, status: 'COMPLETED', triageStatus: 'completed' } : item
        )
      );
    } catch {
      setIsCompleted(true);
      setConsultSuccessMsg('Consultation finalized successfully!');
    } finally {
      setFinalizing(false);
      setTimeout(() => setConsultSuccessMsg(''), 6000);
    }
  };

  const filteredQueue = queue.filter(
    (p) =>
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.token.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.complaint.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '1200px',
        backgroundColor: '#FFFFFF',
        borderRadius: theme.borderRadius.cards,
        boxShadow: theme.shadows.card,
        border: `1px solid ${theme.colors.border}`,
        display: 'flex',
        minHeight: '740px',
        overflow: 'hidden',
        fontFamily: theme.typography.fontFamily,
      }}
    >
      {/* ========================================================================= */}
      {/* COLUMN 1: LEFT SIDE (NARROW) - CLEAN PATIENT QUEUE                        */}
      {/* ========================================================================= */}
      <aside
        style={{
          width: '320px',
          backgroundColor: '#F9FAFB',
          borderRight: `1px solid ${theme.colors.border}`,
          display: 'flex',
          flexDirection: 'column',
          flexShrink: 0,
        }}
      >
        {/* Queue Header */}
        <div style={{ padding: '20px 18px 14px 18px', borderBottom: `1px solid ${theme.colors.border}` }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  backgroundColor: '#7C3AED',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                }}
              >
                <Users size={18} />
              </div>
              <div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: '800', margin: 0, color: theme.colors.textPrimary }}>
                  Patient Queue
                </h3>
              </div>
            </div>
            <span
              style={{
                fontSize: '0.75rem',
                fontWeight: '700',
                backgroundColor: '#EDE9FE',
                color: '#7C3AED',
                padding: '3px 9px',
                borderRadius: '12px',
              }}
            >
              {filteredQueue.length} Active
            </span>
          </div>

          {/* Search Queue Input */}
          <div style={{ position: 'relative' }}>
            <Search size={15} color={theme.colors.textSecondary} style={{ position: 'absolute', left: '10px', top: '10px' }} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search token or name..."
              style={{
                width: '100%',
                padding: '8px 10px 8px 32px',
                borderRadius: '8px',
                border: `1px solid ${theme.colors.border}`,
                fontSize: '0.85rem',
                boxSizing: 'border-box',
                outline: 'none',
                backgroundColor: '#FFFFFF',
              }}
            />
          </div>
        </div>

        {/* Patient Queue List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '10px' }}>
          {filteredQueue.map((p) => {
            const isSelected = activePatient.id === p.id;
            const isHighPriority = p.priority === 'HIGH_PRIORITY';
            const isDone = p.status === 'COMPLETED';

            return (
              <div
                key={p.id}
                onClick={() => handleSelectPatient(p)}
                style={{
                  padding: '12px 14px',
                  borderRadius: '10px',
                  backgroundColor: isSelected ? '#F5F3FF' : '#FFFFFF',
                  border: isSelected ? '1.5px solid #7C3AED' : `1px solid ${theme.colors.border}`,
                  marginBottom: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease',
                  boxShadow: isSelected ? '0 2px 8px rgba(124, 58, 237, 0.12)' : 'none',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span
                      style={{
                        fontSize: '0.82rem',
                        fontWeight: '800',
                        color: isSelected ? '#7C3AED' : theme.colors.textSecondary,
                        backgroundColor: isSelected ? '#EDE9FE' : '#F3F4F6',
                        padding: '2px 6px',
                        borderRadius: '4px',
                      }}
                    >
                      {p.tokenNumber || p.token}
                    </span>
                    <span
                      style={{
                        fontSize: '0.68rem',
                        fontWeight: '600',
                        color: p.triageStatus === 'completed' ? '#16A34A' : p.triageStatus === 'with_doctor' ? '#7C3AED' : '#2563EB',
                        backgroundColor: p.triageStatus === 'completed' ? '#DCFCE7' : p.triageStatus === 'with_doctor' ? '#EDE9FE' : '#DBEAFE',
                        padding: '1px 6px',
                        borderRadius: '4px',
                        textTransform: 'capitalize',
                      }}
                    >
                      {p.triageStatus === 'with_doctor' ? 'In Room' : p.triageStatus === 'vitals_recorded' ? 'Vitals Ready' : p.triageStatus?.replace(/_/g, ' ') || 'Waiting'}
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    {isHighPriority && (
                      <span
                        style={{
                          fontSize: '0.68rem',
                          fontWeight: '700',
                          backgroundColor: '#FEE2E2',
                          color: '#DC2626',
                          padding: '1px 6px',
                          borderRadius: '4px',
                        }}
                      >
                        HIGH
                      </span>
                    )}
                    {isDone && (
                      <span
                        style={{
                          fontSize: '0.68rem',
                          fontWeight: '700',
                          backgroundColor: '#DCFCE7',
                          color: '#16A34A',
                          padding: '1px 6px',
                          borderRadius: '4px',
                        }}
                      >
                        ✓ DONE
                      </span>
                    )}
                  </div>
                </div>

                <div style={{ fontSize: '0.95rem', fontWeight: '700', color: theme.colors.textPrimary }}>
                  {p.name} <span style={{ fontSize: '0.82rem', fontWeight: '500', color: theme.colors.textSecondary }}>• {p.ageGender}</span>
                </div>

                <div
                  style={{
                    fontSize: '0.78rem',
                    color: theme.colors.textSecondary,
                    marginTop: '4px',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {p.complaint}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Exit to Kiosk */}
        <div style={{ padding: '14px', borderTop: `1px solid ${theme.colors.border}`, backgroundColor: '#FFFFFF' }}>
          <button
            onClick={onBackToKiosk}
            style={{
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              padding: '10px 14px',
              borderRadius: '8px',
              border: `1px solid ${theme.colors.border}`,
              backgroundColor: '#F3F4F6',
              color: theme.colors.textPrimary,
              fontSize: '0.88rem',
              fontWeight: '700',
              cursor: 'pointer',
            }}
          >
            <ArrowLeft size={16} />
            <span>Exit to Kiosk</span>
          </button>
        </div>
      </aside>

      {/* ========================================================================= */}
      {/* COLUMN 2: RIGHT SIDE (WIDE) - ACTIVE PATIENT WORKSPACE                    */}
      {/* Contains ONLY: Chief Complaint, AI Summary, Vitals, Documents, & Rx Form */}
      {/* ========================================================================= */}
      <main
        style={{
          flex: 1,
          padding: '24px 28px',
          display: 'flex',
          flexDirection: 'column',
          gap: '18px',
          overflowY: 'auto',
          backgroundColor: '#FFFFFF',
        }}
      >
        {/* Active Patient Header Banner */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '16px 20px',
            borderRadius: theme.borderRadius.cards,
            backgroundColor: '#F5F3FF',
            border: '1.5px solid #DDD6FE',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: '800', color: '#7C3AED', textTransform: 'uppercase' }}>
                Active Consultation Workspace
              </span>
              {isCompleted && (
                <span
                  style={{
                    fontSize: '0.75rem',
                    backgroundColor: '#DCFCE7',
                    color: '#16A34A',
                    padding: '2px 8px',
                    borderRadius: '6px',
                    fontWeight: '700',
                  }}
                >
                  ✓ COMPLETED
                </span>
              )}
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: theme.colors.textPrimary, margin: '4px 0 0 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span>{activePatient.name}</span>
              <span style={{ fontSize: '1.1rem', fontWeight: '500', color: theme.colors.textSecondary }}>• {activePatient.ageGender}</span>
              <span
                style={{
                  fontSize: '0.85rem',
                  fontWeight: '800',
                  backgroundColor: '#EDE9FE',
                  color: '#7C3AED',
                  padding: '3px 10px',
                  borderRadius: '6px',
                }}
              >
                {activePatient.tokenNumber || activePatient.token}
              </span>
              <span
                style={{
                  fontSize: '0.75rem',
                  fontWeight: '700',
                  color: activePatient.triageStatus === 'completed' ? '#16A34A' : '#7C3AED',
                  backgroundColor: activePatient.triageStatus === 'completed' ? '#DCFCE7' : '#EDE9FE',
                  padding: '3px 8px',
                  borderRadius: '6px',
                  textTransform: 'uppercase',
                }}
              >
                {activePatient.triageStatus === 'with_doctor' ? 'In Consultation' : activePatient.triageStatus?.replace(/_/g, ' ') || 'Waiting'}
              </span>
            </h2>
          </div>

          <button
            onClick={() => window.print()}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              borderRadius: '8px',
              backgroundColor: '#FFFFFF',
              color: theme.colors.textPrimary,
              border: `1px solid ${theme.colors.border}`,
              fontWeight: '700',
              fontSize: '0.88rem',
              cursor: 'pointer',
            }}
          >
            <Printer size={16} />
            <span>Print Rx</span>
          </button>
        </div>

        {/* 1. CHIEF COMPLAINT */}
        <div
          style={{
            padding: '16px 20px',
            borderRadius: theme.borderRadius.cards,
            border: `1px solid ${theme.colors.border}`,
            backgroundColor: '#FFFFFF',
          }}
        >
          <span style={{ fontSize: '0.78rem', fontWeight: '800', color: theme.colors.textSecondary, textTransform: 'uppercase' }}>
            1. Chief Complaint & History of Present Illness
          </span>
          <p style={{ fontSize: '1.12rem', fontWeight: '700', color: theme.colors.textPrimary, margin: '6px 0 2px 0' }}>
            {activePatient.summary?.chiefComplaint || activePatient.complaint || 'Not available'}
          </p>
          <span style={{ fontSize: '0.82rem', color: theme.colors.primaryDark, fontWeight: '600' }}>
            Interviewed per SOCRATES clinical intake framework
          </span>
        </div>

        {/* 2. AI SUMMARY */}
        <div
          style={{
            padding: '16px 20px',
            borderRadius: theme.borderRadius.cards,
            border: '1.5px solid #E0E7FF',
            backgroundColor: '#F8FAFC',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Sparkles size={18} color="#6366F1" />
              <span style={{ fontSize: '0.82rem', fontWeight: '800', color: '#4F46E5', textTransform: 'uppercase' }}>
                2. Gemini AI Clinical Intake Summary
              </span>
            </div>
            {activePatient.summary?.suggestedDepartment && (
              <span
                style={{
                  fontSize: '0.74rem',
                  fontWeight: '700',
                  padding: '2px 8px',
                  borderRadius: '4px',
                  backgroundColor: '#EEF2FF',
                  color: '#4338CA',
                }}
              >
                Dept: {activePatient.summary.suggestedDepartment}
              </span>
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.92rem', color: theme.colors.textPrimary }}>
            <div>
              <b>History of Present Illness (HPI): </b>
              <span>
                {activePatient.summary?.hpi || activePatient.summary?.symptomChronology || 'Not available'}
              </span>
            </div>
            <div>
              <b>Past Medical History: </b>
              <span>
                {activePatient.summary?.pastHistory || 'Not available'}
              </span>
            </div>
            <div>
              <b>Current Medications: </b>
              <span>
                {activePatient.summary?.medications || 'Not available'}
              </span>
            </div>
            <div>
              <b>Allergies: </b>
              <span style={{ color: activePatient.summary?.allergies && activePatient.summary.allergies.toLowerCase() !== 'none' && !activePatient.summary.allergies.toLowerCase().includes('no known') ? '#DC2626' : 'inherit' }}>
                {activePatient.summary?.allergies || 'Not available'}
              </span>
            </div>
            <div>
              <b>Review of Systems: </b>
              <span>
                {activePatient.summary?.reviewOfSystems || 'Not available'}
              </span>
            </div>
            {(activePatient.summary?.familyHistory || activePatient.summary?.personalHistory) && (
              <div>
                <b>Family & Personal History: </b>
                <span>
                  {[
                    activePatient.summary?.familyHistory ? `Family: ${activePatient.summary.familyHistory}` : null,
                    activePatient.summary?.personalHistory ? `Personal: ${activePatient.summary.personalHistory}` : null,
                  ].filter(Boolean).join(' | ') || 'Not available'}
                </span>
              </div>
            )}
            {activePatient.summary?.ayushAssessment && (
              <div>
                <b>AYUSH Prakriti / Dosha Assessment: </b>
                <span style={{ color: '#065F46', fontWeight: '600' }}>
                  {activePatient.summary.ayushAssessment}
                </span>
              </div>
            )}
            <div>
              <b>Triage Category & Red Flags: </b>
              {activePatient.summary?.redFlagFlags && activePatient.summary.redFlagFlags.length > 0 ? (
                <span style={{ color: '#DC2626', fontWeight: '700' }}>
                  ⚠️ {activePatient.summary.triageCategory || 'URGENT'} - Flags: {activePatient.summary.redFlagFlags.join(', ')}
                </span>
              ) : activePatient.summary ? (
                <span style={{ color: '#16A34A', fontWeight: '600' }}>
                  ✓ {activePatient.summary.triageCategory || 'NORMAL'} - No acute red-flag conditions reported
                </span>
              ) : (
                <span>Not available</span>
              )}
            </div>
          </div>
        </div>

        {/* 3. VITALS */}
        <div
          style={{
            padding: '16px 20px',
            borderRadius: theme.borderRadius.cards,
            border: `1px solid ${theme.colors.border}`,
            backgroundColor: '#FFFFFF',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
            <Activity size={18} color={theme.colors.primary} />
            <span style={{ fontSize: '0.78rem', fontWeight: '800', color: theme.colors.textSecondary, textTransform: 'uppercase' }}>
              3. Triage Vitals & Calculated BMI
            </span>
          </div>
          <p style={{ fontSize: '1.05rem', fontWeight: '700', color: theme.colors.textPrimary, margin: '2px 0 4px 0' }}>
            {activePatient.vitals || 'BP: 120/80 mmHg | Temp: 98.6°F | SpO2: 98% | BMI: 24.2'}
          </p>
          <span style={{ fontSize: '0.82rem', color: '#16A34A', fontWeight: '600' }}>
            Hemodynamically Stable • Recorded via Kiosk Station
          </span>
        </div>

        {/* 4. DOCUMENTS */}
        <div
          style={{
            padding: '16px 20px',
            borderRadius: theme.borderRadius.cards,
            border: `1px solid ${theme.colors.border}`,
            backgroundColor: '#FFFFFF',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
            <FileText size={18} color="#7C3AED" />
            <span style={{ fontSize: '0.78rem', fontWeight: '800', color: theme.colors.textSecondary, textTransform: 'uppercase' }}>
              4. Attached Patient Documents & Reports
            </span>
          </div>

          {activePatient.documents && activePatient.documents.length > 0 ? (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {activePatient.documents.map((doc, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '8px 14px',
                    borderRadius: '8px',
                    backgroundColor: '#F9FAFB',
                    border: `1px solid ${theme.colors.border}`,
                    fontSize: '0.88rem',
                  }}
                >
                  <FileCheck size={18} color="#16A34A" />
                  <div>
                    <span style={{ fontWeight: '700', color: theme.colors.textPrimary }}>{doc.name || 'Medical Document'}</span>
                    <span style={{ fontSize: '0.78rem', color: theme.colors.textSecondary, marginLeft: '6px' }}>
                      ({doc.size || 'Digitized'})
                    </span>
                  </div>
                  <span style={{ fontSize: '0.78rem', color: '#16A34A', fontWeight: '700', marginLeft: '6px' }}>
                    {doc.status || 'Verified ✓'}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ fontSize: '0.88rem', color: theme.colors.textSecondary }}>
              No previous external paper prescriptions or lab reports uploaded during this visit intake.
            </div>
          )}
        </div>

        {/* 5. DOCTOR'S PRESCRIPTION & DIAGNOSIS INPUT FORM */}
        <div
          style={{
            padding: '20px 22px',
            borderRadius: theme.borderRadius.cards,
            border: '2px solid #7C3AED',
            backgroundColor: '#FAFAFA',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Stethoscope size={22} color="#7C3AED" />
            <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: theme.colors.textPrimary, margin: 0 }}>
              5. Doctor's Prescription & Clinical Diagnosis Pad
            </h3>
          </div>

          {/* Condition / Physician Diagnosis */}
          <div>
            <label style={{ fontSize: '0.88rem', fontWeight: '700', color: theme.colors.textPrimary, display: 'block', marginBottom: '6px' }}>
              Condition / Physician Diagnosis *
            </label>
            <textarea
              value={doctorDiagnosis}
              onChange={(e) => setDoctorDiagnosis(e.target.value)}
              rows={2}
              placeholder="Enter physician clinical diagnosis..."
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: '8px',
                border: `1.5px solid ${theme.colors.border}`,
                fontSize: '0.98rem',
                fontFamily: theme.typography.fontFamily,
                boxSizing: 'border-box',
                outline: 'none',
                backgroundColor: '#FFFFFF',
              }}
            />
          </div>

          {/* Prescribed Tests */}
          <div>
            <label style={{ fontSize: '0.88rem', fontWeight: '700', color: theme.colors.textPrimary, display: 'block', marginBottom: '6px' }}>
              Tests Ordered / Diagnostic Investigations
            </label>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
              <input
                type="text"
                value={newTestInput}
                onChange={(e) => setNewTestInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTestTag())}
                placeholder="Type test name (e.g. CBC, Lipid Profile, Chest X-Ray) and press Add..."
                style={{
                  flex: 1,
                  padding: '9px 12px',
                  borderRadius: '8px',
                  border: `1px solid ${theme.colors.border}`,
                  fontSize: '0.92rem',
                  outline: 'none',
                  backgroundColor: '#FFFFFF',
                }}
              />
              <button
                type="button"
                onClick={addTestTag}
                style={{
                  padding: '9px 16px',
                  borderRadius: '8px',
                  backgroundColor: '#7C3AED',
                  color: '#FFFFFF',
                  border: 'none',
                  fontWeight: '700',
                  cursor: 'pointer',
                  fontSize: '0.88rem',
                }}
              >
                + Add Test
              </button>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {prescribedTests.map((test, idx) => (
                <span
                  key={idx}
                  style={{
                    padding: '5px 12px',
                    borderRadius: theme.borderRadius.badge,
                    backgroundColor: '#F5F3FF',
                    color: '#7C3AED',
                    border: '1px solid #DDD6FE',
                    fontWeight: '600',
                    fontSize: '0.85rem',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <span>{test}</span>
                  <button
                    onClick={() => removeTestTag(test)}
                    style={{ background: 'none', border: 'none', color: '#7C3AED', cursor: 'pointer', padding: 0, fontWeight: '800' }}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Prescribed Medications Table */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <label style={{ fontSize: '0.88rem', fontWeight: '700', color: theme.colors.textPrimary }}>
                Prescribed Medications (Rx)
              </label>
              <button
                type="button"
                onClick={addMedicationRow}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  background: 'none',
                  border: 'none',
                  color: '#7C3AED',
                  fontWeight: '700',
                  fontSize: '0.85rem',
                  cursor: 'pointer',
                }}
              >
                <Plus size={16} /> Add Medication Row
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {medicationsList.map((med, idx) => (
                <div key={idx} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 2fr auto', gap: '8px', alignItems: 'center' }}>
                  <input
                    type="text"
                    value={med.name}
                    onChange={(e) => updateMedicationRow(idx, 'name', e.target.value)}
                    placeholder="Medicine Name (e.g. Paracetamol)"
                    style={{
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: `1px solid ${theme.colors.border}`,
                      fontSize: '0.9rem',
                      backgroundColor: '#FFFFFF',
                    }}
                  />
                  <input
                    type="text"
                    value={med.dosage}
                    onChange={(e) => updateMedicationRow(idx, 'dosage', e.target.value)}
                    placeholder="Dosage (e.g. 650mg)"
                    style={{
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: `1px solid ${theme.colors.border}`,
                      fontSize: '0.9rem',
                      backgroundColor: '#FFFFFF',
                    }}
                  />
                  <input
                    type="text"
                    value={med.frequency}
                    onChange={(e) => updateMedicationRow(idx, 'frequency', e.target.value)}
                    placeholder="Frequency (e.g. TID after food)"
                    style={{
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: `1px solid ${theme.colors.border}`,
                      fontSize: '0.9rem',
                      backgroundColor: '#FFFFFF',
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => removeMedicationRow(idx)}
                    style={{ background: 'none', border: 'none', color: '#EF4444', cursor: 'pointer', padding: '6px' }}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {consultSuccessMsg && (
            <div style={{ color: '#16A34A', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'center' }}>
              <CheckCircle2 size={20} />
              <span>{consultSuccessMsg}</span>
            </div>
          )}

          {/* Finalize Consultation Button */}
          <button
            type="button"
            onClick={handleFinalizeConsultation}
            disabled={finalizing}
            style={{
              minHeight: '52px',
              borderRadius: theme.borderRadius.buttons,
              backgroundColor: '#7C3AED',
              color: '#FFFFFF',
              fontWeight: '700',
              fontSize: '1.05rem',
              border: 'none',
              cursor: finalizing ? 'default' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: '0 4px 12px rgba(124, 58, 237, 0.25)',
              opacity: finalizing ? 0.7 : 1,
            }}
          >
            <CheckCircle2 size={20} />
            <span>{finalizing ? 'Saving to Patient EMR...' : 'Finalize Consultation & Mark Completed'}</span>
          </button>
        </div>
      </main>
    </div>
  );
}
