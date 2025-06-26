import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Clock, Star, RotateCcw, Trophy } from 'lucide-react';

interface MemoryPair {
  id: number;
  left: string;
  right: string;
}

interface MemoryGameProps {
  onComplete: (score: number) => void;
  timeLeft: number;
}

const memoryPairs: MemoryPair[] = [
  {
    id: 1,
    left: "Fidelitas et Veritas",
    right: "Lema da Ordem DeMolay"
  },
  {
    id: 2,
    left: "Frank S. Land",
    right: "Fundador da Ordem DeMolay"
  },
  {
    id: 3,
    left: "Kansas City, Missouri",
    right: "Local de fundação da Ordem"
  },
  {
    id: 4,
    left: "Rosa Branca",
    right: "Flor oficial da Ordem DeMolay"
  },
  {
    id: 5,
    left: "Amor Filial",
    right: "Virtude do amor aos pais"
  },
  {
    id: 6,
    left: "1919",
    right: "Ano de fundação da Ordem"
  }
];

export const MemoryGame: React.FC<MemoryGameProps> = ({ onComplete, timeLeft }) => {
  const [leftItems, setLeftItems] = useState<string[]>([]);
  const [rightItems, setRightItems] = useState<string[]>([]);
  const [selectedLeft, setSelectedLeft] = useState<number | null>(null);
  const [selectedRight, setSelectedRight] = useState<number | null>(null);
  const [matches, setMatches] = useState<Set<number>>(new Set());
  const [wrongMatches, setWrongMatches] = useState<Set<string>>(new Set());
  const [score, setScore] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  // Initialize shuffled items
  useEffect(() => {
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
  }, []);

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
    const baseClass = "p-3 md:p-4 text-center rounded-xl border-2 transition-all duration-300 font-medium text-sm md:text-base cursor-pointer";
    const itemId = isRight ? index + 100 : index;
    const wrongKey = isRight ? 
      Array.from(wrongMatches).find(key => key.endsWith(`-${index}`)) :
      Array.from(wrongMatches).find(key => key.startsWith(`${index}-`));

    if (matches.has(itemId)) {
      return baseClass + " border-green-500 bg-green-100 text-green-800 cursor-not-allowed";
    }
    
    if (wrongKey) {
      return baseClass + " border-red-500 bg-red-100 text-red-800 animate-pulse";
    }
    
    if ((isRight && selectedRight === index) || (!isRight && selectedLeft === index)) {
      return baseClass + " border-blue-500 bg-blue-100 text-blue-800";
    }
    
    return baseClass + " border-gray-200 hover:border-blue-400 hover:bg-blue-50 bg-white";
  };

  const timePercentage = (timeLeft / 45) * 100; // 45 seconds for hard difficulty

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        {/* Timeout Message */}
        {timeLeft === 0 && !gameCompleted && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-orange-500 text-white p-6 rounded-2xl shadow-2xl max-w-sm w-full text-center">
              <Clock className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">⏰ Tempo Esgotado!</h3>
              <p className="text-orange-100">Você conseguiu {score} conexões corretas!</p>
            </div>
          </div>
        )}

        {/* Completion Message */}
        {gameCompleted && score === memoryPairs.length && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-green-500 text-white p-6 rounded-2xl shadow-2xl max-w-sm w-full text-center">
              <Trophy className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">🎉 Parabéns!</h3>
              <p className="text-green-100">Você conectou todas as frases corretamente!</p>
            </div>
          </div>
        )}

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-blue-200 text-sm font-medium">
              🧠 Jogo da Memória - Bônus
            </span>
            <div className={`flex items-center gap-2 ${timeLeft <= 5 ? 'text-red-300 animate-pulse' : timeLeft <= 10 ? 'text-orange-300' : 'text-blue-200'}`}>
              <Clock className="w-4 h-4" />
              <span className="text-sm font-bold">{timeLeft}s</span>
            </div>
          </div>
          <div className="w-full bg-white/20 rounded-full h-2 mb-2">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(score / memoryPairs.length) * 100}%` }}
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

        {/* Game Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Star className="w-6 h-6 text-yellow-500" />
              <span className="text-gray-700 font-semibold">Desafio da Trinca - Bônus</span>
            </div>
            <div className="px-3 py-1 rounded-full text-xs font-semibold bg-purple-100 text-purple-800">
              Jogo da Memória (45s)
            </div>
          </div>

          <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6 leading-relaxed text-center">
            🧠 Conecte as frases relacionadas à Ordem DeMolay
          </h2>

          <div className="mb-4 text-center">
            <p className="text-gray-600 text-sm md:text-base">
              Clique em uma frase da esquerda e depois em sua correspondente da direita
            </p>
            <p className="text-blue-600 font-semibold text-sm">
              Conexões corretas: {score}/{memoryPairs.length}
            </p>
          </div>

          {/* Memory Game Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {/* Left Column */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-700 text-center mb-4">
                📝 Frases e Termos
              </h3>
              {leftItems.map((item, index) => (
                <button
                  key={`left-${index}`}
                  onClick={() => handleLeftClick(index)}
                  className={getItemClass(index)}
                  disabled={matches.has(index) || gameCompleted}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-left flex-1">{item}</span>
                    {matches.has(index) && (
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 ml-2" />
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Right Column */}
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-gray-700 text-center mb-4">
                🎯 Significados
              </h3>
              {rightItems.map((item, index) => (
                <button
                  key={`right-${index}`}
                  onClick={() => handleRightClick(index)}
                  className={getItemClass(index, true)}
                  disabled={matches.has(index + 100) || gameCompleted}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-left flex-1">{item}</span>
                    {matches.has(index + 100) && (
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 ml-2" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Instructions */}
          <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center gap-2 text-blue-800 mb-2">
              <Star className="w-5 h-5" />
              <span className="font-semibold">Como jogar:</span>
            </div>
            <ul className="text-blue-700 text-sm space-y-1">
              <li>• Clique em uma frase da coluna esquerda</li>
              <li>• Em seguida, clique em sua correspondente da direita</li>
              <li>• Conexões corretas ficam verdes</li>
              <li>• Conexões erradas ficam vermelhas temporariamente</li>
              <li>• Conecte todas as frases antes do tempo acabar!</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};