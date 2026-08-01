const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

const replacements = [
    {
        oldStr: `        <!-- Background Video Loop with True Parallax (Fixed) -->\n        <div class="fixed top-0 left-0 w-full h-screen overflow-hidden pointer-events-none -z-10 hero-video-bg">`,
        newStr: `        <!-- Background Video Loop with True Parallax -->\n        <div class="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0 hero-video-bg">`
    },
    {
        oldStr: `<section id="calculator" class="py-12 relative z-10 bg-slate-50">`,
        newStr: `<section id="calculator" class="py-12 relative z-10 overflow-hidden bg-slate-900">\n        <!-- Video Background for Slider Section -->\n        <div class="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0 calc-video-bg">\n            <video class="w-[300%] md:w-full h-[300%] md:h-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full object-cover opacity-50" autoplay loop muted playsinline aria-hidden="true">\n                <source src="slider_bg.mp4" type="video/mp4">\n            </video>\n            <div class="absolute inset-0 bg-slate-900/60 z-[4]"></div>\n        </div>`
    },
    {
        oldStr: `<div class="text-center mb-12 animate-on-scroll">\n                <h2 class="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Try the <span class="text-gradient">Mini-Audit</span></h2>\n                <p class="text-slate-600 text-sm font-medium">Rate your current business operations (1 = Non-Existent, 5 = Fully Optimized). See where you stand instantly.</p>\n            </div>\n\n            <div class="glass-card rounded-3xl p-6 md:p-10 animate-on-scroll shadow-xl">`,
        newStr: `<div class="text-center mb-12 animate-on-scroll relative z-10">\n                <h2 class="text-3xl md:text-4xl font-extrabold text-white mb-4">Try the <span class="text-emerald-400">Mini-Audit</span></h2>\n                <p class="text-slate-300 text-sm font-medium">Rate your current business operations (1 = Non-Existent, 5 = Fully Optimized). See where you stand instantly.</p>\n            </div>\n\n            <div class="glass-card rounded-3xl p-6 md:p-10 animate-on-scroll shadow-2xl relative z-10 bg-white/95 backdrop-blur-xl border border-white/20">`
    },
    {
        oldStr: `// Hero Parallax Scroll Effect into Next Section\n            const heroVideo = document.querySelector('.hero-video-bg');\n            if (heroVideo && scrollY < 900) {\n                heroVideo.style.transform = \`translateY(\${scrollY * 0.3}px)\`;\n            }`,
        newStr: `// Parallax Scroll Effect for Hero and Calculator Videos\n            const heroVideo = document.querySelector('.hero-video-bg');\n            if (heroVideo && scrollY < 900) {\n                heroVideo.style.transform = \`translateY(\${scrollY * 0.4}px)\`;\n            }\n            \n            const calcVideo = document.querySelector('.calc-video-bg');\n            const calcSection = document.getElementById('calculator');\n            if (calcVideo && calcSection) {\n                const rect = calcSection.getBoundingClientRect();\n                if (rect.top < window.innerHeight && rect.bottom > 0) {\n                    const offset = (window.innerHeight - rect.top) * 0.2;\n                    calcVideo.style.transform = \`translateY(\${offset}px)\`;\n                }\n            }`
    }
];

let allSuccess = true;
replacements.forEach((rep, i) => {
    if (html.includes(rep.oldStr)) {
        html = html.replace(rep.oldStr, rep.newStr);
        console.log(`Replacement ${i} SUCCESS`);
    } else {
        console.log(`Replacement ${i} FAILED - string not found`);
        allSuccess = false;
    }
});

if (allSuccess) {
    fs.writeFileSync('index.html', html);
    console.log('Saved index.html successfully.');
} else {
    console.log('Did not save due to failures.');
}
