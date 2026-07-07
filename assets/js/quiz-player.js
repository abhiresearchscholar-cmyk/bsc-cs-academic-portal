const quizTitle = document.querySelector("#quiz-title");
const quizTopic = document.querySelector("#quiz-topic");
const quizNote = document.querySelector("#quiz-note");
const quizBox = document.querySelector("#quiz-box");
const quizStatus = document.querySelector("#quiz-status");
const prevButton = document.querySelector("#quiz-prev");
const nextButton = document.querySelector("#quiz-next");
const submitButton = document.querySelector("#quiz-submit");
const retryButton = document.querySelector("#quiz-retry");
const scoreBox = document.querySelector("#quiz-score");
const lastScoreBox = document.querySelector("#last-score");

let quizData = null;
let currentQuestion = 0;
let selectedAnswers = [];
let submitted = false;

function quizParam() {
  const params = new URLSearchParams(window.location.search);
  return params.get("quiz") || "quizzes/semester1/quiz-01-computer-basics.json";
}

async function loadQuiz() {
  const response = await fetch(quizParam());
  if (!response.ok) {
    throw new Error("Quiz file not found");
  }
  return response.json();
}

function renderQuiz() {
  const question = quizData.questions[currentQuestion];
  quizTitle.textContent = quizData.title;
  quizTopic.textContent = quizData.topic;
  quizNote.textContent = quizData.note;
  quizStatus.textContent = `Question ${currentQuestion + 1} of ${quizData.questions.length}`;

  quizBox.innerHTML = `
    <h2>${question.question}</h2>
    <div class="quiz-options">
      ${question.options.map(function (option, index) {
        const checked = selectedAnswers[currentQuestion] === index ? "checked" : "";
        const disabled = submitted ? "disabled" : "";
        const correctClass = submitted && question.answer === index ? " correct" : "";
        const wrongClass = submitted && selectedAnswers[currentQuestion] === index && question.answer !== index ? " wrong" : "";
        return `
          <label class="quiz-option${correctClass}${wrongClass}">
            <input type="radio" name="quiz-option" value="${index}" ${checked} ${disabled}>
            <span>${option}</span>
          </label>
        `;
      }).join("")}
    </div>
    ${submitted ? `<div class="quiz-explanation"><strong>Explanation:</strong> ${question.explanation}</div>` : ""}
  `;

  quizBox.querySelectorAll("input[name='quiz-option']").forEach(function (input) {
    input.addEventListener("change", function () {
      selectedAnswers[currentQuestion] = Number(input.value);
    });
  });

  prevButton.disabled = currentQuestion === 0;
  nextButton.disabled = currentQuestion === quizData.questions.length - 1;
  submitButton.hidden = submitted;
  retryButton.hidden = !submitted;
}

function calculateScore() {
  return quizData.questions.reduce(function (score, question, index) {
    return score + (selectedAnswers[index] === question.answer ? 1 : 0);
  }, 0);
}

function showScore() {
  const score = calculateScore();
  const total = quizData.questions.length;
  scoreBox.hidden = false;
  scoreBox.textContent = `Your score: ${score}/${total}. Practice quiz only. Marks are not officially recorded.`;
  localStorage.setItem("semester1Quiz01LastScore", `${score}/${total}`);
}

function showLastScore() {
  const lastScore = localStorage.getItem("semester1Quiz01LastScore");
  if (lastScore) {
    lastScoreBox.textContent = `Last score on this device: ${lastScore}`;
  }
}

prevButton.addEventListener("click", function () {
  currentQuestion -= 1;
  renderQuiz();
});

nextButton.addEventListener("click", function () {
  currentQuestion += 1;
  renderQuiz();
});

submitButton.addEventListener("click", function () {
  submitted = true;
  showScore();
  renderQuiz();
});

retryButton.addEventListener("click", function () {
  currentQuestion = 0;
  selectedAnswers = [];
  submitted = false;
  scoreBox.hidden = true;
  renderQuiz();
});

loadQuiz()
  .then(function (data) {
    quizData = data;
    selectedAnswers = new Array(quizData.questions.length).fill(null);
    showLastScore();
    renderQuiz();
  })
  .catch(function () {
    quizBox.innerHTML = "<p>Quiz could not be loaded. Please check the quiz file path.</p>";
  });
