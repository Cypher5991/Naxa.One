const fs = require('fs');

const files = ['index.html', 'pricing.html', 'ecommerce.html', 'content.html', 'seo.html', 'smm.html'];

files.forEach(file => {
    if (!fs.existsSync(file)) return;
    let html = fs.readFileSync(file, 'utf8');

    // 1. Mobile-First CSS Enhancements
    const mobileCSS = `
        /* Mobile-First Touch & UX Optimizations */
        @media (max-width: 640px) {
            body { font-size: 15px; }
            button, a.btn, input, select, textarea { min-height: 48px; }
            .hero-content-box { padding-top: 1rem; padding-bottom: 2rem; }
            ::-webkit-scrollbar { width: 4px; }
        }
        
        /* Touch feedback active state */
        button:active, a:active { transform: scale(0.97); transition: transform 0.1s ease; }

        /* Custom Touch Slider Thumb */
        input[type=range]::-webkit-slider-thumb {
            height: 28px !important;
            width: 28px !important;
            margin-top: -11px !important;
        }
    `;

    if (!html.includes('Mobile-First Touch & UX Optimizations')) {
        html = html.replace('</style>', mobileCSS + '\n</style>');
    }

    // 2. Mobile Responsive Typography in Hero
    html = html.replace(
        /text-4xl md:text-6xl lg:text-7xl/g,
        'text-3xl sm:text-5xl md:text-6xl lg:text-7xl'
    );
    
    // 3. Mobile Modal Behavior (Bottom Sheet feel on small screens)
    html = html.replace(
        /max-w-md w-full shadow-2xl relative border border-slate-200/g,
        'max-w-md w-full shadow-2xl relative border border-slate-200 max-h-[92vh] overflow-y-auto rounded-3xl sm:rounded-3xl p-6 sm:p-8'
    );
    html = html.replace(
        /max-w-lg w-full shadow-2xl relative border border-slate-200/g,
        'max-w-lg w-full shadow-2xl relative border border-slate-200 max-h-[92vh] overflow-y-auto rounded-3xl sm:rounded-3xl p-6 sm:p-8'
    );

    // 4. Hero Stats Sizing on Mobile
    html = html.replace(
        /text-3xl md:text-4xl font-extrabold text-slate-950/g,
        'text-2xl sm:text-4xl font-extrabold text-slate-950'
    );

    // 5. Floating WhatsApp Button Mobile Safe Area & Compact Size
    html = html.replace(
        /fixed bottom-6 right-6 z-40/g,
        'fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40'
    );

    fs.writeFileSync(file, html);
});

console.log('Mobile-first UI/UX optimizations applied across all pages.');
