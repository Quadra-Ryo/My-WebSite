// Theme Management

let currentTheme = 'dark';

/**
 * Initialize theme
 */
function initTheme() {
    // Check for saved theme preference or default to 'dark'
    const savedTheme = localStorage.getItem('portfolioTheme') || 'dark';
    setTheme(savedTheme, false);
    
    // Add event listener to theme button
    on('themeBtn', 'click', toggleTheme);
}

/**
 * Toggle between dark and light theme
 */
function toggleTheme() {
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme, true);
}

/**
 * Set theme
 * @param {string} theme - Theme name ('dark' or 'light')
 * @param {boolean} save - Whether to save preference
 */
function setTheme(theme, save = true) {
    currentTheme = theme;
    document.body.className = theme;
    
    // Update button icon
    const themeBtn = getEl('themeBtn');
    setText(themeBtn, theme === 'dark' ? '☀️' : '🌙');
    
    // Update circuit colors
    updateCircuitColors(theme);
    
    // Save preference
    if (save) {
        localStorage.setItem('portfolioTheme', theme);
    }
}

/**
 * Get current theme
 * @returns {string} Current theme
 */
function getCurrentTheme() {
    return currentTheme;
}
