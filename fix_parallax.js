const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

const target = `<div class="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0 hero-video-bg">
            <video class="w-[300%] h-[300%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full opacity-70 filter brightness-105 contrast-105 object-cover" autoplay loop muted playsinline>
                <source src="compressed_bg.mp4" type="video/mp4">
            </video>
            <!-- Lighter gradient to increase video visibility as requested -->
            <div class="absolute inset-0 bg-gradient-to-r from-white/20 via-white/10 to-transparent backdrop-blur-[1px] z-[4]"></div>
            <div class="absolute inset-0 bg-transparent z-[5] pointer-events-auto"></div>
        </div>`;

const replacement = `<!-- Background Video Loop with True Parallax (Fixed) -->
        <div class="fixed top-0 left-0 w-full h-screen overflow-hidden pointer-events-none -z-10 hero-video-bg">
            <video class="w-[300%] md:w-full h-[300%] md:h-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full object-cover" autoplay loop muted playsinline>
                <source src="compressed_bg.mp4" type="video/mp4">
            </video>
            <!-- Extremely subtle gradient to ensure text readability without washing out the video -->
            <div class="absolute inset-0 bg-gradient-to-r from-white/40 via-white/10 to-transparent z-[4]"></div>
            <div class="absolute inset-0 bg-transparent z-[5] pointer-events-auto"></div>
        </div>`;

// Regex replacement ignoring exact whitespace since windows/unix line endings vary
const regex = /<div class="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0 hero-video-bg">[\s\S]*?<div class="absolute inset-0 bg-transparent z-\[5\] pointer-events-auto"><\/div>\s*<\/div>/;

if (regex.test(html)) {
    html = html.replace(regex, replacement);
    fs.writeFileSync('index.html', html);
    console.log('Successfully applied parallax and removed opacity mask.');
} else {
    console.log('Regex did not match.');
}
