import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { ENV } from '../config/env.js';

/**
 * Saves a base64-encoded image string to local disk storage.
 * @param base64Data Raw DataURL string (e.g., "data:image/jpeg;base64,...")
 * @param subfolder Target subfolder inside uploads ("profiles" | "documents")
 * @returns Public URL path (e.g., "/uploads/profiles/uuid.jpg")
 */
export const saveBase64File = (
  base64Data: string,
  subfolder: 'profiles' | 'documents'
): string => {
  const matches = base64Data.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
  if (!matches || matches.length !== 3) {
    throw new Error('Invalid base64 string');
  }

  const rawMime = matches[1].toLowerCase();
  const extension = rawMime.includes('png')
    ? 'png'
    : rawMime.includes('pdf')
    ? 'pdf'
    : 'jpg';

  const buffer = Buffer.from(matches[2], 'base64');
  const fileName = `${crypto.randomUUID()}.${extension}`;
  const uploadDir = path.join(ENV.UPLOAD_DIR, subfolder);

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  fs.writeFileSync(path.join(uploadDir, fileName), buffer);
  return `/uploads/${subfolder}/${fileName}`;
};

/**
 * Saves a binary Buffer (e.g. from Multer) to local disk storage.
 * @param buffer File binary buffer
 * @param mimeType Mime type string (e.g. "image/jpeg", "image/png", "application/pdf")
 * @param subfolder Target subfolder inside uploads ("profiles" | "documents")
 * @returns Public URL path (e.g., "/uploads/documents/uuid.jpg")
 */
export const saveBufferFile = (
  buffer: Buffer,
  mimeType: string,
  subfolder: 'profiles' | 'documents'
): string => {
  const rawMime = (mimeType || '').toLowerCase();
  const extension = rawMime.includes('png')
    ? 'png'
    : rawMime.includes('pdf')
    ? 'pdf'
    : 'jpg';

  const fileName = `${crypto.randomUUID()}.${extension}`;
  const uploadDir = path.join(ENV.UPLOAD_DIR, subfolder);

  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }

  fs.writeFileSync(path.join(uploadDir, fileName), buffer);
  return `/uploads/${subfolder}/${fileName}`;
};
