import React from 'react';
import { StartScreen } from './components/StartScreen';
import { QuestionCard } from './components/QuestionCard';
import { ResultsScreen } from './components/ResultsScreen';
import { useQuiz } from './hooks/useQuiz';
import { questions } from './data/questions';

function App() {
  const {
    quizState,
    timeLeft,
    gameStarted,
    currentQuestion,
    startGame,
    handleAnswer,
    resetQuiz,
    getGameStats
  } = useQuiz();

  if (!gameStarted) {
    return <StartScreen onStart={startGame} />;
  }

  if (quizState.showResults) {
    return (
      <ResultsScreen
        questions={questions}
        userAnswers={quizState.answers}
        stats={getGameStats()}
        playerName={quizState.playerName}
        onRestart={resetQuiz}
      />
    );
  }

  return (
    <QuestionCard
      question={currentQuestion}
      questionNumber={quizState.currentQuestion + 1}
      totalQuestions={questions.length}
      onAnswer={handleAnswer}
      timeLeft={timeLeft}
    />
  );
}

export default App;