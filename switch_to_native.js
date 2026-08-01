const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf8');

// 1. Replace the iframe / youtube-player block with a native <video> tag
const ytDivRegex = /<div class="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0 hero-video-bg">[\s\S]*?<\/div>\s*<\/div>/;

const nativeVideo = `<div class="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0 hero-video-bg">
            <video class="w-[300%] h-[300%] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full opacity-70 filter brightness-105 contrast-105 object-cover" autoplay loop muted playsinline>
                <source src="compressed_bg.mp4" type="video/mp4">
            </video>
            <!-- Lighter gradient to increase video visibility as requested -->
            <div class="absolute inset-0 bg-gradient-to-r from-white/20 via-white/10 to-transparent backdrop-blur-[1px] z-[4]"></div>
            <div class="absolute inset-0 bg-transparent z-[5] pointer-events-auto"></div>
        </div>`;

html = html.replace(ytDivRegex, nativeVideo);


// 2. Remove the YouTube API script block at the end
const scriptStart = '<!-- YouTube API for seamless looping -->';
const scriptEnd = `});\n    </script>`;
const startIndex = html.indexOf(scriptStart);
const endIndex = html.indexOf(scriptEnd, startIndex);

if (startIndex !== -1 && endIndex !== -1) {
    html = html.substring(0, startIndex) + html.substring(endIndex + scriptEnd.length);
}

// 3. Revert preloader to NOT rely on YouTube (since YouTube is gone)
const oldPreloaderLogicRegex = /window\.hidePreloader[\s\S]*?setTimeout\(window\.hidePreloader,\s*3500\);\s*}\)\;\s*}\)\(\)\;/;

const standardPreloaderLogic = `(function() {
            const bar = document.getElementById('loader-bar');
            let progress = 10;
            
            const interval = setInterval(() => {
                if (progress < 85) {
                    progress += Math.floor(Math.random() * 10) + 5;
                    if (bar) bar.style.width = progress + '%';
                }
            }, 100);

            window.addEventListener('load', function() {
                clearInterval(interval);
                if (bar) bar.style.width = '100%';
                setTimeout(() => {
                    const preloader = document.getElementById('preloader');
                    if (preloader) {
                        preloader.classList.add('opacity-0', 'pointer-events-none');
                        setTimeout(() => preloader.remove(), 700);
                    }
                }, 300);
            });
        })();`;

html = html.replace(oldPreloaderLogicRegex, standardPreloaderLogic);

fs.writeFileSync('index.html', html);
console.log('Successfully reverted to native HTML5 video.');
