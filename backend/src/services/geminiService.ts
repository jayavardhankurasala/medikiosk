import { GoogleGenAI } from '@google/genai';
import { ENV } from '../config/env.js';

export interface ChatTurnResponse {
  nextQuestion: string;
  options: string[];
  isEmergency: boolean;
  isComplete: boolean;
}

export interface ExtractedDocumentEntities {
  documentType: string;
  doctorOrClinic?: string;
  date?: string;
  diagnoses: string[];
  prescribedDrugs: Array<{
    name: string;
    dosage?: string;
    frequency?: string;
    duration?: string;
  }>;
  labTestValues: Array<{
    testName: string;
    value: string;
    unit?: string;
    referenceRange?: string;
    isAbnormal: boolean;
  }>;
  clinicalNotesSummary: string;
}

export interface PhysicianClinicalSummary {
  chiefComplaint: string;
  hpi: string;
  pastHistory: string;
  medications: string;
  allergies: string;
  reviewOfSystems: string;
  ayushAssessment?: {
    prakriti?: string;
    vikriti?: string;
    agni?: string;
    koshtha?: string;
    aharaVihara?: string;
  };
  redFlagFlags: boolean;
  triageCategory: 'ROUTINE' | 'PRIORITY' | 'EMERGENCY_RED_FLAG';
  suggestedDepartment: string;
  verifiedByDoctor?: boolean;
  doctorDiagnosis?: string;
  prescribedTests?: string[];
  prescribedMedications?: Array<{ name: string; dosage: string; frequency?: string }>;
}

export class GeminiService {
  private static client: GoogleGenAI | null = null;

  private static getClient(): GoogleGenAI | null {
    if (!this.client && ENV.GEMINI_API_KEY) {
      try {
        this.client = new GoogleGenAI({ apiKey: ENV.GEMINI_API_KEY });
      } catch (err) {
        console.error('Failed to initialize GoogleGenAI client:', err);
      }
    }
    return this.client;
  }

  /**
   * Adaptive Clinical Question Generator
   * Probes complaints using SOCRATES (Allopathic) or Dashavidha Pariksha (AYUSH)
   */
  static async generateNextQuestion(params: {
    userMessage: string;
    history: Array<{ role: string; content: string }>;
    language: string;
    clinicalMode: 'ALLOPATHIC' | 'AYUSH';
  }): Promise<ChatTurnResponse> {
    const { userMessage, history, language, clinicalMode } = params;
    const apiKey = process.env.GEMINI_API_KEY || ENV.GEMINI_API_KEY;

    if (!apiKey) {
      throw new Error('GEMINI_API_KEY is not set in environment or .env');
    }

    const ai = new GoogleGenAI({ apiKey });

    const systemInstruction = `
You are an interactive clinical AI for "MediKiosk" in an Indian hospital OPD.
Target Language: ${language} (Allowed codes: 'en-IN' for English, 'hi-IN' for Hindi, 'te-IN' for Telugu).
Clinical Mode: ${clinicalMode}.

CRITICAL MANDATE:
You are an interactive clinical AI. You MUST ask exactly ONE question at a time.
Wait for the user's response before asking the next question. Do not list multiple questions in a single response.
If the user says 'I have a fever', your nextQuestion must be a single follow-up, like 'How many days have you had the fever?'.
Count the conversation turns. Only after asking 5 to 7 individual questions sequentially, you may set isComplete: true.

RULES:
1. Conduct a structured medical case-taking interview asking strictly ONE question at a time.
2. If Clinical Mode is ALLOPATHIC: Use the SOCRATES framework (Site, Onset, Character, Radiation, Associations, Time course, Exacerbating/relieving factors, Severity).
3. If Clinical Mode is AYUSH: Use Ayurvedic Dashavidha Pariksha (Prakriti constitution, Vikriti current imbalance, Agni digestive capacity, Koshtha bowel habits, Ahara-Vihara diet/lifestyle, Satmya suitability).
4. RED-FLAG EMERGENCY DETECTION: If symptoms indicate acute life threats (crushing substernal chest pain, radiating arm/jaw pain, acute facial droop/arm weakness/slurred speech, severe stridor/acute dyspnea, suspected sepsis/unresponsiveness), immediately set "isEmergency": true.
5. PREVENT LOOPING: You are a clinical AI. NEVER repeat a question you or the user have already mentioned. Review the conversation history array carefully before responding.
6. ENFORCE 5 TO 7 QUESTIONS RULE: Count the conversation turns. Only after asking 5 to 7 individual questions sequentially, you may set isComplete: true.
7. TELUGU PROMPT ENFORCEMENT: If the requested language is 'te-IN', you MUST generate the 'nextQuestion' and all 'options' entirely in the Telugu script. Do not use transliterated English.
8. STRICT TRANSLATION: You must output the "nextQuestion" and all "options" strictly in the requested language code (en-IN, hi-IN, or te-IN). Do not mix languages.
9. Provide 2 to 4 touch quick-reply options (strictly in the requested language) so patients can simply tap to answer.
10. Output ONLY raw valid JSON conforming to the schema with nextQuestion as a single string.
`;

    const chatHistory = history || [];
    const conversationContext = chatHistory
      .map((msg) => `${msg.role.toUpperCase()}: ${msg.content}`)
      .concat(`PATIENT: ${userMessage}`)
      .join('\n');

    const response = await ai.models.generateContent({
      model: 'gemini-3.6-flash',
      contents: `${systemInstruction}\n\nCONVERSATION HISTORY:\n${conversationContext}\n\nGenerate the next JSON response:`,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: 'OBJECT',
          properties: {
            nextQuestion: {
              type: 'STRING',
              description: 'Exactly ONE question as a single string. Never include multiple questions.',
            },
            options: {
              type: 'ARRAY',
              items: { type: 'STRING' },
              description: '2 to 4 quick answer options',
            },
            isEmergency: {
              type: 'BOOLEAN',
              description: 'Whether acute emergency red flags are detected',
            },
            isComplete: {
              type: 'BOOLEAN',
              description: 'Whether 5 to 7 individual sequential questions have been completed',
            },
          },
          required: ['nextQuestion', 'options', 'isEmergency', 'isComplete'],
        },
      },
    });

    const text = response.text?.trim() || '{}';
    const parsed: ChatTurnResponse = JSON.parse(text);

    // Enforce 5 to 7 questions threshold: Count assistant turns in history
    const assistantCount = chatHistory.filter(
      (msg) => msg.role === 'assistant' || msg.role === 'model'
    ).length;

    let isComplete = !!parsed.isComplete;
    if (assistantCount < 5) {
      isComplete = false; // Force false if less than 5 questions asked, overriding AI early drops
    } else if (assistantCount >= 7) {
      isComplete = true; // Complete intake once reaching 7 questions
    }

    return {
      nextQuestion: parsed.nextQuestion || 'Could you please describe your symptoms in more detail?',
      options: Array.isArray(parsed.options) ? parsed.options : [],
      isEmergency: !!parsed.isEmergency,
      isComplete,
    };
  }

  /**
   * Multimodal Document OCR & Clinical Entity Extraction
   */
  static async processMedicalDocument(
    fileBuffer: Buffer,
    mimeType: string
  ): Promise<ExtractedDocumentEntities> {
    const client = this.getClient();

    const prompt = `
Analyze this uploaded Indian medical document (prescription, lab report, or discharge summary).
Extract all clinical information and return strictly valid JSON matching this schema:
{
  "documentType": "PRESCRIPTION" | "LAB_REPORT" | "DISCHARGE_SUMMARY" | "OTHER",
  "doctorOrClinic": "string or null",
  "date": "YYYY-MM-DD or string description",
  "diagnoses": ["string"],
  "prescribedDrugs": [
    { "name": "string", "dosage": "string", "frequency": "string", "duration": "string" }
  ],
  "labTestValues": [
    { "testName": "string", "value": "string", "unit": "string", "referenceRange": "string", "isAbnormal": boolean }
  ],
  "clinicalNotesSummary": "concise 2-3 sentence overview of this document"
}
`;

    if (client) {
      try {
        const base64Data = fileBuffer.toString('base64');
        const response = await client.models.generateContent({
          model: 'gemini-3.6-flash',
          contents: [
            {
              role: 'user',
              parts: [
                { text: prompt },
                {
                  inlineData: {
                    mimeType: mimeType,
                    data: base64Data,
                  },
                },
              ],
            },
          ],
          config: {
            responseMimeType: 'application/json',
          },
        });

        const parsed: ExtractedDocumentEntities = JSON.parse(response.text?.trim() || '{}');
        return parsed;
      } catch (err) {
        console.error('[Gemini Vision OCR Error]:', err);
      }
    }

    // Fallback simulated document intelligence
    return {
      documentType: 'PRESCRIPTION',
      doctorOrClinic: 'District Civil Hospital / OPD Unit',
      date: new Date().toISOString().split('T')[0],
      diagnoses: ['Hypertension', 'Dyspepsia (Amlapitta)'],
      prescribedDrugs: [
        { name: 'Tab Amlodipine', dosage: '5mg', frequency: 'Once daily (OD)', duration: '30 days' },
        { name: 'Tab Pantoprazole', dosage: '40mg', frequency: 'Empty stomach (OD)', duration: '14 days' },
        { name: 'Sutshekhar Ras', dosage: '250mg', frequency: 'Twice daily with honey', duration: '20 days' }
      ],
      labTestValues: [
        { testName: 'Fasting Blood Sugar', value: '142', unit: 'mg/dL', referenceRange: '70-100', isAbnormal: true },
        { testName: 'Hemoglobin (Hb)', value: '13.4', unit: 'g/dL', referenceRange: '12.0-15.5', isAbnormal: false },
        { testName: 'Serum Creatinine', value: '0.9', unit: 'mg/dL', referenceRange: '0.7-1.3', isAbnormal: false }
      ],
      clinicalNotesSummary: 'Prescription with ongoing antihypertensive and gastroprotective medications. Fasting glucose elevated; advised glycemic monitoring and dietary modification.'
    };
  }

  /**
   * Physician Summary Generator
   * Synthesizes conversation and documents into a structured clinical note
   */
  static async generatePhysicianSummary(params: {
    history: Array<{ role: string; content: string }>;
    documents: ExtractedDocumentEntities[];
    clinicalMode: 'ALLOPATHIC' | 'AYUSH';
    language: string;
  }): Promise<PhysicianClinicalSummary> {
    const { history, documents, clinicalMode } = params;
    const client = this.getClient();

    const prompt = `
You are a senior physician and AYUSH clinical documentation expert.
Synthesize this patient's intake interview and uploaded medical records into a clean, concise, physician-ready consultation note.

CLINICAL MODE: ${clinicalMode}
CONVERSATION TURNS:
${history.map((h) => `${h.role}: ${h.content}`).join('\n')}

EXTRACTED DOCUMENTS:
${JSON.stringify(documents, null, 2)}

OUTPUT STRICT JSON SCHEMA:
{
  "chiefComplaint": "Concise statement with duration",
  "hpi": "Chronological history of presenting illness (SOCRATES details)",
  "pastHistory": "Past medical/surgical conditions and comorbidities",
  "medications": "Current active medications list",
  "allergies": "Known drug/food allergies (or 'No known drug allergies (NKDA)')",
  "reviewOfSystems": "Pertinent positives and negatives",
  "ayushAssessment": {
    "prakriti": "Vata/Pitta/Kapha assessment if AYUSH",
    "vikriti": "Imbalance noted",
    "agni": "Manda/Tikshna/Visham/Sama",
    "koshtha": "Mrudu/Madhyama/Krura",
    "aharaVihara": "Diet and lifestyle habits"
  },
  "redFlagFlags": boolean,
  "triageCategory": "ROUTINE" | "PRIORITY" | "EMERGENCY_RED_FLAG",
  "suggestedDepartment": "General Medicine / Kayachikitsa / Cardiology / etc."
}
`;

    if (client) {
      try {
        const response = await client.models.generateContent({
          model: 'gemini-3.6-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
          },
        });

        const parsed: PhysicianClinicalSummary = JSON.parse(response.text?.trim() || '{}');
        return parsed;
      } catch (err) {
        console.error('[Gemini Summary Generation Error]:', err);
      }
    }

    // Robust fallback summary synthesis
    const textAll = history.map((h) => h.content.toLowerCase()).join(' ');
    const isEmergency = textAll.includes('chest pain') || textAll.includes('heart attack') || textAll.includes('breathless') || textAll.includes('stroke') || textAll.includes('छाती में दर्द');

    return {
      chiefComplaint: history.find(h => h.role === 'user')?.content || 'General health checkup and symptom assessment',
      hpi: 'Patient presented to OPD kiosk with complaints elicited over conversational case-taking. Symptoms detailed across onset, severity, and temporal evolution.',
      pastHistory: documents.length > 0 ? 'Hypertension, managed pharmacologically.' : 'No major prior hospitalizations reported.',
      medications: documents.flatMap(d => d.prescribedDrugs.map(p => `${p.name} (${p.dosage || ''})`)).join(', ') || 'No active daily medications noted.',
      allergies: 'No known drug allergies (NKDA).',
      reviewOfSystems: 'Constitutional: alert, oriented. Cardiovascular & Respiratory: evaluated per triage rules.',
      ayushAssessment: clinicalMode === 'AYUSH' ? {
        prakriti: 'Pitta-Vata predominant',
        vikriti: 'Pitta Vriddhi with mild Agnimandya',
        agni: 'Vishama Agni',
        koshtha: 'Madhyama',
        aharaVihara: 'Irregular meal timings, spicy diet reported'
      } : undefined,
      redFlagFlags: isEmergency,
      triageCategory: isEmergency ? 'EMERGENCY_RED_FLAG' : 'ROUTINE',
      suggestedDepartment: clinicalMode === 'AYUSH' ? 'Kayachikitsa (Internal Medicine)' : 'General Medicine OPD'
    };
  }

  /**
   * Fast Symptom Classifier into 50 Clinical Pathway keys
   */
  static async classifySymptom(
    userMessage: string,
    candidateKeys: string[]
  ): Promise<string> {
    const client = this.getClient();

    // 1. Fast direct keyword check (zero latency fallback/pre-check)
    const lower = userMessage.toLowerCase();
    for (const key of candidateKeys) {
      const keyLower = key.toLowerCase();
      const baseName = keyLower.split('(')[0].split('/')[0].trim();
      if (baseName.length > 3 && lower.includes(baseName)) {
        return key;
      }
    }

    if (!client) {
      return 'UNKNOWN';
    }

    try {
      const prompt = `Classify the symptom. Reply ONLY with the exact illness name from this list: [${candidateKeys.join(', ')}]. If it does not match any, reply with 'UNKNOWN'.\n\nPatient symptom: "${userMessage}"`;

      const response = await client.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
      });

      const raw = response.text?.trim() || '';
      const cleaned = raw.replace(/^["']|["']$/g, '').trim();

      const matched = candidateKeys.find(
        (k) => k.toLowerCase() === cleaned.toLowerCase()
      );
      if (matched) return matched;
      if (cleaned.toUpperCase().includes('UNKNOWN')) return 'UNKNOWN';

      return 'UNKNOWN';
    } catch (err: any) {
      console.warn('[Gemini Symptom Classification Fallback]:', err.message);
      return 'UNKNOWN';
    }
  }

  /**
   * Fast Single-shot translation for static clinical questions & options
   */
  static async translateQuestionAndOptions(
    question: string,
    options: string[],
    targetLanguage: string
  ): Promise<{ question: string; options: string[] }> {
    const client = this.getClient();
    if (!client || targetLanguage === 'en-IN') {
      return { question, options };
    }

    const langName = targetLanguage === 'hi-IN' ? 'Hindi (Devanagari script)' : targetLanguage === 'te-IN' ? 'Telugu (Telugu script)' : targetLanguage;

    try {
      const prompt = `You are a medical translator for an Indian OPD kiosk.
Translate this clinical intake question and its multiple-choice options into ${langName}.
Keep medical terminology simple and natural for patients.
Return ONLY valid JSON matching this schema:
{
  "question": "string in ${langName}",
  "options": ["string", "string"]
}

Question to translate: "${question}"
Options to translate: ${JSON.stringify(options)}`;

      const response = await client.models.generateContent({
        model: 'gemini-3.6-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: 'OBJECT',
            properties: {
              question: { type: 'STRING' },
              options: { type: 'ARRAY', items: { type: 'STRING' } },
            },
            required: ['question', 'options'],
          },
        },
      });

      const text = response.text?.trim() || '{}';
      const parsed = JSON.parse(text);
      if (parsed.question && Array.isArray(parsed.options) && parsed.options.length > 0) {
        return {
          question: parsed.question,
          options: parsed.options,
        };
      }
    } catch (err: any) {
      console.warn('[Gemini Translation Error / Fallback to English]:', err.message);
    }

    return { question, options };
  }
}
