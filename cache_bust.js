const fs = require('fs');
const path = require('path');

const version = '3.0.3'; // Incremented to 3.0.3 for hero subtext white color update

const files = [
    'index.html',
    'pricing.html',
    'ecommerce.html',
    'content.html',
    'seo.html',
    'smm.html',
    'agency_website_implementation.html'
];

files.forEach(file => {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        // Replace styles.css with styles.css?v=version
        // Also handles matching already versioned links like styles.css?v=...
        const regex = /href=["']styles\.css(?:\?v=[a-zA-Z0-9\.]+)?["']/g;
        const newContent = content.replace(regex, `href="styles.css?v=${version}"`);
        
        if (content !== newContent) {
            fs.writeFileSync(filePath, newContent, 'utf8');
            console.log(`✓ Cache busted styles.css in ${file}`);
        } else {
            console.log(`- No change in ${file}`);
        }
    }
});
