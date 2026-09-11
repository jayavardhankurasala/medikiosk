import React, { createContext, useContext, useState, useMemo } from 'react';

export const ALLOWED_LANGUAGES = ['en-IN', 'hi-IN', 'te-IN'];

export const LANGUAGE_OPTIONS = [
  { id: 'en-IN', name: 'English', script: 'English', icon: '🌐' },
  { id: 'hi-IN', name: 'Hindi', script: 'हिंदी', icon: '🇮🇳' },
  { id: 'te-IN', name: 'Telugu', script: 'తెలుగు', icon: '🗣️' },
];

export const DICTIONARY = {
  'en-IN': {
    code: 'en-IN',
    name: 'English',
    brandSubtitle: 'Your Health Story, Simplified',
    continue: 'Continue',
    enterOtp: 'Enter OTP',
    tapToSpeak: 'Tap to speak',
    cameraCapture: 'Camera Capture',
    symptomAnalysisComplete: 'Symptom analysis complete. Proceeding to document upload...',

    headings: {
      splash: 'MediKiosk',
      language: 'Select Your Language',
      login: 'Patient Login & Verification',
      otp: 'Enter Verification Code',
      welcome: 'Welcome to MediKiosk!',
      roleSelect: 'Who are you?',
      intakeMenu: 'What would you like to do?',
      consent: 'Consent for Health Data Use',
      voiceChat: 'AI Voice Interaction',
      docUpload: 'Upload Your Medical Documents',
      review: 'Review Your Intake Transcript',
      success: 'Your information has been submitted!',
    },

    subtitles: {
      language: 'Choose your preferred language for voice and touch interaction',
      welcome: "Let's take a few minutes to understand your health better.",
      roleSelect: 'Select your portal to continue',
      intakeMenu: 'Select an option below to proceed',
      review: 'Verify your recorded symptoms and uploaded documents before sending to the doctor.',
      success: 'You will be called shortly. Thank you!',
    },

    ttsHeadings: {
      welcome: 'Welcome! Let us take a few minutes to understand your health better.',
      language: 'Please select your preferred language.',
      login: 'Please enter your ABHA number or 10-digit mobile number to log in.',
      otp: 'Please enter the 6-digit OTP verification code.',
      roleSelect: 'Please choose your role to continue.',
      intakeMenu: 'What would you like to do today?',
      consent: 'Please review and accept the health data consent terms under the DPDP Act.',
      voiceChat: 'What brings you here today? Please speak or tap to answer.',
      docUpload: 'Please take a photo or upload your prior prescriptions and medical reports.',
      review: 'Please review the transcript of your conversation and attached files.',
      success: 'Your case intake has been successfully submitted to the attending physician.',
    },

    // Splash Screen
    splashBadge: 'AI-Powered Pre-Consultation Kiosk',
    splashTap: 'Tap anywhere to start',
    splashFooter: 'Accessible • Inclusive • Smarter Care',

    // Language Screen
    audioGuideHint: "🔊 We'll guide you in your language (Tap to test audio)",

    // Login Screen
    smartInputLabel: 'Enter ABHA ID or Phone Number',
    smartInputPlaceholder: '10-digit mobile or 14-digit ABHA ID',
    detectedPhone: '10-digit Phone Number detected',
    detectedAbha: '14-digit ABHA ID detected',
    sendOtp: 'Send OTP',
    resendOtp: 'Resend OTP',
    resendOtpIn: 'Resend OTP in',
    verifyOtp: 'Verify & Login',
    registerBtn: 'Register New Patient',
    registerTitle: 'New Patient Registration',
    fullName: 'Full Name',
    age: 'Age',
    gender: 'Gender',
    male: 'Male',
    female: 'Female',
    other: 'Other',
    phoneNumber: '10-digit Phone Number',
    submitRegister: 'Create Patient & Generate ABHA',
    or: 'OR',
    takePhoto: 'Take Patient Photo',
    retakePhoto: 'Retake Photo',
    usePhoto: 'Use This Photo',
    cancel: 'Cancel',

    // OTP Screen
    otpSentNotice: 'We have sent a 6-digit OTP to',
    verifyAndContinue: 'Verify & Continue',
    fillDemoOtp: 'Quick Demo: Fill OTP 123456',
    otpInvalidError: 'Please enter all 6 digits of the OTP.',

    // Welcome Screen
    getStarted: 'Get Started',
    intakeReadyBadge: 'Patient Intake Ready',

    // Roles Screen
    roles: {
      patient: { title: 'Patient', desc: 'Start your health intake' },
      nurse: { title: 'Nurse', desc: 'Record vitals & manage queue' },
      doctor: { title: 'Doctor', desc: 'View patient summaries' },
      admin: { title: 'Admin', desc: 'System management' },
    },

    // Intake Menu Screen
    menuItems: {
      newVisit: { title: 'Start New Visit', desc: 'Answer a few questions with AI' },
      uploadDocs: { title: 'Upload Medical Documents', desc: 'Prescriptions, lab reports, discharge summaries' },
      viewRecords: { title: 'View My Previous Records', desc: 'Your ABHA health timeline' },
      editProfile: { title: 'My Profile & Baseline Vitals', desc: 'Update height, weight & demographic details' },
    },

    // Consent Screen
    dpdpNotice: 'Digital Personal Data Protection (DPDP) Act 2023',
    consentPara: 'I allow MediKiosk to collect, process and securely store my health information for pre-consultation and treatment purposes. Your data is encrypted and temporary session records are wiped after your consult.',
    consentCheck1: 'I consent to sharing my clinical history with hospital healthcare providers.',
    consentCheck2: 'I consent to automated optical character recognition (OCR) on uploaded medical reports.',
    agreeAndContinue: 'I Agree & Continue',
    readFullTerms: 'Read Full Privacy Policy',

    // Voice Chat Screen
    initialGreeting: 'What health concern brings you here today?',
    defaultPills: ['Fever / Cough', 'Stomach Pain / Acidity', 'Chest Pain / Shortness of Breath', 'Joint Pain'],
    youSaid: 'You said:',
    confirmPrompt: 'Is this information correct?',
    yes: 'Yes, Send',
    no: 'No, Cancel',
    edit: 'Edit Text',
    listeningNow: 'Listening... Speak now',
    typePlaceholder: 'Or type your health symptom here...',
    listenAgain: 'Listen again',
    proceedToDocs: 'Proceed to Document Upload',
    intakeRecorded: 'Intake Recorded',
    skip: 'Skip',

    // Document Upload Screen
    uploadDevice: 'Upload from Device',
    analyzingDocs: 'Analyzing medical records with Gemini Vision OCR...',
    attachedFiles: 'Attached Documents',
    digitizedBadge: 'Digitized ✓',
    scanningStatus: 'Scanning...',
    startCamera: 'Open Camera',
    capturePhoto: 'Capture Photo',
    closeCamera: 'Close Camera',
    continueToReview: 'Continue to Review',

    // Review Screen
    transcriptTitle: 'Transcript of Conversation',
    patientRole: 'Patient',
    aiRole: 'AI Assistant',
    submitToDoctor: 'Submit to Doctor',
    goBack: 'Go Back',

    // Success Screen
    opdQueueToken: 'OPD QUEUE TOKEN',
    tokenNumber: 'Token Number',
    patientNameLabel: 'Patient Name',
    estimatedWaitTime: 'Estimated Wait Time',
    approxWaitMins: 'Approx 10-15 mins',
    backToHome: 'Back to Start',

    // Header & Staff
    staffLogin: 'Staff Login',
    themeLight: 'Light',
    themeDark: 'Dark',
    themeContrast: 'High Contrast',
  },

  'hi-IN': {
    code: 'hi-IN',
    name: 'हिंदी',
    brandSubtitle: 'आपकी स्वास्थ्य कहानी, सरल व सुरक्षित',
    continue: 'जारी रखें',
    enterOtp: 'ओटीपी दर्ज करें',
    tapToSpeak: 'बोलने के लिए टैप करें',
    cameraCapture: 'कैमरा फोटो',
    symptomAnalysisComplete: 'लक्षण विश्लेषण पूर्ण हुआ। दस्तावेज़ अपलोड पर आगे बढ़ रहे हैं...',

    headings: {
      splash: 'मेडीकियोस्क',
      language: 'अपनी भाषा चुनें',
      login: 'मरीज लॉगिन व सत्यापन',
      otp: 'ओटीपी सत्यापन कोड दर्ज करें',
      welcome: 'मेडीकियोस्क में आपका स्वागत है!',
      roleSelect: 'आप कौन हैं?',
      intakeMenu: 'आप क्या करना चाहते हैं?',
      consent: 'स्वास्थ्य डेटा उपयोग सहमति',
      voiceChat: 'एआई आवाज बातचीत',
      docUpload: 'अपने मेडिकल दस्तावेज़ अपलोड करें',
      review: 'अपनी बातचीत की समीक्षा करें',
      success: 'आपकी जानकारी जमा कर दी गई है!',
    },

    subtitles: {
      language: 'आवाज और टच इंटरैक्शन के लिए अपनी पसंदीदा भाषा चुनें',
      welcome: 'आइए आपके स्वास्थ्य को बेहतर समझने के लिए कुछ मिनट दें।',
      roleSelect: 'जारी रखने के लिए अपना पोर्टल चुनें',
      intakeMenu: 'आगे बढ़ने के लिए नीचे एक विकल्प चुनें',
      review: 'डॉक्टर को भेजने से पहले अपने दर्ज किए गए लक्षणों और अपलोड किए गए दस्तावेज़ों की जांच करें।',
      success: 'आपको जल्द ही बुलाया जाएगा। धन्यवाद!',
    },

    ttsHeadings: {
      welcome: 'स्वागत है! आइए आपके स्वास्थ्य को बेहतर समझने के लिए कुछ मिनट दें।',
      language: 'कृपया अपनी पसंदीदा भाषा चुनें।',
      login: 'लॉगिन करने के लिए कृपया अपना आभा नंबर या 10 अंकों का मोबाइल नंबर दर्ज करें।',
      otp: 'कृपया 6 अंकों का ओटीपी सत्यापन कोड दर्ज करें।',
      roleSelect: 'कृपया जारी रखने के लिए अपनी भूमिका चुनें।',
      intakeMenu: 'आज आप क्या करना चाहते हैं?',
      consent: 'कृपया डीपीडीपी अधिनियम के तहत स्वास्थ्य डेटा सहमति की समीक्षा करें।',
      voiceChat: 'आज आप क्या तकलीफ लेकर आए हैं? कृपया बोलकर या टैप करके बताएं।',
      docUpload: 'कृपया अपने पुराने पर्चे या रिपोर्ट की फोटो लें या अपलोड करें।',
      review: 'कृपया डॉक्टर को भेजने से पहले अपनी बातचीत और फाइलों की समीक्षा करें।',
      success: 'आपकी केस इनटेक जानकारी डॉक्टर को सफलतापूर्वक भेज दी गई है।',
    },

    splashBadge: 'एआई-संचालित पूर्व-परामर्श कियोस्क',
    splashTap: 'शुरू करने के लिए कहीं भी टैप करें',
    splashFooter: 'सुलभ • समावेशी • बेहतर स्वास्थ्य सेवा',

    audioGuideHint: '🔊 हम आपकी भाषा में आपका मार्गदर्शन करेंगे (ऑडियो जांचें)',

    smartInputLabel: 'आभा आईडी (ABHA ID) या फोन नंबर दर्ज करें',
    smartInputPlaceholder: '10 अंकों का मोबाइल या 14 अंकों की आभा आईडी',
    detectedPhone: '10 अंकों का मोबाइल नंबर पाया गया',
    detectedAbha: '14 अंकों की आभा आईडी पाई गई',
    sendOtp: 'ओटीपी भेजें',
    resendOtp: 'ओटीपी पुनः भेजें',
    resendOtpIn: 'ओटीपी पुनः भेजें:',
    verifyOtp: 'सत्यापित करें और लॉगिन करें',
    registerBtn: 'नया मरीज पंजीकरण',
    registerTitle: 'नया मरीज पंजीकरण फॉर्म',
    fullName: 'पूरा नाम',
    age: 'उम्र',
    gender: 'लिंग',
    male: 'पुरुष',
    female: 'महिला',
    other: 'अन्य',
    phoneNumber: '10 अंकों का मोबाइल नंबर',
    submitRegister: 'पंजीकरण करें व आभा बनाएं',
    or: 'या',
    takePhoto: 'मरीज की फोटो लें',
    retakePhoto: 'दोबारा फोटो लें',
    usePhoto: 'इस फोटो का उपयोग करें',
    cancel: 'रद्द करें',

    otpSentNotice: 'हमने 6-अंकों का ओटीपी भेजा है:',
    verifyAndContinue: 'सत्यापित करें और आगे बढ़ें',
    fillDemoOtp: 'डेमो: 123456 भरें',
    otpInvalidError: 'कृपया ओटीपी के सभी 6 अंक दर्ज करें।',

    getStarted: 'शुरू करें',
    intakeReadyBadge: 'मरीज इनटेक तैयार',

    roles: {
      patient: { title: 'मरीज', desc: 'स्वास्थ्य इनटेक शुरू करें' },
      nurse: { title: 'नर्स', desc: 'वाइटल्स दर्ज करें और कतार संभालें' },
      doctor: { title: 'डॉक्टर', desc: 'मरीज सारांश देखें' },
      admin: { title: 'एडमिन', desc: 'सिस्टम प्रबंधन' },
    },

    menuItems: {
      newVisit: { title: 'नई विजिट शुरू करें', desc: 'एआई के साथ कुछ प्रश्नों के उत्तर दें' },
      uploadDocs: { title: 'मेडिकल दस्तावेज़ अपलोड करें', desc: 'पर्चे, लैब रिपोर्ट, डिस्चार्ज सारांश' },
      viewRecords: { title: 'मेरा पिछला रिकॉर्ड देखें', desc: 'आपकी आभा स्वास्थ्य समयरेखा' },
      editProfile: { title: 'मेरी प्रोफाइल और वाइटल्स', desc: 'कद, वजन और जानकारी अपडेट करें' },
    },

    dpdpNotice: 'डिजिटल व्यक्तिगत डेटा संरक्षण (DPDP) अधिनियम 2023',
    consentPara: 'मैं मेडीकियोस्क को परामर्श और उपचार के उद्देश्य से मेरी स्वास्थ्य जानकारी सुरक्षित रूप से प्रोसेस करने की अनुमति देता/देती हूं। आपका डेटा एन्क्रिप्टेड है।',
    consentCheck1: 'मैं अस्पताल के स्वास्थ्य सेवा प्रदाताओं के साथ अपनी जानकारी साझा करने की सहमति देता/देती हूं।',
    consentCheck2: 'मैं अपलोड किए गए मेडिकल दस्तावेज़ों पर स्वचालित ओसीआर की सहमति देता/देती हूं।',
    agreeAndContinue: 'मैं सहमत हूँ और आगे बढ़ें',
    readFullTerms: 'पूरी गोपनीयता नीति पढ़ें',

    initialGreeting: 'नमस्ते! आज आप अस्पताल में क्या तकलीफ लेकर आए हैं?',
    defaultPills: ['बुखार / सर्दी', 'पेट में दर्द या जलन', 'छाती में दर्द / सांस में तकलीफ', 'जोड़ों का दर्द'],
    youSaid: 'आपने कहा:',
    confirmPrompt: 'क्या यह जानकारी सही है?',
    yes: 'हाँ, भेजें',
    no: 'नहीं, रद्द करें',
    edit: 'बदलें',
    listeningNow: 'सुन रहे हैं... अब बोलें',
    typePlaceholder: 'या अपनी समस्या यहाँ लिखें...',
    listenAgain: 'दोबारा सुनें',
    proceedToDocs: 'दस्तावेज़ अपलोड पर आगे बढ़ें',
    intakeRecorded: 'इनटेक दर्ज हुआ',
    skip: 'छोड़ें',

    uploadDevice: 'डिवाइस से अपलोड करें',
    analyzingDocs: 'एआई जेमिनी द्वारा मेडिकल रिकॉर्ड का विश्लेषण हो रहा है...',
    attachedFiles: 'संलग्न दस्तावेज़',
    digitizedBadge: 'डिजिटाइज़्ड ✓',
    scanningStatus: 'स्कैन हो रहा है...',
    startCamera: 'कैमरा चालू करें',
    capturePhoto: 'फोटो खींचें',
    closeCamera: 'कैमरा बंद करें',
    continueToReview: 'समीक्षा के लिए आगे बढ़ें',

    transcriptTitle: 'बातचीत का विवरण',
    patientRole: 'मरीज',
    aiRole: 'एआई सहायक',
    submitToDoctor: 'डॉक्टर को भेजें',
    goBack: 'पीछे जाएं',

    opdQueueToken: 'ओपीडी कतार टोकन',
    tokenNumber: 'टोकन नंबर',
    patientNameLabel: 'मरीज का नाम',
    estimatedWaitTime: 'अनुमानित प्रतीक्षा समय',
    approxWaitMins: 'लगभग 10-15 मिनट',
    backToHome: 'शुरुआत पर लौटें',

    staffLogin: 'स्टाफ लॉगिन',
    themeLight: 'लाइट मोड',
    themeDark: 'डार्क मोड',
    themeContrast: 'हाई कंट्रास्ट',
  },

  'te-IN': {
    code: 'te-IN',
    name: 'తెలుగు',
    brandSubtitle: 'మీ ఆరోగ్య సమాచారం, సులభతరం',
    continue: 'కొనసాగించండి',
    enterOtp: 'OTP నమోదు చేయండి',
    tapToSpeak: 'మాట్లాడటానికి ట్యాప్ చేయండి',
    cameraCapture: 'కెమెరా క్యాప్చర్',
    symptomAnalysisComplete: 'లక్షణాల విశ్లేషణ పూర్తయింది. పత్రాల అప్‌లోడ్‌కు వెళ్తున్నాము...',

    headings: {
      splash: 'మెడికియోస్క్',
      language: 'మీ భాషను ఎంచుకోండి',
      login: 'రోగి లాగిన్ & ధృవీకరణ',
      otp: 'OTP ధృవీకరణ కోడ్‌ను నమోదు చేయండి',
      welcome: 'మెడికియోస్క్‌కు స్వాగతం!',
      roleSelect: 'మీరు ఎవరు?',
      intakeMenu: 'మీరు ఏమి చేయాలనుకుంటున్నారు?',
      consent: 'ఆరోగ్య డేటా వినియోగ సమ్మతి',
      voiceChat: 'AI వాయిస్ సంభాషణ',
      docUpload: 'వైద్య పత్రాలను అప్‌లోడ్ చేయండి',
      review: 'మీ సంభాషణ వివరాలను సమీక్షించండి',
      success: 'మీ సమాచారం విజయవంతంగా సమర్పించబడింది!',
    },

    subtitles: {
      language: 'వాయిస్ మరియు టచ్ కోసం మీ ప్రాధాన్య భాషను ఎంచుకోండి',
      welcome: 'మీ ఆరోగ్యాన్ని బాగా అర్థం చేసుకోవడానికి కొన్ని ప్రశ్నలు అడుగుదాము.',
      roleSelect: 'కొనసాగడానికి మీ పోర్టల్‌ను ఎంచుకోండి',
      intakeMenu: 'ముందుకు వెళ్ళడానికి క్రింది ఎంపికను ఎంచుకోండి',
      review: 'డాక్టర్‌కు పంపే ముందు మీ నమోదిత లక్షణాలు మరియు పత్రాలను తనిఖీ చేయండి.',
      success: 'త్వరలో మిమ్మల్ని పిలుస్తారు. ధన్యవాదాలు!',
    },

    ttsHeadings: {
      welcome: 'స్వాగతం! మీ ఆరోగ్యాన్ని బాగా అర్థం చేసుకోవడానికి కొన్ని ప్రశ్నలు అడుగుదాము.',
      language: 'దయచేసి మీ ప్రాధాన్య భాషను ఎంచుకోండి.',
      login: 'లాగిన్ చేయడానికి మీ ఆభా లేదా 10 అంకెల మొబైల్ నంబర్‌ను నమోదు చేయండి.',
      otp: 'దయచేసి 6 అంకెల OTP ధృవీకరణ కోడ్‌ను నమోదు చేయండి.',
      roleSelect: 'దయచేసి కొనసాగడానికి మీ పాత్రను ఎంచుకోండి.',
      intakeMenu: 'ఈరోజు మీరు ఏమి చేయాలనుకుంటున్నారు?',
      consent: 'దయచేసి ఆరోగ్య డేటా సమ్మతి నిబంధనలను సమీక్షించండి.',
      voiceChat: 'ఈరోజు మీకు ఉన్న సమస్య ఏమిటి? మాట్లాడండి లేదా ట్యాప్ చేయండి.',
      docUpload: 'దయచేసి మీ మునుపటి ప్రిస్క్రిప్షన్లను అప్‌లోడ్ చేయండి.',
      review: 'దయచేసి డాక్టర్‌కు పంపే ముందు మీ వివరాలను పరిశీలించండి.',
      success: 'మీ సమాచారం డాక్టర్‌కు సమర్పించబడింది.',
    },

    splashBadge: 'AI-ఆధారిత ముందస్తు కన్సల్టేషన్ కియోస్క్',
    splashTap: 'ప్రారంభించడానికి ఎక్కడైనా ట్యాప్ చేయండి',
    splashFooter: 'అందుబాటు • అందరికీ సమానం • మెరుగైన వైద్యం',

    audioGuideHint: '🔊 మేము మీ భాషలో మీకు మార్గదర్శనం చేస్తాము (ఆడియో పరీక్షించండి)',

    smartInputLabel: 'ఆభా ఐడి (ABHA ID) లేదా మొబైల్ నంబర్ నమోదు చేయండి',
    smartInputPlaceholder: '10 అంకెల మొబైల్ లేదా 14 అంకెల ఆభా ఐడి',
    detectedPhone: '10 అంకెల మొబైల్ నంబర్ గుర్తించబడింది',
    detectedAbha: '14 అంకెల ఆభా ఐడి గుర్తించబడింది',
    sendOtp: 'OTP పంపండి',
    resendOtp: 'OTP మళ్ళీ పంపండి',
    resendOtpIn: 'OTP మళ్ళీ పంపండి:',
    verifyOtp: 'ధృవీకరించి లాగిన్ చేయండి',
    registerBtn: 'కొత్త రోగి నమోదు',
    registerTitle: 'కొత్త రోగి నమోదు ఫారం',
    fullName: 'పూర్తి పేరు',
    age: 'వయస్సు',
    gender: 'లింగం',
    male: 'పురుషుడు',
    female: 'స్త్రీ',
    other: 'ఇతర',
    phoneNumber: '10 అంకెల మొబైల్ నంబర్',
    submitRegister: 'నమోదు చేసి ఆభా ఐడి పొందండి',
    or: 'లేదా',
    takePhoto: 'రోగి ఫోటో తీయండి',
    retakePhoto: 'మళ్ళీ ఫోటో తీయండి',
    usePhoto: 'ఈ ఫోటోను వాడండి',
    cancel: 'రద్దు చేయండి',

    otpSentNotice: 'మేము 6-అంకెల OTPని పంపాము:',
    verifyAndContinue: 'ధృవీకరించి కొనసాగించండి',
    fillDemoOtp: 'డెమో: 123456 నింపండి',
    otpInvalidError: 'దయచేసి OTP లోని మొత్తం 6 అంకెలను నమోదు చేయండి.',

    getStarted: 'ప్రారంభించండి',
    intakeReadyBadge: 'రోగి ఇన్టేక్ సిద్ధంగా ఉంది',

    roles: {
      patient: { title: 'రోగి', desc: 'ఆరోగ్య వివరాల నమోదు ప్రారంభించండి' },
      nurse: { title: 'నర్స్', desc: 'వైటల్స్ నమోదు & క్యూ నిర్వహణ' },
      doctor: { title: 'డాక్టర్', desc: 'రోగి సారాంశం చూడండి' },
      admin: { title: 'అడ్మిన్', desc: 'సిస్టమ్ నిర్వహణ' },
    },

    menuItems: {
      newVisit: { title: 'కొత్త విజిట్ ప్రారంభించండి', desc: 'AI ప్రశ్నలకు సమాధానాలు ఇవ్వండి' },
      uploadDocs: { title: 'వైద్య పత్రాలను అప్‌లోడ్ చేయండి', desc: 'ప్రిస్క్రిప్షన్లు, ల్యాబ్ నివేదికలు' },
      viewRecords: { title: 'నా మునుపటి రికార్డులను చూడండి', desc: 'మీ ఆభా ఆరోగ్య కాలక్రమం' },
      editProfile: { title: 'నా ప్రొఫైల్ & వివరాలు', desc: 'ఎత్తు, బరువు మరియు వివరాలను నవీకరించండి' },
    },

    dpdpNotice: 'డిజిటల్ వ్యక్తిగత డేటా రక్షణ (DPDP) చట్టం 2023',
    consentPara: 'కన్సల్టేషన్ మరియు చికిత్స ప్రయోజనాల కోసం నా ఆరోగ్య సమాచారాన్ని సేకరించడానికి మరియు ప్రాసెస్ చేయడానికి నేను మెడికియోస్క్‌కు అనుమతి ఇస్తున్నాను. మీ డేటా ఎన్‌క్రిప్ట్ చేయబడింది.',
    consentCheck1: 'ఆసుపత్రి ఆరోగ్య సంరక్షణ ప్రదాతలతో నా వైద్య చరిత్రను పంచుకోవడానికి నేను సమ్మతిస్తున్నాను.',
    consentCheck2: 'అప్‌లోడ్ చేసిన వైద్య నివేదికలపై ఆటోమేటెడ్ OCR పరీక్షకు నేను సమ్మతిస్తున్నాను.',
    agreeAndContinue: 'నేను అంగీకరిస్తున్నాను & కొనసాగించండి',
    readFullTerms: 'పూర్తి గోప్యతా విధానాన్ని చదవండి',

    initialGreeting: 'నమస్కారం! ఈరోజు మీకు ఉన్న ప్రధాన సమస్య ఏమిటి?',
    defaultPills: ['జ్వరం / దగ్గు', 'కడుపు నొప్పి / అసిడిటీ', 'ఛాతీ నొప్పి / శ్వాస ఆడకపోవడం', 'కీళ్ళ నొప్పులు'],
    youSaid: 'మీరు చెప్పినది:',
    confirmPrompt: 'ఈ సమాచారం సరైనదేనా?',
    yes: 'అవును, పంపండి',
    no: 'కాదు, రద్దు చేయండి',
    edit: 'సవరించండి',
    listeningNow: 'వింటున్నాను... ఇప్పుడు మాట్లాడండి',
    typePlaceholder: 'లేదా మీ సమస్యను ఇక్కడ టైప్ చేయండి...',
    listenAgain: 'మళ్ళీ వినండి',
    proceedToDocs: 'పత్రాల అప్‌లోడ్‌కు వెళ్ళండి',
    intakeRecorded: 'వివరాలు నమోదయ్యాయి',
    skip: 'దాటవేయండి',

    uploadDevice: 'పరికరం నుండి అప్‌లోడ్ చేయండి',
    analyzingDocs: 'AI వైద్య పత్రాలను విశ్లేషిస్తోంది...',
    attachedFiles: 'జతచేయబడిన పత్రాలు',
    digitizedBadge: 'ధృవీకరించబడింది ✓',
    scanningStatus: 'స్కాన్ చేస్తోంది...',
    startCamera: 'కెమెరా తెరవండి',
    capturePhoto: 'ఫోటో తీయండి',
    closeCamera: 'కెమెరా మూసివేయండి',
    continueToReview: 'సమీక్షకు కొనసాగించండి',

    transcriptTitle: 'సంభాషణ ప్రతిలేఖనం',
    patientRole: 'రోగి',
    aiRole: 'AI సహాయకుడు',
    submitToDoctor: 'డాక్టర్‌కు సమర్పించండి',
    goBack: 'వెనుకకు వెళ్లండి',

    opdQueueToken: 'OPD క్యూ టోకెన్',
    tokenNumber: 'టోకెన్ నంబర్',
    patientNameLabel: 'రోగి పేరు',
    estimatedWaitTime: 'అంచనా వేయబడిన నిరీక్షణ సమయం',
    approxWaitMins: 'సుమారు 10-15 నిమిషాలు',
    backToHome: 'మొదటికి వెళ్ళండి',

    staffLogin: 'స్టాఫ్ లాగిన్',
    themeLight: 'లైట్ మోడ్',
    themeDark: 'డార్క్ మోడ్',
    themeContrast: 'హై కాంట్రాస్ట్',
  },
};

const LanguageContext = createContext({
  language: 'en-IN',
  setLanguage: () => {},
  t: DICTIONARY['en-IN'],
  languages: LANGUAGE_OPTIONS,
  allowedLanguages: ALLOWED_LANGUAGES,
});

export function LanguageProvider({ children, initialLanguage = 'en-IN' }) {
  const [language, setLanguageState] = useState(() => {
    return ALLOWED_LANGUAGES.includes(initialLanguage) ? initialLanguage : 'en-IN';
  });

  const setLanguage = (langCode) => {
    if (ALLOWED_LANGUAGES.includes(langCode)) {
      setLanguageState(langCode);
    } else {
      console.warn(`Language '${langCode}' not allowed. Allowed: ${ALLOWED_LANGUAGES.join(', ')}`);
    }
  };

  const t = useMemo(() => {
    return DICTIONARY[language] || DICTIONARY['en-IN'];
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      setLanguage,
      t,
      languages: LANGUAGE_OPTIONS,
      allowedLanguages: ALLOWED_LANGUAGES,
    }),
    [language, t]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

export default LanguageContext;
