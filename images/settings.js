document.addEventListener("DOMContentLoaded", function() {
    // Get elements
    const themeSelect = document.getElementById('theme');
    const languageSelect = document.getElementById('language');
    const textSizeRange = document.getElementById('textSize');
    const mobileViewCheckbox = document.getElementById('mobileView');
    const accountDetailsCheckbox = document.getElementById('accountDetails');
  
    // Load settings from localStorage or use defaults
    themeSelect.value = localStorage.getItem('theme') || 'light';
    languageSelect.value = localStorage.getItem('language') || 'en';
    textSizeRange.value = localStorage.getItem('textSize') || 16;
    mobileViewCheckbox.checked = JSON.parse(localStorage.getItem('mobileView')) || false;
    accountDetailsCheckbox.checked = JSON.parse(localStorage.getItem('accountDetails')) || false;
  
    // Apply settings
    applySettings();
  
    // Event listeners
    themeSelect.addEventListener('change', applySettings);
    languageSelect.addEventListener('change', applySettings);
    textSizeRange.addEventListener('input', applySettings);
    mobileViewCheckbox.addEventListener('change', applySettings);
    accountDetailsCheckbox.addEventListener('change', applySettings);
  
    // Function to apply settings
    function applySettings() {
      // Theme
      document.body.classList = themeSelect.value;
      localStorage.setItem('theme', themeSelect.value);
  
      // Language
      localStorage.setItem('language', languageSelect.value);
  
      // Text size
      document.body.style.fontSize = textSizeRange.value + 'px';
      localStorage.setItem('textSize', textSizeRange.value);
  
      // Mobile view
      if (mobileViewCheckbox.checked) {
        // Apply mobile view styles
      } else {
        // Remove mobile view styles
      }
      localStorage.setItem('mobileView', mobileViewCheckbox.checked);
  
      // Account details
      if (accountDetailsCheckbox.checked) {
        // Show account details
      } else {
        // Hide account details
      }
      document.addEventListener("DOMContentLoaded", function() {
        const themeSelect = document.getElementById('theme');
      
        // Load theme from local storage or use default
        const savedTheme = localStorage.getItem('theme');
        const defaultTheme = 'light'; // Change this to your preferred default theme
        const currentTheme = savedTheme || defaultTheme;
      
        // Apply theme on page load
        applyTheme(currentTheme);
      
        // Change theme when user selects a different option
        themeSelect.addEventListener('change', function() {
          const selectedTheme = themeSelect.value;
          applyTheme(selectedTheme);
          localStorage.setItem('theme', selectedTheme); // Save theme preference to local storage
        });
      
        // Function to apply theme
        function applyTheme(theme) {
          document.body.classList.remove('light-mode', 'dark-mode');
          document.body.classList.add(theme + '-mode');
        }
      });
      
      localStorage.setItem('accountDetails', accountDetailsCheckbox.checked);
    }
  });
  