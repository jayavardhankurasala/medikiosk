import React, { useState, useEffect } from 'react';
import KioskLayout from './components/common/KioskLayout';

// Kiosk Screens
import Screen1Splash from './components/kiosk/Screen1Splash';
import Screen2Language from './components/kiosk/Screen2Language';
import Screen3Login from './components/kiosk/Screen3Login';
import Screen4Otp from './components/kiosk/Screen4Otp';
import Screen5Welcome from './components/kiosk/Screen5Welcome';
import Screen6RoleSelect from './components/kiosk/Screen6RoleSelect';
import Screen7IntakeMenu from './components/kiosk/Screen7IntakeMenu';
import Screen8Consent from './components/kiosk/Screen8Consent';
import Screen9VoiceChat from './components/kiosk/Screen9VoiceChat';
import Screen10DocUpload from './components/kiosk/Screen10DocUpload';
import Screen11Review from './components/kiosk/Screen11Review';
import Screen12Success from './components/kiosk/Screen12Success';
import PatientTimeline from './components/common/PatientTimeline';

// Staff Portals
import NurseQueue from './components/portal/NurseQueue';
import DoctorSummary from './components/portal/DoctorSummary';
import ProfileUI from './components/portal/ProfileUI';

import { useMultilingualVoice } from './hooks/useMultilingualVoice';
import { getTheme } from './styles/theme';
import { useLanguage } from './context/LanguageContext';

export default function App() {
  const { language, setLanguage, t, languages } = useLanguage();
  const selectedLanguageCode = language;
  const selectedLanguageName = (languages.find((l) => l.id === language) || languages[0]).name;

  // REQUIREMENT 1: Language First - Set initial screen to 2 (Screen2Language)
  const [currentStep, setCurrentStep] = useState(2);
  const [activePortal, setActivePortal] = useState(null); // 'nurse' | 'doctor' | null

  // Global Theme Mode: 'light' | 'dark' | 'contrast'
  const [themeMode, setThemeMode] = useState('light');
  const themeObj = getTheme(themeMode);

  // Patient & Session State
  const [patient, setPatient] = useState({
    id: 'p-initial',
    name: 'Ramesh Kumar',
    phone: '9876543210',
    age: 42,
    gender: 'Male',
    abhaId: '91-4567-8901-2345',
  });
  const [authToken, setAuthToken] = useState(null);
  const [visitId, setVisitId] = useState('visit-kiosk-live-1');

  // Intake Data
  const [chiefComplaint, setChiefComplaint] = useState('Fever and cough for 3 days');
  const [conversationTurns, setConversationTurns] = useState([
    { role: 'assistant', content: 'What health concern brings you here today?' },
    { role: 'user', content: 'Severe fever and cough for 3 days.' },
  ]);
  const [documents, setDocuments] = useState([
    { name: 'prescription_recent.jpg', size: '1.2 MB', status: 'Digitized ✓' },
  ]);
  const [tokenNumber, setTokenNumber] = useState('001');

  const voice = useMultilingualVoice(selectedLanguageCode);

  // REQUIREMENT 1: Global TTS - Read primary heading of screen upon mounting
  useEffect(() => {
    if (activePortal) return;

    const screenHeadingsMap = {
      1: t.ttsHeadings?.welcome || 'Welcome to MediKiosk.',
      2: t.ttsHeadings?.language || 'Please select your preferred language.',
      3: t.ttsHeadings?.login || 'Please log in with your phone or ABHA number.',
      4: 'Please enter the 6-digit OTP verification code.',
      5: t.ttsHeadings?.welcome || 'Welcome! Let us understand your health better.',
      6: t.ttsHeadings?.roleSelect || 'Please choose your role to continue.',
      7: t.ttsHeadings?.intakeMenu || 'What would you like to do today?',
      8: t.ttsHeadings?.consent || 'Please review and accept health data consent.',
      9: t.ttsHeadings?.voiceChat || 'What brings you here today?',
      10: t.ttsHeadings?.docUpload || 'Please photograph or upload your medical documents.',
      11: t.ttsHeadings?.review || 'Please review your conversation transcript.',
      12: t.ttsHeadings?.success || 'Your information has been submitted.',
    };

    const textToSpeak = screenHeadingsMap[currentStep];
    if (textToSpeak) {
      // Delay slightly for smooth transition
      const timer = setTimeout(() => {
        voice.speakText(textToSpeak, selectedLanguageCode);
      }, 350);
      return () => clearTimeout(timer);
    }
  }, [currentStep, activePortal, selectedLanguageCode]);

  // Back button handler
  const handleBack = () => {
    if (activePortal) {
      setActivePortal(null);
      return;
    }
    if (currentStep === 13 || currentStep === 14) {
      setCurrentStep(7); // Return to Intake Menu
      return;
    }
    if (currentStep === 3) {
      setCurrentStep(2); // Go back to language
    } else if (currentStep > 2) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Staff Portal role bypass
  const handleRoleSelect = (roleId) => {
    if (roleId === 'nurse') {
      setActivePortal('nurse');
    } else if (roleId === 'doctor') {
      setActivePortal('doctor');
    } else if (roleId === 'admin') {
      alert('Admin facility management panel: Connected to OPD Server.');
    } else {
      setActivePortal(null);
      setCurrentStep(7);
    }
  };

  // Create Visit API Helper
  const createVisit = async (patientId, tokenOverride) => {
    const token = tokenOverride || authToken;
    try {
      const res = await fetch('/api/visits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          patientId: patientId || patient?.id,
          clinicalMode: 'ALLOPATHIC',
          language: selectedLanguageCode,
        }),
      });
      const data = await res.json();
      if (data.success && data.visitId) {
        setVisitId(data.visitId);
        return data.visitId;
      }
    } catch (err) {
      console.warn('Could not create DB visit record via API, using fallback ID:', err);
    }
  };

  // Login / Registration Success Callback
  const handleLoginSuccess = (patientData, token) => {
    setPatient(patientData);
    setAuthToken(token);
    createVisit(patientData?.id, token);
    setCurrentStep(5); // Go to Welcome Screen
  };

  // Reset to Language First Screen
  const handleResetToStart = () => {
    setActivePortal(null);
    setCurrentStep(2);
    setConversationTurns([]);
    setDocuments([{ name: 'prescription_recent.jpg', size: '1.2 MB', status: 'Digitized ✓' }]);
  };

  return (
    <KioskLayout
      patient={patient}
      onProfileClick={() => {
        setActivePortal(null);
        setCurrentStep(14); // Open ProfileUI (Settings/Demographics & Photo edit)
      }}
      onBack={handleBack}
      showBack={currentStep > 2 && !activePortal}
      currentLanguageCode={selectedLanguageCode}
      currentLanguageName={selectedLanguageName}
      onLanguageClick={() => setCurrentStep(2)}
      onRoleSelect={handleRoleSelect}
      themeMode={themeMode}
      onToggleTheme={(newMode) => setThemeMode(newMode)}
      themeObj={themeObj}
    >
      {/* 1. CLINICAL STAFF PORTALS (Bypasses Patient Flow) */}
      {activePortal === 'nurse' && (
        <NurseQueue
          onBackToKiosk={handleResetToStart}
          onSelectPatient={(p) => {
            setPatient({ name: p.name, ageGender: p.ageGender, token: p.token });
            setActivePortal('doctor');
          }}
        />
      )}

      {activePortal === 'doctor' && (
        <DoctorSummary
          patient={{
            token: `#${tokenNumber}`,
            name: patient?.name || 'Ramesh K.',
            ageGender: `${patient?.age || 42}${patient?.gender ? patient.gender[0] : 'M'}`,
            complaint: chiefComplaint,
          }}
          onBackToKiosk={handleResetToStart}
          onBackToQueue={() => setActivePortal('nurse')}
        />
      )}

      {/* 2. PATIENT KIOSK ROUTING */}
      {!activePortal && (
        <>
          {/* Step 1: Splash Screen (Optional or accessible via home) */}
          {currentStep === 1 && (
            <Screen1Splash onNext={() => setCurrentStep(2)} />
          )}

          {/* Step 2: Language Selection (INITIAL ROUTE) */}
          {currentStep === 2 && (
            <Screen2Language
              selectedLanguage={selectedLanguageCode}
              onSelectLanguage={(code) => {
                setLanguage(code);
              }}
              onNext={() => setCurrentStep(3)}
              onPlayAudioPrompt={(code) => {
                const sample = {
                  'en-IN': 'Welcome to MediKiosk.',
                  'hi-IN': 'मेडीकियोस्क में आपका स्वागत है।',
                  'te-IN': 'మెడికియోస్క్‌కు స్వాగతం.',
                };
                voice.speakText(sample[code] || sample['en-IN'], code);
              }}
            />
          )}

          {/* Step 3: Smart Login & Registration */}
          {currentStep === 3 && (
            <Screen3Login
              onLoginSuccess={handleLoginSuccess}
              languageCode={selectedLanguageCode}
              themeObj={themeObj}
            />
          )}

          {/* Step 4: OTP Verification (Fallback if accessed directly) */}
          {currentStep === 4 && (
            <Screen4Otp
              phoneNumber={patient.phone}
              mockOtp="123456"
              onVerify={(enteredOtp, token, patientData) => {
                if (token) setAuthToken(token);
                if (patientData) setPatient(patientData);
                createVisit(patientData?.id || patient?.id, token);
                setCurrentStep(5);
              }}
            />
          )}

          {/* Step 5: Welcome Screen */}
          {currentStep === 5 && (
            <Screen5Welcome
              userName={patient?.name}
              onGetStarted={() => setCurrentStep(7)} // Proceed to Intake Menu
            />
          )}

          {/* Step 6: Role Selection */}
          {currentStep === 6 && (
            <Screen6RoleSelect onSelectRole={handleRoleSelect} />
          )}

          {/* Step 7: Patient Intake Menu */}
          {currentStep === 7 && (
            <Screen7IntakeMenu
              onStartNewVisit={() => {
                createVisit(patient?.id);
                setCurrentStep(8);
              }}
              onUploadDocsOnly={() => setCurrentStep(10)}
              onViewRecords={() => setCurrentStep(13)}
              onEditProfile={() => setCurrentStep(14)}
              onBackHome={handleResetToStart}
            />
          )}

          {/* Step 8: Consent for Health Data Use (DPDP Act) */}
          {currentStep === 8 && (
            <Screen8Consent
              onAgree={() => setCurrentStep(9)}
              onReadFullConsent={() =>
                alert('DPDP Act 2023: Health data is processed solely for outpatient case-taking.')
              }
            />
          )}

          {/* Step 9: Advanced AI Voice Chat (Confirmation Loop + Multilingual TTS) */}
          {currentStep === 9 && (
            <Screen9VoiceChat
              visitId={visitId}
              authToken={authToken}
              selectedLanguage={selectedLanguageCode}
              clinicalMode="ALLOPATHIC"
              voice={voice}
              themeObj={themeObj}
              onUpdateComplaint={(c) => setChiefComplaint(c)}
              onSaveConversationTurn={(turn) => setConversationTurns((prev) => [...prev, turn])}
              onProceed={() => setCurrentStep(10)}
            />
          )}

          {/* Step 10: Document Upload (Dual Options + Moving Scan-Line Animation) */}
          {currentStep === 10 && (
            <Screen10DocUpload
              visitId={visitId}
              authToken={authToken}
              languageCode={selectedLanguageCode}
              themeObj={themeObj}
              onDocumentsUpdated={(docs) => setDocuments(docs)}
              onContinue={(docs) => {
                if (docs) setDocuments(docs);
                setCurrentStep(11);
              }}
            />
          )}

          {/* Step 11: Review Screen (Privacy Protected: Only Transcript & Uploaded Documents) */}
          {currentStep === 11 && (
            <Screen11Review
              conversationTurns={conversationTurns}
              uploadedDocuments={documents}
              languageCode={selectedLanguageCode}
              themeObj={themeObj}
              onSubmitToDoctor={() => setCurrentStep(12)}
              onGoBack={() => setCurrentStep(10)}
            />
          )}

          {/* Step 12: Success Screen */}
          {currentStep === 12 && (
            <Screen12Success
              tokenNumber={tokenNumber}
              patientName={patient?.name || 'Ramesh K.'}
              onBackToHome={handleResetToStart}
            />
          )}

          {/* Step 13: Patient Previous Records & Chronological Timeline */}
          {currentStep === 13 && (
            <PatientTimeline
              patientId={patient?.id || 'p-001'}
              patientName={patient?.name || 'Ramesh Kumar'}
              authToken={authToken}
              onBack={() => setCurrentStep(7)}
              themeObj={themeObj}
            />
          )}

          {/* Step 14: Patient Profile & Demographics Settings */}
          {currentStep === 14 && (
            <ProfileUI
              patient={patient}
              authToken={authToken}
              onProfileUpdated={(updated) => setPatient((prev) => ({ ...prev, ...updated }))}
              onBack={() => setCurrentStep(7)}
              themeObj={themeObj}
              isNurseView={false}
            />
          )}
        </>
      )}
    </KioskLayout>
  );
}
