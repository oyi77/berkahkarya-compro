// Specific JavaScript for FlashRobs Trading Bot portfolio
document.addEventListener('DOMContentLoaded', function() {
    // Performance chart
    const performanceChart = document.getElementById('performanceChart');
    if (performanceChart) {
        new Chart(performanceChart, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [
                    {
                        label: 'FlashRobs Performance',
                        data: [0, 3.2, 5.8, 8.1, 10.5, 12.9, 14.2, 15.8, 16.9, 17.5, 18.2, 18.7],
                        borderColor: '#2962FF',
                        backgroundColor: 'rgba(41, 98, 255, 0.1)',
                        borderWidth: 3,
                        tension: 0.4,
                        fill: true
                    },
                    {
                        label: 'Market Benchmark',
                        data: [0, 1.1, 2.3, 3.5, 4.2, 5.1, 5.8, 6.2, 6.9, 7.5, 8.1, 8.5],
                        borderColor: '#ccc',
                        backgroundColor: 'rgba(204, 204, 204, 0.1)',
                        borderWidth: 2,
                        tension: 0.4,
                        fill: true
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
                        callbacks: {
                            label: function(context) {
                                let label = context.dataset.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                if (context.parsed.y !== null) {
                                    label += context.parsed.y + '%';
                                }
                                return label;
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            callback: function(value) {
                                return value + '%';
                            }
                        },
                        title: {
                            display: true,
                            text: 'Return (%)'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Month'
                        }
                    }
                }
            }
        });
    }
    
    // Performance calculator
    const calculateBtn = document.getElementById('calculateBtn');
    if (calculateBtn) {
        calculateBtn.addEventListener('click', function() {
            const initialInvestment = parseFloat(document.getElementById('initialInvestment').value) || 10000;
            const timeHorizon = parseInt(document.getElementById('timeHorizon').value) || 3;
            const riskProfile = document.getElementById('riskProfile').value || 'moderate';
            
            // Calculate returns based on risk profile
            let annualReturn;
            let riskLevel;
            
            switch(riskProfile) {
                case 'conservative':
                    annualReturn = 0.12; // 12%
                    riskLevel = 'Low';
                    break;
                case 'aggressive':
                    annualReturn = 0.24; // 24%
                    riskLevel = 'High';
                    break;
                case 'moderate':
                default:
                    annualReturn = 0.187; // 18.7%
                    riskLevel = 'Moderate';
            }
            
            // Calculate compound returns
            const finalValue = initialInvestment * Math.pow(1 + annualReturn, timeHorizon);
            const totalReturn = ((finalValue - initialInvestment) / initialInvestment) * 100;
            
            // Update results
            document.getElementById('finalValue').textContent = '$' + finalValue.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            document.getElementById('projectedReturn').textContent = totalReturn.toFixed(1) + '%';
            document.getElementById('annualizedReturn').textContent = (annualReturn * 100).toFixed(1) + '%';
            document.getElementById('riskLevel').textContent = riskLevel;
        });
    }
    
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
});
