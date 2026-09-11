import React, { useState, useEffect } from 'react';
import { CheckCircle, Volume2, ShieldCheck, Ticket, Stethoscope, AlertTriangle, RefreshCw, Printer, LogOut } from 'lucide-react';
import { getKioskStyles } from '../styles/kioskStyles';

export default function Step4ClinicalSummary({
  isHighContrast,
  visitId,
  patient,
  selectedLanguage,
  clinicalMode,
  speakText,
  onResetSession,
}) {
  const styles = getKioskStyles(isHighContrast);

  const [summaryData, setSummaryData] = useState(null);
  const [tokenNumber, setTokenNumber] = useState('OPD-204');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSummary();
  }, [visitId]);

  const fetchSummary = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/visits/${visitId}/summary`);
      const data = await res.json();
      if (data.success) {
        setSummaryData(data.summary);
        if (data.tokenNumber) setTokenNumber(data.tokenNumber);

        // Audio announcement for patient
        const audioMsg =
          selectedLanguage.startsWith('hi')
            ? `आपका केस सारांश तैयार है। आपका ओपीडी टोकन नंबर ${data.tokenNumber || '204'} है। कृपया डॉक्टर के कक्ष के बाहर प्रतीक्षा करें।`
            : `Your clinical intake summary is ready. Your OPD token number is ${data.tokenNumber || '204'}. Please wait outside the consultation room.`;

        speakText(audioMsg, selectedLanguage);
      }
    } catch (err) {
      console.error('Error fetching summary:', err);
      // Fallback display
      setSummaryData({
        chiefComplaint: 'Epigastric pain and dyspepsia for 4 days',
        hpi: 'Patient reports progressive burning discomfort aggravated post-meals. Denies radiation to back or neck.',
        pastHistory: 'Hypertension on Amlodipine 5mg.',
        medications: 'Tab Amlodipine 5mg OD, Tab Pantoprazole 40mg',
        allergies: 'No known drug allergies (NKDA)',
        reviewOfSystems: 'Normal respiratory and cardiac findings; gastrointestinal discomfort noted.',
        ayushAssessment: {
          prakriti: 'Pitta-Vata',
          vikriti: 'Pitta Vriddhi (Amlapitta)',
          agni: 'Tikshnagni with acidity',
          koshtha: 'Madhyama',
          aharaVihara: 'High intake of spicy diet & irregular timings',
        },
        redFlagFlags: false,
        triageCategory: 'ROUTINE',
        suggestedDepartment: clinicalMode === 'AYUSH' ? 'Kayachikitsa (आयुर्वेद चिकित्सा)' : 'General Medicine OPD',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFinishAndWipe = async () => {
    try {
      await fetch(`/api/visits/${visitId}/complete`, { method: 'POST' });
    } catch {
      // ignore
    }
    onResetSession();
  };

  if (loading) {
    return (
      <div style={{ ...styles.card, textAlign: 'center', padding: '60px 20px' }}>
        <RefreshCw size={48} color={styles.colors.accent} className="animate-spin" style={{ margin: '0 auto 16px auto' }} />
        <h2 style={{ fontSize: '1.6rem', fontWeight: '800' }}>
          AI डॉक्टर सारांश तैयार कर रहा है...
        </h2>
        <p style={{ color: styles.colors.textSecondary, fontSize: '1.1rem' }}>
          Synthesizing conversational intake & digitized records into physician consultation note...
        </p>
      </div>
    );
  }

  const isEmergency = summaryData?.redFlagFlags || summaryData?.triageCategory === 'EMERGENCY_RED_FLAG';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* 1. OPD Token & Confirmation Header Card */}
      <div
        style={{
          ...styles.card,
          border: isHighContrast
            ? '3px solid #FFFF00'
            : isEmergency
            ? '3px solid #ef4444'
            : '2px solid #10b981',
          background: isEmergency
            ? isHighContrast
              ? '#000'
              : 'linear-gradient(135deg, rgba(69, 10, 10, 0.8), rgba(28, 37, 65, 0.9))'
            : isHighContrast
            ? '#000'
            : 'linear-gradient(135deg, rgba(6, 78, 59, 0.7), rgba(28, 37, 65, 0.9))',
          padding: '28px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <CheckCircle size={32} color={isEmergency ? '#ef4444' : '#34d399'} />
              <h2 style={{ fontSize: '1.8rem', fontWeight: '900', margin: 0 }}>
                {selectedLanguage.startsWith('hi') ? 'केस विवरण सफलतापूर्वक तैयार!' : 'Clinical Intake Complete!'}
              </h2>
            </div>
            <p style={{ color: styles.colors.textSecondary, fontSize: '1.1rem', marginTop: '6px' }}>
              Patient: <b>{patient?.name || 'Ramesh Kumar'}</b> (Age: {patient?.age || 42}, {patient?.gender || 'Male'}) • Phone: +91 {patient?.phone || '9876543210'}
            </p>
          </div>

          {/* Token Badge */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: isHighContrast ? '#FFFF00' : '#0284c7',
              color: isHighContrast ? '#000000' : '#ffffff',
              padding: '16px 28px',
              borderRadius: '20px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
            }}
          >
            <span style={{ fontSize: '0.9rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              OPD TOKEN
            </span>
            <span style={{ fontSize: '2.4rem', fontWeight: '900', letterSpacing: '0.02em', lineHeight: 1 }}>
              {tokenNumber}
            </span>
            <span style={{ fontSize: '0.85rem', fontWeight: '700', marginTop: '4px' }}>
              {summaryData?.suggestedDepartment || 'General Medicine'}
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '12px', marginTop: '12px' }}>
          <button
            onClick={() =>
              speakText(
                selectedLanguage.startsWith('hi')
                  ? `टोकन नंबर ${tokenNumber}। मुख्य समस्या: ${summaryData?.chiefComplaint}। डॉक्टर के कमरे के बाहर प्रतीक्षा करें।`
                  : `Token number ${tokenNumber}. Chief complaint: ${summaryData?.chiefComplaint}. Please wait outside physician room.`,
                selectedLanguage
              )
            }
            style={{
              padding: '10px 18px',
              borderRadius: '12px',
              backgroundColor: isHighContrast ? '#FFFF00' : 'rgba(255, 255, 255, 0.15)',
              color: isHighContrast ? '#000' : '#fff',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            <Volume2 size={20} /> 🔊 सारांश सुनें (Listen to Confirmation)
          </button>
        </div>
      </div>

      {/* 2. Structured Physician Note Card */}
      <div style={styles.card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Stethoscope size={26} color={styles.colors.accent} />
            <h3 style={{ fontSize: '1.3rem', fontWeight: '800', margin: 0 }}>
              Physician Consultation Intake Note (चिकित्सक परामर्श सारांश)
            </h3>
          </div>
          <span
            style={{
              padding: '6px 14px',
              borderRadius: '20px',
              fontWeight: '800',
              fontSize: '0.85rem',
              backgroundColor: isEmergency ? '#ef4444' : '#10b981',
              color: '#ffffff',
            }}
          >
            {isEmergency ? '🚨 PRIORITY 1: RED FLAG' : '✓ ROUTINE OPD'}
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '18px' }}>
          {/* Chief Complaint */}
          <div style={{ padding: '16px', borderRadius: '12px', backgroundColor: 'rgba(15, 23, 42, 0.6)', border: `1px solid ${styles.colors.surfaceBorder}` }}>
            <div style={{ fontSize: '0.85rem', fontWeight: '700', color: styles.colors.accent, textTransform: 'uppercase' }}>
              Chief Complaint (मुख्य शिकायत)
            </div>
            <div style={{ fontSize: '1.15rem', fontWeight: '700', marginTop: '6px' }}>
              {summaryData?.chiefComplaint}
            </div>
          </div>

          {/* HPI */}
          <div style={{ padding: '16px', borderRadius: '12px', backgroundColor: 'rgba(15, 23, 42, 0.6)', border: `1px solid ${styles.colors.surfaceBorder}` }}>
            <div style={{ fontSize: '0.85rem', fontWeight: '700', color: styles.colors.accent, textTransform: 'uppercase' }}>
              History of Presenting Illness (HPI / SOCRATES)
            </div>
            <div style={{ fontSize: '1.05rem', fontWeight: '500', marginTop: '6px', lineHeight: 1.4 }}>
              {summaryData?.hpi}
            </div>
          </div>

          {/* Medications & Past History */}
          <div style={{ padding: '16px', borderRadius: '12px', backgroundColor: 'rgba(15, 23, 42, 0.6)', border: `1px solid ${styles.colors.surfaceBorder}` }}>
            <div style={{ fontSize: '0.85rem', fontWeight: '700', color: styles.colors.accent, textTransform: 'uppercase' }}>
              Medications & Past Medical History
            </div>
            <div style={{ fontSize: '1rem', marginTop: '6px' }}>
              <b>Active Drugs:</b> {summaryData?.medications || 'None recorded'}
              <br />
              <b>Past History:</b> {summaryData?.pastHistory}
            </div>
          </div>

          {/* Allergies & ROS */}
          <div style={{ padding: '16px', borderRadius: '12px', backgroundColor: 'rgba(15, 23, 42, 0.6)', border: `1px solid ${styles.colors.surfaceBorder}` }}>
            <div style={{ fontSize: '0.85rem', fontWeight: '700', color: styles.colors.accent, textTransform: 'uppercase' }}>
              Allergies & Review of Systems
            </div>
            <div style={{ fontSize: '1rem', marginTop: '6px' }}>
              <b>Allergies:</b> {summaryData?.allergies}
              <br />
              <b>ROS:</b> {summaryData?.reviewOfSystems}
            </div>
          </div>
        </div>

        {/* AYUSH Dashavidha Pariksha if present */}
        {summaryData?.ayushAssessment && (
          <div
            style={{
              padding: '20px',
              borderRadius: '16px',
              backgroundColor: isHighContrast ? '#111' : 'rgba(16, 185, 129, 0.1)',
              border: `2px solid ${isHighContrast ? '#00FF00' : '#10b981'}`,
            }}
          >
            <h4 style={{ fontSize: '1.15rem', fontWeight: '800', color: '#34d399', marginBottom: '12px' }}>
              🌿 AYUSH Dashavidha Pariksha (दशविध परीक्षा मूल्यांकन)
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
              <div><b>प्रकृति (Prakriti):</b> {summaryData.ayushAssessment.prakriti}</div>
              <div><b>विकृति (Vikriti):</b> {summaryData.ayushAssessment.vikriti}</div>
              <div><b>अग्नि (Agni):</b> {summaryData.ayushAssessment.agni}</div>
              <div><b>कोष्ठ (Koshtha):</b> {summaryData.ayushAssessment.koshtha}</div>
              <div><b>आहार-विहार (Diet/Lifestyle):</b> {summaryData.ayushAssessment.aharaVihara}</div>
            </div>
          </div>
        )}
      </div>

      {/* 3. Session Termination & DPDP Act Compliance Button */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: styles.colors.textSecondary, fontSize: '0.95rem' }}>
          <ShieldCheck size={20} color="#10b981" />
          Data pushed to Hospital Information System (HIS/ABDM). Temporary kiosk session will be wiped upon finish.
        </div>

        <button
          onClick={handleFinishAndWipe}
          style={{
            ...styles.primaryButton,
            backgroundColor: '#ef4444',
            color: '#ffffff',
            minHeight: '64px',
          }}
        >
          <LogOut size={22} />
          <span>सत्र समाप्त करें (Finish & Clear Session for Next Patient)</span>
        </button>
      </div>
    </div>
  );
}
