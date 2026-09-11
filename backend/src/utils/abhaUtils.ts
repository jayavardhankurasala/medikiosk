/**
 * Ayushman Bharat Health Account (ABHA) ID Utilities
 * Manages 14-digit ABHA ID formatting, sanitization, and mock generation
 */

export const generateAbhaId = (): string => {
  // Generates a mock 14-digit number formatted as XX-XXXX-XXXX-XXXX
  const p1 = Math.floor(10 + Math.random() * 90).toString();
  const p2 = Math.floor(1000 + Math.random() * 9000).toString();
  const p3 = Math.floor(1000 + Math.random() * 9000).toString();
  const p4 = Math.floor(1000 + Math.random() * 9000).toString();
  return `${p1}-${p2}-${p3}-${p4}`;
};

export const cleanAbha = (raw: string): string => raw.replace(/[^0-9]/g, '');

export const formatAbha = (raw: string): string => {
  const c = cleanAbha(raw);
  if (c.length !== 14) return raw;
  return `${c.slice(0, 2)}-${c.slice(2, 6)}-${c.slice(6, 10)}-${c.slice(10, 14)}`;
};
