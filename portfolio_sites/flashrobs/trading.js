// Specific JavaScript for FlashRobs Trading Bot portfolio
// Handles trading-specific charts and animations

document.addEventListener('DOMContentLoaded', function() {
    // Performance chart (placeholder)
    const performanceChartContainer = document.querySelector('.chart-container');
    if (performanceChartContainer) {
        const ctx = document.createElement('canvas');
        ctx.id = 'performanceChart';
        performanceChartContainer.innerHTML = '';
        performanceChartContainer.appendChild(ctx);
        
        const performanceChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                datasets: [{
                    label: 'FlashRobs Performance',
                    data: [5.2, 7.8, 6.3, 9.1, 8.4, 12.7, 10.9, 14.2, 13.5, 15.8, 18.2, 20.1],
                    borderColor: '#F7931A',
                    backgroundColor: 'rgba(247, 147, 26, 0.1)',
                    borderWidth: 2,
                    tension: 0.4,
                    fill: true
                }, {
                    label: 'Market Average',
                    data: [3.1, 2.8, 4.3, 3.9, 2.4, 5.7, 4.9, 6.2, 5.5, 7.8, 8.2, 9.1],
                    borderColor: '#627EEA',
                    backgroundColor: 'rgba(98, 126, 234, 0.1)',
                    borderWidth: 2,
                    tension: 0.4,
                    fill: true
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top',
                    },
                    tooltip: {
                        mode: 'index',
                        intersect: false,
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
                            text: '2024'
                        }
                    }
                }
            }
        });
    }
    
    // Case study charts
    const caseStudyCharts = document.querySelectorAll('.case-study-chart');
    if (caseStudyCharts.length > 0) {
        caseStudyCharts.forEach((container, index) => {
            const ctx = document.createElement('canvas');
            ctx.id = 'caseStudyChart' + index;
            container.innerHTML = '';
            container.appendChild(ctx);
            
            // Different data for each case study
            let data, labels, colors;
            
            if (index === 0) {
                // Forex trader case study
                labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
                data = [10000, 10800, 11500, 12200, 13100, 14200];
                colors = {
                    border: '#F7931A',
                    background: 'rgba(247, 147, 26, 0.1)'
                };
            } else {
                // Crypto investor case study
                labels = ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                data = [5000, 5600, 6300, 7100, 8200, 9500];
                colors = {
                    border: '#627EEA',
                    background: 'rgba(98, 126, 234, 0.1)'
                };
            }
            
            const chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Account Balance ($)',
                        data: data,
                        borderColor: colors.border,
                        backgroundColor: colors.background,
                        borderWidth: 2,
                        tension: 0.4,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return '$' + context.parsed.y.toLocaleString();
                                }
                            }
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: false,
                            ticks: {
                                callback: function(value) {
                                    return '$' + value.toLocaleString();
                                }
                            }
                        }
                    }
                }
            });
        });
    }
    
    // Animated trading elements in hero section
    const chartElement = document.querySelector('.chart-element');
    const botElement = document.querySelector('.bot-element');
    
    if (chartElement) {
        // Create a simple candlestick chart visualization
        chartElement.innerHTML = `
            <div style="width: 100%; height: 100%; padding: 10px; display: flex; align-items: flex-end; justify-content: space-between;">
                <div class="candle up"></div>
                <div class="candle down"></div>
                <div class="candle up"></div>
                <div class="candle down"></div>
                <div class="candle up"></div>
                <div class="candle up"></div>
                <div class="candle down"></div>
                <div class="candle up"></div>
            </div>
        `;
        
        // Add styles for candlesticks
        const style = document.createElement('style');
        style.textContent = `
            .candle {
                width: 10px;
                margin: 0 2px;
                position: relative;
            }
            .candle:before {
                content: '';
                position: absolute;
                top: -5px;
                left: 50%;
                width: 1px;
                background-color: #333;
                transform: translateX(-50%);
            }
            .candle:after {
                content: '';
                position: absolute;
                bottom: -5px;
                left: 50%;
                width: 1px;
                background-color: #333;
                transform: translateX(-50%);
            }
            .candle.up {
                background-color: #4caf50;
                height: 40px;
            }
            .candle.up:before {
                height: 10px;
            }
            .candle.up:after {
                height: 5px;
            }
            .candle.down {
                background-color: #ff5252;
                height: 30px;
            }
            .candle.down:before {
                height: 5px;
            }
            .candle.down:after {
                height: 10px;
            }
        `;
        document.head.appendChild(style);
    }
    
    if (botElement) {
        // Create a simple robot visualization
        botElement.innerHTML = `
            <div style="width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;">
                <div class="robot">
                    <div class="robot-head"></div>
                    <div class="robot-eyes">
                        <div class="robot-eye"></div>
                        <div class="robot-eye"></div>
                    </div>
                    <div class="robot-antenna"></div>
                </div>
            </div>
        `;
        
        // Add styles for robot
        const style = document.createElement('style');
        style.textContent = `
            .robot {
                position: relative;
                width: 80px;
                height: 80px;
            }
            .robot-head {
                width: 60px;
                height: 60px;
                background-color: #F7931A;
                border-radius: 10px;
                position: absolute;
                top: 10px;
                left: 10px;
            }
            .robot-eyes {
                position: absolute;
                top: 25px;
                left: 15px;
                width: 50px;
                display: flex;
                justify-content: space-between;
                z-index: 2;
            }
            .robot-eye {
                width: 15px;
                height: 15px;
                background-color: white;
                border-radius: 50%;
                position: relative;
            }
            .robot-eye:after {
                content: '';
                position: absolute;
                width: 7px;
                height: 7px;
                background-color: #333;
                border-radius: 50%;
                top: 4px;
                left: 4px;
            }
            .robot-antenna {
                position: absolute;
                top: -10px;
                left: 30px;
                width: 4px;
                height: 15px;
                background-color: #627EEA;
                z-index: 1;
            }
            .robot-antenna:after {
                content: '';
                position: absolute;
                top: -5px;
                left: -3px;
                width: 10px;
                height: 10px;
                background-color: #627EEA;
                border-radius: 50%;
            }
        `;
        document.head.appendChild(style);
        
        // Add blinking animation
        setInterval(() => {
            const eyes = document.querySelectorAll('.robot-eye');
            eyes.forEach(eye => {
                eye.style.height = '1px';
                setTimeout(() => {
                    eye.style.height = '15px';
                }, 200);
            });
        }, 3000);
    }
});
