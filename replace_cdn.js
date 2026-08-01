const fs = require('fs');
const path = require('path');

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    let html = fs.readFileSync(path.join(dir, file), 'utf8');
    
    const cdnScriptRegex = /<script src="https:\/\/cdn\.tailwindcss\.com"><\/script>/g;
    
    if (regex = cdnScriptRegex.test(html)) {
        html = html.replace(cdnScriptRegex, '<link rel="stylesheet" href="styles.css">');
        fs.writeFileSync(path.join(dir, file), html);
        console.log('Replaced Tailwind CDN in ' + file);
    }
});
