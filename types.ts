export interface AnalysisResult {
  score: number; // 0-100
  summary: string;
  strengths: string[];
  gaps: string[];
  missingKeywords: string[];
  suggestions: string[];
}
