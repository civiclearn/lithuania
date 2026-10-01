// ----------------------------
// SETTINGS
// ----------------------------
const QUESTIONS_PER_ROW = 3;

const INLINE_TEST_QUESTIONS = [
  {
    q: "According to the Constitution of Lithuania, who is the head of state?",
    a: ["The President", "The Prime Minister", "The Speaker of the Seimas"],
    correct: 0
  },
  {
    q: "Which institution exercises legislative power in Lithuania?",
    a: ["The Seimas", "The Government", "The Constitutional Court"],
    correct: 0
  },
  {
    q: "For how long is the President of Lithuania elected?",
    a: ["Five years", "Four years", "Seven years"],
    correct: 0
  },
  {
    q: "Which body interprets the Constitution of Lithuania?",
    a: ["The Constitutional Court", "The Supreme Court", "The Seimas"],
    correct: 0
  },
  {
    q: "How many members does the Seimas of Lithuania have?",
    a: ["141", "120", "101"],
    correct: 0
  },
  {
    q: "Which principle is stated in Article 1 of the Constitution of Lithuania?",
    a: ["Lithuania is an independent democratic republic", "Lithuania is a federal state", "Lithuania is a constitutional monarchy"],
    correct: 0
  },
  {
    q: "Who appoints the Prime Minister of Lithuania?",
    a: ["The President with the approval of the Seimas", "The Seimas alone", "The Constitutional Court"],
    correct: 0
  },
  {
    q: "What is established as the state language by the Constitution of Lithuania?",
    a: ["Lithuanian", "Lithuanian and English", "Any language chosen by the Seimas"],
    correct: 0
  },
  {
    q: "According to the Constitution, state power in Lithuania belongs to whom?",
    a: ["The people", "The Seimas", "The Government"],
    correct: 0
  },
  {
    q: "Which freedom is explicitly guaranteed by the Constitution of Lithuania?",
    a: ["Freedom of conscience and religion", "Mandatory religious practice", "State religion"],
    correct: 0
  },
  {
    q: "How may the Constitution of Lithuania be amended?",
    a: ["According to a special constitutional procedure", "Only by presidential decree", "It cannot be amended"],
    correct: 0
  },
  {
    q: "Which court ensures that laws comply with the Constitution of Lithuania?",
    a: ["The Constitutional Court", "The Court of Appeal", "The Supreme Administrative Court"],
    correct: 0
  },
  {
    q: "Who has the right to vote according to the Constitution of Lithuania?",
    a: ["Citizens of Lithuania who meet the legal age requirement", "All permanent residents", "Only members of the Seimas"],
    correct: 0
  },
  {
    q: "What form of government is established by the Constitution of Lithuania?",
    a: ["A democratic republic", "A constitutional monarchy", "A federal union"],
    correct: 0
  },
  {
    q: "Which institution approves the state budget in Lithuania?",
    a: ["The Seimas", "The President", "The Government"],
    correct: 0
  },
  {
    q: "Which principle governs the separation of powers in Lithuania?",
    a: ["Legislative, executive, and judicial powers are separated", "All power belongs to the President", "The Seimas exercises all powers"],
    correct: 0
  },
  {
    q: "Which document has the highest legal force in Lithuania?",
    a: ["The Constitution of the Republic of Lithuania", "Acts of the Seimas", "Government resolutions"],
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
  el.textContent = `Progress: ${answeredCount} / ${totalQuestions} questions`;
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
    pct >= 80 ? "Excellent work!" :
    pct >= 50 ? "Good progress!" :
    pct >= 25 ? "A solid start" :
    "Keep practising";

  card.innerHTML = `
    <h3>${title}</h3>
    ${createDonutChart()}
<p>
  You’ve completed the free practice questions.<br>
  Get full access to <strong>hundreds of Lithuanian citizenship test–style questions</strong>,
  realistic practice sessions, and detailed progress tracking.
</p>
<a href="https://civiclearn.com/lt/checkout.html" class="hero-primary-btn">
  Get full access
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
        feedback.textContent = "Correct!";
        feedback.classList.add("inline-correct");
      } else {
        wrongCount++;
        feedback.textContent = "Correct answer: " + questionObj.a[questionObj.correct];
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
