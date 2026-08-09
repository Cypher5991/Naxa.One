/**
 * apply_editorial_refresh.js
 * 
 * Applies the editorial design refresh to index.html:
 * 1. Hero typewriter effect on the animated span
 * 2. De-cardify #philosophy section (editorial row format)
 * 3. De-cardify #hubs section (numbered index list)
 * 4. Trim content density in case studies, digital literacy, operations
 * 5. Simplify client logo bar
 */

const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8').replace(/\r\n/g, '\n');

let changeCount = 0;

function replace(target, replacement, label) {
    if (html.includes(target)) {
        html = html.replace(target, replacement);
        changeCount++;
        console.log(`✓ Applied: ${label}`);
    } else {
        console.warn(`✗ SKIPPED (not found): ${label}`);
    }
}

// ─────────────────────────────────────────────────────────────
// 1. HERO: Add typewriter markup into the h1 headline
// ─────────────────────────────────────────────────────────────
replace(
    `<h1 class="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-950 mb-6 leading-[1.08]">
                    From Digital Setup to Agentic Scale: We Build & <span class="bg-gradient-to-r from-blue-700 via-blue-600 to-emerald-600 bg-clip-text text-transparent">Accelerate Your Growth Engine</span>
                </h1>`,
    `<h1 class="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-950 mb-6 leading-[1.08]">
                    From Digital Setup to Agentic Scale —<br>
                    <span class="bg-gradient-to-r from-blue-700 via-blue-600 to-emerald-600 bg-clip-text text-transparent" id="typewriter-target"></span><span class="typewriter-cursor text-blue-700">|</span>
                </h1>`,
    'Hero typewriter markup'
);

// ─────────────────────────────────────────────────────────────
// 2. HERO: Slim down the sub-paragraph
// ─────────────────────────────────────────────────────────────
replace(
    `<p class="mt-4 text-base md:text-lg text-slate-800 font-semibold leading-relaxed mb-8">
                    Whether you are an MSME building your foundational web presence or an Enterprise deploying custom agentic workflows & ERP integrations, we deliver measurable ROI.
                </p>`,
    `<p class="mt-4 text-base md:text-lg text-slate-700 font-medium leading-relaxed mb-8 max-w-xl">
                    From foundational web presence to enterprise-grade agentic workflows — we architect measurable digital growth.
                </p>`,
    'Hero sub-paragraph trimmed'
);

// ─────────────────────────────────────────────────────────────
// 3. CLIENT LOGO BAR: Remove bordered boxes, use clean inline text
// ─────────────────────────────────────────────────────────────
replace(
    `<div class="flex flex-wrap justify-center gap-4 items-center opacity-60 hover:opacity-100 transition-all duration-500 grayscale hover:grayscale-0">
                <div class="bg-white border border-slate-300 rounded-lg px-5 py-2.5 font-extrabold text-slate-700 text-sm tracking-wide shadow-sm">BHARTI CORP</div>
                <div class="bg-white border border-slate-300 rounded-lg px-5 py-2.5 font-extrabold text-slate-700 text-sm tracking-wide shadow-sm">VEGA RETAIL</div>
                <div class="bg-white border border-slate-300 rounded-lg px-5 py-2.5 font-extrabold text-slate-700 text-sm tracking-wide shadow-sm">KRISHNA ERP</div>
                <div class="bg-white border border-slate-300 rounded-lg px-5 py-2.5 font-extrabold text-slate-700 text-sm tracking-wide shadow-sm">MERIDIAN Co.</div>
                <div class="bg-white border border-slate-300 rounded-lg px-5 py-2.5 font-extrabold text-slate-700 text-sm tracking-wide shadow-sm">NEXO TRADE</div>
                <div class="bg-white border border-slate-300 rounded-lg px-5 py-2.5 font-extrabold text-slate-700 text-sm tracking-wide shadow-sm">SIGMA LABS</div>
            </div>`,
    `<div class="flex flex-wrap justify-center gap-x-10 gap-y-3 items-center opacity-50 hover:opacity-90 transition-all duration-500">
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
            </div>`,
    'Client logos de-boxed'
);

// ─────────────────────────────────────────────────────────────
// 4. CASE STUDIES: Replace card grid with editorial numbered rows
// ─────────────────────────────────────────────────────────────
replace(
    `<!-- Micro Case Study Cards -->
    <section class="py-12 bg-white border-b border-slate-200 relative z-10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-10">
                <div class="inline-block px-3 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold uppercase tracking-wider mb-3">Real Results</div>
                <h2 class="text-3xl font-extrabold text-slate-900">Client <span class="bg-gradient-to-r from-blue-700 to-emerald-600 bg-clip-text text-transparent">Success Stories</span></h2>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div class="glass-card rounded-2xl p-6 border-l-4 border-l-blue-700">
                    <div class="flex items-center gap-2 mb-3"><span class="text-xs font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full">eCommerce</span></div>
                    <h3 class="font-bold text-slate-900 mb-1">Regional Garment Retailer</h3>
                    <p class="text-xs text-slate-500 mb-2"><strong>Problem:</strong> Manual Tally entries causing 6hr daily overhead</p>
                    <p class="text-xs text-slate-500 mb-4"><strong>Stack:</strong> Next.js + Tally ERP Middleware + WhatsApp API</p>
                    <div class="text-2xl font-extrabold text-blue-700">4.1x <span class="text-sm font-semibold text-slate-600">Revenue Growth</span></div>
                </div>
                <div class="glass-card rounded-2xl p-6 border-l-4 border-l-emerald-600">
                    <div class="flex items-center gap-2 mb-3"><span class="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">SEO + Web</span></div>
                    <h3 class="font-bold text-slate-900 mb-1">B2B Industrial Supplier</h3>
                    <p class="text-xs text-slate-500 mb-2"><strong>Problem:</strong> Zero organic traffic, no digital presence</p>
                    <p class="text-xs text-slate-500 mb-4"><strong>Stack:</strong> Technical SEO + GA4 + CRM Integration</p>
                    <div class="text-2xl font-extrabold text-emerald-600">&#8377;22L <span class="text-sm font-semibold text-slate-600">New Pipeline / Qtr</span></div>
                </div>
                <div class="glass-card rounded-2xl p-6 border-l-4 border-l-amber-600">
                    <div class="flex items-center gap-2 mb-3"><span class="text-xs font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full">Full Retainer</span></div>
                    <h3 class="font-bold text-slate-900 mb-1">MSME Food Brand</h3>
                    <p class="text-xs text-slate-500 mb-2"><strong>Problem:</strong> Siloed ops, no brand, low-conversion website</p>
                    <p class="text-xs text-slate-500 mb-4"><strong>Stack:</strong> Brand + eCommerce + Social + WhatsApp</p>
                    <div class="text-2xl font-extrabold text-amber-600">98% <span class="text-sm font-semibold text-slate-600">Retention Rate</span></div>
                </div>
            </div>
        </div>
    </section>`,
    `<!-- Results — Editorial Rows -->
    <section class="py-16 bg-white border-b border-slate-200 relative z-10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-end justify-between mb-10 border-b border-slate-100 pb-6">
                <h2 class="text-3xl font-extrabold text-slate-900">What We've <span class="bg-gradient-to-r from-blue-700 to-emerald-600 bg-clip-text text-transparent">Built</span></h2>
                <span class="text-xs font-bold text-slate-400 uppercase tracking-wider">Selected Work</span>
            </div>
            <div class="divide-y divide-slate-100">
                <!-- Row 1 -->
                <div class="flex items-center justify-between py-6 group cursor-default">
                    <div class="flex items-center gap-6 md:gap-10">
                        <span class="text-xs font-bold text-slate-300 tabular-nums w-6">01</span>
                        <div>
                            <div class="font-extrabold text-slate-900 text-base md:text-lg group-hover:text-blue-700 transition-colors">Regional Garment Retailer</div>
                            <div class="text-xs text-slate-500 mt-0.5">Tally ERP Middleware + WhatsApp API + Next.js</div>
                        </div>
                    </div>
                    <div class="text-right flex-shrink-0 ml-4">
                        <div class="text-xl md:text-2xl font-extrabold text-blue-700">4.1×</div>
                        <div class="text-xs text-slate-500">Revenue Growth</div>
                    </div>
                </div>
                <!-- Row 2 -->
                <div class="flex items-center justify-between py-6 group cursor-default">
                    <div class="flex items-center gap-6 md:gap-10">
                        <span class="text-xs font-bold text-slate-300 tabular-nums w-6">02</span>
                        <div>
                            <div class="font-extrabold text-slate-900 text-base md:text-lg group-hover:text-emerald-700 transition-colors">B2B Industrial Supplier</div>
                            <div class="text-xs text-slate-500 mt-0.5">Technical SEO + GA4 Dashboard + CRM Integration</div>
                        </div>
                    </div>
                    <div class="text-right flex-shrink-0 ml-4">
                        <div class="text-xl md:text-2xl font-extrabold text-emerald-600">₹22L</div>
                        <div class="text-xs text-slate-500">New Pipeline / Qtr</div>
                    </div>
                </div>
                <!-- Row 3 -->
                <div class="flex items-center justify-between py-6 group cursor-default">
                    <div class="flex items-center gap-6 md:gap-10">
                        <span class="text-xs font-bold text-slate-300 tabular-nums w-6">03</span>
                        <div>
                            <div class="font-extrabold text-slate-900 text-base md:text-lg group-hover:text-amber-700 transition-colors">MSME Food Brand</div>
                            <div class="text-xs text-slate-500 mt-0.5">Brand Identity + eCommerce + Social + WhatsApp</div>
                        </div>
                    </div>
                    <div class="text-right flex-shrink-0 ml-4">
                        <div class="text-xl md:text-2xl font-extrabold text-amber-600">98%</div>
                        <div class="text-xs text-slate-500">Client Retention</div>
                    </div>
                </div>
            </div>
        </div>
    </section>`,
    'Case study cards → editorial rows'
);

// ─────────────────────────────────────────────────────────────
// 5. PHILOSOPHY SECTION: Replace 3-card grid with editorial layout
// ─────────────────────────────────────────────────────────────
replace(
    `    <!-- The Problem & Philosophy -->
    <section id="philosophy" class="py-12 relative z-10 bg-white border-b border-slate-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16 animate-on-scroll">
                <h2 class="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Why most digital projects <span class="text-gradient-blue">fail.</span></h2>
                <p class="text-slate-600 max-w-2xl mx-auto font-medium">Most agencies keep you in the dark to create dependency. We educate you so you can own your digital future. We call it <span class="text-slate-900 font-bold">Digital Literacy.</span></p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                
                <div class="col-span-1 md:col-span-3 mb-8">
                    <img src="formal_discussion.webp" alt="Team discussing a project" class="w-full h-80 object-cover rounded-3xl shadow-xl">
                </div>

                <!-- Card 1 -->
                <div class="glass-card rounded-2xl p-8 animate-on-scroll border-t-4 border-t-slate-700">
                    <div class="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center mb-6 text-slate-800 font-bold">
                        <i class="fas fa-link-slash text-xl"></i>
                    </div>
                    <h3 class="text-xl font-bold text-slate-900 mb-3">Siloed Systems</h3>
                    <p class="text-slate-600 text-sm leading-relaxed">Your CRM doesn't talk to your Tally ERP, and web leads sit in an inbox for hours. Manual data entry is draining your team's energy and killing speed.</p>
                </div>
                <!-- Card 2 -->
                <div class="glass-card rounded-2xl p-8 animate-on-scroll border-t-4 border-t-blue-700" style="transition-delay: 100ms;">
                    <div class="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-6 text-blue-700 font-bold">
                        <i class="fas fa-chart-pie text-xl"></i>
                    </div>
                    <h3 class="text-xl font-bold text-slate-900 mb-3">Blind Analytics</h3>
                    <p class="text-slate-600 text-sm leading-relaxed">You have Google Analytics installed, but nobody knows what it means. Decisions are made on gut feeling rather than attribution models and hard data.</p>
                </div>
                <!-- Card 3 -->
                <div class="glass-card rounded-2xl p-8 animate-on-scroll border-t-4 border-t-emerald-600" style="transition-delay: 200ms;">
                    <div class="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center mb-6 text-emerald-700 font-bold">
                        <i class="fas fa-handshake-angle text-xl"></i>
                    </div>
                    <h3 class="text-xl font-bold text-slate-900 mb-3">The Naxa.One Fix</h3>
                    <p class="text-slate-600 text-sm leading-relaxed">We build the bridges. From WhatsApp APIs to custom dashboards, we establish solutions using agents and programs, and train your internal team so you are never held hostage by code.</p>
                </div>
            </div>
        </div>
    </section>`,
    `    <!-- The Problem & Philosophy — Editorial -->
    <section id="philosophy" class="py-20 relative z-10 bg-white border-b border-slate-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <!-- Left: Full-bleed image -->
                <div class="relative">
                    <img src="formal_discussion.webp" alt="Naxa.One team in a strategy session" class="w-full h-[480px] object-cover rounded-2xl shadow-lg">
                    <div class="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-sm rounded-xl p-4 border border-slate-100 shadow-sm">
                        <p class="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Our Approach</p>
                        <p class="text-sm font-bold text-slate-900">Build → Automate → Train. You own the outcome.</p>
                    </div>
                </div>
                <!-- Right: Editorial text -->
                <div class="space-y-10">
                    <div>
                        <h2 class="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight mb-4">Why most digital<br>projects <span class="text-blue-700">fail.</span></h2>
                        <p class="text-slate-500 text-base leading-relaxed">Most agencies create dependency. We build your capability instead.</p>
                    </div>
                    <div class="space-y-8">
                        <div class="flex gap-5">
                            <div class="flex-shrink-0 w-8 h-8 rounded-full border-2 border-slate-800 flex items-center justify-center">
                                <i class="fas fa-link-slash text-slate-800 text-xs"></i>
                            </div>
                            <div>
                                <h3 class="font-extrabold text-slate-900 mb-1">Siloed Systems</h3>
                                <p class="text-slate-500 text-sm leading-relaxed">Your CRM, Tally, and web platform don't communicate. Manual data entry drains hours every day.</p>
                            </div>
                        </div>
                        <div class="flex gap-5">
                            <div class="flex-shrink-0 w-8 h-8 rounded-full border-2 border-blue-700 flex items-center justify-center">
                                <i class="fas fa-chart-pie text-blue-700 text-xs"></i>
                            </div>
                            <div>
                                <h3 class="font-extrabold text-slate-900 mb-1">Blind Analytics</h3>
                                <p class="text-slate-500 text-sm leading-relaxed">You have GA4 installed but no one reads it. Decisions run on gut, not data.</p>
                            </div>
                        </div>
                        <div class="flex gap-5">
                            <div class="flex-shrink-0 w-8 h-8 rounded-full border-2 border-emerald-600 flex items-center justify-center">
                                <i class="fas fa-handshake-angle text-emerald-600 text-xs"></i>
                            </div>
                            <div>
                                <h3 class="font-extrabold text-slate-900 mb-1">The Naxa.One Fix</h3>
                                <p class="text-slate-500 text-sm leading-relaxed">We bridge the gaps, automate the grind, and train your team. No hostage code. You own it.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>`,
    'Philosophy section → editorial 2-col with image'
);

// ─────────────────────────────────────────────────────────────
// 6. DIGITAL LITERACY SECTION: Trim copy density
// ─────────────────────────────────────────────────────────────
replace(
    `                <p class="text-slate-300 text-base leading-relaxed mb-8">
                    Most agencies keep you in the dark to create dependency. Every Naxa.One retainer includes a monthly <strong>Digital Literacy session</strong> where we train your staff on Google Analytics 4, CRM pipeline hygiene, and WhatsApp template builders. We don't just write code; we elevate your team's digital capability.
                </p>`,
    `                <p class="text-slate-400 text-base leading-relaxed mb-8">
                    Every retainer includes monthly <strong class="text-white">Digital Literacy sessions</strong> — GA4, CRM hygiene, WhatsApp builder training. We elevate capability, not dependence.
                </p>`,
    'Digital literacy paragraph trimmed'
);

// ─────────────────────────────────────────────────────────────
// 7. OPERATIONS SECTION: Trim the long paragraph
// ─────────────────────────────────────────────────────────────
replace(
    `                    <p class="text-slate-600 text-sm leading-relaxed">
                        Stop letting your operations team manually type web orders into Tally. We build custom middleware bridges that instantly sync transactions, update inventory across channels, and trigger automatic WhatsApp order receipts to your customers.
                    </p>`,
    `                    <p class="text-slate-500 text-sm leading-relaxed">
                        Web orders synced to Tally the moment they're placed. Inventory updated. WhatsApp receipts fired automatically. Zero manual entry.
                    </p>`,
    'Operations paragraph trimmed'
);

// ─────────────────────────────────────────────────────────────
// 8. HUBS SECTION: Replace 4-box card grid with editorial index list
// ─────────────────────────────────────────────────────────────
replace(
    `    <section id="hubs" class="py-12 relative z-10 bg-white border-b border-slate-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16 animate-on-scroll">
                <h2 class="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Explore Our <span class="text-gradient-blue">Dedicated Service Hubs</span></h2>
                <p class="text-slate-600 max-w-2xl mx-auto font-medium">Deep-dive into individual development pillars to see how each drives measurable ROI for your business.</p>
            </div>

            <img src="customers_collage.webp" class="w-full h-80 object-cover rounded-3xl shadow-xl mb-12" alt="Naxa.One Hubs">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <!-- eCommerce -->
                <a href="/ecommerce" class="glass-card rounded-2xl p-6 flex flex-col justify-between group hover:border-blue-600 transition-all animate-on-scroll">
                    <div>
                        <div class="w-12 h-12 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center text-xl font-bold mb-4 group-hover:scale-110 transition-transform">
                            🛒
                        </div>
                        <h3 class="text-lg font-bold text-slate-900 mb-2">Sell Online</h3>
                        <p class="text-xs text-slate-600 leading-relaxed mb-4">High-converting eCommerce stores, checkout optimization, and ERP inventory sync.</p>
                    </div>
                    <span class="text-xs font-bold text-blue-700 flex items-center gap-1 group-hover:gap-2 transition-all">Explore eCommerce Hub <i class="fas fa-arrow-right"></i></span>
                </a>

                <!-- Content -->
                <a href="/content" class="glass-card rounded-2xl p-6 flex flex-col justify-between group hover:border-blue-600 transition-all animate-on-scroll">
                    <div>
                        <div class="w-12 h-12 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center text-xl font-bold mb-4 group-hover:scale-110 transition-transform">
                            ✨
                        </div>
                        <h3 class="text-lg font-bold text-slate-900 mb-2">Look Professional</h3>
                        <p class="text-xs text-slate-600 leading-relaxed mb-4">Brand guidelines, copywriting, and visual assets that build instant trust.</p>
                    </div>
                    <span class="text-xs font-bold text-blue-700 flex items-center gap-1 group-hover:gap-2 transition-all">Explore Content Hub <i class="fas fa-arrow-right"></i></span>
                </a>

                <!-- SEO -->
                <a href="/seo" class="glass-card rounded-2xl p-6 flex flex-col justify-between group hover:border-blue-600 transition-all animate-on-scroll">
                    <div>
                        <div class="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center text-xl font-bold mb-4 group-hover:scale-110 transition-transform">
                            📍
                        </div>
                        <h3 class="text-lg font-bold text-slate-900 mb-2">Get Found on Google</h3>
                        <p class="text-xs text-slate-600 leading-relaxed mb-4">Technical SEO, keyword dominance, and high-authority organic traffic.</p>
                    </div>
                    <span class="text-xs font-bold text-blue-700 flex items-center gap-1 group-hover:gap-2 transition-all">Explore SEO Hub <i class="fas fa-arrow-right"></i></span>
                </a>

                <!-- SMM -->
                <a href="/smm" class="glass-card rounded-2xl p-6 flex flex-col justify-between group hover:border-blue-600 transition-all animate-on-scroll">
                    <div>
                        <div class="w-12 h-12 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center text-xl font-bold mb-4 group-hover:scale-110 transition-transform">
                            🤝
                        </div>
                        <h3 class="text-lg font-bold text-slate-900 mb-2">Build a Following</h3>
                        <p class="text-xs text-slate-600 leading-relaxed mb-4">Targeted social media campaigns, video assets, and community growth.</p>
                    </div>
                    <span class="text-xs font-bold text-blue-700 flex items-center gap-1 group-hover:gap-2 transition-all">Explore Social Hub <i class="fas fa-arrow-right"></i></span>
                </a>
            </div>
        </div>
    </section>`,
    `    <!-- Service Index — Editorial -->
    <section id="hubs" class="py-20 relative z-10 bg-white border-b border-slate-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-end justify-between mb-12 border-b border-slate-100 pb-6">
                <h2 class="text-3xl md:text-4xl font-extrabold text-slate-900">Our <span class="text-blue-700">Services</span></h2>
                <img src="customers_collage.webp" class="h-16 w-40 object-cover rounded-lg opacity-80" alt="Naxa.One clients">
            </div>
            <!-- Index List -->
            <div class="divide-y divide-slate-100">
                <!-- 01 -->
                <a href="/ecommerce" class="group flex items-center justify-between py-7 hover:pl-2 transition-all duration-300">
                    <div class="flex items-center gap-6 md:gap-12">
                        <span class="text-xs font-bold text-slate-300 tabular-nums w-6 group-hover:text-blue-700 transition-colors">01</span>
                        <div>
                            <h3 class="text-xl md:text-2xl font-extrabold text-slate-900 group-hover:text-blue-700 transition-colors">Sell Online</h3>
                            <p class="text-sm text-slate-400 mt-0.5">eCommerce · Tally ERP Sync · Checkout Optimisation</p>
                        </div>
                    </div>
                    <span class="flex-shrink-0 flex items-center gap-2 text-sm font-bold text-slate-300 group-hover:text-blue-700 group-hover:gap-4 transition-all">
                        Explore <i class="fas fa-arrow-right text-xs"></i>
                    </span>
                </a>
                <!-- 02 -->
                <a href="/content" class="group flex items-center justify-between py-7 hover:pl-2 transition-all duration-300">
                    <div class="flex items-center gap-6 md:gap-12">
                        <span class="text-xs font-bold text-slate-300 tabular-nums w-6 group-hover:text-purple-700 transition-colors">02</span>
                        <div>
                            <h3 class="text-xl md:text-2xl font-extrabold text-slate-900 group-hover:text-purple-700 transition-colors">Look Professional</h3>
                            <p class="text-sm text-slate-400 mt-0.5">Brand Identity · Copywriting · Visual Assets</p>
                        </div>
                    </div>
                    <span class="flex-shrink-0 flex items-center gap-2 text-sm font-bold text-slate-300 group-hover:text-purple-700 group-hover:gap-4 transition-all">
                        Explore <i class="fas fa-arrow-right text-xs"></i>
                    </span>
                </a>
                <!-- 03 -->
                <a href="/seo" class="group flex items-center justify-between py-7 hover:pl-2 transition-all duration-300">
                    <div class="flex items-center gap-6 md:gap-12">
                        <span class="text-xs font-bold text-slate-300 tabular-nums w-6 group-hover:text-emerald-700 transition-colors">03</span>
                        <div>
                            <h3 class="text-xl md:text-2xl font-extrabold text-slate-900 group-hover:text-emerald-700 transition-colors">Get Found on Google</h3>
                            <p class="text-sm text-slate-400 mt-0.5">Technical SEO · Keyword Dominance · Organic Traffic</p>
                        </div>
                    </div>
                    <span class="flex-shrink-0 flex items-center gap-2 text-sm font-bold text-slate-300 group-hover:text-emerald-700 group-hover:gap-4 transition-all">
                        Explore <i class="fas fa-arrow-right text-xs"></i>
                    </span>
                </a>
                <!-- 04 -->
                <a href="/smm" class="group flex items-center justify-between py-7 hover:pl-2 transition-all duration-300">
                    <div class="flex items-center gap-6 md:gap-12">
                        <span class="text-xs font-bold text-slate-300 tabular-nums w-6 group-hover:text-amber-700 transition-colors">04</span>
                        <div>
                            <h3 class="text-xl md:text-2xl font-extrabold text-slate-900 group-hover:text-amber-700 transition-colors">Build a Following</h3>
                            <p class="text-sm text-slate-400 mt-0.5">Social Media · Video Assets · Community Growth</p>
                        </div>
                    </div>
                    <span class="flex-shrink-0 flex items-center gap-2 text-sm font-bold text-slate-300 group-hover:text-amber-700 group-hover:gap-4 transition-all">
                        Explore <i class="fas fa-arrow-right text-xs"></i>
                    </span>
                </a>
                <!-- 05 — Pricing -->
                <a href="/pricing" class="group flex items-center justify-between py-7 hover:pl-2 transition-all duration-300">
                    <div class="flex items-center gap-6 md:gap-12">
                        <span class="text-xs font-bold text-slate-300 tabular-nums w-6 group-hover:text-slate-900 transition-colors">05</span>
                        <div>
                            <h3 class="text-xl md:text-2xl font-extrabold text-slate-900 group-hover:text-slate-900 transition-colors">View Retainer Pricing</h3>
                            <p class="text-sm text-slate-400 mt-0.5">SMB Sprints · Mid-Market · Enterprise Dev Pods</p>
                        </div>
                    </div>
                    <span class="flex-shrink-0 flex items-center gap-2 text-sm font-bold text-slate-300 group-hover:text-slate-900 group-hover:gap-4 transition-all">
                        Explore <i class="fas fa-arrow-right text-xs"></i>
                    </span>
                </a>
            </div>
        </div>
    </section>`,
    'Hubs card grid → editorial numbered index'
);

// ─────────────────────────────────────────────────────────────
// 9. RETAINER SERVICES SECTION: Simplify / remove repetitive dark box
//    (already linked in hubs index, make it minimal)
// ─────────────────────────────────────────────────────────────
replace(
    `    <section id="services" class="py-12 relative z-10 bg-slate-50 border-b border-slate-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 rounded-3xl p-10 md:p-14 text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8 animate-on-scroll">
                <div class="max-w-2xl">
                    <span class="text-emerald-400 font-extrabold text-xs tracking-wider uppercase bg-emerald-500/20 px-3.5 py-1 rounded-full border border-emerald-500/30 mb-4 inline-block">Transparent Retainer Pricing</span>
                    <h2 class="text-3xl md:text-5xl font-extrabold mt-3 mb-4">Scalable Retainer Models & Digital Audits</h2>
                    <p class="text-slate-300 text-sm md:text-base leading-relaxed">From lean SMB Sprints (₹35k/mo) to dedicated Enterprise agile dev pods (₹5L+/mo), explore our transparent packages built around tangible business impact.</p>
                </div>
                <div class="flex-shrink-0">
                    <a href="/pricing" class="inline-flex items-center gap-3 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-extrabold px-8 py-4 rounded-full transition-all shadow-lg shadow-emerald-500/20 text-sm transform hover:-translate-y-0.5">
                        View Retainer Pricing & Packages <i class="fas fa-arrow-right"></i>
                    </a>
                </div>
            </div>
        </div>
    </section>`,
    `    <!-- Pricing Callout — Minimal -->
    <section id="services" class="py-16 relative z-10 bg-slate-950 border-b border-slate-800">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
                <p class="text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3">Transparent Pricing</p>
                <h2 class="text-2xl md:text-3xl font-extrabold text-white">From ₹35k/mo to Enterprise Dev Pods</h2>
                <p class="text-slate-400 text-sm mt-2">Scope-matched retainers with no hidden costs.</p>
            </div>
            <a href="/pricing" class="flex-shrink-0 inline-flex items-center gap-3 bg-white hover:bg-slate-100 text-slate-950 font-extrabold px-7 py-3.5 rounded-full transition-all text-sm shadow-lg hover:-translate-y-0.5 transform">
                View Pricing <i class="fas fa-arrow-right"></i>
            </a>
        </div>
    </section>`,
    'Services section → minimal pricing callout strip'
);

// ─────────────────────────────────────────────────────────────
// 10. INJECT TYPEWRITER SCRIPT before </body>
// ─────────────────────────────────────────────────────────────
const typewriterScript = `
    <!-- Typewriter Effect -->
    <script>
        (function() {
            const el = document.getElementById('typewriter-target');
            if (!el) return;
            const phrases = [
                'Accelerate Your Growth Engine',
                'Deploy Agentic Workflows',
                'Automate Tally ERP Sync',
                'Scale eCommerce Revenue',
                'Dominate Google Search'
            ];
            let phraseIdx = 0, charIdx = 0, deleting = false;
            const TYPE_SPEED = 55, DELETE_SPEED = 28, PAUSE = 2000;

            function typewriter() {
                const currentPhrase = phrases[phraseIdx];
                if (!deleting) {
                    el.textContent = currentPhrase.slice(0, ++charIdx);
                    if (charIdx === currentPhrase.length) {
                        deleting = true;
                        setTimeout(typewriter, PAUSE);
                        return;
                    }
                } else {
                    el.textContent = currentPhrase.slice(0, --charIdx);
                    if (charIdx === 0) {
                        deleting = false;
                        phraseIdx = (phraseIdx + 1) % phrases.length;
                    }
                }
                setTimeout(typewriter, deleting ? DELETE_SPEED : TYPE_SPEED);
            }

            typewriter();
        })();
    </script>
`;

// Inject typewriter CSS for blinking cursor
const typewriterCSS = `
        /* Typewriter blinking cursor */
        .typewriter-cursor {
            display: inline-block;
            animation: blink 0.75s step-end infinite;
            font-weight: 300;
            margin-left: 1px;
        }
        @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
        }
`;

// Inject CSS before </style>
if (html.includes('/* Typewriter')) {
    console.log('⚠ Typewriter CSS already present, skipping.');
} else {
    const styleCloseIdx = html.lastIndexOf('</style>');
    if (styleCloseIdx !== -1) {
        html = html.slice(0, styleCloseIdx) + typewriterCSS + html.slice(styleCloseIdx);
        changeCount++;
        console.log('✓ Applied: Typewriter CSS injected');
    }
}

// Inject typewriter script before </body>
if (!html.includes('typewriter-target')) {
    console.warn('✗ Typewriter target span not found in HTML — skipping script injection');
} else if (html.includes('Typewriter Effect')) {
    console.log('⚠ Typewriter script already present, skipping.');
} else {
    html = html.replace('</body>', typewriterScript + '\n</body>');
    changeCount++;
    console.log('✓ Applied: Typewriter script injected');
}

fs.writeFileSync('index.html', html);
console.log(`\n✅ Done. ${changeCount} changes applied.`);
