// Contact page specific JavaScript

document.addEventListener("DOMContentLoaded", () => {
  // FAQ accordion functionality
  const faqItems = document.querySelectorAll(".faq-item")

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question")

    question.addEventListener("click", function () {
      // Toggle active class on the clicked item
      item.classList.toggle("active")

      // Update the icon
      const icon = this.querySelector(".faq-toggle i")
      if (item.classList.contains("active")) {
        icon.classList.remove("fa-plus")
        icon.classList.add("fa-minus")
      } else {
        icon.classList.remove("fa-minus")
        icon.classList.add("fa-plus")
      }

      // Close other items
      faqItems.forEach((otherItem) => {
        if (otherItem !== item && otherItem.classList.contains("active")) {
          otherItem.classList.remove("active")
          const otherIcon = otherItem.querySelector(".faq-toggle i")
          otherIcon.classList.remove("fa-minus")
          otherIcon.classList.add("fa-plus")
        }
      })
    })
  })

  // Contact form validation and submission
  const contactForm = document.getElementById("contactForm")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Basic form validation
      let isValid = true
      const name = document.getElementById("name")
      const email = document.getElementById("email")
      const subject = document.getElementById("subject")
      const message = document.getElementById("message")
      const privacy = document.getElementById("privacy")

      // Validate name
      if (!name.value.trim()) {
        showError(name, "Please enter your name")
        isValid = false
      } else {
        clearError(name)
      }

      // Validate email
      if (!email.value.trim()) {
        showError(email, "Please enter your email address")
        isValid = false
      } else if (!isValidEmail(email.value)) {
        showError(email, "Please enter a valid email address")
        isValid = false
      } else {
        clearError(email)
      }

      // Validate subject
      if (!subject.value) {
        showError(subject, "Please select a subject")
        isValid = false
      } else {
        clearError(subject)
      }

      // Validate message
      if (!message.value.trim()) {
        showError(message, "Please enter your message")
        isValid = false
      } else {
        clearError(message)
      }

      // Validate privacy checkbox
      if (!privacy.checked) {
        showError(privacy, "You must agree to the Privacy Policy")
        isValid = false
      } else {
        clearError(privacy)
      }

      // If form is valid, submit it
      if (isValid) {
        // In a real application, you would submit the form data to the server
        // For now, we'll just simulate a successful submission

        // Show loading state
        const submitButton = contactForm.querySelector('button[type="submit"]')
        const originalText = submitButton.textContent
        submitButton.disabled = true
        submitButton.textContent = "Sending..."

        // Simulate form submission delay
        setTimeout(() => {
          // Reset form
          contactForm.reset()

          // Show success message
          const successMessage = document.createElement("div")
          successMessage.classList.add("success-message")
          successMessage.textContent = "Thank you for your message! We will get back to you soon."

          // Insert success message before the form
          contactForm.parentNode.insertBefore(successMessage, contactForm)

          // Hide success message after 5 seconds
          setTimeout(() => {
            successMessage.remove()
          }, 5000)

          // Reset button
          submitButton.disabled = false
          submitButton.textContent = originalText
        }, 1500)
      }
    })

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
      if (field.type === "checkbox") {
        field.parentNode.appendChild(errorElement)
      } else {
        field.parentNode.insertBefore(errorElement, field.nextSibling)
      }
    }

    function clearError(field) {
      // Remove error class from the field
      field.classList.remove("error")

      // Find and remove any existing error message
      const parent = field.type === "checkbox" ? field.parentNode : field.parentNode
      const errorElement = parent.querySelector(".error-message")
      if (errorElement) {
        errorElement.remove()
      }
    }

    function isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(email)
    }
  }
})

