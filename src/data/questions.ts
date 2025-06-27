import { Question } from '../types/Quiz';

export const questions: Question[] = [
  // Perguntas Fáceis (4) - 5ª pergunta substituída por jogo da memória
  {
    id: 1,
    question: "A jornada simbólica da iniciação inicia-se no Leste, posto do Mestre Conselheiro. Esse ponto cardeal simboliza:",
    options: [
      "O entardecer da vida.",
      "A adolescência.",
      "A manhã da vida, início da jornada.",
      "A morte e o renascimento."
    ],
    correctAnswer: 2,
    difficulty: 'easy',
    explanation: "Lorem Ipsum set do tu gloriam",
    videoUrl: "https://www.youtube.com/embed/YfOuvJOKeXU"
  },
  {
    id: 2,
    question: "O Oeste representa, na simbologia do Primeiro Conselheiro",
    options: [
      "A infância despreocupada.",
      "O pôr do sol e fim da vida.",
      "O meio-dia da vida e o tempo de reflexão.",
      "A velhice e a decadência."
    ],
    correctAnswer: 1,
    difficulty: 'easy',
    explanation: "Lorem Ipsum",
    videoUrl: "https://www.youtube.com/embed/YfOuvJOKeXU"
  },
  {
    id: 3,
    question: "O que significa três batidas de malhete realizadas pelo Mestre Conselheiro?",
    options: [
      "Atenção de todos os presentes.",
      "Todos se sentam.",
      "Apenas os oficiais se levantam.",
      "Todos se levantam."
    ],
    correctAnswer: 3,
    difficulty: 'easy',
    explanation: "Lorem Ipsum.",
    videoUrl: "https://www.youtube.com/embed/YfOuvJOKeXU"
  },
  {
    id: 4,
    question: "O que o Capítulo deve fazer caso um candidato manifeste desconforto com o uso da venda?",
    options: [
      "Retirá-lo da cerimônia e impedir sua iniciação.",
      "Ignorar e prosseguir normalmente.",
      "Permitir que participe da cerimônia sem a venda.",
      "Aplicar um teste para avaliar sua fidelidade à Ordem."
    ],
    correctAnswer: 2,
    difficulty: 'easy',
    explanation: "A Ordem DeMolay preza pelo bem-estar e conforto de seus candidatos. Se um candidato manifestar desconforto com o uso da venda, deve ser permitido que ele participe da cerimônia sem ela, garantindo que a experiência seja positiva e respeitosa.",
    videoUrl: "https://www.youtube.com/embed/YfOuvJOKeXU"
  },

  // Perguntas Médias (4) - 5ª pergunta substituída por jogo da memória
  {
    id: 6,
    question: "A Coroa da Juventude é conduzida na jornada por:",
    options: [
      "Um dos Preceptores.",
      "O Primeiro Diácono.",
      "O Mestre Conselheiro.",
      "Capelão."
    ],
    correctAnswer: 1,
    difficulty: 'medium',
    explanation: "Lorem Ipsum Set.",
    videoUrl: "https://www.youtube.com/embed/A_xcpIr9vxs?start=4"
  },
  {
    id: 7,
    question: "Sobre o colar que o Mestre Conselheiro utiliza na iniciação, responda:",
    options: [
      "É de cor amarela e é o único oficial que o utiliza em cerimônia.",
      "Todos os oficiais presentes na reunião usam o mesmo colar.",
      "O colar é composto por uma fita vermelha e uma joia com imagens e simbologia diferentes, conforme o respectivo cargo.",
      "O Mestre Conselheiro é o único oficial na Ordem DeMolay que pode utilizar um colar."
    ],
    correctAnswer: 0,
    difficulty: 'medium',
    explanation: "Lorem Ipsum.",
    videoUrl: "https://www.youtube.com/embed/A_xcpIr9vxs?start=4"
  },
  {
    id: 8,
    question: "Quais as cores estão presentes nas capas utilizadas pelos oficiais em cerimônia:",
    options: [
      "Cinza escuro, vermelho e laranja.",
      "Preto, vermelho e verde fosco.",
      "Vermelho, cinza escura e dourado.",
      "Preto, vermelho e amarelo."
    ],
    correctAnswer: 3,
    difficulty: 'medium',
    explanation: "Lorem Ipsum",
    videoUrl: "https://www.youtube.com/embed/A_xcpIr9vxs?start=4"
  },
  {
    id: 9,
    question: "Quem é o oficial responsável por guiar os candidatos durante a cerimônia de iniciação:",
    options: [
      "Capelão",
      "Mestre de Cerimônias",
      "1º Diácono",
      "Sentinela"
    ],
    correctAnswer: 2,
    difficulty: 'medium',
    explanation: "Lorem Ipsum",
    videoUrl: "https://www.youtube.com/embed/A_xcpIr9vxs?start=4"
  },

  // Perguntas Difíceis (4)
  {
    id: 11,
    question: "Em que cidade e estado americano foi fundada a primeira reunião da Ordem DeMolay?",
    options: [
      "Kansas City, Kansas",
      "Kansas City, Missouri",
      "Kansas City, Oklahoma",
      "Kansas City, Iowa"
    ],
    correctAnswer: 1,
    difficulty: 'hard',
    explanation: "A primeira reunião da Ordem DeMolay aconteceu em Kansas City, Missouri, no edifício da Loja Maçônica Ivanhoe nº 446, em 31 de março de 1919.",
    videoUrl: "https://www.youtube.com/embed/A_xcpIr9vxs?start=4"
  },
  {
    id: 12,
    question: "Qual era a profissão de Frank S. Land quando fundou a Ordem DeMolay?",
    options: [
      "Professor",
      "Vendedor de seguros de vida",
      "Advogado",
      "Engenheiro"
    ],
    correctAnswer: 1,
    difficulty: 'hard',
    explanation: "Frank S. Land trabalhava como vendedor de seguros de vida quando fundou a Ordem DeMolay, sendo também um ativo membro da Maçonaria.",
    videoUrl: "https://www.youtube.com/embed/A_xcpIr9vxs?start=4"
  },
  {
    id: 13,
    question: "Qual o nome do primeiro jovem a ser iniciado na Ordem DeMolay?",
    options: [
      "Louis Lower",
      "Ivan Bentley",
      "Gorman McBride",
      "Jerome Jacobson"
    ],
    correctAnswer: 0,
    difficulty: 'hard',
    explanation: "Louis Gordon Lower foi o primeiro jovem a ser iniciado na Ordem DeMolay e também se tornou o primeiro Mestre Conselheiro da organização.",
    videoUrl: "https://www.youtube.com/embed/A_xcpIr9vxs?start=4"
  },
  {
    id: 14,
    question: "Em que ano a Ordem DeMolay chegou ao Brasil?",
    options: [
      "1979",
      "1980",
      "1981",
      "1982"
    ],
    correctAnswer: 1,
    difficulty: 'hard',
    explanation: "A Ordem DeMolay chegou ao Brasil em 1980, com a fundação do primeiro Capítulo no Rio de Janeiro, iniciando a expansão da organização no país.",
    videoUrl: "https://www.youtube.com/embed/A_xcpIr9vxs?start=4"
  }
];