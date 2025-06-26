import React, { useState } from 'react';
import { ChevronDown, ChevronUp, CheckCircle, XCircle, Play, Lightbulb } from 'lucide-react';
import { Question } from '../types/Quiz';
import { ExplanationDropdown } from './ExplanationDropdown';

interface QuestionDropdownProps {
  question: Question;
  questionIndex: number;
  userAnswer: number;
  isCorrect: boolean;
  wasTimeout: boolean;
}

export const QuestionDropdown: React.FC<QuestionDropdownProps> = ({
  question,
  questionIndex,
  userAnswer,
  isCorrect,
  wasTimeout
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'hard': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
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

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200">
      {/* Header - Always visible */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 md:p-5 text-left hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
      >
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-3 mb-2 flex-wrap">
            <span className="text-sm font-semibold text-gray-600">
              Pergunta {questionIndex + 1}
            </span>
            <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${getDifficultyColor(question.difficulty)}`}>
              {getDifficultyLabel(question.difficulty)}
            </span>
            {wasTimeout && (
              <span className="px-2 py-1 rounded-full text-xs font-semibold bg-orange-100 text-orange-800 border border-orange-200">
                Tempo Esgotado
              </span>
            )}
            <div className="flex items-center gap-1">
              {isCorrect ? (
                <CheckCircle className="w-5 h-5 text-green-600" />
              ) : (
                <XCircle className="w-5 h-5 text-red-600" />
              )}
              <span className={`text-sm font-semibold ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                {isCorrect ? 'Correto' : wasTimeout ? 'Não respondida' : 'Incorreto'}
              </span>
            </div>
          </div>
          <h3 className="text-base md:text-lg font-semibold text-gray-800 leading-tight pr-4">
            {question.question}
          </h3>
        </div>
        <div className="flex-shrink-0 ml-4">
          {isOpen ? (
            <ChevronUp className="w-5 h-5 text-gray-500" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-500" />
          )}
        </div>
      </button>

      {/* Expandable Content */}
      <div className={`transition-all duration-300 ease-in-out ${
        isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
      } overflow-hidden`}>
        <div className="border-t border-gray-200 bg-gray-50/50">
          <div className="p-4 md:p-5 space-y-4">
            {/* Answer Options */}
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-gray-700 mb-3">Opções de resposta:</h4>
              {question.options.map((option, optionIndex) => (
                <div
                  key={optionIndex}
                  className={`p-3 rounded-lg border text-sm ${
                    optionIndex === question.correctAnswer 
                      ? 'bg-green-50 border-green-200 text-green-800'
                      : optionIndex === userAnswer && !isCorrect && !wasTimeout
                      ? 'bg-red-50 border-red-200 text-red-800'
                      : 'bg-white border-gray-200 text-gray-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="leading-tight">{option}</span>
                    {optionIndex === question.correctAnswer && (
                      <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0 ml-2" />
                    )}
                    {optionIndex === userAnswer && !isCorrect && !wasTimeout && (
                      <XCircle className="w-4 h-4 text-red-600 flex-shrink-0 ml-2" />
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Explanation */}
            <div>
              <ExplanationDropdown 
                explanation={question.explanation}
                questionNumber={questionIndex + 1}
              />
            </div>

            {/* Video Section */}
            <div className="bg-white rounded-lg p-4 border border-gray-200">
              <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2 text-sm">
                <Play className="w-4 h-4 text-red-500" />
                Vídeo Explicativo
              </h4>
              <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                <iframe
                  className="absolute top-0 left-0 w-full h-full rounded-lg"
                  src={question.videoUrl || "https://www.youtube.com/embed/A_xcpIr9vxs?start=4"}
                  title={`Ordem DeMolay - Pergunta ${questionIndex + 1}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                ></iframe>
              </div>
              <p className="text-gray-600 mt-2 text-xs text-center">
                Vídeo explicativo sobre esta pergunta
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};