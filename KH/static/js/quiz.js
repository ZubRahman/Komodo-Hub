document.addEventListener("DOMContentLoaded", () => {
  // Quiz questions
  const quizQuestions = [
    {
      question: "Which of these animals is classified as 'Critically Endangered' by the IUCN Red List?",
      options: ["African Elephant", "Sumatran Rhino", "Giant Panda", "Gray Wolf"],
      correctIndex: 1,
      explanation:
        "The Sumatran Rhino is critically endangered with fewer than 80 individuals remaining in the wild, primarily due to poaching and habitat loss.",
    },
    {
      question: "What is the main threat to sea turtles worldwide?",
      options: ["Climate change", "Plastic pollution", "Fishing bycatch", "All of the above"],
      correctIndex: 3,
      explanation:
        "Sea turtles face multiple threats including climate change affecting nesting beaches, plastic pollution causing ingestion and entanglement, and accidental capture in fishing gear (bycatch).",
    },
    {
      question: "Which conservation status indicates the highest risk of extinction in the wild?",
      options: ["Vulnerable", "Near Threatened", "Endangered", "Critically Endangered"],
      correctIndex: 3,
      explanation:
        "The IUCN Red List categories from lowest to highest risk are: Near Threatened, Vulnerable, Endangered, and Critically Endangered, followed by Extinct in the Wild and Extinct.",
    },
    {
      question: "What is the primary reason for the decline of orangutan populations?",
      options: ["Hunting for food", "Disease", "Habitat loss due to palm oil plantations", "Climate change"],
      correctIndex: 2,
      explanation:
        "The expansion of palm oil plantations has led to massive deforestation in Indonesia and Malaysia, destroying the rainforest habitat that orangutans depend on.",
    },
    {
      question: "Which of these is NOT a method used in wildlife conservation?",
      options: [
        "Captive breeding programs",
        "Protected area establishment",
        "Species exploitation",
        "Habitat restoration",
      ],
      correctIndex: 2,
      explanation:
        "Species exploitation (unsustainable use of wildlife) is a threat to conservation, not a conservation method. The other options are all important conservation strategies.",
    },
    {
      question: "The Komodo dragon is native to which country?",
      options: ["Indonesia", "Malaysia", "Philippines", "Thailand"],
      correctIndex: 0,
      explanation:
        "Komodo dragons are found only on a few islands in Indonesia, primarily Komodo, Rinca, Flores, and Gili Motang.",
    },
    {
      question:
        "What percentage of the world's species are estimated to be at risk of extinction due to human activities?",
      options: ["Less than 1%", "Around 5-10%", "About 25%", "Over 40%"],
      correctIndex: 2,
      explanation:
        "Scientists estimate that about 25% of all species on Earth are currently at risk of extinction due to human activities like habitat destruction, pollution, and climate change.",
    },
    {
      question: "Which of these animals was brought back from the brink of extinction through conservation efforts?",
      options: ["Dodo bird", "American bison", "Tasmanian tiger", "Passenger pigeon"],
      correctIndex: 1,
      explanation:
        "The American bison was reduced from tens of millions to just a few hundred in the late 1800s, but conservation efforts have helped the population recover to around 500,000 today.",
    },
    {
      question: "What is 'biodiversity' in the context of conservation?",
      options: [
        "The study of human impact on the environment",
        "The variety of plant and animal life in a particular habitat",
        "A type of sustainable farming practice",
        "The process of reintroducing species to the wild",
      ],
      correctIndex: 1,
      explanation:
        "Biodiversity refers to the variety of life forms in a given area or ecosystem, including diversity within species, between species, and of ecosystems.",
    },
    {
      question: "Which international agreement aims to ensure the conservation and sustainable use of biodiversity?",
      options: ["Kyoto Protocol", "Paris Agreement", "Convention on Biological Diversity", "Montreal Protocol"],
      correctIndex: 2,
      explanation:
        "The Convention on Biological Diversity (CBD) is an international treaty adopted in 1992 with three main goals: conservation of biodiversity, sustainable use of its components, and fair sharing of benefits from genetic resources.",
    },
  ]

  // DOM elements
  const startScreen = document.getElementById("quiz-start-screen")
  const questionScreen = document.getElementById("quiz-question-screen")
  const resultsScreen = document.getElementById("quiz-results-screen")

  const startBtn = document.getElementById("start-quiz-btn")
  const nextBtn = document.getElementById("next-question-btn")
  const retryBtn = document.getElementById("retry-quiz-btn")

  const currentQuestionEl = document.getElementById("current-question")
  const totalQuestionsEl = document.getElementById("total-questions")
  const progressFill = document.getElementById("progress-fill")

  const questionText = document.getElementById("question-text")
  const answerOptions = document.querySelectorAll(".answer-option")

  const feedbackContainer = document.getElementById("feedback-container")
  const feedbackMessage = document.getElementById("feedback-message")

  const finalScoreEl = document.getElementById("final-score")
  const maxScoreEl = document.getElementById("max-score")
  const scoreMessageEl = document.getElementById("score-message")
  const correctAnswersEl = document.getElementById("correct-answers")
  const totalAnswersEl = document.getElementById("total-answers")
  const conservationMessageEl = document.getElementById("conservation-message")

  // Quiz state
  let currentQuestion = 0
  let score = 0
  let selectedAnswer = null

  // Initialize quiz
  function initQuiz() {
    // Set total questions
    totalQuestionsEl.textContent = quizQuestions.length
    maxScoreEl.textContent = quizQuestions.length
    totalAnswersEl.textContent = quizQuestions.length

    // Reset state
    currentQuestion = 0
    score = 0

    // Add event listeners
    startBtn.addEventListener("click", startQuiz)
    nextBtn.addEventListener("click", goToNextQuestion)
    retryBtn.addEventListener("click", restartQuiz)

    answerOptions.forEach((option) => {
      option.addEventListener("click", () => selectAnswer(option))
    })
  }

  // Start the quiz
  function startQuiz() {
    startScreen.classList.remove("active")
    questionScreen.classList.add("active")
    loadQuestion(currentQuestion)
  }

  // Load a question
  function loadQuestion(index) {
    // Update progress
    currentQuestionEl.textContent = index + 1
    const progressPercentage = ((index + 1) / quizQuestions.length) * 100
    progressFill.style.width = `${progressPercentage}%`

    // Load question and options
    const question = quizQuestions[index]
    questionText.textContent = question.question

    answerOptions.forEach((option, i) => {
      option.textContent = question.options[i]
      option.dataset.index = i
      option.className = "answer-option" // Reset classes
    })

    // Hide feedback
    feedbackContainer.style.display = "none"
    selectedAnswer = null
  }

  // Select an answer
  function selectAnswer(option) {
    // If already selected an answer, do nothing
    if (selectedAnswer !== null) return

    selectedAnswer = Number.parseInt(option.dataset.index)
    option.classList.add("selected")

    // Check if correct
    const question = quizQuestions[currentQuestion]
    const isCorrect = selectedAnswer === question.correctIndex

    // Update score
    if (isCorrect) {
      score++
    }

    // Show correct/incorrect styling
    answerOptions.forEach((opt, i) => {
      if (i === question.correctIndex) {
        opt.classList.add("correct")
      } else if (i === selectedAnswer && !isCorrect) {
        opt.classList.add("incorrect")
      }
      opt.classList.add("disabled")
    })

    // Show feedback
    feedbackContainer.style.display = "block"
    feedbackMessage.textContent = question.explanation
    feedbackMessage.className = `feedback-message ${isCorrect ? "correct" : "incorrect"}`
  }

  // Go to next question
  function goToNextQuestion() {
    currentQuestion++

    if (currentQuestion < quizQuestions.length) {
      loadQuestion(currentQuestion)
    } else {
      showResults()
    }
  }

  // Show results
  function showResults() {
    questionScreen.classList.remove("active")
    resultsScreen.classList.add("active")

    // Update score display
    finalScoreEl.textContent = score
    correctAnswersEl.textContent = score

    // Save score to database
    saveScore(score)

    // Set appropriate message based on score
    const percentage = (score / quizQuestions.length) * 100

    if (percentage >= 90) {
      scoreMessageEl.textContent = "Outstanding! You're a conservation expert!"
      conservationMessageEl.textContent = "Your knowledge can make a real difference in wildlife conservation efforts!"
    } else if (percentage >= 70) {
      scoreMessageEl.textContent = "Great job! You know your wildlife!"
      conservationMessageEl.textContent =
        "You have a solid understanding of conservation issues. Keep learning and sharing your knowledge!"
    } else if (percentage >= 50) {
      scoreMessageEl.textContent = "Good effort!"
      conservationMessageEl.textContent =
        "You're on your way to becoming more conservation-aware. Keep exploring and learning!"
    } else {
      scoreMessageEl.textContent = "Thanks for participating!"
      conservationMessageEl.textContent =
        "There's always more to learn about wildlife conservation. Explore our site to discover more!"
    }
  }

  // Restart the quiz
  function restartQuiz() {
    resultsScreen.classList.remove("active")
    startScreen.classList.add("active")
    currentQuestion = 0
    score = 0
  }

  // Initialize the quiz
  initQuiz()

  // Save score to database
  function saveScore(score) {
    // Only save score if user is logged in
    if (document.body.getAttribute("data-logged-in") === "True") {
      console.log("Saving Quiz score:", score)

      // Show saving indicator
      const savingMessage = document.createElement("div")
      savingMessage.textContent = "Saving your score..."
      savingMessage.style.color = "blue"
      savingMessage.style.marginTop = "10px"
      resultsScreen.appendChild(savingMessage)

      fetch("/save_score", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ score: score }),
      })
        .then((response) => {
          if (!response.ok) {
            return response.json().then((data) => {
              throw new Error(data.message || "Network response was not ok: " + response.statusText)
            })
          }
          return response.json()
        })
        .then((data) => {
          console.log("Quiz score saved successfully:", data)
          savingMessage.textContent = "Score saved successfully!"
          savingMessage.style.color = "green"
        })
        .catch((error) => {
          console.error("Error saving Quiz score:", error)
          savingMessage.textContent = "Error saving score: " + error.message
          savingMessage.style.color = "red"
        })
    } else {
      console.log("User not logged in, Quiz score not saved")
    }
  }
})
