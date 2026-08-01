const fs = require('fs');

// 1. Create vercel.json for cleanUrls
const vercelConfig = {
    "cleanUrls": true
};
fs.writeFileSync('vercel.json', JSON.stringify(vercelConfig, null, 2));
console.log('Created vercel.json with cleanUrls: true');

// 2. Update links across all HTML files
const files = ['index.html', 'pricing.html', 'ecommerce.html', 'content.html', 'seo.html', 'smm.html', 'agency_website_implementation.html'];

files.forEach(file => {
    if (!fs.existsSync(file)) return;
    let html = fs.readFileSync(file, 'utf8');

    // Replace links to clean URLs
    html = html.replace(/href="index\.html#philosophy"/g, 'href="/#philosophy"');
    html = html.replace(/href="index\.html#hubs"/g, 'href="/#hubs"');
    html = html.replace(/href="index\.html#calculator"/g, 'href="/#calculator"');
    html = html.replace(/href="index\.html#faq"/g, 'href="/#faq"');
    html = html.replace(/href="index\.html"/g, 'href="/"');
    
    html = html.replace(/href="pricing\.html#audit"/g, 'href="/pricing#audit"');
    html = html.replace(/href="pricing\.html"/g, 'href="/pricing"');
    
    html = html.replace(/href="ecommerce\.html"/g, 'href="/ecommerce"');
    html = html.replace(/href="content\.html"/g, 'href="/content"');
    html = html.replace(/href="seo\.html"/g, 'href="/seo"');
    html = html.replace(/href="smm\.html"/g, 'href="/smm"');

    // On index.html specifically, keep internal anchor links clean (#philosophy instead of /#philosophy)
    if (file === 'index.html') {
        html = html.replace(/href="\/#philosophy"/g, 'href="#philosophy"');
        html = html.replace(/href="\/#hubs"/g, 'href="#hubs"');
        html = html.replace(/href="\/#calculator"/g, 'href="#calculator"');
        html = html.replace(/href="\/#faq"/g, 'href="#faq"');
    }

    fs.writeFileSync(file, html);
});
console.log('Updated clean URLs across all files.');

// 3. Add Preloader Overlay to index.html
let indexHtml = fs.readFileSync('index.html', 'utf8');

const preloaderHTML = `
    <!-- Fullscreen Preloader Overlay -->
    <div id="preloader" class="fixed inset-0 z-[9999] bg-slate-950 flex flex-col items-center justify-center transition-opacity duration-700">
        <div class="flex items-center gap-3 mb-6 animate-pulse">
            <img src="logo.png" alt="Naxa.One Logo" class="w-12 h-12 object-contain rounded-xl">
            <span class="font-extrabold text-3xl tracking-tight text-white">Naxa<span class="text-emerald-500">.</span>One</span>
        </div>
        <div class="w-48 h-1.5 bg-slate-800 rounded-full overflow-hidden relative">
            <div id="loader-bar" class="h-full bg-gradient-to-r from-blue-600 via-emerald-500 to-blue-400 rounded-full transition-all duration-300 w-0"></div>
        </div>
        <p class="text-xs text-slate-400 font-bold uppercase tracking-widest mt-4">Loading Assets...</p>
    </div>
`;

const preloaderScript = `
    <script>
        // Preloader Logic: Wait until all images, fonts, videos and assets are fully loaded
        (function() {
            const bar = document.getElementById('loader-bar');
            let progress = 10;
            
            const interval = setInterval(() => {
                if (progress < 85) {
                    progress += Math.floor(Math.random() * 10) + 5;
                    if (bar) bar.style.width = progress + '%';
                }
            }, 100);

            window.addEventListener('load', function() {
                clearInterval(interval);
                if (bar) bar.style.width = '100%';
                setTimeout(() => {
                    const preloader = document.getElementById('preloader');
                    if (preloader) {
                        preloader.classList.add('opacity-0', 'pointer-events-none');
                        setTimeout(() => {
                            preloader.remove();
                        }, 700);
                    }
                }, 300);
            });
        })();
    </script>
`;

if (!indexHtml.includes('id="preloader"')) {
    indexHtml = indexHtml.replace('<body class="', preloaderHTML + '\n<body class="');
    indexHtml = indexHtml.replace('</body>', preloaderScript + '\n</body>');
    fs.writeFileSync('index.html', indexHtml);
    console.log('Added preloader overlay to index.html');
}

