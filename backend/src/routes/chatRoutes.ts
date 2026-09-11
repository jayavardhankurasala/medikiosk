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


// Load 50 Clinical Pathways Database
let pathways: Record<string, Array<{ question: string; options: string[] }>> = {};
try {
  const pathwaysPath = path.join(__dirname, '..', 'data', 'pathways.json');
  if (fs.existsSync(pathwaysPath)) {
    pathways = JSON.parse(fs.readFileSync(pathwaysPath, 'utf-8'));
    console.log(`[Pathways Loaded] Loaded ${Object.keys(pathways).length} static clinical pathways`);
  }
} catch (e) {
  console.warn('Could not load pathways.json:', e);
}

/**
 * POST /api/ai/chat (and /api/chat)
 * Hybrid Controller: Static 10-Question Pathways for 50 Illnesses + Dynamic Gemini Fallback
 */
chatRoutes.post('/chat', optionalAuth, async (req: Request, res: Response): Promise<void> => {
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
    if (!activePathway && isFirstTurn) {
      const candidateKeys = Object.keys(pathways);
      const matched = await GeminiService.classifySymptom(userMessage, candidateKeys);

      if (matched && matched !== 'UNKNOWN' && pathways[matched]) {
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

    // STEP B: Static Routing (The Fast Path)
    if (activePathway && pathways[activePathway]) {
      const stepIndex = assistantCount;

      if (stepIndex < 10) {
        const item = pathways[activePathway][stepIndex];
        let nextQuestion = item.question;
        let options = [...item.options];

        // Step 4: Multilingual Support - Fast Single-shot translation if hi-IN or te-IN
        if (targetLang === 'hi-IN' || targetLang === 'te-IN') {
          const translated = await GeminiService.translateQuestionAndOptions(nextQuestion, options, targetLang);
          nextQuestion = translated.question;
          options = translated.options;
        }

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
    const aiResponse = await GeminiService.generateNextQuestion({
      userMessage,
      history: updatedHistory,
      language: targetLang,
      clinicalMode: targetMode,
    });

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
