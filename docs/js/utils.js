// Utility Functions

/**
 * Create floating particles for background animation
 */
function createParticles() {
    const container = document.getElementById('particles');
    
    // Reduce particle count on mobile for better performance
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 8 : 15;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Use viewport-relative positioning for better mobile support
        const vw = window.innerWidth;
        const vh = window.innerHeight;
        
        // Position particles within viewport bounds
        particle.style.left = Math.random() * vw + 'px';
        particle.style.top = Math.random() * vh + 'px';
        particle.style.animation = `float ${10 + Math.random() * 10}s infinite ease-in-out`;
        particle.style.animationDelay = Math.random() * 5 + 's';
        container.appendChild(particle);
    }
    
    // Reposition particles on resize
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            container.innerHTML = '';
            createParticles();
        }, 500);
    });
}

/**
 * Update circuit colors based on current theme
 * @param {string} theme - Current theme ('dark' or 'light')
 */
function updateCircuitColors(theme) {
    const paths = document.querySelectorAll('.circuit-path');
    const nodes = document.querySelectorAll('.circuit-node');
    const color = theme === 'dark' ? '#d28b08' : '#064bbb';
    
    paths.forEach(path => path.setAttribute('stroke', color));
    nodes.forEach(node => node.setAttribute('fill', color));
}

/**
 * Calculate duration between two dates in years and months
 * @param {string} startDate - Start date in format MM/YYYY
 * @param {string} endDate - End date in format MM/YYYY or 'Presente'/'Present'
 * @returns {string} Duration string (e.g., "1 anno e 5 mesi")
 */
function calculateDuration(startDate, endDate) {
    const lang = getCurrentLanguage();
    
    // Parse start date
    const [startMonth, startYear] = startDate.split('/').map(Number);
    const start = new Date(startYear, startMonth - 1);
    
    // Parse end date (current date if "Presente"/"Present")
    let end;
    if (endDate === 'Presente' || endDate === 'Present') {
        end = new Date();
    } else {
        const [endMonth, endYear] = endDate.split('/').map(Number);
        end = new Date(endYear, endMonth - 1);
    }
    
    // Calculate difference
    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    
    // Adjust if months is negative
    if (months < 0) {
        years--;
        months += 12;
    }
    
    // Format duration string
    const parts = [];
    
    if (years > 0) {
        if (lang === 'it') {
            parts.push(years === 1 ? '1 anno' : `${years} anni`);
        } else {
            parts.push(years === 1 ? '1 year' : `${years} years`);
        }
    }
    
    if (months > 0) {
        if (lang === 'it') {
            parts.push(months === 1 ? '1 mese' : `${months} mesi`);
        } else {
            parts.push(months === 1 ? '1 month' : `${months} months`);
        }
    }
    
    // If less than a month
    if (parts.length === 0) {
        return lang === 'it' ? 'Meno di un mese' : 'Less than a month';
    }
    
    return parts.join(lang === 'it' ? ' e ' : ' and ');
}

/**
 * Parse period string and calculate duration
 * @param {string} period - Period string in format "MM/YYYY - MM/YYYY" or "MM/YYYY - Presente"
 * @returns {string} Duration string or empty if can't parse
 */
function parsePeriodDuration(period) {
    // Match pattern: MM/YYYY - MM/YYYY or MM/YYYY - Presente/Present
    const match = period.match(/(\d{2}\/\d{4})\s*-\s*(.+)/);
    if (!match) return '';
    
    const startDate = match[1];
    const endDate = match[2].trim();
    
    return calculateDuration(startDate, endDate);
}

/**
 * Render about section
 * @param {Object} aboutData - About section data
 */
function renderAbout(aboutData) {
    const container = document.getElementById('section-about');
    const content = portfolioData[getCurrentLanguage()];
    const translations = content.translations;
    
    const interestsHTML = aboutData.interests.map(interest => `
        <div class="interest-card">
            <div class="interest-icon">${interest.icon}</div>
            <h4 class="interest-title">${interest.title}</h4>
            <p class="interest-description">${interest.description}</p>
        </div>
    `).join('');
    
    container.innerHTML = `
        <div class="about-content">
            <div class="about-description">
                <p>${aboutData.description}</p>
                <p class="availability-note"><strong>💼 ${translations.availability}:</strong> ${aboutData.availability}</p>
            </div>
            <div class="interests-grid">
                ${interestsHTML}
            </div>
        </div>
    `;
}

/**
 * Render live section with real-time stats
 * @param {Object} liveData - Live section data
 */
function renderLive(liveData) {
    const container = document.getElementById('section-live');
    
    const cardsHTML = liveData.cards.map(card => {
        let cardContent = '';
        
        if (card.type === 'spotify') {
            const playlistDescription = card.description ? `<p class="playlist-description">${card.description}</p>` : '';
            cardContent = `
                <div class="live-card-content spotify-card">
                    ${playlistDescription}
                    <div id="spotify-content">
                        <div class="loading-spinner"></div>
                    </div>
                </div>
            `;
        } else if (card.type === 'current-project') {
            const project = liveData.currentProject;
            const tagsHTML = project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('');
            
            cardContent = `
                <div class="live-card-content current-project-content">
                    <div class="project-image-container">
                        <img src="${project.image}" alt="${project.title}" class="project-image" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22200%22 height=%22200%22%3E%3Crect fill=%22%2322d3ee%22 width=%22200%22 height=%22200%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-family=%22monospace%22 font-size=%2260%22 fill=%22%23ffffff%22%3E🚀%3C/text%3E%3C/svg%3E'">
                    </div>
                    <div class="project-info">
                        <h4 class="project-title">${project.title}</h4>
                        <div class="project-tags">${tagsHTML}</div>
                        <p class="project-description">${project.description}</p>
                        <div class="project-footer">
                            <span class="project-status">📍 ${project.status}</span>
                        </div>
                    </div>
                </div>
            `;
        }
        
        return `
            <div class="live-card ${card.type}-card">
                <div class="live-card-header">
                    <span class="live-card-icon">${card.icon}</span>
                    <h3 class="live-card-title">${card.title}</h3>
                </div>
                ${cardContent}
            </div>
        `;
    }).join('');
    
    container.innerHTML = `
        <div class="live-content">
            <div class="live-description">
                <p>${liveData.description}</p>
            </div>
            <div class="live-cards-grid">
                ${cardsHTML}
            </div>
        </div>
    `;
    
    // Load live data
    loadLiveData();
}

/**
 * Load live data from APIs
 */
async function loadLiveData() {
    // Load Spotify data
    loadSpotifyData();
    
    // Current project is already loaded from data.js, no need for async loading
}

/**
 * Load Spotify embed
 */
async function loadSpotifyData() {
    const container = document.getElementById('spotify-content');
    
    // Spotify playlist embed
    const playlistId = '1XsiNi45jYCN2F32VZaMyn';
    
    container.innerHTML = `
        <iframe
            title="Spotify Embed: Recommendation Playlist"
            src="https://open.spotify.com/embed/playlist/${playlistId}?utm_source=generator&theme=0"
            width="100%"
            height="500"
            style="border-radius: 12px; border: none;"
            frameborder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy">
        </iframe>
    `;
}

/**
 * Render content section with items
 * @param {string} section - Section name ('projects', 'career', or 'education')
 * @param {Array} items - Array of items to render
 */
function renderSection(section, items) {
    const container = document.getElementById('section-' + section);
    const content = portfolioData[getCurrentLanguage()];
    const translations = content.translations;
    
    const itemsHTML = items.map(item => {
        if (section === 'projects') {
            const linksHTML = item.links ? `
                <div class="project-links">
                    ${item.links.github ? `<a href="${item.links.github}" target="_blank" rel="noopener noreferrer" class="project-link">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                        </svg>
                        ${translations.sourceCode}
                    </a>` : ''}
                    ${item.links.live ? `<a href="${item.links.live}" target="_blank" rel="noopener noreferrer" class="project-link">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                            <polyline points="15 3 21 3 21 9"></polyline>
                            <line x1="10" y1="14" x2="21" y2="3"></line>
                        </svg>
                        ${translations.liveDemo}
                    </a>` : ''}
                </div>
            ` : '';
            
            return `
                <div class="item">
                    <h3>${item.name}</h3>
                    <p class="meta">${item.tech}</p>
                    <p class="description">${item.description}</p>
                    ${linksHTML}
                </div>
            `;
        } else if (section === 'career') {
            const companyHTML = item.companyUrl 
                ? `<a href="${item.companyUrl}" target="_blank" rel="noopener noreferrer" class="company-link">${item.company}</a>`
                : item.company;
            
            // Calculate duration
            const duration = parsePeriodDuration(item.period);
            const durationHTML = duration ? ` • <span class="duration">${duration}</span>` : '';
            
            const robotsHTML = item.robots ? `
                <details class="robots-dropdown">
                    <summary class="robots-summary">🤖 ${translations.robotsWorkedWith}</summary>
                    <div class="robots-list">
                        ${item.robots.map(robot => `
                            <div class="robot-item">
                                <span class="robot-brand">${robot.brand}</span>
                                <span class="robot-tech">${robot.tech}</span>
                            </div>
                        `).join('')}
                    </div>
                </details>
            ` : '';
            
            return `
                <div class="item">
                    <h3>${item.role}</h3>
                    <p class="meta">${companyHTML} • ${item.period}${durationHTML}</p>
                    <p class="description">${item.description}</p>
                    ${robotsHTML}
                </div>
            `;
        } else {
            const institutionHTML = (item.company || item.institution).replace(/<a /g, '<a class="company-link" ');
            return `
                <div class="item">
                    <h3>${item.role || item.degree}</h3>
                    <p class="meta">${institutionHTML} • ${item.period}</p>
                    <p class="description">${item.description}</p>
                </div>
            `;
        }
    }).join('');
    
    container.innerHTML = `<div class="items">${itemsHTML}</div>`;
}

/**
 * Get element by ID (shorthand)
 * @param {string} id - Element ID
 * @returns {HTMLElement}
 */
function getEl(id) {
    return document.getElementById(id);
}

/**
 * Get all elements by selector
 * @param {string} selector - CSS selector
 * @returns {NodeList}
 */
function getEls(selector) {
    return document.querySelectorAll(selector);
}

/**
 * Add event listener to element
 * @param {string|HTMLElement} element - Element or element ID
 * @param {string} event - Event name
 * @param {Function} handler - Event handler
 */
function on(element, event, handler) {
    const el = typeof element === 'string' ? getEl(element) : element;
    if (el) {
        el.addEventListener(event, handler);
    }
}

/**
 * Toggle class on element
 * @param {HTMLElement} element - Target element
 * @param {string} className - Class name to toggle
 * @param {boolean} force - Force add or remove
 */
function toggleClass(element, className, force) {
    element.classList.toggle(className, force);
}

/**
 * Set text content of element
 * @param {string|HTMLElement} element - Element or element ID
 * @param {string} text - Text content
 */
function setText(element, text) {
    const el = typeof element === 'string' ? getEl(element) : element;
    if (el) {
        el.textContent = text;
    }
}
