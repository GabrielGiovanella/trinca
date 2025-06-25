import React from 'react';
import { X, Trophy, Users, Code, Video, Instagram, MapPin } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Trophy className="w-8 h-8 text-yellow-300" />
              <h2 className="text-2xl font-bold">Sobre o Projeto</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          {/* Project Description */}
          <div className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              O <strong>Desafio da Trinca</strong> nasce como uma iniciativa da equipe <strong>Trinca de Ouro</strong>, 
              com o objetivo de valorizar a simbologia da Cerimônia de Iniciação na Ordem DeMolay. O jogo foi 
              desenvolvido especialmente para as <strong>Olimpíadas DeMolay 2025</strong>, buscando promover o 
              entendimento mais profundo dos ensinamentos que moldam nossa identidade e fortalecer o sentimento 
              de pertencimento entre os irmãos.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Acreditamos que o conhecimento simbólico, quando aliado à experiência lúdica, torna-se ainda mais 
              marcante — conectando razão e emoção, tradição e inovação. Este projeto é uma homenagem aos valores 
              que nos unem e aos momentos que nos transformam.
            </p>
          </div>

          {/* Team Section */}
          <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 border border-yellow-200">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full p-2">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800">Equipe Trinca de Ouro</h3>
            </div>
            
            <div className="flex items-center gap-2 mb-6">
              <MapPin className="w-5 h-5 text-blue-600" />
              <span className="text-lg font-semibold text-gray-700"> UF: Rio Grande do Sul</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Captain */}
              <div className="bg-white rounded-lg p-4 shadow-sm border border-yellow-200">
                <div className="flex items-center gap-2 mb-3">
                  <div className="bg-yellow-500 rounded-full p-2">
                    <Trophy className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-bold text-gray-800"> Capitão</span>
                </div>
                <h4 className="font-bold text-lg text-gray-800 mb-2">Lorenzo Gabriel de Azevedo Viera</h4>
                <p className="text-sm text-gray-600 mb-1"><strong>ID DeMolay:</strong> 70758</p>
                <p className="text-sm text-gray-600"><strong>Capítulos:</strong> Santo Ângelo nº 306 e Porto Alegre nº 46</p>
              </div>

              {/* Developer */}
              <div className="bg-white rounded-lg p-4 shadow-sm border border-yellow-200">
                <div className="flex items-center gap-2 mb-3">
                  <div className="bg-blue-500 rounded-full p-2">
                    <Code className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-bold text-gray-800"> Desenvolvedor</span>
                </div>
                <h4 className="font-bold text-lg text-gray-800 mb-2">Gabriel Giovanella</h4>
                <p className="text-sm text-gray-600 mb-1"><strong>ID DeMolay:</strong> 110776</p>
                <p className="text-sm text-gray-600"><strong>Capítulo:</strong> Cavaleiros da Esperança nº 1063</p>
              </div>

              {/* Editor */}
              <div className="bg-white rounded-lg p-4 shadow-sm border border-yellow-200">
                <div className="flex items-center gap-2 mb-3">
                  <div className="bg-red-500 rounded-full p-2">
                    <Video className="w-4 h-4 text-white" />
                  </div>
                  <span className="font-bold text-gray-800"> Editor e Videomaker</span>
                </div>
                <h4 className="font-bold text-lg text-gray-800 mb-2">Augusto Knak</h4>
                <p className="text-sm text-gray-600 mb-1"><strong>ID DeMolay:</strong> 76025</p>
                <p className="text-sm text-gray-600"><strong>Capítulo:</strong> Venâncio Aires nº 906</p>
              </div>
            </div>
          </div>

          {/* Team Motto */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-200">
            <h3 className="text-xl font-bold text-gray-800 mb-4 text-center"> Nosso Lema</h3>
            <div className="text-center">
              <p className="text-lg font-bold text-blue-800 leading-relaxed">
                "Trinca, trinca, pode acreditar!<br />
                Somos de ouro, viemos pra ganhar!<br />
                Força, união e muito saber,<br />
                Trinca de Ouro vai vencer!"
              </p>
            </div>
          </div>

          {/* Share Section */}
          <div className="bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl p-6 border border-pink-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-full p-2">
                <Instagram className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-800">Compartilhe seu resultado!</h3>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              💥 <strong>Finalizou o desafio?</strong> Não esqueça de compartilhar o resultado do seu teste no Instagram 
              marcando <strong className="text-purple-600">@demolayrs</strong> e <strong className="text-purple-600">@demolaybrasil</strong>!
            </p>
            <p className="text-gray-700 leading-relaxed">
              Mostre que você também honra a simbologia da Iniciação com orgulho e espírito DeMolay!
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 p-6 rounded-b-2xl">
          <div className="text-center">
            <button
              onClick={onClose}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};