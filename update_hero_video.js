const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Replace compressed_bg.mp4 with slider_bg.mp4 in the Hero section
html = html.replace(
    '<source src="compressed_bg.mp4" type="video/mp4">',
    '<source src="slider_bg.mp4" type="video/mp4">'
);

fs.writeFileSync('index.html', html);
console.log('Hero section video updated.');
