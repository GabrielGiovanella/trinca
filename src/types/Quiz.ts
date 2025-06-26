export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  difficulty: 'easy' | 'medium' | 'hard';
  explanation: string;
  videoUrl?: string;
  imageUrl?: string;
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
  memoryGameScore?: number; // Score from the memory game bonus
}

export interface GameStats {
  totalQuestions: number;
  correctAnswers: number;
  easyCorrect: number;
  mediumCorrect: number;
  hardCorrect: number;
  percentage: number;
  memoryGameScore?: number;
}