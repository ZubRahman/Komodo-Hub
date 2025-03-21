// Home page specific JavaScript

document.addEventListener("DOMContentLoaded", () => {
  // Testimonial slider functionality
  const testimonials = document.querySelectorAll(".testimonial")
  const prevButton = document.querySelector(".prev-slide")
  const nextButton = document.querySelector(".next-slide")
  let currentSlide = 0

  if (testimonials.length > 0 && prevButton && nextButton) {
    // Hide all testimonials except the first one
    testimonials.forEach((testimonial, index) => {
      if (index !== 0) {
        testimonial.style.display = "none"
      }
    })

    // Function to show a specific slide
    function showSlide(index) {
      // Hide all testimonials
      testimonials.forEach((testimonial) => {
        testimonial.style.display = "none"
      })

      // Show the selected testimonial
      testimonials[index].style.display = "block"

      // Add fade-in animation
      testimonials[index].classList.add("fade-in")
      setTimeout(() => {
        testimonials[index].classList.remove("fade-in")
      }, 500)
    }

    // Event listeners for navigation buttons
    prevButton.addEventListener("click", () => {
      currentSlide = (currentSlide - 1 + testimonials.length) % testimonials.length
      showSlide(currentSlide)
    })

    nextButton.addEventListener("click", () => {
      currentSlide = (currentSlide + 1) % testimonials.length
      showSlide(currentSlide)
    })

    // Auto-rotate testimonials every 5 seconds
    setInterval(() => {
      currentSlide = (currentSlide + 1) % testimonials.length
      showSlide(currentSlide)
    }, 5000)
  }

  // Featured programs hover effect
  const programCards = document.querySelectorAll(".program-cards .card")

  programCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.classList.add("hover")
    })

    card.addEventListener("mouseleave", function () {
      this.classList.remove("hover")
    })
  })
})

