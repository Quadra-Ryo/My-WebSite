// Navigation Management

let currentSection = 'career';

/**
 * Initialize navigation
 */
function initNavigation() {
    // Add click listeners to all tabs
    getEls('.tab').forEach(tab => {
        on(tab, 'click', () => {
            const section = tab.dataset.section;
            switchSection(section);
        });
    });
    
    // Set initial section
    switchSection('career');
}

/**
 * Switch to a different section
 * @param {string} section - Section name ('projects', 'career', or 'education')
 */
function switchSection(section) {
    currentSection = section;
    
    // Update tabs
    getEls('.tab').forEach(tab => {
        const isActive = tab.dataset.section === section;
        toggleClass(tab, 'active', isActive);
        
        // Update ARIA attributes for accessibility
        tab.setAttribute('aria-selected', isActive);
    });
    
    // Update content sections
    getEls('.content-section').forEach(contentSection => {
        const isActive = contentSection.id === 'section-' + section;
        toggleClass(contentSection, 'active', isActive);
        
        // Update ARIA attributes for accessibility
        contentSection.setAttribute('aria-hidden', !isActive);
    });
}

/**
 * Get current active section
 * @returns {string} Current section name
 */
function getCurrentSection() {
    return currentSection;
}
