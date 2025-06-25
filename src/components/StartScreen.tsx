import React, { useState } from 'react';
import { Play, Award, Users, BookOpen, User, Info, AlertCircle, Clock } from 'lucide-react';
import { AboutModal } from './AboutModal';

interface StartScreenProps {
  onStart: (playerName: string) => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  const [playerName, setPlayerName] = useState('');
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showNameWarning, setShowNameWarning] = useState(false);

  const handleStart = () => {
    if (playerName.trim()) {
      onStart(playerName.trim());
    } else {
      setShowNameWarning(true);
      // Hide warning after 3 seconds
      setTimeout(() => {
        setShowNameWarning(false);
      }, 3000);
    }
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerName(e.target.value);
    // Hide warning when user starts typing
    if (showNameWarning) {
      setShowNameWarning(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-4 md:p-8 shadow-2xl border border-white/20">
          <div className="mb-4 md:mb-8">
            <div className="inline-flex items-center justify-center w-12 h-12 md:w-20 md:h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mb-3 md:mb-6 shadow-lg">
              <Award className="w-6 h-6 md:w-10 md:h-10 text-white" />
            </div>
            <h1 className="text-2xl md:text-5xl font-bold text-white mb-2 md:mb-4 tracking-tight">
              Desafio da Trinca
            </h1>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-3 gap-2 md:gap-6 mb-4 md:mb-8">
            <div className="bg-white/5 rounded-lg p-2 md:p-6 border border-white/10">
              <BookOpen className="w-4 h-4 md:w-8 md:h-8 text-green-400 mx-auto mb-1 md:mb-3" />
              <div className="text-lg md:text-2xl font-bold text-white mb-0.5">5</div>
              <div className="text-xs md:text-sm text-blue-200">Perguntas Fáceis</div>
              <div className="flex items-center justify-center gap-1 mt-1">
                <Clock className="w-3 h-3 text-green-300" />
                <span className="text-xs text-green-300 font-semibold">15s</span>
              </div>
            </div>
            <div className="bg-white/5 rounded-lg p-2 md:p-6 border border-white/10">
              <Users className="w-4 h-4 md:w-8 md:h-8 text-yellow-400 mx-auto mb-1 md:mb-3" />
              <div className="text-lg md:text-2xl font-bold text-white mb-0.5">5</div>
              <div className="text-xs md:text-sm text-blue-200">Perguntas Médias</div>
              <div className="flex items-center justify-center gap-1 mt-1">
                <Clock className="w-3 h-3 text-yellow-300" />
                <span className="text-xs text-yellow-300 font-semibold">30s</span>
              </div>
            </div>
            <div className="bg-white/5 rounded-lg p-2 md:p-6 border border-white/10">
              <Award className="w-4 h-4 md:w-8 md:h-8 text-red-400 mx-auto mb-1 md:mb-3" />
              <div className="text-lg md:text-2xl font-bold text-white mb-0.5">5</div>
              <div className="text-xs md:text-sm text-blue-200">Perguntas Difíceis</div>
              <div className="flex items-center justify-center gap-1 mt-1">
                <Clock className="w-3 h-3 text-red-300" />
                <span className="text-xs text-red-300 font-semibold">45s</span>
              </div>
            </div>
          </div>

          <div className="space-y-2 md:space-y-3 mb-4 md:mb-8">
            <div className="text-xs md:text-sm text-blue-200 bg-white/5 rounded-lg p-3 md:p-4 border border-white/10">
              💡 <strong>Como funciona:</strong> Responda às 15 perguntas sobre a Ordem DeMolay, 
              começando pelas mais fáceis até as mais desafiadoras. Cada nível de dificuldade tem 
              um tempo diferente para responder. No final, veja seu desempenho 
              e aprenda com as explicações detalhadas!
            </div>
            <div className="text-xs md:text-sm text-orange-200 bg-orange-500/10 rounded-lg p-3 md:p-4 border border-orange-300/20">
              ⏰ <strong>Tempos por dificuldade:</strong> Fáceis (15s), Médias (30s), Difíceis (45s)
            </div>
          </div>

          {/* Nome do Jogador */}
          <div className="mb-4 md:mb-8">
            <div className="flex items-center justify-center gap-2 mb-2 md:mb-4">
              <User className="w-4 h-4 md:w-5 md:h-5 text-blue-200" />
              <label htmlFor="playerName" className="text-sm md:text-base text-blue-200 font-medium">
                Digite seu nome para começar:
              </label>
            </div>
            <input
              type="text"
              id="playerName"
              value={playerName}
              onChange={handleNameChange}
              placeholder="Seu nome aqui..."
              className={`w-full max-w-md mx-auto px-4 py-2.5 md:py-3 rounded-xl bg-white/30 border ${
                showNameWarning ? 'border-red-400 ring-2 ring-red-400/50' : 'border-white/40'
              } text-gray-900 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent backdrop-blur-sm focus:bg-white/40 transition-all duration-300`}
              onKeyPress={(e) => e.key === 'Enter' && handleStart()}
            />
            
            {/* Warning Message */}
            {showNameWarning && (
              <div className="mt-3 flex items-center justify-center gap-2 text-red-300 bg-red-500/20 border border-red-400/30 rounded-lg p-3 max-w-md mx-auto animate-pulse">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span className="text-sm font-medium">
                  Por favor, digite seu nome para iniciar o desafio!
                </span>
              </div>
            )}
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
            <button
              onClick={handleStart}
              className="group relative inline-flex items-center gap-2 md:gap-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-2.5 md:py-4 px-5 md:px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm md:text-base"
            >
              <Play className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform duration-300" />
              Iniciar Desafio
            </button>

            <button
              onClick={() => setShowAboutModal(true)}
              className="inline-flex items-center gap-2 md:gap-3 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 md:bg-white/10 md:hover:bg-white/20 border border-gray-600 md:border-white/30 hover:border-gray-500 md:hover:border-white/50 text-white font-semibold py-2.5 md:py-4 px-5 md:px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm md:text-base backdrop-blur-sm"
            >
              <Info className="w-4 h-4 md:w-5 md:h-5" />
              Sobre o Projeto
            </button>
          </div>
        </div>
      </div>

      {/* About Modal */}
      <AboutModal isOpen={showAboutModal} onClose={() => setShowAboutModal(false)} />
    </div>
  );
};