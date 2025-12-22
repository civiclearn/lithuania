// ----------------------------
// SETTINGS
// ----------------------------
const QUESTIONS_PER_ROW = 3;

const INLINE_TEST_QUESTIONS = [
  {
    q: "Kas pagal Lietuvos Respublikos Konstituciją yra valstybės vadovas?",
    a: ["Prezidentas", "Ministras Pirmininkas", "Seimo Pirmininkas"],
    correct: 0
  },
  {
    q: "Kuri institucija Lietuvoje vykdo įstatymų leidžiamąją valdžią?",
    a: ["Seimas", "Vyriausybė", "Konstitucinis Teismas"],
    correct: 0
  },
  {
    q: "Kiek metų renkamas Lietuvos Respublikos Prezidentas?",
    a: ["Penkeriems metams", "Ketveriems metams", "Septyneriems metams"],
    correct: 0
  },
  {
    q: "Kuri institucija aiškina Lietuvos Respublikos Konstituciją?",
    a: ["Konstitucinis Teismas", "Aukščiausiasis Teismas", "Seimas"],
    correct: 0
  },
  {
    q: "Kiek Seimo narių sudaro Lietuvos Respublikos Seimą?",
    a: ["141", "120", "101"],
    correct: 0
  },
  {
    q: "Koks principas įtvirtintas Lietuvos Respublikos Konstitucijos 1 straipsnyje?",
    a: ["Lietuva yra nepriklausoma demokratinė respublika", "Lietuva yra federacinė valstybė", "Lietuva yra konstitucinė monarchija"],
    correct: 0
  },
  {
    q: "Kas skiria Ministrą Pirmininką Lietuvoje?",
    a: ["Prezidentas, pritarus Seimui", "Seimas", "Konstitucinis Teismas"],
    correct: 0
  },
  {
    q: "Kokia kalba pagal Konstituciją yra valstybinė Lietuvoje?",
    a: ["Lietuvių kalba", "Lietuvių ir anglų kalbos", "Seimo nustatyta kalba"],
    correct: 0
  },
  {
    q: "Kam pagal Konstituciją priklauso valstybės valdžia Lietuvoje?",
    a: ["Tautai", "Seimui", "Vyriausybei"],
    correct: 0
  },
  {
    q: "Kuri laisvė yra aiškiai garantuojama Lietuvos Respublikos Konstitucijoje?",
    a: ["Sąžinės ir religijos laisvė", "Privaloma religinė praktika", "Valstybinė religija"],
    correct: 0
  },
  {
    q: "Kaip gali būti keičiama Lietuvos Respublikos Konstitucija?",
    a: ["Pagal specialią Konstitucijoje nustatytą tvarką", "Prezidento dekretu", "Ji negali būti keičiama"],
    correct: 0
  },
  {
    q: "Kuris teismas užtikrina, kad įstatymai neprieštarautų Konstitucijai?",
    a: ["Konstitucinis Teismas", "Apeliacinis Teismas", "Vyriausiasis administracinis teismas"],
    correct: 0
  },
  {
    q: "Kas turi teisę balsuoti pagal Lietuvos Respublikos Konstituciją?",
    a: ["Lietuvos Respublikos piliečiai, sulaukę nustatyto amžiaus", "Visi nuolatiniai gyventojai", "Tik Seimo nariai"],
    correct: 0
  },
  {
    q: "Kokia valstybės valdymo forma nustatyta Lietuvos Respublikos Konstitucijoje?",
    a: ["Demokratinė respublika", "Konstitucinė monarchija", "Federacinė sąjunga"],
    correct: 0
  },
  {
    q: "Kuri institucija tvirtina valstybės biudžetą Lietuvoje?",
    a: ["Seimas", "Prezidentas", "Vyriausybė"],
    correct: 0
  },
  {
    q: "Koks principas apibūdina valdžių padalijimą Lietuvoje?",
    a: ["Įstatymų leidžiamoji, vykdomoji ir teisminė valdžios yra atskirtos", "Visa valdžia priklauso Prezidentui", "Visa valdžia priklauso Seimui"],
    correct: 0
  },
  {
    q: "Kuris dokumentas turi aukščiausią teisinę galią Lietuvoje?",
    a: ["Lietuvos Respublikos Konstitucija", "Seimo priimti įstatymai", "Vyriausybės nutarimai"],
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
 el.textContent = `Pažanga: ${answeredCount} / ${totalQuestions} klausimų`;
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
  pct >= 80 ? "Puikus rezultatas!" :
  pct >= 50 ? "Gera pažanga!" :
  pct >= 25 ? "Tvirtas pradinis žingsnis" :
    "Tęskite praktiką";

  card.innerHTML = `
    <h3>${title}</h3>
    ${createDonutChart()}
<p>
Baigėte nemokamus praktikos klausimus.<br>
Gaukite pilną prieigą prie <strong>šimtų Lietuvos pilietybės egzamino tipo klausimų</strong>,
realistiškų praktikos sesijų ir išsamios pažangos stebėsenos.

</p>
<a href="https://civiclearn.com/lt/checkout.html" class="hero-primary-btn">
  Gauti pilną prieigą
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
        feedback.textContent = "Teisingai!";
        feedback.classList.add("inline-correct");
      } else {
        wrongCount++;
        feedback.textContent = "Teisingas atsakymas: " + questionObj.a[questionObj.correct];
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
