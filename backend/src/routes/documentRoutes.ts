import { Router, Request, Response } from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { PrismaClient } from '@prisma/client';
import { GeminiService } from '../services/geminiService.js';
import { AdaptiveHistoryService } from '../services/adaptiveHistoryService.js';
import { saveBase64File, saveBufferFile } from '../utils/fileStorage.js';
import { ENV } from '../config/env.js';

let prisma: PrismaClient | null = null;
try {
  prisma = new PrismaClient();
} catch {
  // in-memory fallback
}

// Ensure uploads folder and subfolders exist
const profilesDir = path.join(ENV.UPLOAD_DIR, 'profiles');
const documentsDir = path.join(ENV.UPLOAD_DIR, 'documents');
if (!fs.existsSync(profilesDir)) {
  fs.mkdirSync(profilesDir, { recursive: true });
}
if (!fs.existsSync(documentsDir)) {
  fs.mkdirSync(documentsDir, { recursive: true });
}

const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 15 * 1024 * 1024 }, // 15MB limit
});

export const documentRoutes = Router();

// Scan, store, and extract entities from uploaded medical document
documentRoutes.post('/scan', upload.single('document'), async (req: Request, res: Response): Promise<void> => {
  try {
    const visitId = req.body.visitId || 'default-session';
    let fileBuffer: Buffer | null = null;
    let mimeType = 'image/jpeg';

    if (req.file) {
      fileBuffer = req.file.buffer;
      mimeType = req.file.mimetype;
    } else if (req.body.base64Data) {
      const parts = req.body.base64Data.split(';base64,');
      if (parts.length === 2) {
        mimeType = parts[0].replace('data:', '');
        fileBuffer = Buffer.from(parts[1], 'base64');
      } else {
        fileBuffer = Buffer.from(req.body.base64Data, 'base64');
      }
    }

    if (!fileBuffer) {
      res.status(400).json({ success: false, message: 'No document file or base64Data provided' });
      return;
    }

    // 1. Permanently save file to disk storage
    let fileUrl: string | null = null;
    try {
      if (req.file) {
        fileUrl = saveBufferFile(req.file.buffer, req.file.mimetype, 'documents');
      } else if (req.body.base64Data && req.body.base64Data.startsWith('data:')) {
        fileUrl = saveBase64File(req.body.base64Data, 'documents');
      } else {
        fileUrl = saveBufferFile(fileBuffer, mimeType, 'documents');
      }
    } catch (saveErr) {
      console.warn('Failed to save document to disk:', saveErr);
    }

    // 2. Perform Gemini Multimodal OCR Extraction
    console.log(`[Document OCR] Processing document for visit: ${visitId}, mime: ${mimeType}`);
    const extractedData = await GeminiService.processMedicalDocument(fileBuffer, mimeType);

    // 3. Keep in-memory cache synchronized for immediate kiosk/portal feedback
    await AdaptiveHistoryService.attachDocument(visitId, {
      ...extractedData,
      fileUrl: fileUrl || undefined,
      scannedAt: new Date(),
    });

    // 4. Persist to PostgreSQL database via Prisma
    let dbDocument = null;
    if (prisma && visitId && visitId !== 'default-session') {
      try {
        const visit = await prisma.visit.findUnique({ where: { id: visitId } });
        if (visit) {
          dbDocument = await prisma.document.create({
            data: {
              visitId,
              documentType: extractedData.documentType || 'PRESCRIPTION',
              rawText: extractedData.clinicalNotesSummary || null,
              extractedJson: extractedData as any,
              fileUrl: fileUrl || null,
            },
          });
        }
      } catch (dbErr) {
        console.warn('Prisma document creation fallback:', dbErr);
      }
    }

    res.json({
      success: true,
      message: 'Document analyzed, saved, and entities extracted successfully',
      fileUrl,
      document: dbDocument,
      extractedData,
    });
  } catch (error: any) {
    console.error('Document scan error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
});
