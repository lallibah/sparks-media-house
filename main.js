// main.js
import portfolioData from './data/portfolio.json' assert { type: 'json' };

document.addEventListener('DOMContentLoaded', () => {
    initPortfolio();
    initScrollAnimations();
});

function initPortfolio() {
    const grid = document.getElementById('portfolioGrid');
    if (!grid) return;

    portfolioData.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'portfolio-card fade-in';
        card.style.animationDelay = `${index * 0.1}s`;

        card.innerHTML = `
            <div class="portfolio-image-wrapper">
                <img src="${item.thumbnail}" alt="${item.title}" loading="lazy">
                <div class="portfolio-overlay">
                    <span class="category">${item.category}</span>
                    <h3>${item.title}</h3>
                    <p>${item.description}</p>
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}

function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.section').forEach(section => {
        observer.observe(section);
    });
}

// Add these styles dynamically for the cards
const style = document.createElement('style');
style.textContent = `
    .portfolio-card {
        position: relative;
        overflow: hidden;
        aspect-ratio: 16/10;
        cursor: pointer;
        background: #111;
    }

    .portfolio-image-wrapper {
        width: 100%;
        height: 100%;
        transition: transform 0.8s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .portfolio-card img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        filter: grayscale(0.5);
        transition: all 0.5s ease;
    }

    .portfolio-overlay {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        padding: 2rem;
        background: linear-gradient(transparent, rgba(0,0,0,0.9));
        transform: translateY(20px);
        opacity: 0;
        transition: all 0.4s ease;
    }

    .portfolio-card:hover .portfolio-image-wrapper {
        transform: scale(1.05);
    }

    .portfolio-card:hover img {
        filter: grayscale(0);
    }

    .portfolio-card:hover .portfolio-overlay {
        transform: translateY(0);
        opacity: 1;
    }

    .portfolio-overlay h3 {
        color: var(--color-accent);
        margin-bottom: 0.5rem;
    }

    .portfolio-overlay .category {
        font-size: 0.7rem;
        text-transform: uppercase;
        letter-spacing: 0.2em;
        color: #fff;
        opacity: 0.6;
    }
`;
document.head.appendChild(style);
