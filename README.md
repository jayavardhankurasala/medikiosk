# MediKiosk – AI Multimodal Clinical Intake & Document Digitization Platform

MediKiosk is an AI-powered clinical history and case-taking kiosk platform designed for high-density hospital outpatient departments (OPDs) and AYUSH clinical institutions (Ministry of Ayush / AIIMS / Tertiary Hospitals).

## Key Capabilities
1. **Multilingual Touch & Voice Intake**: Web Speech API (`SpeechRecognition` & `SpeechSynthesis`) supporting Hindi, English, Tamil, Telugu, Kannada, Malayalam, and Bengali.
2. **Clinical Reasoning & Adaptive Branching**: Powered by Gemini 2.5 Flash (`@google/genai`) adhering to:
   - **SOCRATES** framework (Site, Onset, Character, Radiation, Associations, Timing, Exacerbating/relieving, Severity) for allopathic OPDs.
   - **Dashavidha Pariksha** (Prakriti, Vikriti, Agni, Koshtha, Ahara-Vihara, etc.) for AYUSH OPDs.
3. **Real-time Red-Flag Emergency Triage**: Instant detection of life-threatening presentations (e.g., myocardial infarction, acute stroke signs, critical dyspnea) with immediate visual & audible alarms.
4. **Multimodal Document OCR & Entity Extraction**: Direct scanning and analysis of handwritten and printed prescriptions, lab test values with out-of-range flag detection, and chronological ordering.
5. **ABDM & DPDP Act 2023 Compliance**: ABHA ID verification, SMS OTP authentication, granular audio-guided consent, and automatic session wiping on completion.
6. **Physician Consultation Summary**: Standardized, editable clinical summary card and FHIR-ready payload for doctors to review in seconds.

## Tech Stack
- **Frontend**: React, Vite, Web Speech API, High-Contrast Accessibility Design System (min-height 60px touch targets, WCAG AAA mode).
- **Backend**: Node.js, Express, TypeScript/ESM, Helmet, CORS, Multer.
- **AI Core**: Google Gen AI SDK (`@google/genai`) with `gemini-2.5-flash`.
- **Database & ORM**: PostgreSQL via Prisma ORM.

## Quick Start

### 1. Installation
```bash
npm run install:all
```

### 2. Configure Environment
Copy `.env.example` to `backend/.env` and supply your `GEMINI_API_KEY`:
```bash
cp .env.example backend/.env
```

### 3. Run Development Servers
```bash
npm run dev
```
- Backend will run on: `http://localhost:5000`
- Frontend Kiosk will run on: `http://localhost:5173`
