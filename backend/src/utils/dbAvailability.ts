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

  // Cache reachability for 60 seconds
  if (isDatabaseReachable !== null && now - lastDbCheck < 60000) {
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
      setTimeout(() => reject(new Error('DB Connect Timeout')), 1500)
    );

    await Promise.race([checkPromise, timeoutPromise]);
    isDatabaseReachable = true;
    console.log('[Database Status] PostgreSQL connected successfully.');
  } catch (err: any) {
    isDatabaseReachable = false;
    console.log('[Database Status] PostgreSQL unreachable, using 0ms In-Memory cache.');
  } finally {
    isChecking = false;
  }

  return isDatabaseReachable;
}
