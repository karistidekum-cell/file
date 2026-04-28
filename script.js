const quizData = [
  {
    question: "Quel langage permet de styliser une page web ?",
    choices: ["HTML", "CSS", "JavaScript", "PHP"],
    correct: 1,
  },
  {
    question: "Quel mot-clé déclare une variable en JavaScript ?",
    choices: ["var", "int", "let", "string"],
    correct: 2,
  },
  {
    question: "Quel symbole représente un tableau ?",
    choices: ["{}", "()", "[]", "<>"],
    correct: 2,
  },
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 45;
let timer;

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const nextBtn = document.getElementById("next-btn");
const timeEl = document.getElementById("time");
const resultEl = document.getElementById("result");
const progressBar = document.getElementById("progress-bar");

startQuiz();

function startQuiz() {
  loadQuestion();
  startTimer();
}

let quizFinished = false;

function startTimer() {
  timer = setInterval(() => {
    if (quizFinished) return;

    timeLeft--;
    timeEl.textContent = timeLeft;

    if (timeLeft <= 0) {
      quizFinished = true;
      clearInterval(timer);
      showResult();
    }
  }, 1000);
}

function loadQuestion() {
  updateProgressBar();
  nextBtn.disabled = true;
  answersEl.innerHTML = "";

  const q = quizData[currentQuestion];
  questionEl.textContent = q.question;

  q.choices.forEach((choice, index) => {
    const btn = document.createElement("button");
    btn.textContent = choice;
    btn.onclick = () => selectAnswer(btn, index);
    answersEl.appendChild(btn);
  });
}

function selectAnswer(button, index) {
  const correctIndex = quizData[currentQuestion].correct;
  const buttons = answersEl.querySelectorAll("button");

  buttons.forEach((btn) => (btn.disabled = true));

  if (index === correctIndex) {
    button.classList.add("correct");
    score++;
  } else {
    button.classList.add("wrong");
    buttons[correctIndex].classList.add("correct");
  }

  nextBtn.disabled = false;
}

nextBtn.addEventListener("click", () => {
  currentQuestion++;

  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    quizFinished = true;
    clearInterval(timer);
    showResult();
  }
});

function updateProgressBar() {
  const progress = (currentQuestion / quizData.length) * 100;
  progressBar.style.width = progress + "%";
}

const quizContainer = document.getElementById("quiz-container");

function showResult() {
  quizContainer.innerHTML = `
        <h2>Quiz terminé</h2>
        <p>Score : ${score} / ${quizData.length}</p>
        <p>Bonnes réponses : ${score}</p>
        <p>Mauvaises réponses : ${quizData.length - score}</p>
        <button id="restart-btn">Recommencer</button>
    `;

  document.getElementById("restart-btn").addEventListener("click", () => {
    window.location.href = "recommencer.html";
  });
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  timeLeft = 45;
  quizFinished = false;

  quizContainer.innerHTML = `
        <h1>Quiz JavaScript</h1>

        <div id="timer">
            Temps : <span id="time">30</span>s
        </div>

        <div id="progress-container">
            <div id="progress-bar"></div>
        </div>

        <div id="question-container">
            <h2 id="question"></h2>
            <div id="answers"></div>
        </div>

        <button id="next-btn" disabled>Question suivante</button>
    `;

  // Reconnexion des éléments DOM
  questionEl = document.getElementById("question");
  answersEl = document.getElementById("answers");
  nextBtn = document.getElementById("next-btn");
  timeEl = document.getElementById("time");
  progressBar = document.getElementById("progress-bar");

  nextBtn.addEventListener("click", () => {
    currentQuestion++;

    if (currentQuestion < quizData.length) {
      loadQuestion();
    } else {
      quizFinished = true;
      clearInterval(timer);
      showResult();
    }
  });

  loadQuestion();
  startTimer();
}
