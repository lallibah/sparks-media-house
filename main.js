// main.js
import portfolioData from './data/portfolio.json' assert { type: 'json' };

document.addEventListener('DOMContentLoaded', () => {
    initPortfolio();
    initScrollAnimations();
    initHeaderScroll();
    initMobileMenu();
    initContactForm();
    initCalendar();
});

function initCalendar() {
    const container = document.getElementById('calendar-container');
    if (!container) return;

    if (typeof flatpickr !== 'undefined') {
        flatpickr(container, {
            inline: true,
            dateFormat: "Y-m-d",
            minDate: "today",
            theme: "dark",
            onChange: function (selectedDates, dateStr, instance) {
                const dateInput = document.getElementById('date');
                if (dateInput) dateInput.value = dateStr;
            }
        });
    } else {
        // Fallback for slower connections
        window.addEventListener('load', () => {
            if (typeof flatpickr !== 'undefined') {
                flatpickr(container, {
                    inline: true,
                    dateFormat: "Y-m-d",
                    minDate: "today",
                    theme: "dark",
                    onChange: function (selectedDates, dateStr, instance) {
                        const dateInput = document.getElementById('date');
                        if (dateInput) dateInput.value = dateStr;
                    }
                });
            }
        });
    }
}

function initContactForm() {
    const form = document.getElementById('contact-form');
    const status = document.getElementById('form-status');
    const btn = document.getElementById('submit-btn');

    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Visual feedback
        btn.disabled = true;
        btn.innerText = 'SENDING...';
        status.className = 'form-status';
        status.innerText = '';

        const formData = new FormData(form);

        try {
            // Using Formspree (User needs to replace with actual endpoint)
            const response = await fetch('https://formspree.io/f/mqakvjnd', {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                status.innerText = 'Thank you! Your inquiry has been sent. We will reach out shortly.';
                status.classList.add('success');
                form.reset();
            } else {
                throw new Error('Server error');
            }
        } catch (err) {
            status.innerText = 'Oops! Something went wrong. Please try again or email us directly.';
            status.classList.add('error');
        } finally {
            btn.disabled = false;
            btn.innerText = 'SEND INQUIRY';
        }
    });
}

function initMobileMenu() {
    const toggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const megaMenuToggle = document.querySelector('.has-mega-menu');

    if (toggle && navLinks) {
        toggle.addEventListener('click', () => {
            toggle.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', (e) => {
                if (!link.classList.contains('nav-item') || !link.parentElement.classList.contains('has-mega-menu')) {
                    toggle.classList.remove('active');
                    navLinks.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        });
    }

    if (megaMenuToggle) {
        const megaLink = megaMenuToggle.querySelector('.nav-item');
        megaLink.addEventListener('click', (e) => {
            if (window.innerWidth <= 968) {
                e.preventDefault();
                megaMenuToggle.classList.toggle('active');
            }
        });
    }
}

function initPortfolio() {
    const grid = document.getElementById('portfolioGrid');
    if (!grid) return;

    portfolioData.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'portfolio-card reveal';
        card.style.transitionDelay = `${(index % 3) * 0.1}s`;

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
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.15 });

    // Observe sections and any element with 'reveal' class
    document.querySelectorAll('.section, .reveal, .portfolio-card').forEach(el => {
        observer.observe(el);
    });
}

function initHeaderScroll() {
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Inline Styles for Portfolio Cards (Premium Look)
const style = document.createElement('style');
style.textContent = `
    #portfolioGrid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
        gap: 2rem;
    }

    .portfolio-card {
        position: relative;
        overflow: hidden;
        aspect-ratio: 16/10;
        cursor: pointer;
        background: #111;
        opacity: 0;
        transform: translateY(30px);
        transition: all 1s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .portfolio-card.active {
        opacity: 1;
        transform: translateY(0);
    }

    .portfolio-image-wrapper {
        width: 100%;
        height: 100%;
        transition: transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .portfolio-card img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        filter: grayscale(0.5);
        transition: all 0.8s ease;
    }

    .portfolio-overlay {
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        padding: 2.5rem;
        background: linear-gradient(transparent, rgba(0,0,0,0.95));
        transform: translateY(20px);
        opacity: 0;
        transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
        height: 100%;
    }

    .portfolio-card:hover .portfolio-image-wrapper {
        transform: scale(1.08);
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
        font-size: 1.4rem;
        margin-bottom: 0.5rem;
        font-family: 'Outfit', sans-serif;
        text-transform: uppercase;
        letter-spacing: 0.1em;
    }

    .portfolio-overlay .category {
        font-size: 0.7rem;
        text-transform: uppercase;
        letter-spacing: 0.25em;
        color: #fff;
        opacity: 0.6;
        margin-bottom: 0.5rem;
    }

    .portfolio-overlay p {
        font-size: 0.85rem;
        color: #ccc;
        line-height: 1.4;
    }
`;
document.head.appendChild(style);
