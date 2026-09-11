import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function reset() {
  console.log('Wiping database...');
  await prisma.document.deleteMany();
  await prisma.message.deleteMany();
  await prisma.clinicalSummary.deleteMany();
  await prisma.visit.deleteMany();
  await prisma.patient.deleteMany();
  console.log('Database completely reset. Ready for fresh profiles.');
}

reset()
  .catch((err) => {
    console.error('Reset database error:', err);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
