const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setNextQuestion()
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text
    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
  }
}

function setStatusClass(element, correct) {
  clearStatusClass(element)
  if (correct) {
    element.classList.add('correct')
  } else {
    element.classList.add('wrong')
  }
}

function clearStatusClass(element) {
  element.classList.remove('correct')
  element.classList.remove('wrong')
}

const questions = [
  {
    question: 'Après une relation sexuelle non protégée, je peux directement faire un test de dépistage du VIH pour savoir si j’ai été infecté.e ?',
    answers: [
      { text: 'Vrai', correct: false },
      { text: 'Faux', correct: true }
    ]
  },

  {
    question: 'Un.e gynécologue peut-il·elle faire un dépistage des IST ?',
    answers: [
      { text: 'Oui', correct: true },
      { text: 'Non', correct: false },
    ]
  },
  {
    question: 'Je peux acheter des autotests de dépistage du VIH en pharmacie.',
    answers: [
      { text: 'Vrai', correct: true },
      { text: 'Faux', correct: false },
    ]
  },
  {
    question: 'Combien de temps dois-je attendre mon résultat avec un autotest ?',
    answers: [
      { text: 'Quelques jours', correct: false },
      { text: 'Quelques minutes', correct: true }
    ]
  },
  {
    question: 'Quel liquide corporel est analysé lors d’un test de dépistage du VIH ?',
    answers: [
      { text: 'Le sang', correct: true },
      { text: 'L"urine', correct: false },
    ]
  },
  {
    question: 'Où puis-je aller faire, entre autres, un dépistage du VIH ?',
    answers: [
      { text: 'A la pharmacie', correct: false },
      { text: 'Dans un centre de planning familial', correct: true },
    ]
  },
  {
    question: 'Une goutte de sang suffit pour faire…',
    answers: [
      { text: 'Un dépistage rapide du VIH(ou un autotest du VIH)', correct: true},
      { text: 'Un dépistage du VIH par prise de sang', correct: false },
    ]
  },
  {
    question: 'Que dois-je faire pour avoir un résultat de test du VIH 100% fiable ?',
    answers: [
      { text: 'Respecter le délai d"attente entre la prise du risque et le test', correct: true},
      { text: 'Passer au plus vite un test de dépistage du VIH aprés la prise de risque', correct: false },
    ]
  },
  {
    question: 'Existe-il des tests rapides (TROD) pour la syphilis ?',
    answers: [
      { text: 'Oui', correct: true},
      { text: 'Non, il existe seulement pour le VIH', correct: false },
    ]
  },
]