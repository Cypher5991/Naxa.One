const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8').replace(/\r\n/g, '\n');

// --- 1. Gate the Digital Maturity Calculator ---
// Find the results container and blur the contents, add the CTA button
const resultTarget = `
                                <h3 class="text-5xl font-extrabold text-white" id="res-score">35%</h3>
                                <span class="text-xs px-2.5 py-1 rounded-full font-bold" id="res-tier-badge" style="background: rgba(217, 119, 6, 0.25); color: #fcd34d;">Reactive</span>
                            </div>
                            
                            <div class="mb-6">
                                <p class="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Highest Risk Area</p>
                                <div class="bg-white/10 border border-white/10 rounded-xl p-3">
                                    <div class="text-sm font-bold text-emerald-400" id="res-risk-title">Analytics & Data</div>
                                    <div class="text-xs text-slate-200 mt-1" id="res-risk-desc">Blind decision making due to data gaps.</div>
                                </div>
                            </div>
                        </div>

                        <div>
                            <p class="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Recommended Path</p>
                            <div class="bg-gradient-to-r from-blue-900/40 to-emerald-900/40 border border-slate-700 rounded-xl p-4">
                                <div class="text-base font-bold text-white mb-1" id="res-service">Mid-Market Modernization</div>
                                <div class="text-xs font-semibold text-emerald-400" id="res-price">Est: ?1.25L - ?3L / mo</div>
                            </div>
                        </div>`;

const gatedResult = `
                                <div class="blur-md opacity-40 select-none">
                                    <h3 class="text-5xl font-extrabold text-white" id="res-score">35%</h3>
                                </div>
                                <span class="text-xs px-2.5 py-1 rounded-full font-bold blur-sm opacity-40 select-none" id="res-tier-badge" style="background: rgba(217, 119, 6, 0.25); color: #fcd34d;">Reactive</span>
                            </div>
                            
                            <div class="mb-6 blur-md opacity-40 select-none">
                                <p class="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Highest Risk Area</p>
                                <div class="bg-white/10 border border-white/10 rounded-xl p-3">
                                    <div class="text-sm font-bold text-emerald-400" id="res-risk-title">Analytics & Data</div>
                                    <div class="text-xs text-slate-200 mt-1" id="res-risk-desc">Blind decision making due to data gaps.</div>
                                </div>
                            </div>
                        </div>

                        <div class="blur-md opacity-40 select-none">
                            <p class="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">Recommended Path</p>
                            <div class="bg-gradient-to-r from-blue-900/40 to-emerald-900/40 border border-slate-700 rounded-xl p-4">
                                <div class="text-base font-bold text-white mb-1" id="res-service">Mid-Market Modernization</div>
                                <div class="text-xs font-semibold text-emerald-400" id="res-price">Est: ?1.25L - ?3L / mo</div>
                            </div>
                        </div>
                        
                        <!-- Gated Reveal Button -->
                        <div class="mt-4 relative z-10 -translate-y-8">
                            <button onclick="openLeadModal()" class="w-full bg-gradient-to-r from-blue-700 to-emerald-600 hover:from-blue-600 hover:to-emerald-500 text-white font-bold py-4 rounded-xl transition-all text-sm shadow-xl hover:scale-[1.02]">
                                Unlock My Score &amp; Get Roadmap <i class="fas fa-lock-open ml-1"></i>
                            </button>
                            <p class="text-xs text-slate-400 mt-2 text-center font-semibold">Free &mdash; Takes 30 Seconds</p>
                        </div>`;

html = html.replace(resultTarget, gatedResult);

// Inject the Lead Modal HTML just before the closing </body> tag
const leadModalHtml = `
    <!-- Lead Capture Modal -->
    <div id="lead-modal" class="hidden fixed inset-0 z-50 bg-slate-900/90 backdrop-blur-sm flex items-center justify-center p-4">
        <div class="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl relative border border-slate-200">
            <button onclick="closeLeadModal()" class="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-900 text-xl leading-none transition-colors">&times;</button>
            <span class="inline-block px-3 py-1 bg-emerald-50 border border-emerald-200 rounded-full text-xs font-bold text-emerald-700 mb-4 uppercase tracking-wider">Free Audit Report</span>
            <h3 class="text-2xl font-extrabold text-slate-900 mb-2">Unlock Your Digital Maturity Score</h3>
            <p class="text-sm text-slate-500 mb-6 leading-relaxed">Enter your details to reveal your score instantly and receive a customized 12-month operational roadmap.</p>
            <form id="audit-lead-form" onsubmit="handleAuditLeadSubmit(event)" class="space-y-4">
                <div>
                    <label class="block text-xs font-bold uppercase text-slate-700 mb-1">Full Name *</label>
                    <input type="text" name="fullName" required class="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 bg-slate-50" placeholder="e.g. Vikram Mehta">
                </div>
                <div>
                    <label class="block text-xs font-bold uppercase text-slate-700 mb-1">Work Email / WhatsApp *</label>
                    <input type="text" name="contactInfo" required class="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 bg-slate-50" placeholder="vikram@company.com or +91 98765...">
                </div>
                <div>
                    <label class="block text-xs font-bold uppercase text-slate-700 mb-1">Company / Brand *</label>
                    <input type="text" name="companyName" required class="w-full border border-slate-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 bg-slate-50" placeholder="Your Business Name">
                </div>
                <button type="submit" class="w-full mt-4 bg-blue-700 hover:bg-blue-800 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-700/25">Unlock My Results &rarr;</button>
            </form>
        </div>
    </div>
</body>`;

html = html.replace('</body>', leadModalHtml);


// Add the form logic
const formLogicHtml = `function handleAuditLeadSubmit(event) {
            event.preventDefault();
            // Just for UI - remove the blur and show real results
            const formData = new FormData(event.target);
            console.log('Lead Captured:', Object.fromEntries(formData));
            
            closeLeadModal();
            
            // Remove blur
            document.querySelectorAll('.blur-md, .blur-sm').forEach(el => {
                el.classList.remove('blur-md', 'blur-sm', 'opacity-40', 'select-none');
            });
            // Hide the button container
            event.target.closest('body').querySelector('button[onclick="openLeadModal()"]').parentElement.style.display = 'none';
            
            // Re-run the result logic directly to make sure values are clear
            const resultScore = document.getElementById('res-score');
            if(resultScore) {
                 resultScore.style.filter = "none";
            }
        }`;

html = html.replace('function openBookingModal()', formLogicHtml + '\n\n        function openLeadModal() { document.getElementById("lead-modal").classList.remove("hidden"); }\n        function closeLeadModal() { document.getElementById("lead-modal").classList.add("hidden"); }\n\n        function openBookingModal()');


// --- 2. Add Tally ERP & WhatsApp Automation Section AND 3. Digital Literacy Retainer ---
const philosophyEndTarget = `<!-- Section Break -->

    <section id="hubs" class="py-12 relative z-10 bg-white border-b border-slate-200">`;

const operationalServices = `<!-- Operations Automation Section -->
    <section id="operations" class="py-16 relative z-10 bg-white border-b border-slate-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div class="order-2 lg:order-1">
                    <div class="glass-card p-8 rounded-3xl border border-slate-200 bg-slate-50 shadow-xl relative overflow-hidden group">
                        <div class="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/10 transition-colors duration-700"></div>
                        <div class="flex items-center justify-between border-b border-slate-200 pb-4 mb-4">
                            <div class="flex items-center gap-3">
                                <i class="fas fa-desktop text-slate-400 text-xl"></i>
                                <span class="font-bold text-slate-700 text-sm">Without Naxa.One</span>
                            </div>
                            <span class="text-xs font-bold text-red-500 bg-red-50 px-2 py-1 rounded">6 Hours Daily</span>
                        </div>
                        <div class="flex items-center justify-between pt-2">
                            <div class="flex items-center gap-3">
                                <i class="fas fa-bolt text-emerald-500 text-xl"></i>
                                <span class="font-extrabold text-slate-900 text-lg">With Tally + API Sync</span>
                            </div>
                            <span class="text-sm font-extrabold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded shadow-sm">0 Minutes</span>
                        </div>
                    </div>
                </div>
                <div class="order-1 lg:order-2 space-y-6">
                    <div class="inline-block px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-bold uppercase tracking-wider">Enterprise Operations</div>
                    <h2 class="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
                        Banish 6-Hour Daily <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 to-emerald-600">Manual Entries</span>
                    </h2>
                    <h3 class="text-lg font-bold text-slate-700">Tally ERP Sync + Custom WhatsApp Middlewares</h3>
                    <p class="text-slate-600 text-sm leading-relaxed">
                        Stop letting your operations team manually type web orders into Tally. We build custom middleware bridges that instantly sync transactions, update inventory across channels, and trigger automatic WhatsApp order receipts to your customers.
                    </p>
                    <a href="#booking-section" onclick="openBookingModal()" class="inline-flex items-center justify-center px-6 py-3 border border-transparent text-sm font-bold rounded-xl text-white bg-blue-700 hover:bg-blue-800 shadow-md transition-all hover:scale-105">
                        Book a Workflow Audit &rarr;
                    </a>
                </div>
            </div>
        </div>
    </section>

    <!-- Digital Literacy Trust Section -->
    <section class="py-16 relative z-10 bg-slate-900 border-b border-slate-800 text-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div class="max-w-3xl mx-auto">
                <i class="fas fa-graduation-cap text-4xl text-emerald-400 mb-6"></i>
                <h2 class="text-3xl md:text-4xl font-extrabold mb-4">We Teach Your Team to Drive the Engine</h2>
                <p class="text-slate-300 text-base leading-relaxed mb-8">
                    Most agencies keep you in the dark to create dependency. Every Naxa.One retainer includes a monthly <strong>Digital Literacy session</strong> where we train your staff on Google Analytics 4, CRM pipeline hygiene, and WhatsApp template builders. We don't just write code; we elevate your team's digital capability.
                </p>
                <div class="flex flex-wrap justify-center gap-4">
                    <span class="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-xs font-bold text-slate-300"><i class="fas fa-check text-emerald-400 mr-2"></i>GA4 Training</span>
                    <span class="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-xs font-bold text-slate-300"><i class="fas fa-check text-emerald-400 mr-2"></i>CRM Hygiene</span>
                    <span class="px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-xs font-bold text-slate-300"><i class="fas fa-check text-emerald-400 mr-2"></i>No-Code Handoffs</span>
                </div>
            </div>
        </div>
    </section>

    <!-- Section Break -->

    <section id="hubs" class="py-12 relative z-10 bg-white border-b border-slate-200">`;

html = html.replace(philosophyEndTarget, operationalServices);


// --- 4. Refine the 1-Week Digital Maturity Audit Checklist ---
const auditTarget = `The 1-Week Digital Maturity Audit is an intensive 7-day technical evaluation for ?35,000 (100% credited toward your retainer) that pinpoints technical debt, speed bottlenecks, and maps CRM, Tally ERP, and WhatsApp API workflows.`;

const auditReplacement = `The 1-Week Digital Maturity Audit is an intensive 7-day technical evaluation for &#x20B9;35,000 (<strong>100% credited back</strong> toward your retainer) that pinpoints technical debt and operational bottlenecks. 
                    <br><br>
                    <strong class="text-slate-900 block mb-1">What We Need From You:</strong>
                    <ul class="list-disc list-inside mb-4 text-slate-600 text-xs space-y-1">
                        <li>1-Hour C-Suite Strategy Interview</li>
                        <li>Google Analytics &amp; Meta Ads (Read-Only) Access</li>
                        <li>Tech Stack &amp; Workflow Overview</li>
                    </ul>
                    <strong class="text-slate-900 block mb-1">What We Deliver in 7 Days:</strong>
                    <ul class="list-disc list-inside text-slate-600 text-xs space-y-1">
                        <li>Technical Debt &amp; Load Speed Diagnostic</li>
                        <li>Conversion Funnel Leakage Report</li>
                        <li>Custom System Architecture Diagram (Current vs. Future)</li>
                        <li>12-Month Operational Modernization Roadmap PDF</li>
                    </ul>`;

html = html.replace(auditTarget, auditReplacement);


// Write back
fs.writeFileSync('index.html', html);
console.log('Optimizations applied successfully!');
