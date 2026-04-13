/* ==================== INITIALIZATION ==================== */
document.addEventListener('DOMContentLoaded', function() {
    initAOS();
    initParticles();
    initClock();
    initVisitorCounter();
    initLanguage();
    initScrollProgress();
    initModal();
    initSmoothScroll();
    initNavHighlight();
});

/* ==================== AOS ANIMATION ==================== */
function initAOS() {
    AOS.init({
        duration: 800,
        once: true,
        offset: 50,
        easing: 'ease-out-cubic'
    });
}

/* ==================== PARTICLES BACKGROUND ==================== */
function initParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 3 + 1}px;
            height: ${Math.random() * 3 + 1}px;
            background: rgba(0, 102, 255, ${Math.random() * 0.3 + 0.1});
            border-radius: 50%;
            top: ${Math.random() * 100}%;
            left: ${Math.random() * 100}%;
            animation: floatParticle ${Math.random() * 20 + 10}s linear infinite;
            animation-delay: ${Math.random() * -20}s;
        `;
        particlesContainer.appendChild(particle);
    }
}

// Add particle animation style
const style = document.createElement('style');
style.textContent = `
    @keyframes floatParticle {
        0% { transform: translateY(0) translateX(0); opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { transform: translateY(-100vh) translateX(${Math.random() * 100 - 50}px); opacity: 0; }
    }
`;
document.head.appendChild(style);

/* ==================== LIVE CLOCK (12-HOUR FORMAT) ==================== */
function initClock() {
    function updateClock() {
        const now = new Date();
        let hours = now.getHours();
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        hours = String(hours).padStart(2, '0');
        
        const clockElement = document.getElementById('liveClock');
        const ampmElement = document.getElementById('ampm');
        
        if (clockElement) {
            clockElement.textContent = `${hours}:${minutes}:${seconds}`;
        }
        if (ampmElement) {
            ampmElement.textContent = ampm;
        }
    }
    
    updateClock();
    setInterval(updateClock, 1000);
}

/* ==================== VISITOR COUNTER ==================== */
function initVisitorCounter() {
    const counterElement = document.getElementById('visitorCount');
    if (!counterElement) return;
    
    let count = localStorage.getItem('siteVisitorCount');
    
    if (!count) {
        count = 1247;
    }
    
    count = parseInt(count) + 1;
    localStorage.setItem('siteVisitorCount', count);
    
    // Format with commas
    counterElement.textContent = count.toLocaleString();
}

/* ==================== MULTI-LANGUAGE SYSTEM ==================== */
const translations = {
    fa: {
        views: 'بازدید',
        home: 'خانه',
        portfolio: 'نمونه کارها',
        contact: 'تماس',
        viewProject: 'مشاهده پروژه',
        orderSimilar: 'سفارش نمونه مشابه'
    },
    en: {
        views: 'views',
        home: 'Home',
        portfolio: 'Portfolio',
        contact: 'Contact',
        viewProject: 'View Project',
        orderSimilar: 'Order Similar Sample'
    },
    ps: {
        views: 'لیدنه',
        home: 'کور',
        portfolio: 'نمونې کارونه',
        contact: 'اړیکه',
        viewProject: 'پروژه وګورئ',
        orderSimilar: 'ورته نمونه امر کړئ'
    }
};

let currentLanguage = 'fa';

function initLanguage() {
    const langButtons = document.querySelectorAll('.lang-option');
    
    langButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const lang = this.dataset.lang;
            if (!lang) return;
            
            langButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            currentLanguage = lang;
            updateContent(lang);
        });
    });
}

function updateContent(lang) {
    // Update elements with data attributes
    document.querySelectorAll('[data-fa]').forEach(el => {
        const key = `data-${lang}`;
        if (el.hasAttribute(key)) {
            el.textContent = el.getAttribute(key);
        }
    });
    
    // Update stat label
    const statLabel = document.querySelector('.stat-label');
    if (statLabel) {
        statLabel.textContent = translations[lang].views;
    }
}

/* ==================== SCROLL PROGRESS ==================== */
function initScrollProgress() {
    const progressBar = document.querySelector('.scroll-progress');
    if (!progressBar) return;
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

/* ==================== MODAL SYSTEM ==================== */
const portfolioData = {
    restaurant: {
        title: { fa: 'رستورانت باغ فین', en: 'Bagh-e-Fin Restaurant', ps: 'باغ فین رستورانت' },
        image: 'https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg?auto=compress&cs=tinysrgb&w=800',
        description: {
            fa: 'یک منوی دیجیتال کامل و حرفه‌ای برای رستورانت باغ فین.\n\nویژگی‌ها:\n• نمایش تمام منو با قیمت‌ها\n• دکمه سفارش مستقیم در واتس‌اپ\n• لوکیشن روی گوگل مپ\n• QR Code اختصاصی\n• طراحی کاملاً واکنش‌گرا\n• گالری عکس غذاها',
            en: 'A complete and professional digital menu for Bagh-e-Fin Restaurant.\n\nFeatures:\n• Full menu display with prices\n• Direct WhatsApp order button\n• Google Maps location\n• Custom QR Code\n• Fully responsive design\n• Food photo gallery',
            ps: 'د باغ فین رستورانت لپاره بشپړ او مسلکي ډیجیټل مینو.\n\nځانګړتیاوې:\n• د بیو سره د ټول مینو ښودنه\n• په واټساپ کې مستقیم آرډر تڼۍ\n• په ګوګل میپ کې موقعیت\n• ځانګړی QR کوډ\n• په بشپړ ډول غبرګونیز ډیزاین\n• د خوړو عکس ګالري'
        }
    },
    mobile: {
        title: { fa: 'فروشگاه موبایل آرین', en: 'Arian Mobile Shop', ps: 'آرین موبایل هټۍ' },
        image: 'https://images.pexels.com/photos/404280/pexels-photo-404280.jpeg?auto=compress&cs=tinysrgb&w=800',
        description: {
            fa: 'وب‌سایت فروشگاهی مدرن برای نمایش و فروش موبایل.\n\nویژگی‌ها:\n• گالری محصولات با قیمت\n• نمایش قیمت به افغانی و دالر\n• دکمه استعلام قیمت در واتس‌اپ\n• بخش محصولات ویژه\n• دسته‌بندی برندها\n• طراحی سریع و بهینه',
            en: 'Modern e-commerce website for mobile display and sales.\n\nFeatures:\n• Product gallery with prices\n• Price display in AFN and USD\n• WhatsApp price inquiry button\n• Featured products section\n• Brand categorization\n• Fast and optimized design',
            ps: 'د موبایل ښودنې او پلور لپاره عصري ای کامرس ویب‌سایټ.\n\nځانګړتیاوې:\n• د بیو سره د محصول ګالري\n• په افغانۍ او ډالر د نرخ ښودنه\n• په واټساپ کې د نرخ پوښتنې تڼۍ\n• ځانګړي محصولات برخه\n• د برانډونو ډلبندي\n• چټک او مطلوب ډیزاین'
        }
    },
    hospital: {
        title: { fa: 'شفاخانه تخصصی سینا', en: 'Sina Specialty Hospital', ps: 'سینا تخصصي روغتون' },
        image: 'https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=800',
        description: {
            fa: 'وب‌سایت حرفه‌ای پزشکی برای شفاخانه تخصصی سینا.\n\nویژگی‌ها:\n• معرفی بخش‌های درمانی\n• پروفایل داکتران متخصص\n• سیستم نوبت‌دهی آنلاین\n• اطلاعات تماس و لوکیشن\n• بخش اخبار و مقالات پزشکی\n• طراحی رسمی و قابل اعتماد',
            en: 'Professional medical website for Sina Specialty Hospital.\n\nFeatures:\n• Medical departments introduction\n• Specialist doctor profiles\n• Online appointment system\n• Contact info and location\n• Medical news and articles\n• Formal and trustworthy design',
            ps: 'د سینا تخصصي روغتون لپاره مسلکي طبي ویب‌سایټ.\n\nځانګړتیاوې:\n• د درملنې برخو معرفي\n• د متخصص ډاکټرانو پروفایلونه\n• آنلاین نوبت نیونې سیسټم\n• د اړیکې معلومات او موقعیت\n• طبي خبرونه او مقالې\n• رسمي او د باور وړ ډیزاین'
        }
    }
};

function initModal() {
    const modal = document.getElementById('projectModal');
    const cards = document.querySelectorAll('.portfolio-card');
    
    cards.forEach(card => {
        const button = card.querySelector('.card-link');
        if (button) {
            button.addEventListener('click', (e) => {
                e.stopPropagation();
                const type = card.dataset.type;
                openModal(type);
            });
        }
        
        card.addEventListener('click', () => {
            const type = card.dataset.type;
            openModal(type);
        });
    });
    
    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Close with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

function openModal(type) {
    const modal = document.getElementById('projectModal');
    const title = document.getElementById('modalTitle');
    const body = document.getElementById('modalBody');
    const data = portfolioData[type];
    
    if (!data) return;
    
    title.textContent = data.title[currentLanguage];
    
    body.innerHTML = `
        <img src="${data.image}" alt="${data.title[currentLanguage]}">
        <h4>${data.title[currentLanguage]}</h4>
        <p>${data.description[currentLanguage].replace(/\n/g, '<br>')}</p>
        <div class="modal-cta">
            <a href="https://wa.me/93701334761" target="_blank" class="btn btn-primary">
                <i class="fab fa-whatsapp"></i>
                <span>${translations[currentLanguage].orderSimilar}</span>
            </a>
        </div>
    `;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('projectModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

/* ==================== SMOOTH SCROLL ==================== */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const target = document.querySelector(targetId);
            if (target) {
                const offset = 80;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

/* ==================== NAVIGATION HIGHLIGHT ==================== */
function initNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function highlightNav() {
        const scrollY = window.scrollY;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionBottom = sectionTop + section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollY >= sectionTop && scrollY < sectionBottom) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlight);
    highlight();
}

/* ==================== UTILITY: DEBOUNCE ==================== */
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}