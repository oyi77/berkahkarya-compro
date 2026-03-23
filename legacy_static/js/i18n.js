// Language toggle functionality for Berkah Karya
// Default language: Indonesian (id)

(function() {
    'use strict';
    
    let currentLang = localStorage.getItem('lang') || 'id';
    let translations = {};
    
    // Load translations from JSON file
    async function loadTranslations() {
        try {
            const response = await fetch('js/i18n.json');
            if (!response.ok) throw new Error('Failed to load translations');
            translations = await response.json();
            applyTranslations();
        } catch (error) {
            console.error('Translation error:', error);
        }
    }
    
    // Apply translations to all elements with data-i18n attributes
    function applyTranslations() {
        const lang = translations[currentLang];
        if (!lang) return;

        // Text content translations
        document.querySelectorAll('[data-i18n]').forEach(function(el) {
            const key = el.getAttribute('data-i18n');
            if (lang[key]) {
                el.textContent = lang[key];
            }
        });

        // HTML content translations (for special characters like &copy;)
        document.querySelectorAll('[data-i18n-html]').forEach(function(el) {
            const key = el.getAttribute('data-i18n-html');
            if (lang[key]) {
                el.innerHTML = lang[key];
            }
        });

        // Placeholder translations
        document.querySelectorAll('[data-i18n-placeholder]').forEach(function(el) {
            const key = el.getAttribute('data-i18n-placeholder');
            if (lang[key]) {
                el.placeholder = lang[key];
            }
        });
        
        // Update language toggle button
        const langBtn = document.getElementById('lang-toggle');
        if (langBtn) {
            langBtn.textContent = currentLang === 'id' ? 'EN' : 'ID';
        }
    }
    
    // Toggle language between Indonesian and English
    window.toggleLanguage = function() {
        currentLang = currentLang === 'id' ? 'en' : 'id';
        localStorage.setItem('lang', currentLang);
        applyTranslations();
    };
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadTranslations);
    } else {
        loadTranslations();
    }
})();
