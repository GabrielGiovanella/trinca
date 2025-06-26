import { useState, useEffect } from 'react';
import { QuizState, GameStats, ShuffledQuestion } from '../types/Quiz';
import { questions } from '../data/questions';
import { shuffleAllQuestions } from '../utils/shuffleQuestions';

export const useQuiz = () => {
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestion: 0,
    score: 0,
    answers: [],
    isCompleted: false,
    showResults: false,
    playerName: '',
    shuffledQuestions: [],
    memoryGameScore: 0
  });

  const [timeLeft, setTimeLeft] = useState(15); // Start with 15 seconds for first question (easy)
  const [gameStarted, setGameStarted] = useState(false);
  const [showMemoryGame, setShowMemoryGame] = useState(false);

  // Function to get time limit based on difficulty
  const getTimeLimit = (difficulty: string): number => {
    switch (difficulty) {
      case 'easy': return 15;
      case 'medium': return 30;
      case 'hard': return 45;
      default: return 30;
    }
  };

  // Timer effect
  useEffect(() => {
    if (!gameStarted || quizState.isCompleted) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          return 0; // Let it reach 0, component will handle timeout
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameStarted, quizState.currentQuestion, quizState.isCompleted, showMemoryGame]);

  const startGame = (playerName: string) => {
    // Shuffle all questions when starting the game
    const shuffledQuestions = shuffleAllQuestions(questions);
    
    setQuizState(prev => ({ 
      ...prev, 
      playerName,
      shuffledQuestions
    }));
    setGameStarted(true);
    // Set initial time based on first question difficulty
    const initialTime = getTimeLimit(shuffledQuestions[0].difficulty);
    setTimeLeft(initialTime);
  };

  const handleAnswer = (answer: number) => {
    const currentShuffledQuestion = quizState.shuffledQuestions[quizState.currentQuestion];
    const newAnswers = [...quizState.answers, answer];
    const isCorrect = answer === currentShuffledQuestion.shuffledCorrectAnswer;
    const newScore = isCorrect ? quizState.score + 1 : quizState.score;

    if (quizState.currentQuestion < quizState.shuffledQuestions.length - 1) {
      const nextQuestionIndex = quizState.currentQuestion + 1;
      const nextQuestionDifficulty = quizState.shuffledQuestions[nextQuestionIndex].difficulty;
      const nextTimeLimit = getTimeLimit(nextQuestionDifficulty);
      
      setQuizState({
        ...quizState,
        currentQuestion: nextQuestionIndex,
        score: newScore,
        answers: newAnswers
      });
      setTimeLeft(nextTimeLimit);
    } else {
      // After the last question, show memory game
      setQuizState({
        ...quizState,
        score: newScore,
        answers: newAnswers,
        isCompleted: false // Keep false to show memory game
      });
      setShowMemoryGame(true);
      setTimeLeft(60); // 60 seconds (1 minute) for memory game
    }
  };

  const handleMemoryGameComplete = (memoryScore: number) => {
    setQuizState(prev => ({
      ...prev,
      memoryGameScore: memoryScore,
      isCompleted: true,
      showResults: true
    }));
    setShowMemoryGame(false);
  };

  const resetQuiz = () => {
    setQuizState({
      currentQuestion: 0,
      score: 0,
      answers: [],
      isCompleted: false,
      showResults: false,
      playerName: '',
      shuffledQuestions: [],
      memoryGameScore: 0
    });
    setGameStarted(false);
    setShowMemoryGame(false);
    setTimeLeft(15); // Reset to initial time for easy questions
  };

  const getGameStats = (): GameStats => {
    const totalQuestions = quizState.shuffledQuestions.length;
    const correctAnswers = quizState.score;
    
    let easyCorrect = 0;
    let mediumCorrect = 0;
    let hardCorrect = 0;

    quizState.shuffledQuestions.forEach((question, index) => {
      if (quizState.answers[index] === question.shuffledCorrectAnswer) {
        switch (question.difficulty) {
          case 'easy':
            easyCorrect++;
            break;
          case 'medium':
            mediumCorrect++;
            break;
          case 'hard':
            hardCorrect++;
            break;
        }
      }
    });

    const percentage = (correctAnswers / totalQuestions) * 100;

    return {
      totalQuestions,
      correctAnswers,
      easyCorrect,
      mediumCorrect,
      hardCorrect,
      percentage,
      memoryGameScore: quizState.memoryGameScore
    };
  };

  return {
    quizState,
    timeLeft,
    gameStarted,
    showMemoryGame,
    currentQuestion: quizState.shuffledQuestions[quizState.currentQuestion],
    startGame,
    handleAnswer,
    handleMemoryGameComplete,
    resetQuiz,
    getGameStats
  };
};