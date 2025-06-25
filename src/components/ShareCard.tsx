import React from 'react';
import { Trophy, Medal, Star, Award, Instagram } from 'lucide-react';
import { GameStats } from '../types/Quiz';

interface ShareCardProps {
  playerName: string;
  stats: GameStats;
}

export const ShareCard: React.FC<ShareCardProps> = ({ playerName, stats }) => {
  const getPerformanceData = (percentage: number) => {
    if (percentage >= 90) return { 
      icon: Trophy,
      title: "PERFORMANCE EXCEPCIONAL!",
      emoji: "🏆",
      color: "from-yellow-300 to-yellow-500",
      textColor: "text-yellow-900"
    };
    if (percentage >= 70) return { 
      icon: Medal,
      title: "ÓTIMA PERFORMANCE!",
      emoji: "🥇",
      color: "from-yellow-300 to-yellow-500",
      textColor: "text-yellow-900"
    };
    if (percentage >= 50) return { 
      icon: Star,
      title: "BOA PERFORMANCE!",
      emoji: "⭐",
      color: "from-yellow-300 to-yellow-500",
      textColor: "text-yellow-900"
    };
    return { 
      icon: Award,
      title: "CONTINUE ESTUDANDO!",
      emoji: "📚",
      color: "from-yellow-300 to-yellow-500",
      textColor: "text-yellow-900"
    };
  };

  const performance = getPerformanceData(stats.percentage);
  const IconComponent = performance.icon;

  return (
    <div 
      id="share-card"
      className="w-[400px] h-[700px] bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-600 relative overflow-hidden shadow-2xl flex flex-col"
      style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
    >
      {/* Golden Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-8 left-8 w-16 h-16 border-2 border-yellow-200 rounded-full"></div>
        <div className="absolute top-24 right-6 w-12 h-12 border-2 border-yellow-200 rounded-full"></div>
        <div className="absolute top-40 left-12 w-8 h-8 border-2 border-yellow-200 rounded-full"></div>
        <div className="absolute bottom-32 right-8 w-20 h-20 border-2 border-yellow-200 rounded-full"></div>
        <div className="absolute bottom-16 left-6 w-14 h-14 border-2 border-yellow-200 rounded-full"></div>
        <div className="absolute top-60 right-12 w-10 h-10 border-2 border-yellow-200 rounded-full"></div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-16 right-16 text-6xl">⭐</div>
        <div className="absolute bottom-40 left-8 text-4xl">🏆</div>
        <div className="absolute top-80 left-16 text-3xl">💎</div>
      </div>

      {/* Main Content Area - Flex grow to push footer down */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="relative z-10 text-center pt-8 pb-4">
          <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${performance.color} rounded-full mb-4 shadow-xl border-2 border-yellow-200`}>
            <IconComponent className="w-8 h-8 text-yellow-900" />
          </div>
          <h1 className="text-yellow-900 text-2xl font-bold mb-1 drop-shadow-sm">Desafio da Trinca</h1>
          <p className="text-yellow-800 text-base font-semibold">Ordem DeMolay</p>
        </div>

        {/* Player Name */}
        <div className="relative z-10 text-center mb-4">
          <h2 className="text-yellow-900 text-xl font-bold mb-2">Parabéns,</h2>
          <h3 className="text-yellow-900 text-xl font-bold bg-yellow-200/60 backdrop-blur-sm rounded-full px-4 py-2 mx-6 border border-yellow-300">
            {playerName}!
          </h3>
        </div>

        {/* Performance Title */}
        <div className="relative z-10 text-center mb-4">
          <div className="bg-yellow-200/60 backdrop-blur-sm rounded-xl mx-6 py-3 border border-yellow-300">
            <p className="text-yellow-900 text-lg font-bold">
              {performance.emoji} {performance.title}
            </p>
          </div>
        </div>

        {/* Main Stats - Flex grow to take available space */}
        <div className="relative z-10 px-6 flex-1 flex flex-col justify-center">
          <div className="bg-yellow-200/60 backdrop-blur-sm rounded-xl p-4 border border-yellow-300">
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-900">{stats.correctAnswers}</div>
                <div className="text-yellow-800 text-sm font-semibold">Acertos</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-900">{stats.percentage.toFixed(0)}%</div>
                <div className="text-yellow-800 text-sm font-semibold">Aproveitamento</div>
              </div>
            </div>
            
            {/* Difficulty Stats */}
            <div className="border-t border-yellow-300 pt-3">
              <h4 className="text-yellow-900 text-sm font-bold text-center mb-3">Desempenho por Dificuldade</h4>
              <div className="grid grid-cols-3 gap-2">
                <div className="text-center bg-green-100/80 rounded-lg py-2 border border-green-200">
                  <div className="text-xl font-bold text-green-700">{stats.easyCorrect}/5</div>
                  <div className="text-green-600 text-xs font-semibold">Fáceis</div>
                </div>
                <div className="text-center bg-yellow-100/80 rounded-lg py-2 border border-yellow-300">
                  <div className="text-xl font-bold text-yellow-700">{stats.mediumCorrect}/5</div>
                  <div className="text-yellow-600 text-xs font-semibold">Médias</div>
                </div>
                <div className="text-center bg-red-100/80 rounded-lg py-2 border border-red-200">
                  <div className="text-xl font-bold text-red-700">{stats.hardCorrect}/5</div>
                  <div className="text-red-600 text-xs font-semibold">Difíceis</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Instagram Footer - Fixed at bottom */}
      <div className="relative z-10 bg-gradient-to-r from-pink-600 to-purple-700 p-4 text-center">
        <div className="flex justify-center mb-2">
          <Instagram className="w-6 h-6 text-white" />
        </div>
        <p className="text-white text-sm font-bold mb-2">
          Compartilhe nos Stories e marque:
        </p>
        <div className="flex justify-center gap-2 flex-wrap">
          <span className="bg-white text-pink-600 px-3 py-1 rounded-full text-xs font-bold">
            @demolaybrasil
          </span>
          <span className="text-white text-xs font-bold">e</span>
          <span className="bg-white text-purple-600 px-3 py-1 rounded-full text-xs font-bold">
            @demolayrs
          </span>
        </div>
      </div>
    </div>
  );
};