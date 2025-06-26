import React, { useState, useEffect } from 'react';
import { Trophy, Medal, Star, RotateCcw, Play, Award, Instagram, Share2, Camera, ArrowLeft, Brain, ChevronDown, ChevronUp } from 'lucide-react';
import { Question, ShuffledQuestion } from '../types/Quiz';
import { GameStats } from '../types/Quiz';
import { ShareCard } from './ShareCard';
import { QuestionDropdown } from './QuestionDropdown';

interface ResultsScreenProps {
  questions: Question[];
  userAnswers: number[];
  stats: GameStats;
  playerName: string;
  onRestart: () => void;
  shuffledQuestions: ShuffledQuestion[]; // Add shuffled questions prop
}

export const ResultsScreen: React.FC<ResultsScreenProps> = ({
  questions,
  userAnswers,
  stats,
  playerName,
  onRestart,
  shuffledQuestions
}) => {
  const [showShareScreen, setShowShareScreen] = useState(false);
  const [showQuestionsReview, setShowQuestionsReview] = useState(false);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getPerformanceMessage = (percentage: number, name: string) => {
    if (percentage >= 90) return { 
      message: `Excelente, ${name}! Você é um verdadeiro conhecedor da Ordem DeMolay! Seu conhecimento é impressionante e demonstra grande dedicação aos estudos da Ordem.`, 
      color: "text-green-600", 
      icon: Trophy,
      title: "🏆 PERFORMANCE EXCEPCIONAL! O PRÓPRIO FSL!"
    };
    if (percentage >= 70) return { 
      message: `Muito bom, ${name}! Você tem um sólido conhecimento sobre a Ordem DeMolay. Continue assim e logo será um expert no assunto!`, 
      color: "text-blue-600", 
      icon: Medal,
      title: "🥇 ÓTIMA PERFORMANCE! TÁ DE HACK?!"
    };
    if (percentage >= 50) return { 
      message: `Bom trabalho, ${name}! Você está no caminho certo. Continue estudando para aprimorar ainda mais seus conhecimentos sobre a Ordem DeMolay.`, 
      color: "text-yellow-600", 
      icon: Star,
      title: "⭐ BOA PERFORMANCE!"
    };
    return { 
      message: `Continue estudando, ${name}! A Ordem DeMolay tem muito a ensinar. Não desanime, cada erro é uma oportunidade de aprendizado!`, 
      color: "text-red-600", 
      icon: Award,
      title: "📚 CONTINUE ESTUDANDO!"
    };
  };

  const performance = getPerformanceMessage(stats.percentage, playerName);
  const IconComponent = performance.icon;

  // Share screen - optimized for mobile screenshots
  if (showShareScreen) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex flex-col">
        {/* Compact Header with back button */}
        <div className="flex items-center justify-between p-3 bg-black/20 backdrop-blur-sm">
          <button
            onClick={() => setShowShareScreen(false)}
            className="flex items-center gap-2 text-white/80 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm">Voltar</span>
          </button>
          
          <div className="flex items-center gap-2 text-white/90">
            <Camera className="w-4 h-4" />
            <span className="text-xs font-medium">Tire um print</span>
          </div>
          
          <div className="w-12"></div> {/* Spacer for centering */}
        </div>

        {/* Main content - perfectly centered and sized for mobile */}
        <div className="flex-1 flex items-center justify-center p-2">
          <div className="w-full max-w-sm flex justify-center">
            <ShareCard playerName={playerName} stats={stats} />
          </div>
        </div>

        {/* Compact Bottom instructions */}
        <div className="p-3 bg-black/20 backdrop-blur-sm">
          <div className="max-w-sm mx-auto text-center">
            <p className="text-white/90 text-xs mb-2">
              📸 <strong>Tire um print desta tela</strong> e publique nos Stories
            </p>
            <div className="flex justify-center gap-2 flex-wrap">
              <span className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-2.5 py-0.5 rounded-full text-xs font-bold">
                @demolaybrasil
              </span>
              <span className="text-white/70 text-xs">•</span>
              <span className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-2.5 py-0.5 rounded-full text-xs font-bold">
                @demolayrs
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main results screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 p-3 md:p-4">
      <div className="max-w-4xl mx-auto">
        {/* Results Header */}
        <div className="text-center mb-6 md:mb-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 md:p-8 shadow-xl border border-white/20">
            <div className="flex justify-center mb-4 md:mb-6">
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-3 md:p-4 shadow-lg">
                <IconComponent className="w-6 h-6 md:w-12 md:h-12 text-white" />
              </div>
            </div>
            <h1 className="text-xl md:text-4xl font-bold text-white mb-1 md:mb-2">Parabéns, {playerName}!</h1>
            <h2 className="text-base md:text-2xl font-semibold text-blue-200 mb-3 md:mb-4">{performance.title}</h2>
            <p className="text-sm md:text-lg mb-4 md:mb-6 text-blue-100 leading-relaxed max-w-3xl mx-auto px-2">
              {performance.message}
            </p>
            
            {/* Enhanced Score Statistics - Now includes memory games */}
            <div className="space-y-3 md:space-y-0 md:grid md:grid-cols-4 md:gap-4 mb-4 md:mb-6">
              {/* Primary Combined Stats Row */}
              <div className="grid grid-cols-2 gap-3 md:contents">
                <div className="bg-white/10 rounded-lg p-3 md:p-4">
                  <div className="text-2xl md:text-3xl font-bold text-white">{stats.totalEarnedPoints}</div>
                  <div className="text-xs md:text-sm text-blue-200">Pontos Totais</div>
                  <div className="text-xs text-blue-300">de {stats.totalPossiblePoints}</div>
                </div>
                <div className="bg-white/10 rounded-lg p-3 md:p-4">
                  <div className="text-2xl md:text-3xl font-bold text-white">{stats.percentage.toFixed(0)}%</div>
                  <div className="text-xs md:text-sm text-blue-200">Aproveitamento</div>
                  <div className="text-xs text-blue-300">Geral</div>
                </div>
              </div>
              
              {/* Questions Stats Row */}
              <div className="grid grid-cols-2 gap-3 md:contents">
                <div className="bg-white/10 rounded-lg p-3 md:p-4">
                  <div className="text-2xl md:text-3xl font-bold text-blue-300">{stats.correctAnswers}/12</div>
                  <div className="text-xs md:text-sm text-blue-200">Perguntas</div>
                  <div className="text-xs text-blue-300">{stats.questionsPercentage.toFixed(0)}%</div>
                </div>
                <div className="bg-white/10 rounded-lg p-3 md:p-4">
                  <div className="text-2xl md:text-3xl font-bold text-purple-300">{stats.totalMemoryScore}/18</div>
                  <div className="text-xs md:text-sm text-blue-200">Memória</div>
                  <div className="text-xs text-blue-300">{stats.memoryPercentage.toFixed(0)}%</div>
                </div>
              </div>
            </div>

            {/* Difficulty Breakdown */}
            <div className="grid grid-cols-3 gap-3 md:gap-4 mb-6 md:mb-8">
              <div className="bg-white/10 rounded-lg p-3 md:p-4">
                <div className="text-2xl md:text-3xl font-bold text-green-400">{stats.easyCorrect}/4</div>
                <div className="text-xs md:text-sm text-blue-200">Fáceis</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3 md:p-4">
                <div className="text-2xl md:text-3xl font-bold text-yellow-400">{stats.mediumCorrect}/4</div>
                <div className="text-xs md:text-sm text-blue-200">Médias</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3 md:p-4">
                <div className="text-2xl md:text-3xl font-bold text-red-400">{stats.hardCorrect}/4</div>
                <div className="text-xs md:text-sm text-blue-200">Difíceis</div>
              </div>
            </div>

            {/* Memory Games Detailed Results - Compact 3 Columns */}
            <div className="bg-gradient-to-r from-indigo-600/30 to-purple-600/30 backdrop-blur-sm rounded-2xl p-3 md:p-4 mb-4 md:mb-6 border border-indigo-400/30 shadow-lg">
              <div className="flex items-center justify-center gap-2 mb-3">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full p-1.5 shadow-lg">
                  <Brain className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-sm md:text-lg font-bold text-white">🧠 Bônus - Jogos da Memória</h3>
              </div>
              
              <div className="grid grid-cols-3 gap-2 mb-3">
                <div className="bg-white/15 backdrop-blur-sm rounded-lg p-2 border border-white/20 shadow-md">
                  <div className="text-center">
                    <div className="text-lg md:text-xl font-bold text-white mb-1">{stats.memoryGameScores[0] || 0}/6</div>
                    <div className="text-xs font-semibold text-blue-200 mb-1">Jogo 1</div>
                    <div className="w-full bg-white/20 rounded-full h-1.5">
                      <div 
                        className="bg-gradient-to-r from-green-400 to-emerald-500 h-1.5 rounded-full transition-all duration-500"
                        style={{ width: `${((stats.memoryGameScores[0] || 0) / 6) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/15 backdrop-blur-sm rounded-lg p-2 border border-white/20 shadow-md">
                  <div className="text-center">
                    <div className="text-lg md:text-xl font-bold text-white mb-1">{stats.memoryGameScores[1] || 0}/6</div>
                    <div className="text-xs font-semibold text-blue-200 mb-1">Jogo 2</div>
                    <div className="w-full bg-white/20 rounded-full h-1.5">
                      <div 
                        className="bg-gradient-to-r from-yellow-400 to-orange-500 h-1.5 rounded-full transition-all duration-500"
                        style={{ width: `${((stats.memoryGameScores[1] || 0) / 6) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/15 backdrop-blur-sm rounded-lg p-2 border border-white/20 shadow-md">
                  <div className="text-center">
                    <div className="text-lg md:text-xl font-bold text-white mb-1">{stats.memoryGameScores[2] || 0}/6</div>
                    <div className="text-xs font-semibold text-blue-200 mb-1">Jogo 3</div>
                    <div className="w-full bg-white/20 rounded-full h-1.5">
                      <div 
                        className="bg-gradient-to-r from-purple-400 to-pink-500 h-1.5 rounded-full transition-all duration-500"
                        style={{ width: `${((stats.memoryGameScores[2] || 0) / 6) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="text-center bg-white/10 backdrop-blur-sm rounded-lg p-2 border border-white/20">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Trophy className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm font-bold text-white">
                    Total: {stats.totalMemoryScore}/18 ({stats.memoryPercentage.toFixed(0)}%)
                  </span>
                </div>
                <p className="text-xs text-blue-100">
                  {stats.totalMemoryScore >= 15 ? 
                    "🎉 Excelente memória! Você domina os conceitos!" :
                    stats.totalMemoryScore >= 10 ?
                    `🧠 Boa memória! ${stats.totalMemoryScore} de 18 conceitos.` :
                    `💪 Continue praticando! ${stats.totalMemoryScore} de 18 conceitos.`
                  }
                </p>
              </div>
            </div>

            {/* Share Button */}
            <div className="mb-4">
              <button
                onClick={() => setShowShareScreen(true)}
                className="inline-flex items-center gap-2 md:gap-3 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-semibold py-3 md:py-4 px-6 md:px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm md:text-base"
              >
                <Instagram className="w-4 h-4 md:w-5 md:h-5" />
                Compartilhar nos Stories
                <Share2 className="w-4 h-4 md:w-5 md:h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Instagram Sharing Reminder - Mobile Optimized */}
        <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 backdrop-blur-lg rounded-2xl p-4 md:p-8 shadow-xl border border-pink-300/30 mb-6 md:mb-8">
          <div className="text-center">
            <div className="flex justify-center mb-3 md:mb-4">
              <div className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-full p-2.5 md:p-3 shadow-lg">
                <Instagram className="w-5 h-5 md:w-8 md:h-8 text-white" />
              </div>
            </div>
            <h2 className="text-lg md:text-2xl font-bold text-white mb-3 md:mb-4 flex items-center justify-center gap-2 md:gap-3">
              <Share2 className="w-4 h-4 md:w-6 md:h-6" />
              Compartilhe seu Resultado!
            </h2>
            <div className="bg-white/10 rounded-xl p-3 md:p-6 border border-white/20">
              <p className="text-sm md:text-lg text-blue-100 leading-relaxed mb-3 md:mb-4">
                🎉 <strong>Parabéns por completar o Desafio da Trinca!</strong> 
                Agora é hora de mostrar seu conhecimento sobre a Ordem DeMolay para todos os irmãos!
              </p>
              <p className="text-xs md:text-base text-blue-200 leading-relaxed mb-3 md:mb-4">
                📸 Use o botão acima para gerar automaticamente um card personalizado com seu resultado e compartilhe no Instagram marcando:
              </p>
              <div className="flex flex-col gap-2 justify-center items-center mb-3 md:mb-4">
                <div className="flex flex-col sm:flex-row gap-2 items-center">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full font-bold text-sm md:text-base">
                    @demolaybrasil
                  </div>
                  <span className="text-blue-200 font-bold text-sm">e</span>
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1.5 md:px-4 md:py-2 rounded-full font-bold text-sm md:text-base">
                    @demolayrs
                  </div>
                </div>
              </div>
              <p className="text-xs md:text-sm text-blue-300 leading-relaxed">
                💪 Mostre que você também honra a simbologia da Iniciação com orgulho e espírito DeMolay! 
                Inspire outros irmãos a testarem seus conhecimentos!
              </p>
            </div>
          </div>
        </div>

        {/* Questions Review - Collapsible */}
        <div className="bg-white rounded-2xl shadow-xl p-3 md:p-8 mb-6 md:mb-8">
          <button
            onClick={() => setShowQuestionsReview(!showQuestionsReview)}
            className="w-full flex items-center justify-between p-4 md:p-6 text-left hover:bg-gray-50 rounded-xl transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <div className="flex items-center gap-2 md:gap-3">
              <Star className="w-4 h-4 md:w-6 md:h-6 text-yellow-500" />
              <h2 className="text-lg md:text-2xl font-bold text-gray-800">
                Revisão das Perguntas ({shuffledQuestions.length} perguntas)
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 hidden sm:inline">
                {showQuestionsReview ? 'Ocultar' : 'Mostrar'} detalhes
              </span>
              {showQuestionsReview ? (
                <ChevronUp className="w-5 h-5 text-gray-500" />
              ) : (
                <ChevronDown className="w-5 h-5 text-gray-500" />
              )}
            </div>
          </button>

          <div className={`transition-all duration-500 ease-in-out ${
            showQuestionsReview ? 'max-h-[10000px] opacity-100' : 'max-h-0 opacity-0'
          } overflow-hidden`}>
            <div className="border-t border-gray-200 pt-4 md:pt-6">
              <div className="space-y-4">
                {shuffledQuestions.map((question, index) => {
                  const userAnswer = userAnswers[index];
                  const isCorrect = userAnswer === question.shuffledCorrectAnswer;
                  const wasTimeout = userAnswer === -1;
                  
                  return (
                    <QuestionDropdown
                      key={question.id}
                      question={question}
                      questionIndex={index}
                      userAnswer={userAnswer}
                      isCorrect={isCorrect}
                      wasTimeout={wasTimeout}
                    />
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Restart Button */}
        <div className="text-center pb-4">
          <button
            onClick={onRestart}
            className="inline-flex items-center gap-2 md:gap-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 md:py-4 px-6 md:px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm md:text-base"
          >
            <RotateCcw className="w-4 h-4 md:w-5 md:h-5" />
            Jogar Novamente
          </button>
        </div>
      </div>
    </div>
  );
};