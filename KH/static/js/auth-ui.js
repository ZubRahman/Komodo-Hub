document.addEventListener("DOMContentLoaded", () => {
  // Check if user is logged in based on body data attribute
  const isLoggedIn = document.body.getAttribute("data-logged-in") === "True"
  const userType = document.body.getAttribute("data-user-type")

  console.log("Auth UI initialized. Logged in:", isLoggedIn, "User type:", userType)

  // Get auth buttons container
  const authButtons = document.querySelector(".auth-buttons")

  if (authButtons) {
    if (isLoggedIn) {
      // User is logged in, show profile dropdown
      authButtons.innerHTML = `
                <div class="profile-dropdown">
                    <button class="profile-icon" aria-label="Profile">
                        <i class="fas fa-user-circle"></i>
                    </button>
                    <div class="profile-dropdown-content">
                        ${
                          userType === "admin"
                            ? '<a href="/admin">Admin Dashboard</a>'
                            : '<a href="/account">My Account</a>'
                        }
                        <a href="/logout">Logout</a>
                    </div>
                </div>
            `
    } else {
      // User is not logged in, show login/signup buttons
      authButtons.innerHTML = `
                <a href="/login" class="btn btn-login">Login</a>
                <a href="/signup" class="btn btn-register">Sign Up</a>
            `
    }
  }
})
