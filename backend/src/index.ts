import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { ENV } from './config/env.js';
import { authRoutes } from './routes/authRoutes.js';
import { chatRoutes } from './routes/chatRoutes.js';
import { documentRoutes } from './routes/documentRoutes.js';
import { summaryRoutes } from './routes/summaryRoutes.js';
import { patientRoutes } from './routes/patientRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';

const app = express();

// Security and middleware
app.use(helmet({
  crossOriginResourcePolicy: false,
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

const PORT = ENV.PORT;
app.listen(PORT, () => {
  console.log('====================================================');
  console.log(`🏥 MediKiosk Backend running on http://localhost:${PORT}`);
  console.log(`🤖 Gemini AI Mode: ${ENV.GEMINI_API_KEY ? 'Connected (gemini-2.5-flash)' : 'Smart Clinical Logic Fallback'}`);
  console.log(`📱 SMS OTP Provider: ${ENV.SMS_PROVIDER}`);
  console.log('====================================================');
});
