import { PrismaClient } from '@prisma/client';

export const prisma = new PrismaClient();

let isDatabaseReachable: boolean | null = null;
let lastDbCheck = 0;
let isChecking = false;

/**
 * Fast Circuit Breaker for Database Connectivity.
 * Prevents hanging on 15s TCP timeouts when remote database (Supabase)
 * is unreachable, allowing 0ms local fallback operations.
 */
export async function isDbAvailable(): Promise<boolean> {
  const now = Date.now();

  // Cache success for 60 seconds, but retry failed connections after 5 seconds
  const cacheTtl = isDatabaseReachable ? 60000 : 5000;
  if (isDatabaseReachable !== null && now - lastDbCheck < cacheTtl) {
    return isDatabaseReachable;
  }

  if (isChecking) {
    return isDatabaseReachable ?? false;
  }

  isChecking = true;
  lastDbCheck = now;

  try {
    const checkPromise = prisma.$queryRaw`SELECT 1`;
    const timeoutPromise = new Promise((_, reject) =>
      setTimeout(() => reject(new Error('DB Connect Timeout')), 3500)
    );

    await Promise.race([checkPromise, timeoutPromise]);
    isDatabaseReachable = true;
    console.log('[Database Status] PostgreSQL connected successfully to Supabase.');
  } catch (err: any) {
    isDatabaseReachable = false;
    console.warn('[Database Status] PostgreSQL temporarily unreachable:', err.message);
  } finally {
    isChecking = false;
  }

  return isDatabaseReachable;
}
