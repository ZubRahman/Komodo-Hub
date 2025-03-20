// Learning Resources page specific JavaScript

document.addEventListener("DOMContentLoaded", () => {
  // Search form functionality
  const searchForm = document.querySelector(".search-form")

  if (searchForm) {
    searchForm.addEventListener("submit", function (e) {
      e.preventDefault()
      const searchInput = this.querySelector("input")
      const searchTerm = searchInput.value.trim()

      if (searchTerm) {
        // In a real application, you would redirect to search results
        // For now, we'll just log the search term
        console.log("Searching for resources:", searchTerm)

        // For demo purposes, show an alert
        alert(`Searching for resources: ${searchTerm}`)
      }
    })
  }

  // Category card hover effects
  const categoryCards = document.querySelectorAll(".category-card")

  categoryCards.forEach((card) => {
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

  // Filter functionality
  const filterButtons = document.querySelectorAll(".filter-button")

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const filterSection = this.closest(".filters-bar, .filters-section")

      if (filterSection) {
        // Get all select elements in this filter section
        const selects = filterSection.querySelectorAll("select")
        const filters = {}

        // Collect filter values
        selects.forEach((select) => {
          filters[select.id] = select.value
        })

        // In a real application, you would filter the resources based on these values
        // For now, we'll just log the filter values
        console.log("Filtering resources by:", filters)

        // For demo purposes, show an alert
        alert(`Filtering resources with the following criteria: ${JSON.stringify(filters)}`)
      }
    })
  })

  // Resource card hover effects
  const resourceCards = document.querySelectorAll(".resource-card")

  resourceCards.forEach((card) => {
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

  // Download buttons
  const downloadButtons = document.querySelectorAll(".resource-card .btn-outline")

  downloadButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault()
      const resourceTitle = this.closest(".resource-content").querySelector("h3").textContent

      // In a real application, you would initiate a download
      // For now, we'll just show an alert
      alert(`Downloading resource: ${resourceTitle}`)
    })
  })

  // Multimedia play buttons
  const playButtons = document.querySelectorAll(".play-button")

  playButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const multimediaTitle = this.closest(".multimedia-card").querySelector("h3").textContent

      // In a real application, you would play the video or audio
      // For now, we'll just show an alert
      alert(`Playing multimedia: ${multimediaTitle}`)
    })
  })

  // Interactive content
  const interactiveItems = document.querySelectorAll(".interactive-badge")

  interactiveItems.forEach((item) => {
    item.closest(".multimedia-preview").addEventListener("click", function () {
      const interactiveTitle = this.closest(".multimedia-card").querySelector("h3").textContent

      // In a real application, you would launch the interactive content
      // For now, we'll just show an alert
      alert(`Launching interactive content: ${interactiveTitle}`)
    })
  })

  // View more buttons
  const viewMoreButtons = document.querySelectorAll(".view-more-container .btn-secondary")

  viewMoreButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      e.preventDefault()
      const sectionTitle = this.closest(".resource-section").querySelector("h2").textContent

      // In a real application, you would load more resources
      // For now, we'll just show an alert
      alert(`Loading more resources in section: ${sectionTitle}`)
    })
  })

  // Teacher dashboard access button
  const dashboardButton = document.querySelector(".dashboard-info .btn-primary")

  if (dashboardButton) {
    dashboardButton.addEventListener("click", (e) => {
      e.preventDefault()

      // In a real application, you would redirect to the dashboard
      // For now, we'll just show an alert
      alert("Redirecting to Teacher Dashboard. Please sign up or log in to access this feature.")
    })
  }

  // Resource request button
  const requestButton = document.querySelector(".request-content .btn-secondary")

  if (requestButton) {
    requestButton.addEventListener("click", (e) => {
      e.preventDefault()

      // In a real application, you would redirect to the contact form
      // For now, we'll just show an alert
      alert("Redirecting to the resource request form.")
    })
  }

  // Smooth scrolling for category links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href")
      if (targetId !== "#") {
        const targetElement = document.querySelector(targetId)

        if (targetElement) {
          e.preventDefault()
          window.scrollTo({
            top: targetElement.offsetTop - 100,
            behavior: "smooth",
          })
        }
      }
    })
  })
})

