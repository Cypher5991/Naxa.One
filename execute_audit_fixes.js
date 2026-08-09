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

function replaceAll(target, replacement, label) {
    if (html.includes(target)) {
        html = html.split(target).join(replacement);
        changeCount++;
        console.log(`✓ Applied All: ${label}`);
    } else {
        console.warn(`✗ SKIPPED (not found): ${label}`);
    }
}

// 1. Google Font
const fontImportTarget = `<link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">`;
if (!html.includes('Plus Jakarta Sans')) {
    replace(
        `<link rel="stylesheet" href="styles.css">`,
        `<link rel="stylesheet" href="styles.css">\n    ${fontImportTarget}`,
        'Import Plus Jakarta Sans'
    );
}
replace(
    `font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;`, // just in case it was there
    `font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;`,
    'Dummy'
);
if (!html.includes(`font-family: 'Plus Jakarta Sans'`)) {
    replace(
        `body {\n            background-color: #F8FAFC;\n            color: #0F172A;\n            overflow-x: hidden;\n        }`,
        `body {\n            font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;\n            background-color: #F8FAFC;\n            color: #0F172A;\n            overflow-x: hidden;\n        }`,
        'Apply Plus Jakarta Sans to body'
    );
}

// 2. Accessibility
replace(
    `<button id="nav-hamburger-btn" class="flex items-center gap-2 bg-white/90 hover:bg-white text-slate-900 border border-slate-300 font-bold px-3.5 py-2 rounded-full shadow-md backdrop-blur-md transition-all">`,
    `<button id="nav-hamburger-btn" aria-label="Toggle Navigation Menu" class="flex items-center gap-2 bg-white/90 hover:bg-white text-slate-900 border border-slate-300 font-bold p-3 min-h-[48px] min-w-[48px] rounded-full shadow-md backdrop-blur-md transition-all">`,
    'Accessible Hamburger Button'
);
replaceAll(
    `class="hover:text-blue-700 py-1 transition-colors drawer-link"`,
    `class="hover:text-blue-700 py-2.5 flex items-center min-h-[44px] transition-colors drawer-link"`,
    'Mobile Tap Targets Padding'
);

// 3. Contrast (text-slate-400 -> text-slate-500 on white)
replaceAll(
    `class="text-sm text-slate-400 mt-0.5"`,
    `class="text-sm text-slate-500 font-medium mt-0.5"`,
    'Hubs index description contrast'
);
replace(
    `class="text-xs font-bold text-slate-400 uppercase tracking-wider"`,
    `class="text-xs font-bold text-slate-500 uppercase tracking-wider"`,
    'Results index selected work contrast'
);
replaceAll(
    `class="text-xs text-slate-400"`,
    `class="text-xs text-slate-500"`,
    'Modal description contrast'
);

// 4. Typography Weights (reducing font-extrabold fatigue)
replaceAll(
    `font-extrabold text-slate-900`,
    `font-bold text-slate-900`,
    'Reduce extrabold to bold for slate-900 text'
);
// Restore hero and some big headers to extrabold
replaceAll(
    `class="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-slate-950`,
    `class="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-950`,
    'Restore hero font-extrabold'
);

// 5. Standardize Section Vertical Padding to py-24 for main sections
replace(`py-12 relative z-10 bg-white`, `py-24 relative z-10 bg-white`, `Section padding (Audit)`);
replace(`py-12 relative z-10 overflow-hidden bg-slate-900`, `py-24 relative z-10 overflow-hidden bg-slate-900`, `Section padding (Calculator)`);
replace(`py-16 relative z-10 bg-white border-b border-slate-200`, `py-24 relative z-10 bg-white border-b border-slate-200`, `Section padding (Operations/Results)`);
replace(`py-16 relative z-10 bg-white border-b border-slate-200`, `py-24 relative z-10 bg-white border-b border-slate-200`, `Section padding (Operations/Results) 2`);
replace(`py-16 relative z-10 bg-slate-900 border-b border-slate-800 text-white`, `py-24 relative z-10 bg-slate-900 border-b border-slate-800 text-white`, `Section padding (Digital Literacy)`);
replace(`py-16 relative z-10 bg-slate-950 border-b border-slate-800`, `py-24 relative z-10 bg-slate-950 border-b border-slate-800`, `Section padding (Services)`);
replace(`py-20 relative z-10 bg-white border-b border-slate-200`, `py-24 relative z-10 bg-white border-b border-slate-200`, `Section padding (Philosophy)`);
replace(`py-20 relative z-10 bg-white border-b border-slate-200`, `py-24 relative z-10 bg-white border-b border-slate-200`, `Section padding (Hubs)`);


// 6. Lazy Loading
replace(
    `<img src="formal_discussion.webp" alt="Naxa.One team in a strategy session" class="w-full h-[480px] object-cover rounded-2xl shadow-lg">`,
    `<img src="formal_discussion.webp" alt="Naxa.One team in a strategy session" class="w-full h-[480px] object-cover rounded-2xl shadow-lg" loading="lazy">`,
    'Lazy load formal_discussion'
);
replace(
    `<img src="customers_collage.webp" class="h-16 w-40 object-cover rounded-lg opacity-80" alt="Naxa.One clients">`,
    `<img src="customers_collage.webp" class="h-16 w-40 object-cover rounded-lg opacity-80" alt="Naxa.One clients" loading="lazy">`,
    'Lazy load customers_collage'
);

// 7. Micro-interactions
replace(
    `.typewriter-cursor {
            display: inline-block;
            animation: blink 0.75s step-end infinite;
            font-weight: 300;
            margin-left: 1px;
        }`,
    `.typewriter-cursor {
            display: inline-block;
            animation: blink 0.75s step-end infinite;
            font-weight: 300;
            margin-left: 2px;
            filter: drop-shadow(0 0 6px rgba(29, 78, 216, 0.7));
        }`,
    'Typewriter cursor glow'
);
replace(
    `.glass-card:hover {
            transform: translateY(-5px);
            border-color: #2563EB;
            box-shadow: 0 20px 35px -5px rgba(29, 78, 216, 0.15), 0 10px 10px -5px rgba(5, 150, 105, 0.10);
        }`,
    `.glass-card:hover {
            transform: translateY(-5px);
            border-color: #2563EB;
            box-shadow: 0 20px 35px -5px rgba(29, 78, 216, 0.25), 0 10px 10px -5px rgba(5, 150, 105, 0.15);
        }`,
    'Enhance glass card hover shadow'
);


fs.writeFileSync('index.html', html);
console.log(`\n✅ Done. ${changeCount} changes applied.`);
