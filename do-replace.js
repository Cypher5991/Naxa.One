const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Hero background from fixed to absolute
html = html.replace(
    /<!-- Background Video Loop with True Parallax \(Fixed\) -->\s*<div class="fixed top-0 left-0 w-full h-screen overflow-hidden pointer-events-none -z-10 hero-video-bg">/,
    '<!-- Background Video Loop with True Parallax -->\n        <div class="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0 hero-video-bg">'
);

// 2. Add video background to calculator and change styling
html = html.replace(
    /<section id="calculator" class="py-12 relative z-10 bg-slate-50">\s*<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">\s*<div class="text-center mb-12 animate-on-scroll">\s*<h2 class="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Try the <span class="text-gradient">Mini-Audit<\/span><\/h2>\s*<p class="text-slate-600 text-sm font-medium">Rate your current business operations \(1 = Non-Existent, 5 = Fully Optimized\)\. See where you stand instantly\.<\/p>\s*<\/div>\s*<div class="glass-card rounded-3xl p-6 md:p-10 animate-on-scroll shadow-xl">/,
    `<section id="calculator" class="py-12 relative z-10 overflow-hidden bg-slate-900">
        <!-- Video Background for Slider Section -->
        <div class="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0 calc-video-bg">
            <video class="w-[300%] md:w-full h-[300%] md:h-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full object-cover opacity-50" autoplay loop muted playsinline aria-hidden="true">
                <source src="slider_bg.mp4" type="video/mp4">
            </video>
            <div class="absolute inset-0 bg-slate-900/60 z-[4]"></div>
        </div>
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-12 animate-on-scroll relative z-10">
                <h2 class="text-3xl md:text-4xl font-extrabold text-white mb-4">Try the <span class="text-emerald-400">Mini-Audit</span></h2>
                <p class="text-slate-300 text-sm font-medium">Rate your current business operations (1 = Non-Existent, 5 = Fully Optimized). See where you stand instantly.</p>
            </div>
            <div class="glass-card rounded-3xl p-6 md:p-10 animate-on-scroll shadow-2xl relative z-10 bg-white/95 backdrop-blur-xl border border-white/20">`
);

// 3. Update Parallax Script
html = html.replace(
    /\/\/ Hero Parallax Scroll Effect into Next Section\s*const heroVideo = document\.querySelector\('\.hero-video-bg'\);\s*if \(heroVideo && scrollY < 900\) {\s*heroVideo\.style\.transform = `translateY\(\${scrollY \* 0\.3}px\)`;\s*}/,
    `// Parallax Scroll Effect for Hero and Calculator Videos
            const heroVideo = document.querySelector('.hero-video-bg');
            if (heroVideo && scrollY < 900) {
                heroVideo.style.transform = \`translateY(\${scrollY * 0.4}px)\`;
            }
            const calcVideo = document.querySelector('.calc-video-bg');
            const calcSection = document.getElementById('calculator');
            if (calcVideo && calcSection) {
                const rect = calcSection.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    const offset = (window.innerHeight - rect.top) * 0.2;
                    calcVideo.style.transform = \`translateY(\${offset}px)\`;
                }
            }`
);

fs.writeFileSync('index.html', html);
console.log('Done replacement script');
