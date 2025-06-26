import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Clock, Star, RotateCcw, Trophy, Brain, Zap } from 'lucide-react';
import { MemoryPair } from '../types/Quiz';
import { memoryGame1, memoryGame2, memoryGame3 } from '../data/memoryGames';

interface MemoryGameProps {
  onComplete: (score: number) => void;
  timeLeft: number;
  gameNumber: number; // 1, 2, or 3
}

export const MemoryGame: React.FC<MemoryGameProps> = ({ onComplete, timeLeft, gameNumber }) => {
  const [leftItems, setLeftItems] = useState<string[]>([]);
  const [rightItems, setRightItems] = useState<string[]>([]);
  const [selectedLeft, setSelectedLeft] = useState<number | null>(null);
  const [selectedRight, setSelectedRight] = useState<number | null>(null);
  const [matches, setMatches] = useState<Set<number>>(new Set());
  const [wrongMatches, setWrongMatches] = useState<Set<string>>(new Set());
  const [score, setScore] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [memoryPairs, setMemoryPairs] = useState<MemoryPair[]>([]);

  // Get the appropriate memory game data
  useEffect(() => {
    let pairs: MemoryPair[] = [];
    switch (gameNumber) {
      case 1:
        pairs = memoryGame1;
        break;
      case 2:
        pairs = memoryGame2;
        break;
      case 3:
        pairs = memoryGame3;
        break;
      default:
        pairs = memoryGame1;
    }
    setMemoryPairs(pairs);
  }, [gameNumber]);

  // Initialize shuffled items
  useEffect(() => {
    if (memoryPairs.length === 0) return;

    const shuffleArray = <T,>(array: T[]): T[] => {
      const shuffled = [...array];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    };

    setLeftItems(shuffleArray(memoryPairs.map(pair => pair.left)));
    setRightItems(shuffleArray(memoryPairs.map(pair => pair.right)));
  }, [memoryPairs]);

  // Handle timeout
  useEffect(() => {
    if (timeLeft === 0 && !gameCompleted) {
      setGameCompleted(true);
      setShowFeedback(true);
      setTimeout(() => {
        onComplete(score);
      }, 2000);
    }
  }, [timeLeft, gameCompleted, score, onComplete]);

  const handleLeftClick = (index: number) => {
    if (matches.has(index) || gameCompleted) return;
    setSelectedLeft(index);
    
    if (selectedRight !== null) {
      checkMatch(index, selectedRight);
    }
  };

  const handleRightClick = (index: number) => {
    if (matches.has(index + 100) || gameCompleted) return; // +100 to differentiate right items
    setSelectedRight(index);
    
    if (selectedLeft !== null) {
      checkMatch(selectedLeft, index);
    }
  };

  const checkMatch = (leftIndex: number, rightIndex: number) => {
    const leftText = leftItems[leftIndex];
    const rightText = rightItems[rightIndex];
    
    // Find if these items form a correct pair
    const correctPair = memoryPairs.find(pair => 
      (pair.left === leftText && pair.right === rightText) ||
      (pair.right === leftText && pair.left === rightText)
    );

    if (correctPair) {
      // Correct match
      setMatches(prev => new Set([...prev, leftIndex, rightIndex + 100]));
      setScore(prev => prev + 1);
      
      // Check if game is completed
      if (matches.size + 2 >= memoryPairs.length * 2) {
        setGameCompleted(true);
        setShowFeedback(true);
        setTimeout(() => {
          onComplete(score + 1);
        }, 1500);
      }
    } else {
      // Wrong match
      const wrongKey = `${leftIndex}-${rightIndex}`;
      setWrongMatches(prev => new Set([...prev, wrongKey]));
      
      // Remove wrong match indication after 1 second
      setTimeout(() => {
        setWrongMatches(prev => {
          const newSet = new Set(prev);
          newSet.delete(wrongKey);
          return newSet;
        });
      }, 1000);
    }

    // Reset selections
    setTimeout(() => {
      setSelectedLeft(null);
      setSelectedRight(null);
    }, 500);
  };

  const getItemClass = (index: number, isRight: boolean = false) => {
    const baseClass = "group relative p-4 md:p-5 text-center rounded-2xl border-2 transition-all duration-300 font-medium text-sm md:text-base cursor-pointer transform hover:scale-105 shadow-lg hover:shadow-xl";
    const itemId = isRight ? index + 100 : index;
    const wrongKey = isRight ? 
      Array.from(wrongMatches).find(key => key.endsWith(`-${index}`)) :
      Array.from(wrongMatches).find(key => key.startsWith(`${index}-`));

    if (matches.has(itemId)) {
      return baseClass + " border-green-400 bg-gradient-to-br from-green-50 to-green-100 text-green-800 cursor-not-allowed shadow-green-200";
    }
    
    if (wrongKey) {
      return baseClass + " border-red-400 bg-gradient-to-br from-red-50 to-red-100 text-red-800 animate-pulse shadow-red-200";
    }
    
    if ((isRight && selectedRight === index) || (!isRight && selectedLeft === index)) {
      return baseClass + " border-blue-400 bg-gradient-to-br from-blue-50 to-blue-100 text-blue-800 shadow-blue-200 scale-105";
    }
    
    return baseClass + " border-gray-200 hover:border-purple-400 hover:bg-gradient-to-br hover:from-purple-50 hover:to-blue-50 bg-gradient-to-br from-white to-gray-50 text-gray-700 hover:text-purple-700";
  };

  const timePercentage = (timeLeft / 60) * 100; // 60 seconds (1 minute) for memory game

  const getGameTitle = () => {
    switch (gameNumber) {
      case 1:
        return "🧠 Jogo da Memória 1";
      case 2:
        return "🧠 Jogo da Memória 2";
      case 3:
        return "🧠 Jogo da Memória 2";
      default:
        return "🧠 Jogo da Memória - Bônus";
    }
  };

  const getGameDescription = () => {
    switch (gameNumber) {
      case 1:
        return "Conecte a primeira coluna com a segunda";
      case 2:
        return "Conecte a primeira coluna com a segunda";
      case 3:
        return "Conecte a primeira coluna com a segunda";
      default:
        return "Conecte as frases relacionadas à Ordem DeMolay";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full">
        {/* Timeout Message */}
        {timeLeft === 0 && !gameCompleted && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-orange-500 to-red-500 text-white p-8 rounded-3xl shadow-2xl max-w-sm w-full text-center border border-orange-300">
              <Clock className="w-16 h-16 mx-auto mb-4 animate-pulse" />
              <h3 className="text-2xl font-bold mb-3">⏰ Tempo Esgotado!</h3>
              <p className="text-orange-100 text-lg">Você conseguiu {score} conexões corretas!</p>
            </div>
          </div>
        )}

        {/* Completion Message */}
        {gameCompleted && score === memoryPairs.length && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-gradient-to-br from-green-500 to-emerald-500 text-white p-8 rounded-3xl shadow-2xl max-w-sm w-full text-center border border-green-300">
              <Trophy className="w-16 h-16 mx-auto mb-4 animate-bounce" />
              <h3 className="text-2xl font-bold mb-3">🎉 Perfeito!</h3>
              <p className="text-green-100 text-lg">Você conectou todas as frases corretamente!</p>
            </div>
          </div>
        )}

        {/* Enhanced Progress Section */}
        <div className="mb-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-2">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <span className="text-white text-lg font-bold">{getGameTitle()}</span>
              </div>
              <div className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                timeLeft <= 10 ? 'bg-red-500/20 text-red-300 animate-pulse' : 
                timeLeft <= 20 ? 'bg-orange-500/20 text-orange-300' : 
                'bg-blue-500/20 text-blue-200'
              }`}>
                <Clock className="w-5 h-5" />
                <span className="text-lg font-bold">{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</span>
              </div>
            </div>
            
            {/* Score Progress */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-blue-200 font-medium">Progresso das Conexões</span>
                <span className="text-white font-bold">{score}/{memoryPairs.length}</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-3">
                <div 
                  className="bg-gradient-to-r from-green-400 to-emerald-500 h-3 rounded-full transition-all duration-500 shadow-lg"
                  style={{ width: `${(score / memoryPairs.length) * 100}%` }}
                ></div>
              </div>
            </div>
            
            {/* Time Progress Bar */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-blue-200 font-medium">Tempo Restante</span>
                <span className={`font-bold ${timeLeft <= 10 ? 'text-red-300' : timeLeft <= 20 ? 'text-orange-300' : 'text-blue-200'}`}>
                  {timeLeft}s
                </span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-1000 shadow-lg ${
                    timePercentage > 50 ? 'bg-gradient-to-r from-green-400 to-green-500' : 
                    timePercentage > 25 ? 'bg-gradient-to-r from-yellow-400 to-orange-400' : 
                    'bg-gradient-to-r from-red-400 to-red-500'
                  }`}
                  style={{ width: `${timePercentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Game Card */}
        <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-10 border border-white/30">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-3">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Desafio da Trinca</h1>
            </div>
            
            <h2 className="text-xl md:text-2xl font-bold text-gray-700 mb-4">
              {getGameDescription()}
            </h2>
            
            <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-2xl p-4 mb-6 border border-purple-200">
              <p className="text-gray-700 font-medium mb-2">
                Clique em uma frase da esquerda e depois em sua correspondente da direita
              </p>
              <div className="flex items-center justify-center gap-2">
                <Zap className="w-5 h-5 text-purple-600" />
                <span className="text-purple-700 font-bold text-lg">
                  Conexões: {score}/{memoryPairs.length}
                </span>
              </div>
            </div>
          </div>

          {/* Enhanced Memory Game Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            {/* Left Column */}
            <div className="space-y-4">
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-full font-bold text-lg shadow-lg">
                  📝 Frases e Termos
                </div>
              </div>
              {leftItems.map((item, index) => (
                <button
                  key={`left-${index}`}
                  onClick={() => handleLeftClick(index)}
                  className={getItemClass(index)}
                  disabled={matches.has(index) || gameCompleted}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-left flex-1 leading-relaxed">{item}</span>
                    {matches.has(index) && (
                      <div className="flex-shrink-0 ml-3">
                        <CheckCircle className="w-6 h-6 text-green-600 animate-pulse" />
                      </div>
                    )}
                  </div>
                  {/* Hover effect indicator */}
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400/0 to-blue-400/0 group-hover:from-purple-400/10 group-hover:to-blue-400/10 rounded-2xl transition-all duration-300"></div>
                </button>
              ))}
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-teal-600 text-white px-6 py-3 rounded-full font-bold text-lg shadow-lg">
                  🎯 Significados
                </div>
              </div>
              {rightItems.map((item, index) => (
                <button
                  key={`right-${index}`}
                  onClick={() => handleRightClick(index)}
                  className={getItemClass(index, true)}
                  disabled={matches.has(index + 100) || gameCompleted}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-left flex-1 leading-relaxed">{item}</span>
                    {matches.has(index + 100) && (
                      <div className="flex-shrink-0 ml-3">
                        <CheckCircle className="w-6 h-6 text-green-600 animate-pulse" />
                      </div>
                    )}
                  </div>
                  {/* Hover effect indicator */}
                  <div className="absolute inset-0 bg-gradient-to-r from-green-400/0 to-teal-400/0 group-hover:from-green-400/10 group-hover:to-teal-400/10 rounded-2xl transition-all duration-300"></div>
                </button>
              ))}
            </div>
          </div>

          {/* Enhanced Instructions */}
          <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200 rounded-2xl p-6 shadow-inner">
            <div className="flex items-center gap-3 text-blue-800 mb-4">
              <div className="bg-blue-500 rounded-full p-2">
                <Star className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-lg">Como jogar:</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <ul className="text-blue-700 space-y-2">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Clique em uma frase da coluna esquerda</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Em seguida, clique em sua correspondente da direita</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Conexões corretas ficam verdes</span>
                </li>
              </ul>
              <ul className="text-blue-700 space-y-2">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span>Conexões erradas ficam vermelhas temporariamente</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>Conecte todas as frases antes do tempo acabar!</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span>Ganhe pontos bônus para sua pontuação final!</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};