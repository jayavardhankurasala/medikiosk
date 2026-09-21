import { Router, Request, Response } from 'express';
import { GeminiService } from '../services/geminiService.js';
import { AdaptiveHistoryService } from '../services/adaptiveHistoryService.js';
import { optionalAuth } from '../middlewares/authMiddleware.js';
import { isDbAvailable, prisma } from '../utils/dbAvailability.js';

export const chatRoutes = Router();

// Start a new clinical visit session
chatRoutes.post('/start-visit', optionalAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    const { patientId, language, clinicalMode } = req.body;
    let visitId: string;

    try {
      let patient = patientId ? await prisma.patient.findUnique({ where: { id: patientId } }) : null;
      if (!patient) {
        patient = await prisma.patient.findFirst();
        if (!patient) {
          patient = await prisma.patient.create({
            data: {
              name: 'Walk-in Patient',
              phone: '9876543210',
              age: 38,
              gender: 'Other',
            },
          });
        }
      }

      const dbVisit = await prisma.visit.create({
        data: {
          patientId: patient.id,
          language: language || 'en-IN',
          clinicalMode: clinicalMode || 'ALLOPATHIC',
          status: 'IN_PROGRESS',
          priority: 'NORMAL',
        },
      });
      visitId = dbVisit.id;

      AdaptiveHistoryService.initVisit(visitId, {
        patientId: patient.id,
        language: dbVisit.language,
        clinicalMode: dbVisit.clinicalMode as any,
      });
    } catch (dbErr: any) {
      console.warn('[Prisma Notice / Memory Fallback in start-visit]:', dbErr.message);
      const memVisit = await AdaptiveHistoryService.createOrGetVisit({
        patientId,
        language: language || 'en-IN',
        clinicalMode: clinicalMode || 'ALLOPATHIC',
      });
      visitId = memVisit.id;
    }

    res.json({
      success: true,
      visitId,
      clinicalMode: clinicalMode || 'ALLOPATHIC',
      language: language || 'en-IN',
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


import { PathwaysService } from '../services/pathwaysService.js';

/**
 * POST /api/ai/chat (and /api/chat)
 * Hybrid Controller: Static 10-Question Multilingual Pathways for 50 Illnesses (Telugu, Hindi, English) + Dynamic Gemini Fallback
 */
chatRoutes.post(['/', '/chat'], optionalAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    const { visitId, userMessage, language, clinicalMode, audioTranscript } = req.body;

    if (!userMessage) {
      res.status(400).json({ success: false, message: 'User message is required' });
      return;
    }

    const currentVisitId = visitId || `visit-${Date.now()}`;
    const targetLang = language || 'en-IN';
    const targetMode = (clinicalMode as 'ALLOPATHIC' | 'AYUSH') || 'ALLOPATHIC';
    const dbUp = await isDbAvailable();

    // 1. Resolve or Create Visit Record
    let activePathway: string | null = null;
    if (dbUp) {
      try {
        let visitRecord = await prisma.visit.findUnique({ where: { id: currentVisitId } });
        if (!visitRecord) {
          let patient = await prisma.patient.findFirst();
          if (!patient) {
            patient = await prisma.patient.create({
              data: {
                name: 'Walk-in Patient',
                phone: '9876543210',
                age: 38,
                gender: 'Other',
              },
            });
          }
          visitRecord = await prisma.visit.create({
            data: {
              id: currentVisitId,
              patientId: patient.id,
              language: targetLang,
              clinicalMode: targetMode,
              status: 'IN_PROGRESS',
              priority: 'NORMAL',
            },
          });
        }
        activePathway = visitRecord.activePathway;
      } catch (dbErr: any) {
        console.warn('[Prisma Notice in visit resolve]:', dbErr.message);
      }
    }

    if (!activePathway) {
      activePathway = AdaptiveHistoryService.getActivePathway(currentVisitId);
    }

    // 2. Fetch existing conversation history BEFORE saving the new user message
    let priorHistory: Array<{ role: string; content: string }> = [];
    if (dbUp) {
      try {
        const messages = await prisma.message.findMany({
          where: { visitId: currentVisitId },
          orderBy: { timestamp: 'asc' },
        });
        priorHistory = messages.map((m) => ({ role: m.role, content: m.content }));
      } catch (dbErr: any) {
        console.warn('[Prisma fetch messages fallback]:', dbErr.message);
      }
    }

    if (priorHistory.length === 0) {
      const memVisit = AdaptiveHistoryService.getVisitDetails(currentVisitId);
      if (memVisit) {
        priorHistory = memVisit.messages.map((m) => ({ role: m.role, content: m.content }));
      }
    }

    // Persist new User Message
    if (dbUp) {
      try {
        await prisma.message.create({
          data: {
            visitId: currentVisitId,
            role: 'user',
            content: userMessage,
            audioTranscript: !!audioTranscript,
          },
        });
      } catch (dbErr: any) {
        console.warn('[Prisma user message persist warning]:', dbErr.message);
      }
    }

    const updatedHistory = [...priorHistory, { role: 'user', content: userMessage }];
    const assistantCount = priorHistory.filter((m) => m.role === 'assistant' || m.role === 'model').length;
    const isFirstTurn = assistantCount === 0;

    // STEP A: Classification (First Turn Only)
    // 1. Check static symptom dictionary in Telugu, Hindi, and English (0ms, zero API call)
    if (!activePathway && isFirstTurn) {
      let matched = PathwaysService.matchPathway(userMessage);

      // 2. If static matching didn't catch it, fallback to AI classification
      if (!matched) {
        try {
          const candidateKeys = PathwaysService.getAllPathwayKeys();
          const aiMatched = await GeminiService.classifySymptom(userMessage, candidateKeys);
          if (aiMatched && aiMatched !== 'UNKNOWN' && PathwaysService.isStaticPathway(aiMatched)) {
            matched = aiMatched;
          }
        } catch (classifyErr: any) {
          console.warn('[Gemini classify fallback notice]:', classifyErr.message);
        }
      }

      if (matched && PathwaysService.isStaticPathway(matched)) {
        activePathway = matched;
        console.log(`[Hybrid Pathway Matched] Visit ${currentVisitId} assigned to pathway "${activePathway}"`);

        if (dbUp) {
          try {
            await prisma.visit.update({
              where: { id: currentVisitId },
              data: { activePathway },
            });
          } catch (dbErr: any) {
            console.warn('[Prisma activePathway update fallback]:', dbErr.message);
          }
        }

        AdaptiveHistoryService.setActivePathway(currentVisitId, activePathway);
      }
    }

    // STEP B: Static Routing (The Fast Path - 0ms Latency in English, Hindi, and Telugu)
    if (activePathway && PathwaysService.isStaticPathway(activePathway)) {
      const stepIndex = assistantCount;

      if (stepIndex < 10) {
        const item = PathwaysService.getQuestion(activePathway, stepIndex, targetLang);
        const nextQuestion = item ? item.question : 'How are you feeling right now?';
        const options = item ? [...item.options] : ['Yes', 'No'];

        const staticResponse = {
          nextQuestion,
          options,
          isEmergency: false,
          isComplete: false,
        };

        if (dbUp) {
          try {
            await prisma.message.create({
              data: {
                visitId: currentVisitId,
                role: 'assistant',
                content: nextQuestion,
              },
            });
          } catch (dbErr: any) {
            console.warn('[Prisma assistant persist warning]:', dbErr.message);
          }
        }

        AdaptiveHistoryService.syncMemoryVisit(
          currentVisitId,
          userMessage,
          staticResponse,
          targetLang,
          targetMode,
          activePathway
        );

        res.json({
          success: true,
          ...staticResponse,
          visitId: currentVisitId,
          activePathway,
          stepIndex: stepIndex + 1,
        });
        return;
      } else {
        // StepIndex >= 10: Complete the pathway
        const completeMessage = targetLang === 'te-IN'
          ? 'ధన్యవాదాలు! మీ సంప్రదింపు సారాంశం విజయవంతంగా సిద్ధమైంది.'
          : targetLang === 'hi-IN'
          ? 'धन्यवाद! आपकी जांच प्रक्रिया पूरी हो गई है और डॉक्टर के लिए तैयार है।'
          : 'Thank you! Your intake is complete and ready for the doctor.';

        const completeResponse = {
          nextQuestion: completeMessage,
          options: [],
          isEmergency: false,
          isComplete: true,
        };

        if (dbUp) {
          try {
            await prisma.message.create({
              data: {
                visitId: currentVisitId,
                role: 'assistant',
                content: completeMessage,
              },
            });
          } catch (dbErr: any) {
            console.warn('[Prisma assistant persist warning]:', dbErr.message);
          }
        }

        AdaptiveHistoryService.syncMemoryVisit(
          currentVisitId,
          userMessage,
          completeResponse,
          targetLang,
          targetMode,
          activePathway
        );

        res.json({
          success: true,
          ...completeResponse,
          visitId: currentVisitId,
          activePathway,
        });
        return;
      }
    }

    // STEP C: Dynamic Routing (The AI Fallback)
    let aiResponse;
    try {
      aiResponse = await GeminiService.generateNextQuestion({
        userMessage,
        history: updatedHistory,
        language: targetLang,
        clinicalMode: targetMode,
      });
    } catch (aiErr: any) {
      console.warn('[Gemini AI Fallback Triggered]:', aiErr.message);
      const isTe = targetLang === 'te-IN' || targetLang === 'te';
      const isHi = targetLang === 'hi-IN' || targetLang === 'hi';
      const step = assistantCount; // 0 to 9

      if (targetMode === 'AYUSH') {
        const ayushSteps = [
          {
            qEn: 'Could you describe the nature of your discomfort (pain, burning sensation, or heaviness)?',
            qHi: 'क्या आप अपनी परेशानी की प्रकृति (दर्द, जलन, या भारीपन) बता सकते हैं?',
            qTe: 'మీ సమస్య యొక్క స్వభావాన్ని వివరించగలరా (నొప్పి, మంట, లేదా బరువుగా ఉండటం)?',
            optsEn: ['Pain (Vata)', 'Burning/Acidity (Pitta)', 'Heaviness/Congestion (Kapha)'],
            optsHi: ['दर्द (वात)', 'जलन/अम्लपित्त (पित्त)', 'भारीपन/कफ (कफ)'],
            optsTe: ['నొప్పి (వాతం)', 'మంట/ఎసిడిటీ (పిత్తం)', 'బరువు/కఫం (కఫం)']
          },
          {
            qEn: 'How would you describe your bodily constitution and tolerance to cold or heat?',
            qHi: 'आप अपनी शारीरिक प्रकृति और सर्दी या गर्मी सहन करने की क्षमता को कैसे आंकते हैं?',
            qTe: 'మీ శరీర తత్వాన్ని మరియు చలి లేదా వేడిని తట్టుకునే సామర్థ్యాన్ని ఎలా అంచనా వేస్తారు?',
            optsEn: ['Feel more cold', 'Feel more heat', 'Comfortable in both', 'Moderate'],
            optsHi: ['ठंड अधिक लगती है', 'गर्मी अधिक लगती है', 'दोनों सहन हो जाते हैं', 'मध्यम'],
            optsTe: ['చలి ఎక్కువ', 'వేడి ఎక్కువ', 'రెండూ సాధారణం', 'మధ్యస్థం']
          },
          {
            qEn: 'How is your appetite (Ahara Shakti) and digestion (Agni)?',
            qHi: 'आपकी भूख (आहार शक्ति) और पाचन क्रिया (अग्नि) कैसी रहती है?',
            qTe: 'మీ ఆకలి మరియు జీర్ణక్రియ ఎలా ఉంది?',
            optsEn: ['Irregular appetite', 'Intense hunger/acidic', 'Sluggish digestion', 'Normal & balanced'],
            optsHi: ['अनियमित भूख', 'तीव्र भूख/एसिडिटी', 'धीमा पाचन/भारीपन', 'सामान्य व संतुलित'],
            optsTe: ['సమయానికి ఆకలి కాదు', 'విపరీతమైన ఆకలి/మంట', 'మందగించిన జీర్ణం', 'సాధారణం']
          },
          {
            qEn: 'How are your bowel movements (Koshtha)?',
            qHi: 'आपका पेट साफ होने की स्थिति (कोष्ठ) कैसी रहती है?',
            qTe: 'మీ మల విసర్జన (కోష్ఠ) ఎలా జరుగుతుంది?',
            optsEn: ['Hard/Constipated (Krura)', 'Regular & normal', 'Loose/Frequent (Mridu)'],
            optsHi: ['कब्ज/कठिन (क्रूर)', 'नियमित व सामान्य', 'ढीला/बार-बार (मृदु)'],
            optsTe: ['మలబద్ధకం (కఠినం)', 'క్రమంగా సాధారణం', 'తరచుగా/వదులుగా']
          },
          {
            qEn: 'How is your mental state, stress resilience (Sattva), and sleep (Nidra)?',
            qHi: 'आपका मानसिक स्तर, तनाव सहने की शक्ति (सत्त्व) और नींद (निद्रा) कैसी है?',
            qTe: 'మీ మానసిక స్థితి, ఒత్తిడి తట్టుకునే శక్తి మరియు నిద్ర ఎలా ఉంది?',
            optsEn: ['Sound sleep & low stress', 'Disturbed sleep', 'Frequent anxiety/stress', 'Light sleeper'],
            optsHi: ['गहरी नींद व कम तनाव', 'अधूरी/खराब नींद', 'अधिक तनाव/चिंता', 'हल्की नींद'],
            optsTe: ['ప్రశాంత నిద్ర', 'అస్థిరమైన నిద్ర', 'తరచుగా ఆందోళన/ఒత్తిడి', 'తేలికపాటి నిద్ర']
          },
          {
            qEn: 'How is your physical stamina and capacity for daily exertion (Vyayama Shakti)?',
            qHi: 'आपकी शारीरिक सहनशक्ति और दैनिक कार्य करने की क्षमता (व्यायाम शक्ति) कैसी है?',
            qTe: 'మీ శారీరక సామర్థ్యం మరియు రోజువారీ శ్రమ తట్టుకునే శక్తి ఎలా ఉంది?',
            optsEn: ['High stamina', 'Moderate stamina', 'Get tired easily', 'Severe fatigue'],
            optsHi: ['उत्तम सहनशक्ति', 'मध्यम क्षमता', 'जल्दी थक जाते हैं', 'अत्यधिक थकान'],
            optsTe: ['ఉత్తమ సామర్థ్యం', 'మధ్యస్థం', 'త్వరగా అలసిపోతాను', 'అధిక అలసట']
          },
          {
            qEn: 'Do you feel weakness or pain in your muscles or joints (Sara & Samhanana)?',
            qHi: 'क्या आपको अपनी मांसपेशियों या जोड़ों में कमजोरी या जकड़न महसूस होती है?',
            qTe: 'మీ కండరాలు లేదా కీళ్ళలో బలహీనత లేదా నొప్పిగా అనిపిస్తుందా?',
            optsEn: ['Joint pain/Stiffness', 'Muscle weakness', 'Both joints & muscles', 'None'],
            optsHi: ['जोड़ों में दर्द/जकड़न', 'मांसपेशियों में कमजोरी', 'दोनों में परेशानी', 'कोई नहीं'],
            optsTe: ['కీళ్ళ నొప్పులు', 'కండరాల బలహీనత', 'రెండింటిలోనూ', 'ఏమీ లేదు']
          },
          {
            qEn: 'What kind of diet and taste (Rasa) do you habitually consume (Satmya & Ahara)?',
            qHi: 'आप आमतौर पर किस प्रकार का भोजन और स्वाद (रस) पसंद करते हैं?',
            qTe: 'మీరు సాధారణంగా ఎలాంటి ఆహారం తీసుకుంటారు?',
            optsEn: ['Spicy & oily food', 'Sweet & heavy food', 'Simple home-cooked meals', 'Dry & light snacks'],
            optsHi: ['तीखा व तला-भुना', 'मीठा व भारी भोजन', 'सादा घर का भोजन', 'रूखा-सूखा नाश्ता'],
            optsTe: ['కారంగా & నూనె వంటకాలు', 'తీపి & భారీ ఆహారం', 'సాధారణ ఇంటి భోజనం', 'తేలికపాటి టిఫిన్లు']
          },
          {
            qEn: 'Do you currently take any Ayurvedic medicines or other daily treatments?',
            qHi: 'क्या आप वर्तमान में कोई आयुर्वेदिक दवा या अन्य दैनिक उपचार ले रहे हैं?',
            qTe: 'మీరు ప్రస్తుతం ఏవైనా ఆయుర్వేద మందులు లేదా ఇతర చికిత్సలు తీసుకుంటున్నారా?',
            optsEn: ['Yes, Ayurvedic herbs/churna', 'Allopathic medicines', 'Both', 'None'],
            optsHi: ['हाँ, आयुर्वेदिक चूर्ण/काढ़ा', 'एलोपैथिक दवाइयां', 'दोनों', 'कोई नहीं'],
            optsTe: ['అవును, ఆయుర్వేదం', 'అల్లోపతి మందులు', 'రెండూ', 'ఏమీ లేవు']
          }
        ];

        if (step >= 9) {
          aiResponse = {
            nextQuestion: isTe
              ? 'ధన్యవాదాలు! మీ ఆయుర్వేద దశవిధ పరీక్ష వివరాలు పూర్తయ్యాయి. వైద్యుల సమీక్ష కోసం సిద్ధంగా ఉంది.'
              : isHi
              ? 'धन्यवाद! आपकी दशविध परीक्षा विवरण पूरी हो गई है और वैद्य के लिए तैयार है।'
              : 'Thank you! Your complete AYUSH Dashavidha intake is finished and ready for the physician.',
            options: [],
            isEmergency: false,
            isComplete: true,
          };
        } else {
          const current = ayushSteps[Math.min(step, ayushSteps.length - 1)];
          aiResponse = {
            nextQuestion: isTe ? current.qTe : isHi ? current.qHi : current.qEn,
            options: isTe ? current.optsTe : isHi ? current.optsHi : current.optsEn,
            isEmergency: false,
            isComplete: false,
          };
        }
      } else {
        // ALLOPATHIC SOCRATES SEQUENTIAL FALLBACK
        const allopathicSteps = [
          {
            qEn: 'How long have you been experiencing these symptoms?',
            qHi: 'आपको यह तकलीफ कितने समय (दिनों/सप्ताहों) से हो रही है?',
            qTe: 'ఈ లక్షణాలు ఎంత కాలం నుండి (రోజులు/వారాలు) ఉన్నాయి?',
            optsEn: ['Started today', '1–3 days', '4–7 days', 'More than a week'],
            optsHi: ['आज ही शुरू हुआ', '1-3 दिन से', '4-7 दिन से', '1 सप्ताह से अधिक'],
            optsTe: ['ఈరోజే ప్రారంభమైంది', '1-3 రోజులు', '4-7 రోజులు', 'వారం కంటే ఎక్కువ']
          },
          {
            qEn: 'Where exactly is the discomfort located, and does it spread anywhere?',
            qHi: 'यह तकलीफ शरीर के किस हिस्से में है और क्या यह कहीं फैलती है?',
            qTe: 'ఈ సమస్య సరిగ్గా ఎక్కడ ఉంది, ఎక్కడికైనా వ్యాపిస్తుందా?',
            optsEn: ['Local to one spot', 'Spreads to back/shoulder', 'Whole body / generalized', 'Diffused'],
            optsHi: ['केवल एक जगह', 'पीठ/कंधे की तरफ फैल रहा है', 'पूरे शरीर में', 'फैला हुआ दर्द'],
            optsTe: ['ఒకే చోట', 'వీపు/భుజానికి వ్యాపిస్తోంది', 'మొత్తం శరీరం', 'విస్తరించిన నొప్పి']
          },
          {
            qEn: 'How would you describe the character of the pain or symptom?',
            qHi: 'दर्द या तकलीफ का प्रकार कैसा है?',
            qTe: 'నొప్పి లేదా లక్షణం యొక్క రకం ఎలా ఉంది?',
            optsEn: ['Sharp / Stabbing', 'Dull ache', 'Burning / Acidity', 'Throbbing / Heavy pressure'],
            optsHi: ['तेज / चुभने वाला', 'हल्का मीठा दर्द', 'जलन / एसिडिटी', 'धड़कता हुआ / भारी दबाव'],
            optsTe: ['తీవ్రమైన / గుచ్చినట్లు', 'మందమైన నొప్పి', 'మంట / ఎసిడిటీ', 'భారమైన ఒత్తిడి']
          },
          {
            qEn: 'On a scale of 1 to 10, how severe is your discomfort right now?',
            qHi: '1 से 10 के पैमाने पर, आपकी तकलीफ अभी कितनी गंभीर है?',
            qTe: '1 నుండి 10 స్కేలులో మీ సమస్య ఎంత తీవ్రంగా ఉంది?',
            optsEn: ['Mild (1–3)', 'Moderate (4–6)', 'Severe (7–8)', 'Very severe (9–10)'],
            optsHi: ['हल्की (1–3)', 'मध्यम (4–6)', 'गंभीर (7–8)', 'अत्यधिक गंभीर (9–10)'],
            optsTe: ['తక్కువ (1–3)', 'మధ్యస్థం (4–6)', 'తీవ్రం (7–8)', 'చాలా తీవ్రం (9–10)']
          },
          {
            qEn: 'Do you have accompanying symptoms like fever, nausea, vomiting, or breathlessness?',
            qHi: 'क्या आपको बुखार, उल्टी, चक्कर या सांस फूलने जैसी अन्य तकलीफें भी हैं?',
            qTe: 'మీకు జ్వరం, వాంతులు, తలతిరగడం లేదా ఆయాసం వంటి ఇతర సమస్యలు ఉన్నాయా?',
            optsEn: ['Fever / Chills', 'Nausea / Vomiting', 'Shortness of breath', 'None of these'],
            optsHi: ['बुखार / कंपकंपी', 'जी मिचलाना / उल्टी', 'सांस फूलना', 'इनमें से कोई नहीं'],
            optsTe: ['జ్వరం / చలి', 'వాంతి / వికారం', 'ఆయాసం', 'ఇవేమీ లేవు']
          },
          {
            qEn: 'Does anything make your symptoms better or worse (like rest, food, or movement)?',
            qHi: 'क्या आराम करने, भोजन करने या चलने-फिरने से तकलीफ घटती या बढ़ती है?',
            qTe: 'విశ్రాంతి, ఆహారం లేదా కదలికల వల్ల లక్షణాలు తగ్గుతాయా లేదా పెరుగుతాయా?',
            optsEn: ['Worse with exertion', 'Better with rest', 'Worse after food', 'No change'],
            optsHi: ['परिश्रम से बढ़ती है', 'आराम से घटती है', 'भोजन के बाद बढ़ती है', 'कोई बदलाव नहीं'],
            optsTe: ['శ్రమతో పెరుగుతుంది', 'విశ్రాంతితో తగ్గుతుంది', 'తిన్న తర్వాత పెరుగుతుంది', 'మార్పు లేదు']
          },
          {
            qEn: 'Do you have any existing medical conditions like Diabetes, BP, or Asthma?',
            qHi: 'क्या आपको पहले से डायबिटीज, बीपी, थायराइड या दमा जैसी कोई बीमारी है?',
            qTe: 'మీకు షుగర్, బీపీ, థైరాయిడ్ లేదా ఉబ్బసం వంటి ఇతర ఆరోగ్య సమస్యలు ఉన్నాయా?',
            optsEn: ['Hypertension (BP)', 'Diabetes Mellitus', 'Asthma / Allergy', 'No past medical history'],
            optsHi: ['उच्च रक्तचाप (BP)', 'मधुमेह (Diabetes)', 'दमा / एलर्जी', 'कोई पुरानी बीमारी नहीं'],
            optsTe: ['రక్తపోటు (BP)', 'షుగర్ (డయాబెటిస్)', 'ఉబ్బసం / అలర్జీ', 'గత వ్యాధులేమీ లేవు']
          },
          {
            qEn: 'Are you taking any daily medicines or do you have any drug allergies?',
            qHi: 'क्या आप नियमित रूप से कोई दवा ले रहे हैं या किसी दवा से एलर्जी है?',
            qTe: 'మీరు రోజూ ఏవైనా మందులు వాడుతున్నారా లేదా ఏదైనా మందుల అలర్జీ ఉందా?',
            optsEn: ['Regular BP/Sugar pills', 'Over-the-counter pain pills', 'Penicillin/Drug allergy', 'No daily pills / No allergies'],
            optsHi: ['नियमित बीपी/शुगर दवाएं', 'दर्द निवारक दवाएं', 'दवा से एलर्जी है', 'कोई दवा या एलर्जी नहीं'],
            optsTe: ['రెగ్యులర్ బీపీ/షుగర్ మందులు', 'నొప్పి నివారణ మందులు', 'మందుల అలర్జీ ఉంది', 'ఎలాంటి మందులు/అలర్జీలు లేవు']
          },
          {
            qEn: 'Has anyone in your immediate family suffered from heart disease or similar symptoms?',
            qHi: 'क्या आपके परिवार में किसी को हृदय रोग, स्ट्रोक या ऐसी ही तकलीफ रही है?',
            qTe: 'మీ కుటుంబంలో ఎవరికైనా గుండె జబ్బులు లేదా ఇలాంటి సమస్యలు ఉన్నాయా?',
            optsEn: ['Family history of heart disease', 'Family history of Diabetes', 'None in family', 'Not sure'],
            optsHi: ['परिवार में हृदय रोग का इतिहास', 'परिवार में शुगर का इतिहास', 'परिवार में कोई नहीं', 'निश्चित नहीं'],
            optsTe: ['కుటుంబంలో గుండె సమస్యలు', 'కుటుంబంలో షుగర్ సమస్యలు', 'ఎవరికీ లేవు', 'ఖచ్చితంగా తెలియదు']
          }
        ];

        if (step >= 9) {
          aiResponse = {
            nextQuestion: isTe
              ? 'ధన్యవాదాలు! మీ సంప్రదింపు సారాంశం సిద్ధమైంది. దయచేసి తదుపరి దశకు వెళ్ళండి.'
              : isHi
              ? 'धन्यवाद! आपकी जांच प्रक्रिया पूरी हो गई है। कृपया अगले चरण पर आगे बढ़ें।'
              : 'Thank you! Your structured clinical intake is complete. Please proceed to the next step.',
            options: [],
            isEmergency: false,
            isComplete: true,
          };
        } else {
          const current = allopathicSteps[Math.min(step, allopathicSteps.length - 1)];
          aiResponse = {
            nextQuestion: isTe ? current.qTe : isHi ? current.qHi : current.qEn,
            options: isTe ? current.optsTe : isHi ? current.optsHi : current.optsEn,
            isEmergency: false,
            isComplete: false,
          };
        }
      }
    }

    if (dbUp) {
      try {
        await prisma.message.create({
          data: {
            visitId: currentVisitId,
            role: 'assistant',
            content: aiResponse.nextQuestion,
          },
        });

        if (aiResponse.isEmergency) {
          await prisma.visit.update({
            where: { id: currentVisitId },
            data: { status: 'TRIAGE_ESCALATED', priority: 'HIGH_PRIORITY' },
          });
        }
      } catch (dbErr: any) {
        console.warn('[Prisma Notice / Fallback in assistant message persist]:', dbErr.message);
      }
    }

    AdaptiveHistoryService.syncMemoryVisit(
      currentVisitId,
      userMessage,
      aiResponse,
      targetLang,
      targetMode
    );

    res.json({
      success: true,
      ...aiResponse,
      visitId: currentVisitId,
      activePathway: null,
    });
  } catch (error: any) {
    console.error('Chat endpoint error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

// Fetch conversation history
chatRoutes.get('/history/:visitId', async (req: Request, res: Response): Promise<void> => {
  try {
    const visitId = String(req.params.visitId);

    try {
      const messages = await prisma.message.findMany({
        where: { visitId },
        orderBy: { timestamp: 'asc' },
      });
      if (messages.length > 0) {
        res.json({
          success: true,
          messages,
        });
        return;
      }
    } catch (dbErr: any) {
      console.warn('[Prisma Notice in getHistory]:', dbErr.message);
    }

    const visit = AdaptiveHistoryService.getVisitDetails(visitId);
    if (!visit) {
      res.status(404).json({ success: false, message: 'Visit session not found' });
      return;
    }

    res.json({
      success: true,
      messages: visit.messages,
      status: visit.status,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});
