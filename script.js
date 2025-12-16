document.addEventListener('DOMContentLoaded', () => {

    // Navbar background change on scroll
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Reveal animations on scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Fade in timeline items
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(20px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        observer.observe(item);

        // Custom simple reveal class logic
        item.addEventListener('transitionend', () => {
            if (item.classList.contains('visible')) {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }
        });
    });

    // Simple manual add for demo since we set style inline above
    window.addEventListener('scroll', () => {
        timelineItems.forEach(item => {
            const rect = item.getBoundingClientRect();
            if (rect.top < window.innerHeight - 100) {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }
        });
    });

    // ---------------------------------------------
    // CHART.JS IMPLEMENTATION
    // ---------------------------------------------

    // Common Config
    if (typeof Chart !== 'undefined') {
        Chart.defaults.font.family = "'Inter', sans-serif";
        Chart.defaults.color = '#444';
        Chart.defaults.scale.grid.color = 'rgba(0,0,0,0.05)';

        // 1. Debt vs Revenue (Line Chart)
        const ctxDebt = document.getElementById('debtRevenueChart');
        if (ctxDebt) {
            new Chart(ctxDebt, {
                type: 'line',
                data: {
                    labels: ['2005', '2008', '2011', '2014', '2017', '2020', '2023'],
                    datasets: [
                        {
                            label: 'Gross Debt (£m)',
                            data: [580, 700, 450, 380, 210, 480, 720],
                            borderColor: '#B33A2B', // MUFC Red
                            backgroundColor: '#B33A2B',
                            tension: 0.3,
                            pointRadius: 4,
                            pointHoverRadius: 6
                        },
                        {
                            label: 'Revenue (£m)',
                            data: [150, 250, 320, 430, 580, 500, 650],
                            borderColor: '#111111', // Black
                            backgroundColor: '#111111',
                            tension: 0.3,
                            pointRadius: 4,
                            pointHoverRadius: 6
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    interaction: {
                        mode: 'index',
                        intersect: false,
                    },
                    plugins: {
                        legend: {
                            position: 'top',
                            labels: { usePointStyle: true, boxWidth: 6 }
                        },
                        tooltip: {
                            backgroundColor: 'rgba(0,0,0,0.8)',
                            titleFont: { size: 13 },
                            bodyFont: { size: 13 },
                            padding: 10,
                            cornerRadius: 4,
                            displayColors: true
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: { borderDash: [2, 4] }
                        },
                        x: {
                            grid: { display: false }
                        }
                    }
                }
            });
        }

        // 2. Money Drained (Bar Chart)
        const ctxMoney = document.getElementById('moneyDrainedChart');
        if (ctxMoney) {
            new Chart(ctxMoney, {
                type: 'bar',
                data: {
                    labels: ['2006-2010', '2011-2015', '2016-2020', '2021-2023'],
                    datasets: [
                        {
                            label: 'Interest & Finance Costs (£m)',
                            data: [260, 240, 120, 100],
                            backgroundColor: '#B33A2B',
                            borderRadius: 4
                        },
                        {
                            label: 'Dividends Paid (£m)',
                            data: [0, 0, 110, 45],
                            backgroundColor: '#111111',
                            borderRadius: 4
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'top',
                            labels: { usePointStyle: true, boxWidth: 6 }
                        },
                        tooltip: {
                            backgroundColor: 'rgba(0,0,0,0.8)',
                            padding: 10,
                            cornerRadius: 4
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            grid: { borderDash: [2, 4] }
                        },
                        x: {
                            grid: { display: false }
                        }
                    }
                }
            });
        }
    }
});
