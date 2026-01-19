// Main Application

/**
 * Initialize the application
 */
function init() {
    console.log('🚀 Portfolio inizializzato');
    
    // Create background particles
    createParticles();
    
    // Initialize modules
    initTheme();
    initLanguage();
    initNavigation();
    
    console.log('✅ Tutti i moduli caricati');
}

/**
 * Run when DOM is ready
 */
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

/**
 * Handle page visibility changes
 * Pause animations when page is hidden for better performance
 */
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        console.log('⏸️ Pagina nascosta - animazioni in pausa');
    } else {
        console.log('▶️ Pagina visibile - animazioni riprese');
    }
});

/**
 * Handle window resize for responsive adjustments
 */
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        console.log('📐 Finestra ridimensionata');
    }, 250);
});

/**
 * Keyboard shortcuts
 */
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + K: Toggle theme
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        toggleTheme();
        console.log('⌨️ Tema cambiato con shortcut');
    }
    
    // Ctrl/Cmd + L: Toggle language
    if ((e.ctrlKey || e.metaKey) && e.key === 'l') {
        e.preventDefault();
        toggleLanguage();
        console.log('⌨️ Lingua cambiata con shortcut');
    }
});

// Export for debugging in console
window.portfolio = {
    getCurrentTheme,
    getCurrentLanguage,
    getCurrentSection,
    setTheme,
    setLanguage,
    switchSection
};

console.log('💡 Usa window.portfolio per accedere alle funzioni in console');
