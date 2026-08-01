const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Fix the Hero Text & Subtitle
const oldTextRegex = /<h1 class="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-950 mb-6 leading-\[1.08\]">\s*Build Your Digital <span class="bg-gradient-to-r from-blue-700 via-blue-600 to-emerald-600 bg-clip-text text-transparent">Foundation<\/span> From the Ground Up\s*<\/h1>\s*<p class="mt-4 text-base md:text-lg text-slate-800 font-semibold leading-relaxed mb-8">\s*We handle all the complicated digital work so you can focus on running your business. From building custom web platforms to driving organic revenue, we help you own your space.\s*<\/p>/;

const newText = `<h1 class="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-950 mb-6 leading-[1.08]">
                    From Digital Setup to Agentic Scale: We Build & <span class="bg-gradient-to-r from-blue-700 via-blue-600 to-emerald-600 bg-clip-text text-transparent">Accelerate Your Growth Engine</span>
                </h1>
                <p class="mt-4 text-base md:text-lg text-slate-800 font-semibold leading-relaxed mb-8">
                    Whether you are an MSME building your foundational web presence or an Enterprise deploying custom agentic workflows & ERP integrations, we deliver measurable ROI.
                </p>`;

html = html.replace(oldTextRegex, newText);

// 2. Fix the Hero Buttons to trigger modal
const oldBtnsRegex = /<div class="flex flex-col sm:flex-row justify-start gap-4 mb-8">\s*<a href="#calculator" class="bg-blue-700 hover:bg-blue-800 text-white font-bold px-8 py-4 rounded-full transition-all shadow-lg shadow-blue-700\/25 flex items-center justify-center gap-2 transform hover:-translate-y-0.5">\s*Test Your Digital Maturity <i class="fas fa-arrow-right text-sm"><\/i>\s*<\/a>\s*<a href="\/pricing" class="bg-white hover:bg-slate-50 border border-slate-300 text-slate-900 font-bold px-8 py-4 rounded-full transition-all shadow-sm flex items-center justify-center">\s*Explore Retainer Tiers\s*<\/a>\s*<\/div>/;

const newBtns = `<div class="flex flex-col sm:flex-row justify-start gap-4 mb-8">
                    <button onclick="openBookingModal()" class="bg-blue-700 hover:bg-blue-800 text-white font-bold px-8 py-4 rounded-full transition-all shadow-lg shadow-blue-700/25 flex items-center justify-center gap-2 transform hover:-translate-y-0.5">
                        Book a 15-Min Call <i class="fas fa-arrow-right text-sm"></i>
                    </button>
                    <a href="#calculator" class="bg-white hover:bg-slate-50 border border-slate-300 text-slate-900 font-bold px-8 py-4 rounded-full transition-all shadow-sm flex items-center justify-center">
                        Test Digital Maturity
                    </a>
                </div>`;

html = html.replace(oldBtnsRegex, newBtns);

// 3. Try fixing YouTube overlay by adding an explicit high z-index overlay layer over the iframe
const ytOverlayFix = `<div class="absolute inset-0 bg-transparent z-[5] pointer-events-auto"></div>`;
// Place it right after the gradient backdrop blur
html = html.replace(
    '<div class="absolute inset-0 bg-gradient-to-r from-white/40 via-white/20 to-transparent backdrop-blur-[2px]"></div>',
    '<div class="absolute inset-0 bg-gradient-to-r from-white/40 via-white/20 to-transparent backdrop-blur-[2px] z-[4]"></div>\n            ' + ytOverlayFix
);

fs.writeFileSync('index.html', html);
console.log('Hero text and YouTube overlay fixed.');
