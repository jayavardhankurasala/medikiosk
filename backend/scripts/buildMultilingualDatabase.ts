import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { GROUP_1 } from '../src/data/translations/group1.js';
import { GROUP_2 } from '../src/data/translations/group2.js';
import { GROUP_3 } from '../src/data/translations/group3.js';
import { GROUP_4 } from '../src/data/translations/group4.js';
import { GROUP_5 } from '../src/data/translations/group5.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export interface MultilingualQuestionItem {
  question: string;
  options: string[];
}

export interface MultilingualPathwayData {
  en: MultilingualQuestionItem[];
  hi: MultilingualQuestionItem[];
  te: MultilingualQuestionItem[];
}

export type MasterMultilingualPathways = Record<string, MultilingualPathwayData>;

async function build() {
  console.log('Building Master Multilingual Clinical Pathways Database...');

  const allGroups = {
    ...GROUP_1,
    ...GROUP_2,
    ...GROUP_3,
    ...GROUP_4,
    ...GROUP_5,
  };

  const illnessKeys = Object.keys(allGroups);
  console.log(`Aggregated ${illnessKeys.length} clinical conditions across 5 groups.`);

  const masterDatabase: MasterMultilingualPathways = {};

  for (const illness of illnessKeys) {
    const questions = allGroups[illness];
    if (questions.length !== 10) {
      console.warn(`[Warning] Illness "${illness}" has ${questions.length} questions (expected 10).`);
    }

    masterDatabase[illness] = {
      en: questions.map(q => ({
        question: q.qEn,
        options: q.opts.map(o => o.en),
      })),
      hi: questions.map(q => ({
        question: q.qHi,
        options: q.opts.map(o => o.hi),
      })),
      te: questions.map(q => ({
        question: q.qTe,
        options: q.opts.map(o => o.te),
      })),
    };
  }

  const outDir = path.join(__dirname, '..', 'src', 'data');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  const outPath = path.join(outDir, 'pathways_multilingual.json');
  fs.writeFileSync(outPath, JSON.stringify(masterDatabase, null, 2), 'utf-8');

  console.log(`Master Multilingual Database successfully saved to: ${outPath}`);
  console.log(`Total Illnesses: ${Object.keys(masterDatabase).length}`);
  console.log('Languages supported: English (en), Hindi (hi), Telugu (te)');
}

build().catch(console.error);
