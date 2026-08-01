const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// Instead of transforming the div which might leave gaps, let's adjust the wrapper to have bleed
// For calc-video-bg:
html = html.replace(
    '<div class="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0 calc-video-bg">',
    '<div class="absolute -inset-[20%] w-[140%] h-[140%] overflow-hidden pointer-events-none z-0 calc-video-bg">'
);

// For hero-video-bg:
html = html.replace(
    '<div class="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0 hero-video-bg">',
    '<div class="absolute -inset-[20%] w-[140%] h-[140%] overflow-hidden pointer-events-none z-0 hero-video-bg">'
);

fs.writeFileSync('index.html', html);
console.log('Parallax wrappers expanded.');
