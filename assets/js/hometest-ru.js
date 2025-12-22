// ----------------------------
// SETTINGS
// ----------------------------
const QUESTIONS_PER_ROW = 3;

const INLINE_TEST_QUESTIONS = [
  {
    q: "Кто согласно Конституции Литвы является главой государства?",
    a: ["Президент", "Премьер-министр", "Председатель Сейма"],
    correct: 0
  },
  {
    q: "Какая институция осуществляет законодательную власть в Литве?",
    a: ["Сейм", "Правительство", "Конституционный суд"],
    correct: 0
  },
  {
    q: "На какой срок избирается Президент Литвы?",
    a: ["На пять лет", "На четыре года", "На семь лет"],
    correct: 0
  },
  {
    q: "Какой орган толкует Конституцию Литовской Республики?",
    a: ["Конституционный суд", "Верховный суд", "Сейм"],
    correct: 0
  },
  {
    q: "Сколько членов насчитывает Сейм Литовской Республики?",
    a: ["141", "120", "101"],
    correct: 0
  },
  {
    q: "Какой принцип закреплён в статье 1 Конституции Литвы?",
    a: ["Литва является независимой демократической республикой", "Литва является федеративным государством", "Литва является конституционной монархией"],
    correct: 0
  },
  {
    q: "Кто назначает Премьер-министра в Литве?",
    a: ["Президент с одобрения Сейма", "Сейм", "Конституционный суд"],
    correct: 0
  },
  {
    q: "Какой язык установлен государственным согласно Конституции Литвы?",
    a: ["Литовский язык", "Литовский и английский языки", "Язык, определённый Сеймом"],
    correct: 0
  },
  {
    q: "Кому согласно Конституции принадлежит государственная власть в Литве?",
    a: ["Народу", "Сейму", "Правительству"],
    correct: 0
  },
  {
    q: "Какая свобода прямо гарантируется Конституцией Литвы?",
    a: ["Свобода совести и вероисповедания", "Обязательная религиозная практика", "Государственная религия"],
    correct: 0
  },
  {
    q: "Каким образом может быть изменена Конституция Литовской Республики?",
    a: ["В порядке, установленном Конституцией", "Указом Президента", "Она не может быть изменена"],
    correct: 0
  },
  {
    q: "Какой суд обеспечивает соответствие законов Конституции?",
    a: ["Конституционный суд", "Апелляционный суд", "Высший административный суд"],
    correct: 0
  },
  {
    q: "Кто имеет право голоса согласно Конституции Литвы?",
    a: ["Граждане Литвы, достигшие установленного возраста", "Все постоянные жители", "Только члены Сейма"],
    correct: 0
  },
  {
    q: "Какая форма государственного правления установлена Конституцией Литвы?",
    a: ["Демократическая республика", "Конституционная монархия", "Федеративный союз"],
    correct: 0
  },
  {
    q: "Какая институция утверждает государственный бюджет в Литве?",
    a: ["Сейм", "Президент", "Правительство"],
    correct: 0
  },
  {
    q: "Какой принцип характеризует разделение властей в Литве?",
    a: ["Законодательная, исполнительная и судебная власти разделены", "Вся власть принадлежит Президенту", "Вся власть принадлежит Сейму"],
    correct: 0
  },
  {
    q: "Какой документ имеет наивысшую юридическую силу в Литве?",
    a: ["Конституция Литовской Республики", "Законы, принятые Сеймом", "Постановления Правительства"],
    correct: 0
  }
];




// ----------------------------
// STATE
// ----------------------------
let correctCount = 0;
let wrongCount = 0;
let answeredCount = 0;
let totalQuestions = INLINE_TEST_QUESTIONS.length;
let currentRow = 0;

// ----------------------------
// UI TARGETS
// ----------------------------
const container = document.getElementById("inline-test-questions");

// ----------------------------
// PROGRESS DISPLAY
// ----------------------------
function updateProgressDisplay() {
  const el = document.getElementById("inline-progress-text");
  if (!el) return;
  el.textContent = `Прогресс: ${answeredCount} / ${totalQuestions} вопросов`;

}

function updateProgressBar() {
  const bar = document.getElementById("inline-progressbar");
  if (!bar) return;
  const pct = (answeredCount / totalQuestions) * 100;
  bar.style.width = pct + "%";
}

// ----------------------------
// UTILITIES
// ----------------------------
function shuffleAnswers(question) {
  const combined = question.a.map((opt, index) => ({
    text: opt,
    isCorrect: index === question.correct
  }));

  for (let i = combined.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [combined[i], combined[j]] = [combined[j], combined[i]];
  }

  question.a = combined.map(i => i.text);
  question.correct = combined.findIndex(i => i.isCorrect);
}

function createDonutChart() {
  const pct = Math.round((correctCount / totalQuestions) * 100);
  const C = 2 * Math.PI * 40;

  return `
    <div class="donut-wrapper">
      <svg width="120" height="120" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="40" stroke="#ebe6ff" stroke-width="12" fill="none"></circle>
        <circle cx="50" cy="50" r="40" stroke="#6d4aff" stroke-width="12" fill="none"
          stroke-dasharray="${(pct / 100) * C} ${(1 - pct / 100) * C}"
          transform="rotate(-90 50 50)" stroke-linecap="round"></circle>
      </svg>
      <div class="donut-center">${pct}%</div>
    </div>
  `;
}

function createEndCard() {
  const pct = Math.round((correctCount / totalQuestions) * 100);
  const card = document.createElement("div");
  card.className = "inline-question-card end-card";

const title =
  pct >= 80 ? "Отличный результат!" :
  pct >= 50 ? "Хороший прогресс!" :
  pct >= 25 ? "Уверенное начало" :
  "Продолжайте практику";

card.innerHTML = `
  <h3>${title}</h3>
  ${createDonutChart()}
  <p>
    Вы завершили бесплатные практические вопросы.<br>
    Получите полный доступ к <strong>сотням вопросов в формате экзамена на гражданство Литвы</strong>,
    реалистичным тренировочным сессиям и подробному отслеживанию прогресса.
  </p>
  <a href="https://civiclearn.com/lt/checkout.html" class="hero-primary-btn">
    Получить полный доступ
  </a>
`;

return card;

}

// ----------------------------
// BUILD ROWS
// ----------------------------
const rows = [];
for (let i = 0; i < totalQuestions; i += QUESTIONS_PER_ROW) {
  rows.push(INLINE_TEST_QUESTIONS.slice(i, i + QUESTIONS_PER_ROW));
}

INLINE_TEST_QUESTIONS.forEach(q => shuffleAnswers(q));

// ----------------------------
// RENDERING
// ----------------------------
function renderRow(rowIndex) {
  if (!rows[rowIndex]) return;

  rows[rowIndex].forEach((q, offset) => {
    const absoluteIndex = rowIndex * QUESTIONS_PER_ROW + offset;
    container.appendChild(createQuestionCard(q, absoluteIndex));
  });
}

function createQuestionCard(questionObj, absoluteIndex) {
  const card = document.createElement("div");
  card.className = "inline-question-card";

  const title = document.createElement("h3");
  title.textContent = questionObj.q;

  const feedback = document.createElement("div");
  feedback.className = "inline-feedback";

  card.append(title);

  questionObj.a.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.className = "inline-option-btn";
    btn.textContent = opt;

    btn.onclick = () => {
      answeredCount++;
      updateProgressDisplay();
      updateProgressBar();

      if (i === questionObj.correct) {
        correctCount++;
        feedback.textContent = "Верно!";
        feedback.classList.add("inline-correct");
      } else {
        wrongCount++;
        feedback.textContent = "Правильный ответ:  " + questionObj.a[questionObj.correct];
        feedback.classList.add("inline-wrong");
      }

      card.querySelectorAll("button").forEach(b => (b.disabled = true));
      card.appendChild(feedback);

      const isLastQuestion = absoluteIndex === totalQuestions - 1;
      if (isLastQuestion) {
        setTimeout(() => container.appendChild(createEndCard()), 300);
      }

      const isLastInRow =
        (absoluteIndex + 1) % QUESTIONS_PER_ROW === 0 &&
        absoluteIndex !== totalQuestions - 1;

      if (isLastInRow) {
        currentRow++;
        renderRow(currentRow);
      }
    };

    card.appendChild(btn);
  });

  return card;
}

// ----------------------------
// INITIAL RENDER
// ----------------------------
renderRow(0);
updateProgressDisplay();
updateProgressBar();
