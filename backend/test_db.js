const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
prisma.().then(() => { console.log('SUCCESS!'); return prisma.(); }).catch(err => { console.error('FAILED:', err.message); return prisma.(); });
