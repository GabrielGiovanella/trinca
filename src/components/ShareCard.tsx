import React from 'react';
import { Trophy, Medal, Star, Award, Instagram, Brain } from 'lucide-react';
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
      className="w-[320px] h-[550px] bg-gradient-to-br from-yellow-400 via-yellow-500 to-amber-600 relative overflow-hidden shadow-2xl flex flex-col rounded-2xl"
      style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
    >
      {/* Minimal Background Pattern */}
      <div className="absolute inset-0 opacity-8">
        <div className="absolute top-4 left-4 w-8 h-8 border border-yellow-200 rounded-full"></div>
        <div className="absolute top-16 right-3 w-6 h-6 border border-yellow-200 rounded-full"></div>
        <div className="absolute bottom-20 right-4 w-10 h-10 border border-yellow-200 rounded-full"></div>
        <div className="absolute bottom-8 left-3 w-7 h-7 border border-yellow-200 rounded-full"></div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col p-3">
        {/* Compact Header */}
        <div className="relative z-10 text-center pt-3 pb-2">
          <div className={`inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r ${performance.color} rounded-full mb-2 shadow-lg border border-yellow-200`}>
            <IconComponent className="w-6 h-6 text-yellow-900" />
          </div>
          <h1 className="text-yellow-900 text-lg font-bold mb-1 drop-shadow-sm">Desafio da Trinca</h1>
          <p className="text-yellow-800 text-sm font-semibold">Ordem DeMolay</p>
        </div>

        {/* Compact Player Name */}
        <div className="relative z-10 text-center mb-2">
          <h2 className="text-yellow-900 text-base font-bold mb-1">Parabéns,</h2>
          <h3 className="text-yellow-900 text-base font-bold bg-yellow-200/60 backdrop-blur-sm rounded-full px-3 py-1 mx-3 border border-yellow-300">
            {playerName}!
          </h3>
        </div>

        {/* Compact Performance Title */}
        <div className="relative z-10 text-center mb-3">
          <div className="bg-yellow-200/60 backdrop-blur-sm rounded-lg mx-3 py-2 border border-yellow-300">
            <p className="text-yellow-900 text-sm font-bold">
              {performance.emoji} {performance.title}
            </p>
          </div>
        </div>

        {/* Compact Main Stats */}
        <div className="relative z-10 flex-1 flex flex-col justify-center">
          <div className="bg-yellow-200/60 backdrop-blur-sm rounded-lg p-3 border border-yellow-300">
            {/* Primary Stats - Compact */}
            <div className="grid grid-cols-2 gap-2 mb-3">
              <div className="text-center">
                <div className="text-xl font-bold text-yellow-900">{stats.totalEarnedPoints}</div>
                <div className="text-yellow-800 text-xs font-semibold">Pontos Totais</div>
                <div className="text-yellow-700 text-xs">de {stats.totalPossiblePoints}</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-yellow-900">{stats.percentage.toFixed(0)}%</div>
                <div className="text-yellow-800 text-xs font-semibold">Aproveitamento</div>
                <div className="text-yellow-700 text-xs">Geral</div>
              </div>
            </div>
            
            {/* Breakdown Stats - Very Compact */}
            <div className="border-t border-yellow-300 pt-2 mb-2">
              <h4 className="text-yellow-900 text-xs font-bold text-center mb-2">Desempenho Detalhado</h4>
              <div className="grid grid-cols-2 gap-2 mb-2">
                <div className="text-center bg-blue-100/80 rounded-lg py-1 border border-blue-200">
                  <div className="text-base font-bold text-blue-700">{stats.correctAnswers}/12</div>
                  <div className="text-blue-600 text-xs font-semibold">Perguntas</div>
                  <div className="text-blue-500 text-xs">{stats.questionsPercentage.toFixed(0)}%</div>
                </div>
                <div className="text-center bg-purple-100/80 rounded-lg py-1 border border-purple-200">
                  <div className="text-base font-bold text-purple-700">{stats.totalMemoryScore}/18</div>
                  <div className="text-purple-600 text-xs font-semibold">Memória</div>
                  <div className="text-purple-500 text-xs">{stats.memoryPercentage.toFixed(0)}%</div>
                </div>
              </div>
              
              {/* Difficulty Stats - Very Compact */}
              <div className="grid grid-cols-3 gap-1">
                <div className="text-center bg-green-100/80 rounded-lg py-1 border border-green-200">
                  <div className="text-sm font-bold text-green-700">{stats.easyCorrect}/4</div>
                  <div className="text-green-600 text-xs font-semibold">Fáceis</div>
                </div>
                <div className="text-center bg-yellow-100/80 rounded-lg py-1 border border-yellow-300">
                  <div className="text-sm font-bold text-yellow-700">{stats.mediumCorrect}/4</div>
                  <div className="text-yellow-600 text-xs font-semibold">Médias</div>
                </div>
                <div className="text-center bg-red-100/80 rounded-lg py-1 border border-red-200">
                  <div className="text-sm font-bold text-red-700">{stats.hardCorrect}/4</div>
                  <div className="text-red-600 text-xs font-semibold">Difíceis</div>
                </div>
              </div>
            </div>

            {/* Memory Games Individual Scores - Very Compact */}
            <div className="border-t border-yellow-300 pt-2">
              <div className="grid grid-cols-3 gap-1">
                <div className="text-center bg-indigo-100/80 rounded-lg py-1 border border-indigo-200">
                  <div className="text-xs font-bold text-indigo-700">{stats.memoryGameScores[0] || 0}/6</div>
                  <div className="text-indigo-600 text-xs font-semibold">J1</div>
                </div>
                <div className="text-center bg-indigo-100/80 rounded-lg py-1 border border-indigo-200">
                  <div className="text-xs font-bold text-indigo-700">{stats.memoryGameScores[1] || 0}/6</div>
                  <div className="text-indigo-600 text-xs font-semibold">J2</div>
                </div>
                <div className="text-center bg-indigo-100/80 rounded-lg py-1 border border-indigo-200">
                  <div className="text-xs font-bold text-indigo-700">{stats.memoryGameScores[2] || 0}/6</div>
                  <div className="text-indigo-600 text-xs font-semibold">J3</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Compact Instagram Footer */}
      <div className="relative z-10 bg-gradient-to-r from-pink-600 to-purple-700 p-2.5 text-center rounded-b-2xl">
        <div className="flex justify-center mb-1">
          <Instagram className="w-4 h-4 text-white" />
        </div>
        <p className="text-white text-xs font-bold mb-1">
          Compartilhe nos Stories e marque:
        </p>
        <div className="flex justify-center gap-1 flex-wrap">
          <span className="bg-white text-pink-600 px-2 py-0.5 rounded-full text-xs font-bold">
            @demolaybrasil
          </span>
          <span className="text-white text-xs font-bold">e</span>
          <span className="bg-white text-purple-600 px-2 py-0.5 rounded-full text-xs font-bold">
            @demolayrs
          </span>
        </div>
      </div>
    </div>
  );
};