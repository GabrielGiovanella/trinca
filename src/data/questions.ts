import { Question } from '../types/Quiz';

export const questions: Question[] = [
  // Perguntas Fáceis (4) - 5ª pergunta substituída por jogo da memória
  {
    id: 1,
    question: "O Oeste representa, na simbologia do Segundo Conselheiro:",
    options: [
      "O início da vida.",
      "O ápice da juventude.",
      "O pôr do sol e o fim da vida.",
      "O nascimento e a infância."
    ],
    correctAnswer: 2,
    difficulty: 'easy',
    explanation: "Na simbologia da Ordem DeMolay, o Oeste representa o pôr do sol e o fim da vida, simbolizando a conclusão do ciclo vital e a reflexão sobre os ensinamentos recebidos ao longo da jornada.",
    videoUrl: "https://www.youtube.com/embed/YfOuvJOKeXU"
  },
  {
    id: 2,
    question: "O Sul representa, na simbologia do Primeiro Conselheiro:",
    options: [
      "A infância despreocupada.",
      "O repouso eterno.",
      "O meio-dia da vida e o tempo de reflexão.",
      "A velhice e a decadência."
    ],
    correctAnswer: 2,
    difficulty: 'easy',
    explanation: "O Sul simboliza o meio-dia da vida e o tempo de reflexão, representando o momento de maior maturidade e sabedoria, quando o indivíduo pode refletir sobre suas experiências e compartilhar seus conhecimentos.",
    videoUrl: "https://www.youtube.com/embed/YfOuvJOKeXU"
  },
  {
    id: 3,
    question: "Segundo a explicação sobre a joia do Patriotismo, qual é a forma de demonstrá-lo em tempos de paz?",
    options: [
      "Estudar as guerras do passado.",
      "Viver como um cidadão honrado.",
      "Evitar qualquer atividade política.",
      "Ingressar nas Forças Armadas."
    ],
    correctAnswer: 1,
    difficulty: 'easy',
    explanation: "O Patriotismo em tempos de paz é demonstrado vivendo como um cidadão honrado, cumprindo seus deveres cívicos, respeitando as leis e contribuindo positivamente para o desenvolvimento da sociedade e do país.",
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
    question: "Qual é o lema da Ordem DeMolay?",
    options: [
      "Fidelitas et Veritas",
      "Semper Fidelis",
      "Per Aspera Ad Astra",
      "Virtus et Honor"
    ],
    correctAnswer: 0,
    difficulty: 'medium',
    explanation: "O lema da Ordem DeMolay é 'Fidelitas et Veritas', que significa 'Fidelidade e Verdade' em latim, representando os valores fundamentais da organização.",
    videoUrl: "https://www.youtube.com/embed/A_xcpIr9vxs?start=4"
  },
  {
    id: 7,
    question: "Quantos jovens formaram o primeiro Capítulo DeMolay?",
    options: [
      "7 jovens",
      "9 jovens",
      "11 jovens",
      "13 jovens"
    ],
    correctAnswer: 1,
    difficulty: 'medium',
    explanation: "O primeiro Capítulo DeMolay foi formado por 9 jovens, conhecidos como os 'Nove Fundadores Originais', que se reuniram com Frank S. Land em 1919.",
    videoUrl: "https://www.youtube.com/embed/A_xcpIr9vxs?start=4"
  },
  {
    id: 8,
    question: "Qual virtude cardeal representa o amor e respeito pelos pais?",
    options: [
      "Reverência",
      "Amor Filial",
      "Cortesia",
      "Fidelidade"
    ],
    correctAnswer: 1,
    difficulty: 'medium',
    explanation: "Amor Filial é a virtude cardeal que representa o amor, respeito e obediência aos pais, sendo considerada uma das mais importantes na formação do jovem DeMolay.",
    videoUrl: "https://www.youtube.com/embed/A_xcpIr9vxs?start=4"
  },
  {
    id: 9,
    question: "Como são chamados os maçons que supervisionam um Capítulo DeMolay?",
    options: [
      "Padrinhos",
      "Conselheiros",
      "Mentores",
      "Orientadores"
    ],
    correctAnswer: 1,
    difficulty: 'medium',
    explanation: "Os maçons que supervisionam um Capítulo DeMolay são chamados de Conselheiros, sendo responsáveis pela orientação e supervisão das atividades dos jovens.",
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
      "1962",
      "1963",
      "1964",
      "1965"
    ],
    correctAnswer: 1,
    difficulty: 'hard',
    explanation: "A Ordem DeMolay chegou ao Brasil em 1963, com a fundação do primeiro Capítulo no Rio de Janeiro, iniciando a expansão da organização no país.",
    videoUrl: "https://www.youtube.com/embed/A_xcpIr9vxs?start=4"
  }
];