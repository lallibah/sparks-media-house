(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&r(n)}).observe(document,{childList:!0,subtree:!0});function i(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(e){if(e.ep)return;e.ep=!0;const o=i(e);fetch(e.href,o)}})();const c=[{id:"1",title:"Cinematic Storytelling",category:"Videography",thumbnail:"./public/assets/hero_bg.png",description:"Premium brand documentary for high-end lifestyle fashion."},{id:"2",title:"Dramatic Horizons",category:"Photography",thumbnail:"./public/assets/wedding.png",description:"Professional landscape photography captured during the golden hour."},{id:"3",title:"The Golden Hour",category:"Photography",thumbnail:"https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&w=800&q=80",description:"Wedding photography session in the cliffs."},{id:"4",title:"Tech Launch 2024",category:"Videography",thumbnail:"https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=800&q=80",description:"Event coverage and highlight reel for industry leaders."},{id:"5",title:"Nature Documentaries",category:"Videography",thumbnail:"https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=800&q=80",description:"Short film series exploring untouched landscapes."},{id:"6",title:"Architectural Essence",category:"Photography",thumbnail:"https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",description:"Capturing the modern lines of city skyscrapers."}];document.addEventListener("DOMContentLoaded",()=>{l(),d()});function l(){const a=document.getElementById("portfolioGrid");a&&c.forEach((t,i)=>{const r=document.createElement("div");r.className="portfolio-card fade-in",r.style.animationDelay=`${i*.1}s`,r.innerHTML=`
            <div class="portfolio-image-wrapper">
                <img src="${t.thumbnail}" alt="${t.title}" loading="lazy">
                <div class="portfolio-overlay">
                    <span class="category">${t.category}</span>
                    <h3>${t.title}</h3>
                    <p>${t.description}</p>
                </div>
            </div>
        `,a.appendChild(r)})}function d(){const a=new IntersectionObserver(t=>{t.forEach(i=>{i.isIntersecting&&i.target.classList.add("visible")})},{threshold:.1});document.querySelectorAll(".section").forEach(t=>{a.observe(t)})}const s=document.createElement("style");s.textContent=`
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
`;document.head.appendChild(s);
