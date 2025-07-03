// Specific JavaScript for SEO Optimization portfolio
document.addEventListener('DOMContentLoaded', function() {
    // Before-After slider functionality
    const sliders = document.querySelectorAll('.before-after-slider');
    
    sliders.forEach(slider => {
        const handle = slider.querySelector('.slider-handle');
        const afterImage = slider.querySelector('.after-image');
        
        if (!handle || !afterImage) return;
        
        let isDragging = false;
        
        // Mouse events
        handle.addEventListener('mousedown', startDrag);
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', endDrag);
        
        // Touch events for mobile
        handle.addEventListener('touchstart', startDrag);
        document.addEventListener('touchmove', drag);
        document.addEventListener('touchend', endDrag);
        
        function startDrag(e) {
            e.preventDefault();
            isDragging = true;
        }
        
        function drag(e) {
            if (!isDragging) return;
            
            let x;
            
            if (e.type === 'touchmove') {
                x = e.touches[0].clientX;
            } else {
                x = e.clientX;
            }
            
            const sliderRect = slider.getBoundingClientRect();
            const sliderWidth = sliderRect.width;
            const sliderLeft = sliderRect.left;
            
            let position = (x - sliderLeft) / sliderWidth * 100;
            
            // Constrain position between 0% and 100%
            position = Math.max(0, Math.min(100, position));
            
            // Update slider position
            afterImage.style.width = `${position}%`;
            handle.style.left = `${position}%`;
        }
        
        function endDrag() {
            isDragging = false;
        }
    });
    
    // Animate stats on scroll
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const animateStats = () => {
        statNumbers.forEach(stat => {
            const value = parseFloat(stat.textContent);
            const suffix = stat.textContent.replace(/[0-9.]/g, '');
            
            if (isElementInViewport(stat) && !stat.classList.contains('animated')) {
                stat.classList.add('animated');
                
                let startValue = 0;
                const duration = 2000;
                const startTime = performance.now();
                
                const updateCounter = (currentTime) => {
                    const elapsedTime = currentTime - startTime;
                    
                    if (elapsedTime < duration) {
                        const progress = elapsedTime / duration;
                        const currentValue = Math.floor(progress * value);
                        stat.textContent = currentValue + suffix;
                        requestAnimationFrame(updateCounter);
                    } else {
                        stat.textContent = value + suffix;
                    }
                };
                
                requestAnimationFrame(updateCounter);
            }
        });
    };
    
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }
    
    window.addEventListener('scroll', animateStats);
    animateStats(); // Initial check
    
    // Tool icons hover effect
    const toolItems = document.querySelectorAll('.tool-item');
    toolItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
});
