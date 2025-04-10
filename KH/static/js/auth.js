document.addEventListener("DOMContentLoaded", () => {
  // Check if user is logged in
  const body = document.body
  const isLoggedIn = body.getAttribute("data-logged-in") === "True"
  const userType = body.getAttribute("data-user-type")

  if (isLoggedIn) {
    // Get the auth buttons container
    const authButtonsContainer = document.querySelector(".auth-buttons")

    if (authButtonsContainer) {
      // Remove existing login/signup buttons
      authButtonsContainer.innerHTML = ""

      // Create profile icon with dropdown
      const profileContainer = document.createElement("div")
      profileContainer.className = "profile-container"

      const profileIcon = document.createElement("a")
      profileIcon.href = userType === "admin" ? "/admin" : "/account"
      profileIcon.className = "profile-icon"
      profileIcon.innerHTML = '<i class="fas fa-user-circle"></i>'

      const dropdown = document.createElement("div")
      dropdown.className = "profile-dropdown"

      // Add dropdown items based on user type
      if (userType === "admin") {
        dropdown.innerHTML = `
                    <a href="/admin">Admin Dashboard</a>
                    <a href="/logout">Logout</a>
                `
      } else {
        dropdown.innerHTML = `
                    <a href="/account">My Account</a>
                    <a href="/account_settings">Settings</a>
                    <a href="/logout">Logout</a>
                `
      }

      profileContainer.appendChild(profileIcon)
      profileContainer.appendChild(dropdown)
      authButtonsContainer.appendChild(profileContainer)

      // Add CSS for profile icon and dropdown
      const style = document.createElement("style")
      style.textContent = `
                .profile-container {
                    position: relative;
                }
                
                .profile-icon {
                    font-size: 24px;
                    color: #4caf50;
                    cursor: pointer;
                }
                
                .profile-dropdown {
                    position: absolute;
                    top: 100%;
                    right: 0;
                    background-color: white;
                    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
                    border-radius: 4px;
                    min-width: 150px;
                    display: none;
                    z-index: 1000;
                }
                
                .profile-container:hover .profile-dropdown {
                    display: block;
                }
                
                .profile-dropdown a {
                    display: block;
                    padding: 10px 15px;
                    color: #333;
                    text-decoration: none;
                    transition: background-color 0.2s;
                }
                
                .profile-dropdown a:hover {
                    background-color: #f5f5f5;
                }
            `
      document.head.appendChild(style)
    }
  }
})
