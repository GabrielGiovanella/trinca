import { useState, useEffect } from 'react';
import { QuizState, GameStats } from '../types/Quiz';
import { questions } from '../data/questions';

export const useQuiz = () => {
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestion: 0,
    score: 0,
    answers: [],
    isCompleted: false,
    showResults: false,
    playerName: ''
  });

  const [timeLeft, setTimeLeft] = useState(15); // Start with 15 seconds for first question (easy)
  const [gameStarted, setGameStarted] = useState(false);

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
  }, [gameStarted, quizState.currentQuestion, quizState.isCompleted]);

  const startGame = (playerName: string) => {
    setQuizState(prev => ({ ...prev, playerName }));
    setGameStarted(true);
    // Set initial time based on first question difficulty
    const initialTime = getTimeLimit(questions[0].difficulty);
    setTimeLeft(initialTime);
  };

  const handleAnswer = (answer: number) => {
    const newAnswers = [...quizState.answers, answer];
    const isCorrect = answer === questions[quizState.currentQuestion].correctAnswer;
    const newScore = isCorrect ? quizState.score + 1 : quizState.score;

    if (quizState.currentQuestion < questions.length - 1) {
      const nextQuestionIndex = quizState.currentQuestion + 1;
      const nextQuestionDifficulty = questions[nextQuestionIndex].difficulty;
      const nextTimeLimit = getTimeLimit(nextQuestionDifficulty);
      
      setQuizState({
        ...quizState,
        currentQuestion: nextQuestionIndex,
        score: newScore,
        answers: newAnswers
      });
      setTimeLeft(nextTimeLimit);
    } else {
      setQuizState({
        ...quizState,
        score: newScore,
        answers: newAnswers,
        isCompleted: true,
        showResults: true
      });
    }
  };

  const resetQuiz = () => {
    setQuizState({
      currentQuestion: 0,
      score: 0,
      answers: [],
      isCompleted: false,
      showResults: false,
      playerName: ''
    });
    setGameStarted(false);
    setTimeLeft(15); // Reset to initial time for easy questions
  };

  const getGameStats = (): GameStats => {
    const totalQuestions = questions.length;
    const correctAnswers = quizState.score;
    
    let easyCorrect = 0;
    let mediumCorrect = 0;
    let hardCorrect = 0;

    questions.forEach((question, index) => {
      if (quizState.answers[index] === question.correctAnswer) {
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
      percentage
    };
  };

  return {
    quizState,
    timeLeft,
    gameStarted,
    currentQuestion: questions[quizState.currentQuestion],
    startGame,
    handleAnswer,
    resetQuiz,
    getGameStats
  };
};