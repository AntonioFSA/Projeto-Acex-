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

const difficultyLabels = {
  facil: 'Fácil',
  medio: 'Médio',
  dificil: 'Difícil'
};

const topicInfo = {
  phishing: { label: 'Phishing', anchor: '#golpes' },
  pix: { label: 'Golpe do PIX', anchor: '#golpes' },
  whatsapp: { label: 'Golpe do WhatsApp', anchor: '#golpes' },
  'compras-online': { label: 'Compras online', anchor: '#golpes' },
  investimentos: { label: 'Falsos investimentos', anchor: '#golpes' },
  bancos: { label: 'Golpes bancários', anchor: '#golpes' },
  'redes-sociais': { label: 'Redes sociais', anchor: '#golpes' },
  senhas: { label: 'Senhas seguras', anchor: '#protecao' },
  autenticacao: { label: 'Autenticação em dois fatores', anchor: '#protecao' },
  links: { label: 'Links suspeitos', anchor: '#protecao' },
  'engenharia-social': { label: 'Engenharia social', anchor: '#protecao' },
  atualizacoes: { label: 'Atualizações', anchor: '#protecao' }
};

const quizBank = {
  facil: [
    {
      topic: 'phishing',
      question: 'Você recebe uma mensagem informando que ganhou um prêmio em um sorteio do qual nunca participou, com um link para resgatar. O que fazer?',
      options: [
        'Clicar no link rapidamente antes que o prêmio expire',
        'Ignorar ou apagar a mensagem, pois é provavelmente um golpe',
        'Responder pedindo mais detalhes sobre o prêmio',
        'Encaminhar a mensagem para amigos resgatarem também'
      ],
      correctIndex: 1,
      feedback: 'Prêmios de sorteios dos quais você nunca participou são uma isca comum de phishing. O mais seguro é não clicar e apagar a mensagem.'
    },
    {
      topic: 'senhas',
      question: 'Qual das opções abaixo é um exemplo de senha fraca e fácil de ser descoberta?',
      options: [
        'K9#mZ2!vLp',
        '123456',
        'Tr@v3ss1a_2024!',
        'Uma frase longa conhecida só por você, com números e símbolos'
      ],
      correctIndex: 1,
      feedback: "Sequências simples como '123456' estão entre as senhas mais usadas e são as primeiras tentadas por criminosos."
    },
    {
      topic: 'pix',
      question: 'Antes de confirmar um PIX para uma pessoa que você não conhece bem, o que é essencial verificar?',
      options: [
        'O nome do destinatário exibido na tela de confirmação',
        'O horário em que a mensagem foi enviada',
        'Se o valor pedido é redondo',
        'Nada, o PIX já é seguro por padrão'
      ],
      correctIndex: 0,
      feedback: 'Conferir o nome exibido na confirmação ajuda a identificar se a chave PIX realmente pertence a quem diz ser o destinatário.'
    },
    {
      topic: 'whatsapp',
      question: 'Um contato pede que você compartilhe o código de verificação que acabou de receber por SMS do WhatsApp. Isso é seguro?',
      options: [
        'Sim, se a pessoa disser que precisa urgentemente',
        'Sim, códigos de SMS não têm nenhuma função importante',
        'Não, esse código nunca deve ser compartilhado com ninguém',
        'Só é seguro se for um familiar próximo'
      ],
      correctIndex: 2,
      feedback: 'O código de verificação dá acesso à sua conta do WhatsApp. Compartilhá-lo permite que golpistas sequestrem seu número.'
    },
    {
      topic: 'links',
      question: 'Você recebe um link curto e estranho enviado por um número desconhecido, sem nenhuma explicação. Qual a atitude mais segura?',
      options: [
        'Clicar para ver do que se trata',
        'Não clicar e, se possível, bloquear ou denunciar o contato',
        'Encaminhar o link para verificar com outras pessoas',
        'Responder perguntando o que é'
      ],
      correctIndex: 1,
      feedback: 'Links inesperados de remetentes desconhecidos podem levar a páginas falsas ou instalar programas maliciosos. O mais seguro é não clicar.'
    },
    {
      topic: 'redes-sociais',
      question: 'É uma boa prática publicar sua localização em tempo real e sua rotina diária em redes sociais abertas ao público?',
      options: [
        'Sim, isso ajuda os amigos a saberem onde você está',
        'Não, essas informações podem ser usadas por golpistas ou criminosos',
        'Sim, desde que sejam fotos bonitas',
        'Não importa, pois redes sociais são sempre privadas'
      ],
      correctIndex: 1,
      feedback: 'Compartilhar rotina e localização publicamente pode expor você a riscos, incluindo golpes e crimes físicos.'
    },
    {
      topic: 'bancos',
      question: "Uma pessoa liga se identificando como funcionário do banco e pede a senha completa do seu cartão para 'resolver um problema'. O que fazer?",
      options: [
        'Informar a senha, já que é o banco ligando',
        'Nunca informar a senha; bancos não pedem isso por telefone',
        'Informar apenas parte da senha',
        'Pedir para ligarem novamente mais tarde'
      ],
      correctIndex: 1,
      feedback: 'Bancos legítimos nunca solicitam a senha completa do cartão por telefone. Esse pedido é sempre um sinal de golpe.'
    },
    {
      topic: 'atualizacoes',
      question: 'Manter o sistema operacional e os aplicativos do celular sempre atualizados ajuda a proteger seus dados?',
      options: [
        'Não, atualizações são apenas estéticas',
        'Sim, atualizações corrigem falhas de segurança conhecidas',
        'Não, atualizar deixa o aparelho mais vulnerável',
        'Isso só importa em computadores, não em celulares'
      ],
      correctIndex: 1,
      feedback: 'Atualizações frequentemente corrigem vulnerabilidades que poderiam ser exploradas por criminosos.'
    }
  ],
  medio: [
    {
      topic: 'phishing',
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
      topic: 'pix',
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
      topic: 'engenharia-social',
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
      topic: 'senhas',
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
      topic: 'autenticacao',
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
      topic: 'compras-online',
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
      topic: 'links',
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
      topic: 'redes-sociais',
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
      topic: 'bancos',
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
      topic: 'investimentos',
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
  ],
  dificil: [
    {
      topic: 'phishing',
      question: "Você recebe um e-mail de 'atendimento@banco-seguro24h.com.br', muito parecido com o do seu banco, pedindo para confirmar dados por um link. O domínio é ligeiramente diferente do oficial. Isso indica:",
      options: [
        'Um novo canal oficial do banco para mais segurança',
        'Provável typosquatting/phishing, com domínio criado para enganar',
        'Erro de digitação do próprio banco, sem risco',
        "É seguro, pois contém a palavra 'seguro' no domínio"
      ],
      correctIndex: 1,
      feedback: 'Domínios parecidos com o oficial, mas com pequenas variações, são uma técnica chamada typosquatting, usada para enganar visualmente a vítima.'
    },
    {
      topic: 'engenharia-social',
      question: "Você recebe uma ligação e o identificador de chamadas mostra o número oficial do seu banco. A pessoa pede para instalar um aplicativo de acesso remoto para 'resolver uma fraude'. O que isso indica?",
      options: [
        'Como o número é do banco, a solicitação é confiável',
        'Pode ser uma técnica de spoofing de número, combinada a engenharia social',
        'Aplicativos de acesso remoto são sempre seguros quando pedidos por telefone',
        'Não há risco, pois o app pode ser desinstalado depois'
      ],
      correctIndex: 1,
      feedback: 'Criminosos podem falsificar (spoofing) o número exibido na chamada. Nenhuma instituição pede a instalação de apps de acesso remoto por telefone.'
    },
    {
      topic: 'pix',
      question: 'Em uma loja física, o QR Code de pagamento PIX no balcão parece ter um adesivo colado por cima do original. Isso pode indicar:',
      options: [
        'Apenas uma atualização visual feita pela loja',
        'Um possível golpe em que o QR Code foi substituído para redirecionar o pagamento a outra conta',
        'Um erro de impressão sem importância',
        'Nada, QR Codes não podem ser adulterados'
      ],
      correctIndex: 1,
      feedback: 'A sobreposição de QR Codes é uma fraude conhecida: o pagamento é redirecionado para a conta do golpista em vez da loja.'
    },
    {
      topic: 'investimentos',
      question: "Um grupo de mensagens promete retorno de 30% ao mês em criptomoedas, pede que você convide outras pessoas para 'aumentar seus ganhos' e mostra prints de lucros de outros participantes. Esse modelo é característico de:",
      options: [
        'Um fundo de investimento tradicional e regulado',
        'Um esquema de pirâmide financeira disfarçado de investimento',
        'Uma prática comum e seguindo regras da CVM',
        'Um clube de investimento sem riscos'
      ],
      correctIndex: 1,
      feedback: 'Retornos irreais associados à necessidade de recrutar novos participantes são características clássicas de esquemas de pirâmide.'
    },
    {
      topic: 'autenticacao',
      question: 'Seu celular perde sinal repentinamente e, pouco depois, você recebe um e-mail informando que sua senha foi alterada em vários serviços. Isso pode indicar:',
      options: [
        'Uma simples falha temporária da operadora, sem relação com segurança',
        'Um possível ataque de SIM swap, em que o golpista assume o controle do seu número',
        'Um problema exclusivo do aparelho, sem risco às contas',
        'Atualização automática de segurança feita pelas próprias plataformas'
      ],
      correctIndex: 1,
      feedback: 'No SIM swap, o golpista transfere seu número para um chip próprio, recebendo códigos de verificação e assumindo suas contas.'
    },
    {
      topic: 'compras-online',
      question: "Durante uma negociação em um marketplace, o vendedor pede para 'finalizar a compra fora da plataforma' via PIX direto, oferecendo desconto. Isso é recomendável?",
      options: [
        'Sim, pois evita taxas da plataforma',
        'Não, pois retira a proteção ao comprador oferecida pelo sistema de pagamento da plataforma',
        'Sim, desde que o vendedor tenha muitas vendas',
        'Não faz diferença para a segurança da compra'
      ],
      correctIndex: 1,
      feedback: 'Pagamentos fora da plataforma eliminam a proteção contra fraude e a possibilidade de reembolso em caso de golpe.'
    },
    {
      topic: 'redes-sociais',
      question: "Você reclama publicamente de um produto e, logo depois, um perfil quase idêntico ao da marca oficial (com pequenas diferenças no nome de usuário) responde pedindo seus dados bancários para 'reembolso'. Isso indica:",
      options: [
        'Atendimento oficial e ágil da marca',
        'Provável perfil falso criado para aplicar golpes a partir de reclamações públicas',
        'Prática recomendada de suporte ao cliente',
        'Não há risco, pois o perfil tem a logo da marca'
      ],
      correctIndex: 1,
      feedback: 'Golpistas monitoram reclamações públicas e criam perfis falsos parecidos com o oficial para abordar vítimas e pedir dados bancários.'
    },
    {
      topic: 'bancos',
      question: 'Após instalar um aplicativo recomendado por um link recebido por mensagem, uma tela idêntica à do seu banco aparece pedindo login e senha. O aplicativo não foi baixado da loja oficial. Isso caracteriza:',
      options: [
        'Uma versão alternativa e igualmente segura do aplicativo',
        'Um possível aplicativo malicioso com tela falsa (overlay) para roubo de credenciais',
        'Um recurso normal de atualização do banco',
        'Uma medida extra de segurança implementada pelo banco'
      ],
      correctIndex: 1,
      feedback: 'Aplicativos fora das lojas oficiais podem exibir telas falsas sobre o app real (overlay) para capturar login e senha.'
    }
  ]
};

function initQuiz() {
  const startSection = document.getElementById('quizStart');
  const difficultyBtns = document.querySelectorAll('.quiz-difficulty-btn');
  const form = document.getElementById('quizQuestion');
  const progressEl = document.getElementById('quizProgress');
  const questionTextEl = document.getElementById('quizQuestionText');
  const optionsEl = document.getElementById('quizOptions');
  const feedbackEl = document.getElementById('quizFeedback');
  const answerBtn = document.getElementById('quizAnswerBtn');
  const nextBtn = document.getElementById('quizNextBtn');
  const resultSection = document.getElementById('quizResult');
  const levelLabelEl = document.getElementById('quizLevelLabel');
  const scoreBarFillEl = document.getElementById('quizScoreBarFill');
  const scoreEl = document.getElementById('quizScore');
  const messageEl = document.getElementById('quizMessage');
  const topicFeedbackEl = document.getElementById('quizTopicFeedback');
  const reviewListEl = document.getElementById('quizReviewList');
  const restartBtn = document.getElementById('quizRestartBtn');
  const changeLevelBtn = document.getElementById('quizChangeLevelBtn');

  if (!form || !difficultyBtns.length) return;

  let selectedLevel = null;
  let quizQuestions = [];
  let currentIndex = 0;
  let score = 0;
  let answered = false;
  let answers = [];

  difficultyBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      selectedLevel = btn.dataset.level;
      quizQuestions = quizBank[selectedLevel] || [];
      startQuiz();
    });
  });

  restartBtn.addEventListener('click', startQuiz);
  changeLevelBtn.addEventListener('click', backToLevelSelection);
  form.addEventListener('submit', handleAnswerSubmit);
  nextBtn.addEventListener('click', goToNextQuestion);

  function startQuiz() {
    currentIndex = 0;
    score = 0;
    answers = [];
    startSection.hidden = true;
    resultSection.hidden = true;
    form.hidden = false;
    renderQuestion();
  }

  function backToLevelSelection() {
    resultSection.hidden = true;
    form.hidden = true;
    startSection.hidden = false;
  }

  function renderQuestion() {
    answered = false;
    const total = quizQuestions.length;
    const q = quizQuestions[currentIndex];

    progressEl.textContent = `Pergunta ${currentIndex + 1} de ${total} · Nível ${difficultyLabels[selectedLevel]}`;
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

    answers.push({
      topic: q.topic,
      question: q.question,
      options: q.options,
      selectedIndex,
      correctIndex: q.correctIndex,
      feedback: q.feedback,
      isCorrect
    });

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
    const percentage = Math.round((score / total) * 100);
    const level = getPerformanceLevel(percentage);

    levelLabelEl.textContent = `Nível: ${difficultyLabels[selectedLevel]}`;
    scoreBarFillEl.style.width = `${percentage}%`;
    scoreEl.textContent = `Você acertou ${score} de ${total} perguntas (${percentage}%).`;
    messageEl.textContent = getResultMessage(level, percentage);
    topicFeedbackEl.innerHTML = buildTopicFeedback(answers);
    reviewListEl.innerHTML = buildReviewList(answers);
    restartBtn.focus();
  }

  function getPerformanceLevel(percentage) {
    if (percentage < 50) return { key: 'iniciante', label: 'Iniciante' };
    if (percentage < 80) return { key: 'intermediario', label: 'Intermediário' };
    return { key: 'avancado', label: 'Avançado' };
  }

  function getResultMessage(level, percentage) {
    const levelLabel = difficultyLabels[selectedLevel];

    if (level.key === 'iniciante') {
      return `Você acertou ${percentage}% das perguntas do nível ${levelLabel}. Ainda há pontos importantes de segurança digital para reforçar — confira a revisão abaixo, explore as seções "Golpes" e "Como se proteger" e tente novamente.`;
    }
    if (level.key === 'intermediario') {
      return `Bom resultado! Você acertou ${percentage}% das perguntas do nível ${levelLabel} e já reconhece boa parte dos sinais de golpe. Revise os pontos de atenção indicados abaixo para ficar ainda mais preparado.`;
    }
    return `Excelente! Você acertou ${percentage}% das perguntas do nível ${levelLabel}, demonstrando ótimo conhecimento sobre golpes digitais e boas práticas de segurança.`;
  }

  function buildTopicFeedback(quizAnswers) {
    const topicsMap = {};

    quizAnswers.forEach((a) => {
      if (!topicsMap[a.topic]) {
        topicsMap[a.topic] = { correct: 0, total: 0 };
      }
      topicsMap[a.topic].total += 1;
      if (a.isCorrect) topicsMap[a.topic].correct += 1;
    });

    const strengths = [];
    const weaknesses = [];

    Object.keys(topicsMap).forEach((topicKey) => {
      const { correct, total } = topicsMap[topicKey];
      const info = topicInfo[topicKey] || { label: topicKey, anchor: '#golpes' };

      if (correct === total) {
        strengths.push(info.label);
      } else {
        weaknesses.push(info);
      }
    });

    let html = '';

    if (strengths.length) {
      html += `<div class="quiz-feedback-group quiz-feedback-strengths">
        <h4>Pontos fortes</h4>
        <p>Você demonstrou bom domínio sobre: ${escapeHtml(strengths.join(', '))}.</p>
      </div>`;
    }

    if (weaknesses.length) {
      const links = weaknesses
        .map((w) => `<a href="${w.anchor}">${escapeHtml(w.label)}</a>`)
        .join(', ');
      html += `<div class="quiz-feedback-group quiz-feedback-weaknesses">
        <h4>Pontos de atenção</h4>
        <p>Vale a pena revisar: ${links}.</p>
      </div>`;
    }

    return html;
  }

  function buildReviewList(quizAnswers) {
    return quizAnswers
      .map((a, index) => {
        const statusClass = a.isCorrect ? 'is-correct' : 'is-incorrect';
        const statusLabel = a.isCorrect ? 'Correta' : 'Incorreta';
        const wrongAnswerHtml = a.isCorrect
          ? ''
          : `<p><strong>Resposta correta:</strong> ${escapeHtml(a.options[a.correctIndex])}</p>`;

        return `
          <details class="quiz-review-item ${statusClass}">
            <summary>
              <span class="quiz-review-status">${statusLabel}</span>
              <span class="quiz-review-question">${index + 1}. ${escapeHtml(a.question)}</span>
            </summary>
            <div class="quiz-review-content">
              <p><strong>Sua resposta:</strong> ${escapeHtml(a.options[a.selectedIndex])}</p>
              ${wrongAnswerHtml}
              <p>${escapeHtml(a.feedback)}</p>
            </div>
          </details>
        `;
      })
      .join('');
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
}
