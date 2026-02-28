/**
 * Berkah Karya - Transitions & Animations
 * Handles smooth visual transitions between pages
 */

const TRANSITIONS = {
    content: null,
    loading: null,

    initElements: function() {
        this.content = document.getElementById('content');
        this.loading = document.getElementById('loading');
    },

    // Fade Out Content
    fadeOut: function() {
        if (!this.content) this.initElements();
        
        return new Promise(resolve => {
            this.content.classList.add('fade-out');
            this.content.classList.remove('fade-in', 'active');
            
            setTimeout(() => {
                this.content.style.opacity = '0';
                resolve();
            }, 300);
        });
    },

    // Fade In Content
    fadeIn: function() {
        if (!this.content) this.initElements();

        return new Promise(resolve => {
            this.content.style.opacity = '0';
            this.content.classList.remove('fade-out');
            
            // Force reflow
            void this.content.offsetWidth;

            this.content.classList.add('fade-in');
            
            requestAnimationFrame(() => {
                this.content.classList.add('active');
                this.content.style.opacity = '1';
                
                setTimeout(() => {
                    resolve();
                }, 300);
            });
        });
    },

    // Show Loading Overlay
    showLoading: function() {
        if (!this.loading) this.initElements();
        this.loading.classList.add('active');
    },

    // Hide Loading Overlay
    hideLoading: function() {
        if (!this.loading) this.initElements();
        this.loading.classList.remove('active');
    }
};
