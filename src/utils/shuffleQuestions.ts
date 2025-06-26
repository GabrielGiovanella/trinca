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

// Shuffle questions by difficulty to maintain balance but randomize order within each difficulty
export const shuffleAllQuestions = (questions: Question[]): ShuffledQuestion[] => {
  // Separate questions by difficulty
  const easyQuestions = questions.filter(q => q.difficulty === 'easy');
  const mediumQuestions = questions.filter(q => q.difficulty === 'medium');
  const hardQuestions = questions.filter(q => q.difficulty === 'hard');
  
  // Shuffle each difficulty group
  const shuffledEasy = shuffleArray(easyQuestions);
  const shuffledMedium = shuffleArray(mediumQuestions);
  const shuffledHard = shuffleArray(hardQuestions);
  
  // Combine in order: easy, medium, hard (but each group is shuffled)
  const orderedQuestions = [...shuffledEasy, ...shuffledMedium, ...shuffledHard];
  
  // Shuffle options for each question
  return orderedQuestions.map(question => shuffleQuestionOptions(question));
};