const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const regex = /function openBookingModal\(\) \{\s*const modal = document\.getElementById\('booking-modal'\);\s*if \(modal\) modal\.classList\.remove\('hidden'\);\s*\}/;
html = html.replace(regex, `function openBookingModal() {
            const section = document.getElementById('booking-section');
            if (section) section.scrollIntoView({ behavior: 'smooth' });
        }`);

fs.writeFileSync('index.html', html);
console.log('Fixed openBookingModal function.');
