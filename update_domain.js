const fs = require('fs');

const files = ['index.html', 'pricing.html', 'ecommerce.html', 'content.html', 'seo.html', 'smm.html', 'agency_website_implementation.html', 'sitemap.xml', 'robots.txt', 'llms.txt'];

files.forEach(file => {
    if (!fs.existsSync(file)) return;
    let content = fs.readFileSync(file, 'utf8');

    // Replace staging vercel domain with custom domain https://www.naxa.one/
    content = content.replace(/https:\/\/naxa-one\.vercel\.app\//g, 'https://www.naxa.one/');
    content = content.replace(/https:\/\/naxa-one\.vercel\.app/g, 'https://www.naxa.one');
    content = content.replace(/https:\/\/naxa\.one\//g, 'https://www.naxa.one/');
    content = content.replace(/https:\/\/naxa\.one(?!\.)/g, 'https://www.naxa.one');

    fs.writeFileSync(file, content);
});
console.log('Domain metadata updated to https://www.naxa.one/ across all files.');
