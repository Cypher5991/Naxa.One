const fs = require('fs');
const path = require('path');
const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    let html = fs.readFileSync(path.join(dir, file), 'utf8');
    html = html.replace(/formal_discussion\.jpg/g, 'formal_discussion.webp');
    html = html.replace(/ecommerce\.jpg/g, 'ecommerce.webp');
    fs.writeFileSync(path.join(dir, file), html);
});
console.log("Updated references to WebP");
