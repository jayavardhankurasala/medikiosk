import express from 'express';
import path from 'path';
import cors from 'cors';
import helmet from 'helmet';
import { ENV } from './config/env.js';
import { authRoutes } from './routes/authRoutes.js';
import { chatRoutes } from './routes/chatRoutes.js';
import { documentRoutes } from './routes/documentRoutes.js';
import { summaryRoutes } from './routes/summaryRoutes.js';
import { patientRoutes } from './routes/patientRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';

import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Security and middleware
app.use(helmet({
  crossOriginResourcePolicy: false,
  contentSecurityPolicy: false,
}));

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

// Serve static uploaded files (profile photos and documents)
app.use('/uploads', express.static(ENV.UPLOAD_DIR));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'MediKiosk AI Multimodal Clinical Intake Platform',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    geminiConfigured: !!ENV.GEMINI_API_KEY,
    smsProvider: ENV.SMS_PROVIDER,
  });
});

// Mount modular API routes
app.use('/api/auth', authRoutes);
app.use('/api/ai', chatRoutes);
app.use('/api/chat', chatRoutes); // Alias for convenience
app.use('/api/documents', documentRoutes);
app.use('/api/visits', summaryRoutes);
app.use('/api', patientRoutes);

// Global error handler
app.use(errorHandler);

// Resolve frontend build directory across various execution roots (repo root, backend folder, or Docker)
const candidateFrontendPaths = [
  path.resolve(__dirname, '../../frontend/dist'),
  path.resolve(__dirname, '../frontend/dist'),
  path.resolve(process.cwd(), 'frontend/dist'),
  path.resolve(process.cwd(), '../frontend/dist'),
  path.resolve(process.cwd(), 'dist/frontend'),
];

let resolvedFrontendDist: string | null = null;
for (const p of candidateFrontendPaths) {
  if (fs.existsSync(path.join(p, 'index.html'))) {
    resolvedFrontendDist = p;
    break;
  }
}

if (resolvedFrontendDist) {
  console.log(`📦 Serving React frontend from: ${resolvedFrontendDist}`);
  app.use(express.static(resolvedFrontendDist, { maxAge: '1d' }));

  // SPA fallback for client-side routing
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api/') && !req.path.startsWith('/uploads/')) {
      res.sendFile(path.join(resolvedFrontendDist!, 'index.html'));
    } else {
      res.status(404).json({ error: 'Endpoint not found' });
    }
  });
} else {
  console.log('ℹ️  No static frontend build found. Frontend runs separately in dev mode (e.g. Vite on port 5173).');
}

const PORT = Number(ENV.PORT) || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log('====================================================');
  console.log(`🏥 MediKiosk Backend running on http://0.0.0.0:${PORT} (Accessible locally & across network)`);
  console.log(`🤖 Gemini AI Mode: ${ENV.GEMINI_API_KEY ? 'Connected (gemini-2.5-flash)' : 'Smart Clinical Logic Fallback'}`);
  console.log(`📱 SMS OTP Provider: ${ENV.SMS_PROVIDER}`);
  console.log('====================================================');
});
