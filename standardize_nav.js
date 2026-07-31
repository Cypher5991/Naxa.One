const fs = require('fs');

const headAdditions = `
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
`;

const navbarHTML = `
    <!-- Transparent Navbar with Scroll Hamburger Collapse -->
    <nav class="fixed w-full z-50 bg-transparent transition-all duration-500 py-4" id="navbar">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex items-center justify-between h-16 transition-all duration-500" id="nav-container">
                <!-- Left: Brand Logo -->
                <a href="index.html" class="flex items-center gap-3 cursor-pointer group">
                    <img src="logo.png" alt="Naxa.One Logo" class="w-9 h-9 object-contain rounded-lg">
                    <span class="font-extrabold text-xl tracking-tight text-slate-950">Naxa<span class="text-emerald-500">.</span>One</span>
                </a>

                <!-- Center: Desktop Links (Visible ONLY at top, hidden on scroll) -->
                <div class="hidden md:flex items-center space-x-6 transition-all duration-300" id="desktop-nav-links">
                    <a href="index.html" class="text-slate-800 hover:text-blue-700 font-semibold transition-colors px-3 py-2 text-sm">Home</a>
                    <a href="index.html#philosophy" class="text-slate-800 hover:text-blue-700 font-semibold transition-colors px-3 py-2 text-sm">Philosophy</a>
                    <a href="pricing.html" class="text-slate-800 hover:text-blue-700 font-semibold transition-colors px-3 py-2 text-sm">Pricing & Tiers</a>
                    <a href="index.html#hubs" class="text-slate-800 hover:text-blue-700 font-semibold transition-colors px-3 py-2 text-sm">Dedicated Hubs</a>
                    <a href="index.html#calculator" class="text-slate-800 hover:text-blue-700 font-semibold transition-colors px-3 py-2 text-sm">Mini-Audit</a>
                </div>

                <!-- Right: Action Area (Discovery Button + Hamburger Menu) -->
                <div class="flex items-center gap-3">
                    <a href="pricing.html#audit" class="bg-blue-700 hover:bg-blue-800 text-white font-bold px-4 py-2 rounded-full text-xs sm:text-sm transition-all shadow-md shadow-blue-700/20" id="nav-discovery-btn">Book Discovery</a>
                    <button id="nav-hamburger-btn" class="flex items-center gap-2 bg-white/90 hover:bg-white text-slate-900 border border-slate-300 font-bold px-3.5 py-2 rounded-full shadow-md backdrop-blur-md transition-all">
                        <i class="fas fa-bars text-base text-blue-700"></i>
                        <span class="text-xs font-extrabold uppercase tracking-wider hidden sm:inline">Menu</span>
                    </button>
                </div>
            </div>
        </div>

        <!-- Full Navigation Drawer Modal -->
        <div id="nav-drawer" class="hidden fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-md transition-opacity">
            <div class="fixed top-6 right-6 max-w-sm w-full bg-white rounded-3xl p-8 border border-slate-200 shadow-2xl space-y-6">
                <div class="flex justify-between items-center pb-4 border-b border-slate-100">
                    <div class="flex items-center gap-3">
                        <img src="logo.png" alt="Naxa.One Logo" class="w-8 h-8 object-contain">
                        <span class="font-extrabold text-lg text-slate-900">Naxa<span class="text-emerald-500">.</span>One</span>
                    </div>
                    <button id="close-drawer-btn" class="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 hover:text-slate-900">
                        <i class="fas fa-xmark text-lg"></i>
                    </button>
                </div>
                <div class="flex flex-col space-y-4 font-bold text-slate-800">
                    <a href="index.html" class="hover:text-blue-700 py-1 transition-colors drawer-link">Home</a>
                    <a href="index.html#philosophy" class="hover:text-blue-700 py-1 transition-colors drawer-link">Philosophy</a>
                    <a href="pricing.html" class="hover:text-blue-700 py-1 transition-colors drawer-link">Retainer Pricing & Packages</a>
                    <a href="ecommerce.html" class="hover:text-blue-700 py-1 transition-colors drawer-link">Sell Online (eCommerce)</a>
                    <a href="content.html" class="hover:text-blue-700 py-1 transition-colors drawer-link">Look Professional (Content)</a>
                    <a href="seo.html" class="hover:text-blue-700 py-1 transition-colors drawer-link">Get Found (SEO)</a>
                    <a href="smm.html" class="hover:text-blue-700 py-1 transition-colors drawer-link">Build Following (SMM)</a>
                    <a href="index.html#calculator" class="hover:text-blue-700 py-1 transition-colors drawer-link">Digital Maturity Calculator</a>
                    <a href="index.html#faq" class="hover:text-blue-700 py-1 transition-colors drawer-link">FAQ</a>
                </div>
                <div class="pt-4 border-t border-slate-100">
                    <a href="pricing.html#audit" class="drawer-link block w-full text-center bg-blue-700 hover:bg-blue-800 text-white font-bold py-3.5 rounded-full text-sm shadow-md shadow-blue-700/20">Book Discovery Call</a>
                </div>
            </div>
        </div>
    </nav>
`;

const navbarScript = `
    <script>
        const navbar = document.getElementById('navbar');
        const desktopNavLinks = document.getElementById('desktop-nav-links');
        const navHamburgerBtn = document.getElementById('nav-hamburger-btn');
        const navDrawer = document.getElementById('nav-drawer');
        const closeDrawerBtn = document.getElementById('close-drawer-btn');

        function handleScroll() {
            if (!navbar) return;
            const scrollY = window.scrollY;
            navbar.classList.add('bg-transparent');
            navbar.classList.remove('bg-white', 'shadow-md', 'border-b', 'border-slate-200');
            
            if (scrollY > 50) {
                if (desktopNavLinks) desktopNavLinks.classList.add('opacity-0', 'pointer-events-none', '-translate-y-2');
                navbar.classList.remove('py-4');
                navbar.classList.add('py-2');
            } else {
                if (desktopNavLinks) desktopNavLinks.classList.remove('opacity-0', 'pointer-events-none', '-translate-y-2');
                navbar.classList.remove('py-2');
                navbar.classList.add('py-4');
            }
        }

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        if (navHamburgerBtn && navDrawer && closeDrawerBtn) {
            navHamburgerBtn.addEventListener('click', () => {
                navDrawer.classList.remove('hidden');
            });
            closeDrawerBtn.addEventListener('click', () => {
                navDrawer.classList.add('hidden');
            });
            document.querySelectorAll('.drawer-link').forEach(link => {
                link.addEventListener('click', () => {
                    navDrawer.classList.add('hidden');
                });
            });
        }
    </script>
`;

const files = ['index.html', 'pricing.html', 'ecommerce.html', 'content.html', 'seo.html', 'smm.html', 'agency_website_implementation.html'];

files.forEach(file => {
    if (!fs.existsSync(file)) return;
    let html = fs.readFileSync(file, 'utf8');

    // Add head scripts if missing font-awesome or tailwind
    if (!html.includes('fontawesome') && !html.includes('tailwindcss')) {
        html = html.replace('</head>', headAdditions + '\n</head>');
    } else if (!html.includes('fontawesome')) {
        html = html.replace('</head>', '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">\n</head>');
    }

    // Replace <nav ... </nav> or <header ... </header>
    if (html.includes('<nav')) {
        html = html.replace(/<nav[\s\S]*?<\/nav>/, navbarHTML.trim());
    } else if (html.includes('<header')) {
        html = html.replace(/<header[\s\S]*?<\/header>/, navbarHTML.trim());
    }

    // Clean up old navbar scripts if existing, and append new script before </body>
    if (!html.includes('const navHamburgerBtn')) {
        html = html.replace('</body>', navbarScript + '\n</body>');
    }

    fs.writeFileSync(file, html);
});
console.log("Navbar standardized across all files.");
