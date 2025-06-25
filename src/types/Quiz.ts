export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  difficulty: 'easy' | 'medium' | 'hard';
  explanation: string;
  videoUrl?: string;
}

export interface ShuffledQuestion extends Question {
  shuffledOptions: string[];
  shuffledCorrectAnswer: number;
}

export interface QuizState {
  currentQuestion: number;
  score: number;
  answers: number[];
  isCompleted: boolean;
  showResults: boolean;
  playerName: string;
  shuffledQuestions: ShuffledQuestion[];
}

export interface GameStats {
  totalQuestions: number;
  correctAnswers: number;
  easyCorrect: number;
  mediumCorrect: number;
  hardCorrect: number;
  percentage: number;
}