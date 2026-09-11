import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { matchStaticPathway } from '../utils/symptomMatcher.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export interface PathwayQuestion {
  question: string;
  options: string[];
}

export interface MultilingualPathwayEntry {
  en: PathwayQuestion[];
  hi: PathwayQuestion[];
  te: PathwayQuestion[];
}

export type MultilingualPathwaysMap = Record<string, MultilingualPathwayEntry>;

export class PathwaysService {
  private static pathways: MultilingualPathwaysMap = {};
  private static isLoaded = false;

  public static load(): void {
    if (this.isLoaded) return;

    try {
      const filePath = path.join(__dirname, '..', 'data', 'pathways_multilingual.json');
      if (fs.existsSync(filePath)) {
        this.pathways = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        this.isLoaded = true;
        console.log(`[PathwaysService] Loaded ${Object.keys(this.pathways).length} static clinical pathways in EN, HI, and TE`);
      } else {
        console.warn(`[PathwaysService] File not found at ${filePath}`);
      }
    } catch (err) {
      console.error('[PathwaysService] Error loading multilingual pathways:', err);
    }
  }

  public static isStaticPathway(pathwayKey: string): boolean {
    if (!this.isLoaded) this.load();
    return !!this.pathways[pathwayKey];
  }

  public static getAllPathwayKeys(): string[] {
    if (!this.isLoaded) this.load();
    return Object.keys(this.pathways);
  }

  /**
   * Deterministic static matching for 50 conditions across English, Telugu, and Hindi
   */
  public static matchPathway(userComplaint: string): string | null {
    return matchStaticPathway(userComplaint);
  }

  /**
   * Statically retrieve question and options for an illness, step index, and language
   * @param pathwayKey The condition name (e.g. "Fever", "Toothache")
   * @param stepIndex 0 to 9
   * @param language "en-IN", "hi-IN", "te-IN", or simple "en", "hi", "te"
   */
  public static getQuestion(
    pathwayKey: string,
    stepIndex: number,
    language: string
  ): PathwayQuestion | null {
    if (!this.isLoaded) this.load();

    const entry = this.pathways[pathwayKey];
    if (!entry) return null;

    let langCode: 'en' | 'hi' | 'te' = 'en';
    const cleanLang = (language || 'en-IN').toLowerCase();
    if (cleanLang.includes('te')) {
      langCode = 'te';
    } else if (cleanLang.includes('hi')) {
      langCode = 'hi';
    }

    const langQuestions = entry[langCode] || entry.en;
    if (!langQuestions || stepIndex >= langQuestions.length) {
      return null;
    }

    return langQuestions[stepIndex];
  }
}

// Auto-load on import
PathwaysService.load();
