document.addEventListener("DOMContentLoaded", () => {
  // Mobile menu toggle
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
  const nav = document.querySelector("nav")

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener("click", function () {
      nav.classList.toggle("active")
      this.classList.toggle("active")
    })
  }

  // Donation modal functionality
  const donateButton = document.getElementById("donate-button")
  const donateModal = document.getElementById("donate-modal")
  const donateClose = document.getElementById("donate-close")
  const donateForm = document.getElementById("donate-form")
  const customAmountContainer = document.getElementById("custom-amount")
  const customAmountInput = document.getElementById("custom-amount-input")
  const donationAmountRadios = document.querySelectorAll('input[name="donation-amount"]')
  const paymentMethodRadios = document.querySelectorAll('input[name="payment-method"]')
  const cardDetails = document.getElementById("card-details")
  const thankYouContainer = document.getElementById("thank-you-container")
  const donateFormContainer = document.getElementById("donate-form-container")
  const closeThankYou = document.getElementById("close-thank-you")
  const donationAmountDisplay = document.getElementById("donation-amount-display")
  const donationDateDisplay = document.getElementById("donation-date-display")
  const donationIdDisplay = document.getElementById("donation-id-display")

  if (donateButton && donateModal) {
    donateButton.addEventListener("click", () => {
      donateModal.style.display = "block"
      document.body.style.overflow = "hidden"
    })

    if (donateClose) {
      donateClose.addEventListener("click", () => {
        donateModal.style.display = "none"
        document.body.style.overflow = ""
        resetDonationForm()
      })
    }

    window.addEventListener("click", (e) => {
      if (e.target === donateModal) {
        donateModal.style.display = "none"
        document.body.style.overflow = ""
        resetDonationForm()
      }
    })

    // Handle custom amount toggle
    if (donationAmountRadios.length > 0 && customAmountContainer) {
      donationAmountRadios.forEach((radio) => {
        radio.addEventListener("change", function () {
          if (this.value === "custom") {
            customAmountContainer.style.display = "block"
            customAmountInput.focus()
          } else {
            customAmountContainer.style.display = "none"
          }
        })
      })
    }

    // Handle payment method toggle
    if (paymentMethodRadios.length > 0 && cardDetails) {
      paymentMethodRadios.forEach((radio) => {
        radio.addEventListener("change", function () {
          if (this.value === "card") {
            cardDetails.classList.add("active")
          } else {
            cardDetails.classList.remove("active")
          }
        })
      })
    }

    // Handle form submission
    if (donateForm) {
      donateForm.addEventListener("submit", (e) => {
        e.preventDefault()

        // Get selected amount
        let amount = 10 // Default
        const selectedAmount = document.querySelector('input[name="donation-amount"]:checked')

        if (selectedAmount) {
          if (selectedAmount.value === "custom") {
            if (!customAmountInput.value || isNaN(customAmountInput.value) || customAmountInput.value <= 0) {
              alert("Please enter a valid donation amount.")
              return
            }
            amount = customAmountInput.value
          } else {
            amount = selectedAmount.value
          }
        }

        // Get payment method
        let paymentMethod = "card" // Default
        paymentMethodRadios.forEach((radio) => {
          if (radio.checked) {
            paymentMethod = radio.value
          }
        })

        // If card payment, validate card details
        if (paymentMethod === "card") {
          const cardNumber = document.getElementById("card-number").value
          const cardName = document.getElementById("card-name").value
          const cardExpiry = document.getElementById("card-expiry").value
          const cardCVC = document.getElementById("card-cvc").value

          if (!cardNumber || !cardName || !cardExpiry || !cardCVC) {
            alert("Please fill in all card details.")
            return
          }
        }

        // Display thank you message
        if (donateFormContainer && thankYouContainer) {
          donateFormContainer.style.display = "none"
          thankYouContainer.style.display = "block"

          // Set donation details
          if (donationAmountDisplay) {
            donationAmountDisplay.textContent = `£${amount}`
          }

          if (donationDateDisplay) {
            const now = new Date()
            donationDateDisplay.textContent = now.toLocaleDateString("en-GB", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          }

          if (donationIdDisplay) {
            // Generate a random donation ID
            const randomId = Math.floor(100000 + Math.random() * 900000)
            donationIdDisplay.textContent = `DON-${randomId}`
          }
        }
      })
    }

    // Close thank you message
    if (closeThankYou) {
      closeThankYou.addEventListener("click", () => {
        donateModal.style.display = "none"
        document.body.style.overflow = ""
        resetDonationForm()
      })
    }

    // Reset donation form
    function resetDonationForm() {
      if (donateFormContainer && thankYouContainer) {
        donateFormContainer.style.display = "block"
        thankYouContainer.style.display = "none"
      }

      if (donateForm) {
        donateForm.reset()
      }

      if (customAmountContainer) {
        customAmountContainer.style.display = "none"
      }

      if (cardDetails) {
        cardDetails.classList.add("active")
      }
    }
  }
})
