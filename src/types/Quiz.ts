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

export interface MemoryPair {
  id: number;
  left: string;
  right: string;
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
  memoryGameScores: number[]; // Array to store scores from multiple memory games
}

export interface GameStats {
  totalQuestions: number;
  correctAnswers: number;
  easyCorrect: number;
  mediumCorrect: number;
  hardCorrect: number;
  percentage: number; // Combined percentage including memory games
  memoryGameScores: number[];
  totalMemoryScore: number;
  // New combined stats
  totalPossiblePoints: number; // Total possible points (questions + memory)
  totalEarnedPoints: number; // Total earned points (questions + memory)
  questionsPercentage: number; // Questions only percentage
  memoryPercentage: number; // Memory games only percentage
}