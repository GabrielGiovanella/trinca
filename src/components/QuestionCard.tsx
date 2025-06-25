import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Clock, Star, AlertTriangle } from 'lucide-react';
import { ShuffledQuestion } from '../types/Quiz';

interface QuestionCardProps {
  question: ShuffledQuestion;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (answer: number) => void;
  timeLeft: number;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  questionNumber,
  totalQuestions,
  onAnswer,
  timeLeft
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showTimeoutMessage, setShowTimeoutMessage] = useState(false);
  const [isTimeout, setIsTimeout] = useState(false);

  // Reset state when question changes
  useEffect(() => {
    setSelectedAnswer(null);
    setShowFeedback(false);
    setShowTimeoutMessage(false);
    setIsTimeout(false);
  }, [question.id]);

  // Handle timeout when time reaches zero
  useEffect(() => {
    if (timeLeft === 0 && selectedAnswer === null && !showTimeoutMessage) {
      setShowTimeoutMessage(true);
      setIsTimeout(true);
      setSelectedAnswer(-1); // Indicate timeout
      setShowFeedback(true);
      
      setTimeout(() => {
        onAnswer(-1);
      }, 2000);
    }
  }, [timeLeft, selectedAnswer, showTimeoutMessage, onAnswer]);

  const handleAnswerClick = (answerIndex: number) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(answerIndex);
    setShowFeedback(true);
    
    setTimeout(() => {
      onAnswer(answerIndex);
    }, 1500);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-500 bg-green-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'hard': return 'text-red-500 bg-red-100';
      default: return 'text-gray-500 bg-gray-100';
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'Fácil';
      case 'medium': return 'Médio';
      case 'hard': return 'Difícil';
      default: return '';
    }
  };

  const getTimeLimit = (difficulty: string): number => {
    switch (difficulty) {
      case 'easy': return 15;
      case 'medium': return 30;
      case 'hard': return 45;
      default: return 30;
    }
  };

  const progress = (questionNumber / totalQuestions) * 100;
  const timeLimit = getTimeLimit(question.difficulty);
  const timePercentage = (timeLeft / timeLimit) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 flex items-center justify-center p-4">
      <div className="max-w-3xl w-full">
        {/* Timeout Message - Only shows when time actually reaches 0 */}
        {showTimeoutMessage && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-orange-500 text-white p-6 rounded-2xl shadow-2xl max-w-sm w-full text-center">
              <Clock className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">⏰ Tempo Esgotado!</h3>
              <p className="text-orange-100">Você não respondeu a tempo.</p>
            </div>
          </div>
        )}

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-blue-200 text-sm font-medium">
              Pergunta {questionNumber} de {totalQuestions}
            </span>
            <div className={`flex items-center gap-2 ${timeLeft <= 5 ? 'text-red-300 animate-pulse' : timeLeft <= 10 ? 'text-orange-300' : 'text-blue-200'}`}>
              <Clock className="w-4 h-4" />
              <span className="text-sm font-bold">{timeLeft}s</span>
              <span className="text-xs text-blue-300">
                ({getDifficultyLabel(question.difficulty)}: {timeLimit}s)
              </span>
            </div>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2 mb-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          {/* Time Progress Bar */}
          <div className="w-full bg-white/10 rounded-full h-1">
            <div 
              className={`h-1 rounded-full transition-all duration-1000 ${
                timePercentage > 50 ? 'bg-green-400' : 
                timePercentage > 25 ? 'bg-yellow-400' : 'bg-red-400'
              }`}
              style={{ width: `${timePercentage}%` }}
            ></div>
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Star className="w-6 h-6 text-yellow-500" />
              <span className="text-gray-700 font-semibold">Desafio da Trinca</span>
            </div>
            <div className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(question.difficulty)}`}>
              {getDifficultyLabel(question.difficulty)} ({timeLimit}s)
            </div>
          </div>

          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6 md:mb-8 leading-relaxed">
            {question.question}
          </h2>

          <div className="space-y-3 md:space-y-4">
            {question.shuffledOptions.map((option, index) => {
              let buttonClass = "w-full p-3 md:p-4 text-left rounded-xl border-2 transition-all duration-300 font-medium text-sm md:text-base";
              
              if (selectedAnswer === null) {
                buttonClass += " border-gray-200 hover:border-blue-400 hover:bg-blue-50 bg-white";
              } else if (showFeedback) {
                if (isTimeout) {
                  // When timeout, don't show correct answer, just gray out all options
                  buttonClass += " border-gray-200 bg-gray-50 text-gray-600";
                } else {
                  // Normal feedback when user selected an answer
                  if (index === question.shuffledCorrectAnswer) {
                    buttonClass += " border-green-500 bg-green-100 text-green-800";
                  } else if (index === selectedAnswer && index !== question.shuffledCorrectAnswer) {
                    buttonClass += " border-red-500 bg-red-100 text-red-800";
                  } else {
                    buttonClass += " border-gray-200 bg-gray-50 text-gray-600";
                  }
                }
              }

              return (
                <button
                  key={index}
                  onClick={() => handleAnswerClick(index)}
                  className={buttonClass}
                  disabled={selectedAnswer !== null}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-left">{option}</span>
                    {/* Only show icons when not timeout */}
                    {showFeedback && !isTimeout && index === question.shuffledCorrectAnswer && (
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 ml-2" />
                    )}
                    {showFeedback && !isTimeout && index === selectedAnswer && index !== question.shuffledCorrectAnswer && (
                      <XCircle className="w-5 h-5 text-red-600 flex-shrink-0 ml-2" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Show timeout message in the card when time runs out */}
          {isTimeout && showFeedback && (
            <div className="mt-6 p-4 bg-orange-100 border border-orange-300 rounded-lg text-center">
              <div className="flex items-center justify-center gap-2 text-orange-800">
                <AlertTriangle className="w-5 h-5" />
                <span className="font-semibold">Tempo esgotado! Resposta não computada.</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};