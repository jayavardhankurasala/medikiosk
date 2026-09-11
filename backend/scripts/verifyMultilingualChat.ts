import http from 'http';

function postJson(path: string, data: any): Promise<any> {
  return new Promise((resolve, reject) => {
    const postData = JSON.stringify(data);
    const req = http.request(
      {
        hostname: 'localhost',
        port: 5000,
        path,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(postData),
        },
      },
      (res) => {
        let body = '';
        res.on('data', (chunk) => (body += chunk));
        res.on('end', () => {
          try {
            resolve(JSON.parse(body));
          } catch (e) {
            resolve(body);
          }
        });
      }
    );
    req.on('error', reject);
    req.write(postData);
    req.end();
  });
}

async function verify() {
  console.log('--- 1. Testing Telugu Static Pathway (Fever) ---');
  const t1Start = Date.now();
  const resTe1 = await postJson('/api/ai/chat', {
    userMessage: 'నాకు జ్వరం వచ్చింది',
    language: 'te-IN',
  });
  const t1Elapsed = Date.now() - t1Start;
  console.log(`Response time: ${t1Elapsed}ms`);
  console.log('Active Pathway:', resTe1.activePathway);
  console.log('Next Question (Telugu):', resTe1.nextQuestion);
  console.log('Options (Telugu):', resTe1.options);
  console.log('Step Index:', resTe1.stepIndex);

  console.log('\n--- 2. Testing Telugu Turn 2 Follow-up ---');
  const t2Start = Date.now();
  const resTe2 = await postJson('/api/ai/chat', {
    visitId: resTe1.visitId,
    userMessage: 'ఈరోజు',
    language: 'te-IN',
  });
  const t2Elapsed = Date.now() - t2Start;
  console.log(`Response time: ${t2Elapsed}ms`);
  console.log('Next Question 2 (Telugu):', resTe2.nextQuestion);
  console.log('Options 2 (Telugu):', resTe2.options);
  console.log('Step Index:', resTe2.stepIndex);

  console.log('\n--- 3. Testing Hindi Static Pathway (Headache) ---');
  const t3Start = Date.now();
  const resHi = await postJson('/api/ai/chat', {
    userMessage: 'मुझे 2 दिन से बहुत तेज सिरदर्द है',
    language: 'hi-IN',
  });
  const t3Elapsed = Date.now() - t3Start;
  console.log(`Response time: ${t3Elapsed}ms`);
  console.log('Active Pathway:', resHi.activePathway);
  console.log('Next Question (Hindi):', resHi.nextQuestion);
  console.log('Options (Hindi):', resHi.options);

  console.log('\n--- 4. Testing English Static Pathway (Toothache) ---');
  const t4Start = Date.now();
  const resEn = await postJson('/api/ai/chat', {
    userMessage: 'I have severe tooth pain and toothache since morning',
    language: 'en-IN',
  });
  const t4Elapsed = Date.now() - t4Start;
  console.log(`Response time: ${t4Elapsed}ms`);
  console.log('Active Pathway:', resEn.activePathway);
  console.log('Next Question (English):', resEn.nextQuestion);
  console.log('Options (English):', resEn.options);

  console.log('\n--- 5. Testing Unknown Condition (AI Fallback) ---');
  const t5Start = Date.now();
  const resUnknown = await postJson('/api/ai/chat', {
    userMessage: 'I have a very strange rare systemic lysosomal enzyme deficiency issue',
    language: 'en-IN',
  });
  const t5Elapsed = Date.now() - t5Start;
  console.log(`Response time: ${t5Elapsed}ms`);
  console.log('Active Pathway (Should be null for AI fallback):', resUnknown.activePathway);
  console.log('AI Next Question:', resUnknown.nextQuestion);
  console.log('AI Options:', resUnknown.options);
}

verify().catch(console.error);
