/**
 * Berkah Karya - Dynamic SPA Router
 * Handles navigation, content loading, and state management
 */

const APP = {
    currentPage: null,
    cache: new Map(),
    
    // Initialize application
    init: function() {
        console.log('App Initializing...');
        
        // Handle initial load
        this.handleRoute();
        
        // Handle navigation events
        window.addEventListener('hashchange', () => this.handleRoute());
        
        // Handle browser back/forward
        window.addEventListener('popstate', (e) => {
            if (e.state) {
                this.loadContent(e.state.page, false);
            }
        });

        // Load Footer Once
        this.loadFooter();
    },

    // Handle routing logic
    handleRoute: function() {
        let hash = window.location.hash.replace('#', '');
        
        // Default route
        if (!hash) hash = 'home';
        
        this.loadContent(hash);
    },

    // Load content dynamically
    loadContent: async function(pageName, pushState = true) {
        // Don't reload if already on page (unless it's initial load)
        if (this.currentPage === pageName && document.getElementById('content').innerHTML.trim() !== '') {
            return;
        }

        console.log(`Loading page: ${pageName}`);
        
        // Show loading indicator
        TRANSITIONS.showLoading();

        try {
            let html;

            // Check cache first
            if (this.cache.has(pageName)) {
                html = this.cache.get(pageName);
            } else {
                // Fetch content
                const response = await fetch(`sections/${pageName}-section.html`);
                
                if (!response.ok) {
                    throw new Error(`Page not found: ${pageName}`);
                }
                
                html = await response.text();
                this.cache.set(pageName, html);
            }

            // Perform transition
            await TRANSITIONS.fadeOut();
            
            // Update DOM
            document.getElementById('content').innerHTML = html;
            this.currentPage = pageName;
            
            // Update URL history
            if (pushState) {
                history.pushState({page: pageName}, null, `#${pageName}`);
            }

            // Update active nav link
            this.updateNavigation(pageName);

            // Update Page Title
            document.title = `Berkah Karya - ${pageName.charAt(0).toUpperCase() + pageName.slice(1)}`;

            // Re-initialize any scripts needed for the new content
            this.initializePageScripts(pageName);

            // Transition In
            await TRANSITIONS.fadeIn();
            
            // Scroll to top
            window.scrollTo({top: 0, behavior: 'smooth'});

        } catch (error) {
            console.error('Error loading page:', error);
            document.getElementById('content').innerHTML = `
                <div class="container py-5 text-center" style="margin-top: 100px;">
                    <h2>Error 404</h2>
                    <p>Halaman tidak ditemukan.</p>
                    <a href="#home" onclick="navigateTo('home'); return false;" class="btn btn-primary">Kembali ke Home</a>
                </div>
            `;
            TRANSITIONS.hideLoading();
            await TRANSITIONS.fadeIn();
        } finally {
            TRANSITIONS.hideLoading();
        }
    },

    // Load Footer (Static part)
    loadFooter: async function() {
        try {
            const response = await fetch('sections/footer-section.html');
            if (response.ok) {
                const html = await response.text();
                document.getElementById('footer-container').innerHTML = html;
            }
        } catch (error) {
            console.error('Error loading footer:', error);
        }
    },

    // Update navigation active state
    updateNavigation: function(pageName) {
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${pageName}`) {
                link.classList.add('active');
            }
        });
        
        // Close mobile menu if open
        const navbarCollapse = document.getElementById('navbarNav');
        if (navbarCollapse.classList.contains('show')) {
            const bsCollapse = new bootstrap.Collapse(navbarCollapse);
            bsCollapse.hide();
        }
    },

    // Initialize scripts specific to pages
    initializePageScripts: function(pageName) {
        // Smooth scroll for internal links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                const target = this.getAttribute('href');
                // Only if it's NOT a navigation link (which are handled by router)
                // Navigation links usually start with # but map to pages
                // Internal anchors might be #something-on-page
                if (target.startsWith('#') && !['#home', '#services', '#portfolio', '#pricing', '#contact'].includes(target)) {
                    const element = document.querySelector(target);
                    if (element) {
                        e.preventDefault();
                        element.scrollIntoView({ behavior: 'smooth' });
                    }
                }
            });
        });

        // Init specific page logic
        if (pageName === 'pricing') {
             // Attach ROI calculator logic if needed
        }
    }
};

// Start App when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    APP.init();
});

// Global function for navigation (can be used in HTML onClick)
window.navigateTo = function(page) {
    // If it's a string, use it
    if (typeof page === 'string') {
        APP.loadContent(page);
    }
    // Prevent default anchor behavior
    return false;
};
