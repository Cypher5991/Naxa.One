const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Reduce spacing
html = html.replace(/py-24/g, 'py-12');

// Extract sections
const getSection = (id) => {
    const regex = new RegExp(`(<section id="${id}".*?</section>)`, 's');
    const match = html.match(regex);
    return match ? match[1] : '';
};

const philosophy = getSection('philosophy');
const services = getSection('services');
const hubs = getSection('hubs');
const audit = getSection('audit');
const calculator = getSection('calculator');
const faq = getSection('faq');

const allSectionsRegex = /(<section id="philosophy".*?<\/section>).*?(<section id="faq".*?<\/section>)/s;

const newSections = [
    philosophy,
    audit,
    calculator,
    services,
    hubs,
    faq
].join('\n\n    <!-- Section Break -->\n\n    ');

html = html.replace(allSectionsRegex, newSections);
html = html.replace(/<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">/, '<img src="ecommerce.jpg" class="w-full h-80 object-cover rounded-3xl shadow-xl mb-12" alt="Naxa.One Hubs">\n            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">');

fs.writeFileSync('index.html', html);
