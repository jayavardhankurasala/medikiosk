# ==============================================================================
# Stage 1: Build Frontend (Vite + React)
# ==============================================================================
FROM node:20-alpine AS frontend-builder
WORKDIR /app/frontend

COPY frontend/package*.json ./
RUN npm ci

COPY frontend/ ./
RUN npm run build

# ==============================================================================
# Stage 2: Build Backend (TypeScript + Prisma)
# ==============================================================================
FROM node:20-alpine AS backend-builder
WORKDIR /app/backend

COPY backend/package*.json ./
COPY backend/prisma ./prisma/
RUN npm ci

COPY backend/ ./
RUN npx prisma generate
RUN npm run build

# ==============================================================================
# Stage 3: Production Runtime
# ==============================================================================
FROM node:20-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV PORT=5000

# Install OpenSSL for Prisma engine compatibility
RUN apk add --no-cache openssl

# Copy backend build and production dependencies
WORKDIR /app/backend
COPY backend/package*.json ./
COPY backend/prisma ./prisma/
RUN npm ci --omit=dev
RUN npx prisma generate

COPY --from=backend-builder /app/backend/dist ./dist
COPY backend/src/data ./src/data
COPY --from=frontend-builder /app/frontend/dist /app/frontend/dist

# Create uploads directory with write permissions
RUN mkdir -p uploads

EXPOSE 5000

CMD ["sh", "-c", "npx prisma db push && node dist/index.js"]
