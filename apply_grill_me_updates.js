const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// 1. Update Hero Badge, Headline, Subtitle, and CTAs
const oldHero = `<h1 class="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-950 mb-6 leading-[1.08]">
                    Build Your Digital <span class="bg-gradient-to-r from-blue-700 via-blue-600 to-emerald-600 bg-clip-text text-transparent">Foundation</span> From the Ground Up
                </h1>
                <p class="mt-4 text-base md:text-lg text-slate-800 font-semibold leading-relaxed mb-8">
                    We handle all the complicated digital work so you can focus on running your business. From building custom web platforms to driving organic revenue, we help you own your space.
                </p>`;

const newHero = `<h1 class="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-950 mb-6 leading-[1.08]">
                    From Digital Setup to Agentic Scale: We Build & <span class="bg-gradient-to-r from-blue-700 via-blue-600 to-emerald-600 bg-clip-text text-transparent">Accelerate Your Growth Engine</span>
                </h1>
                <p class="mt-4 text-base md:text-lg text-slate-800 font-semibold leading-relaxed mb-8">
                    Whether you are an MSME building your foundational web presence or an Enterprise deploying custom agentic workflows & ERP integrations, we deliver measurable ROI.
                </p>`;

html = html.replace(oldHero, newHero);
html = html.replace('Grass-Root Digital Development', 'MSME Growth & Enterprise Agentic Operations');

// Update Hero Buttons
const oldHeroBtns = `<div class="flex flex-col sm:flex-row justify-start gap-4 mb-8">
                    <a href="#calculator" class="bg-blue-700 hover:bg-blue-800 text-white font-bold px-8 py-4 rounded-full transition-all shadow-lg shadow-blue-700/25 flex items-center justify-center gap-2 transform hover:-translate-y-0.5">
                        Test Your Digital Maturity <i class="fas fa-arrow-right text-sm"></i>
                    </a>
                    <a href="pricing.html" class="bg-white hover:bg-slate-50 border border-slate-300 text-slate-900 font-bold px-8 py-4 rounded-full transition-all shadow-sm flex items-center justify-center">
                        Explore Retainer Tiers
                    </a>
                </div>`;

const newHeroBtns = `<div class="flex flex-col sm:flex-row justify-start gap-4 mb-8">
                    <button onclick="openBookingModal()" class="bg-blue-700 hover:bg-blue-800 text-white font-bold px-8 py-4 rounded-full transition-all shadow-lg shadow-blue-700/25 flex items-center justify-center gap-2 transform hover:-translate-y-0.5">
                        Book a 15-Min Call <i class="fas fa-arrow-right text-sm"></i>
                    </button>
                    <a href="#calculator" class="bg-white hover:bg-slate-50 border border-slate-300 text-slate-900 font-bold px-8 py-4 rounded-full transition-all shadow-sm flex items-center justify-center">
                        Test Digital Maturity
                    </a>
                </div>`;

html = html.replace(oldHeroBtns, newHeroBtns);

// 2. Add Embedded Booking Section (#booking-section) right before FAQ
const embeddedBookingSection = `
    <!-- Dedicated Embedded Booking Section -->
    <section id="booking-section" class="py-12 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white relative z-10 border-t border-slate-800">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div class="lg:col-span-6 space-y-6">
                    <div class="inline-flex items-center gap-2 px-3.5 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded-full text-xs font-bold text-emerald-400 uppercase tracking-wider">
                        Direct Advisory Access
                    </div>
                    <h2 class="text-3xl md:text-5xl font-extrabold leading-tight">
                        Book a 15-Min Call to Map Your <span class="bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">Digital Setup, Scale-Up or Agentic Workflows</span>
                    </h2>
                    <p class="text-slate-300 text-base leading-relaxed">
                        Speak directly with an Executive Architect. No sales fluff. We analyze your tech stack, outline operational bottlenecks, and deliver an actionable 12-month blueprint.
                    </p>
                    <div class="space-y-4 pt-2">
                        <div class="flex items-start gap-3">
                            <div class="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xs mt-0.5"><i class="fas fa-check"></i></div>
                            <div>
                                <h4 class="font-bold text-white text-sm">For MSMEs: Setup & Growth Roadmap</h4>
                                <p class="text-xs text-slate-400">High-converting web platforms, Tally ERP sync & lead intake systems.</p>
                            </div>
                        </div>
                        <div class="flex items-start gap-3">
                            <div class="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs mt-0.5"><i class="fas fa-check"></i></div>
                            <div>
                                <h4 class="font-bold text-white text-sm">For Enterprises: Agentic Operations</h4>
                                <p class="text-xs text-slate-400">Custom Next.js web applications, workflow automation & custom API middleware.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="lg:col-span-6">
                    <div class="bg-white text-slate-900 rounded-3xl p-8 shadow-2xl border border-slate-200">
                        <h3 class="text-2xl font-extrabold mb-2">Schedule Your Strategy Call</h3>
                        <p class="text-xs text-slate-500 mb-6">Select your primary track and pick your preferred time.</p>
                        <form onsubmit="handleDirectBookingSubmit(event)" class="space-y-4">
                            <div>
                                <label class="block text-xs font-bold uppercase text-slate-700 mb-1">Full Name *</label>
                                <input type="text" name="fullName" required class="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600" placeholder="e.g. Vikram Mehta">
                            </div>
                            <div>
                                <label class="block text-xs font-bold uppercase text-slate-700 mb-1">Work Email / WhatsApp *</label>
                                <input type="text" name="contactInfo" required class="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600" placeholder="vikram@company.com or +91 98765...">
                            </div>
                            <div>
                                <label class="block text-xs font-bold uppercase text-slate-700 mb-1">Company / Brand Name *</label>
                                <input type="text" name="companyName" required class="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600" placeholder="Your Business Name">
                            </div>
                            <div>
                                <label class="block text-xs font-bold uppercase text-slate-700 mb-1">Primary Growth Track *</label>
                                <select name="segment" required class="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white">
                                    <option value="MSME Platform & Growth">MSME: Digital Setup & Scale-Up</option>
                                    <option value="Enterprise Agentic Ops">Enterprise: Custom Dev & Agentic Workflows</option>
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
`;

if (!html.includes('id="booking-section"')) {
    html = html.replace('<section id="faq"', embeddedBookingSection + '\n\n    <section id="faq"');
}

// 3. Add Booking Modal (#booking-modal)
const bookingModalHTML = `
    <!-- Pop-Up Booking Modal -->
    <div id="booking-modal" class="hidden fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
        <div class="bg-white text-slate-900 rounded-3xl p-8 max-w-lg w-full shadow-2xl relative border border-slate-200">
            <button onclick="closeBookingModal()" class="absolute top-4 right-4 text-slate-400 hover:text-slate-900 text-2xl font-bold leading-none">&times;</button>
            <div class="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 border border-blue-200 rounded-full text-xs font-bold text-blue-700 mb-4">Direct Architect Session</div>
            <h3 class="text-2xl font-extrabold text-slate-900 mb-1">Book a 15-Min Call</h3>
            <p class="text-xs text-slate-500 mb-6">Map your Digital Setup, Scale-Up or Agentic Workflows directly with an expert.</p>

            <form onsubmit="handleDirectBookingSubmit(event)" class="space-y-4">
                <div>
                    <label class="block text-xs font-bold uppercase text-slate-700 mb-1">Full Name *</label>
                    <input type="text" name="fullName" required class="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600" placeholder="e.g. Rahul Sharma">
                </div>
                <div>
                    <label class="block text-xs font-bold uppercase text-slate-700 mb-1">Work Email / WhatsApp *</label>
                    <input type="text" name="contactInfo" required class="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600" placeholder="rahul@company.com or +91 98765...">
                </div>
                <div>
                    <label class="block text-xs font-bold uppercase text-slate-700 mb-1">Company / Brand *</label>
                    <input type="text" name="companyName" required class="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600" placeholder="Your Company Name">
                </div>
                <div>
                    <label class="block text-xs font-bold uppercase text-slate-700 mb-1">Primary Growth Track *</label>
                    <select name="segment" required class="w-full border border-slate-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white">
                        <option value="MSME Platform & Growth">MSME: Digital Setup & Scale-Up</option>
                        <option value="Enterprise Agentic Ops">Enterprise: Custom Dev & Agentic Workflows</option>
                        <option value="General Audit">Digital Maturity Audit (1-Week)</option>
                    </select>
                </div>
                <button type="submit" class="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3.5 rounded-xl transition-all text-sm shadow-md">
                    Request 15-Min Call &rarr;
                </button>
            </form>
        </div>
    </div>
`;

if (!html.includes('id="booking-modal"')) {
    html = html.replace('<!-- Lead Capture Modal -->', bookingModalHTML + '\n\n    <!-- Lead Capture Modal -->');
}

// 4. Update JavaScript to handle modal and booking form handlers
const bookingJS = `
        function openBookingModal() {
            const modal = document.getElementById('booking-modal');
            if (modal) modal.classList.remove('hidden');
        }
        function closeBookingModal() {
            const modal = document.getElementById('booking-modal');
            if (modal) modal.classList.add('hidden');
        }
        function handleDirectBookingSubmit(e) {
            e.preventDefault();
            const formData = new FormData(e.target);
            const payload = Object.fromEntries(formData.entries());
            console.log('Booking requested:', payload);
            closeBookingModal();
            alert('Thank you ' + payload.fullName + '! Your 15-minute discovery call request for ' + payload.companyName + ' (' + payload.segment + ') has been received. Our architect will reach out via ' + payload.contactInfo + ' shortly.');
        }
`;

html = html.replace('function openLeadModal() {', bookingJS + '\n        function openLeadModal() {');

// Update all nav / drawer CTAs to trigger openBookingModal()
html = html.replace(/href="\/pricing#audit"/g, 'href="javascript:void(0)" onclick="openBookingModal()"');

fs.writeFileSync('index.html', html);
console.log('Homepage updated with Dual-Hook copy, embedded booking section & booking modal.');
