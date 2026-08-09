const fs = require('fs');

const originalHtml = fs.readFileSync('index.html', 'utf8');

// Extract scripts
const scriptRegex = /<script>([\s\S]*?)<\/script>/g;
let scripts = [];
let match;
while ((match = scriptRegex.exec(originalHtml)) !== null) {
    if (!match[1].includes('tailwind.config')) { // don't grab tailwind cdn config if present
        scripts.push(match[0]);
    }
}

// Ensure the theme script is in the head, and others at the end
const themeScript = `
    <script>
        (function() {
            const stored = localStorage.getItem('theme');
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            if (stored === 'dark' || (!stored && prefersDark)) {
                document.documentElement.classList.add('dark');
            }
        })();
    </script>`;

const otherScripts = scripts.filter(s => !s.includes('localStorage.getItem(\'theme\')')).join('\n');

const newHtml = `<!DOCTYPE html>
<html lang="en" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Naxa.One | Enterprise Digital Solutions</title>
    <meta name="description" content="Digital setup, scale-up, and agentic workflows for Indian enterprises.">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="styles.css">
    ${themeScript}
</head>
<body class="bg-slate-white text-text-primary dark:bg-navy-900 dark:text-slate-200 transition-colors duration-300">

    <!-- Preloader -->
    <div id="preloader" class="fixed inset-0 z-[100] bg-navy-900 flex flex-col items-center justify-center transition-opacity duration-700">
        <div class="relative w-48 h-1.5 bg-navy-800 rounded-full overflow-hidden mb-4">
            <div id="loader-bar" class="absolute top-0 left-0 h-full bg-gold-500 w-0 transition-all duration-300 rounded-full"></div>
        </div>
        <p class="text-xs text-slate-400 font-bold uppercase tracking-widest mt-4">Loading Assets...</p>
    </div>

    <!-- Navigation -->
    <nav id="navbar" class="fixed w-full z-50 transition-all duration-300 py-4 bg-navy-900/90 backdrop-blur-md border-b border-navy-800">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between items-center">
                <a href="/" class="flex items-center gap-3">
                    <img src="logo.png" alt="Naxa.One Logo" class="w-10 h-10 object-contain rounded">
                    <span class="font-extrabold text-xl tracking-tight text-white">Naxa<span class="text-gold-500">.</span>One</span>
                </a>

                <div class="hidden md:flex items-center space-x-8" id="desktop-nav-links">
                    <a href="#hubs" class="text-sm font-bold text-slate-300 hover:text-gold-400 transition-colors">Capabilities</a>
                    <a href="#work" class="text-sm font-bold text-slate-300 hover:text-gold-400 transition-colors">Work</a>
                    <a href="#philosophy" class="text-sm font-bold text-slate-300 hover:text-gold-400 transition-colors">Philosophy</a>
                    <a href="#calculator" class="text-sm font-bold text-slate-300 hover:text-gold-400 transition-colors">Audit</a>
                </div>

                <div class="flex items-center gap-4">
                    <button onclick="openBookingModal()" class="hidden sm:inline-flex bg-gold-500 hover:bg-gold-600 text-navy-900 font-bold px-5 py-2.5 rounded-sm text-sm transition-all shadow-lg shadow-gold-500/20" id="nav-discovery-btn">Book 15-Min Call</button>
                    
                    <!-- Theme Toggle -->
                    <button id="theme-toggle" aria-label="Toggle Light and Dark Mode" onclick="toggleTheme()" class="w-10 h-10 flex items-center justify-center rounded-sm border border-navy-700 bg-navy-800 hover:bg-navy-700 text-slate-300 hover:text-gold-400 transition-all">
                        <i class="fas fa-sun hidden dark:block"></i>
                        <i class="fas fa-moon block dark:hidden"></i>
                    </button>

                    <button id="nav-hamburger-btn" aria-label="Toggle Navigation Menu" class="md:hidden w-10 h-10 flex items-center justify-center rounded-sm border border-navy-700 bg-navy-800 text-white transition-all">
                        <i class="fas fa-bars"></i>
                    </button>
                </div>
            </div>
        </div>
    </nav>

    <!-- Mobile Drawer -->
    <div id="nav-drawer" class="fixed inset-0 z-[60] bg-navy-900/95 backdrop-blur-lg hidden flex flex-col pt-24 px-8">
        <div class="flex justify-end mb-8">
            <button id="close-drawer-btn" class="text-white text-3xl">&times;</button>
        </div>
        <div class="flex flex-col gap-6">
            <a href="#hubs" class="text-2xl font-bold text-white hover:text-gold-400 transition-colors drawer-link">Capabilities</a>
            <a href="#work" class="text-2xl font-bold text-white hover:text-gold-400 transition-colors drawer-link">Work</a>
            <a href="#philosophy" class="text-2xl font-bold text-white hover:text-gold-400 transition-colors drawer-link">Philosophy</a>
            <a href="#calculator" class="text-2xl font-bold text-white hover:text-gold-400 transition-colors drawer-link">Mini-Audit</a>
            <button onclick="openBookingModal(); document.getElementById('nav-drawer').classList.add('hidden');" class="mt-8 bg-gold-500 text-navy-900 font-bold py-4 rounded-sm text-center w-full">Book 15-Min Call</button>
        </div>
    </div>

    <!-- 1. HERO SECTION -->
    <section class="relative min-h-screen flex items-center pt-24 pb-16 overflow-hidden">
        <video autoplay loop muted playsinline class="hero-video-bg absolute inset-0 w-full h-full object-cover z-0">
            <source src="slider_bg.mp4" type="video/mp4">
        </video>
        <div class="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy-900/90 to-navy-900/40 z-0"></div>
        <div class="absolute inset-0 bg-navy-900/30 z-0"></div>
        
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full mt-10">
            <div class="max-w-3xl">
                <div class="inline-flex items-center gap-2 px-3 py-1 bg-navy-800/80 border border-gold-500/30 rounded-sm mb-6">
                    <span class="w-2 h-2 rounded-full bg-gold-500 animate-pulse"></span>
                    <span class="text-xs font-bold text-gold-400 uppercase tracking-widest">Enterprise Digital Partner</span>
                </div>
                
                <h1 class="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white leading-[1.1] mb-6">
                    <span id="typewriter-target" class="text-gold-500">Accelerate Your Growth</span>
                    <span class="typewriter-cursor text-gold-400">|</span>
                </h1>
                
                <p class="text-lg sm:text-xl text-slate-300 mb-10 max-w-xl leading-relaxed">
                    We bridge the gap between executive vision and flawless execution for India's leading MSMEs and enterprise pods.
                </p>
                
                <div class="flex flex-col sm:flex-row gap-4 mb-16">
                    <button onclick="openBookingModal()" class="bg-gold-500 hover:bg-gold-600 text-navy-900 font-bold px-8 py-4 rounded-sm transition-all text-center flex items-center justify-center gap-2">
                        Book Strategy Call <i class="fas fa-arrow-right"></i>
                    </button>
                    <a href="#work" class="bg-navy-800/80 hover:bg-navy-700 text-white border border-navy-700 font-bold px-8 py-4 rounded-sm transition-all text-center">
                        View Selected Work
                    </a>
                </div>
                
                <!-- Stat Strip -->
                <div class="grid grid-cols-2 md:grid-cols-3 gap-8 pt-8 border-t border-navy-800/50">
                    <div>
                        <div class="text-2xl font-extrabold text-white">150+</div>
                        <div class="text-xs text-slate-400 uppercase tracking-wider mt-1">Platforms Built</div>
                    </div>
                    <div>
                        <div class="text-2xl font-extrabold text-white">3.8x</div>
                        <div class="text-xs text-slate-400 uppercase tracking-wider mt-1">Avg. Growth</div>
                    </div>
                    <div class="hidden md:block">
                        <div class="text-2xl font-extrabold text-white">98%</div>
                        <div class="text-xs text-slate-400 uppercase tracking-wider mt-1">Client Retention</div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- 2. CLIENT TRUST BAR -->
    <section class="py-6 bg-navy-900 border-y border-navy-800 overflow-hidden relative z-20 shadow-inner">
        <div class="marquee-track flex whitespace-nowrap gap-12 animate-marquee items-center text-xs font-bold tracking-widest text-slate-400 uppercase">
            <div class="flex gap-12 items-center opacity-70">
                <span>Bharti Corp <span class="text-gold-500 mx-4">•</span></span>
                <span>Vega Retail <span class="text-gold-500 mx-4">•</span></span>
                <span>Krishna ERP <span class="text-gold-500 mx-4">•</span></span>
                <span>Meridian Co. <span class="text-gold-500 mx-4">•</span></span>
                <span>Nexo Trade <span class="text-gold-500 mx-4">•</span></span>
                <span>Sigma Labs <span class="text-gold-500 mx-4">•</span></span>
            </div>
            <div class="flex gap-12 items-center opacity-70">
                <span>Bharti Corp <span class="text-gold-500 mx-4">•</span></span>
                <span>Vega Retail <span class="text-gold-500 mx-4">•</span></span>
                <span>Krishna ERP <span class="text-gold-500 mx-4">•</span></span>
                <span>Meridian Co. <span class="text-gold-500 mx-4">•</span></span>
                <span>Nexo Trade <span class="text-gold-500 mx-4">•</span></span>
                <span>Sigma Labs <span class="text-gold-500 mx-4">•</span></span>
            </div>
        </div>
    </section>

    <!-- 3. SELECTED WORK -->
    <section id="work" class="py-28 bg-white dark:bg-navy-900 relative z-10 border-b border-slate-200 dark:border-navy-800">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-end justify-between mb-16 pb-6 border-b border-slate-200 dark:border-navy-800">
                <div>
                    <p class="text-xs font-bold uppercase tracking-widest text-gold-600 dark:text-gold-500 mb-3">Selected Work</p>
                    <h2 class="text-4xl md:text-5xl font-extrabold text-navy-900 dark:text-white leading-tight">What We've Built</h2>
                </div>
            </div>
            
            <div class="divide-y divide-slate-200 dark:divide-navy-800 border-t border-slate-200 dark:border-navy-800">
                <!-- Work 1 -->
                <div class="group relative flex flex-col md:flex-row justify-between py-12 md:py-16 transition-all hover:bg-slate-50 dark:hover:bg-navy-800/50 -mx-4 px-4">
                    <div class="absolute left-0 top-0 bottom-0 w-1 bg-gold-500 scale-y-0 group-hover:scale-y-100 transition-transform origin-top"></div>
                    <div class="flex items-start gap-8 md:gap-12 flex-1">
                        <span class="text-sm font-extrabold text-slate-300 dark:text-navy-700 tabular-nums w-8 mt-1">01</span>
                        <div>
                            <div class="flex flex-wrap gap-2 mb-4">
                                <span class="text-[10px] font-bold uppercase tracking-wider text-navy-600 dark:text-slate-400 border border-slate-300 dark:border-navy-700 px-2 py-1 rounded-sm">eCommerce + ERP</span>
                            </div>
                            <h3 class="text-2xl md:text-3xl font-extrabold text-navy-900 dark:text-white mb-2">Regional Garment Retailer</h3>
                            <p class="text-sm text-slate-600 dark:text-slate-400">Tally ERP Middleware · WhatsApp API · Next.js · GA4 Attribution</p>
                        </div>
                    </div>
                    <div class="flex flex-col justify-center mt-6 md:mt-0 text-left md:text-right">
                        <div class="text-4xl md:text-5xl font-extrabold text-gold-600 dark:text-gold-500">4.1×</div>
                        <div class="text-xs text-slate-500 dark:text-slate-400 mt-2 font-bold uppercase tracking-wider">Revenue Growth</div>
                    </div>
                </div>
                <!-- Work 2 -->
                <div class="group relative flex flex-col md:flex-row justify-between py-12 md:py-16 transition-all hover:bg-slate-50 dark:hover:bg-navy-800/50 -mx-4 px-4">
                    <div class="absolute left-0 top-0 bottom-0 w-1 bg-gold-500 scale-y-0 group-hover:scale-y-100 transition-transform origin-top"></div>
                    <div class="flex items-start gap-8 md:gap-12 flex-1">
                        <span class="text-sm font-extrabold text-slate-300 dark:text-navy-700 tabular-nums w-8 mt-1">02</span>
                        <div>
                            <div class="flex flex-wrap gap-2 mb-4">
                                <span class="text-[10px] font-bold uppercase tracking-wider text-navy-600 dark:text-slate-400 border border-slate-300 dark:border-navy-700 px-2 py-1 rounded-sm">SEO + Analytics</span>
                            </div>
                            <h3 class="text-2xl md:text-3xl font-extrabold text-navy-900 dark:text-white mb-2">B2B Industrial Supplier</h3>
                            <p class="text-sm text-slate-600 dark:text-slate-400">Technical SEO · GA4 Dashboard · CRM Integration</p>
                        </div>
                    </div>
                    <div class="flex flex-col justify-center mt-6 md:mt-0 text-left md:text-right">
                        <div class="text-4xl md:text-5xl font-extrabold text-gold-600 dark:text-gold-500">₹22L</div>
                        <div class="text-xs text-slate-500 dark:text-slate-400 mt-2 font-bold uppercase tracking-wider">New Pipeline / Qtr</div>
                    </div>
                </div>
                <!-- Work 3 -->
                <div class="group relative flex flex-col md:flex-row justify-between py-12 md:py-16 transition-all hover:bg-slate-50 dark:hover:bg-navy-800/50 -mx-4 px-4">
                    <div class="absolute left-0 top-0 bottom-0 w-1 bg-gold-500 scale-y-0 group-hover:scale-y-100 transition-transform origin-top"></div>
                    <div class="flex items-start gap-8 md:gap-12 flex-1">
                        <span class="text-sm font-extrabold text-slate-300 dark:text-navy-700 tabular-nums w-8 mt-1">03</span>
                        <div>
                            <div class="flex flex-wrap gap-2 mb-4">
                                <span class="text-[10px] font-bold uppercase tracking-wider text-navy-600 dark:text-slate-400 border border-slate-300 dark:border-navy-700 px-2 py-1 rounded-sm">Full Retainer</span>
                            </div>
                            <h3 class="text-2xl md:text-3xl font-extrabold text-navy-900 dark:text-white mb-2">MSME Food Brand</h3>
                            <p class="text-sm text-slate-600 dark:text-slate-400">Brand Identity · eCommerce · Social Media · WhatsApp</p>
                        </div>
                    </div>
                    <div class="flex flex-col justify-center mt-6 md:mt-0 text-left md:text-right">
                        <div class="text-4xl md:text-5xl font-extrabold text-gold-600 dark:text-gold-500">98%</div>
                        <div class="text-xs text-slate-500 dark:text-slate-400 mt-2 font-bold uppercase tracking-wider">Client Retention</div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- 4. PHILOSOPHY -->
    <section id="philosophy" class="py-28 bg-[#F7F8FA] dark:bg-[#0D1B2A] relative z-10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 lg:grid-cols-2 shadow-2xl">
                <!-- Left Dark -->
                <div class="bg-navy-900 p-12 md:p-20 relative overflow-hidden flex flex-col justify-between min-h-[500px]">
                    <div class="absolute -top-32 -left-32 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl pointer-events-none"></div>
                    <img src="formal_discussion.webp" class="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-overlay" alt="Team Discussion" loading="lazy">
                    <div class="relative z-10">
                        <p class="text-xs font-bold uppercase tracking-widest text-gold-500 mb-6">Our Philosophy</p>
                        <h2 class="text-4xl md:text-6xl font-extrabold text-white leading-tight">Why most<br>digital projects<br><span class="text-gold-500">fail.</span></h2>
                    </div>
                    <div class="relative z-10 mt-12 bg-navy-800/80 backdrop-blur border border-navy-700 p-6 rounded-sm">
                        <p class="text-slate-300 font-medium">Most agencies create dependency. We build your capability instead — build, automate, train.</p>
                    </div>
                </div>
                <!-- Right Light -->
                <div class="bg-white dark:bg-navy-800 p-12 md:p-20 flex flex-col justify-center divide-y divide-slate-100 dark:divide-navy-700">
                    <div class="py-8 flex gap-6">
                        <div class="w-12 h-12 rounded-full border border-gold-500 flex items-center justify-center flex-shrink-0 bg-gold-50 dark:bg-gold-500/10">
                            <i class="fas fa-link-slash text-gold-600 dark:text-gold-400"></i>
                        </div>
                        <div>
                            <h3 class="font-extrabold text-navy-900 dark:text-white text-xl mb-2">Siloed Systems</h3>
                            <p class="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">Your CRM, Tally, and web platform don't talk to each other. Manual entry eats hours every day.</p>
                        </div>
                    </div>
                    <div class="py-8 flex gap-6">
                        <div class="w-12 h-12 rounded-full border border-gold-500 flex items-center justify-center flex-shrink-0 bg-gold-50 dark:bg-gold-500/10">
                            <i class="fas fa-chart-pie text-gold-600 dark:text-gold-400"></i>
                        </div>
                        <div>
                            <h3 class="font-extrabold text-navy-900 dark:text-white text-xl mb-2">Blind Analytics</h3>
                            <p class="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">GA4 is installed but never read. Big decisions run on gut, not data attribution.</p>
                        </div>
                    </div>
                    <div class="py-8 flex gap-6">
                        <div class="w-12 h-12 rounded-full bg-gold-500 flex items-center justify-center flex-shrink-0">
                            <i class="fas fa-check text-navy-900"></i>
                        </div>
                        <div>
                            <h3 class="font-extrabold text-navy-900 dark:text-white text-xl mb-2">The Naxa.One Fix</h3>
                            <p class="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">We bridge the gaps, automate the grind, and train your team. No hostage code — you own the outcome.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- 5. 1-WEEK AUDIT GATEWAY -->
    <section id="audit" class="py-28 bg-white dark:bg-navy-900 border-t border-slate-200 dark:border-navy-800 relative z-10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div>
                    <h2 class="text-4xl md:text-5xl font-extrabold text-navy-900 dark:text-white leading-tight mb-6">The 1-Week<br>Digital Maturity <span class="text-gold-600 dark:text-gold-500">Audit</span></h2>
                    <p class="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-8">Before we build, we diagnose. A 7-day intensive technical evaluation that pinpoints security vulnerabilities, manual bottlenecks, and analytics gaps.</p>
                    <div class="flex items-center gap-6 p-6 bg-slate-50 dark:bg-navy-800 border border-slate-200 dark:border-navy-700 rounded-sm">
                        <div class="text-3xl font-extrabold text-navy-900 dark:text-white">₹35,000</div>
                        <div class="w-px h-12 bg-slate-300 dark:bg-navy-600"></div>
                        <div class="text-sm font-bold text-gold-600 dark:text-gold-500">100% credited<br><span class="text-slate-500 dark:text-slate-400 font-medium">toward your first retainer</span></div>
                    </div>
                </div>
                <div class="bg-slate-50 dark:bg-navy-800 p-8 md:p-12 rounded-sm border border-slate-200 dark:border-navy-700">
                    <p class="text-xs font-bold uppercase tracking-widest text-slate-500 mb-8 border-b border-slate-200 dark:border-navy-700 pb-4">7-Day Timeline</p>
                    <div class="space-y-8 relative before:absolute before:inset-0 before:ml-[1.1rem] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-slate-200 dark:before:bg-navy-700">
                        <div class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                            <div class="flex items-center justify-center w-9 h-9 rounded-full border-4 border-slate-50 dark:border-navy-800 bg-gold-500 text-navy-900 font-bold text-sm shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">1</div>
                            <div class="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white dark:bg-navy-900 p-4 rounded-sm border border-slate-200 dark:border-navy-700 shadow-sm">
                                <h4 class="font-bold text-navy-900 dark:text-white">Kickoff & Access</h4>
                                <p class="text-xs text-slate-500 mt-1">C-Suite interview, tech stack handover</p>
                            </div>
                        </div>
                        <div class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                            <div class="flex items-center justify-center w-9 h-9 rounded-full border-4 border-slate-50 dark:border-navy-800 bg-navy-900 dark:bg-navy-700 text-white font-bold text-sm shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">3</div>
                            <div class="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white dark:bg-navy-900 p-4 rounded-sm border border-slate-200 dark:border-navy-700 shadow-sm">
                                <h4 class="font-bold text-navy-900 dark:text-white">Tally · CRM Mapping</h4>
                                <p class="text-xs text-slate-500 mt-1">Identify automation opportunities</p>
                            </div>
                        </div>
                        <div class="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
                            <div class="flex items-center justify-center w-9 h-9 rounded-full border-4 border-slate-50 dark:border-navy-800 bg-navy-900 dark:bg-navy-700 text-white font-bold text-sm shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2">7</div>
                            <div class="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] bg-white dark:bg-navy-900 p-4 rounded-sm border border-slate-200 dark:border-navy-700 shadow-sm">
                                <h4 class="font-bold text-navy-900 dark:text-white">Strategy Briefing</h4>
                                <p class="text-xs text-slate-500 mt-1">12-month modernization roadmap</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- 6. SERVICES -->
    <section id="hubs" class="py-28 bg-navy-900 relative z-10 border-y border-navy-800 overflow-hidden glow-gold">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div class="text-center mb-16">
                <p class="text-xs font-bold uppercase tracking-widest text-gold-500 mb-3">Capabilities</p>
                <h2 class="text-4xl md:text-5xl font-extrabold text-white">Our Service Matrix</h2>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <!-- Service 1 -->
                <div class="bg-navy-800 border-t-4 border-navy-700 hover:border-gold-500 p-8 transition-colors duration-300">
                    <i class="fas fa-store text-2xl text-gold-500 mb-6"></i>
                    <h3 class="text-xl font-bold text-white mb-3">Sell Online</h3>
                    <p class="text-sm text-slate-400 mb-6">High-converting eCommerce stores, checkout optimization, and ERP inventory sync.</p>
                    <div class="flex gap-2">
                        <span class="text-xs font-bold text-slate-300 bg-navy-900 border border-navy-700 px-2 py-1">Next.js</span>
                        <span class="text-xs font-bold text-slate-300 bg-navy-900 border border-navy-700 px-2 py-1">Tally ERP</span>
                    </div>
                </div>
                <!-- Service 2 -->
                <div class="bg-navy-800 border-t-4 border-navy-700 hover:border-gold-500 p-8 transition-colors duration-300">
                    <i class="fas fa-pen-nib text-2xl text-gold-500 mb-6"></i>
                    <h3 class="text-xl font-bold text-white mb-3">Look Professional</h3>
                    <p class="text-sm text-slate-400 mb-6">Brand identity, copywriting, and visual assets that build instant trust and recognition.</p>
                    <div class="flex gap-2">
                        <span class="text-xs font-bold text-slate-300 bg-navy-900 border border-navy-700 px-2 py-1">Identity</span>
                        <span class="text-xs font-bold text-slate-300 bg-navy-900 border border-navy-700 px-2 py-1">Copywriting</span>
                    </div>
                </div>
                <!-- Service 3 -->
                <div class="bg-navy-800 border-t-4 border-navy-700 hover:border-gold-500 p-8 transition-colors duration-300">
                    <i class="fas fa-magnifying-glass text-2xl text-gold-500 mb-6"></i>
                    <h3 class="text-xl font-bold text-white mb-3">Get Found on Google</h3>
                    <p class="text-sm text-slate-400 mb-6">Technical SEO, keyword dominance, and compounding organic traffic that doesn't stop.</p>
                    <div class="flex gap-2">
                        <span class="text-xs font-bold text-slate-300 bg-navy-900 border border-navy-700 px-2 py-1">Tech SEO</span>
                        <span class="text-xs font-bold text-slate-300 bg-navy-900 border border-navy-700 px-2 py-1">GA4</span>
                    </div>
                </div>
                <!-- Service 4 -->
                <div class="bg-navy-800 border-t-4 border-navy-700 hover:border-gold-500 p-8 transition-colors duration-300">
                    <i class="fas fa-users text-2xl text-gold-500 mb-6"></i>
                    <h3 class="text-xl font-bold text-white mb-3">Build a Following</h3>
                    <p class="text-sm text-slate-400 mb-6">Targeted social media campaigns, video assets, and community engagement at scale.</p>
                    <div class="flex gap-2">
                        <span class="text-xs font-bold text-slate-300 bg-navy-900 border border-navy-700 px-2 py-1">Instagram</span>
                        <span class="text-xs font-bold text-slate-300 bg-navy-900 border border-navy-700 px-2 py-1">Reels</span>
                    </div>
                </div>
                <!-- Service 5 -->
                <div class="bg-navy-800 border-t-4 border-navy-700 hover:border-gold-500 p-8 transition-colors duration-300 lg:col-span-2">
                    <div class="flex flex-col md:flex-row items-start md:items-center justify-between">
                        <div>
                            <i class="fas fa-bolt text-2xl text-gold-500 mb-6"></i>
                            <h3 class="text-xl font-bold text-white mb-3">Agentic Operations</h3>
                            <p class="text-sm text-slate-400 mb-6 max-w-md">Transparent, scope-matched monthly retainers — from SMB Sprints to Enterprise Dev Pods.</p>
                            <div class="flex gap-2">
                                <span class="text-xs font-bold text-slate-300 bg-navy-900 border border-navy-700 px-2 py-1">From ₹35k/mo</span>
                            </div>
                        </div>
                        <div class="mt-6 md:mt-0">
                            <a href="/pricing" class="inline-flex items-center gap-2 bg-navy-900 border border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-navy-900 font-bold px-6 py-3 transition-colors">
                                View Packages <i class="fas fa-arrow-right"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- 7. DIGITAL LITERACY -->
    <section class="py-28 bg-white dark:bg-[#0D1B2A] relative z-10 border-b border-slate-200 dark:border-navy-800">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center max-w-3xl mx-auto mb-16">
                <h2 class="text-3xl md:text-5xl font-extrabold text-navy-900 dark:text-white mb-6">We Teach Your Team to Drive the Engine</h2>
                <p class="text-slate-600 dark:text-slate-400 text-lg">Every retainer includes monthly <strong class="text-navy-900 dark:text-white">Digital Literacy sessions</strong>. We elevate capability, not dependence.</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div class="text-center p-8 bg-slate-50 dark:bg-navy-800 border border-slate-200 dark:border-navy-700">
                    <i class="fas fa-chart-line text-3xl text-gold-500 mb-6"></i>
                    <h3 class="font-bold text-navy-900 dark:text-white text-lg mb-3">GA4 Data Hygiene</h3>
                    <p class="text-sm text-slate-600 dark:text-slate-400">Understand traffic sources and attribution so decisions are data-driven.</p>
                </div>
                <div class="text-center p-8 bg-slate-50 dark:bg-navy-800 border border-slate-200 dark:border-navy-700">
                    <i class="fas fa-database text-3xl text-gold-500 mb-6"></i>
                    <h3 class="font-bold text-navy-900 dark:text-white text-lg mb-3">CRM Pipelines</h3>
                    <p class="text-sm text-slate-600 dark:text-slate-400">Manage your sales pipeline and customer lifecycle efficiently.</p>
                </div>
                <div class="text-center p-8 bg-slate-50 dark:bg-navy-800 border border-slate-200 dark:border-navy-700">
                    <i class="fas fa-hand-pointer text-3xl text-gold-500 mb-6"></i>
                    <h3 class="font-bold text-navy-900 dark:text-white text-lg mb-3">No-Code Handoffs</h3>
                    <p class="text-sm text-slate-600 dark:text-slate-400">Control WhatsApp builders and automation flows internally.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- 8. CALCULATOR -->
    <section id="calculator" class="py-28 bg-slate-50 dark:bg-[#162032] border-b border-slate-200 dark:border-navy-800 relative z-10">
        <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16">
                <h2 class="text-4xl md:text-5xl font-extrabold text-navy-900 dark:text-white mb-4">Maturity <span class="text-gold-600 dark:text-gold-500">Calculator</span></h2>
                <p class="text-slate-600 dark:text-slate-400 text-lg">Rate your operations (1 = Poor, 5 = Optimized). See your score instantly.</p>
            </div>
            
            <div class="flex flex-col md:flex-row bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 shadow-xl">
                <!-- Sliders -->
                <div class="flex-1 p-10 md:p-12 space-y-8 border-b md:border-b-0 md:border-r border-slate-200 dark:border-navy-800" id="calc-sliders">
                    <style>
                        input[type=range] { accent-color: #D4A017; }
                    </style>
                    <div>
                        <div class="flex justify-between mb-2">
                            <label class="text-sm font-bold text-navy-900 dark:text-white">Infrastructure & Speed</label>
                            <span class="text-sm font-bold text-gold-600 dark:text-gold-500" id="val-infra">2/5</span>
                        </div>
                        <input type="range" id="slider-infra" min="1" max="5" value="2" oninput="updateAudit()" class="w-full h-2 bg-slate-200 dark:bg-navy-700 rounded-full appearance-none cursor-pointer">
                    </div>
                    <div>
                        <div class="flex justify-between mb-2">
                            <label class="text-sm font-bold text-navy-900 dark:text-white">Agentic Workflows</label>
                            <span class="text-sm font-bold text-gold-600 dark:text-gold-500" id="val-auto">2/5</span>
                        </div>
                        <input type="range" id="slider-auto" min="1" max="5" value="2" oninput="updateAudit()" class="w-full h-2 bg-slate-200 dark:bg-navy-700 rounded-full appearance-none cursor-pointer">
                    </div>
                    <div>
                        <div class="flex justify-between mb-2">
                            <label class="text-sm font-bold text-navy-900 dark:text-white">Analytics & Data</label>
                            <span class="text-sm font-bold text-gold-600 dark:text-gold-500" id="val-data">1/5</span>
                        </div>
                        <input type="range" id="slider-data" min="1" max="5" value="1" oninput="updateAudit()" class="w-full h-2 bg-slate-200 dark:bg-navy-700 rounded-full appearance-none cursor-pointer">
                    </div>
                    <div>
                        <div class="flex justify-between mb-2">
                            <label class="text-sm font-bold text-navy-900 dark:text-white">Strategy & Literacy</label>
                            <span class="text-sm font-bold text-gold-600 dark:text-gold-500" id="val-strat">2/5</span>
                        </div>
                        <input type="range" id="slider-strat" min="1" max="5" value="2" oninput="updateAudit()" class="w-full h-2 bg-slate-200 dark:bg-navy-700 rounded-full appearance-none cursor-pointer">
                    </div>
                </div>
                <!-- Results -->
                <div class="flex-1 bg-navy-900 p-10 md:p-12 flex flex-col justify-center text-white text-center">
                    <p class="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Estimated Score</p>
                    <div class="blur-md opacity-40 select-none transition-all duration-300 calc-blur mb-2">
                        <div class="text-6xl font-extrabold text-white" id="res-score">35%</div>
                    </div>
                    <div class="blur-md opacity-40 select-none transition-all duration-300 calc-blur mb-8">
                        <span class="text-sm font-bold px-3 py-1 bg-navy-800 text-gold-400 border border-gold-500/30" id="res-tier-badge">Reactive</span>
                    </div>
                    
                    <div class="hidden">
                        <span id="res-risk-title"></span><span id="res-risk-desc"></span><span id="res-service"></span><span id="res-price"></span>
                    </div>
                    
                    <div id="unlock-container">
                        <button onclick="openLeadModal()" class="w-full bg-gold-500 hover:bg-gold-600 text-navy-900 font-bold py-4 rounded-sm transition-all text-sm">
                            Unlock My Score
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- 9. PRICING STRIP -->
    <section class="py-16 bg-navy-900 border-b border-navy-800 relative z-10 text-center">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 class="text-2xl md:text-3xl font-extrabold text-white mb-6">From ₹35k/mo to Enterprise Dev Pods</h2>
            <a href="/pricing" class="inline-block bg-transparent border border-white text-white hover:bg-white hover:text-navy-900 font-bold px-8 py-3 transition-colors">
                View All Packages
            </a>
        </div>
    </section>

    <!-- 10. BOOKING FORM -->
    <section id="booking-section" class="py-28 bg-white dark:bg-[#0D1B2A] relative z-10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div>
                    <h2 class="text-4xl md:text-5xl font-extrabold text-navy-900 dark:text-white leading-tight mb-6">Book a 15-Min Strategy Call</h2>
                    <p class="text-slate-600 dark:text-slate-400 text-lg mb-8">Speak directly with an Executive Architect. No sales fluff. We deliver an actionable 12-month blueprint.</p>
                    <ul class="space-y-4">
                        <li class="flex items-center gap-4">
                            <i class="fas fa-check text-gold-600 dark:text-gold-500 text-xl"></i>
                            <span class="text-navy-900 dark:text-white font-bold">MSME Growth Roadmap</span>
                        </li>
                        <li class="flex items-center gap-4">
                            <i class="fas fa-check text-gold-600 dark:text-gold-500 text-xl"></i>
                            <span class="text-navy-900 dark:text-white font-bold">Enterprise Agentic Ops</span>
                        </li>
                    </ul>
                </div>
                <div class="bg-slate-50 dark:bg-navy-900 p-8 md:p-12 border border-slate-200 dark:border-navy-700 shadow-xl">
                    <form onsubmit="handleDirectBookingSubmit(event)" class="space-y-6">
                        <div>
                            <label class="block text-xs font-bold uppercase text-navy-900 dark:text-slate-300 mb-2">Full Name *</label>
                            <input type="text" name="fullName" required class="w-full bg-white dark:bg-navy-800 border border-slate-300 dark:border-navy-700 px-4 py-3 text-sm focus:outline-none focus:border-gold-500 text-navy-900 dark:text-white" placeholder="e.g. Vikram Mehta">
                        </div>
                        <div>
                            <label class="block text-xs font-bold uppercase text-navy-900 dark:text-slate-300 mb-2">Work Email / WhatsApp *</label>
                            <input type="text" name="contactInfo" required class="w-full bg-white dark:bg-navy-800 border border-slate-300 dark:border-navy-700 px-4 py-3 text-sm focus:outline-none focus:border-gold-500 text-navy-900 dark:text-white" placeholder="vikram@company.com">
                        </div>
                        <div>
                            <label class="block text-xs font-bold uppercase text-navy-900 dark:text-slate-300 mb-2">Company / Brand Name *</label>
                            <input type="text" name="companyName" required class="w-full bg-white dark:bg-navy-800 border border-slate-300 dark:border-navy-700 px-4 py-3 text-sm focus:outline-none focus:border-gold-500 text-navy-900 dark:text-white" placeholder="Your Business Name">
                        </div>
                        <div>
                            <label class="block text-xs font-bold uppercase text-navy-900 dark:text-slate-300 mb-2">Primary Track *</label>
                            <select name="segment" required class="w-full bg-white dark:bg-navy-800 border border-slate-300 dark:border-navy-700 px-4 py-3 text-sm focus:outline-none focus:border-gold-500 text-navy-900 dark:text-white appearance-none">
                                <option value="MSME Platform & Growth">MSME: Setup & Scale</option>
                                <option value="Enterprise Agentic Ops">Enterprise: Custom Dev</option>
                                <option value="General Audit">Digital Audit</option>
                            </select>
                        </div>
                        <button type="submit" class="w-full bg-navy-900 dark:bg-gold-500 text-white dark:text-navy-900 font-bold py-4 transition-colors hover:bg-navy-800 dark:hover:bg-gold-400">
                            Confirm Request
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </section>

    <!-- 11. FAQ -->
    <section class="py-28 bg-[#F7F8FA] dark:bg-[#162032] border-t border-slate-200 dark:border-navy-800 relative z-10">
        <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 class="text-3xl md:text-5xl font-extrabold text-navy-900 dark:text-white text-center mb-16">Frequently Asked Questions</h2>
            <div class="space-y-4">
                <details class="group bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 p-6 cursor-pointer">
                    <summary class="flex items-center justify-between font-bold text-navy-900 dark:text-white text-lg list-none">
                        What is the 1-Week Digital Maturity Audit?
                        <i class="fas fa-chevron-down text-gold-500 group-open:rotate-180 transition-transform"></i>
                    </summary>
                    <div class="pt-4 text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                        A 7-day technical evaluation for ₹35,000 (100% credited toward your retainer) that pinpoints technical debt and operational bottlenecks.
                    </div>
                </details>
                <details class="group bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 p-6 cursor-pointer">
                    <summary class="flex items-center justify-between font-bold text-navy-900 dark:text-white text-lg list-none">
                        What are Naxa.One's retainer tiers?
                        <i class="fas fa-chevron-down text-gold-500 group-open:rotate-180 transition-transform"></i>
                    </summary>
                    <div class="pt-4 text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                        Tier 1 (SMB Sprint) at ₹35k–₹75k/mo, Tier 2 (Mid-Market) at ₹1.25L–₹3L/mo, Tier 3 (Enterprise) at ₹5L+/mo.
                    </div>
                </details>
                <details class="group bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-800 p-6 cursor-pointer">
                    <summary class="flex items-center justify-between font-bold text-navy-900 dark:text-white text-lg list-none">
                        How does Tally ERP & WhatsApp integration work?
                        <i class="fas fa-chevron-down text-gold-500 group-open:rotate-180 transition-transform"></i>
                    </summary>
                    <div class="pt-4 text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                        We build custom web middleware connecting web forms to Tally ERP and WhatsApp APIs, eliminating manual entry.
                    </div>
                </details>
            </div>
        </div>
    </section>

    <!-- 12. FOOTER -->
    <footer class="bg-navy-900 text-slate-300 py-16 border-t border-navy-800">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                <div class="col-span-1 md:col-span-2">
                    <div class="flex items-center gap-3 mb-6">
                        <img src="logo.png" alt="Naxa.One Logo" class="w-8 h-8 object-contain rounded">
                        <span class="font-extrabold text-lg text-white">Naxa<span class="text-gold-500">.</span>One</span>
                    </div>
                    <p class="text-sm max-w-sm mb-6 text-slate-400">Bridging the gap between executive vision and flawless digital execution.</p>
                    <div class="flex space-x-4">
                        <a href="#" class="text-slate-400 hover:text-gold-500 transition-colors"><i class="fab fa-linkedin text-xl"></i></a>
                        <a href="#" class="text-slate-400 hover:text-gold-500 transition-colors"><i class="fab fa-twitter text-xl"></i></a>
                    </div>
                </div>
                <div>
                    <h3 class="text-white font-bold mb-4">Contact</h3>
                    <a href="mailto:hello@naxa.one" class="text-gold-500 hover:text-gold-400 text-sm font-bold">hello@naxa.one</a>
                </div>
                <div>
                    <h3 class="text-white font-bold mb-4">Capabilities</h3>
                    <ul class="text-sm space-y-2 text-slate-400">
                        <li><a href="/ecommerce" class="hover:text-white transition-colors">eCommerce</a></li>
                        <li><a href="/seo" class="hover:text-white transition-colors">SEO</a></li>
                    </ul>
                </div>
            </div>
            <div class="border-t border-navy-800 pt-8 text-xs text-slate-500 text-center md:text-left">
                © 2026 Naxa.One. All rights reserved. Designed for scale.
            </div>
        </div>
    </footer>

    <!-- Floating WhatsApp CTA -->
    <a href="https://wa.me/917018979508?text=Hi" target="_blank" class="fixed bottom-6 right-6 z-40 bg-[#25D366] hover:bg-[#128C7E] text-white px-5 py-4 rounded-full shadow-xl flex items-center gap-3 transition-transform hover:-translate-y-1">
        <i class="fab fa-whatsapp text-xl"></i>
        <span class="font-bold text-sm hidden md:inline">Talk to Expert</span>
    </a>

    <!-- Lead Modal -->
    <div id="lead-modal" class="hidden fixed inset-0 z-50 bg-navy-900/90 backdrop-blur-sm flex items-center justify-center p-4">
        <div class="bg-white dark:bg-navy-900 border border-slate-200 dark:border-navy-700 rounded-sm p-8 max-w-md w-full relative shadow-2xl">
            <button onclick="closeLeadModal()" class="absolute top-4 right-4 text-slate-400 hover:text-navy-900 dark:hover:text-white text-2xl">&times;</button>
            <h3 class="text-2xl font-bold text-navy-900 dark:text-white mb-2">Unlock Your Score</h3>
            <p class="text-sm text-slate-600 dark:text-slate-400 mb-6">Enter details to reveal your score instantly.</p>
            <form id="audit-lead-form" onsubmit="handleAuditLeadSubmit(event)" class="space-y-4">
                <input type="text" name="fullName" required class="w-full bg-slate-50 dark:bg-navy-800 border border-slate-300 dark:border-navy-700 px-4 py-3 text-sm focus:border-gold-500 text-navy-900 dark:text-white" placeholder="Full Name">
                <input type="text" name="contactInfo" required class="w-full bg-slate-50 dark:bg-navy-800 border border-slate-300 dark:border-navy-700 px-4 py-3 text-sm focus:border-gold-500 text-navy-900 dark:text-white" placeholder="Email / WhatsApp">
                <input type="text" name="companyName" required class="w-full bg-slate-50 dark:bg-navy-800 border border-slate-300 dark:border-navy-700 px-4 py-3 text-sm focus:border-gold-500 text-navy-900 dark:text-white" placeholder="Company Name">
                <button type="submit" class="w-full bg-gold-500 hover:bg-gold-600 text-navy-900 font-bold py-4 mt-2">Unlock Results</button>
            </form>
        </div>
    </div>

${otherScripts}

</body>
</html>`;

fs.writeFileSync('rebuilt_index.html', newHtml);
console.log('Successfully extracted scripts and generated rebuilt_index.html');
