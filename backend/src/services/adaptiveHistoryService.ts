import { PrismaClient, Priority } from '@prisma/client';
import { GeminiService, ChatTurnResponse, PhysicianClinicalSummary } from './geminiService.js';
import { v4 as uuidv4 } from 'uuid';

let prisma: PrismaClient | null = null;
try {
  prisma = new PrismaClient();
} catch (err) {
  console.warn('[Prisma Notice] Prisma client initialization deferred or using fallback store.');
}

// In-memory runtime cache for seamless operation
export interface MemoryPatient {
  id: string;
  name: string;
  phone: string;
  aadhaarId?: string | null;
  age: number;
  gender: string;
  abhaId?: string;
  profilePhotoUrl?: string;
  heightCm?: number;
  weightKg?: number;
  createdAt: Date;
}

export interface MemoryVisit {
  id: string;
  patientId: string;
  patientName?: string;
  patientAge?: number;
  patientGender?: string;
  patientPhone?: string;
  language: string;
  clinicalMode: 'ALLOPATHIC' | 'AYUSH';
  activePathway?: string | null;
  status: string; // IN_PROGRESS, COMPLETED, TRIAGE_ESCALATED
  priority: 'NORMAL' | 'HIGH_PRIORITY';
  bloodPressure?: string;
  temperature?: number;
  spo2?: number;
  heightCm?: number;
  weightKg?: number;
  bmi?: number;
  doctorDiagnosis?: string;
  prescribedTests?: string[];
  prescribedMedications?: any[];
  messages: Array<{ id: string; role: string; content: string; timestamp: Date }>;
  documents: any[];
  summary?: PhysicianClinicalSummary;
  createdAt: Date;
  completedAt?: Date;
}

const memoryPatients = new Map<string, MemoryPatient>();
const memoryVisits = new Map<string, MemoryVisit>();

// Pre-seed mock queue with realistic initial patients
function seedInitialQueue() {
  if (memoryVisits.size > 0) return;

  const p1: MemoryPatient = {
    id: 'p-001',
    name: 'Ramesh K.',
    phone: '9876543210',
    age: 28,
    gender: 'Male',
    abhaId: '91-4567-8901-2345',
    heightCm: 172,
    weightKg: 78,
    createdAt: new Date(Date.now() - 3600000),
  };
  const p2: MemoryPatient = {
    id: 'p-002',
    name: 'Lakshmi P.',
    phone: '9876543211',
    age: 42,
    gender: 'Female',
    abhaId: '91-4567-8901-2346',
    heightCm: 158,
    weightKg: 62,
    createdAt: new Date(Date.now() - 7200000),
  };
  const p3: MemoryPatient = {
    id: 'p-003',
    name: 'Suresh M.',
    phone: '9876543212',
    age: 60,
    gender: 'Male',
    abhaId: '91-4567-8901-2347',
    heightCm: 168,
    weightKg: 85,
    createdAt: new Date(Date.now() - 10800000),
  };
  const p4: MemoryPatient = {
    id: 'p-004',
    name: 'Anitha S.',
    phone: '9876543213',
    age: 35,
    gender: 'Female',
    abhaId: '91-4567-8901-2348',
    heightCm: 162,
    weightKg: 58,
    createdAt: new Date(Date.now() - 14400000),
  };

  memoryPatients.set(p1.id, p1);
  memoryPatients.set(p2.id, p2);
  memoryPatients.set(p3.id, p3);
  memoryPatients.set(p4.id, p4);

  const v1: MemoryVisit = {
    id: 'v-001',
    patientId: p1.id,
    patientName: p1.name,
    patientAge: p1.age,
    patientGender: p1.gender,
    patientPhone: p1.phone,
    language: 'en-IN',
    clinicalMode: 'ALLOPATHIC',
    status: 'TRIAGE_ESCALATED',
    priority: 'HIGH_PRIORITY',
    bloodPressure: '150/95',
    temperature: 99.2,
    spo2: 94,
    heightCm: 172,
    weightKg: 78,
    bmi: 26.4,
    messages: [
      { id: 'm1', role: 'user', content: 'Severe crushing chest pain radiating to left arm and sweating', timestamp: new Date() },
      { id: 'm2', role: 'assistant', content: 'Emergency triage alerted for acute chest symptoms.', timestamp: new Date() },
    ],
    documents: [{ name: 'ecg_recent.pdf', size: '1.4 MB' }],
    createdAt: new Date(Date.now() - 600000),
  };

  const v2: MemoryVisit = {
    id: 'v-002',
    patientId: p2.id,
    patientName: p2.name,
    patientAge: p2.age,
    patientGender: p2.gender,
    patientPhone: p2.phone,
    language: 'hi-IN',
    clinicalMode: 'ALLOPATHIC',
    status: 'IN_PROGRESS',
    priority: 'NORMAL',
    bloodPressure: '120/80',
    temperature: 101.4,
    spo2: 98,
    heightCm: 158,
    weightKg: 62,
    bmi: 24.8,
    messages: [
      { id: 'm3', role: 'user', content: 'Fever and severe throat irritation for 2 days', timestamp: new Date() },
    ],
    documents: [],
    createdAt: new Date(Date.now() - 1200000),
  };

  const v3: MemoryVisit = {
    id: 'v-003',
    patientId: p3.id,
    patientName: p3.name,
    patientAge: p3.age,
    patientGender: p3.gender,
    patientPhone: p3.phone,
    language: 'en-IN',
    clinicalMode: 'ALLOPATHIC',
    status: 'TRIAGE_ESCALATED',
    priority: 'HIGH_PRIORITY',
    bloodPressure: '140/90',
    temperature: 98.6,
    spo2: 89,
    heightCm: 168,
    weightKg: 85,
    bmi: 30.1,
    messages: [
      { id: 'm4', role: 'user', content: 'Severe shortness of breath with COPD exacerbation', timestamp: new Date() },
    ],
    documents: [],
    createdAt: new Date(Date.now() - 1800000),
  };

  const v4: MemoryVisit = {
    id: 'v-004',
    patientId: p4.id,
    patientName: p4.name,
    patientAge: p4.age,
    patientGender: p4.gender,
    patientPhone: p4.phone,
    language: 'te-IN',
    clinicalMode: 'AYUSH',
    status: 'IN_PROGRESS',
    priority: 'NORMAL',
    bloodPressure: '118/76',
    temperature: 98.4,
    spo2: 99,
    heightCm: 162,
    weightKg: 58,
    bmi: 22.1,
    messages: [
      { id: 'm5', role: 'user', content: 'Routine glycemic review and chronic indigestion', timestamp: new Date() },
    ],
    documents: [{ name: 'blood_sugar_report.pdf', size: '0.8 MB' }],
    createdAt: new Date(Date.now() - 2400000),
  };

  memoryVisits.set(v1.id, v1);
  memoryVisits.set(v2.id, v2);
  memoryVisits.set(v3.id, v3);
  memoryVisits.set(v4.id, v4);
}

seedInitialQueue();

export class AdaptiveHistoryService {
  static upsertPatient(patient: Partial<MemoryPatient> & { phone: string }): MemoryPatient {
    let existing = Array.from(memoryPatients.values()).find((p) => p.phone === patient.phone);
    if (!existing) {
      existing = {
        id: patient.id || uuidv4(),
        name: patient.name || 'OPD Patient',
        phone: patient.phone,
        aadhaarId: patient.aadhaarId || null,
        age: patient.age || 35,
        gender: patient.gender || 'Other',
        abhaId: patient.abhaId || `91-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`,
        profilePhotoUrl: patient.profilePhotoUrl,
        heightCm: patient.heightCm,
        weightKg: patient.weightKg,
        createdAt: new Date(),
      };
      memoryPatients.set(existing.id, existing);
    } else {
      if (patient.name) existing.name = patient.name;
      if (patient.age) existing.age = patient.age;
      if (patient.gender) existing.gender = patient.gender;
      if (patient.aadhaarId !== undefined) existing.aadhaarId = patient.aadhaarId;
      if (patient.profilePhotoUrl) existing.profilePhotoUrl = patient.profilePhotoUrl;
      if (patient.heightCm !== undefined) existing.heightCm = patient.heightCm;
      if (patient.weightKg !== undefined) existing.weightKg = patient.weightKg;
    }
    return existing;
  }

  static findPatientByPhoneOrAadhaar(phone: string, aadhaarId?: string | null): MemoryPatient | null {
    const list = Array.from(memoryPatients.values());
    const matched = list.find((p) => {
      if (p.phone === phone) return true;
      if (aadhaarId && p.aadhaarId && p.aadhaarId === aadhaarId) return true;
      return false;
    });
    return matched || null;
  }

  static findPatientByAbha(cleanAbhaInput: string): MemoryPatient | null {
    const list = Array.from(memoryPatients.values());
    const matched = list.find((p) => {
      if (!p.abhaId) return false;
      const c = p.abhaId.replace(/\D/g, '');
      return c === cleanAbhaInput;
    });
    return matched || null;
  }

  static getPatient(patientId: string): MemoryPatient | undefined {
    return memoryPatients.get(patientId);
  }

  static async createOrGetVisit(params: {
    patientId?: string;
    patientName?: string;
    language?: string;
    clinicalMode?: 'ALLOPATHIC' | 'AYUSH';
  }): Promise<MemoryVisit> {
    const visitId = uuidv4();
    const patient = params.patientId ? memoryPatients.get(params.patientId) : undefined;

    const visit: MemoryVisit = {
      id: visitId,
      patientId: params.patientId || uuidv4(),
      patientName: params.patientName || patient?.name || 'Ramesh K.',
      patientAge: patient?.age || 38,
      patientGender: patient?.gender || 'Male',
      patientPhone: patient?.phone || '9876543210',
      language: params.language || 'hi-IN',
      clinicalMode: params.clinicalMode || 'ALLOPATHIC',
      status: 'IN_PROGRESS',
      priority: 'NORMAL',
      messages: [
        {
          id: uuidv4(),
          role: 'assistant',
          content:
            params.language?.startsWith('hi')
              ? 'नमस्ते! मैं मेडीकियोस्क AI सहायक हूँ। आज आप अस्पताल में क्या तकलीफ लेकर आए हैं?'
              : 'Welcome to MediKiosk. What health concern or symptom brings you to the OPD today?',
          timestamp: new Date(),
        },
      ],
      documents: [],
      createdAt: new Date(),
    };

    memoryVisits.set(visitId, visit);
    return visit;
  }

  static initVisit(
    visitId: string,
    params: {
      patientId: string;
      language?: string;
      clinicalMode?: 'ALLOPATHIC' | 'AYUSH';
    }
  ): MemoryVisit {
    const patient = memoryPatients.get(params.patientId);
    const visit: MemoryVisit = {
      id: visitId,
      patientId: params.patientId,
      patientName: patient?.name || 'Walk-in Patient',
      patientAge: patient?.age || 38,
      patientGender: patient?.gender || 'Male',
      patientPhone: patient?.phone || '9876543210',
      language: params.language || 'en-IN',
      clinicalMode: params.clinicalMode || 'ALLOPATHIC',
      status: 'IN_PROGRESS',
      priority: 'NORMAL',
      messages: [],
      documents: [],
      createdAt: new Date(),
    };
    memoryVisits.set(visitId, visit);
    return visit;
  }

  static async handleChatTurn(params: {
    visitId: string;
    userMessage: string;
    language?: string;
    clinicalMode?: 'ALLOPATHIC' | 'AYUSH';
    audioTranscript?: boolean;
  }): Promise<ChatTurnResponse & { visitId: string }> {
    const { visitId, userMessage } = params;
    let visit = memoryVisits.get(visitId);

    if (!visit) {
      visit = await this.createOrGetVisit({
        language: params.language,
        clinicalMode: params.clinicalMode,
      });
      visit.id = visitId;
      memoryVisits.set(visitId, visit);
    }

    // Append user message
    visit.messages.push({
      id: uuidv4(),
      role: 'user',
      content: userMessage,
      timestamp: new Date(),
    });

    const activeLanguage = params.language || visit.language;
    const activeMode = params.clinicalMode || visit.clinicalMode;

    const aiResponse = await GeminiService.generateNextQuestion({
      userMessage,
      history: visit.messages.map((m) => ({ role: m.role, content: m.content })),
      language: activeLanguage,
      clinicalMode: activeMode,
    });

    // Append assistant response
    visit.messages.push({
      id: uuidv4(),
      role: 'assistant',
      content: aiResponse.nextQuestion,
      timestamp: new Date(),
    });

    // AUTO-TRIAGE ESCALATION
    if (aiResponse.isEmergency) {
      visit.status = 'TRIAGE_ESCALATED';
      visit.priority = 'HIGH_PRIORITY';
      console.log(`[TRIAGE ESCALATION] Visit ${visitId} set to HIGH_PRIORITY!`);
    }

    return {
      ...aiResponse,
      visitId,
    };
  }

  static recordVitals(
    visitId: string,
    vitals: {
      bloodPressure?: string;
      temperature?: number;
      spo2?: number;
      heightCm?: number;
      weightKg?: number;
      bmi?: number;
    }
  ): MemoryVisit | undefined {
    const visit = memoryVisits.get(visitId);
    if (!visit) return undefined;

    if (vitals.bloodPressure) visit.bloodPressure = vitals.bloodPressure;
    if (vitals.temperature !== undefined) visit.temperature = vitals.temperature;
    if (vitals.spo2 !== undefined) visit.spo2 = vitals.spo2;
    if (vitals.heightCm !== undefined) visit.heightCm = vitals.heightCm;
    if (vitals.weightKg !== undefined) visit.weightKg = vitals.weightKg;

    // Auto-BMI calculation if not explicitly provided
    if (visit.heightCm && visit.weightKg) {
      const hM = visit.heightCm / 100;
      visit.bmi = parseFloat((visit.weightKg / (hM * hM)).toFixed(1));
    } else if (vitals.bmi !== undefined) {
      visit.bmi = vitals.bmi;
    }

    // Also update baseline on patient record
    const patient = memoryPatients.get(visit.patientId);
    if (patient) {
      if (vitals.heightCm) patient.heightCm = vitals.heightCm;
      if (vitals.weightKg) patient.weightKg = vitals.weightKg;
    }

    return {
      ...visit,
      patient: patient || {
        id: visit.patientId,
        name: visit.patientName,
        age: visit.patientAge,
        gender: visit.patientGender,
        phone: visit.patientPhone,
        heightCm: visit.heightCm,
        weightKg: visit.weightKg,
      },
    } as any;
  }

  static finalizeConsultation(
    visitId: string,
    data: {
      doctorDiagnosis: string;
      prescribedTests: string[];
      prescribedMedications: Array<{ name: string; dosage: string; frequency?: string }>;
    }
  ): any | undefined {
    const visit = memoryVisits.get(visitId);
    if (!visit) return undefined;

    visit.doctorDiagnosis = data.doctorDiagnosis;
    visit.prescribedTests = data.prescribedTests || [];
    visit.prescribedMedications = data.prescribedMedications || [];
    visit.status = 'COMPLETED';
    visit.completedAt = new Date();

    if (visit.summary) {
      visit.summary.verifiedByDoctor = true;
      visit.summary.doctorDiagnosis = data.doctorDiagnosis;
      visit.summary.prescribedTests = data.prescribedTests;
      visit.summary.prescribedMedications = data.prescribedMedications;
    }

    const patient = memoryPatients.get(visit.patientId);

    return {
      ...visit,
      summary: {
        ...(visit.summary || {}),
        doctorDiagnosis: data.doctorDiagnosis,
        prescribedTests: data.prescribedTests,
        prescribedMedications: data.prescribedMedications,
        verifiedByDoctor: true,
      },
      patient: patient || {
        id: visit.patientId,
        name: visit.patientName,
        age: visit.patientAge,
        gender: visit.patientGender,
        phone: visit.patientPhone,
      },
    };
  }

  static setPriority(visitId: string, priority: 'NORMAL' | 'HIGH_PRIORITY'): MemoryVisit | undefined {
    const visit = memoryVisits.get(visitId);
    if (visit) {
      visit.priority = priority;
    }
    return visit;
  }

  /**
   * Returns patient queue strictly ordered by Visit.priority:
   * HIGH_PRIORITY patients are ordered at the very top!
   */
  static getQueue(): any[] {
    const all = Array.from(memoryVisits.values());
    const sorted = all.sort((a, b) => {
      // High priority first
      if (a.priority === 'HIGH_PRIORITY' && b.priority !== 'HIGH_PRIORITY') return -1;
      if (b.priority === 'HIGH_PRIORITY' && a.priority !== 'HIGH_PRIORITY') return 1;
      // Then newest first
      return b.createdAt.getTime() - a.createdAt.getTime();
    });

    return sorted.map((v) => {
      const p = memoryPatients.get(v.patientId);
      return {
        ...v,
        patient: p || {
          id: v.patientId,
          name: v.patientName,
          age: v.patientAge,
          gender: v.patientGender,
          phone: v.patientPhone,
          heightCm: v.heightCm,
          weightKg: v.weightKg,
        },
      };
    });
  }

  static getPatientTimeline(patientId: string): any[] {
    const all = Array.from(memoryVisits.values()).filter((v) => v.patientId === patientId);
    const sorted = all.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
    return sorted.map((v) => {
      const p = memoryPatients.get(v.patientId);
      return {
        ...v,
        patient: p,
      };
    });
  }

  static async attachDocument(visitId: string, docData: any): Promise<void> {
    const visit = memoryVisits.get(visitId);
    if (visit) {
      visit.documents.push(docData);
    }
  }

  static async getSummary(visitId: string): Promise<PhysicianClinicalSummary> {
    const visit = memoryVisits.get(visitId);
    const history = visit ? visit.messages : [];
    const documents = visit ? visit.documents : [];
    const clinicalMode = visit ? visit.clinicalMode : 'ALLOPATHIC';
    const language = visit ? visit.language : 'hi-IN';

    const summary = await GeminiService.generatePhysicianSummary({
      history,
      documents,
      clinicalMode,
      language,
    });

    if (visit) {
      visit.summary = summary;
      if (visit.priority === 'HIGH_PRIORITY') {
        summary.redFlagFlags = true;
        summary.triageCategory = 'EMERGENCY_RED_FLAG';
      }
    }

    return summary;
  }

  static getVisitDetails(visitId: string) {
    return memoryVisits.get(visitId);
  }

  private static activePathwaysMap = new Map<string, string>();

  static setActivePathway(visitId: string, pathway: string) {
    AdaptiveHistoryService.activePathwaysMap.set(visitId, pathway);
    const visit = memoryVisits.get(visitId);
    if (visit) {
      visit.activePathway = pathway;
    }
  }

  static getActivePathway(visitId: string): string | null {
    if (AdaptiveHistoryService.activePathwaysMap.has(visitId)) {
      return AdaptiveHistoryService.activePathwaysMap.get(visitId) || null;
    }
    const visit = memoryVisits.get(visitId);
    return visit ? (visit.activePathway || null) : null;
  }

  static syncMemoryVisit(
    visitId: string,
    userMessage: string,
    aiResponse: any,
    language: string = 'en-IN',
    clinicalMode: 'ALLOPATHIC' | 'AYUSH' = 'ALLOPATHIC',
    activePathway?: string | null
  ) {
    let visit = memoryVisits.get(visitId);
    if (!visit) {
      visit = {
        id: visitId,
        patientId: 'patient-default',
        patientName: 'OPD Patient',
        patientAge: 35,
        patientGender: 'Other',
        patientPhone: '9876543210',
        language,
        clinicalMode,
        activePathway: activePathway || AdaptiveHistoryService.activePathwaysMap.get(visitId) || null,
        status: 'IN_PROGRESS',
        priority: 'NORMAL',
        messages: [],
        documents: [],
        createdAt: new Date(),
      };
      memoryVisits.set(visitId, visit);
    } else if (activePathway) {
      visit.activePathway = activePathway;
      AdaptiveHistoryService.activePathwaysMap.set(visitId, activePathway);
    }

    if (userMessage) {
      visit.messages.push({
        id: uuidv4(),
        role: 'user',
        content: userMessage,
        timestamp: new Date(),
      });
    }

    if (aiResponse?.nextQuestion) {
      visit.messages.push({
        id: uuidv4(),
        role: 'assistant',
        content: aiResponse.nextQuestion,
        timestamp: new Date(),
      });
    }

    if (aiResponse?.isEmergency) {
      visit.status = 'TRIAGE_ESCALATED';
      visit.priority = 'HIGH_PRIORITY';
    } else if (aiResponse?.isComplete) {
      visit.status = 'COMPLETED';
      visit.completedAt = new Date();
    }
  }

  static clearAll() {
    AdaptiveHistoryService.activePathwaysMap.clear();
    memoryPatients.clear();
    memoryVisits.clear();
  }
}
