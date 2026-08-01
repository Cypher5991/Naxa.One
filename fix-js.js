const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Remove the tailwind.config block
const tailwindRegex = /<script>\s*tailwind\.config = {[\s\S]*?<\/script>/;
html = html.replace(tailwindRegex, '');

// 2. Fix the null btn error
const menuBtnRegex = /\/\/ Mobile menu toggle\s*const btn = document\.getElementById\('mobile-menu-btn'\);\s*const menu = document\.getElementById\('mobile-menu'\);\s*btn\.addEventListener\('click', \(\) => {\s*menu\.classList\.toggle\('hidden'\);\s*}\);/;
html = html.replace(menuBtnRegex, `// Mobile menu toggle
        const btn = document.getElementById('mobile-menu-btn');
        const menu = document.getElementById('mobile-menu');
        if (btn && menu) {
            btn.addEventListener('click', () => {
                menu.classList.toggle('hidden');
            });
        }`);

fs.writeFileSync('index.html', html);
console.log('Fixed JS errors.');
