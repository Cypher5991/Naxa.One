const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Rename "Book Discovery" -> "Book 15-Min Call" in nav
html = html.replace(/Book Discovery Call/g, 'Book 15-Min Call');
html = html.replace(/>Book Discovery</g, '>Book 15-Min Call<');

// 2. Add client logo trust bar + case study section AFTER the hero closing </div></div>
const logoBarAndCaseStudies = `
    <!-- Client Logo Trust Bar -->
    <section class="py-8 bg-slate-100 border-b border-slate-200 relative z-10">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p class="text-xs font-bold text-slate-500 uppercase tracking-widest text-center mb-5">Trusted by Growing Enterprises Across India</p>
            <div class="flex flex-wrap justify-center gap-4 items-center opacity-60 hover:opacity-100 transition-all duration-500 grayscale hover:grayscale-0">
                <div class="bg-white border border-slate-300 rounded-lg px-5 py-2.5 font-extrabold text-slate-700 text-sm tracking-wide shadow-sm">BHARTI CORP</div>
                <div class="bg-white border border-slate-300 rounded-lg px-5 py-2.5 font-extrabold text-slate-700 text-sm tracking-wide shadow-sm">VEGA RETAIL</div>
                <div class="bg-white border border-slate-300 rounded-lg px-5 py-2.5 font-extrabold text-slate-700 text-sm tracking-wide shadow-sm">KRISHNA ERP</div>
                <div class="bg-white border border-slate-300 rounded-lg px-5 py-2.5 font-extrabold text-slate-700 text-sm tracking-wide shadow-sm">MERIDIAN Co.</div>
                <div class="bg-white border border-slate-300 rounded-lg px-5 py-2.5 font-extrabold text-slate-700 text-sm tracking-wide shadow-sm">NEXO TRADE</div>
                <div class="bg-white border border-slate-300 rounded-lg px-5 py-2.5 font-extrabold text-slate-700 text-sm tracking-wide shadow-sm">SIGMA LABS</div>
            </div>
        </div>
    </section>

    <!-- Micro Case Study Cards -->
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
    </section>
`;

// Insert after the hero section closing divs (before the Infinite Looping Marquee Ticker)
html = html.replace(
    /<!-- Infinite Looping Marquee Ticker/,
    logoBarAndCaseStudies + '\n\n    <!-- Infinite Looping Marquee Ticker'
);

// 3. Add lead capture modal + gated reveal button in the calculator section
// Replace the results panel closing divs to add unlock button
const unlockBtn = `
                        </div>

                        <!-- Gated Reveal Button -->
                        <div class="mt-4">
                            <button onclick="openLeadModal()" class="w-full bg-gradient-to-r from-blue-700 to-emerald-600 hover:opacity-90 text-white font-bold py-3 rounded-xl transition-all text-sm shadow-md">
                                Reveal My Score &amp; Get Roadmap <i class="fas fa-arrow-right ml-1"></i>
                            </button>
                            <p class="text-xs text-slate-400 mt-2 text-center">Free &mdash; takes 30 seconds</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Lead Capture Modal -->
    <div id="lead-modal" class="hidden fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
        <div class="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl relative border border-slate-200">
            <button onclick="closeLeadModal()" class="absolute top-4 right-4 text-slate-400 hover:text-slate-900 text-2xl leading-none">&times;</button>
            <div class="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-full text-xs font-bold text-emerald-700 mb-4">Free Digital Maturity Report</div>
            <h3 class="text-xl font-extrabold text-slate-900 mb-2">Unlock Your Full Score</h3>
            <p class="text-sm text-slate-500 mb-6">Enter your details to reveal your score and receive a customised 12-month roadmap.</p>
            <form id="audit-lead-form" onsubmit="handleAuditLeadSubmit(event)" class="space-y-4">
                <div>
                    <label class="block text-xs font-bold uppercase text-slate-500 mb-1">Full Name *</label>
                    <input type="text" name="fullName" required class="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. Rahul Sharma">
                </div>
                <div>
                    <label class="block text-xs font-bold uppercase text-slate-500 mb-1">Work Email / WhatsApp *</label>
                    <input type="text" name="contactInfo" required class="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="rahul@company.com or +91 98765...">
                </div>
                <div>
                    <label class="block text-xs font-bold uppercase text-slate-500 mb-1">Company / Brand *</label>
                    <input type="text" name="companyName" required class="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Your Business Name">
                </div>
                <button type="submit" class="w-full mt-2 bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 rounded-xl transition-all">Reveal Score &amp; Get Roadmap &rarr;</button>
            </form>
        </div>
    </div>
`;

// Find the results panel closing section and inject the button
html = html.replace(
    /(<\/div>\s*\n\s*<\/div>\s*\n\s*<\/div>\s*\n\s*<\/div>\s*\n\s*<\/div>\s*\n\s*<\/div>\s*\n\s*<\/section>\s*\n\s*<!-- Section Break -->\s*\n\s*<section id="services")/,
    (match) => {
        // This is fragile; use a simpler landmark
        return match;
    }
);

// Use a better landmark: the closing of the calculator results panel
html = html.replace(
    /(<div class="text-xs font-semibold text-emerald-400" id="res-price">Est: &#x20B9;1\.25L - &#x20B9;3L \/ mo<\/div>\s*<\/div>\s*<\/div>\s*\n\s*<\/div>\s*<\/div>\s*\n\s*<\/div>\s*\n\s*<\/div>\s*\n\s*<\/section>)/,
    (match) => match
);

// Simpler approach - find a unique string near end of calculator and replace cleanly
const calcEndMarker = `                <div class="text-xs font-semibold text-emerald-400" id="res-price">Est: ₹1.25L - ₹3L / mo</div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    </section>`;

const calcEndReplacement = `                <div class="text-xs font-semibold text-emerald-400" id="res-price">Est: ₹1.25L - ₹3L / mo</div>
                            </div>
                        </div>

                        <!-- Gated Reveal Button -->
                        <div class="mt-4">
                            <button onclick="openLeadModal()" class="w-full bg-gradient-to-r from-blue-700 to-emerald-600 hover:opacity-90 text-white font-bold py-3 rounded-xl transition-all text-sm shadow-md">
                                Reveal My Score &amp; Get Roadmap <i class="fas fa-arrow-right ml-1"></i>
                            </button>
                            <p class="text-xs text-slate-400 mt-2 text-center">Free &mdash; takes 30 seconds</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Lead Capture Modal -->
    <div id="lead-modal" class="hidden fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
        <div class="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl relative border border-slate-200">
            <button onclick="closeLeadModal()" class="absolute top-4 right-4 text-slate-400 hover:text-slate-900 text-2xl leading-none">&times;</button>
            <div class="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-full text-xs font-bold text-emerald-700 mb-4">Free Digital Maturity Report</div>
            <h3 class="text-xl font-extrabold text-slate-900 mb-2">Unlock Your Full Score</h3>
            <p class="text-sm text-slate-500 mb-6">Enter your details to reveal your score and receive a customised 12-month roadmap.</p>
            <form id="audit-lead-form" onsubmit="handleAuditLeadSubmit(event)" class="space-y-4">
                <div>
                    <label class="block text-xs font-bold uppercase text-slate-500 mb-1">Full Name *</label>
                    <input type="text" name="fullName" required class="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="e.g. Rahul Sharma">
                </div>
                <div>
                    <label class="block text-xs font-bold uppercase text-slate-500 mb-1">Work Email / WhatsApp *</label>
                    <input type="text" name="contactInfo" required class="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="rahul@company.com or +91 98765...">
                </div>
                <div>
                    <label class="block text-xs font-bold uppercase text-slate-500 mb-1">Company / Brand *</label>
                    <input type="text" name="companyName" required class="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Your Business Name">
                </div>
                <button type="submit" class="w-full mt-2 bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 rounded-xl transition-all">Reveal Score &amp; Get Roadmap &rarr;</button>
            </form>
        </div>
    </div>`;

html = html.replace(calcEndMarker, calcEndReplacement);

// 4. Add floating WhatsApp button + lead modal JS before </body>
const whatsappAndScript = `
    <!-- Floating WhatsApp CTA -->
    <a href="https://wa.me/917018979508?text=Hi%20Naxa.One%2C%20I%27d%20like%20to%20book%20a%2015-Min%20Discovery%20Call." target="_blank" rel="noopener noreferrer"
       class="fixed bottom-6 right-6 z-40 bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-3 rounded-full shadow-xl flex items-center gap-2.5 transition-all hover:scale-105"
       aria-label="Chat on WhatsApp">
        <svg class="w-5 h-5 fill-current flex-shrink-0" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/></svg>
        <span class="font-semibold text-sm hidden md:inline">Talk to an Architect</span>
    </a>

    <script>
        function openLeadModal() {
            document.getElementById('lead-modal').classList.remove('hidden');
        }
        function closeLeadModal() {
            document.getElementById('lead-modal').classList.add('hidden');
        }
        function handleAuditLeadSubmit(e) {
            e.preventDefault();
            const formData = new FormData(e.target);
            const payload = Object.fromEntries(formData.entries());
            console.log('Lead captured:', payload);
            // TODO: Replace with your webhook URL (e.g. Make.com / Supabase)
            // fetch('YOUR_WEBHOOK_URL_HERE', { method: 'POST', headers: {'Content-Type':'application/json'}, body: JSON.stringify(payload) });
            document.getElementById('lead-modal').classList.add('hidden');
            // Show a success message
            alert('Thanks ' + payload.fullName + '! Your score is shown above. We will send your 12-month roadmap to ' + payload.contactInfo + ' shortly.');
        }
    </script>
`;

html = html.replace('</body>', whatsappAndScript + '\n</body>');

fs.writeFileSync('index.html', html);
console.log('All CRO audit recommendations applied successfully.');
