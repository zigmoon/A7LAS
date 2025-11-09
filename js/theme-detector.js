// Relocated from root to js/theme-detector.js
// Système de thème ultra-simple - UNE SEULE ICÔNE
document.addEventListener('DOMContentLoaded', function() {
  const themeToggle = document.getElementById('theme-toggle');
  if (!themeToggle) return;
  function setTheme(isDark) {
    if (isDark) {
      document.body.classList.remove('light-mode');
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.add('light-mode');
      localStorage.setItem('theme', 'light');
    }
  }
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const isDark = savedTheme ? savedTheme === 'dark' : prefersDark;
  setTheme(isDark);
  themeToggle.addEventListener('click', function() {
    const isDarkMode = !document.body.classList.contains('light-mode');
    setTheme(!isDarkMode);
  });
});
