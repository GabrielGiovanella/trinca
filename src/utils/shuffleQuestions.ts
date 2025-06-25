import { Question, ShuffledQuestion } from '../types/Quiz';

// Fisher-Yates shuffle algorithm
export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Shuffle question options and track the new correct answer position
export const shuffleQuestionOptions = (question: Question): ShuffledQuestion => {
  const originalCorrectAnswer = question.options[question.correctAnswer];
  
  // Create array of indices to shuffle
  const indices = Array.from({ length: question.options.length }, (_, i) => i);
  const shuffledIndices = shuffleArray(indices);
  
  // Create shuffled options array
  const shuffledOptions = shuffledIndices.map(index => question.options[index]);
  
  // Find the new position of the correct answer
  const shuffledCorrectAnswer = shuffledOptions.findIndex(option => option === originalCorrectAnswer);
  
  return {
    ...question,
    shuffledOptions,
    shuffledCorrectAnswer
  };
};

// Shuffle all questions' options
export const shuffleAllQuestions = (questions: Question[]): ShuffledQuestion[] => {
  return questions.map(question => shuffleQuestionOptions(question));
};