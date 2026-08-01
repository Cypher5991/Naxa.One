const fs = require('fs');

// 1. Configure vercel.json with Cache-Control headers
const vercelConfig = {
    "cleanUrls": true,
    "headers": [
        {
            "source": "/(.*).(webm|mp4|jpg|jpeg|png|webp|svg|ico|css|js)",
            "headers": [
                {
                    "key": "Cache-Control",
                    "value": "public, max-age=31536000, immutable"
                }
            ]
        }
    ]
};
fs.writeFileSync('vercel.json', JSON.stringify(vercelConfig, null, 2));
console.log('Updated vercel.json with 1-year immutable Cache-Control headers');

// 2. Add preload="metadata" and poster to video tag in index.html
let html = fs.readFileSync('index.html', 'utf8');
html = html.replace(
    /<video autoplay loop muted playsinline class="/g,
    '<video autoplay loop muted playsinline preload="metadata" poster="ecommerce.jpg" class="'
);
fs.writeFileSync('index.html', html);
console.log('Updated video tag in index.html with preload="metadata" and poster');

// Clean up temp script
if (fs.existsSync('compress_images.ps1')) fs.unlinkSync('compress_images.ps1');

