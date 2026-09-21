import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { SmsService } from '../services/smsService.js';
import { AdaptiveHistoryService } from '../services/adaptiveHistoryService.js';
import { ENV } from '../config/env.js';
import { v4 as uuidv4 } from 'uuid';
import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient | null = null;
try {
  prisma = new PrismaClient();
} catch (e) {
  // in-memory fallback
}

import { generateAbhaId, formatAbha, cleanAbha } from '../utils/abhaUtils.js';
import { saveBase64File } from '../utils/fileStorage.js';

export const authRoutes = Router();

// Send SMS OTP with smart phone/ABHA detection and account verification
authRoutes.post('/send-otp', async (req: Request, res: Response): Promise<void> => {
  try {
    const { identifier, phone, abhaId } = req.body;
    const rawInput = (identifier || phone || abhaId || '').toString().trim();

    if (!rawInput) {
      res.status(400).json({ success: false, message: 'Valid 10-digit mobile number or 14-digit ABHA ID required' });
      return;
    }

    let existingPatient: any = null;
    let targetPhone: string | null = null;

    const cleanInput = cleanAbha(rawInput);
    const isTenDigitPhone = /^\d{10}$/.test(rawInput);
    const isFourteenDigitAbha = cleanInput.length === 14;

    if (!isTenDigitPhone && !isFourteenDigitAbha) {
      res.status(400).json({ success: false, message: 'Valid 10-digit mobile number or 14-digit ABHA ID required' });
      return;
    }

    if (isTenDigitPhone) {
      // Phone Detection: If the identifier is exactly 10 digits (using regex /^\d{10}$/), query prisma.patient.findUnique({ where: { phone: identifier } })
      if (prisma) {
        try {
          existingPatient = await prisma.patient.findUnique({
            where: { phone: rawInput },
          });
        } catch (dbErr) {
          console.warn('Prisma phone lookup warning:', dbErr);
        }
      }
      if (!existingPatient) {
        existingPatient = AdaptiveHistoryService.findPatientByPhoneOrAadhaar(rawInput);
      }
    } else if (isFourteenDigitAbha) {
      // ABHA Detection: If the identifier contains 14 digits (ignoring hyphens), use cleanAbha(identifier) and query prisma.patient.findUnique({ where: { abhaId: cleanedIdentifier } })
      const cleanedIdentifier = cleanInput;
      if (prisma) {
        try {
          existingPatient = await prisma.patient.findUnique({
            where: { abhaId: cleanedIdentifier },
          });
          if (!existingPatient) {
            existingPatient = await prisma.patient.findFirst({
              where: {
                OR: [
                  { abhaId: cleanedIdentifier },
                  { abhaId: formatAbha(cleanedIdentifier) },
                ],
              },
            });
          }
        } catch (dbErr) {
          console.warn('Prisma ABHA lookup warning:', dbErr);
        }
      }
      if (!existingPatient) {
        existingPatient = AdaptiveHistoryService.findPatientByAbha(cleanedIdentifier);
      }
    }

    // If neither matches, return a 404 error: "Account not found. Please register as a new patient."
    if (!existingPatient) {
      res.status(404).json({
        success: false,
        message: 'Account not found. Please register as a new patient.',
      });
      return;
    }

    targetPhone = existingPatient.phone;
    if (!targetPhone || targetPhone.length < 10) {
      res.status(400).json({ success: false, message: 'Registered patient phone record is invalid' });
      return;
    }

    const otp = SmsService.generateOtp();
    const result = await SmsService.sendOtp(targetPhone, otp, rawInput);

    res.json({
      success: true,
      message: result.message,
      phone: targetPhone,
      mockOtp: result.mockOtp,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Verify OTP and issue JWT
authRoutes.post('/verify-otp', async (req: Request, res: Response): Promise<void> => {
  try {
    const { identifier, phone, abhaId, otpCode, name, age, gender } = req.body;

    if ((!phone && !abhaId && !identifier) || !otpCode) {
      res.status(400).json({ success: false, message: 'Phone or ABHA ID and OTP code are required' });
      return;
    }

    const inputKey = (identifier || phone || abhaId || '').toString().trim();
    const cleanKey = cleanAbha(inputKey);
    const isTenDigit = /^\d{10}$/.test(inputKey);

    // Look up patient in Prisma / Memory by phone OR by abhaId
    let existingPatient: any = null;
    if (isTenDigit) {
      if (prisma) {
        try {
          existingPatient = await prisma.patient.findUnique({ where: { phone: inputKey } });
        } catch (e) {}
      }
      if (!existingPatient) {
        existingPatient = AdaptiveHistoryService.findPatientByPhoneOrAadhaar(inputKey);
      }
    } else {
      if (prisma) {
        try {
          existingPatient = await prisma.patient.findUnique({ where: { abhaId: inputKey } });
          if (!existingPatient) {
            existingPatient = await prisma.patient.findFirst({
              where: {
                OR: [
                  { abhaId: inputKey },
                  { abhaId: cleanKey },
                  { abhaId: formatAbha(cleanKey) },
                ],
              },
            });
          }
        } catch (e) {}
      }
      if (!existingPatient) {
        existingPatient = AdaptiveHistoryService.findPatientByAbha(cleanKey) || AdaptiveHistoryService.findPatientByAbha(inputKey);
      }
    }

    const targetPhone = existingPatient?.phone || (isTenDigit ? inputKey : (phone || '9876543210'));
    const resolvedAbha = existingPatient?.abhaId || (isTenDigit ? (abhaId || generateAbhaId()) : (inputKey || formatAbha(cleanKey)));

    // Verify OTP against all possible identifiers: targetPhone, inputKey, cleanKey, phone, or test code 123456
    const isValid =
      (targetPhone && SmsService.verifyOtp(targetPhone, otpCode)) ||
      (inputKey && SmsService.verifyOtp(inputKey, otpCode)) ||
      (cleanKey && SmsService.verifyOtp(cleanKey, otpCode)) ||
      (phone && SmsService.verifyOtp(phone, otpCode)) ||
      otpCode.trim() === '123456';

    if (!isValid) {
      res.status(400).json({ success: false, message: 'Invalid or expired OTP code' });
      return;
    }

    const patientId = existingPatient?.id || uuidv4();

    const patient = {
      id: patientId,
      phone: targetPhone,
      name: existingPatient?.name || name || 'OPD Patient',
      age: existingPatient?.age || (age ? parseInt(age, 10) : 35),
      gender: existingPatient?.gender || gender || 'Other',
      abhaId: resolvedAbha,
      profilePhotoUrl: existingPatient?.profilePhotoUrl || null,
      heightCm: existingPatient?.heightCm || null,
      weightKg: existingPatient?.weightKg || null,
    };

    if (prisma && !existingPatient) {
      try {
        await prisma.patient.create({
          data: {
            id: patientId,
            phone: patient.phone,
            name: patient.name,
            age: patient.age,
            gender: patient.gender,
            abhaId: resolvedAbha,
          },
        });
      } catch {
        // Fallback
      }
    }

    const token = jwt.sign(
      {
        id: patient.id,
        patientId: patient.id,
        phone: patient.phone,
        name: patient.name,
        abhaId: resolvedAbha,
      },
      ENV.JWT_SECRET,
      { expiresIn: '12h' }
    );

    res.json({
      success: true,
      message: 'Authentication successful',
      token,
      patient,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Register New Patient with automatic mock ABHA generation
authRoutes.post('/register-patient', async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, age, gender, phone, heightCm, weightKg, profilePhotoUrl, aadhaarId, aadhaar } = req.body;

    if (!name || !phone || phone.length < 10) {
      res.status(400).json({
        success: false,
        message: 'Name and valid 10-digit phone number are required for registration',
      });
      return;
    }

    const rawAadhaar = aadhaarId || aadhaar;
    const cleanAadhaar = rawAadhaar && typeof rawAadhaar === 'string' ? rawAadhaar.trim() : null;

    // Check if phone number or Aadhaar ID is already registered
    let existingPatient: any = null;
    if (prisma) {
      try {
        const conditions: any[] = [{ phone }];
        if (cleanAadhaar) {
          conditions.push({ aadhaarId: cleanAadhaar });
        }
        existingPatient = await prisma.patient.findFirst({
          where: {
            OR: conditions,
          },
        });
      } catch (dbErr) {
        console.warn('Prisma duplicate check error:', dbErr);
      }
    }

    // Fallback in-memory check
    if (!existingPatient) {
      existingPatient = AdaptiveHistoryService.findPatientByPhoneOrAadhaar(phone, cleanAadhaar);
    }

    // Preserve existing patient ID and unique ABHA ID if account exists
    const patientId = existingPatient?.id || uuidv4();
    const abhaId = existingPatient?.abhaId || (req.body.abhaId ? formatAbha(req.body.abhaId) : generateAbhaId(phone));
    const numericAge = age ? parseInt(age, 10) : (existingPatient?.age || 30);
    const resolvedGender = gender || existingPatient?.gender || 'Other';
    const parsedHeight = heightCm ? parseFloat(heightCm) : existingPatient?.heightCm;
    const parsedWeight = weightKg ? parseFloat(weightKg) : existingPatient?.weightKg;

    // Permanently save base64 profile photo to disk if provided
    let savedPhotoUrl: string | null = null;
    if (profilePhotoUrl) {
      if (typeof profilePhotoUrl === 'string' && profilePhotoUrl.startsWith('data:')) {
        try {
          savedPhotoUrl = saveBase64File(profilePhotoUrl, 'profiles');
        } catch (err) {
          console.warn('Could not save base64 profile photo to disk:', err);
        }
      } else {
        savedPhotoUrl = profilePhotoUrl;
      }
    }

    const patient = {
      id: patientId,
      phone,
      aadhaarId: cleanAadhaar || undefined,
      name,
      age: numericAge,
      gender: resolvedGender,
      abhaId,
      heightCm: parsedHeight,
      weightKg: parsedWeight,
      profilePhotoUrl: savedPhotoUrl || undefined,
    };

    // Keep in-memory store in sync
    AdaptiveHistoryService.upsertPatient(patient);

    if (prisma) {
      try {
        await prisma.patient.upsert({
          where: { phone },
          update: {
            name,
            age: numericAge,
            gender: resolvedGender,
            abhaId,
            aadhaarId: cleanAadhaar || null,
            heightCm: parsedHeight,
            weightKg: parsedWeight,
            profilePhotoUrl: savedPhotoUrl || null,
          },
          create: {
            id: patientId,
            phone,
            name,
            age: numericAge,
            gender: resolvedGender,
            abhaId,
            aadhaarId: cleanAadhaar || null,
            heightCm: parsedHeight,
            weightKg: parsedWeight,
            profilePhotoUrl: savedPhotoUrl || null,
          },
        });
      } catch (dbErr) {
        console.warn('Prisma patient upsert fallback:', dbErr);
      }
    }

    const token = jwt.sign(
      {
        phone,
        patientId,
        name,
        abhaId,
      },
      ENV.JWT_SECRET,
      { expiresIn: '12h' }
    );

    res.json({
      success: true,
      message: 'Patient registered and ABHA ID successfully created',
      token,
      patient,
    });
  } catch (error: any) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Quick lookup to check if a phone number or ABHA ID is already registered
authRoutes.get('/lookup/:identifier', async (req: Request, res: Response): Promise<void> => {
  try {
    const rawParam = req.params.identifier;
    const raw = (Array.isArray(rawParam) ? rawParam[0] : (rawParam || '')).toString().trim();
    const clean = cleanAbha(raw);
    let patient: any = null;

    if (/^\d{10}$/.test(raw)) {
      if (prisma) {
        try {
          patient = await prisma.patient.findUnique({ where: { phone: raw } });
        } catch {}
      }
      if (!patient) {
        patient = AdaptiveHistoryService.findPatientByPhoneOrAadhaar(raw);
      }
    } else if (clean.length === 14) {
      if (prisma) {
        try {
          patient = await prisma.patient.findUnique({ where: { abhaId: clean } }) ||
            await prisma.patient.findFirst({
              where: {
                OR: [{ abhaId: clean }, { abhaId: formatAbha(clean) }]
              }
            });
        } catch {}
      }
      if (!patient) {
        patient = AdaptiveHistoryService.findPatientByAbha(clean);
      }
    }

    if (patient) {
      res.json({
        exists: true,
        patient: {
          id: patient.id,
          name: patient.name,
          phone: patient.phone,
          abhaId: patient.abhaId,
          age: patient.age,
          gender: patient.gender,
        },
      });
    } else {
      res.json({ exists: false });
    }
  } catch (e: any) {
    res.status(500).json({ exists: false, message: e.message });
  }
});

