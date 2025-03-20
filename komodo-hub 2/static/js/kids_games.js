// Kids Games page specific JavaScript

document.addEventListener("DOMContentLoaded", () => {
  // Game card hover effects
  const gameCards = document.querySelectorAll(".game-card")

  gameCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.classList.add("hover")
    })

    card.addEventListener("mouseleave", function () {
      this.classList.remove("hover")
    })
  })

  // Play buttons functionality
  const playButtons = document.querySelectorAll(".play-button")

  playButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault()
      const gameName = this.closest(".game-content").querySelector("h3").textContent

      // In a real application, you would launch the game
      // For now, we'll just show an alert
      alert(`Launching game: ${gameName}`)
    })
  })
})

