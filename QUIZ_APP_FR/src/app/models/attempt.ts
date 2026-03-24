export interface Attempt {
  quizTitle: string;
  subject?: string;
  score: number;
  totalQuestions: number;
  attemptedAt: string;
  percentage: number;
}