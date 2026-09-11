import { Router, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { authenticateToken, optionalAuth, AuthenticatedRequest } from '../middlewares/authMiddleware.js';
import { AdaptiveHistoryService } from '../services/adaptiveHistoryService.js';
import { saveBase64File } from '../utils/fileStorage.js';

const prisma = new PrismaClient();
export const patientRoutes = Router();

/**
 * PATCH /api/patients/me - Update patient profile (demographics, vitals, photo)
 */
patientRoutes.patch('/patients/me', authenticateToken, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const patientId = req.user?.id || req.user?.patientId;
    if (!patientId) {
      res.status(401).json({ success: false, message: 'Unauthorized: Patient ID not found in token' });
      return;
    }

    const { name, age, gender, heightCm, weightKg, profilePhotoUrl } = req.body;

    // Process profile photo if provided as Base64 string
    let photoUrl = profilePhotoUrl;
    if (profilePhotoUrl && typeof profilePhotoUrl === 'string' && profilePhotoUrl.startsWith('data:image')) {
      try {
        photoUrl = saveBase64File(profilePhotoUrl, 'profiles');
      } catch (err: any) {
        console.warn('Failed to save profile picture to disk:', err.message);
      }
    }

    const updateData: any = {};
    if (name !== undefined) updateData.name = name;
    if (age !== undefined) updateData.age = parseInt(String(age), 10);
    if (gender !== undefined) updateData.gender = gender;
    if (heightCm !== undefined) updateData.heightCm = heightCm ? parseFloat(String(heightCm)) : null;
    if (weightKg !== undefined) updateData.weightKg = weightKg ? parseFloat(String(weightKg)) : null;
    if (photoUrl !== undefined) updateData.profilePhotoUrl = photoUrl;

    let updatedPatient = null;
    try {
      updatedPatient = await prisma.patient.update({
        where: { id: patientId },
        data: updateData,
      });
    } catch (dbErr: any) {
      console.warn('Prisma patient update error:', dbErr.message);
      // In-memory fallback
      const existing = AdaptiveHistoryService.getPatient(patientId) || {};
      updatedPatient = {
        ...existing,
        id: patientId,
        phone: req.user?.phone || '9876543210',
        ...updateData,
      };
      AdaptiveHistoryService.upsertPatient(updatedPatient);
    }

    res.json({
      success: true,
      message: 'Profile updated successfully',
      patient: updatedPatient,
    });
  } catch (error: any) {
    console.error('Error updating patient profile:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * GET /api/patients/me - Fetch currently logged in patient profile
 */
patientRoutes.get('/patients/me', authenticateToken, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const patientId = req.user?.id || req.user?.patientId;
    if (!patientId) {
      res.status(401).json({ success: false, message: 'Unauthorized' });
      return;
    }

    let patient = null;
    try {
      patient = await prisma.patient.findUnique({
        where: { id: patientId },
      });
    } catch (dbErr: any) {
      console.warn('Prisma patient get fallback:', dbErr.message);
    }

    if (!patient) {
      patient = AdaptiveHistoryService.getPatient(patientId) as any;
    }

    if (!patient) {
      res.status(404).json({ success: false, message: 'Patient not found' });
      return;
    }

    res.json({ success: true, patient });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * GET /api/patients/me/history - Fetch past visits, summaries, and documents for timeline
 */
patientRoutes.get('/patients/me/history', optionalAuth, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const patientId = req.user?.id || req.user?.patientId || String(req.query.patientId || '');

    let visits: any[] = [];
    if (patientId && prisma) {
      try {
        visits = await prisma.visit.findMany({
          where: { patientId },
          include: {
            clinicalSummary: true,
            documents: true,
            messages: {
              where: { role: 'user' },
              take: 1,
              orderBy: { timestamp: 'asc' },
            },
          },
          orderBy: { createdAt: 'desc' },
        });
      } catch (dbErr: any) {
        console.warn('Prisma patient history lookup fallback:', dbErr.message);
      }
    }

    // Map into normalized timeline format
    const timeline = visits.map((v) => ({
      id: v.id,
      createdAt: v.createdAt,
      status: v.status,
      clinicalMode: v.clinicalMode,
      chiefComplaint: v.clinicalSummary?.chiefComplaint || v.messages?.[0]?.content || 'General Clinical Consultation',
      doctorDiagnosis: v.clinicalSummary?.doctorDiagnosis || 'OPD Consultation Completed',
      bloodPressure: v.bloodPressure,
      temperature: v.temperature,
      spo2: v.spo2,
      bmi: v.bmi,
      prescribedTests: v.clinicalSummary?.prescribedTests || [],
      prescribedMedications: (v.clinicalSummary?.prescribedMedications as any[]) || [],
      documents: (v.documents || []).map((d: any) => ({
        id: d.id,
        documentType: d.documentType,
        fileUrl: d.fileUrl,
        extractedJson: d.extractedJson,
        createdAt: d.createdAt,
      })),
      messages: v.messages || [],
    }));

    res.json({
      success: true,
      patientId,
      visits: timeline,
      timeline,
    });
  } catch (error: any) {
    console.error('Error fetching patient history:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * POST /api/visits - Create a new Visit record
 * Accepts patientId, clinicalMode ('ALLOPATHIC' | 'AYUSH'), and language
 */
patientRoutes.post('/visits', optionalAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    const { patientId, clinicalMode, language } = req.body;

    let targetPatientId = patientId;

    try {
      // 1. Validate or resolve patient in PostgreSQL via Prisma
      let patient = targetPatientId ? await prisma.patient.findUnique({ where: { id: targetPatientId } }) : null;
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
      targetPatientId = patient.id;

      // 2. Create Visit record with status: "IN_PROGRESS"
      const visit = await prisma.visit.create({
        data: {
          patientId: targetPatientId,
          clinicalMode: clinicalMode || 'ALLOPATHIC',
          language: language || 'en-IN',
          status: 'IN_PROGRESS',
          priority: 'NORMAL',
        },
      });

      // Synchronize in-memory cache for clinical staff portals
      AdaptiveHistoryService.initVisit(visit.id, {
        patientId: targetPatientId,
        language: visit.language,
        clinicalMode: visit.clinicalMode as any,
      });

      res.status(201).json({
        success: true,
        visitId: visit.id,
        visit,
      });
      return;
    } catch (dbErr: any) {
      console.warn('[Prisma Notice / Memory Fallback in createVisit]:', dbErr.message);

      // In-memory fallback if database server is temporarily offline
      const memVisit = await AdaptiveHistoryService.createOrGetVisit({
        patientId: targetPatientId || 'p-001',
        language: language || 'en-IN',
        clinicalMode: clinicalMode || 'ALLOPATHIC',
      });

      res.status(201).json({
        success: true,
        visitId: memVisit.id,
        visit: memVisit,
      });
      return;
    }
  } catch (error: any) {
    console.error('Error creating visit:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});

/**
 * GET /api/patients/:patientId - Fetch patient details
 */
patientRoutes.get('/patients/:patientId', optionalAuth, async (req: Request, res: Response): Promise<void> => {
  try {
    const patientId = String(req.params.patientId);
    try {
      const patient = await prisma.patient.findUnique({
        where: { id: patientId },
        include: { visits: true },
      });
      if (patient) {
        res.json({ success: true, patient });
        return;
      }
    } catch (dbErr: any) {
      console.warn('[Prisma Notice / Fallback in getPatient]:', dbErr.message);
    }

    const memPatient = AdaptiveHistoryService.getPatient(patientId);
    if (!memPatient) {
      res.status(404).json({ success: false, message: 'Patient not found' });
      return;
    }

    res.json({ success: true, patient: memPatient });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});
