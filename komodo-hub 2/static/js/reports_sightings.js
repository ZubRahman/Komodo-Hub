// Reports & Sightings page specific JavaScript

document.addEventListener("DOMContentLoaded", () => {
  // Form validation
  const sightingForm = document.getElementById("sightingForm")

  if (sightingForm) {
    sightingForm.addEventListener("submit", function (e) {
      let isValid = true
      const requiredFields = this.querySelectorAll("[required]")

      requiredFields.forEach((field) => {
        if (!field.value.trim()) {
          isValid = false
          field.classList.add("error")

          // Create error  {
          isValid = false
          field.classList.add("error")

          // Create error message if it doesn't exist
          let errorMessage = field.nextElementSibling
          if (!errorMessage || !errorMessage.classList.contains("error-message")) {
            errorMessage = document.createElement("div")
            errorMessage.classList.add("error-message")
            errorMessage.textContent = "This field is required"
            field.parentNode.insertBefore(errorMessage, field.nextSibling)
          }
        } else {
          field.classList.remove("error")
          const errorMessage = field.nextElementSibling
          if (errorMessage && errorMessage.classList.contains("error-message")) {
            errorMessage.remove()
          }
        }
      })

      if (!isValid) {
        e.preventDefault()
      }
    })
  }

  // File input preview
  const photoInput = document.getElementById("photo")

  if (photoInput) {
    photoInput.addEventListener("change", function () {
      if (this.files && this.files[0]) {
        const fileSize = this.files[0].size / 1024 / 1024 // in MB
        if (fileSize > 5) {
          alert("File size exceeds 5MB. Please choose a smaller image.")
          this.value = ""
        }
      }
    })
  }

  // Interactive map functionality
  const globalSightingsMap = document.getElementById("globalSightingsMap")

  if (globalSightingsMap) {
    // In a real application, you would initialize a map library like Leaflet or Google Maps
    // For now, we'll just add a click event to simulate interaction
    globalSightingsMap.addEventListener("click", () => {
      alert("In a real application, this would be an interactive map showing species sightings worldwide.")
    })

    // Map filter functionality
    const mapControls = document.querySelector(".map-controls")

    if (mapControls) {
      const filterButton = mapControls.querySelector(".filter-button")

      if (filterButton) {
        filterButton.addEventListener("click", () => {
          const speciesGroup = document.getElementById("species-group").value
          const conservationStatus = document.getElementById("conservation-status").value
          const dateRange = document.getElementById("date-range").value

          // In a real application, you would filter the map markers based on these values
          // For now, we'll just log the filter values
          console.log("Filtering map by:", { speciesGroup, conservationStatus, dateRange })

          // For demo purposes, show an alert
          alert(
            `Filtering map by: Species Group: ${speciesGroup}, Conservation Status: ${conservationStatus}, Date Range: ${dateRange}`,
          )
        })
      }
    }
  }

  // Report a sighting button
  const reportButtons = document.querySelectorAll(".report-buttons .btn-primary")

  reportButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault()

      // In a real application, you would redirect to the sighting form
      // For now, we'll just show an alert
      alert("Opening the species sighting report form. Please log in to submit a sighting.")
    })
  })

  // Download mobile app button
  const appDownloadButton = document.querySelector(".report-buttons .btn-outline")

  if (appDownloadButton) {
    appDownloadButton.addEventListener("click", (e) => {
      e.preventDefault()

      // In a real application, you would redirect to the app download page
      // For now, we'll just show an alert
      alert("Redirecting to mobile app download page.")
    })
  }

  // Sighting card hover effects
  const sightingCards = document.querySelectorAll(".sighting-card")

  sightingCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.classList.add("hover")
      this.style.transform = "translateY(-5px)"
      this.style.boxShadow = "0 10px 20px rgba(0, 0, 0, 0.1)"
    })

    card.addEventListener("mouseleave", function () {
      this.classList.remove("hover")
      this.style.transform = "translateY(0)"
      this.style.boxShadow = "var(--box-shadow)"
    })
  })

  // View more sightings button
  const viewMoreSightingsButton = document.querySelector(".recent-sightings .view-more-container .btn-secondary")

  if (viewMoreSightingsButton) {
    viewMoreSightingsButton.addEventListener("click", (e) => {
      e.preventDefault()

      // In a real application, you would load more sightings
      // For now, we'll just show an alert
      alert("Loading more recent sightings...")
    })
  }

  // Contribution card hover effects
  const contributionCards = document.querySelectorAll(".contribution-card")

  contributionCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.classList.add("hover")
      this.style.transform = "translateY(-5px)"
      this.style.boxShadow = "0 10px 20px rgba(0, 0, 0, 0.1)"
    })

    card.addEventListener("mouseleave", function () {
      this.classList.remove("hover")
      this.style.transform = "translateY(0)"
      this.style.boxShadow = "var(--box-shadow)"
    })
  })

  // Read article/view essay buttons
  const contributionButtons = document.querySelectorAll(".contribution-card .btn-outline")

  contributionButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault()
      const contributionTitle = this.closest(".contribution-content").querySelector("h3").textContent

      // In a real application, you would open the article or essay
      // For now, we'll just show an alert
      alert(`Opening: ${contributionTitle}`)
    })
  })

  // View more contributions button
  const viewMoreContributionsButton = document.querySelector(
    ".community-contributions .view-more-container .btn-secondary",
  )

  if (viewMoreContributionsButton) {
    viewMoreContributionsButton.addEventListener("click", (e) => {
      e.preventDefault()

      // In a real application, you would load more contributions
      // For now, we'll just show an alert
      alert("Loading more community contributions...")
    })
  }

  // Project card hover effects
  const projectCards = document.querySelectorAll(".project-card")

  projectCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.classList.add("hover")
      this.style.transform = "translateY(-5px)"
      this.style.boxShadow = "0 10px 20px rgba(0, 0, 0, 0.1)"
    })

    card.addEventListener("mouseleave", function () {
      this.classList.remove("hover")
      this.style.transform = "translateY(0)"
      this.style.boxShadow = "var(--box-shadow)"
    })
  })

  // Learn more about project buttons
  const projectButtons = document.querySelectorAll(".project-card .btn-outline")

  projectButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault()
      const projectTitle = this.closest(".project-content").querySelector("h3").textContent

      // In a real application, you would open the project details
      // For now, we'll just show an alert
      alert(`Learning more about research project: ${projectTitle}`)
    })
  })

  // Guideline item hover effects
  const guidelineItems = document.querySelectorAll(".guideline-item")

  guidelineItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.classList.add("hover")
      this.style.transform = "translateY(-5px)"
      this.style.boxShadow = "0 10px 20px rgba(0, 0, 0, 0.1)"
    })

    item.addEventListener("mouseleave", function () {
      this.classList.remove("hover")
      this.style.transform = "translateY(0)"
      this.style.boxShadow = "var(--box-shadow)"
    })
  })

  // Download guidelines button
  const guidelinesButton = document.querySelector(".guidelines-content .btn-secondary")

  if (guidelinesButton) {
    guidelinesButton.addEventListener("click", (e) => {
      e.preventDefault()

      // In a real application, you would download the guidelines
      // For now, we'll just show an alert
      alert("Downloading complete submission guidelines...")
    })
  }

  // Mobile responsiveness for report content
  function adjustReportContent() {
    const reportContent = document.querySelector(".report-content")

    if (reportContent) {
      if (window.innerWidth < 992) {
        reportContent.style.gridTemplateColumns = "1fr"
      } else {
        reportContent.style.gridTemplateColumns = "1fr 1fr"
      }
    }
  }

  // Call on load
  adjustReportContent()

  // Call on resize
  window.addEventListener("resize", adjustReportContent)
})

