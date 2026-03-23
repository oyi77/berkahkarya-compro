// Shopee & TikTok specific JavaScript for portfolio
// Handles e-commerce related charts and animations

document.addEventListener('DOMContentLoaded', function() {
    // Before-After slider functionality
    const sliders = document.querySelectorAll('.before-after-slider');
    
    if (sliders.length > 0) {
        sliders.forEach(slider => {
            const handle = slider.querySelector('.slider-handle');
            const afterImage = slider.querySelector('.after-image');
            
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
                
                // Get slider bounds
                const sliderRect = slider.getBoundingClientRect();
                const sliderWidth = sliderRect.width;
                
                // Calculate position relative to slider
                let position = x - sliderRect.left;
                
                // Constrain position within slider bounds
                position = Math.max(0, Math.min(position, sliderWidth));
                
                // Convert to percentage
                const percentage = (position / sliderWidth) * 100;
                
                // Update after image width and handle position
                afterImage.style.width = `${percentage}%`;
                handle.style.left = `${percentage}%`;
            }
            
            function endDrag() {
                isDragging = false;
            }
            
            // Initialize slider at 50%
            afterImage.style.width = '50%';
            handle.style.left = '50%';
        });
    }
    
    // Animated platform icons in hero section
    const shopeeIcon = document.querySelector('.shopee-icon');
    const tiktokIcon = document.querySelector('.tiktok-icon');
    
    if (shopeeIcon && tiktokIcon) {
        // Add floating animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes float {
                0% {
                    transform: translateY(0) rotate(-10deg);
                }
                50% {
                    transform: translateY(-10px) rotate(-5deg);
                }
                100% {
                    transform: translateY(0) rotate(-10deg);
                }
            }
            
            @keyframes float2 {
                0% {
                    transform: translateY(0) rotate(10deg);
                }
                50% {
                    transform: translateY(-15px) rotate(15deg);
                }
                100% {
                    transform: translateY(0) rotate(10deg);
                }
            }
            
            .shopee-icon {
                animation: float 4s ease-in-out infinite;
            }
            
            .tiktok-icon {
                animation: float2 5s ease-in-out infinite;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Case study metrics animation
    const resultNumbers = document.querySelectorAll('.result-number');
    
    if (resultNumbers.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const finalValue = parseInt(target.textContent);
                    
                    // Animate number counting up
                    let startValue = 0;
                    const duration = 2000; // ms
                    const step = finalValue / (duration / 16); // 60fps
                    
                    function updateValue() {
                        startValue += step;
                        if (startValue < finalValue) {
                            target.textContent = Math.floor(startValue) + '%';
                            requestAnimationFrame(updateValue);
                        } else {
                            target.textContent = finalValue + '%';
                        }
                    }
                    
                    requestAnimationFrame(updateValue);
                    observer.unobserve(target);
                }
            });
        }, { threshold: 0.5 });
        
        resultNumbers.forEach(number => {
            observer.observe(number);
        });
    }
    
    // Process timeline animation
    const processSteps = document.querySelectorAll('.process-step');
    
    if (processSteps.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });
        
        // Add animation styles
        const style = document.createElement('style');
        style.textContent = `
            .process-step {
                opacity: 0;
                transform: translateY(30px);
                transition: opacity 0.6s ease, transform 0.6s ease;
            }
            
            .process-step.animated {
                opacity: 1;
                transform: translateY(0);
            }
            
            .process-step:nth-child(even) {
                transition-delay: 0.3s;
            }
        `;
        document.head.appendChild(style);
        
        processSteps.forEach(step => {
            observer.observe(step);
        });
    }
});
