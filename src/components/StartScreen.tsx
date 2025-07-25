import React, { useState } from 'react';
import { Play, Award, Users, BookOpen, User, Info, AlertCircle, Clock, Brain } from 'lucide-react';
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

          <div className="grid grid-cols-2 gap-3 md:gap-4 mb-4 md:mb-8 max-w-lg mx-auto">
            <div className="bg-white/5 rounded-lg p-3 md:p-4 border border-white/10">
              <BookOpen className="w-5 h-5 md:w-6 md:h-6 text-green-400 mx-auto mb-2" />
              <div className="text-lg md:text-xl font-bold text-white mb-1">4</div>
              <div className="text-xs md:text-sm text-blue-200 mb-1">Perguntas Fáceis</div>
              <div className="flex items-center justify-center gap-1">
                <Clock className="w-3 h-3 text-green-300" />
                <span className="text-xs text-green-300 font-semibold">15s</span>
              </div>
            </div>
            <div className="bg-white/5 rounded-lg p-3 md:p-4 border border-white/10">
              <Users className="w-5 h-5 md:w-6 md:h-6 text-yellow-400 mx-auto mb-2" />
              <div className="text-lg md:text-xl font-bold text-white mb-1">4</div>
              <div className="text-xs md:text-sm text-blue-200 mb-1">Perguntas Médias</div>
              <div className="flex items-center justify-center gap-1">
                <Clock className="w-3 h-3 text-yellow-300" />
                <span className="text-xs text-yellow-300 font-semibold">30s</span>
              </div>
            </div>
            <div className="bg-white/5 rounded-lg p-3 md:p-4 border border-white/10">
              <Award className="w-5 h-5 md:w-6 md:h-6 text-red-400 mx-auto mb-2" />
              <div className="text-lg md:text-xl font-bold text-white mb-1">4</div>
              <div className="text-xs md:text-sm text-blue-200 mb-1">Perguntas Difíceis</div>
              <div className="flex items-center justify-center gap-1">
                <Clock className="w-3 h-3 text-red-300" />
                <span className="text-xs text-red-300 font-semibold">45s</span>
              </div>
            </div>
            <div className="bg-white/5 rounded-lg p-3 md:p-4 border border-white/10">
              <Brain className="w-5 h-5 md:w-6 md:h-6 text-purple-400 mx-auto mb-2" />
              <div className="text-lg md:text-xl font-bold text-white mb-1">3</div>
              <div className="text-xs md:text-sm text-blue-200 mb-1">Jogos da Memória</div>
              <div className="flex items-center justify-center gap-1">
                <Clock className="w-3 h-3 text-purple-300" />
                <span className="text-xs text-purple-300 font-semibold">1min</span>
              </div>
            </div>
          </div>

          <div className="space-y-2 md:space-y-3 mb-4 md:mb-8">
            <div className="text-xs md:text-sm text-blue-200 bg-white/5 rounded-lg p-3 md:p-4 border border-white/10">
              💡 <strong>Como funciona:</strong> Teste seus conhecimentos sobre a Ordem DeMolay respondendo a 12 perguntas em ordem crescente de dificuldade, com 3 jogos da memória intercalados como bônus. Confira seu desempenho com explicações detalhadas!
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