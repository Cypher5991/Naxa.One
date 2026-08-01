const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// Replace local <video> tag with Youtube iframe background loop
const oldVideoContainer = /<div class="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0 hero-video-bg">[\s\S]*?<\/div>/;

const youtubeBackgroundHTML = `<div class="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0 hero-video-bg">
            <iframe 
                class="w-[300%] h-[300%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full opacity-65 filter brightness-105 contrast-105 pointer-events-none"
                src="https://www.youtube.com/embed/G0WSU5x1-EE?autoplay=1&mute=1&loop=1&playlist=G0WSU5x1-EE&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&disablekb=1&playsinline=1" 
                title="Background Video" 
                frameborder="0" 
                allow="autoplay; encrypted-media" 
                allowfullscreen>
            </iframe>
            <div class="absolute inset-0 bg-gradient-to-r from-white/40 via-white/20 to-transparent backdrop-blur-[2px]"></div>
        </div>`;

html = html.replace(oldVideoContainer, youtubeBackgroundHTML);
fs.writeFileSync('index.html', html);
console.log('Updated hero background with Youtube embed loop (G0WSU5x1-EE).');

// Remove heavy video files from disk
const videos = ['Naxa.webm', 'video.mp4'];
videos.forEach(v => {
    if (fs.existsSync(v)) {
        fs.unlinkSync(v);
        console.log(`Deleted heavy video file: ${v}`);
    }
});

