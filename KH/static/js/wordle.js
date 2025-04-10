document.addEventListener("DOMContentLoaded", () => {
  // List of 5-letter animal names
  const animalWords = [
    "TIGER",
    "PANDA",
    "KOALA",
    "EAGLE",
    "SHARK",
    "LEMUR",
    "SLOTH",
    "OTTER",
    "BISON",
    "CAMEL",
    "DINGO",
    "FOSSA",
    "GECKO",
    "HYENA",
    "IGUAN",
    "JACKAL",
    "LYNX",
    "MOOSE",
    "NEWT",
    "ORYX",
    "PUMA",
    "QUAIL",
    "RHINO",
    "STOAT",
    "TAPIR",
    "VIPER",
    "WHALE",
    "XERUS",
    "ZEBRA",
    "BONGO",
    "CIVET",
    "DHOLE",
    "FROG",
    "HIPPO",
    "IMPALA",
    "KIWI",
    "LLAMA",
    "MOUSE",
    "OKAPI",
    "PIKA",
    "RAVEN",
    "SEAL",
    "TUNA",
    "WOLF",
  ]

  // Game state
  let targetWord = ""
  let currentRow = 0
  let currentCol = 0
  let isGameOver = false
  let guessedLetters = {
    correct: new Set(),
    present: new Set(),
    absent: new Set(),
  }

  // DOM elements
  const wordleGrid = document.querySelector(".wordle-grid")
  const wordleMessage = document.getElementById("wordle-message")
  const wordleGuessInput = document.getElementById("wordle-guess")
  const wordleSubmitBtn = document.getElementById("wordle-submit")
  const wordleResetBtn = document.getElementById("wordle-reset")
  const keyboard = document.getElementById("wordle-keyboard")

  // Initialize game
  function initGame() {
    // Select a random word
    targetWord = animalWords[Math.floor(Math.random() * animalWords.length)]
    console.log("Target word:", targetWord) // For debugging

    // Reset game state
    currentRow = 0
    currentCol = 0
    isGameOver = false
    guessedLetters = {
      correct: new Set(),
      present: new Set(),
      absent: new Set(),
    }

    // Clear the grid
    const cells = document.querySelectorAll(".wordle-cell")
    cells.forEach((cell) => {
      cell.textContent = ""
      cell.className = "wordle-cell"
    })

    // Clear the message
    if (wordleMessage) {
      wordleMessage.textContent = ""
      wordleMessage.className = "wordle-message"
    }

    // Clear the input
    if (wordleGuessInput) {
      wordleGuessInput.value = ""
      wordleGuessInput.focus()
    }

    // Reset keyboard
    const keys = document.querySelectorAll(".keyboard-key")
    keys.forEach((key) => {
      key.className = "keyboard-key"
      if (key.dataset.key === "ENTER" || key.dataset.key === "BACK") {
        key.className = "keyboard-key wide"
      }
    })
  }

  // Submit a guess
  function submitGuess() {
    if (isGameOver) return

    const guess = wordleGuessInput ? wordleGuessInput.value.toUpperCase() : ""

    // Validate guess
    if (guess.length !== 5) {
      showMessage("Please enter a 5-letter animal name", "error")
      shakeRow(currentRow)
      return
    }

    // Check if the guess is a valid animal name
    if (!animalWords.includes(guess)) {
      showMessage("Not in animal list", "error")
      shakeRow(currentRow)
      return
    }

    // Fill in the current row
    for (let i = 0; i < 5; i++) {
      const cell = document.querySelector(`.wordle-cell[data-row="${currentRow}"][data-col="${i}"]`)
      if (cell) {
        cell.textContent = guess[i]
        cell.classList.add("filled")

        // Delay the reveal for animation effect
        setTimeout(() => {
          // Check letter
          if (guess[i] === targetWord[i]) {
            cell.classList.add("correct")
            guessedLetters.correct.add(guess[i])
          } else if (targetWord.includes(guess[i])) {
            cell.classList.add("present")
            guessedLetters.present.add(guess[i])
          } else {
            cell.classList.add("absent")
            guessedLetters.absent.add(guess[i])
          }

          // Update keyboard
          updateKeyboard()
        }, i * 100)
      }
    }

    // Check if won
    if (guess === targetWord) {
      setTimeout(() => {
        showMessage("Congratulations! You guessed the animal!", "success")
        isGameOver = true

        // Calculate score based on attempts (6 - currentRow) * 100
        const score = (6 - currentRow) * 100
        saveScore(score)
      }, 600)
      return
    }

    // Move to next row or end game
    currentRow++
    if (currentRow >= 6) {
      setTimeout(() => {
        showMessage(`Game over! The animal was ${targetWord}`, "error")
        isGameOver = true
      }, 600)
    }

    // Clear input
    if (wordleGuessInput) {
      wordleGuessInput.value = ""
      wordleGuessInput.focus()
    }
  }

  // Show a message
  function showMessage(message, type) {
    if (wordleMessage) {
      wordleMessage.textContent = message
      wordleMessage.className = "wordle-message"
      wordleMessage.classList.add(type)
    }
  }

  // Shake the current row to indicate an error
  function shakeRow(row) {
    const cells = document.querySelectorAll(`.wordle-cell[data-row="${row}"]`)
    cells.forEach((cell) => {
      cell.classList.add("shake")
      setTimeout(() => {
        cell.classList.remove("shake")
      }, 500)
    })
  }

  // Update the keyboard colors based on guessed letters
  function updateKeyboard() {
    const keys = document.querySelectorAll(".keyboard-key")
    keys.forEach((key) => {
      const letter = key.dataset.key
      if (letter && letter.length === 1) {
        if (guessedLetters.correct.has(letter)) {
          key.className = "keyboard-key correct"
        } else if (guessedLetters.present.has(letter)) {
          key.className = "keyboard-key present"
        } else if (guessedLetters.absent.has(letter)) {
          key.className = "keyboard-key absent"
        }
      }
    })
  }

  // Handle keyboard input
  function handleKeyboardInput(key) {
    if (isGameOver) return

    if (key === "ENTER") {
      submitGuess()
    } else if (key === "BACK") {
      if (wordleGuessInput) {
        const value = wordleGuessInput.value
        wordleGuessInput.value = value.substring(0, value.length - 1)
      }
    } else if (/^[A-Z]$/.test(key)) {
      if (wordleGuessInput && wordleGuessInput.value.length < 5) {
        wordleGuessInput.value += key
      }
    }
  }

  // Event listeners
  if (wordleSubmitBtn) {
    wordleSubmitBtn.addEventListener("click", submitGuess)
  }

  if (wordleResetBtn) {
    wordleResetBtn.addEventListener("click", initGame)
  }

  if (wordleGuessInput) {
    wordleGuessInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        e.preventDefault()
        submitGuess()
      }
    })
  }

  // On-screen keyboard
  if (keyboard) {
    keyboard.addEventListener("click", (e) => {
      const key = e.target.closest(".keyboard-key")
      if (key) {
        const keyValue = key.dataset.key
        handleKeyboardInput(keyValue)
        wordleGuessInput.focus()
      }
    })
  }

  // Physical keyboard
  document.addEventListener("keydown", (e) => {
    if (wordleGuessInput && document.activeElement === wordleGuessInput) {
      // Let the input handle normal typing
      return
    }

    if (e.key === "Enter") {
      e.preventDefault()
      handleKeyboardInput("ENTER")
    } else if (e.key === "Backspace") {
      e.preventDefault()
      handleKeyboardInput("BACK")
    } else if (/^[a-zA-Z]$/.test(e.key)) {
      e.preventDefault()
      handleKeyboardInput(e.key.toUpperCase())
    }
  })

  // Initialize the game
  initGame()

  // Save score to database
  function saveScore(score) {
    // Only save score if user is logged in
    if (document.body.getAttribute("data-logged-in") === "True") {
      console.log("Saving Wordle score:", score)
      fetch("/save_score", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ score: score }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok: " + response.statusText)
          }
          return response.json()
        })
        .then((data) => {
          console.log("Wordle score saved successfully:", data)
          // Alert the user that their score was saved
          setTimeout(() => {
            alert("Your score of " + score + " has been saved!")
          }, 1000)
        })
        .catch((error) => {
          console.error("Error saving Wordle score:", error)
          alert("There was an error saving your score. Please try again.")
        })
    } else {
      console.log("User not logged in, Wordle score not saved")
    }
  }
})
