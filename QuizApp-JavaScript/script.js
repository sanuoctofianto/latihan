const questions = [
  {
    question: 'Apa nama hewan terbesar di dunia?',
    answers: [
      { text: 'Paus Biru', correct: true },
      { text: 'Hiu', correct: false },
      { text: 'Gajah', correct: false },
      { text: 'Jerapah', correct: false },
    ],
  },
  {
    question: 'Siapakah penemu teori relativitas?',
    answers: [
      { text: 'Albert Einstein', correct: true },
      { text: 'Nikola Tesla', correct: false },
      { text: 'Alexander Graham Bell', correct: false },
      { text: 'Leonardo Da Vinci', correct: false },
    ],
  },
  {
    question: 'Siapakah penulis terkenal dari novel "Pride and Prejudice"?',
    answers: [
      { text: 'Charles Dickens', correct: false },
      { text: 'Leo Tolstoy', correct: false },
      { text: 'Jane Austen', correct: true },
      { text: 'F. Scott Fitzgerald', correct: false },
    ],
  },
  {
    question: 'Siapa ilmuwan terkenal yang merumuskan hukum gravitasi?',
    answers: [
      { text: 'Albert Einstein', correct: false },
      { text: 'Isaac Newton', correct: true },
      { text: 'Galileo Galilei', correct: false },
      { text: 'Charles Darwin', correct: false },
    ],
  },
  {
    question: 'Apakah bendera Amerika Serikat memiliki berapa strip merah dan berapa bintang di lapangan biru?',
    answers: [
      { text: '7 strip merah, 13 bintang', correct: false },
      { text: '50 strip merah, 13 bintang', correct: false },
      { text: '13 strip merah, 7 bintang', correct: false },
      { text: '13 strip merah, 50 bintang', correct: true },
    ],
  },
];

const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-btn');

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = 'Next';
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + '. ' + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement('button');
    button.innerHTML = answer.text;
    button.classList.add('btn');
    answerButtons.appendChild(button);
    button.dataset.correct = answer.correct;
    button.addEventListener('click', selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = 'none';
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === 'true';

  if (isCorrect) {
    selectedBtn.classList.add('correct');
    score++;
  } else {
    selectedBtn.classList.add('incorrect');

    Array.from(answerButtons.children).forEach((button) => {
      if (button.dataset.correct === 'true') {
        button.classList.add('correct');
      }
    });
  }

  Array.from(answerButtons.children).forEach((button) => {
    button.disabled = true;
  });

  nextButton.style.display = 'block';

  // Hapus event listener dari tombol next sebelum menambahkannya kembali
  nextButton.removeEventListener('click', handleNextButton);

  // Tambahkan event listener untuk tombol next yang sesuai
  if (currentQuestionIndex < questions.length - 1) {
    nextButton.addEventListener('click', handleNextButton);
  } else {
    nextButton.addEventListener('click', showScore);
  }
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = 'Play Again';
  nextButton.style.display = 'block';

  // Hapus event listener dari tombol next sebelum menambahkannya kembali
  nextButton.removeEventListener('click', handleNextButton);

  // Tambahkan event listener untuk tombol next yang sesuai
  nextButton.addEventListener('click', startQuiz);
}

function handleNextButton() {
  currentQuestionIndex++;
  showQuestion();
}

// Tambahkan event listener untuk tombol next pada awal kuis
nextButton.addEventListener('click', handleNextButton);

// Panggil fungsi untuk memulai kuis saat halaman dimuat
startQuiz();
