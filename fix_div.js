const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const regex = /<\/div>\s*<\/div>\s*<div class="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left z-10 py-12 hero-content-box">/;
const replacement = `</div>\n\n        <div class="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-left z-10 py-12 hero-content-box">`;

if (regex.test(html)) {
    html = html.replace(regex, replacement);
    fs.writeFileSync('index.html', html);
    console.log('Successfully fixed the extra div via regex.');
} else {
    console.log('Regex did not match.');
}
