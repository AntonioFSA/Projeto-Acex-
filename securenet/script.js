/* =========================================================
   SecureNet — script.js
   JavaScript puro (Vanilla JS). Sem dependências externas.
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initScamFilters();
  initQuiz();
});

/* =========================================================
   MENU MOBILE
   ========================================================= */
function initMobileMenu() {
  const toggleBtn = document.getElementById('navToggle');
  const nav = document.getElementById('mainNav');

  if (!toggleBtn || !nav) return;

  toggleBtn.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    toggleBtn.setAttribute('aria-expanded', String(isOpen));
  });

  // Fecha o menu ao clicar em um link (útil em telas pequenas)
  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    });
  });
}

/* =========================================================
   PESQUISA E FILTROS DE GOLPES
   ========================================================= */
function initScamFilters() {
  const searchInput = document.getElementById('scamSearch');
  const categorySelect = document.getElementById('scamCategory');
  const clearBtn = document.getElementById('clearFilters');
  const grid = document.getElementById('scamsGrid');
  const emptyMessage = document.getElementById('scamsEmpty');

  if (!searchInput || !categorySelect || !grid) return;

  const cards = Array.from(grid.querySelectorAll('.scam-card'));

  function applyFilters() {
    const query = searchInput.value.trim().toLowerCase();
    const category = categorySelect.value;
    let visibleCount = 0;

    cards.forEach((card) => {
      const name = card.dataset.name.toLowerCase();
      const description = card.querySelector('.scam-description').textContent.toLowerCase();
      const cardCategory = card.dataset.category;

      const matchesQuery = query === '' || name.includes(query) || description.includes(query);
      const matchesCategory = category === 'todos' || category === cardCategory;
      const isVisible = matchesQuery && matchesCategory;

      card.hidden = !isVisible;
      if (isVisible) visibleCount += 1;
    });

    emptyMessage.hidden = visibleCount !== 0;
  }

  searchInput.addEventListener('input', applyFilters);
  categorySelect.addEventListener('change', applyFilters);

  clearBtn.addEventListener('click', () => {
    searchInput.value = '';
    categorySelect.value = 'todos';
    applyFilters();
    searchInput.focus();
  });
}

/* =========================================================
   QUIZ DE SEGURANÇA DIGITAL
   ========================================================= */

const quizQuestions = [
  {
    question: 'Você recebe um e-mail dizendo que sua conta será bloqueada em 24 horas, com um link para "regularizar" seus dados. O que isso caracteriza?',
    options: [
      'Uma comunicação oficial e segura do banco',
      'Uma tentativa de phishing',
      'Uma promoção legítima',
      'Um aviso de atualização de sistema'
    ],
    correctIndex: 1,
    feedback: 'Mensagens com urgência excessiva e links para "resolver" um problema são um sinal clássico de phishing.'
  },
  {
    question: 'Antes de confirmar uma transferência por PIX para uma pessoa desconhecida, o que é mais importante verificar?',
    options: [
      'A cor do aplicativo do banco',
      'O nome do destinatário exibido na confirmação',
      'A quantidade de emojis na mensagem recebida',
      'Nada, o PIX é sempre seguro'
    ],
    correctIndex: 1,
    feedback: 'Conferir o nome do destinatário exibido na tela de confirmação ajuda a identificar contas fraudulentas antes da transferência.'
  },
  {
    question: 'Um golpista se passa por um familiar em apuros para pedir dinheiro com urgência. Essa técnica é conhecida como:',
    options: [
      'Engenharia social',
      'Criptografia',
      'Firewall',
      'Backup'
    ],
    correctIndex: 0,
    feedback: 'A engenharia social usa manipulação psicológica, como urgência e emoção, para induzir a vítima a agir sem pensar.'
  },
  {
    question: 'Qual é uma boa prática na criação de senhas?',
    options: [
      'Usar a mesma senha em todos os serviços',
      'Usar datas de aniversário como senha',
      'Criar senhas longas e diferentes para cada serviço',
      'Compartilhar a senha com amigos próximos'
    ],
    correctIndex: 2,
    feedback: 'Senhas longas, únicas para cada serviço, dificultam o acesso indevido mesmo que uma delas seja vazada.'
  },
  {
    question: 'Qual é a principal vantagem da autenticação em dois fatores?',
    options: [
      'Deixa o login mais lento sem motivo',
      'Adiciona uma segunda verificação, dificultando o acesso mesmo com a senha exposta',
      'Substitui a necessidade de senha',
      'Serve apenas para redes sociais'
    ],
    correctIndex: 1,
    feedback: 'Mesmo que a senha seja descoberta, a segunda etapa de verificação impede o acesso não autorizado à conta.'
  },
  {
    question: 'Ao comprar em uma loja online desconhecida, qual é um sinal de alerta importante?',
    options: [
      'A loja possui CNPJ e avaliações verificáveis',
      'Preços muito abaixo do praticado no mercado, com urgência para pagar',
      'A loja oferece diversas formas de pagamento seguras',
      'O site possui certificado de segurança válido'
    ],
    correctIndex: 1,
    feedback: 'Preços muito abaixo do mercado, associados à pressão para pagamento rápido, são um forte indício de golpe.'
  },
  {
    question: 'Como identificar um link potencialmente perigoso recebido por mensagem?',
    options: [
      'Clicando para ver o que acontece',
      'Verificando se o endereço completo corresponde ao site oficial, sem clicar diretamente',
      'Confiando porque veio de um contato conhecido',
      'Links nunca representam risco'
    ],
    correctIndex: 1,
    feedback: 'É importante examinar o endereço completo do link e, em caso de dúvida, acessar o site oficial digitando o endereço diretamente.'
  },
  {
    question: 'Em redes sociais, qual atitude ajuda a reduzir os riscos de golpes?',
    options: [
      'Aceitar pedidos de amizade duplicados de contatos já existentes',
      'Publicar rotina e localização em tempo real',
      'Configurar o perfil como privado e revisar solicitações desconhecidas',
      'Compartilhar dados pessoais em qualquer publicação'
    ],
    correctIndex: 2,
    feedback: 'Perfis privados e revisão cuidadosa de solicitações reduzem a exposição a perfis falsos e golpes.'
  },
  {
    question: 'Uma pessoa liga se passando por atendente do banco e pede a senha completa do cartão. O que fazer?',
    options: [
      'Informar a senha, pois o atendente confirmou dados pessoais',
      'Desligar e ligar diretamente para o número oficial do banco',
      'Enviar a senha por mensagem de texto para confirmar',
      'Seguir as instruções para "proteger a conta"'
    ],
    correctIndex: 1,
    feedback: 'Bancos não solicitam senha completa por telefone. O caminho seguro é encerrar o contato e ligar diretamente para o número oficial.'
  },
  {
    question: 'Um perfil oferece lucro garantido de 50% ao mês em um investimento. Isso é:',
    options: [
      'Uma oportunidade rara, mas legítima',
      'Um forte indício de golpe de falso investimento',
      'Normal no mercado financeiro',
      'Seguro, desde que pague rápido'
    ],
    correctIndex: 1,
    feedback: 'Promessas de lucro garantido e muito acima da média do mercado são um dos principais sinais de golpes de investimento.'
  }
];

function initQuiz() {
  const startSection = document.getElementById('quizStart');
  const startBtn = document.getElementById('quizStartBtn');
  const form = document.getElementById('quizQuestion');
  const progressEl = document.getElementById('quizProgress');
  const questionTextEl = document.getElementById('quizQuestionText');
  const optionsEl = document.getElementById('quizOptions');
  const feedbackEl = document.getElementById('quizFeedback');
  const answerBtn = document.getElementById('quizAnswerBtn');
  const nextBtn = document.getElementById('quizNextBtn');
  const resultSection = document.getElementById('quizResult');
  const scoreEl = document.getElementById('quizScore');
  const messageEl = document.getElementById('quizMessage');
  const restartBtn = document.getElementById('quizRestartBtn');

  if (!startBtn || !form) return;

  let currentIndex = 0;
  let score = 0;
  let answered = false;

  startBtn.addEventListener('click', startQuiz);
  restartBtn.addEventListener('click', startQuiz);
  form.addEventListener('submit', handleAnswerSubmit);
  nextBtn.addEventListener('click', goToNextQuestion);

  function startQuiz() {
    currentIndex = 0;
    score = 0;
    startSection.hidden = true;
    resultSection.hidden = true;
    form.hidden = false;
    renderQuestion();
  }

  function renderQuestion() {
    answered = false;
    const total = quizQuestions.length;
    const q = quizQuestions[currentIndex];

    progressEl.textContent = `Pergunta ${currentIndex + 1} de ${total}`;
    questionTextEl.textContent = q.question;
    feedbackEl.textContent = '';
    feedbackEl.className = 'quiz-feedback';
    answerBtn.hidden = false;
    nextBtn.hidden = true;

    optionsEl.innerHTML = '';

    q.options.forEach((optionText, index) => {
      const optionId = `q${currentIndex}-opt${index}`;

      const label = document.createElement('label');
      label.className = 'quiz-option';
      label.setAttribute('for', optionId);

      const input = document.createElement('input');
      input.type = 'radio';
      input.name = 'quizOption';
      input.id = optionId;
      input.value = String(index);
      input.required = true;

      const span = document.createElement('span');
      span.textContent = optionText;

      label.appendChild(input);
      label.appendChild(span);
      optionsEl.appendChild(label);
    });
  }

  function handleAnswerSubmit(event) {
    event.preventDefault();

    if (answered) return;

    const selected = form.querySelector('input[name="quizOption"]:checked');

    if (!selected) {
      feedbackEl.textContent = 'Selecione uma alternativa antes de confirmar.';
      feedbackEl.className = 'quiz-feedback is-incorrect';
      return;
    }

    answered = true;
    const selectedIndex = Number(selected.value);
    const q = quizQuestions[currentIndex];
    const isCorrect = selectedIndex === q.correctIndex;

    const labels = optionsEl.querySelectorAll('.quiz-option');
    labels.forEach((label, index) => {
      const input = label.querySelector('input');
      input.disabled = true;

      if (index === q.correctIndex) {
        label.classList.add('is-correct');
      } else if (index === selectedIndex) {
        label.classList.add('is-incorrect');
      }
    });

    if (isCorrect) {
      score += 1;
      feedbackEl.textContent = `Resposta correta! ${q.feedback}`;
      feedbackEl.className = 'quiz-feedback is-correct';
    } else {
      feedbackEl.textContent = `Resposta incorreta. ${q.feedback}`;
      feedbackEl.className = 'quiz-feedback is-incorrect';
    }

    answerBtn.hidden = true;
    nextBtn.hidden = false;
    nextBtn.focus();
  }

  function goToNextQuestion() {
    currentIndex += 1;

    if (currentIndex < quizQuestions.length) {
      renderQuestion();
    } else {
      showResult();
    }
  }

  function showResult() {
    form.hidden = true;
    resultSection.hidden = false;

    const total = quizQuestions.length;
    scoreEl.textContent = `Você acertou ${score} de ${total} perguntas.`;
    messageEl.textContent = getResultMessage(score);
    restartBtn.focus();
  }

  function getResultMessage(finalScore) {
    if (finalScore <= 3) {
      return 'Você pode aprender mais sobre segurança digital. Explore o SecureNet!';
    }
    if (finalScore <= 7) {
      return 'Bom trabalho! Você já conhece vários sinais de alerta.';
    }
    return 'Excelente! Você está bem preparado para identificar golpes digitais.';
  }
}
