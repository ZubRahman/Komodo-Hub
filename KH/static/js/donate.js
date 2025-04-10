document.addEventListener("DOMContentLoaded", () => {
  // Get DOM elements
  const donateForm = document.getElementById("donate-form")
  const thankYouModal = document.getElementById("thank-you-modal")
  const thankYouClose = document.getElementById("thank-you-close")
  const closeThankYou = document.getElementById("close-thank-you")

  // Donation amount elements
  const customAmountContainer = document.getElementById("custom-amount")
  const customAmountInput = document.getElementById("custom-amount-input")
  const donationAmountRadios = document.querySelectorAll('input[name="donation-amount"]')
  const donationAmountDisplay = document.getElementById("donation-amount-display")

  // Payment method elements
  const paymentMethodRadios = document.querySelectorAll('input[name="payment-method"]')
  const cardDetails = document.getElementById("card-details")

  // Handle custom amount toggle
  if (donationAmountRadios && customAmountContainer) {
    donationAmountRadios.forEach((radio) => {
      radio.addEventListener("change", function () {
        if (this.value === "custom") {
          customAmountContainer.classList.add("active")
          customAmountInput.focus()
        } else {
          customAmountContainer.classList.remove("active")
        }
      })
    })
  }

  // Always show card details since it's the only payment option
  if (cardDetails) {
    cardDetails.classList.add("active")
  }

  // Handle form submission
  if (donateForm) {
    donateForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get selected amount
      let amount = "£10" // Default amount
      const selectedAmount = document.querySelector('input[name="donation-amount"]:checked')

      if (selectedAmount) {
        if (selectedAmount.value === "custom") {
          amount = "£" + (customAmountInput.value || "10")
        } else {
          amount = "£" + selectedAmount.value
        }
      }

      // Set amount in thank you message
      if (donationAmountDisplay) {
        donationAmountDisplay.textContent = amount
      }

      // Set current date
      const dateDisplay = document.getElementById("donation-date-display")
      if (dateDisplay) {
        const now = new Date()
        const options = { year: "numeric", month: "long", day: "numeric" }
        dateDisplay.textContent = now.toLocaleDateString("en-GB", options)
      }

      // Generate random donation ID
      const donationIdDisplay = document.getElementById("donation-id-display")
      if (donationIdDisplay) {
        const randomId = "DON-" + Math.floor(100000 + Math.random() * 900000)
        donationIdDisplay.textContent = randomId
      }

      // Show thank you modal
      if (thankYouModal) {
        thankYouModal.style.display = "flex" // Changed from "block" to "flex"
        document.body.style.overflow = "hidden" // Prevent scrolling
      }
    })
  }

  // Close thank you modal
  if (thankYouClose) {
    thankYouClose.addEventListener("click", () => {
      thankYouModal.style.display = "none"
      document.body.style.overflow = "" // Restore scrolling
    })
  }

  if (closeThankYou) {
    closeThankYou.addEventListener("click", () => {
      thankYouModal.style.display = "none"
      document.body.style.overflow = "" // Restore scrolling
    })
  }

  // Close modal when clicking outside
  window.addEventListener("click", (e) => {
    if (e.target === thankYouModal) {
      thankYouModal.style.display = "none"
      document.body.style.overflow = "" // Restore scrolling
    }
  })
})
