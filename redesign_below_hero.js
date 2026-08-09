/**
 * redesign_below_hero.js
 * Complete rebuild of all sections below the Hero Slider.
 * + Minimal Light/Dark mode toggle in the navbar.
 * Preserves: Menu Bar structure, Hero Slider, all JS logic, lead forms.
 */
const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8').replace(/\r\n/g, '\n');
let changes = 0;

function rep(target, replacement, label) {
    if (html.includes(target)) {
        html = html.replace(target, replacement);
        changes++;
        console.log(`✓ ${label}`);
    } else {
        console.warn(`✗ SKIPPED: ${label}`);
    }
}

// ─────────────────────────────────────────────────────────────
// 1. DARK MODE: Add `dark` class support to <html> tag
// ─────────────────────────────────────────────────────────────
rep(
    `<html lang="en" class="scroll-smooth">`,
    `<html lang="en" class="scroll-smooth">`,
    'HTML tag (unchanged, dark class applied via JS)'
);

// ─────────────────────────────────────────────────────────────
// 2. DARK MODE: Anti-FOUC script in <head>
// ─────────────────────────────────────────────────────────────
rep(
    `<link rel="stylesheet" href="styles.css">`,
    `<link rel="stylesheet" href="styles.css">
    <script>
        // Anti-FOUC dark mode initialization
        (function() {
            const stored = localStorage.getItem('theme');
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            if (stored === 'dark' || (!stored && prefersDark)) {
                document.documentElement.classList.add('dark');
            }
        })();
    </script>`,
    'Anti-FOUC dark mode script in head'
);

// ─────────────────────────────────────────────────────────────
// 3. DARK MODE: Global CSS variables for theme transitions
// ─────────────────────────────────────────────────────────────
rep(
    `body {
            font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
            background-color: #F8FAFC;
            color: #0F172A;
            overflow-x: hidden;
        }`,
    `body {
            font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
            background-color: #F8FAFC;
            color: #0F172A;
            overflow-x: hidden;
            transition: background-color 0.3s ease, color 0.3s ease;
        }
        .dark body, html.dark body {
            background-color: #0B0F19;
            color: #E2E8F0;
        }
        /* Smooth theme transitions for all key elements */
        *, *::before, *::after {
            transition-property: background-color, border-color, color;
            transition-duration: 0.25s;
            transition-timing-function: ease;
        }`,
    'Dark mode body + transition CSS'
);

// ─────────────────────────────────────────────────────────────
// 4. NAVBAR: Insert theme toggle button between "Book Call" and "Menu"
// ─────────────────────────────────────────────────────────────
rep(
    `<div class="flex items-center gap-3">
                    <button onclick="openBookingModal()" class="bg-blue-700 hover:bg-blue-800 text-white font-bold px-4 py-2 rounded-full text-xs sm:text-sm transition-all shadow-md shadow-blue-700/20" id="nav-discovery-btn">Book 15-Min Call</button>
                    <button id="nav-hamburger-btn" aria-label="Toggle Navigation Menu" class="flex items-center gap-2 bg-white/90 hover:bg-white text-slate-900 border border-slate-300 font-bold p-3 min-h-[48px] min-w-[48px] rounded-full shadow-md backdrop-blur-md transition-all">`,
    `<div class="flex items-center gap-3">
                    <button onclick="openBookingModal()" class="bg-blue-700 hover:bg-blue-800 text-white font-bold px-4 py-2 rounded-full text-xs sm:text-sm transition-all shadow-md shadow-blue-700/20" id="nav-discovery-btn">Book 15-Min Call</button>
                    <!-- Minimal Theme Toggle -->
                    <button id="theme-toggle" aria-label="Toggle Light and Dark Mode" onclick="toggleTheme()" class="w-9 h-9 flex items-center justify-center rounded-full border border-slate-300 bg-white/80 hover:bg-white dark:bg-slate-800/80 dark:border-slate-700 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 shadow-sm backdrop-blur-md transition-all" title="Toggle Light / Dark Mode">
                        <svg id="icon-sun" class="w-4 h-4 hidden dark:block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M12 5a7 7 0 100 14A7 7 0 0012 5z"/></svg>
                        <svg id="icon-moon" class="w-4 h-4 block dark:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/></svg>
                    </button>
                    <button id="nav-hamburger-btn" aria-label="Toggle Navigation Menu" class="flex items-center gap-2 bg-white/90 hover:bg-white text-slate-900 border border-slate-300 font-bold p-3 min-h-[48px] min-w-[48px] rounded-full shadow-md backdrop-blur-md transition-all">`,
    'Theme toggle button in navbar'
);

// ─────────────────────────────────────────────────────────────
// 5. REPLACE: All sections from Trust Bar to Footer (before scripts)
// ─────────────────────────────────────────────────────────────
const oldSections = `    <!-- Client Logo Trust Bar -->
    <section class="py-8 bg-slate-100 border-b border-slate-200 relative z-10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p class="text-xs font-bold text-slate-600 uppercase tracking-widest text-center mb-5">Trusted by Growing Enterprises Across India</p>
            <div class="flex flex-wrap justify-center gap-x-10 gap-y-3 items-center opacity-50 hover:opacity-90 transition-all duration-500">
                <span class="font-extrabold text-slate-600 text-xs tracking-[0.2em] uppercase">Bharti Corp</span>
                <span class="text-slate-300">·</span>
                <span class="font-extrabold text-slate-600 text-xs tracking-[0.2em] uppercase">Vega Retail</span>
                <span class="text-slate-300">·</span>
                <span class="font-extrabold text-slate-600 text-xs tracking-[0.2em] uppercase">Krishna ERP</span>
                <span class="text-slate-300">·</span>
                <span class="font-extrabold text-slate-600 text-xs tracking-[0.2em] uppercase">Meridian Co.</span>
                <span class="text-slate-300">·</span>
                <span class="font-extrabold text-slate-600 text-xs tracking-[0.2em] uppercase">Nexo Trade</span>
                <span class="text-slate-300">·</span>
                <span class="font-extrabold text-slate-600 text-xs tracking-[0.2em] uppercase">Sigma Labs</span>
            </div>
        </div>
    </section>`;

const newSections = `
    <!-- ─── TRUST TICKER ─── -->
    <section class="py-5 bg-slate-900 dark:bg-black border-y border-slate-800 overflow-hidden relative z-20 shadow-inner">
        <div class="marquee-track flex whitespace-nowrap gap-12 animate-marquee items-center text-xs font-extrabold tracking-widest text-slate-400 uppercase">
            <div class="flex gap-12 items-center">
                <span>ECOMMERCE DEVELOPMENT <span class="text-blue-500 mx-4">•</span></span>
                <span>DIGITAL LITERACY &amp; TRAINING <span class="text-emerald-500 mx-4">•</span></span>
                <span>SEO &amp; ORGANIC DOMINANCE <span class="text-blue-500 mx-4">•</span></span>
                <span>SOCIAL MEDIA GROWTH <span class="text-emerald-500 mx-4">•</span></span>
                <span>TALLY ERP &amp; WHATSAPP INTEGRATION <span class="text-blue-500 mx-4">•</span></span>
                <span>CUSTOM WEB APPS (NEXT.JS) <span class="text-emerald-500 mx-4">•</span></span>
            </div>
            <div class="flex gap-12 items-center">
                <span>ECOMMERCE DEVELOPMENT <span class="text-blue-500 mx-4">•</span></span>
                <span>DIGITAL LITERACY &amp; TRAINING <span class="text-emerald-500 mx-4">•</span></span>
                <span>SEO &amp; ORGANIC DOMINANCE <span class="text-blue-500 mx-4">•</span></span>
                <span>SOCIAL MEDIA GROWTH <span class="text-emerald-500 mx-4">•</span></span>
                <span>TALLY ERP &amp; WHATSAPP INTEGRATION <span class="text-blue-500 mx-4">•</span></span>
                <span>CUSTOM WEB APPS (NEXT.JS) <span class="text-emerald-500 mx-4">•</span></span>
            </div>
        </div>
    </section>

    <!-- ─── SELECTED WORK — Code & Theory editorial cards ─── -->
    <section class="py-24 bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800 relative z-10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-end justify-between mb-14 pb-6 border-b border-slate-100 dark:border-slate-800">
                <div>
                    <p class="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-2">Selected Work</p>
                    <h2 class="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight">What We've <span class="bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">Built</span></h2>
                </div>
                <span class="text-xs text-slate-400 dark:text-slate-500 hidden md:block">3 of 12+ Engagements</span>
            </div>
            <div class="space-y-0 divide-y divide-slate-100 dark:divide-slate-800">
                <!-- Work Row 1 -->
                <div class="group flex flex-col md:flex-row items-start md:items-center justify-between py-10 gap-6 cursor-default hover:bg-slate-50 dark:hover:bg-slate-900/50 -mx-4 px-4 rounded-2xl transition-colors duration-300">
                    <div class="flex items-start gap-8 md:gap-12 flex-1">
                        <span class="text-sm font-extrabold text-slate-200 dark:text-slate-700 tabular-nums w-8 flex-shrink-0 mt-1">01</span>
                        <div class="flex-1">
                            <div class="flex flex-wrap items-center gap-3 mb-2">
                                <span class="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2.5 py-1 rounded-md border border-blue-100 dark:border-blue-800">eCommerce + ERP</span>
                            </div>
                            <h3 class="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-white mb-1 group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">Regional Garment Retailer</h3>
                            <p class="text-sm text-slate-500 dark:text-slate-400 font-medium">Tally ERP Middleware · WhatsApp API · Next.js · GA4 Attribution</p>
                        </div>
                    </div>
                    <div class="flex items-center gap-8 flex-shrink-0 ml-0 md:ml-8">
                        <div class="text-right">
                            <div class="text-3xl md:text-4xl font-extrabold text-blue-700 dark:text-blue-400 leading-none">4.1×</div>
                            <div class="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">Revenue Growth</div>
                        </div>
                        <div class="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-300 dark:text-slate-600 group-hover:border-blue-600 group-hover:text-blue-600 dark:group-hover:border-blue-400 dark:group-hover:text-blue-400 transition-all">
                            <i class="fas fa-arrow-right text-xs"></i>
                        </div>
                    </div>
                </div>
                <!-- Work Row 2 -->
                <div class="group flex flex-col md:flex-row items-start md:items-center justify-between py-10 gap-6 cursor-default hover:bg-slate-50 dark:hover:bg-slate-900/50 -mx-4 px-4 rounded-2xl transition-colors duration-300">
                    <div class="flex items-start gap-8 md:gap-12 flex-1">
                        <span class="text-sm font-extrabold text-slate-200 dark:text-slate-700 tabular-nums w-8 flex-shrink-0 mt-1">02</span>
                        <div class="flex-1">
                            <div class="flex flex-wrap items-center gap-3 mb-2">
                                <span class="text-xs font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-2.5 py-1 rounded-md border border-emerald-100 dark:border-emerald-800">SEO + Analytics</span>
                            </div>
                            <h3 class="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-white mb-1 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">B2B Industrial Supplier</h3>
                            <p class="text-sm text-slate-500 dark:text-slate-400 font-medium">Technical SEO · GA4 Dashboard · CRM Integration</p>
                        </div>
                    </div>
                    <div class="flex items-center gap-8 flex-shrink-0 ml-0 md:ml-8">
                        <div class="text-right">
                            <div class="text-3xl md:text-4xl font-extrabold text-emerald-600 dark:text-emerald-400 leading-none">₹22L</div>
                            <div class="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">New Pipeline / Qtr</div>
                        </div>
                        <div class="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-300 dark:text-slate-600 group-hover:border-emerald-600 group-hover:text-emerald-600 dark:group-hover:border-emerald-400 dark:group-hover:text-emerald-400 transition-all">
                            <i class="fas fa-arrow-right text-xs"></i>
                        </div>
                    </div>
                </div>
                <!-- Work Row 3 -->
                <div class="group flex flex-col md:flex-row items-start md:items-center justify-between py-10 gap-6 cursor-default hover:bg-slate-50 dark:hover:bg-slate-900/50 -mx-4 px-4 rounded-2xl transition-colors duration-300">
                    <div class="flex items-start gap-8 md:gap-12 flex-1">
                        <span class="text-sm font-extrabold text-slate-200 dark:text-slate-700 tabular-nums w-8 flex-shrink-0 mt-1">03</span>
                        <div class="flex-1">
                            <div class="flex flex-wrap items-center gap-3 mb-2">
                                <span class="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/30 px-2.5 py-1 rounded-md border border-amber-100 dark:border-amber-800">Full Retainer</span>
                            </div>
                            <h3 class="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-white mb-1 group-hover:text-amber-700 dark:group-hover:text-amber-400 transition-colors">MSME Food Brand</h3>
                            <p class="text-sm text-slate-500 dark:text-slate-400 font-medium">Brand Identity · eCommerce · Social Media · WhatsApp</p>
                        </div>
                    </div>
                    <div class="flex items-center gap-8 flex-shrink-0 ml-0 md:ml-8">
                        <div class="text-right">
                            <div class="text-3xl md:text-4xl font-extrabold text-amber-600 dark:text-amber-400 leading-none">98%</div>
                            <div class="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">Client Retention</div>
                        </div>
                        <div class="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-300 dark:text-slate-600 group-hover:border-amber-600 group-hover:text-amber-600 dark:group-hover:border-amber-400 dark:group-hover:text-amber-400 transition-all">
                            <i class="fas fa-arrow-right text-xs"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- ─── PHILOSOPHY — Clay.global asymmetric split ─── -->
    <section id="philosophy" class="py-24 bg-white dark:bg-[#0B0F19] border-b border-slate-100 dark:border-slate-800 relative z-10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-2xl">
                <!-- Left dark panel -->
                <div class="bg-slate-950 dark:bg-black p-10 md:p-16 flex flex-col justify-between min-h-[480px] relative overflow-hidden">
                    <div class="absolute top-0 left-0 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
                    <div class="relative z-10">
                        <p class="text-xs font-bold uppercase tracking-widest text-blue-400 mb-6">Our Philosophy</p>
                        <h2 class="text-3xl md:text-5xl font-extrabold text-white leading-[1.1] mb-8">Why most<br>digital projects<br><span class="text-blue-400">fail.</span></h2>
                        <p class="text-slate-400 text-base leading-relaxed max-w-sm">Most agencies create dependency. We build your capability instead — build, automate, train.</p>
                    </div>
                    <div class="relative z-10 mt-12">
                        <div class="inline-flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl px-5 py-3">
                            <div class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                            <p class="text-sm font-bold text-white">Build → Automate → Train. You own it.</p>
                        </div>
                    </div>
                </div>
                <!-- Right: editorial list -->
                <div class="bg-white dark:bg-slate-900 p-10 md:p-16 flex flex-col justify-center divide-y divide-slate-100 dark:divide-slate-800">
                    <div class="py-8 flex gap-6 group">
                        <div class="flex-shrink-0 w-10 h-10 rounded-xl border-2 border-slate-900 dark:border-slate-400 flex items-center justify-center">
                            <i class="fas fa-link-slash text-slate-900 dark:text-slate-300 text-sm"></i>
                        </div>
                        <div>
                            <h3 class="font-extrabold text-slate-900 dark:text-white text-lg mb-1">Siloed Systems</h3>
                            <p class="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">Your CRM, Tally, and web platform don't talk to each other. Manual entry eats hours every day.</p>
                        </div>
                    </div>
                    <div class="py-8 flex gap-6 group">
                        <div class="flex-shrink-0 w-10 h-10 rounded-xl border-2 border-blue-700 dark:border-blue-400 flex items-center justify-center">
                            <i class="fas fa-chart-pie text-blue-700 dark:text-blue-400 text-sm"></i>
                        </div>
                        <div>
                            <h3 class="font-extrabold text-slate-900 dark:text-white text-lg mb-1">Blind Analytics</h3>
                            <p class="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">GA4 is installed but never read. Big decisions run on gut, not data attribution.</p>
                        </div>
                    </div>
                    <div class="py-8 flex gap-6 group">
                        <div class="flex-shrink-0 w-10 h-10 rounded-xl border-2 border-emerald-600 dark:border-emerald-400 flex items-center justify-center">
                            <i class="fas fa-handshake-angle text-emerald-600 dark:text-emerald-400 text-sm"></i>
                        </div>
                        <div>
                            <h3 class="font-extrabold text-slate-900 dark:text-white text-lg mb-1">The Naxa.One Fix</h3>
                            <p class="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">We bridge the gaps, automate the grind, and train your team. No hostage code — you own the outcome.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- ─── 1-WEEK AUDIT GATEWAY — UNDP / Skill India milestone style ─── -->
    <section id="audit" class="py-24 bg-slate-50 dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800 relative z-10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <!-- Left: Headline -->
                <div>
                    <span class="inline-block px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-emerald-200 dark:border-emerald-700">Gateway Service</span>
                    <h2 class="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight mb-6">The 1-Week<br>Digital Maturity<br><span class="text-blue-700 dark:text-blue-400">Audit</span></h2>
                    <p class="text-slate-500 dark:text-slate-400 text-base leading-relaxed mb-8">Before we build, we diagnose. A 7-day intensive technical evaluation that pinpoints security vulnerabilities, manual bottlenecks, and analytics gaps.</p>
                    <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                        <div class="text-4xl font-extrabold text-emerald-600 dark:text-emerald-400">₹35,000</div>
                        <div class="text-sm text-slate-500 dark:text-slate-400 leading-snug"><span class="text-emerald-600 dark:text-emerald-400 font-bold">100% credited</span><br>toward your first retainer</div>
                    </div>
                </div>
                <!-- Right: 7-Day Timeline -->
                <div class="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-xl p-8 md:p-10">
                    <p class="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-8">7-Day Engagement Timeline</p>
                    <div class="space-y-0">
                        <div class="flex gap-5 pb-8 relative">
                            <div class="flex flex-col items-center">
                                <div class="w-9 h-9 rounded-full bg-blue-700 dark:bg-blue-600 text-white flex items-center justify-center font-extrabold text-sm flex-shrink-0 z-10">1</div>
                                <div class="w-px flex-1 bg-slate-200 dark:bg-slate-700 mt-2 min-h-[32px]"></div>
                            </div>
                            <div class="pt-1.5 pb-2">
                                <h4 class="font-extrabold text-slate-900 dark:text-white text-sm">Kickoff & Access</h4>
                                <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">C-Suite interview, GA4 & tech stack handover</p>
                            </div>
                        </div>
                        <div class="flex gap-5 pb-8 relative">
                            <div class="flex flex-col items-center">
                                <div class="w-9 h-9 rounded-full bg-blue-600 dark:bg-blue-500 text-white flex items-center justify-center font-extrabold text-sm flex-shrink-0 z-10">3</div>
                                <div class="w-px flex-1 bg-slate-200 dark:bg-slate-700 mt-2 min-h-[32px]"></div>
                            </div>
                            <div class="pt-1.5 pb-2">
                                <h4 class="font-extrabold text-slate-900 dark:text-white text-sm">Tally · WhatsApp · CRM Mapping</h4>
                                <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Identify automation and middleware opportunities</p>
                            </div>
                        </div>
                        <div class="flex gap-5 pb-8 relative">
                            <div class="flex flex-col items-center">
                                <div class="w-9 h-9 rounded-full bg-emerald-600 dark:bg-emerald-500 text-white flex items-center justify-center font-extrabold text-sm flex-shrink-0 z-10">5</div>
                                <div class="w-px flex-1 bg-slate-200 dark:bg-slate-700 mt-2 min-h-[32px]"></div>
                            </div>
                            <div class="pt-1.5 pb-2">
                                <h4 class="font-extrabold text-slate-900 dark:text-white text-sm">Technical Debt & Speed Diagnostic</h4>
                                <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Load times, funnel leakage, conversion gap analysis</p>
                            </div>
                        </div>
                        <div class="flex gap-5">
                            <div class="flex flex-col items-center">
                                <div class="w-9 h-9 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 flex items-center justify-center font-extrabold text-sm flex-shrink-0 z-10">7</div>
                            </div>
                            <div class="pt-1.5">
                                <h4 class="font-extrabold text-slate-900 dark:text-white text-sm">Executive Strategy Briefing</h4>
                                <p class="text-xs text-slate-500 dark:text-slate-400 mt-0.5">12-month modernization roadmap PDF delivered</p>
                            </div>
                        </div>
                    </div>
                    <button onclick="openBookingModal()" class="mt-8 w-full bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-bold py-4 rounded-xl text-sm transition-all shadow-lg shadow-blue-700/25">
                        Book Your Audit → ₹35,000
                    </button>
                </div>
            </div>
        </div>
    </section>

    <!-- ─── SERVICE INDEX — Vercel / Linear glass grid ─── -->
    <section id="hubs" class="py-24 bg-[#0B0F19] dark:bg-black border-b border-slate-800 relative z-10 overflow-hidden">
        <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(37,99,235,0.12)_0%,_transparent_60%)] pointer-events-none"></div>
        <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(5,150,105,0.08)_0%,_transparent_60%)] pointer-events-none"></div>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div class="flex items-end justify-between mb-14 pb-6 border-b border-slate-800">
                <div>
                    <p class="text-xs font-bold uppercase tracking-widest text-blue-400 mb-2">Service Matrix</p>
                    <h2 class="text-3xl md:text-5xl font-extrabold text-white leading-tight">Our <span class="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">Capabilities</span></h2>
                </div>
                <img src="customers_collage.webp" class="h-14 w-32 object-cover rounded-xl opacity-60" alt="Naxa.One clients" loading="lazy">
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <!-- Card: eCommerce -->
                <a href="/ecommerce" class="group relative rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-sm p-8 hover:border-blue-500/50 hover:bg-slate-900 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-blue-500/10">
                    <div class="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl group-hover:bg-blue-500/15 transition-all duration-500"></div>
                    <div class="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-6 group-hover:bg-blue-500/20 transition-colors">
                        <i class="fas fa-store text-blue-400 text-sm"></i>
                    </div>
                    <h3 class="text-lg font-extrabold text-white mb-2">Sell Online</h3>
                    <p class="text-sm text-slate-400 leading-relaxed mb-6">High-converting eCommerce stores, checkout optimization, and ERP inventory sync.</p>
                    <div class="flex flex-wrap gap-2 mb-6">
                        <span class="text-xs font-bold text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2.5 py-1 rounded-md">Next.js</span>
                        <span class="text-xs font-bold text-slate-400 bg-slate-800 border border-slate-700 px-2.5 py-1 rounded-md">Tally ERP</span>
                        <span class="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-md">WhatsApp API</span>
                    </div>
                    <div class="flex items-center gap-2 text-xs font-bold text-slate-400 group-hover:text-blue-400 group-hover:gap-3 transition-all">
                        Explore Hub <i class="fas fa-arrow-right text-xs"></i>
                    </div>
                </a>
                <!-- Card: Content -->
                <a href="/content" class="group relative rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-sm p-8 hover:border-purple-500/50 hover:bg-slate-900 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-500/10">
                    <div class="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-full blur-2xl group-hover:bg-purple-500/15 transition-all duration-500"></div>
                    <div class="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-6 group-hover:bg-purple-500/20 transition-colors">
                        <i class="fas fa-pen-nib text-purple-400 text-sm"></i>
                    </div>
                    <h3 class="text-lg font-extrabold text-white mb-2">Look Professional</h3>
                    <p class="text-sm text-slate-400 leading-relaxed mb-6">Brand identity, copywriting, and visual assets that build instant trust and recognition.</p>
                    <div class="flex flex-wrap gap-2 mb-6">
                        <span class="text-xs font-bold text-purple-400 bg-purple-500/10 border border-purple-500/20 px-2.5 py-1 rounded-md">Brand Guidelines</span>
                        <span class="text-xs font-bold text-slate-400 bg-slate-800 border border-slate-700 px-2.5 py-1 rounded-md">Copywriting</span>
                    </div>
                    <div class="flex items-center gap-2 text-xs font-bold text-slate-400 group-hover:text-purple-400 group-hover:gap-3 transition-all">
                        Explore Hub <i class="fas fa-arrow-right text-xs"></i>
                    </div>
                </a>
                <!-- Card: SEO -->
                <a href="/seo" class="group relative rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-sm p-8 hover:border-emerald-500/50 hover:bg-slate-900 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-emerald-500/10">
                    <div class="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/15 transition-all duration-500"></div>
                    <div class="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6 group-hover:bg-emerald-500/20 transition-colors">
                        <i class="fas fa-magnifying-glass text-emerald-400 text-sm"></i>
                    </div>
                    <h3 class="text-lg font-extrabold text-white mb-2">Get Found on Google</h3>
                    <p class="text-sm text-slate-400 leading-relaxed mb-6">Technical SEO, keyword dominance, and compounding organic traffic that doesn't stop.</p>
                    <div class="flex flex-wrap gap-2 mb-6">
                        <span class="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-md">Technical SEO</span>
                        <span class="text-xs font-bold text-slate-400 bg-slate-800 border border-slate-700 px-2.5 py-1 rounded-md">GA4</span>
                    </div>
                    <div class="flex items-center gap-2 text-xs font-bold text-slate-400 group-hover:text-emerald-400 group-hover:gap-3 transition-all">
                        Explore Hub <i class="fas fa-arrow-right text-xs"></i>
                    </div>
                </a>
                <!-- Card: SMM -->
                <a href="/smm" class="group relative rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-sm p-8 hover:border-amber-500/50 hover:bg-slate-900 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-amber-500/10">
                    <div class="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl group-hover:bg-amber-500/15 transition-all duration-500"></div>
                    <div class="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-6 group-hover:bg-amber-500/20 transition-colors">
                        <i class="fas fa-users text-amber-400 text-sm"></i>
                    </div>
                    <h3 class="text-lg font-extrabold text-white mb-2">Build a Following</h3>
                    <p class="text-sm text-slate-400 leading-relaxed mb-6">Targeted social media campaigns, video assets, and community engagement at scale.</p>
                    <div class="flex flex-wrap gap-2 mb-6">
                        <span class="text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-md">Instagram</span>
                        <span class="text-xs font-bold text-slate-400 bg-slate-800 border border-slate-700 px-2.5 py-1 rounded-md">Video Reels</span>
                    </div>
                    <div class="flex items-center gap-2 text-xs font-bold text-slate-400 group-hover:text-amber-400 group-hover:gap-3 transition-all">
                        Explore Hub <i class="fas fa-arrow-right text-xs"></i>
                    </div>
                </a>
                <!-- Card: Agentic Ops -->
                <a href="/pricing" class="group relative rounded-2xl border border-slate-800 bg-slate-900/60 backdrop-blur-sm p-8 hover:border-slate-500/50 hover:bg-slate-900 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-slate-500/10 md:col-span-2 lg:col-span-1">
                    <div class="absolute top-0 right-0 w-32 h-32 bg-slate-500/5 rounded-full blur-2xl group-hover:bg-slate-500/15 transition-all duration-500"></div>
                    <div class="w-10 h-10 rounded-xl bg-slate-500/10 border border-slate-500/20 flex items-center justify-center mb-6 group-hover:bg-slate-500/20 transition-colors">
                        <i class="fas fa-bolt text-slate-300 text-sm"></i>
                    </div>
                    <h3 class="text-lg font-extrabold text-white mb-2">View Retainer Pricing</h3>
                    <p class="text-sm text-slate-400 leading-relaxed mb-6">Transparent, scope-matched monthly retainers — from SMB Sprints to Enterprise Dev Pods.</p>
                    <div class="flex flex-wrap gap-2 mb-6">
                        <span class="text-xs font-bold text-slate-300 bg-slate-800 border border-slate-700 px-2.5 py-1 rounded-md">From ₹35k/mo</span>
                        <span class="text-xs font-bold text-slate-300 bg-slate-800 border border-slate-700 px-2.5 py-1 rounded-md">To ₹5L+/mo</span>
                    </div>
                    <div class="flex items-center gap-2 text-xs font-bold text-slate-400 group-hover:text-white group-hover:gap-3 transition-all">
                        View All Packages <i class="fas fa-arrow-right text-xs"></i>
                    </div>
                </a>
            </div>
        </div>
    </section>

    <!-- ─── OPERATIONS — Vercel before/after visual ─── -->
    <section id="operations" class="py-24 bg-white dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800 relative z-10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div class="order-1 space-y-6">
                    <span class="inline-block px-3 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full text-xs font-bold uppercase tracking-wider border border-blue-100 dark:border-blue-800">Enterprise Operations</span>
                    <h2 class="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white leading-tight">
                        Banish 6-Hour<br>Daily <span class="bg-gradient-to-r from-blue-700 to-emerald-600 dark:from-blue-400 dark:to-emerald-400 bg-clip-text text-transparent">Manual Entries</span>
                    </h2>
                    <h3 class="text-lg font-bold text-slate-600 dark:text-slate-300">Tally ERP Sync + Custom WhatsApp Middlewares</h3>
                    <p class="text-slate-500 dark:text-slate-400 text-sm leading-relaxed max-w-md">
                        Web orders synced to Tally the moment they're placed. Inventory updated. WhatsApp receipts fired automatically. Zero manual entry.
                    </p>
                    <button onclick="openBookingModal()" class="inline-flex items-center gap-2 bg-blue-700 hover:bg-blue-800 dark:bg-blue-600 dark:hover:bg-blue-700 text-white font-bold px-6 py-3.5 rounded-xl transition-all shadow-lg shadow-blue-700/25 text-sm">
                        Book a Workflow Audit <i class="fas fa-arrow-right text-xs"></i>
                    </button>
                </div>
                <div class="order-2">
                    <!-- Before/After Visual -->
                    <div class="rounded-3xl border border-slate-100 dark:border-slate-800 overflow-hidden shadow-2xl bg-slate-50 dark:bg-slate-900">
                        <!-- Before -->
                        <div class="p-6 border-b border-slate-100 dark:border-slate-800">
                            <div class="flex items-center justify-between mb-4">
                                <div class="flex items-center gap-2">
                                    <div class="w-3 h-3 rounded-full bg-red-400"></div>
                                    <span class="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Without Naxa.One</span>
                                </div>
                                <span class="text-xs font-extrabold text-red-500 bg-red-50 dark:bg-red-900/30 dark:text-red-400 px-2.5 py-1 rounded-full border border-red-100 dark:border-red-800">6 Hours Daily</span>
                            </div>
                            <div class="space-y-2">
                                <div class="flex items-center gap-3 p-3 bg-slate-100 dark:bg-slate-800 rounded-xl opacity-60">
                                    <i class="fas fa-desktop text-slate-400 text-sm w-4"></i>
                                    <span class="text-xs text-slate-500 dark:text-slate-400 font-medium">Copy order from website... → Open Tally... → Type manually...</span>
                                </div>
                                <div class="flex items-center gap-3 p-3 bg-slate-100 dark:bg-slate-800 rounded-xl opacity-40">
                                    <i class="fas fa-desktop text-slate-400 text-sm w-4"></i>
                                    <span class="text-xs text-slate-500 dark:text-slate-400 font-medium">Update inventory... → Send WhatsApp manually...</span>
                                </div>
                            </div>
                        </div>
                        <!-- After -->
                        <div class="p-6 bg-white dark:bg-slate-950">
                            <div class="flex items-center justify-between mb-4">
                                <div class="flex items-center gap-2">
                                    <div class="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></div>
                                    <span class="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">With Tally + API Sync</span>
                                </div>
                                <span class="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-900/30 px-2.5 py-1 rounded-full border border-emerald-100 dark:border-emerald-800">0 Minutes</span>
                            </div>
                            <div class="space-y-2">
                                <div class="flex items-center gap-3 p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-100 dark:border-emerald-800">
                                    <i class="fas fa-bolt text-emerald-500 text-sm w-4"></i>
                                    <span class="text-xs text-slate-700 dark:text-slate-300 font-bold">Order placed → Tally synced → WhatsApp receipt sent <span class="text-emerald-500">✓</span></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- ─── DIGITAL LITERACY — UNDP institutional style ─── -->
    <section class="py-24 bg-slate-950 dark:bg-black border-b border-slate-800 relative z-10 overflow-hidden">
        <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(16,185,129,0.06)_0%,_transparent_70%)] pointer-events-none"></div>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div class="text-center max-w-2xl mx-auto mb-16">
                <i class="fas fa-graduation-cap text-3xl text-emerald-400 mb-6"></i>
                <h2 class="text-3xl md:text-5xl font-extrabold text-white mb-4">We Teach Your Team<br>to Drive the Engine</h2>
                <p class="text-slate-400 text-base leading-relaxed">Every retainer includes monthly <strong class="text-white">Digital Literacy sessions</strong> — GA4, CRM hygiene, WhatsApp builder training. We elevate capability, not dependence.</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div class="group rounded-2xl border border-slate-800 bg-slate-900/60 p-8 hover:border-emerald-500/30 hover:bg-slate-900 transition-all">
                    <div class="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-5">
                        <i class="fas fa-chart-line text-emerald-400 text-sm"></i>
                    </div>
                    <h3 class="font-extrabold text-white mb-2">GA4 Data Hygiene</h3>
                    <p class="text-sm text-slate-400 leading-relaxed">Understand your traffic sources, attribution, and conversion events — so decisions are always data-driven.</p>
                </div>
                <div class="group rounded-2xl border border-slate-800 bg-slate-900/60 p-8 hover:border-blue-500/30 hover:bg-slate-900 transition-all">
                    <div class="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-5">
                        <i class="fas fa-database text-blue-400 text-sm"></i>
                    </div>
                    <h3 class="font-extrabold text-white mb-2">CRM Pipeline Management</h3>
                    <p class="text-sm text-slate-400 leading-relaxed">Manage your sales pipeline, follow-up cadences, and customer lifecycle without losing a single lead.</p>
                </div>
                <div class="group rounded-2xl border border-slate-800 bg-slate-900/60 p-8 hover:border-purple-500/30 hover:bg-slate-900 transition-all">
                    <div class="w-10 h-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-5">
                        <i class="fas fa-hand-pointer text-purple-400 text-sm"></i>
                    </div>
                    <h3 class="font-extrabold text-white mb-2">No-Code Handoffs</h3>
                    <p class="text-sm text-slate-400 leading-relaxed">WhatsApp template builders, form builders, and automation flows — controlled by your team, not ours.</p>
                </div>
            </div>
        </div>
    </section>

    <!-- ─── MINI-AUDIT CALCULATOR — Linear precision style ─── -->
    <section id="calculator" class="py-24 bg-slate-50 dark:bg-slate-950 border-b border-slate-100 dark:border-slate-800 relative z-10">
        <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-12">
                <p class="text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-3">Free Diagnostic Tool</p>
                <h2 class="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4">Try the <span class="text-emerald-600 dark:text-emerald-400">Mini-Audit</span></h2>
                <p class="text-slate-500 dark:text-slate-400 text-sm font-medium max-w-md mx-auto">Rate your business operations (1 = Non-Existent, 5 = Fully Optimized). See your score instantly.</p>
            </div>
            <div class="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 shadow-2xl overflow-hidden">
                <div class="grid grid-cols-1 md:grid-cols-2">
                    <!-- Sliders -->
                    <div class="p-8 md:p-10 space-y-8 border-b md:border-b-0 md:border-r border-slate-100 dark:border-slate-800" id="calc-sliders">
                        <div>
                            <div class="flex justify-between mb-3">
                                <label class="text-sm font-bold text-slate-800 dark:text-slate-200">Infrastructure &amp; Speed</label>
                                <span class="text-xs text-blue-700 dark:text-blue-400 font-extrabold bg-blue-50 dark:bg-blue-900/30 px-2.5 py-1 rounded-full border border-blue-100 dark:border-blue-800" id="val-infra">2/5</span>
                            </div>
                            <input type="range" aria-label="Infrastructure Level" id="slider-infra" min="1" max="5" value="2" oninput="updateAudit()" class="w-full">
                            <p class="text-xs text-slate-500 dark:text-slate-400 mt-1.5">Hosting, security, load times.</p>
                        </div>
                        <div>
                            <div class="flex justify-between mb-3">
                                <label class="text-sm font-bold text-slate-800 dark:text-slate-200">Agentic Workflows</label>
                                <span class="text-xs text-blue-700 dark:text-blue-400 font-extrabold bg-blue-50 dark:bg-blue-900/30 px-2.5 py-1 rounded-full border border-blue-100 dark:border-blue-800" id="val-auto">2/5</span>
                            </div>
                            <input type="range" aria-label="Automation Level" id="slider-auto" min="1" max="5" value="2" oninput="updateAudit()" class="w-full">
                            <p class="text-xs text-slate-500 dark:text-slate-400 mt-1.5">CRM, Tally, WhatsApp routing solutions.</p>
                        </div>
                        <div>
                            <div class="flex justify-between mb-3">
                                <label class="text-sm font-bold text-slate-800 dark:text-slate-200">Analytics &amp; Data</label>
                                <span class="text-xs text-blue-700 dark:text-blue-400 font-extrabold bg-blue-50 dark:bg-blue-900/30 px-2.5 py-1 rounded-full border border-blue-100 dark:border-blue-800" id="val-data">1/5</span>
                            </div>
                            <input type="range" aria-label="Data Maturity Level" id="slider-data" min="1" max="5" value="1" oninput="updateAudit()" class="w-full">
                            <p class="text-xs text-slate-500 dark:text-slate-400 mt-1.5">GA4, Dashboards, single source of truth.</p>
                        </div>
                        <div>
                            <div class="flex justify-between mb-3">
                                <label class="text-sm font-bold text-slate-800 dark:text-slate-200">Strategy &amp; Literacy</label>
                                <span class="text-xs text-blue-700 dark:text-blue-400 font-extrabold bg-blue-50 dark:bg-blue-900/30 px-2.5 py-1 rounded-full border border-blue-100 dark:border-blue-800" id="val-strat">2/5</span>
                            </div>
                            <input type="range" aria-label="Strategy Level" id="slider-strat" min="1" max="5" value="2" oninput="updateAudit()" class="w-full">
                            <p class="text-xs text-slate-500 dark:text-slate-400 mt-1.5">Team tech skills, governance, roadmap.</p>
                        </div>
                    </div>
                    <!-- Results -->
                    <div class="bg-slate-950 dark:bg-black p-8 md:p-10 flex flex-col justify-between text-white relative overflow-hidden">
                        <div class="absolute -right-10 -top-10 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl"></div>
                        <div class="relative z-10">
                            <p class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Estimated Score</p>
                            <div class="flex items-baseline gap-3 mb-8">
                                <div class="blur-md opacity-40 select-none transition-all duration-300 calc-blur">
                                    <h3 class="text-6xl font-extrabold text-white" id="res-score">35%</h3>
                                </div>
                                <span class="text-xs px-2.5 py-1 rounded-full font-bold blur-sm opacity-40 select-none calc-blur transition-all duration-300" id="res-tier-badge" style="background: rgba(217,119,6,0.25); color: #fcd34d;">Reactive</span>
                            </div>
                            <div class="mb-6 blur-md opacity-40 select-none calc-blur transition-all duration-300">
                                <p class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Highest Risk Area</p>
                                <div class="bg-white/5 border border-white/10 rounded-xl p-3">
                                    <div class="text-sm font-extrabold text-emerald-400" id="res-risk-title">Analytics &amp; Data</div>
                                    <div class="text-xs text-slate-300 mt-1" id="res-risk-desc">Blind decision making due to data gaps.</div>
                                </div>
                            </div>
                            <div class="blur-md opacity-40 select-none calc-blur transition-all duration-300">
                                <p class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Recommended Path</p>
                                <div class="bg-white/5 border border-white/10 rounded-xl p-4">
                                    <div class="text-base font-extrabold text-white mb-1" id="res-service">Mid-Market Modernization</div>
                                    <div class="text-xs font-bold text-emerald-400" id="res-price">Est: ₹1.25L - ₹3L / mo</div>
                                </div>
                            </div>
                        </div>
                        <div class="relative z-10 mt-6" id="unlock-container">
                            <button onclick="openLeadModal()" class="w-full bg-gradient-to-r from-blue-700 to-emerald-600 hover:from-blue-600 hover:to-emerald-500 text-white font-bold py-4 rounded-xl transition-all text-sm shadow-xl hover:scale-[1.02]">
                                Unlock My Score &amp; Roadmap <i class="fas fa-lock-open ml-1"></i>
                            </button>
                            <p class="text-xs text-slate-500 mt-2 text-center font-medium">Free &mdash; Takes 30 Seconds</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- ─── PRICING CALLOUT STRIP ─── -->
    <section id="services" class="py-20 bg-[#0B0F19] dark:bg-black border-b border-slate-800 relative z-10 overflow-hidden">
        <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_right,_rgba(37,99,235,0.08)_0%,_transparent_60%)] pointer-events-none"></div>
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
            <div>
                <p class="text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3">Transparent Pricing</p>
                <h2 class="text-2xl md:text-4xl font-extrabold text-white leading-tight">From ₹35k/mo to<br class="hidden md:block"> Enterprise Dev Pods</h2>
                <p class="text-slate-400 text-sm mt-3 max-w-md">Scope-matched retainers with no hidden costs. Every engagement starts with a Digital Maturity Audit.</p>
            </div>
            <a href="/pricing" class="flex-shrink-0 inline-flex items-center gap-3 bg-white hover:bg-slate-100 text-slate-950 font-extrabold px-8 py-4 rounded-full transition-all text-sm shadow-xl hover:-translate-y-0.5 transform whitespace-nowrap">
                View All Packages <i class="fas fa-arrow-right text-xs"></i>
            </a>
        </div>
    </section>

    <!-- ─── BOOKING SECTION ─── -->
    <section id="booking-section" class="py-24 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 dark:from-black dark:via-slate-950 dark:to-blue-950 text-white relative z-10 border-t border-slate-800">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div class="lg:col-span-6 space-y-6">
                    <div class="inline-flex items-center gap-2 px-3.5 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-xs font-bold text-emerald-400 uppercase tracking-wider">
                        Direct Advisory Access
                    </div>
                    <h2 class="text-3xl md:text-5xl font-extrabold leading-tight">
                        Book a 15-Min Call to Map Your <span class="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">Digital Setup, Scale-Up or Agentic Workflows</span>
                    </h2>
                    <p class="text-slate-300 text-base leading-relaxed">Speak directly with an Executive Architect. No sales fluff. We analyze your tech stack, outline operational bottlenecks, and deliver an actionable 12-month blueprint.</p>
                    <div class="space-y-4 pt-2">
                        <div class="flex items-start gap-3">
                            <div class="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs mt-0.5"><i class="fas fa-check"></i></div>
                            <div>
                                <h3 class="font-bold text-white text-sm">For MSMEs: Setup &amp; Growth Roadmap</h3>
                                <p class="text-xs text-slate-500">High-converting web platforms, Tally ERP sync &amp; lead intake systems.</p>
                            </div>
                        </div>
                        <div class="flex items-start gap-3">
                            <div class="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs mt-0.5"><i class="fas fa-check"></i></div>
                            <div>
                                <h3 class="font-bold text-white text-sm">For Enterprises: Agentic Operations</h3>
                                <p class="text-xs text-slate-500">Custom Next.js web applications, workflow automation &amp; custom API middleware.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="lg:col-span-6">
                    <div class="bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-3xl p-8 shadow-2xl border border-slate-200 dark:border-slate-700">
                        <h3 class="text-2xl font-extrabold mb-2 dark:text-white">Schedule Your Strategy Call</h3>
                        <p class="text-xs text-slate-500 dark:text-slate-400 mb-6">Select your primary track and pick your preferred time.</p>
                        <form onsubmit="handleDirectBookingSubmit(event)" class="space-y-4">
                            <div>
                                <label class="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">Full Name *</label>
                                <input type="text" name="fullName" required class="w-full border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white dark:bg-slate-800 dark:text-white dark:placeholder-slate-500" placeholder="e.g. Vikram Mehta">
                            </div>
                            <div>
                                <label class="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">Work Email / WhatsApp *</label>
                                <input type="text" name="contactInfo" required class="w-full border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white dark:bg-slate-800 dark:text-white dark:placeholder-slate-500" placeholder="vikram@company.com or +91 98765...">
                            </div>
                            <div>
                                <label class="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">Company / Brand Name *</label>
                                <input type="text" name="companyName" required class="w-full border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white dark:bg-slate-800 dark:text-white dark:placeholder-slate-500" placeholder="Your Business Name">
                            </div>
                            <div>
                                <label class="block text-xs font-bold uppercase text-slate-700 dark:text-slate-300 mb-1">Primary Growth Track *</label>
                                <select aria-label="Business Segment" name="segment" required class="w-full border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white dark:bg-slate-800 dark:text-white">
                                    <option value="MSME Platform &amp; Growth">MSME: Digital Setup &amp; Scale-Up</option>
                                    <option value="Enterprise Agentic Ops">Enterprise: Custom Dev &amp; Agentic Workflows</option>
                                    <option value="General Audit">Digital Maturity Audit (1-Week)</option>
                                </select>
                            </div>
                            <button type="submit" class="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-4 rounded-xl transition-all text-sm shadow-lg shadow-blue-700/25">
                                Confirm 15-Min Call Request &rarr;
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- ─── FAQ ─── -->
    <section id="faq" class="py-24 bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 relative z-10">
        <div class="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16">
                <p class="text-xs font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400 mb-3">FAQ</p>
                <h2 class="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4">Everything You Need to <span class="text-gradient-blue">Know</span></h2>
                <p class="text-slate-500 dark:text-slate-400 max-w-xl mx-auto text-sm font-medium">Direct answers to common questions about our Digital Maturity Audit, pricing, and technology integrations.</p>
            </div>
            <div class="space-y-4">
                <details class="group rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 overflow-hidden cursor-pointer">
                    <summary class="flex items-center justify-between p-6 font-extrabold text-slate-900 dark:text-white text-base list-none select-none">
                        <span class="flex items-center gap-3"><i class="fas fa-circle-question text-blue-700 dark:text-blue-400"></i> What is the 1-Week Digital Maturity Audit?</span>
                        <i class="fas fa-chevron-down text-slate-400 text-xs group-open:rotate-180 transition-transform duration-200"></i>
                    </summary>
                    <div class="px-6 pb-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-5 space-y-3">
                        <p>A 7-day intensive technical evaluation for <strong>₹35,000</strong> (100% credited toward your retainer) that pinpoints technical debt and operational bottlenecks.</p>
                        <p class="font-bold text-slate-800 dark:text-white">What We Deliver:</p>
                        <ul class="list-disc list-inside space-y-1 text-slate-500 dark:text-slate-400 text-xs pl-2">
                            <li>Technical Debt &amp; Load Speed Diagnostic</li>
                            <li>Conversion Funnel Leakage Report</li>
                            <li>Custom System Architecture Diagram (Current vs. Future)</li>
                            <li>12-Month Operational Modernization Roadmap PDF</li>
                        </ul>
                    </div>
                </details>
                <details class="group rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 overflow-hidden cursor-pointer">
                    <summary class="flex items-center justify-between p-6 font-extrabold text-slate-900 dark:text-white text-base list-none select-none">
                        <span class="flex items-center gap-3"><i class="fas fa-circle-question text-emerald-600 dark:text-emerald-400"></i> What are Naxa.One's retainer pricing tiers?</span>
                        <i class="fas fa-chevron-down text-slate-400 text-xs group-open:rotate-180 transition-transform duration-200"></i>
                    </summary>
                    <div class="px-6 pb-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-5">
                        3 transparent retainer tiers: <strong>Tier 1 (SMB Sprint)</strong> at ₹35,000–₹75,000/mo, <strong>Tier 2 (Mid-Market Scale)</strong> at ₹1.25L–₹3.0L/mo, and <strong>Tier 3 (Enterprise Pod)</strong> at ₹5.0L+/mo.
                    </div>
                </details>
                <details class="group rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 overflow-hidden cursor-pointer">
                    <summary class="flex items-center justify-between p-6 font-extrabold text-slate-900 dark:text-white text-base list-none select-none">
                        <span class="flex items-center gap-3"><i class="fas fa-circle-question text-purple-600 dark:text-purple-400"></i> How does Tally ERP &amp; WhatsApp integration work?</span>
                        <i class="fas fa-chevron-down text-slate-400 text-xs group-open:rotate-180 transition-transform duration-200"></i>
                    </summary>
                    <div class="px-6 pb-6 text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-100 dark:border-slate-800 pt-5">
                        We build custom web middleware connecting your web forms, CRM, or eCommerce store directly to Tally ERP and Interakt/WhatsApp APIs, eliminating manual data entry and speeding up order processing.
                    </div>
                </details>
            </div>
        </div>
    </section>

    <!-- ─── FOOTER ─── -->
    <footer id="contact" class="bg-slate-950 dark:bg-black text-white border-t border-slate-800 pt-16 pb-8">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                <div class="col-span-1 md:col-span-2">
                    <div class="flex items-center gap-3 mb-4">
                        <img src="logo.png" alt="Naxa.One Logo" class="w-8 h-8 object-contain rounded">
                        <span class="font-extrabold text-lg text-white">Naxa<span class="text-emerald-500">.</span>One</span>
                    </div>
                    <p class="text-slate-400 text-sm max-w-sm mb-6">Bridging the gap between executive vision and flawless digital execution. Elevating Indian businesses through technology and literacy.</p>
                    <div class="flex space-x-4">
                        <a href="#" class="text-slate-400 hover:text-emerald-400 transition-colors"><i class="fab fa-linkedin text-xl"></i></a>
                        <a href="#" class="text-slate-400 hover:text-emerald-400 transition-colors"><i class="fab fa-twitter text-xl"></i></a>
                        <a href="#" class="text-slate-400 hover:text-emerald-400 transition-colors"><i class="fab fa-github text-xl"></i></a>
                    </div>
                </div>
                <div>
                    <h3 class="text-white font-bold mb-4">Get in Touch</h3>
                    <div class="text-sm text-slate-400 space-y-2">
                        <p>Digital Advisory &amp; Development</p>
                        <p><a href="mailto:hello@naxa.one" class="text-emerald-400 hover:underline font-bold">hello@naxa.one</a></p>
                    </div>
                </div>
                <div>
                    <h3 class="text-white font-bold mb-4">Service Hubs</h3>
                    <ul class="text-sm text-slate-400 space-y-2">
                        <li><a href="/ecommerce" class="hover:text-white transition-colors">Sell Online (eCommerce)</a></li>
                        <li><a href="/content" class="hover:text-white transition-colors">Look Professional (Content)</a></li>
                        <li><a href="/seo" class="hover:text-white transition-colors">Get Found (SEO)</a></li>
                        <li><a href="/smm" class="hover:text-white transition-colors">Build Following (SMM)</a></li>
                    </ul>
                </div>
            </div>
            <div class="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center">
                <p class="text-slate-500 text-xs">© 2026 Naxa.One. All rights reserved.</p>
                <p class="text-slate-500 text-xs mt-2 md:mt-0">Designed for scale.</p>
            </div>
        </div>
    </footer>`;

// Find the old trust bar section and replace it AND everything up to the footer closing tag
// We replace from trust bar all the way through old footer close
const oldFooterEnd = `    <!-- Interactive Logic & Animations -->`;

if (html.includes(oldSections)) {
    const restStart = html.indexOf(oldSections);
    const restEnd = html.indexOf(oldFooterEnd);
    const before = html.slice(0, restStart);
    const after = html.slice(restEnd);
    html = before + newSections + '\n\n    ' + after.slice(4); // keep the scripts
    changes++;
    console.log('✓ Replaced all below-hero sections with new editorial/glassmorphic design');
} else {
    console.warn('✗ Could not find exact trust bar anchor — trying marquee fallback...');
    // Fallback: find the marquee ticker (old duplicate) and delete, replace from results section
    const altStart = `    <!-- Infinite Looping Marquee Ticker`;
    const altEnd = oldFooterEnd;
    if (html.includes(altStart) && html.includes(altEnd)) {
        const s = html.indexOf(altStart);
        const e = html.indexOf(altEnd);
        const before = html.slice(0, s);
        const after = html.slice(e);
        html = before + newSections + '\n\n    ' + after.slice(4);
        changes++;
        console.log('✓ [Fallback] Replaced all below-hero sections');
    } else {
        console.warn('✗ Could not replace below-hero sections — manual edit required');
    }
}

// ─────────────────────────────────────────────────────────────
// 6. DARK MODE: Add toggleTheme() JS function before </body>
// ─────────────────────────────────────────────────────────────
const themeScript = `
    <!-- Theme Toggle Logic -->
    <script>
        function toggleTheme() {
            const html = document.documentElement;
            const isDark = html.classList.toggle('dark');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        }
    </script>
`;

if (!html.includes('function toggleTheme')) {
    html = html.replace('</body>', themeScript + '\n</body>');
    changes++;
    console.log('✓ toggleTheme() script injected');
}

// ─────────────────────────────────────────────────────────────
// 7. Add Tailwind darkMode config hint via cdn (already loaded via styles.css — ensure body gets it)
// ─────────────────────────────────────────────────────────────

fs.writeFileSync('index.html', html);
console.log(`\n✅ Done. ${changes} changes applied.`);
