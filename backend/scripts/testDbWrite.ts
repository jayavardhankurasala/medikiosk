import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';
dotenv.config();

const prisma = new PrismaClient();

async function main() {
  console.log('--- SUPABASE END-TO-END PERSISTENCE TEST ---');
  const testPhone = '9876543210';
  const testAbha = '91-9876-5432-1045';

  try {
    // 1. Clean up any prior test record
    await prisma.patient.deleteMany({
      where: { phone: testPhone },
    });

    // 2. Insert test patient
    console.log('1. Inserting patient into Supabase "patients" table...');
    const patient = await prisma.patient.create({
      data: {
        phone: testPhone,
        name: 'Ramesh Kumar (Test Verification)',
        age: 42,
        gender: 'Male',
        abhaId: testAbha,
        heightCm: 172.5,
        weightKg: 74.0,
      },
    });
    console.log('SUCCESS! Created patient:', patient.id, patient.name, patient.abhaId);

    // 3. Insert a test visit
    console.log('2. Inserting visit into Supabase "visits" table...');
    const visit = await prisma.visit.create({
      data: {
        patientId: patient.id,
        status: 'IN_PROGRESS',
        clinicalMode: 'ALLOPATHIC',
        language: 'en-IN',
        activePathway: 'Fever and Cough',
        bloodPressure: '120/80',
        temperature: 99.1,
        spo2: 98,
      },
    });
    console.log('SUCCESS! Created visit:', visit.id, visit.status);

    // 4. Insert a message
    console.log('3. Inserting message into Supabase "messages" table...');
    const message = await prisma.message.create({
      data: {
        visitId: visit.id,
        role: 'user',
        content: 'I have had a high fever and persistent dry cough for 3 days.',
      },
    });
    console.log('SUCCESS! Created message:', message.id);

    // 5. Query back with full relational includes
    console.log('4. Querying record back from Supabase with relations...');
    const fetched = await prisma.patient.findUnique({
      where: { id: patient.id },
      include: {
        visits: {
          include: {
            messages: true,
          },
        },
      },
    });

    console.log('Fetched from Supabase:');
    console.log(JSON.stringify(fetched, null, 2));

    console.log('\n--- VERIFICATION PASSED: Supabase database is LIVE and PERSISTING! ---');
  } catch (error) {
    console.error('Database persistence test FAILED:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
