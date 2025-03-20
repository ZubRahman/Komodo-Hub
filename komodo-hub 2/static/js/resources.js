// Resources page specific JavaScript

document.addEventListener("DOMContentLoaded", () => {
  // Tab navigation functionality
  const tabs = document.querySelectorAll(".resources-tabs .tab")

  tabs.forEach((tab) => {
    tab.addEventListener("click", function (e) {
      // This is handled by the server-side routing, but we can add active class for visual feedback
      tabs.forEach((t) => t.classList.remove("active"))
      this.classList.add("active")
    })
  })

  // Newsletter signup form
  const newsletterForm = document.querySelector(".newsletter-form")

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", function (e) {
      e.preventDefault()
      const emailInput = this.querySelector("input[type='email']")
      const email = emailInput.value.trim()

      if (email) {
        // In a real application, you would submit this to the server
        // For now, we'll just log the email
        console.log("Newsletter signup:", email)

        // Show success message
        const successMessage = document.createElement("div")
        successMessage.classList.add("success-message")
        successMessage.textContent = "Thank you for subscribing to our newsletter!"

        // Replace the form with the success message
        this.parentNode.replaceChild(successMessage, this)
      }
    })
  }
})

