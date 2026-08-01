const fs = require('fs');
const path = require('path');

const gaScript = `
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-SJRZ23Q5TZ"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
    
      gtag('config', 'G-SJRZ23Q5TZ');
    </script>
</head>`;

const dir = __dirname;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    let html = fs.readFileSync(path.join(dir, file), 'utf8');
    
    // Only inject if it doesn't already have it
    if (!html.includes('G-SJRZ23Q5TZ')) {
        html = html.replace('</head>', gaScript);
        fs.writeFileSync(path.join(dir, file), html);
        console.log('Added GA to ' + file);
    }
});
