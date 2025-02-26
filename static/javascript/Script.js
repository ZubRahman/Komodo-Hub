<script>
        function toggleMode() {
            // Toggle the 'dark-mode' class on the body element
            document.body.classList.toggle('dark-mode')
            // Change the icon for toggle
            const modeIcon = document.querySelector('.mode-toggle img')
            if (document.body.classList.contains('dark-mode')) {
                modeIcon.src = '../static/images/Lightmode on.png' // Change to sun icon for light mode
                modeIcon.alt = 'Toggle Light Mode'
            } else {
                modeIcon.src = '../static/images/darkmode.png' // Change to moon icon for dark mode
                modeIcon.alt = 'Toggle Dark Mode'
            }
        }
</script>