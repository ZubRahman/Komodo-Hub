document.addEventListener("DOMContentLoaded", () => {
  // Theme toggle functionality
  const themeToggle = document.getElementById("theme-toggle")
  const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)")

  // Check for saved theme preference or use the system preference
  const savedTheme = localStorage.getItem("theme")

  if (savedTheme === "dark" || (!savedTheme && prefersDarkScheme.matches)) {
    document.documentElement.classList.add("dark")
  } else {
    document.documentElement.classList.remove("dark")
  }

  // Toggle theme when button is clicked
  themeToggle.addEventListener("click", () => {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    } else {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    }
  })

  // Mobile menu functionality
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle")
  const mobileMenu = document.querySelector(".mobile-menu")

  mobileMenuToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("active")
    document.body.classList.toggle("menu-open")
  })

  // Close mobile menu when clicking outside
  document.addEventListener("click", (event) => {
    if (
      mobileMenu.classList.contains("active") &&
      !mobileMenu.contains(event.target) &&
      !mobileMenuToggle.contains(event.target)
    ) {
      mobileMenu.classList.remove("active")
      document.body.classList.remove("menu-open")
    }
  })

  // Form validation
  const forms = document.querySelectorAll("form")

  forms.forEach((form) => {
    form.addEventListener("submit", (event) => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }
      form.classList.add("was-validated")
    })
  })

  // Flash message auto-dismiss
  const flashMessages = document.querySelectorAll(".flash-message")

  flashMessages.forEach((message) => {
    setTimeout(() => {
      message.style.opacity = "0"
      setTimeout(() => {
        message.remove()
      }, 300)
    }, 5000)
  })

  // Add current year to footer copyright
  const yearElement = document.getElementById("current-year")
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear()
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      document.querySelector(this.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
      })
    })
  })

  // Profile dropdown functionality
  const profileDropdown = document.querySelector(".profile-dropdown")
  const dropdownContent = document.querySelector(".dropdown-content")
  const profileIcon = document.querySelector(".profile-icon")

  if (profileIcon && dropdownContent) {
    profileIcon.addEventListener("click", (event) => {
      event.stopPropagation()
      dropdownContent.style.display = dropdownContent.style.display === "block" ? "none" : "block"
    })

    document.addEventListener("click", (event) => {
      if (!profileDropdown.contains(event.target)) {
        dropdownContent.style.display = "none"
      }
    })
  }

  // Form validation for signup
  const signupForm = document.querySelector(".signup-form")
  if (signupForm) {
    signupForm.addEventListener("submit", (event) => {
      const password = document.getElementById("password")
      const confirmPassword = document.getElementById("confirm_password")
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/

      if (password.value !== confirmPassword.value) {
        event.preventDefault()
        alert("Passwords do not match!")
      } else if (!passwordRegex.test(password.value)) {
        event.preventDefault()
        alert("Password must be at least 8 characters long and include a number and a special character.")
      }
    })
  }

  // Form validation for signup and login
  const loginForm = document.querySelector(".login-form")

  if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
      // Add your login form validation here if needed.
    })
  }
})

