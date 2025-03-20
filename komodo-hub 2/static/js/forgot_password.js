// Forgot Password page specific JavaScript

document.addEventListener("DOMContentLoaded", () => {
  // Form validation
  const forgotPasswordForm = document.querySelector(".auth-form")

  if (forgotPasswordForm) {
    forgotPasswordForm.addEventListener("submit", function (e) {
      let isValid = true
      const emailInput = document.getElementById("email")

      // Validate email
      if (!emailInput.value.trim()) {
        showError(emailInput, "Please enter your email address")
        isValid = false
      } else if (!isValidEmail(emailInput.value)) {
        showError(emailInput, "Please enter a valid email address")
        isValid = false
      } else {
        clearError(emailInput)
      }

      if (!isValid) {
        e.preventDefault()
      } else {
        // Show loading state
        const submitButton = this.querySelector('button[type="submit"]')
        const originalText = submitButton.textContent
        submitButton.disabled = true
        submitButton.textContent = "Sending..."

        // In a real application, this would be handled by the server
        // For demo purposes, we'll simulate a successful submission
        setTimeout(() => {
          // Create success message
          const successMessage = document.createElement("div")
          successMessage.classList.add("alert", "alert-success")
          successMessage.textContent = "Password reset instructions have been sent to your email address."

          // Insert success message before the form
          forgotPasswordForm.parentNode.insertBefore(successMessage, forgotPasswordForm)

          // Reset form
          forgotPasswordForm.reset()

          // Reset button
          submitButton.disabled = false
          submitButton.textContent = originalText
        }, 1500)
      }
    })
  }

  // Helper functions for form validation
  function showError(field, message) {
    // Remove any existing error message
    clearError(field)

    // Add error class to the field
    field.classList.add("error")

    // Create error message element
    const errorElement = document.createElement("div")
    errorElement.classList.add("error-message")
    errorElement.textContent = message

    // Insert error message after the field
    field.parentNode.insertBefore(errorElement, field.nextSibling)
  }

  function clearError(field) {
    // Remove error class from the field
    field.classList.remove("error")

    // Find and remove any existing error message
    const errorElement = field.nextElementSibling
    if (errorElement && errorElement.classList.contains("error-message")) {
      errorElement.remove()
    }
  }

  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Help option hover effects
  const helpOptions = document.querySelectorAll(".help-option")

  helpOptions.forEach((option) => {
    option.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-5px)"
      this.style.boxShadow = "0 10px 20px rgba(0, 0, 0, 0.1)"
    })

    option.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0)"
      this.style.boxShadow = "var(--box-shadow)"
    })
  })
})

