import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export interface PathwayQuestion {
  question: string;
  options: string[];
}

export type PathwaysDatabase = Record<string, PathwayQuestion[]>;

export function parsePathways(): PathwaysDatabase {
  const textFilePath = path.join(__dirname, 'extracted_text.txt');
  let rawText = '';

  if (fs.existsSync(textFilePath)) {
    rawText = fs.readFileSync(textFilePath, 'utf-8');
  } else {
    // If extracted_text.txt doesn't exist, read from ques.docx extracted xml
    const docxXmlPath = path.join(__dirname, 'docx_extracted', 'word', 'document.xml');
    if (fs.existsSync(docxXmlPath)) {
      const xml = fs.readFileSync(docxXmlPath, 'utf-8');
      const paragraphs = xml.match(/<w:p.*?>.*?<\/w:p>/g) || [];
      const lines = paragraphs.map(p => {
        const texts = p.match(/<w:t.*?>([^<]*)<\/w:t>/g) || [];
        return texts.map(t => t.replace(/<w:t.*?>|<\/w:t>/g, '')).join('');
      }).filter(l => l.trim().length > 0);
      rawText = lines.join('\n');
    } else {
      throw new Error('Neither extracted_text.txt nor docx_extracted XML was found.');
    }
  }

  const lines = rawText.split(/\r?\n/).map(l => l.trim()).filter(Boolean);
  const pathways: PathwaysDatabase = {};

  let currentIllness = '';

  for (const line of lines) {
    const illnessMatch = line.match(/^\d+\.\s*(.+)$/);
    if (illnessMatch) {
      currentIllness = illnessMatch[1].trim();
      pathways[currentIllness] = [];
      continue;
    }

    if (!currentIllness) continue;

    // Parse Question and Choices
    const choicesIndex = line.search(/choices:\s*/i);
    if (choicesIndex !== -1) {
      const question = line.substring(0, choicesIndex).trim();
      const choicesPart = line.substring(choicesIndex).replace(/^choices:\s*/i, '').trim();
      const options = choicesPart.split('|').map(opt => opt.trim()).filter(Boolean);

      pathways[currentIllness].push({
        question,
        options,
      });
    } else {
      // Line without choices keyword
      pathways[currentIllness].push({
        question: line.trim(),
        options: ['Yes', 'No', 'Not sure'],
      });
    }
  }

  return pathways;
}

async function run() {
  console.log('Parsing 50 clinical pathways from ques.docx...');
  const pathways = parsePathways();

  const illnesses = Object.keys(pathways);
  console.log(`Parsed ${illnesses.length} illnesses successfully!`);

  let totalQuestions = 0;
  for (const illness of illnesses) {
    const qCount = pathways[illness].length;
    totalQuestions += qCount;
    if (qCount !== 10) {
      console.warn(`[Warning] Illness "${illness}" has ${qCount} questions (expected 10).`);
    }
  }

  console.log(`Total questions across all pathways: ${totalQuestions}`);

  // Ensure output directory exists
  const outDir = path.join(__dirname, '..', 'src', 'data');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const outPath = path.join(outDir, 'pathways.json');
  fs.writeFileSync(outPath, JSON.stringify(pathways, null, 2), 'utf-8');
  console.log(`Saved clean pathways database to: ${outPath}`);
}

run().catch(console.error);
