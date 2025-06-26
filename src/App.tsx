import React from 'react';
import { StartScreen } from './components/StartScreen';
import { QuestionCard } from './components/QuestionCard';
import { MemoryGame } from './components/MemoryGame';
import { ResultsScreen } from './components/ResultsScreen';
import { useQuiz } from './hooks/useQuiz';
import { questions } from './data/questions';

function App() {
  const {
    quizState,
    timeLeft,
    gameStarted,
    showMemoryGame,
    currentMemoryGame,
    currentQuestion,
    startGame,
    handleAnswer,
    handleMemoryGameComplete,
    resetQuiz,
    getGameStats
  } = useQuiz();

  if (!gameStarted) {
    return <StartScreen onStart={startGame} />;
  }

  if (showMemoryGame) {
    return (
      <MemoryGame
        onComplete={handleMemoryGameComplete}
        timeLeft={timeLeft}
        gameNumber={currentMemoryGame}
      />
    );
  }

  if (quizState.showResults) {
    return (
      <ResultsScreen
        questions={questions}
        userAnswers={quizState.answers}
        stats={getGameStats()}
        playerName={quizState.playerName}
        onRestart={resetQuiz}
        shuffledQuestions={quizState.shuffledQuestions}
      />
    );
  }

  return (
    <QuestionCard
      question={currentQuestion}
      questionNumber={quizState.currentQuestion + 1}
      totalQuestions={quizState.shuffledQuestions.length}
      onAnswer={handleAnswer}
      timeLeft={timeLeft}
    />
  );
}

export default App;