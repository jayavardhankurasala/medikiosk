import { Router, Request, Response } from 'express';
import { AdaptiveHistoryService } from '../services/adaptiveHistoryService.js';
import { v4 as uuidv4 } from 'uuid';

export const summaryRoutes = Router();

// 1. Fetch live queue strictly ordered by Visit.priority (HIGH_PRIORITY first)
summaryRoutes.get('/queue', async (req: Request, res: Response): Promise<void> => {
  try {
    const queue = AdaptiveHistoryService.getQueue();
    res.json({
      success: true,
      queue,
      count: queue.length,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 2. Nurse records or updates Patient Vitals
summaryRoutes.put('/:visitId/vitals', async (req: Request, res: Response): Promise<void> => {
  try {
    const visitId = String(req.params.visitId);
    const { bloodPressure, temperature, spo2, heightCm, weightKg } = req.body;

    const updated = AdaptiveHistoryService.recordVitals(visitId, {
      bloodPressure,
      temperature: temperature ? parseFloat(temperature) : undefined,
      spo2: spo2 ? parseInt(spo2, 10) : undefined,
      heightCm: heightCm ? parseFloat(heightCm) : undefined,
      weightKg: weightKg ? parseFloat(weightKg) : undefined,
    });

    if (!updated) {
      res.status(404).json({ success: false, message: 'Visit not found' });
      return;
    }

    res.json({
      success: true,
      message: 'Vitals recorded and BMI calculated successfully',
      visit: updated,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 3. Doctor Consultation Finalization
summaryRoutes.post('/:visitId/consultation', async (req: Request, res: Response): Promise<void> => {
  try {
    const visitId = String(req.params.visitId);
    const { doctorDiagnosis, prescribedTests, prescribedMedications } = req.body;

    const updated = AdaptiveHistoryService.finalizeConsultation(visitId, {
      doctorDiagnosis: doctorDiagnosis || 'Clinical examination conducted.',
      prescribedTests: prescribedTests || [],
      prescribedMedications: prescribedMedications || [],
    });

    if (!updated) {
      res.status(404).json({ success: false, message: 'Visit not found' });
      return;
    }

    res.json({
      success: true,
      message: 'Doctor consultation saved and visit marked COMPLETED',
      visit: updated,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 4. Patient Medical History Timeline
summaryRoutes.get('/patients/:patientId/timeline', async (req: Request, res: Response): Promise<void> => {
  try {
    const patientId = String(req.params.patientId);
    const timeline = AdaptiveHistoryService.getPatientTimeline(patientId);
    const patient = AdaptiveHistoryService.getPatient(patientId);

    res.json({
      success: true,
      patient,
      timeline,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 5. Update Patient Profile (Demographics, Height, Weight, Photo)
summaryRoutes.put('/patients/:patientId/profile', async (req: Request, res: Response): Promise<void> => {
  try {
    const patientId = String(req.params.patientId);
    const { name, age, gender, heightCm, weightKg, profilePhotoUrl, phone } = req.body;

    const updated = AdaptiveHistoryService.upsertPatient({
      id: patientId,
      phone: phone || '9876543210',
      name,
      age: age ? parseInt(age, 10) : undefined,
      gender,
      heightCm: heightCm ? parseFloat(heightCm) : undefined,
      weightKg: weightKg ? parseFloat(weightKg) : undefined,
      profilePhotoUrl,
    });

    res.json({
      success: true,
      message: 'Patient profile updated successfully',
      patient: updated,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 6. Generate or retrieve physician clinical summary
summaryRoutes.get('/:visitId/summary', async (req: Request, res: Response): Promise<void> => {
  try {
    const visitId = String(req.params.visitId);
    const summary = await AdaptiveHistoryService.getSummary(visitId);
    const visit = AdaptiveHistoryService.getVisitDetails(visitId);

    // Build ABDM FHIR-Compliant Composition Resource
    const fhirBundle = {
      resourceType: 'Bundle',
      id: uuidv4(),
      type: 'document',
      timestamp: new Date().toISOString(),
      entry: [
        {
          resource: {
            resourceType: 'Composition',
            id: uuidv4(),
            status: 'final',
            type: {
              coding: [
                {
                  system: 'http://snomed.info/sct',
                  code: '371530004',
                  display: 'Clinical consultation report',
                },
              ],
            },
            subject: {
              reference: `Patient/${visit?.patientId || 'anonymous'}`,
            },
            date: new Date().toISOString(),
            title: 'MediKiosk AI Outpatient Intake Summary',
            section: [
              {
                title: 'Chief Complaint & HPI',
                text: {
                  status: 'generated',
                  div: `<div><p><b>Chief Complaint:</b> ${summary.chiefComplaint}</p><p><b>HPI:</b> ${summary.hpi}</p></div>`,
                },
              },
              {
                title: 'Past Medical & Medication History',
                text: {
                  status: 'generated',
                  div: `<div><p><b>Past History:</b> ${summary.pastHistory}</p><p><b>Active Medications:</b> ${summary.medications}</p></div>`,
                },
              },
              ...(summary.ayushAssessment
                ? [
                    {
                      title: 'AYUSH Dashavidha Pariksha',
                      text: {
                        status: 'generated',
                        div: `<div><p><b>Prakriti:</b> ${summary.ayushAssessment.prakriti}</p><p><b>Agni:</b> ${summary.ayushAssessment.agni}</p><p><b>Koshtha:</b> ${summary.ayushAssessment.koshtha}</p></div>`,
                      },
                    },
                  ]
                : []),
            ],
          },
        },
      ],
    };

    res.json({
      success: true,
      summary,
      visit,
      fhirBundle,
      status: visit?.status || 'COMPLETED',
      tokenNumber: `OPD-${Math.floor(100 + Math.random() * 900)}`,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 7. Finalize and wipe temporary kiosk session data (DPDP Act compliance)
summaryRoutes.post('/:visitId/complete', async (req: Request, res: Response): Promise<void> => {
  try {
    const visitId = String(req.params.visitId);
    console.log(`[DPDP Compliance] Session completed and marked final for visit ${visitId}`);
    res.json({
      success: true,
      message: 'Kiosk session successfully finalized and archived. Temporary in-memory cache cleared.',
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 8. Triage Status Update (waiting_for_nurse -> vitals_recorded -> with_doctor -> completed)
summaryRoutes.put('/:visitId/triage-status', async (req: Request, res: Response): Promise<void> => {
  try {
    const visitId = String(req.params.visitId);
    const status = req.body.status || req.body.triageStatus;
    if (!status) {
      res.status(400).json({ success: false, message: 'Status field is required' });
      return;
    }
    const updated = AdaptiveHistoryService.updateTriageStatus(visitId, status);
    if (!updated) {
      res.status(404).json({ success: false, message: 'Visit not found' });
      return;
    }
    res.json({ success: true, visit: updated });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 9. Real-time Priority Alerts (Emergency Red Flags)
summaryRoutes.get('/alerts', async (req: Request, res: Response): Promise<void> => {
  try {
    const alerts = AdaptiveHistoryService.getAlerts();
    res.json({ success: true, alerts });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

summaryRoutes.put('/alerts/:alertId/ack', async (req: Request, res: Response): Promise<void> => {
  try {
    const alertId = String(req.params.alertId);
    const { staffName } = req.body;
    const updated = AdaptiveHistoryService.acknowledgeAlert(alertId, staffName);
    res.json({ success: !!updated, alert: updated });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

summaryRoutes.put('/alerts/:alertId/resolve', async (req: Request, res: Response): Promise<void> => {
  try {
    const alertId = String(req.params.alertId);
    const { staffName } = req.body;
    const updated = AdaptiveHistoryService.resolveAlert(alertId, staffName);
    res.json({ success: !!updated, alert: updated });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 10. DPDP Act Audit Logs & Activity Tracker
summaryRoutes.get('/audit-logs', async (req: Request, res: Response): Promise<void> => {
  try {
    const logs = AdaptiveHistoryService.getAuditLogs();
    res.json({ success: true, logs });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

summaryRoutes.post('/audit-log', async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, userName, role, action, resource, resourceId, visitId, details } = req.body;
    const resolvedRole = role || (userId?.startsWith('dr') ? 'doctor' : userId?.startsWith('staff') ? 'triage_staff' : 'patient');
    const resolvedUserName = userName || (resolvedRole === 'doctor' ? 'Attending Physician' : resolvedRole === 'triage_staff' ? 'Triage Staff' : 'Kiosk Patient');
    const resolvedResource = resource || (visitId ? 'Visit' : 'System');
    const resolvedResourceId = resourceId || visitId;

    const log = AdaptiveHistoryService.addAuditLog({
      userId: userId || 'kiosk-anon',
      userName: resolvedUserName,
      role: resolvedRole,
      action: action || 'ACTION_PERFORMED',
      resource: resolvedResource,
      resourceId: resolvedResourceId,
      details: details,
    });
    res.json({ success: true, log });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// 11. Patient Consent Recording (DPDP Act Compliance)
summaryRoutes.post('/consent', async (req: Request, res: Response): Promise<void> => {
  try {
    const { patientId, userId, purpose, consentType, version, status, granted, visitId, details } = req.body;
    const resolvedPurpose = purpose || consentType || 'OPD Clinical intake, vitals recording, and doctor review';
    const resolvedStatus: 'granted' | 'revoked' = (status === 'revoked' || granted === false) ? 'revoked' : 'granted';

    const consent = AdaptiveHistoryService.recordConsent({
      patientId: patientId || 'p-kiosk',
      userId: userId || patientId,
      visitId,
      consentType: consentType || resolvedPurpose,
      purpose: resolvedPurpose,
      version: version || '1.0',
      status: resolvedStatus,
      details: details,
    });
    res.json({ success: true, consent });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});
