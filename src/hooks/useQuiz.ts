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
    memoryGameScores: []
  });

  const [timeLeft, setTimeLeft] = useState(15); // Start with 15 seconds for first question (easy)
  const [gameStarted, setGameStarted] = useState(false);
  const [showMemoryGame, setShowMemoryGame] = useState(false);
  const [currentMemoryGame, setCurrentMemoryGame] = useState(0); // Track which memory game to show

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

    // Check if we need to show a memory game
    const shouldShowMemoryGame = () => {
      const nextQuestionIndex = quizState.currentQuestion + 1;
      // Show memory game after 4th question (easy) and 8th question (medium)
      return nextQuestionIndex === 4 || nextQuestionIndex === 8;
    };

    if (quizState.currentQuestion < quizState.shuffledQuestions.length - 1) {
      if (shouldShowMemoryGame()) {
        // Show memory game
        setQuizState({
          ...quizState,
          score: newScore,
          answers: newAnswers
        });
        setCurrentMemoryGame(quizState.currentQuestion === 3 ? 1 : 2); // Memory game 1 after easy, 2 after medium
        setShowMemoryGame(true);
        setTimeLeft(60); // 60 seconds for memory game
      } else {
        // Continue to next question
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
      }
    } else {
      // After the last question, show final memory game
      setQuizState({
        ...quizState,
        score: newScore,
        answers: newAnswers,
        isCompleted: false // Keep false to show memory game
      });
      setCurrentMemoryGame(3); // Final memory game
      setShowMemoryGame(true);
      setTimeLeft(60); // 60 seconds for memory game
    }
  };

  const handleMemoryGameComplete = (memoryScore: number) => {
    const newMemoryScores = [...quizState.memoryGameScores, memoryScore];
    
    if (currentMemoryGame === 3) {
      // Final memory game completed, show results
      setQuizState(prev => ({
        ...prev,
        memoryGameScores: newMemoryScores,
        isCompleted: true,
        showResults: true
      }));
      setShowMemoryGame(false);
    } else {
      // Continue to next question after memory game
      const nextQuestionIndex = quizState.currentQuestion + 1;
      const nextQuestionDifficulty = quizState.shuffledQuestions[nextQuestionIndex].difficulty;
      const nextTimeLimit = getTimeLimit(nextQuestionDifficulty);
      
      setQuizState(prev => ({
        ...prev,
        currentQuestion: nextQuestionIndex,
        memoryGameScores: newMemoryScores
      }));
      setShowMemoryGame(false);
      setTimeLeft(nextTimeLimit);
    }
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
      memoryGameScores: []
    });
    setGameStarted(false);
    setShowMemoryGame(false);
    setCurrentMemoryGame(0);
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

    // Calculate memory games total score
    const totalMemoryScore = quizState.memoryGameScores.reduce((sum, score) => sum + score, 0);
    const maxMemoryScore = 18; // 3 games × 6 pairs each
    
    // Calculate combined statistics including memory games
    const totalPossiblePoints = totalQuestions + maxMemoryScore; // 12 questions + 18 memory pairs
    const totalEarnedPoints = correctAnswers + totalMemoryScore;
    const combinedPercentage = (totalEarnedPoints / totalPossiblePoints) * 100;

    return {
      totalQuestions,
      correctAnswers,
      easyCorrect,
      mediumCorrect,
      hardCorrect,
      percentage: combinedPercentage, // Now includes memory games
      memoryGameScores: quizState.memoryGameScores,
      totalMemoryScore,
      // New combined stats
      totalPossiblePoints,
      totalEarnedPoints,
      questionsPercentage: (correctAnswers / totalQuestions) * 100, // Questions only percentage
      memoryPercentage: (totalMemoryScore / maxMemoryScore) * 100 // Memory games only percentage
    };
  };

  return {
    quizState,
    timeLeft,
    gameStarted,
    showMemoryGame,
    currentMemoryGame,
    currentQuestion: quizState.shuffledQuestions[quizState.currentQuestion],
    startGame,
    handleAnswer,
    handleMemoryGameComplete,
    resetQuiz,
    getGameStats
  };
};